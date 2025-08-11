import FaceRegister from '../../components/FaceRegister';

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
  const [doctorId, setDoctorId] = useState(null);
  const [faceDescriptor, setFaceDescriptor] = useState(null);
  const [faceError, setFaceError] = useState('');
  const [paso, setPaso] = useState(1);

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
        alert('Registro exitoso. Ahora puedes registrar tu rostro (opcional).');
        // Buscar el doctor recién creado para obtener su _id
        const buscar = await fetch('http://localhost:5000/api/doctor/all');
        const lista = await buscar.json();
        const recien = lista.find(d => d.usuario === formulario.usuario && d.email === formulario.email);
        if (recien && recien._id) {
          setDoctorId(recien._id);
          setPaso(2);
        } else {
          alert('Doctor registrado, pero no se pudo iniciar registro facial.');
          cambiarVista('inicio');
        }
        setFormulario({
          nombre: '', apellido: '', fechaNacimiento: '', email: '', telefono: '', usuario: '', contrasena: '', idCertificacion: ''
        });
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

  // Guardar rostro en backend
  const handleFaceRegister = async (descriptor) => {
    setFaceError('');
    setFaceDescriptor(descriptor);
    if (!doctorId) return;
    try {
      const res = await fetch(`http://localhost:5000/api/doctor/face/${doctorId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ faceDescriptor: Array.from(descriptor) })
      });
      const data = await res.json();
      if (res.ok) {
        alert('¡Rostro registrado exitosamente!');
        setPaso(1);
        setDoctorId(null);
        setFaceDescriptor(null);
        cambiarVista('inicio');
      } else {
        setFaceError(data.message || 'Error al guardar rostro');
      }
    } catch (err) {
      setFaceError('Error de conexión con el servidor');
    }
  };

  return (
    <div style={styles.fondo}>
      <div style={styles.container}>
        <h2 style={styles.titulo}>Registro de Doctor</h2>
        {paso === 1 && (
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
            <button
              type="submit"
              style={styles.boton}
              onMouseOver={e => {
                e.currentTarget.style.transform = 'scale(1.07)';
                e.currentTarget.style.background = '#005fa3';
              }}
              onMouseOut={e => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.background = '#008cff';
              }}
            >
              Registrarse
            </button>
          </form>
        )}
        {paso === 2 && (
          <div>
            <h3 style={{textAlign:'center',marginBottom:'1rem'}}>Registro facial (opcional)</h3>
            <FaceRegister onRegister={handleFaceRegister} error={faceError} />
            <button
              style={{marginTop:'2rem',background:'#ccc',color:'#333',padding:'0.7rem 1.5rem',border:'none',borderRadius:8,cursor:'pointer',transition:'background 0.18s, transform 0.18s'}} 
              onClick={()=>{setPaso(1);setDoctorId(null);}}
              onMouseOver={e => {
                e.currentTarget.style.transform = 'scale(1.07)';
                e.currentTarget.style.background = '#b0b0b0';
              }}
              onMouseOut={e => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.background = '#ccc';
              }}
            >
              Omitir y finalizar
            </button>
          </div>
        )}
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
    transition: 'background 0.18s, transform 0.18s'
  }
};

export default RegistroDoctor;
import React, { useState } from 'react';
