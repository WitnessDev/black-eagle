import React, { useState } from "react";
import { Camera, Play, Volume2, VolumeX, Eye, X, MapPin, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Reveal } from "./Reveal";

export interface MediaItem {
  id: string;
  type: "image" | "video";
  src: string;
  poster?: string;
  title: string;
  subtitle: string;
  location: string;
  category: "cats" | "elephants" | "ngorongoro" | "savanna";
}

export const mediaItems: MediaItem[] = [
  {
    id: "hero-video",
    type: "video",
    src: "/videos/hero.mp4",
    poster: "/images/hero-lions-tree.jpg",
    title: "Pure Tanzanian Wilderness",
    subtitle: "Bush & Wildlife Experience",
    location: "Serengeti & Northern Circuit",
    category: "cats",
  },
  {
    id: "hero-lions",
    type: "image",
    src: "/images/hero-lions-tree.jpg",
    title: "Tree-Climbing Lions",
    subtitle: "Rare Behavioral Sightings",
    location: "Lake Manyara & Serengeti",
    category: "cats",
  },
  {
    id: "elephants-herd",
    type: "image",
    src: "/images/elephants-herd.jpg",
    title: "Elephant Herd Gathering",
    subtitle: "Tarangire River Life",
    location: "Tarangire National Park",
    category: "elephants",
  },
  {
    id: "lioness-track",
    type: "image",
    src: "/images/lioness-track.jpg",
    title: "Lioness on the Prowl",
    subtitle: "Predator Tracking",
    location: "Central Serengeti (Seronera)",
    category: "cats",
  },
  {
    id: "leopard-tree",
    type: "image",
    src: "/images/leopard.jpg",
    title: "Solitary African Leopard",
    subtitle: "Namiri Plains & Western Corridor",
    location: "Serengeti National Park",
    category: "cats",
  },
  {
    id: "ngorongoro-crater",
    type: "image",
    src: "/images/ngorongoro-crater.jpg",
    title: "Ngorongoro Crater Rim",
    subtitle: "World's Largest Intact Caldera",
    location: "Ngorongoro Conservation Area",
    category: "ngorongoro",
  },
  {
    id: "rhino-family",
    type: "image",
    src: "/images/rhino-family.jpg",
    title: "Endangered Black Rhinos",
    subtitle: "Big Five Sanctuary",
    location: "Ngorongoro Crater Floor",
    category: "ngorongoro",
  },
  {
    id: "elephant-portrait",
    type: "image",
    src: "/images/elephant-portrait.jpg",
    title: "The Old Giant of Tarangire",
    subtitle: "Gentle Giants of the Savanna",
    location: "Tarangire National Park",
    category: "elephants",
  },
  {
    id: "giraffes-savanna",
    type: "image",
    src: "/images/giraffes.jpg",
    title: "Graceful Giraffes on Savanna",
    subtitle: "Iconic African Wildlife",
    location: "Serengeti & Lake Manyara",
    category: "savanna",
  },
];

interface MediaGalleryProps {
  onSelectTrip?: (tripName: string) => void;
  onOpenBooking?: () => void;
}

export const MediaGallery = ({ onSelectTrip, onOpenBooking }: MediaGalleryProps) => {
  const [activeCategory, setActiveCategory] = useState<"all" | "cats" | "elephants" | "ngorongoro" | "savanna">("all");
  const [activeItem, setActiveItem] = useState<MediaItem | null>(null);
  const [isVideoMuted, setIsVideoMuted] = useState(true);

  const filteredItems =
    activeCategory === "all"
      ? mediaItems
      : mediaItems.filter((item) => item.category === activeCategory);

  return (
    <section id="stories" className="py-24 md:py-32 bg-[#FAF9F6] relative">
      <div className="container mx-auto px-4 md:px-8">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#D46F4D] text-xs font-bold tracking-[0.25em] uppercase mb-4 block">
              Field Gallery & Stories
            </span>
            <h2 className="text-4xl md:text-6xl font-playfair text-slate-900 mb-6 leading-tight">
              Captured in the Heart <br />
              <span className="italic text-[#D46F4D]">of the Wild</span>
            </h2>
            <p className="text-gray-600 font-light text-base md:text-lg leading-relaxed">
              Explore authentic photographs and footage captured during Black Eagle expeditions across Tarangire, Ngorongoro, Serengeti, and Lake Manyara.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-16">
            {[
              { id: "all", label: "All Media" },
              { id: "cats", label: "Big Cats & Predators" },
              { id: "elephants", label: "Elephants & Giants" },
              { id: "ngorongoro", label: "Ngorongoro Crater" },
              { id: "savanna", label: "Savanna & Wildlife" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                  activeCategory === cat.id
                    ? "bg-[#232B25] text-white shadow-lg shadow-black/10 scale-105"
                    : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/80"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Media Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl border border-stone-200/60 transition-all duration-500 cursor-pointer flex flex-col"
                onClick={() => setActiveItem(item)}
              >
                {/* Media Container */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900">
                  {item.type === "video" ? (
                    <>
                      <video
                        src={item.src}
                        poster={item.poster}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-white text-[10px] font-bold tracking-widest uppercase flex items-center gap-1.5 border border-white/20">
                        <Play size={11} className="text-[#D46F4D] fill-[#D46F4D]" />
                        Video
                      </div>
                    </>
                  ) : (
                    <>
                      <img
                        src={item.src}
                        alt={item.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-white text-[10px] font-bold tracking-widest uppercase flex items-center gap-1.5 border border-white/20">
                        <Camera size={11} className="text-[#D46F4D]" />
                        Photo
                      </div>
                    </>
                  )}

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <span className="text-white text-xs font-bold tracking-widest uppercase flex items-center gap-2">
                      <Eye size={16} className="text-[#D46F4D]" /> View Full Resolution
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div>
                    <div className="flex items-center text-[11px] font-semibold text-[#D46F4D] uppercase tracking-widest mb-2 gap-1.5">
                      <MapPin size={13} />
                      <span>{item.location}</span>
                    </div>
                    <h3 className="text-xl font-playfair text-slate-900 font-bold group-hover:text-[#D46F4D] transition-colors">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
            onClick={() => setActiveItem(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-w-5xl w-full bg-[#1A221C] rounded-3xl overflow-hidden shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveItem(null)}
                className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-black/60 text-white/80 hover:text-white flex items-center justify-center border border-white/20 transition-colors"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[85vh] overflow-y-auto">
                {/* Media Presentation */}
                <div className="lg:col-span-8 bg-black flex items-center justify-center relative min-h-[350px] lg:min-h-[500px]">
                  {activeItem.type === "video" ? (
                    <div className="relative w-full h-full flex items-center justify-center">
                      <video
                        src={activeItem.src}
                        poster={activeItem.poster}
                        autoPlay
                        loop
                        muted={isVideoMuted}
                        playsInline
                        controls
                        className="max-h-[70vh] w-full object-contain"
                      />
                      <button
                        onClick={() => setIsVideoMuted(!isVideoMuted)}
                        className="absolute bottom-4 right-4 z-10 p-2.5 rounded-full bg-black/60 text-white border border-white/20 hover:bg-[#D46F4D] transition-colors"
                        title={isVideoMuted ? "Unmute" : "Mute"}
                      >
                        {isVideoMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                      </button>
                    </div>
                  ) : (
                    <img
                      src={activeItem.src}
                      alt={activeItem.title}
                      className="max-h-[70vh] w-full object-contain"
                    />
                  )}
                </div>

                {/* Details Panel */}
                <div className="lg:col-span-4 p-8 flex flex-col justify-between text-white bg-[#1F2922]">
                  <div>
                    <span className="text-[#D46F4D] text-xs font-bold tracking-[0.2em] uppercase block mb-3">
                      {activeItem.subtitle}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-playfair font-bold text-white mb-4">
                      {activeItem.title}
                    </h3>
                    <div className="flex items-center gap-2 text-stone-300 text-xs font-medium mb-4 pb-4 border-b border-white/10">
                      <MapPin size={15} className="text-[#D46F4D]" />
                      <span>{activeItem.location}</span>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/10 space-y-4">
                    <button
                      onClick={() => {
                        const title = activeItem.title;
                        setActiveItem(null);
                        if (onSelectTrip) {
                          onSelectTrip(title);
                        }
                        if (onOpenBooking) {
                          onOpenBooking();
                        } else {
                          const el = document.getElementById("booking");
                          if (el) el.scrollIntoView({ behavior: "smooth" });
                        }
                      }}
                      className="w-full py-4 bg-[#D46F4D] text-white rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-slate-900 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
                    >
                      Inquire for this Safari <ArrowRight size={16} />
                    </button>
                    <p className="text-[11px] text-stone-400 text-center font-light">
                      Official photography from Black Eagle Tours & Safaris
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
