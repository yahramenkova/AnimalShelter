import React, { useState, useEffect } from 'react';
import { getAnimals, getAllCats, getAllDogs } from '../../http/catalogAPI';
import { markAnimalAsSold } from '../../http/catalogAPI';
import './catalog.css';
import Button from '../button/button';
import { useNavigate } from 'react-router-dom';

export default function Catalog() {
  const [animals, setAnimals] = useState([]);
  const [showOnlyCats, setShowOnlyCats] = useState(false);
  const [showOnlyDogs, setShowOnlyDogs] = useState(false);
  const [showAllAnimals, setShowAllAnimals] = useState(true); // Set the default state to show all animals
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        let animalsData;
        if (showOnlyCats) {
          animalsData = await getAllCats();
        } else if (showOnlyDogs) {
          animalsData = await getAllDogs();
        } else if (showAllAnimals) {
          animalsData = await getAnimals();
        }
        setAnimals(animalsData);
      } catch (error) {
        console.error('Ошибка при получении списка животных:', error);
      }
    };

    fetchAnimals();
  }, [showOnlyCats, showOnlyDogs, showAllAnimals]);

  const handleBuyButtonClick = async (animalId) => {
    try {
      await markAnimalAsSold(animalId);
      const updatedAnimals = animals.filter((animal) => animal.animal_id !== animalId);
      setAnimals(updatedAnimals);
      alert('Покупка успешно оформлена!');
    } catch (error) {
      console.error('Ошибка при покупке животного:', error);
    }
  };

  const handleShowCatsClick = () => {
    setShowOnlyCats(!showOnlyCats);
    setShowOnlyDogs(false);
    setShowAllAnimals(false);
  };

  const handleShowDogsClick = () => {
    setShowOnlyDogs(!showOnlyDogs);
    setShowOnlyCats(false);
    setShowAllAnimals(false);
  };

  const handleShowAllAnimalsClick = () => {
    setShowAllAnimals(!showAllAnimals);
    setShowOnlyCats(false);
    setShowOnlyDogs(false);
  };

  return (
    <div className="catalog_block">
      <h1>Catalog</h1>
      <div className="button-filters">
        <Button
          customClass={`button_lost_animal ${showOnlyCats ? 'active' : ''}`}
          onClick={handleShowCatsClick}
          label="Cats"
        />
        <Button
          customClass={`button_lost_animal ${showOnlyDogs ? 'active' : ''}`}
          onClick={handleShowDogsClick}
          label="Dogs"
        />
        <Button
          customClass={`button_lost_animal ${showAllAnimals ? 'active' : ''}`}
          onClick={handleShowAllAnimalsClick}
          label="All Animals"
        />
      </div>
      <div className="block_catalog">
        {animals.map((animal) => (
          <div className="animal1" key={animal.animal_id}>
            <img className="pet1" src={animal.img} alt={`Pet: ${animal.name}`} />
            <h2>{animal.breed}</h2>
            <p>${animal.price.toFixed(2)}</p>
            <Button
              customClass="review_button"
              label="read more"
              animalId={animal.animal_id}
              onClick={() => navigate(`/catalog/${animal.animal_id}`)}
            />
            <Button customClass="review_button" label="buy" onClick={() => handleBuyButtonClick(animal.animal_id)} />
          </div>
        ))}
      </div>
    </div>
  );
}