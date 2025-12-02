import React from 'react';

interface CardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ title, description, icon, className = '' }) => {
  return (
    <div className={`bg-ecosistema-primary p-8 rounded-3xl shadow-xl border border-gray-100 transition duration-500 hover:shadow-celeste hover:scale-[1.02] ${className}`}>
      <div className="text-ecosistema-accent mb-4 p-3 bg-ecosistema-accent/10 rounded-xl inline-block">
        {icon}
      </div>
      <h3 className="text-2xl font-semibold text-ecosistema-dark mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
};

export default Card;
