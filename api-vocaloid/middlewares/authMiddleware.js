const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ mensaje: 'Acceso denegado. Token requerido.' });
    }

    try {
        const verificado = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = verificado.usuario;
        next();
    } catch (error) {
        res.status(401).json({ mensaje: 'Token inválido.' });
    }
};

module.exports = verificarToken;
