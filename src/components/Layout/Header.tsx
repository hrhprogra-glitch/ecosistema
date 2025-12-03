import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../ui/Logo'; 

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  const isHomePage = location.pathname === '/';
  const isTransparent = isHomePage && !scrolled; 

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Tienda', path: '/tienda' }, 
    { name: 'Servicios', path: '/servicios' },
    { name: 'Proyectos', path: '/proyectos' },
    { name: 'Clientes', path: '/clientes' },
    { name: 'Blog', path: '/blog' },
  ];

  const textColorClass = isTransparent ? 'text-black' : 'text-slate-900';
  const hoverTextColorClass = isTransparent ? 'hover:text-sky-400' : 'hover:text-sky-600';
  
  return (
    <>
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] border-b border-transparent
          ${isTransparent 
            ? 'bg-transparent py-6' 
            : 'bg-white/90 backdrop-blur-xl py-3 shadow-md border-gray-100/50' 
          }
        `}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center">
          
          {/* LOGOTIPO INTEGRADO */}
          <Link to="/" className="z-50 relative hover:opacity-95 transition-opacity">
             <Logo color={isTransparent ? 'white' : 'dark'} /> 
          </Link>
          
          {/* NAVEGACIÓN DESKTOP */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((item) => (
              <Link 
                key={item.name} 
                to={item.path} 
                className={`relative text-lg font-bold ${textColorClass} ${hoverTextColorClass} transition-colors py-1 group/link`}
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-sky-500 transition-all duration-300 ease-out group-hover/link:w-full"></span>
              </Link>
            ))}
          </div>

          {/* ÁREA DE ACCIÓN (CTA) */}
          <div className="hidden lg:flex items-center gap-6">
              <Link 
                to="/contacto" 
                className={`text-lg font-bold ${isTransparent ? 'text-white/70' : 'text-slate-500'} hover:text-slate-900 transition-colors`}
              >
                  Contacto
              </Link>
              <Link 
                  to="/asesoria" 
                  className="group relative px-6 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all duration-300 overflow-hidden bg-slate-900 text-white hover:shadow-lg hover:shadow-sky-500/20 hover:-translate-y-0.5"
              >
                  <span className="relative z-10 flex items-center gap-2">
                      Impulsar Crecimiento
                      <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-sky-600 to-sky-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
          </div>

          {/* BOTÓN HAMBURGUESA (MÓVIL) - SIMPLIFICADO */}
          {/* Ya no hace la animación de transformarse en X, solo abre el menú */}
          <button
            className={`lg:hidden p-2 ${textColorClass} hover:bg-gray-100/50 rounded-full transition-colors z-50 relative flex items-center justify-center`}
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Abrir menú"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>
      
      {/* MENÚ MÓVIL (OFF-CANVAS) */}
      {/* Overlay */}
      <div 
        className={`fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-500 lg:hidden ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} 
        onClick={() => setMobileMenuOpen(false)}
      ></div>
      
      {/* Panel Deslizante */}
      <div 
        className={`fixed top-0 right-0 z-50 h-full w-[85%] max-w-[360px] bg-white shadow-2xl transform transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1) lg:hidden flex flex-col ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        
        {/* --- NUEVA X DE CIERRE --- */}
        {/* Posicionada absolutamente en la esquina superior derecha del panel blanco */}
        <button 
          onClick={() => setMobileMenuOpen(false)}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-all z-50"
          aria-label="Cerrar menú"
        >
          <X className="w-6 h-6" />
        </button>
        {/* ------------------------- */}

        <div className="p-8 pt-24 flex-1 flex flex-col gap-6 overflow-y-auto">
          {navLinks.map((item, idx) => (
            <Link 
                key={item.name} 
                to={item.path} 
                className="text-3xl font-light text-slate-800 hover:text-sky-600 transition-colors border-b border-gray-50 pb-4"
                style={{ transitionDelay: `${idx * 50}ms` }}
                onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <Link 
            to="/contacto" 
            className="text-xl font-medium text-slate-400 mt-4"
            onClick={() => setMobileMenuOpen(false)}
          >
            Contacto
          </Link>
        </div>
        <div className="p-8 bg-gray-50 border-t border-gray-100">
            <Link 
                to="/asesoria" 
                className="flex items-center justify-center w-full py-5 bg-slate-900 text-white font-bold text-lg rounded-xl shadow-lg active:scale-95 transition-transform"
                onClick={() => setMobileMenuOpen(false)}
            >
                Hablar con un Especialista
            </Link>
            <p className="text-center text-xs text-slate-400 mt-4 tracking-wider">ECOSISTEMA &copy; {new Date().getFullYear()}</p>
        </div>
      </div>
    </>
  );
};

export default Header;