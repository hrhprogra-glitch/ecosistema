// ecosistema/src/pages/PremiumStoragePage.tsx

import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  ShoppingCart, 
  Filter, 
  ChevronDown, 
  ArrowRight, 
  Maximize, 
  Wind, 
  CheckCircle2,
  Activity,
  Cpu,
  Droplets,
  Settings
} from 'lucide-react';
import { Link } from 'react-router-dom';

// --- UTILS & HOOKS ---

// Animación de aparición suave y técnica (Slide Up con Opacity)
const Reveal = ({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
    
    if (ref.current) observer.observe(ref.current);
    
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div 
      ref={ref} 
      className={`${className} transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`} 
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// Componente Parallax Sutil para Hero
const Parallax = ({ children, speed = 0.05, className = "" }: { children: React.ReactNode, speed?: number, className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const offset = window.scrollY * speed;
      window.requestAnimationFrame(() => {
        if(ref.current) {
            ref.current.style.transform = `translate3d(0, ${offset}px, 0)`;
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return <div ref={ref} className={`will-change-transform ${className}`}>{children}</div>;
};

// --- DATA ---

const categories = [
  { name: "Todos", count: 124 },
  { name: "Rotores", count: 45 },
  { name: "Difusores", count: 32 },
  { name: "Goteo", count: 28 },
  { name: "Control", count: 19 }
];

const products = [
  {
    id: 1,
    name: "Rotor Pro-Series 5000 Industrial",
    category: "Rotores",
    price: 24.99,
    sku: "RT-5000-IND",
    image: "https://images.unsplash.com/photo-1524249936086-538743ae78cb?q=80&w=800&auto=format&fit=crop",
    specs: { range: "7.5 - 15m", pressure: "2.5 bar", flow: "0.8 - 2.2 m³/h", conn: '3/4" NPT' },
    tag: "High Performance"
  },
  {
    id: 2,
    name: "Difusor Estático Precision Series",
    category: "Difusores",
    price: 12.50,
    sku: "DF-PREC-04",
    image: "https://images.unsplash.com/photo-1615811361269-66924653e145?q=80&w=800&auto=format&fit=crop",
    specs: { range: "3 - 5m", pressure: "1.8 bar", flow: "0.2 - 0.5 m³/h", conn: '1/2" NPT' },
    tag: null
  },
  {
    id: 3,
    name: "Controlador Smart WiFi Commander",
    category: "Control",
    price: 189.00,
    sku: "CTRL-WF-16",
    image: "https://images.unsplash.com/photo-1558403194-611308249627?q=80&w=800&auto=format&fit=crop",
    specs: { zones: "16 Zonas", conn: "WiFi/LAN", input: "24VAC", protect: "IP65" },
    tag: "IoT Ready"
  },
  {
    id: 4,
    name: "Boquilla Rotativa R-Van Ajustable",
    category: "Difusores",
    price: 8.75,
    sku: "NZ-RVAN-ADJ",
    image: "https://images.unsplash.com/photo-1563412702737-14282333ab13?q=80&w=800&auto=format&fit=crop",
    specs: { range: "Variable", pressure: "2.0 bar", flow: "Bajo Caudal", eff: "92%" },
    tag: "Water Sense"
  },
  {
    id: 5,
    name: "Cañón de Impacto Agrícola Heavy-Duty",
    category: "Rotores",
    price: 145.00,
    sku: "CN-AGRO-HD",
    image: "https://images.unsplash.com/photo-1577223625816-7546f13df25d?q=80&w=800&auto=format&fit=crop",
    specs: { range: "25 - 50m", pressure: "4.5 bar", flow: "15 - 30 m³/h", conn: '2" Flange' },
    tag: "Agro Grade"
  },
  {
    id: 6,
    name: "Kit Goteo Paisajismo Integrado",
    category: "Goteo",
    price: 55.00,
    sku: "DRIP-KIT-50",
    image: "https://images.unsplash.com/photo-1558904541-efa843a96f01?q=80&w=800&auto=format&fit=crop",
    specs: { length: "50m", flow: "2.2 L/h", spacing: "30cm", wall: "1.2mm" },
    tag: null
  }
];

// --- COMPONENTS ---

const StoreHero = () => (
  <section className="relative pt-32 pb-24 bg-slate-900 overflow-hidden min-h-[500px] flex items-center border-b border-slate-800">
    {/* Fondo Técnico: Grid Blueprint */}
    <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" 
         style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
    </div>
    
    {/* Gradiente Industrial */}
    <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-800/80 z-0"></div>

    <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 w-full">
      <div className="flex flex-col lg:flex-row justify-between items-end gap-12">
        <div className="max-w-3xl">
          <Reveal>
            <h1 className="text-4xl lg:text-6xl font-bold text-white tracking-tight leading-tight mb-6">
              Sistemas de Riego <br/>
              <span className="text-slate-400 font-light">de Grado Ingeniería.</span>
            </h1>
            <p className="text-lg text-slate-400 font-light max-w-xl leading-relaxed border-l-2 border-slate-700 pl-6">
              Equipamiento hidráulico certificado para agricultura intensiva, campos deportivos y proyectos residenciales de alta especificación.
            </p>
          </Reveal>
        </div>
        
        {/* Estadísticas Hero Estilo Dashboard */}
        <Reveal delay={200} className="hidden lg:block">
          <div className="flex gap-8">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-6 rounded-lg min-w-[160px]">
              <Activity className="w-5 h-5 text-sky-500 mb-3" />
              <p className="text-3xl font-mono font-bold text-white">98.5%</p>
              <p className="text-xs text-slate-400 uppercase tracking-wider mt-1">Eficiencia Hídrica</p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-6 rounded-lg min-w-[160px]">
              <Settings className="w-5 h-5 text-sky-500 mb-3" />
              <p className="text-3xl font-mono font-bold text-white">ISO</p>
              <p className="text-xs text-slate-400 uppercase tracking-wider mt-1">Certificación 9001</p>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

const FilterBar = ({ activeCategory, setActiveCategory }: { activeCategory: string, setActiveCategory: (c: string) => void }) => (
  // CAMBIO 1: Agregué 'mt-8 md:mt-0'. Esto da 2rem (32px) de espacio arriba solo en celular.
  <div className="sticky top-[72px] z-40 bg-white border-b border-slate-200 shadow-sm transition-all duration-300 mt-8 md:mt-0">
    
    {/* CAMBIO 2: Cambié 'h-20' por 'h-auto md:h-20' y agregué 'py-4 md:py-0'.
        Esto permite que la barra crezca verticalmente en celular para que los elementos no se vean apretados. */}
    <div className="max-w-7xl mx-auto px-6 lg:px-12 h-auto md:h-20 py-4 md:py-0 flex flex-col md:flex-row justify-between items-center gap-4">
      
      {/* Chips de Categoría Corporativos */}
      <div className="flex items-center gap-3 sm:gap-4 overflow-x-auto scrollbar-hide w-full md:w-auto py-2 pl-2 pr-2">

        {categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => setActiveCategory(cat.name)}
            className={`
              group relative flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 border whitespace-nowrap
              ${activeCategory === cat.name 
                 ? 'bg-slate-800 border-slate-800 text-white shadow-md' 
                 : 'bg-white border-slate-200 text-slate-600 hover:border-slate-400 hover:bg-slate-50'}
            `}
          >
            {cat.name}
            <span className={`
              text-[10px] px-1.5 py-0.5 rounded-full font-mono transition-colors
              ${activeCategory === cat.name ? 'bg-slate-600 text-slate-200' : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'}
            `}>
              {cat.count}
            </span>
          </button>
        ))}
      </div>

      {/* Barra de Búsqueda Técnica */}
      <div className="flex items-center gap-3 w-full md:w-auto">
        <div className="relative group w-full md:w-80">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400 group-focus-within:text-sky-600 transition-colors" />
          </div>
          <input 
            type="text"
            placeholder="Buscar por SKU, modelo o serie..."
            className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-sky-500 focus:border-sky-500 sm:text-sm transition-all shadow-sm font-mono"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-xs text-slate-400 border border-slate-200 rounded px-1.5 py-0.5">/</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ProductCard = ({ product }: { product: typeof products[0] }) => (
  <div className="group relative bg-white border border-slate-200 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-500 hover:border-slate-300 flex flex-col h-full">
    
    {/* Badge Técnico */}
    {product.tag && (
      <div className="absolute top-0 right-0 z-20">
        <div className="bg-slate-900 text-white text-[10px] font-bold uppercase tracking-wider py-1.5 px-3 rounded-bl-lg">
          {product.tag}
        </div>
      </div>
    )}

    {/* Imagen con fondo neutro */}
    <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden border-b border-slate-100 group">
      <img 
        src={product.image} 
        alt={product.name} 
        className="w-full h-full object-cover mix-blend-multiply opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-transform duration-700 ease-out"
      />
      
      {/* Overlay al Hover */}
      <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/5 transition-colors duration-300"></div>
    </div>

    {/* Contenido de la Tarjeta */}
    <div className="p-6 flex-1 flex flex-col">
      <div className="mb-4">
        <div className="flex justify-between items-start mb-2">
          <p className="text-xs font-bold text-sky-600 uppercase tracking-wider">{product.category}</p>
          <p className="text-[10px] text-slate-400 font-mono">SKU: {product.sku}</p>
        </div>
        <h3 className="text-lg font-bold text-slate-800 leading-snug group-hover:text-sky-700 transition-colors">
          {product.name}
        </h3>
      </div>
      
      {/* Specs Grid */}
      <div className="grid grid-cols-2 gap-y-3 gap-x-4 mb-6 py-4 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <Maximize className="w-3.5 h-3.5 text-slate-400" />
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 uppercase">Alcance</span>
            <span className="text-xs font-semibold text-slate-700">{product.specs.range}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Wind className="w-3.5 h-3.5 text-slate-400" />
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 uppercase">Presión</span>
            <span className="text-xs font-semibold text-slate-700">{product.specs.pressure}</span>
          </div>
        </div>
        
        {/* Specs adicionales que aparecen/deslizan en hover (microinteracción) */}
        <div className="col-span-2 grid grid-cols-2 gap-x-4 overflow-hidden max-h-0 opacity-0 group-hover:max-h-20 group-hover:opacity-100 transition-all duration-500 ease-in-out border-t border-dashed border-slate-200 mt-2 pt-2 group-hover:mt-2">
           <div className="flex items-center gap-2 mt-2">
            <Droplets className="w-3.5 h-3.5 text-slate-400" />
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-400 uppercase">Caudal</span>
              <span className="text-xs font-semibold text-slate-700">{product.specs.flow || "N/A"}</span>
            </div>
          </div>
           <div className="flex items-center gap-2 mt-2">
            <Settings className="w-3.5 h-3.5 text-slate-400" />
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-400 uppercase">Conexión</span>
              <span className="text-xs font-semibold text-slate-700">{product.specs.conn || product.specs.spacing || "Estándar"}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100">
        <div className="flex flex-col">
          <span className="text-[10px] text-slate-400 uppercase">Precio Lista</span>
          <span className="text-xl font-bold text-slate-900">${product.price}</span>
        </div>
        <button className="group/btn relative overflow-hidden rounded-md bg-slate-900 px-5 py-2.5 text-white transition-all hover:bg-sky-600 hover:shadow-lg hover:shadow-sky-500/20 active:scale-95">
          <div className="relative z-10 flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wide">Ficha Técnica</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </div>
        </button>
      </div>
    </div>
  </div>
);

const Features = () => (
  <section className="py-20 bg-slate-50 border-t border-slate-200 relative">
    <div className="max-w-7xl mx-auto px-6 lg:px-12 grid md:grid-cols-3 gap-8 relative z-10">
      {[
        { title: "Garantía Industrial", desc: "Cobertura extendida de 5 años en componentes estructurales.", icon: <CheckCircle2 className="w-6 h-6 text-slate-700" /> },
        { title: "Soporte de Ingeniería", desc: "Acceso directo a planos CAD y asesoría hidráulica.", icon: <Cpu className="w-6 h-6 text-slate-700" /> },
        { title: "Logística B2B", desc: "Envíos paletizados y seguimiento en tiempo real.", icon: <Activity className="w-6 h-6 text-slate-700" /> },
      ].map((feat, idx) => (
        <div key={idx} className="flex gap-5 items-start p-6 bg-white border border-slate-200 rounded-lg shadow-sm hover:border-sky-500/30 hover:shadow-md transition-all duration-300 group">
          <div className="p-3 bg-slate-100 rounded-md group-hover:bg-sky-50 transition-colors">
            {React.cloneElement(feat.icon as React.ReactElement, { className: "w-6 h-6 text-slate-600 group-hover:text-sky-600 transition-colors" })}
          </div>
          <div>
            <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wide mb-2 group-hover:text-sky-700 transition-colors">{feat.title}</h4>
            <p className="text-slate-500 text-sm leading-relaxed">{feat.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

const PremiumStorePage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("Todos");
  
  // Lógica de filtrado simple manteniendo la funcionalidad original
  const filteredProducts = activeCategory === "Todos" 
    ? products 
    : products.filter(p => p.category === activeCategory || (activeCategory === "Control" && p.category === "Control"));

  return (
    <div className="bg-white min-h-screen selection:bg-sky-100 selection:text-sky-900 font-sans">
      
      <main>
        <StoreHero />
        
        <FilterBar activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
        
        <section className="bg-white max-w-7xl mx-auto px-6 lg:px-12 py-12">
          {/* Header de la Sección Grid */}
          <div className="flex justify-between items-end mb-8 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Resultados</h2>
              <p className="text-sm text-slate-500 mt-1">Mostrando {filteredProducts.length} productos de ingeniería</p>
            </div>
            <div className="hidden md:flex items-center gap-2">
               <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Ordenar por:</span>
               <select className="text-sm border-none bg-transparent font-medium text-slate-700 focus:ring-0 cursor-pointer hover:text-sky-600 transition-colors">
                 <option>Relevancia</option>
                 <option>Precio: Menor a Mayor</option>
                 <option>Precio: Mayor a Menor</option>
                 <option>Nuevos Lanzamientos</option>
               </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, idx) => (
              <Reveal key={product.id} delay={idx * 50}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-24 bg-slate-50 rounded-lg border border-dashed border-slate-300">
              <div className="inline-flex p-4 bg-white rounded-full shadow-sm mb-4">
                <Search className="w-6 h-6 text-slate-400" />
              </div>
              <h3 className="text-lg font-medium text-slate-900">Sin resultados técnicos</h3>
              <p className="text-slate-500 text-sm mt-2 max-w-xs mx-auto">No se encontraron componentes para los filtros seleccionados.</p>
              <button 
                onClick={() => setActiveCategory("Todos")}
                className="mt-6 text-sky-600 font-bold text-sm hover:underline hover:text-sky-700"
              >
                Restablecer filtros
              </button>
            </div>
          )}

          <div className="mt-16 flex justify-center">
            <button className="group flex items-center gap-2 px-8 py-3 bg-white border border-slate-300 text-slate-700 font-semibold text-sm rounded-md hover:border-slate-800 hover:text-slate-900 transition-all hover:shadow-lg active:scale-95">
              Cargar Más Referencias
              <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-slate-900 transition-colors" />
            </button>
          </div>
        </section>

        <Features />
        
        {/* CTA B2B */}
        <section className="py-24 bg-slate-900 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 pointer-events-none" 
               style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '32px 32px' }}>
          </div>
          
          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">¿Requiere una cotización para licitación?</h2>
              <p className="text-lg text-slate-400 mb-10 font-light max-w-2xl mx-auto">
                Nuestro departamento de ingeniería ofrece precios preferenciales y documentación técnica completa para contratistas y desarrolladores agrícolas.
              </p>
              <Link to="/contacto" className="inline-flex items-center px-8 py-4 bg-sky-600 text-white font-bold rounded-md shadow-lg shadow-sky-900/50 hover:bg-sky-500 hover:-translate-y-0.5 transition-all">
                Contactar Ventas Corporativas
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Reveal>
          </div>
        </section>
      </main>
    </div>
  );
};

export default PremiumStorePage;