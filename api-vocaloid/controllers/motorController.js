const MotorVocaloid = require('../models/MotorVocaloid');
//Registramos en la base de datos :3
const crearMotor = async (req, res) => {
  const { nombreMotor, nombreProducto, idiomas, fechaLanzamiento } = req.body;

  //Validamos los datitos para crear un motor, comprobando que los campitos requeridos si esten presentes
  if (!nombreMotor || !Array.isArray(idiomas) || idiomas.length === 0 || !fechaLanzamiento) {
    return res.status(400).json({ error: 'Todos los campos son requeridos.' });
  }

  //Si valida, se crea un nuevo documento con los datos
  try {
    const nuevoMotor = new MotorVocaloid({
      nombreMotor,
      nombreProducto,
      idiomas,
      fechaLanzamiento,
    });

    //Se guarda en la base de datos>:D
    await nuevoMotor.save();
    res.status(201).json(nuevoMotor);
  } catch (error) { //El manejo de error
    console.error('Error al crear el motor:', error.message);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

const obtenerMotores = async (req, res) => {
  try {
    //Metodowo find pa obtener todos los docs de la coleccion MotorVocaloid 
    const motores = await MotorVocaloid.find();
    res.json(motores);
  } catch (error) {
    console.error('Error al obtener los motores:', error.message);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

// funcion que hace solicitud GET pa obtener un motor por su ID :3
const obtenerMotorPorId = async (req, res) => {
  const { id } = req.params; // Obtiene ID del motor
  try {
    // MEetodo findById() busca el motor por ID en la base
    const motor = await MotorVocaloid.findById(id);

    if (!motor) {
      return res.status(404).json({ error: 'Motor no encontrado' });
    }
    // Si encuentra responde con el motor encontrado en formato JSON
    res.json(motor); 
  } catch (error) {
    console.error('Error al obtener el motor:', error.message);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

//Manejamo solicitud PUT  pa actuaslizar lso datitos de un motor
const editarMotor = async (req, res) => {
  //Extraemo el ID del motor 
  const { id } = req.params;
  const { nombreMotor, nombreProducto, idiomas, fechaLanzamiento } = req.body;

  // Validaciones basicas :3
  if (!nombreMotor || !Array.isArray(idiomas) || idiomas.length === 0 || !fechaLanzamiento) {
    return res.status(400).json({ error: 'Todos los campos son requeridos.' });
  }

  try {
    //Valido = metodo findByIdAndUpdate para actualizar el motor en la base :3
    const motorActualizado = await MotorVocaloid.findByIdAndUpdate(
      id,
      { nombreMotor, nombreProducto, idiomas, fechaLanzamiento },
      //devuelve el doc actualizado y asegura que validan los datos antes de actualizar uwu
      { new: true, runValidators: true } 
    );

    if (!motorActualizado) {
      return res.status(404).json({ error: 'Motor no encontrado.' });
    }

    res.json(motorActualizado);
  } catch (error) {
    console.error('Error al actualizar el motor:', error.message);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};


//Manejamo solicitud DELETE
const eliminarMotor = async (req, res) => {
  const { id } = req.params; //De aca obtenemo el ID del motor que se necesite eliminar

  try {
    const motorEliminado = await MotorVocaloid.findByIdAndDelete(id); //metodo para edilimar el motor

    if (!motorEliminado) {
      return res.status(404).json({ error: 'Motor no encontrado.' });
    }
    res.json({ mensaje: 'Motor eliminado con éxito.' });
  } catch (error) {
    console.error('Error al eliminar el motor:', error.message);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};



module.exports = { crearMotor, obtenerMotores, editarMotor, eliminarMotor, obtenerMotorPorId };