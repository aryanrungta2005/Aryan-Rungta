import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles, Target, Calendar, Loader2 } from 'lucide-react';
import { useFinance } from '../context/FinanceContext';
import { generateGoalPlanAI } from '../services/ai';

export const CreateGoal: React.FC = () => {
    const navigate = useNavigate();
    const { addGoal } = useFinance();
    
    const [name, setName] = useState('');
    const [target, setTarget] = useState('');
    const [weeks, setWeeks] = useState('12');
    const [isGenerating, setIsGenerating] = useState(false);
    const [plan, setPlan] = useState<{ milestones: string[], quote: string } | null>(null);

    const handleGeneratePlan = async () => {
        if (!name || !target) return;
        setIsGenerating(true);
        const result = await generateGoalPlanAI(name, parseFloat(target), parseInt(weeks));
        setPlan(result);
        setIsGenerating(false);
    };

    const handleSave = () => {
        if (!name || !target) return;
        addGoal({
            id: Date.now().toString(),
            name,
            current: 0,
            target: parseFloat(target),
            daysLeft: parseInt(weeks) * 7,
            locked: true,
            status: 'active',
            weeklySave: Math.ceil(parseFloat(target) / parseInt(weeks)),
            milestones: plan?.milestones || ['Start Saving']
        });
        navigate('/goals');
    };

    return (
        <div className="bg-obsidian min-h-screen pt-8 pb-32 md:pb-12">
            <div className="bg-gradient-to-b from-carbon to-obsidian px-6 pt-6 pb-6 rounded-b-[2rem] border-b border-white/5 mb-6 relative overflow-hidden md:bg-none md:border-none md:shadow-none md:pb-0 md:rounded-b-none md:mb-12">
                <div className="absolute top-0 right-0 w-full h-full bg-soft-glow opacity-60 pointer-events-none md:opacity-20"></div>
                
                <div className="flex items-center gap-4 relative z-10 max-w-4xl mx-auto">
                     <button onClick={() => navigate(-1)} className="p-2.5 -ml-2 text-zinc-400 bg-charcoal rounded-full hover:bg-zinc-800 hover:text-white transition border border-white/5 shadow-lg">
                        <ArrowLeft size={20} />
                    </button>
                    <h1 className="text-2xl font-bold text-zinc-100 tracking-tight">Create Goal</h1>
                </div>
            </div>

            <div className="px-6 space-y-8 max-w-4xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
                    {/* Input Column */}
                    <div className="space-y-6">
                        <div>
                            <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3 ml-1">Goal Name</label>
                            <div className="bg-charcoal rounded-2xl px-5 py-4 flex items-center gap-4 focus-within:ring-1 focus:ring-indigo-500/50 transition-all border border-white/5 shadow-lg">
                                <Target size={20} className="text-zinc-500" />
                                <input 
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="bg-transparent w-full outline-none font-medium text-zinc-200 placeholder-zinc-600"
                                    placeholder="e.g. New Laptop"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3 ml-1">Target Amount</label>
                            <div className="bg-charcoal rounded-2xl px-5 py-4 flex items-center gap-4 focus-within:ring-1 focus:ring-indigo-500/50 transition-all border border-white/5 shadow-lg">
                                <span className="text-zinc-500 font-bold text-lg">₹</span>
                                <input 
                                    type="number"
                                    value={target}
                                    onChange={(e) => setTarget(e.target.value)}
                                    className="bg-transparent w-full outline-none font-bold text-xl text-zinc-200 placeholder-zinc-600"
                                    placeholder="50000"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3 ml-1">Timeline (Weeks)</label>
                            <div className="bg-charcoal rounded-2xl px-5 py-4 flex items-center gap-4 focus-within:ring-1 focus:ring-indigo-500/50 transition-all border border-white/5 shadow-lg">
                                <Calendar size={20} className="text-zinc-500" />
                                <input 
                                    type="number"
                                    value={weeks}
                                    onChange={(e) => setWeeks(e.target.value)}
                                    className="bg-transparent w-full outline-none font-medium text-zinc-200 placeholder-zinc-600"
                                    placeholder="12"
                                />
                            </div>
                            {target && weeks && (
                                <p className="text-xs text-zinc-500 mt-3 ml-1 font-medium">
                                    You'll need to save <span className="font-bold text-white">₹{Math.ceil(parseFloat(target)/parseInt(weeks))}</span> per week.
                                </p>
                            )}
                        </div>
                    </div>

                    {/* AI Plan Column */}
                    <div className="flex flex-col">
                        <div className="bg-charcoal border border-white/10 shadow-xl rounded-[2rem] p-6 flex-1 flex flex-col">
                             {plan ? (
                                <div className="animate-in fade-in slide-in-from-bottom-4 flex-1">
                                    <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2"><Sparkles size={16} className="text-indigo-400" /> AI Strategy</h3>
                                    <p className="text-sm text-zinc-400 italic mb-6 leading-relaxed border-l-2 border-indigo-500/50 pl-4">"{plan.quote}"</p>
                                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4">Suggested Milestones</p>
                                    <ul className="space-y-4">
                                        {plan.milestones.map((m, i) => (
                                            <li key={i} className="flex items-center gap-4 text-sm text-zinc-300">
                                                <div className="w-6 h-6 rounded-full bg-black/40 flex items-center justify-center text-white text-[10px] font-bold border border-white/10 shadow-inner">
                                                    {i+1}
                                                </div>
                                                <span className="font-medium">{m}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ) : (
                                <div className="flex-1 flex flex-col items-center justify-center text-center opacity-40 py-10">
                                    <Sparkles size={48} className="text-zinc-600 mb-4" />
                                    <p className="text-zinc-500 font-bold">AI Power</p>
                                    <p className="text-xs text-zinc-600 max-w-[200px]">Fill in your goal details to generate a custom savings strategy.</p>
                                </div>
                            )}

                             <button 
                                onClick={handleGeneratePlan}
                                disabled={!name || !target || isGenerating}
                                className="w-full bg-indigo-500/10 text-indigo-300 font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-indigo-500/20 transition-colors disabled:opacity-50 border border-indigo-500/20 shadow-lg active:scale-[0.98] mt-6"
                            >
                                {isGenerating ? <Loader2 className="animate-spin text-indigo-400" size={18}/> : <Sparkles size={18} className="text-indigo-400" />}
                                {isGenerating ? "Asking Gemini..." : "Generate Plan with AI"}
                            </button>
                        </div>

                         <button 
                            onClick={handleSave}
                            disabled={!name || !target}
                            className="w-full bg-white text-black font-bold py-5 rounded-[2rem] shadow-[0_0_20px_rgba(255,255,255,0.1)] mt-6 active:scale-[0.98] transition-all disabled:opacity-50 hover:bg-zinc-200 hover:scale-[1.01]"
                        >
                            Create Goal
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};