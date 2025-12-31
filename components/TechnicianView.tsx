
import React, { useState } from 'react';
import { SupportTicket } from '../types';

interface TechnicianViewProps {
  tickets: SupportTicket[];
  onUpdateTicket: (id: string, status: SupportTicket['status']) => void;
}

const TechnicianView: React.FC<TechnicianViewProps> = ({ tickets, onUpdateTicket }) => {
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);

  const activeTicket = tickets.find(t => t.id === selectedTicket);

  const runDiagnostic = (tool: string) => {
    alert(`Running ${tool} simulation... Diagnostic complete. No hardware faults found.`);
  };

  const getStatusColor = (status: SupportTicket['status']) => {
    switch (status) {
      case 'OPEN': return 'bg-blue-600';
      case 'ASSIGNED': return 'bg-purple-600';
      case 'OUT_FOR_SERVICE': return 'bg-orange-500';
      case 'AT_LOCATION': return 'bg-yellow-500';
      case 'RESOLVED': return 'bg-green-600';
      default: return 'bg-slate-400';
    }
  };

  const handleNextStatus = (id: string, current: SupportTicket['status']) => {
    const sequence: SupportTicket['status'][] = ['OPEN', 'ASSIGNED', 'OUT_FOR_SERVICE', 'AT_LOCATION', 'RESOLVED'];
    const currentIndex = sequence.indexOf(current);
    if (currentIndex < sequence.length - 1) {
      onUpdateTicket(id, sequence[currentIndex + 1]);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Active Work Orders */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div>
              <h3 className="text-xl font-black text-slate-800">Job Dashboard</h3>
              <p className="text-xs text-slate-500">SRI THIRUMALA Authorized Service Force</p>
            </div>
          </div>
          <div className="divide-y divide-slate-100 max-h-[600px] overflow-y-auto">
            {tickets.map(ticket => (
              <div 
                key={ticket.id} 
                onClick={() => setSelectedTicket(ticket.id)}
                className={`p-6 hover:bg-slate-50 transition-all cursor-pointer group ${selectedTicket === ticket.id ? 'bg-orange-50 border-l-4 border-orange-500' : ''}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-sm transition-all ${
                      selectedTicket === ticket.id ? 'bg-orange-600 text-white' : 'bg-slate-100'
                    }`}>
                      {ticket.issue.includes('Signal') ? '📡' : ticket.issue.includes('Remote') ? '📱' : '📺'}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                         <h4 className="font-black text-slate-800 text-lg">{ticket.customerName}</h4>
                         <span className="text-[10px] text-slate-400 font-mono bg-white border border-slate-200 px-2 rounded-md">#{ticket.id}</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">{ticket.customerAddress}</p>
                      <div className="flex items-center mt-3 space-x-4">
                        <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tight shadow-sm text-white ${getStatusColor(ticket.status)}`}>
                          {ticket.status.replace(/_/g, ' ')}
                        </span>
                        {ticket.assignedTechnician && (
                          <span className="text-[10px] font-bold text-slate-500 italic">Assignee: {ticket.assignedTechnician}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  {ticket.status !== 'RESOLVED' && (
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleNextStatus(ticket.id, ticket.status); }}
                      className="text-[10px] font-black bg-white border-2 border-slate-200 px-4 py-2 rounded-xl hover:bg-orange-600 hover:text-white hover:border-orange-600 transition-all active:scale-95"
                    >
                      Update Progress
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Selected Job Tracker */}
      <div className="space-y-6">
        {activeTicket ? (
          <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl animate-fade-in">
            <h3 className="text-lg font-black mb-6">Live Visit Tracker</h3>
            
            <div className="relative space-y-8 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
              {[
                { label: 'Job Assigned', status: 'ASSIGNED', icon: '👤' },
                { label: 'Out for Service', status: 'OUT_FOR_SERVICE', icon: '🛵' },
                { label: 'At Location', status: 'AT_LOCATION', icon: '📍' },
                { label: 'Issue Resolved', status: 'RESOLVED', icon: '✅' }
              ].map((step, i) => {
                const sequence = ['OPEN', 'ASSIGNED', 'OUT_FOR_SERVICE', 'AT_LOCATION', 'RESOLVED'];
                const isCompleted = sequence.indexOf(activeTicket.status) >= sequence.indexOf(step.status);
                const isActive = activeTicket.status === step.status;

                return (
                  <div key={i} className="relative flex items-center space-x-4">
                    <div className={`z-10 w-6 h-6 rounded-full flex items-center justify-center text-[10px] transition-all duration-500 ${
                      isCompleted ? 'bg-orange-500 text-white scale-110 shadow-lg shadow-orange-500/20' : 'bg-slate-800 text-slate-500'
                    }`}>
                      {isCompleted ? '✓' : ''}
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm font-bold ${isCompleted ? 'text-white' : 'text-slate-600'}`}>{step.label}</p>
                      {isActive && <p className="text-[10px] text-orange-400 font-medium animate-pulse">Technician is here...</p>}
                    </div>
                    <span className="text-xl grayscale opacity-50">{step.icon}</span>
                  </div>
                );
              })}
            </div>

            <div className="mt-10 pt-8 border-t border-slate-800">
              <div className="flex items-center space-x-4 mb-6">
                 <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center text-xl">👷</div>
                 <div>
                    <p className="text-xs text-slate-500">Field Agent</p>
                    <p className="font-bold">{activeTicket.assignedTechnician || 'Auto-Assigning...'}</p>
                 </div>
              </div>
              <button 
                onClick={() => window.open(`tel:${activeTicket.customerPhone}`)}
                className="w-full py-4 bg-orange-600 rounded-2xl font-black text-sm hover:bg-orange-700 transition-all shadow-lg active:scale-95"
              >
                Call Customer
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-[2.5rem] p-10 border border-slate-200 text-center flex flex-col items-center">
             <div className="text-5xl mb-4">👷‍♂️</div>
             <h4 className="font-black text-slate-800">Select a Job</h4>
             <p className="text-xs text-slate-400 mt-2">Pick a ticket from the left to track live visit status and diagnostic tools.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TechnicianView;
