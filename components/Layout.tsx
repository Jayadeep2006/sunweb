
import React from 'react';
import { AppView } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeView: AppView;
  setActiveView: (view: AppView) => void;
  cartCount: number;
  hasActiveOrder: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, activeView, setActiveView, cartCount, hasActiveOrder }) => {
  const navItems = [
    { id: AppView.DASHBOARD, label: 'Home', icon: '🏠' },
    { id: AppView.SUPPORT, label: 'Support', icon: '🎧' },
    { id: AppView.CATALOG, label: 'Catalog', icon: '📦' },
    { id: AppView.TECHNICIAN, label: 'Jobs', icon: '🛠️' },
    { id: AppView.TRACKING, label: 'Track', icon: '🚚', highlight: hasActiveOrder },
    { id: AppView.CART, label: 'Cart', icon: '🛒', badge: cartCount },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      {/* Sidebar - Desktop/Tablet Landscape */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col hidden lg:flex shadow-2xl shrink-0">
        <div className="p-6">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center font-black">ST</div>
            <h1 className="text-sm font-black bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
              SRI THIRUMALA
            </h1>
          </div>
          <p className="text-[9px] text-slate-400 mt-1 uppercase tracking-widest font-bold">Authorized Sun Direct</p>
        </div>
        
        <nav className="flex-1 mt-4 px-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all ${
                activeView === item.id 
                  ? 'bg-orange-600 text-white shadow-lg' 
                  : 'text-slate-400 hover:bg-slate-800'
              }`}
            >
              <span className="mr-3 text-lg">{item.icon}</span>
              {item.label}
              {item.highlight && !activeView.includes('TRACKING') && (
                <span className="ml-auto w-2 h-2 bg-orange-400 rounded-full animate-pulse"></span>
              )}
              {item.badge !== undefined && item.badge > 0 && (
                <span className="ml-auto bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>
        
        <div className="p-4 border-t border-slate-800">
          <div className="bg-slate-800 rounded-xl p-4">
            <p className="text-[10px] text-slate-500 uppercase font-black mb-1">Service Hotline</p>
            <p className="text-sm font-black text-orange-500">9985265605</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8 z-10 shrink-0">
          <div className="lg:hidden flex items-center space-x-2">
             <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center font-black text-white text-xs">ST</div>
             <h1 className="text-xs font-black text-slate-800 uppercase tracking-tighter">Sri Thirumala</h1>
          </div>
          <div className="hidden lg:block text-slate-400 text-xs font-medium">
            Dashboard / <span className="text-slate-800 font-bold capitalize">{activeView.toLowerCase()}</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-xs font-bold text-slate-800">Support: 9985265605</span>
            </div>
            <button 
              onClick={() => setActiveView(AppView.CART)}
              className="relative h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center hover:bg-orange-100 transition-colors"
            >
              <span className="text-xl">🛒</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full ring-2 ring-white">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </header>

        {/* Dynamic Content */}
        <section className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-6xl mx-auto pb-20 lg:pb-0">
            {children}
          </div>
        </section>

        {/* Mobile Nav - Visible on MD and below */}
        <nav className="lg:hidden bg-white border-t border-slate-200 flex justify-around items-center py-3 px-2 shrink-0 shadow-2xl fixed bottom-0 left-0 right-0 z-50">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`flex flex-col items-center flex-1 py-1 transition-all ${
                activeView === item.id ? 'text-orange-600 scale-110' : 'text-slate-400'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-[8px] mt-1 font-black uppercase tracking-tighter">{item.label}</span>
              {item.badge !== undefined && item.badge > 0 && (
                <span className="absolute top-0 translate-x-3 bg-red-600 text-white text-[8px] font-black px-1.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>
      </main>
    </div>
  );
};

export default Layout;
