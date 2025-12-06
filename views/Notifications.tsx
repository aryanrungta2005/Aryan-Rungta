import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, AlertTriangle, Info, Bell } from 'lucide-react';
import { MOCK_NOTIFICATIONS } from '../constants';
import { motion } from 'framer-motion';

export const Notifications: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-obsidian min-h-screen pb-32 md:pb-12">
            {/* Header */}
            <div className="bg-gradient-to-b from-carbon to-obsidian px-6 pt-12 pb-8 rounded-b-[2.5rem] border-b border-white/5 relative overflow-hidden shadow-2xl md:bg-none md:border-none md:shadow-none md:pb-0 md:rounded-b-none md:mb-12">
                 <div className="absolute top-0 right-0 w-full h-full bg-soft-glow opacity-60 pointer-events-none md:opacity-20"></div>
                 <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-violet-500/10 rounded-full blur-[80px] pointer-events-none"></div>

                <div className="flex items-center gap-4 relative z-10 max-w-xl mx-auto">
                     <button onClick={() => navigate('/')} className="bg-charcoal p-2.5 rounded-full text-zinc-300 hover:text-white hover:bg-zinc-800 transition border border-white/5 shadow-lg active:scale-95">
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <h1 className="text-xl font-bold tracking-tight text-white">Notifications</h1>
                        <p className="text-zinc-400 text-xs font-medium">Updates & Alerts</p>
                    </div>
                </div>
            </div>

            <div className="px-6 mt-4 space-y-4 max-w-xl mx-auto">
                {MOCK_NOTIFICATIONS.map((notif, index) => (
                    <motion.div 
                        key={notif.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`bg-card-gradient p-5 rounded-[1.5rem] border border-white/5 shadow-lg relative overflow-hidden ${!notif.read ? 'border-l-4 border-l-indigo-500' : ''}`}
                    >
                        {!notif.read && (
                            <div className="absolute top-5 right-5 w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]"></div>
                        )}
                        
                        <div className="flex gap-4">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border border-white/5 shadow-inner 
                                ${notif.type === 'success' ? 'bg-emerald-500/10 text-emerald-400' : 
                                  notif.type === 'alert' ? 'bg-amber-500/10 text-amber-400' : 
                                  'bg-blue-500/10 text-blue-400'}`}
                            >
                                {notif.type === 'success' && <CheckCircle size={18} />}
                                {notif.type === 'alert' && <AlertTriangle size={18} />}
                                {notif.type === 'info' && <Info size={18} />}
                            </div>
                            <div>
                                <h3 className={`text-sm font-bold mb-1 ${!notif.read ? 'text-white' : 'text-zinc-300'}`}>{notif.title}</h3>
                                <p className="text-zinc-500 text-xs leading-relaxed mb-2 pr-4">{notif.message}</p>
                                <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-wider">{notif.time}</span>
                            </div>
                        </div>
                    </motion.div>
                ))}

                {MOCK_NOTIFICATIONS.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 text-zinc-500">
                        <div className="w-16 h-16 bg-charcoal rounded-full flex items-center justify-center mb-4 border border-white/5">
                            <Bell size={24} className="opacity-50"/>
                        </div>
                        <p className="text-sm font-medium">No new notifications</p>
                    </div>
                )}
            </div>
        </div>
    );
};