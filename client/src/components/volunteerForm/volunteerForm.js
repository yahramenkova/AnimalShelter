import React, { useState, useEffect } from 'react';
import { Modal, Form } from 'react-bootstrap';
import Button from '../button/button';
import { getActivity } from '../../http/volunteerActivityAPI';
import { registerVolunteer } from '../../http/volunteerAPI';
import './volunteerForm.css';

const VolunteerForm = ({ isOpen, onClose }) => {
  const [directions, setDirections] = useState([]);
  const [selectedDirections, setSelectedDirections] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [hasVolunteerExperience, setHasVolunteerExperience] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchVolunteerDirections = async () => {
      try {
        const directions = await getActivity();
        setDirections(directions);
      } catch (error) {
        console.error('Error fetching volunteer directions:', error);
      }
    };

    fetchVolunteerDirections();
  }, []);

  const handleDirectionChange = (direction) => {
    const isSelected = selectedDirections.some((selectedDirection) => selectedDirection.activity_id === direction.activity_id);

    if (isSelected) {
      setSelectedDirections(selectedDirections.filter((selectedDirection) => selectedDirection.activity_id !== direction.activity_id));
    } else {
      setSelectedDirections([...selectedDirections, direction]);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userValue = parseInt(localStorage.getItem('userId'), 10);

    if (!phoneNumber || selectedDirections.length === 0) {
      setErrorMessage('Please enter all the required information.');
    } else if (phoneNumber.length > 10) {
      setErrorMessage('Phone number cannot exceed 10 characters.');
    } else {
      try {
        const selectedActivityIds = selectedDirections.map((direction) => direction.activity_id);

        const volunteerData = {
          user_id: userValue,
          phone_number: phoneNumber,
          experience: hasVolunteerExperience,
          selectedActivityIds: selectedActivityIds,
        };

        await registerVolunteer(volunteerData);
        onClose();
        alert('Volunteer registration successful!');
      } catch (error) {
        console.error('Error submitting volunteer form:', error);
      }
    }
  };

  return (
    <Modal show={isOpen} onHide={onClose} centered dialogClassName="volunteer-form-modal">
      <Modal.Header closeButton>
        <Modal.Title>Volunteer Registration</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h2 className="volunteer-form-title">Join Our Volunteer Team</h2>
        <p className="volunteer-form-description">Please fill out the form below to register as a volunteer.</p>

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="phoneNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="hasVolunteerExperience">
            <Form.Label>Have you had previous volunteer experience?</Form.Label>
            <Form.Check
              type="radio"
              label="Yes"
              name="hasVolunteerExperience"
              checked={hasVolunteerExperience === 'Yes'}
              onChange={() => setHasVolunteerExperience('Yes')}
              inline
            />
            <Form.Check
              type="radio"
              label="No"
              name="hasVolunteerExperience"
              checked={hasVolunteerExperience === 'No'}
              onChange={() => setHasVolunteerExperience('No')}
              inline
            />
          </Form.Group>

          <Form.Group controlId="volunteerDirections">
            <Form.Label>Volunteer Directions</Form.Label>
            <div className="volunteer-form-directions">
              {directions.map((direction) => (
                <Form.Check
                  key={direction.activity_id}
                  type="checkbox"
                  label={`${direction.activity_type} (${direction.description}, ${direction.duration} hours)`}
                  checked={selectedDirections.some((selectedDirection) => selectedDirection.activity_id === direction.activity_id)}
                  onChange={() => handleDirectionChange(direction)}
                />
              ))}
            </div>
          </Form.Group>

          {errorMessage && <div className="error-message">{errorMessage}</div>}

          <Button customClass="achiev_button" label="Submit" type="submit" />
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default VolunteerForm;