import React, { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  MapPin,
  Instagram,
  Facebook,
  Twitter,
  Star,
  ChevronRight,
  Users,
  ArrowRight,
  BookOpen,
  Footprints,
  Globe2,
  ShieldCheck,
  Camera,
  MoveRight,
  Mountain,
  CreditCard,
  Globe,
  Eye,
  Target,
  Mail,
} from "lucide-react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { Reveal } from "./components/Reveal";
import { BookModal } from "./components/BookModal";
import { PricingCard } from "./components/PricingCard";
import { LuxuryCard } from "./components/LuxuryCard";
import { translations, Language } from "./translations";
import { SafariDetails } from "./components/SafariDetails";
import { itineraries } from "./data/itineraries";
import { translatedItineraries } from "./data/translatedItineraries";

export default function App() {
  const [lang, setLang] = useState<Language>("en");
  const t = translations[lang];

  // Derive translated itineraries based on current language
  const currentItineraries =
    lang === "en"
      ? itineraries
      : itineraries.map((it) => ({
          ...it,
          ...(translatedItineraries[lang]?.[it.id] ?? {}),
          image: it.image,
        }));
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [hasPopupShown, setHasPopupShown] = useState(false);
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [selectedSafariId, setSelectedSafariId] = useState<string | null>(null);
  const [bookingTrip, setBookingTrip] = useState<string>("");
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent">(
    "idle",
  );
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoInView = useInView(videoRef, { amount: 0.1 });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const attemptPlay = async () => {
      try {
        video.muted = true;
        video.defaultMuted = true;
        await video.play();
      } catch (err) {
        console.log("Autoplay failed:", err);
      }
    };

    if (videoInView) {
      attemptPlay();
    }
  }, [videoInView]);

  useEffect(() => {
    const playVideo = async () => {
      if (videoRef.current) {
        try {
          videoRef.current.muted = true;
          videoRef.current.defaultMuted = true;
          await videoRef.current.load();
          await videoRef.current.play();
        } catch (error) {
          console.log("Autoplay was prevented:", error);
          // Fallback: try playing again on first user interaction if needed
          const handleFirstTouch = () => {
            videoRef.current?.play();
            window.removeEventListener("touchstart", handleFirstTouch);
            window.removeEventListener("mousedown", handleFirstTouch);
          };
          window.addEventListener("touchstart", handleFirstTouch);
          window.addEventListener("mousedown", handleFirstTouch);
        }
      }
    };
    playVideo();
  }, []);

  // Ensure video loops and plays on MacBook/Safari
  const handleVideoEnded = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch((e) => console.log("Loop play failed:", e));
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      if (window.scrollY > 1500 && !hasPopupShown) {
        setShowPopup(true);
        setHasPopupShown(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    const timer = setTimeout(() => setLoading(false), 2200);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, [hasPopupShown]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="font-sans text-slate-800 bg-[#F4F0E6] min-h-screen selection:bg-[#D46F4D] selection:text-white relative">
      {/* Background Paws */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[20%] left-[10%]">
          <Footprints
            className="paw-print rotate-[30deg]"
            style={{ animationDelay: "0s" }}
          />
        </div>
        <div className="absolute top-[25%] left-[15%]">
          <Footprints
            className="paw-print rotate-[30deg]"
            style={{ animationDelay: "1s" }}
          />
        </div>
        <div className="absolute top-[30%] left-[20%]">
          <Footprints
            className="paw-print rotate-[30deg]"
            style={{ animationDelay: "2s" }}
          />
        </div>
        <div className="absolute bottom-[20%] right-[10%]">
          <Footprints
            className="paw-print rotate-[-30deg]"
            style={{ animationDelay: "1.5s" }}
          />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03]">
          <Footprints size={400} />
        </div>
      </div>

      <BookModal isOpen={isBookOpen} onClose={() => setIsBookOpen(false)} />

      {/* Loading Screen */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="fixed inset-0 z-[100] bg-[#232B25] flex flex-col items-center justify-center"
          >
            <div className="text-center px-4">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex items-center justify-center mb-6"
              >
                <img
                  src="https://i.ibb.co/C5rs71sC/image0-removebg-preview.png"
                  alt="Black Eagle Logo"
                  className="w-32 h-32 md:w-48 md:h-48 object-contain"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
              <h1 className="text-5xl md:text-8xl font-playfair text-white font-bold tracking-tighter mb-2">
                Black Eagle<span className="text-[#D46F4D]">.</span>
              </h1>
              <p className="text-[#D46F4D] text-xs md:text-sm tracking-[0.4em] uppercase font-light mt-4">
                {t.hero.subtitle}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Engagement Pop-Up */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[60] w-[90%] md:w-auto md:max-w-sm"
          >
            <div className="bg-[#232B25]/95 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-[#D46F4D]/30 relative overflow-hidden">
              <button
                onClick={() => setShowPopup(false)}
                className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
              <h4 className="text-2xl font-playfair text-white mb-2">
                {t.booking.enquireNow}?
              </h4>
              <p className="text-gray-300 text-sm mb-6 font-light leading-relaxed">
                {t.booking.message}
              </p>
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => scrollToSection("booking")}
                  className="w-full bg-[#D46F4D] text-white py-3.5 text-xs font-bold uppercase tracking-widest rounded-full hover:bg-white hover:text-[#232B25] transition-all duration-300 shadow-lg"
                >
                  {t.booking.btn}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <AnimatePresence>
        {!selectedSafariId && (
          <motion.nav 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed w-full z-50 top-0 pt-6 px-4 md:px-0 pointer-events-none"
          >
            <div
              className={`container mx-auto px-6 py-3 rounded-full flex justify-between items-center transition-all duration-500 pointer-events-auto ${scrolled ? "glass-nav-pill max-w-6xl" : "bg-transparent max-w-7xl"}`}
            >
              <div
                className="flex items-center gap-3 cursor-pointer group"
                onClick={() => {
                  setSelectedSafariId(null);
                  scrollToSection("home");
                }}
              >
                <img
                  src="https://i.ibb.co/C5rs71sC/image0-removebg-preview.png"
                  alt="Logo"
                  className={`w-10 h-10 object-contain transition-all duration-300 ${scrolled ? "brightness-100" : "brightness-0 invert"}`}
                  referrerPolicy="no-referrer"
                />
                <span
                  className={`text-xl md:text-2xl font-playfair font-bold tracking-tight transition-colors duration-300 ${scrolled ? "text-slate-900" : "text-white"}`}
                >
                  Black Eagle<span className="text-[#D46F4D]">.</span>
                </span>
              </div>

              <div
                className={`hidden lg:flex items-center space-x-8 text-xs tracking-[0.2em] font-medium uppercase ${scrolled ? "text-slate-800" : "text-white/90"}`}
              >
                <button
                  onClick={() => {
                    setSelectedSafariId(null);
                    scrollToSection("home");
                  }}
                  className="hover:text-[#D46F4D] transition-colors"
                >
                  {t.nav.home}
                </button>
                <button
                  onClick={() => {
                    setSelectedSafariId(null);
                    scrollToSection("about");
                  }}
                  className="hover:text-[#D46F4D] transition-colors"
                >
                  {t.nav.philosophy}
                </button>
                <button
                  onClick={() => {
                    setSelectedSafariId(null);
                    scrollToSection("tours");
                  }}
                  className="hover:text-[#D46F4D] transition-colors"
                >
                  {t.nav.packages}
                </button>
                <button
                  onClick={() => {
                    setSelectedSafariId(null);
                    scrollToSection("tours");
                  }}
                  className="hover:text-[#D46F4D] transition-colors"
                >
                  {t.nav.stories}
                </button>

                <div className="relative">
                  <button
                    onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-300 ${scrolled ? "border-slate-200 hover:border-[#D46F4D]" : "border-white/20 hover:border-white"}`}
                  >
                    <img
                      src={`https://flagcdn.com/w20/${lang === "en" ? "gb" : lang === "zh" ? "cn" : lang}.png`}
                      alt={lang}
                      className="w-4 h-auto rounded-sm"
                    />
                    <span className="uppercase">{lang}</span>
                  </button>
                  <AnimatePresence>
                    {isLangMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden py-2 min-w-[140px]"
                      >
                        {(["en", "zh", "de", "es", "fr", "it"] as Language[]).map(
                          (l) => (
                            <button
                              key={l}
                              onClick={() => {
                                setLang(l);
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
                  onClick={() => scrollToSection("booking")}
                  className={`px-6 py-2.5 rounded-full btn-modern shadow-lg ${scrolled ? "bg-[#232B25] text-white hover:bg-[#D46F4D]" : "bg-[#D46F4D] text-white hover:bg-white hover:text-slate-900"}`}
                >
                  {t.nav.inquire}
                </button>
              </div>

              <div className="lg:hidden pointer-events-auto">
                <button
                  onClick={toggleMenu}
                  className={`${scrolled ? "text-slate-900" : "text-white"}`}
                >
                  <Menu size={24} />
                </button>
              </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, x: "100%" }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: "100%" }}
                  className="fixed inset-0 bg-[#F4F0E6] z-[60] flex flex-col justify-center items-center pointer-events-auto"
                >
                  <button
                    onClick={toggleMenu}
                    className="absolute top-8 right-8 text-slate-900"
                  >
                    <X size={32} />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedSafariId(null);
                      scrollToSection("home");
                    }}
                    className="text-4xl font-playfair mb-6"
                  >
                    {t.nav.home}
                  </button>
                  <button
                    onClick={() => {
                      setSelectedSafariId(null);
                      scrollToSection("about");
                    }}
                    className="text-4xl font-playfair mb-6"
                  >
                    {t.nav.philosophy}
                  </button>
                  <button
                    onClick={() => {
                      setSelectedSafariId(null);
                      scrollToSection("tours");
                    }}
                    className="text-4xl font-playfair mb-6"
                  >
                    {t.nav.packages}
                  </button>
                  <button
                    onClick={() => {
                      setSelectedSafariId(null);
                      scrollToSection("tours");
                    }}
                    className="text-4xl font-playfair mb-6"
                  >
                    {t.nav.stories}
                  </button>

                  <div className="flex flex-wrap justify-center gap-4 mb-8 px-6">
                    {(["en", "zh", "de", "es", "fr", "it"] as Language[]).map(
                      (l) => (
                        <button
                          key={l}
                          onClick={() => {
                            setLang(l);
                            setIsMenuOpen(false);
                          }}
                          className={`px-4 py-2 rounded-full border border-slate-200 text-xs uppercase tracking-widest flex items-center gap-2 ${lang === l ? "bg-[#D46F4D] border-[#D46F4D] text-white" : "text-slate-400"}`}
                        >
                          <img
                            src={`https://flagcdn.com/w20/${l === "en" ? "gb" : l === "zh" ? "cn" : l}.png`}
                            alt={l}
                            className="w-4 h-auto rounded-sm"
                          />
                          <span>{l}</span>
                        </button>
                      ),
                    )}
                  </div>

                  <button
                    onClick={() => scrollToSection("booking")}
                    className="mt-8 px-10 py-4 bg-[#232B25] text-white text-lg rounded-full font-medium shadow-xl"
                  >
                    {t.nav.inquire}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.nav>
        )}
      </AnimatePresence>

      {selectedSafariId ? (
        <SafariDetails
          safari={currentItineraries.find((i) => i.id === selectedSafariId)}
          t={(t as any).safariDetails}
          lang={lang}
          onLanguageChange={setLang}
          onBack={() => {
            setTimeout(
              () =>
                window.scrollTo(
                  0,
                  document.getElementById("tours")?.offsetTop || 0,
                ),
              100,
            );
            setSelectedSafariId(null);
          }}
          onBook={() => {
            const saf = currentItineraries.find((i) => i.id === selectedSafariId);
            if (saf) {
              setBookingTrip(saf.title);
            }
            setSelectedSafariId(null);
            setTimeout(() => {
              const element = document.getElementById("booking");
              if (element) {
                element.scrollIntoView({ behavior: "smooth" });
              }
            }, 100);
          }}
        />
      ) : (
        <>
          {/* Hero Section */}
          <header
            id="home"
            className="relative h-screen flex items-center justify-center overflow-hidden"
          >
            <div className="absolute inset-0 z-0 bg-black">
              <img
                src="/images/hero-lions-tree.jpg"
                alt="Lions resting in a tree"
                className="w-full h-full object-cover opacity-80 animate-slow-zoom"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#F4F0E6]"></div>
            </div>
            <div className="relative z-10 container mx-auto px-4 text-center mt-20">
              <Reveal>
                <span className="inline-block py-1.5 px-5 border border-white/20 rounded-full text-white/90 text-[10px] md:text-xs tracking-[0.3em] uppercase mb-8 backdrop-blur-md">
                  {t.hero.subtitle}
                </span>
                <h1 className="text-5xl md:text-8xl lg:text-9xl font-playfair font-medium text-white mb-8 leading-[1.1] tracking-tight">
                  {t.hero.title.split("The Ordinary")[0]} <br />{" "}
                  <span className="italic text-shimmer">
                    {t.hero.title.split("The Ordinary")[1] || "The Ordinary"}
                  </span>
                </h1>
                <p className="text-gray-200 text-sm md:text-lg font-light max-w-2xl mx-auto mb-12 leading-relaxed tracking-wide px-4">
                  {t.hero.desc}
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                  <button
                    onClick={() => setIsBookOpen(true)}
                    className="group w-full sm:w-auto px-10 py-4 bg-[#D46F4D] text-white rounded-full btn-modern shadow-xl flex items-center justify-center gap-3"
                  >
                    <BookOpen size={16} />{" "}
                    <span className="font-bold tracking-widest uppercase text-xs">
                      {t.hero.journalBtn}
                    </span>
                  </button>
                  <button
                    onClick={() => scrollToSection("booking")}
                    className="group w-full sm:w-auto px-10 py-4 border border-white/30 text-white rounded-full hover:bg-white hover:text-slate-900 transition-all duration-500 font-bold text-xs tracking-widest uppercase backdrop-blur-sm"
                  >
                    {t.hero.customizeBtn}
                  </button>
                </div>
              </Reveal>
            </div>
          </header>

          {/* Philosophy Section */}
          <section
            id="philosophy"
            className="py-24 md:py-32 container mx-auto px-4 md:px-12"
          >
            <Reveal>
              <div className="flex flex-col md:flex-row items-center gap-16 md:gap-32">
                <div className="md:w-1/2 relative group">
                  <div className="absolute top-0 left-0 w-full h-full bg-[#D46F4D] rounded-tr-[100px] rounded-bl-[100px] opacity-10 transform translate-x-4 translate-y-4 group-hover:translate-x-6 group-hover:translate-y-6 transition-transform duration-700"></div>
                  <div className="rounded-tr-[100px] rounded-bl-[100px] shadow-2xl relative z-10 w-full overflow-hidden h-[450px] md:h-[600px] bg-slate-900 cursor-pointer">
                    <video
                      ref={videoRef}
                      autoPlay
                      muted
                      playsInline
                      preload="auto"
                      className="w-full h-full object-cover"
                      poster="/images/elephants-herd.jpg"
                      onEnded={handleVideoEnded}
                      onClick={(e) => {
                        const video = e.currentTarget;
                        if (video.paused) {
                          video.play();
                        } else {
                          video.pause();
                        }
                      }}
                    >
                      <source
                        src="https://ik.imagekit.io/gb9ljvgtr/VID-20260328-WA0031.mp4"
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>

                <div className="md:w-1/2 text-left">
                  <span className="text-[#D46F4D] text-xs font-bold tracking-[0.3em] uppercase mb-4 block">
                    {t.about.subtitle}
                  </span>
                  <h2 className="text-4xl md:text-6xl font-playfair text-slate-900 mb-8 leading-[1.1]">
                    {t.about.title.split("Meets")[0]}{" "}
                    <span className="italic text-gray-400 font-normal">
                      Meets
                    </span>{" "}
                    <br /> {t.about.title.split("Meets")[1]}
                  </h2>
                  <p className="text-gray-600 text-lg leading-relaxed mb-8 font-light">
                    {t.about.desc}
                  </p>
                  <div
                    className="flex items-center gap-4 group cursor-pointer"
                    onClick={() => scrollToSection("tours")}
                  >
                    <div className="w-12 h-12 rounded-full border border-[#D46F4D] flex items-center justify-center text-[#D46F4D] group-hover:bg-[#D46F4D] group-hover:text-white transition-all">
                      <ArrowRight size={20} />
                    </div>
                    <span className="font-playfair italic text-xl text-slate-800">
                      {t.about.welcome}
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          </section>

          {/* About Us, Vision, Mission Section */}
          <section id="about" className="py-24 bg-slate-50">
            <div className="container mx-auto px-4 md:px-12">
              <Reveal>
                <div className="max-w-4xl mx-auto text-center mb-20">
                  <span className="text-[#D46F4D] text-xs font-bold tracking-[0.3em] uppercase mb-4 block">
                    {t.aboutUs.title}
                  </span>
                  <h2 className="text-4xl md:text-5xl font-playfair text-slate-900 mb-8">
                    {t.aboutUs.title}
                  </h2>
                  <p className="text-gray-600 text-lg leading-relaxed font-light">
                    {t.aboutUs.content}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-500">
                    <div className="w-12 h-12 bg-[#D46F4D]/10 rounded-2xl flex items-center justify-center text-[#D46F4D] mb-6">
                      <Eye size={24} />
                    </div>
                    <h3 className="text-2xl font-playfair text-slate-900 mb-4">
                      {t.aboutUs.visionTitle}
                    </h3>
                    <p className="text-gray-600 leading-relaxed font-light">
                      {t.aboutUs.visionContent}
                    </p>
                  </div>

                  <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-500">
                    <div className="w-12 h-12 bg-[#D46F4D]/10 rounded-2xl flex items-center justify-center text-[#D46F4D] mb-6">
                      <Target size={24} />
                    </div>
                    <h3 className="text-2xl font-playfair text-slate-900 mb-4">
                      {t.aboutUs.missionTitle}
                    </h3>
                    <p className="text-gray-600 leading-relaxed font-light">
                      {t.aboutUs.missionContent}
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>

          {/* Journal Teaser */}
          <section className="py-24 bg-[#232B25] relative overflow-hidden">
            <Reveal>
              <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col md:flex-row items-center gap-16 justify-center">
                <div className="text-center md:text-left text-white max-w-lg">
                  <span className="text-[#D46F4D] text-xs font-bold tracking-[0.3em] uppercase mb-4 block">
                    {t.journal.subtitle}
                  </span>
                  <h2 className="text-4xl md:text-5xl font-playfair mb-6">
                    {t.journal.title}
                  </h2>
                  <p className="text-gray-400 mb-8 leading-relaxed">
                    {t.journal.desc}
                  </p>
                  <button
                    onClick={() => setIsBookOpen(true)}
                    className="px-8 py-3 rounded-full bg-[#D46F4D] text-white hover:bg-white hover:text-[#232B25] transition-all text-xs font-bold tracking-widest uppercase flex items-center gap-3 w-fit mx-auto md:mx-0"
                  >
                    {t.journal.btn} <BookOpen size={16} />
                  </button>
                </div>
                <div
                  className="floating-book-container group cursor-pointer"
                  onClick={() => setIsBookOpen(true)}
                >
                  <div className="floating-book w-[220px] h-[320px] flex items-center justify-center border-l-4 border-[#D46F4D]">
                    <div className="text-center p-6 border border-[#D46F4D]/30 h-[90%] w-[90%] flex flex-col justify-between">
                      <span className="text-[#D46F4D] text-[8px] tracking-[0.3em] uppercase">
                        {t.journalBook.volume}
                      </span>
                      <div>
                        <h3 className="text-3xl font-playfair text-white mb-1">
                          {t.journalBook.title1}
                        </h3>
                        <h3 className="text-3xl font-playfair text-white">
                          {t.journalBook.title2}
                        </h3>
                      </div>
                      <span className="text-white/40 text-[8px] tracking-widest">
                        {t.journalBook.edition}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </section>

          {/* Curated Collections */}
          <section className="py-24 md:py-32 bg-white">
            <div className="container mx-auto px-4 md:px-6">
              <Reveal>
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                  <div>
                    <span className="text-[#D46F4D] text-xs font-bold tracking-[0.2em] uppercase mb-3 block">
                      {t.curated.subtitle}
                    </span>
                    <h2 className="text-4xl md:text-6xl font-playfair text-slate-900">
                      {t.curated.title}
                    </h2>
                  </div>
                  <button
                    onClick={() => scrollToSection("booking")}
                    className="group flex items-center gap-3 text-sm font-bold tracking-widest uppercase hover:text-[#D46F4D] transition-colors pb-1 border-b border-gray-200 hover:border-[#D46F4D]"
                  >
                    {t.curated.planBtn}{" "}
                    <MoveRight
                      size={18}
                      className="group-hover:translate-x-2 transition-transform duration-300"
                    />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <LuxuryCard
                    image="/images/elephant-portrait.jpg"
                    title={t.curated.wildlife.title}
                    subtitle={t.curated.wildlife.subtitle}
                    desc={t.curated.wildlife.desc}
                  />
                  <LuxuryCard
                    image="/images/giraffes.jpg"
                    title={t.curated.mountain.title}
                    subtitle={t.curated.mountain.subtitle}
                    desc={t.curated.mountain.desc}
                  />
                  <LuxuryCard
                    image="/images/hero-lions-tree.jpg"
                    title={t.curated.beach.title}
                    subtitle={t.curated.beach.subtitle}
                    desc={t.curated.beach.desc}
                  />
                </div>
              </Reveal>
            </div>
          </section>

          {/* Pricing Section */}
          <section id="tours" className="py-24 md:py-32 bg-[#F4F0E6]">
            <div className="container mx-auto px-4 md:px-6">
              <Reveal>
                <div className="text-center max-w-3xl mx-auto mb-20">
                  <span className="text-[#D46F4D] text-xs font-bold tracking-[0.2em] uppercase mb-4 block">
                    {t.tours.subtitle}
                  </span>
                  <h2 className="text-4xl md:text-6xl font-playfair text-slate-900 mb-6">
                    {t.tours.title}
                  </h2>
                  <p className="text-gray-500 font-light text-lg">
                    {t.tours.desc}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {currentItineraries.map((itinerary) => (
                    <PricingCard
                      key={itinerary.id}
                      image={itinerary.image}
                      days={itinerary.days}
                      title={itinerary.title}
                      location={itinerary.location}
                      price={itinerary.price}
                      onBook={() => setSelectedSafariId(itinerary.id)}
                      startingFromLabel={t.tours.startingFrom}
                    />
                  ))}
                </div>
              </Reveal>
            </div>
          </section>

          {/* Features */}
          <section className="py-24 md:py-32 bg-[#232B25] text-white relative overflow-hidden rounded-[40px] mx-4 md:mx-10">
            <div className="container mx-auto px-6 relative z-10">
              <Reveal>
                <div className="flex flex-col md:flex-row gap-20">
                  <div className="md:w-1/3">
                    <span className="text-[#D46F4D] text-xs font-bold tracking-[0.2em] uppercase mb-6 block">
                      {t.features.subtitle}
                    </span>
                    <h2 className="text-4xl md:text-6xl font-playfair font-medium mb-8 leading-tight">
                      {t.features.title.split("Excellence")[0]} <br />{" "}
                      <span className="italic text-[#D46F4D]">
                        {t.features.title.split("Excellence")[1] ||
                          "Excellence"}
                      </span>
                    </h2>
                    <button
                      onClick={() => scrollToSection("booking")}
                      className="px-8 py-3 rounded-full border border-white/20 text-white hover:bg-[#D46F4D] hover:border-[#D46F4D] transition-all duration-300 text-xs font-bold tracking-widest uppercase"
                    >
                      {t.features.planBtn}
                    </button>
                  </div>
                  <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-16">
                    <div className="flex gap-6">
                      <ShieldCheck
                        className="text-[#D46F4D] shrink-0"
                        size={36}
                      />
                      <div>
                        <h3 className="text-lg font-playfair text-white mb-3">
                          {t.features.safe.title}
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed font-light">
                          {t.features.safe.desc}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-6">
                      <Globe2 className="text-[#D46F4D] shrink-0" size={36} />
                      <div>
                        <h3 className="text-lg font-playfair text-white mb-3">
                          {t.features.experts.title}
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed font-light">
                          {t.features.experts.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>

          {/* Booking Form */}
          <section
            id="booking"
            className="relative py-24 md:py-32 bg-fixed bg-cover bg-center"
            style={{
              backgroundImage:
                "url('/images/elephants-herd.jpg')",
            }}
          >
            <div className="absolute inset-0 bg-[#232B25]/80"></div>
            <div className="relative z-10 container mx-auto px-4 md:px-6">
              <Reveal>
                <div className="flex flex-col lg:flex-row gap-16 md:gap-32 items-start">
                  <div className="lg:w-1/2 text-white pt-6 md:pt-10">
                    <span className="inline-block py-1.5 px-4 border border-[#D46F4D] rounded-full text-[#D46F4D] text-xs tracking-[0.2em] uppercase mb-8 backdrop-blur-sm">
                      {t.booking.subtitle}
                    </span>
                    <h2 className="text-4xl md:text-7xl font-playfair font-bold mb-8 leading-tight">
                      {t.booking.title.split("Perfect")[0]} <br />{" "}
                      <span className="italic text-[#D46F4D]">
                        {t.booking.title.split("Perfect")[1] || "Perfect"}
                      </span>{" "}
                      {t.booking.title.split("Perfect")[2] || "Escape"}
                    </h2>
                    <a
                      href="https://wa.me/255717513326"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-6 text-2xl md:text-4xl font-playfair font-bold text-white border-t border-white/10 pt-10 hover:text-[#D46F4D] transition-colors"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        width="32"
                        height="32"
                        fill="currentColor"
                        className="text-[#D46F4D]"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      <span>+255 717 513 326</span>
                    </a>
                  </div>
                  <div className="lg:w-1/2 w-full">
                    <div className="glass-form p-8 md:p-12 rounded-3xl shadow-2xl">
                      <h3 className="text-3xl font-playfair text-white mb-8">
                        {t.booking.enquireNow}
                      </h3>
                      <form
                        className="space-y-6"
                        onSubmit={async (e) => {
                          e.preventDefault();
                          setFormStatus("sending");
                          const formData = new FormData(e.currentTarget);
                          const name = formData.get("name");
                          const email = formData.get("email");
                          const date = formData.get("date");
                          const trip = formData.get("trip");
                          const message = formData.get("message");

                          try {
                            const fetchUrl = "/api/send-email";
                            console.log(
                              "Fetching:",
                              `${window.location.origin}${fetchUrl}`,
                            );
                            const response = await fetch(fetchUrl, {
                              method: "POST",
                              headers: {
                                "Content-Type": "application/json",
                              },
                              body: JSON.stringify({
                                name,
                                email,
                                date,
                                trip,
                                message,
                              }),
                            });

                            if (response.ok) {
                              setFormStatus("sent");
                              // Reset after 5 seconds
                              setTimeout(() => setFormStatus("idle"), 5000);
                            } else {
                              const contentType =
                                response.headers.get("content-type");
                              if (
                                contentType &&
                                contentType.includes("application/json")
                              ) {
                                const errorData = await response.json();
                                throw new Error(
                                  errorData.error || "Failed to send email",
                                );
                              } else {
                                const text = await response.text();
                                console.error("Non-JSON error response:", text);
                                throw new Error(
                                  `Server error (${response.status}) at ${window.location.origin}/api/send-email. The backend might not be running correctly on your host.`,
                                );
                              }
                            }
                          } catch (error) {
                            console.error("Error sending email:", error);
                            setFormStatus("idle");
                            const errorMessage =
                              error instanceof Error
                                ? error.message
                                : "Failed to send message. Please try again later.";
                            alert(errorMessage);
                          }
                        }}
                      >
                        <input
                          name="name"
                          type="text"
                          required
                          placeholder={t.booking.name}
                          className="w-full bg-white/5 border border-white/10 rounded-full py-4 px-8 text-white placeholder-gray-400 focus:outline-none focus:border-[#D46F4D] focus:bg-white/10 transition-all"
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <input
                            name="email"
                            type="email"
                            required
                            placeholder={t.booking.email}
                            className="w-full bg-white/5 border border-white/10 rounded-full py-4 px-8 text-white placeholder-gray-400 focus:outline-none focus:border-[#D46F4D] focus:bg-white/10 transition-all"
                          />
                          <div className="relative">
                            <input
                              name="date"
                              type="date"
                              required
                              className="w-full bg-white/5 border border-white/10 rounded-full py-4 px-8 text-white focus:outline-none focus:border-[#D46F4D] focus:bg-white/10 transition-all appearance-none"
                            />
                            <span className="absolute left-8 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xs uppercase tracking-widest">
                              {/* This is a hack to show a placeholder for date input */}
                            </span>
                          </div>
                        </div>
                        <select
                          name="trip"
                          required
                          value={bookingTrip}
                          onChange={(e) => setBookingTrip(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-full py-4 px-8 text-white focus:outline-none focus:border-[#D46F4D] focus:bg-white/10 transition-all appearance-none cursor-pointer"
                        >
                          <option value="" disabled className="bg-[#232B25]">
                            {t.booking.tripType}
                          </option>
                          <optgroup label="Popular Safari Itineraries">
                            {itineraries.map((it) => (
                              <option key={it.id} value={it.title} className="bg-[#232B25]">
                                {it.title}
                              </option>
                            ))}
                          </optgroup>
                          <optgroup label="Other Trips">
                            <option
                              value="Wildlife Safari"
                              className="bg-[#232B25]"
                            >
                              {t.booking.trips.wildlife}
                            </option>
                            <option
                              value="Mountain Climbing"
                              className="bg-[#232B25]"
                            >
                              {t.booking.trips.mountain}
                            </option>
                            <option
                              value="Beach Holiday"
                              className="bg-[#232B25]"
                            >
                              {t.booking.trips.beach}
                            </option>
                            <option
                              value="Cultural Tour"
                              className="bg-[#232B25]"
                            >
                              {t.booking.trips.cultural}
                            </option>
                            <option
                              value="Other Adventure"
                              className="bg-[#232B25]"
                            >
                              {t.booking.trips.other}
                            </option>
                          </optgroup>
                        </select>
                        <textarea
                          name="message"
                          required
                          rows={4}
                          placeholder={t.booking.message}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-8 text-white placeholder-gray-400 focus:outline-none focus:border-[#D46F4D] focus:bg-white/10 transition-all resize-none"
                        ></textarea>

                        <AnimatePresence mode="wait">
                          {formStatus === "sent" ? (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="bg-green-500/20 border border-green-500/50 text-green-400 p-4 rounded-2xl text-center text-sm"
                            >
                              Thank you! Your request has been sent
                              successfully.
                            </motion.div>
                          ) : (
                            <button
                              type="submit"
                              disabled={formStatus === "sending"}
                              className="w-full bg-[#D46F4D] text-white font-bold py-4 rounded-full hover:bg-white hover:text-[#232B25] transition-all uppercase tracking-[0.2em] shadow-xl btn-modern mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {formStatus === "sending"
                                ? "Sending..."
                                : t.booking.btn}
                            </button>
                          )}
                        </AnimatePresence>
                      </form>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>
        </>
      )}

      {/* Footer */}
      <footer className="bg-[#232B25] text-white/80 pt-24 pb-10 border-t border-white/10 font-light text-sm">
        {/* WhatsApp Floating Button */}
        <a
          href="https://wa.me/255717513326"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 left-6 z-[60] bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center justify-center group"
          title="Chat on WhatsApp"
        >
          <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-500 whitespace-nowrap text-xs font-bold uppercase tracking-widest">
            Chat with us
          </span>
        </a>
        <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-16 mb-20">
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <img
                src="https://i.ibb.co/C5rs71sC/image0-removebg-preview.png"
                alt="Black Eagle Logo"
                className="w-16 h-16 object-contain"
                referrerPolicy="no-referrer"
              />
              <span className="text-3xl font-playfair font-bold text-white">
                Black Eagle<span className="text-[#D46F4D]">.</span>
              </span>
            </div>
            <p className="leading-relaxed opacity-70 text-base">
              {t.footer.desc}
            </p>
            <div className="pt-6 border-t border-white/10">
              <div className="flex items-center gap-3 text-[#D46F4D] mb-4">
                <CreditCard size={18} />
                <span className="text-xs font-bold tracking-widest uppercase">
                  {t.footer.accept}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-white/5 px-4 py-2 rounded-full border border-white/10 flex items-center justify-center">
                  <span className="text-white font-bold italic tracking-tighter text-lg">
                    VISA
                  </span>
                </div>
                <div className="bg-white/5 px-4 py-2 rounded-full border border-white/10 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    MasterCard
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-playfair text-xl text-white mb-8">
              {t.footer.discover}
            </h4>
            <ul className="space-y-4 opacity-70">
              <li>
                <button
                  onClick={() => scrollToSection("about")}
                  className="hover:text-[#D46F4D] transition-colors text-base"
                >
                  {t.footer.story}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("tours")}
                  className="hover:text-[#D46F4D] transition-colors text-base"
                >
                  {t.footer.safaris}
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-playfair text-xl text-white mb-8">
              {t.footer.connect}
            </h4>
            <div className="space-y-4 mb-8 opacity-70 text-base">
              <div className="flex items-center gap-3">
                <MapPin size={18} className="text-[#D46F4D]" />
                <p>Arusha, Tanzania</p>
              </div>
              <div className="flex items-center gap-3">
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="currentColor"
                  className="text-[#D46F4D]"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <p>+255 717 513 326</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-[#D46F4D]" />
                <p>info@blackeagletour.com</p>
              </div>
            </div>
            <div className="flex items-center space-x-6 text-white">
              <a
                href="https://www.instagram.com/blackeagle.tour?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram
                  size={24}
                  className="hover:text-[#D46F4D] cursor-pointer"
                />
              </a>
              <Facebook
                size={24}
                className="hover:text-[#D46F4D] cursor-pointer"
              />
              <Twitter
                size={24}
                className="hover:text-[#D46F4D] cursor-pointer"
              />
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 md:px-6 border-t border-white/10 pt-10 text-center md:text-left opacity-50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>
            &copy; {new Date().getFullYear()} Black Eagle Tours & Safaris.{" "}
            {t.footer.rights}
          </p>
          <p className="text-xs">{t.footer.tagline}</p>
        </div>
      </footer>
    </div>
  );
}
