import React, { useState } from 'react';
import '../registrationForm/registrationForm.css'; // Подключаем файл стилей
import Button from '../button/button';

const LoginForm = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('User Logged In:', formData);

    // Add your logic for user login here
    // You can send the login data to the server for authentication

    // Notify the parent component about successful login
    onLogin();

    // Reset the form after submission
    setFormData({
      email: '',
      password: '',
    });
  };

  return (
    <div className="registration-form-container">
      <h2>Login Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <Button label='enter' customClass="button-logIn"/>
      </form>
    </div>
  );
};

export default LoginForm;
