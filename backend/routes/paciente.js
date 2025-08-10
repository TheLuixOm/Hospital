const express = require('express');
const bcrypt = require('bcryptjs');
const Paciente = require('../models/Paciente');
const router = express.Router();

// Autenticación facial de paciente
router.post('/login-facial', async (req, res) => {
  try {
    const { faceDescriptor } = req.body;
    if (!faceDescriptor || !Array.isArray(faceDescriptor)) {
      return res.status(400).json({ message: 'Descriptor facial inválido.' });
    }
    // Buscar todos los pacientes con descriptor facial registrado
    const pacientes = await Paciente.find({ faceDescriptor: { $exists: true, $ne: undefined } }, '-password');
    // Comparar con cada descriptor facial guardado (distancia euclidiana)
    let mejorPaciente = null;
    let mejorDistancia = Infinity;
    const euclideanDistance = (a, b) => {
      if (!a || !b || a.length !== b.length) return Infinity;
      return Math.sqrt(a.reduce((sum, val, i) => sum + Math.pow(val - b[i], 2), 0));
    };
    pacientes.forEach(p => {
      if (Array.isArray(p.faceDescriptor) && p.faceDescriptor.length === faceDescriptor.length) {
        const dist = euclideanDistance(p.faceDescriptor, faceDescriptor);
        if (dist < mejorDistancia) {
          mejorDistancia = dist;
          mejorPaciente = p;
        }
      }
    });
    // Umbral típico para reconocimiento facial (ajustable)
    const UMBRAL = 0.6;
    if (mejorPaciente && mejorDistancia < UMBRAL) {
      res.json({ message: 'Login facial exitoso', paciente: mejorPaciente });
    } else {
      res.status(401).json({ message: 'No se encontró coincidencia facial.' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error en la autenticación facial.' });
  }
});
// Registrar o actualizar el rostro (faceDescriptor) de un paciente
router.put('/face/:id', async (req, res) => {
  try {
    const { faceDescriptor } = req.body;
    if (!faceDescriptor || !Array.isArray(faceDescriptor)) {
      return res.status(400).json({ message: 'Descriptor facial inválido.' });
    }
    const paciente = await Paciente.findByIdAndUpdate(
      req.params.id,
      { $set: { faceDescriptor } },
      { new: true, select: '-password' }
    );
    if (!paciente) return res.status(404).json({ message: 'Paciente no encontrado.' });
    res.json({ message: 'Rostro registrado/actualizado correctamente.', paciente });
  } catch (err) {
    res.status(500).json({ message: 'Error al registrar rostro.' });
  }
});


// Actualizar datos clínicos básicos del paciente
router.put('/datos-clinicos/:id', async (req, res) => {
  try {
    const updateFields = {};
    const campos = [
      'alergias',
      'enfermedades',
      'antecedentesPersonales',
      'antecedentesFamiliares',
      'medicamentosActuales',
      'enfermedadesCronicas',
      'vacunas'
    ];
    campos.forEach(campo => {
      if (req.body[campo] !== undefined) updateFields[campo] = req.body[campo];
    });
    const paciente = await Paciente.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true, select: '-password' }
    );
    if (!paciente) return res.status(404).json({ message: 'Paciente no encontrado.' });
    res.json(paciente);
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar datos clínicos.' });
  }
});

// Obtener todos los pacientes
router.get('/all', async (req, res) => {
  try {
    const pacientes = await Paciente.find({}, '-password'); // No enviar contraseñas
    res.json(pacientes);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener pacientes.' });
  }
});

// Registro de paciente
router.post('/register', async (req, res) => {
  const { nombre, apellido, usuario, email, password, fechaNacimiento, telefono, cedula, tipoSangre, alergias, enfermedades, direccion,
    antecedentesPersonales, antecedentesFamiliares, medicamentosActuales, enfermedadesCronicas, vacunas } = req.body;
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
      direccion,
      antecedentesPersonales: antecedentesPersonales || '',
      antecedentesFamiliares: antecedentesFamiliares || '',
      medicamentosActuales: medicamentosActuales || '',
      enfermedadesCronicas: enfermedadesCronicas || '',
      vacunas: vacunas || ''
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
  res.json({ message: 'Login exitoso', paciente: { _id: paciente._id, nombre: paciente.nombre, apellido: paciente.apellido, usuario: paciente.usuario, email: paciente.email } });
  } catch (err) {
    res.status(500).json({ message: 'Error en el servidor.' });
  }
});


// Obtener paciente por ID
router.get('/:id', async (req, res) => {
  try {
    const paciente = await Paciente.findById(req.params.id, '-password');
    if (!paciente) return res.status(404).json({ message: 'Paciente no encontrado.' });
    res.json(paciente);
  } catch (err) {
    res.status(500).json({ message: 'Error al buscar paciente.' });
  }
});

module.exports = router;
