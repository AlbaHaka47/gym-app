function RoutineExercise({ item, ejercicio, onChange, onDelete, onMove, isFirst, isLast }) {
    const handleChange = (campo) => (e) => {
        const texto = e.target.value;
        onChange(campo, texto === "" ? "" : Number(texto));
    };

    return (
        <li className="routine-exercise">
        <div className="routine-exercise-header">
            <span className="routine-exercise-name">{ejercicio.nombre}</span>

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
            />
            </label>

            <label>
            Reps
            <input
                type="number"
                min="1"
                max="50"
                value={item.reps}
                onChange={handleChange("reps")}
            />
            </label>

            <label>
            Desc.
            <input
                type="number"
                min="0"
                max="300"
                step="5"
                value={item.descanso}
                onChange={handleChange("descanso")}
            />
            </label>
        </div>
        </li>
    );
}

export default RoutineExercise;