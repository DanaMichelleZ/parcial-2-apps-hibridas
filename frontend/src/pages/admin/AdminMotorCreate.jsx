import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminMotorCreate = () => {
  const [nombreMotor, setNombreMotor] = useState("");
  const [idiomas, setIdiomas] = useState("");
  const [fechaLanzamiento, setFechaLanzamiento] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    // Validaciones básicas
    if (!nombreMotor || !idiomas || !fechaLanzamiento) {
      setMessage("Por favor, completa todos los campos.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("Token no encontrado. Por favor, inicia sesión.");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/motores`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nombreMotor,
          idiomas: idiomas.split(",").map((idioma) => idioma.trim()),
          fechaLanzamiento,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al crear el motor.");
      }

      setMessage("Motor creado con éxito.");
      setNombreMotor("");
      setIdiomas("");
      setFechaLanzamiento("");

      // Redirigir después de crear el motor
      navigate("/admin/motores");
    } catch (error) {
      console.error("Error al crear el motor:", error);
      setMessage("Error al crear el motor. Inténtalo de nuevo.");
    }
  };

  return (
    <div className="admin-page">
      <h1>Crear Motor</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombreMotor">Nombre del Motor:</label>
          <input
            type="text"
            id="nombreMotor"
            name="nombreMotor"
            value={nombreMotor}
            onChange={(e) => setNombreMotor(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="idiomas">Idiomas:</label>
          <input
            type="text"
            id="idiomas"
            name="idiomas"
            value={idiomas}
            onChange={(e) => setIdiomas(e.target.value)}
            placeholder="Separar por comas"
          />
        </div>
        <div>
          <label htmlFor="fechaLanzamiento">Fecha de Lanzamiento:</label>
          <input
            type="date"
            id="fechaLanzamiento"
            name="fechaLanzamiento"
            value={fechaLanzamiento}
            onChange={(e) => setFechaLanzamiento(e.target.value)}
          />
        </div>
        <button type="submit">Crear Motor</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AdminMotorCreate;
