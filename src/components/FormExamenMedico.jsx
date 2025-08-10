
import React, { useState } from 'react';
import { FaFileMedical, FaCalendarAlt, FaFileUpload, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

function FormExamenMedico({ pacienteId, registroId, onExamenRegistrado }) {
  const [tipoExamen, setTipoExamen] = useState('');
  const [fecha, setFecha] = useState('');
  const [resultados, setResultados] = useState('');
  const [observaciones, setObservaciones] = useState('');
  const [archivo, setArchivo] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMensaje('');
    const formData = new FormData();
    formData.append('pacienteId', pacienteId);
    if (registroId) formData.append('registroId', registroId);
    formData.append('tipoExamen', tipoExamen);
    if (fecha) formData.append('fecha', fecha);
    formData.append('resultados', resultados);
    formData.append('observaciones', observaciones);
    if (archivo) formData.append('archivoAdjunto', archivo);
    try {
      const res = await fetch('http://localhost:5000/api/examenes', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (res.ok) {
        setMensaje('Examen registrado correctamente.');
        setTipoExamen(''); setFecha(''); setResultados(''); setObservaciones(''); setArchivo(null);
        if (onExamenRegistrado) onExamenRegistrado(data.examen);
      } else {
        setMensaje(data.message || 'Error al registrar examen.');
      }
    } catch (err) {
      setMensaje('Error de conexión con el servidor.');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{background:'#fff',padding:'2.2rem 1.5rem',borderRadius:'16px',boxShadow:'0 4px 18px #1976d220',marginBottom:'2rem',maxWidth:500,margin:'auto',marginTop:'2rem',display:'flex',flexDirection:'column',gap:'1.1rem'}}>
      <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:8}}>
        <FaFileMedical size={26} style={{color:'#1976d2'}} />
        <h3 style={{color:'#1976d2',fontWeight:800,letterSpacing:'-1px',fontSize:'1.3rem',margin:0}}>Registrar Examen Médico</h3>
      </div>
      <div style={{display:'flex',gap:10}}>
        <div style={{flex:1}}>
          <label style={{fontWeight:600,color:'#1976d2',fontSize:'0.98rem'}}>Tipo de examen</label>
          <input type="text" placeholder="Ej: Hematología, Rayos X..." value={tipoExamen} onChange={e => setTipoExamen(e.target.value)} required style={{marginBottom:0,padding:9,width:'100%',border:'1px solid #d0d7e2',borderRadius:8,marginTop:3}} />
        </div>
        <div style={{flex:1}}>
          <label style={{fontWeight:600,color:'#1976d2',fontSize:'0.98rem'}}>Fecha</label>
          <div style={{display:'flex',alignItems:'center',gap:6}}>
            <FaCalendarAlt size={16} style={{color:'#1976d2'}} />
            <input type="date" value={fecha} onChange={e => setFecha(e.target.value)} style={{padding:8,width:'100%',border:'1px solid #d0d7e2',borderRadius:8,marginTop:3}} />
          </div>
        </div>
      </div>
      <div>
        <label style={{fontWeight:600,color:'#1976d2',fontSize:'0.98rem'}}>Resultados</label>
        <textarea placeholder="Resultados del examen" value={resultados} onChange={e => setResultados(e.target.value)} rows={3} style={{padding:9,width:'100%',border:'1px solid #d0d7e2',borderRadius:8,marginTop:3}} />
      </div>
      <div>
        <label style={{fontWeight:600,color:'#1976d2',fontSize:'0.98rem'}}>Observaciones</label>
        <textarea placeholder="Observaciones adicionales" value={observaciones} onChange={e => setObservaciones(e.target.value)} rows={2} style={{padding:9,width:'100%',border:'1px solid #d0d7e2',borderRadius:8,marginTop:3}} />
      </div>
      <div style={{display:'flex',flexDirection:'column',alignItems:'flex-start',width:'100%'}}>
        <label style={{fontWeight:600,color:'#1976d2',fontSize:'0.98rem',display:'flex',alignItems:'center',gap:7,marginBottom:6}}><FaFileUpload size={16} style={{color:'#1976d2'}} /> Archivo adjunto</label>
        <label
          htmlFor="archivoAdjunto"
          style={{
            display:'inline-block',
            background:'#e3eafc',
            color:'#1976d2',
            padding:'0.6rem 1.2rem',
            borderRadius:'8px',
            fontWeight:'bold',
            cursor:'pointer',
            boxShadow:'0 1px 4px #1976d220',
            fontSize:'1rem',
            marginBottom: archivo ? 8 : 0,
            transition:'all 0.18s cubic-bezier(.4,1.2,.6,1)',
            outline:'none',
          }}
          onMouseOver={e => e.currentTarget.style.background = '#d0e2ff'}
          onMouseOut={e => e.currentTarget.style.background = '#e3eafc'}
          onMouseDown={e => e.currentTarget.style.transform = 'scale(0.96)'}
          onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
          onBlur={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          Seleccionar archivo
          <input
            id="archivoAdjunto"
            type="file"
            style={{display:'none'}}
            onChange={e => setArchivo(e.target.files[0])}
          />
        </label>
        {archivo && <span style={{marginLeft:2,color:'#1976d2',fontSize:'0.97rem',fontWeight:500}}>{archivo.name}</span>}
      </div>
      <button
        type="submit"
        disabled={loading}
        style={{
          background:'#1976d2',
          color:'#fff',
          padding:'0.8rem 1.7rem',
          border:'none',
          borderRadius:'8px',
          fontWeight:'bold',
          cursor:'pointer',
          fontSize:'1.08rem',
          marginTop:'0.7rem',
          boxShadow:'0 2px 8px #1976d2aa',
          transition:'all 0.18s cubic-bezier(.4,1.2,.6,1)',
          outline:'none',
        }}
        onMouseOver={e => e.currentTarget.style.background = '#1251a3'}
        onMouseOut={e => e.currentTarget.style.background = '#1976d2'}
        onMouseDown={e => e.currentTarget.style.transform = 'scale(0.97)'}
        onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
        onBlur={e => e.currentTarget.style.transform = 'scale(1)'}
      >
        {loading ? 'Registrando...' : 'Registrar Examen'}
      </button>
      {mensaje && (
        <div style={{marginTop:10,display:'flex',alignItems:'center',gap:8,color:mensaje.includes('correctamente')?'#2ecc40':'#e74c3c',fontWeight:'bold',fontSize:'1.05rem'}}>
          {mensaje.includes('correctamente') ? <FaCheckCircle size={18} /> : <FaExclamationCircle size={18} />}
          {mensaje}
        </div>
      )}
  </form>
  );
}

export default FormExamenMedico;
