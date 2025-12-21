import React from 'react';
import { motion } from 'framer-motion';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { subject: 'Destruction', A: 120, fullMark: 150 },
  { subject: 'Restoration', A: 98, fullMark: 150 },
  { subject: 'Illusion', A: 86, fullMark: 150 },
  { subject: 'Necromancy', A: 65, fullMark: 150 },
  { subject: 'Alteration', A: 90, fullMark: 150 },
  { subject: 'Divination', A: 100, fullMark: 150 },
];

const MagicSystems: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      exit={{ opacity: 0, scale: 0.8, rotate: 5 }}
      transition={{ duration: 0.5 }}
      className="h-full flex flex-col items-center justify-center p-8"
    >
       <h2 className="text-4xl font-serif text-vazheim-gold mb-4 text-center">
        The Aetheric Balance
      </h2>
      <p className="text-gray-400 mb-8 max-w-xl text-center">
        Magic in Vazheim is not free. It requires equivalent exchange. 
        This chart represents the current Aetheric saturation in the world.
      </p>

      <div className="w-full max-w-lg h-[400px] bg-white/5 rounded-full p-4 border border-white/10 shadow-[0_0_50px_rgba(42,42,64,0.5)]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid stroke="#4b5563" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: '#cca43b', fontFamily: 'serif', fontSize: 14 }} />
            <Radar
              name="Magic Intensity"
              dataKey="A"
              stroke="#8884d8"
              strokeWidth={3}
              fill="#8884d8"
              fillOpacity={0.4}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0a0a0c', borderColor: '#cca43b', color: '#fff' }}
              itemStyle={{ color: '#cca43b' }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-8 grid grid-cols-3 gap-4 text-center text-sm text-gray-500 font-mono">
        <div>
          <span className="block text-purple-400 font-bold">Void</span>
          Forbidden
        </div>
        <div>
          <span className="block text-blue-400 font-bold">Arcane</span>
          Regulated
        </div>
        <div>
          <span className="block text-red-400 font-bold">Blood</span>
          Heretical
        </div>
      </div>
    </motion.div>
  );
};

export default MagicSystems;