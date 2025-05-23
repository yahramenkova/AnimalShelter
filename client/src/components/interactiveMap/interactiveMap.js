import React, { useState, useEffect } from 'react';
import { getAnimalById } from '../../http/catalogAPI';
import { useParams } from 'react-router-dom';
import './interactiveMap.css';
import { useNavigate } from 'react-router-dom';
import Button from '../button/button';

const InteractiveMap = () => {
  const { id } = useParams();
  console.log(id);
  const [animalData, setAnimalData] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchAnimalData = async () => {
      try {
        const data = await getAnimalById(id);
        setAnimalData(data);
      } catch (error) {
        console.error('Error fetching animal data:', error);
      }
    };

    fetchAnimalData();
  }, [id]);

  if (!animalData) {
    return <div>Loading...</div>;
  }
  const openPopup = () => {
    setShowPopup(true);
  };
 
  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="main-map">
      <div className="map_block">
        <div className="inf_pet">
          <Button customClass='review_button' 
           label='back' 
           onClick={() => navigate(`/catalog`)}/>
          <h1>ИНТЕРАКТИВНАЯ КАРТА</h1>
          <div className="block_inf_text">
            <h2>{animalData.breed}</h2>
            <p>Кличка: {animalData.name}</p>
            <p>Порода: {animalData.breed}</p>
            <p>Возраст: {animalData.age} years</p>
            <p>Окрас: {animalData.colour}</p>
            <p>Вид: {animalData.species}</p>
            <p>Примечания: {animalData.notes}</p>
            <p>Стоимость: ${animalData.price.toFixed(2)}</p>
              <h2 className="date">{animalData.date}</h2>
              <Button customClass='review_button'
     label='medical card' 
     onClick={openPopup} />
     {showPopup && (
       <div className="popup">
         <h2>Медицинская карта</h2>
         <p>вес: {animalData.record.weight}</p>
         <p>хирургические вмешательства: {animalData.record.surgical_interventions}</p>
         <p>вакцины: {animalData.record.vaccinations}</p>
         <p>хронические заболевания: {animalData.record.chronic_diseases}</p>
         <p>аллергия: {animalData.record.allergies}</p>
         <Button onClick={closePopup} label='close' customClass='review_button'/>
       </div>
     )}
          </div>
        </div>
        <img className="pet_photo" src={animalData.img} alt='' />
      </div>
    </div>
  );
};

export default InteractiveMap;
