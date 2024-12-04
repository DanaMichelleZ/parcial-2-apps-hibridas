import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AdminVocaloidEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vocaloid, setVocaloid] = useState(null);
  const [nombre, setNombre] = useState("");
  const [genero, setGenero] = useState("Masculino");
  const [desarrollador, setDesarrollador] = useState("");
  const [idiomas, setIdiomas] = useState([]);
  const [selectedIdiomas, setSelectedIdiomas] = useState([]);
  const [fechaLanzamiento, setFechaLanzamiento] = useState("");
  const [motores, setMotores] = useState([]);
  const [motorId, setMotorId] = useState("");

  // Fetch data for the Vocaloid being edited
  useEffect(() => {
    const fetchVocaloid = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/vocaloids/${id}`);
        if (!response.ok) {
          throw new Error("Error al obtener los datos del Vocaloid");
        }
        const vocaloidData = await response.json();
        setVocaloid(vocaloidData);
        setNombre(vocaloidData.nombre);
        setGenero(vocaloidData.genero);
        setDesarrollador(vocaloidData.desarrollador);
        // Verifica que idiomas sea un array y lo asigna correctamente
        setSelectedIdiomas(vocaloidData.idiomas || []); 
        setFechaLanzamiento(vocaloidData.fechaLanzamiento.split("T")[0]);
        setMotorId(vocaloidData.motorId);
      } catch (error) {
        console.error("Error al cargar los datos del Vocaloid:", error);
      }
    };

    fetchVocaloid();
  }, [id]);

  // Fetch available idiomas
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
      }
    };

    fetchIdiomas();
  }, []);

  // Fetch available motores
  useEffect(() => {
    const fetchMotores = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/motores`);
        if (!response.ok) {
          throw new Error("Error al obtener los motores");
        }
        const motoresData = await response.json();
        setMotores(motoresData);
      } catch (error) {
        console.error("Error al obtener los motores:", error);
      }
    };

    fetchMotores();
  }, []);

  // Handle idioma checkbox change
  const handleIdiomaChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedIdiomas((prev) => [...prev, value]);
    } else {
      setSelectedIdiomas((prev) => prev.filter((idioma) => idioma !== value));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Token no encontrado. Por favor, inicia sesión nuevamente.");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/vocaloids/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nombre,
          genero,
          desarrollador,
          idiomas: selectedIdiomas,
          fechaLanzamiento,
          motorId,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar el Vocaloid");
      }

      alert("Vocaloid actualizado correctamente.");
      navigate("/admin/vocaloids");
    } catch (error) {
      console.error("Error al actualizar el Vocaloid:", error);
      alert("Error al actualizar el Vocaloid. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <div className="admin-page">
      <h1>Editar Vocaloid</h1>
      {vocaloid ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="genero">Género:</label>
            <select id="genero" name="genero" value={genero} onChange={(e) => setGenero(e.target.value)}>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
              <option value="Desconocido">Desconocido</option>
            </select>
          </div>
          <div>
            <label htmlFor="desarrollador">Desarrollador:</label>
            <input
              type="text"
              id="desarrollador"
              name="desarrollador"
              value={desarrollador}
              onChange={(e) => setDesarrollador(e.target.value)}
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
          <div>
            <label htmlFor="motor">Motor Asociado:</label>
            <select id="motor" name="motor" value={motorId} onChange={(e) => setMotorId(e.target.value)}>
              <option value="">Seleccionar Motor</option>
              {motores.length > 0 &&
                motores.map((motor) => (
                  <option key={motor._id || motor.id} value={motor._id || motor.id}>
                    {motor.nombreMotor}
                  </option>
                ))}
            </select>
          </div>
          <button type="submit">Guardar Cambios</button>
        </form>
      ) : (
        <p>Cargando datos del Vocaloid...</p>
      )}
    </div>
  );
};

export default AdminVocaloidEdit;
