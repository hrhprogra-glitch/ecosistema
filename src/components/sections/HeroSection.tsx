import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom'; // Se importa Link

const HeroSection: React.FC = () => {
  // Imagen de Pexels: Riego en campo verde
  const imageUrl = "https://images.pexels.com/photos/1450082/pexels-photo-1450082.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

  return (
    <section id="hero" className="relative h-[70vh] md:h-[85vh] overflow-hidden">
      {/* Imagen de Fondo con Efecto Parallax sutil */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000"
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        {/* Overlay de Gradiente para legibilidad y estética (Se usa ecosistema-dark para oscurecer y mejorar contraste con texto claro) */}
        <div className="absolute inset-0 bg-gradient-to-t from-ecosistema-dark/80 via-ecosistema-dark/30 to-transparent"></div>
      </div>

      {/* Contenido Principal */}
      {/* Ajuste: Establecido en pb-10 para ajustar el contenido más abajo y evitar la superposición con el encabezado. */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-end pb-10">
        <div className="w-full md:w-2/3 lg:w-1/2">
          {/* CAMBIO: Se usa text-white para el contraste */}
          <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-4">
            Soluciones Hídricas que <span className="text-ecosistema-accent">Transforman</span>
          </h1>
          {/* CAMBIO: Se usa text-gray-200 para el contraste */}
          <p className="text-xl text-gray-200 mb-8">
            Ecosistema ofrece mantenimiento experto y productos de riego de alta eficiencia para asegurar la salud y sostenibilidad de sus recursos hídricos.
          </p>
          
          <div className="flex space-x-4">
            {/* CAMBIO: Se usa Link y ruta correcta */}
            <Link 
              to="/servicios"
              className="flex items-center px-8 py-3 bg-ecosistema-accent text-white font-semibold rounded-full shadow-celeste hover:bg-sky-500 transition duration-300 transform hover:scale-105"
            >
              Ver Servicios
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            {/* CAMBIO: Se usa Link y ruta correcta */}
            <Link 
              to="/productos"
              className="px-8 py-3 border-2 border-ecosistema-accent text-white font-semibold rounded-full hover:bg-ecosistema-accent/10 transition duration-300 transform hover:scale-105"
            >
              Comprar Productos
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;