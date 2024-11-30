const express = require('express');
const { crearMotor, obtenerMotores, editarMotor, eliminarMotor } = require('../controllers/motorController');
const verificarToken = require('../middlewares/authMiddleware');

const router = express.Router();

// Rutas para los motores
router.post('/', verificarToken, crearMotor);
router.get('/', obtenerMotores);
router.put('/:id', verificarToken, editarMotor);
router.delete('/:id', verificarToken, eliminarMotor);

module.exports = router;
