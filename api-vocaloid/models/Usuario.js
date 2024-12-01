const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    rol: {
        type: String,
        enum: ['admin', 'usuario'],
        default: 'usuario',
    },
});

const Usuario = mongoose.model('Usuario', UsuarioSchema);

module.exports = Usuario;
