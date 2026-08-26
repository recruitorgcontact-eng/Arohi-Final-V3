import React, { useState } from 'react';
import {
  Building,
  Search,
  Plus,
  ShieldCheck,
  FileText,
  DollarSign,
  TrendingUp,
  Mail,
  Phone,
  ArrowUpRight,
  User,
  HeartPulse
} from 'lucide-react';
import { useBusinessOS } from './BusinessOSContext';
import { Customer } from './types';

export default function CustomersView() {
  const { customers, invoices, deals, setQuickCreateType, setActiveModule } = useBusinessOS();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCust, setSelectedCust] = useState<Customer | null>(null);

  const filtered = customers.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.industry.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="bg-white dark:bg-[#121214] border border-black/[0.06] dark:border-white/[0.08] rounded-2xl p-4 sm:p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 flex items-center justify-center">
            <Building className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white tracking-tight">
              360° Customer Accounts Directory
            </h2>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">
              Unified view of active clients, lifetime value (LTV), health scores, and invoice ledger
            </p>
          </div>
        </div>

        <button
          onClick={() => setQuickCreateType('customer')}
          className="px-4 py-2 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all shadow-xs flex items-center gap-1.5 cursor-pointer self-start sm:self-auto active:scale-95"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Customer</span>
        </button>
      </div>

      {/* Search Filter */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
        <input
          type="text"
          placeholder="Search accounts by company name, industry, contact person..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white dark:bg-[#121214] border border-black/[0.06] dark:border-white/[0.08] rounded-xl pl-10 pr-4 py-2.5 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-violet-500 shadow-xs transition-colors"
        />
      </div>

      {/* Customer Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((cust) => (
          <div
            key={cust.id}
            className="bg-white dark:bg-[#121214] border border-black/[0.06] dark:border-white/[0.08] hover:border-violet-500/50 dark:hover:border-violet-400/50 rounded-2xl p-4 sm:p-5 space-y-4 transition-all shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-violet-500/10 text-violet-700 dark:text-violet-300 border border-violet-500/20 flex items-center justify-center font-black text-sm shrink-0">
                    {cust.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-zinc-900 dark:text-white text-sm line-clamp-1">{cust.name}</h3>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">{cust.industry}</p>
                  </div>
                </div>

                <div className={`px-2 py-0.5 rounded-full text-[10px] font-bold border flex items-center gap-1 ${
                  cust.healthScore >= 90
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/40'
                    : 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800/40'
                }`}>
                  <HeartPulse className="w-3 h-3" />
                  <span>{cust.healthScore}%</span>
                </div>
              </div>

              {/* Quick Metrics */}
              <div className="grid grid-cols-2 gap-2 bg-zinc-50/80 dark:bg-zinc-900/80 p-3 rounded-xl border border-black/[0.04] dark:border-white/[0.06] text-xs">
                <div>
                  <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-wider">Lifetime Value</span>
                  <p className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">₹{(cust.lifetimeValue / 100000).toFixed(1)}L</p>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-wider">Outstanding</span>
                  <p className={`font-bold text-sm ${cust.outstandingBalance > 0 ? 'text-amber-600 dark:text-amber-400' : 'text-zinc-500 dark:text-zinc-400'}`}>
                    ₹{cust.outstandingBalance.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Contact info */}
              <div className="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-400 font-medium">
                <div className="flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                  <span>{cust.contactPerson}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                  <span className="truncate">{cust.email}</span>
                </div>
                {cust.gstin && (
                  <div className="text-[10px] text-zinc-400 font-mono">
                    GSTIN: <span className="text-violet-600 dark:text-violet-400 font-bold">{cust.gstin}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-black/[0.04] dark:border-white/[0.06] flex items-center justify-between text-xs">
              <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-semibold">
                Mgr: <strong className="text-zinc-800 dark:text-zinc-200">{cust.assignedAccountManager}</strong>
              </span>
              <button
                onClick={() => setActiveModule('invoices')}
                className="text-violet-600 dark:text-violet-400 hover:underline font-bold flex items-center gap-1 cursor-pointer"
              >
                <span>Invoices ({cust.totalInvoicesCount})</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
