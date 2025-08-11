import React, { useState } from 'react';

function Configuracion() {
  const [actual, setActual] = useState("");
  const [nueva, setNueva] = useState("");
  const [repetir, setRepetir] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const paciente = JSON.parse(window.localStorage.getItem('paciente'));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    setError("");
    if (!actual || !nueva || !repetir) {
      setError("Completa todos los campos.");
      return;
    }
    if (nueva.length < 6) {
      setError("La nueva contraseña debe tener al menos 6 caracteres.");
      return;
    }
    if (nueva !== repetir) {
      setError("Las contraseñas nuevas no coinciden.");
      return;
    }
    try {
      const res = await fetch(`http://localhost:5000/api/paciente/cambiar-contrasena/${paciente._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ actual, nueva })
      });
      const data = await res.json();
      if (res.ok) {
        setMensaje("Contraseña actualizada correctamente.");
        setActual(""); setNueva(""); setRepetir("");
      } else {
        setError(data.message || "Error al actualizar la contraseña.");
      }
    } catch (err) {
      setError("Error de conexión con el servidor.");
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: 400, margin: '0 auto' }}>
      <h2 style={{ color: '#1976d2', marginBottom: '1.5rem' }}>Configuración de cuenta</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.2rem',
          background: '#fff',
          padding: '2rem',
          borderRadius: '1rem',
          boxShadow: '0 2px 12px #cce',
        }}
      >
        <label style={{ fontWeight: 'bold', color: '#333' }}>Contraseña actual:</label>
        <input
          type="password"
          value={actual}
          onChange={e => setActual(e.target.value)}
          style={{ padding: '0.7rem', borderRadius: 8, border: '1px solid #bbb' }}
          required
        />
        <label style={{ fontWeight: 'bold', color: '#333' }}>Nueva contraseña:</label>
        <input
          type="password"
          value={nueva}
          onChange={e => setNueva(e.target.value)}
          style={{ padding: '0.7rem', borderRadius: 8, border: '1px solid #bbb' }}
          required
          minLength={6}
        />
        <label style={{ fontWeight: 'bold', color: '#333' }}>Repetir nueva contraseña:</label>
        <input
          type="password"
          value={repetir}
          onChange={e => setRepetir(e.target.value)}
          style={{ padding: '0.7rem', borderRadius: 8, border: '1px solid #bbb' }}
          required
          minLength={6}
        />
        <button
          type="submit"
          style={{
            background: '#1976d2',
            color: '#fff',
            padding: '0.8rem',
            border: 'none',
            borderRadius: 8,
            fontWeight: 'bold',
            fontSize: '1rem',
            cursor: 'pointer',
            transition: 'background 0.18s, transform 0.18s',
          }}
          onMouseOver={e => {
            e.currentTarget.style.transform = 'scale(1.07)';
            e.currentTarget.style.background = '#125ea6';
          }}
          onMouseOut={e => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.background = '#1976d2';
          }}
        >
          Actualizar contraseña
        </button>
        {mensaje && (
          <div style={{ color: 'green', fontWeight: 'bold', textAlign: 'center' }}>{mensaje}</div>
        )}
        {error && (
          <div style={{ color: 'red', fontWeight: 'bold', textAlign: 'center' }}>{error}</div>
        )}
      </form>
    </div>
  );
}

export default Configuracion;
