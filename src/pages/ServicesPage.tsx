import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Wrench, 
  Activity, 
  ClipboardCheck, 
  ArrowRight, 
  DraftingCompass,
  Cpu,
  Terminal,
  Settings,
  CheckCircle2,
  Gauge,
  Droplets
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, ContactShadows } from '@react-three/drei'; // Se eliminó Environment para evitar errores de fetch
import * as THREE from 'three';

// --- UTILS & COMPONENTS ---

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

// --- 3D COMPONENTS (THREE.JS / R3F) ---

// Componente visual para el núcleo sólido del agua (justo al salir de la boquilla)
const WaterJetCore = () => {
  return (
    <group position={[0, 0.4, 0.7]} rotation={[0.15, 0, 0]}> 
      {/* El cono simula la presión inicial antes de que el agua se rompa en gotas */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0.5]}>
        <cylinderGeometry args={[0.04, 0.15, 1.2, 8, 1, true]} /> {/* Cone open ended */}
        <meshPhysicalMaterial 
          color="#06b6d4" // Celeste Cyan
          emissive="#22d3ee"
          emissiveIntensity={0.5}
          transparent
          opacity={0.6}
          roughness={0.1}
          metalness={0.1}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
};

// Sistema de Partículas de Agua (Spray Atomizado)
// Sistema de Partículas de Agua (Spray Atomizado)
const WaterSpray = ({ rotationRef }: { rotationRef: React.MutableRefObject<THREE.Group | null> }) => {
  const count = 8000;
  const mesh = useRef<THREE.Points>(null);

  // Posiciones y velocidades iniciales
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 1.5;
      const speed = 15 + Math.random() * 5;
      const angle = (Math.random() - 0.5) * 0.1;
      const lift = (Math.random() - 0.5) * 0.1;
      temp.push({ t, speed, angle, lift });
    }
    return temp;
  }, []);

  // Buffers
  const positionsArray = useMemo(() => new Float32Array(count * 3), [count]);
  const sizeArray = useMemo(() => new Float32Array(count).map(() => 0.12 + Math.random() * 0.12), [count]);

  const dummy = useMemo(() => new THREE.Vector3(), []);
  const headPos = useMemo(() => new THREE.Vector3(0, 3, 0), []);
  const nozzleLocalPos = useMemo(() => new THREE.Vector3(0, 0.4, 0.65), []);

  useFrame((state, delta) => {
    if (!mesh.current || !rotationRef.current) return;

    const positions = mesh.current.geometry.attributes.position.array as Float32Array;
    const currentRotation = rotationRef.current.rotation.y;

    particles.forEach((p, i) => {
      p.t += delta;

      // Nacimiento de partícula
      if (p.t > 1.2) {
        p.t = 0;

        dummy.copy(nozzleLocalPos);
        dummy.applyAxisAngle(new THREE.Vector3(0, 1, 0), currentRotation);
        dummy.add(headPos);

        positions[i * 3] = dummy.x;
        positions[i * 3 + 1] = dummy.y;
        positions[i * 3 + 2] = dummy.z;
        return;
      }

      const i3 = i * 3;
      const rotSpeed = 0.8;
      const emissionAngle = currentRotation - (p.t * rotSpeed) + p.angle;
      const velocity = p.speed * delta;
      const verticalForce = Math.sin(0.1) * p.speed;

      // Movimiento con fuerza constante (sin gravedad)
      positions[i3]     += Math.sin(emissionAngle) * velocity * (1 + p.angle * 0.2);
      positions[i3 + 1] += (verticalForce * 0.012 + p.lift) * delta;
      positions[i3 + 2] += Math.cos(emissionAngle) * velocity * (1 + p.angle * 0.2);

      // Desaparecer si sale del área visible
      const dx = positions[i3] - headPos.x;
      const dy = positions[i3 + 1] - headPos.y;
      const dz = positions[i3 + 2] - headPos.z;
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
      if (dist > 10) p.t = 999;
    });

    mesh.current.geometry.attributes.position.needsUpdate = true;

    // Fade dinámico según tiempo de vida (efecto acuoso)
    const mat = mesh.current.material as THREE.PointsMaterial;
    const fade = Math.min(state.clock.elapsedTime * 0.2, 1);
    mat.opacity = 0.85 - fade * 0.25;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positionsArray}
          itemSize={3}
        />
        {/* Tamaño variable por gota */}
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={sizeArray}
          itemSize={1}
        />
      </bufferGeometry>

      {/* Material mejorado de agua */}
      <pointsMaterial
        size={0.22}
        transparent
        opacity={0.85}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
        color="#7dd3fc"        // agua celeste
        emissive="#38bdf8"     // brillo húmedo
        emissiveIntensity={0.55}
      />
    </points>
  );
};


// Modelo del Aspersor
const SprinklerModel = () => {
  const headRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (headRef.current) {
      headRef.current.rotation.y += delta * 0.8; 
    }
  });

  return (
    <group position={[0, -2, 0]}> 
      {/* 1. CUERPO BASE (Estático) */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.6, 0.6, 3.5, 32]} />
        <meshStandardMaterial color="#1e293b" roughness={0.7} metalness={0.2} />
      </mesh>
      
      {/* Tapa Superior Base */}
      <mesh position={[0, 1.8, 0]} receiveShadow>
        <cylinderGeometry args={[0.7, 0.7, 0.1, 32]} />
        <meshStandardMaterial color="#0f172a" roughness={0.5} />
      </mesh>

      {/* 2. VÁSTAGO EMERGENTE (Riser) */}
      <mesh position={[0, 1.5, 0]} castShadow>
        <cylinderGeometry args={[0.4, 0.4, 3, 32]} />
        <meshStandardMaterial color="#334155" roughness={0.6} metalness={0.4} />
      </mesh>

      {/* 3. CABEZAL ROTATORIO (Turret) */}
      <group ref={headRef} position={[0, 3, 0]}>
        
        <mesh position={[0, 0.2, 0]} castShadow>
          <cylinderGeometry args={[0.45, 0.45, 1.2, 32]} />
          <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.1} />
        </mesh>
        
        <mesh position={[0, 0.81, 0]}>
          <cylinderGeometry args={[0.46, 0.46, 0.05, 32]} />
          <meshStandardMaterial color="#1e293b" roughness={0.9} />
        </mesh>
        
        <mesh position={[0, 0.84, 0]}>
           <cylinderGeometry args={[0.1, 0.1, 0.02, 16]} />
           <meshStandardMaterial color="#94a3b8" roughness={0.3} metalness={0.8} />
        </mesh>
        
        {/* Boquilla (Housing) */}
        <mesh position={[0, 0.4, 0.35]} rotation={[0.1, 0, 0]}>
           <boxGeometry args={[0.4, 0.5, 0.5]} />
           <meshStandardMaterial color="#0f172a" roughness={0.2} />
        </mesh>

        {/* Inserto Boquilla (Azul Petróleo Translúcido) */}
        <mesh position={[0, 0.4, 0.61]} rotation={[0.1, 0, 0]}>
           <boxGeometry args={[0.15, 0.25, 0.05]} />
           <meshPhysicalMaterial 
             color="#06b6d4" 
             transmission={0.6} 
             opacity={1} 
             metalness={0} 
             roughness={0.1} 
             ior={1.5}
             thickness={0.5}
           />
        </mesh>
        
        {/* NÚCLEO DEL CHORRO (Sólido inicial) - Alineado perfectamente con el inserto */}

      </group>

      {/* SPRAY DE PARTÍCULAS - Movido FUERA del grupo rotatorio para física independiente */}
      <WaterSpray rotationRef={headRef} />

    </group>
  );
};

// --- SCENE WRAPPER ---
const Scene3D = () => {
  return (
    <Canvas shadows dpr={[1, 2]}>
      <PerspectiveCamera makeDefault position={[3, 4, 6]} fov={45} />

      {/* Iluminación tipo estudio de ingeniería - Reforzada ya que quitamos Environment */}
      <ambientLight intensity={0.8} /> {/* Aumentado para compensar la falta de HDRI */}
      <hemisphereLight intensity={1.0} skyColor="#ffffff" groundColor="#507088" />
      
      {/* Luz principal más fuerte */}
      <spotLight 
        position={[10, 10, 10]} 
        angle={0.2} 
        penumbra={1} 
        intensity={3}
        castShadow
        shadow-bias={-0.0001}
      />
      
      {/* Luz de relleno azulada para efecto tecnológico */}
      <pointLight position={[-5, 5, -5]} intensity={2} color="#22d3ee" distance={10} />
      
      {/* Luz de contra para recortar el objeto del fondo oscuro */}
      <spotLight position={[0, 5, -5]} intensity={5} color="#ffffff" angle={0.5} />

      {/* Se eliminó Environment para evitar error de carga de potsdamer_platz_1k.hdr */}
      
      <SprinklerModel />

      <ContactShadows resolution={1024} scale={20} blur={2} opacity={0.5} far={10} color="#000000" />

      <OrbitControls 
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2}
      />
    </Canvas>
  );
};

// --- DATA ---

const technicalServices = [
  {
    id: "ENG-01",
    title: "Diseño Hidráulico & Modelado CAD",
    description: "Cálculo de redes de distribución bajo normativa internacional. Entregables en DWG/PDF con tablas de precipitación y pérdida de carga.",
    icon: <DraftingCompass className="w-8 h-8" />,
    bullets: ["Planos As-Built certificados", "Cálculo de golpe de ariete", "Zonificación por microclima"]
  },
  {
    id: "ENG-02",
    title: "Automatización & Telemetría",
    description: "Integración de controladores inteligentes (IoT). Gestión remota de válvulas maestras, sensores de flujo y estaciones meteorológicas.",
    icon: <Cpu className="w-8 h-8" />,
    bullets: ["Protocolo LoRaWAN / 4G", "Alertas de fuga en tiempo real", "Ajuste estacional automático"]
  },
  {
    id: "ENG-03",
    title: "Infraestructura & Obra Civil",
    description: "Instalación de tuberías de alta presión (PVC C-40, HDPE) y estaciones de bombeo con variadores de frecuencia.",
    icon: <Terminal className="w-8 h-8" />,
    bullets: ["Soldadura por termofusión", "Zanjeo mecánico de precisión", "Cableado decodificador"]
  },
  {
    id: "ENG-04",
    title: "Auditoría Hídrica & Retrofit",
    description: "Evaluación técnica de sistemas existentes. Modernización de componentes obsoletos para maximizar la eficiencia energética e hídrica.",
    icon: <Activity className="w-8 h-8" />,
    bullets: ["Pruebas de estanqueidad", "Calibración de rotores", "Informe de uniformidad (DU)"]
  }
];

// --- SECTIONS ---

const ServicesHero = () => (
  <section className="relative pt-32 pb-24 bg-slate-950 overflow-hidden min-h-[60vh] flex items-center border-b border-slate-800">
    {/* Fondo Blueprint Técnico */}
    <div className="absolute inset-0 z-0 opacity-15 pointer-events-none" 
         style={{ 
           backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', 
           backgroundSize: '40px 40px' 
         }}>
    </div>
    <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-transparent z-0"></div>

    <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 w-full grid lg:grid-cols-2 gap-12 items-center">
      {/* Contenido de Texto (Izquierda) */}
      <Reveal>
        <h1 className="text-4xl lg:text-6xl font-bold text-white tracking-tight leading-none mb-6">
          GESTIÓN HÍDRICA <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-slate-200 font-light">DE ALTA PRECISIÓN.</span>
        </h1>
        <p className="text-lg text-slate-400 font-light max-w-xl leading-relaxed border-l-2 border-slate-800 pl-6">
          Desarrollamos infraestructura de riego inteligente para agricultura corporativa, campos deportivos y grandes superficies. Sin margen de error.
        </p>
      </Reveal>

      {/* Render 3D Interactivo (Derecha) */}
      <Reveal delay={200} className="hidden lg:block relative h-[500px] w-full">
        
        {/* Fondo Tecnológico Local para el Canvas */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/0 to-slate-900/50 rounded-full blur-3xl -z-10"></div>

        {/* Canvas de React Three Fiber */}
        <Scene3D />

        {/* Panel Flotante Inferior de Estado (Overlay HTML sobre Canvas) */}
        <div className="absolute bottom-12 right-12 bg-slate-900/90 backdrop-blur border border-slate-700 p-4 rounded-lg shadow-2xl flex items-center gap-4 border-l-4 border-l-sky-500 pointer-events-none">
          <div className="bg-slate-800 p-2 rounded-full border border-slate-700">
             <Droplets className="w-5 h-5 text-sky-400" />
          </div>
          <div>
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-0.5">Caudal Instantáneo</div>
            <div className="text-xl font-bold text-white font-mono tracking-tight flex items-baseline gap-1">
               24.5 <span className="text-xs text-slate-500 font-normal">L/min</span>
            </div>
          </div>
        </div>

      </Reveal>
    </div>
  </section>
);

const ServiceCards = () => (
  <section className="bg-slate-50 py-24 relative z-10 border-b border-slate-200">
    <div className="max-w-7xl mx-auto px-6 lg:px-12">
      <Reveal>
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Capacidades Operativas</h2>
            <p className="text-slate-600 font-light text-lg">
              Soluciones integrales de ingeniería para proyectos que demandan estándares internacionales de calidad.
            </p>
          </div>
          <div className="hidden md:block">
            <Settings className="w-10 h-10 text-slate-200 animate-spin-slow" />
          </div>
        </div>
      </Reveal>

      <div className="grid md:grid-cols-2 gap-8">
        {technicalServices.map((srv, idx) => (
          <Reveal key={srv.id} delay={idx * 100}>
            {/* Tarjeta Corporativa Premium */}
            <div className="group relative bg-white border border-slate-200 p-8 md:p-10 rounded-xl overflow-hidden hover:shadow-2xl hover:shadow-sky-900/10 transition-all duration-500 h-full">
              
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-slate-200 group-hover:bg-sky-600 transition-colors duration-300"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-slate-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-8">
                  <div className="p-4 bg-slate-50 border border-slate-100 rounded-lg text-slate-700 group-hover:bg-slate-900 group-hover:text-sky-400 group-hover:border-slate-800 transition-all duration-300 shadow-sm">
                    {srv.icon}
                  </div>
                  <span className="font-mono text-xs font-bold text-slate-300 border border-slate-100 px-3 py-1 rounded bg-slate-50 group-hover:bg-white group-hover:text-sky-600 group-hover:border-sky-100 transition-colors">
                    {srv.id}
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-sky-700 transition-colors tracking-tight">
                  {srv.title}
                </h3>
                
                <p className="text-slate-600 mb-8 text-base leading-relaxed font-light">
                  {srv.description}
                </p>
                
                <div className="space-y-4 pt-6 border-t border-slate-100">
                  {srv.bullets.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm text-slate-700 font-medium group-hover:text-slate-900 transition-colors">
                      <CheckCircle2 className="w-4 h-4 text-slate-300 group-hover:text-emerald-500 transition-colors" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

const TechnicalCTA = () => (
  <section className="py-24 bg-white">
    <div className="max-w-5xl mx-auto px-6 text-center">
      <Reveal>
        <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-50 rounded-full mb-8 border border-slate-100">
          <Wrench className="w-8 h-8 text-slate-400" />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-6">¿Requiere soporte de ingeniería especializado?</h2>
        <p className="text-lg text-slate-500 mb-10 max-w-2xl mx-auto font-light">
          Ofrecemos diagnóstico hidráulico y asesoría técnica para grandes proyectos. Sin compromiso comercial inicial.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link 
            to="/contacto" 
            className="inline-flex items-center justify-center px-8 py-4 bg-slate-900 text-white font-bold rounded hover:bg-slate-800 transition-colors shadow-xl"
          >
            <ClipboardCheck className="w-5 h-5 mr-2" />
            Solicitar Diagnóstico
          </Link>
          <Link 
            to="/contacto" 
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-slate-700 font-bold border border-slate-300 rounded hover:bg-slate-50 hover:border-slate-400 transition-colors"
          >
            Contactar Dpto. Técnico
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </Reveal>
    </div>
  </section>
);

const ServicesPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen font-sans selection:bg-sky-200 selection:text-slate-900">
      <main>
        <ServicesHero />
        <ServiceCards />
        <TechnicalCTA />
      </main>
    </div>
  );
};

export default ServicesPage;