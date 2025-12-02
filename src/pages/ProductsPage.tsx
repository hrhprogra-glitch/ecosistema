import React from 'react';
import ProductsSection from '../components/sections/ProductsSection';

const ProductsPage: React.FC = () => {
  return (
    <main>
      {/* El contenido de productos se mueve aquí */}
      <ProductsSection />
      <div className="p-12 text-center">
        <h2 className="text-3xl font-bold text-ecosistema-dark">Catálogo Completo de Productos...</h2>
      </div>
    </main>
  );
};

export default ProductsPage;
