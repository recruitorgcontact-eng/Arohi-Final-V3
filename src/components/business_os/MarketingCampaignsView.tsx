import React, { useState } from 'react';
import {
  Send,
  Plus,
  TrendingUp,
  MessageSquare,
  Mail,
  Smartphone,
  Sparkles,
  CheckCircle2,
  Users,
  Target
} from 'lucide-react';
import { useBusinessOS } from './BusinessOSContext';
import { MarketingCampaign } from './types';

export default function MarketingCampaignsView() {
  const { campaigns, addCampaign, showToast } = useBusinessOS();

  const handleLaunchCampaign = () => {
    const name = prompt('Campaign Name:');
    if (!name) return;

    addCampaign({
      name,
      channel: 'whatsapp',
      status: 'active',
      audienceCount: 1500,
      sentCount: 1500,
      deliveredCount: 1482,
      conversionsCount: 48,
      spend: 4500,
      revenueGenerated: 240000,
      startDate: new Date().toISOString().split('T')[0]
    });
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="bg-white dark:bg-[#121214] border border-black/[0.06] dark:border-white/[0.08] rounded-2xl p-4 sm:p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center justify-center">
            <Send className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white tracking-tight">
              Omnichannel Marketing & WhatsApp Broadcaster
            </h2>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">
              Drive enterprise leads via official WhatsApp Cloud API, Email newsletters, and track ROI
            </p>
          </div>
        </div>

        <button
          onClick={handleLaunchCampaign}
          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95 self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Launch Campaign</span>
        </button>
      </div>

      {/* Campaigns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {campaigns.map((camp) => {
          const roi = camp.spend > 0 ? ((camp.revenueGenerated / camp.spend) * 100).toFixed(0) : '0';

          return (
            <div
              key={camp.id}
              className="bg-white dark:bg-[#121214] border border-black/[0.06] dark:border-white/[0.08] hover:border-emerald-400 dark:hover:border-emerald-600 rounded-2xl p-4 space-y-3 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col justify-between transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[9px] font-bold uppercase text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-1.5 py-0.5 rounded border border-emerald-200 dark:border-emerald-800/40">
                      {camp.channel}
                    </span>
                    <h3 className="font-bold text-zinc-900 dark:text-white text-sm mt-1">{camp.name}</h3>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40">
                    {camp.status}
                  </span>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-2 bg-zinc-50/80 dark:bg-zinc-900/80 p-2.5 rounded-xl border border-black/[0.04] dark:border-white/[0.06] text-xs">
                  <div>
                    <span className="text-[10px] text-zinc-400 font-bold uppercase">Audience Sent</span>
                    <p className="font-bold text-zinc-900 dark:text-white text-xs">{camp.sentCount.toLocaleString()} Contacts</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-400 font-bold uppercase">Conversions</span>
                    <p className="font-bold text-emerald-600 dark:text-emerald-400 text-xs">{camp.conversionsCount} Leads</p>
                  </div>
                </div>

                <div className="space-y-1 text-xs text-zinc-600 dark:text-zinc-400">
                  <div className="flex justify-between">
                    <span className="text-zinc-500 dark:text-zinc-400">Total Ad Spend:</span>
                    <span className="font-bold text-rose-600 dark:text-rose-400">₹{camp.spend.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500 dark:text-zinc-400">Revenue Generated:</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">₹{(camp.revenueGenerated / 100000).toFixed(1)}L</span>
                  </div>
                </div>
              </div>

              <div className="pt-2.5 border-t border-black/[0.04] dark:border-white/[0.06] flex justify-between items-center text-xs">
                <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">ROI: <strong className="text-violet-600 dark:text-violet-400 font-bold">{roi}%</strong></span>
                <button
                  onClick={() => showToast(`Campaign analytics report generated for ${camp.name}`)}
                  className="text-emerald-600 dark:text-emerald-400 hover:underline font-semibold text-[11px] cursor-pointer"
                >
                  View Funnel &rarr;
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
