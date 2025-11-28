import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; 
import Kategori from './pages/Kategori';
import DetailResep from './pages/DetailResep'; 
import Favorite from './pages/Favorite'; 

const HomePage = () => <div style={{padding: '50px', textAlign: 'center'}}>
    <h1 style={{color: '#DB944B'}}>Selamat Datang di Resep App!</h1>
    <p>Silakan jelajahi resep melalui menu Kategori.</p>
</div>;
const LoginPage = () => <div style={{padding: '50px', textAlign: 'center'}}>
    <h1 style={{color: '#DB944B'}}>Halaman Masuk (Login)</h1>
    <p>Fitur ini akan segera ditambahkan.</p>
</div>;
const TambahResepPage = () => <div style={{padding: '50px', textAlign: 'center'}}>
    <h1 style={{color: '#DB944B'}}>Halaman Tambah Resep</h1>
    <p>Anda bisa menambahkan resep baru di sini.</p>
</div>;


function App() {
  return (
    <Router>
      {/* NAVBAR DITEMPATKAN DI SINI */}
      <Navbar /> 
      
      <main>
        <Routes>
          {/* Halaman Utama */}
          <Route path="/" element={<HomePage />} />
          
          {/* Halaman Utama Aplikasi */}
          <Route path="/kategori" element={<Kategori />} /> 
          <Route path="/resep/:id" element={<DetailResep />} /> 
          <Route path="/favorite" element={<Favorite />} /> 
          
          {/* Halaman Lain */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/tambah-resep" element={<TambahResepPage />} />
          
          {/* Route Fallback */}
          <Route path="*" element={
              <div style={{padding: '50px', textAlign: 'center'}}>
                  <h1 style={{color: 'red'}}>404 - Halaman Tidak Ditemukan</h1>
              </div>
          } />
        </Routes>
      </main>
      
    </Router>
  );
}

export default App;
