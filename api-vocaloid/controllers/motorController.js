const MotorVocaloid = require('../models/MotorVocaloid');

const obtenerMotores = async (req, res) => {
  try {
    const motores = await MotorVocaloid.find();
    res.json(motores);
  } catch (error) {
    console.error('Error al obtener los motores:', error);
    res.status(500).json({ error: 'Error al obtener los motores' });
  }
};

module.exports = {
  obtenerMotores,
};
