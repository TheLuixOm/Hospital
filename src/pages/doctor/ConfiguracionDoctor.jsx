import React, { useState } from 'react';

function ConfiguracionDoctor() {
  const [claveActual, setClaveActual] = useState('');
  const [nuevaClave, setNuevaClave] = useState('');
  const [confirmarClave, setConfirmarClave] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');
    if (!claveActual || !nuevaClave || !confirmarClave) {
      setMensaje('Por favor, completa todos los campos.');
      return;
    }
    if (nuevaClave !== confirmarClave) {
      setMensaje('Las nuevas contraseñas no coinciden.');
      return;
    }
    setCargando(true);
    try {
      const doctor = JSON.parse(window.localStorage.getItem('doctor'));
  const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  const res = await fetch(`${apiBase}/api/doctor/cambiar-clave`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          doctorId: doctor?._id,
          claveActual,
          nuevaClave
        })
      });
      const data = await res.json();
      if (res.ok) {
        setMensaje('Contraseña actualizada correctamente.');
        setClaveActual('');
        setNuevaClave('');
        setConfirmarClave('');
      } else {
        setMensaje(data?.mensaje || 'Error al cambiar la contraseña.');
      }
    } catch (err) {
      setMensaje('Error de red o del servidor.');
    }
    setCargando(false);
  };

  return (
    <div style={{maxWidth:400,margin:'2rem auto',background:'#fff',borderRadius:12,padding:'2rem',boxShadow:'0 2px 8px #ccc'}}>
      <h2 style={{color:'#1976d2',marginBottom:'1.5rem'}}>Cambiar contraseña</h2>
      <form onSubmit={handleSubmit}>
        <div style={{marginBottom:'1rem'}}>
          <label>Contraseña actual</label>
          <input type="password" value={claveActual} onChange={e=>setClaveActual(e.target.value)} style={inputStyle} />
        </div>
        <div style={{marginBottom:'1rem'}}>
          <label>Nueva contraseña</label>
          <input type="password" value={nuevaClave} onChange={e=>setNuevaClave(e.target.value)} style={inputStyle} />
        </div>
        <div style={{marginBottom:'1.5rem'}}>
          <label>Confirmar nueva contraseña</label>
          <input type="password" value={confirmarClave} onChange={e=>setConfirmarClave(e.target.value)} style={inputStyle} />
        </div>
        <button type="submit" disabled={cargando} style={{padding:'0.7rem 1.5rem',borderRadius:8,background:'#1976d2',color:'#fff',border:'none',fontWeight:'bold',width:'100%'}}>
          {cargando ? 'Guardando...' : 'Cambiar contraseña'}
        </button>
        {mensaje && <div style={{marginTop:'1rem',color: mensaje.includes('correctamente') ? '#43a047' : '#e74c3c'}}>{mensaje}</div>}
      </form>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '0.6rem',
  borderRadius: '6px',
  border: '1px solid #ccc',
  marginTop: '0.3rem',
  fontSize: '1rem',
};

export default ConfiguracionDoctor;
