import DayColumn from './DayColumn';

function RoutineBoard({ dias, diaActivo, onSelectDay, onUpdate, onDelete, onMove }) {
  return (
    <div className="week-board">
      {dias.map((dia) => (
        <DayColumn
          key={dia.id}
          dia={dia}
          activo={dia.id === diaActivo}
          onSelect={() => onSelectDay(dia.id)}
          onUpdate={onUpdate}
          onDelete={onDelete}
          onMove={onMove}
        />
      ))}
    </div>
  );
}

export default RoutineBoard;