const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');

const registrarUsuario = async (req, res) => {
    const { nombre, email, password } = req.body;
    console.log(password);

    try {
        //Esto es para comprobar si ya existe el usuario, hace la busqueda mediante ususario y mail :3
        let usuario = await Usuario.findOne({ email });
        if (usuario) {
            return res.status(400).json({ error: 'El usuario ya existe' }); //Si ya existe entonces error uwu
        }

        //Es para la creacion de uno nuevo
        usuario = new Usuario({ nombre, email, password });

        const salt = await bcrypt.genSalt(10);
        usuario.password = await bcrypt.hash(password, salt);

        //Guardamos usuario en base de datos
        await usuario.save();

        //Para generar el toker JWT :3
        const payload = { usuario: { id: usuario.id } };
        const token = jwt.sign(
            { usuario: { id: usuario.id } },
            process.env.JWT_SECRET,
            { expiresIn: '1h' } //El token expira en una hora
        );

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

        //Aca te compara la contra ingresada con la que esta encriptada :v
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
