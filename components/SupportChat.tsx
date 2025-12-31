
import React, { useState, useRef, useEffect } from 'react';
import { supportAI } from '../services/geminiService';
import { ChatMessage, SupportTicket } from '../types';

interface SupportChatProps {
  onRaiseComplaint: (complaint: Partial<SupportTicket>) => void;
  onLogMessage: (text: string) => void;
}

const SupportChat: React.FC<SupportChatProps> = ({ onRaiseComplaint, onLogMessage }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Namaste! Welcome to SRI THIRUMALA ENTERPRISES Support. How can I help you with your Sun Direct DTH today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showComplaintForm, setShowComplaintForm] = useState(false);
  
  const [complaintData, setComplaintData] = useState({ 
    customerName: '', 
    customerPhone: '', 
    customerAddress: '', 
    issue: 'No Signal (E-32-52)' 
  });
  
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, showComplaintForm]);

  const handleSend = async (textOverride?: string) => {
    const textToSend = textOverride || input;
    if (!textToSend.trim() || isLoading) return;

    const userText = textToSend;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsLoading(true);
    
    // Log the user's typing to the global activity log
    onLogMessage(userText);

    const history = messages.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.text }]
    }));

    const aiResponse = await supportAI.getResponse(userText, history);
    
    setMessages(prev => [...prev, { role: 'model', text: aiResponse }]);
    setIsLoading(false);
  };

  const submitComplaint = () => {
    onRaiseComplaint(complaintData);
    setShowComplaintForm(false);
    setMessages(prev => [...prev, { role: 'model', text: `Got it! I've registered a service request for "${complaintData.issue}". One of our technicians will visit your home shortly. You can track visit status in the Technician/Jobs Portal.` }]);
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200 h-[500px] md:h-[600px] flex flex-col transition-all">
      <div className="bg-slate-900 p-4 text-white flex items-center justify-between border-b border-white/5">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center shadow-lg text-lg">🤖</div>
          <div>
            <h3 className="font-bold text-sm">SunSmart AI Support</h3>
            <p className="text-[9px] text-orange-500 uppercase font-black tracking-widest">Active • Sri Thirumala</p>
          </div>
        </div>
        <button 
          onClick={() => setShowComplaintForm(true)}
          className="bg-orange-600 hover:bg-orange-700 text-[10px] font-black uppercase tracking-wider px-4 py-2 rounded-xl transition-all shadow-lg active:scale-95"
        >
          Raise Visit
        </button>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 custom-scrollbar">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-4 rounded-2xl shadow-sm ${
              msg.role === 'user' 
                ? 'bg-slate-900 text-white rounded-tr-none' 
                : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
            }`}>
              <p className="text-xs md:text-sm leading-relaxed whitespace-pre-wrap font-bold">{msg.text}</p>
            </div>
          </div>
        ))}
        
        {showComplaintForm && (
          <div className="animate-fade-in py-2">
            <div className="bg-white border-2 border-orange-200 p-5 rounded-2xl shadow-xl space-y-4">
              <h4 className="font-black text-slate-800 text-xs uppercase tracking-widest text-center">Home Visit Request</h4>
              
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-slate-400 uppercase ml-2">Name</label>
                  <input 
                    type="text" placeholder="Your name..." 
                    className="w-full p-4 text-base font-bold border-2 border-slate-100 rounded-xl bg-slate-50 outline-none focus:border-orange-500 focus:bg-white text-slate-900 transition-all"
                    value={complaintData.customerName} onChange={e => setComplaintData({...complaintData, customerName: e.target.value})}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-slate-400 uppercase ml-2">Mobile</label>
                  <input 
                    type="tel" placeholder="Phone number..." 
                    className="w-full p-4 text-base font-bold border-2 border-slate-100 rounded-xl bg-slate-50 outline-none focus:border-orange-500 focus:bg-white text-slate-900 transition-all"
                    value={complaintData.customerPhone} onChange={e => setComplaintData({...complaintData, customerPhone: e.target.value})}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-slate-400 uppercase ml-2">Issue Type</label>
                  <select 
                    className="w-full p-4 text-base font-bold border-2 border-slate-100 rounded-xl bg-slate-50 outline-none focus:border-orange-500 focus:bg-white text-slate-900 appearance-none"
                    value={complaintData.issue} onChange={e => setComplaintData({...complaintData, issue: e.target.value})}
                  >
                    <option>No Signal (E-32-52)</option>
                    <option>STB No Power</option>
                    <option>Remote Replacement</option>
                    <option>Signal Fine-tuning</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-slate-400 uppercase ml-2">Address</label>
                  <textarea 
                    placeholder="Where should technician visit?" 
                    className="w-full p-4 text-base font-bold border-2 border-slate-100 rounded-xl bg-slate-50 outline-none focus:border-orange-500 focus:bg-white text-slate-900 h-24 resize-none transition-all"
                    value={complaintData.customerAddress} onChange={e => setComplaintData({...complaintData, customerAddress: e.target.value})}
                  ></textarea>
                </div>
              </div>

              {/* LIVE MIRROR FOR THE COMPLAINT FORM */}
              <div className="bg-slate-900 rounded-xl p-4 text-white border border-slate-700">
                <h5 className="text-[9px] font-black uppercase text-orange-500 mb-2">Review What You Typed:</h5>
                <p className="text-[11px] leading-tight">
                  <span className="text-slate-500">Subject:</span> {complaintData.issue}<br/>
                  <span className="text-slate-500">Contact:</span> {complaintData.customerName} ({complaintData.customerPhone})<br/>
                  <span className="text-slate-500">Locality:</span> {complaintData.customerAddress || '...'}
                </p>
              </div>

              <div className="flex space-x-2 pt-2">
                <button onClick={() => setShowComplaintForm(false)} className="flex-1 py-3 text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors">Cancel</button>
                <button 
                  disabled={!complaintData.customerName || !complaintData.customerPhone}
                  onClick={submitComplaint} 
                  className="flex-[2] bg-orange-600 text-white py-4 rounded-xl text-sm font-black shadow-lg disabled:opacity-50 transition-all active:scale-95"
                >
                  Confirm Request
                </button>
              </div>
            </div>
          </div>
        )}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-200 p-3 rounded-2xl rounded-tl-none shadow-sm flex items-center space-x-1.5">
              <div className="w-1.5 h-1.5 bg-orange-600 rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-orange-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-1.5 h-1.5 bg-orange-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-white border-t border-slate-100">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your question clearly..."
            autoComplete="off"
            className="flex-1 bg-slate-100 border-2 border-slate-100 rounded-2xl px-5 py-4 text-base font-bold text-slate-900 focus:ring-0 focus:border-orange-500 focus:bg-white outline-none shadow-inner transition-all"
          />
          <button
            onClick={() => handleSend()}
            disabled={isLoading || !input.trim()}
            className="bg-orange-600 hover:bg-orange-700 disabled:bg-slate-200 text-white w-14 rounded-2xl transition-all shadow-lg flex items-center justify-center active:scale-90"
          >
            <span className="text-lg">➔</span>
          </button>
        </div>
        <p className="text-[8px] text-slate-400 font-black uppercase tracking-[0.2em] text-center mt-3">Visible Data Interface • Real-time Mirroring</p>
      </div>
    </div>
  );
};

export default SupportChat;
