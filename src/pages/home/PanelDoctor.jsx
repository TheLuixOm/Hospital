import React from 'react';

function PanelDoctor({ doctor }) {
  return (
    <div style={styles.container}>
      <h1>Bienvenido, Dr. {doctor || 'Nombre Apellido'}</h1>
      <p>Este es su panel principal.</p>

      <div style={styles.cardContainer}>
        <div style={styles.card}>
          <h3>Ver Pacientes</h3>
          <p>Consultar el historial y la información médica de los pacientes.</p>
        </div>
        <div style={styles.card}>
          <h3>Registrar Diagnóstico</h3>
          <p>Agregar diagnósticos o tratamientos a pacientes registrados.</p>
        </div>
        <div style={styles.card}>
          <h3>Cerrar Sesión</h3>
          <p>Salir del sistema de médicos.</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '2rem',
    maxWidth: '800px',
    margin: 'auto',
    textAlign: 'center',
  },
  cardContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '2rem',
  },
  card: {
    backgroundColor: '#f0f8ff',
    padding: '1rem',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    width: '30%',
  },
};

export default PanelDoctor;
