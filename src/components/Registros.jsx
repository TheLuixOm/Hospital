import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import HistorialPaciente from './HistorialPaciente';
import FormRegistroHistorial from './FormRegistroHistorial';
import FormExamenMedico from './FormExamenMedico';
import ListaExamenesMedicos from './ListaExamenesMedicos';
import FormDatosClinicos from './FormDatosClinicos';

function Registros() {
  const { id } = useParams();
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
  const navigate = useNavigate();
  const [paciente, setPaciente] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [actualizarHistorial, setActualizarHistorial] = useState(false);
  const [editandoDatosClinicos, setEditandoDatosClinicos] = useState(false);

  if (loading) return <div style={{marginTop:'2rem',textAlign:'center'}}>Cargando paciente...</div>;
  if (!paciente) return <div style={{marginTop:'2rem',textAlign:'center',color:'#e74c3c'}}>No se encontró el paciente.</div>;

  return (
    <div style={{marginTop:'2rem'}}>
      <button onClick={() => navigate('/panel-doctor')} style={{marginBottom:'1.5rem',padding:'0.6rem 1.2rem',borderRadius:'8px',background:'#1976d2',color:'#fff',border:'none',fontWeight:'bold'}}>Atrás</button>
      <h2 style={{textAlign:'center'}}>Registros de {paciente?.nombre} {paciente?.apellido}</h2>

      {/* Datos clínicos básicos */}
      <div style={{
        background:'#f8faff',
        border:'1px solid #d0d7e2',
        borderRadius:'14px',
        boxShadow:'0 2px 8px #1976d220',
        padding:'1.5rem 2rem',
        margin:'2rem auto 2.5rem auto',
        maxWidth:700
      }}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'0.7rem'}}>
          <h3 style={{color:'#1976d2',fontWeight:700,margin:0,fontSize:'1.2rem'}}>Datos clínicos básicos</h3>
          <button onClick={()=>setEditandoDatosClinicos(e=>!e)} style={{background:'#1976d2',color:'#fff',border:'none',borderRadius:'8px',padding:'0.4rem 1rem',fontWeight:'bold',fontSize:'0.98rem',cursor:'pointer',transition:'all 0.18s'}}>Editar</button>
        </div>
        {editandoDatosClinicos ? (
          <FormDatosClinicos paciente={paciente} onActualizado={nuevo => { setPaciente(nuevo); setEditandoDatosClinicos(false); }} />
        ) : (
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1.1rem'}}>
            <div><b>Antecedentes personales:</b><br/>{paciente.antecedentesPersonales || <span style={{color:'#aaa'}}>No registrado</span>}</div>
            <div><b>Antecedentes familiares:</b><br/>{paciente.antecedentesFamiliares || <span style={{color:'#aaa'}}>No registrado</span>}</div>
            <div><b>Alergias:</b><br/>{paciente.alergias || <span style={{color:'#aaa'}}>No registrado</span>}</div>
            <div><b>Medicamentos actuales:</b><br/>{paciente.medicamentosActuales || <span style={{color:'#aaa'}}>No registrado</span>}</div>
            <div><b>Enfermedades crónicas:</b><br/>{paciente.enfermedadesCronicas || <span style={{color:'#aaa'}}>No registrado</span>}</div>
            <div><b>Vacunas:</b><br/>{paciente.vacunas || <span style={{color:'#aaa'}}>No registrado</span>}</div>
          </div>
        )}
      </div>

      <div style={{margin:'1.5rem 0', textAlign:'center'}}>
        {!mostrarFormulario && (
          <button onClick={() => setMostrarFormulario(true)} style={{padding:'0.7rem 1.5rem',borderRadius:'8px',background:'#1976d2',color:'#fff',border:'none'}}>
            Registrar consulta
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
        <div style={{marginTop:'2.5rem'}}>
          <FormExamenMedico pacienteId={paciente?._id} />
          <ListaExamenesMedicos pacienteId={paciente?._id} />
        </div>
      </div>
      <HistorialPaciente pacienteId={paciente?._id} key={actualizarHistorial} />
    </div>
  );
}

export default Registros;
