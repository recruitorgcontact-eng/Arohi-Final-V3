import React, { useState } from 'react';
import {
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Users,
  Building,
  Briefcase,
  FileText,
  ShoppingBag,
  Package,
  FolderKanban,
  Send,
  PhoneCall,
  LifeBuoy,
  ShieldCheck,
  BarChart3,
  Zap,
  Settings,
  Sparkles,
  Search,
  Plus,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ChevronRight,
  Layers,
  Bot
} from 'lucide-react';
import { useBusinessOS } from './BusinessOSContext';
import { BusinessOSModule } from './types';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar
} from 'recharts';

const REVENUE_DATA = [
  { month: 'Sep', revenue: 420000, expenses: 280000, deals: 3 },
  { month: 'Oct', revenue: 580000, expenses: 310000, deals: 5 },
  { month: 'Nov', revenue: 720000, expenses: 360000, deals: 6 },
  { month: 'Dec', revenue: 890000, expenses: 410000, deals: 7 },
  { month: 'Jan', revenue: 1140000, expenses: 490000, deals: 9 },
  { month: 'Feb', revenue: 1480000, expenses: 540000, deals: 12 },
];

interface BusinessToolItem {
  id: BusinessOSModule;
  title: string;
  category: 'AI & Telephony' | 'Sales & CRM' | 'Finance & Billing' | 'Operations & HR' | 'Intelligence & Core';
  subtitle: string;
  icon: any;
  colorLight: string;
  colorDark: string;
  badge?: string;
  metric?: string;
}

export default function DashboardOverview() {
  const {
    companyProfile,
    metrics,
    leads,
    deals,
    invoices,
    tasks,
    calls,
    tickets,
    documents,
    setActiveModule,
    setQuickCreateType,
    setIsCopilotOpen,
    theme
  } = useBusinessOS();

  const isDark = theme === 'dark';
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  // Comprehensive list of all 17 Business OS tools formatted into compact tiles
  const allBusinessTools: BusinessToolItem[] = [
    {
      id: 'brain_sync',
      title: 'Arohi Brain & Voice Sync',
      category: 'AI & Telephony',
      subtitle: 'Voice intake calls, brain chat & autonomous account sync',
      icon: Bot,
      colorLight: 'bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200',
      colorDark: 'dark:bg-fuchsia-950/60 dark:text-fuchsia-400 dark:border-fuchsia-800/50',
      badge: 'AUTO-SYNC',
      metric: 'Voice & Docs'
    },
    {
      id: 'telephony',
      title: 'Arohi AI Calling',
      category: 'AI & Telephony',
      subtitle: 'Human conversation AI voice dialer & support agent',
      icon: PhoneCall,
      colorLight: 'bg-violet-100 text-violet-700 border-violet-200',
      colorDark: 'dark:bg-violet-950/60 dark:text-violet-400 dark:border-violet-800/50',
      badge: 'LIVE AI VOICE',
      metric: `${calls.length} Calls Logged`
    },
    {
      id: 'crm_leads',
      title: 'CRM & Leads Funnel',
      category: 'Sales & CRM',
      subtitle: 'Enquiry capture, lead scoring & WhatsApp follow-ups',
      icon: Users,
      colorLight: 'bg-blue-100 text-blue-700 border-blue-200',
      colorDark: 'dark:bg-blue-950/60 dark:text-blue-400 dark:border-blue-800/50',
      metric: `${leads.length} Leads Active`
    },
    {
      id: 'customers',
      title: 'Customer Directory',
      category: 'Sales & CRM',
      subtitle: 'Client profiles, GSTINs, ledgers & credit terms',
      icon: Building,
      colorLight: 'bg-cyan-100 text-cyan-700 border-cyan-200',
      colorDark: 'dark:bg-cyan-950/60 dark:text-cyan-400 dark:border-cyan-800/50',
      metric: 'Enterprise Accounts'
    },
    {
      id: 'pipeline',
      title: 'Deals & Pipeline Matrix',
      category: 'Sales & CRM',
      subtitle: 'Kanban stages, closure probability & sales forecast',
      icon: Briefcase,
      colorLight: 'bg-indigo-100 text-indigo-700 border-indigo-200',
      colorDark: 'dark:bg-indigo-950/60 dark:text-indigo-400 dark:border-indigo-800/50',
      metric: `₹${(metrics.openDealsValue / 100000).toFixed(1)}L Pipeline`
    },
    {
      id: 'quotations',
      title: 'Quotations & Estimates',
      category: 'Sales & CRM',
      subtitle: 'Instant proforma proposals & WhatsApp PDF dispatch',
      icon: FileText,
      colorLight: 'bg-purple-100 text-purple-700 border-purple-200',
      colorDark: 'dark:bg-purple-950/60 dark:text-purple-400 dark:border-purple-800/50',
      metric: 'GST Ready'
    },
    {
      id: 'invoices',
      title: 'GST Invoicing & Billing',
      category: 'Finance & Billing',
      subtitle: 'B2B/B2C tax invoices, automated payment reminders',
      icon: DollarSign,
      colorLight: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      colorDark: 'dark:bg-emerald-950/60 dark:text-emerald-400 dark:border-emerald-800/50',
      badge: 'TAX COMPLIANT',
      metric: `${invoices.length} Invoices`
    },
    {
      id: 'finance',
      title: 'Finance & Expenses',
      category: 'Finance & Billing',
      subtitle: 'P&L balances, vendor expense ledgers & cash flow',
      icon: TrendingUp,
      colorLight: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      colorDark: 'dark:bg-emerald-950/60 dark:text-emerald-400 dark:border-emerald-800/50',
      metric: `₹${(metrics.cashBalance / 100000).toFixed(1)}L Cash`
    },
    {
      id: 'purchases',
      title: 'Purchases & Vendors',
      category: 'Finance & Billing',
      subtitle: 'Purchase orders, supplier bills & payment aging',
      icon: ShoppingBag,
      colorLight: 'bg-amber-100 text-amber-700 border-amber-200',
      colorDark: 'dark:bg-amber-950/60 dark:text-amber-400 dark:border-amber-800/50',
      metric: 'Vendor POs'
    },
    {
      id: 'inventory',
      title: 'Inventory & Stock',
      category: 'Operations & HR',
      subtitle: 'SKU barcodes, warehouse stock & low-alert triggers',
      icon: Package,
      colorLight: 'bg-orange-100 text-orange-700 border-orange-200',
      colorDark: 'dark:bg-orange-950/60 dark:text-orange-400 dark:border-orange-800/50',
      metric: `${metrics.lowStockItemsCount} Low Stock Alert`
    },
    {
      id: 'hr',
      title: 'HR & Employee Payroll',
      category: 'Operations & HR',
      subtitle: 'Staff profiles, attendance, salary slips & PF/ESI',
      icon: Users,
      colorLight: 'bg-teal-100 text-teal-700 border-teal-200',
      colorDark: 'dark:bg-teal-950/60 dark:text-teal-400 dark:border-teal-800/50',
      metric: `${metrics.activeEmployeesCount} Employees`
    },
    {
      id: 'projects',
      title: 'Projects & Task Board',
      category: 'Operations & HR',
      subtitle: 'Kanban sprints, team task allocations & deadlines',
      icon: FolderKanban,
      colorLight: 'bg-sky-100 text-sky-700 border-sky-200',
      colorDark: 'dark:bg-sky-950/60 dark:text-sky-400 dark:border-sky-800/50',
      metric: `${tasks.length} Sprints`
    },
    {
      id: 'marketing',
      title: 'Marketing Broadcasts',
      category: 'Intelligence & Core',
      subtitle: 'WhatsApp bulk blasts, email campaigns & SMS leads',
      icon: Send,
      colorLight: 'bg-pink-100 text-pink-700 border-pink-200',
      colorDark: 'dark:bg-pink-950/60 dark:text-pink-400 dark:border-pink-800/50',
      metric: 'Multi-Channel'
    },
    {
      id: 'support',
      title: 'Customer Support Desk',
      category: 'Operations & HR',
      subtitle: 'Service tickets, SLA tracking & resolution bots',
      icon: LifeBuoy,
      colorLight: 'bg-rose-100 text-rose-700 border-rose-200',
      colorDark: 'dark:bg-rose-950/60 dark:text-rose-400 dark:border-rose-800/50',
      metric: `${metrics.openTicketsCount} Open Tickets`
    },
    {
      id: 'documents',
      title: 'Encrypted Document Vault',
      category: 'Intelligence & Core',
      subtitle: 'GST certificates, NDAs, contracts & verified KYC',
      icon: ShieldCheck,
      colorLight: 'bg-slate-100 text-slate-700 border-slate-300',
      colorDark: 'dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700',
      metric: `${documents.length} Vault Files`
    },
    {
      id: 'analytics',
      title: 'Executive BI Analytics',
      category: 'Intelligence & Core',
      subtitle: 'Profit margins, client retention & cohort matrices',
      icon: BarChart3,
      colorLight: 'bg-violet-100 text-violet-700 border-violet-200',
      colorDark: 'dark:bg-violet-950/60 dark:text-violet-400 dark:border-violet-800/50',
      metric: 'Growth Metrics'
    },
    {
      id: 'automations',
      title: 'Workflow Automations',
      category: 'Intelligence & Core',
      subtitle: 'Auto invoice dispatch, payment triggers & webhooks',
      icon: Zap,
      colorLight: 'bg-amber-100 text-amber-700 border-amber-200',
      colorDark: 'dark:bg-amber-950/60 dark:text-amber-400 dark:border-amber-800/50',
      badge: 'AUTO-PILOT',
      metric: '5 Active Rules'
    },
    {
      id: 'settings',
      title: 'Settings & Role Security',
      category: 'Intelligence & Core',
      subtitle: 'Multi-branch setup, RBAC permissions & audit logs',
      icon: Settings,
      colorLight: 'bg-zinc-100 text-zinc-700 border-zinc-300',
      colorDark: 'dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700',
      metric: 'Super Admin'
    }
  ];

  const categories = [
    'ALL',
    'AI & Telephony',
    'Sales & CRM',
    'Finance & Billing',
    'Operations & HR',
    'Intelligence & Core'
  ];

  const filteredTools = allBusinessTools.filter(tool => {
    const matchesCat = selectedCategory === 'ALL' || tool.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      
      {/* 1. Compact Arohi AI Executive Strategy Capsule */}
      <div className="bg-gradient-to-r from-violet-50/90 via-indigo-50/50 to-white dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 border border-violet-100/90 dark:border-zinc-800 rounded-2xl p-3.5 sm:p-4 text-zinc-900 dark:text-white shadow-xs relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center text-white shadow-xs shrink-0">
            <Sparkles className="w-4 h-4 text-amber-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-bold uppercase tracking-wider bg-violet-100 dark:bg-white/10 text-violet-800 dark:text-white/90 border border-violet-200/60 dark:border-white/15 px-2 py-0.2 rounded-full">
                AROHI EXECUTIVE BRIEF
              </span>
              <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-medium">Q4 Target on Track</span>
            </div>
            <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 mt-0.5">
              2 High-Value Enterprise Deals (Tata Advanced & Deccan Aerospace) awaiting final sign-off.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 relative z-10 w-full md:w-auto">
          <button
            onClick={() => setIsCopilotOpen(true)}
            className="flex-1 md:flex-none px-3 py-1.5 rounded-full bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100 text-xs font-semibold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400 dark:text-violet-600" />
            <span>Ask Copilot</span>
          </button>
          <button
            onClick={() => setActiveModule('telephony')}
            className="px-3 py-1.5 rounded-full bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>AI Voice Call</span>
          </button>
        </div>
      </div>

      {/* 2. Compact 4-Metric KPI Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
        
        {/* Metric 1 */}
        <div 
          onClick={() => setActiveModule('finance')}
          className="bg-white dark:bg-[#121214] border border-black/[0.06] dark:border-white/[0.08] rounded-xl p-3 cursor-pointer hover:border-emerald-500/40 transition-all shadow-[0_1px_2px_rgba(0,0,0,0.03)]"
        >
          <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400">
            <span className="text-[10px] font-bold uppercase tracking-wider">Collected Revenue</span>
            <div className="w-5.5 h-5.5 rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-[10px] font-bold">
              ₹
            </div>
          </div>
          <div className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white tracking-tight mt-1">
            ₹{metrics.totalRevenue.toLocaleString()}
          </div>
          <div className="text-[9.5px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-0.5 mt-0.5">
            <TrendingUp className="w-2.5 h-2.5" />
            <span>+28.4% MRR</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div 
          onClick={() => setActiveModule('pipeline')}
          className="bg-white dark:bg-[#121214] border border-black/[0.06] dark:border-white/[0.08] rounded-xl p-3 cursor-pointer hover:border-indigo-500/40 transition-all shadow-[0_1px_2px_rgba(0,0,0,0.03)]"
        >
          <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400">
            <span className="text-[10px] font-bold uppercase tracking-wider">Active Deals</span>
            <div className="w-5.5 h-5.5 rounded-md bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Briefcase className="w-3 h-3" />
            </div>
          </div>
          <div className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white tracking-tight mt-1">
            ₹{metrics.openDealsValue.toLocaleString()}
          </div>
          <div className="text-[9.5px] text-indigo-600 dark:text-indigo-400 font-semibold mt-0.5">
            {deals.length} Active in Funnel
          </div>
        </div>

        {/* Metric 3 */}
        <div 
          onClick={() => setActiveModule('invoices')}
          className="bg-white dark:bg-[#121214] border border-black/[0.06] dark:border-white/[0.08] rounded-xl p-3 cursor-pointer hover:border-amber-500/40 transition-all shadow-[0_1px_2px_rgba(0,0,0,0.03)]"
        >
          <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400">
            <span className="text-[10px] font-bold uppercase tracking-wider">Receivables</span>
            <div className="w-5.5 h-5.5 rounded-md bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <FileText className="w-3 h-3" />
            </div>
          </div>
          <div className="text-base sm:text-lg font-bold text-amber-600 dark:text-amber-400 tracking-tight mt-1">
            ₹{(metrics.pendingInvoiceAmount + metrics.overdueInvoiceAmount).toLocaleString()}
          </div>
          <div className="text-[9.5px] text-rose-600 dark:text-rose-400 font-semibold mt-0.5">
            ₹{metrics.overdueInvoiceAmount.toLocaleString()} Overdue
          </div>
        </div>

        {/* Metric 4 */}
        <div 
          onClick={() => setActiveModule('telephony')}
          className="bg-white dark:bg-[#121214] border border-black/[0.06] dark:border-white/[0.08] rounded-xl p-3 cursor-pointer hover:border-violet-500/40 transition-all shadow-[0_1px_2px_rgba(0,0,0,0.03)]"
        >
          <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400">
            <span className="text-[10px] font-bold uppercase tracking-wider">AI Voice & Team</span>
            <div className="w-5.5 h-5.5 rounded-md bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <PhoneCall className="w-3 h-3" />
            </div>
          </div>
          <div className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white tracking-tight mt-1">
            {calls.length} Calls • {metrics.activeEmployeesCount} Staff
          </div>
          <div className="text-[9.5px] text-purple-600 dark:text-purple-400 font-semibold mt-0.5">
            AI Telephony Active
          </div>
        </div>

      </div>

      {/* 3. Primary Section: Compact Business OS Modules & Tools Launcher (Arohi AI Front Page Pattern) */}
      <div className="bg-white dark:bg-[#121214] border border-black/[0.06] dark:border-white/[0.08] rounded-2xl p-4 sm:p-5 space-y-4 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
        
        {/* Header & Category Filter Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-black/[0.06] dark:border-white/[0.08] pb-3.5">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 flex items-center justify-center">
              <Layers className="w-3.5 h-3.5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white tracking-tight">
                Business OS Modules & Tools
              </h3>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">
                Tap any tool to launch immediately • {filteredTools.length} options available
              </p>
            </div>
          </div>

          {/* Quick Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search CRM, AI calling, GST..."
              className="w-full bg-zinc-50 dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-700/80 rounded-full pl-8 pr-3 py-1.5 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-violet-500 transition-all"
            />
          </div>
        </div>

        {/* Category Pills Strip */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 custom-scrollbar text-xs">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-xs'
                    : 'bg-black/[0.03] dark:bg-white/[0.05] text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-black/[0.06] dark:hover:bg-white/[0.08]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* The Compact Tools Grid: 2 cols on mobile, 3 cols on tablet, 4 cols on desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3">
          {filteredTools.map((tool) => {
            const IconComp = tool.icon;
            return (
              <div
                key={tool.id}
                onClick={() => setActiveModule(tool.id)}
                className="group relative bg-zinc-50/60 dark:bg-[#18181b]/70 hover:bg-white dark:hover:bg-[#1f1f23] border border-black/[0.06] dark:border-white/[0.08] hover:border-violet-500/50 dark:hover:border-violet-400/50 rounded-xl p-2.5 sm:p-3 flex flex-col justify-between transition-all duration-200 cursor-pointer shadow-[0_1px_2px_rgba(0,0,0,0.02)] hover:shadow-md active:scale-[0.98]"
              >
                <div>
                  {/* Top Row: Small Icon + Badge / Metric */}
                  <div className="flex items-center justify-between mb-2">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-transform group-hover:scale-105 ${tool.colorLight} ${tool.colorDark}`}>
                      <IconComp className="w-4 h-4" />
                    </div>
                    {tool.badge && (
                      <span className="text-[8px] font-black uppercase tracking-wider bg-violet-500/10 text-violet-600 dark:text-violet-300 border border-violet-500/20 px-1.5 py-0.2 rounded-full">
                        {tool.badge}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h4 className="text-xs font-bold text-zinc-900 dark:text-white tracking-tight leading-snug group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                    {tool.title}
                  </h4>

                  {/* Subtitle / Description */}
                  <p className="text-[10px] text-zinc-500 dark:text-zinc-400 font-medium leading-tight mt-1 line-clamp-2">
                    {tool.subtitle}
                  </p>
                </div>

                {/* Bottom Row: Metric & Launch Arrow */}
                <div className="flex items-center justify-between pt-2 mt-2 border-t border-black/[0.04] dark:border-white/[0.05]">
                  <span className="text-[9.5px] font-semibold text-zinc-600 dark:text-zinc-300 truncate">
                    {tool.metric || tool.category}
                  </span>
                  <div className="w-5 h-5 rounded-full bg-black/[0.04] dark:bg-white/[0.08] group-hover:bg-violet-600 group-hover:text-white dark:group-hover:bg-violet-500 flex items-center justify-center text-zinc-400 group-hover:text-white transition-all">
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* 4. Secondary Compact Operational Analytics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Revenue Velocity Chart (8 Cols) */}
        <div className="lg:col-span-8 bg-white dark:bg-[#121214] border border-black/[0.06] dark:border-white/[0.08] rounded-2xl p-4 space-y-3 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
          <div className="flex items-center justify-between border-b border-black/[0.06] dark:border-white/[0.08] pb-2.5">
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-1.5">
                <span>Revenue Growth & Cash Velocity</span>
              </h4>
              <p className="text-[10.5px] text-zinc-500 dark:text-zinc-400">Monthly billing vs operational expenses</p>
            </div>
            <button
              onClick={() => setActiveModule('analytics')}
              className="text-[11px] font-semibold text-violet-600 dark:text-violet-400 hover:underline flex items-center gap-0.5"
            >
              <span>Full BI</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE_DATA} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="revGradApple" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.0}/>
                  </linearGradient>
                  <linearGradient id="expGradApple" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? '#27272a' : '#f1f5f9'} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: isDark ? '#a1a1aa' : '#64748b' }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: isDark ? '#a1a1aa' : '#64748b' }} tickFormatter={(val) => `₹${val/1000}k`} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDark ? '#18181b' : '#ffffff',
                    borderColor: isDark ? '#27272a' : '#e2e8f0',
                    borderRadius: '10px',
                    fontSize: '11px',
                    color: isDark ? '#ffffff' : '#09090b',
                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
                  }}
                  formatter={(val: any) => [`₹${Number(val).toLocaleString()}`, '']}
                />
                <Area type="monotone" dataKey="revenue" stroke="#8b5cf6" strokeWidth={2} fillOpacity={1} fill="url(#revGradApple)" name="Revenue" />
                <Area type="monotone" dataKey="expenses" stroke="#f43f5e" strokeWidth={1.5} strokeDasharray="3 3" fillOpacity={1} fill="url(#expGradApple)" name="Expenses" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Live Operational Tasks & Action Stream (4 Cols) */}
        <div className="lg:col-span-4 bg-white dark:bg-[#121214] border border-black/[0.06] dark:border-white/[0.08] rounded-2xl p-4 space-y-3 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-black/[0.06] dark:border-white/[0.08] pb-2.5">
              <h4 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white">
                Live Priority Tasks
              </h4>
              <button
                onClick={() => setQuickCreateType('task')}
                className="text-[11px] font-semibold text-violet-600 dark:text-violet-400 hover:underline flex items-center gap-0.5"
              >
                <Plus className="w-3 h-3" />
                <span>Add Task</span>
              </button>
            </div>

            <div className="space-y-2 mt-3">
              {tasks.slice(0, 3).map((task) => (
                <div 
                  key={task.id}
                  onClick={() => setActiveModule('projects')}
                  className="p-2.5 rounded-xl bg-zinc-50/80 dark:bg-[#18181b]/80 border border-black/[0.04] dark:border-white/[0.06] flex items-center justify-between gap-2 hover:border-violet-500/40 transition-all cursor-pointer"
                >
                  <div className="space-y-0.5">
                    <div className="text-xs font-semibold text-zinc-900 dark:text-white truncate max-w-[170px]">
                      {task.title}
                    </div>
                    <div className="text-[9.5px] text-zinc-500 dark:text-zinc-400">
                      Due: {task.dueDate} • {task.assignedTo}
                    </div>
                  </div>
                  <span className={`text-[8.5px] font-bold uppercase px-1.5 py-0.5 rounded-full ${
                    task.priority === 'urgent' ? 'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400' :
                    task.priority === 'high' ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400' :
                    'bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400'
                  }`}>
                    {task.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-black/[0.04] dark:border-white/[0.06] flex items-center justify-between text-[10.5px]">
            <span className="text-zinc-500 dark:text-zinc-400 font-medium">Auto WhatsApp Reminder</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Enabled</span>
            </span>
          </div>
        </div>

      </div>

    </div>
  );
}
