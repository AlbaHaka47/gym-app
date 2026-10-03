import '../assets/Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <small>
        © 2026 AnyWhereFit
      </small>

      <Link to="/" className="footer-logo">
          AnyWhereFit
      </Link>

      <p>
        Entrena a tu ritmo. Donde quieras.
      </p>

    </footer>
  );
}

export default Footer;