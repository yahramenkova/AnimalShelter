import React, { useState } from 'react';
import './adoptionModal.css';
import Button from '../button/button';
import { createAdoptionRequest } from '../../http/adoptionAPI';
import { Alert } from 'react-bootstrap';

export default function AdoptionModal({ animalId, onClose }) {
  const [phone, setPhone] = useState('');
  const [comment, setComment] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  console.log("Animal ID:", animalId);

  const handleSubmit = async () => {
    try {
      if (!phone || !comment) {
        alert('Fill in all the fields!');
        return;
      }

      await createAdoptionRequest(animalId, phone, comment);
      setShowAlert(true);

      // Очистить поля после успешной отправки
      setPhone('');
      setComment('');
    } catch (error) {
      console.error('Ошибка при отправке заявки:', error);
      alert('Error when submitting an application');
    }
  };

  return (
    <div className="modal-overlay1">
      <div className="modal-content1">
        <button className="close-button" onClick={onClose}>
          ×
        </button>

        <h2>Registration of the application</h2>

        <input
          type="text"
          placeholder="Enter your phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <textarea
          placeholder="Enter your comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <div className="modal-buttons">
          <Button customClass="review_button" label="Send" onClick={handleSubmit} />
        </div>

        {showAlert && (
          <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
            <Alert.Heading>Success!</Alert.Heading>
            <p>Your adoption request has been successfully submitted. Our operator will contact you soon.</p>
          </Alert>
        )}
      </div>
    </div>
  );
}
