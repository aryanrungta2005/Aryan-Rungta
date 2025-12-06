import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Camera, Tag, Users, Circle, Sparkles, Check, Loader2, Pizza, ShoppingCart, Car, Layers, Book, Image as ImageIcon } from 'lucide-react';
import { useFinance } from '../context/FinanceContext';
import { categorizeExpenseAI, analyzeReceiptAI } from '../services/ai';

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

export const AddExpense: React.FC = () => {
    const navigate = useNavigate();
    const { categories, addExpense } = useFinance();
    const [amount, setAmount] = useState('0');
    const [selectedCat, setSelectedCat] = useState<string | null>(null);
    const [description, setDescription] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [aiSuggestion, setAiSuggestion] = useState<string | null>(null);
    
    // Separate refs for camera and gallery
    const galleryInputRef = useRef<HTMLInputElement>(null);
    const cameraInputRef = useRef<HTMLInputElement>(null);

    const handleAdd = () => {
        if (!selectedCat || parseFloat(amount) <= 0) return;
        addExpense(parseFloat(amount), selectedCat);
        navigate('/');
    };

    const handleDescriptionBlur = async () => {
        if (description.length > 3 && !selectedCat) {
            setIsAnalyzing(true);
            const result = await categorizeExpenseAI(description);
            setIsAnalyzing(false);
            
            if (result.category) {
                const match = categories.find(c => c.name.toLowerCase() === result.category.toLowerCase());
                if (match) {
                    setSelectedCat(match.id);
                    setAiSuggestion(`Categorized as ${match.name} ${result.emoji}`);
                }
            }
        }
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setIsAnalyzing(true);
            const reader = new FileReader();
            reader.onloadend = async () => {
                const base64 = reader.result as string;
                const result = await analyzeReceiptAI(base64);
                if (result) {
                    if (result.amount) setAmount(result.amount.toString());
                    if (result.merchant) setDescription(result.merchant);
                    if (result.category) {
                        const match = categories.find(c => c.name.toLowerCase().includes(result.category.toLowerCase()));
                        if (match) setSelectedCat(match.id);
                    }
                    setAiSuggestion("Receipt scanned successfully!");
                }
                setIsAnalyzing(false);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="bg-obsidian min-h-screen pt-8 pb-32 relative">
            <div className="bg-gradient-to-b from-carbon to-obsidian text-white px-6 pb-12 rounded-b-[2.5rem] border-b border-white/5 relative overflow-hidden md:bg-none md:border-none md:shadow-none md:pb-0 md:rounded-b-none md:mb-8">
                <div className="absolute top-0 right-0 w-full h-full bg-soft-glow opacity-60 pointer-events-none md:opacity-20"></div>
                <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-violet-500/10 rounded-full blur-[80px] pointer-events-none"></div>

                 <div className="flex items-center gap-4 mb-8 md:mb-0 relative z-10 max-w-5xl mx-auto">
                    <button onClick={() => navigate(-1)} className="bg-charcoal p-2.5 rounded-full text-zinc-300 hover:text-white hover:bg-zinc-800 transition backdrop-blur-md border border-white/5 shadow-lg">
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <h1 className="text-xl font-bold tracking-tight">Add Expense</h1>
                        <p className="text-zinc-400 text-xs font-medium">Track where your money goes</p>
                    </div>
                </div>
            </div>
            
            <div className="px-6 -mt-8 md:mt-0 relative z-10 max-w-5xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column: Amount & Category */}
                    <div>
                        {/* Amount Card */}
                        <div className="bg-charcoal/90 backdrop-blur-sm p-6 rounded-[2rem] shadow-2xl shadow-black/50 mb-6 border border-white/5">
                            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3 ml-1">Amount</p>
                            <div className="flex items-center bg-black/40 rounded-2xl px-5 py-6 mb-5 border border-white/5 focus-within:border-indigo-500/50 transition-colors shadow-inner">
                                <span className="text-zinc-500 font-bold text-2xl mr-2">₹</span>
                                <input 
                                    type="number" 
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="bg-transparent text-5xl font-bold text-white outline-none w-full placeholder-zinc-700"
                                    placeholder="0"
                                />
                            </div>
                            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                                {[50, 100, 200, 500, 1000].map(val => (
                                    <button 
                                        key={val}
                                        onClick={() => setAmount(val.toString())}
                                        className="px-5 py-3 bg-zinc-800/50 text-zinc-400 rounded-xl font-bold text-xs whitespace-nowrap hover:bg-zinc-700 hover:text-white transition-colors border border-white/5 flex-1"
                                    >
                                        ₹{val}
                                    </button>
                                ))}
                            </div>
                        </div>

                         {/* Category Grid */}
                        <div className="bg-charcoal/50 p-6 rounded-[2rem] border border-white/5">
                            <p className="text-zinc-300 font-bold text-sm mb-4 ml-1">Select Category</p>
                            <div className="grid grid-cols-3 gap-3">
                                {categories.map(cat => {
                                    const Icon = getCategoryIcon(cat.icon);
                                    return (
                                        <button 
                                            key={cat.id}
                                            onClick={() => setSelectedCat(cat.id)}
                                            className={`p-4 rounded-2xl border flex flex-col items-center gap-3 transition-all active:scale-95 ${selectedCat === cat.id ? 'border-white bg-white/10 shadow-[0_0_20px_rgba(255,255,255,0.15)] scale-105' : 'border-white/5 bg-charcoal hover:bg-zinc-800'}`}
                                        >
                                            <div className={`${cat.bg} w-10 h-10 rounded-xl flex items-center justify-center`}>
                                                <Icon className={`w-5 h-5 ${cat.color}`} strokeWidth={2} />
                                            </div>
                                            <span className={`text-xs font-bold ${selectedCat === cat.id ? 'text-white' : 'text-zinc-500'}`}>{cat.name}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Details & Actions */}
                    <div>
                        {/* Details Card */}
                        <div className="bg-charcoal/90 backdrop-blur-sm p-6 rounded-[2rem] shadow-xl border border-white/5 mb-6 space-y-5 relative overflow-hidden min-h-[160px]">
                            {isAnalyzing && (
                                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-10 flex items-center justify-center flex-col gap-3">
                                    <Loader2 className="animate-spin text-indigo-400" size={32} />
                                    <span className="text-xs font-bold text-white tracking-widest uppercase">AI is analyzing...</span>
                                </div>
                            )}
                            <div>
                                <p className="text-zinc-300 font-bold text-sm mb-3 ml-1">Where did you spend?</p>
                                <input 
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    onBlur={handleDescriptionBlur}
                                    placeholder="e.g., Starbucks, Uber, Books.." 
                                    className="w-full bg-black/40 p-5 rounded-2xl text-base outline-none text-white focus:ring-1 focus:ring-indigo-500/50 transition-all border border-white/5 placeholder-zinc-700 shadow-inner font-medium"
                                />
                            </div>
                            {aiSuggestion && (
                                <div className="text-xs text-indigo-300 flex items-center gap-1.5 font-bold animate-in fade-in slide-in-from-top-2 bg-indigo-500/10 p-3 rounded-xl border border-indigo-500/10">
                                    <Sparkles size={14} /> {aiSuggestion}
                                </div>
                            )}
                        </div>

                        {/* Receipt Photo Options */}
                        <div className="mb-6">
                            <p className="text-zinc-300 font-bold text-sm mb-4 ml-1">Scan Receipt with AI</p>
                            
                            {/* Hidden Inputs */}
                            <input 
                                type="file" 
                                ref={galleryInputRef} 
                                className="hidden" 
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                            <input 
                                type="file" 
                                ref={cameraInputRef} 
                                className="hidden" 
                                accept="image/*"
                                capture="environment"
                                onChange={handleFileChange}
                            />

                            <div className="flex gap-4">
                                <button 
                                    onClick={() => cameraInputRef.current?.click()}
                                    disabled={isAnalyzing}
                                    className="flex-1 border border-dashed border-zinc-700 rounded-[1.5rem] py-6 flex flex-col items-center justify-center gap-3 text-zinc-400 font-bold bg-black/20 hover:bg-indigo-500/5 hover:text-indigo-400 hover:border-indigo-500/30 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed group h-32"
                                >
                                    <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center group-hover:bg-indigo-500/20 transition-colors border border-white/5 shadow-lg">
                                        <Camera size={24} />
                                    </div>
                                    <span className="text-xs">Camera</span>
                                </button>

                                <button 
                                    onClick={() => galleryInputRef.current?.click()}
                                    disabled={isAnalyzing}
                                    className="flex-1 border border-dashed border-zinc-700 rounded-[1.5rem] py-6 flex flex-col items-center justify-center gap-3 text-zinc-400 font-bold bg-black/20 hover:bg-indigo-500/5 hover:text-indigo-400 hover:border-indigo-500/30 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed group h-32"
                                >
                                    <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center group-hover:bg-indigo-500/20 transition-colors border border-white/5 shadow-lg">
                                        <ImageIcon size={24} />
                                    </div>
                                    <span className="text-xs">Gallery</span>
                                </button>
                            </div>
                        </div>

                         {/* AI Tag */}
                        <div className="bg-charcoal/50 p-4 rounded-2xl flex items-start gap-4 border border-white/5 mb-8">
                            <div className="bg-indigo-500/10 p-2 rounded-lg border border-indigo-500/20">
                                <Tag className="text-indigo-400 w-4 h-4" />
                            </div>
                            <div>
                                <p className="text-zinc-200 font-bold text-xs flex items-center gap-1.5 mb-1">AI Categorization <Sparkles size={10} className="text-indigo-400"/></p>
                                <p className="text-zinc-500 text-[10px] leading-relaxed font-medium">
                                    Type a description or scan a receipt, and Gemini will fill the details for you.
                                </p>
                            </div>
                        </div>

                        {/* Submit */}
                        <button 
                            onClick={handleAdd}
                            disabled={!selectedCat || parseFloat(amount) <= 0}
                            className="w-full bg-white text-black font-bold py-5 rounded-[2rem] shadow-[0_0_25px_rgba(255,255,255,0.1)] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-200 hover:scale-[1.01] text-lg"
                        >
                            Add Expense
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};