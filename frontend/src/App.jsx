import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import Entrenamientos from './pages/Entrenamientos';
import GenerarRutina from './pages/GenerarRutina';
import Calculadoras from './pages/Calculadoras'; 

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/entrenamientos" element={<Entrenamientos />} />
        <Route path="/generar-rutina" element={<GenerarRutina />} />
        <Route path="/calculadoras" element={<Calculadoras />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;