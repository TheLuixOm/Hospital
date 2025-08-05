import React, { useState } from 'react';

function RegistroDoctor({ cambiarVista }) {
  const [formulario, setFormulario] = useState({
    nombre: '',
    apellido: '',
    fechaNacimiento: '',
    email: '',
    telefono: '',
    usuario: '',
    contrasena: '',
    idCertificacion: ''
  });

  const manejarCambio = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value
    });
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/doctor/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: formulario.nombre,
          apellido: formulario.apellido,
          usuario: formulario.usuario,
          email: formulario.email,
          password: formulario.contrasena,
          certificacionId: formulario.idCertificacion
        })
      });
      const data = await res.json();
      if (res.ok) {
        alert('Registro exitoso');
        setFormulario({
          nombre: '',
          apellido: '',
          fechaNacimiento: '',
          email: '',
          telefono: '',
          usuario: '',
          contrasena: '',
          idCertificacion: ''
        });
        cambiarVista('inicio');
      } else {
        alert(data.message || 'Error en el registro');
      }
    } catch (err) {
      if (!window.navigator.onLine) {
        alert('No tienes conexión a internet.');
      } else {
        alert('Error de conexión con el servidor');
      }
    }
  };

  return (
    <div style={styles.fondo}>
      <div style={styles.container}>
        <h2 style={styles.titulo}>Registro de Doctor</h2>
        <form onSubmit={manejarEnvio} style={styles.form}>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={formulario.nombre}
            onChange={manejarCambio}
            style={styles.input}
            required
          />
          <input
            type="text"
            name="apellido"
            placeholder="Apellido"
            value={formulario.apellido}
            onChange={manejarCambio}
            style={styles.input}
            required
          />
          <label style={styles.label}>Fecha de nacimiento:</label>
          <input
            type="date"
            name="fechaNacimiento"
            value={formulario.fechaNacimiento}
            onChange={manejarCambio}
            style={styles.input}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={formulario.email}
            onChange={manejarCambio}
            style={styles.input}
            required
          />
          <input
            type="tel"
            name="telefono"
            placeholder="Teléfono"
            value={formulario.telefono}
            onChange={manejarCambio}
            style={styles.input}
            required
          />
          <input
            type="text"
            name="usuario"
            placeholder="Nombre de usuario"
            value={formulario.usuario}
            onChange={manejarCambio}
            style={styles.input}
            required
          />
          <input
            type="password"
            name="contrasena"
            placeholder="Contraseña"
            value={formulario.contrasena}
            onChange={manejarCambio}
            style={styles.input}
            required
          />
          <input
            type="text"
            name="idCertificacion"
            placeholder="ID de Certificación Médica"
            value={formulario.idCertificacion}
            onChange={manejarCambio}
            style={styles.input}
            required
          />
          <button type="submit" style={styles.boton}>
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  fondo: {
    background: 'linear-gradient(to bottom, #e9f2fc, #f5f9ff)',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
  },
  container: {
    background: '#ffffff',
    padding: '2rem',
    maxWidth: '500px',
    width: '100%',
    borderRadius: '1rem',
    boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
  },
  titulo: {
    fontSize: '1.8rem',
    fontWeight: '600',
    marginBottom: '1.5rem',
    textAlign: 'center',
    color: '#005a9e'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '0.85rem',
    marginBottom: '1rem',
    border: '1px solid #ccc',
    borderRadius: '0.5rem',
    fontSize: '1rem',
    outlineColor: '#7ebeff'
  },
  label: {
    marginBottom: '0.4rem',
    fontWeight: '500',
    color: '#333'
  },
  boton: {
    background: '#008cff',
    color: 'white',
    padding: '0.9rem',
    border: 'none',
    borderRadius: '0.6rem',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background 0.3s ease'
  }
};

export default RegistroDoctor;
