import React from 'react';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import ReviewBlock from '../components/reviewBlock/reviewBlock';
import RevewBanner from '../pictures/blog.svg'

export default function Review() {
  return (
    <div className='review-page'>
      <Header />
      <div className='block_review'>
        <img className="blog" src={RevewBanner} alt=""/>
        <div className='text_block_review'>
        <h1>Reviews & ratings</h1>
        <ReviewBlock />
        </div>
      </div>
      <Footer />
    </div>
  );
}
