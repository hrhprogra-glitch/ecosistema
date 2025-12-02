import React from 'react';
import Logo from '../ui/Logo';
import { MapPin, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom'; // Se importa Link

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 mt-16">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          
          {/* Columna 1: Logo y Misión */}
          <div>
            <Logo />
            <p className="mt-4 text-sm text-gray-500">
              Líderes en soluciones hídricas sostenibles para un futuro verde.
            </p>
          </div>

          {/* Columna 2: Enlaces Rápidos */}
          <div>
            <h4 className="text-lg font-semibold text-ecosistema-dark mb-4">Navegación</h4>
            <ul className="space-y-3">
              {/* CAMBIO: Se usa Link y rutas */}
              <li><Link to="/servicios" className="text-gray-600 hover:text-ecosistema-accent transition">Servicios</Link></li>
              <li><Link to="/productos" className="text-gray-600 hover:text-ecosistema-accent transition">Productos</Link></li>
              <li><Link to="/acerca-de" className="text-gray-600 hover:text-ecosistema-accent transition">Acerca de</Link></li>
              <li><Link to="/contacto" className="text-gray-600 hover:text-ecosistema-accent transition">Contacto</Link></li>
            </ul>
          </div>

          {/* Columna 3: Servicios Clave (Se mantienen los '#' como marcadores para sub-servicios) */}
          <div>
            <h4 className="text-lg font-semibold text-ecosistema-dark mb-4">Servicios Clave</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-ecosistema-accent transition">Mantenimiento de Agua</a></li>
              <li><a href="#" className="text-gray-600 hover:text-ecosistema-accent transition">Sistemas de Riego</a></li>
              <li><a href="#" className="text-gray-600 hover:text-ecosistema-accent transition">Consultoría Hídrica</a></li>
              <li><a href="#" className="text-gray-600 hover:text-ecosistema-accent transition">Instalación</a></li>
            </ul>
          </div>

          {/* Columna 4: Información de Contacto */}
          <div>
            <h4 className="text-lg font-semibold text-ecosistema-dark mb-4">Contáctanos</h4>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-ecosistema-accent" />
                <span>Av. Principal, Ciudad Verde</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-5 h-5 text-ecosistema-accent" />
                <span>+52 55 1234 5678</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-5 h-5 text-ecosistema-accent" />
                <span>info@ecosistema.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-200 pt-8 text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Ecosistema. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;