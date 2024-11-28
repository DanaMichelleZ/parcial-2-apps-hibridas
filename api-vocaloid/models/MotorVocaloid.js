const mongoose = require('mongoose');

//Con MotorVocaloid yo puedo hacer solicitudes en postman para la base de datos para crear un nuevo motor
const MotorVocaloidSchema = new mongoose.Schema({
  nombreMotor: {
    type: String,
    required: true,
  },
  nombreProducto: {
    type: String, // nombre del producto asociado al motor
    required: false,
  },
  idiomas: {
    type: [String],
    required: true, // al menos un idioma soportado por el motor tiene que haber
  },
  fechaLanzamiento: {
    type: Date, // la fecha de lanzamiento del motor
    required: true,
  },
}, { collection: 'motores_vocaloid' }); //los datos se guardan en la coleccion de aca

const MotorVocaloid = mongoose.model('motores_vocaloid', MotorVocaloidSchema); //se creo el modelo con el esquema que defini antes

module.exports = MotorVocaloid;