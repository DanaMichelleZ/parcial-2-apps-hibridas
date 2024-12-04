import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminUsuarioList = () => {
  const [usuarios, setUsuarios] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/usuarios`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        if (!response.ok) {
          throw new Error("Error al obtener los usuarios.");
        }
        const data = await response.json();
        setUsuarios(data);
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      }
    };

    fetchUsuarios();
  }, []);

  const handleEdit = (id) => {
    console.log("ID enviado al editar:", id);
    navigate(`/admin/usuarios/edit/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/usuarios/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        
        if (!response.ok) {
          throw new Error("No se pudo eliminar el usuario.");
        }
        setUsuarios((prev) => prev.filter((usuario) => usuario.id !== id));
        alert("Usuario eliminado correctamente.");
      } catch (error) {
        console.error("Error al eliminar usuario:", error);
      }
    }
  };

  return (
    <div className="admin-page">
      <h1>Lista de Usuarios</h1>
      <div className="action-bar">
        <button onClick={() => navigate("/admin/usuarios/create")}>
          Crear Usuario
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.length > 0 ? (
            usuarios.map((usuario) => (
              <tr key={usuario.id || usuario._id}>
                <td>{usuario.id || usuario._id}</td>
                <td>{usuario.nombre}</td>
                <td>{usuario.email}</td>
                <td>{usuario.rol}</td>
                <td>
                  <button onClick={() => handleEdit(usuario.id || usuario._id)}>
                    Editar
                  </button>
                  <button onClick={() => handleDelete(usuario.id || usuario._id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">Cargando usuarios...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsuarioList;
