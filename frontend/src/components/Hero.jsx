import '../assets/Hero.css';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <section>
      <div className="hero">
        <span className="hero-tag">
          ENTRENA. PLANIFICA. SUPÉRATE.
        </span>

        <h1>
          Entrena a tu ritmo,
          <br />
          <span>donde quieras.</span>
        </h1>

        <p>
          Encuentra ejercicios, crea tus rutinas
          y organiza tus entrenamientos.
        </p>

        <div className="buttons">
          <a href="#entrenamientos" className="button">
            Explorar ejercicios
          </a>

          <Link to="/generar-rutina" className="button">
            Crear mi rutina
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;