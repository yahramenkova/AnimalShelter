import React, { useState } from 'react';
import './registrationForm.css'; // Подключаем файл стилей
import Button from '../button/button';
import {registration} from '../../http/userAPI'

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
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

  const signIn = async () =>{
    const response = await registration(formData.firstName, formData.lastName, formData.email, formData.password, formData.photo);
    console.log(response);
 };
 

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('User Registered:', formData);

    // Add your logic for user registration here
    // You can send the registration data to the server here

    // Reset the form after submission
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
        <label>
          <input
            type="text"
            className="input_field"
            placeholder='Enter First Name:'
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          <input
            type="text"
            className="input_field"
            placeholder='Enter Last Name:'
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          <input
            type="email"
            placeholder='Enter email:'
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
          <input
            type="password"
            placeholder='Enter password:'
            className="input_field"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          Add Photo:
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={handleChange}
          />

        <Button label='register' customClass='button-logUp' onClick={signIn}/>
      </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
