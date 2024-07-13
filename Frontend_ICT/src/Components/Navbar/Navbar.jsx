import React from 'react';
import './Navbar.css';
import logo from "../../assets/logo.png";

const Navbar = () => {
  return (
    <nav className='container'>
        <img src={logo} alt="" className='logo' />
        <ul>
            <li>Home</li>
            <li>Courses</li>
            <li>Events</li>
            <li>About Us</li>
            <li>Contact Us</li>
            <li><button className='btn'>LOGIN</button></li>
        </ul>
    </nav>
    
  )
}

export default Navbar
