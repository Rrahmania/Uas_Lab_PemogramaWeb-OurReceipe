// src/components/Home.jsx
import React from 'react';
import HeroCarousel from './HeroCarousel';
import FavoriteFoodCard from './FavoriteFoodCard';
import { heroItems, favoriteFoods } from '../data'; // Perhatikan path, ini naik satu tingkat '..'

const pageContainerStyle = {
    backgroundColor: '#F5E7C6', // Warna latar belakang biru muda
    minHeight: '100vh',
    paddingBottom: '50px',
    fontFamily: 'Roboto, sans-serif',
};

const mainContentStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
};

const cardContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '20px 1%',
    padding: '10px 0',
};

const sectionTitleStyle = {
    textAlign: 'center',
    padding: '12px 40px',
    margin: '40px auto 20px',
    backgroundColor: '#FFA239', // Orange muda
    borderRadius: '30px',
    fontWeight: 'bold',
    color: '#A0522D',
    fontSize: '22px',
};

const Home = () => {
  return (
    <div style={pageContainerStyle}>
      
      <main style={mainContentStyle}>
        
        {/* --- HERO CAROUSEL (Ayam Penyet) --- */}
        <HeroCarousel items={heroItems} />

        {/* --- MAKANAN TERFAVORIT SECTION HEADER --- */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px'}}>
            <h3 style={sectionTitleStyle}>Makanan Terfavorit</h3>
        </div>

        {/* --- MAKANAN TERFAVORIT CARDS --- */}
        <div style={cardContainerStyle}>
          {favoriteFoods.map((food) => (
            <FavoriteFoodCard key={food.id} food={food} />
          ))}
        </div>

      </main>
    </div>
  );
};

export default Home;