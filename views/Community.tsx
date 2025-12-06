import React, { useState } from 'react';
import { MOCK_CONFESSIONS } from '../constants';
import { Heart, MessageCircle, Send, Plus, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export const Community: React.FC = () => {
    const navigate = useNavigate();
    const [confessions, setConfessions] = useState(MOCK_CONFESSIONS);
    const [isWriting, setIsWriting] = useState(false);
    const [newText, setNewText] = useState('');

    const handlePost = () => {
        if (!newText.trim()) return;
        const newConfession = {
            id: Date.now().toString(),
            text: newText,
            likes: 0,
            timestamp: 'Just now',
            tags: ['#new']
        };
        setConfessions([newConfession, ...confessions]);
        setNewText('');
        setIsWriting(false);
    };

    return (
        <div className="pb-24 pt-12 min-h-screen bg-obsidian text-zinc-100 md:pt-10 md:pb-12">
            
            {/* Header */}
            <div className="px-6 mb-8 max-w-6xl mx-auto">
                <div className="flex items-center gap-4 mb-2 md:mb-4">
                    <button onClick={() => navigate(-1)} className="md:hidden bg-charcoal p-2 rounded-full text-zinc-300 hover:text-white transition border border-white/5">
                        <ArrowLeft size={20} />
                    </button>
                    <h1 className="text-3xl font-bold tracking-tight">Confessions</h1>
                </div>
                <p className="text-zinc-500 font-medium">Anonymous money stories from students like you.</p>
            </div>

            <div className="max-w-6xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Col: Post Action (Sticky on Desktop) */}
                    <div className="lg:col-span-1">
                         <div className="sticky top-6">
                            {!isWriting ? (
                                <button 
                                    onClick={() => setIsWriting(true)}
                                    className="w-full bg-charcoal/50 border border-dashed border-zinc-700 text-zinc-400 p-8 rounded-[2rem] flex flex-col items-center justify-center gap-4 hover:bg-white/5 hover:border-indigo-500/30 hover:text-indigo-400 transition-all group shadow-lg"
                                >
                                    <div className="w-16 h-16 rounded-full bg-black/40 flex items-center justify-center border border-white/5 group-hover:scale-110 transition-transform">
                                        <Plus size={32} className="group-hover:text-indigo-400 transition-colors" />
                                    </div>
                                    <span className="font-bold text-sm">Share your confession...</span>
                                </button>
                            ) : (
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="bg-charcoal p-6 rounded-[2rem] shadow-xl border border-white/10"
                                >
                                    <textarea
                                        value={newText}
                                        onChange={(e) => setNewText(e.target.value)}
                                        placeholder="I spent my rent money on..."
                                        className="w-full h-32 p-3 text-zinc-100 bg-black/30 rounded-xl resize-none focus:outline-none placeholder-zinc-600 font-medium border border-white/5 focus:border-indigo-500/30 transition-colors mb-4"
                                        autoFocus
                                    />
                                    <div className="flex justify-end gap-3">
                                        <button onClick={() => setIsWriting(false)} className="px-4 py-2 text-zinc-500 text-xs font-bold hover:text-white transition-colors">Cancel</button>
                                        <button 
                                            onClick={handlePost}
                                            className="px-6 py-3 bg-white text-black font-bold rounded-xl text-xs hover:bg-zinc-200 transition-colors shadow-lg"
                                        >
                                            Post Confession
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {/* Sidebar Info (Desktop Only) */}
                            <div className="hidden lg:block mt-8 p-6 bg-gradient-to-br from-indigo-900/10 to-transparent rounded-[2rem] border border-white/5">
                                <h3 className="font-bold text-zinc-200 mb-2">Trending Tags</h3>
                                <div className="flex flex-wrap gap-2">
                                    {['#saving', '#regret', '#food', '#shopping', '#broke'].map(tag => (
                                        <span key={tag} className="text-xs bg-black/40 px-3 py-1.5 rounded-full text-zinc-400 border border-white/5 hover:text-indigo-400 hover:border-indigo-500/30 transition-colors cursor-pointer">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Col: Feed */}
                    <div className="lg:col-span-2 space-y-5">
                        {confessions.map((confession, idx) => (
                            <motion.div 
                                key={confession.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-card-gradient p-8 rounded-[2rem] shadow-lg border border-white/5 hover:border-white/10 transition-colors group"
                            >
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {confession.tags.map(tag => (
                                        <span key={tag} className="text-[10px] font-bold text-indigo-300 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20">{tag}</span>
                                    ))}
                                </div>
                                <p className="text-zinc-200 text-xl font-medium leading-relaxed mb-8 font-serif italic opacity-90">"{confession.text}"</p>
                                <div className="flex justify-between items-center text-zinc-500 border-t border-white/5 pt-5">
                                    <span className="text-[10px] font-bold uppercase tracking-widest">{confession.timestamp}</span>
                                    <div className="flex items-center gap-6">
                                        <button className="flex items-center gap-2 hover:text-rose-500 transition-colors group/btn">
                                            <Heart size={20} className="group-hover/btn:fill-rose-500 transition-all" />
                                            <span className="text-xs font-bold">{confession.likes}</span>
                                        </button>
                                        <button className="flex items-center gap-2 hover:text-blue-400 transition-colors">
                                            <MessageCircle size={20} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};