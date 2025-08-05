require('dotenv').config();
const mongoose = require('mongoose');
const Certificacion = require('./models/Certificacion');

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/Hospital', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const certificaciones = [
  { certificacionId: 'CERT123' },
  { certificacionId: 'CERT456' },
  { certificacionId: 'CERT789' },
];

async function seed() {
  await Certificacion.deleteMany({});
  await Certificacion.insertMany(certificaciones);
  console.log('Certificaciones precargadas');
  mongoose.disconnect();
}

seed();
