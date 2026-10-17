import { Fragment } from 'react';

const LUGARES = [
  { value: "todos", label: "Todos" },
  { value: "casa", label: "Casa" },
  { value: "gimnasio", label: "Gimnasio" },
  { value: "aire-libre", label: "Aire libre" },
];

const DIFICULTADES = [
  { value: "todas", label: "Todas" },
  { value: "principiante", label: "Principiante" },
  { value: "intermedio", label: "Intermedio" },
  { value: "avanzado", label: "Avanzado" },
];

const GRUPOS_MUSCULARES = [
  {
    titulo: "Tren Superior",
    opciones: [
      { value: "pecho", label: "Pecho" },
      { value: "espalda", label: "Espalda" },
      { value: "hombros", label: "Hombros" },
      { value: "brazos", label: "Brazos" },
    ],
  },
  {
    titulo: "Tren Inferior",
    opciones: [
      { value: "cuadriceps", label: "Cuádriceps" },
      { value: "isquiotibiales", label: "Isquiotibiales" },
      { value: "gluteos", label: "Glúteos" },
      { value: "gemelos", label: "Gemelos" },
    ],
  },
  {
    titulo: "Core/Abdomen",
    opciones: [
      { value: "abdominales", label: "Abdominales" },
    ],
  },
];

const EQUIPAMIENTO = [
  { value: "sin-equipamiento", label: "Sin equipamiento" },
  { value: "mancuernas", label: "Mancuernas" },
  { value: "barra", label: "Barra" },
  { value: "banco", label: "Banco" },
  { value: "paralelas", label: "Paralelas" },
  { value: "gomas", label: "Gomas" },
  { value: "otros", label: "Otros" },
];

function Filters({ filtros, setFiltros }) {

  const handleLugar = (e) => {
    setFiltros((prev) => ({
      ...prev,
      lugar: e.target.value
    }));
  };

  const handleDificultad = (e) => {
    setFiltros((prev) => ({
      ...prev,
      dificultad: e.target.value
    }));
  };

  const handleMusculo = (e) => {
    const musculo = e.target.value;

    setFiltros((prev) => ({
      ...prev,
      musculos: prev.musculos.includes(musculo)
        ? prev.musculos.filter((item) => item !== musculo)
        : [...prev.musculos, musculo]
    }));
  };

  const handleEquipamiento = (e) => {
    const equipamiento = e.target.value;

    setFiltros((prev) => ({
      ...prev,
      equipamiento: prev.equipamiento.includes(equipamiento)
        ? prev.equipamiento.filter((item) => item !== equipamiento)
        : [...prev.equipamiento, equipamiento]
    }));
  };

  return (
    <aside className="filters">

      <h2>Filtros</h2>

      <section className="filter-group">
        <h3>Lugar</h3>

        {LUGARES.map((opcion) => (
          <div className="places" key={opcion.value}>
            <input
              id={opcion.value}
              type="radio"
              name="lugar"
              value={opcion.value}
              checked={filtros.lugar === opcion.value}
              onChange={handleLugar}
            />
            <label htmlFor={opcion.value}>{opcion.label}</label>
          </div>
        ))}
      </section>

      <section className="filter-group">
        <h3>Dificultad</h3>

        {DIFICULTADES.map((opcion) => (
          <div className="difficulty" key={opcion.value}>
            <input
              id={opcion.value}
              type="radio"
              name="dificultad"
              value={opcion.value}
              checked={filtros.dificultad === opcion.value}
              onChange={handleDificultad}
            />
            <label htmlFor={opcion.value}>{opcion.label}</label>
          </div>
        ))}
      </section>

      <section className="filter-group">
        <h3>Músculos</h3>

        {GRUPOS_MUSCULARES.map((grupo) => (
          <Fragment key={grupo.titulo}>
            <h4>{grupo.titulo}</h4>

            {grupo.opciones.map((opcion) => (
              <div className="muscles" key={opcion.value}>
                <input
                  id={opcion.value}
                  type="checkbox"
                  value={opcion.value}
                  checked={filtros.musculos.includes(opcion.value)}
                  onChange={handleMusculo}
                />
                <label htmlFor={opcion.value}>{opcion.label}</label>
              </div>
            ))}
          </Fragment>
        ))}
      </section>

      <section className="filter-group">
        <h3>Equipamiento</h3>

        {EQUIPAMIENTO.map((opcion) => (
          <div className="equipment" key={opcion.value}>
            <input
              id={opcion.value}
              type="checkbox"
              value={opcion.value}
              checked={filtros.equipamiento.includes(opcion.value)}
              onChange={handleEquipamiento}
            />
            <label htmlFor={opcion.value}>{opcion.label}</label>
          </div>
        ))}
      </section>

    </aside>
  );
}

export default Filters;