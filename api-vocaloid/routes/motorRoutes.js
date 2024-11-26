const express = require('express');
const router = express.Router();
const { obtenerMotores } = require('../controllers/motorController');

router.get('/', obtenerMotores);

module.exports = router;
