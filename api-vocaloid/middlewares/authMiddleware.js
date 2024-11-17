const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
    let token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ mensaje: 'Acceso denegado, se requiere un token.' });
    }

    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }

    try {
        const verificado = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = verificado.usuario;
        next();
    } catch (error) {
        res.status(400).json({ mensaje: 'Token no válido.' });
    }
};

module.exports = verificarToken;
