const express = require('express');
const { 
    crearMotor,
    obtenerMotores,
    editarMotor,
    eliminarMotor,
    obtenerMotorPorId 
} = require('../controllers/motorController');

const { verificarToken } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', obtenerMotores);
router.get('/:id', obtenerMotorPorId);
router.post('/', verificarToken, crearMotor);
router.put('/:id', verificarToken, editarMotor);
router.delete('/:id', verificarToken, eliminarMotor);

module.exports = router;
