const mongoose = require('mongoose');

const HistorialSchema = new mongoose.Schema({
  paciente: { type: mongoose.Schema.Types.ObjectId, ref: 'Paciente', required: true },
  medico: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  fecha: { type: Date, default: Date.now },
  motivo: { type: String, required: true },
  diagnostico: { type: String },
  tratamiento: { type: String },
  examenes: { type: String }, // Resultados de exámenes o texto libre
  notas: { type: String },
  archivos: [{ type: String }], // URLs o nombres de archivos adjuntos
});

module.exports = mongoose.model('Historial', HistorialSchema);
