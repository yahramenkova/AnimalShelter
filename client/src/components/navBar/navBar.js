import React from 'react';
import { Link } from 'react-router-dom';
import './navBar.css'

function NavBar() {
  return (
    <div>
      <nav>
        <ul className="menu_list">
        <li className="menu_list_item">
            <Link to="/">Home</Link>
          </li>
          <li className="menu_list_item">
            <Link to="/education">Article</Link>
          </li>
          <li className="menu_list_item">
            <Link to="/review">Reviews</Link>
          </li>
          <li className="menu_list_item">
            <Link to="/volunteer">Volunteer Activity</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
