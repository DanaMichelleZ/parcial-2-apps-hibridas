const express = require('express');
const { obtenerIdiomas } = require('../controllers/idiomasController');
const router = express.Router();

router.get('/', obtenerIdiomas);

module.exports = router;
