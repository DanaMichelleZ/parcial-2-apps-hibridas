const jwt = require('jsonwebtoken');

// Middleware para verificar el token JWT :3
const verificarToken = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) { // Verifica que el token exista y tenga el formato correctirijillo
        return res.status(401).json({ mensaje: 'Encabezado de autorización no válido.' });
    }

    const token = authHeader.replace('Bearer ', ''); // Remueve el prefijo Bearer
    try {
        const verificado = jwt.verify(token, process.env.JWT_SECRET); // Decodifica el token con la clave secreta
        req.usuario = verificado.usuario; // Almacena la info del usuario en req.usuario
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ mensaje: 'Token expirado.' });
        } else if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ mensaje: 'Token inválido.' });
        }
        return res.status(500).json({ mensaje: 'Error interno al verificar el token.' });
    }
};

const verificarAdmin = (req, res, next) => {
    if (req.usuario.role !== 'admin') { // Verificamos si el rol del usuario es admin duuh
        return res.status(403).json({ mensaje: 'Acceso denegado. Requiere rol de administrador.' });
    }
    next();
};

module.exports = { verificarToken, verificarAdmin };