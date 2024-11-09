// src/components/Header.js
import React from 'react';
//import './Header.css';  // If you want to add custom styling for the Header

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <h1>Alumni-Student Connection</h1>
      </div>
      <nav className="navbar">
        <ul>
          <li><a href="Home.js">Home</a></li>
          <li><a href="About.js">About</a></li>
          <li><a href="Search.js">Search</a></li>
          <li><a href="Login.js">Login</a></li>
          <li><a href="contact.js">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
