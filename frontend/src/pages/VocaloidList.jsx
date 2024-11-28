import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getVocaloids } from "../services/api";

export default function VocaloidList() {
  const [vocaloids, setVocaloids] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getVocaloids()
      .then(setVocaloids)
      .catch((error) => setError(error.message));
  }, []);

  const handleViewMore = (id) => {
    navigate(`/vocaloids/${id}`);
  };

  if (error) {
    return <p>Error al cargar los Vocaloids: {error}</p>;
  }

  return (
    <section>
      <h2>Listado de Vocaloids</h2>
      {vocaloids.length === 0 ? (
        <p>Cargando Vocaloids...</p>
      ) : (
        <div id="vocaloid-list">
          {vocaloids.map((vocaloid) => (
            <div key={vocaloid._id} className="vocaloid-item">
              <h3>{vocaloid.nombre}</h3>
              <button onClick={() => handleViewMore(vocaloid._id)}>
                Ver más
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
