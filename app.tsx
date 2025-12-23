import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Map as MapIcon, Users, Crown, Flame, Zap, Home, 
  Sun, Moon, Eye, Shield, 
  Sword, BookOpen, Sparkles, Ghost, X, 
  ZoomIn, ZoomOut, RotateCcw, Compass, 
  MessageSquare, Send, Flag
} from 'lucide-react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, 
  ResponsiveContainer, Tooltip as RechartsTooltip 
} from 'recharts';

// -----------------------------------------------------------------------------
// CONFIGURATION & TYPES
// -----------------------------------------------------------------------------

// NOTE: The execution environment will provide the key at runtime if available.
const apiKey = "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"; 

export enum ViewState {
  HOME = 'HOME',
  MAP = 'MAP',
  PERSONAGES = 'PERSONAGES',
  REALMS = 'REALMS',
  FAITHS = 'FAITHS',
  MAGIC = 'MAGIC',
}

export interface NavItem {
  id: ViewState;
  label: string;
  icon: React.ReactNode;
  description: string;
}

export interface Character {
  id: string;
  name: string;
  title: string;
  faction: string;
  description: string;
  image: string;
  stats: {
    strength: number;
    intelligence: number;
    magic: number;
    cunning: number;
  }
}

export interface Realm {
  id: string;
  name: string;
  ruler: string;
  motto: string;
  description: string;
  bannerColor: string;
  category: 'Great Power' | 'Minor Realm' | 'Other Faction';
  image: string;
  secondaryImage?: string;
  capital: string;
  subfactions: string[];
  orders: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

// -----------------------------------------------------------------------------
// DATA
// -----------------------------------------------------------------------------

const CHARACTERS: Character[] = [
  {
    id: '1',
    name: "Karl",
    title: "Exiled Squire",
    faction: "Independent",
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
    name: "Gozmasteyin",
    title: "Mad Imperial Scientist",
    faction: "Vazheim",
    description: "Hailing from the distant land of Calamanth, sharp-witted and sharp-tongued Gozmasteyin became the first Imperial Scientist of Vazheim. Known for his lack of morals, unwavering pursuit of knowledge, and witty callousness.",
    image: "https://thumbs2.imgbox.com/83/af/dbpxJZ5O_t.png",
    stats: { strength: 5, intelligence: 100, magic: 80, cunning: 85 }
  },
  {
    id: '4',
    name: "Moschev",
    title: "Merchant Mogul",
    faction: "Tomokkarrei",
    description: "Moschev was born to peasants in the North. Given a chance to manage the Bel-Novo Lumber Guild, he quickly became its owner and absorbed other Bel-Novan companies and guilds into his mercantile empire.",
    image: "https://thumbs2.imgbox.com/2d/c0/VLMRE3Of_t.png",
    stats: { strength: 25, intelligence: 50, magic: 0, cunning: 65 }
  },
  {
    id: '5',
    name: "Onfim",
    title: "Baker and Killer",
    faction: "Bel-Novo",
    description: "An unseeming baker with a mercenary past, Onfim is beloved by the adults and children of Tresk for his free sweets and breads.",
    image: "https://thumbs2.imgbox.com/7d/9c/H87WWF95_t.png",
    stats: { strength: 65, intelligence: 20, magic: 5, cunning: 60 }
  },
  {
    id: '6',
    name: "Asnelda",
    title: "Heroine of Katreios",
    faction: "Independent",
    description: "Asnelda commands divine strength, allowing her to overpower most foes she encounters. Hailing from the muddy, rugged lands of Katreios, Asnelda now travels the world in search of adventure and coin.",
    image: "https://thumbs2.imgbox.com/de/71/RIh9z9H1_t.png",
    stats: { strength: 85, intelligence: 10, magic: 55, cunning: 30 }
  },
  {
    id: '7',
    name: "Gareth-Leon",
    title: "Suave Bladecaller",
    faction: "Lavarre",
    description: "Second son to a noble House in Lavarre, Gareth-Leon enlisted in the Lavarran army after inheriting his family's second House Blade. Infamous for his wits, womanizing, and wanton laziness.",
    image: "https://thumbs2.imgbox.com/b0/95/19RvlpW2_t.png",
    stats: { strength: 20, intelligence: 45, magic: 35, cunning: 65 }
  },
  {
    id: '8',
    name: "Isadora",
    title: "Oracle of the Deep",
    faction: "The Arcanum",
    description: "Blinded by a ritual gone wrong, Isadora sees only the flow of magic. She acts as a conduit for raw aether, capable of devastating bursts of power, though each use drains her life force.",
    image: "https://picsum.photos/seed/isadora/600/900",
    stats: { strength: 10, intelligence: 80, magic: 100, cunning: 30 }
  },
  {
    id: '9',
    name: "Malakar",
    title: "Siege Breaker",
    faction: "Obsidian Empire",
    description: "A veteran of a hundred wars, Malakar's skin has been replaced by grafted iron plates. He is a walking tank, loyal only to the Emperor, and serves as the empire's ultimate weapon against magic users.",
    image: "https://picsum.photos/seed/malakar/600/900?grayscale",
    stats: { strength: 95, intelligence: 30, magic: 0, cunning: 20 }
  },
  {
    id: '10',
    name: "Yanna",
    title: "Spirit Guide",
    faction: "Sun-Kissed Tribes",
    description: "While others fight, Yanna heals. Using the ancient songs of her ancestors, she can knit flesh and soothe the spirit. She travels the battlefields, offering mercy to friend and foe alike.",
    image: "https://picsum.photos/seed/yanna/600/900",
    stats: { strength: 15, intelligence: 85, magic: 70, cunning: 40 }
  }
];

const REALMS: Realm[] = [
  {
    id: 'vazheim',
    name: 'The Empire of Vazheim',
    category: 'Great Power',
    ruler: 'Emperor Erich II',
    capital: 'Vazheim',
    motto: 'Steel Bleeds, Stone Endures',
    description: 'A fortress nation carved into the northern mountains. They value strength above all and have waged a century-long war against wild magic, using anti-magic ore known as Null-Stone.',
    bannerColor: 'bg-violet-950',
    image: 'https://images2.imgbox.com/e1/9c/3cPwfvxl_o.png?q=80&w=1920&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1533613220913-267ac5042074?q=80&w=800&auto=format&fit=crop',
    subfactions: ['Prvzan Council', 'Marchlands', 'Imperial Prvza'],
    orders: ['Black Inquisitors', 'White Inqusitors', 'Imperial Temple']
  },
  {
    id: 'lavarre',
    name: 'Grand Kingdom of Lavarre',
    category: 'Great Power',
    ruler: 'King Jonas',
    capital: 'Stonetree',
    motto: 'We are the Flame',
    description: 'Nomadic wanderers of the endless dunes. They wield fire magic and tame giant scorpions, viewing the sun as a living god. Their culture is built on movement, trade, and the preservation of the Eternal Flame.',
    bannerColor: 'bg-rose-500',
    image: 'https://images2.imgbox.com/39/97/YdLOZE8K_o.png?q=80&w=1920&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1547234935-80c7142ee969?q=80&w=800&auto=format&fit=crop',
    subfactions: ['Soutiere', 'Gwyllts', 'Forresters'],
    orders: ['Bladecallers', 'Band of Northern Forresters']
  },
  {
    id: 'minglen',
    name: 'Minglen',
    category: 'Great Power',
    ruler: 'The Princes',
    capital: 'Minglen',
    motto: 'Knowledge is Power',
    description: 'A floating city held aloft by ancient crystals. It is a haven for mages and scholars, detached from the petty wars of the surface. They hoard knowledge and artifacts.',
    bannerColor: 'bg-emerald-100',
    image: 'https://images.unsplash.com/photo-1533104677941-6156e507301c?q=80&w=1920&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1506466634563-3e0f4f9d023b?q=80&w=800&auto=format&fit=crop',
    subfactions: ['Crystal Court', 'Sky Weavers'],
    orders: ['Keepers of the Lens', 'Cloud Walkers']
  },
  {
    id: 'katreios',
    name: 'Kingdom of Katreios',
    category: 'Minor Realm',
    ruler: 'The Grand Wisdom',
    capital: 'Katreios',
    motto: 'Honor and Wine',
    description: 'A lush, temperate kingdom known for its chivalry, vineyards, and constant political intrigue between noble houses. Their heavy cavalry is feared across the continent.',
    bannerColor: 'bg-blue-800',
    image: 'https://images.unsplash.com/photo-1599602446726-538699110d7a?q=80&w=1920&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1585543805890-6051f7829f98?q=80&w=800&auto=format&fit=crop',
    subfactions: ['Noble Houses'],
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
    subfactions: ['The Golden Bank'],
    orders: ['The Coin Guard', 'Sea Dogs']
  },
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
  }
];

const MAGIC_DATA = [
  { subject: 'Destruction', A: 120, fullMark: 150 },
  { subject: 'Restoration', A: 98, fullMark: 150 },
  { subject: 'Illusion', A: 86, fullMark: 150 },
  { subject: 'Necromancy', A: 65, fullMark: 150 },
  { subject: 'Alteration', A: 90, fullMark: 150 },
  { subject: 'Divination', A: 100, fullMark: 150 },
];

const MAP_IMAGE_URL = "https://i.ibb.co/qXkKLfz/d27pspri5sr31.jpg";

// -----------------------------------------------------------------------------
// SERVICES (Oracle)
// -----------------------------------------------------------------------------

const VAZHEIM_LORE_SYSTEM_INSTRUCTION = `
You are the Ancient Oracle of Vazheim. 
Vazheim is a gritty, high-fantasy medieval world teeming with ancient magic, warring empires, and tribal mysticism.
The tone should be immersive, slightly archaic, and mysterious.

Key Lore:
- **The Obsidian Empire (Vazheim)**: A militaristic nation in the north, ruled by the Iron Emperor. They despise magic but use "Blood Steel".
- **The Grand Kingdom of Lavarre**: Nomads of the southern dunes who worship the celestial flame.
- **Minglen**: A floating city where high magic is practiced, detached from the woes of the ground.
- **The Mistlands**: A dangerous swamp area where necromancy is rumored to breed.

Answer the traveler's questions about the world briefly but atmospherically. 
If they ask about something not defined here, invent a plausible detail that fits the dark fantasy theme.
Do not break character. You are the Oracle.
`;

const generateOracleResponse = async (input: string): Promise<string> => {
  if (!apiKey) {
    // Mock response if no API key is present
    await new Promise(r => setTimeout(r, 1500));
    return "The stars are dim... I require an API key to see clearly. (Please configure the API Key in the code)";
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: input }] }],
          systemInstruction: { parts: [{ text: VAZHEIM_LORE_SYSTEM_INSTRUCTION }] },
        }),
      }
    );

    if (!response.ok) {
       throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "The visions are clouded.";
  } catch (error) {
    console.error("Oracle Error:", error);
    return "A dark veil blocks my sight. The Aether is turbulent.";
  }
};

// -----------------------------------------------------------------------------
// SUB-COMPONENTS
// -----------------------------------------------------------------------------

const Navigation: React.FC<{ currentView: ViewState; onNavigate: (view: ViewState) => void }> = ({ currentView, onNavigate }) => {
  const navItems: NavItem[] = [
    { id: ViewState.HOME, label: 'Portal', icon: <Home size={20} />, description: 'Return to the start' },
    { id: ViewState.MAP, label: 'Cartography', icon: <MapIcon size={20} />, description: 'View the world map' },
    { id: ViewState.PERSONAGES, label: 'Legends', icon: <Users size={20} />, description: 'Famous characters' },
    { id: ViewState.REALMS, label: 'Empires', icon: <Crown size={20} />, description: 'Kingdoms and factions' },
    { id: ViewState.FAITHS, label: 'Divinity', icon: <Flame size={20} />, description: 'Gods and beliefs' },
    { id: ViewState.MAGIC, label: 'Arcanum', icon: <Zap size={20} />, description: 'Magical systems' },
  ];

  return (
    <div className="fixed left-0 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-4 p-4">
      {navItems.map((item) => {
        const isActive = currentView === item.id;
        return (
          <motion.div
            key={item.id}
            className="relative group flex items-center"
            initial={false}
            animate={isActive ? { x: 10 } : { x: 0 }}
          >
            <div className={`absolute left-14 bg-neutral-900 border border-amber-500/30 px-3 py-1 rounded text-amber-500 text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50 backdrop-blur-md`}>
              <span className="font-bold block font-serif">{item.label}</span>
              <span className="text-xs text-gray-500">{item.description}</span>
            </div>

            <button
              onClick={() => onNavigate(item.id)}
              className={`
                w-12 h-12 rounded-lg flex items-center justify-center border-2 transition-all duration-300 relative overflow-hidden
                ${isActive 
                  ? 'bg-amber-500 border-white text-black shadow-[0_0_15px_rgba(204,164,59,0.8)]' 
                  : 'bg-black/40 border-white/10 text-gray-400 hover:border-amber-500 hover:text-amber-500'
                }
              `}
            >
              <span className="relative z-10">{item.icon}</span>
              {isActive && (
                <motion.div layoutId="activeGlow" className="absolute inset-0 bg-white/20 blur-sm" />
              )}
            </button>
            {isActive && (
              <motion.div layoutId="activeLine" className="absolute -right-4 w-1 h-12 bg-amber-500 rounded-full" />
            )}
          </motion.div>
        );
      })}
    </div>
  );
};

const WorldMap: React.FC = () => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef<{ x: number, y: number } | null>(null);
  const positionRef = useRef({ x: 0, y: 0 }); 

  useEffect(() => {
    positionRef.current = position;
  }, [position]);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const scaleAmount = -e.deltaY * 0.001;
    const newScale = Math.min(Math.max(scale + scaleAmount, 1), 4);
    setScale(newScale);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !dragStartRef.current) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    setPosition({
      x: positionRef.current.x + dx,
      y: positionRef.current.y + dy
    });
    dragStartRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    dragStartRef.current = null;
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="w-full h-full relative overflow-hidden bg-[#050505] flex items-center justify-center select-none"
    >
      <div className="absolute inset-0 pointer-events-none opacity-20 z-0 bg-[url('https://www.transparenttextures.com/patterns/cartographer.png')]"></div>

      <div 
        ref={containerRef}
        className={`w-full h-full flex items-center justify-center cursor-grab ${isDragging ? 'cursor-grabbing' : ''}`}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <motion.div
          animate={{ scale, x: position.x, y: position.y }}
          transition={{ type: "spring", stiffness: isDragging ? 999 : 200, damping: 30, mass: 0.5 }}
          className="relative shadow-2xl shadow-black/50"
          style={{ transformOrigin: 'center center' }}
        >
          <img 
            src={MAP_IMAGE_URL} 
            alt="World Map" 
            className="max-w-none h-[85vh] object-contain rounded-lg border-2 border-amber-500/20"
            draggable={false}
          />
        </motion.div>
      </div>

      <div className="absolute bottom-8 right-8 flex flex-col gap-2 z-20">
        <div className="bg-black/80 backdrop-blur-md border border-amber-500/30 rounded-lg p-2 flex flex-col gap-2 shadow-xl">
          <button onClick={() => setScale(s => Math.min(s + 0.5, 4))} className="p-2 text-amber-500 hover:bg-white/10 rounded"><ZoomIn size={20} /></button>
          <button onClick={() => setScale(s => Math.max(s - 0.5, 1))} className="p-2 text-amber-500 hover:bg-white/10 rounded"><ZoomOut size={20} /></button>
          <div className="h-px bg-white/10 w-full my-1"></div>
          <button onClick={() => { setScale(1); setPosition({x:0,y:0}); }} className="p-2 text-gray-400 hover:text-white rounded"><RotateCcw size={18} /></button>
        </div>
      </div>

      <div className="absolute top-0 left-0 p-8 z-20 pointer-events-none">
         <h2 className="text-4xl font-serif text-amber-500 drop-shadow-md flex items-center gap-3"><MapIcon /> Cartography</h2>
         <p className="text-gray-400 font-serif italic text-sm mt-1">Scroll to zoom, drag to navigate.</p>
      </div>
      <div className="absolute top-8 right-8 z-10 opacity-30 pointer-events-none">
        <Compass size={120} className="text-amber-500 animate-[spin_60s_linear_infinite]" />
      </div>
    </motion.div>
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
        initial={{ width: 0 }} whileInView={{ width: `${value}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
        className={`h-full ${color} shadow-[0_0_12px_currentColor]`}
      />
    </div>
  </div>
);

const Personages: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedChar = CHARACTERS.find(c => c.id === selectedId);

  return (
    <div className="h-full w-full p-4 md:p-8 overflow-y-auto flex flex-col items-center bg-gradient-to-br from-[#0a0a0c] to-[#101014]">
       <div className={`text-center mb-10 transition-all duration-500 ${selectedId ? 'opacity-0 h-0 overflow-hidden mb-0' : 'opacity-100'}`}>
          <motion.h2 initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-4xl md:text-5xl font-serif text-amber-500 drop-shadow-lg">Choose Your Legend</motion.h2>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-gray-400 mt-2 font-serif italic">Select a champion to view their chronicles</motion.p>
       </div>

       <div className="w-full max-w-7xl relative pb-20">
          <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 transition-all duration-500 ${selectedId ? 'opacity-0 pointer-events-none scale-95 blur-sm' : 'opacity-100 scale-100'}`}>
              {CHARACTERS.map((char) => (
                <motion.div
                  layoutId={`card-container-${char.id}`}
                  key={char.id}
                  onClick={() => setSelectedId(char.id)}
                  whileHover={{ scale: 1.03, y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="cursor-pointer group relative aspect-[3/4] rounded-xl overflow-hidden border-2 border-white/5 bg-black/40 shadow-xl hover:border-amber-500/50 transition-colors"
                >
                  <img src={char.image} alt={char.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
                  <motion.div layoutId={`card-info-${char.id}`} className="absolute bottom-0 left-0 w-full p-4 md:p-6">
                     <p className="text-amber-500 text-[10px] md:text-xs uppercase tracking-[0.2em] mb-1 opacity-80">{char.faction}</p>
                     <h3 className="text-white font-serif text-lg md:text-2xl leading-none">{char.name}</h3>
                  </motion.div>
                </motion.div>
              ))}
          </div>
       </div>

       <AnimatePresence>
         {selectedId && selectedChar && (
           <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedId(null)} className="absolute inset-0 bg-black/90 backdrop-blur-md" />
              <motion.div layoutId={`card-container-${selectedChar.id}`} className="w-full max-w-7xl h-[90vh] md:h-[95vh] bg-[#0a0a0c] border border-amber-500/30 rounded-2xl overflow-hidden shadow-2xl relative flex flex-col md:flex-row z-10">
                  <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={(e) => { e.stopPropagation(); setSelectedId(null); }} className="absolute top-4 right-4 z-50 p-2 bg-black/60 hover:bg-red-900/90 rounded-full text-white border border-white/20 transition-colors backdrop-blur-sm"><X size={24} /></motion.button>
                  <div className="w-full md:w-1/2 h-64 md:h-full relative overflow-hidden bg-black">
                     <motion.img initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} src={selectedChar.image} alt={selectedChar.name} className="w-full h-full object-cover" />
                     <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#0a0a0c]/20" />
                  </div>
                  <div className="w-full md:w-1/2 relative flex flex-col bg-[#0a0a0c]/95 overflow-y-auto border-l border-white/5">
                      <div className="p-8 md:p-12 flex flex-col h-full">
                          <motion.div layoutId={`card-info-${selectedChar.id}`} className="mb-6">
                            <span className="text-amber-500 uppercase tracking-[0.2em] text-xs font-bold px-2 py-1 border border-amber-500/30 rounded inline-block mb-3 bg-amber-500/5">{selectedChar.faction}</span>
                            <h2 className="text-4xl md:text-6xl font-serif text-white mb-2">{selectedChar.name}</h2>
                            <p className="text-2xl text-gray-500 font-serif italic">{selectedChar.title}</p>
                          </motion.div>
                          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="space-y-8">
                            <div className="h-px w-full bg-gradient-to-r from-amber-500/50 to-transparent" />
                            <p className="text-gray-300 leading-relaxed text-lg font-light border-l-2 border-amber-500/20 pl-6">{selectedChar.description}</p>
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

const Realms: React.FC = () => {
  const [selectedRealmId, setSelectedRealmId] = useState<string | null>(null);
  const [hoveredRealmId, setHoveredRealmId] = useState<string | null>(null);
  const selectedRealm = REALMS.find(r => r.id === selectedRealmId);
  const hoveredRealm = REALMS.find(r => r.id === hoveredRealmId);
  const categories = {
    'Great Powers': REALMS.filter(r => r.category === 'Great Power'),
    'Minor Realms': REALMS.filter(r => r.category === 'Minor Realm'),
    'Other Factions': REALMS.filter(r => r.category === 'Other Faction'),
  };

  return (
    <div className="relative w-full h-full bg-[#0a0a0c] overflow-hidden flex flex-col">
      <div className="absolute inset-0 pointer-events-none z-0">
         <AnimatePresence mode="popLayout">
            <motion.div className="absolute inset-0 bg-neutral-900" />
            {selectedRealm ? (
               <motion.img key={`bg-selected-${selectedRealm.id}`} src={selectedRealm.image} initial={{ opacity: 0 }} animate={{ opacity: 0.7, scale: 1.0, filter: "blur(3px)" }} exit={{ opacity: 0 }} transition={{ duration: 1 }} className="absolute inset-0 w-full h-full object-cover" />
            ) : hoveredRealm ? (
               <motion.img key={`bg-hover-${hoveredRealm.id}`} src={hoveredRealm.image} initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 0.4, scale: 1, filter: "blur(0px)" }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }} className="absolute inset-0 w-full h-full object-cover mix-blend-overlay" />
            ) : null}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0c] via-[#0a0a0c]/80 to-transparent" />
         </AnimatePresence>
      </div>

      <div className="relative z-10 w-full p-8 md:pl-12 pb-4 shrink-0 max-w-4xl">
         <motion.h2 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl font-serif text-amber-500 mb-4">Realms of Vazheim</motion.h2>
         <p className="text-gray-400 font-serif italic max-w-xl">From the frozen bastions of the Obsidian Empire to the shifting sands of the Sun-Kissed Tribes, powers rise and fall like the tides.</p>
      </div>

      <div className="relative z-10 w-full flex-1 overflow-x-auto overflow-y-hidden px-8 md:pl-12 pb-8">
         <div className="flex h-full gap-8 w-max snap-x snap-mandatory">
            {Object.entries(categories).map(([categoryName, items], idx) => (
              <motion.div key={categoryName} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }} className="snap-center w-[85vw] md:w-[450px] h-full flex flex-col bg-black/40 border border-white/10 rounded-xl overflow-hidden backdrop-blur-sm shadow-xl">
                 <div className="p-4 border-b border-white/10 bg-white/5 flex items-center justify-between">
                    <h3 className="text-xl font-serif text-amber-500 uppercase tracking-widest">{categoryName}</h3>
                    <span className="text-xs text-gray-500 font-mono px-2 py-1 bg-black/30 rounded">{items.length}</span>
                 </div>
                 <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {items.map((realm) => (
                      <motion.div key={realm.id} layoutId={`realm-card-${realm.id}`} onClick={() => setSelectedRealmId(realm.id)} onMouseEnter={() => setHoveredRealmId(realm.id)} onMouseLeave={() => setHoveredRealmId(null)} whileHover={{ scale: 1.02 }} className="cursor-pointer group bg-[#0a0a0c]/60 border border-white/5 hover:border-amber-500/50 rounded-lg overflow-hidden shadow-md transition-all duration-300 relative">
                         <div className={`h-1.5 ${realm.bannerColor} w-full`} />
                         <div className="p-5">
                           <div className="flex justify-between items-start mb-2">
                              <h4 className="text-xl font-serif text-white group-hover:text-amber-500 transition-colors">{realm.name}</h4>
                              <Crown size={16} className="text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                           </div>
                           <p className="text-sm text-gray-400 font-serif italic mb-3">"{realm.motto}"</p>
                         </div>
                      </motion.div>
                    ))}
                 </div>
              </motion.div>
            ))}
         </div>
      </div>

      <AnimatePresence>
        {selectedRealm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-8">
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedRealmId(null)} className="absolute inset-0 bg-black/80 backdrop-blur-md" />
             <motion.div layoutId={`realm-card-${selectedRealm.id}`} className="w-full h-full md:max-w-[95vw] md:h-[85vh] bg-[#0a0a0c] border border-amber-500/20 rounded-none md:rounded-2xl overflow-hidden shadow-2xl relative flex flex-col md:flex-row z-10">
                <button onClick={(e) => { e.stopPropagation(); setSelectedRealmId(null); }} className="absolute top-6 right-6 z-50 p-2 bg-black/50 hover:bg-red-900/80 text-white rounded-full border border-white/10 backdrop-blur-md transition-colors"><X size={24} /></button>
                <div className="w-full md:w-[30%] relative h-64 md:h-full bg-black shrink-0">
                   <motion.img src={selectedRealm.image} alt={selectedRealm.name} className="w-full h-full object-cover opacity-80" />
                   <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-transparent to-transparent md:bg-gradient-to-r" />
                   <div className="absolute bottom-0 left-0 p-8 w-full">
                      <div className={`h-1 w-20 mb-4 ${selectedRealm.bannerColor}`} />
                      <h2 className="text-3xl md:text-4xl font-serif text-white mb-2 leading-none drop-shadow-lg">{selectedRealm.name}</h2>
                      <p className="text-lg text-amber-500 font-serif italic mb-6">"{selectedRealm.motto}"</p>
                      <div className="space-y-3">
                         <div className="flex items-center gap-3 text-gray-300"><Crown size={18} className="text-amber-500" /><span className="font-bold">Ruler:</span> {selectedRealm.ruler}</div>
                         <div className="flex items-center gap-3 text-gray-300"><MapIcon size={18} className="text-amber-500" /><span className="font-bold">Capital:</span> {selectedRealm.capital}</div>
                      </div>
                   </div>
                </div>
                <div className="w-full md:w-[40%] bg-[#0a0a0c]/95 p-8 md:p-12 overflow-y-auto border-l border-r border-white/5 shrink-0">
                   <div className="max-w-2xl mx-auto">
                      <h3 className="text-2xl font-serif text-amber-500 mb-6 border-b border-white/10 pb-2">History & Lore</h3>
                      <p className="text-gray-300 text-lg leading-relaxed mb-10 font-light">{selectedRealm.description}</p>
                      <div className="grid grid-cols-1 gap-8">
                         <div>
                            <div className="flex items-center gap-2 mb-4 text-white font-serif text-xl"><Flag size={20} className="text-gray-400" /> Subfactions</div>
                            <ul className="space-y-2">{selectedRealm.subfactions.map((sub, i) => <li key={i} className="flex items-start gap-2 text-gray-400 text-sm"><span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5" />{sub}</li>)}</ul>
                         </div>
                         <div>
                            <div className="flex items-center gap-2 mb-4 text-white font-serif text-xl"><Shield size={20} className="text-gray-400" /> Orders & Guilds</div>
                            <ul className="space-y-2">{selectedRealm.orders.map((ord, i) => <li key={i} className="flex items-start gap-2 text-gray-400 text-sm"><span className="w-1.5 h-1.5 rounded-full bg-red-800 mt-1.5" />{ord}</li>)}</ul>
                         </div>
                      </div>
                   </div>
                </div>
                <div className="hidden md:block w-full md:w-[30%] relative bg-black shrink-0">
                    <img src={selectedRealm.secondaryImage || 'https://via.placeholder.com/600x900'} alt="Atmosphere" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-l from-[#0a0a0c]/10 via-transparent to-[#0a0a0c]/60" />
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Faiths: React.FC = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-10 h-full flex flex-col items-center">
      <h2 className="text-4xl font-serif text-amber-500 mb-16">The Pantheon</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl w-full">
        <div className="flex gap-6 items-start">
          <div className="p-4 bg-amber-500/10 rounded-full border border-amber-500/30"><Sun size={40} className="text-amber-500" /></div>
          <div><h3 className="text-2xl font-serif text-white mb-2">The Eternal Flame</h3><p className="text-gray-400 leading-relaxed">Worshipped by the Sun-Kissed Tribes. They believe fire is the purifying agent of the soul.</p></div>
        </div>
        <div className="flex gap-6 items-start">
          <div className="p-4 bg-blue-500/10 rounded-full border border-blue-500/30"><Moon size={40} className="text-blue-400" /></div>
          <div><h3 className="text-2xl font-serif text-white mb-2">The Silent Watcher</h3><p className="text-gray-400 leading-relaxed">A cult of shadows and secrets. Often associated with assassins and spies.</p></div>
        </div>
        <div className="flex gap-6 items-start">
          <div className="p-4 bg-purple-500/10 rounded-full border border-purple-500/30"><Eye size={40} className="text-purple-400" /></div>
          <div><h3 className="text-2xl font-serif text-white mb-2">The All-Seeing</h3><p className="text-gray-400 leading-relaxed">The deity of the Arcanum. Magic is considered the blood of this god.</p></div>
        </div>
        <div className="flex gap-6 items-start">
          <div className="p-4 bg-red-900/10 rounded-full border border-red-500/30"><Shield size={40} className="text-red-700" /></div>
          <div><h3 className="text-2xl font-serif text-white mb-2">The Iron Father</h3><p className="text-gray-400 leading-relaxed">The patron of the Obsidian Empire. He demands strength, discipline, and conquest.</p></div>
        </div>
      </div>
    </motion.div>
  );
};

const MagicSystems: React.FC = () => {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="h-full flex flex-col items-center justify-center p-8">
       <h2 className="text-4xl font-serif text-amber-500 mb-4 text-center">The Aetheric Balance</h2>
      <p className="text-gray-400 mb-8 max-w-xl text-center">Magic in Vazheim is not free. It requires equivalent exchange.</p>
      <div className="w-full max-w-lg h-[400px] bg-white/5 rounded-full p-4 border border-white/10 shadow-[0_0_50px_rgba(42,42,64,0.5)]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={MAGIC_DATA}>
            <PolarGrid stroke="#4b5563" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: '#cca43b', fontFamily: 'serif', fontSize: 14 }} />
            <Radar name="Magic Intensity" dataKey="A" stroke="#8884d8" strokeWidth={3} fill="#8884d8" fillOpacity={0.4} />
            <RechartsTooltip contentStyle={{ backgroundColor: '#0a0a0c', borderColor: '#cca43b', color: '#fff' }} itemStyle={{ color: '#cca43b' }} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-8 grid grid-cols-3 gap-4 text-center text-sm text-gray-500 font-mono">
        <div><span className="block text-purple-400 font-bold">Void</span>Forbidden</div>
        <div><span className="block text-blue-400 font-bold">Arcane</span>Regulated</div>
        <div><span className="block text-red-400 font-bold">Blood</span>Heretical</div>
      </div>
    </motion.div>
  );
};

const Oracle: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([{ id: 'init', role: 'model', text: "Greetings, traveler. I am the Oracle of Vazheim. What knowledge do you seek?" }]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await generateOracleResponse(userMsg.text);
      const modelMsg: ChatMessage = { id: (Date.now() + 1).toString(), role: 'model', text: responseText };
      setMessages(prev => [...prev, modelMsg]);
    } catch (e) {
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'model', text: "The ether is silent.", isError: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }} whileHover={{ scale: 1.1 }} onClick={() => setIsOpen(true)} className="fixed bottom-6 right-6 z-50 p-4 bg-amber-500 rounded-full shadow-[0_0_20px_rgba(204,164,59,0.5)] border-2 border-white/20 text-black hover:bg-amber-400 transition-colors">
            <Sparkles size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: 50, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 50, scale: 0.9 }} className="fixed bottom-6 right-6 z-50 w-full max-w-sm h-[500px] bg-[#0a0a0c]/95 backdrop-blur-xl border border-amber-500/30 rounded-lg shadow-2xl flex flex-col overflow-hidden font-sans">
            <div className="p-4 border-b border-amber-500/20 bg-amber-500/10 flex justify-between items-center">
              <div className="flex items-center gap-2"><Sparkles size={18} className="text-amber-500" /><h3 className="text-amber-500 font-serif font-bold">The Oracle</h3></div>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white"><X size={18} /></button>
            </div>
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-lg text-sm ${msg.role === 'user' ? 'bg-amber-500/20 text-white border border-amber-500/20' : 'bg-white/5 text-gray-200 border border-white/10'}`}>{msg.text}</div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 p-3 rounded-lg flex gap-1">
                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce delay-100"></span>
                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce delay-200"></span>
                  </div>
                </div>
              )}
            </div>
            <div className="p-3 border-t border-amber-500/20 bg-black/40 flex gap-2">
              <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} placeholder="Ask of the ancient lore..." className="flex-1 bg-transparent border-none text-white focus:outline-none placeholder-gray-600 text-sm" />
              <button onClick={handleSend} disabled={isLoading} className="p-2 text-amber-500 hover:text-white disabled:opacity-50 transition-colors"><Send size={18} /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// -----------------------------------------------------------------------------
// MAIN APP COMPONENT
// -----------------------------------------------------------------------------

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>(ViewState.HOME);

  const renderContent = () => {
    switch (view) {
      case ViewState.MAP: return <WorldMap />;
      case ViewState.PERSONAGES: return <Personages />;
      case ViewState.REALMS: return <Realms />;
      case ViewState.FAITHS: return <Faiths />;
      case ViewState.MAGIC: return <MagicSystems />;
      case ViewState.HOME:
      default:
        return (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1 }} className="relative flex flex-col items-center justify-center h-full text-center px-4 overflow-hidden">
            <div className="relative z-10 flex flex-col items-center">
              <motion.h1 initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 1 }} className="text-6xl md:text-8xl font-serif text-transparent bg-clip-text bg-gradient-to-b from-amber-400 to-amber-700 drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">VAZHEIM</motion.h1>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="mt-6 text-xl md:text-2xl text-gray-300 font-light tracking-[0.2em] uppercase">The Land of a Hundred Empires</motion.p>
              <motion.button initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5 }} onClick={() => setView(ViewState.MAP)} className="mt-12 px-8 py-3 bg-transparent border border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black transition-all duration-300 font-serif uppercase tracking-widest relative overflow-hidden group">
                <span className="relative z-10">Enter the Chronicles</span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </motion.button>
            </div>
          </motion.div>
        );
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#0a0a0c] text-white selection:bg-amber-500 selection:text-black font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Lato:wght@300;400;700&display=swap');
        .font-serif { font-family: 'Cinzel', serif; }
        .font-sans { font-family: 'Lato', sans-serif; }
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-track { background: #1a1a1a; }
        ::-webkit-scrollbar-thumb { background: #cca43b; border-radius: 4px; border: 1px solid #0a0a0c; }
      `}</style>
      
      <div className="absolute inset-0 z-0">
         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-800/20 via-[#0a0a0c] to-black" />
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] opacity-10 mix-blend-overlay" />
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-150 contrast-150" />
      </div>

      <div className="relative z-10 w-full h-full flex">
        <Navigation currentView={view} onNavigate={setView} />
        <main className="flex-1 relative h-full md:ml-20">
            <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-black/80 to-transparent z-20 pointer-events-none" />
            <AnimatePresence mode="wait">
              <motion.div key={view} className="w-full h-full" initial={{ opacity: 0, x: 100, filter: 'blur(10px)' }} animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }} exit={{ opacity: 0, x: -100, filter: 'blur(10px)' }} transition={{ type: "spring", stiffness: 100, damping: 20 }}>
                {renderContent()}
              </motion.div>
            </AnimatePresence>
        </main>
      </div>
      
      <div className="md:hidden fixed bottom-0 left-0 w-full h-16 bg-[#0a0a0c] border-t border-white/10 flex justify-around items-center z-50">
         <button onClick={() => setView(ViewState.HOME)} className="p-2 text-gray-400 hover:text-amber-500">Home</button>
         <button onClick={() => setView(ViewState.MAP)} className="p-2 text-gray-400 hover:text-amber-500">Map</button>
         <button onClick={() => setView(ViewState.REALMS)} className="p-2 text-gray-400 hover:text-amber-500">Realms</button>
      </div>

      <Oracle />
    </div>
  );
};

export default App;
