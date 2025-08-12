import React, { useEffect, useState } from 'react';


function DatosPersonales() {
  const [paciente, setPaciente] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editando, setEditando] = useState(false);
  const [editTelefono, setEditTelefono] = useState('');
  const [editDireccion, setEditDireccion] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let pacienteLocal = null;
    try {
      pacienteLocal = JSON.parse(window.localStorage.getItem('paciente'));
    } catch {}
    if (pacienteLocal && pacienteLocal._id) {
      fetch(`http://localhost:5000/api/paciente/${pacienteLocal._id}`)
        .then(res => res.json())
        .then(data => {
          setPaciente(data);
          setEditTelefono(data.telefono || '');
          setEditDireccion(data.direccion || '');
          setEditEmail(data.email || '');
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const handleEditar = () => {
    setEditando(true);
    setError('');
  };

  const handleCancelar = () => {
    setEditando(false);
    setError('');
    if (paciente) {
      setEditTelefono(paciente.telefono || '');
      setEditDireccion(paciente.direccion || '');
      setEditEmail(paciente.email || '');
    }
  };

  const handleGuardar = async () => {
    setGuardando(true);
    setError('');
    try {
      const res = await fetch(`http://localhost:5000/api/paciente/${paciente._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          telefono: editTelefono,
          direccion: editDireccion,
          email: editEmail
        })
      });
      const data = await res.json();
      if (res.ok) {
        setPaciente({ ...paciente, telefono: editTelefono, direccion: editDireccion, email: editEmail });
        setEditando(false);
      } else {
        setError(data.message || 'Error al guardar cambios');
      }
    } catch {
      setError('Error de conexión con el servidor');
    }
    setGuardando(false);
  };

  return (
    <div style={{padding: '2rem', textAlign: 'center'}}>
      {loading ? (
        <div style={{margin:'2rem auto',color:'#1976d2'}}>Cargando datos...</div>
      ) : paciente ? (
        <div style={{
          margin:'2rem auto',
          maxWidth:480,
          background:'#eaf3fa',
          borderRadius:14,
          padding:'2.2rem 2.5rem',
          boxShadow:'0 2px 12px #b3c2d1',
          textAlign:'left',
          border:'1.5px solid #b3c2d1'
        }}>
          <div style={{marginBottom:'1.7rem',fontWeight:'bold',fontSize:'1.18rem',color:'#2a5d8f',letterSpacing:'0.5px',borderBottom:'2px solid #b3c2d1',paddingBottom:'0.7rem'}}>DATOS PERSONALES</div>
          {editando && (
            <div style={{marginBottom:'1.2rem',color:'#1976d2',fontWeight:'500',fontSize:'1rem',background:'#e3f1ff',border:'1.5px solid #90caf9',borderRadius:8,padding:'0.6rem 1rem'}}>
              Solo puedes modificar <b>Teléfono</b>, <b>Dirección</b> y <b>Email</b>.<br/>
              Los demás campos son solo lectura.
            </div>
          )}
          <div style={{marginBottom:'1.1rem'}}>
            <label style={{fontWeight:'bold',color:'#2a5d8f',display:'block',marginBottom:'0.3rem'}}>Nombre completo:</label>
            <div style={{background:'#fff',borderRadius:7,padding:'0.7rem 1rem',border:'1px solid #b3c2d1'}}>{paciente.nombre || ''} {paciente.apellido || ''}</div>
          </div>
          <div style={{marginBottom:'1.1rem'}}>
            <label style={{fontWeight:'bold',color:'#2a5d8f',display:'block',marginBottom:'0.3rem'}}>Fecha de nacimiento:</label>
            <div style={{background:'#fff',borderRadius:7,padding:'0.7rem 1rem',border:'1px solid #b3c2d1'}}>{paciente.fechaNacimiento ? (typeof paciente.fechaNacimiento === 'string' ? paciente.fechaNacimiento.split('T')[0] : paciente.fechaNacimiento) : ''}</div>
          </div>
          <div style={{marginBottom:'1.1rem'}}>
            <label style={{fontWeight:'bold',color:'#2a5d8f',display:'block',marginBottom:'0.3rem'}}>Cédula:</label>
            <div style={{background:'#fff',borderRadius:7,padding:'0.7rem 1rem',border:'1px solid #b3c2d1'}}>{paciente.cedula || ''}</div>
          </div>
          <div style={{marginBottom:'1.1rem'}}>
            <label style={{fontWeight:'bold',color:'#2a5d8f',display:'block',marginBottom:'0.3rem'}}>Teléfono:</label>
            {editando ? (
              <input
                value={editTelefono}
                onChange={e => {
                  let val = e.target.value;
                  if (val.startsWith('+')) {
                    val = '+' + val.slice(1).replace(/[^0-9]/g, '');
                  } else {
                    val = val.replace(/[^0-9]/g, '');
                  }
                  setEditTelefono(val);
                }}
                style={{width:'100%',padding:'0.7rem 1rem',borderRadius:7,border:'2px solid #1976d2',background:'#e3f1ff',fontWeight:'bold',color:'#1976d2'}}
                maxLength={16}
                autoFocus
              />
            ) : (
              <div style={{background:'#fff',borderRadius:7,padding:'0.7rem 1rem',border:'1px solid #b3c2d1'}}>{paciente.telefono || ''}</div>
            )}
          </div>
          <div style={{marginBottom:'1.1rem'}}>
            <label style={{fontWeight:'bold',color:'#2a5d8f',display:'block',marginBottom:'0.3rem'}}>Dirección:</label>
            {editando ? (
              <textarea
                value={editDireccion}
                onChange={e => setEditDireccion(e.target.value)}
                style={{width:'100%',padding:'0.7rem 1rem',borderRadius:7,border:'2px solid #1976d2',background:'#e3f1ff',fontWeight:'bold',color:'#1976d2',resize:'none'}}
                rows={2}
              />
            ) : (
              <div style={{background:'#fff',borderRadius:7,padding:'0.7rem 1rem',border:'1px solid #b3c2d1'}}>{paciente.direccion || ''}</div>
            )}
          </div>
          <div style={{marginBottom:'1.1rem'}}>
            <label style={{fontWeight:'bold',color:'#2a5d8f',display:'block',marginBottom:'0.3rem'}}>Email:</label>
            {editando ? (
              <input
                value={editEmail}
                onChange={e => setEditEmail(e.target.value)}
                style={{width:'100%',padding:'0.7rem 1rem',borderRadius:7,border:'2px solid #1976d2',background:'#e3f1ff',fontWeight:'bold',color:'#1976d2'}}
                type="email"
              />
            ) : (
              <div style={{background:'#fff',borderRadius:7,padding:'0.7rem 1rem',border:'1px solid #b3c2d1'}}>{paciente.email || ''}</div>
            )}
          </div>
          {error && <div style={{color:'red',marginBottom:'1rem'}}>{error}</div>}
          <div style={{textAlign:'right'}}>
            {editando ? (
              <>
                <button onClick={handleGuardar} disabled={guardando} style={{marginRight:10,background:'#1976d2',color:'#fff',padding:'0.5rem 1.2rem',border:'none',borderRadius:7,cursor:'pointer',fontWeight:'bold'}}>
                  {guardando ? 'Guardando...' : 'Guardar cambios'}
                </button>
                <button onClick={handleCancelar} disabled={guardando} style={{background:'#ccc',color:'#333',padding:'0.5rem 1.2rem',border:'none',borderRadius:7,cursor:'pointer',fontWeight:'bold'}}>Cancelar</button>
              </>
            ) : (
              <button onClick={handleEditar} style={{background:'#1976d2',color:'#fff',padding:'0.5rem 1.2rem',border:'none',borderRadius:7,cursor:'pointer',fontWeight:'bold'}}>Editar</button>
            )}
          </div>
        </div>
      ) : (
        <div style={{margin:'2rem auto',color:'#e74c3c'}}>No se encontraron datos del paciente.</div>
      )}
    </div>
  );
}

export default DatosPersonales;
