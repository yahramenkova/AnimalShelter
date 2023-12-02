import React from 'react';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import EducationBanner from '../pictures/Education_banner.svg';
import ArticleBlock from '../components/articleBlock/articleBlock';

export default function Education() {
  return (
    <div className="education-container">
      <Header />
      <div className='main-education'>
      <img className="Educationbanner" src={EducationBanner} alt="Banner" />
      <ArticleBlock />
      </div>
      <Footer />
    </div>
  );
}
