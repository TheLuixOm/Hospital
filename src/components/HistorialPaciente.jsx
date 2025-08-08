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
    <div className="historial-container">
      <h2 style={{ color: '#1976d2', marginBottom: '1.2rem' }}>Historial Médico</h2>
      {historial.length === 0 ? (
        <p>No hay registros médicos para este paciente.</p>
      ) : (
        <ul className="historial-list">
          {historial.map(registro => (
            <li key={registro._id} className="historial-item" style={{background:'#fff',border:'1px solid #e3e3e3',borderRadius:'12px',padding:'1.5rem',marginBottom:'1.5rem',boxShadow:'0 2px 8px #e3e3e3'}}>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:'1rem'}}>
                <span style={{fontWeight:'bold',fontSize:'1.1em'}}>Fecha:</span>
                <span>{new Date(registro.fecha).toLocaleString()}</span>
              </div>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:'1rem'}}>
                <span style={{fontWeight:'bold',fontSize:'1.1em'}}>Médico:</span>
                <span>{registro.medico?.nombre} {registro.medico?.apellido}</span>
              </div>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:'1rem'}}>
                <span style={{fontWeight:'bold',fontSize:'1.1em'}}>Motivo:</span>
                <span>{registro.motivo}</span>
              </div>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:'1rem'}}>
                <span style={{fontWeight:'bold',fontSize:'1.1em'}}>Diagnóstico:</span>
                <span>{registro.diagnostico}</span>
              </div>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:'1rem'}}>
                <span style={{fontWeight:'bold',fontSize:'1.1em'}}>Tratamiento:</span>
                <span>{registro.tratamiento}</span>
              </div>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:'1rem'}}>
                <span style={{fontWeight:'bold',fontSize:'1.1em'}}>Exámenes:</span>
                <span>{registro.examenes}</span>
              </div>
              <div style={{display:'flex',justifyContent:'space-between'}}>
                <span style={{fontWeight:'bold',fontSize:'1.1em'}}>Notas:</span>
                <span>{registro.notas}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default HistorialPaciente;
