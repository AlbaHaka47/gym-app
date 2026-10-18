import { useRutina } from '../hooks/useRutina';
import ExercisePicker from '../components/routine/ExercisePicker';
import RoutineBoard from '../components/routine/RoutineBoard';
import '../assets/Entrenamientos.css';
import '../assets/GenerarRutina.css';

const MODOS = [
  { id: 'lista', label: 'Lista' },
  { id: 'semana', label: 'Semana' },
  { id: 'dias', label: 'Por días' },
];

function GenerarRutina() {
  const {
    rutina,
    dias,
    diaActivo,
    setDiaActivo,
    cambiarModo,
    agregarEjercicio,
    actualizarEjercicio,
    eliminarEjercicio,
    moverEjercicio,
  } = useRutina();

  const diaActivoNombre = dias.find((d) => d.id === diaActivo).nombre;

  return (
    <main className="routine-page">

      <div className="routine-header">
        <h1>Generar rutina</h1>
        <p>Elige ejercicios y organízalos por días.</p>
      </div>

      <div className="routine-layout">

        <ExercisePicker
          diaActivoNombre={diaActivoNombre}
          onAdd={agregarEjercicio}
        />

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
            {MODOS.map((modo) => (
              <button
                key={modo.id}
                type="button"
                className={rutina.modo === modo.id ? 'activo' : ''}
                aria-pressed={rutina.modo === modo.id}
                onClick={() => cambiarModo(modo.id)}
              >
                {modo.label}
              </button>
            ))}
          </div>

          <button type="button" className="btn-generate">
            Generar automáticamente
          </button>

          <RoutineBoard
            dias={dias}
            diaActivo={diaActivo}
            onSelectDay={setDiaActivo}
            onUpdate={actualizarEjercicio}
            onDelete={eliminarEjercicio}
            onMove={moverEjercicio}
          />

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