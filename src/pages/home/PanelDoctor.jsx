import React, { useState, useEffect } from 'react';
import HistorialPaciente from '../../components/HistorialPaciente';
import FormRegistroHistorial from '../../components/FormRegistroHistorial';
import PacientesList from '../../components/PacientesList';

import { FaQrcode, FaSearch, FaStethoscope, FaSignOutAlt } from 'react-icons/fa';
import EscanerQRHtml5 from '../../components/EscanerQRHtml5';


function PanelDoctor({ doctor = 'Nombre Apellido', onCerrarSesion }) {
  const [showHistorial, setShowHistorial] = useState(false);
  const [pacienteId, setPacienteId] = useState('');
  const [showRegistro, setShowRegistro] = useState(false);
  const [showEscaner, setShowEscaner] = useState(false);
  const [sesionInvalida, setSesionInvalida] = useState(false);

  // Siempre leer medicoId de localStorage en cada render
  const medicoId = window.localStorage.getItem('medicoId') || '';
  useEffect(() => {
    // Si el valor es null, undefined, vacío o "undefined", limpiar y forzar cierre de sesión
    if (!medicoId || medicoId === 'undefined' || medicoId.length < 10) {
      window.localStorage.removeItem('medicoId');
      setSesionInvalida(true);
    } else {
      setSesionInvalida(false);
    }
  }, [medicoId]);

  const handleCerrarSesion = () => {
    window.localStorage.removeItem('medicoId');
    if (onCerrarSesion) onCerrarSesion();
    window.location.href = '/login-doctor';
  };

  if (sesionInvalida) {
    return (
      <div style={{padding:'2rem',textAlign:'center'}}>
        <h2 style={{color:'#e74c3c'}}>Sesión inválida</h2>
        <p>No se encontró una sesión de médico activa. Por favor, inicie sesión nuevamente.</p>
        <div style={{color:'#888',margin:'1rem 0'}}>Valor actual de medicoId: <code>{JSON.stringify(medicoId)}</code></div>
        <button onClick={handleCerrarSesion} style={{padding:'0.7rem 1.5rem',borderRadius:'8px',background:'#1976d2',color:'#fff',border:'none',marginTop:'1rem'}}>Ir a Login</button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Bienvenido, Dr. {doctor}</h1>
      <p style={styles.subtitle}>Seleccione una acción para continuar:</p>

      <div style={styles.cardContainer}>
        <div style={styles.card}>
          <FaQrcode size={32} style={styles.icon} />
          <h3>Escanear QR</h3>
          <p>Escanea el código QR del paciente para acceder directamente a su registro médico.</p>
          <button onClick={() => setShowEscaner(true)} style={{marginTop:'0.5rem',padding:'0.5rem 1rem',borderRadius:'6px',border:'none',background:'#1976d2',color:'#fff'}}>Abrir Escáner</button>
        </div>

        <div style={styles.card}>
          <FaSearch size={32} style={styles.icon} />
          <h3>Pacientes</h3>
          <p>Selecciona un paciente para ver su historial o registrar diagnóstico.</p>
          <button
            onClick={() => setShowHistorial(true)}
            style={{marginTop:'0.5rem',padding:'0.5rem 1rem',borderRadius:'6px',border:'none',background:'#0077cc',color:'#fff'}}
            disabled={!pacienteId}
          >
            Ver Historial
          </button>
          <button
            onClick={() => setShowRegistro(true)}
            style={{marginTop:'0.5rem',padding:'0.5rem 1rem',borderRadius:'6px',border:'none',background:'#1976d2',color:'#fff',marginLeft:'0.5rem'}}
            disabled={!pacienteId}
          >
            Registrar Diagnóstico
          </button>
        </div>

        <div style={styles.card}>
          <FaStethoscope size={32} style={styles.icon} />
          <h3>Registrar Diagnóstico</h3>
          <p>Agrega un nuevo diagnóstico o tratamiento al historial de un paciente.</p>
          <button onClick={() => setShowRegistro(true)} style={{marginTop:'0.5rem',padding:'0.5rem 1rem',borderRadius:'6px',border:'none',background:'#1976d2',color:'#fff'}}>Registrar</button>
        </div>

        <div style={{ ...styles.card, backgroundColor: '#ffecec', cursor: 'pointer' }} onClick={handleCerrarSesion}>
          <FaSignOutAlt size={32} style={{ ...styles.icon, color: '#e74c3c' }} />
          <h3 style={{ color: '#e74c3c' }}>Cerrar Sesión</h3>
          <p>Salir de su sesión actual de forma segura.</p>
        </div>
      </div>


      <PacientesList onSelect={p => setPacienteId(p._id)} />

      {showEscaner && (
        <EscanerQRHtml5
          onScan={id => {
            setShowEscaner(false);
            setPacienteId(id);
            setShowHistorial(true);
          }}
          onClose={() => setShowEscaner(false)}
        />
      )}

      {showHistorial && pacienteId && (
        <div style={{marginTop:'2rem',background:'#fff',borderRadius:'12px',boxShadow:'0 2px 8px #ccc',padding:'2rem'}}>
          <button onClick={() => setShowHistorial(false)} style={{float:'right',background:'none',border:'none',fontSize:'1.5rem',cursor:'pointer'}}>&times;</button>
          <HistorialPaciente pacienteId={pacienteId} />
        </div>
      )}

      {showRegistro && pacienteId && (
        <div style={{marginTop:'2rem',background:'#fff',borderRadius:'12px',boxShadow:'0 2px 8px #ccc',padding:'2rem',position:'relative'}}>
          <button onClick={() => setShowRegistro(false)} style={{position:'absolute',top:'1rem',right:'1rem',background:'none',border:'none',fontSize:'1.5rem',cursor:'pointer'}}>&times;</button>
          <div style={{marginBottom:'1rem',textAlign:'left',color:'#1976d2',fontWeight:'bold'}}>
            Paciente seleccionado: <span style={{color:'#333'}}>{pacienteId || 'Ninguno'}</span>
          </div>
          <FormRegistroHistorial pacienteId={pacienteId} medicoId={medicoId} onRegistroExitoso={() => setShowRegistro(false)} />
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: '2rem',
    maxWidth: '1000px',
    margin: 'auto',
    textAlign: 'center',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '0.5rem',
  },
  subtitle: {
    fontSize: '1.1rem',
    color: '#555',
    marginBottom: '2rem',
  },
  cardContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '1.5rem',
  },
  card: {
    backgroundColor: '#f0f8ff',
    padding: '1.5rem',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s ease',
  },
  icon: {
    marginBottom: '0.5rem',
    color: '#0077cc',
  },
};

export default PanelDoctor;
