import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Inicio from './pages/Inicio';
import LoginDoctor from './pages/login/LoginDoctor';
import LoginPaciente from './pages/login/LoginPaciente';
import RegistroDoctor from './pages/registro/RegistroDoctor';
import RegistroPaciente from './pages/registro/RegistroPaciente';
import PanelDoctor from './pages/home/PanelDoctor';
import PanelPaciente from './pages/home/PanelPaciente';
import DatosPersonales from './pages/paciente/DatosPersonales';
import HistorialMedico from './pages/paciente/HistorialMedico';
import Configuracion from './pages/paciente/Configuracion';
import Registros from './components/Registros';


function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <motion.div initial={{opacity:0, y:30}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-30}} transition={{duration:0.35}}>
            <Inicio />
          </motion.div>
        } />
        <Route path="/login-doctor" element={
          <motion.div initial={{opacity:0, y:30}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-30}} transition={{duration:0.35}}>
            <LoginDoctor />
          </motion.div>
        } />
        <Route path="/login-paciente" element={
          <motion.div initial={{opacity:0, y:30}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-30}} transition={{duration:0.35}}>
            <LoginPaciente />
          </motion.div>
        } />
        <Route path="/registro-doctor" element={
          <motion.div initial={{opacity:0, y:30}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-30}} transition={{duration:0.35}}>
            <RegistroDoctor />
          </motion.div>
        } />
        <Route path="/registro-paciente" element={
          <motion.div initial={{opacity:0, y:30}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-30}} transition={{duration:0.35}}>
            <RegistroPaciente />
          </motion.div>
        } />
        <Route path="/panel-doctor" element={
          <motion.div initial={{opacity:0, y:30}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-30}} transition={{duration:0.35}}>
            <PanelDoctor />
          </motion.div>
        } />
        <Route path="/panel-paciente" element={
          <motion.div initial={{opacity:0, y:30}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-30}} transition={{duration:0.35}}>
            <PanelPaciente />
          </motion.div>
        } />
        <Route path="/paciente/datosPersonales" element={
          <motion.div initial={{opacity:0, y:30}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-30}} transition={{duration:0.35}}>
            <DatosPersonales />
          </motion.div>
        } />
        <Route path="/paciente/historialMedico" element={
          <motion.div initial={{opacity:0, y:30}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-30}} transition={{duration:0.35}}>
            <HistorialMedico />
          </motion.div>
        } />
        <Route path="/paciente/configuracion" element={
          <motion.div initial={{opacity:0, y:30}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-30}} transition={{duration:0.35}}>
            <Configuracion />
          </motion.div>
        } />
        <Route path="/registros/:id" element={
          <motion.div initial={{opacity:0, y:30}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-30}} transition={{duration:0.35}}>
            <Registros />
          </motion.div>
        } />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
