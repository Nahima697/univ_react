import { useState } from "react";
import { Link } from "react-router-dom";


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
           <svg
          className="logo bun-logo"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 64"
          width="34"
          height="34"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-label="Computer Logo"
          role="img"
        >
          <rect x="8" y="12" width="48" height="32" rx="4" ry="4" fill="#f0f0f0" />
          <rect x="20" y="48" width="24" height="6" rx="1" ry="1" fill="#333" />
          <rect x="16" y="44" width="32" height="4" fill="#ccc" />
          <circle cx="32" cy="28" r="6" fill="#333" />
        </svg> Université Hyppo
        </div>

        {/* Menu Desktop */}
        <div className="navbar-menu-desktop">
          <Link to="/">Accueil</Link>
          <Link to="/classList">Cours</Link>
          <Link to="/login" className="link-menu">Connexion</Link>
        </div>

        {/* Menu Mobile */}
        <div className="navbar-menu-mobile">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? "✖" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="mobile-menu">
          <Link to="/" onClick={() => setIsOpen(false)}>Accueil</Link>
          <Link to="/classList" onClick={() => setIsOpen(false)}>Cours</Link>
          <Link to="/admin" className="link-menu" onClick={() => setIsOpen(false)}>Admin</Link>
        </div>
      )}
    </nav>
  );
}
