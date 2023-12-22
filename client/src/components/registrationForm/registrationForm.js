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
    photo: null,
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    const fileValue = type === 'file' ? files[0] : value;

    setFormData({
      ...formData,
      [name]: fileValue,
    });
  };

  const signIn = async () => {
    try {
      // Если пользователь не выбрал файл, добавляем фото по умолчанию
      const photo = formData.photo || getDefaultPhoto();

      const response = await registration(
        formData.firstName,
        formData.lastName,
        formData.email,
        formData.password,
        photo
      );
      console.log(response);
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  const getDefaultPhoto = () => {
    // Здесь можно добавить логику для получения фото по умолчанию,
    // например, импортировать изображение из локального файла или использовать URL-адрес
    return '94dd25f3692ecd605d0d3156e9cf7171.png';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('User Registered:', formData);
    setErrorMessage('');
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      photo: null,
    });
  };

  return (
    <div className="registration-form-container">
      <h2>Registration Form</h2>
      <div className="form__container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="input_field"
            placeholder="Enter First Name:"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            className="input_field"
            placeholder="Enter Last Name:"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="Enter email:"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            placeholder="Enter password:"
            className="input_field"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          Add Photo:
          <input type="file" name="photo" accept="image/*" onChange={handleChange} />

          {errorMessage && <div className="error-message">{errorMessage}</div>}

          <Button label="register" customClass="button-logUp" onClick={signIn} />
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;