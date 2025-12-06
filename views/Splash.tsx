import React from 'react';
import { motion } from 'framer-motion';
import { Logo } from '../components/Logo';

export const Splash: React.FC = () => {
  return (
    <motion.div 
      className="fixed inset-0 z-50 bg-obsidian flex flex-col items-center justify-center overflow-hidden"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-noise opacity-5 pointer-events-none"></div>
      <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] bg-indigo-500/10 rounded-full blur-[120px] animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-20%] w-[80%] h-[80%] bg-violet-500/10 rounded-full blur-[120px] animate-pulse pointer-events-none delay-1000"></div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Animated Container for Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-8"
        >
          <Logo className="w-24 h-24" withText={false} />
        </motion.div>

        {/* Text Reveal */}
        <div className="overflow-hidden mb-3">
            <motion.h1 
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                className="text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-zinc-200 to-zinc-500 drop-shadow-2xl"
            >
                Thriviyo.
            </motion.h1>
        </div>

        {/* Slogan */}
        <motion.p 
            initial={{ opacity: 0, letterSpacing: '0.1em' }}
            animate={{ opacity: 1, letterSpacing: '0.3em' }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-indigo-400 text-xs font-bold uppercase"
        >
            Student Finance, Elevated
        </motion.p>
      </div>

      {/* Loading Indicator (Minimal) */}
      <motion.div 
        className="absolute bottom-12 w-32 h-1 bg-zinc-800 rounded-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.div 
            className="h-full bg-white rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
        />
      </motion.div>
    </motion.div>
  );
};