import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminMotorList = () => {
  const [motores, setMotores] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMotores = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/motores`);
        if (!response.ok) {
          throw new Error("Error al obtener la lista de motores.");
        }
        const data = await response.json();
        setMotores(data);
      } catch (error) {
        console.error("Error al obtener motores:", error);
      }
    };

    fetchMotores();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este motor?")) {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/motores/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("No se pudo eliminar el motor.");
        }

        setMotores((prevMotores) => prevMotores.filter((motor) => motor.id !== id));
        alert("Motor eliminado correctamente.");
      } catch (error) {
        console.error("Error al eliminar motor:", error);
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/motores/edit/${id}`);
  };

  const handleCreate = () => {
    navigate("/admin/motores/create");
  };

  return (
    <div className="admin-page">
      <div className="create-section">
        <h2>Administración de Motores</h2>
        <button onClick={handleCreate}>Crear Motor</button>
      </div>
      <h1>Lista de Motores</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre del Motor</th>
            <th>Idiomas</th>
            <th>Fecha de Lanzamiento</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {motores.length > 0 ? (
            motores.map((motor) => (
              <tr key={motor.id || motor._id}>
                <td>{motor.id || motor._id}</td>
                <td>{motor.nombreMotor}</td>
                <td>{motor.idiomas.join(", ")}</td>
                <td>{new Date(motor.fechaLanzamiento).toLocaleDateString()}</td>
                <td>
                <button onClick={() => navigate(`/admin/usuarios/edit/${usuario.id || usuario._id}`)}>Editar</button>
                  <button onClick={() => handleDelete(motor.id || motor._id)}>Eliminar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">Cargando motores...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminMotorList;
