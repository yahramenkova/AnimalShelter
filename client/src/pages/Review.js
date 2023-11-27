import React from 'react'
import Header from '../components/header/header'
import Footer from '../components/footer/footer'
import ReviewBlock from '../components/reviewBlock/reviewBlock'

export default function Review() {
  return (
    <div className='review-page'>
      <Header/>
      <ReviewBlock/>
      <Footer/>
    </div>
  )
}
