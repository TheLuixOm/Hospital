import React, { useState } from 'react';
import '../historial.css';


function FormRegistroHistorial({ pacienteId, medicoId, onRegistroExitoso }) {
  const [form, setForm] = useState({
    motivo: '',
    diagnostico: '',
    tratamiento: '',
    examenes: '',
    notas: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    if (!pacienteId || !medicoId) {
      setError('Debe seleccionar un paciente y tener sesión de médico activa.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/historial/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, pacienteId, medicoId })
      });
      let data = {};
      try { data = await res.json(); } catch {}
      if (res.ok) {
        setForm({ motivo: '', diagnostico: '', tratamiento: '', examenes: '', notas: '' });
        if (onRegistroExitoso) onRegistroExitoso();
      } else {
        setError(data.message || 'Error al registrar');
      }
    } catch (err) {
      setError('Error de conexión con el servidor');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="form-registro-historial">
      <h3>Registrar Diagnóstico/Consulta</h3>
      {error && <div style={{color:'red',marginBottom:'1rem'}}>{error}</div>}
      <input name="motivo" value={form.motivo} onChange={handleChange} placeholder="Motivo de consulta" required />
      <input name="diagnostico" value={form.diagnostico} onChange={handleChange} placeholder="Diagnóstico" />
      <input name="tratamiento" value={form.tratamiento} onChange={handleChange} placeholder="Tratamiento" />
      <input name="examenes" value={form.examenes} onChange={handleChange} placeholder="Resultados de exámenes" />
      <textarea name="notas" value={form.notas} onChange={handleChange} placeholder="Notas adicionales" style={{minHeight:'60px'}} />
  <button type="submit" disabled={loading} style={{padding:'0.7rem 1.5rem',borderRadius:'8px',background:'#1976d2',color:'#fff',border:'none',fontWeight:'bold'}}>Registrar</button>
    </form>
  );
}



export default FormRegistroHistorial;
