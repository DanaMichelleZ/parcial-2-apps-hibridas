import React, { useEffect, useState } from "react";

const AdminVocaloidCreate = () => {
  const [motores, setMotores] = useState([]);
  const [idiomas, setIdiomas] = useState([]);
  const [selectedIdiomas, setSelectedIdiomas] = useState([]);

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

  const handleIdiomaChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedIdiomas((prev) => [...prev, value]);
    } else {
      setSelectedIdiomas((prev) => prev.filter((idioma) => idioma !== value));
    }
  };

  return (
    <div className="admin-page">
      <h1>Crear Vocaloid</h1>
      <form>
        <div>
          <label htmlFor="nombre">Nombre:</label>
          <input type="text" id="nombre" name="nombre" />
        </div>
        <div>
          <label htmlFor="genero">Género:</label>
          <select id="genero" name="genero">
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
            <option value="Desconocido">Desconocido</option>
          </select>
        </div>
        <div>
          <label htmlFor="desarrollador">Desarrollador:</label>
          <input type="text" id="desarrollador" name="desarrollador" />
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
          <input type="date" id="fechaLanzamiento" name="fechaLanzamiento" />
        </div>
        <div>
          <label htmlFor="motor">Motor Asociado:</label>
          <select id="motor" name="motor">
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
          <label htmlFor="imagen">Imagen:</label>
          <input type="file" id="imagen" name="imagen" />
        </div>
        <button type="submit">Crear Vocaloid</button>
      </form>
    </div>
  );
};

export default AdminVocaloidCreate;
