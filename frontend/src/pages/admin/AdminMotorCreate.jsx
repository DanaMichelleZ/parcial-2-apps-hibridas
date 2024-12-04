import React, { useState, useEffect } from "react"; //useState me estiona los estados locales del comp uwu
import { useNavigate } from "react-router-dom";

const AdminMotorCreate = () => {
  const [nombreMotor, setNombreMotor] = useState("");
  const [idiomas, setIdiomas] = useState([]);
  const [selectedIdiomas, setSelectedIdiomas] = useState([]);
  const [fechaLanzamiento, setFechaLanzamiento] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchIdiomas = async () => {
      try {
        //Soli GET
        const response = await fetch(`${import.meta.env.VITE_API_URL}/idiomas`);
        if (!response.ok) {
          throw new Error("Error al obtener los idiomas.");
        }
        const idiomasData = await response.json();
        setIdiomas(idiomasData);
      } catch (error) {
        console.error("Error al obtener los idiomas:", error);
      }
    };

    fetchIdiomas();
  }, []);
  
  // handleIdiomaChange se ejecuta cuando un idioma es seleccionado o deseleccionado en el form
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

    // Primero realiza validaciones basiquitas verificando que los campitos obligatorios esten completados
    if (!nombreMotor || selectedIdiomas.length === 0 || !fechaLanzamiento) {
      setMessage("Por favor, completa todos los campos.");
      return;
    }
    //Verifica que exista un token de autenticacion en el localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("Token no encontrado. Por favor, inicia sesión.");
      return;
    }

    try {
      //Soli POST
      const response = await fetch(`${import.meta.env.VITE_API_URL}/motores`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nombreMotor,
          idiomas: selectedIdiomas,
          fechaLanzamiento,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al crear el motor.");
      }

      setMessage("Motor creado con éxito.");
      setNombreMotor("");
      setSelectedIdiomas([]);
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
        <button type="submit">Crear Motor</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AdminMotorCreate;
