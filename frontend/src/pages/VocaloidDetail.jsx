import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getVocaloidById } from "../services/api";

export default function VocaloidDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vocaloid, setVocaloid] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getVocaloidById(id)
      .then(setVocaloid)
      .catch((error) => setError(error.message));
  }, [id]);

  if (error) {
    return <p>Error al cargar el Vocaloid: {error}</p>;
  }

  if (!vocaloid) {
    return <p>Cargando detalles del Vocaloid...</p>;
  }

  return (
    <div>
      <h2>Detalles de {vocaloid.nombre}</h2>
      <p>Género: {vocaloid.genero}</p>
      <p>Desarrollador: {vocaloid.desarrollador}</p>
      <p>Idiomas: {vocaloid.idiomas.join(", ")}</p>
      <p>
        Fecha de lanzamiento:{" "}
        {new Date(vocaloid.fechaLanzamiento).toLocaleDateString()}
      </p>
      <p>Versión del Motor: {vocaloid.versionMotor}</p>
      <img
        src={`${import.meta.env.VITE_API_URL}${vocaloid.imagenPerfil}`}
        alt={vocaloid.nombre}
      />
      <button onClick={() => navigate(-1)}>Volver Atrás</button>
    </div>
  );
}
