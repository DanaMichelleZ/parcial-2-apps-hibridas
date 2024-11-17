require('dotenv').config();

const express = require('express');
const conectarDB = require('./config/db');
const vocaloidRoutes = require('./routes/vocaloidRoutes');
const authRoutes = require('./routes/authRoutes');
const path = require('path');

const app = express();
const port = 3000;


app.use(express.json());


conectarDB();


app.use(express.static(path.join(__dirname, 'public')));


app.use('/vocaloids', vocaloidRoutes);


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.use('/auth', authRoutes);


app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});
