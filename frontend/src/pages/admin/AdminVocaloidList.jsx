import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminVocaloidList = () => {
  const [vocaloids, setVocaloids] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVocaloids = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/vocaloids`);
        if (!response.ok) {
          throw new Error("Error al obtener la lista de Vocaloids.");
        }
        const data = await response.json();
        setVocaloids(data);
      } catch (error) {
        console.error("Error al obtener Vocaloids:", error);
      }
    };

    fetchVocaloids();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este Vocaloid?")) {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/vocaloids/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("No se pudo eliminar el Vocaloid.");
        }

        setVocaloids((prevVocaloids) => prevVocaloids.filter((vocaloid) => vocaloid.id !== id));
        alert("Vocaloid eliminado correctamente.");
      } catch (error) {
        console.error("Error al eliminar Vocaloid:", error);
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/vocaloids/edit/${id}`);
  };

  const handleCreate = () => {
    navigate("/admin/vocaloids/create");
  };

  return (
    <div className="admin-page">
      <div className="create-section">
        <h2>Administración de Vocaloids</h2>
        <button onClick={handleCreate}>Crear Vocaloid</button>
      </div>
      <h1>Lista de Vocaloids</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Desarrollador</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {vocaloids.length > 0 ? (
            vocaloids.map((vocaloid) => (
              <tr key={vocaloid.id || vocaloid._id}>
                <td>{vocaloid.id || vocaloid._id}</td>
                <td>{vocaloid.nombre}</td>
                <td>{vocaloid.desarrollador}</td>
                <td>
                  <button onClick={() => handleEdit(vocaloid.id || vocaloid._id)}>Editar</button>
                  <button onClick={() => handleDelete(vocaloid.id || vocaloid._id)}>Eliminar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">Cargando vocaloids...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminVocaloidList;
