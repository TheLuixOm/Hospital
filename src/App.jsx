import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Inicio from './pages/Inicio';
import LoginDoctor from './pages/login/LoginDoctor';
import LoginPaciente from './pages/login/LoginPaciente';
import RegistroDoctor from './pages/registro/RegistroDoctor';
import RegistroPaciente from './pages/registro/RegistroPaciente';
import PanelDoctor from './pages/home/PanelDoctor';
import PanelPaciente from './pages/home/PanelPaciente';
import Registros from './components/Registros';

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

        {/* Registro */}
        <Route path="/registro-doctor" element={<RegistroDoctor />} />
        <Route path="/registro-paciente" element={<RegistroPaciente />} />

  {/* Página a la que redirige el doctor al iniciar sesión */}
  <Route path="/panel-doctor" element={<PanelDoctor />} />
  {/* Página a la que redirige el paciente al iniciar sesión */}
  <Route path="/panel-paciente" element={<PanelPaciente />} />
  {/* Vista de registros de paciente */}
  <Route path="/registros/:id" element={<Registros />} />
      </Routes>
    </Router>
  );
}

export default App;
