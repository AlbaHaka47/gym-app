import '../../assets/ExerciseCard.css';

function ExerciseCard({ exercise }) {
  return (
    <article className={`exercise-card ${exercise.color}`}>
    
      <div className="exercise-info">
        <div className="btn-cards">
          <p>{exercise.grupoMuscular}</p>
          <p>{exercise.dificultad}</p> 
        </div>
        
        <h3>{exercise.nombre}</h3>

          <span className="exercise-tag">
            {exercise.equipamiento.join(", ").replace("-", " ")}
          </span>
        
      </div>
    </article>
  );
}

export default ExerciseCard;