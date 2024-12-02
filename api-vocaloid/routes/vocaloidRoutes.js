const express = require('express');
const {
    crearVocaloid,
    obtenerVocaloids,
    obtenerVocaloidPorId,
    eliminarVocaloid,
    actualizarVocaloid
} = require('../controllers/vocaloidController');

console.log({ crearVocaloid, obtenerVocaloids, obtenerVocaloidPorId, eliminarVocaloid, actualizarVocaloid });

const { verificarToken } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', obtenerVocaloids);
router.get('/:id', obtenerVocaloidPorId);
router.post('/', verificarToken, crearVocaloid);
router.put('/:id', verificarToken, actualizarVocaloid);
router.delete('/:id', verificarToken, eliminarVocaloid);

module.exports = router;
