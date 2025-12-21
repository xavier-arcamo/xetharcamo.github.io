import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Character } from '../types';
import { Sword, BookOpen, Sparkles, Ghost, X } from 'lucide-react';

const characters: Character[] = [
  {
    id: '1',
    name: "Karl",
    title: "Exiled Squire",
    faction: "Independent - Red Queen, formerly",
    description: "A swordfighting savant even at the age of 12, Karl had a promising future under the Red Queen's employ. Forced by his queen to escape the disastrous Battle of Poutamos Plains, he travelled the continent as a mercenary and adventurer.",
    image: "https://picsum.photos/seed/kaelen/600/900?grayscale",
    stats: { strength: 65, intelligence: 35, magic: 0, cunning: 55 }
  },
  {
    id: '2',
    name: "Sif",
    title: "Black Inquisitor",
    faction: "Black Inquisitors",
    description: "A child of prophecy, Sif commands strange forces, which allowed her to quickly rise within the Black Inquisitors' ranks.",
    image: "https://thumbs2.imgbox.com/7d/ad/JikpTa1g_t.png",
    stats: { strength: 20, intelligence: 70, magic: 90, cunning: 60 }
  },
  {
    id: '3',
    name: "Gozmasteyin Anp Hepyll",
    title: "Mad Imperial Scientist",
    faction: "Vazheim",
    description: "Hailing from the distant land of Calamanth, sharp-witted and sharp-tongued Gozmasteyin became the first Imperial Scientist of Vazheim. Known for his lack of morals, unwavering pursuit of knowledge, and witty callousness.",
    image: "https://thumbs2.imgbox.com/83/af/dbpxJZ5O_t.png",
    stats: { strength: 5, intelligence: 100, magic: 80, cunning: 85 }
  },
  {
    id: '4',
    name: "Moschev of Moschev",
    title: "Commoner-turned-Merchant Mogul",
    faction: "Tomokkarrei",
    description: "Moschev was born to peasants in the North. Given a chance to manage the Bel-Novo Lumber Guild, he quickly became its owner and absorbed other Bel-Novan companies and guilds into his mercantile empire.",
    image: "https://thumbs2.imgbox.com/2d/c0/VLMRE3Of_t.png",
    stats: { strength: 25, intelligence: 50, magic: 0, cunning: 65 }
  },
  {
    id: '5',
    name: "Onfim the Confectioner",
    title: "Baker and Killer",
    faction: "Bel-Novo",
    description: "An unseeming baker with a mercenary past, Onfim is beloved by the adults and children of Tresk for his free sweets and breads.",
    image: "https://thumbs2.imgbox.com/7d/9c/H87WWF95_t.png",
    stats: { strength: 65, intelligence: 20, magic: 5, cunning: 60 }
  },
  {
    id: '6',
    name: "Asnelda Kirakios",
    title: "Heroine of Katreios",
    faction: "Independent",
    description: "Asnelda commands divine strength, allowing her to overpower most foes she encounters. Hailing from the muddy, rugged lands of Katreios, Asnelda now travels the world in search of adventure and coin.",
    image: "https://thumbs2.imgbox.com/de/71/RIh9z9H1_t.png",
    stats: { strength: 85, intelligence: 10, magic: 55, cunning: 30 }
  },
  {
    id: '7',
    name: "Gareth-Leon Dugarde",
    title: "Suave Bladecaller",
    faction: "Lavarre",
    description: "Second son to a noble House in Lavarre, Gareth-Leon enlisted in the Lavarran army after inheriting his family's second House Blade. Infamous for his wits, womanizing, and wanton laziness, he is not missed back at his House's ancestral seat of Dugarde Fort",
    image: "https://thumbs2.imgbox.com/b0/95/19RvlpW2_t.png",
    stats: { strength: 20, intelligence: 45, magic: 35, cunning: 65 }
  },
  {
    id: '8',
    name: "Isadora Void-Touched",
    title: "Oracle of the Deep",
    faction: "The Arcanum",
    description: "Blinded by a ritual gone wrong, Isadora sees only the flow of magic. She acts as a conduit for raw aether, capable of devastating bursts of power, though each use drains her life force.",
    image: "https://picsum.photos/seed/isadora/600/900",
    stats: { strength: 10, intelligence: 80, magic: 100, cunning: 30 }
  },
  {
    id: '9',
    name: "Malakar Ironhide",
    title: "Siege Breaker",
    faction: "Obsidian Empire",
    description: "A veteran of a hundred wars, Malakar's skin has been replaced by grafted iron plates. He is a walking tank, loyal only to the Emperor, and serves as the empire's ultimate weapon against magic users.",
    image: "https://picsum.photos/seed/malakar/600/900?grayscale",
    stats: { strength: 95, intelligence: 30, magic: 0, cunning: 20 }
  },
  {
    id: '10',
    name: "Yanna the Mender",
    title: "Spirit Guide",
    faction: "Sun-Kissed Tribes",
    description: "While others fight, Yanna heals. Using the ancient songs of her ancestors, she can knit flesh and soothe the spirit. She travels the battlefields, offering mercy to friend and foe alike.",
    image: "https://picsum.photos/seed/yanna/600/900",
    stats: { strength: 15, intelligence: 85, magic: 70, cunning: 40 }
  }
];

const Personages: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedChar = characters.find(c => c.id === selectedId);

  return (
    <div className="h-full w-full p-4 md:p-8 overflow-y-auto flex flex-col items-center bg-gradient-to-br from-vazheim-dark to-[#101014]">
       {/* Header - Fades out when selection is active to reduce clutter */}
       <div className={`text-center mb-10 transition-all duration-500 ${selectedId ? 'opacity-0 h-0 overflow-hidden mb-0' : 'opacity-100'}`}>
          <motion.h2 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-5xl font-serif text-vazheim-gold drop-shadow-lg"
          >
            Choose Your Legend
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 mt-2 font-serif italic"
          >
            Select a champion to view their chronicles
          </motion.p>
       </div>

       {/* Character Grid */}
       <div className="w-full max-w-7xl relative pb-20">
          <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 transition-all duration-500 ${selectedId ? 'opacity-0 pointer-events-none scale-95 blur-sm' : 'opacity-100 scale-100'}`}>
              {characters.map((char) => (
                <motion.div
                  layoutId={`card-container-${char.id}`}
                  key={char.id}
                  onClick={() => setSelectedId(char.id)}
                  whileHover={{ scale: 1.03, y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="cursor-pointer group relative aspect-[3/4] rounded-xl overflow-hidden border-2 border-white/5 bg-black/40 shadow-xl hover:border-vazheim-gold/50 transition-colors"
                >
                  <motion.img 
                    // Note: Removed layoutId from image to prevent warping/stretching during aspect ratio change.
                    // The container animates the bounds, the image just fills it.
                    src={char.image} 
                    alt={char.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
                  
                  <motion.div 
                    // Keeping layoutId on text elements can be nice, but sometimes distracting. Keeping for now.
                    layoutId={`card-info-${char.id}`}
                    className="absolute bottom-0 left-0 w-full p-4 md:p-6"
                  >
                     <p className="text-vazheim-gold text-[10px] md:text-xs uppercase tracking-[0.2em] mb-1 opacity-80">{char.faction}</p>
                     <h3 className="text-white font-serif text-lg md:text-2xl leading-none">{char.name}</h3>
                  </motion.div>
                  
                  {/* Hover Glow */}
                  <div className="absolute inset-0 bg-vazheim-gold/0 group-hover:bg-vazheim-gold/10 transition-all duration-300 pointer-events-none" />
                </motion.div>
              ))}
          </div>
       </div>

       {/* Detail Overlay Modal */}
       <AnimatePresence>
         {selectedId && selectedChar && (
           <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
              {/* Backdrop */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedId(null)}
                className="absolute inset-0 bg-black/90 backdrop-blur-md"
              />
              
              {/* Modal Card */}
              <motion.div 
                layoutId={`card-container-${selectedChar.id}`}
                className="w-full max-w-7xl h-[90vh] md:h-[95vh] bg-vazheim-dark border border-vazheim-gold/30 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] relative flex flex-col md:flex-row z-10"
              >
                  {/* Close Button */}
                  <motion.button 
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ delay: 0.3 }}
                    onClick={(e) => { e.stopPropagation(); setSelectedId(null); }}
                    className="absolute top-4 right-4 z-50 p-2 bg-black/60 hover:bg-red-900/90 rounded-full text-white border border-white/20 transition-colors backdrop-blur-sm"
                  >
                    <X size={24} />
                  </motion.button>

                  {/* Left Side: Image (Expanded to 50% width for better visibility) */}
                  <div className="w-full md:w-1/2 h-64 md:h-full relative overflow-hidden bg-black">
                     <motion.img 
                       // No layoutId here to avoid stretching.
                       initial={{ opacity: 0, scale: 1.1 }}
                       animate={{ opacity: 1, scale: 1 }}
                       transition={{ duration: 0.5 }}
                       src={selectedChar.image} 
                       alt={selectedChar.name} 
                       className="w-full h-full object-cover" 
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-vazheim-dark via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-vazheim-dark/20" />
                  </div>

                  {/* Right Side: Details */}
                  <div className="w-full md:w-1/2 relative flex flex-col bg-vazheim-dark/95 overflow-y-auto border-l border-white/5">
                      <div className="p-8 md:p-12 flex flex-col h-full">
                          <motion.div layoutId={`card-info-${selectedChar.id}`} className="mb-6">
                            <span className="text-vazheim-gold uppercase tracking-[0.2em] text-xs font-bold px-2 py-1 border border-vazheim-gold/30 rounded inline-block mb-3 bg-vazheim-gold/5">
                                {selectedChar.faction}
                            </span>
                            <h2 className="text-4xl md:text-6xl font-serif text-white mb-2">{selectedChar.name}</h2>
                            <p className="text-2xl text-gray-500 font-serif italic">{selectedChar.title}</p>
                          </motion.div>
                          
                          <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="space-y-8"
                          >
                            <div className="h-px w-full bg-gradient-to-r from-vazheim-gold/50 to-transparent" />
                            
                            <p className="text-gray-300 leading-relaxed text-lg font-light border-l-2 border-vazheim-gold/20 pl-6">
                              {selectedChar.description}
                            </p>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-black/30 p-6 rounded-xl border border-white/5 mt-auto">
                                <StatRow label="Strength" value={selectedChar.stats.strength} icon={<Sword size={18} className="text-red-500"/>} color="bg-red-600" />
                                <StatRow label="Intelligence" value={selectedChar.stats.intelligence} icon={<BookOpen size={18} className="text-white"/>} color="bg-gray-200" />
                                <StatRow label="Magic" value={selectedChar.stats.magic} icon={<Sparkles size={18} className="text-purple-500"/>} color="bg-purple-600" />
                                <StatRow label="Cunning" value={selectedChar.stats.cunning} icon={<Ghost size={18} className="text-green-500"/>} color="bg-green-600" />
                            </div>
                          </motion.div>
                      </div>
                  </div>
              </motion.div>
           </div>
         )}
       </AnimatePresence>
    </div>
  );
};

const StatRow = ({ label, value, icon, color }: { label: string, value: number, icon: React.ReactNode, color: string }) => (
  <div className="space-y-2">
    <div className="flex justify-between text-sm text-gray-400 font-sans tracking-wide">
      <div className="flex items-center gap-2">{icon} {label}</div>
      <span className="font-mono text-white">{value}</span>
    </div>
    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        whileInView={{ width: `${value}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
        className={`h-full ${color} shadow-[0_0_12px_currentColor]`}
      />
    </div>
  </div>
);

export default Personages;