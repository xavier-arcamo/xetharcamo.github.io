import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ZoomIn, ZoomOut, Compass, RotateCcw, Map as MapIcon } from 'lucide-react';

const MAP_IMAGE_URL = "https://i.ibb.co/qXkKLfz/d27pspri5sr31.jpg";
const MIN_SCALE = 1;
const MAX_SCALE = 4;

const WorldMap: React.FC = () => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef<{ x: number, y: number } | null>(null);
  const positionRef = useRef({ x: 0, y: 0 }); // Ref for synchronous updates during drag

  // Sync ref with state
  useEffect(() => {
    positionRef.current = position;
  }, [position]);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const scaleAmount = -e.deltaY * 0.001;
    const newScale = Math.min(Math.max(scale + scaleAmount, MIN_SCALE), MAX_SCALE);
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

    const newPos = {
      x: positionRef.current.x + dx,
      y: positionRef.current.y + dy
    };

    setPosition(newPos);
    dragStartRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    dragStartRef.current = null;
  };

  const handleZoom = (factor: number) => {
    setScale(prev => Math.min(Math.max(prev + factor, MIN_SCALE), MAX_SCALE));
  };

  const handleReset = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full h-full relative overflow-hidden bg-[#050505] flex items-center justify-center select-none"
    >
      {/* Background Texture/Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-20 z-0 bg-[url('https://www.transparenttextures.com/patterns/cartographer.png')]"></div>

      {/* Map Container */}
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
          animate={{
            scale: scale,
            x: position.x,
            y: position.y
          }}
          transition={{
            type: "spring",
            stiffness: isDragging ? 999 : 200, // Instant response when dragging, smooth when zooming
            damping: 30,
            mass: 0.5
          }}
          className="relative shadow-2xl shadow-black/50"
          style={{ transformOrigin: 'center center' }}
        >
          {/* Main Map Image */}
          <img 
            src={MAP_IMAGE_URL} 
            alt="World Map of Vazheim" 
            className="max-w-none h-[85vh] object-contain rounded-lg border-2 border-vazheim-gold/20"
            draggable={false}
          />

          {/* Optional: Add markers here that scale inversely if needed, 
              or just let them ride on the image coordinate system */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-0">
             Center Marker
          </div>

        </motion.div>
      </div>

      {/* UI Controls */}
      <div className="absolute bottom-8 right-8 flex flex-col gap-2 z-20">
        <div className="bg-vazheim-dark/90 backdrop-blur-md border border-vazheim-gold/30 rounded-lg p-2 flex flex-col gap-2 shadow-xl">
          <button 
            onClick={() => handleZoom(0.5)}
            className="p-2 text-vazheim-gold hover:bg-white/10 rounded transition-colors"
            title="Zoom In"
          >
            <ZoomIn size={20} />
          </button>
          <button 
            onClick={() => handleZoom(-0.5)}
            className="p-2 text-vazheim-gold hover:bg-white/10 rounded transition-colors"
            title="Zoom Out"
          >
            <ZoomOut size={20} />
          </button>
          <div className="h-px bg-white/10 w-full my-1"></div>
          <button 
            onClick={handleReset}
            className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded transition-colors"
            title="Reset View"
          >
            <RotateCcw size={18} />
          </button>
        </div>
      </div>

      {/* Header Overlay */}
      <div className="absolute top-0 left-0 p-8 z-20 pointer-events-none">
         <h2 className="text-4xl font-serif text-vazheim-gold drop-shadow-md flex items-center gap-3">
           <MapIcon className="text-vazheim-gold" /> Cartography
         </h2>
         <p className="text-gray-400 font-serif italic text-sm mt-1">
           Use scroll wheel to zoom, drag to navigate.
         </p>
      </div>
      
      {/* Decorative Compass Overlay */}
      <div className="absolute top-8 right-8 z-10 opacity-30 pointer-events-none">
        <Compass size={120} className="text-vazheim-gold animate-[spin_60s_linear_infinite]" />
      </div>

    </motion.div>
  );
};

export default WorldMap;