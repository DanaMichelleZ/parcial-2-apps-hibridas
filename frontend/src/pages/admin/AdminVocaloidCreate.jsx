import React, { useEffect, useState } from "react";

const AdminVocaloidCreate = () => {
  const [motores, setMotores] = useState([]);
  const [idiomas, setIdiomas] = useState([]);
  const [selectedIdiomas, setSelectedIdiomas] = useState([]);
  const [nombre, setNombre] = useState("");
  const [genero, setGenero] = useState("Masculino");
  const [desarrollador, setDesarrollador] = useState("");
  const [fechaLanzamiento, setFechaLanzamiento] = useState("");
  const [motorId, setMotorId] = useState("");
  const [versionMotor, setVersionMotor] = useState("");
  const [message, setMessage] = useState("");


  useEffect(() => {
    const fetchMotores = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/motores`);
        if (!response.ok) {
          throw new Error("Error al obtener los motores");
        }
        const motoresObtenidos = await response.json();
        setMotores(motoresObtenidos);
      } catch (error) {
        console.error("Error al obtener los motores:", error);
      }
    };

    fetchMotores();
  }, []);

  useEffect(() => {
    const fetchIdiomas = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/idiomas`);
        if (!response.ok) {
          throw new Error("Error al obtener los idiomas");
        }
        const idiomasObtenidos = await response.json();
        setIdiomas(idiomasObtenidos);
      } catch (error) {
        console.error("Error al obtener los idiomas:", error);
      }
    };

    fetchIdiomas();
  }, []);


  useEffect(() => {
    if (motorId) {
      const motorSeleccionado = motores.find((motor) => motor._id === motorId);
      if (motorSeleccionado) {
        setVersionMotor(motorSeleccionado.versionMotor);
      }
    }
  }, [motorId, motores]);

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
    setMessage("");

    if (!nombre || !desarrollador || !fechaLanzamiento || !motorId || !versionMotor) {
      setMessage("Por favor, completa todos los campos obligatorios.");
      console.log("Campos faltantes:", { nombre, desarrollador, fechaLanzamiento, motorId, versionMotor });
      return;
    }

    const imagenPerfil = "/images/prueba.png";
    const imagenCuerpoCompleto = "/images/prueba.png";

    console.log("Datos a enviar:", {
      nombre,
      genero,
      desarrollador,
      idiomas: selectedIdiomas,
      fechaLanzamiento,
      motorId,
      versionMotor,
      imagenPerfil,
      imagenCuerpoCompleto,
    });

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/vocaloids`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          nombre,
          genero,
          desarrollador,
          idiomas: selectedIdiomas,
          fechaLanzamiento,
          motorId,
          versionMotor,
          imagenPerfil,
          imagenCuerpoCompleto,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al crear el Vocaloid.");
      }

      setMessage("Vocaloid creado con éxito.");
      setNombre("");
      setGenero("Masculino");
      setDesarrollador("");
      setSelectedIdiomas([]);
      setFechaLanzamiento("");
      setMotorId("");
      setVersionMotor("");
    } catch (error) {
      console.error("Error al crear Vocaloid:", error);
      setMessage("Error al crear el Vocaloid. Inténtalo de nuevo.");
    }
  };

  return (
    <div className="admin-page">
      <h1>Crear Vocaloid</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="genero">Género:</label>
          <select
            id="genero"
            value={genero}
            onChange={(e) => setGenero(e.target.value)}
          >
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
                  onChange={handleIdiomaChange}
                  checked={selectedIdiomas.includes(idioma)}
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
            value={fechaLanzamiento}
            onChange={(e) => setFechaLanzamiento(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="motor">Motor Asociado:</label>
          <select
            id="motor"
            value={motorId}
            onChange={(e) => setMotorId(e.target.value)}
          >
            <option value="">Selecciona un motor</option>
            {motores.length > 0 ? (
              motores.map((motor) => (
                <option key={motor._id || motor.id} value={motor._id || motor.id}>
                  {motor.nombreMotor}
                </option>
              ))
            ) : (
              <option value="">Cargando motores...</option>
            )}
          </select>
        </div>
        <div>
          <label htmlFor="versionMotor">Versión del Motor:</label>
          <input
            type="text"
            id="versionMotor"
            value={versionMotor}
            onChange={(e) => setVersionMotor(e.target.value)}
            placeholder="Escribe la versión del motor"
          />
        </div>
        <button type="submit">Crear Vocaloid</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default AdminVocaloidCreate;