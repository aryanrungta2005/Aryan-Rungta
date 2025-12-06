import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, UserPlus, Check, X, CreditCard, Receipt, Users, Share2 } from 'lucide-react';

const FRIENDS = [
    { id: 1, name: 'Sarah', img: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Sarah&backgroundColor=18181b' },
    { id: 2, name: 'Mike', img: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Mike&backgroundColor=18181b' },
    { id: 3, name: 'Jessica', img: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Jessica&backgroundColor=18181b' },
    { id: 4, name: 'David', img: 'https://api.dicebear.com/9.x/avataaars/svg?seed=David&backgroundColor=18181b' },
    { id: 5, name: 'Alex', img: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Alex&backgroundColor=18181b' },
];

export const BillSplit: React.FC = () => {
    const navigate = useNavigate();
    const [amount, setAmount] = useState('');
    const [selectedFriends, setSelectedFriends] = useState<number[]>([]);
    const [settleToday, setSettleToday] = useState(true);
    const [showSuccess, setShowSuccess] = useState(false);
    const [description, setDescription] = useState('');

    const toggleFriend = (id: number) => {
        if (selectedFriends.includes(id)) {
            setSelectedFriends(selectedFriends.filter(fid => fid !== id));
        } else {
            setSelectedFriends([...selectedFriends, id]);
        }
    };

    const splitAmount = amount && selectedFriends.length > 0 
        ? (parseFloat(amount) / (selectedFriends.length + 1)).toFixed(0) 
        : '0';

    const handleSplit = () => {
        setShowSuccess(true);
        setTimeout(() => {
            navigate('/');
        }, 2500);
    };

    if (showSuccess) {
        return (
            <div className="h-full w-full bg-obsidian flex flex-col items-center justify-center text-white fixed inset-0 z-50">
                <div className="absolute inset-0 bg-soft-glow opacity-40"></div>
                <motion.div 
                    initial={{ scale: 0.5, opacity: 0 }} 
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="bg-emerald-500/20 p-8 rounded-full mb-8 backdrop-blur-md border border-emerald-500/30 shadow-[0_0_50px_rgba(16,185,129,0.3)] relative z-10"
                >
                    <Check size={64} strokeWidth={4} className="text-emerald-400" />
                </motion.div>
                <motion.h2 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-4xl font-black tracking-tight mb-2 bg-clip-text text-transparent bg-gradient-to-br from-white to-zinc-400"
                >
                    Split Sent!
                </motion.h2>
                <motion.p 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-zinc-400 text-sm font-medium"
                >
                    Everyone has been notified via UPI.
                </motion.p>
            </div>
        );
    }

    return (
        <div className="bg-obsidian min-h-screen pt-8 pb-32 flex flex-col relative overflow-hidden md:pb-0">
            <div className="bg-gradient-to-b from-carbon to-obsidian px-6 pb-12 rounded-b-[2.5rem] border-b border-white/5 relative overflow-hidden mb-6 md:bg-none md:border-none md:mb-12 md:pb-0 md:rounded-b-none">
                <div className="absolute top-0 right-0 w-full h-full bg-soft-glow opacity-60 pointer-events-none md:opacity-20"></div>
                <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-violet-500/10 rounded-full blur-[80px] pointer-events-none"></div>

                 <div className="flex items-center gap-4 mb-8 relative z-10 max-w-5xl mx-auto">
                    <button onClick={() => navigate(-1)} className="bg-charcoal p-2.5 rounded-full text-zinc-300 hover:text-white hover:bg-zinc-800 transition backdrop-blur-md border border-white/5 shadow-lg">
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <h1 className="text-xl font-bold tracking-tight text-white">Split Bill</h1>
                        <p className="text-zinc-400 text-xs font-medium">Divide expenses instantly</p>
                    </div>
                </div>
            </div>

            <div className="px-6 -mt-16 md:mt-0 flex-1 relative z-10 max-w-5xl mx-auto w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16">
                    {/* Left Column: Input */}
                    <div className="flex flex-col justify-center">
                        {/* Amount Section */}
                        <div className="flex flex-col items-center mb-10 relative bg-charcoal/50 p-8 rounded-[2.5rem] border border-white/5 shadow-2xl">
                            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4">Total Bill Amount</span>
                            <div className="relative flex items-center justify-center mb-6">
                                <span className="text-4xl font-bold text-zinc-600 mr-2">₹</span>
                                <input 
                                    type="number" 
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    placeholder="0"
                                    className="text-7xl font-black text-white w-64 text-center bg-transparent border-none outline-none placeholder-zinc-800 drop-shadow-xl"
                                    autoFocus
                                />
                            </div>
                            
                            {/* Description Input */}
                            <div className="w-full relative">
                                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                                    <Receipt size={16} className="text-zinc-500" />
                                </div>
                                <input 
                                    type="text"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="What is this for? (e.g. Dinner)"
                                    className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-zinc-600 focus:outline-none focus:bg-black/60 focus:border-indigo-500/50 transition-all text-sm font-medium"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Friends & Actions */}
                    <div className="flex flex-col justify-center">
                         {/* Friends Selector */}
                        <div className="mb-8">
                            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4 block ml-1">Split with</label>
                            <div className="flex flex-wrap gap-4 pb-4">
                                <button className="flex flex-col items-center gap-2 min-w-[64px] group">
                                     <div className="w-16 h-16 rounded-full bg-charcoal flex items-center justify-center border border-dashed border-zinc-600 group-hover:border-indigo-500/50 group-hover:text-indigo-400 transition-all shadow-lg">
                                        <UserPlus size={24} className="text-zinc-500 group-hover:text-indigo-400" />
                                     </div>
                                     <span className="text-xs text-zinc-500 font-medium group-hover:text-zinc-300">Add New</span>
                                </button>
                                {FRIENDS.map(friend => {
                                    const isSelected = selectedFriends.includes(friend.id);
                                    return (
                                        <motion.button 
                                            key={friend.id}
                                            onClick={() => toggleFriend(friend.id)}
                                            whileTap={{ scale: 0.9 }}
                                            className="flex flex-col items-center gap-2 min-w-[64px]"
                                        >
                                            <div className={`w-16 h-16 rounded-full p-0.5 transition-all duration-300 relative ${isSelected ? 'bg-gradient-to-tr from-indigo-500 to-violet-500 shadow-[0_0_15px_rgba(139,92,246,0.5)]' : 'bg-transparent'}`}>
                                                <div className="w-full h-full rounded-full bg-charcoal p-0.5 overflow-hidden border border-white/10">
                                                    <img src={friend.img} alt={friend.name} className="w-full h-full rounded-full object-cover opacity-80 hover:opacity-100 transition-opacity" />
                                                </div>
                                                {isSelected && (
                                                    <div className="absolute -bottom-1 -right-1 bg-white text-indigo-600 rounded-full p-1 shadow-sm border border-zinc-200">
                                                        <Check size={10} strokeWidth={4} />
                                                    </div>
                                                )}
                                            </div>
                                            <span className={`text-xs font-medium transition-colors ${isSelected ? 'text-white' : 'text-zinc-500'}`}>{friend.name}</span>
                                        </motion.button>
                                    )
                                })}
                            </div>
                        </div>

                        {/* Options Card */}
                        <div className="bg-charcoal/50 border border-white/5 rounded-[2rem] p-5 flex items-center justify-between mb-8 shadow-lg">
                            <div className="flex items-center gap-4">
                                <div className="bg-black/40 p-3 rounded-xl text-indigo-400 shadow-inner border border-white/5">
                                    <CreditCard size={20} />
                                </div>
                                <div>
                                    <span className="block font-bold text-zinc-200 text-sm">Settle Instantly</span>
                                    <span className="text-[10px] text-zinc-500">Send requests via UPI</span>
                                </div>
                            </div>
                            <button 
                                onClick={() => setSettleToday(!settleToday)}
                                className={`w-12 h-7 rounded-full transition-colors relative border border-white/5 ${settleToday ? 'bg-indigo-500' : 'bg-zinc-800'}`}
                            >
                                <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-md transition-transform ${settleToday ? 'left-6' : 'left-1'}`} />
                            </button>
                        </div>

                         {/* Desktop Submit Button (Inside Flow) */}
                         <div className="hidden md:block mb-10">
                            <div className="flex justify-between items-center mb-4 px-2">
                                <div className="flex items-center gap-2">
                                    <Users size={14} className="text-zinc-500"/>
                                    <span className="text-zinc-400 text-xs font-medium">You + {selectedFriends.length} friends</span>
                                </div>
                                <div>
                                    <span className="text-zinc-500 text-xs mr-2">Your Share:</span>
                                    <span className="text-xl font-bold text-white">₹{splitAmount}</span>
                                </div>
                            </div>
                            <button 
                                disabled={!amount || selectedFriends.length === 0}
                                onClick={handleSplit}
                                className="w-full bg-white text-black font-bold py-5 rounded-[2rem] disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_25px_rgba(255,255,255,0.1)] active:scale-[0.98] transition-all hover:scale-[1.01] flex items-center justify-center gap-2"
                            >
                                <Share2 size={18} />
                                Send Request
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Action Bar (Mobile Only) */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 p-6 bg-obsidian/80 backdrop-blur-xl border-t border-white/5 z-40 rounded-t-[2.5rem]">
                 <div className="max-w-md mx-auto">
                    <div className="flex justify-between items-center mb-4 px-2">
                        <div className="flex items-center gap-2">
                            <Users size={14} className="text-zinc-500"/>
                            <span className="text-zinc-400 text-xs font-medium">You + {selectedFriends.length} friends</span>
                        </div>
                        <div>
                            <span className="text-zinc-500 text-xs mr-2">Your Share:</span>
                            <span className="text-xl font-bold text-white">₹{splitAmount}</span>
                        </div>
                    </div>
                    <button 
                        disabled={!amount || selectedFriends.length === 0}
                        onClick={handleSplit}
                        className="w-full bg-white text-black font-bold py-5 rounded-[2rem] disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_25px_rgba(255,255,255,0.1)] active:scale-[0.98] transition-all hover:scale-[1.01] flex items-center justify-center gap-2"
                    >
                        <Share2 size={18} />
                        Send Request
                    </button>
                 </div>
            </div>
        </div>
    );
};