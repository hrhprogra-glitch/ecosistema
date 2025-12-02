import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';

// Páginas
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
// import ProductsPage from './pages/ProductsPage'; // Se elimina el import de ProductsPage
import ContactPage from './pages/ContactPage';
import QuotePage from './pages/QuotePage';
import AboutPage from './pages/AboutPage';
import PremiumStorePage from './pages/PremiumStoragePage'; 

function App() {
  return (
    <div className="min-h-screen bg-ecosistema-primary font-sans">
      <Header />
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tienda" element={<PremiumStorePage />} /> 
        <Route path="/servicios" element={<ServicesPage />} />
        {/* Se ha eliminado la ruta '/productos' para evitar que se duplique con '/tienda'. */}
        {/* <Route path="/productos" element={<ProductsPage />} /> */}
        <Route path="/acerca-de" element={<AboutPage />} />
        <Route path="/contacto" element={<ContactPage />} />
        <Route path="/cotizar" element={<QuotePage />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;