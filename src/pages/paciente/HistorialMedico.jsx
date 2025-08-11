import React from 'react';
import HistorialPaciente from '../../components/HistorialPaciente';

function HistorialMedico() {
  let pacienteId = '';
  try {
    const paciente = JSON.parse(window.localStorage.getItem('paciente'));
    pacienteId = paciente?._id || '';
  } catch {}

  return (
    <div style={{padding:'2rem'}}>
      <HistorialPaciente pacienteId={pacienteId} />
    </div>
  );
}

export default HistorialMedico;
