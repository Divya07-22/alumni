// src/components/Footer.js
import React from 'react';
import { FaTwitter, FaFacebookF, FaLinkedinIn, FaInstagram } from 'react-icons/fa';  // Import icons from react-icons
import '../styles/Footer.css';
const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-links">
          <ul>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/privacy-policy">Privacy Policy</a></li>
          </ul>
        </div>
        <div className="footer-social">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="social-icon" />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebookF className="social-icon" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <FaLinkedinIn className="social-icon" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="social-icon" />
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Your Company. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
