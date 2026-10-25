import { useDraggable } from '@dnd-kit/core';
import ExerciseCard from '../training/ExerciseCard';

function DraggableExercise({ exercise, onAdd }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `ejercicio-${exercise.id}`,
    data: { type: 'catalogo', ejercicioId: exercise.id },
    attributes: { roleDescription: 'ejercicio arrastrable' },
  });

  return (
    <div className="picker-item">
      <div
        ref={setNodeRef}
        className={`draggable ${isDragging ? 'dragging' : ''}`}
        {...listeners}
        {...attributes}
      >
        <ExerciseCard exercise={exercise} />
      </div>

      <button
        type="button"
        className="btn-add"
        onClick={() => onAdd(exercise.id)}
      >
        <i className="pi pi-plus" aria-hidden="true"></i> Añadir
      </button>
    </div>
  );
}

export default DraggableExercise;