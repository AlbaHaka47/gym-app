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

        <div className="places">
          <input
            id="todos"
            type="radio"
            name="lugar"
            value="todos"
            checked={filtros.lugar === "todos"}
            onChange={handleLugar}
          />
          <label htmlFor="todos">Todos</label>
        </div>

        <div className="places">
          <input
            id="casa"
            type="radio"
            name="lugar"
            value="casa"
            checked={filtros.lugar === "casa"}
            onChange={handleLugar}
         />
          <label htmlFor="casa">Casa</label>
        </div>

        <div className="places">
          <input
            id="gimnasio"
            type="radio"
            name="lugar"
            value="gimnasio"
            checked={filtros.lugar === "gimnasio"}
            onChange={handleLugar}
          />
          <label htmlFor="gimnasio">Gimnasio</label>
        </div>

        <div className="places">
          <input
            id="aire-libre"
            type="radio"
            name="lugar"
            value="aire-libre"
            checked={filtros.lugar === "aire-libre"}
            onChange={handleLugar}
          />
          <label htmlFor="aire-libre">Aire libre</label>
        </div>
      </section>

      <section className="filter-group">
        <h3>Dificultad</h3>

        <div className="difficulty">
          <input
            id="todas"
            type="radio"
            name="dificultad"
            value="todas"
            checked={filtros.dificultad === "todas"}
            onChange={handleDificultad}
          />
          <label htmlFor="todas">Todas</label>
        </div>

        <div className="difficulty">
          <input
            id="principiante"
            type="radio"
            name="dificultad"
            value="principiante"
            checked={filtros.dificultad === "principiante"}
            onChange={handleDificultad}
          />
          <label htmlFor="principiante">Principiante</label>
        </div>

        <div className="difficulty">
          <input
            id="intermedio"
            type="radio"
            name="dificultad"
            value="intermedio"
            checked={filtros.dificultad === "intermedio"}
            onChange={handleDificultad}
          />
          <label htmlFor="intermedio">Intermedio</label>
        </div>

        <div className="difficulty">
          <input
            id="avanzado"
            type="radio"
            name="dificultad"
            value="avanzado"
            checked={filtros.dificultad === "avanzado"}
            onChange={handleDificultad}
          />
          <label htmlFor="avanzado">Avanzado</label>
        </div>
      </section>

      <section className="filter-group">
        <h3>Músculos</h3>
        <h4>Tren Superior</h4>

        <div className="muscles">
          <input
            id="pecho"
            type="checkbox"
            value="pecho"
            checked={filtros.musculos.includes("pecho")}
            onChange={handleMusculo}
          />
          <label htmlFor="pecho">Pecho</label>
        </div>

        <div className="muscles">
          <input
            id="espalda"
            type="checkbox"
            value="espalda"
            checked={filtros.musculos.includes("espalda")}
            onChange={handleMusculo}
          />
          <label htmlFor="espalda">Espalda</label>
        </div>

        <div className="muscles">
          <input
            id="hombros"
            type="checkbox"
            value="hombros"
            checked={filtros.musculos.includes("hombros")}
            onChange={handleMusculo}
          />
          <label htmlFor="hombros">Hombros</label>
        </div>

        <div className="muscles">
          <input
            id="brazos"
            type="checkbox"
            value="brazos"
            checked={filtros.musculos.includes("brazos")}
            onChange={handleMusculo}
          />
          <label htmlFor="brazos">Brazos</label>
        </div>


        <h4>Tren Inferior</h4>

        <div className="muscles">
          <input
            id="cuadriceps"
            type="checkbox"
            value="cuadriceps"
            checked={filtros.musculos.includes("cuadriceps")}
            onChange={handleMusculo}
          />
          <label htmlFor="cuadriceps">Cuádriceps</label>
        </div>

        <div className="muscles">
          <input
            id="isquiotibiales"
            type="checkbox"
            value="isquiotibiales"
            checked={filtros.musculos.includes("isquiotibiales")}
            onChange={handleMusculo}
          />
          <label htmlFor="isquiotibiales">Isquiotibiales</label>
        </div>

        <div className="muscles">
          <input
            id="gluteos"
            type="checkbox"
            value="gluteos"
            checked={filtros.musculos.includes("gluteos")}
            onChange={handleMusculo}
          />
          <label htmlFor="gluteos">Glúteos</label>
        </div>

        <div className="muscles">
          <input
            id="gemelos"
            type="checkbox"
            value="gemelos"
            checked={filtros.musculos.includes("gemelos")}
            onChange={handleMusculo}
          />
          <label htmlFor="gemelos">Gemelos</label>
        </div>

        <h4>Core/Abdomen</h4>

        <div className="muscles">
          <input
            id="abdominales"
            type="checkbox"
            value="abdominales"
            checked={filtros.musculos.includes("abdominales")}
            onChange={handleMusculo}
          />
          <label htmlFor="abdominales">Abdominales</label>
        </div>

      </section>

      <section className="filter-group">
        <h3>Equipamiento</h3>

        <div className="equipment">
          <input
            id="sin-equipamiento"
            type="checkbox"
            value="sin-equipamiento"
            checked={filtros.equipamiento.includes("sin-equipamiento")}
            onChange={handleEquipamiento}
          />
          <label htmlFor="sin-equipamiento">Sin equipamiento</label>
        </div>

        <div className="equipment">
          <input
            id="mancuernas"
            type="checkbox"
            value="mancuernas"
            checked={filtros.equipamiento.includes("mancuernas")}
            onChange={handleEquipamiento}
          />
          <label htmlFor="mancuernas">Mancuernas</label>
        </div>

        <div className="equipment">
          <input
            id="barra"
            type="checkbox"
            value="barra"
            checked={filtros.equipamiento.includes("barra")}
            onChange={handleEquipamiento}
          />
          <label htmlFor="barra">Barra</label>
        </div>

        <div className="equipment">
          <input
            id="gomas"
            type="checkbox"
            value="gomas"
            checked={filtros.equipamiento.includes("gomas")}
            onChange={handleEquipamiento}
          />
          <label htmlFor="gomas">Gomas</label>
        </div>

        <div className="equipment">
          <input
            id="otros"
            type="checkbox"
            value="otros"
            checked={filtros.equipamiento.includes("otros")}
            onChange={handleEquipamiento}
          />
          <label htmlFor="otros">Otros</label>
        </div>
      </section>

    </aside>
  );
}

export default Filters;