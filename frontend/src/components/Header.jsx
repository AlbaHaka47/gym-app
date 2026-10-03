import '../assets/Header.css';
import { Link } from 'react-router-dom';

import { useState } from 'react';

function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };
  
  return (
    <header className="navbar">
      
      <nav className={menuAbierto ? 'nav-menu abierto' : 'nav-menu'}>   
        <Link to="/" className="logo">
        AnyWhereFit
       </Link>
        <ul className="nav-links">
          <li>
            <Link to="/entrenamientos">
              Entrenamientos
            </Link>
          </li>

          <li>
            <Link to="/generar-rutina">
              Generar rutina
            </Link>
          </li>

          <li>
            <Link to="/calculadoras">
              Calculadoras
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;