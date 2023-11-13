import React from 'react';
import './button.css'; // Основные стили кнопки

const Button = ({ onClick, label, customClass }) => {
  // Класс 'my-button' остается по умолчанию, добавляем дополнительные классы
  const buttonClasses = `my-button ${customClass}`;

  return (
    <button className={buttonClasses} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
