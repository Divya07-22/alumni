import { Routes, Route } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Home from './components/Home';
import Carousel from './components/Carousel';
import Footer from './components/Footer';
import About from './components/About';
import Contact from './components/Contact';
import Login from './components/Login';
import Logout from './components/Logout';
import StudentProfile from './components/StudentProfile';
import AlumniProfile from './components/AlumniProfile';
import ProfileMatching from './components/ProfileMatching';
import Search from './components/Search';
import './App.css';

function App() {
  return (
    <div className="App">
      {/* Navbar and Header */}
      <Navbar />
      <Header />
      
      {/* Carousel for images */}
      <Carousel />

      {/* Define Routes */}
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/about.js" element={<About />} />
        <Route path="/search.js" element={<Search />} />
        <Route path="/login.js" element={<Login />} />
        <Route path="/logout.js" element={<Logout />} />
        <Route path="/contact.js" element={<Contact />} />
        <Route path="/student-profile" element={<StudentProfile />} />
        <Route path="/alumni-profile" element={<AlumniProfile />} />
        <Route path="/profile-matching" element={<ProfileMatching />} />
      </Routes>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}

export default App;