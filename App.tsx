import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ViewState } from './types';
import Navigation from './components/Navigation';
import WorldMap from './components/WorldMap';
import Personages from './components/Personages';
import Realms from './components/Realms';
import Faiths from './components/Faiths';
import MagicSystems from './components/MagicSystems';
import Oracle from './components/Oracle';

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
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="relative flex flex-col items-center justify-center h-full text-center px-4 overflow-hidden"
          >
            {/* Background Animated Columns */}
            <div className="absolute inset-0 z-0 flex items-end justify-center gap-4 md:gap-12 px-4 md:px-20 pointer-events-none">
              {/* Left Column */}
              <motion.div
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 1.5, delay: 1.8, ease: [0.22, 1, 0.36, 1] }}
                className="w-1/4 h-[90%] bg-vazheim-mystic/10 border border-white/5 rounded-t-sm relative overflow-hidden hidden md:block backdrop-blur-[1px]"
              >
                <img 
                  src="https://thumbs2.imgbox.com/3e/9c/BAGGWhOd_t.png" 
                  alt="" 
                  className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale mix-blend-luminosity"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-vazheim-dark via-transparent to-transparent opacity-80" />
                <div className="absolute inset-0 flex items-center justify-center">
                   <span className="text-white/5 font-serif text-6xl rotate-90 tracking-[0.5em] uppercase"></span> 
                </div>
              </motion.div>

              {/* Center Column (Main) */}
              <motion.div
                 initial={{ y: '100%', opacity: 0 }}
                 animate={{ y: '0%', opacity: 1 }}
                 transition={{ duration: 1.5, delay: 2.0, ease: [0.22, 1, 0.36, 1] }}
                 className="w-full md:w-[400px] h-[90%] bg-gradient-to-t from-black via-vazheim-gold/5 to-transparent border-x border-t border-vazheim-gold/10 rounded-t-full relative overflow-hidden backdrop-blur-[2px]"
              >
                 <img 
                  src="https://thumbs2.imgbox.com/21/f0/oNgoddf7_t.png" 
                  alt="" 
                  className="absolute inset-0 w-full h-full object-cover opacity-30 sepia mix-blend-overlay"
                 />
                 <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent" />
                 <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[1px] h-32 bg-gradient-to-b from-transparent via-vazheim-gold/30 to-transparent"></div>
              </motion.div>

              {/* Right Column */}
              <motion.div
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 1.5, delay: 2.2, ease: [0.22, 1, 0.36, 1] }}
                className="w-1/4 h-[90%] bg-vazheim-crimson/5 border border-white/5 rounded-t-sm relative overflow-hidden hidden md:block backdrop-blur-[1px]"
              >
                 <img 
                  src="https://thumbs2.imgbox.com/b6/ae/yBjU2B8V_t.png" 
                  alt="" 
                  className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale mix-blend-luminosity"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-vazheim-dark via-transparent to-transparent opacity-80" />
                 <div className="absolute inset-0 flex items-center justify-center">
                   <span className="text-white/5 font-serif text-6xl -rotate-90 tracking-[0.5em] uppercase"></span> 
                </div>
              </motion.div>
            </div>

            {/* Foreground Content */}
            <div className="relative z-10 flex flex-col items-center">
              <motion.h1 
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 1 }}
                className="text-6xl md:text-8xl font-serif text-transparent bg-clip-text bg-gradient-to-b from-vazheim-gold to-vazheim-goldDim drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]"
              >
                VAZHEIM
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-6 text-xl md:text-2xl text-gray-300 font-light tracking-[0.2em] uppercase"
              >
                The Land of a Hundred Empires
              </motion.p>
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
                onClick={() => setView(ViewState.MAP)}
                className="mt-12 px-8 py-3 bg-transparent border border-vazheim-gold text-vazheim-gold hover:bg-vazheim-gold hover:text-black transition-all duration-300 font-serif uppercase tracking-widest relative overflow-hidden group"
              >
                <span className="relative z-10">Enter the Chronicles</span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </motion.button>
            </div>
          </motion.div>
        );
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-vazheim-dark text-white selection:bg-vazheim-gold selection:text-black">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-vazheim-mystic/20 via-vazheim-dark to-black" />
         <div className="absolute inset-0 bg-rune-pattern opacity-10 mix-blend-overlay" />
         
         {/* Animated Particles/Fog Effect (CSS simulated) */}
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-150 contrast-150" />
      </div>

      {/* Main Layout Grid */}
      <div className="relative z-10 w-full h-full flex">
        {/* Navigation Sidebar */}
        <Navigation currentView={view} onNavigate={setView} />

        {/* Content Area */}
        <main className="flex-1 relative h-full md:ml-20">
            {/* Top decorative bar */}
            <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-black/80 to-transparent z-20 pointer-events-none" />
            
            {/* View Transitions */}
            <AnimatePresence mode="wait">
              <motion.div
                key={view}
                className="w-full h-full"
                initial={{ opacity: 0, x: 100, filter: 'blur(10px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -100, filter: 'blur(10px)' }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
        </main>
      </div>
      
      {/* Mobile Nav Overlay (Simple for mobile responsiveness) */}
      <div className="md:hidden fixed bottom-0 left-0 w-full h-16 bg-vazheim-dark border-t border-white/10 flex justify-around items-center z-50">
         <button onClick={() => setView(ViewState.HOME)} className="p-2 text-gray-400 hover:text-vazheim-gold">Home</button>
         <button onClick={() => setView(ViewState.MAP)} className="p-2 text-gray-400 hover:text-vazheim-gold">Map</button>
         <button onClick={() => setView(ViewState.REALMS)} className="p-2 text-gray-400 hover:text-vazheim-gold">Realms</button>
      </div>

      {/* The Oracle Chat Widget */}
      <Oracle />
    </div>
  );
};

export default App;