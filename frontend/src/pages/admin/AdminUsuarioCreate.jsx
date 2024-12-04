import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminUsuarioCreate = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    rol: "user",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); 
    try {
      // Validación rápida en frontend
      if (!formData.nombre || !formData.email || !formData.password) {
        setError("Todos los campos son obligatorios.");
        return;
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/usuarios`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al crear el usuario.");
      }

      alert("Usuario creado con éxito.");
      navigate("/admin/usuarios");
    } catch (error) {
      console.error("Error al crear usuario:", error);
      setError(error.message || "Error desconocido.");
    }
  };

  return (
    <div className="admin-page">
      <h1>Crear Usuario</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="rol">Rol:</label>
          <select
            id="rol"
            name="rol"
            value={formData.rol}
            onChange={handleChange}
          >
            <option value="user">Usuario</option>
            <option value="admin">Administrador</option>
          </select>
        </div>
        <button type="submit">Crear Usuario</button>
      </form>
    </div>
  );
};

export default AdminUsuarioCreate;
