import '../../assets/DayColumn.css';

import RoutineExercise from './RoutineExercise';
import { ejercicioPorId } from '../../utils/ejercicioPorId';

function DayColumn({ dia, activo, onSelect, onUpdate, onDelete, onMove, onRemove }) {
  const handleRemove = (e) => {
    e.stopPropagation();

    const confirmado =
      dia.ejercicios.length === 0 ||
      window.confirm(`¿Eliminar ${dia.nombre} y sus ejercicios?`);

    if (confirmado) onRemove();
  };

  return (
    <div
      className={`day-column ${activo ? 'activo' : ''}`}
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

      {dia.ejercicios.length === 0 ? (
        <p className="day-empty">Aún no hay ejercicios</p>
      ) : (
        <ul className="day-list">
          {dia.ejercicios.map((item, index) => (
            <RoutineExercise
              key={item.uid}
              item={item}
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
    </div>
  );
}

export default DayColumn;