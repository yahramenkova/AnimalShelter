import React, { useContext, useState } from 'react';
import { login } from '../../http/userAPI';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { CATALOG_ROUTE } from '../../utils/consts';
import { Context } from '../../index';
import { observer } from 'mobx-react-lite';
import Button from '../button/button';
import './loginForm.css';

const AuthorizationForm = observer(() => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const { user } = useContext(Context);
  const [error, setError] = useState('');

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = await login(email, password);
      console.log('Пользователь вошел:', userData);
      user.setUser(userData);
      user.setIsAuth(true);
      console.log('isAuth после авторизации:', user.isAuth);
      localStorage.setItem('auth', true);
      localStorage.setItem('userId', userData.id);
      localStorage.setItem('role', userData.role);
      localStorage.setItem('user', JSON.stringify(userData));
      navigate(CATALOG_ROUTE);
    } catch (error) {
      console.error('Ошибка авторизации:', error.message);
      setError('Invalid email or password'); 
    }
  };

  return (
    <section className="autorize">
      <div className="registration-form-container">
        <div className="autorize_text">
          <h2 className="enter__data">Enter your data</h2>
        </div>
        <div className="form__container">
          <form onSubmit={handleSubmit} className="form">
            {error && <div className="alert alert-danger">{error}</div>} {/* Отображение ошибки */}
            <input type="text" className="input_field" placeholder="Login/Email" onChange={handleEmailChange} />
            <input type="password" className="input_field" placeholder="Password" onChange={handlePasswordChange} />
            <Button type="submit" customClass="button-logIn" label="Submit" />
          </form>
          <div className="registration-link">
            <p>Not registered yet? <Link to="/registration" className="signup-link">Sign up</Link></p>
          </div>
        </div>
      </div>
    </section>
  );
});

export default AuthorizationForm;