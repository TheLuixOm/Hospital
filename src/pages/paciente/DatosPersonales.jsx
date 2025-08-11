import React, { useEffect, useState } from 'react';

function DatosPersonales() {
  const [paciente, setPaciente] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let pacienteLocal = null;
    try {
      pacienteLocal = JSON.parse(window.localStorage.getItem('paciente'));
    } catch {}
    if (pacienteLocal && pacienteLocal._id) {
      fetch(`http://localhost:5000/api/paciente/${pacienteLocal._id}`)
        .then(res => res.json())
        .then(data => {
          setPaciente(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <div style={{padding: '2rem', textAlign: 'center'}}>
      {loading ? (
        <div style={{margin:'2rem auto',color:'#1976d2'}}>Cargando datos...</div>
      ) : paciente ? (
        <div style={{
          margin:'2rem auto',
          maxWidth:480,
          background:'#eaf3fa',
          borderRadius:14,
          padding:'2.2rem 2.5rem',
          boxShadow:'0 2px 12px #b3c2d1',
          textAlign:'left',
          border:'1.5px solid #b3c2d1'
        }}>
          <div style={{marginBottom:'1.7rem',fontWeight:'bold',fontSize:'1.18rem',color:'#2a5d8f',letterSpacing:'0.5px',borderBottom:'2px solid #b3c2d1',paddingBottom:'0.7rem'}}>DATOS PERSONALES</div>
          <div style={{marginBottom:'1.1rem'}}>
            <label style={{fontWeight:'bold',color:'#2a5d8f',display:'block',marginBottom:'0.3rem'}}>Nombre completo:</label>
            <div style={{background:'#fff',borderRadius:7,padding:'0.7rem 1rem',border:'1px solid #b3c2d1'}}>{paciente.nombre || ''} {paciente.apellido || ''}</div>
          </div>
          <div style={{marginBottom:'1.1rem'}}>
            <label style={{fontWeight:'bold',color:'#2a5d8f',display:'block',marginBottom:'0.3rem'}}>Fecha de nacimiento:</label>
            <div style={{background:'#fff',borderRadius:7,padding:'0.7rem 1rem',border:'1px solid #b3c2d1'}}>{paciente.fechaNacimiento ? (typeof paciente.fechaNacimiento === 'string' ? paciente.fechaNacimiento.split('T')[0] : paciente.fechaNacimiento) : ''}</div>
          </div>
          <div style={{marginBottom:'1.1rem'}}>
            <label style={{fontWeight:'bold',color:'#2a5d8f',display:'block',marginBottom:'0.3rem'}}>Cédula:</label>
            <div style={{background:'#fff',borderRadius:7,padding:'0.7rem 1rem',border:'1px solid #b3c2d1'}}>{paciente.cedula || ''}</div>
          </div>
          <div style={{marginBottom:'1.1rem'}}>
            <label style={{fontWeight:'bold',color:'#2a5d8f',display:'block',marginBottom:'0.3rem'}}>Teléfono:</label>
            <div style={{background:'#fff',borderRadius:7,padding:'0.7rem 1rem',border:'1px solid #b3c2d1'}}>{paciente.telefono || ''}</div>
          </div>
          <div style={{marginBottom:'1.1rem'}}>
            <label style={{fontWeight:'bold',color:'#2a5d8f',display:'block',marginBottom:'0.3rem'}}>Dirección:</label>
            <div style={{background:'#fff',borderRadius:7,padding:'0.7rem 1rem',border:'1px solid #b3c2d1'}}>{paciente.direccion || ''}</div>
          </div>
          <div style={{marginBottom:'1.1rem'}}>
            <label style={{fontWeight:'bold',color:'#2a5d8f',display:'block',marginBottom:'0.3rem'}}>Email:</label>
            <div style={{background:'#fff',borderRadius:7,padding:'0.7rem 1rem',border:'1px solid #b3c2d1'}}>{paciente.email || ''}</div>
          </div>
        </div>
      ) : (
        <div style={{margin:'2rem auto',color:'#e74c3c'}}>No se encontraron datos del paciente.</div>
      )}
    </div>
  );
}

export default DatosPersonales;
