const MotorVocaloid = require('../models/MotorVocaloid');

const crearMotor = async (req, res) => {
  const { nombreMotor, nombreProducto, idiomas, fechaLanzamiento } = req.body;

  if (!nombreMotor || !Array.isArray(idiomas) || idiomas.length === 0 || !fechaLanzamiento) {
    return res.status(400).json({ error: 'Todos los campos son requeridos.' });
  }

  try {
    const nuevoMotor = new MotorVocaloid({
      nombreMotor,
      nombreProducto,
      idiomas,
      fechaLanzamiento,
    });
    await nuevoMotor.save();
    res.status(201).json(nuevoMotor);
  } catch (error) {
    console.error('Error al crear el motor:', error.message);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

const obtenerMotores = async (req, res) => {
  try {
    const motores = await MotorVocaloid.find();
    res.json(motores);
  } catch (error) {
    console.error('Error al obtener los motores:', error.message);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

module.exports = { crearMotor, obtenerMotores };