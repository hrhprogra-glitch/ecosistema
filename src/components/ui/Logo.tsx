import { Droplet } from 'lucide-react';
import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center space-x-2">
      {/* Logo: Gota de agua blanca sobre fondo celeste sólido */}
      {/* Se usa bg-ecosistema-accent para el fondo sólido y shadow-celeste para un efecto 3D pulido. */}
      <div className="p-1 bg-ecosistema-accent rounded-full shadow-celeste transition duration-300 hover:scale-105">
        {/* La gota es blanca (ecosistema-primary) */}
        <Droplet className="w-6 h-6 text-ecosistema-primary fill-ecosistema-primary" />
      </div>
      <span className="text-xl font-bold text-ecosistema-dark tracking-wider">
        ECOSISTEMA
      </span>
    </div>
  );
};

export default Logo;
