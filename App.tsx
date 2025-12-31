
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
  const [tickets, setTickets] = useState<SupportTicket[]>([]);

  // Load Data from MERN Backend with proper error handling and fallback
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchWithCheck = async (url: string) => {
          const res = await fetch(url);
          if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
          const contentType = res.headers.get("content-type");
          if (!contentType || !contentType.includes("application/json")) {
            throw new TypeError("Response was not JSON!");
          }
          return res.json();
        };

        const [tData, oData] = await Promise.all([
          fetchWithCheck('/api/tickets'),
          fetchWithCheck('/api/orders')
        ]);
        
        setTickets(tData);
        setOrders(oData);
      } catch (err) {
        console.warn("Backend not reachable. Falling back to mock data.", err);
        // Fallback to mock data if backend isn't ready yet
        setTickets(MOCK_TICKETS);
      }
    };
    fetchData();
  }, []);

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
  };

  const handleRaiseComplaint = async (data: Partial<SupportTicket>) => {
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

    try {
      const res = await fetch('/api/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTicket)
      });
      
      if (res.ok) {
        const savedTicket = await res.json();
        setTickets(prev => [savedTicket, ...prev]);
      } else {
        setTickets(prev => [newTicket, ...prev]);
      }
      logActivity('FORM', `Raised Complaint: ${newTicket.id}`, `Issue: ${data.issue}`);
    } catch (err) {
      console.error("Error saving ticket, saved locally:", err);
      setTickets(prev => [newTicket, ...prev]);
    }
  };

  const handlePlaceOrder = async (order: Order) => {
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order)
      });
      
      if (res.ok) {
        const savedOrder = await res.json();
        setOrders(prev => [savedOrder, ...prev]);
      } else {
        setOrders(prev => [order, ...prev]);
      }
      
      setCartItems([]);
      logActivity('FORM', `Placed Order: ${order.trackerId}`, `To: ${order.customerAddress}`);
    } catch (err) {
      console.error("Error saving order, saved locally:", err);
      setOrders(prev => [order, ...prev]);
      setCartItems([]);
    }
  };

  const updateTicketStatus = async (id: string, status: SupportTicket['status']) => {
    try {
      const res = await fetch(`/api/tickets/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      
      if (res.ok) {
        setTickets(prev => prev.map(t => t.id === id ? { ...t, status } : t));
      }
    } catch (err) {
      console.error("Error updating ticket status:", err);
      setTickets(prev => prev.map(t => t.id === id ? { ...t, status } : t));
    }
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
                  Full-stack MERN platform for Sun Direct DTH support. Persistent tracking, secure AI troubleshooting, and centralized workforce management.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button onClick={() => setActiveView(AppView.SUPPORT)} className="bg-orange-600 px-8 py-4 rounded-2xl font-black hover:bg-orange-700 transition-all shadow-lg text-sm">AI Assistant</button>
                  <button onClick={() => setActiveView(AppView.TECHNICIAN)} className="bg-white/10 border border-white/10 backdrop-blur-md px-8 py-4 rounded-2xl font-black hover:bg-white/20 transition-all text-sm">Jobs Portal</button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-6 md:p-8">
              <h3 className="text-lg font-black text-slate-800 mb-6">Real-time Activity Log</h3>
              <div className="space-y-3 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                {activities.map(act => (
                  <div key={act.id} className="flex items-start space-x-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center shrink-0 text-xl">
                      {act.type === 'CHAT' ? '💬' : act.type === 'FORM' ? '📋' : '🛒'}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <p className="text-xs font-black text-slate-800">{act.label}</p>
                        <span className="text-[10px] text-slate-400 font-bold">{act.timestamp}</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1 italic">"{act.content}"</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: 'Cloud Tickets', value: tickets.length, sub: 'Persistent Data', icon: '🛠️', color: 'bg-indigo-600' },
                { label: 'Secure AI', value: 'Gemini', sub: 'Server-Side', icon: '🤖', color: 'bg-orange-600' },
                { label: 'Orders', value: orders.length, sub: 'Live Database', icon: '📦', color: 'bg-emerald-600' },
              ].map((stat, i) => (
                <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-[9px] font-black uppercase tracking-widest">{stat.label}</p>
                    <h3 className="text-3xl font-black text-slate-800 mt-2">{stat.value}</h3>
                  </div>
                  <div className={`w-12 h-12 ${stat.color} text-white rounded-2xl flex items-center justify-center text-2xl shadow-xl`}>
                    {stat.icon}
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
              <SupportChat 
                onRaiseComplaint={handleRaiseComplaint} 
                onLogMessage={(msg) => logActivity('CHAT', 'AI Query', msg)}
              />
              <div className="h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                <PartsGrid onAddToCart={handleAddToCart} />
              </div>
            </div>
          </div>
        );
      case AppView.SUPPORT:
        return <SupportChat onRaiseComplaint={handleRaiseComplaint} onLogMessage={(msg) => logActivity('CHAT', 'AI Query', msg)} />;
      case AppView.CATALOG:
        return <PartsGrid onAddToCart={handleAddToCart} />;
      case AppView.TECHNICIAN:
        return <TechnicianView tickets={tickets} onUpdateTicket={updateTicketStatus} />;
      case AppView.CART:
        return <CartView items={cartItems} onRemove={id => setCartItems(prev => prev.filter(i => i.id !== id))} onUpdateQty={(id, delta) => setCartItems(prev => prev.map(i => i.id === id ? {...i, quantity: Math.max(1, i.quantity + delta)} : i))} onClear={() => setCartItems([])} onPlaceOrder={handlePlaceOrder} setActiveView={setActiveView} />;
      case AppView.TRACKING:
        return <OrderTracking order={orders[0] || null} />;
      default:
        return <div>View not implemented</div>;
    }
  };

  return (
    <Layout activeView={activeView} setActiveView={setActiveView} cartCount={cartItems.reduce((a, b) => a + b.quantity, 0)} hasActiveOrder={orders.length > 0}>
      {renderContent()}
    </Layout>
  );
};

export default App;
