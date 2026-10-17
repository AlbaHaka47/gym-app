import '../assets/Header.css';
import { Link } from 'react-router-dom';

import { useState } from 'react';

function Header() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };
  
  return (
    <header className="navbar">
      <Link to="/" className="logo">
        AnyWhereFit
       </Link>
      <button className="menu-toggle" onClick={toggleMenu} aria-label="Abrir menú">
        <i className={menuAbierto ? 'pi pi-times' : 'pi pi-bars'}></i>
      </button>
      <nav className={menuAbierto ? 'nav-menu abierto' : 'nav-menu'}>   
        <ul className="nav-links">
         <li>
            <Link to="/entrenamientos">
              <i className="pi pi-bolt"></i> Entrenamientos
            </Link>
          </li>

          <li>
            <Link to="/generar-rutina">
              <i className="pi pi-sliders-h"></i> Generar rutina
            </Link>
          </li>

          <li>
            <Link to="/calculadoras">
              <i className="pi pi-calculator"></i> Calculadoras
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;