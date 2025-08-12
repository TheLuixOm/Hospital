// Backend entry point
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/Hospital', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});


// Import routes

const path = require('path');
const doctorRoutes = require('./routes/doctor');
const pacienteRoutes = require('./routes/paciente');
const historialRoutes = require('./routes/historial');
const examenMedicoRoutes = require('./routes/examenMedico');
const recuperarContrasenaPacienteRoutes = require('./routes/recuperarContrasenaPaciente');

// Servir archivos subidos
app.use('/uploads', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
}, express.static(path.join(__dirname, 'uploads')));

app.use('/api/doctor', doctorRoutes);
app.use('/api/paciente', pacienteRoutes);
app.use('/api/historial', historialRoutes);
app.use('/api/examenes', examenMedicoRoutes);
app.use('/api/paciente', recuperarContrasenaPacienteRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
