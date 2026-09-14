import React, { useState } from 'react';
import { 
  ExternalLink, ShieldCheck, Check, Copy, Sparkles, 
  MapPin, ShoppingBag, Plane, Utensils, Train, ArrowUpRight
} from 'lucide-react';
import { CommerceDispatchItem } from '../../types/connectors';

interface CommerceActionCardProps {
  item: CommerceDispatchItem;
  isDarkMode?: boolean;
}

export default function CommerceActionCard({
  item,
  isDarkMode = true
}: CommerceActionCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(item.targetUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getCategoryIcon = () => {
    switch (item.category) {
      case 'shopping':
        return <ShoppingBag className="w-4 h-4 text-amber-400" />;
      case 'ride':
        return <MapPin className="w-4 h-4 text-emerald-400" />;
      case 'flight':
        return <Plane className="w-4 h-4 text-sky-400" />;
      case 'food':
        return <Utensils className="w-4 h-4 text-rose-400" />;
      case 'train':
        return <Train className="w-4 h-4 text-orange-400" />;
      default:
        return <Sparkles className="w-4 h-4 text-indigo-400" />;
    }
  };

  return (
    <div 
      className={`my-3 w-full max-w-md rounded-2xl border transition-all ${
        isDarkMode 
          ? 'bg-[#0a0f20]/95 border-slate-800 text-slate-100 shadow-xl' 
          : 'bg-white border-slate-200 text-slate-800 shadow-md'
      } overflow-hidden`}
    >
      {/* Header */}
      <div className={`px-4 py-3 flex items-center justify-between border-b ${
        isDarkMode ? 'border-slate-800/80 bg-[#080c1b]' : 'border-slate-100 bg-slate-50'
      }`}>
        <div className="flex items-center gap-2.5">
          <span className="text-xl p-1.5 rounded-xl bg-slate-800/50 border border-slate-700/50">
            {item.providerLogoText}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white tracking-tight">{item.providerName}</span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Live Handoff
              </span>
            </div>
            <p className="text-[11px] text-slate-400 capitalize">{item.category} Action</p>
          </div>
        </div>

        <div className="p-1.5 rounded-lg bg-slate-800/40 border border-slate-700/40">
          {getCategoryIcon()}
        </div>
      </div>

      {/* Body */}
      <div className="p-4 space-y-3">
        <div>
          <h4 className="text-sm font-semibold text-white leading-snug">
            {item.title}
          </h4>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Parameters Badge Box */}
        <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs space-y-1.5">
          {item.parameters.destination && (
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-400">Destination:</span>
              <span className="font-semibold text-emerald-400">{item.parameters.destination}</span>
            </div>
          )}
          {item.parameters.origin && item.parameters.destination && (
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-400">Route:</span>
              <span className="font-semibold text-sky-400">{item.parameters.origin} ➔ {item.parameters.destination}</span>
            </div>
          )}
          {item.parameters.query && (
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-400">Search Parameter:</span>
              <span className="font-medium text-slate-200 font-mono">"{item.parameters.query}"</span>
            </div>
          )}
          {item.parameters.date && (
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-400">Date:</span>
              <span className="font-medium text-amber-300">{item.parameters.date}</span>
            </div>
          )}
        </div>

        {/* Security & Authenticity Guarantee Notice */}
        <p className="text-[10px] text-slate-400 flex items-center gap-1.5 px-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>Opens official merchant directly. Complete checkout & 2FA payment securely on their verified app.</span>
        </p>
      </div>

      {/* Footer / CTA Actions */}
      <div className={`px-4 py-3 border-t ${
        isDarkMode ? 'border-slate-800/80 bg-[#080c1b]' : 'border-slate-100 bg-slate-50'
      } flex items-center justify-between gap-2`}>
        <button
          type="button"
          onClick={handleCopy}
          className="px-2.5 py-1.5 rounded-xl text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer"
          title="Copy Direct Link"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>

        <a
          href={item.targetUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-1.5 shadow-md shadow-indigo-900/30 transition-all cursor-pointer"
        >
          <span>Open on {item.providerName}</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}
