import React from 'react'
import NavBar from '../navBar/navBar'
import './header.css'
import Logo from "../../pictures/Logo.svg";
import { Link } from 'react-router-dom';
import Button from '../button/button';

function Header() {
  
  return (
    <header>
    <div className="blockLogo"><img className="logo" src={Logo} alt="Logo" /></div>
    <NavBar />
    <div className="button-log">
    <Link to="/login">
    <Button customClass="button-logIn" label="Log in" />
    </Link>
    <Link to="/registration">
    <Button customClass="button-logUp" label="Log Up" />
    </Link>
    <Link to="/admin">
    <Button customClass="button-logUp" label="Admin" />
    </Link>
    </div> 
    </header>
  )
}

export default Header
