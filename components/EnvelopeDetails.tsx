import React from 'react';
import { Envelope } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { X } from 'lucide-react';

interface EnvelopeDetailsProps {
  envelope: Envelope;
  onClose: () => void;
}

export const EnvelopeDetails: React.FC<EnvelopeDetailsProps> = ({ envelope, onClose }) => {
  const data = [
    { name: 'Used', value: envelope.total - envelope.amount },
    { name: 'Remaining', value: envelope.amount },
  ];

  const burnRate = (envelope.total - envelope.amount) / 7; // Mock burn rate logic

  return (
    <div className="p-6 h-full flex flex-col bg-zinc-950 text-zinc-50">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-zinc-100">{envelope.name}</h2>
          <p className="text-zinc-500">Weekly Envelope</p>
        </div>
        <button onClick={onClose} className="p-2 bg-zinc-800 rounded-full hover:bg-zinc-700 transition border border-white/5">
          <X className="w-5 h-5 text-zinc-400" />
        </button>
      </div>

      <div className="h-48 w-full mb-6 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
            >
              <Cell key="cell-used" fill="#27272a" />
              <Cell key="cell-remaining" fill="#ffffff" className="drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-3xl font-bold text-zinc-100">₹{envelope.amount}</span>
            <span className="text-xs text-zinc-500">Left</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-zinc-900 p-4 rounded-xl border border-white/5">
          <p className="text-xs text-zinc-500 mb-1">Total Budget</p>
          <p className="text-lg font-bold text-zinc-200">₹{envelope.total}</p>
        </div>
        <div className="bg-zinc-900 p-4 rounded-xl border border-white/5">
          <p className="text-xs text-zinc-500 mb-1">Daily Burn</p>
          <p className="text-lg font-bold text-zinc-200">~₹{burnRate.toFixed(2)}</p>
        </div>
      </div>

      <button className="w-full py-4 bg-white text-black font-bold rounded-xl mt-auto shadow-lg shadow-white/10 active:scale-[0.98] transition-all hover:bg-zinc-200">
        Reassign Funds
      </button>
    </div>
  );
};