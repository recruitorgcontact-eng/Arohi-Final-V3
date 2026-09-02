import React, { useState } from 'react';
import { 
  ShieldCheck, CheckCircle2, Zap, Sparkles, X, 
  CreditCard, Award, ArrowRight, Lock, 
  Check, Clock, BookOpen, AlertCircle, HelpCircle
} from 'lucide-react';
import { openRazorpayCheckout } from '../../lib/razorpay';
import { useAuth } from '../../context/AuthContext';

interface ArohiExamPassModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode?: boolean;
  selectedTier?: 'silver' | 'gold' | 'platinum';
  onPassActivated?: (passInfo: { tier: 'silver' | 'gold' | 'platinum'; totalTests: number }) => void;
}

export default function ArohiExamPassModal({
  isOpen,
  onClose,
  isDarkMode = true,
  selectedTier = 'silver',
  onPassActivated
}: ArohiExamPassModalProps) {
  const { user, userData, userMemory, activateExamPass } = useAuth();
  const [activeTab, setActiveTab] = useState<'silver' | 'gold' | 'platinum'>(selectedTier);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [localPass, setLocalPass] = useState<any>(() => {
    try {
      const stored = localStorage.getItem('arohi_exam_pass');
      return stored ? JSON.parse(stored) : null;
    } catch { return null; }
  });

  const activeUserPass = userData?.examPass || localPass;
  const isPassExpired = Boolean(activeUserPass?.expiresAt && new Date(activeUserPass.expiresAt).getTime() < Date.now());
  const currentRemaining = typeof activeUserPass?.testsRemaining === 'number'
    ? activeUserPass.testsRemaining
    : (activeUserPass ? (activeUserPass.totalTests || 10) : 0);
  const hasActiveUserPass = Boolean(activeUserPass && currentRemaining > 0 && !isPassExpired);

  const isSubscriber = Boolean(
    userData?.isSubscribed || 
    (userData?.subscriptionEndDate && userData.subscriptionEndDate > Date.now())
  );

  const rawStudentName = userData?.profile?.name || userData?.displayName || userMemory?.displayName || user?.displayName || (user?.email ? user.email.split('@')[0] : '');
  const studentName = user ? (rawStudentName?.trim() || 'Student') : 'Student';
  const studentEmail = userData?.profile?.email || userData?.email || user?.email || '';
  const studentPhone = userData?.profile?.phone || '';

  const handleClaimSubscriberPass = () => {
    handleActivateSuccess('silver', 'Bundled with Arohi Subscription (Free ₹99 Value)', `SUB_EXAMPASS_${Date.now()}`);
  };

  if (!isOpen) return null;

  const passes = {
    silver: {
      id: 'pass_silver_99',
      tier: 'silver' as const,
      name: 'Arohi Exams™ Starter Pass',
      price: 99,
      originalPrice: 499,
      totalTests: 10,
      questionsPerTest: 100,
      totalQuestions: 1000,
      validityDays: 30,
      badge: 'Starter Speed Prep (30 Days)',
      description: 'Unlock 10 Full-Length CBT Tests (100 Qs each = 1,000 Qs) across all School (Class 1-10) and Indian Competitive Exams.',
      features: [
        '10 Full-Length CBT Tests (100 Questions each = 1,000 Questions)',
        '30 Days Unlimited Portal Validity',
        'Dynamic Question & Option Shuffle on every single attempt',
        'Official Arohi CBT Engine with live countdown timer & question palette',
        'Instant Scorecard, All-India Rank (AIR) & Percentile Curve',
        'Official "Arohi Exams" Watermarked Digital Marksheet & PDF Export',
        'Access across School (Class 1-10 CBSE/ICSE/State) and All Competitive Exams'
      ]
    },
    gold: {
      id: 'pass_gold_199',
      tier: 'gold' as const,
      name: 'Arohi Exams™ Gold Pass',
      price: 199,
      originalPrice: 899,
      totalTests: 25,
      questionsPerTest: 100,
      totalQuestions: 2500,
      validityDays: 90,
      badge: 'Most Popular Choice (90 Days)',
      description: 'Unlock 25 Full-Length CBT Tests (100 Qs each = 2,500 Qs) + AI Weakness Diagnostic & 1-Click Tutor.',
      features: [
        '25 Full-Length CBT Tests (100 Questions each = 2,500 Questions)',
        '90 Days Unlimited Portal Validity',
        'Dynamic Question & Option Shuffle on every attempt (No duplicate papers)',
        'All Categories Unlocked (School Classes 1-10, AIIMS NORCET, OSSSC, SSC, UPSC, Bank, Railway)',
        'AI Weakness Diagnostic & Remedial Practice Reviews',
        '1-Click "Ask Arohi AI" Instant Doubt Clarification in Chat',
        'All-India Leaderboard with Category-Wise Cutoff Benchmarking',
        'Official "Arohi Exams" Watermarked Performance Marksheet & PDF Export'
      ]
    },
    platinum: {
      id: 'pass_platinum_299',
      tier: 'platinum' as const,
      name: 'Arohi Exams™ Platinum Mega Pass',
      price: 299,
      originalPrice: 1499,
      totalTests: 60,
      questionsPerTest: 100,
      totalQuestions: 6000,
      validityDays: 365,
      badge: 'Maximum Value • 1 Year (365 Days)',
      description: 'Unlock 60 Full-Length CBT Tests (100 Qs each = 6,000 Qs) + Unlimited AI Weakness Re-tests & 1-Click Live Tutor.',
      features: [
        '60 Full-Length CBT Tests (100 Questions each = 6,000 Questions)',
        '365 Days (1 Full Year) Complete Access Validity',
        'Dynamic Question & Option Shuffle on every attempt (Zero duplicates)',
        'All 20+ Categories Unlocked (School Classes 1-10, AIIMS, NEET, JEE, OPSC, SSC, UPSC, Bank, Railway)',
        'Unlimited AI Weakness Diagnostic, 7-Day Sprint Plans & Remedial Tests',
        '1-Click "Ask Arohi AI" Instant Doubt Clarification in Live Chat',
        'All-India Leaderboard with State & Category Cutoff Benchmarking',
        'Priority Evaluation with Official Watermarked Digital Certificate & PDF Export'
      ]
    }
  };

  const selectedPass = passes[activeTab];

  const handleActivateSuccess = (tier: 'silver' | 'gold' | 'platinum', paymentMethod: string, transactionId?: string) => {
    const totalTests = selectedPass.totalTests;
    const validityDays = selectedPass.validityDays;
    const activatedAt = new Date().toISOString();
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + validityDays);
    const expiresAt = expiryDate.toISOString();
    
    // Save to auth context / firestore if available
    if (activateExamPass) {
      activateExamPass(tier, paymentMethod, transactionId);
    }

    // Save to local storage for instant offline resilience
    const passObj = {
      tier,
      name: selectedPass.name,
      totalTests,
      testsRemaining: totalTests,
      testsUsed: 0,
      validityDays,
      activatedAt,
      expiresAt,
      paymentMethod,
      transactionId: transactionId || `TXN_${Date.now()}`
    };
    try {
      localStorage.setItem('arohi_exam_pass', JSON.stringify(passObj));
      setLocalPass(passObj);
      window.dispatchEvent(new CustomEvent('arohi_exam_pass_activated', { detail: passObj }));
    } catch (e) {}

    setIsProcessing(false);
    setIsSuccess(true);
    setErrorMessage(null);

    if (onPassActivated) {
      onPassActivated({ tier, totalTests });
    }

    setTimeout(() => {
      onClose();
    }, 2200);
  };

  const handleRazorpayPayment = async () => {
    setErrorMessage(null);
    setIsProcessing(true);
    try {
      await openRazorpayCheckout({
        price: selectedPass.price,
        amountInRupees: selectedPass.price,
        planName: selectedPass.name,
        userEmail: studentEmail || 'student@arohiai.com',
        userName: studentName,
        userPhone: studentPhone,
        notes: {
          productType: 'AROHI_EXAMS_TEST_PASS',
          tier: selectedPass.tier,
          totalTests: String(selectedPass.totalTests),
          candidateName: studentName,
          candidateEmail: studentEmail,
          userId: user?.uid || 'guest'
        },
        onSuccess: (resp) => {
          handleActivateSuccess(selectedPass.tier, 'Razorpay Gateway', resp.razorpay_payment_id);
        },
        onError: (err) => {
          setIsProcessing(false);
          const errText = err?.message || err?.description || 'Razorpay transaction was not completed.';
          console.warn('Razorpay payment error:', errText);
          setErrorMessage(errText);
        },
        onDismiss: () => {
          setIsProcessing(false);
        }
      });
    } catch (e: any) {
      setIsProcessing(false);
      const msg = e?.message || 'Payment was cancelled or could not be initiated.';
      setErrorMessage(msg);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className={`relative w-full max-w-2xl border rounded-3xl shadow-2xl overflow-hidden my-auto ${
        isDarkMode 
          ? 'bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border-purple-500/30' 
          : 'bg-white border-purple-200 text-slate-900'
      }`}>
        
        {/* Security Watermark in Modal Background */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] select-none flex items-center justify-center rotate-[-25deg]">
          <span className={`text-7xl font-black tracking-widest uppercase ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>
            AROHI EXAMS • TEST PASS
          </span>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 z-20 p-2 rounded-full transition-all cursor-pointer ${
            isDarkMode 
              ? 'bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white' 
              : 'bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 shadow-sm'
          }`}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Section */}
        <div className={`relative px-6 pt-7 pb-5 border-b text-center ${
          isDarkMode 
            ? 'bg-gradient-to-r from-purple-950/70 via-indigo-950/70 to-slate-900 border-purple-500/20' 
            : 'bg-gradient-to-r from-purple-50 via-indigo-50 to-slate-50 border-purple-200'
        }`}>
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2.5 ${
            isDarkMode 
              ? 'bg-purple-500/10 border border-purple-500/30 text-purple-300' 
              : 'bg-purple-100 border border-purple-300 text-purple-900'
          }`}>
            <Award className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            <span>Arohi Exams™ CBT Test Passes</span>
          </div>

          <h2 className={`text-2xl sm:text-3xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>
            Unlock Real CBT Mock Tests &amp; AIR Rankings
          </h2>
          <p className={`text-xs sm:text-sm max-w-lg mx-auto mt-1.5 leading-relaxed font-medium ${
            isDarkMode ? 'text-slate-300' : 'text-slate-700'
          }`}>
            All Curriculum (Class 1–10 CBSE, ICSE, State Boards) &amp; All Indian Competitive Exams (AIIMS NORCET, OSSSC, SSC, UPSC, Banking, Railways).
          </p>

          {/* Tier Switcher Tabs */}
          <div className={`grid grid-cols-3 gap-1.5 max-w-lg mx-auto mt-5 p-1 rounded-2xl border ${
            isDarkMode ? 'bg-slate-900/90 border-slate-700/60' : 'bg-slate-100 border-slate-300'
          }`}>
            <button
              type="button"
              onClick={() => setActiveTab('silver')}
              className={`py-2 px-2 rounded-xl font-bold text-xs transition-all flex flex-col sm:flex-row items-center justify-center gap-1 cursor-pointer ${
                activeTab === 'silver'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/30 scale-[1.02]'
                  : isDarkMode ? 'text-slate-400 hover:text-slate-200' : 'text-slate-700 hover:text-slate-950 font-bold'
              }`}
            >
              <span>🥈 ₹99 Pass</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/25 font-semibold">10 Tests</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('gold')}
              className={`py-2 px-2 rounded-xl font-bold text-xs transition-all flex flex-col sm:flex-row items-center justify-center gap-1 cursor-pointer ${
                activeTab === 'gold'
                  ? 'bg-gradient-to-r from-amber-500 to-purple-600 text-white shadow-lg shadow-amber-500/30 scale-[1.02]'
                  : isDarkMode ? 'text-slate-400 hover:text-slate-200' : 'text-slate-700 hover:text-slate-950 font-bold'
              }`}
            >
              <span>👑 ₹199 Pass</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/25 font-semibold">25 Tests</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('platinum')}
              className={`py-2 px-2 rounded-xl font-bold text-xs transition-all flex flex-col sm:flex-row items-center justify-center gap-1 cursor-pointer ${
                activeTab === 'platinum'
                  ? 'bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white shadow-lg shadow-cyan-500/30 scale-[1.02]'
                  : isDarkMode ? 'text-slate-400 hover:text-slate-200' : 'text-slate-700 hover:text-slate-950 font-bold'
              }`}
            >
              <span>💎 ₹299 Pass</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/25 font-semibold">60 Tests</span>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {isSuccess ? (
            <div className="py-8 text-center animate-scale-up">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h3 className={`text-2xl font-black ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>Arohi Exam Pass Activated!</h3>
              <p className={`text-sm mt-2 font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                Your <strong className={isDarkMode ? 'text-purple-300' : 'text-purple-800'}>{selectedPass.name}</strong> is active. You now have <strong className={isDarkMode ? 'text-emerald-400' : 'text-emerald-700'}>{selectedPass.totalTests} Full-Length Tests</strong> ({selectedPass.validityDays} Days Validity) with dynamic question shuffle.
              </p>
              <div className={`mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold animate-pulse ${
                isDarkMode ? 'bg-purple-500/20 text-purple-300' : 'bg-purple-100 text-purple-900 border border-purple-300'
              }`}>
                <span>Launching your tests portal now...</span>
              </div>
            </div>
          ) : (
            <>
              {/* Subscriber Included Banner */}
              {isSubscriber && (
                <div className={`mb-5 p-4 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                  isDarkMode 
                    ? 'bg-gradient-to-r from-amber-950/40 via-purple-950/40 to-slate-900 border-amber-500/40 text-amber-200' 
                    : 'bg-gradient-to-r from-amber-50 via-purple-50 to-slate-50 border-amber-300 text-amber-950'
                }`}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xl shrink-0">
                      🎁
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-black text-sm">Arohi Subscriber Benefit: ₹99 Pass FREE</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-500 text-slate-950 uppercase">
                          Included
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 dark:text-slate-400 mt-0.5">
                        Your active Arohi AI subscription includes 10 full-length CBT tests (₹99 value) automatically.
                      </p>
                    </div>
                  </div>
                  {!hasActiveUserPass && (
                    <button
                      type="button"
                      onClick={handleClaimSubscriberPass}
                      className="px-4 py-2 rounded-xl text-xs font-black bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 hover:brightness-110 shadow-lg cursor-pointer shrink-0 transition-all active:scale-95"
                    >
                      ⚡ Activate Free Pass
                    </button>
                  )}
                </div>
              )}

              {/* Existing Active Pass Status Banner */}
              {hasActiveUserPass && (
                <div className={`mb-5 p-3.5 sm:p-4 rounded-2xl border flex items-center justify-between gap-3 ${
                  isDarkMode 
                    ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300' 
                    : 'bg-emerald-50 border-emerald-300 text-emerald-950'
                }`}>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-lg">
                      👑
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-black text-xs sm:text-sm">Active: {activeUserPass?.name}</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-600 text-white uppercase">
                          {currentRemaining} of {activeUserPass?.totalTests || 10} Left
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        {activeUserPass?.expiresAt 
                          ? `Valid until ${new Date(activeUserPass.expiresAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}` 
                          : 'Valid for full session'} • Top-up or upgrade below anytime.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Selected Plan Details Banner */}
              <div className={`flex items-center justify-between p-4 rounded-2xl border mb-5 ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-purple-950/40 via-slate-900 to-indigo-950/40 border-purple-500/30' 
                  : 'bg-gradient-to-r from-purple-50 via-slate-50 to-indigo-50 border-purple-200'
              }`}>
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-md border ${
                      isDarkMode 
                        ? 'bg-purple-500/20 text-purple-300 border-purple-500/30' 
                        : 'bg-purple-100 text-purple-900 border-purple-300'
                    }`}>
                      {selectedPass.badge}
                    </span>
                  </div>
                  <h4 className={`text-lg font-black mt-1 ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>{selectedPass.name}</h4>
                  <p className={`text-xs mt-0.5 font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>
                    {selectedPass.totalTests} Full-Length Tests × {selectedPass.questionsPerTest} Qs = <strong className={isDarkMode ? 'text-purple-300' : 'text-purple-900'}>{selectedPass.totalQuestions.toLocaleString()} Questions</strong>
                  </p>
                </div>

                <div className="text-right">
                  <div className="flex items-baseline justify-end gap-1.5">
                    <span className={`text-xs line-through ${isDarkMode ? 'text-slate-500' : 'text-slate-500'}`}>₹{selectedPass.originalPrice}</span>
                    <span className="text-2xl sm:text-3xl font-black text-emerald-700 dark:text-emerald-400">
                      ₹{selectedPass.price}
                    </span>
                  </div>
                  <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-bold block">One-Time • No Recurring Fee</span>
                </div>
              </div>

              {/* Feature Checklist */}
              <div className="space-y-2.5 mb-6">
                {selectedPass.features.map((feat, idx) => (
                  <div key={idx} className={`flex items-start gap-2.5 text-xs sm:text-sm font-medium ${
                    isDarkMode ? 'text-slate-200' : 'text-slate-800'
                  }`}>
                    <div className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${
                      isDarkMode ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-700'
                    }`}>
                      <Check className="w-2.5 h-2.5" />
                    </div>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Dual Subscription Separation Notice */}
              <div className={`p-3 rounded-xl border text-[11px] leading-relaxed mb-5 ${
                isDarkMode 
                  ? 'bg-slate-900/80 border-slate-800 text-slate-400' 
                  : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}>
                <div className={`flex items-center gap-1.5 font-bold mb-0.5 ${
                  isDarkMode ? 'text-purple-300' : 'text-purple-900'
                }`}>
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Dedicated Exam Preparation Pass</span>
                </div>
                <span>
                  This subscription strictly activates the <strong>Arohi Exams CBT &amp; Mock Test Portal</strong>. To access Arohi AI's separate multimodal AI assistant features (Voice calls, Document generation, AI Agents), standard Arohi AI plans apply independently under your account.
                </span>
              </div>

              {/* Error Message Notice */}
              {errorMessage && (
                <div className="mb-4 p-3 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs flex items-start gap-2 animate-shake">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-bold">Payment Notification</p>
                    <p className="mt-0.5">{errorMessage}</p>
                  </div>
                  <button 
                    onClick={() => setErrorMessage(null)} 
                    className="text-rose-400 hover:text-rose-200"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* Exclusive Razorpay Payment Action */}
              <div className="space-y-3">
                <button
                  onClick={handleRazorpayPayment}
                  disabled={isProcessing}
                  className="w-full py-4 px-5 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-sm sm:text-base shadow-xl shadow-purple-600/30 flex items-center justify-center gap-2.5 transition-all transform active:scale-[0.98] disabled:opacity-50 cursor-pointer"
                >
                  <CreditCard className="w-5 h-5" />
                  <span>
                    {isProcessing ? 'Opening Razorpay Gateway...' : `Pay ₹${selectedPass.price} via Razorpay Checkout`}
                  </span>
                </button>

                <div className={`flex flex-wrap items-center justify-between gap-2 text-xs px-1 ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  <span className="flex items-center gap-1.5 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Razorpay Standard Checkout (UPI, Cards, NetBanking, Wallets)</span>
                  </span>
                  <span className="flex items-center gap-1 opacity-70">
                    <Lock className="w-3 h-3" /> 256-Bit SSL Encrypted
                  </span>
                </div>
              </div>

              {/* Free Plan Policy Info Banner */}
              <div className={`mt-4 p-3 rounded-2xl border text-center text-xs flex items-center justify-between gap-2 ${
                isDarkMode 
                  ? 'bg-slate-900/60 border-slate-800 text-slate-400' 
                  : 'bg-slate-50 border-slate-200 text-slate-600'
              }`}>
                <div className="flex items-center gap-2 text-left">
                  <span className="text-base">🎁</span>
                  <span>
                    <strong>Free Plan Policy:</strong> Every student can attend up to <strong>5 free tests</strong> across all categories. Passes unlock unlimited dynamic practice.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline shrink-0"
                >
                  Continue Free
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
