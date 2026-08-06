import React from 'react';
import './navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <a className="navbar__brand" href="#home">
        <span className="navbar__logo">C</span>
        <span>Carsly</span>
      </a>

      <button className="navbar__garage" type="button">
        Garage & Reminders
      </button>

      <div className="navbar__links">
        <a className="navbar__cars-title" href="#about">
          Your Cars
        </a>
        <button className="navbar__add-car" type="button">
          Add a new car
        </button>
      </div>
    </nav>
  );
}

export default Navbar;

