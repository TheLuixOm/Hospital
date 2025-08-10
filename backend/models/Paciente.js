const mongoose = require('mongoose');

const PacienteSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  usuario: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fechaNacimiento: { type: Date, required: true },
  telefono: { type: String },
  cedula: { type: String },
  tipoSangre: { type: String },
  alergias: { type: String },
  enfermedades: { type: String },
  antecedentesPersonales: { type: String },
  antecedentesFamiliares: { type: String },
  medicamentosActuales: { type: String },
  enfermedadesCronicas: { type: String },
  vacunas: { type: String },
  direccion: { type: String },
  examenesMedicos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ExamenMedico' }],
  faceDescriptor: { type: [Number], default: undefined }, // embedding facial opcional
});

module.exports = mongoose.model('Paciente', PacienteSchema);
