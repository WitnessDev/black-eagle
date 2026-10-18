import React from 'react';

interface LuxuryCardProps {
  image: string;
  title: string;
  subtitle: string;
  desc: string;
}

export const LuxuryCard = ({ image, title, subtitle, desc }: LuxuryCardProps) => (
  <div className="group cursor-pointer">
    <div className="relative h-96 overflow-hidden rounded-2xl mb-8 shadow-2xl">
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-700 z-10"></div>
      <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110" />
      <div className="absolute bottom-8 left-8 z-20 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700 ease-out">
        <span className="text-[#D46F4D] text-xs font-bold tracking-[0.2em] uppercase mb-2 block opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">{subtitle}</span>
        <h3 className="text-3xl font-playfair">{title}</h3>
      </div>
    </div>
    <p className="text-gray-500 leading-relaxed font-light pr-4 text-base">{desc}</p>
  </div>
);
