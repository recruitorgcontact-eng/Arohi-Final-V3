import React, { useState } from 'react';
import {
  LifeBuoy,
  Plus,
  Sparkles,
  CheckCircle2,
  Clock,
  AlertTriangle,
  User,
  MessageSquare,
  Send,
  X
} from 'lucide-react';
import { useBusinessOS } from './BusinessOSContext';
import { SupportTicket } from './types';

export default function SupportDeskView() {
  const { tickets, updateTicketStatus, addTicket, showToast } = useBusinessOS();
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);

  const handleApplyAiResponse = (tkt: SupportTicket) => {
    updateTicketStatus(tkt.id, 'resolved');
    showToast(`AI resolution sent to ${tkt.customerName}. Ticket marked resolved!`);
    setSelectedTicket(null);
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="bg-white dark:bg-[#121214] border border-black/[0.06] dark:border-white/[0.08] rounded-2xl p-4 sm:p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 flex items-center justify-center">
            <LifeBuoy className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white tracking-tight">
              Customer Support Ticketing & AI Helpdesk
            </h2>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">
              Multi-channel client queries with SLA tracking and instant AI Copilot response suggestions
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            const subject = prompt('Ticket Subject:');
            if (!subject) return;
            addTicket({
              ticketCode: `TKT-${Math.floor(1000 + Math.random() * 9000)}`,
              customerName: 'Enterprise Client Support',
              subject,
              priority: 'medium',
              status: 'open',
              assignedAgent: 'Support Copilot',
              category: 'General Query',
              slaDeadline: 'In 24 Hours',
              aiSuggestedResponse: 'Thank you for contacting Arohi Support. We have noted your request and our engineer is actively reviewing the logs.'
            });
          }}
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95 self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Create Support Ticket</span>
        </button>
      </div>

      {/* Tickets List */}
      <div className="bg-white dark:bg-[#121214] border border-black/[0.06] dark:border-white/[0.08] rounded-2xl overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-zinc-50/80 dark:bg-[#18181b] border-b border-black/[0.06] dark:border-white/[0.08] text-zinc-500 dark:text-zinc-400 font-bold uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">Ticket ID</th>
                <th className="py-3 px-4">Subject & Client</th>
                <th className="py-3 px-4">Priority</th>
                <th className="py-3 px-4">SLA Time</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Agent</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[0.04] dark:divide-white/[0.06] font-medium text-zinc-700 dark:text-zinc-300">
              {tickets.map((tkt) => (
                <tr key={tkt.id} className="hover:bg-zinc-50 dark:hover:bg-[#18181b]/50 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-indigo-600 dark:text-indigo-400 text-xs">
                    {tkt.ticketCode}
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-bold text-zinc-900 dark:text-white text-xs">{tkt.subject}</div>
                    <div className="text-[10px] text-zinc-400">{tkt.customerName}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase border ${
                      tkt.priority === 'urgent'
                        ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-800/40'
                        : 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800/40'
                    }`}>
                      {tkt.priority}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-zinc-500 dark:text-zinc-400 text-xs">
                    {tkt.slaDeadline}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider border ${
                      tkt.status === 'resolved'
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/40'
                        : tkt.status === 'in_progress'
                        ? 'bg-violet-50 dark:bg-violet-950/40 text-violet-700 dark:text-violet-400 border-violet-200 dark:border-violet-800/40'
                        : 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800/40'
                    }`}>
                      {tkt.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-zinc-700 dark:text-zinc-300 font-medium text-xs">
                    {tkt.assignedAgent}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => setSelectedTicket(tkt)}
                      className="px-2.5 py-1 rounded-lg bg-purple-50 dark:bg-purple-950/50 hover:bg-purple-100 dark:hover:bg-purple-900/50 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800/40 font-bold text-[10px] flex items-center gap-1 ml-auto cursor-pointer"
                    >
                      <Sparkles className="w-3 h-3 text-amber-500" />
                      <span>AI Solve</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Solve Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#18181b] border border-black/[0.08] dark:border-white/[0.1] text-zinc-900 dark:text-white rounded-2xl max-w-xl w-full p-5 sm:p-6 space-y-4 shadow-2xl relative">
            <div className="flex items-start justify-between border-b border-black/[0.06] dark:border-white/[0.08] pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase text-purple-600 dark:text-purple-400 tracking-wider">
                  AI Smart Resolution Desk
                </span>
                <h3 className="text-base font-bold text-zinc-900 dark:text-white mt-0.5">{selectedTicket.subject}</h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Client: {selectedTicket.customerName} ({selectedTicket.ticketCode})</p>
              </div>
              <button
                onClick={() => setSelectedTicket(null)}
                className="p-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-400 hover:text-zinc-700 dark:hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Suggested Response */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-zinc-900 dark:text-white flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Arohi AI Drafted Customer Response</span>
              </span>
              <div className="bg-zinc-50/80 dark:bg-zinc-900/80 p-3.5 rounded-xl border border-black/[0.06] dark:border-white/[0.08] text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed font-sans">
                {selectedTicket.aiSuggestedResponse || "Dear Client,\n\nWe have verified your request in our system. The changes are deployed and verified.\n\nBest regards,\nArohi Enterprise Support"}
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-black/[0.06] dark:border-white/[0.08]">
              <button
                onClick={() => setSelectedTicket(null)}
                className="px-3.5 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-xs font-semibold text-zinc-700 dark:text-zinc-300 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleApplyAiResponse(selectedTicket)}
                className="px-4 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-xs font-semibold text-white flex items-center gap-1.5 shadow-xs cursor-pointer active:scale-95"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send AI Reply & Resolve</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
