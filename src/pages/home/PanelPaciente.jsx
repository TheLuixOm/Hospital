import React from 'react';

function PanelPaciente({ paciente }) {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Bienvenido{paciente?.nombre ? `, ${paciente.nombre}` : ''}</h1>
      <p style={styles.subtitle}>Este es tu panel de paciente. Aquí podrás consultar y actualizar tu información personal y médica.</p>
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
