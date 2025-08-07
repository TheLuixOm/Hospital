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
            <li key={registro._id} className="historial-item">
              <span className="historial-label">Fecha:</span> {new Date(registro.fecha).toLocaleString()}<br/>
              <span className="historial-label">Médico:</span> {registro.medico?.nombre} {registro.medico?.apellido}<br/>
              <span className="historial-label">Motivo:</span> {registro.motivo}<br/>
              <span className="historial-label">Diagnóstico:</span> {registro.diagnostico}<br/>
              <span className="historial-label">Tratamiento:</span> {registro.tratamiento}<br/>
              <span className="historial-label">Exámenes:</span> {registro.examenes}<br/>
              <span className="historial-label">Notas:</span> {registro.notas}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default HistorialPaciente;
