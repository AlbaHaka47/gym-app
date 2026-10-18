import { useState } from 'react';
import exercises from '../data/exercises';
import { LUGARES, DIFICULTADES } from '../data/filterOptions';
import ExerciseCard from '../components/training/ExerciseCard';
import { filtrarEjercicios } from '../utils/filtrarEjercicios';
import SearchBar from '../components/SearchBar';
import RoutineExercise from '../components/routine/RoutineExercise';
import '../assets/Entrenamientos.css';
import '../assets/GenerarRutina.css';

const DIAS_SEMANA = [
  { id: 'lunes', nombre: 'Lunes' },
  { id: 'martes', nombre: 'Martes' },
  { id: 'miercoles', nombre: 'Miércoles' },
  { id: 'jueves', nombre: 'Jueves' },
  { id: 'viernes', nombre: 'Viernes' },
  { id: 'sabado', nombre: 'Sábado' },
  { id: 'domingo', nombre: 'Domingo' },
];

const ejercicioPorId = (id) => exercises.find((e) => e.id === id);

function GenerarRutina() {
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

  const [rutina, setRutina] = useState({
    nombre: "",
    objetivo: "hipertrofia",
    dias: DIAS_SEMANA.map((dia) => ({ ...dia, ejercicios: [] })),
  });

  const [diaActivo, setDiaActivo] = useState("lunes");

  const diaActivoNombre = rutina.dias.find((d) => d.id === diaActivo).nombre;

    const agregarEjercicio = (ejercicioId) => {
    const nuevo = {
      uid: crypto.randomUUID(),
      ejercicioId,
      series: 3,
      reps: 10,
      descanso: 60,
    };

    setRutina((prev) => ({
      ...prev,
      dias: prev.dias.map((dia) =>
        dia.id === diaActivo
          ? { ...dia, ejercicios: [...dia.ejercicios, nuevo] }
          : dia
      ),
    }));
  };

  const actualizarEjercicio = (diaId, uid, campo, valor) => {
    setRutina((prev) => ({
      ...prev,
      dias: prev.dias.map((dia) =>
        dia.id === diaId
          ? {
              ...dia,
              ejercicios: dia.ejercicios.map((item) =>
                item.uid === uid ? { ...item, [campo]: valor } : item
              ),
            }
          : dia
      ),
    }));
  };

  const eliminarEjercicio = (diaId, uid) => {
    setRutina((prev) => ({
      ...prev,
      dias: prev.dias.map((dia) =>
        dia.id === diaId
          ? {
              ...dia,
              ejercicios: dia.ejercicios.filter((item) => item.uid !== uid),
            }
          : dia
      ),
    }));
  };

  const moverEjercicio = (diaId, uid, direccion) => {
    setRutina((prev) => ({
      ...prev,
      dias: prev.dias.map((dia) => {
        if (dia.id !== diaId) return dia;

        const indice = dia.ejercicios.findIndex((item) => item.uid === uid);
        const destino = indice + direccion;

        if (destino < 0 || destino >= dia.ejercicios.length) return dia;

        const copia = [...dia.ejercicios];
        [copia[indice], copia[destino]] = [copia[destino], copia[indice]];

        return { ...dia, ejercicios: copia };
      }),
    }));
  };

  return (
    <main className="routine-page">

      <div className="routine-header">
        <h1>Generar rutina</h1>
        <p>Elige ejercicios y organízalos por días.</p>
      </div>

      <div className="routine-layout">

        {/* Columna izquierda: ejercicios */}
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
                    onClick={() => agregarEjercicio(exercise.id)}
                  >
                    + Añadir
                  </button>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Columna derecha: la rutina */}
        <section className="routine">
          <h2>Tu rutina</h2>

          <div className="routine-setup">
            <div className="field">
              <label htmlFor="rutina-nombre">Nombre</label>
              <input id="rutina-nombre" type="text" placeholder="Mi rutina" />
            </div>

            <div className="field">
              <label htmlFor="rutina-objetivo">Objetivo</label>
              <select id="rutina-objetivo">
                <option value="fuerza">Fuerza</option>
                <option value="hipertrofia">Hipertrofia</option>
                <option value="perdida-grasa">Pérdida de grasa</option>
              </select>
            </div>
          </div>

          <div className="mode-buttons">
            <button type="button">Lista</button>
            <button type="button">Semana</button>
            <button type="button">Por días</button>
          </div>

          <button type="button" className="btn-generate">
            Generar automáticamente
          </button>

          <div className="week-board">
            {rutina.dias.map((dia) => (
              <div
                key={dia.id}
                className={`day-column ${dia.id === diaActivo ? 'activo' : ''}`}
                onClick={() => setDiaActivo(dia.id)}
              >
                <h3>{dia.nombre}</h3>

                {dia.ejercicios.length === 0 ? (
                  <p className="day-empty">Aún no hay ejercicios</p>
                ) : (
                  <ul className="day-list">
                    {dia.ejercicios.map((item, index) => (
                      <RoutineExercise
                        key={item.uid}
                        item={item}
                        ejercicio={ejercicioPorId(item.ejercicioId)}
                        onChange={(campo, valor) =>
                          actualizarEjercicio(dia.id, item.uid, campo, valor)
                        }
                        onDelete={() => eliminarEjercicio(dia.id, item.uid)}
                        onMove={(direccion) => moverEjercicio(dia.id, item.uid, direccion)}
                        isFirst={index === 0}
                        isLast={index === dia.ejercicios.length - 1}
                      />
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          <div className="routine-actions">
            <button type="button">Guardar</button>
            <button type="button">Exportar PDF</button>
            <button type="button">Vaciar</button>
          </div>
        </section>

      </div>
    </main>
  );
}

export default GenerarRutina;