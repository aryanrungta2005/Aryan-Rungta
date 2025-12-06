import React from 'react';
import { motion } from 'framer-motion';

interface LogoProps {
  className?: string;
  withText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = "w-10 h-10", withText = true }) => {
  return (
    <div className="flex items-center gap-2.5">
      <div className={`relative ${className}`}>
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_0_15px_rgba(139,92,246,0.5)]">
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8b5cf6" /> {/* Violet */}
              <stop offset="50%" stopColor="#6366f1" /> {/* Indigo */}
              <stop offset="100%" stopColor="#3b82f6" /> {/* Blue */}
            </linearGradient>
            <linearGradient id="logoGradientLight" x1="0%" y1="100%" x2="100%" y2="0%">
               <stop offset="0%" stopColor="#c4b5fd" />
               <stop offset="100%" stopColor="#a5b4fc" />
            </linearGradient>
          </defs>
          
          {/* Main vertical stem (Growth) */}
          <motion.path 
            d="M50 20 C 50 15, 65 15, 65 20 V 80 C 65 90, 35 90, 35 80 V 50 H 50 V 20 Z" 
            fill="url(#logoGradient)" 
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />

          {/* Crossbar / Leaf (Flow) */}
          <motion.path
            d="M20 35 C 10 35, 10 50, 20 50 H 80 C 90 50, 90 35, 80 35 H 20 Z"
            fill="url(#logoGradient)"
            fillOpacity="0.8"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
            style={{ originX: 0.5, originY: 0.5 }}
          />
          
          {/* Accent Spark */}
          <motion.circle 
            cx="75" 
            cy="25" 
            r="8" 
            fill="#f43f5e" 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 15, delay: 1.2 }}
          />
        </svg>
        
        {/* Glow behind */}
        <div className="absolute inset-0 bg-indigo-500/20 blur-xl rounded-full -z-10"></div>
      </div>
      
      {withText && (
        <div className="flex flex-col justify-center">
            <motion.span 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="font-black text-2xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400"
            >
                Thriviyo<span className="text-indigo-500">.</span>
            </motion.span>
        </div>
      )}
    </div>
  );
};