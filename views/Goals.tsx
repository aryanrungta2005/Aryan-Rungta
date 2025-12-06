import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFinance } from '../context/FinanceContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Lock, Plus, Calendar, Monitor, Plane, BookOpen, ShoppingBag, TrendingUp, Car, ShieldAlert, AlertTriangle, CheckCircle2, X, Wallet } from 'lucide-react';

const CircularProgress: React.FC<{ percent: number }> = ({ percent }) => {
    const radius = 32;
    const stroke = 6;
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (percent / 100) * circumference;
    
    return (
        <div className="relative w-20 h-20 flex items-center justify-center shrink-0">
             <svg height={radius * 2} width={radius * 2} className="rotate-[-90deg]">
                <circle
                    stroke="#18181b"
                    strokeWidth={stroke}
                    fill="transparent"
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                />
                <motion.circle
                    stroke="url(#gradient)"
                    strokeWidth={stroke}
                    fill="transparent"
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                    strokeDasharray={circumference + ' ' + circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset }}
                    transition={{ duration: 1 }}
                    strokeLinecap="round"
                    className="drop-shadow-[0_0_8px_rgba(139,92,246,0.3)]"
                />
                <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#8b5cf6" />
                        <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                </defs>
             </svg>
             <span className="absolute text-sm font-bold text-white">{Math.min(100, percent)}%</span>
        </div>
    );
};

export const Goals: React.FC = () => {
    const navigate = useNavigate();
    const { goals, updateGoal, emergencyWithdraw } = useFinance();
    
    const [showWithdrawModal, setShowWithdrawModal] = useState(false);
    const [withdrawStep, setWithdrawStep] = useState<'nudge' | 'input' | 'success'>('nudge');
    const [withdrawAmount, setWithdrawAmount] = useState('');

    const handleTopUp = (id: string) => {
        updateGoal(id, 200);
    };

    const totalSecured = goals.reduce((acc, g) => acc + g.current, 0);

    const openWithdrawModal = () => {
        if (totalSecured > 0) {
            setWithdrawStep('nudge');
            setWithdrawAmount('');
            setShowWithdrawModal(true);
        }
    };

    const handleConfirmWithdraw = () => {
        const amount = parseFloat(withdrawAmount);
        if (isNaN(amount) || amount <= 0 || amount > totalSecured) return;

        emergencyWithdraw(amount);
        setWithdrawStep('success');
        setTimeout(() => {
            setShowWithdrawModal(false);
        }, 2500);
    };

    const setMaxWithdraw = () => {
        setWithdrawAmount(totalSecured.toString());
    };

    return (
        <div className="bg-obsidian min-h-screen pb-32 md:pb-12 relative">
            {/* Header */}
            <div className="bg-gradient-to-b from-carbon to-obsidian px-6 pt-12 pb-8 rounded-b-[2.5rem] mb-6 relative overflow-hidden border-b border-white/5 shadow-2xl shadow-black/40 md:bg-none md:pt-10 md:pb-0 md:mb-10 md:border-none md:shadow-none">
                {/* Decorative Elements matching Dashboard */}
                <div className="absolute top-0 left-0 w-full h-full bg-soft-glow opacity-60 pointer-events-none md:opacity-20"></div>
                <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-violet-500/10 rounded-full blur-[80px] pointer-events-none"></div>
                
                <div className="max-w-7xl mx-auto md:flex md:justify-between md:items-center">
                    <div className="flex items-center gap-4 mb-6 md:mb-0 relative z-10">
                        <button onClick={() => navigate(-1)} className="md:hidden bg-charcoal p-2 rounded-full text-zinc-300 hover:text-white hover:bg-zinc-800 transition border border-white/5 shadow-lg">
                            <ArrowLeft size={20} />
                        </button>
                        <div>
                            <h1 className="text-white text-2xl md:text-3xl font-bold tracking-tight">Your Goals</h1>
                            <p className="text-zinc-400 text-xs md:text-sm font-medium">Building dreams, one rupee at a time</p>
                        </div>
                    </div>

                    <div className="bg-charcoal/80 backdrop-blur-md rounded-2xl p-5 flex items-center gap-5 border border-white/5 relative z-10 shadow-xl shadow-black/20 md:min-w-[300px]">
                        <div className="bg-indigo-500/10 p-3.5 rounded-xl border border-indigo-500/20 shadow-inner">
                            <Lock className="text-indigo-400 w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-zinc-500 text-xs font-medium uppercase tracking-wider mb-0.5">Locked Wallet</p>
                            <p className="text-white text-2xl font-bold tracking-tight">₹{totalSecured.toLocaleString()}</p>
                        </div>
                        <div className="ml-auto text-right">
                            <button 
                                onClick={openWithdrawModal}
                                className="text-[10px] text-zinc-400 border-b border-zinc-700 pb-0.5 cursor-pointer hover:text-red-400 hover:border-red-400 transition-all"
                            >
                                Emergency<br/>withdraw?
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Goals Grid */}
            <div className="px-6 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {/* Create New Goal Card */}
                    <button 
                        onClick={() => navigate('/goals/new')}
                        className="w-full h-full min-h-[280px] border border-dashed border-zinc-700 hover:border-indigo-500/50 rounded-[2rem] p-6 flex flex-col items-center justify-center gap-5 bg-white/[0.02] hover:bg-indigo-500/[0.05] transition-all group order-first md:col-span-1"
                    >
                        <div className="w-16 h-16 bg-charcoal rounded-full flex items-center justify-center text-zinc-400 group-hover:scale-110 transition-transform border border-white/5 group-hover:text-indigo-400 group-hover:border-indigo-500/30 shadow-lg">
                            <Plus size={32} />
                        </div>
                        <div className="text-center">
                            <span className="text-zinc-200 font-bold block group-hover:text-white text-lg">Create New Goal</span>
                            <span className="text-zinc-500 text-sm font-medium mt-1">Start saving for something special</span>
                        </div>
                    </button>

                    {goals.map((goal, idx) => {
                        const percent = Math.round((goal.current / goal.target) * 100);
                        return (
                            <motion.div 
                                key={goal.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-card-gradient p-6 rounded-[2rem] shadow-xl border border-white/5 flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex items-start gap-5 mb-5">
                                        <CircularProgress percent={percent} />
                                        <div className="flex-1 pt-1 overflow-hidden">
                                            <h3 className="text-zinc-100 font-bold text-lg tracking-tight truncate">{goal.name}</h3>
                                            <p className="text-zinc-400 text-sm font-medium mt-1">₹{goal.current.toLocaleString()} / ₹{goal.target.toLocaleString()}</p>
                                            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3 text-xs text-zinc-500 font-medium">
                                                <span className="flex items-center gap-1.5"><Calendar size={12}/> {goal.daysLeft} days left</span>
                                                {goal.locked && <span className="flex items-center gap-1 text-indigo-400/80 bg-indigo-500/10 px-2 py-1 rounded-md border border-indigo-500/20"><Lock size={10}/> Locked</span>}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Milestones / Alert */}
                                    {goal.milestones && goal.milestones.length > 0 && (
                                        <div className="bg-black/30 p-3 rounded-xl border border-white/5 mb-5">
                                            <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-1">Next Milestone</p>
                                            <p className="text-zinc-300 text-xs font-medium">{goal.milestones[0]}</p>
                                        </div>
                                    )}

                                    {goal.status === 'behind' && (
                                        <div className="mb-5 bg-red-900/10 p-3 rounded-xl border border-red-500/10 flex items-start gap-3">
                                            <TrendingUp className="text-red-400 w-4 h-4 mt-0.5 shrink-0" />
                                            <p className="text-red-200/80 text-xs font-medium leading-relaxed">
                                                Behind schedule. Increase to ₹{goal.weeklySave + 375}?
                                            </p>
                                        </div>
                                    )}
                                </div>
                                
                                {/* Actions */}
                                <div className="flex gap-3 mt-auto">
                                    <button 
                                        onClick={() => handleTopUp(goal.id)}
                                        className="flex-1 bg-white hover:bg-indigo-50 text-black py-3 rounded-xl text-sm font-bold shadow-lg shadow-white/5 active:scale-95 transition-all"
                                    >
                                        Top-up ₹200
                                    </button>
                                    <button className="flex-1 bg-transparent border border-zinc-700 text-zinc-300 py-3 rounded-xl text-sm font-bold active:bg-zinc-800 transition-colors hover:border-zinc-500 hover:text-white">
                                        Rebalance
                                    </button>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Popular Ideas */}
                <div className="mb-8">
                    <h3 className="text-zinc-200 font-bold text-lg mb-5 tracking-tight">Popular Goal Ideas</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {[
                            { icon: Monitor, name: 'Laptop', avg: '~₹45K' },
                            { icon: Plane, name: 'Trip', avg: '~₹15K' },
                            { icon: BookOpen, name: 'Course', avg: '~₹10K' },
                            { icon: ShoppingBag, name: 'Shopping', avg: '~₹5K' },
                            { icon: Car, name: 'Scooty', avg: '~₹80K' },
                            { icon: Calendar, name: 'Event', avg: '~₹5K' },
                        ].map((idea, i) => (
                            <div key={i} className="bg-charcoal p-5 rounded-2xl border border-white/5 flex flex-col items-center text-center hover:border-indigo-500/30 hover:bg-graphite transition-all cursor-pointer group shadow-lg">
                                 <div className="w-10 h-10 bg-black/40 rounded-full flex items-center justify-center text-zinc-500 mb-3 group-hover:bg-indigo-500/10 group-hover:text-indigo-400 transition-all border border-white/5">
                                    <idea.icon size={18} />
                                 </div>
                                 <span className="text-zinc-200 font-bold text-sm mb-0.5">{idea.name}</span>
                                 <span className="text-zinc-600 text-xs font-medium">{idea.avg}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Withdraw Modal */}
            <AnimatePresence>
                {showWithdrawModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowWithdrawModal(false)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        />
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="bg-charcoal border border-white/10 p-6 rounded-[2rem] shadow-2xl relative z-10 w-full max-w-sm overflow-hidden"
                        >
                            {/* Step 1: Nudge */}
                            {withdrawStep === 'nudge' && (
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-indigo-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-indigo-500/20 shadow-[0_0_20px_rgba(99,102,241,0.2)]">
                                        <ShieldAlert className="text-indigo-400 w-8 h-8" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">Wait! Your dreams are growing.</h3>
                                    <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
                                        You've secured <span className="text-white font-bold">₹{totalSecured.toLocaleString()}</span>. 
                                        Withdrawing now will pause your progress on {goals.length} active goals.
                                    </p>
                                    <div className="space-y-3">
                                        <button 
                                            onClick={() => setShowWithdrawModal(false)}
                                            className="w-full bg-white text-black font-bold py-4 rounded-xl shadow-lg hover:bg-zinc-200 transition-colors"
                                        >
                                            Keep it Locked (Recommended)
                                        </button>
                                        <button 
                                            onClick={() => setWithdrawStep('input')}
                                            className="w-full bg-transparent text-zinc-500 font-bold py-2 rounded-xl text-sm hover:text-zinc-300 transition-colors"
                                        >
                                            I really need the money
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Step 2: Input Amount */}
                            {withdrawStep === 'input' && (
                                <div className="text-center">
                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="text-lg font-bold text-white">Emergency Withdraw</h3>
                                        <div className="bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                                            <span className="text-[10px] text-zinc-400 uppercase font-bold mr-1">Available:</span>
                                            <span className="text-xs font-bold text-emerald-400">₹{totalSecured.toLocaleString()}</span>
                                        </div>
                                    </div>
                                    
                                    <div className="bg-black/30 p-5 rounded-2xl mb-4 border border-white/5 shadow-inner">
                                        <div className="flex items-center justify-center">
                                            <span className="text-2xl font-bold text-zinc-500 mr-2">₹</span>
                                            <input 
                                                type="number"
                                                value={withdrawAmount}
                                                onChange={(e) => setWithdrawAmount(e.target.value)}
                                                className="bg-transparent text-4xl font-bold text-white w-full text-center outline-none placeholder-zinc-700"
                                                placeholder="0"
                                                autoFocus
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="flex gap-2 mb-6">
                                        {[1000, 2000, 5000].map(amt => (
                                            <button 
                                                key={amt}
                                                onClick={() => setWithdrawAmount(amt.toString())}
                                                disabled={amt > totalSecured}
                                                className="flex-1 py-2 rounded-lg bg-zinc-800 text-xs font-bold text-zinc-400 border border-white/5 hover:bg-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed"
                                            >
                                                ₹{amt}
                                            </button>
                                        ))}
                                        <button onClick={setMaxWithdraw} className="px-3 py-2 rounded-lg bg-indigo-500/10 text-xs font-bold text-indigo-400 border border-indigo-500/20 hover:bg-indigo-500/20">Max</button>
                                    </div>

                                    <div className="space-y-3">
                                        <button 
                                            onClick={handleConfirmWithdraw}
                                            disabled={!withdrawAmount || parseFloat(withdrawAmount) <= 0 || parseFloat(withdrawAmount) > totalSecured}
                                            className="w-full bg-red-500/10 text-red-400 border border-red-500/30 font-bold py-4 rounded-xl shadow-lg hover:bg-red-500 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Confirm Withdraw
                                        </button>
                                        <button 
                                            onClick={() => setWithdrawStep('nudge')}
                                            className="w-full bg-transparent text-zinc-500 font-bold py-2 rounded-xl text-sm hover:text-zinc-300 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Step 3: Success */}
                            {withdrawStep === 'success' && (
                                <div className="text-center py-4">
                                    <motion.div 
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                                    >
                                        <CheckCircle2 className="text-emerald-400 w-10 h-10" />
                                    </motion.div>
                                    <h3 className="text-xl font-bold text-white mb-2">Transfer Initiated</h3>
                                    <p className="text-zinc-400 text-sm">
                                        <span className="text-white font-bold">₹{parseFloat(withdrawAmount).toLocaleString()}</span> is on its way to your bank.
                                    </p>
                                </div>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};