import React from 'react';
import { ShoppingCart, Zap, Droplets } from 'lucide-react';
import { Link } from 'react-router-dom';

const productHighlights = [
  { icon: <Droplets className="w-8 h-8 text-ecosistema-accent" />, title: "Bombas de Alta Eficiencia", description: "Reduzca el consumo energético hasta en un 40%." },
  { icon: <Zap className="w-8 h-8 text-ecosistema-accent" />, title: "Sistemas de Filtración Avanzada", description: "Agua pura para riego y consumo, libre de sedimentos." },
  { icon: <ShoppingCart className="w-8 h-8 text-ecosistema-accent" />, title: "Controladores Inteligentes", description: "Automatización total basada en clima y humedad del suelo." },
];

const ProductsSection: React.FC = () => {
  return (
    <section id="products" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-sm font-semibold uppercase text-ecosistema-accent tracking-widest mb-2">Tienda Ecosistema</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-ecosistema-dark">Productos de Riego y Gestión</h3>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Explore nuestra selección de equipos de última generación diseñados para la máxima conservación hídrica.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {productHighlights.map((item, index) => (
            <div key={index} className="p-6 bg-ecosistema-primary rounded-xl shadow-lg text-center transition duration-300 hover:shadow-xl">
              <div className="mb-4 flex justify-center">{item.icon}</div>
              <h4 className="text-xl font-semibold text-ecosistema-dark mb-2">{item.title}</h4>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link 
            to="/productos"
            className="inline-flex items-center px-8 py-3 bg-ecosistema-accent text-white font-semibold rounded-full shadow-celeste hover:bg-sky-500 transition duration-300 transform hover:scale-105"
          >
            Explorar Productos
            <ShoppingCart className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
