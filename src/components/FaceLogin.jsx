import React, { useRef, useEffect, useState } from 'react';
// face-api.js debe instalarse y cargarse por CDN o npm
// npm install face-api.js
// El import se elimina, se usará window.faceapi

function FaceLogin({ onLogin, loading, error }) {
  const videoRef = useRef();
  const [status, setStatus] = useState('Cargando modelos...');
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    async function loadModels() {
      setStatus('Cargando modelos de reconocimiento facial...');
      await window.faceapi.nets.tinyFaceDetector.loadFromUri('/models');
      await window.faceapi.nets.faceRecognitionNet.loadFromUri('/models');
      await window.faceapi.nets.faceLandmark68Net.loadFromUri('/models');
      setModelsLoaded(true);
      setStatus('Modelos cargados. Permite acceso a la cámara.');
    }
    loadModels();
  }, []);

  useEffect(() => {
    if (modelsLoaded) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          videoRef.current.srcObject = stream;
        })
        .catch(() => setStatus('No se pudo acceder a la cámara.'));
    }
  }, [modelsLoaded]);

  const handleCapture = async () => {
    setProcessing(true);
    setStatus('Procesando rostro...');
    const detections = await window.faceapi.detectSingleFace(videoRef.current, new window.faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptor();
    if (!detections) {
      setStatus('No se detectó ningún rostro. Intenta de nuevo.');
      setProcessing(false);
      return;
    }
    // Enviar descriptor al backend para comparar y autenticar
    onLogin(detections.descriptor);
    setProcessing(false);
  };

  return (
    <div style={{textAlign:'center',padding:'2rem'}}>
      <h2>Iniciar sesión con rostro</h2>
      <video ref={videoRef} autoPlay muted width={320} height={240} style={{borderRadius:12,background:'#000'}} />
      <div style={{margin:'1rem 0',color:'#1976d2'}}>{status}</div>
      <button onClick={handleCapture} disabled={!modelsLoaded || processing} style={{padding:'0.5rem 1.5rem',fontSize:'1.1rem',borderRadius:8,background:'#1976d2',color:'#fff',border:'none',cursor:'pointer'}}>Reconocer rostro</button>
      {error && <div style={{color:'red',marginTop:'1rem'}}>{error}</div>}
    </div>
  );
}

export default FaceLogin;
