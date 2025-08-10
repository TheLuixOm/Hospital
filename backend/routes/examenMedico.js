const express = require('express');
const multer = require('multer');
const ExamenMedico = require('../models/ExamenMedico');
const Paciente = require('../models/Paciente');
const Historial = require('../models/Historial');
const path = require('path');

const router = express.Router();

// Configuración de multer para subir archivos a /uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Crear un nuevo examen medico (con o sin archivo)
router.post('/', upload.single('archivoAdjunto'), async (req, res) => {
  try {
    const { pacienteId, registroId, tipoExamen, fecha, resultados, observaciones } = req.body;
    const archivoAdjunto = req.file ? `/uploads/${req.file.filename}` : undefined;
    const examen = new ExamenMedico({
      pacienteId,
      registroId,
      tipoExamen,
      fecha: fecha || Date.now(),
      resultados,
      archivoAdjunto,
      observaciones
    });
    await examen.save();
    // Relacionar con paciente
    await Paciente.findByIdAndUpdate(pacienteId, { $push: { examenesMedicos: examen._id } });
    // Relacionar con historial si aplica
    if (registroId) {
      await Historial.findByIdAndUpdate(registroId, { $push: { examenes: examen._id } });
    }
    res.status(201).json({ message: 'Examen médico registrado', examen });
  } catch (err) {
    res.status(500).json({ message: 'Error al registrar examen médico.' });
  }
});

// Listar examenes médicos de un paciente
router.get('/paciente/:pacienteId', async (req, res) => {
  try {
    const examenes = await ExamenMedico.find({ pacienteId: req.params.pacienteId });
    res.json(examenes);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener exámenes.' });
  }
});

// Obtener un examen medico por id
router.get('/:id', async (req, res) => {
  try {
    const examen = await ExamenMedico.findById(req.params.id);
    if (!examen) return res.status(404).json({ message: 'Examen no encontrado.' });
    res.json(examen);
  } catch (err) {
    res.status(500).json({ message: 'Error al buscar examen.' });
  }
});

module.exports = router;
