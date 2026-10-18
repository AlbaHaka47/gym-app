import { useState } from 'react';
import exercises from '../../data/exercises';
import { LUGARES, DIFICULTADES } from '../../data/filterOptions';
import { filtrarEjercicios } from '../../utils/filtrarEjercicios';
import ExerciseCard from '../training/ExerciseCard';
import SearchBar from '../SearchBar';

import '../../assets/ExercisePicker.css';

function ExercisePicker({ diaActivoNombre, onAdd }) {
  const [filtros, setFiltros] = useState({
    lugar: "todos",
    dificultad: "todas",
    musculos: [],
    equipamiento: [],
    busqueda: ""
  });

  const cambiarFiltro = (campo, valor) => {
    setFiltros((prev) => ({ ...prev, [campo]: valor }));
  };

  const ejerciciosFiltrados = filtrarEjercicios(exercises, filtros);

  return (
    <section className="picker">
      <h2>Ejercicios</h2>

      <div className="picker-filters">
        <div className="field">
          <label htmlFor="picker-lugar">Lugar</label>
          <select
            id="picker-lugar"
            value={filtros.lugar}
            onChange={(e) => cambiarFiltro("lugar", e.target.value)}
          >
            {LUGARES.map((opcion) => (
              <option key={opcion.value} value={opcion.value}>
                {opcion.label}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor="picker-dificultad">Dificultad</label>
          <select
            id="picker-dificultad"
            value={filtros.dificultad}
            onChange={(e) => cambiarFiltro("dificultad", e.target.value)}
          >
            {DIFICULTADES.map((opcion) => (
              <option key={opcion.value} value={opcion.value}>
                {opcion.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <SearchBar
        value={filtros.busqueda}
        onChange={(texto) => cambiarFiltro("busqueda", texto)}
      />

      <p className="picker-target">
        Añadiendo a: <strong>{diaActivoNombre}</strong>
      </p>

      <div className="picker-grid">
        {ejerciciosFiltrados.length === 0 ? (
          <p className="picker-empty">No hay ejercicios con esos filtros.</p>
        ) : (
          ejerciciosFiltrados.map((exercise) => (
            <div className="picker-item" key={exercise.id}>
              <ExerciseCard exercise={exercise} />
              <button
                type="button"
                className="btn-add"
                onClick={() => onAdd(exercise.id)}
              >
                <i className="pi pi-plus" aria-hidden="true"></i> Añadir
              </button>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default ExercisePicker;