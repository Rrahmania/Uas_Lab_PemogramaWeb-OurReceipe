// src/components/HeroCarousel.jsx
import React, { useState } from 'react';

const HeroCarousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fungsi untuk menggeser ke item sebelumnya (looping)
  const goToPrevious = () => {
    const isFirst = currentIndex === 0;
    const newIndex = isFirst ? items.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  // Fungsi untuk menggeser ke item berikutnya (looping)
  const goToNext = () => {
    const isLast = currentIndex === items.length - 1;
    const newIndex = isLast ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const currentItem = items[currentIndex];

  const carouselContainerStyle = {
    position: 'relative',
    maxWidth: '1000px',
    margin: '20px auto',
    borderRadius: '15px',
    overflow: 'hidden',
    backgroundColor: '#FFA239', // Warna orange muda (dari gambar)
    boxShadow: '0 8px 15px rgba(0,0,0,0.1)',
  };

  const itemStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: '30px',
    minHeight: '250px',
  };

  const imageStyle = {
    width: '40%',
    height: '220px',
    borderRadius: '10px',
    objectFit: 'cover',
    marginRight: '30px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
  };

  const contentStyle = {
    width: '60%',
    padding: '0 10px',
    color: '#A0522D', // Coklat tua
  };
  
  const titleStyle = {
    fontSize: '40px',
    margin: '0 0 10px 0',
  }

  const descriptionStyle = {
    fontSize: '16px',
    margin: '10px 0 20px 0',
    color: '#555'
  }

  const buttonStyle = {
    padding: '12px 35px',
    backgroundColor: 'white',
    color: '#FF8C00',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
    fontSize: '16px',
  };

  const arrowStyle = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    color: '#FF8C00',
    border: 'none',
    borderRadius: '50%',
    width: '45px',
    height: '45px',
    fontSize: '24px',
    cursor: 'pointer',
    zIndex: 10,
    boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
  };

  return (
    <div style={carouselContainerStyle}>
      <button onClick={goToPrevious} style={{ ...arrowStyle, left: '15px' }}>
        &larr;
      </button>

      <div style={itemStyle}>
        <img 
          src="https://via.placeholder.com/400x250?text=Ayam+Penyet" 
          alt={currentItem.title} 
          style={imageStyle} 
        />
        <div style={contentStyle}>
          <h2 style={titleStyle}>{currentItem.title}</h2>
          <p style={descriptionStyle}>{currentItem.description}</p>
          <button style={buttonStyle}>Lihat</button>
        </div>
      </div>

      <button onClick={goToNext} style={{ ...arrowStyle, right: '15px' }}>
        &rarr;
      </button>
    </div>
  );
};

export default HeroCarousel;