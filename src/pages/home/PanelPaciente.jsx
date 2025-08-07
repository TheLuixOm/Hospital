import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';

function PanelPaciente() {
  let paciente = null;
  try {
    paciente = JSON.parse(window.localStorage.getItem('paciente'));
  } catch {}
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Bienvenido{paciente?.nombre ? `, ${paciente.nombre}` : ''}</h1>
      <p style={styles.subtitle}>Este es tu panel de paciente. Aquí podrás consultar y actualizar tu información personal y médica.</p>

      {/* QR permanente del paciente */}
      {paciente?._id && (
        <div style={{margin:'2rem auto',maxWidth:300,background:'#fff',borderRadius:16,padding:'1.5rem',boxShadow:'0 2px 8px #ccc'}}>
          <h3 style={{color:'#1976d2',marginBottom:'1rem'}}>Tu Código QR Personal</h3>
          <QRCodeCanvas value={paciente._id} size={200} level="H" includeMargin={true} />
          <div style={{marginTop:'1rem',fontSize:'0.95em',color:'#888'}}>Este QR es único y permanente. Puedes imprimirlo o guardarlo para ser escaneado por tu médico.</div>
        </div>
      )}

      <div style={styles.cardContainer}>
        <div style={styles.card}>
          <h3>Datos Personales</h3>
          <p>Visualiza y edita tus datos personales y de contacto.</p>
        </div>
        <div style={styles.card}>
          <h3>Historial Médico</h3>
          <p>Consulta tu historial de diagnósticos, alergias y enfermedades.</p>
        </div>
        <div style={styles.card}>
          <h3>Configuración</h3>
          <p>Actualiza tu contraseña y preferencias de cuenta.</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '2rem',
    maxWidth: '1000px',
    margin: 'auto',
    textAlign: 'center',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '0.5rem',
    color: '#1976d2',
  },
  subtitle: {
    fontSize: '1.1rem',
    color: '#555',
    marginBottom: '2rem',
  },
  cardContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '1.5rem',
  },
  card: {
    backgroundColor: '#f0f8ff',
    padding: '1.5rem',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s ease',
  },
};

export default PanelPaciente;
