// volunteerActivity.js
import React, { useState, useEffect } from 'react';
import './volunteerActivity.css';
import ActivityPopup from '../activityPopup/activityPopup';
import Button from '../button/button';
import { getActivity } from '../../http/volunteerActivityAPI'; 

export default function VolunteerActivity() {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [popupContent, setPopupContent] = useState(null);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const activitiesData = await getActivity();
        setActivities(activitiesData);
      } catch (error) {
        console.error('Error while fetching volunteer activities:', error);
      }
    };

    fetchActivities();
  }, []); 

  const openPopup = (content) => {
    setPopupContent(content);
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
    setPopupContent(null);
  };

  return (
    <div className='volunteer_block'>
      <h1>Volunteer Activity</h1>
      <div className='volunteer_inf'>
        {activities.map((activity) => (
          <div key={activity.id} className='active1'>
            <img className="img-activity" src={activity.img} alt={activity.activity_type} />
            <h2>{activity.activity_type}</h2>
            <p>{activity.description}</p>
            <h3>{activity.date}</h3>
            <Button label='read more' customClass='review_button' onClick={() => openPopup(activity)} />
          </div>
        ))}
        <ActivityPopup isOpen={isPopupOpen} onClose={closePopup} content={popupContent} />
      </div>
    </div>
  );
}
