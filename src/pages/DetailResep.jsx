// src/pages/DetailResep.jsx

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { initialRecipes } from '../data/resep'; // Pastikan path ke file data 'resep' ini benar
import './DetailResep.css'; 

const DetailResep = () => {
    const { id } = useParams();
    const recipeId = parseInt(id);

    const recipe = initialRecipes.find(r => r.id === recipeId);

    // STATE UNTUK FAVORIT DAN RATING PENGGUNA
    const [isFavorite, setIsFavorite] = useState(false); 
    const [userRating, setUserRating] = useState(0); 

    // Memuat status dari penyimpanan lokal saat komponen dimuat
    useEffect(() => {
        const storedFav = localStorage.getItem(`recipe-${recipeId}-favorite`) === 'true';
        const storedRating = parseInt(localStorage.getItem(`recipe-${recipeId}-rating`)) || 0;
        setIsFavorite(storedFav);
        setUserRating(storedRating);
    }, [recipeId]);


    // 🟢 HANDLER FAVORIT (ALERT DIHAPUS)
    const toggleFavorite = () => {
        const newFavStatus = !isFavorite;
        setIsFavorite(newFavStatus);
        // Simpan ke penyimpanan lokal
        localStorage.setItem(`recipe-${recipeId}-favorite`, newFavStatus);
        // ❌ alert() dihapus di sini
    };

    // 🟢 HANDLER RATING (ALERT DIHAPUS)
    const handleRating = (rate) => {
        setUserRating(rate);
        // Simpan rating pengguna ke penyimpanan lokal
        localStorage.setItem(`recipe-${recipeId}-rating`, rate);
        // ❌ alert() dihapus di sini
    };

    // Fungsi untuk menampilkan bintang yang dapat diklik (Input Rating)
    const renderStars = (currentRating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span 
                    key={i} 
                    className={`star ${i <= currentRating ? 'filled' : 'empty'}`}
                    onClick={() => handleRating(i)}
                >
                    ★
                </span>
            );
        }
        return stars;
    };
    
    // Tampilan Rating Rata-Rata Resep (menggunakan data recipe.rating)
    const renderAverageRating = () => {
        const rating = recipe.rating;
        const displayRating = Math.round(rating * 2) / 2;
        const fullStars = Math.floor(displayRating);
        const hasHalfStar = displayRating % 1 !== 0;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        
        return (
            <span className="avg-rating">
                {'★'.repeat(fullStars)}
                {hasHalfStar ? '½' : ''}
                {'☆'.repeat(emptyStars)} 
                <span style={{color: '#333', marginLeft: '5px'}}>({rating.toFixed(1)}/5)</span>
            </span>
        );
    };


    if (!recipe) {
        return <div className="detail-page" style={{textAlign: 'center', color: '#DB944B'}}>
            <Link to="/kategori" className="back-button">← Kembali ke Daftar Resep</Link>
            <p>Resep dengan ID {id} tidak ditemukan.</p>
        </div>;
    }


    return (
        <div className="detail-page">
            <Link to="/kategori" className="back-button">← Kembali ke Daftar Resep</Link>

            <div className="detail-container">
                <img src={recipe.image} alt={recipe.name} className="detail-image" />
                
                <div className="detail-info">
                    
                    <div className="header-info">
                        <h2>{recipe.name}</h2>
                        {/* Status Favorit akan diperbarui secara visual melalui class `active` */}
                        <button onClick={toggleFavorite} className={`favorite-btn ${isFavorite ? 'active' : ''}`}>
                            {isFavorite ? '❤️ Favorite Tersimpan' : '🤍 Tambahkan ke Favorite'}
                        </button>
                    </div>

                    <div className="metadata">
                        <p>Kategori: <strong>{recipe.categories.join(', ')}</strong></p>
                        <p>Rating Rata-rata: {renderAverageRating()}</p>
                    </div>

                    <p className="description">
                        Deskripsi:
                        <br/>
                        {recipe.description}
                    </p>

                    <p className="bahan-bahan">
                        Bahan - bahan:
                        <br/>
                        {recipe.bahan}
                    </p>

                    <p className="langkah-langkah">
                        Langkah - langkah:
                        <br/>
                        {recipe.langkah}
                    </p>
                    
                    <hr/>
                    
                    {/* --- Fitur Rating Pengguna --- */}
                    <div className="user-rating-section">
                        <h3>Beri Nilai Resep Ini:</h3>
                        <div className="rating-controls">
                            {renderStars(userRating)}
                            {/* Status rating pengguna akan diperbarui di sini */}
                            <span className="rating-status">
                                {userRating > 0 
                                    ? `Anda memberi ${userRating} bintang.` 
                                    : 'Klik bintang untuk memberi nilai.'
                                }
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailResep;