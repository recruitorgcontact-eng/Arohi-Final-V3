import { useState, useEffect } from 'react';
import { 
  Sparkles, Check, CheckCircle2, ShieldCheck, Phone, Cpu, Crown, 
  ArrowRight, Lock, Zap, HelpCircle, Star, Award, Building, BookOpen, UserCheck,
  Tag, AlertCircle, RefreshCw, Globe, Clock, Users, Bot, Layers, Headphones,
  ChevronRight, X, PhoneCall, Mic, Rocket, CheckSquare, PlusCircle
} from 'lucide-react';
import { 
  PRICING_TIERS, INTERNATIONAL_PRICING_TIERS, PricingTier, 
  AROHI_ONE_TIERS, AROHI_CALLING_AGENT_TIERS, AROHI_ADDONS,
  ArohiOneTier, ArohiVoiceAgentTier,
  detectUserCurrency, getPricingTiers 
} from '../data/pricingData';
import { 
  isValidCouponCode, persistSubscriptionActivation, activateProductTrial,
  computeSubscriptionState
} from '../utils/subscriptionEngine';
import { openRazorpayCheckout } from '../lib/razorpay';

interface PricingPageProps {
  embedMode?: boolean;
  currency?: 'INR' | 'USD';
  onCurrencyChange?: (c: 'INR' | 'USD') => void;
  subscriptions?: Record<string, boolean>;
  subscriptionDetails?: Record<string, { tierName: string; price: number; margin: number }>;
  onSubscribe?: (pathId: string, tierName?: string, priceOrPaymentMethod?: any) => void;
  onNavigateTab?: (tab: string) => void;
  onOpenCheckout?: (path: { id: string; title: string; price: string }, detail: { tierName: string; price: number; margin: number; currency?: string }) => void;
  onOpenAuth?: () => void;
  defaultProductCategory?: 'arohi_one' | 'calling_agents' | 'individual';
}

export default function PricingPage({
  embedMode = false,
  currency: externalCurrency,
  onCurrencyChange,
  subscriptions = {},
  subscriptionDetails = {},
  onSubscribe,
  onNavigateTab,
  onOpenCheckout,
  onOpenAuth,
  defaultProductCategory = 'arohi_one'
}: PricingPageProps) {
  const [internalCurrency, setInternalCurrency] = useState<'INR' | 'USD'>(() => externalCurrency || detectUserCurrency());
  const activeCurrency = externalCurrency || internalCurrency;

  const handleCurrencyToggle = (newCurrency: 'INR' | 'USD') => {
    setInternalCurrency(newCurrency);
    try {
      localStorage.setItem('arohi_currency', newCurrency);
    } catch (e) {}
    if (onCurrencyChange) {
      onCurrencyChange(newCurrency);
    }
  };

  // Product Category Switcher Tab: 'arohi_one' | 'calling_agents' | 'individual'
  const [productCategory, setProductCategory] = useState<'arohi_one' | 'calling_agents' | 'individual'>(defaultProductCategory);

  const currentTiers = getPricingTiers(activeCurrency);
  const symbol = activeCurrency === 'USD' ? '$' : '₹';

  const [selectedTierIndex, setSelectedTierIndex] = useState<number>(1); // Default index
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  // Coupon / Promo Code State
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

  // 03-Day Free Trial State & Modal
  const [activeTrialInfo, setActiveTrialInfo] = useState<{
    isActive: boolean;
    productName: string;
    daysRemaining: number;
    hoursRemaining: number;
    minutesRemaining: number;
  }>({
    isActive: false,
    productName: '',
    daysRemaining: 0,
    hoursRemaining: 0,
    minutesRemaining: 0
  });

  const [trialSuccessModal, setTrialSuccessModal] = useState<{
    isOpen: boolean;
    tierName: string;
    trialDays: number;
    trialMinutes: number;
    category: string;
  } | null>(null);

  // Check active trial status
  useEffect(() => {
    try {
      const savedTrialStart = localStorage.getItem('arohi_trial_start');
      const savedTrialEnd = localStorage.getItem('arohi_trial_end');
      const savedProductName = localStorage.getItem('arohi_trial_product_name') || 'Arohi AI';

      if (savedTrialStart && savedTrialEnd) {
        const now = Date.now();
        const endTime = parseInt(savedTrialEnd, 10);
        if (endTime > now) {
          const diffMs = endTime - now;
          const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
          const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const mins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
          setActiveTrialInfo({
            isActive: true,
            productName: savedProductName,
            daysRemaining: days,
            hoursRemaining: hours,
            minutesRemaining: mins
          });
          return;
        }
      }
      setActiveTrialInfo({ isActive: false, productName: '', daysRemaining: 0, hoursRemaining: 0, minutesRemaining: 0 });
    } catch (e) {
      // safe fallback
    }
  }, [trialSuccessModal]);

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
      if (isValidCouponCode(cleanCode)) {
        const starterTier = currentTiers[0];
        
        persistSubscriptionActivation({
          planName: starterTier.name,
          price: starterTier.price,
          couponCode: cleanCode,
          paymentMethod: `Coupon Code ${cleanCode}`
        });

        if (onSubscribe) {
          onSubscribe('path1', starterTier.name, `Coupon Code ${cleanCode}`);
        }
        try {
          localStorage.setItem('arohi_applied_coupon', cleanCode);
        } catch (e) {}

        setCouponSuccess(`🎉 Coupon "${cleanCode}" applied! ${starterTier.name} (${symbol}${starterTier.price}/mo) activated!`);
        setCouponInput('');
      } else {
        setCouponError('Invalid coupon code. Please check and try again.');
      }
    }, 400);
  };

  // Handler: Start 03-Day Free Trial
  const handleStartFreeTrial = (tier: ArohiOneTier | ArohiVoiceAgentTier, categoryType: 'arohi_one' | 'calling_agents') => {
    activateProductTrial({
      productId: tier.id,
      productName: tier.name,
      trialDays: 3,
      trialMinutes: tier.trialMinutes || 100
    });

    setTrialSuccessModal({
      isOpen: true,
      tierName: tier.name,
      trialDays: 3,
      trialMinutes: tier.trialMinutes || 100,
      category: categoryType
    });
  };

  // Handler: Direct Razorpay Checkout for Arohi One, Calling Agents, or Individual plans
  const handlePayViaRazorpay = (params: {
    id: string;
    name: string;
    price: number;
    billingText: string;
    margin?: number;
  }) => {
    const formattedPrice = `${symbol}${params.price.toLocaleString('en-IN')}`;
    const fullPlanTitle = `Arohi AI ${params.name} (${billingCycle === 'annual' ? 'Annual' : 'Monthly'})`;

    if (onOpenCheckout) {
      onOpenCheckout(
        {
          id: params.id,
          title: fullPlanTitle,
          price: `${formattedPrice} ${params.billingText}`
        },
        {
          tierName: params.name,
          price: params.price,
          margin: params.margin ?? Math.round(params.price * 0.4),
          currency: activeCurrency
        }
      );
    } else {
      // Standalone direct Razorpay trigger
      openRazorpayCheckout({
        amountInRupees: params.price,
        currency: activeCurrency,
        planName: fullPlanTitle,
        userEmail: 'customer@arohiai.com',
        userName: 'Arohi AI Subscriber',
        onSuccess: (res) => {
          if (onSubscribe) {
            onSubscribe(params.id, fullPlanTitle, 'Razorpay Standard Checkout');
          }
          alert(`🎉 Payment Confirmed! Your ${fullPlanTitle} subscription is now active.`);
        },
        onError: (err) => {
          alert(`Payment Notice: ${err.message || 'Payment could not be completed.'}`);
        }
      });
    }
  };

  const handlePlanSelect = (tier: PricingTier) => {
    const priceFormatted = `${activeCurrency === 'USD' ? '$' : '₹'}${tier.price}/Month`;
    handlePayViaRazorpay({
      id: 'path1',
      name: tier.name,
      price: tier.price,
      billingText: '/Month',
      margin: tier.margin
    });
  };

  return (
    <div className={`w-full max-w-7xl mx-auto ${embedMode ? 'p-2 sm:p-4' : 'px-4 py-8 md:py-12'} space-y-10 font-sans`}>
      
      {/* 03-DAY FREE TRIAL ACTIVATION MODAL */}
      {trialSuccessModal && trialSuccessModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="bg-gradient-to-b from-[#1c123d] via-[#140b2e] to-[#0d0722] border-2 border-emerald-400/90 p-6 sm:p-8 rounded-[2.5rem] shadow-[0_0_50px_rgba(16,185,129,0.4)] max-w-lg w-full text-left space-y-5 relative">
            <button
              onClick={() => setTrialSuccessModal(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white bg-purple-900/40 hover:bg-purple-800/60 p-2 rounded-full transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950 border border-emerald-400/70 text-[11px] font-black uppercase tracking-wider text-emerald-300">
              <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
              03-Day Free Trial Activated
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                Welcome to {trialSuccessModal.tierName}!
              </h2>
              <p className="text-sm text-slate-300 font-medium leading-relaxed">
                Your <strong className="text-emerald-300">03-Day Free Trial</strong> is now live. Enjoy full enterprise features, live testing, and allocated minutes with <strong>zero upfront payment</strong> required today.
              </p>
            </div>

            {/* Trial Perks Box */}
            <div className="bg-[#12082b] border border-purple-500/40 p-4 rounded-2xl space-y-2.5">
              <div className="flex items-center justify-between text-xs border-b border-purple-800/40 pb-2">
                <span className="text-slate-400 font-bold">Trial Duration:</span>
                <span className="text-emerald-300 font-black flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> 72 Hours (03 Full Days)
                </span>
              </div>
              <div className="flex items-center justify-between text-xs border-b border-purple-800/40 pb-2">
                <span className="text-slate-400 font-bold">Voice Test Minutes:</span>
                <span className="text-amber-300 font-black flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5" /> {trialSuccessModal.trialMinutes} Minutes Included
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-bold">Immediate Charge:</span>
                <span className="text-emerald-400 font-black">₹0.00 / Free</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 leading-snug">
              💡 After 3 days, easily upgrade to a paid recurring plan with Razorpay to keep your numbers, transcripts, and custom personas running smoothly.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => {
                  setTrialSuccessModal(null);
                  if (onNavigateTab) {
                    if (trialSuccessModal.category === 'arohi_one') {
                      onNavigateTab('business-os');
                    } else {
                      onNavigateTab('calling-agents');
                    }
                  }
                }}
                className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs uppercase tracking-wider py-3.5 rounded-xl shadow-lg cursor-pointer transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                <Rocket className="w-4 h-4" />
                <span>Launch {trialSuccessModal.category === 'arohi_one' ? 'Business OS' : 'Calling Agents'}</span>
              </button>

              <button
                onClick={() => {
                  setTrialSuccessModal(null);
                  // Find tier to launch checkout
                  const selected = AROHI_ONE_TIERS.find(t => t.name === trialSuccessModal.tierName) ||
                                  AROHI_CALLING_AGENT_TIERS.find(t => t.name === trialSuccessModal.tierName);
                  if (selected) {
                    const price = activeCurrency === 'USD' ? selected.priceUSD : selected.priceINR;
                    handlePayViaRazorpay({
                      id: selected.id,
                      name: selected.name,
                      price: price,
                      billingText: '/Month'
                    });
                  }
                }}
                className="bg-purple-900/60 hover:bg-purple-800/80 border border-purple-500/50 text-purple-200 font-bold text-xs uppercase tracking-wider px-4 py-3.5 rounded-xl cursor-pointer transition-all flex items-center justify-center gap-1.5"
              >
                <Zap className="w-3.5 h-3.5 text-amber-300" />
                <span>Buy Plan Now</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ACTIVE TRIAL BANNER (If user already has an active trial) */}
      {activeTrialInfo.isActive && (
        <div className="bg-gradient-to-r from-emerald-950 via-[#132822] to-emerald-950 border-2 border-emerald-400/80 p-4 rounded-2xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-emerald-400 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-emerald-300">
                  Active 03-Day Free Trial
                </span>
                <span className="bg-emerald-500 text-slate-950 text-[9px] font-black uppercase px-2 py-0.5 rounded-full">
                  {activeTrialInfo.daysRemaining}d {activeTrialInfo.hoursRemaining}h remaining
                </span>
              </div>
              <p className="text-xs text-slate-200 font-medium">
                You are currently exploring <strong>{activeTrialInfo.productName}</strong>. Upgrade anytime with Razorpay to secure unlimited minutes.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {onNavigateTab && (
              <button
                onClick={() => onNavigateTab('business-os')}
                className="bg-purple-900/60 hover:bg-purple-800/80 border border-purple-500/40 text-purple-200 text-xs font-bold px-3 py-2 rounded-xl cursor-pointer transition-all"
              >
                Open Dashboard
              </button>
            )}
            <button
              onClick={() => {
                const target = AROHI_ONE_TIERS[1]; // Growth OS default
                const price = activeCurrency === 'USD' ? target.priceUSD : target.priceINR;
                handlePayViaRazorpay({
                  id: target.id,
                  name: target.name,
                  price: price,
                  billingText: '/Month'
                });
              }}
              className="bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 text-xs font-black px-4 py-2 rounded-xl shadow-md hover:brightness-110 cursor-pointer transition-all flex items-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>Upgrade via Razorpay</span>
            </button>
          </div>
        </div>
      )}

      {/* PAGE HEADER */}
      <div className="text-center space-y-4 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-900 via-fuchsia-900 to-indigo-900 border border-purple-500/50 shadow-lg text-xs font-black uppercase tracking-widest text-amber-300">
          <Crown className="w-4 h-4 text-amber-400 animate-bounce" />
          Arohi AI Official Subscription &amp; Enterprise Pricing
        </div>

        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
          One AI Ecosystem. <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 dark:from-amber-300 dark:via-yellow-200 dark:to-amber-400 font-black">Infinite Opportunities.</span>
        </h1>

        <p className="text-sm md:text-base text-slate-700 dark:text-slate-300 font-bold leading-relaxed max-w-2xl mx-auto">
          Choose between our complete <strong>AROHI ONE AI Business OS</strong>, standalone <strong>Autonomous Calling Agents</strong>, or personal AI memberships. All enterprise products include a <strong>03-Day Free Trial</strong> with Razorpay instant checkout.
        </p>

        {/* 🌐 CURRENCY & BILLING CONTROLS */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          {/* Currency Toggle */}
          <div className="bg-[#12082b] border-2 border-purple-500/60 p-1 rounded-2xl shadow-2xl inline-flex items-center gap-1.5 backdrop-blur-md">
            <button
              type="button"
              onClick={() => handleCurrencyToggle('INR')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-2 ${
                activeCurrency === 'INR'
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 shadow-lg scale-105'
                  : 'text-slate-300 hover:text-white hover:bg-purple-900/40'
              }`}
            >
              <span className="text-sm">🇮🇳</span>
              <span>₹ INR (India Domestic)</span>
            </button>
            <button
              type="button"
              onClick={() => handleCurrencyToggle('USD')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-2 ${
                activeCurrency === 'USD'
                  ? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-white shadow-lg scale-105'
                  : 'text-slate-300 hover:text-white hover:bg-purple-900/40'
              }`}
            >
              <Globe className="w-4 h-4 text-cyan-300 animate-pulse" />
              <span>🌐 $ USD (International Global)</span>
            </button>
          </div>

          {/* Monthly vs Annual Toggle */}
          <div className="bg-[#12082b] border-2 border-purple-500/60 p-1 rounded-2xl shadow-2xl inline-flex items-center gap-1.5 backdrop-blur-md">
            <button
              type="button"
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                billingCycle === 'monthly'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Monthly Billing
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                billingCycle === 'annual'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-md font-black'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <span>Annual Billing</span>
              <span className="bg-amber-400 text-slate-950 text-[9px] px-2 py-0.5 rounded-full font-black">
                2 MONTHS FREE (SAVE 20%)
              </span>
            </button>
          </div>
        </div>

        {/* 🏢 MAIN PRODUCT SEGMENT SWITCHER TABS */}
        <div className="pt-4 flex justify-center">
          <div className="bg-[#0f0724] border-2 border-purple-500/70 p-1.5 rounded-[1.8rem] shadow-2xl inline-flex flex-wrap items-center gap-2 max-w-full">
            <button
              type="button"
              onClick={() => setProductCategory('arohi_one')}
              className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center gap-2.5 ${
                productCategory === 'arohi_one'
                  ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 shadow-xl scale-105'
                  : 'text-slate-300 hover:text-white hover:bg-purple-900/40'
              }`}
            >
              <Building className="w-4 h-4" />
              <span>🏢 AROHI ONE (AI Business OS)</span>
              <span className="bg-slate-950/80 text-amber-300 text-[9px] font-black uppercase px-2 py-0.5 rounded-full hidden sm:inline">
                03-Day Trial
              </span>
            </button>

            <button
              type="button"
              onClick={() => setProductCategory('calling_agents')}
              className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center gap-2.5 ${
                productCategory === 'calling_agents'
                  ? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-white shadow-xl scale-105'
                  : 'text-slate-300 hover:text-white hover:bg-purple-900/40'
              }`}
            >
              <Headphones className="w-4 h-4 text-cyan-300" />
              <span>📞 AROHI Calling Agents (Voice Fleet)</span>
              <span className="bg-cyan-950 text-cyan-300 border border-cyan-400/50 text-[9px] font-black uppercase px-2 py-0.5 rounded-full hidden sm:inline">
                03-Day Trial
              </span>
            </button>

            <button
              type="button"
              onClick={() => setProductCategory('individual')}
              className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center gap-2.5 ${
                productCategory === 'individual'
                  ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-xl scale-105'
                  : 'text-slate-300 hover:text-white hover:bg-purple-900/40'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>🎓 Arohi Pro (Personal &amp; Students)</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* VIEW 1: AROHI ONE (AI BUSINESS OPERATING SYSTEM)                          */}
      {/* ========================================================================= */}
      {productCategory === 'arohi_one' && (
        <div className="space-y-8 animate-fade-in">
          {/* Section Sub-header */}
          <div className="text-center space-y-2 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-emerald-950 border border-emerald-500/60 px-4 py-1.5 rounded-full text-xs font-black text-emerald-300 shadow-md">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              03-Day Free Trial Available on All Business OS Tiers • Instant Razorpay Activation
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white">
              Autonomous AI Workforce for Micro, Growth &amp; Enterprise Teams
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-medium">
              Replace fragmented tools with a single unified operating system: CRM, ERP, automated telecalling workforce, customer support bots, and live voice synthesis.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch">
            {AROHI_ONE_TIERS.map((tier) => {
              const price = billingCycle === 'annual'
                ? (activeCurrency === 'USD' ? tier.annualPriceUSD : tier.annualPriceINR)
                : (activeCurrency === 'USD' ? tier.priceUSD : tier.priceINR);
              
              const monthlyEquivalent = billingCycle === 'annual'
                ? Math.round(price / 12)
                : price;

              return (
                <div
                  key={tier.id}
                  className={`dark-card rounded-[2.2rem] p-6 text-left transition-all duration-300 relative flex flex-col justify-between border-2 ${
                    tier.isPopular
                      ? 'bg-gradient-to-b from-[#22154a] via-[#160c33] to-[#0d0722] border-amber-400/90 shadow-[0_0_35px_rgba(245,158,11,0.3)] scale-[1.02]'
                      : 'bg-[#120b29] border-[#2b1f59] hover:border-purple-500/60 hover:bg-[#180f36]'
                  }`}
                >
                  {/* Badge */}
                  {tier.badge && (
                    <div className={`absolute -top-3.5 left-1/2 -translate-x-1/2 text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg border shrink-0 whitespace-nowrap ${
                      tier.isPopular
                        ? 'bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 border-amber-300'
                        : 'bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 border-emerald-300'
                    }`}>
                      {tier.badge}
                    </div>
                  )}

                  <div className="space-y-4">
                    {/* Header info */}
                    <div className="space-y-1.5 border-b border-purple-800/60 pb-4">
                      <span className="text-[11px] font-black uppercase tracking-widest text-purple-300 block">
                        {tier.name}
                      </span>
                      <p className="text-[11px] text-slate-300 font-medium leading-snug">
                        {tier.tagline}
                      </p>
                      <div className="flex items-baseline gap-1 pt-1">
                        <span className="text-3xl sm:text-4xl font-black text-white">
                          {symbol}{monthlyEquivalent.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs text-slate-300 font-bold">/mo</span>
                      </div>
                      {billingCycle === 'annual' && (
                        <span className="text-[10px] text-emerald-300 font-extrabold block">
                          Billed annually at {symbol}{price.toLocaleString('en-IN')} (2 Months Free)
                        </span>
                      )}
                      <div className="inline-flex items-center gap-1 bg-emerald-950 border border-emerald-500/40 text-emerald-300 px-2 py-0.5 rounded-md text-[9px] font-black uppercase">
                        <Clock className="w-3 h-3" />
                        <span>03-Day Free Trial ({tier.trialMinutes} Test Mins)</span>
                      </div>
                    </div>

                    {/* Core Allocation Matrix */}
                    <div className="bg-[#0b051e] border border-purple-900/60 p-3.5 rounded-2xl space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400 font-bold flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-purple-400" /> Seats:
                        </span>
                        <span className="text-white font-black">{tier.seats} Team Seats</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400 font-bold flex items-center gap-1.5">
                          <Bot className="w-3.5 h-3.5 text-amber-400" /> Voice Agents:
                        </span>
                        <span className="text-amber-300 font-black">{tier.agentsCount} Autonomous Agents</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400 font-bold flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-cyan-400" /> Voice Minutes:
                        </span>
                        <span className="text-cyan-300 font-black">{tier.voiceMinutes.toLocaleString('en-IN')} Mins/mo</span>
                      </div>
                      <div className="flex items-center justify-between text-[10.5px] pt-1 border-t border-purple-900/40">
                        <span className="text-slate-500 font-bold">Overage Rate:</span>
                        <span className="text-slate-300 font-bold">
                          {symbol}{activeCurrency === 'USD' ? tier.overageRateUSD : tier.overageRateINR}/min
                        </span>
                      </div>
                    </div>

                    {/* Features List */}
                    <div className="space-y-2 text-xs">
                      <span className="text-[10px] font-black uppercase text-purple-300 tracking-wider block">
                        Workforce Capabilities:
                      </span>
                      {tier.features.slice(0, 6).map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2 text-slate-300">
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="text-[11px] leading-snug">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions: 03-Day Free Trial & Razorpay Checkout */}
                  <div className="pt-5 border-t border-purple-900/40 mt-5 space-y-2.5">
                    {/* Primary Button: 03-Day Free Trial */}
                    <button
                      type="button"
                      onClick={() => handleStartFreeTrial(tier, 'arohi_one')}
                      className="w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs uppercase tracking-wider py-3 rounded-xl shadow-lg cursor-pointer transition-all hover:scale-[1.02] flex items-center justify-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5 fill-current" />
                      <span>Start 03-Day Free Trial</span>
                    </button>

                    {/* Secondary Button: Subscribe via Razorpay */}
                    <button
                      type="button"
                      onClick={() => handlePayViaRazorpay({
                        id: tier.id,
                        name: tier.name,
                        price: price,
                        billingText: billingCycle === 'annual' ? '/Year' : '/Month',
                        margin: Math.round(price * 0.4)
                      })}
                      className={`w-full py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                        tier.isPopular
                          ? 'bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 hover:brightness-110 shadow-md'
                          : 'bg-purple-900/60 hover:bg-purple-800/80 border border-purple-500/40 text-purple-200'
                      }`}
                    >
                      <Zap className="w-3.5 h-3.5 fill-current" />
                      <span>Buy with Razorpay ({symbol}{price.toLocaleString('en-IN')})</span>
                    </button>

                    <span className="text-[8.5px] text-slate-400 font-bold block text-center uppercase tracking-wider">
                      UPI • Cards • NetBanking • HMAC Verified
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Business OS Interactive Preview Banner */}
          <div className="bg-gradient-to-r from-[#170c36] via-[#241354] to-[#170c36] border-2 border-purple-500/50 p-6 rounded-[2.2rem] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 text-left">
            <div className="space-y-2 max-w-xl">
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-300 block">
                🏢 Integrated Autonomous Suite
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Looking to experience Arohi One before choosing a plan?
              </h3>
              <p className="text-xs text-slate-300 font-medium leading-relaxed">
                Launch the Arohi One Business OS cockpit immediately to inspect the Lead CRM, Deal Pipelines, Invoicing, Campaign Dialers, and Autonomous Voice Workflows.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              {onNavigateTab && (
                <button
                  type="button"
                  onClick={() => onNavigateTab('business-os')}
                  className="bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 font-black text-xs uppercase px-5 py-3 rounded-xl shadow-lg hover:brightness-110 cursor-pointer transition-all flex items-center gap-2"
                >
                  <Rocket className="w-4 h-4" />
                  <span>Launch Business OS Cockpit</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 2: AROHI CALLING AGENTS (AUTONOMOUS TELECALLING FLEET)               */}
      {/* ========================================================================= */}
      {productCategory === 'calling_agents' && (
        <div className="space-y-8 animate-fade-in">
          {/* Section Sub-header */}
          <div className="text-center space-y-2 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-cyan-950 border border-cyan-400/60 px-4 py-1.5 rounded-full text-xs font-black text-cyan-300 shadow-md">
              <PhoneCall className="w-4 h-4 text-cyan-400 animate-pulse" />
              03-Day Free Trial on Standalone Voice Workforce • Instant Razorpay Checkout
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white">
              Autonomous Inbound &amp; Outbound AI Telecalling Workforce
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-medium">
              Deploy human-parity conversational voice agents with sub-second latency, 50+ vernacular languages, automated qualification, and live CRM synchronization.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch">
            {AROHI_CALLING_AGENT_TIERS.map((tier) => {
              const price = billingCycle === 'annual'
                ? (activeCurrency === 'USD' ? tier.annualPriceUSD : tier.annualPriceINR)
                : (activeCurrency === 'USD' ? tier.priceUSD : tier.priceINR);
              
              const monthlyEquivalent = billingCycle === 'annual'
                ? Math.round(price / 12)
                : price;

              return (
                <div
                  key={tier.id}
                  className={`dark-card rounded-[2.2rem] p-6 text-left transition-all duration-300 relative flex flex-col justify-between border-2 ${
                    tier.isPopular
                      ? 'bg-gradient-to-b from-[#1b194d] via-[#121038] to-[#0a0822] border-cyan-400/90 shadow-[0_0_35px_rgba(6,182,212,0.3)] scale-[1.02]'
                      : 'bg-[#120b29] border-[#2b1f59] hover:border-cyan-500/60 hover:bg-[#180f36]'
                  }`}
                >
                  {/* Badge */}
                  {tier.badge && (
                    <div className={`absolute -top-3.5 left-1/2 -translate-x-1/2 text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg border shrink-0 whitespace-nowrap ${
                      tier.isPopular
                        ? 'bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-950 border-cyan-300'
                        : 'bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 border-emerald-300'
                    }`}>
                      {tier.badge}
                    </div>
                  )}

                  <div className="space-y-4">
                    {/* Header info */}
                    <div className="space-y-1.5 border-b border-purple-800/60 pb-4">
                      <span className="text-[11px] font-black uppercase tracking-widest text-cyan-300 block">
                        {tier.name}
                      </span>
                      <p className="text-[11px] text-slate-300 font-medium leading-snug">
                        {tier.description}
                      </p>
                      <div className="flex items-baseline gap-1 pt-1">
                        <span className="text-3xl sm:text-4xl font-black text-white">
                          {symbol}{monthlyEquivalent.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs text-slate-300 font-bold">/mo</span>
                      </div>
                      {billingCycle === 'annual' && (
                        <span className="text-[10px] text-emerald-300 font-extrabold block">
                          Billed annually at {symbol}{price.toLocaleString('en-IN')} (2 Months Free)
                        </span>
                      )}
                      <div className="inline-flex items-center gap-1 bg-cyan-950 border border-cyan-400/40 text-cyan-300 px-2 py-0.5 rounded-md text-[9px] font-black uppercase">
                        <Clock className="w-3 h-3" />
                        <span>03-Day Free Trial ({tier.trialMinutes} Test Mins)</span>
                      </div>
                    </div>

                    {/* Calling Allocation Box */}
                    <div className="bg-[#08041c] border border-cyan-900/60 p-3.5 rounded-2xl space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400 font-bold flex items-center gap-1.5">
                          <Bot className="w-3.5 h-3.5 text-cyan-400" /> Active Agents:
                        </span>
                        <span className="text-white font-black">{tier.agentsCount} AI Personas</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400 font-bold flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-amber-400" /> Voice Minutes:
                        </span>
                        <span className="text-amber-300 font-black">{tier.voiceMinutes.toLocaleString('en-IN')} Mins/mo</span>
                      </div>
                      <div className="flex items-center justify-between text-[10.5px] pt-1 border-t border-purple-900/40">
                        <span className="text-slate-500 font-bold">Overage Rate:</span>
                        <span className="text-slate-300 font-bold">
                          {symbol}{activeCurrency === 'USD' ? tier.overageRateUSD : tier.overageRateINR}/min
                        </span>
                      </div>
                    </div>

                    {/* Features List */}
                    <div className="space-y-2 text-xs">
                      <span className="text-[10px] font-black uppercase text-cyan-300 tracking-wider block">
                        Calling Fleet Features:
                      </span>
                      {tier.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2 text-slate-300">
                          <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                          <span className="text-[11px] leading-snug">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-5 border-t border-purple-900/40 mt-5 space-y-2.5">
                    {/* Start 03-Day Free Trial */}
                    <button
                      type="button"
                      onClick={() => handleStartFreeTrial(tier, 'calling_agents')}
                      className="w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs uppercase tracking-wider py-3 rounded-xl shadow-lg cursor-pointer transition-all hover:scale-[1.02] flex items-center justify-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5 fill-current" />
                      <span>Start 03-Day Free Trial</span>
                    </button>

                    {/* Direct Razorpay Checkout */}
                    <button
                      type="button"
                      onClick={() => handlePayViaRazorpay({
                        id: tier.id,
                        name: tier.name,
                        price: price,
                        billingText: billingCycle === 'annual' ? '/Year' : '/Month',
                        margin: Math.round(price * 0.4)
                      })}
                      className={`w-full py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                        tier.isPopular
                          ? 'bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-950 hover:brightness-110 shadow-md'
                          : 'bg-purple-900/60 hover:bg-purple-800/80 border border-purple-500/40 text-purple-200'
                      }`}
                    >
                      <Zap className="w-3.5 h-3.5 fill-current" />
                      <span>Buy with Razorpay ({symbol}{price.toLocaleString('en-IN')})</span>
                    </button>

                    <span className="text-[8.5px] text-slate-400 font-bold block text-center uppercase tracking-wider">
                      UPI • Cards • NetBanking • Zero Latency
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ADD-ONS SECTION */}
          <div className="space-y-4 pt-4 text-left">
            <div className="border-b border-purple-800/60 pb-3">
              <h3 className="text-xl font-black text-white flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-amber-400" />
                Telephony &amp; Voice Studio Add-ons
              </h3>
              <p className="text-xs text-slate-300 font-medium">
                Enhance your voice fleet with virtual local numbers, custom executive voice cloning, and toll-free lines.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {AROHI_ADDONS.map((addon) => {
                const addonPrice = activeCurrency === 'USD' ? addon.priceUSD : addon.priceINR;
                return (
                  <div
                    key={addon.id}
                    className="bg-[#12082b] border border-purple-800/60 p-4 rounded-2xl flex flex-col justify-between space-y-3"
                  >
                    <div className="space-y-1.5">
                      <span className="text-xs font-black text-amber-300 block">
                        {addon.name}
                      </span>
                      <p className="text-[11px] text-slate-300 font-medium leading-snug">
                        {addon.desc}
                      </p>
                      <div className="text-lg font-black text-white pt-1">
                        {symbol}{addonPrice.toLocaleString('en-IN')}{' '}
                        <span className="text-[10px] text-slate-400 font-bold">{addon.cycle}</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handlePayViaRazorpay({
                        id: addon.id,
                        name: addon.name,
                        price: addonPrice,
                        billingText: addon.cycle
                      })}
                      className="w-full bg-purple-900/70 hover:bg-purple-800/90 border border-purple-400/50 text-white font-bold text-xs py-2 rounded-xl cursor-pointer transition-all flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <Zap className="w-3.5 h-3.5 text-amber-300" />
                      <span>Add via Razorpay</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 3: AROHI PRO (PERSONAL & STUDENTS)                                   */}
      {/* ========================================================================= */}
      {productCategory === 'individual' && (
        <div className="space-y-8 animate-fade-in">
          {/* Highlighted Banner */}
          <div className="dark-card inline-flex flex-wrap items-center justify-center gap-3 bg-emerald-950 border border-emerald-500/60 px-5 py-2.5 rounded-2xl shadow-xl text-xs font-extrabold text-emerald-300 w-full">
            <span className="flex items-center gap-1.5 text-emerald-300">
              <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
              <strong className="text-white uppercase tracking-wider">✨ UNLIMITED AI CHAT</strong> Included On Every Plan
            </span>
            <span className="hidden sm:inline text-emerald-600">|</span>
            <span className="text-emerald-100 font-bold">No Hidden Charges • Instant UPI &amp; Razorpay Activation</span>
          </div>

          {/* 🎁 100% CASHBACK & REFERRAL SYSTEM BANNER */}
          <div className="bg-gradient-to-r from-[#1b0e3e] via-[#281352] to-[#1b0e3e] border-2 border-amber-400/80 p-5 rounded-2xl shadow-2xl text-left space-y-3 max-w-3xl mx-auto relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-6 -mr-6 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>

            <div className="flex items-center justify-between flex-wrap gap-2 border-b border-amber-500/30 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="text-xl">🪙</span>
                <h3 className="text-sm sm:text-base font-black text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                  <span>100% Cashback &amp; Referral System</span>
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
          <div className="max-w-md mx-auto w-full bg-gradient-to-r from-[#170e36] to-[#1e1346] border border-amber-500/40 rounded-2xl p-4 shadow-xl text-left space-y-2">
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
                  setCouponInput(e?.target?.value ?? "");
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

          {/* TIERS CARDS GRID */}
          <div className={`grid grid-cols-1 md:grid-cols-3 ${currentTiers.length === 6 ? 'lg:grid-cols-3 xl:grid-cols-6' : 'lg:grid-cols-5'} gap-4 items-stretch`}>
            {currentTiers.map((tier, idx) => {
              const isSelected = selectedTierIndex === idx;
              const isPopular = idx === (currentTiers.length === 6 ? 2 : 1);
              const isUltimate = idx === (currentTiers.length - 1);

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
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg border border-amber-300 shrink-0 whitespace-nowrap">
                      🔥 Most Popular
                    </div>
                  )}
                  {isUltimate && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg border border-emerald-300 shrink-0 whitespace-nowrap">
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
                        <span className="text-3xl font-black text-white">{symbol}{tier.price}</span>
                        <span className="text-xs text-slate-300 font-bold">/month</span>
                      </div>
                      <div className="inline-flex items-center gap-1 bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded-md text-[8.5px] font-black uppercase tracking-wide">
                        <span>🪙 100% Cashback: Get {symbol}{tier.price} Coins</span>
                      </div>
                      <span className="text-[9px] text-emerald-300 font-extrabold block">
                        {activeCurrency === 'USD' ? 'Global Cards • Apple Pay • Instant Access' : 'GST Included • Instant Activation'}
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
                      <span>Subscribe via Razorpay ({symbol}{tier.price})</span>
                    </button>
                    <span className="text-[8px] text-slate-300 font-bold block text-center uppercase tracking-wider">
                      {activeCurrency === 'USD' ? 'Global Cards / Apple Pay / Google Pay' : 'Instant UPI / QR Code Payment'}
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
                  Personal Tier Feature Comparison
                </h3>
                <p className="text-xs text-slate-200 font-medium mt-1">
                  Compare exact AI Tokens, Live Voice Calls, and Cashback rewards across personal paths.
                </p>
              </div>
              <div className="bg-emerald-950 border border-emerald-500/50 px-3.5 py-2 rounded-xl text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                100% Transparent • Razorpay Verified
              </div>
            </div>

            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-purple-900/60 text-purple-300 font-black uppercase text-[10px] tracking-wider">
                    <th className="py-3 px-4 min-w-[180px]">Feature / Allocation</th>
                    <th className="py-3 px-3 text-center">Starter ({symbol}{currentTiers[0]?.price})</th>
                    <th className="py-3 px-3 text-center text-amber-300">Professional ({symbol}{currentTiers[1]?.price})</th>
                    <th className="py-3 px-3 text-center">Growth ({symbol}{currentTiers[2]?.price})</th>
                    <th className="py-3 px-3 text-center">Executive ({symbol}{currentTiers[3]?.price})</th>
                    <th className="py-3 px-3 text-center text-emerald-300">Ultimate ({symbol}{currentTiers[4]?.price})</th>
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

                  {/* 100% Cashback Coins */}
                  <tr>
                    <td className="py-3 px-4 font-bold text-amber-300 flex items-center gap-1.5">
                      <span className="text-sm">🪙</span>
                      <span>100% Cashback Coins</span>
                    </td>
                    <td className="py-3 px-3 text-center font-bold text-amber-200">{symbol}{currentTiers[0]?.price} Coins</td>
                    <td className="py-3 px-3 text-center font-bold text-amber-300">{symbol}{currentTiers[1]?.price} Coins</td>
                    <td className="py-3 px-3 text-center font-bold text-amber-200">{symbol}{currentTiers[2]?.price} Coins</td>
                    <td className="py-3 px-3 text-center font-bold text-amber-200">{symbol}{currentTiers[3]?.price} Coins</td>
                    <td className="py-3 px-3 text-center font-bold text-emerald-300">{symbol}{currentTiers[4]?.price} Coins</td>
                  </tr>

                  {/* Priority Processing */}
                  <tr>
                    <td className="py-3 px-4 font-bold text-purple-300 flex items-center gap-1.5">
                      <Crown className="w-4 h-4 text-purple-400" />
                      <span>Processing Priority</span>
                    </td>
                    <td className="py-3 px-3 text-center font-bold text-slate-300">Standard Fast</td>
                    <td className="py-3 px-3 text-center font-bold text-amber-300">High Priority</td>
                    <td className="py-3 px-3 text-center font-bold text-purple-200">Ultra Priority</td>
                    <td className="py-3 px-3 text-center font-bold text-purple-200">Dedicated VIP</td>
                    <td className="py-3 px-3 text-center font-bold text-emerald-300">Real-time VIP</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* RAZORPAY SECURITY & ASSURANCE FOOTER */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left pt-4">
        <div className="dark-card bg-[#120b29] border border-purple-800/60 p-5 rounded-2xl space-y-2">
          <div className="flex items-center gap-2 text-amber-300 font-black text-xs uppercase tracking-wider">
            <Zap className="w-4 h-4 text-amber-400" /> Razorpay Instant Gateway
          </div>
          <p className="text-xs text-slate-200 leading-relaxed font-medium">
            Pay safely with UPI (PhonePe, Google Pay, Paytm, BHIM), RuPay, Visa, Mastercard, NetBanking, or Corporate cards with SHA-256 webhook verification.
          </p>
        </div>

        <div className="dark-card bg-[#120b29] border border-purple-800/60 p-5 rounded-2xl space-y-2">
          <div className="flex items-center gap-2 text-emerald-300 font-black text-xs uppercase tracking-wider">
            <Lock className="w-4 h-4 text-emerald-400" /> 03-Day Risk-Free Trial
          </div>
          <p className="text-xs text-slate-200 leading-relaxed font-medium">
            Test any Arohi One Business OS or Calling Agent pack for 3 full days. Cancel anytime with zero lock-in or surprise fees.
          </p>
        </div>

        <div className="dark-card bg-[#120b29] border border-purple-800/60 p-5 rounded-2xl space-y-2">
          <div className="flex items-center gap-2 text-purple-300 font-black text-xs uppercase tracking-wider">
            <Crown className="w-4 h-4 text-purple-400" /> Sovereign Scale &amp; Support
          </div>
          <p className="text-xs text-slate-200 leading-relaxed font-medium">
            Built for India and global businesses. Enterprise accounts enjoy private VPC hosting, 99.95% uptime SLA, and custom voice persona training.
          </p>
        </div>
      </div>

    </div>
  );
}
