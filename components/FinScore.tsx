import React from 'react';
import { motion } from 'framer-motion';

interface FinScoreProps {
  spent: number;
  dailyBudget: number;
}

export const FinScore: React.FC<FinScoreProps> = ({ spent, dailyBudget }) => {
  const remaining = Math.max(0, dailyBudget - spent);
  const percent = Math.min(100, Math.max(0, (remaining / dailyBudget) * 100));
  
  const radius = 75; // Increased slightly
  const stroke = 8;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percent / 100) * circumference;
  const size = radius * 2;

  return (
    <div className="flex flex-col items-center justify-center py-6">
      <div className="relative" style={{ width: size, height: size }}>
        {/* SVG Container */}
        <svg 
            width={size} 
            height={size} 
            viewBox={`0 0 ${size} ${size}`}
            className="rotate-[-90deg] overflow-visible"
        >
          <defs>
            <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8b5cf6" /> {/* Violet */}
              <stop offset="100%" stopColor="#3b82f6" /> {/* Blue */}
            </linearGradient>
          </defs>

          {/* Background Track */}
          <circle
            stroke="rgba(255, 255, 255, 0.05)"
            strokeWidth={stroke}
            fill="transparent"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            strokeLinecap="round"
          />
          {/* Progress Indicator */}
          <motion.circle
            stroke="url(#ringGradient)"
            strokeWidth={stroke}
            fill="transparent"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            strokeDasharray={circumference + ' ' + circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            strokeLinecap="round"
            className="drop-shadow-[0_0_15px_rgba(139,92,246,0.4)]"
          />
        </svg>

        {/* Centered Text Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
            <motion.div 
              className="flex items-baseline justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <span className="text-4xl font-black text-white tracking-tighter drop-shadow-lg">₹{remaining}</span>
            </motion.div>
            <span className="text-xs text-zinc-400 font-bold tracking-widest uppercase mt-1">left today</span>
        </div>
      </div>

      <motion.div 
        className="mt-6 bg-white/5 border border-white/5 px-5 py-2 rounded-full backdrop-blur-md flex items-center gap-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
        <p className="text-zinc-300 text-xs font-medium tracking-wide">
          Spent <span className="text-white font-bold">₹{spent}</span> of <span className="text-zinc-400">₹{dailyBudget}</span>
        </p>
      </motion.div>
    </div>
  );
};