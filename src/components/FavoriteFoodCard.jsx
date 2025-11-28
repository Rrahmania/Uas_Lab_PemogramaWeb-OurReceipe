// src/components/FavoriteFoodCard.jsx
import React from 'react';

const cardStyle = {
  width: '30%',
  borderRadius: '8px',
  overflow: 'hidden',
  backgroundColor: 'white',
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  paddingBottom: '10px',
  flex: '0 0 calc(33.333% - 20px)',
  margin: '10px 0',
  minWidth: '200px',
  transition: 'transform 0.2s',
  cursor: 'pointer',
};

const imageStyle = {
  width: '100%',
  height: '180px',
  objectFit: 'cover',
  display: 'block',
};

const contentStyle = {
  padding: '10px',
  textAlign: 'left',
  position: 'relative',
};

const heartStyle = {
  position: 'absolute',
  right: '10px',
  top: '10px',
  fontSize: '24px',
  cursor: 'pointer',
  color: 'red',
};

const descriptionStyle = {
    fontSize: '14px',
    color: '#555',
    lineHeight: '1.4',
}

const FavoriteFoodCard = ({ food }) => {
  return (
    <div style={cardStyle}>
      <img
        src="https://via.placeholder.com/250x180?text=Soto+Daging" 
        alt={food.title}
        style={imageStyle}
      />
      <div style={contentStyle}>
        <div style={heartStyle}>♡</div> 
        <h4 style={{ margin: '0 0 5px 0' }}>{food.title}</h4>
        <p style={descriptionStyle}>
          {food.description}
        </p>
      </div>
    </div>
  );
};

export default FavoriteFoodCard;