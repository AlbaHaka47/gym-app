import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import RoutineExercise from './RoutineExercise';
import { ejercicioPorId } from '../../utils/ejercicioPorId';
import '../../assets/DayColumn.css';

function DayColumn({
  dia,
  activo,
  resaltado,
  onSelect,
  onUpdate,
  onDelete,
  onMove,
  onRemove,
}) {
  const { setNodeRef } = useDroppable({
    id: dia.id,
    data: { type: 'dia' },
  });

  const handleRemove = (e) => {
    e.stopPropagation();

    const confirmado =
      dia.ejercicios.length === 0 ||
      window.confirm(`¿Eliminar ${dia.nombre} y sus ejercicios?`);

    if (confirmado) onRemove();
  };

  return (
    <div
      ref={setNodeRef}
      className={`day-column ${activo ? 'activo' : ''} ${resaltado ? 'over' : ''}`}
      onClick={onSelect}
    >
      <div className="day-header">
        <h3>{dia.nombre}</h3>

        {onRemove && (
          <button
            type="button"
            className="btn-remove-day"
            aria-label={`Eliminar ${dia.nombre}`}
            onClick={handleRemove}
          >
            <i className="pi pi-times" aria-hidden="true"></i>
          </button>
        )}
      </div>

      <SortableContext
        items={dia.ejercicios.map((item) => item.uid)}
        strategy={verticalListSortingStrategy}
      >
        {dia.ejercicios.length === 0 ? (
          <p className="day-empty">Aún no hay ejercicios</p>
        ) : (
          <ul className="day-list">
            {dia.ejercicios.map((item, index) => (
              <RoutineExercise
                key={item.uid}
                item={item}
                diaId={dia.id}
                ejercicio={ejercicioPorId(item.ejercicioId)}
                onChange={(campo, valor) => onUpdate(dia.id, item.uid, campo, valor)}
                onDelete={() => onDelete(dia.id, item.uid)}
                onMove={(direccion) => onMove(dia.id, item.uid, direccion)}
                isFirst={index === 0}
                isLast={index === dia.ejercicios.length - 1}
              />
            ))}
          </ul>
        )}
      </SortableContext>
    </div>
  );
}

export default DayColumn;