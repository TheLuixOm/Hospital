import React, { useState } from 'react';

const LoginPaciente = () => {
  const [datos, setDatos] = useState({
    usuarioCorreo: '',
    contraseña: ''
  });

  const manejarCambio = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    console.log('Iniciar sesión con:', datos);
    // Aquí se integraría la lógica de autenticación
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Inicio de Sesión</h2>
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

        <button type="submit" style={styles.button}>Iniciar Sesión</button>
        <div style={styles.extraLinks}>
          <a href="#" style={styles.link}>¿Olvidaste tu contraseña?</a>
        </div>
      </form>
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
    transition: 'background-color 0.3s ease'
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
