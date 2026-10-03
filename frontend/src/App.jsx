import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import Entrenamientos from './pages/Entrenamientos';

function App() {
  return (
    <BrowserRouter>

      <Header />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route
          path="/entrenamientos"
          element={<Entrenamientos />}
        />

      </Routes>

      <Footer />

    </BrowserRouter>
  );
}

export default App;