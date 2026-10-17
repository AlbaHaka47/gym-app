import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import Filters from '../components/training/Filters';
import ExerciseList from '../components/training/ExerciseList';
import '../assets/Entrenamientos.css';

function Entrenamientos() {
  const [searchParams] = useSearchParams();
  const lugarInicial = searchParams.get('lugar') || 'todos';

  const [filtros, setFiltros] = useState({
    lugar: lugarInicial,
    dificultad: "todas",
    musculos: [],
    equipamiento: []
  });

  return (
    <main className="training-page">

      <div className="training-header">

        <h1>
          Encuentra el ejercicio que necesitas
        </h1>

        <p>
          Explora ejercicios según tu lugar,
          nivel y equipamiento.
        </p>
      </div>

      <div className="training-content">

        <Filters 
          className="filters" 
          filtros={filtros}
          setFiltros={setFiltros} 
        />

        <section className="exercise-section">
          <h2>Todos los ejercicios</h2>

          <ExerciseList className="exercise-grid" filtros={filtros}/>
          
        </section>

      </div>

    </main>
  );
}

export default Entrenamientos;