import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

//Estado datos form
const AdminUsuarioEdit = () => {
  //formData almacena los datos del usuario que se tan editando
  //setFormData actualiza estado de formData
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    rol: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsuario = async () => {
        try {
          //obtiene los datos del usuario con soli GET :3
          const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/usuarios/${id}`, {
            //Authorization para que solo accedan los admin con sus tokens autenticados obtenidos del localStorage uwu
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          });
          if (!response.ok) {
            const errorText = await response.text();
            try {
              const errorData = JSON.parse(errorText);
              throw new Error(errorData.error || "Error desconocido.");
            } catch {
              throw new Error("El servidor devolvió una respuesta no válida.");
            }
          }
          const usuario = await response.json();
          setFormData(usuario);
        } catch (error) {
          console.error("Error al obtener usuario:", error.message);
          alert(error.message);
        }
      };
      
      
      console.log("ID desde useParams:", id);
      console.log("Token en localStorage:", localStorage.getItem("token"));

    fetchUsuario();
  }, [id]);


  // Actualiza el estado de formData pa que se reflejen los nuevos valores. Usa el spread operator (...prev) que me mantiene los valores previos y solo cambia el campo que se modifico ([name]: value)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Se ejecuta cuando el admin envia el form
  const handleSubmit = async (e) => {
    e.preventDefault(); //evita que el formulario recargue la pag
    try {
      //soli PUT a la API pa actualizar los datos del usuario
        const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/usuarios/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData), //Se pasa el id del usuario en la URL y los datos actualizados en el cuerpo de la solicitud
      });
      if (!response.ok) {
        throw new Error("Error al editar el usuario.");
      }
      alert("Usuario actualizado con éxito.");
      navigate("/admin/usuarios");
    } catch (error) {
      console.error("Error al editar usuario:", error);
    }
  };

  return (
    <div className="admin-page">
      <h1>Editar Usuario</h1>
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
        <button type="submit">Actualizar Usuario</button>
      </form>
    </div>
  );
};

export default AdminUsuarioEdit;
