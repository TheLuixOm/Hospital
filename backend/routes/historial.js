const express = require('express');
const Historial = require('../models/Historial');
const Paciente = require('../models/Paciente');
const Doctor = require('../models/Doctor');

const router = express.Router();

// Obtener historial de un paciente (solo médicos autenticados, autenticación pendiente)
router.get('/paciente/:pacienteId', async (req, res) => {
  try {
    const historial = await Historial.find({ paciente: req.params.pacienteId })
      .populate('medico', 'nombre apellido usuario email')
      .sort({ fecha: -1 });
    res.json(historial);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener el historial.' });
  }
});

// Agregar registro al historial de un paciente
router.post('/add', async (req, res) => {
  const { pacienteId, medicoId, motivo, diagnostico, tratamiento, examenes, notas, archivos } = req.body;
  try {
    const paciente = await Paciente.findById(pacienteId);
    const medico = await Doctor.findById(medicoId);
    if (!paciente || !medico) {
      return res.status(400).json({ message: 'Paciente o médico no encontrado.' });
    }
    const registro = new Historial({
      paciente: pacienteId,
      medico: medicoId,
      motivo,
      diagnostico,
      tratamiento,
      examenes,
      notas,
      archivos
    });
    await registro.save();
    res.status(201).json({ message: 'Registro agregado al historial.' });
  } catch (err) {
    res.status(500).json({ message: 'Error al agregar registro.' });
  }
});

module.exports = router;
