import React from 'react'
import './reviewBlock.css'
import ReviewBanner from '../../pictures/blog.svg'
import Button from '../button/button'

export default function ReviewBlock() {
  return (
    <div className='main-review-block'>
       <div className="block_review">
            <img className="blog" src={ReviewBanner} alt=""/>
             <div className="text_block_review">
             <h1>Reviews & ratings</h1>
             <div className="feedback_block">
             <div className="rec_feedback1"><p>"Thank you for your noble cause! We have found in the animal shelter not only a loyal friend, but also a family member. Responsive staff and cozy conditions create a warm atmosphere, and we are always ready to recommend your shelter."</p></div>
             <div className="rec_feedback2">
             <div className="inf_feedback">
                <img className="commentators" src="pictures/IMAGE.png" alt=""/>
                <div className="inf_commentators">
                 <p>James Williams</p> 
                 <p>United States</p>  
                </div>
             </div>
             </div>    
             </div>
 <Button label='leave a review' customClass='review-button'/>
 </div>
             </div>
             </div>
       
  )
}
