const express = require('express');
const bcrypt = require('bcryptjs');
const Doctor = require('../models/Doctor');
const Certificacion = require('../models/Certificacion');

const router = express.Router();

// Registro de doctor
router.post('/register', async (req, res) => {
  const { nombre, apellido, usuario, email, password, certificacionId } = req.body;
  try {
    // Verificar si el ID de certificación existe
    const cert = await Certificacion.findOne({ certificacionId });
    if (!cert) {
      return res.status(400).json({ message: 'ID de certificación inválido.' });
    }
    // Verificar si el email o usuario ya está registrado
    const existingEmail = await Doctor.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: 'El email ya está registrado.' });
    }
    const existingUsuario = await Doctor.findOne({ usuario });
    if (existingUsuario) {
      return res.status(400).json({ message: 'El nombre de usuario ya está registrado.' });
    }
    // Hashear contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    const doctor = new Doctor({ nombre, apellido, usuario, email, password: hashedPassword, certificacionId });
    await doctor.save();
    res.status(201).json({ message: 'Doctor registrado correctamente.' });
  } catch (err) {
    res.status(500).json({ message: 'Error en el servidor.' });
  }
});

// Login de doctor
router.post('/login', async (req, res) => {
  const { usuario, email, password } = req.body;
  try {
    // Permitir login por usuario o email
    const doctor = await Doctor.findOne({ $or: [ { email }, { usuario } ] });
    if (!doctor) {
      return res.status(400).json({ message: 'Credenciales inválidas.' });
    }
    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciales inválidas.' });
    }
    res.json({ message: 'Login exitoso', doctor: { nombre: doctor.nombre, apellido: doctor.apellido, usuario: doctor.usuario, email: doctor.email } });
  } catch (err) {
    res.status(500).json({ message: 'Error en el servidor.' });
  }
});

module.exports = router;
