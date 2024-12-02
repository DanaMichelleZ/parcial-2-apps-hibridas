const express = require('express');
const { 
    crearMotor, obtenerMotores, editarMotor, eliminarMotor } = require('../controllers/motorController');

    console.log({ crearMotor, obtenerMotores, editarMotor, eliminarMotor });

const { verificarToken } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', obtenerMotores);
router.post('/', verificarToken, crearMotor);
router.put('/:id', verificarToken, editarMotor);
router.delete('/:id', verificarToken, eliminarMotor);

module.exports = router;
