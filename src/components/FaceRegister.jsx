import React, { useRef, useEffect, useState } from 'react';
import * as faceapi from 'face-api.js';

function FaceRegister({ onRegister, loading, error }) {
  const videoRef = useRef();
  const [status, setStatus] = useState('Cargando modelos...');
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    async function loadModels() {
      setStatus('Cargando modelos de reconocimiento facial...');
      await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
      await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
      await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
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
    const detections = await faceapi.detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptor();
    if (!detections) {
      setStatus('No se detectó ningún rostro. Intenta de nuevo.');
      setProcessing(false);
      return;
    }
    // Enviar descriptor al padre para guardar en backend
    onRegister(detections.descriptor);
    setProcessing(false);
  };

  return (
    <div style={{textAlign:'center',padding:'2rem'}}>
      <h3>Registrar rostro</h3>
      <video ref={videoRef} autoPlay muted width={320} height={240} style={{borderRadius:12,background:'#000'}} />
      <div style={{margin:'1rem 0',color:'#1976d2'}}>{status}</div>
      <button onClick={handleCapture} disabled={!modelsLoaded || processing} style={{padding:'0.5rem 1.5rem',fontSize:'1.1rem',borderRadius:8,background:'#1976d2',color:'#fff',border:'none',cursor:'pointer'}}>Capturar rostro</button>
      {error && <div style={{color:'red',marginTop:'1rem'}}>{error}</div>}
    </div>
  );
}

export default FaceRegister;
