import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Eye, Shield } from 'lucide-react';

const Faiths: React.FC = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { x: -20, opacity: 0 },
    show: { x: 0, opacity: 1 }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      exit={{ opacity: 0 }}
      className="p-10 h-full flex flex-col items-center"
    >
      <h2 className="text-4xl font-serif text-vazheim-gold mb-16">The Pantheon</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl w-full">
        <motion.div variants={item} className="flex gap-6 items-start">
          <div className="p-4 bg-amber-500/10 rounded-full border border-amber-500/30">
            <Sun size={40} className="text-amber-500" />
          </div>
          <div>
            <h3 className="text-2xl font-serif text-white mb-2">The Eternal Flame</h3>
            <p className="text-gray-400 leading-relaxed">
              Worshipped by the Sun-Kissed Tribes. They believe fire is the purifying agent of the soul, and the sun is the eye of the Creator watching over the world.
            </p>
          </div>
        </motion.div>

        <motion.div variants={item} className="flex gap-6 items-start">
          <div className="p-4 bg-blue-500/10 rounded-full border border-blue-500/30">
            <Moon size={40} className="text-blue-400" />
          </div>
          <div>
            <h3 className="text-2xl font-serif text-white mb-2">The Silent Watcher</h3>
            <p className="text-gray-400 leading-relaxed">
              A cult of shadows and secrets. They believe that true power lies in the unseen and the unheard. Often associated with assassins and spies.
            </p>
          </div>
        </motion.div>

        <motion.div variants={item} className="flex gap-6 items-start">
          <div className="p-4 bg-purple-500/10 rounded-full border border-purple-500/30">
            <Eye size={40} className="text-purple-400" />
          </div>
          <div>
            <h3 className="text-2xl font-serif text-white mb-2">The All-Seeing</h3>
            <p className="text-gray-400 leading-relaxed">
              The deity of the Arcanum. Magic is considered the blood of this god. To cast a spell is to pray.
            </p>
          </div>
        </motion.div>

        <motion.div variants={item} className="flex gap-6 items-start">
          <div className="p-4 bg-red-900/10 rounded-full border border-red-500/30">
            <Shield size={40} className="text-red-700" />
          </div>
          <div>
            <h3 className="text-2xl font-serif text-white mb-2">The Iron Father</h3>
            <p className="text-gray-400 leading-relaxed">
              The patron of the Obsidian Empire. He demands strength, discipline, and conquest. Mercy is considered a sin.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Faiths;