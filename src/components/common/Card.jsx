import React from 'react';

const Card = ({ children, className = '', noPadding = false, hover = false, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`card-glass ${hover ? 'card-hover' : ''} ${
        noPadding ? '' : 'p-6'
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
