const mongoose = require('mongoose');

const ExamenMedicoSchema = new mongoose.Schema({
  pacienteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Paciente', required: true },
  registroId: { type: mongoose.Schema.Types.ObjectId, ref: 'Historial', required: false },
  tipoExamen: { type: String, required: true },
  fecha: { type: Date, default: Date.now },
  resultados: { type: String },
  archivoAdjunto: { type: String }, 
  observaciones: { type: String },
});

module.exports = mongoose.model('ExamenMedico', ExamenMedicoSchema);
