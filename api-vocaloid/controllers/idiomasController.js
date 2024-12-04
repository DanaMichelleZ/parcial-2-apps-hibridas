const obtenerIdiomas = async (req, res) => {
  try {
    const idiomas = ['Inglés', 'Japonés', 'Español', 'Coreano', 'Chino'];
    res.json(idiomas);
  } catch (error) {
    console.error('Error al obtener los idiomas:', error.message);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

module.exports = { obtenerIdiomas };
