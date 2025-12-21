import React from 'react';
import { ViewState, NavItem } from '../types';
import { motion } from 'framer-motion';
import { Map, Users, Crown, Flame, Zap, Home } from 'lucide-react';

interface NavigationProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
}

const navItems: NavItem[] = [
  { id: ViewState.HOME, label: 'Portal', icon: <Home size={20} />, description: 'Return to the start' },
  { id: ViewState.MAP, label: 'Cartography', icon: <Map size={20} />, description: 'View the world map' },
  { id: ViewState.PERSONAGES, label: 'Legends', icon: <Users size={20} />, description: 'Famous characters' },
  { id: ViewState.REALMS, label: 'Empires', icon: <Crown size={20} />, description: 'Kingdoms and factions' },
  { id: ViewState.FAITHS, label: 'Divinity', icon: <Flame size={20} />, description: 'Gods and beliefs' },
  { id: ViewState.MAGIC, label: 'Arcanum', icon: <Zap size={20} />, description: 'Magical systems' },
];

const Navigation: React.FC<NavigationProps> = ({ currentView, onNavigate }) => {
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
            {/* Tooltip / Label sliding out */}
            <div className={`absolute left-14 bg-vazheim-dark border border-vazheim-gold/30 px-3 py-1 rounded text-vazheim-gold text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50 backdrop-blur-md`}>
              <span className="font-bold block font-serif">{item.label}</span>
              <span className="text-xs text-gray-500">{item.description}</span>
            </div>

            {/* Button */}
            <button
              onClick={() => onNavigate(item.id)}
              className={`
                w-12 h-12 rounded-lg flex items-center justify-center border-2 transition-all duration-300 relative overflow-hidden
                ${isActive 
                  ? 'bg-vazheim-gold border-white text-vazheim-dark shadow-[0_0_15px_rgba(204,164,59,0.8)]' 
                  : 'bg-black/40 border-white/10 text-gray-400 hover:border-vazheim-gold hover:text-vazheim-gold'
                }
              `}
            >
              <span className="relative z-10">{item.icon}</span>
              {isActive && (
                <motion.div
                  layoutId="activeGlow"
                  className="absolute inset-0 bg-white/20 blur-sm"
                />
              )}
            </button>
            
            {/* Connector Line for active item */}
            {isActive && (
              <motion.div 
                layoutId="activeLine"
                className="absolute -right-4 w-1 h-12 bg-vazheim-gold rounded-full"
              />
            )}
          </motion.div>
        );
      })}
    </div>
  );
};

export default Navigation;