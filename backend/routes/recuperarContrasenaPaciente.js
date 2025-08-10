const express = require('express');
const router = express.Router();
const Paciente = require('../models/Paciente');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');

// Endpoint para recuperación de contraseña
router.post('/recuperar-contrasena', async (req, res) => {
  const { usuarioCorreo } = req.body;
  try {
    const paciente = await Paciente.findOne({ $or: [ { email: usuarioCorreo }, { usuario: usuarioCorreo } ] });
    if (!paciente) {
      // No revelar si existe o no
      return res.status(200).json({ message: 'Si el usuario/correo existe, se enviaron instrucciones a su email.' });
    }
    // Generar nueva contraseña temporal
    const nuevaPass = Math.random().toString(36).slice(-8) + Math.floor(Math.random()*100);
    const hashed = await bcrypt.hash(nuevaPass, 10);
    paciente.password = hashed;
    await paciente.save();

    // Configurar transporte nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
    try {
      await transporter.sendMail({
        from: 'Hospital <noreply@hospital.com>',
        to: paciente.email,
        subject: 'Recuperación de contraseña',
        text: `Hola ${paciente.nombre},\n\nTu nueva contraseña temporal es: ${nuevaPass}\nPor favor, cámbiala después de iniciar sesión.\n\nSaludos,\nHospital`
      });
      res.json({ message: 'Si el usuario/correo existe, se enviaron instrucciones a su email.' });
    } catch (err) {
      res.status(500).json({ message: 'No se pudo enviar el correo. Contacte al administrador.' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error al procesar la solicitud.' });
  }
});

module.exports = router;
