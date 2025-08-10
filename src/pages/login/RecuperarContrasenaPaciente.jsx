import React, { useState } from 'react';

function RecuperarContrasenaPaciente({ onClose }) {
  const [usuarioCorreo, setUsuarioCorreo] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setMensaje('');
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/paciente/recuperar-contrasena', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuarioCorreo })
      });
      const data = await res.json();
      if (res.ok) {
        setMensaje('Si el usuario/correo existe, se enviaron instrucciones a su email.');
      } else {
        setMensaje(data.message || 'No se pudo procesar la solicitud.');
      }
    } catch {
      setMensaje('Error de conexión con el servidor.');
    }
    setLoading(false);
  };

  return (
    <div style={{background:'#fff',border:'1px solid #d0d7e2',borderRadius:'14px',boxShadow:'0 2px 8px #1976d220',padding:'2rem',maxWidth:400,margin:'2rem auto',position:'relative'}}>
      <button onClick={onClose} style={{position:'absolute',top:10,right:14,background:'none',border:'none',fontSize:'1.5rem',cursor:'pointer',color:'#1976d2'}}>&times;</button>
      <h3 style={{color:'#1976d2',fontWeight:700,marginBottom:'1.2rem'}}>Recuperar contraseña</h3>
      <form onSubmit={handleSubmit}>
        <label style={{fontWeight:600,color:'#1976d2',marginBottom:6,display:'block'}}>Usuario o correo electrónico</label>
        <input type="text" value={usuarioCorreo} onChange={e=>setUsuarioCorreo(e.target.value)} required style={{width:'100%',padding:8,borderRadius:8,border:'1px solid #d0d7e2',marginBottom:14}} />
        <button type="submit" disabled={loading} style={{background:'#1976d2',color:'#fff',padding:'0.7rem 1.5rem',border:'none',borderRadius:'8px',fontWeight:'bold',cursor:'pointer',width:'100%'}}>
          {loading ? 'Enviando...' : 'Enviar instrucciones'}
        </button>
      </form>
      {mensaje && <div style={{marginTop:14,color:mensaje.includes('instrucciones')?'#2ecc40':'#e74c3c',fontWeight:'bold'}}>{mensaje}</div>}
    </div>
  );
}

export default RecuperarContrasenaPaciente;
