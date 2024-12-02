const express = require('express');
const { registrarUsuario, loginUsuario } = require('../controllers/authController');
const Usuario = require("../models/Usuario");

const router = express.Router();

router.post('/register', registrarUsuario);
router.post('/login', loginUsuario);
router.get('/usuarios', async (req, res) => {
    try {
        const usuarios = await Usuario.find({}, 'nombre email role');
        res.json(usuarios);
    } catch (error) {
        console.error('Error al obtener los usuarios:', error.message);
        res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
});

module.exports = router;
