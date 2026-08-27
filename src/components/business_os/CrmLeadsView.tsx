import React, { useState } from 'react';
import {
  Users,
  Search,
  Plus,
  Filter,
  Sparkles,
  Phone,
  Mail,
  Building,
  ArrowRight,
  TrendingUp,
  Trash2,
  Edit2,
  CheckCircle2,
  Clock,
  X
} from 'lucide-react';
import { useBusinessOS } from './BusinessOSContext';
import { Lead, LeadStatus } from './types';

const STATUS_CONFIG: Record<LeadStatus, { label: string; bg: string; text: string; border: string }> = {
  new: { label: 'New Lead', bg: 'bg-sky-50 dark:bg-sky-950/40', text: 'text-sky-700 dark:text-sky-400', border: 'border-sky-200 dark:border-sky-800/40' },
  contacted: { label: 'Contacted', bg: 'bg-blue-50 dark:bg-blue-950/40', text: 'text-blue-700 dark:text-blue-400', border: 'border-blue-200 dark:border-blue-800/40' },
  qualified: { label: 'Qualified', bg: 'bg-indigo-50 dark:bg-indigo-950/40', text: 'text-indigo-700 dark:text-indigo-400', border: 'border-indigo-200 dark:border-indigo-800/40' },
  proposal_sent: { label: 'Proposal Sent', bg: 'bg-purple-50 dark:bg-purple-950/40', text: 'text-purple-700 dark:text-purple-400', border: 'border-purple-200 dark:border-purple-800/40' },
  negotiation: { label: 'Negotiation', bg: 'bg-amber-50 dark:bg-amber-950/40', text: 'text-amber-700 dark:text-amber-400', border: 'border-amber-200 dark:border-amber-800/40' },
  won: { label: 'Closed Won', bg: 'bg-emerald-50 dark:bg-emerald-950/40', text: 'text-emerald-700 dark:text-emerald-400', border: 'border-emerald-200 dark:border-emerald-800/40' },
  lost: { label: 'Lost', bg: 'bg-rose-50 dark:bg-rose-950/40', text: 'text-rose-700 dark:text-rose-400', border: 'border-rose-200 dark:border-rose-800/40' },
};

export default function CrmLeadsView() {
  const { leads = [], addLead, updateLead, deleteLead, convertLeadToDeal, setQuickCreateType } = useBusinessOS();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const safeLeads = leads || [];

  const filteredLeads = safeLeads.filter(l => {
    const q = (searchQuery || '').toLowerCase();
    const matchSearch =
      (l?.name || '').toLowerCase().includes(q) ||
      (l?.company || '').toLowerCase().includes(q) ||
      (l?.city || '').toLowerCase().includes(q) ||
      (l?.email || '').toLowerCase().includes(q);
    const matchStatus = statusFilter === 'all' || l?.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      
      {/* Header & Controls */}
      <div className="bg-white dark:bg-[#121214] border border-black/[0.06] dark:border-white/[0.08] rounded-2xl p-4 sm:p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 flex items-center justify-center">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white tracking-tight">
              CRM & Lead Intelligence Hub
            </h2>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">
              Capture, track, score with Arohi AI, and convert high-value leads into pipeline deals
            </p>
          </div>
        </div>

        <button
          onClick={() => setQuickCreateType('lead')}
          className="px-4 py-2 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95 self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add New Lead</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative flex-1 w-full max-w-md">
          <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search leads by company, contact person, city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white dark:bg-[#121214] border border-black/[0.06] dark:border-white/[0.08] rounded-xl pl-9 pr-3.5 py-2 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-violet-500 shadow-xs transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-[10px] font-bold uppercase text-zinc-500 dark:text-zinc-400 whitespace-nowrap">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full sm:w-auto bg-white dark:bg-[#121214] border border-black/[0.06] dark:border-white/[0.08] rounded-xl px-3 py-2 text-xs text-zinc-800 dark:text-zinc-200 font-semibold focus:outline-none focus:border-violet-500 shadow-xs cursor-pointer"
          >
            <option value="all">All Statuses ({leads.length})</option>
            <option value="new">New Lead</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="proposal_sent">Proposal Sent</option>
            <option value="negotiation">Negotiation</option>
            <option value="won">Closed Won</option>
            <option value="lost">Lost</option>
          </select>
        </div>
      </div>

      {/* Leads Data Table */}
      <div className="bg-white dark:bg-[#121214] border border-black/[0.06] dark:border-white/[0.08] rounded-2xl overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-zinc-50/80 dark:bg-[#18181b] border-b border-black/[0.06] dark:border-white/[0.08] text-zinc-500 dark:text-zinc-400 font-bold uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">Company & Contact</th>
                <th className="py-3 px-4">Est. Value</th>
                <th className="py-3 px-4">AI Score</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Source</th>
                <th className="py-3 px-4">Rep</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[0.04] dark:divide-white/[0.06] font-medium text-zinc-700 dark:text-zinc-300">
              {filteredLeads.map((lead) => {
                const conf = STATUS_CONFIG[lead.status] || STATUS_CONFIG.new;
                return (
                  <tr key={lead.id} className="hover:bg-zinc-50 dark:hover:bg-[#18181b]/50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-700 dark:text-purple-300 flex items-center justify-center font-bold text-xs shrink-0">
                          {lead.company.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-zinc-900 dark:text-white text-xs hover:text-purple-600 cursor-pointer" onClick={() => setSelectedLead(lead)}>
                            {lead.company}
                          </div>
                          <div className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium flex items-center gap-1.5 mt-0.5">
                            <span>{lead.name}</span>
                            <span>•</span>
                            <span>{lead.city}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-bold text-zinc-900 dark:text-white text-xs">
                        ₹{(lead.estimatedValue / 100000).toFixed(2)}L
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1.5">
                        <div className={`px-2 py-0.5 rounded-full text-[10px] font-bold border flex items-center gap-1 ${
                          lead.aiScore >= 85
                            ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/40'
                            : lead.aiScore >= 70
                            ? 'bg-violet-50 dark:bg-violet-950/40 text-violet-700 dark:text-violet-400 border-violet-200 dark:border-violet-800/40'
                            : 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800/40'
                        }`}>
                          <Sparkles className="w-2.5 h-2.5" />
                          <span>{lead.aiScore}/100</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider border ${conf.bg} ${conf.text} ${conf.border}`}>
                        {conf.label}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-[10px] text-zinc-600 dark:text-zinc-400 font-semibold bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-md border border-zinc-200 dark:border-zinc-700">
                        {lead.source}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-zinc-700 dark:text-zinc-300 font-medium text-xs">
                      {lead.assignedTo}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {lead.status !== 'won' && (
                          <button
                            onClick={() => convertLeadToDeal(lead.id)}
                            className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-semibold transition-all flex items-center gap-1 shadow-xs cursor-pointer active:scale-95"
                            title="Convert to Deal"
                          >
                            <span>Convert</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        )}
                        <button
                          onClick={() => setSelectedLead(lead)}
                          className="p-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition-all cursor-pointer"
                          title="View Details"
                        >
                          <Edit2 className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => deleteLead(lead.id)}
                          className="p-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800/40 transition-all cursor-pointer"
                          title="Delete Lead"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lead Detail Drawer Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#18181b] border border-black/[0.08] dark:border-white/[0.1] text-zinc-900 dark:text-white rounded-2xl max-w-xl w-full p-5 sm:p-6 space-y-4 shadow-2xl relative animate-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between border-b border-black/[0.06] dark:border-white/[0.08] pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase text-purple-600 dark:text-purple-400 tracking-wider">
                  Lead Profile & AI Insights
                </span>
                <h3 className="text-base font-bold text-zinc-900 dark:text-white mt-0.5">{selectedLead.company}</h3>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">Contact: {selectedLead.name} ({selectedLead.city})</p>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="p-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-400 hover:text-zinc-700 dark:hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* AI Intelligence Box */}
            <div className="bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800/40 rounded-xl p-3.5 space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-purple-700 dark:text-purple-300 text-xs font-bold">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Arohi AI Lead Scoring & Intent Analysis</span>
                </div>
                <span className="text-[10px] font-bold bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded-full border border-purple-200 dark:border-purple-800/40">
                  {selectedLead.aiScore}/100 Score
                </span>
              </div>
              <p className="text-xs text-zinc-700 dark:text-zinc-300 font-medium leading-relaxed">
                {selectedLead.aiInsight}
              </p>
            </div>

            {/* Contact Details */}
            <div className="grid grid-cols-2 gap-2.5 text-xs">
              <div className="bg-zinc-50/80 dark:bg-zinc-900/80 p-2.5 rounded-xl border border-black/[0.04] dark:border-white/[0.06] space-y-0.5">
                <span className="text-[10px] text-zinc-400 font-bold uppercase">Email</span>
                <p className="font-semibold text-zinc-900 dark:text-white truncate">{selectedLead.email}</p>
              </div>
              <div className="bg-zinc-50/80 dark:bg-zinc-900/80 p-2.5 rounded-xl border border-black/[0.04] dark:border-white/[0.06] space-y-0.5">
                <span className="text-[10px] text-zinc-400 font-bold uppercase">Phone</span>
                <p className="font-semibold text-zinc-900 dark:text-white">{selectedLead.phone}</p>
              </div>
              <div className="bg-zinc-50/80 dark:bg-zinc-900/80 p-2.5 rounded-xl border border-black/[0.04] dark:border-white/[0.06] space-y-0.5">
                <span className="text-[10px] text-zinc-400 font-bold uppercase">Est. Value</span>
                <p className="font-bold text-emerald-600 dark:text-emerald-400">₹{selectedLead.estimatedValue.toLocaleString()}</p>
              </div>
              <div className="bg-zinc-50/80 dark:bg-zinc-900/80 p-2.5 rounded-xl border border-black/[0.04] dark:border-white/[0.06] space-y-0.5">
                <span className="text-[10px] text-zinc-400 font-bold uppercase">Assigned Rep</span>
                <p className="font-semibold text-violet-600 dark:text-violet-400">{selectedLead.assignedTo}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-black/[0.06] dark:border-white/[0.08]">
              <button
                onClick={() => setSelectedLead(null)}
                className="px-3.5 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-xs font-semibold text-zinc-700 dark:text-zinc-300 cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  convertLeadToDeal(selectedLead.id);
                  setSelectedLead(null);
                }}
                className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-xs font-semibold text-white flex items-center gap-1.5 shadow-xs cursor-pointer active:scale-95"
              >
                <span>Convert to Pipeline Deal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
