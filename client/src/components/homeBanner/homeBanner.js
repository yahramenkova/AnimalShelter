import React from 'react';
import { Link } from 'react-router-dom';
import './homeBanner.css'
import Banner from "../../pictures/Banner.svg"; // Здесь укажите правильный путь к вашему изображению
import Button from '../button/button';

function HomeBanner() {
  return (
    <div className="block-home">
      <img className="banner" src={Banner} alt="Banner" />
      <div className="home_text_block">
        <h1>Познакомьтесь с новыми друзьями, готовыми наполнить ваш дом любовью!</h1>
        <h2>Изучите профили наших пушистых друзей и найдите того, кто станет вашим верным спутником.</h2>
        <div className="button_block_find">
          <Link to="/catalog">
            <Button customClass='button_find_amimal' label='Каталог животных'/>
          </Link>
          <Link to="/lostAnimal">
            <button className="button_lost_amimal">Найденные животные</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomeBanner;
