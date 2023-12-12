// ArticleBlock.js
import React, { useState, useEffect } from 'react';
import ActivityPopup from '../activityPopup/activityPopup';
import { getArticles } from '../../http/articleAPI';
import Button from '../button/button';
import { Link } from 'react-router-dom';


const ArticleBlock = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [popupContent, setPopupContent] = useState({});
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const articlesData = await getArticles();
        setArticles(articlesData);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, []);

  const handleArticleClick = (article) => {
    let dateObj = new Date(article.upload_date);
    let day = dateObj.getDate();
    let month = dateObj.getMonth() + 1; // месяцы от 1 до 12
    let year = dateObj.getFullYear();
    let formattedDate = day + "/" + month + "/" + year;
 
    setPopupContent({
      title: article.title,
      category: article.category,
      content: article.description,
      link: <Link to={article.file_url}>{article.file_url}</Link>,
      date: formattedDate,
    });
    setPopupOpen(true);
 };

  return (
    <div className="block_article">
      {articles.map((article) => (
        <div key={article.title} className="article">
          <Button
            customClass="article"
            label={article.title}
            onClick={() => handleArticleClick(article)}
          />
        </div>
      ))}
      <ActivityPopup isOpen={isPopupOpen} onClose={() => setPopupOpen(false)} content={popupContent} />
    </div>
  );
};

export default ArticleBlock;
