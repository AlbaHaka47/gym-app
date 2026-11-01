import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import '../../assets/RoutineExercise.css';

function RoutineExercise({
  item,
  diaId,
  ejercicio,
  onChange,
  onDelete,
  onMove,
  isFirst,
  isLast,
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: item.uid,
    data: { type: 'item', diaId, ejercicioId: item.ejercicioId },
    attributes: { roleDescription: 'ejercicio ordenable' },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleChange = (campo) => (e) => {
    const texto = e.target.value;
    onChange(campo, texto === "" ? "" : Number(texto));
  };

  const esTiempo = ejercicio.tipo === 'tiempo';

  return (
    <li
      ref={setNodeRef}
      style={style}
      className={`routine-exercise ${isDragging ? 'dragging' : ''}`}
    >
      <div className="routine-exercise-header">
        <div className="routine-exercise-title">
          <button
            type="button"
            ref={setActivatorNodeRef}
            className="drag-handle"
            aria-label={`Arrastrar ${ejercicio.nombre}`}
            {...attributes}
            {...listeners}
          >
            <i className="pi pi-arrows-alt" aria-hidden="true"></i>
          </button>
          <span className="routine-exercise-name">{ejercicio.nombre}</span>
        </div>

        <div
          className="routine-exercise-actions"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            aria-label={`Subir ${ejercicio.nombre}`}
            disabled={isFirst}
            onClick={() => onMove(-1)}
          >
            <i className="pi pi-arrow-up" aria-hidden="true"></i>
          </button>
          <button
            type="button"
            aria-label={`Bajar ${ejercicio.nombre}`}
            disabled={isLast}
            onClick={() => onMove(1)}
          >
            <i className="pi pi-arrow-down" aria-hidden="true"></i>
          </button>
          <button
            type="button"
            className="btn-delete"
            aria-label={`Eliminar ${ejercicio.nombre}`}
            onClick={onDelete}
          >
            <i className="pi pi-trash" aria-hidden="true"></i>
          </button>
        </div>
      </div>

      <div className="routine-exercise-fields">
        <label>
          Series
          <input
            type="number"
            min="1"
            max="10"
            value={item.series}
            onChange={handleChange("series")}
            onWheel={(e) => e.target.blur()}
          />
        </label>

        <label>
          {esTiempo ? 'Seg.' : 'Reps'}
          <input
            type="number"
            min="1"
            max={esTiempo ? 300 : 50}
            step={esTiempo ? 5 : 1}
            value={item.reps}
            onChange={handleChange("reps")}
            onWheel={(e) => e.target.blur()}
          />
        </label>

        <label>
          Desc. (s)
          <input
            type="number"
            min="0"
            max="300"
            step="5"
            value={item.descanso}
            onChange={handleChange("descanso")}
            onWheel={(e) => e.target.blur()}
          />
        </label>
      </div>
    </li>
  );
}

export default RoutineExercise;