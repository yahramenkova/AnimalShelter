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
        <h1>Meet new friends who are ready to fill your home with love!</h1>
        <h2>Explore the profiles of our furry friends and find someone who will become your faithful companion.</h2>
        <div className="button_block_find">
          <Link to="/catalog">
            <Button customClass='button_find_amimal' label='Catalog of animals'/>
          </Link>
          <Link to="/lostAnimal">
            <button className="button_lost_amimal">Lost animals</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomeBanner;
