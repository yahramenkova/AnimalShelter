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

  return (
    <div className="main-map">
      <div className="map_block">
        <div className="inf_pet">
          <Button customClass='review_button' 
           label='back' 
           onClick={() => navigate(`/catalog`)}/>
          <h1>INTERACTIVE MAP</h1>
          <div className="block_inf_text">
            <h2>{animalData.breed}</h2>
            <p>Name: {animalData.name}</p>
            <p>Breed: {animalData.breed}</p>
            <p>Age: {animalData.age} years</p>
            <p>Color: {animalData.colour}</p>
            <p>Special marks: {animalData.species}</p>
            <p>Notes: {animalData.notes}</p>
            <p>Price: ${animalData.price.toFixed(2)}</p>
              <h2 className="date">{animalData.date}</h2>
              <Button  customClass='review_button'
              label='medical card' />
          </div>
        </div>
        <img className="pet_photo" src={animalData.img} alt='' />
      </div>
    </div>
  );
};

export default InteractiveMap;
