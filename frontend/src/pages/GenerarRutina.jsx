import { useState } from 'react';
import {
  DndContext,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { useRutina } from '../hooks/useRutina';
import { ejercicioPorId } from '../utils/ejercicioPorId';
import ExercisePicker from '../components/routine/ExercisePicker';
import RoutineBoard from '../components/routine/RoutineBoard';
import ExerciseCard from '../components/training/ExerciseCard';
import { useRutinasGuardadas } from '../hooks/useRutinasGuardadas';
import SavedRoutines from '../components/routine/SavedRoutines';
import '../assets/RoutinePage.css';
import '../assets/RoutineSetup.css';
import '../assets/RoutineButtons.css';

const MODOS = [
  { id: 'lista', label: 'Lista', icon: 'pi-list' },
  { id: 'semana', label: 'Semana', icon: 'pi-calendar' },
  { id: 'dias', label: 'Por días', icon: 'pi-table' },
];

// A partir del elemento sobre el que está el cursor, devuelve el id del día
const diaDeDestino = (over) => {
  if (!over) return null;
  const datos = over.data.current;
  return datos.type === 'dia' ? over.id : datos.diaId;
};

const nombreDe = (elemento) =>
  ejercicioPorId(elemento.data.current.ejercicioId).nombre;

const INSTRUCCIONES = {
  draggable:
    'Para coger un ejercicio pulsa espacio o intro. Muévelo con las flechas, suéltalo con espacio o intro y cancela con escape.',
};

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
    reubicarEjercicio,
    vaciarRutina,
    cargarRutina,
  } = useRutina();

  const [arrastrado, setArrastrado] = useState(null);
  const [diaSobre, setDiaSobre] = useState(null);

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const diaActivoNombre = dias.find((d) => d.id === diaActivo).nombre;

  const { rutinas, guardarRutina, eliminarRutina } = useRutinasGuardadas();
  const [aviso, setAviso] = useState('');

  const hayEjercicios = Object.values(rutina.planes).some((plan) =>
    plan.some((dia) => dia.ejercicios.length > 0)
  );
  const hayContenido = rutina.nombre !== '' || hayEjercicios;

  const handleGuardar = () => {
    const nombre = rutina.nombre.trim();

    if (nombre === '') {
      setAviso('Ponle un nombre a la rutina antes de guardarla.');
      return;
    }

    const id = guardarRutina({ ...rutina, nombre });
    cambiarDato('id', id);
    setAviso(`Rutina «${nombre}» guardada en Mis rutinas.`);
  };

  const handleAbrir = (guardada) => {
    if (hayContenido) {
      const confirmado = window.confirm(
        'Al abrir esta rutina se reemplazará la que tienes en pantalla. Si no la has guardado, se perderá. ¿Continuar?'
      );
      if (!confirmado) return;
    }

    cargarRutina(guardada);
    setAviso('');
  };

  const handleEliminar = (guardada) => {
    if (!window.confirm(`¿Eliminar «${guardada.nombre}» de Mis rutinas?`)) return;

    eliminarRutina(guardada.id);
    if (guardada.id === rutina.id) cambiarDato('id', null);
  };

  const handleVaciar = () => {
    const confirmado = window.confirm(
      '¿Vaciar la rutina? Se borrarán el nombre y los ejercicios de los tres modos.'
    );

    if (confirmado) {
      vaciarRutina();
      setAviso('');
    }
  };

  const nombreDia = (over) =>
    dias.find((d) => d.id === diaDeDestino(over))?.nombre;

  const anuncios = {
    onDragStart({ active }) {
      return `Has cogido ${nombreDe(active)}.`;
    },
    onDragOver({ active, over }) {
      if (!over) return `${nombreDe(active)} no está sobre ningún día.`;
      return `${nombreDe(active)} está sobre ${nombreDia(over)}.`;
    },
    onDragEnd({ active, over }) {
      if (!over) return `Has soltado ${nombreDe(active)} fuera de los días. No se ha añadido.`;
      return `Has soltado ${nombreDe(active)} en ${nombreDia(over)}.`;
    },
    onDragCancel({ active }) {
      return `Arrastre cancelado. ${nombreDe(active)} vuelve a su sitio.`;
    },
  };

  const handleDragStart = (event) => {
    const { type, ejercicioId } = event.active.data.current;
    setArrastrado({ tipo: type, ejercicio: ejercicioPorId(ejercicioId) });
  };

  const handleDragOver = (event) => {
    setDiaSobre(diaDeDestino(event.over));
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setArrastrado(null);
    setDiaSobre(null);

    if (!over) return;

    const origen = active.data.current;
    const destino = over.data.current;
    const diaDestinoId = diaDeDestino(over);
    const sobreUid = destino.type === 'item' ? over.id : null;

    // Tarjeta del catálogo: se añade al final del día de destino
    if (origen.type === 'catalogo') {
      agregarEjercicio(origen.ejercicioId, diaDestinoId, sobreUid);
      return;
    }

    // Ejercicio de la rutina: se reordena o cambia de día
    if (active.id === over.id) return;

    const trasladado = active.rect.current.translated;
    const debajo = trasladado
      ? trasladado.top > over.rect.top + over.rect.height / 2
      : false;

    reubicarEjercicio(active.id, diaDestinoId, sobreUid, debajo);
  };

  const handleDragCancel = () => {
    setArrastrado(null);
    setDiaSobre(null);
  };

  return (
    <main className="routine-page">

      <div className="routine-header">
        <h1>Generar rutina</h1>
        <p>Elige ejercicios y organízalos por días.</p>
      </div>

      <DndContext
        sensors={sensors}
        accessibility={{
          announcements: anuncios,
          screenReaderInstructions: INSTRUCCIONES,
        }}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
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
                  onChange={(e) => {
                    cambiarDato("nombre", e.target.value);
                    setAviso('');
                  }}
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
              diaSobre={diaSobre}
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
              <button type="button" onClick={handleGuardar} disabled={!hayEjercicios}>
                <i className="pi pi-save" aria-hidden="true"></i> Guardar
              </button>
              <button type="button">
                <i className="pi pi-file-pdf" aria-hidden="true"></i> Exportar PDF
              </button>
              <button type="button" onClick={handleVaciar} disabled={!hayContenido}>
                <i className="pi pi-eraser" aria-hidden="true"></i> Vaciar
              </button>
            </div>

            {aviso && (
              <p className="routine-notice" role="status">
                {aviso}
              </p>
            )}
          </section>

        </div>

        <DragOverlay>
          {arrastrado ? (
            arrastrado.tipo === 'catalogo' ? (
              <div className="drag-overlay">
                <ExerciseCard exercise={arrastrado.ejercicio} />
              </div>
            ) : (
              <div className="drag-overlay-item">
                {arrastrado.ejercicio.nombre}
              </div>
            )
          ) : null}
        </DragOverlay>
      </DndContext>

      <SavedRoutines
        rutinas={rutinas}
        idActual={rutina.id}
        onOpen={handleAbrir}
        onDelete={handleEliminar}
      />
    </main>
  );
}

export default GenerarRutina;