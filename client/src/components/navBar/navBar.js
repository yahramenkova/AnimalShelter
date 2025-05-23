import React from 'react';
import { Link } from 'react-router-dom';
import './navBar.css'

function NavBar() {
  return (
    <div>
      <nav>
        <ul className="menu_list">
        <li className="menu_list_item">
            <Link to="/">Главная</Link>
          </li>
          <li className="menu_list_item">
            <Link to="/education">Полезные статьи</Link>
          </li>
          <li className="menu_list_item">
            <Link to="/review">Отзывы</Link>
          </li>
          <li className="menu_list_item">
            <Link to="/volunteer">Волонтерские активности</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
