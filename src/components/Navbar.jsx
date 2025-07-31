import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const [mostrarRegistro, setMostrarRegistro] = useState(false);
  const [mostrarLogin, setMostrarLogin] = useState(false);

  return (
    <nav style={styles.nav}>
      <h3 style={styles.title} onClick={() => navigate('/')}>
        Mi App Médica
      </h3>
      <div style={styles.menuContainer}>
        <button onClick={() => navigate('/')} style={styles.button}>
          Inicio
        </button>

        <div
          style={styles.dropdown}
          onMouseEnter={() => setMostrarRegistro(true)}
          onMouseLeave={() => setMostrarRegistro(false)}
        >
          <button style={styles.button}>Registro ▾</button>
          {mostrarRegistro && (
            <div style={styles.dropdownContent}>
              <button
                style={styles.dropdownItem}
                onClick={() => navigate('/registro-paciente')}
              >
                Paciente
              </button>
              <button
                style={styles.dropdownItem}
                onClick={() => navigate('/registro-doctor')}
              >
                Doctor
              </button>
            </div>
          )}
        </div>

        <div
          style={styles.dropdown}
          onMouseEnter={() => setMostrarLogin(true)}
          onMouseLeave={() => setMostrarLogin(false)}
        >
          <button style={styles.button}>Iniciar Sesión ▾</button>
          {mostrarLogin && (
            <div style={styles.dropdownContent}>
              <button
                style={styles.dropdownItem}
                onClick={() => navigate('/login-paciente')}
              >
                Paciente
              </button>
              <button
                style={styles.dropdownItem}
                onClick={() => navigate('/login-doctor')}
              >
                Doctor
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}


const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1.2rem 2.5rem',
    background: 'linear-gradient(90deg, #e3f2fd 0%, #64b5f6 100%)',
    color: '#1565c0',
    flexWrap: 'wrap',
    position: 'relative',
    boxShadow: '0 2px 12px rgba(33,150,243,0.10)',
    borderRadius: '0 0 24px 24px',
  },
  title: {
    margin: 0,
    fontWeight: 'bold',
    fontSize: '1.35rem',
    letterSpacing: '1px',
    color: '#1976d2',
    fontFamily: "'Segoe UI', 'Roboto', Arial, sans-serif",
  },
  button: {
    margin: '0 0.5rem',
    background: '#64b5f6',
    border: 'none',
    color: '#fff',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '1rem',
    borderRadius: '18px',
    padding: '0.5rem 1.2rem',
    transition: 'background 0.2s, box-shadow 0.2s',
    boxShadow: '0 1px 6px rgba(33,150,243,0.10)',
  },
  buttonHover: {
    background: '#1976d2',
  },
  menuContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  dropdown: {
    position: 'relative',
  },
  dropdownContent: {
    position: 'absolute',
    top: '2.5rem',
    left: 0,
    backgroundColor: '#e3f2fd',
    boxShadow: '0px 4px 12px rgba(33,150,243,0.15)',
    borderRadius: '12px',
    zIndex: 1,
    minWidth: '150px',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    border: '1px solid #bbdefb',
  },
  dropdownItem: {
    padding: '0.7rem 1.2rem',
    background: 'transparent',
    border: 'none',
    textAlign: 'left',
    cursor: 'pointer',
    color: '#1976d2',
    fontWeight: '500',
    fontSize: '1rem',
    transition: 'background 0.2s, color 0.2s',
  },
};

export default Navbar;
