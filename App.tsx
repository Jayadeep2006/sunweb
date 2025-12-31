
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import SupportChat from './components/SupportChat';
import PartsGrid from './components/PartsGrid';
import TechnicianView from './components/TechnicianView';
import CartView from './components/CartView';
import OrderTracking from './components/OrderTracking';
import { AppView, CartItem, DTHPart, SupportTicket, Order, UserActivity } from './types';
import { MOCK_TICKETS } from './constants';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<AppView>(AppView.DASHBOARD);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [activities, setActivities] = useState<UserActivity[]>([]);
  const [tickets, setTickets] = useState<SupportTicket[]>(
    MOCK_TICKETS.map((t, i) => ({ 
      ...t, 
      customerPhone: t.customerPhone || '9985265605', 
      customerAddress: t.customerAddress || 'Hyderabad, India',
      status: t.status as SupportTicket['status'],
      assignedTechnician: i % 2 === 0 ? 'Ramesh' : 'Venkatesh'
    }))
  );

  const logActivity = (type: UserActivity['type'], label: string, content: string) => {
    const newActivity: UserActivity = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toLocaleTimeString(),
      type,
      label,
      content
    };
    setActivities(prev => [newActivity, ...prev].slice(0, 20));
  };

  const handleAddToCart = (part: DTHPart, quantity: number = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === part.id);
      if (existing) {
        return prev.map(item => 
          item.id === part.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...part, quantity: quantity }];
    });
    logActivity('CART', `Added ${quantity}x ${part.name}`, `Item total: ₹${part.cost * quantity}`);
    
    const originalTitle = document.title;
    document.title = "Added to Cart!";
    setTimeout(() => document.title = originalTitle, 2000);
  };

  const handleRaiseComplaint = (data: Partial<SupportTicket>) => {
    const techs = ['Ramesh', 'Suresh', 'Venkatesh', 'Anji', 'Srinu'];
    const randomTech = techs[Math.floor(Math.random() * techs.length)];
    
    const newTicket: SupportTicket = {
      id: `TKT-${Math.floor(Math.random() * 9000) + 1000}`,
      customerName: data.customerName || 'Anonymous',
      customerPhone: data.customerPhone || 'N/A',
      customerAddress: data.customerAddress || 'Field Visit',
      issue: data.issue || 'Service Request',
      status: 'ASSIGNED',
      assignedTechnician: randomTech,
      date: new Date().toISOString().split('T')[0]
    };

    setTickets(prev => [newTicket, ...prev]);
    logActivity('FORM', `Raised Complaint: ${newTicket.id}`, `Typed: "${data.issue}" for address "${data.customerAddress}"`);
  };

  const handlePlaceOrder = (order: Order) => {
    setOrders(prev => [order, ...prev]);
    setCartItems([]);
    logActivity('FORM', `Placed Order: ${order.trackerId}`, `Delivering to: ${order.customerAddress}`);
  };

  const updateTicketStatus = (id: string, status: SupportTicket['status']) => {
    setTickets(prev => prev.map(t => t.id === id ? { ...t, status } : t));
  };

  const renderContent = () => {
    switch (activeView) {
      case AppView.DASHBOARD:
        return (
          <div className="space-y-8 animate-fade-in">
            <div className="bg-gradient-to-br from-slate-900 to-indigo-950 rounded-[2.5rem] p-6 md:p-10 text-white relative overflow-hidden shadow-2xl border border-white/5">
              <div className="relative z-10 max-w-2xl">
                <div className="inline-flex items-center px-3 py-1 bg-orange-500/20 text-orange-400 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-orange-500/30">
                  Authorized Service Provider
                </div>
                <h1 className="text-3xl md:text-5xl font-black mb-6 leading-[1.1]">
                  SRI THIRUMALA <br/><span className="text-orange-500 italic">ENTERPRISES</span>
                </h1>
                <p className="text-slate-300 text-sm md:text-lg mb-8 md:mb-10 leading-relaxed font-medium">
                  Revolutionizing Sun Direct DTH support with Gemini AI. Fast resolution for E-32-52 errors, STB hardware faults, and parts management in one click.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button onClick={() => setActiveView(AppView.SUPPORT)} className="flex-1 sm:flex-none bg-orange-600 text-white px-8 py-4 rounded-2xl font-black hover:bg-orange-700 transition-all shadow-lg active:scale-95 text-sm">AI Assistant</button>
                  <button onClick={() => setActiveView(AppView.TECHNICIAN)} className="flex-1 sm:flex-none bg-white/10 border border-white/10 backdrop-blur-md text-white px-8 py-4 rounded-2xl font-black hover:bg-white/20 transition-all active:scale-95 text-sm">Jobs Portal</button>
                </div>
              </div>
              <div className="absolute top-1/2 -right-20 -translate-y-1/2 p-8 text-[180px] opacity-5 leading-none font-black select-none pointer-events-none italic">ST</div>
            </div>

            {/* Recent Activity Log - This makes sure everything typed is visible */}
            <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-black text-slate-800">Your Activity Log</h3>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Records of every word typed & action taken</p>
                </div>
                <span className="text-[10px] bg-slate-100 text-slate-500 font-black px-3 py-1 rounded-full">{activities.length} Recorded</span>
              </div>
              
              <div className="space-y-3 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                {activities.length > 0 ? activities.map(act => (
                  <div key={act.id} className="flex items-start space-x-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-orange-200 transition-all">
                    <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center shrink-0 text-xl">
                      {act.type === 'CHAT' ? '💬' : act.type === 'FORM' ? '📋' : act.type === 'CART' ? '🛒' : '🔍'}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <p className="text-xs font-black text-slate-800">{act.label}</p>
                        <span className="text-[10px] text-slate-400 font-bold">{act.timestamp}</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1 italic leading-relaxed">
                        Typed: <span className="text-slate-700 font-medium not-italic">"{act.content}"</span>
                      </p>
                    </div>
                  </div>
                )) : (
                  <div className="text-center py-8">
                    <p className="text-xs font-bold text-slate-400">No interactions recorded yet. Start chatting or adding parts!</p>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[
                { label: 'Active Jobs', value: tickets.filter(t => t.status !== 'RESOLVED').length, sub: 'In Progress', icon: '🛠️', color: 'bg-indigo-600' },
                { label: 'Local Support', value: '24/7', sub: 'AI Enabled', icon: '🤖', color: 'bg-orange-600' },
                { label: 'Stock Items', value: '890+', sub: 'Verified Inventory', icon: '📦', color: 'bg-emerald-600' },
              ].map((stat, i) => (
                <div key={i} className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-200 shadow-sm flex items-center justify-between hover:shadow-xl transition-all cursor-default group">
                  <div>
                    <p className="text-slate-400 text-[9px] md:text-[10px] font-black uppercase tracking-widest">{stat.label}</p>
                    <h3 className="text-3xl md:text-4xl font-black text-slate-800 mt-2">{stat.value}</h3>
                    <p className="text-slate-500 text-[9px] md:text-[10px] font-bold mt-2 bg-slate-100 inline-block px-2 py-0.5 rounded-full uppercase">{stat.sub}</p>
                  </div>
                  <div className={`w-12 h-12 md:w-16 md:h-16 ${stat.color} text-white rounded-2xl md:rounded-3xl flex items-center justify-center text-2xl md:text-3xl shadow-xl group-hover:scale-110 transition-transform duration-500`}>
                    {stat.icon}
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
              <div className="space-y-6">
                 <h3 className="text-xl font-black text-slate-800 px-2">Smart Troubleshooter</h3>
                 <SupportChat 
                    onRaiseComplaint={handleRaiseComplaint} 
                    onLogMessage={(msg) => logActivity('CHAT', 'AI Message Sent', msg)}
                  />
              </div>
              <div className="space-y-6">
                 <div className="flex items-center justify-between px-2">
                   <h3 className="text-xl font-black text-slate-800">Available Hardware</h3>
                   <button onClick={() => setActiveView(AppView.CATALOG)} className="text-xs font-bold text-orange-600 hover:underline">Explore Catalog</button>
                 </div>
                 <div className="h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                    <PartsGrid onAddToCart={handleAddToCart} />
                 </div>
              </div>
            </div>
          </div>
        );
      case AppView.SUPPORT:
        return (
          <div className="max-w-4xl mx-auto space-y-6 py-4 animate-fade-in">
             <div className="text-center mb-10">
               <span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-600 bg-orange-50 px-4 py-1 rounded-full border border-orange-100">Official Support Portal</span>
               <h2 className="text-2xl md:text-4xl font-black text-slate-800 mt-4 mb-2">AI Help Center</h2>
               <p className="text-slate-500 font-medium text-sm md:text-base max-w-md mx-auto">Instant troubleshooting for E-32-52, No Power, and account activation queries.</p>
             </div>
             <SupportChat 
                onRaiseComplaint={handleRaiseComplaint}
                onLogMessage={(msg) => logActivity('CHAT', 'AI Message Sent', msg)}
              />
          </div>
        );
      case AppView.CATALOG:
        return <PartsGrid onAddToCart={handleAddToCart} />;
      case AppView.TECHNICIAN:
        return <TechnicianView tickets={tickets} onUpdateTicket={updateTicketStatus} />;
      case AppView.CART:
        return (
          <CartView 
            items={cartItems} 
            onRemove={id => setCartItems(prev => prev.filter(i => i.id !== id))} 
            onUpdateQty={(id, delta) => setCartItems(prev => prev.map(i => i.id === id ? {...i, quantity: Math.max(1, i.quantity + delta)} : i))} 
            onClear={() => setCartItems([])} 
            onPlaceOrder={handlePlaceOrder}
            setActiveView={setActiveView}
          />
        );
      case AppView.TRACKING:
        return <OrderTracking order={orders[0] || null} />;
      default:
        return <div>View not implemented</div>;
    }
  };

  return (
    <Layout 
      activeView={activeView} 
      setActiveView={setActiveView} 
      cartCount={cartItems.reduce((a, b) => a + b.quantity, 0)}
      hasActiveOrder={orders.length > 0}
    >
      {renderContent()}
    </Layout>
  );
};

export default App;
