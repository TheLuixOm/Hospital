import React, { useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

function EscanerQRHtml5({ onScan, onClose }) {
  const qrRef = useRef();
  const html5QrRef = useRef();
  const isRunning = useRef(false);

  useEffect(() => {
    const config = { fps: 10, qrbox: 250 };
    const qrCodeSuccessCallback = (decodedText) => {
      onScan(decodedText);
      if (html5QrRef.current && isRunning.current) {
        html5QrRef.current.stop().catch(() => {});
        isRunning.current = false;
      }
    };
    html5QrRef.current = new Html5Qrcode(qrRef.current.id);
    Html5Qrcode.getCameras().then(cameras => {
      if (cameras && cameras.length) {
        html5QrRef.current.start(
          cameras[0].id,
          config,
          qrCodeSuccessCallback,
          (error) => {}
        ).then(() => {
          isRunning.current = true;
        });
      }
    }).catch(() => {});
    return () => {
      if (html5QrRef.current && isRunning.current) {
        html5QrRef.current.stop().catch(() => {});
        isRunning.current = false;
      }
    };
  }, [onScan]);

  return (
    <div style={{background:'#fff',padding:'2rem',borderRadius:'16px',boxShadow:'0 2px 8px #ccc',maxWidth:400,margin:'2rem auto',position:'relative'}}>
      <button onClick={onClose} style={{position:'absolute',top:10,right:10,fontSize:'1.5rem',background:'none',border:'none',cursor:'pointer'}}>&times;</button>
      <h2 style={{color:'#1976d2',marginBottom:'1rem'}}>Escanear QR de Paciente</h2>
      <div id="qr-html5" ref={qrRef} style={{ width: 320, height: 320, margin: '0 auto' }} />
      <div style={{marginTop:'1rem',color:'#888',fontSize:'0.95em'}}>Permite acceso a la cámara de tu laptop para escanear el QR del paciente.</div>
    </div>
  );
}

export default EscanerQRHtml5;
