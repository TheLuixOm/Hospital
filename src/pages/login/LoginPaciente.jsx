import React, { useState } from 'react';
import RecuperarContrasenaPaciente from './RecuperarContrasenaPaciente';
import { useNavigate } from 'react-router-dom';
import FaceLogin from '../../components/FaceLogin';

const LoginPaciente = () => {
  const [datos, setDatos] = useState({ usuarioCorreo: '', contraseña: '' });
  const [mostrarRecuperar, setMostrarRecuperar] = useState(false);
  const [mostrarFacial, setMostrarFacial] = useState(false);
  const [faceError, setFaceError] = useState(null);
  const navigate = useNavigate();

  const manejarCambio = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/paciente/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          usuario: datos.usuarioCorreo,
          email: datos.usuarioCorreo,
          password: datos.contraseña
        })
      });
      const data = await res.json();
      if (res.ok) {
        alert('Inicio de sesión exitoso');
        if (data.paciente && data.paciente._id) {
          window.localStorage.setItem('paciente', JSON.stringify(data.paciente));
        }
        setTimeout(() => {
          navigate('/panel-paciente');
        }, 1000);
      } else {
        alert(data.message || 'Usuario o contraseña incorrectos');
      }
    } catch (err) {
      alert('Error de conexión con el servidor');
    }
  };

  // Login facial
  const manejarLoginFacial = async (descriptor) => {
    setFaceError(null);
    try {
      const res = await fetch('http://localhost:5000/api/paciente/login-facial', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ faceDescriptor: Array.from(descriptor) })
      });
      const data = await res.json();
      if (res.ok && data.paciente && data.paciente._id) {
        alert('Inicio de sesión facial exitoso');
        window.localStorage.setItem('paciente', JSON.stringify(data.paciente));
        setTimeout(() => {
          navigate('/panel-paciente');
        }, 1000);
      } else {
        setFaceError(data.message || 'No se encontró coincidencia facial');
      }
    } catch (err) {
      setFaceError('Error de conexión con el servidor');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Inicio de Sesión</h2>
      {mostrarRecuperar && (
        <RecuperarContrasenaPaciente onClose={() => setMostrarRecuperar(false)} />
      )}
      {!mostrarFacial ? (
        <>
          <form onSubmit={manejarEnvio} style={styles.form}>
            <div style={styles.campo}>
              <label style={styles.label}>Usuario o Correo Electrónico:</label>
              <input
                type="text"
                name="usuarioCorreo"
                value={datos.usuarioCorreo}
                onChange={manejarCambio}
                required
                style={styles.input}
              />
            </div>

            <div style={styles.campo}>
              <label style={styles.label}>Contraseña:</label>
              <input
                type="password"
                name="contraseña"
                value={datos.contraseña}
                onChange={manejarCambio}
                required
                style={styles.input}
              />
            </div>

            <button
              type="submit"
              style={styles.button}
              onMouseOver={e => {
                e.currentTarget.style.transform = 'scale(1.07)';
                e.currentTarget.style.background = '#005fa3';
              }}
              onMouseOut={e => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.background = '#008cff';
              }}
            >
              Iniciar Sesión
            </button>
            <div style={styles.extraLinks}>
              <button type="button" style={{...styles.link,background:'none',border:'none',padding:0,cursor:'pointer'}} onClick={()=>setMostrarRecuperar(true)}>¿Olvidaste tu contraseña?</button>
            </div>
          </form>
          <div style={{textAlign:'center',marginTop:'2rem'}}>
            <button
              style={{
                ...styles.button,
                background: '#43a047',
                marginTop: '1rem',
                width: '100%'
              }}
              onClick={()=>setMostrarFacial(true)}
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
          </div>
        </>
      ) : (
        <div>
          <FaceLogin onLogin={manejarLoginFacial} error={faceError} />
          <button style={{marginTop:'2rem',background:'#ccc',color:'#333',padding:'0.7rem 1.5rem',border:'none',borderRadius:8,cursor:'pointer'}} onClick={()=>setMostrarFacial(false)}>Volver a login tradicional</button>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: '5rem auto',
    padding: '2rem',
    backgroundColor: '#fefefe',
    borderRadius: '12px',
    boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
  },
  title: {
    textAlign: 'center',
    marginBottom: '1.5rem',
    color: '#008cff'
  },
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  campo: {
    marginBottom: '1.2rem'
  },
  label: {
    display: 'block',
    marginBottom: '0.4rem',
    fontWeight: 'bold',
    color: '#333'
  },
  input: {
    width: '100%',
    padding: '0.6rem',
    border: '1px solid #ccc',
    borderRadius: '8px',
    fontSize: '1rem',
    transition: 'border-color 0.3s',
    outline: 'none',
  },
  button: {
    width: '100%',
    padding: '0.75rem',
    backgroundColor: '#008cff',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.18s, transform 0.18s',
  },
  extraLinks: {
    marginTop: '1rem',
    textAlign: 'center'
  },
  link: {
    fontSize: '0.9rem',
    color: '#008cff',
    textDecoration: 'none'
  }
};


export default LoginPaciente;
