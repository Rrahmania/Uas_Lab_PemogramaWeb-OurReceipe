import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// 🚨 Pastikan path ke file data Anda benar
import { initialRecipes } from '../data/resep'; 
import './Favorite.css'; // Buat file CSS baru ini

const Favorite = () => {
    const [favoriteRecipes, setFavoriteRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Ambil ID resep yang disimpan sebagai favorit di localStorage
        const favoriteIds = [];
        
        // 1. Iterasi melalui semua kunci di localStorage
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            
            // 2. Cari kunci yang formatnya "recipe-ID-favorite" dan nilainya "true"
            if (key.startsWith('recipe-') && key.endsWith('-favorite') && localStorage.getItem(key) === 'true') {
                // Ekstrak ID resep dari kunci (misalnya dari "recipe-1-favorite" menjadi 1)
                const idString = key.split('-')[1];
                favoriteIds.push(parseInt(idString));
            }
        }

        // 3. Filter resep dari data utama berdasarkan ID yang ditemukan
        const foundFavorites = initialRecipes.filter(recipe => 
            favoriteIds.includes(recipe.id)
        );

        setFavoriteRecipes(foundFavorites);
        setLoading(false);
    }, []);

    // Fungsi untuk menampilkan bintang rating (Sama seperti di Kategori.jsx)
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

    if (loading) {
        return <div className="favorite-page">Memuat Resep Favorit...</div>;
    }

    return (
        <div className="favorite-page">
            <h1 className="page-title">❤️ Resep Favorit Saya</h1>

            <div className='resep-list-favorite'>
                {favoriteRecipes.length > 0 ? (
                    favoriteRecipes.map(recipe => (
                        <Link 
                            to={`/resep/${recipe.id}`} 
                            key={recipe.id} 
                            className='resep-card-link'
                        >
                            <div className='resep-card favorite-card'> 
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
                    <p className='no-favorites'>
                        Anda belum memiliki resep favorit. 
                        Coba jelajahi <Link to="/kategori">Kategori Resep</Link> dan tambahkan beberapa!
                    </p>
                )}
            </div>
        </div>
    );
};

export default Favorite;