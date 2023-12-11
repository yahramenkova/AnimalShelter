import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ReviewModal from '../reviewModal/reviewModal';
import Button from '../button/button';
import './reviewBlock.css';
import {getAllReviews} from '../../http/reviewAPI';

const ReviewBlock = () => {
 const [reviews, setReviews] = useState([]);
 const [isModalOpen, setIsModalOpen] = useState(false);

 useEffect(() => {
   const fetchReviews = async () => {
     try {
       const reveiwData = await getAllReviews();
       setReviews(reveiwData);
     } catch (error) {
       console.error('Ошибка при получении списка комментариев:', error);
     }
   };
   
   fetchReviews();
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
         {reviews.map((review) => (
           <div key={review.review_id} className="feedback_block">
             <div className='rec_feedback1'>
               <h3>{review.rating}/5 Stars</h3>
               <p>{review.comment}</p>
               <p>{review.date_posted}</p>
             </div>
             <div className='rec_feedback2'>
               <div className="inf_feedback">
                <img className="commentators" src={review.user.photo} alt="" />
                <p>{review.user.firstName} {review.user.lastName}</p>
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
