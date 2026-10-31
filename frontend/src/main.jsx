import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './assets/index.css';
import 'primeicons/primeicons.css';
import App from './App.jsx';

import { PLANTILLAS_DIA, REPARTO_POR_DIAS } from './data/generadorConfig';

const tiposUsados = Object.values(REPARTO_POR_DIAS).flat();
console.log('Plantillas que faltan:', tiposUsados.filter((t) => !PLANTILLAS_DIA[t]));

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);