import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AdminMotorEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [motor, setMotor] = useState(null);
  const [nombreMotor, setNombreMotor] = useState("");
  const [idiomas, setIdiomas] = useState("");
  const [fechaLanzamiento, setFechaLanzamiento] = useState("");

  useEffect(() => {
    const fetchMotor = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/motores/${id}`);
        if (!response.ok) {
          throw new Error("Error al obtener los datos del motor");
        }
        const motorData = await response.json();
        setMotor(motorData);
        setNombreMotor(motorData.nombreMotor);
        setIdiomas(motorData.idiomas.join(", "));
        setFechaLanzamiento(motorData.fechaLanzamiento.split("T")[0]);
      } catch (error) {
        console.error("Error al cargar los datos del motor:", error);
      }
    };

    fetchMotor();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/motores/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          nombreMotor,
          idiomas: idiomas.split(",").map((idioma) => idioma.trim()),
          fechaLanzamiento,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar el motor");
      }

      alert("Motor actualizado correctamente.");
      navigate("/admin/motores");
    } catch (error) {
      console.error("Error al actualizar el motor:", error);
      alert("Error al actualizar el motor. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <div className="admin-page">
      <h1>Editar Motor</h1>
      {motor ? (
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
          <button type="submit">Guardar Cambios</button>
        </form>
      ) : (
        <p>Cargando datos del motor...</p>
      )}
    </div>
  );
};

export default AdminMotorEdit;
