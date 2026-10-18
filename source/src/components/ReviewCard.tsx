import React from 'react';
import { Star, CheckCircle2 } from 'lucide-react';

interface ReviewCardProps {
  text: string;
  name: string;
  verifiedLabel?: string;
}

export const ReviewCard = ({ text, name, verifiedLabel = "Verified Guest" }: ReviewCardProps) => (
  <div className="relative p-10 rounded-3xl bg-white transition-all duration-500 border border-gray-100 hover:border-[#D46F4D]/30 group hover:-translate-y-3 hover:shadow-2xl flex flex-col h-full text-left">
    <div className="absolute top-8 right-8 text-[#D46F4D]/20 font-serif text-7xl leading-none select-none">&rdquo;</div>
    <div className="flex gap-1 mb-8">
      {[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-[#D46F4D] text-[#D46F4D]" />)}
    </div>
    <p className="text-gray-600 font-light leading-relaxed text-base italic flex-grow mb-10 relative z-10">"{text}"</p>
    <div className="flex items-center gap-4 mt-auto border-t border-gray-100 pt-8">
      <div>
        <span className="block text-xs font-bold text-slate-900 tracking-widest uppercase mb-2">{name}</span>
        <span className="text-[10px] text-[#D46F4D] uppercase tracking-wide font-bold flex items-center gap-2 bg-[#D46F4D]/10 py-1 px-3 rounded-full w-fit">
          <CheckCircle2 size={12} /> {verifiedLabel}
        </span>
      </div>
    </div>
  </div>
);
