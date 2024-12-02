const mongoose = require('mongoose');

const MotorVocaloidSchema = new mongoose.Schema({
  nombreMotor: {
    type: String,
    required: true,
  },
  nombreProducto: {
    type: String,
    required: false,
  },
  idiomas: {
    type: [String],
    required: true,
  },
  fechaLanzamiento: {
    type: Date,
    required: true,
  },
}, { collection: 'motores_vocaloid' });

const MotorVocaloid = mongoose.model('motores_vocaloid', MotorVocaloidSchema); //se creo el modelo con el esquema que defini antes

module.exports = MotorVocaloid;