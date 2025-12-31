
import React, { useState } from 'react';
import { DTH_PARTS } from '../constants';
import { DTHPart } from '../types';

interface PartCardProps {
  part: DTHPart;
  onAddToCart: (part: DTHPart, quantity: number) => void;
}

const PartCard: React.FC<PartCardProps> = ({ part, onAddToCart }) => {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart(part, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all group flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={part.imageUrl} 
          alt={part.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-xl shadow-md border border-slate-100">
          <span className="text-sm font-black text-orange-600">₹{part.cost}</span>
        </div>
        <div className="absolute top-3 left-3 bg-slate-900/70 backdrop-blur-sm px-2 py-1 rounded-lg">
          <span className="text-[10px] text-white font-bold uppercase tracking-wider">{part.category}</span>
        </div>
      </div>
      
      <div className="p-5 flex-1 flex flex-col">
        <h4 className="font-black text-slate-800 truncate text-base">{part.name}</h4>
        <p className="text-xs text-slate-500 mt-2 line-clamp-2 h-8 leading-relaxed">
          {part.description}
        </p>
        
        <div className="mt-auto pt-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] text-slate-400 uppercase font-black tracking-tighter">Availability</span>
            <span className={`text-xs font-black ${part.stock < 20 ? 'text-red-500' : 'text-slate-800'}`}>
              {part.stock} units in stock
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex items-center bg-slate-100 rounded-xl p-1 border border-slate-200">
              <button 
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm text-slate-600 hover:text-orange-600 font-bold transition-all active:scale-90"
              >
                -
              </button>
              <span className="w-8 text-center text-sm font-black text-slate-800">{qty}</span>
              <button 
                onClick={() => setQty(qty + 1)}
                className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm text-slate-600 hover:text-orange-600 font-bold transition-all active:scale-90"
              >
                +
              </button>
            </div>
            
            <button 
              onClick={handleAdd}
              className={`flex-1 flex items-center justify-center space-x-2 py-2.5 rounded-xl font-black text-xs transition-all active:scale-95 shadow-md ${
                added 
                ? 'bg-green-600 text-white' 
                : 'bg-orange-600 text-white hover:bg-orange-700'
              }`}
            >
              <span>{added ? '✅ Added' : '🛒 Add to Cart'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface PartsGridProps {
  onAddToCart: (part: DTHPart, quantity: number) => void;
}

const PartsGrid: React.FC<PartsGridProps> = ({ onAddToCart }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-slate-800">DTH Parts Inventory</h2>
          <p className="text-xs text-slate-500">Authorized Stock for SRI THIRUMALA ENTERPRISES</p>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => alert("Sorting by Price/Category...")}
            className="px-4 py-2 text-sm bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors shadow-sm font-bold"
          >
            Filter
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {DTH_PARTS.map((part) => (
          <PartCard key={part.id} part={part} onAddToCart={onAddToCart} />
        ))}
      </div>
    </div>
  );
};

export default PartsGrid;
