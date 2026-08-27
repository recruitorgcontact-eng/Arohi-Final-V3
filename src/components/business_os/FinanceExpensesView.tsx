import React, { useState } from 'react';
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Plus,
  Search,
  Filter,
  CreditCard,
  Building,
  Trash2,
  Download,
  PieChart as PieChartIcon
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
  PieChart,
  Pie,
  Cell
} from 'recharts';

const EXPENSE_CATEGORIES = [
  { name: 'Cloud & Servers', value: 165000, color: '#6366f1' },
  { name: 'Office & Facilities', value: 92000, color: '#8b5cf6' },
  { name: 'Hardware & Devices', value: 135000, color: '#38bdf8' },
  { name: 'Travel & Client Meetings', value: 45000, color: '#f43f5e' },
  { name: 'Marketing & Ads', value: 85000, color: '#eab308' },
];

export default function FinanceExpensesView() {
  const { expenses = [], metrics, deleteExpense, setQuickCreateType, showToast } = useBusinessOS();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const safeExpenses = expenses || [];

  const filteredExpenses = safeExpenses.filter(e =>
    selectedCategory === 'all' || e.category === selectedCategory
  );

  const netProfit = (metrics?.totalRevenue || 0) - (metrics?.totalExpenses || 0);

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="bg-white dark:bg-[#121214] border border-black/[0.06] dark:border-white/[0.08] rounded-2xl p-4 sm:p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center justify-center">
            <DollarSign className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white tracking-tight">
              Finance, Profit & Loss, and Expense Management
            </h2>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">
              Track company operating cash flow, track vendor bills, and calculate Net Operating Margins
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => showToast('Exporting Profit & Loss (P&L) Statement for FY24-25...')}
            className="px-3 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export P&L</span>
          </button>
          <button
            onClick={() => setQuickCreateType('expense')}
            className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Log Expense</span>
          </button>
        </div>
      </div>

      {/* Finance Snapshot Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        
        <div className="bg-white dark:bg-[#121214] border border-black/[0.06] dark:border-white/[0.08] rounded-2xl p-4 space-y-1.5 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
          <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Gross Inflow</span>
          <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
            ₹{metrics.totalRevenue.toLocaleString()}
          </div>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+32% YTD Growth</span>
          </div>
        </div>

        <div className="bg-white dark:bg-[#121214] border border-black/[0.06] dark:border-white/[0.08] rounded-2xl p-4 space-y-1.5 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
          <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Operating Expenses</span>
          <div className="text-xl font-bold text-rose-600 dark:text-rose-400">
            ₹{metrics.totalExpenses.toLocaleString()}
          </div>
          <div className="text-[11px] text-rose-600 dark:text-rose-400 font-semibold flex items-center gap-1">
            <TrendingDown className="w-3.5 h-3.5" />
            <span>Operational burn rate</span>
          </div>
        </div>

        <div className="bg-white dark:bg-[#121214] border border-black/[0.06] dark:border-white/[0.08] rounded-2xl p-4 space-y-1.5 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
          <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Net Operating Profit</span>
          <div className={`text-xl font-bold ${netProfit >= 0 ? 'text-indigo-600 dark:text-indigo-400' : 'text-rose-600 dark:text-rose-400'}`}>
            ₹{netProfit.toLocaleString()}
          </div>
          <div className="text-[11px] text-zinc-500 dark:text-zinc-400 font-semibold">
            Margin: {metrics.totalRevenue > 0 ? ((netProfit / metrics.totalRevenue) * 100).toFixed(1) : 0}%
          </div>
        </div>

        <div className="bg-white dark:bg-[#121214] border border-black/[0.06] dark:border-white/[0.08] rounded-2xl p-4 space-y-1.5 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
          <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Bank Reserves</span>
          <div className="text-xl font-bold text-zinc-900 dark:text-white">
            ₹{metrics.cashBalance.toLocaleString()}
          </div>
          <div className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">
            HDFC Corporate Current A/c
          </div>
        </div>

      </div>

      {/* Expense Breakdown & Expense Ledger */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Ledger Table */}
        <div className="lg:col-span-8 bg-white dark:bg-[#121214] border border-black/[0.06] dark:border-white/[0.08] rounded-2xl p-4 sm:p-5 space-y-3.5 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
          <div className="flex items-center justify-between border-b border-black/[0.06] dark:border-white/[0.08] pb-3">
            <div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white">Operating Expense Ledger</h3>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">Logged company expenditures and vendor payments</p>
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-white dark:bg-[#18181b] border border-black/[0.08] dark:border-white/[0.1] rounded-xl px-3 py-1.5 text-xs text-zinc-800 dark:text-zinc-200 font-semibold focus:outline-none"
            >
              <option value="all">All Categories</option>
              <option value="Cloud & Infrastructure">Cloud & Infra</option>
              <option value="Office & Facilities">Office</option>
              <option value="Hardware & Devices">Hardware</option>
              <option value="Travel & Meals">Travel</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-black/[0.06] dark:border-white/[0.08] text-zinc-500 dark:text-zinc-400 font-bold uppercase text-[10px]">
                  <th className="pb-2.5">Title & Category</th>
                  <th className="pb-2.5">Vendor</th>
                  <th className="pb-2.5">Date</th>
                  <th className="pb-2.5">Amount</th>
                  <th className="pb-2.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/[0.04] dark:divide-white/[0.06] font-medium text-zinc-700 dark:text-zinc-300">
                {filteredExpenses.map((exp) => (
                  <tr key={exp.id} className="hover:bg-zinc-50 dark:hover:bg-[#18181b]/50 transition-colors">
                    <td className="py-2.5">
                      <div className="font-bold text-zinc-900 dark:text-white text-xs">{exp.title}</div>
                      <span className="text-[10px] text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded border border-zinc-200 dark:border-zinc-700">
                        {exp.category}
                      </span>
                    </td>
                    <td className="py-2.5 text-zinc-700 dark:text-zinc-300 font-medium text-xs">{exp.vendor}</td>
                    <td className="py-2.5 text-zinc-500 dark:text-zinc-400 text-xs">{exp.date}</td>
                    <td className="py-2.5 font-bold text-rose-600 dark:text-rose-400 text-xs">
                      ₹{exp.amount.toLocaleString()}
                    </td>
                    <td className="py-2.5 text-right">
                      <button
                        onClick={() => deleteExpense(exp.id)}
                        className="p-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800/40 cursor-pointer"
                        title="Delete Entry"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Expense Category Distribution */}
        <div className="lg:col-span-4 bg-white dark:bg-[#121214] border border-black/[0.06] dark:border-white/[0.08] rounded-2xl p-4 sm:p-5 space-y-3.5 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
          <div>
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white">Expense Distribution</h3>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">Categorized cost centers</p>
          </div>

          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={EXPENSE_CATEGORIES}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={68}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {EXPENSE_CATEGORIES.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: 'var(--tooltip-bg, #18181b)', borderColor: '#3f3f46', borderRadius: '0.75rem', color: '#fff', fontSize: '11px' }}
                  formatter={(val: any) => [`₹${Number(val).toLocaleString()}`, '']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-black/[0.06] dark:border-white/[0.08]">
            {EXPENSE_CATEGORIES.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                  <span className="text-zinc-600 dark:text-zinc-400 font-medium truncate max-w-[140px] text-xs">{item.name}</span>
                </div>
                <span className="text-zinc-900 dark:text-white font-bold text-xs">₹{(item.value / 1000).toFixed(0)}k</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
