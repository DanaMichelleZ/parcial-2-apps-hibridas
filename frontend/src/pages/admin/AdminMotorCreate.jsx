import React from "react";

const AdminMotorCreate = () => {
  return (
    <div className="admin-page">
      <h1>Crear Motor</h1>
      <form>
        <div>
          <label htmlFor="nombreMotor">Nombre del Motor:</label>
          <input type="text" id="nombreMotor" name="nombreMotor" />
        </div>
        <div>
          <label htmlFor="idiomas">Idiomas:</label>
          <input type="text" id="idiomas" name="idiomas" placeholder="Separar por comas" />
        </div>
        <div>
          <label htmlFor="fechaLanzamiento">Fecha de Lanzamiento:</label>
          <input type="date" id="fechaLanzamiento" name="fechaLanzamiento" />
        </div>
        <button type="submit">Crear Motor</button>
      </form>
    </div>
  );
};

export default AdminMotorCreate;
