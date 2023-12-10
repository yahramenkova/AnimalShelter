import React, { useState, useEffect } from 'react';
import { getAnimals } from '../../http/catalogAPI';
import './catalog.css';
import Button from '../button/button';
import { useNavigate } from 'react-router-dom';

export default function Catalog() {
  const [animals, setAnimals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const animalsData = await getAnimals();
        setAnimals(animalsData);
      } catch (error) {
        console.error('Ошибка при получении списка животных:', error);
      }
    };
    
    fetchAnimals();
  }, []);
  console.log(animals);
  return (
    <div className='catalog_block'>
      <h1>Catalog</h1>
      <div className="block_catalog">
        {animals.map(animal => (
          
          <div className="animal1" key={animal.animal_id}>
            <img
              className="pet1"
              src={animal.img}
              alt={`Pet: ${animal.name}`}
            />
            <h2>{animal.breed}</h2>
            <p>${animal.price.toFixed(2)}</p>
            <Button
              customClass='review_button'
              label='read more'
              animalId={animal.animal_id}            
              onClick={() => navigate(`/catalog/${animal.animal_id}`)}    
            />
            <Button  customClass='review_button'
              label='buy'/>
          </div>
        ))}
      </div>
    </div>
  );
}
