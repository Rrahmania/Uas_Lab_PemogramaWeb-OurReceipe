// src/components/Navbar.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // 👈 1. IMPORT LINK
import './Navbar.css';

// 🟢 Asumsi import ini sudah benar
import logo from '../assets/logo.png';
import burgerIcon from '../assets/hamburger.png';
import closeIcon from '../assets/tutup.webp';


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false); 

  const toggleMenu = () => {
    // Tutup menu saat link diklik (diimplementasikan di dalam <li>)
    setMenuOpen(prev => !prev);
  };

  return (
    <div className='navbar'>
      {/* 🟢 Gunakan <Link> untuk Logo */}
      <Link to="/" className='logo-link'> 
        <img src={logo} alt="logo" className='logo'/>
      </Link>
      
      {/* Tombol Burger/Close */}
      <div className="menu-icon" onClick={toggleMenu}>
        <img 
          // 🟢 2. Menggunakan variabel closeIcon yang sudah diimpor
          src={menuOpen ? closeIcon : burgerIcon} 
          alt={menuOpen ? "tutup" : "menu"} 
          className='burger-img'
        />
      </div>

      {/* Daftar menu */}
      <ul className={menuOpen ? 'open' : ''}>
        {/* 🟢 3. Ganti <a> dengan <Link> dan tambahkan onClick untuk menutup menu mobile */}
        <li><Link to="/login" onClick={toggleMenu}>Masuk</Link></li>
        <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
        <li><Link to="/kategori" onClick={toggleMenu}>Kategori</Link></li>
        <li><Link to="/favorite" onClick={toggleMenu}>Favorite</Link></li>
        {/* Pastikan path 'tambah resep' diubah menjadi format URL yang valid */}
        <li><Link to="/tambah-resep" onClick={toggleMenu}>Tambah Resep</Link></li>
      </ul>
    </div>
  );
}

export default Navbar;