import { Droplet } from 'lucide-react';
import React from 'react';

// 1. Definimos que el componente acepta una propiedad "color" opcional
interface LogoProps {
  color?: 'white' | 'dark';
}

// 2. Le pasamos la propiedad al componente con un valor por defecto ('dark')
const Logo: React.FC<LogoProps> = ({ color = 'dark' }) => {
  
  // 3. Determinamos la clase de color basada en la propiedad recibida
  // Si es 'white', usamos texto blanco. Si no, usamos el color oscuro de tu tema.
  const textColorClass = color === 'white' ? 'text-white' : 'text-ecosistema-dark';

  return (
    <div className="flex items-center space-x-3">
      <div className="p-2 bg-ecosistema-accent rounded-full shadow-celeste transition duration-300 hover:scale-105">
        <Droplet className="w-8 h-8 text-ecosistema-primary fill-ecosistema-primary" />
      </div>
      
      {/* 4. Aplicamos la clase de color dinámica aquí */}
      <span className={`text-2xl font-bold tracking-wider ${textColorClass}`}>
        ECOSISTEMA
      </span>
    </div>
  );
};

export default Logo;