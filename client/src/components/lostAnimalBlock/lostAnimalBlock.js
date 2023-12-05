import React, { useState, useEffect } from 'react';
import './lostAnimalBlock.css';
import BannerLost from '../../pictures/lost_fone.svg';
import { getLostAnimal } from '../../http/lostAnimalAPI';

export default function LostAnimalBlock() {
  const [lostAnimals, setLostAnimals] = useState([]);

  useEffect(() => {
    const fetchLostAnimals = async () => {
      try {
        const lostAnimalsData = await getLostAnimal();
        setLostAnimals(lostAnimalsData);
      } catch (error) {
        console.error('Error while fetching lost animals:', error);
      }
    };

    fetchLostAnimals();
  }, []);

  return (
    <div className="main_lost_animal">
      <div className="lost_animal_map">
        <h1>Lost animals</h1>
        <div className="lost_animal_container">
          {lostAnimals.map(animal => (
            <div key={animal.animal_id} className="lost_anml">
              <img className="lost_pet1" src={animal.img} alt={`Lost pet: ${animal.species}`} />
              <div className="lost_inf">
                <h2>{`Breed: ${animal.breed || 'No breed'}`}</h2>
                <p>{`Location: ${animal.location}`}</p>
                <p>{new Date(animal.date_lost).toLocaleDateString()}</p>
               
              </div>
              
            </div>
          ))}
        </div>
        
       
      </div>
      <img className="fone" src={BannerLost} alt="" />
    </div>
  );
}
