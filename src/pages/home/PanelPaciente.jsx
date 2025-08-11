import React from 'react';
import { useNavigate } from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react';
import { FaSignOutAlt } from 'react-icons/fa';

function PanelPaciente() {
  const navigate = useNavigate();
  let paciente = null;
  try {
    paciente = JSON.parse(window.localStorage.getItem('paciente'));
  } catch {}
  return (
    <div style={styles.container}>
      <div style={{position:'relative',maxWidth:'1000px',margin:'0 auto 0.5rem auto'}}>
        <h1 style={{...styles.title,marginBottom:0}}>Bienvenido{paciente?.nombre ? `, ${paciente.nombre}` : ''}</h1>
        <button
          onClick={() => {
            window.localStorage.removeItem('paciente');
            window.location.href = '/';
          }}
          style={{
            position:'absolute',
            top:0,
            right:'-100px', 
            background:'#ffecec',
            border:'1.5px solid #e74c3c',
            borderRadius:'12px',
            boxShadow:'0 4px 12px rgba(231,76,60,0.08)',
            padding:'0.7rem 1.3rem',
            display:'flex',
            alignItems:'center',
            gap:'0.7rem',
            cursor:'pointer',
            fontWeight:'bold',
            color:'#e74c3c',
            fontSize:'1.08rem',
            transition:'background 0.2s',
          }}
          onMouseOver={e=>e.currentTarget.style.background='#fadbd8'}
          onMouseOut={e=>e.currentTarget.style.background='#ffecec'}
        >
          <FaSignOutAlt size={20} />
          Cerrar sesión
        </button>
      </div>
      <p style={styles.subtitle}>Este es tu panel de paciente. Aquí podrás consultar y actualizar tu información personal y médica.</p>

      {/* QR permanente del paciente */}
      {paciente?._id && (
        <div style={{margin:'2rem auto',maxWidth:300,background:'#fff',borderRadius:16,padding:'1.5rem',boxShadow:'0 2px 8px #ccc'}}>
          <h3 style={{color:'#1976d2',marginBottom:'1rem'}}>Tu Código QR Personal</h3>
          <QRCodeCanvas id="qr-canvas" value={paciente._id} size={200} level="H" includeMargin={true} />
          <div style={{marginTop:'1rem',fontSize:'0.95em',color:'#888'}}>Este QR es único y permanente. Puedes imprimirlo o guardarlo para ser escaneado por tu médico.</div>
          <div style={{marginTop:'1.5rem',display:'flex',gap:'1rem',justifyContent:'center'}}>
            <button
              onClick={() => {
                const canvas = document.getElementById('qr-canvas');
                const url = canvas.toDataURL('image/png');
                const a = document.createElement('a');
                a.href = url;
                a.download = `qr_paciente_${paciente._id}.png`;
                a.click();
              }}
              style={{
                padding:'0.5rem 1.2rem',
                borderRadius:8,
                border:'none',
                background:'#1976d2',
                color:'#fff',
                fontWeight:'bold',
                cursor:'pointer',
                transition:'transform 0.18s, background 0.18s',
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
              Descargar QR
            </button>
            <button
              onClick={() => {
                const canvas = document.getElementById('qr-canvas');
                const dataUrl = canvas.toDataURL('image/png');
                const win = window.open('', '_blank');
                win.document.write(`
                  <html><head><title>Imprimir QR</title></head><body style='margin:0;padding:0;'>
                    <img id='qrimg' src='${dataUrl}' style='width:200px;height:200px;display:block;margin:2rem auto' />
                    <h3 style='text-align:center;font-family:sans-serif'>QR de paciente</h3>
                    <script>
                      var printQR = function() {
                        window.focus();
                        setTimeout(function(){ window.print(); }, 200);
                      };
                      var img = document.getElementById('qrimg');
                      if (img.complete) printQR();
                      else img.onload = printQR;
                    <\/script>
                  </body></html>
                `);
              }}
              style={{
                padding:'0.5rem 1.2rem',
                borderRadius:8,
                border:'none',
                background:'#43a047',
                color:'#fff',
                fontWeight:'bold',
                cursor:'pointer',
                transition:'transform 0.18s, background 0.18s',
              }}
              onMouseOver={e => {
                e.currentTarget.style.transform = 'scale(1.07)';
                e.currentTarget.style.background = '#2e7031';
              }}
              onMouseOut={e => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.background = '#43a047';
              }}
            >
              Imprimir QR
            </button>
          </div>
        </div>
      )}

      <div style={styles.cardContainer}>
        <button
          style={styles.cardBtn}
          onClick={()=>navigate('/paciente/datosPersonales')}
          onMouseOver={e => {
            e.currentTarget.style.background = '#1976d2';
            e.currentTarget.style.color = '#fff';
            e.currentTarget.style.transform = 'scale(1.04)';
          }}
          onMouseOut={e => {
            e.currentTarget.style.background = '#f0f8ff';
            e.currentTarget.style.color = '#222';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <h3>Datos Personales</h3>
          <p>Visualiza y edita tus datos personales y de contacto.</p>
        </button>
        <button
          style={styles.cardBtn}
          onClick={()=>navigate('/paciente/historialMedico')}
          onMouseOver={e => {
            e.currentTarget.style.background = '#1976d2';
            e.currentTarget.style.color = '#fff';
            e.currentTarget.style.transform = 'scale(1.04)';
          }}
          onMouseOut={e => {
            e.currentTarget.style.background = '#f0f8ff';
            e.currentTarget.style.color = '#222';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <h3>Historial Médico</h3>
          <p>Consulta tu historial de diagnósticos, alergias y enfermedades.</p>
        </button>
        <button
          style={styles.cardBtn}
          onClick={()=>navigate('/paciente/configuracion')}
          onMouseOver={e => {
            e.currentTarget.style.background = '#1976d2';
            e.currentTarget.style.color = '#fff';
            e.currentTarget.style.transform = 'scale(1.04)';
          }}
          onMouseOut={e => {
            e.currentTarget.style.background = '#f0f8ff';
            e.currentTarget.style.color = '#222';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <h3>Configuración</h3>
          <p>Actualiza tu contraseña y preferencias de cuenta.</p>
        </button>
      </div>
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
    color: '#1976d2',
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
  cardBtn: {
    backgroundColor: '#f0f8ff',
    padding: '1.5rem',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s, background 0.2s',
    cursor: 'pointer',
    border: 'none',
    outline: 'none',
    font: 'inherit',
    textAlign: 'left',
    color: '#222',
    margin: 0,
  },

};

export default PanelPaciente;
