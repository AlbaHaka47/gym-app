import '../assets/TrainingPlaces.css';
import { Link } from 'react-router-dom';

const lugares = [
  {
    id: 1,
    title: 'En casa',
    lugar: 'casa',
    description: 'Entrena con poco o ningún equipamiento.',
    icon: 'pi pi-home',
  },
  {
    id: 2,
    title: 'Gimnasio',
    lugar: 'gimnasio',
    description: 'Máquinas, pesas y todo el equipamiento.',
    icon: 'pi pi-building',
  },
  {
    id: 3,
    title: 'Aire libre',
    lugar: 'aire-libre',
    description: 'Calistenia, running y entrenamiento exterior.',
    icon: 'pi pi-sun',
  },
];

function TrainingPlaces() {
  return (
    <section id="entrenamientos" className="training-places">
      <div className="section-heading">
        <span>ELIGE TU ENTORNO</span>

        <h2>
          ¿Dónde vas a entrenar hoy?
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
              <i className={lugar.icon}></i>
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