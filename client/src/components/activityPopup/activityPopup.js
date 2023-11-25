// ArticlePopup.js
import React from 'react';
import Popup from 'reactjs-popup';
import Button from '../button/button'; // Путь к вашему компоненту кнопки
import './activityPopup.css'; // Предположим, что вы создадите файл стилей для вашего всплывающего окна

const ActivityPopup = ({ article, onClose }) => {
  return (
    <Popup
      trigger={<Button label="read more" customClass="read_button" />} // Добавьте свои классы стилей
      modal
      closeOnDocumentClick
    >
      {(close) => (
        <div className="article-popup">
          <button className="close" onClick={() => { close(); onClose && onClose(); }}>
            &times;
          </button>
          <h2>{article.title}</h2>
          <p>{article.content}</p>
          {/* Добавьте дополнительную информацию о статье, если необходимо */}
        </div>
      )}
    </Popup>
  );
}

export default ActivityPopup;
