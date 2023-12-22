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
    fontSize: '1.4rem',
  };

  return (
    <div style={containerStyle}>
      <p style={textContainerStyle}>
        To access this page, you need to log in. Please <Link to={LOGIN_ROUTE} className='signup-link'>log in</Link> to continue.
      </p>
    </div>
  );
}
