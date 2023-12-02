import React, { useEffect, useState } from 'react';
import { getAnimals } from '../../http/catalogAPI'; // Импортируем функцию для получения животных
import './catalog.css';
import Button from '../button/button';

export default function Catalog() {
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    // Функция для получения списка животных
    const fetchAnimals = async () => {
      try {
        const animalsData = await getAnimals();
        setAnimals(animalsData);
      } catch (error) {
        console.error('Ошибка при получении списка животных:', error);
      }
    };

    // Вызываем функцию для получения списка животных
    fetchAnimals();
  }, []); // Пустой массив зависимостей гарантирует, что useEffect выполнится только после монтирования компонента

  return (
    <div className='catalog_block'>
      <h1>Catalog</h1>
      <div className="block_catalog">
        {/* Маппим список животных и отображаем каждого отдельного животного */}
        {animals.map(animal => (
          <div className="animal1" key={animal.id}>
            <img className="pet1" src={animal.img} alt={`Pet: ${animal.name}`} />
            <h2>{animal.breed}</h2>
            <p>${animal.price.toFixed(2)}</p>
            <Button customClass='review_button' label='read more'/>
            <Button  customClass='review_button' label='buy'/>
          </div>
        ))}
      </div>
    </div>
  );
}
