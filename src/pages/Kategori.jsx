import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { initialRecipes, categories } from '../data/resep'; 
import './Kategori.css'; 
import cari from '../assets/cari.png'; 


const Kategori = () => {
  const [activeCategory, setActiveCategory] = useState('Semua Resep');
  const [searchTerm, setSearchTerm] = useState('');

  const handleFilterClick = (category) => {
    setActiveCategory(category);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  
  const filterRecipes = () => {
    let filtered = initialRecipes;
    
    if (activeCategory !== 'Semua Resep') {
        filtered = initialRecipes.filter(recipe => 
            recipe.categories.includes(activeCategory)
        );
    }
    
    if (searchTerm) {
        const lowerCaseSearch = searchTerm.toLowerCase();
        filtered = filtered.filter(recipe => 
            recipe.name.toLowerCase().includes(lowerCaseSearch)
        );
    }
    
    return filtered;
  };

  const recipesToShow = filterRecipes();

  // Fungsi untuk menampilkan bintang rating (Penuh, Setengah, Kosong)
  const renderRating = (rating) => {
    const displayRating = Math.round(rating * 2) / 2;
    const fullStars = Math.floor(displayRating);
    const hasHalfStar = displayRating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return (
      <span className="rating-stars">
        {'★'.repeat(fullStars)}
        {hasHalfStar ? '½' : ''}
        {'☆'.repeat(emptyStars)}
        <span className="rating-value">({rating.toFixed(1)})</span> 
      </span>
    );
  };


  return (
    <div className='kategori-page'>
      
      <div className='search-input-area'>
         <div className='cari'> 
           <input 
               type="text" 
               placeholder='Cari Resep di sini...' 
               value={searchTerm}
               onChange={handleSearchChange}
           />
           <img src={cari} alt="ikon pencarian"/>
         </div>
      </div>
      
      <div className='filter-container'>
        <h2 className='filter-title'>Pilih Kategori Resep:</h2>
        <div className='filter-buttons'>
          {categories.map((category) => (
            <button
              key={category}
              className={`filter-button ${activeCategory === category ? 'active' : ''}`}
              onClick={() => handleFilterClick(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      
      <hr className='separator' />

      <div className='resep-list'>
        <h1 className='list-header'>Resep untuk Kategori: {activeCategory}</h1>
        
        {recipesToShow.length > 0 ? (
            recipesToShow.map(recipe => (
                // 🟢 LINK KE HALAMAN DETAIL
                <Link 
                    to={`/resep/${recipe.id}`} 
                    key={recipe.id} 
                    className='resep-card-link'
                >
                    <div className='resep-card'> 
                        <img src={recipe.image} alt={recipe.name} className='resep-card-img' />
                        <div className='resep-card-info'>
                            <h3 className='resep-card-title'>{recipe.name}</h3>
                            {renderRating(recipe.rating)}
                            <p className='resep-card-category'>
                                Kategori: {recipe.categories.join(', ')}
                            </p>
                        </div>
                    </div>
                </Link>
            ))
        ) : (
            <p className='no-result' style={{gridColumn: '1 / -1'}}>Tidak ada resep ditemukan.</p>
        )}
      </div>
    </div>
  );
};

export default Kategori;