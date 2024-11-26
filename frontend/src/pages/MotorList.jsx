import { useState, useEffect } from "react";

export default function MotorList() {
  const [motores, setMotores] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/motores`)
      .then((res) => res.json())
      .then(setMotores)
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return <p>Error al cargar los motores: {error}</p>;
  }

  return (
    <div>
      <h2>Lista de Motores Vocaloid</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre del Motor</th>
            <th>Producto</th>
            <th>Idiomas</th>
            <th>Fecha de Lanzamiento</th>
          </tr>
        </thead>
        <tbody>
          {motores.map((motor) => (
            <tr key={motor._id}>
              <td>{motor.nombreMotor}</td>
              <td>{motor.nombreProducto || "No disponible"}</td>
              <td>{motor.idiomas.join(", ")}</td>
              <td>{new Date(motor.fechaLanzamiento).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
