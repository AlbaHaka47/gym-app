import '../../assets/SavedRoutines.css';
import { OBJETIVOS } from '../../data/objetivos';

const NOMBRES_MODO = { lista: 'Lista', semana: 'Semana', dias: 'Por días' };

const contarEjercicios = (rutina) =>
  rutina.planes[rutina.modo].reduce(
    (total, dia) => total + dia.ejercicios.length,
    0
  );

const formatearFecha = (iso) =>
  iso
    ? new Date(iso).toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : '';

function SavedRoutines({ rutinas, idActual, onOpen, onDelete }) {
  return (
    <section className="saved">
      <h2>Mis rutinas</h2>

      {rutinas.length === 0 ? (
        <p className="saved-empty">
          Aún no has guardado ninguna rutina. Ponle un nombre a la tuya y pulsa Guardar.
        </p>
      ) : (
        <ul className="saved-list">
          {rutinas.map((r) => {
            const total = contarEjercicios(r);

            return (
              <li
                key={r.id}
                className={`saved-item ${r.id === idActual ? 'actual' : ''}`}
              >
                <div className="saved-info">
                  <h3>{r.nombre}</h3>
                  <p>
                    {OBJETIVOS.find((o) => o.id === r.objetivo)?.label ?? r.objetivo} ·{' '}
                    {NOMBRES_MODO[r.modo]} · {total}{' '}
                    {total === 1 ? 'ejercicio' : 'ejercicios'}
                    {r.guardadaEn && ` · ${formatearFecha(r.guardadaEn)}`}
                  </p>
                </div>

                <div className="saved-actions">
                  <button
                    type="button"
                    className="btn-open"
                    onClick={() => onOpen(r)}
                  >
                    <i className="pi pi-folder-open" aria-hidden="true"></i> Abrir
                  </button>
                  <button
                    type="button"
                    className="btn-delete"
                    aria-label={`Eliminar ${r.nombre}`}
                    onClick={() => onDelete(r)}
                  >
                    <i className="pi pi-trash" aria-hidden="true"></i>
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

export default SavedRoutines;