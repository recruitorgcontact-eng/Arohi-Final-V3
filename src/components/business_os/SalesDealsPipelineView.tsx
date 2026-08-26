import React from 'react';
import {
  Briefcase,
  Plus,
  ArrowRight,
  TrendingUp,
  Clock,
  Sparkles,
  User,
  DollarSign,
  ChevronRight,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useBusinessOS } from './BusinessOSContext';
import { Deal, DealStage } from './types';

const STAGES: { id: DealStage; label: string; color: string; border: string }[] = [
  { id: 'lead_in', label: 'Lead In', color: 'text-zinc-600 dark:text-zinc-400', border: 'border-zinc-300 dark:border-zinc-700' },
  { id: 'discovery', label: 'Discovery', color: 'text-sky-600 dark:text-sky-400', border: 'border-sky-300 dark:border-sky-500/40' },
  { id: 'proposal', label: 'Demo / Proposal', color: 'text-indigo-600 dark:text-indigo-400', border: 'border-indigo-300 dark:border-indigo-500/40' },
  { id: 'negotiation', label: 'Negotiation', color: 'text-amber-600 dark:text-amber-400', border: 'border-amber-300 dark:border-amber-500/40' },
  { id: 'closed_won', label: 'Closed Won', color: 'text-emerald-600 dark:text-emerald-400', border: 'border-emerald-300 dark:border-emerald-500/40' },
  { id: 'closed_lost', label: 'Closed Lost', color: 'text-rose-600 dark:text-rose-400', border: 'border-rose-300 dark:border-rose-500/40' },
];

export default function SalesDealsPipelineView() {
  const { deals, updateDealStage, setQuickCreateType } = useBusinessOS();

  const getStageDeals = (stage: DealStage) => deals.filter(d => d.stage === stage);
  const getStageTotal = (stage: DealStage) =>
    getStageDeals(stage).reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="bg-white dark:bg-[#121214] border border-black/[0.06] dark:border-white/[0.08] rounded-2xl p-4 sm:p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 flex items-center justify-center">
            <Briefcase className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white tracking-tight">
              Enterprise Sales Deals & Pipeline Kanban
            </h2>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">
              Track deal stages from Discovery to Closed Won, calculate weighted probability & forecast revenue
            </p>
          </div>
        </div>

        <button
          onClick={() => setQuickCreateType('deal')}
          className="px-4 py-2 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95 self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Deal</span>
        </button>
      </div>

      {/* Kanban Board Columns Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5 overflow-x-auto pb-4">
        {STAGES.map((stage) => {
          const stageDeals = getStageDeals(stage.id);
          const totalVal = getStageTotal(stage.id);

          return (
            <div
              key={stage.id}
              className="bg-white dark:bg-[#121214] border border-black/[0.06] dark:border-white/[0.08] rounded-2xl p-3 flex flex-col justify-between min-w-[250px] xl:min-w-0 shadow-[0_1px_3px_rgba(0,0,0,0.03)]"
            >
              {/* Column Header */}
              <div className="border-b border-black/[0.06] dark:border-white/[0.08] pb-2.5 mb-2.5">
                <div className="flex items-center justify-between">
                  <h3 className={`text-xs font-bold uppercase tracking-wider ${stage.color}`}>
                    {stage.label}
                  </h3>
                  <span className="text-[10px] font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 px-2 py-0.5 rounded-full">
                    {stageDeals.length}
                  </span>
                </div>
                <div className="text-sm font-bold text-zinc-900 dark:text-white mt-1">
                  ₹{(totalVal / 100000).toFixed(2)}L
                </div>
              </div>

              {/* Cards List */}
              <div className="space-y-2.5 flex-1">
                {stageDeals.map((deal) => (
                  <div
                    key={deal.id}
                    className="bg-zinc-50/80 dark:bg-zinc-900/80 border border-black/[0.06] dark:border-white/[0.08] hover:border-violet-400 dark:hover:border-violet-600 rounded-xl p-3 space-y-2 shadow-xs transition-all"
                  >
                    <div className="space-y-1">
                      <span className="text-[9px] font-bold uppercase text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 px-1.5 py-0.5 rounded border border-indigo-200 dark:border-indigo-800/40">
                        {deal.productLine}
                      </span>
                      <h4 className="text-xs font-bold text-zinc-900 dark:text-white leading-snug">{deal.title}</h4>
                      <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium truncate">{deal.customerName}</p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-black/[0.04] dark:border-white/[0.06] text-xs">
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">
                        ₹{(deal.value / 100000).toFixed(1)}L
                      </span>
                      <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400">
                        {deal.probability}% Win
                      </span>
                    </div>

                    {/* Move Stage Selector */}
                    <div className="pt-2 border-t border-black/[0.04] dark:border-white/[0.06] flex items-center justify-between gap-1 text-[10px]">
                      <span className="text-zinc-400 font-semibold">Stage:</span>
                      <select
                        value={deal.stage}
                        onChange={(e) => updateDealStage(deal.id, e.target.value as DealStage)}
                        className="bg-white dark:bg-zinc-800 border border-black/[0.08] dark:border-white/[0.1] rounded px-2 py-0.5 text-zinc-800 dark:text-zinc-200 font-semibold focus:outline-none cursor-pointer"
                      >
                        {STAGES.map(s => (
                          <option key={s.id} value={s.id}>{s.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))}

                {stageDeals.length === 0 && (
                  <div className="p-5 text-center text-zinc-400 dark:text-zinc-600 text-xs font-medium border border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl">
                    No deals in this stage
                  </div>
                )}
              </div>

              {/* Column Footer Quick Add */}
              <button
                onClick={() => setQuickCreateType('deal')}
                className="mt-2.5 w-full py-1.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white text-[11px] font-semibold transition-all flex items-center justify-center gap-1 cursor-pointer border border-black/[0.04] dark:border-white/[0.06]"
              >
                <Plus className="w-3 h-3" />
                <span>Add Deal</span>
              </button>
            </div>
          );
        })}
      </div>

    </div>
  );
}
