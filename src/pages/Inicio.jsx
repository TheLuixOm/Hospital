import React from 'react';
import { useNavigate } from 'react-router-dom';


function Inicio() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <img
            src="https://i.ibb.co/zH2bpDpd/ai-generative-portrait-of-confident-male-doctor-in-white-coat-and-stethoscope-standing-with-arms-cro.jpg"
            alt="Doctores"
            style={styles.doctorImg}
          />
          <div>
            <h1 style={styles.title}>
              MediData<span style={styles.highlight}>OS</span>
            </h1>
            <p style={styles.subtitle}>
              Tu plataforma confiable para guardar y visualizar registros médicos.
            </p>
          </div>
        </div>
      </header>

      <section style={styles.loginButtons}>
  <h2 style={styles.loginTitle}>Acceso Rápido</h2>
  <div style={styles.loginOptions}>
    <button
      onClick={() => navigate('/login-doctor')}
      style={styles.loginBtnDoctor}
      onMouseOver={e => {
        e.currentTarget.style.transform = 'scale(1.08)';
        e.currentTarget.style.background = '#125ea6';
      }}
      onMouseOut={e => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.background = '#1976d2';
      }}
    >
      👨‍⚕️ Iniciar como Doctor
    </button>
    <button
      onClick={() => navigate('/login-paciente')}
      style={styles.loginBtnPaciente}
      onMouseOver={e => {
        e.currentTarget.style.transform = 'scale(1.08)';
        e.currentTarget.style.background = '#2286c3';
      }}
      onMouseOut={e => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.background = '#64b5f6';
      }}
    >
      🧑‍⚕️ Iniciar como Paciente
    </button>
  </div>
  </section>


      <section className="inicio-section">
        <h2 className="inicio-section-title">Sobre Nosotros</h2>
        <p className="inicio-text">
          Somos una plataforma dedicada a brindar servicios médicos digitales de calidad, 
          facilitando la comunicación entre pacientes y profesionales de la salud. Nuestra misión es 
          mejorar el acceso a la atención médica con rapidez, seguridad y confianza.
        </p>
      </section>

      <section className="inicio-section">
        <h2 className="inicio-section-title">¿Qué ofrecemos?</h2>
        <p className="inicio-text">
          Regístrate como paciente o doctor, accede a tu perfil, y administra tus datos médicos 
          de forma segura. Próximamente incluiremos gestión de citas, historial clínico y más.
        </p>
      </section>

      <section style={styles.servicesRow}>
        <div style={styles.serviceCard}>
          <span style={styles.serviceIcon}>❤️</span>
          <div style={styles.serviceTitle}>Monitoreo Cardíaco</div>
          <div style={styles.serviceDesc}>Control y seguimiento de tu salud cardíaca.</div>
        </div>
        <div style={styles.serviceCard}>
          <span style={styles.serviceIcon}>🧪</span>
          <div style={styles.serviceTitle}>Pruebas de Laboratorio</div>
          <div style={styles.serviceDesc}>Resultados y gestión de exámenes médicos.</div>
        </div>
        <div style={styles.serviceCard}>
          <span style={styles.serviceIcon}>🩺</span>
          <div style={styles.serviceTitle}>Chequeo de Síntomas</div>
          <div style={styles.serviceDesc}>Consulta rápida de síntomas y orientación.</div>
        </div>
        <div style={styles.serviceCard}>
          <span style={styles.serviceIcon}>💬</span>
          <div style={styles.serviceTitle}>Soporte y ayuda</div>
          <div style={styles.serviceDesc}>Soporte.</div>
        </div>
      </section>

      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <div style={styles.contactInfo}>
            <h3 style={styles.footerHeading}>Contáctanos</h3>
            <p>📍 Boca Caneyes, Calle principal</p>
            <p>📞 +58 414-747-0668</p>
            <p>✉️ MediDataOS@clinico.com</p>
          </div>
          <div style={styles.social}>
            <h3 style={styles.footerHeading}>Síguenos</h3>
            <div style={styles.socialLinks}>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" style={styles.socialLink}>Facebook</a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" style={styles.socialLink}>Twitter</a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" style={styles.socialLink}>Instagram</a>
            </div>
          </div>
        </div>
        <p style={styles.copy}>&copy; 2025 MediDataOS. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '2rem auto',
    padding: '2rem',
    fontFamily: "'Segoe UI', 'Roboto', Arial, sans-serif",
    color: '#000000ff',
    background: '#f6f8fb',
    borderRadius: '32px',
    boxShadow: '0 8px 32px rgba(33,150,243,0.10)',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  header: {
    background: '#e3f2fd', 
    borderRadius: '24px',
    padding: '2rem',
    marginBottom: '2rem',
    boxShadow: '0 2px 12px rgba(33,150,243,0.10)',
  },
  headerContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '2rem',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  doctorImg: {
    width: '220px',
    height: '220px',
    objectFit: 'cover',
    borderRadius: '18px',
    boxShadow: '0 2px 12px rgba(33,150,243,0.15)',
  },
  title: {
    fontSize: '2.5rem',
    color: '#1976d2', 
    fontWeight: '700',
    marginBottom: '0.5rem',
    letterSpacing: '-1px',
  },
  highlight: {
    color: '#fff',
    background: '#64b5f6', 
    borderRadius: '8px',
    padding: '0.2rem 0.7rem',
    marginLeft: '0.5rem',
    fontWeight: 'bold',
    boxShadow: '0 1px 6px rgba(33,150,243,0.10)',
  },
  subtitle: {
    fontSize: '1.2rem',
    color: '#1976d2',
    marginBottom: '1.5rem',
    fontWeight: '500',
  },
  ctaBtn: {
    background: '#64b5f6',
    color: '#fff',
    border: 'none',
    borderRadius: '24px',
    padding: '0.8rem 2rem',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(33,150,243,0.10)',
    transition: 'background 0.2s',
  },
  ctaBtnHover: {
    background: '#1976d2',
  },
  servicesRow: {
    display: 'flex',
    gap: '2rem',
    justifyContent: 'center',
    margin: '2rem 0',
    flexWrap: 'wrap',
  },
  serviceCard: {
    background: '#bbdefb', 
    color: '#1976d2',
    borderRadius: '18px',
    padding: '2rem 1.5rem',
    minWidth: '180px',
    maxWidth: '220px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: '0 2px 12px rgba(33,150,243,0.12)',
    transition: 'transform 0.2s',
  },
  serviceIcon: {
    fontSize: '2.8rem',
    marginBottom: '1rem',
  },
  serviceTitle: {
    fontSize: '1.1rem',
    fontWeight: '600',
    marginBottom: '0.5rem',
  },
  serviceDesc: {
    fontSize: '0.95rem',
    color: '#1565c0',
    textAlign: 'center',
  },
  infoSection: {
    margin: '2rem 0',
    background: '#fff',
    borderRadius: '18px',
    boxShadow: '0 2px 12px rgba(33,150,243,0.07)',
    padding: '2rem',
  },
  infoTitle: {
    fontSize: '1.6rem',
    marginBottom: '1rem',
    color: '#1976d2',
    borderBottom: '3px solid #64b5f6',
    display: 'inline-block',
    paddingBottom: '4px',
    fontWeight: '700',
    letterSpacing: '-0.5px',
  },
  infoText: {
    fontSize: '1.08rem',
    color: '#3949ab',
    margin: '0.5rem 0 0 0',
  },
  footer: {
    backgroundColor: '#e3f2fd', 
    color: '#1976d2',
    borderRadius: '0 0 32px 32px',
    padding: '2rem 2rem 1rem',
    marginTop: 'auto',
    boxShadow: 'inset 0 3px 8px rgba(33,150,243,0.10)',
  },
  footerContent: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginBottom: '1.25rem',
  },
  contactInfo: {
    minWidth: '250px',
    fontSize: '1rem',
  },
  footerHeading: {
    fontSize: '1.2rem',
    marginBottom: '0.75rem',
    fontWeight: '700',
    borderBottom: '2px solid #64b5f6',
    paddingBottom: '6px',
    letterSpacing: '-0.5px',
  },
  social: {
    minWidth: '250px',
    textAlign: 'right',
    fontSize: '1rem',
  },
  socialLinks: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '1.25rem',
    fontWeight: '600',
  },
  socialLink: {
    color: '#1976d2',
    textDecoration: 'none',
    fontSize: '1.1rem',
    transition: 'color 0.3s ease',
    borderRadius: '8px',
    padding: '0.2rem 0.7rem',
  },
  copy: {
    textAlign: 'center',
    fontSize: '0.95rem',
    color: '#1976d2',
    fontWeight: '500',
    marginTop: '1rem',
  },

  loginButtons: {
  margin: '2rem 0',
  padding: '2rem',
  backgroundColor: '#ffffff',
  borderRadius: '18px',
  boxShadow: '0 4px 16px rgba(33,150,243,0.07)',
  textAlign: 'center',
},
loginTitle: {
  fontSize: '1.6rem',
  marginBottom: '1.5rem',
  color: '#1976d2',
  fontWeight: '700',
},
loginOptions: {
  display: 'flex',
  justifyContent: 'center',
  gap: '2rem',
  flexWrap: 'wrap',
},
  loginBtnDoctor: {
    backgroundColor: '#1976d2',
    color: '#fff',
    border: 'none',
    padding: '1rem 2rem',
    borderRadius: '12px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.18s, transform 0.18s',
  },
  loginBtnPaciente: {
    backgroundColor: '#64b5f6',
    color: '#fff',
    border: 'none',
    padding: '1rem 2rem',
    borderRadius: '12px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.18s, transform 0.18s',
  },

};


export default Inicio;

