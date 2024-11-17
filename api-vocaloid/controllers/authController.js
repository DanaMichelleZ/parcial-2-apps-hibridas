const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');

const registrarUsuario = async (req, res) => {
    const { nombre, email, password } = req.body;
    console.log(password);

    try {
        let usuario = await Usuario.findOne({ email });
        if (usuario) {
            return res.status(400).json({ error: 'El usuario ya existe' });
        }

        usuario = new Usuario({ nombre, email, password });

        const salt = await bcrypt.genSalt(10);
        usuario.password = await bcrypt.hash(password, salt);

        await usuario.save();

        const payload = { usuario: { id: usuario.id } };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        console.error('Error en el registro:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

const loginUsuario = async (req, res) => {
    const { email, password } = req.body;

    try {
        let usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(400).json({ error: 'Usuario no encontrado' });
        }

        const esCorrecta = await bcrypt.compare(password, usuario.password);
        if (!esCorrecta) {
            return res.status(400).json({ error: 'Contraseña incorrecta' });
        }

        const payload = { usuario: { id: usuario.id } };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        console.error('Error en el login:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

module.exports = { registrarUsuario, loginUsuario };
