import '../assets/TrainingPlaces.css';
import { Link } from 'react-router-dom';

const lugares = [
  {
    id: 1,
    title: 'En casa',
    description: 'Entrena con poco o ningún equipamiento.',
    icon: '🏠',
  },
  {
    id: 2,
    title: 'Gimnasio',
    description: 'Máquinas, pesas y todo el equipamiento.',
    icon: '🏋️',
  },
  {
    id: 3,
    title: 'Aire libre',
    description: 'Calistenia, running y entrenamiento exterior.',
    icon: '🌳',
  },
];

function TrainingPlaces() {
  return (
    <section id="entrenamientos" className="training-places">
      <div className="section-heading">
        <span>ELIGE TU ENTORNO</span>

        <h2>
          ¿Dónde vas a entrenar
          <strong> hoy?</strong>
        </h2>

        <p>
          Encuentra ejercicios adaptados al lugar
          y al equipamiento que tienes disponible.
        </p>
      </div>

      <div className="places-grid">
        {lugares.map((lugar) => (
          <article className="place-card" key={lugar.id}>
            <div className="place-icon">
              {lugar.icon}
            </div>

            <h3>{lugar.title}</h3>

            <p>{lugar.description}</p>

            <Link to={`/entrenamientos?lugar=${lugar.lugar}`}>
              Ver ejercicios →
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

export default TrainingPlaces;