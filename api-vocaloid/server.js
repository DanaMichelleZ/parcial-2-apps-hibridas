require('dotenv').config();

const express = require('express');
const cors = require('cors');
const conectarDB = require('./config/db');
const vocaloidRoutes = require('./routes/vocaloidRoutes');
const authRoutes = require('./routes/authRoutes');
const motorRoutes = require('./routes/motorRoutes');
const path = require('path');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());


conectarDB();

app.use(express.static(path.join(__dirname, 'public')));

app.use('/vocaloids', vocaloidRoutes);

app.use('/motores', motorRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use('/auth', authRoutes);

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});
