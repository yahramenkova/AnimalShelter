import React, { useState } from 'react';
import './registrationForm.css'; // Подключаем файл стилей
import Button from '../button/button';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    const fileValue = type === 'file' ? files[0] : value;

    setFormData({
      ...formData,
      [name]: fileValue,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('User Registered:', formData);

    // Add your logic for user registration here
    // You can send the registration data to the server here

    // Reset the form after submission
    setFormData({
      username: '',
      email: '',
      password: '',
      photo: null,
    });
  };

  return (
    <div className="registration-form-container">
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </label>
        <br />
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
        <label>
          Add Photo:
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={handleChange}
          />
        </label>
        <br />
        <Button label='register' customClass='button-logUp'/>
      </form>
    </div>
  );
};

export default RegistrationForm;
