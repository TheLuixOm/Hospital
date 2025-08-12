import React, { useState, useRef } from 'react';
import fondoCarnet from '/fondo-carnet.png';
import { QRCodeCanvas } from 'qrcode.react';

function CarnetMedico() {
  const paciente = JSON.parse(window.localStorage.getItem('paciente')) || {};
  const [foto, setFoto] = useState(paciente.fotoPerfil || window.localStorage.getItem('fotoPerfil') || null);
  const [fotoSubida, setFotoSubida] = useState(!!(paciente.fotoPerfil || window.localStorage.getItem('fotoPerfil')));
  const carnetDivRef = useRef(null);

  const handleFotoChange = async e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async ev => {
        setFoto(ev.target.result);
        setFotoSubida(true);
        window.localStorage.setItem('fotoPerfil', ev.target.result);
        // Guardar en backend
        try {
          await fetch(`${process.env.REACT_APP_API_URL || ''}/api/paciente/foto-perfil/${paciente._id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ fotoPerfil: ev.target.result })
          });
        } catch (err) {
          // Puedes mostrar un mensaje de error si lo deseas
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Descargar carnet como imagen PNG usando html2canvas
  const handleDescargar = async () => {
    if (!carnetDivRef.current) return;
    const html2canvas = (await import('html2canvas')).default;
    html2canvas(carnetDivRef.current, { scale: 2 }).then(canvas => {
      const url = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = url;
      a.download = `carnet_medico_${paciente._id || ''}.png`;
      a.click();
    });
  };

  // Imprimir carnet usando html2canvas
  const handleImprimir = async () => {
    if (!carnetDivRef.current) return;
    const html2canvas = (await import('html2canvas')).default;
    html2canvas(carnetDivRef.current, { scale: 2 }).then(canvas => {
      const dataUrl = canvas.toDataURL('image/png');
      const win = window.open('', '_blank');
      win.document.write(`
        <html><head><title>Imprimir Carnet Médico</title></head><body style='margin:0;padding:0;'>
          <img id='carnetimg' src='${dataUrl}' style='width:480px;height:300px;display:block;margin:2rem auto' />
          <h3 style='text-align:center;font-family:sans-serif'>Carnet Médico Digital</h3>
          <script>
            var printCarnet = function() {
              window.focus();
              setTimeout(function(){ window.print(); }, 200);
            };
            var img = document.getElementById('carnetimg');
            if (img.complete) printCarnet();
            else img.onload = printCarnet;
          <\/script>
        </body></html>
      `);
    });
  };

  return (
    <div style={{
      display:'flex',
      flexDirection:'column',
      alignItems:'center',
      justifyContent:'center',
      minHeight:'100vh',
      background:'#f5f7fa',
    }}>
      <h2 style={{color:'#1976d2',fontWeight:'bold',marginBottom:'2.2rem',marginTop:'0.5rem'}}>Carnet Médico</h2>
      <p style={{maxWidth:'400px',textAlign:'center',color:'#333',marginBottom:'2.2rem',fontSize:'1rem'}}>
        Este carnet te permite identificarte como paciente, mostrar tu información médica básica y tu código QR para consultas rápidas.
      </p>
      <div
        id="carnet-medico"
        ref={carnetDivRef}
        style={{
        background:`url(${fondoCarnet})`,
        backgroundSize:'cover',
        backgroundPosition:'center',
        borderRadius:'18px',
        boxShadow:'0 4px 24px rgba(33,150,243,0.13)',
        padding:'2.2rem 2.8rem',
        width:'480px',
        height:'300px',
        position:'relative',
        display:'flex',
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'flex-start',
        marginBottom:'2.5rem',
      }}>
        {/* Datos a la izquierda */}
        <div style={{flex:'1',display:'flex',flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start',height:'100%'}}>
          <div style={{width:'100%',textAlign:'center',marginBottom:'0.5rem'}}>
            <div style={{fontWeight:'bold',color:'#1976d2',fontSize:'2.1rem',letterSpacing:'1.5px'}}>MediDataOS</div>
            <div style={{color:'#333',fontSize:'1.25rem',marginTop:'0.18rem'}}><b>V-</b> {paciente.cedula || '---'}</div>
          </div>
          <div style={{marginBottom:'0.7rem',color:'#333',fontSize:'1.15rem',lineHeight:'1.3'}}>
            {paciente.nombre && <div><b>Nombre:</b> {paciente.nombre}</div>}
            {paciente.apellido && <div><b>Apellido:</b> {paciente.apellido}</div>}
            {paciente.tipoSangre && <div><b>Tipo de sangre:</b> {paciente.tipoSangre}</div>}
          </div>
          <div style={{background:'#fff',padding:'0.3rem',borderRadius:'16px',boxShadow:'0 2px 8px #bbdefb',marginTop:'0.5rem'}}>
            <QRCodeCanvas value={paciente._id || ''} size={140} level="H" includeMargin={false} />
          </div>
        </div>
        {/* Foto en la esquina inferior derecha */}
        <div style={{position:'absolute',right:'38px',bottom:'38px',display:'flex',flexDirection:'column',alignItems:'center',gap:'0.7rem'}}>
          <div style={{width:'140px',height:'140px',borderRadius:'22px',overflow:'hidden',background:'#fff',boxShadow:'0 2px 8px #bbdefb'}}>
            {foto ? (
              <img src={foto} alt="Foto perfil" style={{width:'100%',height:'100%',objectFit:'cover'}} />
            ) : (
              <span style={{color:'#bbb',fontSize:'1.5rem',display:'flex',alignItems:'center',justifyContent:'center',height:'100%'}}>+</span>
            )}
          </div>
          {!fotoSubida && (
            <input type="file" accept="image/*" onChange={handleFotoChange} style={{fontSize:'0.8rem',padding:'0.2rem 0'}} />
          )}
        </div>
      </div>
      <div style={{display:'flex',gap:'1.2rem',marginBottom:'1.5rem',marginTop:'0.5rem'}}>
        <button onClick={handleDescargar} style={{background:'#1976d2',color:'#fff',border:'none',borderRadius:'8px',padding:'0.7rem 1.5rem',fontWeight:'bold',cursor:'pointer'}}>Descargar</button>
        <button onClick={handleImprimir} style={{background:'#43a047',color:'#fff',border:'none',borderRadius:'8px',padding:'0.7rem 1.5rem',fontWeight:'bold',cursor:'pointer'}}>Imprimir</button>
      </div>
    </div>
  );
}

export default CarnetMedico;
