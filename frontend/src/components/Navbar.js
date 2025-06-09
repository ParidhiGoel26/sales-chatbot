import React from 'react';
import '../styles/Navbar.css'; // ✅ corrected path

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src="/logo.png" alt="Logo" className="logo" />
        <h1>Sales Chatbot</h1>
      </div>
    </nav>
  );
}

export default Navbar;
