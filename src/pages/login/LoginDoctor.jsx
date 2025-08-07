import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginDoctor() {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [mensaje, setMensaje] = useState('');
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
        console.log('Doctor recibido del backend:', data.doctor);
        if (data.doctor && data.doctor._id) {
          window.localStorage.setItem('medicoId', data.doctor._id);
          console.log('medicoId guardado en localStorage:', data.doctor._id);
        } else {
          console.log('No se recibió _id de doctor');
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

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Inicio de Sesión - Doctor</h2>
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
          <button type="submit" style={styles.button}>Iniciar Sesión</button>
        </form>
        {mensaje && <p style={styles.message}>{mensaje}</p>}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #e3f2fd, #bbdefb)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
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
    transition: 'background-color 0.3s ease',
  },
  message: {
    marginTop: '1rem',
    textAlign: 'center',
    color: 'green',
    fontWeight: 'bold',
  },
};

export default LoginDoctor;
