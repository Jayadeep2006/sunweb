
import React from 'react';
import { Order } from '../types';

interface OrderTrackingProps {
  order: Order | null;
}

const OrderTracking: React.FC<OrderTrackingProps> = ({ order }) => {
  if (!order) {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-[2rem] p-8 md:p-12 text-center border border-slate-200 shadow-sm mt-10">
        <div className="text-6xl mb-6">🔍</div>
        <h3 className="text-xl md:text-2xl font-black text-slate-800 mb-2">No Active Orders Found</h3>
        <p className="text-slate-500 mb-8 text-sm md:text-base">Visit our parts catalog to place your first DTH hardware order.</p>
        <button 
          onClick={() => window.location.reload()} 
          className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold text-sm"
        >
          Check Again
        </button>
      </div>
    );
  }

  const steps = [
    { label: 'Confirmed', status: 'PROCESSING', icon: '📝', desc: 'Order received by Sri Thirumala' },
    { label: 'Shipped', status: 'SHIPPED', icon: '📦', desc: 'Parts are on the way to your city' },
    { label: 'Out for Delivery', status: 'OUT_FOR_DELIVERY', icon: '🛵', desc: 'Technician is reaching your home' },
    { label: 'Delivered', status: 'DELIVERED', icon: '✅', desc: 'Hardware installed & tested' }
  ];

  const currentIdx = steps.findIndex(s => s.status === order.status);

  return (
    <div className="max-w-4xl mx-auto animate-fade-in space-y-6 px-1">
      <div className="bg-white rounded-[2rem] p-6 md:p-10 border border-slate-200 shadow-xl overflow-hidden relative">
        <div className="absolute top-0 right-0 p-8 opacity-5 text-7xl md:text-9xl font-black italic select-none">TRACK</div>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-slate-100 pb-6 relative z-10">
          <div>
            <h2 className="text-xl md:text-2xl font-black text-slate-800">Order Tracker</h2>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Real-time DTH Delivery Status</p>
          </div>
          <div className="bg-orange-600 px-6 py-3 rounded-2xl shadow-lg shadow-orange-600/20 flex flex-col items-center md:items-end">
            <p className="text-[10px] text-orange-100 font-black uppercase">Tracking ID</p>
            <p className="text-lg font-black text-white">{order.trackerId}</p>
          </div>
        </div>

        {/* Stepper - Adaptive for Desktop (Horizontal) and Mobile (Vertical) */}
        <div className="hidden md:flex justify-between items-start mb-16 px-4 relative">
          <div className="absolute top-5 left-10 right-10 h-1 bg-slate-100 rounded-full">
            <div 
              className="h-full bg-orange-500 transition-all duration-1000 rounded-full"
              style={{ width: `${(currentIdx / (steps.length - 1)) * 100}%` }}
            ></div>
          </div>
          {steps.map((step, i) => (
            <div key={i} className="relative z-10 flex flex-col items-center w-32">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all ${
                i <= currentIdx ? 'bg-orange-500 text-white scale-110' : 'bg-white border-2 border-slate-200 text-slate-300'
              }`}>
                <span className="text-sm font-bold">{i <= currentIdx ? '✓' : i + 1}</span>
              </div>
              <p className={`mt-4 text-[10px] font-black uppercase text-center ${i <= currentIdx ? 'text-slate-800' : 'text-slate-400'}`}>
                {step.label}
              </p>
            </div>
          ))}
        </div>

        {/* Vertical Stepper for Mobile/Tablets */}
        <div className="md:hidden space-y-8 mb-10 relative">
          <div className="absolute left-5 top-2 bottom-2 w-0.5 bg-slate-100"></div>
          {steps.map((step, i) => (
            <div key={i} className="flex items-start space-x-6 relative">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 shadow-sm shrink-0 transition-all ${
                i <= currentIdx ? 'bg-orange-500 text-white' : 'bg-white border-2 border-slate-100 text-slate-300'
              }`}>
                <span className="text-xs font-black">{i <= currentIdx ? '✓' : i + 1}</span>
              </div>
              <div className="pt-1">
                <p className={`text-sm font-black uppercase ${i <= currentIdx ? 'text-slate-800' : 'text-slate-300'}`}>{step.label}</p>
                <p className="text-xs text-slate-400 font-medium">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-100">
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
             <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Shipment To</h4>
             <p className="text-sm font-bold text-slate-800 leading-relaxed">
               {order.customerName}<br/>
               {order.customerPhone}<br/>
               <span className="text-slate-500 font-medium">{order.customerAddress}</span>
             </p>
             <div className="mt-6 flex items-center space-x-3 text-orange-600 font-black">
               <span className="text-2xl">📅</span>
               <div className="text-xs">
                 <p className="text-[10px] opacity-70">Estimated Arrival</p>
                 <p>{new Date(order.deliveryDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long' })}</p>
               </div>
             </div>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl text-white shadow-xl">
             <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Order Items</h4>
             <div className="space-y-3 max-h-40 overflow-y-auto custom-scrollbar">
               {order.items.map((item, idx) => (
                 <div key={idx} className="flex justify-between text-xs font-medium">
                   <span className="text-slate-400"><span className="text-white font-bold">{item.quantity}x</span> {item.name}</span>
                   <span className="text-orange-400">₹{item.cost * item.quantity}</span>
                 </div>
               ))}
             </div>
             <div className="mt-6 pt-4 border-t border-slate-800 flex justify-between items-center font-black">
               <span className="text-sm">Paid Total</span>
               <span className="text-xl text-orange-500">₹{order.total}</span>
             </div>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <button 
          onClick={() => window.open('tel:9985265605')}
          className="flex-1 bg-white border border-slate-200 py-4 rounded-2xl font-bold text-sm text-slate-700 hover:bg-slate-50 transition-all flex items-center justify-center space-x-3"
        >
          <span>📞</span> <span>Call Dispatch Center</span>
        </button>
        <button 
          onClick={() => window.print()}
          className="flex-1 bg-white border border-slate-200 py-4 rounded-2xl font-bold text-sm text-slate-700 hover:bg-slate-50 transition-all flex items-center justify-center space-x-3"
        >
          <span>🖨️</span> <span>Download Invoice</span>
        </button>
      </div>
    </div>
  );
};

export default OrderTracking;
