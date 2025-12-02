import React from 'react';
import Card from '../ui/Card';
import { Wrench, Droplets, Zap, Leaf } from 'lucide-react';

const servicesData = [
  {
    title: 'Mantenimiento de Agua',
    description: 'Servicios integrales para la calidad y gestión del agua, incluyendo filtración, purificación y optimización de reservas.',
    icon: <Droplets className="w-6 h-6" />,
  },
  {
    title: 'Instalación de Riego',
    description: 'Diseño e implementación de sistemas de riego automatizados y eficientes, adaptados a cualquier escala y necesidad agrícola o paisajística.',
    icon: <Wrench className="w-6 h-6" />,
  },
  {
    title: 'Auditoría Energética Hídrica',
    description: 'Análisis detallado para reducir el consumo de agua y energía en sus sistemas, garantizando máxima eficiencia y ahorro de costos.',
    icon: <Zap className="w-6 h-6" />,
  },
  {
    title: 'Consultoría Sostenible',
    description: 'Asesoramiento experto para la implementación de prácticas hídricas ecológicas y cumplimiento de normativas ambientales.',
    icon: <Leaf className="w-6 h-6" />,
  },
];

const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="py-20 bg-ecosistema-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-sm font-semibold uppercase text-ecosistema-accent tracking-widest mb-2">Nuestros Pilares</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-ecosistema-dark">Servicios de Gestión Hídrica</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {servicesData.map((service, index) => (
            <Card 
              key={index}
              title={service.title}
              description={service.description}
              icon={service.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
