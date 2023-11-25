// volunteerActivity.js
import React from 'react';
import './volunteerActivity.css';
import ActivityPopup from '../activityPopup/activityPopup'; // Обратите внимание на измененный путь

export default function VolunteerActivity() {
  const article = {
    title: 'Paws together',
    content: 'A volunteer day dedicated to active interaction with furry wards. Volunteers will help with walks, games and training of animals, creating strong bonds between a person and a pet.',
    // Добавьте другие свойства статьи, если необходимо
  };

  return (
    <div className='volunteer_block'>
      <h1>Volunteer Activity</h1>
      <div className='volunteer_inf'>
        <div className='active1'>
          <img className="img-activity" src="https://i.pinimg.com/474x/db/2f/11/db2f1157b57427bb0ebe702308bf895c.jpg" alt=""/>
          <h2>Paws together</h2>
          <p>A volunteer day dedicated to active interaction with furry wards. Volunteers will help with walks, games and training of animals, creating strong bonds between a person and a pet.</p>
          <h3>December 23, 2022</h3>
          <ActivityPopup article={article} />
        </div>
        
      </div>
    </div>
  );
}
