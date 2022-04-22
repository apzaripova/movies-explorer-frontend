import React from 'react';
import './MoreButton.css';

function MoreButton({ onMoreBtn, isVisible}) {
  return (
    <div className={`more ${isVisible && "more_active"}`}>
      <button 
        type="button" 
        className="more-btn" 
        onClick={onMoreBtn}>Ещё</button>
    </div>
  );
}

export default MoreButton;