import React, { useState } from 'react';
import '../historial.css';

function HistorialPaciente({ pacienteId }) {
  const [historial, setHistorial] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  React.useEffect(() => {
    if (!pacienteId) return;
    setLoading(true);
    fetch(`http://localhost:5000/api/historial/paciente/${pacienteId}`)
      .then(res => res.json())
      .then(data => {
        setHistorial(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Error al cargar el historial');
        setLoading(false);
      });
  }, [pacienteId]);

  if (!pacienteId) return <p>Selecciona un paciente para ver su historial.</p>;
  if (loading) return <p>Cargando historial...</p>;
  if (error) return <p style={{color:'red'}}>{error}</p>;

  return (
    <div style={{padding:'2rem', textAlign:'center'}}>
      <h2 style={{ color: '#1976d2', marginBottom: '1.2rem' }}>Historial Médico</h2>
      {historial.length === 0 ? (
        <p>No hay registros médicos para este paciente.</p>
      ) : (
        <div style={{margin:'2rem auto',maxWidth:480,minWidth:280,background:'#f7fbff',borderRadius:10,padding:'1rem 1.2rem',boxShadow:'0 2px 8px #b3c2d1',border:'1px solid #b3c2d1',textAlign:'left'}}>
          {historial.map(registro => (
            <div key={registro._id} style={{marginBottom:'0.7rem',background:'#fff',borderRadius:7,padding:'0.6rem 1rem',border:'1px solid #dbe6f3',boxShadow:'0 1px 4px #e3e3e3'}}>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:'0.3rem',fontSize:'1.08rem'}}>
                <span style={{fontWeight:'bold',color:'#2a5d8f'}}>Fecha:</span>
                <span>{new Date(registro.fecha).toLocaleDateString()}</span>
              </div>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:'0.3rem',fontSize:'1.08rem'}}>
                <span style={{fontWeight:'bold',color:'#2a5d8f'}}>Médico:</span>
                <span>{registro.medico?.nombre} {registro.medico?.apellido}</span>
              </div>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:'0.3rem',fontSize:'1.08rem'}}>
                <span style={{fontWeight:'bold',color:'#2a5d8f'}}>Motivo:</span>
                <span>{registro.motivo}</span>
              </div>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:'0.3rem',fontSize:'1.08rem'}}>
                <span style={{fontWeight:'bold',color:'#2a5d8f'}}>Diagnóstico:</span>
                <span>{registro.diagnostico}</span>
              </div>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:'0.3rem',fontSize:'1.08rem'}}>
                <span style={{fontWeight:'bold',color:'#2a5d8f'}}>Tratamiento:</span>
                <span>{registro.tratamiento}</span>
              </div>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:'0.3rem',fontSize:'1.08rem'}}>
                <span style={{fontWeight:'bold',color:'#2a5d8f'}}>Exámenes:</span>
                <span>{registro.examenes}</span>
              </div>
              <div style={{display:'flex',justifyContent:'space-between',fontSize:'1.08rem'}}>
                <span style={{fontWeight:'bold',color:'#2a5d8f'}}>Notas:</span>
                <span>{registro.notas}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default HistorialPaciente;
