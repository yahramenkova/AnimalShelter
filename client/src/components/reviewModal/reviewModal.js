import React, { useState } from 'react';
import { Modal, Form, Alert } from 'react-bootstrap';
import Button from '../button/button';
import { createReview } from '../../http/reviewAPI';

const ReviewModal = ({ isOpen, onClose }) => {
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log('Submitted Review:', { rating, comment });

    if (rating !== '' && comment !== '') {
      try {
        await createReview(rating, comment);
        setShowAlert(true);
      } catch (error) {
        console.error('Error submitting review:', error);
        setShowErrorAlert(true);
      }
    } else {
      setShowErrorAlert(true);
    }
  };

  const handleClose = () => {
    setRating('');
    setComment('');
    setShowAlert(false);
    setShowErrorAlert(false);
    onClose();
  };

  return (
    <Modal show={isOpen} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Leave a Review</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h2 className="reviews-header">Leave a Review</h2>

        {showAlert && (
          <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
            <Alert.Heading>Success!</Alert.Heading>
            <p>Your review has been successfully submitted.</p>
          </Alert>
        )}

        {showErrorAlert && (
          <Alert variant="danger" onClose={() => setShowErrorAlert(false)} dismissible>
            <Alert.Heading>Error!</Alert.Heading>
            <p>Please fill in all the required fields.</p>
          </Alert>
        )}

        <Form className="form">
          <Form.Group className="mb-3" controlId="rating">
            <Form.Label>Rating</Form.Label>
            <Form.Control
              type="number"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="comment">
            <Form.Label>Comment</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </Form.Group>
          <Button customClass="review_button" label="Submit Review" onClick={handleSubmit} />
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ReviewModal;