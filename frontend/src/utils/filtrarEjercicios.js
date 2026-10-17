export function filtrarEjercicios(ejercicios, filtros) {
  return ejercicios.filter((e) => {
    const lugarOk =
      filtros.lugar === "todos" || e.lugar === filtros.lugar;

    const dificultadOk =
      filtros.dificultad === "todas" || e.dificultad === filtros.dificultad;

    const musculosOk =
      filtros.musculos.length === 0 ||
      filtros.musculos.some((m) => e.musculos.includes(m));

    const equipamientoOk =
      filtros.equipamiento.length === 0 ||
      filtros.equipamiento.some((q) => e.equipamiento.includes(q));

    return lugarOk && dificultadOk && musculosOk && equipamientoOk;
  });
}