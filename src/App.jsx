import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import Home from './pages/Home';
import Contact from './pages/Contact';

const App = () => {
  return (
    <>
      <nav>
        <div className="container">
          <div className="logo">
            <h2 className="gradient-text" style={{fontSize: '1.8rem', letterSpacing: '2px', fontWeight: '800'}}>IO TECH</h2>
          </div>
          <div className="links">
            <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>Home</NavLink>
            <NavLink to="/contact" className={({ isActive }) => isActive ? "active" : ""}>Contact</NavLink>
          </div>
        </div>
      </nav>

      <main style={{ minHeight: 'calc(100vh - 80px)' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      <footer>
        <div className="container">
          <p>&copy; 2026 IO Technology Solutions. All Rights Reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default App;
