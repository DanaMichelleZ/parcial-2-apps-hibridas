const AdminVocaloidList = () => {
    const vocaloids = [
      { id: 1, nombre: "Hatsune Miku", desarrollador: "Crypton Future Media" },
      { id: 2, nombre: "Kagamine Rin", desarrollador: "Crypton Future Media" },
    ];
  
    return (
      <div className="admin-page">
        <h1>Lista de Vocaloids</h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Desarrollador</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {vocaloids.map((vocaloid) => (
              <tr key={vocaloid.id}>
                <td>{vocaloid.id}</td>
                <td>{vocaloid.nombre}</td>
                <td>{vocaloid.desarrollador}</td>
                <td>
                  <button onClick={() => console.log("Editar", vocaloid.id)}>Editar</button>
                  <button onClick={() => console.log("Eliminar", vocaloid.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default AdminVocaloidList;
  