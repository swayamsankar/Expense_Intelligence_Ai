import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-logo">
          <span className="logo-icon">S</span>
          <span className="logo-text">
            Expense<span className="logo-highlight">Intelligence Ai</span>
          </span>
        </div>

        <nav className={`header-nav ${menuOpen ? 'active' : ''}`}>
          <Link to="/" className="nav-link">Dashboard</Link>
          <Link to="/expenses" className="nav-link">Expenses</Link>
          <Link to="/analytics" className="nav-link">Analytics</Link>
        </nav>

        <div className="header-actions">
          <button className="profile-btn">
            <img src="https://via.placeholder.com/32" alt="Profile" className="profile-avatar" />
          </button>
          <button className="menu-toggle" onClick={toggleMenu}>
            <span className="hamburger"></span>
          </button>
        </div>
      </div>
    </header>
  );
}
