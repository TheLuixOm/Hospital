import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Inicio from './pages/Inicio';
import LoginDoctor from './pages/login/LoginDoctor';
import LoginPaciente from './pages/login/LoginPaciente';
import Registro from './pages/registro/RegistroDoctor';
import PanelDoctor from './pages/home/PanelDoctor'; // <- aún por crear

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Página principal */}
        <Route path="/" element={<Inicio />} />

        {/* Inicios de sesión */}
        <Route path="/login-doctor" element={<LoginDoctor />} />
        <Route path="/login-paciente" element={<LoginPaciente />} />

        {/* Registro general (si lo usas) */}
        <Route path="/registro" element={<Registro />} />

        {/* Página a la que redirige el doctor al iniciar sesión */}
        <Route path="/panel-doctor" element={<PanelDoctor />} />
      </Routes>
    </Router>
  );
}

export default App;
