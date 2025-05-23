import React,{useContext} from 'react'
import NavBar from '../navBar/navBar'
import './header.css'
import Logo from "../../pictures/Logo.svg";
import { Link } from 'react-router-dom';
import Button from '../button/button';
import { Context } from '../../index';

function Header() {
  const {user} = useContext(Context);

 const userRole = localStorage.getItem('role');
 const handleLogout = () => {
  user.logout();
};
const userAuth = localStorage.getItem('auth');
 return (
   <header>
     <Link to="/">
       <div className="blockLogo"><img className="logo" src={Logo} alt="Logo" /></div>
     </Link>
     <NavBar />
     <div className="button-log">
       <Link to="/login">
         <Button customClass="button-logIn" label="Вход" />
       </Link>
       <Link to="/registration">
         <Button customClass="button-logUp" label="Регистрация" />
       </Link>
       {userRole === 'ADMIN' && (
         <Link to="/admin">
           <Button customClass="button-Admin" label="Admin" />
         </Link>
       )}
       {userAuth === 'true' && (
       <Button customClass="button-logOut" onClick={handleLogout} label='Выйти' />
       )}
     </div> 
   </header>
 )
}

export default Header
