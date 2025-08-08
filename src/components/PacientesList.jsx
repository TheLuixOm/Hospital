import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PacientesList() {
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [perPage] = useState(8);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/api/paciente/all')
      .then(res => res.json())
      .then(data => {
        setPacientes(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = pacientes.filter(p => p.cedula?.toString().includes(search));
  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page-1)*perPage, page*perPage);

  if (loading) return <p>Cargando pacientes...</p>;
  if (!pacientes.length) return <p>No hay pacientes registrados.</p>;

  return (
    <div style={{marginTop:'2rem'}}>
      <h2 style={{color:'#1976d2'}}>Selecciona un paciente</h2>
  <div style={{display:'flex',alignItems:'center',justifyContent:'center',marginBottom:'1rem',maxWidth:'400px',margin:'0 auto'}}>
        <span style={{fontWeight:'bold',fontSize:'1.3em',marginRight:'0.5em',color:'#1976d2'}}>V-</span>
        <input
          type="text"
          placeholder="Ingrese la cédula"
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1); }}
          style={{padding:'0.7rem 1rem',border:'1.5px solid #1976d2',borderRadius:'8px',width:'100%',fontSize:'1em',background:'#f8fbff'}}
        />
      </div>
      {search.trim() ? (
        filtered.length ? (
          <ul style={{listStyle:'none',padding:0}}>
            {paginated.map(p => (
              <li key={p._id} style={{border:'1px solid #e3e3e3',borderRadius:'10px',marginBottom:'1rem',padding:'1rem',background:'#f8fbff',cursor:'pointer'}} onClick={() => navigate(`/registros/${p._id}`, { state: { paciente: p } })}>
                <b>{p.nombre} {p.apellido}</b> <span style={{color:'#888'}}>(Usuario: {p.usuario})</span><br/>
                <span style={{fontSize:'0.95em'}}>Email: {p.email} | Cédula: {p.cedula}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No se encontró ningún paciente con esa cédula.</p>
        )
      ) : null}
      {search.trim() && filtered.length > 0 && totalPages > 1 && (
        <div style={{marginTop:'1rem'}}>
          <button onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={page===1} style={{marginRight:'1rem'}}>Anterior</button>
          Página {page} de {totalPages}
          <button onClick={()=>setPage(p=>Math.min(totalPages,p+1))} disabled={page===totalPages} style={{marginLeft:'1rem'}}>Siguiente</button>
        </div>
      )}
    </div>
  );
}

export default PacientesList;
