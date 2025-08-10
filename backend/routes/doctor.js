const express = require('express');
const bcrypt = require('bcryptjs');
const Doctor = require('../models/Doctor');
const Certificacion = require('../models/Certificacion');

const router = express.Router();

// Registrar o actualizar el rostro (faceDescriptor) de un doctor
router.put('/face/:id', async (req, res) => {
  try {
    const { faceDescriptor } = req.body;
    if (!faceDescriptor || !Array.isArray(faceDescriptor)) {
      return res.status(400).json({ message: 'Descriptor facial inválido.' });
    }
    const doctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      { $set: { faceDescriptor } },
      { new: true, select: '-password' }
    );
    if (!doctor) return res.status(404).json({ message: 'Doctor no encontrado.' });
    res.json({ message: 'Rostro registrado/actualizado correctamente.', doctor });
  } catch (err) {
    res.status(500).json({ message: 'Error al registrar rostro.' });
  }
});


// Obtener todos los doctores (para registro facial)
router.get('/all', async (req, res) => {
  try {
    const doctores = await Doctor.find({}, '-password');
    res.json(doctores);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener doctores.' });
  }
});


// Registro de doctor
router.post('/register', async (req, res) => {
  const { nombre, apellido, usuario, email, password, certificacionId, faceDescriptor } = req.body;
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
    if (faceDescriptor && Array.isArray(faceDescriptor)) {
      doctor.faceDescriptor = faceDescriptor;
    }
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
    res.json({
      message: 'Login exitoso',
      doctor: {
        _id: doctor._id,
        nombre: doctor.nombre,
        apellido: doctor.apellido,
        usuario: doctor.usuario,
        email: doctor.email
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Error en el servidor.' });
  }
});


// Login facial de doctor
const { findBestMatch } = require('../utils/face');
router.post('/login-facial', async (req, res) => {
  const { descriptor } = req.body;
  if (!descriptor || !Array.isArray(descriptor)) {
    return res.status(400).json({ message: 'Descriptor facial inválido.' });
  }
  try {
    // Buscar todos los doctores con embedding facial
    const doctors = await Doctor.find({ faceDescriptor: { $exists: true, $ne: null } });
    const match = findBestMatch(descriptor, doctors, 0.5); // threshold ajustable
    if (match) {
      return res.json({
        message: 'Login facial exitoso',
        doctor: {
          _id: match._id,
          nombre: match.nombre,
          apellido: match.apellido,
          usuario: match.usuario,
          email: match.email
        }
      });
    } else {
      return res.status(401).json({ message: 'No se reconoció el rostro.' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error en el servidor.' });
  }
});

module.exports = router;
