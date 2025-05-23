import React, { useState } from 'react';
import './registrationForm.css';
import Button from '../button/button';
import { registration } from '../../http/userAPI';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    photo: 'https://i.pinimg.com/736x/b3/5a/96/b35a9666625caa1702a4aa2ba5dee028.jpg',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const signIn = async () => {
    try {
      const photo = getDefaultPhoto();
      await registration(
        formData.firstName,
        formData.lastName,
        formData.email,
        formData.password,
        photo
      );
      setSuccessMessage('Регистрация прошла успешно! Пожалуйста, выполните вход в систему');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Ошибка регистрации, попробуйте снова');
      setSuccessMessage('');
    }
  };

  const getDefaultPhoto = () => {
    return 'https://i.pinimg.com/736x/b3/5a/96/b35a9666625caa1702a4aa2ba5dee028.jpg';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
  };

  return (
    <div className="registration-form-container">
      <h2>Заполните форму</h2>
      <div className="form__container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="input_field"
            placeholder="Введите имя:"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            className="input_field"
            placeholder="Введите фамилию:"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="Введите email:"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            placeholder="Введите пароль:"
            className="input_field"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          {errorMessage && <div className="error-message">{errorMessage}</div>}
          {successMessage && <div className="success-message">{successMessage}</div>}

          <Button label="Отправить" customClass="button-logUp" onClick={signIn} />
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
