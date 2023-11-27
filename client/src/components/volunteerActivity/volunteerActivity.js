// volunteerActivity.js
import React, { useState } from 'react';
import './volunteerActivity.css';
import ActivityPopup from '../activityPopup/activityPopup';
import Button from '../button/button';

export default function VolunteerActivity() {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [popupContent, setPopupContent] = useState(null);

  const openPopup = (content) => {
    setPopupContent(content);
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
    setPopupContent(null);
  };

  const articleContent = {
    title: 'Paws together',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
  };

  return (
    <div className='volunteer_block'>
      <h1>Volunteer Activity</h1>
      <div className='volunteer_inf'>
        <div className='active1'>
          <img className="img-activity" src="https://i.pinimg.com/474x/db/2f/11/db2f1157b57427bb0ebe702308bf895c.jpg" alt="" />
          <h2>Paws together</h2>
          <p>A volunteer day dedicated to active interaction with furry wards. Volunteers will help with walks, games and training of animals, creating strong bonds between a person and a pet.</p>
          <h3>December 23, 2022</h3>
          <Button  label='read more' customClass='achiev_button' onClick={() => openPopup(articleContent)}> </Button>
          <ActivityPopup isOpen={isPopupOpen} onClose={closePopup} content={popupContent} />
        </div>
      </div>
    </div>
  );
}
