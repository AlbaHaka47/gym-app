import exercises from './exercises';
import ExerciseCard from './ExerciseCard';

function ExerciseList({ filtros }) {
  const ejerciciosFiltrados = exercises.filter((e) => {
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

  if (ejerciciosFiltrados.length === 0) {
    return <p>No hay ejercicios con esos filtros.</p>;
  }

  return (
    <div className="exercise-grid">
       {ejerciciosFiltrados.map((exercise) => (
        <ExerciseCard
          key={exercise.id}
          exercise={exercise}
        />
      ))} 
    </div>
  );
}

export default ExerciseList;