import { useState } from 'react';
import { 
  Sparkles, Check, CheckCircle2, ShieldCheck, Phone, Cpu, Crown, 
  ArrowRight, Lock, Zap, HelpCircle, Star, Award, Building, BookOpen, UserCheck,
  Tag, AlertCircle, RefreshCw
} from 'lucide-react';
import { PRICING_TIERS, PricingTier } from '../data/pricingData';

interface PricingPageProps {
  embedMode?: boolean;
  subscriptions?: Record<string, boolean>;
  subscriptionDetails?: Record<string, { tierName: string; price: number; margin: number }>;
  onSubscribe?: (pathId: string, tierName?: string, priceOrPaymentMethod?: any) => void;
  onNavigateTab?: (tab: string) => void;
  onOpenCheckout?: (path: { id: string; title: string; price: string }, detail: { tierName: string; price: number; margin: number }) => void;
  onOpenAuth?: () => void;
}

export default function PricingPage({
  embedMode = false,
  subscriptions = {},
  subscriptionDetails = {},
  onSubscribe,
  onNavigateTab,
  onOpenCheckout,
  onOpenAuth
}: PricingPageProps) {
  const [selectedTierIndex, setSelectedTierIndex] = useState<number>(1); // Professional Plan default (index 1, ₹699)
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  // Coupon / Promo Code State
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

  const handleApplyPageCoupon = () => {
    const cleanCode = couponInput.trim().toUpperCase();
    if (!cleanCode) {
      setCouponError('Please enter a valid coupon code.');
      return;
    }

    setIsApplyingCoupon(true);
    setCouponError('');
    setCouponSuccess('');

    setTimeout(() => {
      setIsApplyingCoupon(false);
      if (cleanCode === 'JUNOON' || cleanCode === 'JUNOON399' || cleanCode === 'AROHI399' || cleanCode === 'PRO399') {
        const starterTier = PRICING_TIERS[0]; // Starter Plan ₹399
        if (onSubscribe) {
          onSubscribe('path1', starterTier.name, `Coupon Code ${cleanCode}`);
        }
        try {
          localStorage.setItem('arohi_applied_coupon', cleanCode);
        } catch (e) {}

        setCouponSuccess(`🎉 Coupon "${cleanCode}" applied! Starter Plan (₹399/mo) activated for free!`);
        setCouponInput('');
      } else {
        setCouponError('Invalid coupon code. Please check and try again.');
      }
    }, 400);
  };

  const selectedTier = PRICING_TIERS[selectedTierIndex];

  const handlePlanSelect = (tier: PricingTier) => {
    if (onOpenCheckout) {
      onOpenCheckout(
        {
          id: 'path1',
          title: `Arohi AI ${tier.name}`,
          price: `₹${tier.price}/Month`
        },
        {
          tierName: tier.name,
          price: tier.price,
          margin: tier.margin
        }
      );
    } else if (onSubscribe) {
      onSubscribe('path1', tier.name, tier.price);
    }
  };

  return (
    <div className={`w-full max-w-7xl mx-auto ${embedMode ? 'p-2 sm:p-4' : 'px-4 py-8 md:py-12'} space-y-10 font-sans`}>
      
      {/* PAGE HEADER */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-900 via-fuchsia-900 to-indigo-900 border border-purple-500/50 shadow-lg text-xs font-black uppercase tracking-widest text-amber-300">
          <Crown className="w-4 h-4 text-amber-400 animate-bounce" />
          Arohi AI Official Subscription Plans
        </div>

        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
          Flexible Pricing from <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 dark:from-amber-300 dark:via-yellow-200 dark:to-amber-400 font-black">₹399 to ₹4,999</span> <span className="text-slate-800 dark:text-white">/ Month</span>
        </h1>

        <p className="text-sm md:text-base text-slate-700 dark:text-slate-300 font-bold leading-relaxed">
          Unlock Unlimited AI Chat, High-Speed AI Token Credits, Live Voice Calls, ATS Resume Scoring, and Career Intelligence across India.
        </p>

        {/* Highlighted Banner */}
        <div className="dark-card inline-flex flex-wrap items-center justify-center gap-3 bg-emerald-950 border border-emerald-500/60 px-5 py-2.5 rounded-2xl shadow-xl text-xs font-extrabold text-emerald-300">
          <span className="flex items-center gap-1.5 text-emerald-300">
            <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
            <strong className="text-white uppercase tracking-wider">✨ UNLIMITED AI CHAT</strong> Included On Every Plan
          </span>
          <span className="hidden sm:inline text-emerald-600">|</span>
          <span className="text-emerald-100 font-bold">No Hidden Charges • Instant UPI Activation</span>
        </div>

        {/* 🎁 100% CASHBACK & REFERRAL SYSTEM BANNER */}
        <div className="bg-gradient-to-r from-[#1b0e3e] via-[#281352] to-[#1b0e3e] border-2 border-amber-400/80 p-5 rounded-2xl shadow-2xl text-left space-y-3 max-w-2xl mx-auto relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-6 -mr-6 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>

          <div className="flex items-center justify-between flex-wrap gap-2 border-b border-amber-500/30 pb-2.5">
            <div className="flex items-center gap-2">
              <span className="text-xl">🪙</span>
              <h3 className="text-sm sm:text-base font-black text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                <span>100% Cashback & Referral System</span>
              </h3>
            </div>
            <span className="bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-black text-[9px] uppercase px-3 py-1 rounded-full tracking-wider shadow-md">
              OFFICIAL OFFER ACTIVE
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="bg-[#11092e] border border-[#37237a] p-3 rounded-xl space-y-1">
              <p className="font-extrabold text-amber-300 flex items-center gap-1 text-[11px]">
                <span>🎁 100% Cashback</span>
              </p>
              <p className="text-[10.5px] text-slate-300 font-medium leading-snug">
                Get 100% cashback in <strong>Arohi Coins</strong> on 1st month plan purchase! (e.g. ₹399 = 🪙 399 Coins).
              </p>
            </div>

            <div className="bg-[#11092e] border border-[#37237a] p-3 rounded-xl space-y-1">
              <p className="font-extrabold text-purple-300 flex items-center gap-1 text-[11px]">
                <span>🏷️ Referral Rewards</span>
              </p>
              <p className="text-[10.5px] text-slate-300 font-medium leading-snug">
                Share your coupon code! New users get 100% cashback &amp; you get <strong>5% cashback</strong> as Arohi Coins.
              </p>
            </div>

            <div className="bg-[#11092e] border border-[#37237a] p-3 rounded-xl space-y-1">
              <p className="font-extrabold text-emerald-300 flex items-center gap-1 text-[11px]">
                <span>🪙 Deduct Up To ₹100</span>
              </p>
              <p className="text-[10.5px] text-slate-300 font-medium leading-snug">
                Deduct up to <strong>100 Arohi Coins (₹100 discount)</strong> directly on next month's payment!
              </p>
            </div>
          </div>
        </div>

        {/* Coupon Code Entry Space */}
        <div className="max-w-md mx-auto w-full bg-gradient-to-r from-[#170e36] to-[#1e1346] border border-amber-500/40 rounded-2xl p-4 shadow-xl text-left space-y-2 mt-4">
          <div className="flex items-center justify-between">
            <label className="text-xs font-black text-amber-300 uppercase tracking-wider flex items-center gap-2">
              <Tag className="w-4 h-4 text-amber-400" />
              <span>Have a Coupon Code?</span>
            </label>
            <span className="text-[10px] font-bold text-purple-300 bg-purple-900/50 border border-purple-500/30 px-2 py-0.5 rounded-full">
              PROMO ACTIVATION
            </span>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={couponInput}
              onChange={(e) => {
                setCouponInput(e.target.value);
                setCouponError('');
                setCouponSuccess('');
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleApplyPageCoupon();
                }
              }}
              placeholder="Enter Coupon Code"
              className="w-full bg-[#0d0722] border border-[#3c2a85] rounded-xl px-3.5 py-2.5 text-xs font-mono font-bold text-white uppercase placeholder:text-slate-500 placeholder:font-sans focus:outline-none focus:border-amber-400 tracking-wider"
            />
            <button
              type="button"
              disabled={!couponInput.trim() || isApplyingCoupon}
              onClick={handleApplyPageCoupon}
              className="bg-gradient-to-r from-amber-500 via-purple-600 to-indigo-600 hover:from-amber-400 hover:to-indigo-500 disabled:opacity-50 text-white font-black text-xs px-4 py-2.5 rounded-xl cursor-pointer transition-all shrink-0 border border-amber-400/40 shadow-md flex items-center gap-1.5"
            >
              {isApplyingCoupon ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <CheckCircle2 className="w-4 h-4 text-amber-200" />
              )}
              <span>{isApplyingCoupon ? 'Verifying...' : 'Apply Code'}</span>
            </button>
          </div>

          {couponError && (
            <p className="text-xs font-bold text-rose-400 flex items-center gap-1.5 pt-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {couponError}
            </p>
          )}
          {couponSuccess && (
            <p className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 pt-1">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" /> {couponSuccess}
            </p>
          )}
        </div>
      </div>

      {/* 5 TIERS CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 items-stretch">
        {PRICING_TIERS.map((tier, idx) => {
          const isSelected = selectedTierIndex === idx;
          const isPopular = idx === 1; // Professional Plan
          const isUltimate = idx === 4; // Ultimate Plan

          return (
            <div
              key={idx}
              onClick={() => setSelectedTierIndex(idx)}
              className={`dark-card rounded-[2rem] p-5 text-left transition-all duration-300 relative flex flex-col justify-between border-2 cursor-pointer ${
                isSelected || isPopular
                  ? 'bg-gradient-to-b from-[#1c123d] via-[#140b2e] to-[#0d0722] border-purple-400/90 shadow-[0_0_30px_rgba(168,85,247,0.35)] scale-[1.02]'
                  : 'bg-[#120b29] border-[#2b1f59] hover:border-purple-500/60 hover:bg-[#180f36]'
              }`}
            >
              {/* Top Badges */}
              {isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg border border-amber-300">
                  🔥 Most Popular
                </div>
              )}
              {isUltimate && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg border border-emerald-300">
                  👑 Unlimited Power
                </div>
              )}

              <div className="space-y-4">
                {/* Header info */}
                <div className="space-y-1.5 border-b border-purple-800/60 pb-3">
                  <span className="text-[10px] font-black uppercase tracking-widest text-purple-300 block">
                    {tier.name}
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-white">₹{tier.price}</span>
                    <span className="text-xs text-slate-300 font-bold">/month</span>
                  </div>
                  <div className="inline-flex items-center gap-1 bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded-md text-[8.5px] font-black uppercase tracking-wide">
                    <span>🪙 100% Cashback: Get {tier.price} Coins</span>
                  </div>
                  <span className="text-[9px] text-emerald-300 font-extrabold block">
                    GST Included • Instant Activation
                  </span>
                </div>

                {/* Core AI Offerings Box */}
                <div className="space-y-2 bg-gradient-to-br from-violet-950/90 to-purple-950/80 p-3 rounded-2xl border border-violet-500/40">
                  <div className="text-[9px] font-black uppercase tracking-wider text-amber-300 flex items-center justify-between">
                    <span>⚡ AI Allocations</span>
                    <span className="text-emerald-300 font-extrabold">Full Access</span>
                  </div>

                  {/* UNLIMITED CHAT */}
                  <div className="bg-emerald-950 border border-emerald-500/60 p-1.5 rounded-xl flex items-center gap-1.5 text-[9.5px] font-black text-emerald-200">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0 animate-pulse" />
                    <span className="text-emerald-100">✨ Unlimited AI Chat</span>
                  </div>

                  {/* AI Tokens */}
                  <div className="bg-purple-900/60 border border-purple-500/40 p-1.5 rounded-xl flex items-center gap-1.5 text-[10px] font-extrabold text-cyan-200">
                    <Cpu className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span className="text-cyan-200">{tier.aiCreditsText}</span>
                  </div>

                  {/* AI Voice Calls */}
                  <div className="bg-purple-900/60 border border-purple-500/40 p-1.5 rounded-xl flex items-center gap-1.5 text-[10px] font-extrabold text-amber-200">
                    <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="text-amber-200">{tier.aiCallsText}</span>
                  </div>
                </div>

                {/* Specific Tier Limits Highlights */}
                <div className="space-y-2 pt-1">
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-300 block">
                    Included Tier Perks:
                  </span>
                  <div className="space-y-2 text-[11px] font-bold text-slate-100">
                    <div className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                      <span className="text-slate-100"><strong className="text-white">ATS Scans:</strong> {tier.limits.path1.atsScans}</span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                      <span className="text-slate-100"><strong className="text-white">Mock Interviews:</strong> {tier.limits.path1.mockInterviews}</span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                      <span className="text-slate-100"><strong className="text-white">Skill Courses:</strong> {tier.limits.path2.activeCourses}</span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                      <span className="text-slate-100"><strong className="text-white">MSME Filings:</strong> {tier.limits.path3.msmeFilings}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Subscribe Button */}
              <div className="pt-4 border-t border-purple-900/40 mt-4 space-y-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlanSelect(tier);
                  }}
                  className={`w-full py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-lg flex items-center justify-center gap-1.5 active:scale-95 ${
                    isPopular || isUltimate
                      ? 'bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500 text-slate-950 hover:brightness-110 shadow-amber-500/20'
                      : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-purple-600/20'
                  }`}
                >
                  <Zap className="w-3.5 h-3.5 fill-current" />
                  <span>Subscribe ₹{tier.price}</span>
                </button>
                <span className="text-[8px] text-slate-300 font-bold block text-center uppercase tracking-wider">
                  Instant UPI / QR Code Payment
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* FEATURE COMPARISON MATRIX TABLE */}
      <div className="dark-card bg-[#120a28] border border-purple-800/80 p-6 md:p-8 rounded-[2.5rem] shadow-2xl space-y-6 text-left">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-purple-900/40 pb-5">
          <div>
            <h3 className="text-xl font-black text-white flex items-center gap-2">
              <Award className="w-6 h-6 text-amber-400" />
              Full Tier Feature Comparison
            </h3>
            <p className="text-xs text-slate-200 font-medium mt-1">
              Compare exact AI Tokens, Calls, ATS Scans, and Course limits across all 5 pricing tiers.
            </p>
          </div>
          <div className="bg-emerald-950 border border-emerald-500/50 px-3.5 py-2 rounded-xl text-xs font-bold text-emerald-300 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            100% Transparent • No Hidden Fees
          </div>
        </div>

        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-purple-900/60 text-purple-300 font-black uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4 min-w-[180px]">Feature / Perk</th>
                <th className="py-3 px-3 text-center">Starter (₹399)</th>
                <th className="py-3 px-3 text-center text-amber-300">Professional (₹699)</th>
                <th className="py-3 px-3 text-center">Growth (₹1,699)</th>
                <th className="py-3 px-3 text-center">Executive (₹3,999)</th>
                <th className="py-3 px-3 text-center text-emerald-300">Ultimate (₹4,999)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-900/30 font-medium text-slate-200">
              {/* Unlimited AI Chat */}
              <tr className="bg-emerald-950/30">
                <td className="py-3 px-4 font-black text-emerald-300 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
                  <span>Unlimited AI Chat</span>
                </td>
                <td className="py-3 px-3 text-center text-emerald-400 font-bold">✨ Unlimited</td>
                <td className="py-3 px-3 text-center text-emerald-400 font-bold">✨ Unlimited</td>
                <td className="py-3 px-3 text-center text-emerald-400 font-bold">✨ Unlimited</td>
                <td className="py-3 px-3 text-center text-emerald-400 font-bold">✨ Unlimited</td>
                <td className="py-3 px-3 text-center text-emerald-400 font-bold">✨ Unlimited</td>
              </tr>

              {/* AI Token Quota */}
              <tr>
                <td className="py-3 px-4 font-bold text-cyan-200 flex items-center gap-1.5">
                  <Cpu className="w-4 h-4 text-cyan-400" />
                  <span>AI Credits / Tokens</span>
                </td>
                <td className="py-3 px-3 text-center font-extrabold text-white">10,000</td>
                <td className="py-3 px-3 text-center font-extrabold text-amber-300">15,000</td>
                <td className="py-3 px-3 text-center font-extrabold text-white">35,000</td>
                <td className="py-3 px-3 text-center font-extrabold text-white">80,000</td>
                <td className="py-3 px-3 text-center font-extrabold text-emerald-300">100,000+</td>
              </tr>

              {/* AI Voice Calls */}
              <tr>
                <td className="py-3 px-4 font-bold text-amber-200 flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span>AI Voice Call Duration</span>
                </td>
                <td className="py-3 px-3 text-center font-bold">5 Hours/mo</td>
                <td className="py-3 px-3 text-center font-bold text-amber-300">10 Hours/mo</td>
                <td className="py-3 px-3 text-center font-bold">25 Hours/mo</td>
                <td className="py-3 px-3 text-center font-bold">60 Hours/mo</td>
                <td className="py-3 px-3 text-center font-bold text-emerald-300">80 Hours/mo</td>
              </tr>

              {/* ATS Resume Scans */}
              <tr>
                <td className="py-3 px-4 font-bold text-slate-300">ATS Resume Scans</td>
                <td className="py-3 px-3 text-center">5 / mo</td>
                <td className="py-3 px-3 text-center text-amber-300 font-bold">15 / mo</td>
                <td className="py-3 px-3 text-center">50 / mo</td>
                <td className="py-3 px-3 text-center">150 / mo</td>
                <td className="py-3 px-3 text-center font-black text-emerald-300">Unlimited</td>
              </tr>

              {/* Mock Interviews */}
              <tr>
                <td className="py-3 px-4 font-bold text-slate-300">Live Mock Interviews</td>
                <td className="py-3 px-3 text-center">2 / mo</td>
                <td className="py-3 px-3 text-center text-amber-300 font-bold">8 / mo</td>
                <td className="py-3 px-3 text-center">25 / mo</td>
                <td className="py-3 px-3 text-center">75 / mo</td>
                <td className="py-3 px-3 text-center font-black text-emerald-300">Unlimited</td>
              </tr>

              {/* Skill Courses */}
              <tr>
                <td className="py-3 px-4 font-bold text-slate-300">Skill Course Enrollments</td>
                <td className="py-3 px-3 text-center">1 Active</td>
                <td className="py-3 px-3 text-center text-amber-300 font-bold">3 Active</td>
                <td className="py-3 px-3 text-center">10 Active</td>
                <td className="py-3 px-3 text-center">30 Active</td>
                <td className="py-3 px-3 text-center font-black text-emerald-300">Unlimited</td>
              </tr>

              {/* MSME Business Filings */}
              <tr>
                <td className="py-3 px-4 font-bold text-slate-300">MSME Filings & Mudra</td>
                <td className="py-3 px-3 text-center">2 / mo</td>
                <td className="py-3 px-3 text-center text-amber-300 font-bold">6 / mo</td>
                <td className="py-3 px-3 text-center">20 / mo</td>
                <td className="py-3 px-3 text-center">60 / mo</td>
                <td className="py-3 px-3 text-center font-black text-emerald-300">Unlimited</td>
              </tr>

              {/* NCERT School Support */}
              <tr>
                <td className="py-3 px-4 font-bold text-slate-300">Class 1-10 Downloads</td>
                <td className="py-3 px-3 text-center">10 / mo</td>
                <td className="py-3 px-3 text-center text-amber-300 font-bold">30 / mo</td>
                <td className="py-3 px-3 text-center">100 / mo</td>
                <td className="py-3 px-3 text-center">300 / mo</td>
                <td className="py-3 px-3 text-center font-black text-emerald-300">Unlimited</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* INSTANT PAYMENTS & GUARANTEE INFO */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
        <div className="dark-card bg-[#120b29] border border-purple-800/60 p-5 rounded-2xl space-y-2">
          <div className="flex items-center gap-2 text-amber-300 font-black text-xs uppercase tracking-wider">
            <Zap className="w-4 h-4 text-amber-400" /> Instant UPI Activation
          </div>
          <p className="text-xs text-slate-200 leading-relaxed font-medium">
            Pay instantly with PhonePe, Google Pay, Paytm, BHIM or Cards. Your subscription activates immediately upon payment confirmation.
          </p>
        </div>

        <div className="dark-card bg-[#120b29] border border-purple-800/60 p-5 rounded-2xl space-y-2">
          <div className="flex items-center gap-2 text-emerald-300 font-black text-xs uppercase tracking-wider">
            <Lock className="w-4 h-4 text-emerald-400" /> 100% Secure & Cancel Anytime
          </div>
          <p className="text-xs text-slate-200 leading-relaxed font-medium">
            No lock-in contracts or automatic hidden recurring traps. Control your subscription directly from your User Dashboard anytime.
          </p>
        </div>

        <div className="dark-card bg-[#120b29] border border-purple-800/60 p-5 rounded-2xl space-y-2">
          <div className="flex items-center gap-2 text-purple-300 font-black text-xs uppercase tracking-wider">
            <Crown className="w-4 h-4 text-purple-400" /> Priority Server Processing
          </div>
          <p className="text-xs text-slate-200 leading-relaxed font-medium">
            Premium users enjoy zero-latency AI responses, direct voice connection to AROHI AI, and fast-track resume evaluations.
          </p>
        </div>
      </div>
    </div>
  );
}
