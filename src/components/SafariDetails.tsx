import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  Clock,
  MapPin,
  CalendarDays,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ChevronRight,
  Sun,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface SafariDetailsProps {
  safari: any;
  t: any;
  lang: string;
  onLanguageChange: (lang: any) => void;
  onBack: () => void;
  onBook: () => void;
}

export const SafariDetails = ({
  safari,
  t,
  lang,
  onLanguageChange,
  onBack,
  onBook,
}: SafariDetailsProps) => {
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#FAF9F6] min-h-screen pb-32">
      {/* Sticky Top Navigation */}
      <div className="fixed top-0 left-0 w-full z-50 bg-[#FAF9F6]/80 backdrop-blur-xl border-b border-[#D46F4D]/10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-slate-900 hover:text-[#D46F4D] transition-colors"
          >
            <ArrowLeft size={18} className="mr-2" /> {t?.back || "Back"}
          </button>
          
          <div className="flex items-center gap-4 md:gap-6">
            <div className="relative">
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 hover:border-[#D46F4D] transition-all duration-300 bg-white/50"
              >
                <img
                  src={`https://flagcdn.com/w20/${lang === "en" ? "gb" : lang === "zh" ? "cn" : lang}.png`}
                  alt={lang}
                  className="w-4 h-auto rounded-sm"
                />
                <span className="uppercase text-xs font-bold tracking-widest text-slate-900">{lang}</span>
              </button>
              <AnimatePresence>
                {isLangMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden py-2 min-w-[140px] z-[100]"
                  >
                    {(["en", "zh", "de", "es", "fr", "it"]).map(
                      (l) => (
                        <button
                          key={l}
                          onClick={() => {
                            onLanguageChange(l as any);
                            setIsLangMenuOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors text-slate-800 flex items-center gap-3 ${lang === l ? "text-[#D46F4D] font-bold" : ""}`}
                        >
                          <img
                            src={`https://flagcdn.com/w20/${l === "en" ? "gb" : l === "zh" ? "cn" : l}.png`}
                            alt={l}
                            className="w-5 h-auto rounded-sm shadow-sm"
                          />
                          <span className="text-sm">
                            {l === "en"
                              ? "English"
                              : l === "zh"
                                ? "中文"
                                : l === "de"
                                  ? "Deutsch"
                                  : l === "es"
                                    ? "Español"
                                    : l === "fr"
                                      ? "Français"
                                      : "Italiano"}
                          </span>
                        </button>
                      ),
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={onBook}
              className="md:hidden px-6 py-2.5 bg-[#D46F4D] text-white rounded-full font-bold uppercase tracking-widest text-xs hover:bg-[#b05a3e] transition-colors"
            >
              {t?.book || "Book"}
            </button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative h-[65vh] md:h-[75vh] w-full pt-16">
        <div className="absolute inset-0">
          <motion.img
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            src={safari.image}
            alt={safari.imageAlt || safari.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-16 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-block py-1.5 px-5 bg-white/10 backdrop-blur-md rounded-full text-white text-[10px] md:text-xs tracking-[0.2em] font-bold uppercase mb-6 border border-white/20">
              {safari.subtitle}
            </span>
            <h1 className="text-4xl md:text-7xl lg:text-8xl font-playfair text-white mb-6 leading-[1.1] text-balance">
              {safari.title}
            </h1>
            
            <div className="flex flex-wrap gap-4 md:gap-10 text-white/90 text-xs md:text-sm font-bold tracking-widest uppercase">
              <div className="flex items-center">
                <Clock size={18} className="mr-2 text-[#D46F4D]" />{" "}
                {safari.days}
              </div>
              <div className="flex items-center">
                <MapPin size={18} className="mr-2 text-[#D46F4D]" />{" "}
                {safari.location}
              </div>
              <div className="flex items-center">
                <span className="mr-3 px-3 py-1 bg-white/20 rounded-full text-[10px]">
                  {t?.from || "From"}
                </span>{" "}
                <span className="text-xl md:text-2xl font-playfair text-[#D46F4D] tracking-normal">
                  {safari.price}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        
        {/* Left Column (Content) */}
        <div className="lg:col-span-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-playfair text-slate-900 mb-8 flex items-center">
              {t?.theExperience || "The Experience"}
            </h2>
            <p className="text-gray-600 leading-loose font-light mb-12 text-lg md:text-xl whitespace-pre-wrap">
              {safari.overview}
            </p>

            {safari.story && (
              <div className="mb-16">
                <h2 className="text-3xl md:text-4xl font-playfair text-slate-900 mb-8">
                  {t?.theStory || "The Story"}
                </h2>
                <div className="pl-6 md:pl-10 border-l-2 border-[#D46F4D]/30">
                  <p className="text-gray-600 leading-loose font-light text-lg md:text-xl whitespace-pre-wrap">
                    {safari.story}
                  </p>
                </div>
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="py-12 border-t border-b border-gray-200 my-16"
          >
            <h2 className="text-3xl md:text-4xl font-playfair text-slate-900 mb-12">
              {t?.journeyTimeline || "Journey Timeline"}
            </h2>
            <div className="space-y-12">
              {safari.plan.map((day: any, idx: number) => (
                <div key={idx} className="relative group">
                  {/* Vertical line connecting days */}
                  {idx !== safari.plan.length - 1 && (
                    <div className="absolute left-[23px] top-14 bottom-[-48px] w-px bg-gray-200 group-hover:bg-[#D46F4D]/30 transition-colors"></div>
                  )}
                  
                  <div className="flex gap-6 md:gap-10">
                    <div className="flex flex-col items-center shrink-0">
                      <div className="w-12 h-12 rounded-full bg-white text-[#D46F4D] flex items-center justify-center font-playfair font-bold text-xl shadow-lg border border-gray-100 z-10">
                        {idx + 1}
                      </div>
                    </div>
                    
                    <div className="bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow w-full">
                      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
                        <div className="flex-1">
                          <span className="text-[#D46F4D] text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase block mb-3">
                            {day.day}
                          </span>
                          <h3 className="text-xl md:text-3xl font-playfair text-slate-900 mb-6">
                            {day.title}
                          </h3>
                          <p className="text-gray-600 font-light leading-loose whitespace-pre-wrap text-[15px] md:text-lg">
                            {day.desc}
                          </p>
                        </div>
                        {day.image && (
                          <div className="w-full lg:w-80 shrink-0 overflow-hidden rounded-2xl shadow-md border border-gray-100 mt-4 lg:mt-0 group/img bg-slate-100">
                            <img
                              src={day.image}
                              alt={day.imageAlt || day.title}
                              loading="lazy"
                              className="w-full h-52 lg:h-60 object-cover group-hover/img:scale-105 transition-transform duration-500"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column (Sidebar) */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white p-8 md:p-10 rounded-[40px] shadow-xl border border-gray-100 sticky top-28">
            <div className="text-center mb-8">
              <span className="text-xs font-bold tracking-widest text-gray-400 uppercase block mb-2">{t?.startingFrom || "Starting from"}</span>
              <div className="text-4xl font-playfair text-slate-900 mb-6">{safari.price}</div>
              <button
                onClick={onBook}
                className="w-full py-4 md:py-5 bg-[#232B25] text-white rounded-full font-bold uppercase tracking-widest text-sm hover:bg-[#D46F4D] shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center"
              >
                {t?.secureYourSpot || "Secure Your Spot"} <ChevronRight size={18} className="ml-2" />
              </button>
            </div>

            {safari.included && (
              <div className="mt-12">
                <h3 className="text-xs font-bold tracking-widest text-slate-900 uppercase mb-6 flex items-center">
                  <CheckCircle2 size={16} className="mr-2 text-[#D46F4D]" /> {t?.included || "Included"}
                </h3>
                <ul className="space-y-4">
                  {safari.included.map((item: string, idx: number) => (
                    <li key={idx} className="flex items-start text-sm text-gray-600 leading-relaxed font-light">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D46F4D] shrink-0 mt-2 mr-3"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {safari.excluded && safari.excluded.length > 0 && (
              <div className="mt-10 pt-10 border-t border-gray-100">
                <h3 className="text-xs font-bold tracking-widest text-slate-900 uppercase mb-6 flex items-center">
                  <XCircle size={16} className="mr-2 text-gray-400" /> {t?.excluded || "Excluded"}
                </h3>
                <ul className="space-y-4">
                  {safari.excluded.map((item: string, idx: number) => (
                    <li key={idx} className="flex items-start text-sm text-gray-500 leading-relaxed font-light">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-300 shrink-0 mt-2 mr-3"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {safari.notes && safari.notes.length > 0 && (
              <div className="mt-10 p-6 bg-amber-50 rounded-2xl border border-amber-100/50">
                <h3 className="text-xs font-bold tracking-widest text-amber-900 uppercase mb-4 flex items-center">
                  <AlertCircle size={16} className="mr-2 text-amber-500" /> {t?.goodToKnow || "Good to know"}
                </h3>
                <ul className="space-y-4">
                  {safari.notes.map((item: string, idx: number) => (
                    <li key={idx} className="text-xs text-amber-800/80 leading-relaxed font-light">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
