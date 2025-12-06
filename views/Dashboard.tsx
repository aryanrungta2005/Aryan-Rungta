import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FinScore } from '../components/FinScore';
import { Logo } from '../components/Logo';
import { Bell, ArrowRight, Zap, Lock, TrendingUp, Circle, Pizza, ShoppingCart, Sparkles, Car, Layers, Book, Users, Plus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useFinance } from '../context/FinanceContext';
import { getSmartNudgeAI } from '../services/ai';

const getCategoryIcon = (iconName?: string) => {
    switch(iconName) {
        case 'pizza': return Pizza;
        case 'shopping-cart': return ShoppingCart;
        case 'sparkles': return Sparkles;
        case 'car': return Car;
        case 'layers': return Layers;
        case 'book': return Book;
        default: return Circle;
    }
}

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { spentToday, dailyBudget, categories } = useFinance();
  const [smartNudge, setSmartNudge] = useState<string>("Analyzing your spending habits...");
  const [loadingNudge, setLoadingNudge] = useState(true);

  useEffect(() => {
    const fetchNudge = async () => {
        const tip = await getSmartNudgeAI(spentToday, dailyBudget, categories);
        setSmartNudge(tip);
        setLoadingNudge(false);
    };
    const timer = setTimeout(fetchNudge, 1000);
    return () => clearTimeout(timer);
  }, [spentToday, dailyBudget]);

  const sortedCategories = [...categories].sort((a, b) => b.amount - a.amount).slice(0, 4);

  return (
    <div className="pb-32 md:pb-12 bg-obsidian min-h-screen">
      {/* Header Section */}
      <div className="bg-gradient-to-b from-carbon to-obsidian rounded-b-[2.5rem] md:rounded-b-none md:bg-none px-6 pt-8 pb-10 md:pt-10 mb-8 relative border-b border-white/5 md:border-none shadow-2xl shadow-black/40 md:shadow-none">
         {/* Decorative elements - subtle light leaks */}
         <div className="absolute top-0 right-0 w-full h-full bg-soft-glow opacity-60 pointer-events-none md:opacity-20"></div>
         
         <div className="max-w-7xl mx-auto">
            {/* Mobile Brand Header */}
            <div className="flex md:hidden justify-between items-center mb-8 relative z-10">
                <Logo className="w-9 h-9" />
                <div className="relative group" onClick={() => navigate('/notifications')}>
                    <div className="h-10 w-10 bg-charcoal rounded-full flex items-center justify-center hover:bg-zinc-800 transition-colors cursor-pointer border border-white/5 shadow-lg active:scale-95">
                        <Bell className="text-zinc-300 w-5 h-5" />
                    </div>
                    <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-carbon shadow-[0_0_8px_rgba(244,63,94,0.6)]"></div>
                </div>
            </div>

            {/* Desktop Header */}
            <div className="hidden md:flex justify-between items-center mb-10">
                 <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight mb-1">Dashboard</h1>
                    <p className="text-zinc-400 font-medium">Overview of your finances</p>
                 </div>
                 <div className="flex gap-4">
                     <button onClick={() => navigate('/notifications')} className="h-12 w-12 bg-charcoal rounded-full flex items-center justify-center hover:bg-zinc-800 transition-colors border border-white/5 shadow-lg relative">
                        <Bell className="text-zinc-300 w-5 h-5" />
                        <div className="absolute top-1 right-2 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-carbon"></div>
                     </button>
                 </div>
            </div>

            {/* Main Hero Section with Ring */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center md:bg-carbon/50 md:p-8 md:rounded-[2.5rem] md:border md:border-white/5 md:shadow-2xl">
                <div className="text-center lg:text-left md:order-1 order-2">
                    <div className="mb-6 hidden lg:block">
                        <h1 className="text-zinc-100 text-3xl font-bold flex items-center gap-2 tracking-tight">
                        Hey Aisha! <span className="text-3xl animate-pulse grayscale-0">👋</span>
                        </h1>
                        <p className="text-zinc-400 font-medium mt-2">Let's check your spending pulse</p>
                    </div>

                     {/* Mobile greeting */}
                     <div className="lg:hidden mb-6 text-left relative z-10 px-1">
                        <h1 className="text-zinc-100 text-2xl font-bold flex items-center gap-2 tracking-tight">
                        Hey Aisha! <span className="text-2xl animate-pulse grayscale-0">👋</span>
                        </h1>
                        <p className="text-zinc-400 text-sm font-medium">Let's check your spending pulse</p>
                    </div>
                </div>

                <div className="md:order-2 order-1 flex justify-center lg:justify-end">
                    <FinScore spent={spentToday} dailyBudget={dailyBudget} />
                </div>
            </div>
         </div>
      </div>

      <div className="px-5 md:px-8 max-w-7xl mx-auto space-y-6">
        
        {/* Desktop Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Weekly Envelope */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card-gradient p-6 rounded-[2rem] shadow-lg border border-white/5 relative overflow-hidden flex flex-col justify-between"
            >
                <div className="flex justify-between items-center mb-4 relative z-10">
                    <h3 className="text-zinc-200 font-bold text-lg tracking-tight">This Week's Envelope</h3>
                    <span className="text-indigo-300 text-[10px] font-bold uppercase tracking-widest bg-indigo-500/10 px-3 py-1.5 rounded-full border border-indigo-500/20">Week 2</span>
                </div>
                <div className="w-full h-3 bg-black/40 rounded-full overflow-hidden mb-4 border border-white/5 relative z-10">
                    <div 
                        className="h-full bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full transition-all duration-1000 shadow-[0_0_15px_rgba(99,102,241,0.3)]" 
                        style={{ width: `${Math.min(100, (spentToday / (dailyBudget * 7)) * 100)}%` }}
                    />
                </div>
                <div className="flex justify-between text-sm relative z-10">
                    <span className="text-zinc-400 font-medium">₹{spentToday} spent</span>
                    <span className="text-white font-bold">₹{dailyBudget * 7} budget</span>
                </div>
            </motion.div>

            {/* Smart Nudge (AI Powered) */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-gradient-to-br from-charcoal to-[#1a1a1d] p-6 rounded-[2rem] shadow-xl border border-white/5 relative overflow-hidden group flex flex-col md:col-span-1"
            >
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-[50px] transition-all duration-700 group-hover:bg-amber-500/20"></div>
                <div className="flex items-start gap-4 relative z-10 h-full">
                    <div className="bg-amber-500/10 p-3 rounded-full min-w-[42px] flex items-center justify-center border border-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.2)]">
                        <Zap className={`w-5 h-5 text-amber-400 ${loadingNudge ? 'animate-pulse' : ''}`} fill="currentColor" />
                    </div>
                    <div className="flex-1 flex flex-col h-full">
                        <h4 className="text-amber-400 font-bold mb-2 flex items-center gap-2 text-xs uppercase tracking-widest">
                            AI Insight 
                            {loadingNudge && <span className="text-[10px] text-zinc-600 font-normal animate-pulse normal-case tracking-normal ml-2">Thinking...</span>}
                        </h4>
                        <p className="text-zinc-200 text-sm leading-relaxed mb-4 font-medium pr-2 flex-grow">
                            {smartNudge}
                        </p>
                        <button className="text-zinc-900 text-xs font-bold flex items-center bg-white px-4 py-2 rounded-full w-fit hover:bg-zinc-200 transition-all shadow-lg shadow-white/10 mt-auto">
                            Take Action <ArrowRight className="w-3 h-3 ml-1.5" />
                        </button>
                    </div>
                </div>
            </motion.div>

            {/* Money Status */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-card-gradient p-6 rounded-[2rem] shadow-xl border border-white/5 flex flex-col justify-center"
            >
                <h3 className="text-zinc-200 font-bold text-lg mb-5 tracking-tight">Your Money Status</h3>
                <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-2xl bg-black/20 hover:bg-black/40 transition-colors border border-transparent hover:border-white/5 cursor-pointer">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-inner">
                                <Lock className="w-4 h-4" />
                            </div>
                            <div>
                                <p className="text-zinc-200 font-semibold text-sm">Rent Secured</p>
                                <p className="text-zinc-500 text-xs">₹4,000 locked</p>
                            </div>
                        </div>
                        <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/5 px-2.5 py-1 rounded-full flex items-center gap-1 border border-emerald-500/10">
                            <span className="text-[8px]">●</span> Locked
                        </span>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-2xl bg-black/20 hover:bg-black/40 transition-colors border border-transparent hover:border-white/5 cursor-pointer">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shadow-inner">
                                <TrendingUp className="w-4 h-4" />
                            </div>
                            <div>
                                <p className="text-zinc-200 font-semibold text-sm">Auto-Invest SIP</p>
                                <p className="text-zinc-500 text-xs">₹100 weekly</p>
                            </div>
                        </div>
                        <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/5 px-2.5 py-1 rounded-full flex items-center gap-1 border border-emerald-500/10">
                            <span className="text-[8px]">●</span> Active
                        </span>
                    </div>
                </div>
            </motion.div>

            {/* Spending Categories - Span 2 cols on Tablet/Desktop */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-card-gradient p-6 rounded-[2rem] shadow-lg border border-white/5 md:col-span-2 lg:col-span-2"
            >
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-zinc-200 font-bold text-lg tracking-tight">Where You're Spending</h3>
                    <button className="text-indigo-400 text-xs font-bold uppercase tracking-wide hover:text-indigo-300 transition-colors">View All</button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {sortedCategories.map(cat => {
                        const Icon = getCategoryIcon(cat.icon);
                        return (
                            <div key={cat.id} className="flex flex-col items-center md:items-start md:flex-row gap-3 group cursor-pointer p-4 rounded-xl bg-black/20 hover:bg-white/5 transition-all border border-transparent hover:border-white/5">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${cat.bg} border border-white/5 shadow-inner mb-2 md:mb-0`}>
                                    <Icon className={`w-6 h-6 ${cat.color}`} strokeWidth={2} />
                                </div>
                                <div className="text-center md:text-left">
                                    <p className="text-zinc-200 font-bold text-sm">{cat.name}</p>
                                    <p className="text-zinc-500 text-xs font-medium">₹{cat.amount}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </motion.div>

             {/* Auto-UPI Split Banner - Span 1 col */}
            <div className="bg-gradient-to-r from-zinc-900 to-charcoal p-6 rounded-[2rem] flex flex-col justify-between border border-white/5 shadow-lg relative overflow-hidden group cursor-pointer hover:border-indigo-500/30 transition-all md:col-span-1">
                 <div className="absolute left-0 top-0 w-1 h-full bg-indigo-500"></div>
                 
                 <div className="flex items-start justify-between mb-4">
                    <div className="bg-indigo-500/10 p-2.5 rounded-full border border-indigo-500/20 group-hover:bg-indigo-500/20 transition-colors shadow-[0_0_10px_rgba(99,102,241,0.2)]">
                        <Zap className="w-5 h-5 text-indigo-400" fill="currentColor" />
                    </div>
                    <div className="text-right">
                        <p className="text-white font-bold text-2xl">₹1,250</p>
                        <p className="text-[10px] text-zinc-500 font-medium">at 11:59 PM</p>
                    </div>
                 </div>

                 <div>
                    <p className="text-zinc-200 font-bold text-sm">Auto-UPI Split</p>
                    <div className="flex items-center gap-1.5 text-xs text-zinc-500 mt-1">
                        <span className="text-indigo-400 font-bold">3 bills</span>
                        <span>•</span>
                        <span>Pizza, Uber, Movie</span>
                    </div>
                 </div>
            </div>
        </div>
        
        {/* Quick Actions (Mobile Only - Desktop has sidebar) */}
        <div className="flex md:hidden gap-3 pb-8">
             <button onClick={() => navigate('/add')} className="flex-[1.5] bg-white text-black py-4 rounded-2xl font-bold shadow-[0_0_20px_rgba(255,255,255,0.1)] flex items-center justify-center gap-2 active:scale-95 transition-all hover:scale-[1.02] hover:bg-zinc-100">
                 <span className="bg-black text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] shadow-sm">+</span> Add Expense
             </button>
             <button onClick={() => navigate('/split')} className="flex-1 bg-charcoal border border-white/10 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 active:bg-graphite transition-all hover:bg-zinc-800 hover:border-white/20 shadow-lg group">
                <Users size={16} className="text-zinc-400 group-hover:text-indigo-400 transition-colors"/> Split Bill
             </button>
             <button onClick={() => navigate('/goals/new')} className="flex-1 bg-charcoal border border-white/10 text-white py-4 rounded-2xl font-bold flex items-center justify-center active:bg-graphite transition-all hover:bg-zinc-800 hover:border-white/20 shadow-lg">
                 Create Goal
             </button>
        </div>

      </div>
    </div>
  );
};