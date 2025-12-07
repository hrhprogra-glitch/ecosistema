import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom'; // <--- AGREGA ESTA LÍNEA AQUÍ
import { 
  ArrowRight, 
  Droplets, 
  Globe, 
  TrendingDown, // <--- AGREGA ESTE NUEVO ICONO
  ChevronRight, 
  ChevronLeft,
  Award, 
  Users, 
  Briefcase, 
  Play, 
  ArrowUpRight, 
  Target, 
  Zap,
  ChevronDown,
  Leaf,          
  CloudRain,     
  Cpu,
  X 
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

const irrigationSystems = [
  {
    id: 1,
    title: "Riego por Aspersión",
    description: "Cobertura uniforme para grandes áreas.",
    fullDescription: "Nuestro sistema de aspersión utiliza rotores de largo alcance y boquillas de precisión para garantizar una lluvia uniforme en parques, canchas deportivas y grandes jardines. Diseñado para resistir condiciones climáticas adversas y minimizar la deriva por viento.",
    icon: <Target className="w-8 h-8 text-sky-400" />,
    image: "/aspersor.jpg"
  },
  {
    id: 2,
    title: "Microaspersión",
    description: "Riego localizado de bajo volumen.",
    fullDescription: "Ideal para invernaderos, viveros y zonas de cultivo densas. La microaspersión entrega agua en forma de lluvia fina directamente sobre la zona radicular, manteniendo la humedad ambiental ideal sin compactar el suelo.",
    icon: <Cpu className="w-8 h-8 text-sky-400" />,
    image: "/aspersor2.jpg"
  },
  {
    id: 3,
    title: "Riego por Goteo",
    description: "Eficiencia máxima gota a gota.",
    fullDescription: "La solución más ecológica del mercado. Mediante una red de tuberías con emisores integrados, entregamos el agua exacta que cada planta necesita. Ahorra hasta un 60% de agua comparado con métodos tradicionales.",
    icon: <Leaf className="w-8 h-8 text-sky-400" />,
    image: "/aspersor3.jpg"
  },
  {
    id: 4,
    title: "Nebulización",
    description: "Control de clima y humedad.",
    fullDescription: "Sistemas de alta presión que generan una niebla ultrafina (menos de 10 micras). Perfectos para reducir la temperatura en terrazas, controlar la humedad en orquídeas o crear efectos escénicos en paisajismo.",
    icon: <CloudRain className="w-8 h-8 text-sky-400" />,
    image: "/aspersor4.jpg"
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
  },
  { 
    category: "Corporativo", 
    title: "Parque Tecnológico Central", 
    location: "México", 
    image: "https://images.unsplash.com/photo-1496417263034-38ec4f0d665a?q=80&w=2000&auto=format&fit=crop" 
  },
  { 
    category: "Hotelería", 
    title: "Resort & Spa Oasis", 
    location: "Caribe", 
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2000&auto=format&fit=crop" 
  }
];

const testimonials = [
  { quote: "La uniformidad de riego que lograron sus aspersores rotativos cambió radicalmente la calidad de nuestro césped de competición.", author: "Ing. Roberto Canessa", role: "Head Groundskeeper, Club Real" },
  { quote: "Buscábamos eficiencia. Su sistema de aspersión inteligente redujo nuestro consumo de agua un 30% en la primera temporada.", author: "Elena Fisher", role: "Directora Agrícola, GreenValley Corp" }
];

// Componente Tarjeta 3D Reutilizable (Versión Clara)
const Card3D = ({ item, onClick }: { item: typeof irrigationSystems[0], onClick: () => void }) => {
  return (
    <div className="card-container noselect cursor-pointer" onClick={onClick}>
      <div className="canvas">
        {[...Array(25)].map((_, i) => (
          <div key={i} className={`tracker tr-${i + 1}`}></div>
        ))}
        
        <div className="card-3d">
          {/* Contenido Normal */}
          <div className="card-content-default">
            {/* Círculo del icono: Fondo Cyan muy claro, icono Azul Oscuro */}
            <div className="p-4 bg-sky-50 rounded-full mb-2 border border-sky-100 shadow-sm group-hover:scale-110 transition-transform">
              {/* Forzamos el color del icono a Azul Oscuro o Teal */}
              <div className="text-ecosistema-secondary">
                {item.icon}
              </div>
            </div>
            
            {/* Título: Azul Oscuro (ecosistema-dark) */}
            <h3 className="text-xl font-bold text-ecosistema-dark uppercase tracking-wider">
              {item.title}
            </h3>
            
            {/* Texto pequeño: Gris suave */}
            <p className="text-xs text-slate-400 mt-2 font-mono font-medium opacity-80 animate-pulse">
              Pasa el cursor
            </p>
          </div>

          {/* Contenido Hover */}
          <div className="card-content-hover">
            {/* Título en hover: Cyan para resaltar */}
            <div className="text-ecosistema-secondary font-bold text-lg mb-2">
              {item.title}
            </div>
            
            {/* Descripción: Gris oscuro */}
            <p className="text-slate-600 font-medium">
              {item.description}
            </p>
            
            {/* Botón: Fondo Oscuro, texto blanco */}
            <div className="mt-4 inline-flex items-center text-xs font-bold text-white bg-ecosistema-dark px-4 py-2 rounded-full shadow-lg">
              Ver detalle <ArrowRight className="w-3 h-3 ml-1" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// MODIFICADO: z-index aumentado a z-[1000] para evitar que se superponga el texto de fondo
// Componente Modal para el detalle (Versión Decorada Premium)
const DetailModal = ({ item, onClose }: { item: typeof irrigationSystems[0] | null, onClose: () => void }) => {
  if (!item) return null;

  return createPortal(
    // 1. Fondo del modal: Más oscuro y con más desenfoque para centrar la atención
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-lg transition-all" onClick={onClose}>
      
      <div 
        className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl overflow-hidden flex flex-col md:flex-row animate-in fade-in zoom-in duration-300 relative ring-1 ring-white/20"
        onClick={e => e.stopPropagation()} 
      >
        {/* Botón Cerrar: Flotante y estilizado */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-white/20 hover:bg-white/40 backdrop-blur-md border border-white/50 rounded-full transition-all text-slate-800 md:text-white hover:scale-110 active:scale-95 shadow-lg"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Columna Izquierda: Imagen con Efectos */}
        <div className="w-full md:w-1/2 h-64 md:h-auto relative overflow-hidden group">
          <img 
            src={item.image} 
            alt={item.title} 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          {/* Overlay gradiente para que el texto sea legible si lo hubiera y dar profundidad */}
          <div className="absolute inset-0 bg-gradient-to-t from-ecosistema-dark/80 via-transparent to-transparent opacity-90"></div>
          
          {/* Badge decorativo sobre la imagen */}
          <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md text-ecosistema-dark px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg border border-white/50">
            Sistema Profesional
          </div>

          {/* Título visible solo en móviles (sobre la imagen) */}
          <div className="absolute bottom-6 left-6 right-6 md:hidden text-white">
            <h3 className="text-3xl font-bold shadow-black drop-shadow-md">{item.title}</h3>
          </div>
        </div>

        {/* Columna Derecha: Contenido y Detalles */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white relative overflow-hidden">
          
          {/* Decoración de fondo (Manchas de color sutiles) */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-ecosistema-accent/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-ecosistema-secondary/5 rounded-full blur-3xl pointer-events-none"></div>

          {/* Encabezado con Icono */}
          <div className="hidden md:flex items-start gap-5 mb-8 relative z-10">
            <div className="p-3 bg-white border border-ecosistema-accent/20 rounded-2xl shadow-xl shadow-ecosistema-accent/10 text-ecosistema-accent">
              {React.cloneElement(item.icon as React.ReactElement, { className: "w-8 h-8" })}
            </div>
            <div>
              <span className="block text-xs font-bold text-ecosistema-secondary uppercase tracking-wider mb-1">Especificaciones Técnicas</span>
              <h3 className="text-3xl lg:text-4xl font-bold text-ecosistema-dark leading-tight">{item.title}</h3>
            </div>
          </div>
          
          {/* Línea separadora con gradiente */}
          <div className="w-20 h-1.5 bg-gradient-to-r from-ecosistema-accent to-ecosistema-secondary rounded-full mb-8 hidden md:block"></div>

          {/* Descripción del Producto */}
          <p className="text-lg text-slate-600 leading-relaxed mb-10 relative z-10 font-light">
            {item.fullDescription}
          </p>

          {/* Botón de Acción Principal */}
          <Link 
            to="/servicios" 
            className="group relative inline-flex items-center justify-center px-8 py-4 bg-ecosistema-dark text-white font-bold rounded-xl overflow-hidden shadow-xl shadow-ecosistema-dark/20 transition-all hover:scale-[1.02] hover:shadow-ecosistema-dark/30 self-start"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-ecosistema-secondary to-ecosistema-dark opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="relative flex items-center gap-3">
              Cotizar este sistema
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>

          {/* Pie de modal: Características extra de confianza */}
          <div className="mt-10 pt-6 border-t border-slate-100 grid grid-cols-2 gap-4 relative z-10">
             <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span> 
                Garantía Extendida
             </div>
             <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]"></span> 
                Soporte Técnico 
             </div>
          </div>

        </div>
      </div>
    </div>,
    document.body
  );
};

// --- SECCIONES PRINCIPALES ---

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const desktopImages = ["/aspersor.jpg", "/aspersor2.jpg", "/aspersor3.jpg", "/aspersor4.jpg"];

  useEffect(() => {
    const timer = setInterval(() => setCurrentImage((prev) => (prev + 1) % desktopImages.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-white">
      <Parallax speed={0.7} className="absolute inset-0 z-0 pointer-events-none">
        <div className="relative w-full h-[140%] -top-[20%]"> 
          <img src="/aspersor2.jpg" className="block md:hidden w-full h-full object-cover opacity-50" alt="Mobile BG" />
          <div className="hidden md:block absolute inset-0 w-full h-full">
            {desktopImages.map((src, index) => (
              <img key={src} src={src} alt="Desktop BG" className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${index === currentImage ? 'opacity-100' : 'opacity-0'}`} />
            ))}
          </div>
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/30 to-transparent"></div>
        </div>
      </Parallax>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 flex items-center h-full pb-20">
        <div className="max-w-4xl space-y-8">
          <Reveal delay={200}>
            <h1 className="text-6xl lg:text-8xl font-extrabold text-black leading-none tracking-tight drop-shadow-xl">
              Maestría en la <br />
              <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-400 to-sky-500">Tecnología de Aspersión.</span>
            </h1>
          </Reveal>
          <Reveal delay={300}>
            <p className="text-2xl md:text-3xl max-w-3xl leading-snug font-bold text-blue drop-shadow-md">
              Garantizamos cobertura perfecta y uniformidad milimétrica para proyectos que exigen excelencia.
            </p>
          </Reveal>
          <Reveal delay={400}>
            <div className="flex flex-col sm:flex-row gap-5 pt-6">
              <Link to="/contacto" className="group inline-flex items-center justify-center px-8 py-4 bg-slate-900 text-white font-bold rounded-full hover:bg-slate-800 transition-all shadow-xl hover:-translate-y-1">
                Cotizar Sistema <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/tienda" className="group inline-flex items-center justify-center px-8 py-4 bg-white/60 backdrop-blur-md border border-slate-200 text-slate-800 font-medium rounded-full hover:bg-white hover:border-sky-300 transition-all shadow-sm">
                <Play className="mr-2 w-4 h-4 fill-slate-800 group-hover:fill-sky-600" /> Ver Catálogo
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
      <button onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-white opacity-80 hover:opacity-100 transition-opacity animate-bounce p-2">
        <ChevronDown className="w-10 h-10 stroke-[4] drop-shadow-md" />
      </button>
    </section>
  );
};

const IdentitySection = () => {
  const [selectedSystem, setSelectedSystem] = useState<typeof irrigationSystems[0] | null>(null);

  return (
    <section className="py-28 bg-white relative z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <Reveal>
          <div className="flex flex-col md:flex-row justify-between items-start mb-20 gap-12">
            <div className="max-w-3xl">
              <h4 className="text-sky-500 font-bold tracking-widest text-sm uppercase mb-2">Sobre Nosotros</h4>
              <h2 className="text-4xl md:text-5xl font-light text-slate-900 mb-8">
                ¿Quiénes <span className="font-semibold text-slate-900">Somos?</span>
              </h2>
              <div className="space-y-6 text-lg text-slate-600 font-light leading-relaxed">
                <p>Con trayectoria desde el 2001, somos una <span className="font-medium text-slate-800">empresa peruana líder en ingeniería de riego</span>. Ejecutamos proyectos integrales para el sector agroindustrial, campos deportivos de alto rendimiento, complejos residenciales y grandes áreas verdes.
                </p>
                <p className="border-l-4 border-sky-500 pl-4 italic text-slate-500">
                Fusionamos tecnología de punta con responsabilidad ambiental, garantizando sistemas que maximizan la eficiencia hídrica y aseguran la sostenibilidad de su inversión.
                </p>
              </div>
            </div>
            <div className="md:self-end">
              <Link to="/servicios" className="group flex items-center px-6 py-3 bg-slate-50 text-slate-700 font-medium rounded-full hover:bg-sky-50 hover:text-sky-600 transition-all">
                Ver detalles de servicios <ArrowUpRight className="ml-2 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
            </div>
          </div>
        </Reveal>

        {/* Grid de Tarjetas 3D */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {irrigationSystems.map((s, index) => (
            <Reveal key={s.id} delay={index * 100} className="h-full">
              <Card3D item={s} onClick={() => setSelectedSystem(s)} />
            </Reveal>
          ))}
        </div>
      </div>

      {/* Modal de Detalle */}
      <DetailModal item={selectedSystem} onClose={() => setSelectedSystem(null)} />
    </section>
  );
};

// --- SECCIÓN FILOSOFÍA (Título y Descripción de Ahorro + Estadísticas Originales) ---
const About = () => (
  <section className="py-20 bg-slate-50 relative overflow-hidden">
    {/* Decorativo Parallax */}
    <Parallax speed={-0.5} className="absolute top-1/4 left-0 pointer-events-none">
        <div className="w-64 h-64 bg-slate-200 rounded-full blur-[100px] opacity-30 -translate-x-1/2"></div>
    </Parallax>

    <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-20 items-center relative z-10">
      
      {/* Columna Izquierda: IMAGEN Y EXPERIENCIA (INTACTOS) */}
      <Reveal className="relative group">
        <div className="aspect-[4/5] bg-gray-200 rounded-2xl overflow-hidden shadow-2xl relative">
          <img 
            src="/aspersor3.jpg"
            alt="Instalación de aspersores"
            className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out"
          />
        </div>
        {/* Badge de Experiencia Original */}
        <div className="absolute -bottom-10 -right-10 w-64 p-8 bg-white shadow-2xl hidden md:block border-l-4 border-sky-500 z-20">
          <p className="text-4xl font-bold text-slate-900 mb-2 flex">
            <CountUp end="23" suffix="+" />
          </p>
          <p className="text-sm text-slate-500 uppercase tracking-wider">Años de Experiencia</p>
        </div>
      </Reveal>
      
      {/* Columna Derecha: NUEVA FILOSOFÍA DE AHORRO + ESTADÍSTICAS ORIGINALES */}
      <div className="space-y-10">
        <Reveal delay={200}>
          <div>
            <h4 className="text-xs font-bold tracking-[0.2em] text-sky-600 mb-4 uppercase flex items-center gap-2">
              <span className="w-8 h-[2px] bg-sky-600 inline-block"></span>
              Nuestra Filosofía
            </h4>
            
            {/* Título y Descripción Enfocados en Ahorro y Rentabilidad */}
            <h2 className="text-4xl font-light text-slate-900 mb-6">
              Eficiencia Hídrica que Impulsa su <span className="font-semibold text-slate-900">Rentabilidad.</span>
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed font-light">
              Entendemos el valor de cada recurso en su operación. En Ecosistema, elevamos el estándar del riego integrando tecnologías que <span className="font-medium text-slate-800">minimizan los costos operativos, optimizan la mano de obra y garantizan el uso eficiente del agua</span>. Su inversión se rentabiliza rápidamente gracias al ahorro sostenido.
            </p>
          </div>
        </Reveal>

        {/* Grid Original de Estadísticas (Manteniendo lo que pediste) */}
        <div className="grid grid-cols-2 gap-8">
          {[ 
            { label: "Sistemas Instalados", value: "1200", icon: <Briefcase className="w-5 h-5" /> }, 
            { label: "Marcas Partner", value: "8", icon: <Users className="w-5 h-5" /> }, 
            { label: "Hectáreas Regadas", value: "50000", suffix: "+", icon: <Globe className="w-5 h-5" /> }, 
            { label: "Certificaciones ISO", value: "3", icon: <Award className="w-5 h-5" /> }, 
          ].map((stat, idx) => (
            <Reveal key={idx} delay={300 + (idx * 100)}>
              <div className="flex flex-col gap-2 p-4 rounded-xl hover:bg-white hover:shadow-sm transition-all duration-300 bg-white border border-transparent hover:border-sky-100">
                <div className="text-sky-500 mb-1">{stat.icon}</div>
                <span className="text-3xl font-bold text-slate-900">
                  <CountUp end={stat.value} suffix={stat.suffix} />
                </span>
                <span className="text-sm text-slate-500">{stat.label}</span>
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

const Portfolio = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // --- CONFIGURACIÓN DE ROTACIÓN AUTOMÁTICA ---
  useEffect(() => {
    if (isPaused) return;

    const rotationSpeed = 3000;

    const interval = setInterval(() => {
      setActiveIndex((current) => (current === projects.length - 1 ? 0 : current + 1));
    }, rotationSpeed);

    return () => clearInterval(interval);
  }, [isPaused]);

  // --- LÓGICA DE ESTILO 3D ---
  const getCardStyle = (index: number) => {
    const total = projects.length;
    let offset = index - activeIndex;

    if (offset < -Math.floor(total / 2)) offset += total;
    if (offset > Math.floor(total / 2)) offset -= total;

    const isActive = offset === 0;
    const absOffset = Math.abs(offset);
    
    if (absOffset > 2) return { opacity: 0, pointerEvents: 'none' as const, display: 'none' };

    const spacing = 40; 
    const translateX = offset * spacing; 
    const translateZ = isActive ? 100 : -150; 
    const rotateY = isActive ? 0 : -45 * Math.sign(offset); 
    const scale = isActive ? 1 : 0.8; 
    const opacity = isActive ? 1 : 0.5; 
    const zIndex = 100 - absOffset; 

    return {
      transform: `perspective(1000px) translateX(${translateX}%) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
      zIndex: zIndex,
      opacity: opacity,
      transition: 'all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)', 
    };
  };

  return (
    <section className="py-20 bg-slate-50 overflow-hidden relative border-t border-slate-200">
      
      {/* Fondo Decorativo */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-100 to-white pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto px-4 relative z-10">
        
        <Reveal>
          {/* CAMBIO: Reduje 'mb-16' a 'mb-6' para acercar el título a los proyectos */}
          <div className="mb-6 text-center">
            <h4 className="text-sky-600 font-bold tracking-[0.2em] text-sm uppercase mb-2">
              Portafolio Global
            </h4>
            <h2 className="text-4xl md:text-6xl font-light text-slate-900">
              Proyectos <span className="font-semibold text-sky-500">Destacados</span>
            </h2>
          </div>
        </Reveal>

        {/* --- ESCENARIO 3D --- */}
        <div 
          className="relative h-[500px] md:h-[600px] w-full flex items-center justify-center perspective-container"
          onMouseEnter={() => setIsPaused(true)} 
          onMouseLeave={() => setIsPaused(false)} 
        >
          {/* RENDERING DE TARJETAS */}
          {projects.map((proj, index) => {
            const style = getCardStyle(index);
            const isCenter = index === activeIndex;

            return (
              <div
                key={index}
                className="absolute w-[85%] md:w-[60%] lg:w-[50%] aspect-video cursor-pointer"
                style={style} 
                onClick={() => setActiveIndex(index)}
              >
                {/* CONTENEDOR VISUAL INTERNO (Efectos Hover: Zoom y Glow) */}
                <div className={`
                  relative h-full w-full rounded-2xl overflow-hidden bg-white 
                  border-[4px] border-white transition-all duration-300 ease-out
                  hover:scale-105 hover:z-50
                  hover:border-sky-400
                  hover:shadow-[0_0_35px_rgba(14,165,233,0.7)]
                  shadow-2xl
                `}>
                  
                  {/* Imagen del Proyecto */}
                  <div className="relative h-full w-full group">
                    <img 
                      src={proj.image} 
                      alt={proj.title} 
                      className="w-full h-full object-cover" 
                    />
                    
                    {/* Overlay Gradiente */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent transition-opacity duration-500 ${isCenter ? 'opacity-100' : 'opacity-60'}`}></div>

                    {/* Contenido */}
                    <div className={`
                      absolute bottom-0 left-0 right-0 p-8 md:p-10 text-center 
                      transition-all duration-700 transform 
                      ${isCenter ? 'translate-y-0 opacity-100 delay-100' : 'translate-y-8 opacity-0'}
                    `}>
                      
                      <span className="inline-block px-4 py-1.5 mb-4 text-[10px] font-bold tracking-widest text-white uppercase bg-sky-600 rounded-full shadow-lg border border-sky-400/30">
                        {proj.category}
                      </span>
                      
                      <h3 className="text-3xl md:text-5xl font-bold text-white mb-3 drop-shadow-lg tracking-tight">
                        {proj.title}
                      </h3>
                      
                      <div className="flex items-center justify-center gap-2 text-sky-200 font-medium">
                        <Globe className="w-4 h-4" /> {proj.location}
                      </div>

                      <div className="w-12 h-1 bg-sky-500 mx-auto mt-6 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Paginación Inferior (Puntos) */}
        <div className="flex justify-center gap-3 mt-10">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`h-2 rounded-full transition-all duration-500 ${i === activeIndex ? 'w-12 bg-sky-600' : 'w-2 bg-slate-300 hover:bg-sky-400'}`}
              aria-label={`Ir al proyecto ${i + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

const Brands = () => {
  const brands = [
    { 
      name: "Hunter", 
      logo: "/hunter.png", 
      desc: "Líder mundial en innovación de riego residencial y comercial." 
    },
    { 
      name: "DIG", 
      logo: "/dig.png", 
      desc: "Soluciones de micro-riego sostenibles y energía alternativa." 
    },
    { 
      name: "Rain Pro", 
      logo: "/rainpro.png", 
      desc: "Componentes de aspersión de grado profesional y alto rendimiento." 
    },
    { 
      name: "Wassermann", 
      logo: "/wassermann.png", 
      desc: "Ingeniería alemana en sistemas de bombeo y presurización." 
    },
    { 
      name: "Tuboplast", 
      logo: "/tuboplast.png", 
      desc: "Infraestructura de conducción hidráulica certificada." 
    },
  ];

  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden border-t border-slate-800/50">
      {/* Fondo decorativo sutil */}
      <div className="absolute inset-0 opacity-30 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(56, 189, 248, 0.1) 1px, transparent 0)', backgroundSize: '30px 30px' }}>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <Reveal>
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
            <div className="max-w-2xl">
              <h4 className="text-sky-500 font-bold tracking-[0.2em] text-xs uppercase mb-4">Tecnología Certificada</h4>
              <h2 className="text-4xl md:text-5xl font-light text-white leading-tight">
                Aliados de <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300">Clase Mundial</span>
              </h2>
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-10">
          {brands.map((brand, idx) => (
            <Reveal key={idx} delay={idx * 100} className="h-full">
              {/* La clase 'group' aquí activa los efectos hover en los hijos */}
              <div className="flip-card w-full aspect-square group relative z-0 hover:z-10">
                <div className="flip-card-inner">
                  
                  {/* FRENTE: Logo maximizado */}
                  <div className="flip-card-front">
                    {/* CAMBIO: Se eliminó el padding (p-6).
                       La imagen usa w-[85%] h-[85%] para llenar el espacio de forma segura
                       sin tocar los bordes redondeados. object-contain evita deformaciones.
                    */}
                    <img 
                      src={brand.logo} 
                      alt={brand.name}
                      className="w-[85%] h-[85%] object-contain transition-transform duration-500 transform group-hover:scale-105" 
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>

                  {/* DORSO: Información */}
                  <div className="flip-card-back p-6">
                    <div className="flex flex-col items-center justify-center h-full text-center">
                      <h4 className="text-sky-400 font-bold text-xl mb-4 tracking-wide">{brand.name}</h4>
                      <p className="text-slate-300 text-sm font-light leading-relaxed mb-6">
                        {brand.desc}
                      </p>
                      <Link to="/contacto" className="text-[11px] uppercase tracking-wider font-bold text-white bg-sky-600/20 border border-sky-500/30 px-5 py-2 rounded-full hover:bg-sky-500 hover:border-sky-500 transition-all duration-300">
                        Saber más
                      </Link>
                    </div>
                  </div>

                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
const CTA = () => (
  <section className="py-32 bg-sky-50 overflow-hidden relative">
    <Parallax speed={-0.6} className="absolute top-0 right-0 pointer-events-none"><div className="w-96 h-96 bg-sky-100 rounded-full blur-3xl opacity-50 -mr-20 -mt-20"></div></Parallax>
    <div className="max-w-5xl mx-auto px-6 lg:px-12 text-center relative z-10">
      <Reveal><h2 className="text-5xl md:text-6xl font-semibold text-slate-900 mb-8 tracking-tight">¿Su sistema actual pierde presión?</h2></Reveal>
      <Reveal delay={200}><p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto font-light">Actualice su infraestructura con aspersores de última generación. Maximice la cobertura y minimice el desperdicio hoy mismo.</p></Reveal>
      <Reveal delay={400}>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
          <Link to="/contacto" className="px-10 py-5 bg-slate-900 text-white text-lg font-medium rounded-full shadow-2xl hover:bg-slate-800 transition-all">Agendar Auditoría</Link>
          <Link to="/tienda" className="text-slate-600 hover:text-sky-600 font-medium transition-colors border-b border-transparent hover:border-sky-600 pb-1">Ver Aspersores</Link>
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
        <IdentitySection />
        <About />
        <Portfolio />
        <Brands />
        <CTA />
      </main>
    </div>
  );
};

export default PremiumHomePage;