import React, { useState } from 'react';
import { 
  X, Check, Sparkles, Phone, ShieldCheck, ArrowRight, 
  Bot, Award, ChevronRight, Zap, RefreshCw, FileText, Globe,
  Building2, Users, Flame, CreditCard, GraduationCap
} from 'lucide-react';
import { 
  PRICING_TIERS, 
  INTERNATIONAL_PRICING_TIERS, 
  AROHI_ONE_TIERS, 
  AROHI_CALLING_AGENT_TIERS,
  AROHI_EXAM_PASSES,
  PricingTier,
  ArohiOneTier,
  ArohiVoiceAgentTier,
  ArohiExamPass
} from '../data/pricingData';
import { openRazorpayCheckout } from '../lib/razorpay';
import { useAuth } from '../context/AuthContext';

interface ArohiUpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  currency?: 'INR' | 'USD';
  onNavigateTab?: (tab: string) => void;
  isDarkMode?: boolean;
}

type ProductCategory = 'consumer' | 'business_os' | 'voice_fleet' | 'exams';

export default function ArohiUpgradeModal({
  isOpen,
  onClose,
  currency: initialCurrency = 'INR',
  onNavigateTab,
  isDarkMode = true
}: ArohiUpgradeModalProps) {
  const { user } = useAuth();
  const [currency, setCurrency] = useState<'INR' | 'USD'>(initialCurrency);
  const [productCategory, setProductCategory] = useState<ProductCategory>('consumer');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annually'>('annually');
  const [isProcessing, setIsProcessing] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(true);

  // Selected Index within each product category
  const [selectedConsumerIdx, setSelectedConsumerIdx] = useState(0); // Starter
  const [selectedBusinessIdx, setSelectedBusinessIdx] = useState(1); // Growth OS
  const [selectedVoiceIdx, setSelectedVoiceIdx] = useState(1); // Voice Pro
  const [selectedExamsIdx, setSelectedExamsIdx] = useState(1); // Gold Pass (Most Popular)

  if (!isOpen) return null;

  const sym = currency === 'USD' ? '$' : '₹';
  const consumerTiers = currency === 'USD' ? INTERNATIONAL_PRICING_TIERS : PRICING_TIERS;

  // Selected item references
  const currentConsumer = consumerTiers[selectedConsumerIdx] || consumerTiers[0];
  const currentBusiness = AROHI_ONE_TIERS[selectedBusinessIdx] || AROHI_ONE_TIERS[0];
  const currentVoice = AROHI_CALLING_AGENT_TIERS[selectedVoiceIdx] || AROHI_CALLING_AGENT_TIERS[0];
  const currentExam = AROHI_EXAM_PASSES[selectedExamsIdx] || AROHI_EXAM_PASSES[0];

  // Calculate pricing based on category and billing cycle
  let planTitle = '';
  let monthlyPrice = 0;
  let annualPrice = 0;
  let annualMonthlyRate = 0; // The per-month price when billed annually
  let originalAnnualPrice = 0;
  let savingsText = '20% off';

  if (productCategory === 'consumer') {
    planTitle = `${currentConsumer.name} Plan`;
    monthlyPrice = currentConsumer.price;
    // Consumer annual is 10 months price (2 months free / ~17-20% off)
    originalAnnualPrice = monthlyPrice * 12;
    annualPrice = Math.round(monthlyPrice * 9.6); // ~20% off
    annualMonthlyRate = Math.round(annualPrice / 12);
  } else if (productCategory === 'business_os') {
    planTitle = `Arohi One ${currentBusiness.name}`;
    monthlyPrice = currency === 'USD' ? currentBusiness.priceUSD : currentBusiness.priceINR;
    annualPrice = currency === 'USD' ? currentBusiness.annualPriceUSD : currentBusiness.annualPriceINR;
    originalAnnualPrice = monthlyPrice * 12;
    annualMonthlyRate = Math.round(annualPrice / 12);
  } else if (productCategory === 'voice_fleet') {
    planTitle = `Arohi ${currentVoice.name}`;
    monthlyPrice = currency === 'USD' ? currentVoice.priceUSD : currentVoice.priceINR;
    annualPrice = currency === 'USD' ? currentVoice.annualPriceUSD : currentVoice.annualPriceINR;
    originalAnnualPrice = monthlyPrice * 12;
    annualMonthlyRate = Math.round(annualPrice / 12);
  } else {
    // Exams category: fixed one-time CBT mock test pass
    planTitle = currentExam.name;
    const examPrice = currency === 'USD' ? currentExam.priceUSD : currentExam.priceINR;
    const origPrice = currency === 'USD' ? currentExam.priceUSD * 4 : currentExam.originalPriceINR;
    monthlyPrice = examPrice;
    annualPrice = examPrice;
    originalAnnualPrice = origPrice;
    annualMonthlyRate = examPrice;
    savingsText = `${Math.round((1 - examPrice / origPrice) * 100)}% off`;
  }

  const finalCheckoutPrice = productCategory === 'exams' 
    ? monthlyPrice 
    : (billingCycle === 'annually' ? annualPrice : monthlyPrice);

  const handleLaunchCheckout = async () => {
    if (!agreedToTerms) {
      alert('Please agree to the service terms to proceed.');
      return;
    }

    setIsProcessing(true);
    try {
      const checkoutPlanName = productCategory === 'exams'
        ? `${planTitle} (${currentExam.validityDays} Days Validity)`
        : `${planTitle} (${billingCycle === 'annually' ? 'Annual' : 'Monthly'})`;

      const checkoutBusinessName = productCategory === 'exams'
        ? 'Arohi Exams'
        : (productCategory === 'business_os' 
            ? 'Arohi One Business OS' 
            : (productCategory === 'voice_fleet' ? 'Arohi AI Voice Fleet' : 'Arohi AI'));

      // Close modal to yield full screen space to the payment gateway
      onClose();

      await openRazorpayCheckout({
        price: finalCheckoutPrice,
        currency: currency,
        planName: checkoutPlanName,
        businessName: checkoutBusinessName,
        userEmail: user?.email || '',
        userName: user?.displayName || '',
        onSuccess: (res) => {
          alert(`🎉 Subscription to ${planTitle} activated! Payment ID: ${res.razorpay_payment_id}`);
        },
        onError: (err) => {
          console.warn('Checkout error:', err);
          if (err?.message && !err.message.includes('cancel')) {
            alert(`Checkout Notice: ${err.message}`);
          }
        },
        onDismiss: () => {
          setIsProcessing(false);
        }
      });
    } catch (err: any) {
      setIsProcessing(false);
      console.warn('Checkout launch error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div 
      id="arohi-upgrade-modal-overlay"
      className="fixed inset-0 z-[400] flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
    >
      <div 
        id="arohi-upgrade-modal-card"
        className={`relative w-full max-w-lg rounded-3xl border shadow-2xl overflow-hidden my-auto ${
          isDarkMode 
            ? 'bg-[#121417] text-slate-100 border-white/10' 
            : 'bg-[#181a1f] text-slate-100 border-slate-700/60'
        } transition-all`}
      >
        {/* Subtle Ambient Background Gradient */}
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-blue-600/15 via-purple-600/10 to-transparent pointer-events-none" />

        {/* Top Header Bar */}
        <div className="relative px-5 pt-5 pb-3 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2">
            {/* Currency Switcher */}
            <div className="flex items-center bg-black/40 border border-white/10 rounded-full p-0.5 text-[10px] font-bold">
              <button
                type="button"
                onClick={() => setCurrency('INR')}
                className={`px-2 py-0.5 rounded-full transition-all cursor-pointer ${
                  currency === 'INR' ? 'bg-white/20 text-white font-black' : 'text-slate-400 hover:text-white'
                }`}
              >
                ₹ INR
              </button>
              <button
                type="button"
                onClick={() => setCurrency('USD')}
                className={`px-2 py-0.5 rounded-full transition-all cursor-pointer ${
                  currency === 'USD' ? 'bg-white/20 text-white font-black' : 'text-slate-400 hover:text-white'
                }`}
              >
                $ USD
              </button>
            </div>

            {/* Usage & Invoice Badge */}
            <button
              type="button"
              onClick={() => {
                onClose();
                if (onNavigateTab) onNavigateTab('pricing');
              }}
              className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-[11px] font-medium text-slate-300 hover:text-white transition-colors cursor-pointer border border-white/10"
            >
              Usage &amp; Invoice
            </button>
          </div>
        </div>

        {/* Modal Hero Title */}
        <div className="text-center px-6 pt-1 pb-3 relative">
          <h2 className="text-2xl font-serif tracking-tight text-white font-normal">
            Your Plan Plays From Here
          </h2>
          <p className="text-[11px] text-slate-400 mt-1 font-sans">
            Sovereign Intelligence • Unlimited Multi-Turn AI • Real-Time Voice Fleet
          </p>
        </div>

        {/* Product Category Selector Pill Bar */}
        <div className="px-5 pb-2">
          <div className="grid grid-cols-4 gap-1 bg-black/40 p-1 rounded-xl border border-white/5 text-[11px] font-semibold">
            <button
              type="button"
              onClick={() => setProductCategory('consumer')}
              className={`py-1.5 px-1.5 rounded-lg transition-all text-center cursor-pointer flex items-center justify-center gap-1 ${
                productCategory === 'consumer'
                  ? 'bg-white/20 text-white font-bold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-3 h-3 text-amber-400 shrink-0" />
              <span className="truncate">Personal</span>
            </button>
            <button
              type="button"
              onClick={() => setProductCategory('business_os')}
              className={`py-1.5 px-1.5 rounded-lg transition-all text-center cursor-pointer flex items-center justify-center gap-1 ${
                productCategory === 'business_os'
                  ? 'bg-white/20 text-white font-bold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Building2 className="w-3 h-3 text-blue-400 shrink-0" />
              <span className="truncate">Business OS</span>
            </button>
            <button
              type="button"
              onClick={() => setProductCategory('voice_fleet')}
              className={`py-1.5 px-1.5 rounded-lg transition-all text-center cursor-pointer flex items-center justify-center gap-1 ${
                productCategory === 'voice_fleet'
                  ? 'bg-white/20 text-white font-bold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Phone className="w-3 h-3 text-emerald-400 shrink-0" />
              <span className="truncate">Voice Calling</span>
            </button>
            <button
              type="button"
              onClick={() => setProductCategory('exams')}
              className={`py-1.5 px-1.5 rounded-lg transition-all text-center cursor-pointer flex items-center justify-center gap-1 ${
                productCategory === 'exams'
                  ? 'bg-white/20 text-white font-bold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <GraduationCap className="w-3 h-3 text-purple-400 shrink-0" />
              <span className="truncate">Arohi Exams</span>
            </button>
          </div>
        </div>

        {/* Tier Horizontal Segmented Selector (e.g. Moderato, Allegretto, Allegro...) */}
        <div className="px-5 py-2 overflow-x-auto custom-scrollbar">
          <div className="flex items-center gap-1.5 min-w-max">
            {productCategory === 'consumer' && consumerTiers.map((tier, idx) => {
              const isSelected = selectedConsumerIdx === idx;
              return (
                <button
                  key={tier.name}
                  type="button"
                  onClick={() => setSelectedConsumerIdx(idx)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                    isSelected
                      ? 'bg-white/20 text-white font-bold border border-white/20 shadow-xs'
                      : 'bg-white/5 hover:bg-white/10 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {tier.name.replace(' Plan', '')}
                </button>
              );
            })}

            {productCategory === 'business_os' && AROHI_ONE_TIERS.map((tier, idx) => {
              const isSelected = selectedBusinessIdx === idx;
              return (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => setSelectedBusinessIdx(idx)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                    isSelected
                      ? 'bg-white/20 text-white font-bold border border-white/20 shadow-xs'
                      : 'bg-white/5 hover:bg-white/10 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {tier.name}
                </button>
              );
            })}

            {productCategory === 'voice_fleet' && AROHI_CALLING_AGENT_TIERS.map((tier, idx) => {
              const isSelected = selectedVoiceIdx === idx;
              return (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => setSelectedVoiceIdx(idx)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                    isSelected
                      ? 'bg-white/20 text-white font-bold border border-white/20 shadow-xs'
                      : 'bg-white/5 hover:bg-white/10 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {tier.name}
                </button>
              );
            })}

            {productCategory === 'exams' && AROHI_EXAM_PASSES.map((pass, idx) => {
              const isSelected = selectedExamsIdx === idx;
              const passPrice = currency === 'USD' ? pass.priceUSD : pass.priceINR;
              return (
                <button
                  key={pass.id}
                  type="button"
                  onClick={() => setSelectedExamsIdx(idx)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-purple-600/30 text-white font-bold border border-purple-400/40 shadow-xs'
                      : 'bg-white/5 hover:bg-white/10 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span>{pass.name.replace('Arohi Exams™ ', '')}</span>
                  <span className="text-[10px] opacity-75">({sym}{passPrice})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Card: Details & Feature Checklist */}
        <div className="px-5 py-2">
          <div className="bg-[#1a1c22] rounded-2xl p-5 border border-white/5 relative overflow-hidden">
            {/* Symphony Staff Accent */}
            <div className="flex items-start justify-between mb-4 border-b border-white/5 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-serif text-white font-medium">
                    {productCategory === 'consumer' 
                      ? currentConsumer.name 
                      : (productCategory === 'business_os' 
                          ? currentBusiness.name 
                          : (productCategory === 'voice_fleet' 
                              ? currentVoice.name 
                              : currentExam.name.replace('Arohi Exams™ ', '')))}
                  </h3>
                  {((productCategory === 'business_os' && currentBusiness.badge) || 
                    (productCategory === 'voice_fleet' && currentVoice.badge) ||
                    (productCategory === 'exams' && currentExam.badge)) && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${
                      productCategory === 'exams'
                        ? 'bg-purple-500/20 text-purple-300 border-purple-500/30'
                        : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                    }`}>
                      {productCategory === 'business_os' 
                        ? currentBusiness.badge 
                        : (productCategory === 'voice_fleet' ? currentVoice.badge : currentExam.badge)}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  {productCategory === 'consumer' 
                    ? `${currentConsumer.aiCallsText} • ${currentConsumer.aiCreditsText}`
                    : (productCategory === 'business_os' 
                        ? currentBusiness.tagline 
                        : (productCategory === 'voice_fleet' ? currentVoice.description : currentExam.description))}
                </p>
              </div>

              {/* Symphony Clef / Note icon art */}
              <div className="opacity-40 text-right font-serif text-lg tracking-widest text-slate-300 select-none">
                {productCategory === 'exams' ? '🎯 📝 🏆' : '♩ ♫ ♬'}
              </div>
            </div>

            {/* Hierarchical Checklist matching screenshot (✓ and ↳) */}
            <div className="space-y-2 text-xs text-slate-300">
              {productCategory === 'consumer' && (
                <>
                  <div className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                    <span className="font-semibold text-slate-100">Unlimited Multi-Turn AI Chat &amp; Memory</span>
                  </div>
                  <div className="flex items-start gap-2 pl-4 text-slate-300 text-[11.5px]">
                    <span className="text-slate-500">↳</span>
                    <span>Work with Docs (.docx), Sheets (.xlsx), and Slides (.pptx)</span>
                  </div>
                  <div className="flex items-start gap-2 pl-4 text-slate-300 text-[11.5px]">
                    <span className="text-slate-500">↳</span>
                    <span>Deep Research &amp; Real-time Multi-Engine Search</span>
                  </div>
                  <div className="flex items-start gap-2 pl-4 text-slate-300 text-[11.5px]">
                    <span className="text-slate-500">↳</span>
                    <span>Websites &amp; Code Deployment Tools</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                    <span>{currentConsumer.callHoursText}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                    <span>Mission 87 Sovereign Earning Blueprints &amp; Client Catalogs</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                    <span>{currentConsumer.limits.path1.atsScans} • {currentConsumer.limits.path1.mockInterviews}</span>
                  </div>
                </>
              )}

              {productCategory === 'business_os' && (
                <>
                  <div className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-blue-400 mt-0.5 shrink-0" />
                    <span className="font-semibold text-slate-100">{currentBusiness.seats} Team Operator Seats Included</span>
                  </div>
                  <div className="flex items-start gap-2 pl-4 text-slate-300 text-[11.5px]">
                    <span className="text-slate-500">↳</span>
                    <span>{currentBusiness.agentsCount} Active Autonomous Voice Personas</span>
                  </div>
                  <div className="flex items-start gap-2 pl-4 text-slate-300 text-[11.5px]">
                    <span className="text-slate-500">↳</span>
                    <span>{currentBusiness.voiceMinutes.toLocaleString()} Voice Calling Minutes / month</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-blue-400 mt-0.5 shrink-0" />
                    <span>Unified Lead &amp; Customer CRM + WhatsApp Automation</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-blue-400 mt-0.5 shrink-0" />
                    <span>{currentBusiness.trialDays}-Day Free Trial ({currentBusiness.trialMinutes} Minutes)</span>
                  </div>
                </>
              )}

              {productCategory === 'voice_fleet' && (
                <>
                  <div className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                    <span className="font-semibold text-slate-100">{currentVoice.agentsCount} Dedicated Voice Persona</span>
                  </div>
                  <div className="flex items-start gap-2 pl-4 text-slate-300 text-[11.5px]">
                    <span className="text-slate-500">↳</span>
                    <span>{currentVoice.voiceMinutes.toLocaleString()} Calling Minutes / month</span>
                  </div>
                  <div className="flex items-start gap-2 pl-4 text-slate-300 text-[11.5px]">
                    <span className="text-slate-500">↳</span>
                    <span>Sub-second voice latency in 150+ languages</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                    <span>Inbound Reception &amp; Outbound Automated Campaigns</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                    <span>03-Day Free Trial ({currentVoice.trialMinutes} Test Minutes)</span>
                  </div>
                </>
              )}

              {productCategory === 'exams' && (
                <>
                  <div className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-purple-400 mt-0.5 shrink-0" />
                    <span className="font-semibold text-slate-100">{currentExam.totalTests} Full-Length CBT Tests ({currentExam.totalQuestions.toLocaleString()} Questions total)</span>
                  </div>
                  <div className="flex items-start gap-2 pl-4 text-slate-300 text-[11.5px]">
                    <span className="text-slate-500">↳</span>
                    <span>{currentExam.validityDays} Days Complete Unlimited Portal Access</span>
                  </div>
                  <div className="flex items-start gap-2 pl-4 text-slate-300 text-[11.5px]">
                    <span className="text-slate-500">↳</span>
                    <span>Dynamic Question &amp; Option Shuffle on every attempt</span>
                  </div>
                  <div className="flex items-start gap-2 pl-4 text-slate-300 text-[11.5px]">
                    <span className="text-slate-500">↳</span>
                    <span>Official NTA / TCS-iON Style CBT Engine with Question Palette</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-purple-400 mt-0.5 shrink-0" />
                    <span>Instant Scorecard, All-India Rank (AIR) &amp; Percentile</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-purple-400 mt-0.5 shrink-0" />
                    <span>Official Watermarked Digital Marksheet &amp; PDF Export</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-purple-400 mt-0.5 shrink-0" />
                    <span>School (Class 1-10) + Central &amp; State Competitive Exams</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Side-by-Side Billing Selection Cards (Monthly vs Annually OR Exam Pass Card) */}
        <div className="px-5 pt-2 pb-3">
          {productCategory === 'exams' ? (
            <div className="p-4 rounded-2xl border bg-[#1a1c22]/90 border-purple-500/30 text-left relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="text-xs text-purple-300 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  {currentExam.badge}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {savingsText}
                </span>
              </div>
              <div className="flex items-baseline gap-2 mt-1.5">
                <span className="text-3xl font-bold text-white">
                  {sym}{(currency === 'USD' ? currentExam.priceUSD : currentExam.priceINR).toLocaleString()}
                </span>
                <span className="text-sm text-slate-500 line-through">
                  {sym}{(currency === 'USD' ? currentExam.priceUSD * 4 : currentExam.originalPriceINR).toLocaleString()}
                </span>
                <span className="text-xs text-slate-400 font-medium ml-auto">
                  One-time pass • {currentExam.validityDays} Days
                </span>
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                Instant Razorpay activation • Includes all {currentExam.totalTests} CBT mock tests &amp; official marksheet export
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {/* Monthly Card */}
              <button
                type="button"
                onClick={() => setBillingCycle('monthly')}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                  billingCycle === 'monthly'
                    ? 'bg-white/10 border-white/40 shadow-lg ring-1 ring-white/30'
                    : 'bg-[#1a1c22]/70 border-white/5 hover:border-white/20'
                }`}
              >
                <div className="text-xs text-slate-400 font-medium">Monthly</div>
                <div className="text-2xl font-bold text-white mt-1">
                  {sym}{monthlyPrice.toLocaleString()}
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">Billed monthly</div>
              </button>

              {/* Annually Card */}
              <button
                type="button"
                onClick={() => setBillingCycle('annually')}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer relative ${
                  billingCycle === 'annually'
                    ? 'bg-white/10 border-white/40 shadow-lg ring-1 ring-white/30'
                    : 'bg-[#1a1c22]/70 border-white/5 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-medium">Annually</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-blue-500/30 text-blue-300">
                    {savingsText}
                  </span>
                </div>
                <div className="flex items-baseline gap-1.5 mt-1">
                  <span className="text-2xl font-bold text-white">
                    {sym}{annualPrice.toLocaleString()}
                  </span>
                  <span className="text-xs text-slate-500 line-through">
                    {sym}{originalAnnualPrice.toLocaleString()}
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  ~{sym}{annualMonthlyRate.toLocaleString()}/mo • 2 Months Free
                </div>
              </button>
            </div>
          )}
        </div>

        {/* Action Button & Disclaimer */}
        <div className="px-5 pb-5 pt-1 space-y-3">
          <button
            type="button"
            disabled={isProcessing}
            onClick={handleLaunchCheckout}
            className="w-full py-3.5 px-5 rounded-2xl bg-white hover:bg-slate-200 active:scale-[0.99] text-slate-950 font-bold text-sm transition-all shadow-xl hover:shadow-2xl cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isProcessing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-slate-900" />
                <span>Launching Secure Gateway...</span>
              </>
            ) : (
              <>
                <span>
                  {productCategory === 'exams' 
                    ? `Activate ${currentExam.name.replace('Arohi Exams™ ', '')} (${sym}${finalCheckoutPrice})` 
                    : `Upgrade to ${planTitle}`}
                </span>
                <ArrowRight className="w-4 h-4 text-slate-900" />
              </>
            )}
          </button>

          {/* Service Guarantee & Terms */}
          <div className="text-center space-y-1.5 text-[10px] text-slate-400">
            <div>
              Auto-renewal, cancel anytime • Dedicated support:{' '}
              <a 
                href="mailto:contact@arohiai.com" 
                className="text-slate-300 hover:text-white underline font-semibold"
              >
                contact@arohiai.com
              </a>
            </div>

            <label className="inline-flex items-center gap-1.5 cursor-pointer text-[10px] text-slate-400 select-none">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="w-3.5 h-3.5 rounded accent-blue-500"
              />
              <span>By subscribing, you agree to the Arohi AI Paid Service Agreement</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
