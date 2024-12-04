const express = require('express');
const mongoose = require('mongoose');
const { registrarUsuario, loginUsuario } = require('../controllers/authController');
const Usuario = require('../models/Usuario');
const { verificarToken } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', registrarUsuario);
router.post('/login', loginUsuario);
router.get('/usuarios', async (req, res) => {
  try {
    const usuarios = await Usuario.find({}, 'nombre email role');
    res.json(usuarios);
  } catch (error) {
    console.error('Error al obtener los usuarios:', error.message);
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
});

router.get('/usuarios/:id', verificarToken, async (req, res) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ error: 'ID inválido.' });
      }
  
      const usuario = await Usuario.findById(req.params.id, 'nombre email role');
      if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado.' });
      }
      res.json(usuario);
    } catch (error) {
      console.error('Error al obtener el usuario:', error.message);
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  });
  
  router.post("/usuarios", verificarToken, async (req, res) => {
    try {
      const { nombre, email, password, rol } = req.body;
  
      // Validación rápida
      if (!nombre || !email || !password) {
        return res.status(400).json({ error: "Todos los campos son obligatorios." });
      }
  
      // Verificar si el usuario ya existe
      const existeUsuario = await Usuario.findOne({ email });
      if (existeUsuario) {
        return res.status(400).json({ error: "El email ya está registrado." });
      }
  
      // Crear nuevo usuario
      const nuevoUsuario = new Usuario({ nombre, email, password, role: rol || "user" });
      await nuevoUsuario.save();
  
      res.status(201).json({ mensaje: "Usuario creado con éxito.", usuario: nuevoUsuario });
    } catch (error) {
      console.error("Error al crear usuario:", error.message);
      res.status(500).json({ error: "Error al crear el usuario." });
    }
  });

  router.put('/usuarios/:id', verificarToken, async (req, res) => {
    try {
      const { id } = req.params;
  
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'ID inválido.' });
      }
  
      const { nombre, email, role } = req.body;
      const usuarioActualizado = await Usuario.findByIdAndUpdate(
        id,
        { nombre, email, role },
        { new: true, runValidators: true }
      );
  
      if (!usuarioActualizado) {
        return res.status(404).json({ error: 'Usuario no encontrado.' });
      }
  
      res.json({ mensaje: 'Usuario actualizado correctamente.', usuario: usuarioActualizado });
    } catch (error) {
      console.error('Error al actualizar el usuario:', error.message);
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  });
  
  router.delete('/usuarios/:id', verificarToken, async (req, res) => {
    const { id } = req.params;
  
    console.log(`Eliminando usuario con ID: ${id}`);
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'ID inválido.' });
    }
  
    try {
      const usuarioEliminado = await Usuario.findByIdAndDelete(id);
      if (!usuarioEliminado) {
        return res.status(404).json({ error: 'Usuario no encontrado.' });
      }
      res.json({ mensaje: 'Usuario eliminado correctamente.' });
    } catch (error) {
      console.error('Error al eliminar usuario:', error.message);
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  });
  

 

  

module.exports = router;
