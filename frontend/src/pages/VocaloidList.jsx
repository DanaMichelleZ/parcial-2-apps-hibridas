import { useEffect, useState } from "react";
import { getVocaloids } from "../services/api";

export default function VocaloidList() {
  const [vocaloids, setVocaloids] = useState([]);
  const [error, setError] = useState("");


  useEffect(() => {
    getVocaloids()
      .then(setVocaloids)
      .catch((error) => setError(error.message));
  }, []);

 
  if (error) {
    return <p>Error al cargar los Vocaloids: {error}</p>;
  }

  return (
    <div>
      <h2>Listado de Vocaloids</h2>
      {vocaloids.length === 0 ? (
        <p>Cargando Vocaloids...</p>
      ) : (
        <ul>
          {vocaloids.map((vocaloid) => (
            <li key={vocaloid._id}>
              <strong>{vocaloid.nombre}</strong> - Idioma(s):{" "}
              {vocaloid.idioma.join(", ")}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
