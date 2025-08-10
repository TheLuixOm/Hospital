
import React, { useEffect, useState } from 'react';
import { FaFileMedical, FaCalendarAlt, FaFileDownload, FaRegStickyNote } from 'react-icons/fa';

function ListaExamenesMedicos({ pacienteId }) {
  const [examenes, setExamenes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!pacienteId) return;
    setLoading(true);
    fetch(`http://localhost:5000/api/examenes/paciente/${pacienteId}`)
      .then(res => res.json())
      .then(data => {
        setExamenes(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [pacienteId]);

  if (loading) return <div style={{textAlign:'center',margin:'2rem 0',color:'#1976d2'}}>Cargando exámenes médicos...</div>;
  if (!examenes.length) return <div style={{textAlign:'center',margin:'2rem 0',color:'#888'}}>No hay exámenes médicos registrados.</div>;

  return (
    <div style={{marginTop:'2.5rem',marginBottom:'2rem'}}>
      <h3 style={{color:'#1976d2',fontWeight:800,letterSpacing:'-1px',marginBottom:'1.5rem',fontSize:'1.5rem',textAlign:'left'}}>Exámenes médicos</h3>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(320px, 1fr))',gap:'1.5rem'}}>
        {examenes.map(examen => (
          <div key={examen._id} style={{background:'#fff',border:'1px solid #e3e3e3',borderRadius:'16px',padding:'1.5rem 1.7rem',boxShadow:'0 4px 18px #1976d220',display:'flex',flexDirection:'column',gap:'0.7rem',position:'relative'}}>
            <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:8}}>
              <FaFileMedical size={22} style={{color:'#1976d2'}} />
              <span style={{fontWeight:700,fontSize:'1.1rem'}}>{examen.tipoExamen || 'Tipo no especificado'}</span>
            </div>
            <div style={{display:'flex',alignItems:'center',gap:8,color:'#555'}}>
              <FaCalendarAlt size={16} style={{marginRight:4}} />
              <span style={{fontWeight:500}}>{examen.fecha ? new Date(examen.fecha).toLocaleDateString() : '-'}</span>
            </div>
            <div style={{margin:'0.5rem 0 0.2rem 0',color:'#333'}}>
              <b>Resultados:</b> <span style={{fontWeight:500}}>{examen.resultados || '-'}</span>
            </div>
            <div style={{color:'#333'}}>
              <b>Observaciones:</b> <span style={{fontWeight:500}}>{examen.observaciones || '-'}</span>
            </div>
            {examen.archivoAdjunto && (
              <div style={{marginTop:'0.7rem',display:'flex',alignItems:'center',gap:8}}>
                <FaFileDownload size={18} style={{color:'#1976d2'}} />
                <a href={`http://localhost:5000${examen.archivoAdjunto}`} target="_blank" rel="noopener noreferrer" style={{color:'#1976d2',fontWeight:'bold',textDecoration:'underline'}}>Ver archivo</a>
              </div>
            )}
            <div style={{position:'absolute',top:14,right:18,opacity:0.13}}><FaRegStickyNote size={38} /></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListaExamenesMedicos;
