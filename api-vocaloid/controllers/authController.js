const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/Usuario");

const registrarUsuario = async (req, res) => {
    const { nombre, email, password } = req.body;

    try {
        // Validamos los campos ademas de que son obligatorios >:3
        if (!nombre || !email || !password) {
            return res.status(400).json({ error: "Todos los campos son obligatorios." });
        }
        
        // Verificamos si el formato del correo es valido con una expresionowo regular
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "El formato del email es inválido." });
        }

        // Verificamos si ya existe el usuario
        let usuario = await Usuario.findOne({ email });
        if (usuario) {
            return res.status(400).json({ error: "El usuario ya existe." });
        }

        // Crea un nuevo usuario
        usuario = new Usuario({ nombre, email, password });
        // Encriptamos la contraseña shhhh uwu
        const salt = await bcrypt.genSalt(10);
        usuario.password = await bcrypt.hash(password, salt);
        // Guardamos el usuario en la base de datos uwu
        await usuario.save();

        // Crea un payload con el id y el rol del usuario
        const payload = {
            usuario: { id: usuario.id, rol: usuario.rol },
        };
        // Se genera el token JWT
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" }); // Hacemos que expire en 1 hora
        //el token se envaa en una respuesta JSON
        res.json({ token, rol: usuario.rol, id: usuario.id });
    } catch (error) {
        console.error("Error en el registro:", error);
        res.status(500).json({ error: "No se pudo registrar al usuario. Inténtalo más tarde." });
    }
};

//Aca  recibimos una solicitud HTTP POST uwu
const loginUsuario = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Validamos campos
        if (!email || !password) {
            return res.status(400).json({ error: "Email y contraseña son obligatorios." });
        }
        //Validamos campos
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(400).json({ error: "Usuario no encontrado." });
        }

        // Comparamos password
        const esCorrecta = await bcrypt.compare(password, usuario.password);
        if (!esCorrecta) {
            return res.status(400).json({ error: "Contraseña incorrecta." });
        }

        // Contraseña correcta = se genera nuevo token JWT
        const payload = {
            usuario: { id: usuario.id, role: usuario.role },
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ token, role: usuario.role, id: usuario.id });
    } catch (error) {
        console.error("Error en el login:", error);
        res.status(500).json({ error: "No se pudo iniciar sesión. Inténtalo más tarde." });
    }
};

module.exports = { registrarUsuario, loginUsuario };
