import React, { useState } from 'react';
import { Check, Zap, Calculator, ShieldCheck } from 'lucide-react';

interface SovereignVoicePricingProps {
  isDarkMode?: boolean;
}

export const SovereignVoicePricing: React.FC<SovereignVoicePricingProps> = ({ isDarkMode = false }) => {
  const [characterCount, setCharacterCount] = useState<number>(50000);

  // Rate: ₹30 per 10,000 characters
  const calculatedCost = Math.max(30, Math.round((characterCount / 10000) * 30));

  const PRICING_FEATURES = [
    'Volume discounts available for high-throughput telephony',
    'Enterprise SLA and dedicated SIP trunk bridges',
    'Flexible prepaid and post-paid billing in Indian Rupees (INR)',
    'Real-time token & character usage analytics',
    'Seamless REST & WebSocket streaming APIs',
    'Engineered for Indian startups, MSMEs, and public services'
  ];

  return (
    <section className="space-y-6">
      
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
          TRANSPARENT &amp; SOVEREIGN PRICING
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          India-First Voice Economics
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Fraction of global provider costs. No credit card required to start building.
        </p>
      </div>

      <div className="max-w-xl mx-auto">
        
        {/* Pricing Card */}
        <div className={`rounded-3xl border p-8 shadow-xl space-y-6 text-left transition-all ${
          isDarkMode 
            ? 'bg-[#0f1523] border-slate-800 text-white' 
            : 'bg-white border-slate-200 text-slate-900'
        }`}>
          
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase">
              BASE PLAN
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-black text-slate-900 dark:text-white tracking-tight">
                ₹30
              </span>
              <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                for 10K characters
              </span>
            </div>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold pt-1">
              Free trial included · Instant API keys · Zero subscription lock-in
            </p>
          </div>

          {/* Interactive Character Cost Calculator */}
          <div className={`p-4 rounded-2xl border space-y-3 ${
            isDarkMode ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="flex items-center justify-between text-xs font-bold text-slate-500">
              <div className="flex items-center gap-1.5">
                <Calculator className="w-3.5 h-3.5" />
                <span>Estimate Your Monthly Usage:</span>
              </div>
              <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                {characterCount.toLocaleString('en-IN')} Chars (~{Math.round(characterCount / 750)} mins)
              </span>
            </div>

            <input
              type="range"
              min="10000"
              max="1000000"
              step="10000"
              value={characterCount}
              onChange={(e) => setCharacterCount(parseInt(e.target.value, 10))}
              className="w-full accent-emerald-500 cursor-pointer"
            />

            <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-200 dark:border-slate-800">
              <span className="text-slate-500">Estimated Cost:</span>
              <span className="text-base font-black text-slate-900 dark:text-white font-mono">
                ₹{calculatedCost.toLocaleString('en-IN')}
                <span className="text-[11px] font-normal text-slate-400 ml-1">/ month</span>
              </span>
            </div>
          </div>

          {/* Feature Checklist */}
          <ul className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            {PRICING_FEATURES.map((feat, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <div className="w-4 h-4 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <span>{feat}</span>
              </li>
            ))}
          </ul>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => alert("Welcome to Arohi Voice Labs! Your free 10,000 characters sandbox is active in this browser.")}
              className="w-full py-3.5 px-6 rounded-2xl bg-black dark:bg-white text-white dark:text-black hover:opacity-90 font-black text-xs uppercase tracking-wider transition-all shadow-xl cursor-pointer"
            >
              Start for Free
            </button>
          </div>

        </div>

      </div>

    </section>
  );
};
