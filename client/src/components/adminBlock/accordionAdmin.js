import React, { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Button from '../button/button';
import { Alert } from 'react-bootstrap';
import { createNewAnimal } from '../../http/catalogAPI';
import { createRecord } from '../../http/recordAPI'

export default function AccordionBlock() {
  const [name, setName] = useState('');
  const [species, setSpecies] = useState('');
  const [age, setAge] = useState('');
  const [breed, setBreed] = useState('');
  const [colour, setColour] = useState('');
  const [notes, setNotes] = useState('');
  const [price, setPrice] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [weight, setWeight] = useState('');
  const [surgicalInterventions, setSurgicalInterventions] = useState('');
  const [vaccinations, setVaccinations] = useState('');
  const [chronicDiseases, setChronicDiseases] = useState('');
  const [allergies, setAllergies] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create the animal record
      const newAnimal = await createNewAnimal(name, species, age, breed, colour, notes, price, imgUrl);
      const animalId = newAnimal.animal_id;

      // Create the medical record
      const newRecord = await createRecord(
        weight,
        surgicalInterventions,
        vaccinations,
        chronicDiseases,
        allergies,
        animalId
      );

      setAlertMessage('Animal and medical record added successfully!');
      console.log('New animal:', newAnimal);
      console.log('New medical record:', newRecord);
    } catch (error) {
      console.error(error);
      setAlertMessage('Failed to add animal and medical record.');
    }
  };

  return (
    <div>
      <Accordion>
        <Accordion.Item eventKey="add-new-animal">
          <Accordion.Header>Add a new animal</Accordion.Header>
          <Accordion.Body>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Animal name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Animal species"
                name="species"
                value={species}
                onChange={(e) => setSpecies(e.target.value)}
              />
              <input
                type="number"
                placeholder="Animal age"
                name="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
              <input
                type="text"
                placeholder="Animal breed"
                name="breed"
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
              />
              <input
                type="text"
                placeholder="Animal color"
                name="colour"
                value={colour}
                onChange={(e) => setColour(e.target.value)}
              />
              <input
                type="text"
                placeholder="Additional notes"
                name="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
              <input
                type="number"
                placeholder="Price"
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <input
                type="text"
                placeholder="Image URL"
                name="imgUrl"
                value={imgUrl}
                onChange={(e) => setImgUrl(e.target.value)}
              />
              <input
                type="number"
                placeholder="Animal weight"
                name="weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
              <input
                type="text"
                placeholder="Surgical interventions"
                name="surgicalInterventions"
                value={surgicalInterventions}
                onChange={(e) => setSurgicalInterventions(e.target.value)}
              />
              <input
                type="text"
                placeholder="Vaccinations"
                name="vaccinations"
                value={vaccinations}
                onChange={(e) => setVaccinations(e.target.value)}
              />
              <input
                type="text"
                placeholder="Chronic diseases"
                name="chronicDiseases"
                value={chronicDiseases}
                onChange={(e) => setChronicDiseases(e.target.value)}
              />
              <input
                type="text"
                placeholder="Allergies"
                name="allergies"
                value={allergies}
                onChange={(e) => setAllergies(e.target.value)}
              />
              <Button customClass="button-submit" variant="primary" label='Submit' type="submit" />

              {alertMessage && (
                <Alert
                  className='alert'
                  show={alertMessage !== ''}
                  dismissible
                  onClose={() => setAlertMessage('')}
                >
                  {alertMessage}
                </Alert>
              )}
            </form>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}