import React, { useEffect, useState } from 'react';

function PacientesList({ onSelect }) {
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [perPage] = useState(8);

  useEffect(() => {
    fetch('http://localhost:5000/api/paciente/all')
      .then(res => res.json())
      .then(data => {
        setPacientes(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const totalPages = Math.ceil(pacientes.length / perPage);
  const paginated = pacientes.slice((page-1)*perPage, page*perPage);

  if (loading) return <p>Cargando pacientes...</p>;
  if (!pacientes.length) return <p>No hay pacientes registrados.</p>;

  return (
    <div style={{marginTop:'2rem'}}>
      <h2 style={{color:'#1976d2'}}>Selecciona un paciente</h2>
      <ul style={{listStyle:'none',padding:0}}>
        {paginated.map(p => (
          <li key={p._id} style={{border:'1px solid #e3e3e3',borderRadius:'10px',marginBottom:'1rem',padding:'1rem',background:'#f8fbff',cursor:'pointer'}} onClick={() => onSelect(p)}>
            <b>{p.nombre} {p.apellido}</b> <span style={{color:'#888'}}>(Usuario: {p.usuario})</span><br/>
            <span style={{fontSize:'0.95em'}}>Email: {p.email} | Cédula: {p.cedula}</span>
          </li>
        ))}
      </ul>
      <div style={{marginTop:'1rem'}}>
        <button onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={page===1} style={{marginRight:'1rem'}}>Anterior</button>
        Página {page} de {totalPages}
        <button onClick={()=>setPage(p=>Math.min(totalPages,p+1))} disabled={page===totalPages} style={{marginLeft:'1rem'}}>Siguiente</button>
      </div>
    </div>
  );
}

export default PacientesList;
