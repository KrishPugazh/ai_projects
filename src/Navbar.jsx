import React from 'react'
import logo from '../src/assets/logo-removebg-preview.png'
import './App.css'
import { NavLink } from 'react-router-dom'
const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-light navbar-light">
  <div className="container">
    <a className="navbar-brand" href="#"> <img src={logo} alt="Health Advisor" style={{
        width:"60px",
        height:"50px",
  
    }} /> Health Advisor</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/contact">Contact</NavLink>
        </li>
       <li className="nav-item">
       <NavLink className="nav-link" to="/about">About</NavLink>
       </li>
      </ul>
    </div>
  </div>
</nav>
  )
}

export default Navbar