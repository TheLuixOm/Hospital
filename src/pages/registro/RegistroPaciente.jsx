import React, { useState } from 'react'
import FaceRegister from '../../components/FaceRegister';

function RegistroPaciente() {
  const [paso, setPaso] = useState(1)
  const [nuevoPacienteId, setNuevoPacienteId] = useState(null);
  const [faceDescriptor, setFaceDescriptor] = useState(null);
  const [faceError, setFaceError] = useState(null);

  // Datos de cuenta
  const [usuario, setUsuario] = useState('')
  const [correo, setCorreo] = useState('')
  const [contrasena, setContrasena] = useState('')

  // Datos personales y médicos
  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [cedula, setCedula] = useState('')
  const [telefono, setTelefono] = useState('')
  const [fechaNacimiento, setFechaNacimiento] = useState('')
  const [tipoSangre, setTipoSangre] = useState('')
  const [alergias, setAlergias] = useState('')
  const [enfermedades, setEnfermedades] = useState('')
  const [direccion, setDireccion] = useState('')

  const handleCuentaSubmit = (e) => {
    e.preventDefault()
    if (usuario && correo && contrasena) {
      setPaso(2)
    } else {
      alert('Completa todos los campos')
    }
  }

  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/paciente/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          usuario,
          email: correo,
          password: contrasena,
          nombre,
          apellido,
          fechaNacimiento,
          telefono,
          cedula,
          tipoSangre,
          alergias,
          enfermedades,
          direccion
        })
      });
      const data = await res.json();
      if (res.ok && data.message && data.message.includes('registrado')) {
        // Buscar el paciente recién creado para obtener su _id
        const buscar = await fetch(`http://localhost:5000/api/paciente/all`);
        const lista = await buscar.json();
        const recien = lista.find(p => p.usuario === usuario && p.email === correo);
        if (recien && recien._id) {
          setNuevoPacienteId(recien._id);
          setPaso(3); // Paso de registro facial
        } else {
          alert('Paciente registrado, pero no se pudo iniciar registro facial.');
          setPaso(1);
        }
        // Limpiar campos
        setUsuario(''); setCorreo(''); setContrasena(''); setNombre(''); setApellido(''); setCedula(''); setTelefono(''); setFechaNacimiento(''); setTipoSangre(''); setAlergias(''); setEnfermedades(''); setDireccion('');
      } else {
        alert(data.message || 'Error en el registro');
      }
    } catch (err) {
      alert('Error de conexión con el servidor');
    }
  }

  // Guardar rostro en backend
  const handleFaceRegister = async (descriptor) => {
    setFaceError(null);
    setFaceDescriptor(descriptor);
    if (!nuevoPacienteId) return;
    try {
      const res = await fetch(`http://localhost:5000/api/paciente/face/${nuevoPacienteId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ faceDescriptor: Array.from(descriptor) })
      });
      const data = await res.json();
      if (res.ok) {
        alert('¡Rostro registrado exitosamente!');
        setPaso(1);
        setNuevoPacienteId(null);
        setFaceDescriptor(null);
      } else {
        setFaceError(data.message || 'Error al guardar rostro');
      }
    } catch (err) {
      setFaceError('Error de conexión con el servidor');
    }
  };

  return (
    <div style={styles.fondo}>
      <div style={styles.card}>
        <h2 style={styles.titulo}>Registro de Paciente</h2>

        {paso === 1 && (
          <form onSubmit={handleCuentaSubmit} style={styles.form}>
            <label style={styles.label}>Usuario:</label>
            <input value={usuario} onChange={e => setUsuario(e.target.value)} style={styles.input} required />

            <label style={styles.label}>Correo:</label>
            <input type="email" value={correo} onChange={e => setCorreo(e.target.value)} style={styles.input} required />

            <label style={styles.label}>Contraseña:</label>
            <input type="password" value={contrasena} onChange={e => setContrasena(e.target.value)} style={styles.input} required />

            <button type="submit" style={styles.boton}>Siguiente</button>
          </form>
        )}

        {paso === 2 && (
          <form onSubmit={handleFinalSubmit} style={styles.form}>
            <div style={styles.row}>
              <div style={styles.column}>
                <label style={styles.label}>Nombre:</label>
                <input value={nombre} onChange={e => setNombre(e.target.value)} style={styles.input} required />
              </div>
              <div style={styles.column}>
                <label style={styles.label}>Apellido:</label>
                <input value={apellido} onChange={e => setApellido(e.target.value)} style={styles.input} required />
              </div>
            </div>

            <label style={styles.label}>Cédula:</label>
            <input value={cedula} onChange={e => setCedula(e.target.value)} style={styles.input} required />

            <label style={styles.label}>Teléfono:</label>
            <input value={telefono} onChange={e => setTelefono(e.target.value)} style={styles.input} required />

            <label style={styles.label}>Fecha de nacimiento:</label>
            <input type="date" value={fechaNacimiento} onChange={e => setFechaNacimiento(e.target.value)} style={styles.input} required />

            <label style={styles.label}>Tipo de sangre:</label>
            <input value={tipoSangre} onChange={e => setTipoSangre(e.target.value)} style={styles.input} required />

            <label style={styles.label}>Alergias:</label>
            <input value={alergias} onChange={e => setAlergias(e.target.value)} style={styles.input} />

            <label style={styles.label}>Enfermedades preexistentes:</label>
            <input value={enfermedades} onChange={e => setEnfermedades(e.target.value)} style={styles.input} />

            <label style={styles.label}>Dirección:</label>
            <textarea value={direccion} onChange={e => setDireccion(e.target.value)} style={styles.textarea} rows={3}></textarea>

            <div style={styles.actions}>
              <button type="button" onClick={() => setPaso(1)} style={styles.volver}>Atrás</button>
              <button type="submit" style={styles.boton}>Registrar</button>
            </div>
          </form>
        )}

        {paso === 3 && (
          <div>
            <h3 style={{textAlign:'center',marginBottom:'1rem'}}>Registro facial (opcional)</h3>
            <FaceRegister onRegister={handleFaceRegister} error={faceError} />
            <button style={{marginTop:'2rem',background:'#ccc',color:'#333',padding:'0.7rem 1.5rem',border:'none',borderRadius:8,cursor:'pointer'}} onClick={()=>{setPaso(1);setNuevoPacienteId(null);}}>Omitir y finalizar</button>
          </div>
        )}
      </div>
    </div>
  )
}

const styles = {
  fondo: {
    background: 'linear-gradient(to bottom, #e9f2fc, #f5f9ff)',
    minHeight: '100vh',
    padding: '3rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  card: {
    background: '#ffffff',
    padding: '2rem 3rem',
    borderRadius: '1rem',
    maxWidth: '700px',
    width: '100%',
    boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
  },
  titulo: {
    textAlign: 'center',
    marginBottom: '2rem',
    color: '#005a9e',
    fontSize: '1.8rem',
    fontWeight: '600'
  },
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  label: {
    marginBottom: '0.5rem',
    fontWeight: '500',
    color: '#333'
  },
  input: {
    padding: '0.75rem',
    marginBottom: '1.25rem',
    borderRadius: '0.6rem',
    border: '1px solid #ccc',
    fontSize: '1rem',
    outlineColor: '#7ebeff'
  },
  textarea: {
    padding: '0.75rem',
    marginBottom: '1.25rem',
    borderRadius: '0.6rem',
    border: '1px solid #ccc',
    fontSize: '1rem',
    resize: 'none',
    outlineColor: '#7ebeff'
  },
  row: {
    display: 'flex',
    gap: '1rem'
  },
  column: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
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
    marginTop: '1rem'
  },
  volver: {
    backgroundColor: '#cccccc',
    color: '#333',
    padding: '0.9rem',
    border: 'none',
    borderRadius: '0.6rem',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '1rem',
    marginRight: '1rem'
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between'
  }
}

export default RegistroPaciente
