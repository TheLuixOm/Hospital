import React, { useState } from 'react';

function FormDatosClinicos({ paciente, onActualizado }) {
  const [form, setForm] = useState({
    antecedentesPersonales: paciente?.antecedentesPersonales || '',
    antecedentesFamiliares: paciente?.antecedentesFamiliares || '',
    alergias: paciente?.alergias || '',
    medicamentosActuales: paciente?.medicamentosActuales || '',
    enfermedadesCronicas: paciente?.enfermedadesCronicas || '',
    vacunas: paciente?.vacunas || '',
  });
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setMensaje('');
    try {
      const res = await fetch(`http://localhost:5000/api/paciente/datos-clinicos/${paciente._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (res.ok) {
        setMensaje('Datos clínicos actualizados.');
        if (onActualizado) onActualizado(data);
      } else {
        setMensaje(data.message || 'Error al actualizar.');
      }
    } catch {
      setMensaje('Error de conexión.');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{background:'#fff',border:'1px solid #d0d7e2',borderRadius:'14px',boxShadow:'0 2px 8px #1976d220',padding:'1.5rem 2rem',margin:'2rem auto',maxWidth:700,marginBottom:'2.5rem',display:'flex',flexDirection:'column',gap:'1.1rem'}}>
      <h3 style={{color:'#1976d2',fontWeight:700,marginBottom:'0.7rem',fontSize:'1.1rem'}}>Editar datos clínicos básicos</h3>
      <textarea name="antecedentesPersonales" value={form.antecedentesPersonales} onChange={handleChange} placeholder="Antecedentes personales" rows={2} style={{padding:8,borderRadius:8,border:'1px solid #d0d7e2'}} />
      <textarea name="antecedentesFamiliares" value={form.antecedentesFamiliares} onChange={handleChange} placeholder="Antecedentes familiares" rows={2} style={{padding:8,borderRadius:8,border:'1px solid #d0d7e2'}} />
      <textarea name="alergias" value={form.alergias} onChange={handleChange} placeholder="Alergias" rows={2} style={{padding:8,borderRadius:8,border:'1px solid #d0d7e2'}} />
      <textarea name="medicamentosActuales" value={form.medicamentosActuales} onChange={handleChange} placeholder="Medicamentos actuales" rows={2} style={{padding:8,borderRadius:8,border:'1px solid #d0d7e2'}} />
      <textarea name="enfermedadesCronicas" value={form.enfermedadesCronicas} onChange={handleChange} placeholder="Enfermedades crónicas" rows={2} style={{padding:8,borderRadius:8,border:'1px solid #d0d7e2'}} />
      <textarea name="vacunas" value={form.vacunas} onChange={handleChange} placeholder="Vacunas" rows={2} style={{padding:8,borderRadius:8,border:'1px solid #d0d7e2'}} />
      <button type="submit" disabled={loading} style={{background:'#1976d2',color:'#fff',padding:'0.7rem 1.5rem',border:'none',borderRadius:'8px',fontWeight:'bold',cursor:'pointer',marginTop:'0.7rem',transition:'all 0.18s',boxShadow:'0 2px 8px #1976d2aa'}}>
        {loading ? 'Guardando...' : 'Guardar cambios'}
      </button>
      {mensaje && <div style={{marginTop:10,color:mensaje.includes('actualizados')?'#2ecc40':'#e74c3c',fontWeight:'bold'}}>{mensaje}</div>}
    </form>
  );
}

export default FormDatosClinicos;
