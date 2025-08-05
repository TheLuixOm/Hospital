const mongoose = require('mongoose');

const CertificacionSchema = new mongoose.Schema({
  certificacionId: { type: String, required: true, unique: true },
});

module.exports = mongoose.model('Certificacion', CertificacionSchema);
