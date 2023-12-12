import React, { useContext, useState } from 'react';
import { login } from '../../http/userAPI';
import { useNavigate } from 'react-router-dom';
import { CATALOG_ROUTE} from '../../utils/consts';
import { Context } from '../..';
import { observer } from 'mobx-react-lite';

const AuthorizationForm = observer(() => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const {user} = useContext(Context)

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

   const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const userData = await login(email, password);
    console.log('Пользователь вошел:', userData);
    user.setUser(userData);
    user.setIsAuth(true);
    console.log('Идентификатор пользователя:', localStorage.setItem('userId', userData.id));
    console.log('isAuth после авторизации:', user.isAuth); 
    navigate(CATALOG_ROUTE);
  } catch (error) {
    console.error('Ошибка авторизации:', error.message);
  }
};


  return (
    <section className="autorize">
      <div className="autorize__container">
        <div className="autorize_text">
          <h2 className="enter__data">Enter your data</h2>
        </div>
        <div className="form__container">
          <form onSubmit={handleSubmit} className="form">
            <input type="text" className="input_field" placeholder="Login/Email" onChange={handleEmailChange} />
            <input type="password" className="input_field" placeholder="Password" onChange={handlePasswordChange} />
            <button type="submit" className="submit__button2">
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
});

export default AuthorizationForm;
