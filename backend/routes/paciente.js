const express = require('express');
const bcrypt = require('bcryptjs');
const Paciente = require('../models/Paciente');

const router = express.Router();

// Registro de paciente
router.post('/register', async (req, res) => {
  const { nombre, apellido, usuario, email, password, fechaNacimiento, telefono, cedula, tipoSangre, alergias, enfermedades, direccion } = req.body;
  try {
    // Verificar si el email o usuario ya está registrado
    const existingEmail = await Paciente.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: 'El email ya está registrado.' });
    }
    const existingUsuario = await Paciente.findOne({ usuario });
    if (existingUsuario) {
      return res.status(400).json({ message: 'El nombre de usuario ya está registrado.' });
    }
    // Hashear contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    const paciente = new Paciente({
      nombre,
      apellido,
      usuario,
      email,
      password: hashedPassword,
      fechaNacimiento,
      telefono,
      cedula,
      tipoSangre,
      alergias,
      enfermedades,
      direccion
    });
    await paciente.save();
    res.status(201).json({ message: 'Paciente registrado correctamente.' });
  } catch (err) {
    res.status(500).json({ message: 'Error en el servidor.' });
  }
});

// Login de paciente
router.post('/login', async (req, res) => {
  const { usuario, email, password } = req.body;
  try {
    // Permitir login por usuario o email
    const paciente = await Paciente.findOne({ $or: [ { email }, { usuario } ] });
    if (!paciente) {
      return res.status(400).json({ message: 'Credenciales inválidas.' });
    }
    const isMatch = await bcrypt.compare(password, paciente.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciales inválidas.' });
    }
    res.json({ message: 'Login exitoso', paciente: { nombre: paciente.nombre, apellido: paciente.apellido, usuario: paciente.usuario, email: paciente.email } });
  } catch (err) {
    res.status(500).json({ message: 'Error en el servidor.' });
  }
});

module.exports = router;
