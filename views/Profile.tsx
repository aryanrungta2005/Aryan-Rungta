import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Award, TrendingUp, Settings, Bell, Shield, BookOpen, HelpCircle, ChevronRight, LogOut, Maximize, Minimize } from 'lucide-react';

export const Profile: React.FC = () => {
    const navigate = useNavigate();
    const [isFullscreen, setIsFullscreen] = useState(false);

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
            });
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    };

    const settingsItems = [
        { icon: isFullscreen ? Minimize : Maximize, label: isFullscreen ? 'Exit Full Screen' : 'Full Screen Mode', action: toggleFullScreen },
        { icon: User, label: 'Account Info' },
        { icon: Bell, label: 'Notifications' },
        { icon: Shield, label: 'Privacy & Security' },
        { icon: HelpCircle, label: 'Help & Support' },
    ];

    return (
        <div className="bg-obsidian min-h-screen pb-32 md:pb-12">
            {/* Header with Gradient and Glow */}
            <div className="bg-gradient-to-b from-carbon to-obsidian text-white px-6 pt-12 pb-28 rounded-b-[3rem] relative overflow-hidden border-b border-white/5 shadow-2xl md:bg-none md:border-none md:shadow-none md:pb-6 md:pt-10 md:rounded-b-none">
                {/* Decorative circles for premium feel */}
                <div className="absolute top-0 right-0 w-full h-full bg-soft-glow opacity-60 pointer-events-none md:opacity-20"></div>
                <div className="absolute top-[-50px] left-[-50px] w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none"></div>

                <div className="relative z-10 max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-10 md:hidden">
                        <button 
                            onClick={() => navigate(-1)} 
                            className="bg-charcoal backdrop-blur-md p-3 rounded-full hover:bg-zinc-800 transition-all active:scale-95 border border-white/5 text-zinc-300 hover:text-white shadow-lg"
                        >
                            <ArrowLeft size={20} />
                        </button>
                        <span className="font-semibold text-sm tracking-widest uppercase text-zinc-400">My Profile</span>
                        <button className="bg-charcoal backdrop-blur-md p-3 rounded-full hover:bg-zinc-800 transition-all active:scale-95 border border-white/5 text-zinc-300 hover:text-white shadow-lg">
                            <Settings size={20} />
                        </button>
                    </div>

                    {/* Desktop Header Title */}
                    <div className="hidden md:block mb-8">
                        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
                    </div>

                    {/* Desktop Profile Card (Horizontal) */}
                    <div className="flex flex-col items-center text-center md:flex-row md:text-left md:items-center md:gap-8 md:bg-charcoal/50 md:p-8 md:rounded-[2.5rem] md:border md:border-white/5 md:shadow-lg">
                        <div className="relative mb-5 md:mb-0 group cursor-pointer">
                            <div className="w-28 h-28 md:w-24 md:h-24 bg-gradient-to-tr from-zinc-700 to-zinc-200 rounded-full p-[1px] shadow-2xl shadow-black/50 transition-transform group-hover:scale-105">
                                <div className="w-full h-full bg-obsidian rounded-full flex items-center justify-center text-white overflow-hidden relative border-4 border-obsidian">
                                    <img 
                                        src="https://api.dicebear.com/9.x/avataaars/svg?seed=Aisha&backgroundColor=18181b" 
                                        alt="Profile" 
                                        className="w-full h-full object-cover" 
                                    />
                                </div>
                            </div>
                            <div className="absolute -bottom-3 -right-0 left-0 flex justify-center">
                                <div className="bg-white text-black text-[10px] font-black tracking-wider uppercase px-4 py-1.5 rounded-full shadow-lg border-4 border-obsidian">
                                    Saver
                                </div>
                            </div>
                        </div>
                        <div>
                             <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mt-2 md:mt-0">Aisha Kumar</h2>
                             <p className="text-zinc-500 text-sm md:text-base font-medium mt-1">Delhi University • +91 98765 43210</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-6 -mt-20 md:mt-8 space-y-6 relative z-20 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                    
                    {/* Main Stats Column (Span 2) */}
                    <div className="lg:col-span-2 space-y-6">
                         {/* Savings Score Card */}
                        <div className="bg-card-gradient backdrop-blur-xl p-8 rounded-[2rem] shadow-2xl shadow-black/50 border border-white/5 flex flex-col justify-between min-h-[280px]">
                            <div className="flex justify-between items-end mb-8">
                                <div>
                                    <p className="text-indigo-400 text-xs font-bold uppercase tracking-widest mb-2">FinScore</p>
                                    <h3 className="text-zinc-100 font-bold text-2xl tracking-tight">Consistency Rating</h3>
                                </div>
                                <div className="text-right">
                                    <span className="text-white text-5xl font-black tracking-tighter drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">114</span>
                                    <span className="text-zinc-600 text-sm font-bold"> / 100</span>
                                </div>
                            </div>
                            
                            {/* Progress Bar */}
                            <div className="w-full h-3 bg-black/50 rounded-full overflow-hidden mb-10 border border-white/5">
                                <div className="h-full bg-gradient-to-r from-indigo-400 to-purple-500 w-[85%] rounded-full shadow-[0_0_10px_rgba(129,140,248,0.4)] relative">
                                    <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/50 blur-[2px]"></div>
                                </div>
                            </div>
                            
                            {/* Stats Grid */}
                            <div className="grid grid-cols-3 divide-x divide-white/10">
                                <div className="px-4 text-center">
                                    <p className="text-white font-bold text-2xl mb-1">7</p>
                                    <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider">Day Streak</p>
                                </div>
                                <div className="px-4 text-center">
                                    <p className="text-white font-bold text-2xl mb-1">₹1.2k</p>
                                    <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider">Invested</p>
                                </div>
                                <div className="px-4 text-center">
                                    <p className="text-white font-bold text-2xl mb-1">2</p>
                                    <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider">Badges Earned</p>
                                </div>
                            </div>
                        </div>

                         {/* Streak Banner */}
                         <div className="bg-gradient-to-r from-zinc-800/50 to-charcoal p-[1px] rounded-[2rem] shadow-lg">
                            <div className="bg-charcoal/50 backdrop-blur-md p-6 rounded-[2rem] flex items-center gap-6 border border-white/5">
                                <div className="w-14 h-14 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-400 shrink-0 border border-indigo-500/20 shadow-inner">
                                    <Award size={28} strokeWidth={2} />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-center mb-2">
                                        <p className="text-zinc-100 font-bold text-lg tracking-tight">7 Day Streak!</p>
                                        <span className="text-[10px] font-black text-white bg-indigo-500 px-3 py-1 rounded-full uppercase tracking-wide shadow-[0_0_10px_rgba(99,102,241,0.4)]">Hot</span>
                                    </div>
                                    <p className="text-zinc-400 text-sm leading-relaxed font-medium">
                                        You're on fire! Keep saving to beat your record of 12 days.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar / Menu Column (Span 1) */}
                    <div className="space-y-6">
                        <div className="bg-charcoal rounded-[2rem] shadow-xl border border-white/5 overflow-hidden p-2">
                            <h3 className="text-zinc-500 font-bold text-xs uppercase tracking-widest mb-3 ml-4 mt-4">Settings</h3>
                            {settingsItems.map((item, i) => (
                                <button 
                                    key={i} 
                                    onClick={item.action}
                                    className="w-full flex items-center gap-4 p-4 hover:bg-white/[0.05] transition-colors rounded-xl group"
                                >
                                    <div className={`w-10 h-10 bg-black/40 text-zinc-400 rounded-xl flex items-center justify-center transition-all group-hover:text-indigo-400 group-hover:bg-indigo-500/10 group-hover:border-indigo-500/20 border border-white/5`}>
                                        <item.icon size={18} strokeWidth={2} />
                                    </div>
                                    <span className="flex-1 text-left text-zinc-300 font-semibold text-sm group-hover:text-white transition-colors">{item.label}</span>
                                    {item.label !== 'Full Screen Mode' && item.label !== 'Exit Full Screen' && (
                                        <ChevronRight size={16} className="text-zinc-600 group-hover:text-zinc-400 transition-colors" />
                                    )}
                                    {(item.label === 'Full Screen Mode' || item.label === 'Exit Full Screen') && (
                                        <div className="text-[10px] text-zinc-500 bg-black/40 px-2 py-1 rounded border border-white/5">
                                            BETA
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>

                         <button className="w-full py-5 text-zinc-400 font-bold text-sm flex items-center justify-center gap-2 bg-charcoal rounded-[2rem] shadow-lg border border-white/5 hover:bg-zinc-800 hover:text-red-400 active:scale-[0.98] transition-all group">
                            <LogOut size={18} className="group-hover:text-red-400 transition-colors"/>
                            Log Out
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};