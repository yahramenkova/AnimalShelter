import React from 'react'
import './footer.css'
import InstIcon from "../../pictures/i-icon.svg"
import PinIcon from "../../pictures/p-icon.svg"
import FIcon from "../../pictures/f-icon.svg"

export default function Footer() {
  return (
    <footer className="footer">
 <div className="rec_footer1">
  <div className='text-footer'>
  <div className='corporate'>
  <h2>Corporate</h2>
  <p>About Us</p>
  <p>Contact Us</p>
  <p>Events</p>
  </div>
  <div className='information'>
  <h2>Information</h2>
  <p>Online Store</p>
  <p>Volunteer activity</p>
  <p>Reviews</p>
  <p>Educational matireals</p>
  </div>
  <div className='newsletter'>
  <h2>Newsletter</h2>
  <p>Be the first to know about our new collection launches, special offers & other updates.</p>
  <div className='line'></div>
  <div className='links-contact'>
  <img className="icon-img" src={FIcon} alt="" />
  <img className="icon-img" src={InstIcon} alt="" />
  <img className="icon-img" src={PinIcon} alt="" />
  </div>
  </div>
  </div>
 </div>
 <div className="rec_footer2"><p>&copy; 2023 Animal Shelter</p></div>
 </footer>
  )
}
