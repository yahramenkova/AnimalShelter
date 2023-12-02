// ArticleBlock.js
import React, { useState, useEffect } from 'react';
import ActivityPopup from '../activityPopup/activityPopup';
import { getArticles } from '../../http/articleAPI';
import Button from '../button/button';

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
    setPopupContent({
      title: article.title,
      categore: article.category,
      content: article.description,
      link: article.file_url,
      date: article.upload_date,
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
