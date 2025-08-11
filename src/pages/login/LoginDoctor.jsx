import React, { useState } from 'react';
import FaceLogin from '../../components/FaceLogin';
import { useNavigate } from 'react-router-dom';

function LoginDoctor() {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [showFaceLogin, setShowFaceLogin] = useState(false);
  const [faceError, setFaceError] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/doctor/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          usuario: usuario,
          email: usuario,
          password: contrasena
        })
      });
      const data = await res.json();
      if (res.ok) {
        setMensaje('Inicio de sesión exitoso. Bienvenido Doctor.');
        if (data.doctor && data.doctor._id) {
          window.localStorage.setItem('medicoId', data.doctor._id);
          window.localStorage.setItem('doctor', JSON.stringify(data.doctor));
        }
        setTimeout(() => {
          navigate('/panel-doctor');
        }, 1000);
      } else {
        setMensaje(data.message || 'Usuario o contraseña incorrectos.');
      }
    } catch (err) {
      setMensaje('Error de conexión con el servidor');
    }
  };

  // Lógica de login facial
  const handleFaceLogin = async (descriptor) => {
    setFaceError('');
    setMensaje('Verificando rostro...');
    try {
      const res = await fetch('http://localhost:5000/api/doctor/login-facial', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ descriptor: Array.from(descriptor) })
      });
      const data = await res.json();
      if (res.ok && data.doctor && data.doctor._id) {
        window.localStorage.setItem('medicoId', data.doctor._id);
        window.localStorage.setItem('doctor', JSON.stringify(data.doctor));
        setMensaje('Inicio de sesión facial exitoso.');
        setTimeout(() => {
          navigate('/panel-doctor');
        }, 1000);
      } else {
        setFaceError(data.message || 'No se reconoció el rostro.');
        setMensaje('');
      }
    } catch (err) {
      setFaceError('Error de conexión con el servidor');
      setMensaje('');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Inicio de Sesión - Doctor</h2>
        {!showFaceLogin ? (
          <>
            <form onSubmit={handleSubmit} style={styles.form}>
              <input
                type="text"
                placeholder="Usuario"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                required
                style={styles.input}
              />
              <input
                type="password"
                placeholder="Contraseña"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                required
                style={styles.input}
              />
              <button
                type="submit"
                style={styles.button}
                onMouseOver={e => {
                  e.currentTarget.style.transform = 'scale(1.07)';
                  e.currentTarget.style.background = '#125ea6';
                }}
                onMouseOut={e => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.background = '#1976d2';
                }}
              >
                Iniciar Sesión
              </button>
            </form>
            <button
              style={{
                ...styles.button,
                background: '#43a047',
                marginTop: '1rem',
                width: '100%'
              }}
              onClick={() => setShowFaceLogin(true)}
              onMouseOver={e => {
                e.currentTarget.style.transform = 'scale(1.07)';
                e.currentTarget.style.background = '#2e7031';
              }}
              onMouseOut={e => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.background = '#43a047';
              }}
            >
              Iniciar sesión con rostro
            </button>
            {mensaje && <p style={styles.message}>{mensaje}</p>}
          </>
        ) : (
          <FaceLogin onLogin={handleFaceLogin} error={faceError} />
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: '#ffffffff',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingTop: '4.5rem',
    paddingLeft: '2rem',
    paddingRight: '2rem',
    paddingBottom: '2rem',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '2rem',
    borderRadius: '16px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
  },
  title: {
    textAlign: 'center',
    marginBottom: '1.5rem',
    color: '#1976d2',
    fontFamily: 'Arial, sans-serif',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '0.75rem',
    marginBottom: '1rem',
    fontSize: '1rem',
    borderRadius: '8px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '0.75rem',
    fontSize: '1rem',
    backgroundColor: '#1976d2',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.18s, transform 0.18s',
  },
  message: {
    marginTop: '1rem',
    textAlign: 'center',
    color: 'green',
    fontWeight: 'bold',
  },
};
export default LoginDoctor;
