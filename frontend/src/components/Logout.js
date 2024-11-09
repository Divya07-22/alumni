// src/components/Logout.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  // Simulate a logout action (e.g., clearing session or token)
  const handleLogout = () => {
    // Here you would clear session or token
    // For now, just navigate to Home page after logging out
    navigate('/');
  };

  return (
    <div className="logout-page">
      <h1>You have been logged out</h1>
      <button onClick={handleLogout}>Go to Home</button>
    </div>
  );
};

export default Logout;

