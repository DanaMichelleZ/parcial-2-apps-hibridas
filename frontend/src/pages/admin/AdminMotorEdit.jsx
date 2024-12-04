import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AdminMotorEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [motor, setMotor] = useState(null);
  const [nombreMotor, setNombreMotor] = useState("");
  const [idiomas, setIdiomas] = useState([]);
  const [selectedIdiomas, setSelectedIdiomas] = useState([]);
  const [fechaLanzamiento, setFechaLanzamiento] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchMotor = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/motores/${id}`);
        if (!response.ok) {
          throw new Error("Error al obtener los datos del motor");
        }
        const motorData = await response.json();
        setMotor(motorData);
        setNombreMotor(motorData.nombreMotor || "");
        setSelectedIdiomas(motorData.idiomas || []);
        setFechaLanzamiento(motorData.fechaLanzamiento ? motorData.fechaLanzamiento.split("T")[0] : "");
      } catch (error) {
        console.error("Error al cargar los datos del motor:", error);
        setErrorMessage("No se pudo cargar los datos del motor.");
      }
    };

    fetchMotor();
  }, [id]);

  useEffect(() => {
    const fetchIdiomas = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/idiomas`);
        if (!response.ok) {
          throw new Error("Error al obtener los idiomas");
        }
        const idiomasData = await response.json();
        setIdiomas(idiomasData);
      } catch (error) {
        console.error("Error al obtener los idiomas:", error);
        setErrorMessage("No se pudo cargar los idiomas.");
      }
    };

    fetchIdiomas();
  }, []);


  const handleIdiomaChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedIdiomas((prev) => [...prev, value]);
    } else {
      setSelectedIdiomas((prev) => prev.filter((idioma) => idioma !== value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones
    if (!nombreMotor || !selectedIdiomas.length || !fechaLanzamiento) {
      setErrorMessage("Todos los campos son obligatorios.");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/motores/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          nombreMotor,
          idiomas: selectedIdiomas,
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
      setErrorMessage("Error al actualizar el motor. Inténtalo de nuevo.");
    }
  };

  return (
    <div className="admin-page">
      <h1>Editar Motor</h1>
      {motor ? (
        <form onSubmit={handleSubmit}>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>} {/* Mostrar errores */}

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
            <label>Idiomas:</label>
            {idiomas.length > 0 ? (
              idiomas.map((idioma) => (
                <div key={idioma}>
                  <input
                    type="checkbox"
                    id={`idioma-${idioma}`}
                    value={idioma}
                    checked={selectedIdiomas.includes(idioma)}
                    onChange={handleIdiomaChange}
                  />
                  <label htmlFor={`idioma-${idioma}`}>{idioma}</label>
                </div>
              ))
            ) : (
              <p>Cargando idiomas...</p>
            )}
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
        <p>{errorMessage || "Cargando datos del motor..."}</p>
      )}
    </div>
  );
};

export default AdminMotorEdit;
