import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const [mostrarRegistro, setMostrarRegistro] = useState(false);
  const [mostrarLogin, setMostrarLogin] = useState(false);
  // Estado de sesion
  const paciente = localStorage.getItem('paciente');
  const doctor = localStorage.getItem('doctor');
  const location = window.location.pathname;

  const esInicio = location === '/';
  const logueado = paciente || doctor;
  const paneles = ['/panel-paciente', '/panel-doctor'];
  const mostrarAtras = logueado && !esInicio && !paneles.includes(location);

  return (
    <nav style={styles.nav}>
      <h3 style={styles.title} onClick={() => navigate('/')}> 
        MediDataOS
      </h3>
      <div style={styles.menuContainer}>
        {esInicio && (
          <>
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
                      onMouseOver={e => {
                        e.currentTarget.style.background = '#bbdefb';
                        e.currentTarget.style.color = '#1565c0';
                        e.currentTarget.style.transform = 'scale(1.06)';
                      }}
                      onMouseOut={e => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = '#1976d2';
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    >
                      Paciente
                    </button>
                    <button
                      style={styles.dropdownItem}
                      onClick={() => navigate('/login-doctor')}
                      onMouseOver={e => {
                        e.currentTarget.style.background = '#bbdefb';
                        e.currentTarget.style.color = '#1565c0';
                        e.currentTarget.style.transform = 'scale(1.06)';
                      }}
                      onMouseOut={e => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = '#1976d2';
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    >
                      Doctor
                    </button>
                </div>
              )}
            </div>
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
                      onMouseOver={e => {
                        e.currentTarget.style.background = '#bbdefb';
                        e.currentTarget.style.color = '#1565c0';
                        e.currentTarget.style.transform = 'scale(1.06)';
                      }}
                      onMouseOut={e => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = '#1976d2';
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    >
                      Paciente
                    </button>
                    <button
                      style={styles.dropdownItem}
                      onClick={() => navigate('/registro-doctor')}
                      onMouseOver={e => {
                        e.currentTarget.style.background = '#bbdefb';
                        e.currentTarget.style.color = '#1565c0';
                        e.currentTarget.style.transform = 'scale(1.06)';
                      }}
                      onMouseOut={e => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = '#1976d2';
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    >
                      Doctor
                    </button>
                </div>
              )}
            </div>
          </>
        )}
        {mostrarAtras && (
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              background: '#1976d2',
              color: '#fff',
              fontWeight: '500',
              boxShadow: '0 2px 8px rgba(33,150,243,0.10)',
              border: 'none',
              fontSize: '0.98rem',
              padding: '0.35rem 0.9rem',
              borderRadius: '16px',
              transition: 'background 0.18s, box-shadow 0.22s, transform 0.22s',
              minWidth: 'auto',
              height: '2.1rem',
            }}
            onClick={() => navigate(-1)}
            onMouseOver={e => {
              e.currentTarget.style.background = '#1565c0';
              e.currentTarget.style.boxShadow = '0 6px 18px rgba(33,150,243,0.18)';
              e.currentTarget.style.transform = 'scale(1.08)';
            }}
            onMouseOut={e => {
              e.currentTarget.style.background = '#1976d2';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(33,150,243,0.10)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <FaArrowLeft size={15} style={{marginRight:'0.1rem'}} />
            Atrás
          </button>
        )}
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
