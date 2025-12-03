import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, 
  Droplets, 
  Globe, 
  ChevronRight, 
  Award, 
  Users, 
  Briefcase, 
  Play, 
  ArrowUpRight, 
  Target, 
  Zap,
  ChevronDown // <--- Importamos la flecha aquí
} from 'lucide-react';
import { Link } from 'react-router-dom';

// --- UTILS & HOOKS ---

const Reveal = ({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });
    
    if (ref.current) observer.observe(ref.current);
    
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div 
      ref={ref} 
      className={`${className} transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1) ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`} 
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// Componente Parallax
const Parallax = ({ children, speed = 0.1, className = "" }: { children: React.ReactNode, speed?: number, className?: string }) => {
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

// Componente CountUp
const CountUp = ({ end, duration = 2000, suffix = "" }: { end: string, duration?: number, suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const endVal = parseInt(end.replace(/\D/g, ''));

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let startTimestamp: number | null = null;
        const step = (timestamp: number) => {
          if (!startTimestamp) startTimestamp = timestamp;
          const progress = Math.min((timestamp - startTimestamp) / duration, 1);
          setCount(Math.floor(progress * endVal));
          if (progress < 1) {
            window.requestAnimationFrame(step);
          }
        };
        window.requestAnimationFrame(step);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.5 });

    if (ref.current) observer.observe(ref.current);
  }, [endVal, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

// --- DATA ---

const services = [
  {
    id: 1,
    title: "Sistemas de Largo Alcance",
    description: "Aspersores de impacto y turbina diseñados para cubrir grandes hectáreas con una uniformidad de distribución superior al 95%.",
    icon: <Target className="w-6 h-6" />
  },
  {
    id: 2,
    title: "Micro-Aspersión de Precisión",
    description: "Tecnología de nebulización fina para cultivos delicados y paisajismo ornamental, minimizando el estrés hídrico de la planta.",
    icon: <Droplets className="w-6 h-6" />
  },
  {
    id: 3,
    title: "Automatización de Riego",
    description: "Controladores inteligentes que ajustan el arco y flujo de cada aspersor basándose en datos climáticos en tiempo real.",
    icon: <Zap className="w-6 h-6" />
  }
];

const projects = [
  {
    category: "Campos Deportivos",
    title: "Estadio Nacional Arena",
    location: "Argentina",
    image: "https://images.unsplash.com/photo-1577223625816-7546f13df25d?q=80&w=2000&auto=format&fit=crop"
  },
  {
    category: "Agricultura",
    title: "Viñedos Altos del Sur",
    location: "Chile",
    image: "/aspersor4.jpg"
  },
  {
    category: "Residencial",
    title: "Reserva Ecológica Privada",
    location: "España",
    image: "https://images.unsplash.com/photo-1558904541-efa843a96f01?q=80&w=2000&auto=format&fit=crop"
  }
];

const testimonials = [
  {
    quote: "La uniformidad de riego que lograron sus aspersores rotativos cambió radicalmente la calidad de nuestro césped de competición.",
    author: "Ing. Roberto Canessa",
    role: "Head Groundskeeper, Club Real"
  },
  {
    quote: "Buscábamos eficiencia. Su sistema de aspersión inteligente redujo nuestro consumo de agua un 30% en la primera temporada.",
    author: "Elena Fisher",
    role: "Directora Agrícola, GreenValley Corp"
  }
];

// --- SECTIONS ---

const Hero = () => {
  // Estado para el rotador de imágenes
  const [currentImage, setCurrentImage] = useState(0);
  
  // Lista de imágenes para escritorio
  const desktopImages = [
    "/aspersor.jpg",
    "/aspersor2.jpg",
    "/aspersor3.jpg",
    "/aspersor4.jpg"
  ];

  // Efecto para rotar las imágenes cada 5 segundos
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % desktopImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-white">
      {/* Fondo Parallax: Speed 0.7 */}
      <Parallax speed={0.7} className="absolute inset-0 z-0 pointer-events-none">
        <div className="relative w-full h-[140%] -top-[20%]"> 
          {/* IMAGEN PARA CELULAR - Opacidad 50% */}
          <img
            src="/aspersor2.jpg"
            alt="Water Sprinkler Texture Mobile"
            className="block md:hidden w-full h-full object-cover opacity-50"
          />
          
          {/* IMAGEN PARA ESCRITORIO - ROTADOR CON FILTRO NEGRO */}
          <div className="hidden md:block absolute inset-0 w-full h-full">
            {desktopImages.map((src, index) => (
              <img
                key={src}
                src={src}
                alt={`Fondo escritorio ${index + 1}`}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                  index === currentImage ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ))}
          </div>
          
          {/* Overlay NEGRO (Filtro oscuro en lugar de azulado) */}
          <div className="absolute inset-0 bg-black/60"></div>
          
          {/* EFECTO DE FUSIÓN (Abajo hacia Arriba) */}
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/30 to-transparent"></div>
          
          {/* Overlay adicional muy suave en la parte superior */}
          <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-white/60 to-transparent"></div>
        </div>
      </Parallax>

      {/* Contenedor principal */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 flex items-center h-full pb-20">
        <div className="max-w-4xl space-y-8">
          
          <Reveal delay={200}>
            {/* Título más grande y grueso */}
            <h1 className="text-6xl lg:text-8xl font-extrabold text-black leading-none tracking-tight drop-shadow-xl">
              Maestría en la <br />
              <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-400 to-sky-500">
                Tecnología de Aspersión.
              </span>
            </h1>
          </Reveal>
          
          <Reveal delay={300}>
            {/* Descripción más grande y gruesa */}
            <p className="text-2xl md:text-3xl max-w-3xl leading-snug font-bold text-blue drop-shadow-md">
              Garantizamos cobertura perfecta y uniformidad milimétrica para proyectos que exigen excelencia.
            </p>
          </Reveal>
          
          <Reveal delay={400}>
            <div className="flex flex-col sm:flex-row gap-5 pt-6">
              <Link to="/contacto" className="group inline-flex items-center justify-center px-8 py-4 bg-slate-900 text-white font-bold rounded-full hover:bg-slate-800 transition-all duration-300 shadow-xl shadow-slate-200 hover:shadow-2xl hover:-translate-y-1">
                Cotizar Sistema
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/tienda" className="group inline-flex items-center justify-center px-8 py-4 bg-white/60 backdrop-blur-md border border-slate-200 text-slate-800 font-medium rounded-full hover:bg-white hover:border-sky-300 transition-all duration-300 shadow-sm">
                <Play className="mr-2 w-4 h-4 fill-slate-800 group-hover:scale-110 transition-transform group-hover:fill-sky-600" />
                Ver Catálogo
              </Link>
            </div>
          </Reveal>

        </div>
      </div>

      {/* Indicador de Scroll - Flecha Gruesa */}
      <button 
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-white opacity-80 hover:opacity-100 transition-opacity animate-bounce p-2"
        aria-label="Bajar a contenido"
      >
        {/* stroke-[4] hace la flecha mucho más gruesa. w-10 h-10 es un tamaño mediano. */}
        <ChevronDown className="w-10 h-10 stroke-[4] drop-shadow-md" />
      </button>

    </section>
  );
};

const Services = () => (
  <section className="py-28 bg-white relative z-10">
    <div className="max-w-7xl mx-auto px-6 lg:px-12">
      <Reveal>
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-light text-slate-900 mb-6">Ingeniería de<br/><span className="font-semibold">Flujo Controlado.</span></h2>
            <p className="text-slate-500 text-lg font-light">Desde rotores de largo alcance hasta nebulizadores estáticos. Diseñamos la trayectoria perfecta para cada gota de agua.</p>
          </div>
          <Link to="/servicios" className="group flex items-center text-sky-600 font-medium border-b border-sky-600 pb-1 hover:text-sky-700 transition-colors">
            Soluciones de Riego
            <ArrowUpRight className="ml-2 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>
      </Reveal>

      <div className="grid md:grid-cols-3 gap-8">
        {services.map((s, index) => (
          <Reveal key={s.id} delay={index * 150} className="h-full">
            <div className="group h-full p-8 border border-gray-100 rounded-2xl hover:border-sky-100 hover:shadow-xl hover:shadow-sky-500/5 transition-all duration-500 bg-white flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-slate-700 mb-8 group-hover:bg-sky-500 group-hover:text-white transition-colors duration-500 shadow-sm group-hover:shadow-sky-200">
                  {React.cloneElement(s.icon as React.ReactElement, { className: "w-6 h-6 group-hover:scale-110 transition-transform duration-500" })}
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4 group-hover:text-sky-600 transition-colors">{s.title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm">{s.description}</p>
              </div>
              <div className="mt-8 pt-8 border-t border-gray-50 flex items-center justify-between opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                <span className="text-xs font-bold tracking-widest text-slate-400 uppercase">Ver especificaciones</span>
                <div className="w-8 h-8 rounded-full bg-sky-50 flex items-center justify-center text-sky-600 group-hover:bg-sky-600 group-hover:text-white transition-colors">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

const About = () => (
  <section className="py-7 bg-slate-50 relative overflow-hidden">
    {/* Decorativo Parallax: Speed -0.5 */}
    <Parallax speed={-0.5} className="absolute top-1/4 left-0 pointer-events-none">
        <div className="w-64 h-64 bg-slate-200 rounded-full blur-[100px] opacity-30 -translate-x-1/2"></div>
    </Parallax>

    <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-20 items-center relative z-10">
      <Reveal className="relative group">
        <div className="aspect-[4/5] bg-gray-200 rounded-sm overflow-hidden shadow-2xl relative">
          <img 
            src="/aspersor3.jpg"
            alt="Instalación de aspersores"
            className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out"
          />
        </div>
        <div className="absolute -bottom-10 -right-10 w-64 p-8 bg-white shadow-2xl hidden md:block border-l-4 border-sky-500 z-20">
          <p className="text-4xl font-bold text-slate-900 mb-2 flex">
            <CountUp end="15" suffix="+" />
          </p>
          <p className="text-sm text-slate-500 uppercase tracking-wider">Años Instalando</p>
        </div>
      </Reveal>
      
      <div className="space-y-10">
        <Reveal delay={200}>
          <div>
            <h4 className="text-xs font-bold tracking-[0.2em] text-slate-400 mb-4 uppercase flex items-center gap-2">
              <span className="w-8 h-[1px] bg-slate-400 inline-block"></span>
              Nuestra Filosofía
            </h4>
            <h2 className="text-4xl font-light text-slate-900 mb-6">Más que aspersores, <span className="font-semibold">Ecosistemas Vivos.</span></h2>
            <p className="text-slate-500 text-lg leading-relaxed font-light">
              En Ecosistema, entendemos que un aspersor no es solo una pieza de plástico y metal. Es el corazón latente de un jardín, un campo o un estadio. Nuestra obsesión es la calibración perfecta.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 gap-8">
          {[
            { label: "Sistemas Instalados", value: "1200", icon: <Briefcase className="w-5 h-5" /> },
            { label: "Marcas Partner", value: "8", icon: <Users className="w-5 h-5" /> },
            { label: "Hectáreas Regadas", value: "50000", suffix: "+", icon: <Globe className="w-5 h-5" /> },
            { label: "Certificaciones ISO", value: "3", icon: <Award className="w-5 h-5" /> },
          ].map((stat, idx) => (
            <Reveal key={idx} delay={300 + (idx * 100)}>
              <div className="flex flex-col gap-2 p-4 rounded-xl hover:bg-white hover:shadow-sm transition-all duration-300">
                <div className="text-sky-500 mb-1">{stat.icon}</div>
                <span className="text-3xl font-bold text-slate-900">
                  <CountUp end={stat.value} suffix={stat.suffix} />
                </span>
                <span className="text-sm text-slate-400">{stat.label}</span>
              </div>
            </Reveal>
          ))}
        </div>
        
        <Reveal delay={600}>
          <Link to="/acerca-de" className="inline-block text-slate-900 font-medium border-b-2 border-slate-900 pb-1 hover:text-sky-600 hover:border-sky-600 transition-colors">
            Conozca a nuestros ingenieros
          </Link>
        </Reveal>
      </div>
    </div>
  </section>
);

const Portfolio = () => (
  <section className="py-32 bg-white">
    <div className="max-w-7xl mx-auto px-6 lg:px-12">
      <Reveal>
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-light text-slate-900 mb-4">Proyectos de <span className="font-semibold">Irrigación</span></h2>
          <p className="text-slate-500">Instalaciones de alto calibre en terrenos desafiantes.</p>
        </div>
      </Reveal>

      <div className="grid md:grid-cols-3 gap-1">
        {projects.map((proj, idx) => (
          <Reveal key={idx} delay={idx * 150} className="w-full h-full">
            <div className="group relative aspect-[3/4] overflow-hidden bg-gray-100 cursor-pointer w-full">
              <img 
                src={proj.image} 
                alt={proj.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:grayscale-0" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="text-sky-400 text-xs font-bold tracking-widest uppercase mb-2 block">{proj.category}</span>
                  <h3 className="text-white text-2xl font-medium mb-1">{proj.title}</h3>
                  <p className="text-gray-300 text-sm flex items-center gap-1">
                    <Globe className="w-3 h-3" />
                    {proj.location}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

const Testimonials = () => (
  <section className="py-32 bg-slate-900 text-white relative overflow-hidden">
    {/* Background accent Parallax: Speed 0.3 */}
    <Parallax speed={0.3} className="absolute top-0 right-0 w-1/2 h-full pointer-events-none">
       <div className="w-full h-full bg-slate-800/30 -skew-x-12 transform translate-x-1/4"></div>
    </Parallax>

    <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
      <div className="grid lg:grid-cols-2 gap-16">
        <Reveal>
          <div>
            <h2 className="text-4xl font-light mb-8">Opiniones del <span className="font-semibold text-sky-400">Sector.</span></h2>
            <div className="flex gap-4">
              <button className="p-4 rounded-full border border-slate-700 hover:bg-slate-800 hover:border-slate-600 transition-all active:scale-95">
                <ArrowRight className="w-5 h-5 rotate-180" />
              </button>
              <button className="p-4 rounded-full bg-sky-500 hover:bg-sky-600 transition-all shadow-lg shadow-sky-900/20 active:scale-95">
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </Reveal>
        
        <div className="space-y-12">
          {testimonials.map((test, idx) => (
            <Reveal key={idx} delay={idx * 200}>
              <div className="border-l-2 border-slate-700 pl-8 hover:border-sky-500 transition-colors duration-500 group">
                <div className="flex gap-1 mb-4 opacity-50 group-hover:opacity-100 transition-opacity">
                  {[1,2,3,4,5].map(star => <div key={star} className="w-2 h-2 rounded-full bg-sky-500"></div>)}
                </div>
                <p className="text-xl md:text-2xl font-light leading-relaxed text-gray-200 mb-6 italic">"{test.quote}"</p>
                <div>
                  <p className="font-semibold text-white group-hover:text-sky-400 transition-colors">{test.author}</p>
                  <p className="text-sm text-slate-400">{test.role}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const CTA = () => (
  <section className="py-32 bg-sky-50 overflow-hidden relative">
    {/* Decorativo Parallax: Speed -0.6 */}
    <Parallax speed={-0.6} className="absolute top-0 right-0 pointer-events-none">
        <div className="w-96 h-96 bg-sky-100 rounded-full blur-3xl opacity-50 -mr-20 -mt-20"></div>
    </Parallax>
    
    <div className="max-w-5xl mx-auto px-6 lg:px-12 text-center relative z-10">
      <Reveal>
        <h2 className="text-5xl md:text-6xl font-semibold text-slate-900 mb-8 tracking-tight">
          ¿Su sistema actual pierde presión?
        </h2>
      </Reveal>
      <Reveal delay={200}>
        <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto font-light">
          Actualice su infraestructura con aspersores de última generación. Maximice la cobertura y minimice el desperdicio hoy mismo.
        </p>
      </Reveal>
      <Reveal delay={400}>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
          <Link to="/contacto" className="px-10 py-5 bg-slate-900 text-white text-lg font-medium rounded-full shadow-2xl hover:bg-slate-800 hover:scale-105 transition-all duration-300 hover:shadow-sky-200/50">
            Agendar Auditoría
          </Link>
          <Link to="/tienda" className="text-slate-600 hover:text-sky-600 font-medium transition-colors border-b border-transparent hover:border-sky-600 pb-1">
            Ver Aspersores
          </Link>
        </div>
      </Reveal>
    </div>
  </section>
);

const PremiumHomePage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen selection:bg-sky-100 selection:text-sky-900">
      <main>
        <Hero />
        <Services />
        <About />
        <Portfolio />
        <Testimonials />
        <CTA />
      </main>
    </div>
  );
};

export default PremiumHomePage;