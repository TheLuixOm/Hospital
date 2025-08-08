import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import HistorialPaciente from './HistorialPaciente';
import FormRegistroHistorial from './FormRegistroHistorial';

function Registros() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [paciente, setPaciente] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [actualizarHistorial, setActualizarHistorial] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`http://localhost:5000/api/paciente/${id}`)
      .then(res => res.json())
      .then(data => {
        setPaciente(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Cargando paciente...</p>;
  if (!paciente) return <p>No se encontró el paciente.</p>;

  return (
    <div style={{marginTop:'2rem'}}>
      <button onClick={() => navigate('/panel-doctor')} style={{marginBottom:'1.5rem',padding:'0.6rem 1.2rem',borderRadius:'8px',background:'#1976d2',color:'#fff',border:'none',fontWeight:'bold'}}>Atrás</button>
  <h2 style={{textAlign:'center'}}>Registros de {paciente?.nombre} {paciente?.apellido}</h2>
      <div style={{margin:'1.5rem 0', textAlign:'center'}}>
        {!mostrarFormulario && (
          <button onClick={() => setMostrarFormulario(true)} style={{padding:'0.7rem 1.5rem',borderRadius:'8px',background:'#1976d2',color:'#fff',border:'none'}}>
            Registrar
          </button>
        )}
        {mostrarFormulario && (
          <div style={{marginTop:'1.5rem'}}>
            <FormRegistroHistorial
              pacienteId={paciente?._id}
              medicoId={window.localStorage.getItem('medicoId') || ''}
              onRegistroExitoso={() => {
                setMostrarFormulario(false);
                setActualizarHistorial(h => !h);
              }}
            />
          </div>
        )}
      </div>
      <HistorialPaciente pacienteId={paciente?._id} key={actualizarHistorial} />
    </div>
  );
}

export default Registros;
