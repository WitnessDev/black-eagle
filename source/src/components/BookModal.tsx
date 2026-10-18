import { X, ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

interface BookModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const fieldNotes = [
  {
    image: "/images/hero-lions-tree.jpg",
    title: "Wild encounters",
    copy: "A private safari moves at the rhythm of the landscape, leaving room for the moments that do not fit a schedule.",
    alt: "Lions resting in a tree",
  },
  {
    image: "/images/ngorongoro-crater.jpg",
    title: "Ngorongoro horizons",
    copy: "Crater World and Sunrise on the Rim are designed around the highlands, rim walks and the crater floor.",
    alt: "View across the Ngorongoro Crater",
  },
  {
    image: "/images/elephant-portrait.jpg",
    title: "Thoughtful journeys",
    copy: "Choose from the published itineraries, then send an enquiry so the Black Eagle team can shape the practical details with you.",
    alt: "Close portrait of an African elephant",
  },
];

export const BookModal = ({ isOpen, onClose }: BookModalProps) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] overflow-y-auto bg-[#14251E]/95 p-4 md:p-10"
        role="dialog"
        aria-modal="true"
        aria-label="Black Eagle field notes"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex items-center justify-between text-white">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#C5A46D]">Black Eagle field notes</p>
              <h2 className="font-playfair text-3xl md:text-5xl">A quieter way to begin.</h2>
            </div>
            <button onClick={onClose} className="rounded-full border border-white/30 p-3 hover:bg-white hover:text-[#14251E]" aria-label="Close field notes">
              <X size={22} />
            </button>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {fieldNotes.map((note) => (
              <article key={note.title} className="overflow-hidden rounded-2xl bg-[#F6F2E8]">
                <img src={note.image} alt={note.alt} className="h-64 w-full object-cover" />
                <div className="p-7">
                  <h3 className="mb-3 font-playfair text-2xl text-[#14251E]">{note.title}</h3>
                  <p className="text-sm leading-7 text-[#20372D]/75">{note.copy}</p>
                </div>
              </article>
            ))}
          </div>
          <button onClick={onClose} className="mt-10 inline-flex items-center gap-3 rounded-full bg-[#B96B4D] px-7 py-4 text-xs font-bold uppercase tracking-[0.16em] text-white hover:bg-[#C5A46D]">
            Explore the itineraries <ArrowUpRight size={16} />
          </button>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);
