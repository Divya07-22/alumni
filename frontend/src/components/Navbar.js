// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import About from './About';
const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
      <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>  {/* Link to About page */}
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/logout">Logout</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;