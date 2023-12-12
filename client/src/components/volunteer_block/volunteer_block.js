import React from 'react';
import './volunteer_block.css'
import Wave from "../../pictures/wave.svg";
import PetHouse from "../../pictures/pet-house.png"
import Button from '../button/button';

function AchievementsBlock() {
  return (  
      <div className="achievements_block">
        <div className="rec_gradient">
          <img className="home_pet" src={PetHouse} alt="pets" />
          <h1 className="text_achievements">
            <div className="text_volunteer1">What your pet needs, when they need it.</div>
          </h1>
        </div>
        <div className="achievements">
          <img className="achievements_wave" src={Wave} alt="" />
          <div className="achievements_text_block">
            <h1>personal achievements</h1>
            <h2 className="achiev1">Find out about the personal achievements of our animal shelter.</h2>
            <h2 className="achiev2">Thanks to your support, we have achieved significant success in providing care, finding homes and improving the lives of our wards. Join us and become a part of this inspiring path</h2>
            <Button customClass="achiev_button" label="Find More"/>
          </div>
        </div>
      </div> 
  
  );
}

export default AchievementsBlock;
