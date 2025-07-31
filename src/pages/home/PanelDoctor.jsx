import React from 'react';
import { FaQrcode, FaSearch, FaStethoscope, FaSignOutAlt } from 'react-icons/fa';

function PanelDoctor({ doctor = 'Nombre Apellido', onCerrarSesion }) {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Bienvenido, Dr. {doctor}</h1>
      <p style={styles.subtitle}>Seleccione una acción para continuar:</p>

      <div style={styles.cardContainer}>
        <div style={styles.card}>
          <FaQrcode size={32} style={styles.icon} />
          <h3>Escanear QR</h3>
          <p>Escanea el código QR del paciente para acceder directamente a su registro médico.</p>
        </div>

        <div style={styles.card}>
          <FaSearch size={32} style={styles.icon} />
          <h3>Buscar Paciente</h3>
          <p>Busca un paciente por nombre o ID para revisar su historial médico.</p>
        </div>

        <div style={styles.card}>
          <FaStethoscope size={32} style={styles.icon} />
          <h3>Registrar Diagnóstico</h3>
          <p>Agrega un nuevo diagnóstico o tratamiento al historial de un paciente.</p>
        </div>

        <div style={{ ...styles.card, backgroundColor: '#ffecec', cursor: 'pointer' }} onClick={onCerrarSesion}>
          <FaSignOutAlt size={32} style={{ ...styles.icon, color: '#e74c3c' }} />
          <h3 style={{ color: '#e74c3c' }}>Cerrar Sesión</h3>
          <p>Salir de su sesión actual de forma segura.</p>
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
  icon: {
    marginBottom: '0.5rem',
    color: '#0077cc',
  },
};

export default PanelDoctor;
