import { useRutina } from '../hooks/useRutina';
import ExercisePicker from '../components/routine/ExercisePicker';
import RoutineBoard from '../components/routine/RoutineBoard';
import '../assets/RoutinePage.css';
import '../assets/RoutineSetup.css';
import '../assets/RoutineButtons.css';

const MODOS = [
  { id: 'lista', label: 'Lista', icon: 'pi-list' },
  { id: 'semana', label: 'Semana', icon: 'pi-calendar' },
  { id: 'dias', label: 'Por días', icon: 'pi-table' },
];

function GenerarRutina() {
  const {
  rutina,
  dias,
  diaActivo,
  setDiaActivo,
  cambiarModo,
  cambiarDato,
  agregarDia,
  eliminarDia,
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
              <input
                id="rutina-nombre"
                type="text"
                placeholder="Mi rutina"
                maxLength={40}
                value={rutina.nombre}
                onChange={(e) => cambiarDato("nombre", e.target.value)}
              />
            </div>

            <div className="field">
              <label htmlFor="rutina-objetivo">Objetivo</label>
              <select
                id="rutina-objetivo"
                value={rutina.objetivo}
                onChange={(e) => cambiarDato("objetivo", e.target.value)}
              >
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
              <i className={`pi ${modo.icon}`} aria-hidden="true"></i> {modo.label}
            </button>
            ))}
          </div>

          <button type="button" className="btn-generate">
            <i className="pi pi-bolt" aria-hidden="true"></i> Generar automáticamente
          </button>

          <RoutineBoard
            dias={dias}
            diaActivo={diaActivo}
            onSelectDay={setDiaActivo}
            onUpdate={actualizarEjercicio}
            onDelete={eliminarEjercicio}
            onMove={moverEjercicio}
            onRemoveDay={rutina.modo === 'dias' && dias.length > 1 ? eliminarDia : null}
          />

          {rutina.modo === 'dias' && (
            <button
              type="button"
              className="btn-add-day"
              onClick={agregarDia}
              disabled={dias.length >= 7}
            >
              <i className="pi pi-plus" aria-hidden="true"></i> Añadir día
            </button>
)}

          <div className="routine-actions">
            <button type="button">
              <i className="pi pi-save" aria-hidden="true"></i> Guardar
            </button>
            <button type="button">
              <i className="pi pi-file-pdf" aria-hidden="true"></i> Exportar PDF
            </button>
            <button type="button">
              <i className="pi pi-eraser" aria-hidden="true"></i> Vaciar
            </button>
          </div>
        </section>

      </div>
    </main>
  );
}

export default GenerarRutina;