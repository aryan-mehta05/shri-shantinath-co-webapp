import React from 'react';
import logo from "../../assets/shantinath-logo.jpeg";
import "./Navbar.css";

const Navbar = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <nav className='navbar'>
      <img src={logo} alt="Shantinath Logo" />
      <button type="submit" className='navbar-button' onClick={handleLogout}>Logout</button>
    </nav>
  )
};

export default Navbar;