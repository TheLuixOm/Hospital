const mongoose = require('mongoose');


const DoctorSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  usuario: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  certificacionId: { type: String, required: true },
  faceDescriptor: { type: [Number], default: undefined }, // embedding facial opcional
});

module.exports = mongoose.model('Doctor', DoctorSchema);
