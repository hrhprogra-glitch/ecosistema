import React from 'react';
import { Mail, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const CTASection: React.FC = () => {
  return (
    <section id="cta" className="py-20 bg-ecosistema-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          ¿Listo para Optimizar su Ecosistema Hídrico?
        </h2>
        <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
          Contáctenos hoy para una auditoría gratuita o solicite una cotización personalizada para su proyecto.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <Link 
            to="/cotizar"
            className="flex items-center justify-center px-10 py-4 bg-ecosistema-accent text-white font-semibold rounded-full shadow-lg hover:bg-sky-500 transition duration-300 transform hover:scale-105"
          >
            <Zap className="w-5 h-5 mr-2" />
            Solicitar Cotización
          </Link>
          <Link 
            to="/contacto"
            className="flex items-center justify-center px-10 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition duration-300 transform hover:scale-105"
          >
            <Mail className="w-5 h-5 mr-2" />
            Contactar Asesor
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
