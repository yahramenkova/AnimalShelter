import React, { useState, useEffect } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Button from '../button/button';
import { Alert } from 'react-bootstrap';
import { createLostAnimal } from '../../http/lostAnimalAPI';
import { getVolunteer } from '../../http/volunteerAPI';

export default function AdminBlock() {
  const [volunteers, setVolunteers] = useState([]);
  const [species, setSpecies] = useState('');
  const [breed, setBreed] = useState('');
  const [location, setLocation] = useState('');
  const [dateLost, setDateLost] = useState('');
  const [img, setImg] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    const fetchVolunteers = async () => {
      const volunteersData = await getVolunteer();
      setVolunteers(volunteersData);
    };

    fetchVolunteers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get the values from the form
    const species = e.target.species.value;
    const breed = e.target.breed.value;
    const location = e.target.location.value;
    const dateLost = e.target.dateLost.value;
    const img = e.target.img.value;

    // Send the data to the server
    try {
      await createLostAnimal(species, breed, location, dateLost, img);
      setAlertMessage('Animal added successfully!');
    } catch (error) {
      console.error(error);
      setAlertMessage('Failed to add animal.');
    }

  };

  return (
    <div>
      <Accordion>
        <Accordion.Item eventKey="all-volunteers">
          <Accordion.Header>Show All Volunteers</Accordion.Header>
          <Accordion.Body>
            {volunteers.map((volunteer, index) => (
              <div key={index}>
                <p>{volunteer.phone_number}</p>
                <p>{volunteer.experience}</p>
              </div>
            ))}
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="add-lost-animal">
          <Accordion.Header>Add Lost Animal</Accordion.Header>
          <Accordion.Body>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Animal Species"
                name="species"
                value={species}
                onChange={(e) => setSpecies(e.target.value)}
              />
              <input
                type="text"
                placeholder="Enter Animal Breed"
                name="breed"
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
              />
              <input
                type="text"
                placeholder="Animal Location"
                name="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <input
                type="date"
                placeholder="Date of Loss"
                name="dateLost"
                value={dateLost}
                onChange={(e) => setDateLost(e.target.value)}
              />
              <input
                type="text"
                placeholder="Image Link"
                name="img"
                value={img}
                onChange={(e) => setImg(e.target.value)}
              />
              <Button customClass="button-submit" variant="primary" label='Submit' type="submit"/>
              <Alert
              className='alert'
                show={alertMessage !== ''}
                dismissible
                onClose={() => setAlertMessage('')}
              >
                {alertMessage}
              </Alert>
            </form>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
            }
