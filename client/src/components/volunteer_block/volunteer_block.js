import React, {useState} from 'react';
import './volunteer_block.css'
import Wave from "../../pictures/wave.svg";
import PetHouse from "../../pictures/pet-house.png"
import Button from '../button/button';
import VolunteerForm from '../volunteerForm/volunteerForm';

function AchievementsBlock() {
  const [isFormOpen, setFormOpen] = useState(false);

  const handleOpenForm = () => {
    setFormOpen(true);
  };

  const handleCloseForm = () => {
    setFormOpen(false);
  };

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
          <h1>Become a volunteer</h1>
          <h2 className="achiev1">Make a difference in the lives of furry companions by volunteering at an animal shelter.</h2>
          <h2 className="achiev2">Your time and love can give them a second chance, while bringing joy and fulfillment to both of you. Join us in creating a compassionate environment and being a voice for those who cannot speak for themselves.</h2>
          <Button customClass="achiev_button" label="Submit an Application" onClick={handleOpenForm} />
        </div>
      </div>
      <VolunteerForm isOpen={isFormOpen} onClose={handleCloseForm} />
    </div>
  );
}

export default AchievementsBlock;
