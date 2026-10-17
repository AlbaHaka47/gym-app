import exercises from '../../data/exercises';
import { filtrarEjercicios } from '../../utils/filtrarEjercicios';
import ExerciseCard from './ExerciseCard';

function ExerciseList({ filtros }) {
  const ejerciciosFiltrados = filtrarEjercicios(exercises, filtros);

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