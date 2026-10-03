import '../assets/Hero.css';

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
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

          <a href="#rutina" className="button">
            Crear mi rutina
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;