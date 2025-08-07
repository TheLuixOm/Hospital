
import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';

function EscanerQR({ onScan, onClose }) {
  const [errorMsg, setErrorMsg] = useState('');
  // Forzar cámara frontal (user) para laptops
  const facingMode = 'user';
  const [videoVisible, setVideoVisible] = useState(true);
  return (
        <div style={{background:'#fff',padding:'2rem',borderRadius:'16px',boxShadow:'0 2px 8px #ccc',maxWidth:400,margin:'2rem auto',position:'relative'}}>
          // Archivo eliminado. El escáner QR ahora está en EscanerQRHtml5.jsx usando html5-qrcode.
      <button onClick={onClose} style={{position:'absolute',top:10,right:10,fontSize:'1.5rem',background:'none',border:'none',cursor:'pointer'}}>&times;</button>
      <h2 style={{color:'#1976d2',marginBottom:'1rem'}}>Escanear QR de Paciente</h2>
      <QrReader
        constraints={{ facingMode }}
        onResult={(result, error) => {
          if (!!result) {
            onScan(result?.text);
          }
          if (error && error.name === 'NotAllowedError') {
            setErrorMsg('Permiso de cámara denegado. Actívalo en la barra de direcciones.');
            setVideoVisible(false);
          } else if (error && error.name === 'NotFoundError') {
            setErrorMsg('No se encontró cámara disponible.');
            setVideoVisible(false);
          } else if (error && error.name === 'NotReadableError') {
            setErrorMsg('La cámara está en uso por otra aplicación.');
            setVideoVisible(false);
          } else if (error && error.name === 'OverconstrainedError') {
            setErrorMsg('No se pudo acceder a la cámara solicitada.');
            setVideoVisible(false);
          }
        }}
        videoContainerStyle={{ width: '100%', height: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        videoStyle={{ width: '100%', maxWidth: 350, borderRadius: 12, objectFit: 'cover', background: '#000' }}
        style={{ width: '100%' }}
      />
      {!videoVisible && <div style={{color:'red',marginTop:'1rem'}}>No se puede mostrar la cámara. Verifica permisos o disponibilidad.</div>}
      {errorMsg && <div style={{color:'red',marginTop:'1rem'}}>{errorMsg}</div>}
      <div style={{marginTop:'1rem',color:'#888',fontSize:'0.95em'}}>Permite acceso a la cámara de tu laptop para escanear el QR del paciente.</div>
    </div>
  );
}

export default EscanerQR;
