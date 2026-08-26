import React, { useState, useEffect } from 'react';
import {
  Search,
  Users,
  Briefcase,
  FileText,
  DollarSign,
  Package,
  FolderKanban,
  PhoneCall,
  Settings,
  Sparkles,
  ArrowRight,
  X
} from 'lucide-react';
import { useBusinessOS } from './BusinessOSContext';
import { BusinessOSModule } from './types';

interface SearchResult {
  title: string;
  subtitle: string;
  category: string;
  moduleTarget: BusinessOSModule;
}

export default function CommandPaletteModal() {
  const {
    isCommandPaletteOpen,
    setIsCommandPaletteOpen,
    setActiveModule,
    leads,
    customers,
    deals,
    invoices,
    employees,
    tasks,
    theme
  } = useBusinessOS();

  const [query, setQuery] = useState('');

  // Keyboard shortcut Ctrl+K or Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(!isCommandPaletteOpen);
      }
      if (e.key === 'Escape' && isCommandPaletteOpen) {
        setIsCommandPaletteOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCommandPaletteOpen, setIsCommandPaletteOpen]);

  if (!isCommandPaletteOpen) return null;

  // Build searchable index
  const results: SearchResult[] = [];

  // Static modules
  const modulesList: { name: string; module: BusinessOSModule; desc: string }[] = [
    { name: 'Executive Overview Dashboard', module: 'overview', desc: 'KPIs, cash flow, revenue targets' },
    { name: 'CRM & Lead Intelligence', module: 'crm_leads', desc: 'Manage inbound leads and AI scores' },
    { name: '360° Customer Directory', module: 'customers', desc: 'Client profiles and accounts' },
    { name: 'Sales Deals Pipeline Kanban', module: 'pipeline', desc: 'Enterprise deal flow stages' },
    { name: 'Commercial Quotations & Estimates', module: 'quotations', desc: 'GST estimates and proposals' },
    { name: 'Tax Invoices & Billing', module: 'invoices', desc: 'GST bills and dynamic UPI QR' },
    { name: 'Finance & Expense Management', module: 'finance', desc: 'P&L statement and expense ledger' },
    { name: 'Procurement & Purchase Orders', module: 'purchases', desc: 'Vendor directory and POs' },
    { name: 'Inventory & Stock SKU', module: 'inventory', desc: 'Multi-warehouse stock counts' },
    { name: 'HR & Indian Payroll Slips', module: 'hr_payroll', desc: 'PF, TDS and team headcount' },
    { name: 'Projects & Agile Tasks', module: 'projects', desc: 'Client milestones and task board' },
    { name: 'Arohi Call Telephony', module: 'telephony', desc: 'Autonomous AI voice agent & IVR' },
    { name: 'BI Analytics & Forecasting', module: 'analytics', desc: 'ARR projections and retention' },
    { name: 'Organization Settings & RBAC', module: 'settings', desc: 'GST profile and permissions' },
  ];

  modulesList.forEach(m => {
    if (!query || m.name.toLowerCase().includes(query.toLowerCase()) || m.desc.toLowerCase().includes(query.toLowerCase())) {
      results.push({
        title: m.name,
        subtitle: m.desc,
        category: 'App Modules',
        moduleTarget: m.module
      });
    }
  });

  // Leads
  leads.forEach(l => {
    if (query && (l.company.toLowerCase().includes(query.toLowerCase()) || l.name.toLowerCase().includes(query.toLowerCase()))) {
      results.push({
        title: l.company,
        subtitle: `Lead • ${l.name} (₹${(l.estimatedValue / 100000).toFixed(1)}L)`,
        category: 'CRM Leads',
        moduleTarget: 'crm_leads'
      });
    }
  });

  // Invoices
  invoices.forEach(i => {
    if (query && (i.invoiceNumber.toLowerCase().includes(query.toLowerCase()) || i.customerName.toLowerCase().includes(query.toLowerCase()))) {
      results.push({
        title: i.invoiceNumber,
        subtitle: `${i.customerName} • ₹${i.grandTotal.toLocaleString()} (${i.status.toUpperCase()})`,
        category: 'Invoices',
        moduleTarget: 'invoices'
      });
    }
  });

  const handleSelect = (mod: BusinessOSModule) => {
    setActiveModule(mod);
    setIsCommandPaletteOpen(false);
    setQuery('');
  };

  return (
    <div className="fixed inset-0 z-[250] flex items-start justify-center p-4 pt-16 sm:pt-20 bg-black/40 backdrop-blur-md animate-in fade-in duration-150">
      <div className="bg-white dark:bg-[#121214] border border-black/[0.08] dark:border-white/[0.1] text-zinc-900 dark:text-zinc-100 rounded-2xl max-w-xl w-full shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
        
        {/* Search Input */}
        <div className="p-3.5 border-b border-black/[0.06] dark:border-white/[0.08] flex items-center gap-2.5 bg-[#FBFBFD] dark:bg-[#18181b]">
          <Search className="w-4 h-4 text-zinc-400 dark:text-zinc-500 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Type a module, lead, deal, invoice number, or command..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none"
          />
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-[9px] text-zinc-500 dark:text-zinc-400 font-mono">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-1.5 divide-y divide-black/[0.03] dark:divide-white/[0.03] text-xs">
          {results.slice(0, 8).map((res, idx) => (
            <div
              key={idx}
              onClick={() => handleSelect(res.moduleTarget)}
              className="p-2.5 rounded-xl hover:bg-black/[0.03] dark:hover:bg-white/[0.04] transition-colors flex items-center justify-between cursor-pointer group"
            >
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <span className="font-medium text-[11.5px] text-zinc-900 dark:text-zinc-100 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                    {res.title}
                  </span>
                  <span className="text-[8px] font-semibold uppercase text-zinc-500 dark:text-zinc-400 bg-black/[0.03] dark:bg-white/[0.05] px-1.5 py-0.2 rounded-full border border-black/[0.04] dark:border-white/[0.06]">
                    {res.category}
                  </span>
                </div>
                <p className="text-[10px] text-zinc-500 dark:text-zinc-400 font-normal">{res.subtitle}</p>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors shrink-0" />
            </div>
          ))}

          {results.length === 0 && (
            <div className="p-8 text-center text-zinc-400 dark:text-zinc-500 text-xs font-medium">
              No matching records or modules found.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-2.5 bg-[#FBFBFD] dark:bg-[#18181b] border-t border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between text-[9px] text-zinc-400 dark:text-zinc-500 font-medium px-3.5">
          <div className="flex items-center gap-2">
            <span>Universal Business Search</span>
            <span>•</span>
            <span>Navigate instantly with keyboard</span>
          </div>
          <span>AROHI ONE Business OS</span>
        </div>

      </div>
    </div>
  );
}
