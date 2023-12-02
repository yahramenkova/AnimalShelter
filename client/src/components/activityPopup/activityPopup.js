// ActivityPopup.js
import React from 'react';
import './popup.css'

const ActivityPopup = ({ isOpen, onClose, content }) => {
  if (!isOpen) {
    return null; 
  }

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className='close' onClick={onClose}>&#10006;</button>
        {Object.entries(content).map(([key, value]) => (
          <div key={key}>
            <strong>{key}:</strong> {renderContent(value)}
          </div>
        ))}
      </div>
    </div>
  );
};

const renderContent = (content) => {
  // Check the type of content and render accordingly
  if (typeof content === 'string') {
    return content; 
  } else if (React.isValidElement(content)) {
    return content; 
  } else if (typeof content === 'object' && content !== null) {
    return (
      <div>
        {Object.entries(content).map(([key, value]) => (
          <div key={key}>
            <strong>{key}:</strong> {renderContent(value)}
          </div>
        ))}
      </div>
    );
  } else {
    return String(content); 
  }
};

export default ActivityPopup;
