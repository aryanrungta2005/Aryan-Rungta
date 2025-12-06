import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation, Link } from 'react-router-dom';
import { Dashboard } from './views/Dashboard';
import { Goals } from './views/Goals';
import { CreateGoal } from './views/CreateGoal';
import { Pods } from './views/Pods';
import { AddExpense } from './views/AddExpense';
import { BillSplit } from './views/BillSplit';
import { Profile } from './views/Profile';
import { Splash } from './views/Splash';
import { Notifications } from './views/Notifications';
import { Community } from './views/Community';
import { Home, Target, Users, Plus, User, LogOut, Settings, MessageCircle } from 'lucide-react';
import { FinanceProvider } from './context/FinanceContext';
import { AnimatePresence } from 'framer-motion';
import { Logo } from './components/Logo';

const MobileNavigation = () => {
  const location = useLocation();
  const path = location.pathname;
  
  // Hide on sub-pages or form pages to give more screen real estate
  if (path === '/add' || path === '/goals/new' || path === '/split' || path === '/notifications') return null;

  const isActive = (p: string) => {
      if (p === '/' && path === '/') return true;
      if (p !== '/' && path.startsWith(p)) return true;
      return false;
  };

  const linkClass = (active: boolean) => 
    `flex flex-col items-center gap-1.5 transition-all duration-300 relative ${active ? 'text-white' : 'text-zinc-500 hover:text-zinc-400'}`;

  return (
    <div className="md:hidden fixed bottom-6 left-4 right-4 bg-[#1c1c1e]/90 backdrop-blur-xl border border-white/10 rounded-3xl px-6 py-4 flex justify-between items-center z-50 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
      <Link to="/" className={linkClass(isActive('/'))}>
        <Home strokeWidth={isActive('/') ? 2.5 : 2} size={22} />
        {isActive('/') && <div className="absolute -bottom-2 w-1 h-1 bg-white rounded-full"></div>}
      </Link>
      <Link to="/goals" className={linkClass(isActive('/goals'))}>
        <Target strokeWidth={isActive('/goals') ? 2.5 : 2} size={22} />
        {isActive('/goals') && <div className="absolute -bottom-2 w-1 h-1 bg-white rounded-full"></div>}
      </Link>
      
      <Link to="/add" className="flex flex-col items-center -mt-8 relative group">
        <div className="absolute inset-0 bg-white/20 rounded-full blur-lg opacity-40 group-hover:opacity-60 transition-opacity"></div>
        <div className="w-14 h-14 bg-zinc-100 rounded-full shadow-lg shadow-white/5 flex items-center justify-center text-black hover:scale-105 transition-transform active:scale-95 border border-white/20 relative z-10">
             <Plus size={28} strokeWidth={2.5} />
        </div>
      </Link>

      <Link to="/pods" className={linkClass(isActive('/pods'))}>
        <Users strokeWidth={isActive('/pods') ? 2.5 : 2} size={22} />
        {isActive('/pods') && <div className="absolute -bottom-2 w-1 h-1 bg-white rounded-full"></div>}
      </Link>
      <Link to="/profile" className={linkClass(isActive('/profile'))}>
        <User strokeWidth={isActive('/profile') ? 2.5 : 2} size={22} />
        {isActive('/profile') && <div className="absolute -bottom-2 w-1 h-1 bg-white rounded-full"></div>}
      </Link>
    </div>
  );
};

const DesktopSidebar = () => {
    const location = useLocation();
    const path = location.pathname;
    
    const isActive = (p: string) => {
        if (p === '/' && path === '/') return true;
        if (p !== '/' && path.startsWith(p)) return true;
        return false;
    };

    const navItems = [
        { path: '/', icon: Home, label: 'Dashboard' },
        { path: '/goals', icon: Target, label: 'Goals' },
        { path: '/pods', icon: Users, label: 'Pods' },
        { path: '/community', icon: MessageCircle, label: 'Confessions' },
        { path: '/profile', icon: User, label: 'Profile' },
    ];

    return (
        <div className="hidden md:flex flex-col w-64 h-full bg-[#121214] border-r border-white/5 fixed left-0 top-0 z-50 p-6">
            <div className="mb-10 pl-2">
                <Logo withText={true} />
            </div>

            <nav className="flex-1 space-y-2">
                {navItems.map((item) => (
                    <Link 
                        key={item.path} 
                        to={item.path}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                            isActive(item.path) 
                                ? 'bg-white/10 text-white font-semibold shadow-lg' 
                                : 'text-zinc-500 hover:text-zinc-200 hover:bg-white/5'
                        }`}
                    >
                        <item.icon size={20} strokeWidth={isActive(item.path) ? 2.5 : 2} />
                        <span>{item.label}</span>
                    </Link>
                ))}

                <div className="pt-6 mt-6 border-t border-white/5">
                    <Link to="/add" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white text-black font-bold hover:bg-zinc-200 transition-colors shadow-lg shadow-white/5">
                        <Plus size={20} />
                        <span>Add Expense</span>
                    </Link>
                    <Link to="/split" className="flex items-center gap-3 px-4 py-3 mt-2 rounded-xl bg-charcoal text-zinc-300 font-medium hover:text-white hover:bg-zinc-800 transition-colors border border-white/5">
                        <Users size={20} />
                        <span>Split Bill</span>
                    </Link>
                </div>
            </nav>

            <div className="pt-6 border-t border-white/5 flex items-center justify-between text-zinc-500">
                <button className="p-2 hover:bg-white/5 rounded-lg transition-colors"><Settings size={20} /></button>
                <button className="p-2 hover:bg-white/5 rounded-lg transition-colors hover:text-red-400"><LogOut size={20} /></button>
            </div>
        </div>
    );
};

const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    window.location.hash = '/';
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <FinanceProvider>
        <div className="flex h-screen w-full bg-obsidian text-zinc-100 overflow-hidden font-sans">
          <AnimatePresence mode="wait">
            {showSplash ? (
              <Splash key="splash" />
            ) : (
              <HashRouter>
                <DesktopSidebar />
                <div className="flex-1 h-full overflow-y-auto overflow-x-hidden md:pl-64 relative scroll-smooth bg-obsidian">
                    <div className="min-h-full">
                        <Routes>
                          <Route path="/" element={<Dashboard />} />
                          <Route path="/goals" element={<Goals />} />
                          <Route path="/goals/new" element={<CreateGoal />} />
                          <Route path="/pods" element={<Pods />} />
                          <Route path="/add" element={<AddExpense />} />
                          <Route path="/split" element={<BillSplit />} />
                          <Route path="/profile" element={<Profile />} />
                          <Route path="/notifications" element={<Notifications />} />
                          <Route path="/community" element={<Community />} />
                        </Routes>
                    </div>
                    <MobileNavigation />
                </div>
              </HashRouter>
            )}
          </AnimatePresence>
        </div>
    </FinanceProvider>
  );
};

export default App;