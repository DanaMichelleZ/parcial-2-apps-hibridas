const AdminVocaloidCreate = () => {
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
            <label htmlFor="idiomas">Idiomas:</label>
            <input type="text" id="idiomas" name="idiomas" placeholder="Separar por comas" />
          </div>
          <div>
            <label htmlFor="fechaLanzamiento">Fecha de Lanzamiento:</label>
            <input type="date" id="fechaLanzamiento" name="fechaLanzamiento" />
          </div>
          <div>
            <label htmlFor="motor">Motor Asociado:</label>
            <input type="text" id="motor" name="motor" />
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
  