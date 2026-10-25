import DayColumn from './DayColumn';
import '../../assets/RoutineBoard.css';

function RoutineBoard({
  dias,
  diaActivo,
  diaSobre,
  onSelectDay,
  onUpdate,
  onDelete,
  onMove,
  onRemoveDay,
}) {
  return (
    <div className="week-board">
      {dias.map((dia) => (
        <DayColumn
          key={dia.id}
          dia={dia}
          activo={dia.id === diaActivo}
          resaltado={dia.id === diaSobre}
          onSelect={() => onSelectDay(dia.id)}
          onUpdate={onUpdate}
          onDelete={onDelete}
          onMove={onMove}
          onRemove={onRemoveDay ? () => onRemoveDay(dia.id) : null}
        />
      ))}
    </div>
  );
}

export default RoutineBoard;