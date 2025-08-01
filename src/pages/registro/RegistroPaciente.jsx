import React, { useState } from 'react'

function RegistroPaciente() {
  const [paso, setPaso] = useState(1)

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

  const handleFinalSubmit = (e) => {
    e.preventDefault()

    const datosPaciente = {
      usuario,
      correo,
      nombre,
      apellido,
      cedula,
      telefono,
      fechaNacimiento,
      tipoSangre,
      alergias,
      enfermedades,
      direccion
    }

    console.log('Paciente registrado:', datosPaciente)
    alert('Paciente registrado con éxito')

    setPaso(1)
    setUsuario('')
    setCorreo('')
    setContrasena('')
    setNombre('')
    setApellido('')
    setCedula('')
    setTelefono('')
    setFechaNacimiento('')
    setTipoSangre('')
    setAlergias('')
    setEnfermedades('')
    setDireccion('')
  }

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
