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
          <div className="text_volunteer1">Правильный уход, в правильный момент — для каждого животного</div>
        </h1>
      </div>
      <div className="achievements">
        <img className="achievements_wave" src={Wave} alt="" />
        <div className="achievements_text_block">
          <h1>Стань волонтером!</h1>
          <h2 className="achiev1">Станьте тем, кто меняет жизни пушистых друзей — станьте волонтёром в приюте для животных</h2>
          <h2 className="achiev2">Ваше время и забота подарят им второй шанс, а вам — радость и ощущение настоящей значимости. Присоединяйтесь к нам, чтобы вместе создавать атмосферу доброты и стать голосом тех, кто не может говорить</h2>
          <Button customClass="achiev_button" label="Отправить заявку" onClick={handleOpenForm} />
        </div>
      </div>
      <VolunteerForm isOpen={isFormOpen} onClose={handleCloseForm} />
    </div>
  );
}

export default AchievementsBlock;
