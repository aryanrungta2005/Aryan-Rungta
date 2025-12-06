import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFinance } from '../context/FinanceContext';
import { motion } from 'framer-motion';
import { Users, ArrowLeft, Plus, Wallet, Clock, CheckCircle, Check } from 'lucide-react';

export const Pods: React.FC = () => {
    const navigate = useNavigate();
    const { pods, addPod, settlePod } = useFinance();
    const [showCreate, setShowCreate] = useState(false);
    const [newPodName, setNewPodName] = useState('');

    const handleCreatePod = () => {
        if (!newPodName) return;
        addPod({
            id: Date.now().toString(),
            title: newPodName,
            members: 1,
            type: 'split',
            totalAmount: 0,
            userAmount: 0,
            userStatus: 'All settled',
            actionRequired: false
        });
        setNewPodName('');
        setShowCreate(false);
    };

    const handleSettle = (id: string) => {
        settlePod(id);
    };

    return (
        <div className="bg-obsidian min-h-screen pb-32 md:pb-12">
            {/* Header */}
            <div className="bg-gradient-to-b from-carbon to-obsidian px-6 pt-12 pb-24 rounded-b-[2.5rem] shadow-2xl relative overflow-hidden border-b border-white/5 md:bg-none md:pt-10 md:pb-0 md:mb-10 md:border-none md:shadow-none">
                <div className="absolute top-0 right-0 w-full h-full bg-soft-glow opacity-60 pointer-events-none md:opacity-20"></div>
                <div className="absolute top-[-50px] left-[-50px] w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none"></div>

                <div className="max-w-7xl mx-auto md:flex md:justify-between md:items-center relative z-10 mb-6 md:mb-12">
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate(-1)} className="md:hidden bg-charcoal p-2 rounded-full text-zinc-300 hover:text-white hover:bg-zinc-800 transition border border-white/5 shadow-lg">
                            <ArrowLeft size={20} />
                        </button>
                        <div>
                            <h1 className="text-white text-2xl md:text-3xl font-bold tracking-tight">Money Pods</h1>
                            <p className="text-zinc-400 text-xs md:text-sm font-medium">Split & save with friends</p>
                        </div>
                    </div>
                </div>
                
                {/* Stats Row */}
                <div className="flex gap-4 absolute bottom-0 left-6 right-6 translate-y-1/2 z-10 md:relative md:translate-y-0 md:left-0 md:right-0 md:max-w-7xl md:mx-auto md:justify-start md:mb-8">
                    <div className="bg-charcoal p-5 rounded-[1.5rem] flex-1 md:flex-none md:w-64 text-white shadow-xl shadow-black/50 border border-white/5">
                        <div className="flex items-center gap-2 mb-2 opacity-70">
                            <Users size={14} className="text-indigo-400" />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Active Pods</span>
                        </div>
                        <p className="text-2xl font-bold tracking-tight">{pods.length}</p>
                    </div>
                    <div className="bg-charcoal p-5 rounded-[1.5rem] flex-1 md:flex-none md:w-64 text-white shadow-xl shadow-black/50 border border-white/5">
                        <div className="flex items-center gap-2 mb-2 opacity-70">
                            <Wallet size={14} className="text-emerald-400" />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Total Saved</span>
                        </div>
                        <p className="text-2xl font-bold tracking-tight">₹11,100</p>
                    </div>
                </div>
            </div>

            <div className="mt-16 md:mt-0 px-6 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Create/Join Card */}
                    {!showCreate && (
                        <button 
                            onClick={() => setShowCreate(true)}
                            className="w-full min-h-[250px] border border-dashed border-zinc-700 hover:border-indigo-500/50 rounded-[2rem] p-6 flex flex-col items-center justify-center gap-5 bg-white/[0.02] hover:bg-indigo-500/[0.05] transition-colors group order-first"
                        >
                            <div className="w-16 h-16 bg-charcoal rounded-2xl flex items-center justify-center text-zinc-400 group-hover:scale-110 transition-transform border border-white/5 shadow-lg group-hover:text-indigo-400 group-hover:border-indigo-500/30">
                                <Plus size={32} />
                            </div>
                            <div className="text-center">
                                <span className="text-zinc-200 font-bold block group-hover:text-white text-lg">Create or Join Pod</span>
                                <span className="text-zinc-500 text-sm text-center font-medium mt-1">Start splitting expenses or saving with friends</span>
                            </div>
                        </button>
                    )}

                    {/* Create Pod Input */}
                    {showCreate && (
                        <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            className="bg-charcoal p-6 rounded-[2rem] shadow-xl border border-white/10 flex flex-col justify-center"
                        >
                            <h3 className="font-bold text-zinc-200 mb-3 tracking-tight text-lg">Create New Pod</h3>
                            <input 
                                value={newPodName}
                                onChange={(e) => setNewPodName(e.target.value)}
                                placeholder="Pod Name (e.g. Goa Trip)"
                                className="w-full bg-black/40 p-4 rounded-xl mb-6 outline-none focus:ring-1 focus:ring-indigo-500/50 text-white placeholder-zinc-600 border border-white/5 transition-all"
                                autoFocus
                            />
                            <div className="flex gap-3">
                                <button onClick={() => setShowCreate(false)} className="flex-1 py-3 text-zinc-400 hover:text-white transition-colors text-sm font-bold">Cancel</button>
                                <button onClick={handleCreatePod} className="flex-1 bg-white hover:bg-indigo-50 text-black rounded-xl py-3 font-bold shadow-lg transition-colors text-sm">Create</button>
                            </div>
                        </motion.div>
                    )}

                    {pods.map((pod, idx) => (
                        <motion.div 
                            key={pod.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-card-gradient p-6 rounded-[2rem] shadow-xl border border-white/5 flex flex-col justify-between min-h-[250px]"
                        >
                            <div>
                                <div className="flex justify-between items-start mb-5">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${pod.type === 'split' ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-300' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300'}`}>
                                            <Users size={22} strokeWidth={1.5} />
                                        </div>
                                        <div>
                                            <h3 className="text-zinc-100 font-bold text-lg tracking-tight">{pod.title}</h3>
                                            <p className="text-xs text-zinc-500 font-medium mt-0.5">{pod.members} members • {pod.type === 'split' ? 'Split Expenses' : 'Group Saving'}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mb-1">{pod.userStatus}</p>
                                        <p className={`font-bold text-lg tracking-tight ${pod.userStatus === 'Settled' ? 'text-emerald-400' : 'text-zinc-200'}`}>
                                            {pod.type === 'split' ? `₹${pod.userAmount}` : `₹${pod.savedAmount} / ₹${pod.targetAmount}`}
                                        </p>
                                    </div>
                                </div>

                                {pod.type === 'split' ? (
                                    <>
                                        {pod.actionRequired ? (
                                            <div className="space-y-3 mb-5">
                                                <div className="flex justify-between items-center bg-black/20 p-4 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                                                        <div>
                                                            <p className="text-xs font-bold text-zinc-200">Rohit</p>
                                                            <p className="text-[10px] text-zinc-500">Pending payment</p>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <span className="block text-sm font-bold text-amber-500">₹1000</span>
                                                        <button onClick={() => handleSettle(pod.id)} className="text-[10px] text-indigo-400 underline font-medium hover:text-indigo-300 transition-colors">Settle Now</button>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="mb-5 bg-emerald-500/5 p-3 rounded-xl flex items-center justify-center gap-2 text-emerald-400 text-xs font-bold border border-emerald-500/10">
                                                <CheckCircle size={14} /> All debts settled for now
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        <div className="w-full h-2 bg-black/50 rounded-full overflow-hidden mb-5 border border-white/5">
                                            <div className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full shadow-[0_0_10px_rgba(52,211,153,0.3)]" style={{ width: `${(pod.savedAmount! / pod.targetAmount!) * 100}%` }} />
                                        </div>
                                        <div className="space-y-2 mb-5 px-1">
                                            <div className="flex justify-between text-xs items-center">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-5 h-5 rounded-full bg-zinc-800 border border-white/10 text-[8px] flex items-center justify-center text-white">AK</div>
                                                    <span className="text-zinc-400">Aisha</span>
                                                </div>
                                                <span className="font-bold text-zinc-200">₹2,500</span>
                                            </div>
                                            <div className="flex justify-between text-xs items-center">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-5 h-5 rounded-full bg-zinc-800 border border-white/10 text-[8px] flex items-center justify-center text-white">R</div>
                                                    <span className="text-zinc-400">Rohit</span>
                                                </div>
                                                <span className="font-bold text-zinc-200">₹1,800</span>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                            
                            <div className="flex gap-3 mt-auto">
                                <button className="flex-1 bg-white text-black py-3 rounded-xl text-sm font-bold shadow-lg hover:bg-zinc-200 transition-colors">
                                    View Details
                                </button>
                                <button className="flex-1 bg-transparent border border-zinc-700 text-zinc-300 py-3 rounded-xl text-sm font-bold hover:bg-zinc-800 hover:text-white hover:border-zinc-500 transition-colors">
                                    {pod.type === 'split' ? 'Add Expense' : 'Contribute'}
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};