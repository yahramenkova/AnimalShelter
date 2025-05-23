import React from 'react'
import './footer.css'
import InstIcon from "../../pictures/i-icon.svg"
import PinIcon from "../../pictures/p-icon.svg"
import FIcon from "../../pictures/f-icon.svg"

export default function Footer() {
  return (
    <footer className="footer">
      <div className="rec_footer1">
        <div className="text-footer">
          <div className="corporate">
            <h2>О приюте</h2>
            <p>О нас</p>
            <p>Контакты</p>
            <p>Мероприятия</p>
          </div>
          <div className="information">
            <h2>Основное</h2>
            <p>Каталог животных</p>
            <p>Волонтёрам</p>
            <p>Отзывы</p>
            <p>Материалы</p>
          </div>
          <div className="newsletter">
            <h2>Связаться с нами</h2>
            <p>Телефон: +375 (29) 123-45-67</p>
            <p>Почта: info@shelter.by</p>
            <p>Счёт для пожертвований: BY00UNBS00000000000000000000</p>
            <div className="line"></div>
            <div className="links-contact">
              <img className="icon-img" src={FIcon} alt="Facebook" />
              <img className="icon-img" src={InstIcon} alt="Instagram" />
              <img className="icon-img" src={PinIcon} alt="Pinterest" />
            </div>
          </div>
        </div>
      </div>
      <div className="rec_footer2">
        <p>&copy; 2025 Приют для животных</p>
      </div>
    </footer>
  );
};