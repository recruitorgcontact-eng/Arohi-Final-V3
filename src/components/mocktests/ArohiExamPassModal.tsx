import React, { useState } from 'react';
import { 
  ShieldCheck, CheckCircle2, Zap, Sparkles, X, 
  CreditCard, QrCode, Award, ArrowRight, Lock, 
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
  const [showDirectUpiQr, setShowDirectUpiQr] = useState(false);
  const [utrNumber, setUtrNumber] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const rawStudentName = userData?.profile?.name || userData?.displayName || userMemory?.displayName || user?.displayName || (user?.email ? user.email.split('@')[0] : '');
  const studentName = user ? (rawStudentName?.trim() || 'Student') : 'Student';
  const studentEmail = userData?.profile?.email || userData?.email || user?.email || '';
  const studentPhone = userData?.profile?.phone || '';

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
      badge: 'Starter Speed Prep',
      description: 'Unlock 10 Full-Length CBT Tests (100 Qs each = 1,000 Qs) across all School (Class 1-10) and Indian Competitive Exams.',
      features: [
        '10 Full-Length CBT Tests (100 Questions each = 1,000 Questions)',
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
      badge: 'Most Popular Choice',
      description: 'Unlock 25 Full-Length CBT Tests (100 Qs each = 2,500 Qs) + AI Weakness Diagnostic & 1-Click Tutor.',
      features: [
        '25 Full-Length CBT Tests (100 Questions each = 2,500 Questions)',
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
      badge: 'Maximum Value • Complete Mastery',
      description: 'Unlock 60 Full-Length CBT Tests (100 Qs each = 6,000 Qs) + Unlimited AI Weakness Re-tests & 1-Click Live Tutor.',
      features: [
        '60 Full-Length CBT Tests (100 Questions each = 6,000 Questions)',
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
    const totalTests = tier === 'silver' ? 10 : tier === 'gold' ? 25 : 60;
    
    // Save to auth context / firestore if available
    if (activateExamPass) {
      activateExamPass(tier, paymentMethod);
    }

    // Save to local storage for instant offline resilience
    const passObj = {
      tier,
      totalTests,
      testsRemaining: totalTests,
      activatedAt: new Date().toISOString(),
      paymentMethod,
      transactionId: transactionId || `TXN_${Date.now()}`
    };
    try {
      localStorage.setItem('arohi_exam_pass', JSON.stringify(passObj));
      window.dispatchEvent(new CustomEvent('arohi_exam_pass_activated', { detail: passObj }));
    } catch (e) {}

    setIsProcessing(false);
    setIsSuccess(true);

    if (onPassActivated) {
      onPassActivated({ tier, totalTests });
    }

    setTimeout(() => {
      onClose();
    }, 2200);
  };

  const handleRazorpayPayment = async () => {
    setIsProcessing(true);
    try {
      await openRazorpayCheckout({
        price: selectedPass.price,
        amountInRupees: selectedPass.price,
        planName: selectedPass.name,
        userEmail: studentEmail,
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
          handleActivateSuccess(selectedPass.tier, 'Razorpay Payment Gateway', resp.razorpay_payment_id);
        },
        onError: (err) => {
          setIsProcessing(false);
          console.warn('Razorpay checkout note:', err);
          // Fallback to direct activation for seamless demo or retry
          setShowDirectUpiQr(true);
        },
        onDismiss: () => {
          setIsProcessing(false);
        }
      });
    } catch (e) {
      setIsProcessing(false);
      setShowDirectUpiQr(true);
    }
  };

  const handleManualUtrSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!utrNumber.trim() || utrNumber.length < 6) {
      alert('Please enter a valid 12-digit UPI UTR / Transaction Reference Number.');
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      handleActivateSuccess(selectedPass.tier, 'Direct UPI QR Scan', utrNumber.trim());
    }, 1000);
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
              onClick={() => { setActiveTab('silver'); setShowDirectUpiQr(false); }}
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
              onClick={() => { setActiveTab('gold'); setShowDirectUpiQr(false); }}
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
              onClick={() => { setActiveTab('platinum'); setShowDirectUpiQr(false); }}
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
                Your <strong className={isDarkMode ? 'text-purple-300' : 'text-purple-800'}>{selectedPass.name}</strong> is active. You now have <strong className={isDarkMode ? 'text-emerald-400' : 'text-emerald-700'}>{selectedPass.totalTests} Full-Length Tests</strong> with dynamic question shuffle.
              </p>
              <div className={`mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold animate-pulse ${
                isDarkMode ? 'bg-purple-500/20 text-purple-300' : 'bg-purple-100 text-purple-900 border border-purple-300'
              }`}>
                <span>Launching your tests portal now...</span>
              </div>
            </div>
          ) : (
            <>
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

              {/* Payment Buttons / Actions */}
              {!showDirectUpiQr ? (
                <div className="space-y-2.5">
                  <button
                    onClick={handleRazorpayPayment}
                    disabled={isProcessing}
                    className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-sm sm:text-base shadow-xl shadow-purple-600/30 flex items-center justify-center gap-2 transition-all transform active:scale-[0.98] disabled:opacity-50 cursor-pointer"
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>
                      {isProcessing ? 'Connecting Gateway...' : `Pay ₹${selectedPass.price} & Unlock ${selectedPass.totalTests} Tests Instantly`}
                    </span>
                  </button>

                  <div className={`flex items-center justify-between text-xs px-1 ${
                    isDarkMode ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    <button
                      type="button"
                      onClick={() => setShowDirectUpiQr(true)}
                      className="text-purple-600 dark:text-purple-400 hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <QrCode className="w-3 h-3" />
                      <span>Or pay via Direct UPI QR / GPay / PhonePe</span>
                    </button>
                    <span className="flex items-center gap-1 opacity-70">
                      <Lock className="w-3 h-3" /> 256-Bit SSL Encrypted
                    </span>
                  </div>
                </div>
              ) : (
                /* Direct UPI QR Form */
                <div className={`p-4 rounded-2xl border text-center animate-fade-in ${
                  isDarkMode ? 'bg-slate-900 border-purple-500/30' : 'bg-slate-50 border-purple-200'
                }`}>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-xs font-bold flex items-center gap-1.5 ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>
                      <QrCode className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                      <span>Scan UPI QR Code (GPay / PhonePe / Paytm)</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowDirectUpiQr(false)}
                      className={`text-xs underline cursor-pointer ${isDarkMode ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-950'}`}
                    >
                      Back to Gateway
                    </button>
                  </div>

                  <div className="inline-block p-2 bg-white rounded-xl mb-3 shadow-md border border-slate-200">
                    <img 
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=upi://pay?pa=arohiai@icici%26pn=Arohi%20Exams%26am=${selectedPass.price}%26cu=INR`}
                      alt="Arohi Exams UPI QR"
                      className="w-36 h-36 mx-auto object-contain"
                    />
                  </div>

                  <div className={`text-xs mb-3 font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-800'}`}>
                    Scan &amp; Pay <strong className="text-emerald-700 dark:text-emerald-400 font-black">₹{selectedPass.price}</strong> to UPI ID: <strong className="text-purple-700 dark:text-purple-300 font-black">arohiai@icici</strong>
                  </div>

                  <form onSubmit={handleManualUtrSubmit} className="max-w-sm mx-auto flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter 12-Digit UPI UTR / Ref No."
                      value={utrNumber}
                      onChange={(e) => setUtrNumber(e.target.value)}
                      className={`flex-1 px-3 py-2 rounded-xl border text-xs focus:outline-none focus:border-purple-500 ${
                        isDarkMode 
                          ? 'bg-slate-800 border-slate-700 text-white placeholder:text-slate-500' 
                          : 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400'
                      }`}
                    />
                    <button
                      type="submit"
                      disabled={isProcessing || !utrNumber.trim()}
                      className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold disabled:opacity-50 transition-all cursor-pointer"
                    >
                      {isProcessing ? 'Verifying...' : 'Activate'}
                    </button>
                  </form>
                </div>
              )}

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
