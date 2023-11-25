import React from 'react'
import './lostAnimalBlock.css'
import BannerLost from '../../pictures/lost_fone.svg'

export default function lostAnimalBlock() {
  return (
    <div className="main_lost_animal">
            <div className="lost_animal_map">
             <h1>Lost animals</h1>
             <div className="lost_anml">
                <img className="lost_pet1" src="pictures/blog2.svg" alt=""/>
                <div className="lost_inf">
                <h2>Breed: Pug</h2>
                <p>Location: Oktyabrskaya Street</p>
                <p>November 11, 2023</p>
                </div>
             </div>
             <div className="line"></div>
             <div className="lost_anml">
                <img className="lost_pet1" src="pictures/blog2.svg" alt=""/>
                <div className="lost_inf">
                <h2>Breed: No breed</h2>
                <p>Location: Oktyabrskaya Street</p>
                <p>November 11, 2023</p>
                </div>
             </div>
             <div className="line"></div>
             <div className="lost_anml">
                <img className="lost_pet1" src="pictures/blog2.svg" alt=""/>
                <div className="lost_inf">
                <h2>Breed: Pug</h2>
                <p>Location: Oktyabrskaya Street</p>
                <p>November 11, 2023</p>
                </div>
             </div>
             </div>
            <img className="fone" src={BannerLost} alt=""/>
          </div>
  )
}
