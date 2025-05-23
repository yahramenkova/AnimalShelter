import React from 'react';
import { Link } from 'react-router-dom';
import { LOGIN_ROUTE } from '../utils/consts';

export default function NotFound() {
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  };

  const textContainerStyle = {
    textAlign: 'center',
    fontSize: '1.2rem',
  };

  return (
    <div style={containerStyle}>
      <p style={textContainerStyle}>
       Чтобы получить доступ к этой странице, вам необходимо войти в систему. Пожалуйста <Link to={LOGIN_ROUTE} className='signup-link'>войдите</Link> чтобы продолжить.
      </p>
    </div>
  );
}
