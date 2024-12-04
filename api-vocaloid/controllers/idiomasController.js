const obtenerIdiomas = async (req, res) => {
// define una lista estatica, son un arreglo que contiene los nombres de varios idiomas 
  try {
    const idiomas = ['Inglés', 'Japonés', 'Español', 'Coreano', 'Chino'];
    // enviamos esta lista como respuesta en formato JSON 
    res.json(idiomas);
  } catch (error) {
    console.error('Error al obtener los idiomas:', error.message);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

module.exports = { obtenerIdiomas };
