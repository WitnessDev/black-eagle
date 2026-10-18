import React from 'react';
import { MapPin, ChevronRight } from 'lucide-react';

interface PricingCardProps {
  key?: React.Key;
  image: string;
  days: string;
  title: string;
  location: string;
  price: string;
  midRange?: string;
  luxury?: string;
  onBook: () => void;
  startingFromLabel?: string;
}

export const PricingCard = ({ image, days, title, location, price, midRange, luxury, onBook, startingFromLabel = "Starting from" }: PricingCardProps) => (
  <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 group hover:-translate-y-4 hover:shadow-2xl transition-all duration-500 flex flex-col">
    <div className="relative h-64 overflow-hidden shrink-0">
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 z-10"></div>
      <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out" />
      <div className="absolute top-5 right-5 z-20">
        <div className="bg-white/95 backdrop-blur-sm px-4 py-2 text-[10px] font-bold tracking-widest uppercase text-slate-900 rounded-full shadow-md">{days}</div>
      </div>
    </div>
    <div className="p-8 flex flex-col flex-grow">
      <h3 className="text-2xl font-playfair font-bold text-slate-900 mb-3 group-hover:text-[#D46F4D] transition-colors">{title}</h3>
      <div className="flex items-center text-gray-400 text-[10px] font-bold tracking-widest uppercase mb-6">
        <MapPin size={12} className="mr-2 text-[#D46F4D]" /> {location}
      </div>
      
      {(midRange || luxury) && (
        <div className="space-y-2 mb-8 border-t border-gray-50 pt-6">
          {midRange && (
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-500">Mid-Range</span>
              <span className="font-bold text-slate-700">{midRange}</span>
            </div>
          )}
          {luxury && (
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-500">Luxury</span>
              <span className="font-bold text-slate-700">{luxury}</span>
            </div>
          )}
        </div>
      )}

      <div className="flex justify-between items-end border-t border-gray-100 pt-6 mt-auto">
        <div>
          <span className="block text-[10px] text-gray-400 mb-1 font-bold tracking-wider uppercase">{startingFromLabel} (Budget)</span>
          <span className="text-2xl font-playfair font-bold text-[#D46F4D]">{price}</span>
        </div>
        <button onClick={onBook} className="w-12 h-12 rounded-full flex items-center justify-center bg-[#F4F0E6] border border-transparent text-slate-900 group-hover:bg-[#D46F4D] group-hover:text-white transition-all duration-300 shadow-md">
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  </div>
);
