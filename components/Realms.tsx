import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Realm } from '../types';
import { X, Crown, MapPin, Shield, Flag } from 'lucide-react';

const realms: Realm[] = [
  // --- Great Powers ---
  {
    id: 'vazheim',
    name: 'The Empire of Vazheim',
    category: 'Great Power',
    ruler: 'Emperor Erich II',
    capital: 'Vazheim',
    motto: 'Steel Bleeds, Stone Endures',
    description: 'A fortress nation carved into the northern mountains. They value strength above all and have waged a century-long war against wild magic, using anti-magic ore known as Null-Stone to craft their weapons and armor.',
    bannerColor: 'bg-violet-950',
    image: 'https://images2.imgbox.com/e1/9c/3cPwfvxl_o.png?q=80&w=1920&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1533613220913-267ac5042074?q=80&w=800&auto=format&fit=crop',
    subfactions: ['Prvzan Council', 'Marchlands', 'Imperial Prvza', 'Free City of Gouuden', 'Bel-Novo', 'Western Provinces'],
    orders: ['Black Inquisitors', 'White Inqusitors', 'Imperial Temple', 'Imperial School']
  },
  {
    id: 'lavarre',
    name: 'The Grand Kingdom of Lavarre',
    category: 'Great Power',
    ruler: 'King Jonas',
    capital: 'Stonetree',
    motto: 'We are the Flame',
    description: 'Nomadic wanderers of the endless dunes. They wield fire magic and tame giant scorpions, viewing the sun as a living god. Their culture is built on movement, trade, and the preservation of the Eternal Flame.',
    bannerColor: 'bg-rose-500',
    image: 'https://images2.imgbox.com/39/97/YdLOZE8K_o.png?q=80&w=1920&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1547234935-80c7142ee969?q=80&w=800&auto=format&fit=crop',
    subfactions: ['Soutiere', 'Gwyllts', 'Forresters', 'Mountain Governement'],
    orders: ['Bladecallers', 'Band of Northern Forresters', 'Hand of Soutiere', 'Malieres of the Crown']
  },
  {
    id: 'minglen',
    name: 'Minglen',
    category: 'Great Power',
    ruler: 'The Princes',
    capital: 'Minglen (Moves Annually)',
    motto: 'Knowledge is Power',
    description: 'A floating city held aloft by ancient crystals. It is a haven for mages and scholars, detached from the petty wars of the surface. They hoard knowledge and artifacts, believing themselves the guardians of reality.',
    bannerColor: 'bg-emerald-100',
    image: 'https://images.unsplash.com/photo-1533104677941-6156e507301c?q=80&w=1920&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1506466634563-3e0f4f9d023b?q=80&w=800&auto=format&fit=crop',
    subfactions: ['Crystal Court', 'Sky Weavers', 'The Grounded'],
    orders: ['Keepers of the Lens', 'Cloud Walkers', 'The Archivists']
  },

  // --- Minor Realms ---
  {
    id: 'katreios',
    name: 'Kingdom of Katreios',
    category: 'Minor Realm',
    ruler: 'The Grand Wisdom',
    capital: 'Katreios',
    motto: 'Honor and Wine',
    description: 'A lush, temperate kingdom known for its chivalry, vineyards, and constant political intrigue between noble houses. Their heavy cavalry is feared across the continent, though their borders are shrinking.',
    bannerColor: 'bg-blue-800',
    image: 'https://images.unsplash.com/photo-1599602446726-538699110d7a?q=80&w=1920&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1585543805890-6051f7829f98?q=80&w=800&auto=format&fit=crop',
    subfactions: ['None'],
    orders: ['Hero Order', 'Free Heroes']
  },
  {
    id: 'maliera',
    name: 'The Maliera',
    category: 'Minor Realm',
    ruler: 'None',
    capital: 'None',
    motto: 'Coin Flows Like Water',
    description: 'A neutral trading hub located in the bay of shadows. Everything is legal in Tresk for the right price. It is a melting pot of cultures, spies, and mercenaries.',
    bannerColor: 'bg-emerald-800',
    image: 'https://images.unsplash.com/photo-1559102432-849c716182c1?q=80&w=1920&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1565543950117-9c9883584852?q=80&w=800&auto=format&fit=crop',
    subfactions: ['The Golden Bank', 'Smugglers Ring'],
    orders: ['The Coin Guard', 'Sea Dogs']
  },
  {
    id: 'phintaprok',
    name: 'Princedom of Phintaprok',
    category: 'Minor Realm',
    ruler: 'High Prince Tyau',
    capital: 'Thamdaw',
    motto: 'Blood for the Earth',
    description: 'Barbarians of the western bogs. They reject metal armor for leather and bone, and are known for their terrifying berserker rage in battle.',
    bannerColor: 'bg-stone-700',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1916&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1448375240586-dfd8d395ea6c?q=80&w=800&auto=format&fit=crop',
    subfactions: ['Bog Walkers', 'Bone Carvers'],
    orders: ['Spirit Talkers']
  },

  // --- Other Factions ---
  {
    id: 'inquisitors',
    name: 'Black Inquisitors',
    category: 'Other Faction',
    ruler: 'High Inquisitor Malos',
    capital: 'The Silent Spire',
    motto: 'Purge the Unclean',
    description: 'A religious paramilitary order dedicated to hunting down necromancers and witches. They answer to no king, only to their strict interpretation of the "Pure Law".',
    bannerColor: 'bg-neutral-900',
    image: 'https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?q=80&w=1920&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1605806616949-1e87b487bc2a?q=80&w=800&auto=format&fit=crop',
    subfactions: ['The Torturers', 'The Seekers'],
    orders: ['Hunters of the Occult']
  },
  {
    id: 'necros',
    name: 'The Rotting Court',
    category: 'Other Faction',
    ruler: 'Lich Lord Azar',
    capital: 'Necropolis',
    motto: 'Death is a Door',
    description: 'A secret society of necromancers hiding within the Mistlands. They seek to unlock the secrets of immortality, regardless of the cost to the living.',
    bannerColor: 'bg-purple-950',
    image: 'https://images.unsplash.com/photo-1509557965875-b88c97052f0e?q=80&w=1920&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1519074002996-a69e7ac6e0d4?q=80&w=800&auto=format&fit=crop',
    subfactions: ['Flesh Crafters', 'Soul Binders'],
    orders: ['The Undying', 'Grave Wardens']
  }
];

const Realms: React.FC = () => {
  const [selectedRealmId, setSelectedRealmId] = useState<string | null>(null);
  const [hoveredRealmId, setHoveredRealmId] = useState<string | null>(null);

  const selectedRealm = realms.find(r => r.id === selectedRealmId);
  const hoveredRealm = realms.find(r => r.id === hoveredRealmId);

  // Group realms by category
  const categories = {
    'Great Powers': realms.filter(r => r.category === 'Great Power'),
    'Minor Realms': realms.filter(r => r.category === 'Minor Realm'),
    'Other Factions': realms.filter(r => r.category === 'Other Faction'),
  };

  return (
    <div className="relative w-full h-full bg-vazheim-dark overflow-hidden flex flex-col">
      
      {/* Background Image Layer - Reacts to Hover & Selection */}
      <div className="absolute inset-0 pointer-events-none z-0">
         <AnimatePresence mode="popLayout">
            {/* Base Background */}
            <motion.div className="absolute inset-0 bg-neutral-900" />
            
            {/* Logic: Selected Image (Blurred) takes priority over Hovered Image */}
            {selectedRealm ? (
               <motion.img
                 key={`bg-selected-${selectedRealm.id}`}
                 src={selectedRealm.image}
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 0.7, scale: 1.0, filter: "blur(3px)" }}
                 exit={{ opacity: 0 }}
                 transition={{ duration: 1 }}
                 className="absolute inset-0 w-full h-full object-cover"
               />
            ) : hoveredRealm ? (
               <motion.img
                 key={`bg-hover-${hoveredRealm.id}`}
                 src={hoveredRealm.image}
                 initial={{ opacity: 0, scale: 1.1 }}
                 animate={{ opacity: 0.4, scale: 1, filter: "blur(0px)" }}
                 exit={{ opacity: 0 }}
                 transition={{ duration: 0.8 }}
                 className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
               />
            ) : null}
            
            {/* Vignette & Gradients */}
            <div className="absolute inset-0 bg-gradient-to-r from-vazheim-dark via-vazheim-dark/80 to-transparent" />
         </AnimatePresence>
      </div>

      {/* Header - Fixed at Top */}
      <div className="relative z-10 w-full p-8 md:pl-12 pb-4 shrink-0 max-w-4xl">
         <motion.h2 
           initial={{ opacity: 0, y: -20 }}
           animate={{ opacity: 1, y: 0 }}
           className="text-5xl font-serif text-vazheim-gold mb-4"
         >
           The Realms of Vazheim
         </motion.h2>
         <p className="text-gray-400 font-serif italic max-w-xl">
           From the frozen bastions of the Obsidian Empire to the shifting sands of the Sun-Kissed Tribes, powers rise and fall like the tides.
         </p>
      </div>

      {/* Main Content - Horizontal Scroll Container (Columns) */}
      <div className="relative z-10 w-full flex-1 overflow-x-auto overflow-y-hidden px-8 md:pl-12 pb-8">
         <div className="flex h-full gap-8 w-max snap-x snap-mandatory">
            {Object.entries(categories).map(([categoryName, items], idx) => (
              <motion.div
                key={categoryName}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="snap-center w-[85vw] md:w-[450px] lg:w-[500px] h-full flex flex-col bg-black/40 border border-white/10 rounded-xl overflow-hidden backdrop-blur-sm shadow-xl"
              >
                 {/* Column Header */}
                 <div className="p-4 border-b border-white/10 bg-white/5 flex items-center justify-between">
                    <h3 className="text-xl font-serif text-vazheim-gold uppercase tracking-widest">{categoryName}</h3>
                    <span className="text-xs text-gray-500 font-mono px-2 py-1 bg-black/30 rounded">{items.length}</span>
                 </div>

                 {/* Vertical List of Cards */}
                 <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                    {items.map((realm) => (
                      <motion.div
                        key={realm.id}
                        layoutId={`realm-card-${realm.id}`}
                        onClick={() => setSelectedRealmId(realm.id)}
                        onMouseEnter={() => setHoveredRealmId(realm.id)}
                        onMouseLeave={() => setHoveredRealmId(null)}
                        whileHover={{ scale: 1.02 }}
                        className="cursor-pointer group bg-vazheim-dark/60 border border-white/5 hover:border-vazheim-gold/50 rounded-lg overflow-hidden shadow-md transition-all duration-300 relative"
                      >
                         <div className={`h-1.5 ${realm.bannerColor} w-full`} />
                         <div className="p-5">
                           <div className="flex justify-between items-start mb-2">
                              <h4 className="text-xl font-serif text-white group-hover:text-vazheim-gold transition-colors">{realm.name}</h4>
                              <Crown size={16} className="text-vazheim-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                           </div>
                           <p className="text-sm text-gray-400 font-serif italic mb-3">"{realm.motto}"</p>
                           <div className="flex items-center text-xs text-gray-500 gap-2">
                              <MapPin size={12} />
                              {realm.capital}
                           </div>
                         </div>
                         {/* Hover Shine */}
                         <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
                      </motion.div>
                    ))}
                 </div>
              </motion.div>
            ))}
            {/* Spacer for right padding */}
            <div className="w-4 shrink-0" />
         </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedRealm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-8">
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setSelectedRealmId(null)}
               className="absolute inset-0 bg-black/80 backdrop-blur-md"
             />

             <motion.div 
               layoutId={`realm-card-${selectedRealm.id}`}
               className="w-full h-full md:max-w-[95vw] md:h-[85vh] bg-vazheim-dark border border-vazheim-gold/20 rounded-none md:rounded-2xl overflow-hidden shadow-2xl relative flex flex-col md:flex-row z-10"
             >
                {/* Close Button */}
                <button 
                  onClick={(e) => { e.stopPropagation(); setSelectedRealmId(null); }}
                  className="absolute top-6 right-6 z-50 p-2 bg-black/50 hover:bg-red-900/80 text-white rounded-full border border-white/10 backdrop-blur-md transition-colors"
                >
                  <X size={24} />
                </button>

                {/* Left Column: Main Image & Quick Info (30%) */}
                <div className="w-full md:w-[30%] relative h-64 md:h-full bg-black shrink-0">
                   <motion.img 
                     src={selectedRealm.image} 
                     alt={selectedRealm.name}
                     className="w-full h-full object-cover opacity-80"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-vazheim-dark via-transparent to-transparent md:bg-gradient-to-r" />
                   
                   <div className="absolute bottom-0 left-0 p-8 w-full">
                      <div className={`h-1 w-20 mb-4 ${selectedRealm.bannerColor}`} />
                      <h2 className="text-3xl md:text-4xl font-serif text-white mb-2 leading-none drop-shadow-lg">{selectedRealm.name}</h2>
                      <p className="text-lg text-vazheim-gold font-serif italic mb-6">"{selectedRealm.motto}"</p>
                      
                      <div className="space-y-3">
                         <div className="flex items-center gap-3 text-gray-300">
                            <Crown size={18} className="text-vazheim-gold" />
                            <span className="font-bold">Ruler:</span> {selectedRealm.ruler}
                         </div>
                         <div className="flex items-center gap-3 text-gray-300">
                            <MapPin size={18} className="text-vazheim-gold" />
                            <span className="font-bold">Capital:</span> {selectedRealm.capital}
                         </div>
                      </div>
                   </div>
                </div>

                {/* Center Column: Detailed Content (40%) */}
                <div className="w-full md:w-[40%] bg-vazheim-dark/95 p-8 md:p-12 overflow-y-auto border-l border-r border-white/5 shrink-0">
                   <div className="max-w-2xl mx-auto">
                      <h3 className="text-2xl font-serif text-vazheim-gold mb-6 border-b border-white/10 pb-2">History & Lore</h3>
                      <p className="text-gray-300 text-lg leading-relaxed mb-10 font-light">
                        {selectedRealm.description}
                      </p>

                      <div className="grid grid-cols-1 gap-8">
                         <div>
                            <div className="flex items-center gap-2 mb-4 text-white font-serif text-xl">
                               <Flag size={20} className="text-gray-400" /> Subfactions
                            </div>
                            <ul className="space-y-2">
                               {selectedRealm.subfactions.map((sub, i) => (
                                 <li key={i} className="flex items-start gap-2 text-gray-400 text-sm">
                                   <span className="w-1.5 h-1.5 rounded-full bg-vazheim-gold mt-1.5" />
                                   {sub}
                                 </li>
                               ))}
                            </ul>
                         </div>

                         <div>
                            <div className="flex items-center gap-2 mb-4 text-white font-serif text-xl">
                               <Shield size={20} className="text-gray-400" /> Orders & Guilds
                            </div>
                            <ul className="space-y-2">
                               {selectedRealm.orders.map((ord, i) => (
                                 <li key={i} className="flex items-start gap-2 text-gray-400 text-sm">
                                   <span className="w-1.5 h-1.5 rounded-full bg-vazheim-crimson mt-1.5" />
                                   {ord}
                                 </li>
                               ))}
                            </ul>
                         </div>
                      </div>
                   </div>
                </div>

                {/* Right Column: Secondary Image (30%) */}
                <div className="hidden md:block w-full md:w-[30%] relative bg-black shrink-0">
                    <img 
                      src={selectedRealm.secondaryImage || 'https://via.placeholder.com/600x900'} 
                      alt="Atmosphere" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-l from-vazheim-dark/10 via-transparent to-vazheim-dark/60" />
                </div>

             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Realms;