const MotorVocaloid = require('../models/MotorVocaloid');
//Registramos en la base de datos :3
const crearMotor = async (req, res) => {
  const { nombreMotor, nombreProducto, idiomas, fechaLanzamiento } = req.body;

  //Validamos los datitos para crear un motor, comprobando que los campitos requeridos si esten presentes
  if (!nombreMotor || !Array.isArray(idiomas) || idiomas.length === 0 || !fechaLanzamiento) {
    return res.status(400).json({ error: 'Todos los campos son requeridos.' });
  }

  //Se crea un nuevo objeto con los datos
  try {
    const nuevoMotor = new MotorVocaloid({
      nombreMotor,
      nombreProducto,
      idiomas,
      fechaLanzamiento,
    });

    await nuevoMotor.save(); //Lo guarda >:D
    res.status(201).json(nuevoMotor);
  } catch (error) { //El manejo de error
    console.error('Error al crear el motor:', error.message);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

const obtenerMotores = async (req, res) => {
  try {
    const motores = await MotorVocaloid.find(); //Metodo find para obtener todos los docs de la coleccion MotorVocaloid 
    res.json(motores);
  } catch (error) {
    console.error('Error al obtener los motores:', error.message);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

module.exports = { crearMotor, obtenerMotores };