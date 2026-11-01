import { useState } from 'react';
import { LUGARES } from '../../data/filterOptions';
import { NIVELES } from '../../data/generadorConfig';
import { OBJETIVOS } from '../../data/objetivos';
import '../../assets/GeneratorPanel.css';

const LUGARES_GENERADOR = LUGARES.filter((l) => l.value !== 'todos');
const OPCIONES_DIAS = [2, 3, 4, 5];

function GeneratorPanel({ objetivo, modo, onGenerate, onClose }) {
  const [opciones, setOpciones] = useState({
    lugar: 'gimnasio',
    nivel: 'intermedio',
    diasPorSemana: 3,
  });

  const cambiar = (campo, valor) => {
    setOpciones((prev) => ({ ...prev, [campo]: valor }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate({ ...opciones, objetivo });
  };

  const objetivoLabel = OBJETIVOS.find((o) => o.id === objetivo)?.label;

  return (
    <form
      id="generator-panel"
      className="generator"
      aria-label="Opciones del generador"
      onSubmit={handleSubmit}
    >
      <p className="generator-summary">
        Objetivo: <strong>{objetivoLabel}</strong> (puedes cambiarlo arriba)
      </p>

      <div className="generator-fields">
        <div className="field">
          <label htmlFor="gen-lugar">Lugar</label>
          <select
            id="gen-lugar"
            value={opciones.lugar}
            onChange={(e) => cambiar('lugar', e.target.value)}
          >
            {LUGARES_GENERADOR.map((lugar) => (
              <option key={lugar.value} value={lugar.value}>
                {lugar.label}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor="gen-nivel">Nivel</label>
          <select
            id="gen-nivel"
            value={opciones.nivel}
            onChange={(e) => cambiar('nivel', e.target.value)}
          >
            {NIVELES.map((nivel) => (
              <option key={nivel.id} value={nivel.id}>
                {nivel.label}
              </option>
            ))}
          </select>
        </div>

        {modo !== 'lista' && (
          <div className="field">
            <label htmlFor="gen-dias">Días de entrenamiento</label>
            <select
              id="gen-dias"
              value={opciones.diasPorSemana}
              onChange={(e) => cambiar('diasPorSemana', Number(e.target.value))}
            >
              {OPCIONES_DIAS.map((dias) => (
                <option key={dias} value={dias}>
                  {dias} días
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {modo === 'lista' && (
        <p className="generator-hint">
          En el modo Lista se genera un único bloque de cuerpo completo.
        </p>
      )}

      <div className="generator-actions">
        <button type="submit">
          <i className="pi pi-bolt" aria-hidden="true"></i> Generar
        </button>
        <button type="button" onClick={onClose}>
          <i className="pi pi-times" aria-hidden="true"></i> Cerrar
        </button>
      </div>
    </form>
  );
}

export default GeneratorPanel;