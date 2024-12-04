import { useState, useEffect } from "react";

export default function MotorList() {
  const [motores, setMotores] = useState([]); //almacena lista de motores
  const [error, setError] = useState(""); //almacena msj de error en caso de falla

  //Hook carga de datos de mi API
  useEffect(() => {
    //func asincrona se encarga de hacer solicitud HTTP a mi API 
    const fetchMotores = async () => {
      try {
        console.log("Fetching motores from:", import.meta.env.VITE_API_URL);
        //solicitud HTTP al endpoint de mi AP
        const res = await fetch(`${import.meta.env.VITE_API_URL}/motores`);
        if (!res.ok) {
          throw new Error(`Error al obtener los motores: ${res.statusText}`);
        }
        const data = await res.json();
        setMotores(data);
      } catch (err) {
        console.error("Error fetching motores:", err);
        setError(err.message);
      }
    };
    fetchMotores();
  }, []);

  if (error) {
    return <p>Error al cargar los motores: {error}</p>;
  }

  if (!error && motores.length === 0) {
    return <p>No hay motores disponibles para mostrar.</p>;
  }

  return (
    <div>
      <h2>Motores Registrados</h2>
      <table className="motor-table">
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
