// ActivityPopup.js
import React from 'react';
import './popup.css'

const ActivityPopup = ({ isOpen, onClose, content }) => {
  if (!isOpen) {
    return null; // Don't render anything if the popup is closed
  }

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className='close' onClick={onClose}>&#10006;</button>
        {/* Render content dynamically based on its type */}
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
    return content; // Render plain text
  } else if (React.isValidElement(content)) {
    return content; // Render React element (e.g., a form)
  } else if (typeof content === 'object' && content !== null) {
    // Render nested properties recursively
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
    return String(content); // Render other types as strings
  }
};

export default ActivityPopup;
