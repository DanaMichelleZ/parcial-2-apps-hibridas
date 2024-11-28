const express = require('express');
const { crearMotor, obtenerMotores } = require('../controllers/motorController');

const router = express.Router();

router.post('/', crearMotor);
router.get('/', obtenerMotores);

module.exports = router;
