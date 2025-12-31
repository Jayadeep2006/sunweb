
import React, { useState } from 'react';
import { CartItem, Order, AppView } from '../types';

interface CartViewProps {
  items: CartItem[];
  onRemove: (id: string) => void;
  onUpdateQty: (id: string, delta: number) => void;
  onClear: () => void;
  onPlaceOrder: (order: Order) => void;
  setActiveView: (view: AppView) => void;
}

type CheckoutStep = 'CART' | 'ADDRESS' | 'PAYMENT' | 'SUCCESS';

const CartView: React.FC<CartViewProps> = ({ items, onRemove, onUpdateQty, onClear, onPlaceOrder, setActiveView }) => {
  const [step, setStep] = useState<CheckoutStep>('CART');
  const [address, setAddress] = useState({ name: '', phone: '', line1: '', city: 'Hyderabad' });
  const [paymentMethod, setPaymentMethod] = useState('');
  const [currentOrderId, setCurrentOrderId] = useState('');

  const subtotal = items.reduce((sum, item) => sum + item.cost * item.quantity, 0);
  const gst = Math.round(subtotal * 0.18);
  const total = subtotal + gst;

  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + Math.floor(Math.random() * 4) + 3);

  const handleFinishCheckout = () => {
    const trackerId = `SRI-TRK-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: Order = {
      id: Date.now().toString(),
      trackerId,
      items: [...items],
      customerName: address.name,
      customerPhone: address.phone,
      customerAddress: `${address.line1}, ${address.city}`,
      total,
      deliveryDate: deliveryDate.toISOString(),
      status: 'PROCESSING'
    };
    
    setCurrentOrderId(trackerId);
    onPlaceOrder(newOrder);
    setStep('SUCCESS');
  };

  if (items.length === 0 && step === 'CART') {
    return (
      <div className="bg-white rounded-[2rem] p-8 md:p-12 text-center border border-slate-200 shadow-sm max-w-2xl mx-auto">
        <div className="text-5xl md:text-6xl mb-4">🛒</div>
        <h3 className="text-xl md:text-2xl font-black text-slate-800 mb-2">Your Cart is Empty</h3>
        <p className="text-slate-500 mb-8 text-sm">Add hardware from the Parts Catalog to get started.</p>
        <button 
          onClick={() => setActiveView(AppView.CATALOG)}
          className="bg-orange-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-700 transition-all"
        >
          Go to Catalog
        </button>
      </div>
    );
  }

  if (step === 'ADDRESS') {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 border border-slate-200 shadow-xl">
          <h3 className="text-xl md:text-2xl font-black text-slate-800 mb-6">Delivery Details</h3>
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-slate-400 ml-4">Receiver Name</label>
              <input 
                type="text" placeholder="Type your full name..." 
                className="w-full p-4 bg-slate-100 border-2 border-slate-100 rounded-2xl outline-none focus:border-orange-500 focus:bg-white text-base font-bold text-slate-900 transition-all"
                value={address.name} onChange={e => setAddress({...address, name: e.target.value})}
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-slate-400 ml-4">Phone Number</label>
              <input 
                type="tel" placeholder="Your 10-digit mobile number..." 
                className="w-full p-4 bg-slate-100 border-2 border-slate-100 rounded-2xl outline-none focus:border-orange-500 focus:bg-white text-base font-bold text-slate-900 transition-all"
                value={address.phone} onChange={e => setAddress({...address, phone: e.target.value})}
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-slate-400 ml-4">Full Address</label>
              <textarea 
                placeholder="Type your complete installation address here..." 
                className="w-full p-4 bg-slate-100 border-2 border-slate-100 rounded-2xl outline-none focus:border-orange-500 focus:bg-white h-32 text-base font-bold text-slate-900 transition-all resize-none"
                value={address.line1} onChange={e => setAddress({...address, line1: e.target.value})}
              />
            </div>
          </div>
          <div className="mt-8 md:mt-10 flex space-x-4">
            <button onClick={() => setStep('CART')} className="flex-1 py-3 md:py-4 font-bold text-slate-500 hover:bg-slate-50 rounded-2xl transition-all text-sm">Back</button>
            <button 
              disabled={!address.name || !address.phone || !address.line1}
              onClick={() => setStep('PAYMENT')} 
              className="flex-1 py-3 md:py-4 bg-orange-600 text-white font-black rounded-2xl hover:bg-orange-700 disabled:bg-slate-200 transition-all shadow-lg text-sm"
            >
              Continue to Payment
            </button>
          </div>
        </div>

        {/* Real-time Address Mirror for absolute transparency */}
        <div className="bg-orange-50 rounded-3xl p-6 border-2 border-dashed border-orange-200 animate-pulse-slow">
          <h4 className="text-xs font-black text-orange-600 uppercase mb-4 flex items-center">
            <span className="mr-2">📝</span> Live Typing Mirror
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-[9px] font-black text-orange-400 uppercase">Customer</p>
              <p className="text-sm font-bold text-slate-800 h-6 truncate">{address.name || '--- Waiting for input ---'}</p>
            </div>
            <div>
              <p className="text-[9px] font-black text-orange-400 uppercase">Contact</p>
              <p className="text-sm font-bold text-slate-800 h-6 truncate">{address.phone || '--- Waiting for input ---'}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-[9px] font-black text-orange-400 uppercase">Installation Site</p>
              <p className="text-sm font-bold text-slate-800 min-h-[1.5rem] italic">{address.line1 || 'Please type your full address above...'}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'PAYMENT') {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 border border-slate-200 shadow-xl">
        <h3 className="text-xl md:text-2xl font-black text-slate-800 mb-2">Payment Method</h3>
        <p className="text-slate-500 mb-8 text-xs md:text-sm">Select how you'd like to pay for your DTH hardware</p>
        
        <div className="space-y-3">
          {[
            { id: 'upi', label: 'PhonePe / G-Pay / UPI', icon: '📱' },
            { id: 'card', label: 'Debit / Credit Card', icon: '💳' },
            { id: 'cod', label: 'Cash on Delivery', icon: '💵' }
          ].map(method => (
            <button 
              key={method.id}
              onClick={() => setPaymentMethod(method.id)}
              className={`w-full p-4 md:p-6 border-2 rounded-2xl flex items-center justify-between transition-all ${
                paymentMethod === method.id ? 'border-orange-500 bg-orange-50' : 'border-slate-100 hover:border-slate-200'
              }`}
            >
              <div className="flex items-center space-x-4">
                <span className="text-xl md:text-2xl">{method.icon}</span>
                <span className="font-bold text-slate-800 text-sm md:text-base">{method.label}</span>
              </div>
              <div className={`w-5 h-5 md:w-6 md:h-6 rounded-full border-2 ${paymentMethod === method.id ? 'border-orange-500 bg-orange-500' : 'border-slate-300'}`}>
                {paymentMethod === method.id && <div className="w-2 h-2 bg-white rounded-full m-1 md:m-1.5" />}
              </div>
            </button>
          ))}
        </div>

        <div className="mt-8 md:mt-10 p-5 md:p-6 bg-slate-900 rounded-2xl text-white flex justify-between items-center">
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400">Total</p>
            <p className="text-xl md:text-2xl font-black text-orange-500">₹{total}</p>
          </div>
          <button 
            disabled={!paymentMethod}
            onClick={handleFinishCheckout} 
            className="px-6 md:px-8 py-2.5 md:py-3 bg-orange-600 rounded-xl font-black hover:bg-orange-700 disabled:bg-slate-700 transition-all active:scale-95 shadow-lg text-xs md:text-sm"
          >
            Confirm Order
          </button>
        </div>
      </div>
    );
  }

  if (step === 'SUCCESS') {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-12 text-center border border-slate-200 shadow-2xl">
        <div className="w-20 h-20 md:w-24 md:h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-4xl md:text-5xl mx-auto mb-8 animate-bounce">✓</div>
        <h3 className="text-2xl md:text-3xl font-black text-slate-800 mb-4">Order Placed!</h3>
        <p className="text-slate-500 mb-8 text-sm leading-relaxed">
          Order tracker ID: <span className="font-black text-orange-600">{currentOrderId}</span>. A technician will verify the order within 24 hours.
        </p>
        
        <div className="bg-orange-50 rounded-2xl md:rounded-3xl p-6 md:p-8 mb-8 border border-orange-100 text-left">
          <div className="flex justify-between items-center mb-4 border-b border-orange-200/50 pb-2">
            <span className="text-slate-500 font-bold uppercase text-[9px]">Status</span>
            <span className="text-orange-600 font-black text-xs">PROCESSING</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-500 font-bold uppercase text-[9px]">Est. Delivery</span>
            <span className="text-slate-800 font-black text-xs">{deliveryDate.toLocaleDateString()}</span>
          </div>
        </div>

        <div className="flex flex-col space-y-3">
          <button 
            onClick={() => setActiveView(AppView.TRACKING)}
            className="w-full py-4 bg-orange-600 text-white rounded-2xl font-black hover:bg-orange-700 transition-all shadow-lg text-sm"
          >
            Track Your Order Now 🚚
          </button>
          <button 
            onClick={() => { onClear(); setActiveView(AppView.DASHBOARD); }}
            className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black hover:bg-slate-800 transition-all text-sm"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
      <div className="lg:col-span-2 space-y-4">
        <div className="bg-white rounded-[1.5rem] md:rounded-[2rem] border border-slate-200 overflow-hidden shadow-sm">
          <div className="p-5 md:p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <h3 className="text-lg md:text-xl font-black text-slate-800">Shopping Cart</h3>
            <button onClick={onClear} className="text-[10px] md:text-xs font-bold text-red-500 hover:underline">Clear All</button>
          </div>
          <div className="divide-y divide-slate-100 overflow-x-auto">
            {items.map(item => (
              <div key={item.id} className="p-4 md:p-6 flex items-center space-x-4 md:space-x-6 min-w-[500px] md:min-w-0">
                <img src={item.imageUrl} className="w-16 h-16 md:w-20 md:h-20 rounded-xl object-cover border border-slate-100" alt={item.name} />
                <div className="flex-1">
                  <h4 className="font-black text-slate-800 text-sm md:text-base leading-tight">{item.name}</h4>
                  <p className="text-[10px] md:text-xs text-slate-400 mt-1">{item.category}</p>
                  <p className="text-xs md:text-sm font-bold text-orange-600 mt-1">₹{item.cost}</p>
                </div>
                <div className="flex items-center space-x-2 md:space-x-3 bg-slate-100 p-1 rounded-xl">
                  <button onClick={() => onUpdateQty(item.id, -1)} className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center bg-white rounded-lg shadow-sm font-bold text-slate-600 hover:text-orange-600">-</button>
                  <span className="w-5 md:w-6 text-center text-xs md:text-sm font-black">{item.quantity}</span>
                  <button onClick={() => onUpdateQty(item.id, 1)} className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center bg-white rounded-lg shadow-sm font-bold text-slate-600 hover:text-orange-600">+</button>
                </div>
                <div className="text-right min-w-[70px] md:min-w-[90px]">
                  <p className="text-xs md:text-sm font-black text-slate-800">₹{item.cost * item.quantity}</p>
                  <button onClick={() => onRemove(item.id)} className="text-[9px] md:text-[10px] text-red-400 font-bold hover:text-red-600 mt-1">Remove</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="lg:col-span-1">
        <div className="bg-slate-900 rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-8 text-white shadow-2xl sticky top-4">
          <h3 className="text-lg md:text-xl font-black mb-6">Order Summary</h3>
          <div className="space-y-4 text-xs md:text-sm font-medium">
            <div className="flex justify-between text-slate-400"><span>Subtotal</span><span>₹{subtotal}</span></div>
            <div className="flex justify-between text-slate-400"><span>Estimated GST (18%)</span><span>₹{gst}</span></div>
            <div className="pt-4 border-t border-slate-800 flex justify-between text-lg md:text-xl font-black text-orange-500">
              <span>Grand Total</span><span>₹{total}</span>
            </div>
          </div>
          <button 
            onClick={() => setStep('ADDRESS')}
            className="w-full mt-8 md:mt-10 py-3 md:py-4 bg-orange-600 text-white rounded-2xl font-black hover:bg-orange-700 transition-all shadow-lg active:scale-95 text-sm"
          >
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartView;
