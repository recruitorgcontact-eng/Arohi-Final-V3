import React from 'react';
import {
  Zap,
  Plus,
  Play,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';
import { useBusinessOS } from './BusinessOSContext';
import { AutomationRule } from './types';

export default function WorkflowAutomationView() {
  const { automations, toggleAutomation, showToast } = useBusinessOS();

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="bg-white dark:bg-[#121214] border border-black/[0.06] dark:border-white/[0.08] rounded-2xl p-4 sm:p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 flex items-center justify-center">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white tracking-tight">
              Workflow Automations & Event Triggers
            </h2>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">
              Connect triggers across CRM, Invoices, HR, and WhatsApp with zero-code rules
            </p>
          </div>
        </div>

        <button
          onClick={() => showToast('Opening Custom Workflow Rule Builder...')}
          className="px-4 py-2 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95 self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Create Automation</span>
        </button>
      </div>

      {/* Rules List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {automations.map((rule) => (
          <div
            key={rule.id}
            className={`bg-white dark:bg-[#121214] border rounded-2xl p-4 space-y-3.5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] transition-all flex flex-col justify-between ${
              rule.isActive ? 'border-black/[0.06] dark:border-white/[0.08] hover:border-amber-400 dark:hover:border-amber-600' : 'border-black/[0.04] dark:border-white/[0.04] opacity-60'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-zinc-900 dark:text-white text-sm">{rule.name}</h3>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">Trigger: {rule.triggerEvent}</p>
                </div>
                <button
                  onClick={() => toggleAutomation(rule.id)}
                  className="cursor-pointer text-zinc-400 hover:text-zinc-700 dark:hover:text-white transition-colors"
                >
                  {rule.isActive ? (
                    <ToggleRight className="w-7 h-7 text-amber-500" />
                  ) : (
                    <ToggleLeft className="w-7 h-7 text-zinc-300 dark:text-zinc-700" />
                  )}
                </button>
              </div>

              {/* Action Pipeline visual */}
              <div className="bg-zinc-50/80 dark:bg-zinc-900/80 p-3 rounded-xl border border-black/[0.04] dark:border-white/[0.06] text-xs space-y-1.5">
                <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
                  <span className="text-[9px] font-bold uppercase text-amber-600 dark:text-amber-400">When:</span>
                  <span className="text-zinc-900 dark:text-white font-medium text-xs">{rule.triggerEvent}</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
                  <span className="text-[9px] font-bold uppercase text-emerald-600 dark:text-emerald-400">Then:</span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-medium text-xs">{rule.action}</span>
                </div>
              </div>
            </div>

            <div className="pt-2.5 border-t border-black/[0.04] dark:border-white/[0.06] flex items-center justify-between text-xs">
              <span className="text-[11px] text-zinc-400">
                Triggered <strong className="text-zinc-700 dark:text-zinc-300 font-semibold">{rule.executionCount} times</strong>
              </span>
              <span className="text-[11px] text-zinc-400">Last: {rule.lastTriggered}</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
