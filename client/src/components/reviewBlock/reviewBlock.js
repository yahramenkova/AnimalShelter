import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ReviewModal from '../reviewModal/reviewModal'; // Путь к вашему компоненту ReviewModal
import Button from '../button/button';
import './reviewBlock.css';

const ReviewBlock = () => {
  const [reviews, setReviews] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // При монтировании компонента, попытайтесь загрузить комментарии из локального хранилища
    const storedReviews = localStorage.getItem('userReviews');
    if (storedReviews) {
      setReviews(JSON.parse(storedReviews));
    }
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddReview = (review) => {
    const updatedReviews = [...reviews, review];
    setReviews(updatedReviews);
    // Сохранение обновленных комментариев в локальное хранилище
    localStorage.setItem('userReviews', JSON.stringify(updatedReviews));
  };

  return (
    <Container>
      <Row>
        <Col className='feedback_block'>
          <Button customClass='review_button' label='Add Review' onClick={handleOpenModal}></Button>
        </Col>
      </Row>
      <Row>
        <Col className='col-reveiw'>
          {reviews.map((review, index) => (
            <div key={index} className="feedback_block">
              <div className='rec_feedback1'>
                <h3>{review.rating}/5 Stars</h3>
                <p>{review.comment}</p>
              </div>
              <div className='rec_feedback2'>
                <div className="inf_feedback">
                  <img className="commentators" src="pictures/IMAGE.png" alt="" />
                  <p>James Williams</p>
                </div>
              </div>
            </div>
          ))}
        </Col>
      </Row>
      <ReviewModal isOpen={isModalOpen} onClose={handleCloseModal} onAddReview={handleAddReview} />
    </Container>
  );
};

export default ReviewBlock;
