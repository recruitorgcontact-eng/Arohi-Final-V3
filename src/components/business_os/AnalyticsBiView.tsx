import React from 'react';
import {
  BarChart3,
  TrendingUp,
  Sparkles,
  PieChart as PieIcon,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  Building
} from 'lucide-react';
import { useBusinessOS } from './BusinessOSContext';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line
} from 'recharts';

const FORECAST_DATA = [
  { quarter: 'Q1 24', actual: 18.5, projected: 18.5 },
  { quarter: 'Q2 24', actual: 24.2, projected: 23.0 },
  { quarter: 'Q3 24', actual: 31.8, projected: 30.0 },
  { quarter: 'Q4 24', actual: 44.5, projected: 42.0 },
  { quarter: 'Q1 25 (AI Forecast)', actual: null, projected: 58.0 },
  { quarter: 'Q2 25 (AI Forecast)', actual: null, projected: 75.0 },
];

export default function AnalyticsBiView() {
  const { metrics, deals, invoices, theme } = useBusinessOS();
  const isDark = theme === 'dark';

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="bg-white dark:bg-[#121214] border border-black/[0.06] dark:border-white/[0.08] rounded-2xl p-4 sm:p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 flex items-center justify-center">
            <BarChart3 className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white tracking-tight">
              Executive Business Intelligence & Forecasting
            </h2>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">
              Predictive revenue projections, customer retention metrics, and department KPIs
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-xs font-semibold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/50 px-3 py-1.5 rounded-xl border border-indigo-200 dark:border-indigo-800/40 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>AI Predictive Engine</span>
          </span>
        </div>
      </div>

      {/* Forecast Chart */}
      <div className="bg-white dark:bg-[#121214] border border-black/[0.06] dark:border-white/[0.08] rounded-2xl p-4 sm:p-5 space-y-3.5 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-black/[0.06] dark:border-white/[0.08] pb-3 gap-2">
          <div>
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white">Quarterly ARR Growth & AI Forecast (in Lakhs ₹)</h3>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">Historical revenue trajectory projected through FY25-26</p>
          </div>
          <div className="flex items-center gap-3 text-xs font-medium">
            <div className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 inline-block"></span>
              <span>Actual Billed</span>
            </div>
            <div className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>
              <span>AI Projected</span>
            </div>
          </div>
        </div>

        <div className="h-64 sm:h-72 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={FORECAST_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#27272a' : '#f4f4f5'} />
              <XAxis dataKey="quarter" stroke={isDark ? '#71717a' : '#a1a1aa'} fontSize={11} />
              <YAxis stroke={isDark ? '#71717a' : '#a1a1aa'} fontSize={11} tickFormatter={(v) => `₹${v}L`} />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? '#18181b' : '#ffffff',
                  borderColor: isDark ? '#27272a' : '#e4e4e7',
                  borderRadius: '0.75rem',
                  color: isDark ? '#ffffff' : '#09090b',
                  fontSize: '12px',
                  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
                }}
                formatter={(val: any) => [`₹${val} Lakhs`, '']}
              />
              <Line type="monotone" dataKey="actual" stroke="#6366f1" strokeWidth={2.5} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="projected" stroke="#f59e0b" strokeWidth={2} strokeDasharray="4 4" dot={{ r: 3.5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* KPI Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        <div className="bg-white dark:bg-[#121214] border border-black/[0.06] dark:border-white/[0.08] rounded-2xl p-4 space-y-1.5 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
          <span className="text-[10px] text-zinc-400 font-bold uppercase">Customer Acquisition Cost (CAC)</span>
          <div className="text-xl font-bold text-zinc-900 dark:text-white">₹14,200</div>
          <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">Down 18% with Arohi Telephony</p>
        </div>

        <div className="bg-white dark:bg-[#121214] border border-black/[0.06] dark:border-white/[0.08] rounded-2xl p-4 space-y-1.5 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
          <span className="text-[10px] text-zinc-400 font-bold uppercase">Customer Lifetime Value (LTV)</span>
          <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400">₹8,45,000</div>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">LTV / CAC Ratio: 59.5x (Elite Tier)</p>
        </div>

        <div className="bg-white dark:bg-[#121214] border border-black/[0.06] dark:border-white/[0.08] rounded-2xl p-4 space-y-1.5 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
          <span className="text-[10px] text-zinc-400 font-bold uppercase">Net Revenue Retention (NRR)</span>
          <div className="text-xl font-bold text-indigo-600 dark:text-indigo-400">128.4%</div>
          <p className="text-[11px] text-indigo-600 dark:text-indigo-300 font-medium">High enterprise expansion velocity</p>
        </div>
      </div>

    </div>
  );
}
