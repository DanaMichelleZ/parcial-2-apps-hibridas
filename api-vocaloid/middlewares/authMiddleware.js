const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
    //Verificamos si el authorization tiene un token :3
    const token = req.header('Authorization')?.replace('Bearer ', ''); //Si el token comienza con la palabra clave Bearer la elimina para obtener solo el token JWT
    if (!token) {
        return res.status(401).json({ mensaje: 'Acceso denegado. Token requerido.' }); //sino 404
    }

    try {
        const verificado = jwt.verify(token, process.env.JWT_SECRET); //verificamos el token con la libreria jsonwebtoken, la clave se decodifica
        req.usuario = verificado.usuario; // y si es valido se almacena en req.usuario :3
        next();
    } catch (error) {
        res.status(401).json({ mensaje: 'Token inválido.' }); //sino 404
    }
};

module.exports = verificarToken;
