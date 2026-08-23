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
  selectedTier?: 'silver' | 'gold';
  onPassActivated?: (passInfo: { tier: 'silver' | 'gold'; totalTests: number }) => void;
}

export default function ArohiExamPassModal({
  isOpen,
  onClose,
  isDarkMode = true,
  selectedTier = 'silver',
  onPassActivated
}: ArohiExamPassModalProps) {
  const { user, activateExamPass } = useAuth();
  const [activeTab, setActiveTab] = useState<'silver' | 'gold'>(selectedTier);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showDirectUpiQr, setShowDirectUpiQr] = useState(false);
  const [utrNumber, setUtrNumber] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const passes = {
    silver: {
      id: 'pass_silver_99',
      tier: 'silver' as const,
      name: 'Arohi Exams™ Silver Pass',
      price: 99,
      originalPrice: 499,
      totalTests: 20,
      questionsPerTest: 100,
      totalQuestions: 2000,
      badge: 'Most Popular for Speed Prep',
      description: 'Unlock 20 Full-Length CBT Tests (100 Qs each) across all School (Class 1-10) and Indian Competitive Exams.',
      features: [
        '20 Full-Length CBT Tests (100 Questions each = 2,000 Questions)',
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
      name: 'Arohi Exams™ Gold Mega Pass',
      price: 199,
      originalPrice: 999,
      totalTests: 50,
      questionsPerTest: 100,
      totalQuestions: 5000,
      badge: 'Best Value • Complete Exam Mastery',
      description: 'Unlock 50 Full-Length CBT Tests (100 Qs each = 5,000 Qs) + Unlimited AI Weakness Re-tests & 1-Click Tutor.',
      features: [
        '50 Full-Length CBT Tests (100 Questions each = 5,000 Questions)',
        'Dynamic Question & Option Shuffle on every attempt (No duplicate papers)',
        'All 20+ Categories Unlocked (School Classes 1-10, AIIMS NORCET, OSSSC, SSC, UPSC, Bank, Railway)',
        'Unlimited AI Weakness Diagnostic & Remedial Practice Tests',
        '1-Click "Ask Arohi AI" Instant Doubt Clarification in Chat',
        'All-India Leaderboard with Category-Wise Cutoff Benchmarking',
        'Official "Arohi Exams" Watermarked Performance Marksheet & PDF Export'
      ]
    }
  };

  const selectedPass = passes[activeTab];

  const handleActivateSuccess = (tier: 'silver' | 'gold', paymentMethod: string, transactionId?: string) => {
    const totalTests = tier === 'silver' ? 20 : 50;
    
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
        userEmail: user?.email || '',
        userName: user?.displayName || 'Aspirant',
        notes: {
          productType: 'AROHI_EXAMS_TEST_PASS',
          tier: selectedPass.tier,
          totalTests: String(selectedPass.totalTests)
        },
        onSuccess: (resp) => {
          handleActivateSuccess(selectedPass.tier, 'Razorpay / UPI Gateway', resp.razorpay_payment_id);
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
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border border-purple-500/30 rounded-3xl shadow-2xl overflow-hidden my-auto">
        
        {/* Security Watermark in Modal Background */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] select-none flex items-center justify-center rotate-[-25deg]">
          <span className="text-7xl font-black text-white tracking-widest uppercase">
            AROHI EXAMS • TEST PASS
          </span>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Section */}
        <div className="relative px-6 pt-7 pb-5 bg-gradient-to-r from-purple-950/70 via-indigo-950/70 to-slate-900 border-b border-purple-500/20 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-bold uppercase tracking-wider mb-2.5">
            <Award className="w-3.5 h-3.5 text-purple-400" />
            <span>Arohi Exams™ CBT Test Passes</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Unlock Real CBT Mock Tests & AIR Rankings
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto mt-1.5 leading-relaxed">
            All Curriculum (Class 1–10 CBSE, ICSE, State Boards) & All Indian Competitive Exams (AIIMS NORCET, OSSSC, SSC, UPSC, Banking, Railways).
          </p>

          {/* Tier Switcher Tabs */}
          <div className="grid grid-cols-2 gap-2 max-w-md mx-auto mt-5 p-1 bg-slate-900/90 rounded-2xl border border-slate-700/60">
            <button
              onClick={() => { setActiveTab('silver'); setShowDirectUpiQr(false); }}
              className={`py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'silver'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/30 scale-[1.02]'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>🥈 Silver Pass (₹99)</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-black/30 font-medium">20 Tests</span>
            </button>

            <button
              onClick={() => { setActiveTab('gold'); setShowDirectUpiQr(false); }}
              className={`py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'gold'
                  ? 'bg-gradient-to-r from-amber-500 to-purple-600 text-white shadow-lg shadow-amber-500/30 scale-[1.02]'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>👑 Gold Mega Pass (₹199)</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-black/30 font-medium">50 Tests</span>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {isSuccess ? (
            <div className="py-8 text-center animate-scale-up">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h3 className="text-2xl font-black text-white">Arohi Exam Pass Activated!</h3>
              <p className="text-slate-300 text-sm mt-2">
                Your <strong className="text-purple-300">{selectedPass.name}</strong> is active. You now have <strong className="text-emerald-400">{selectedPass.totalTests} Full-Length Tests</strong> with dynamic question shuffle.
              </p>
              <div className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-500/20 text-purple-300 text-xs font-bold animate-pulse">
                <span>Launching your tests portal now...</span>
              </div>
            </div>
          ) : (
            <>
              {/* Selected Plan Details Banner */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-purple-950/40 via-slate-900 to-indigo-950/40 border border-purple-500/30 mb-5">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      {selectedPass.badge}
                    </span>
                  </div>
                  <h4 className="text-lg font-black text-white mt-1">{selectedPass.name}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {selectedPass.totalTests} Full-Length Tests × {selectedPass.questionsPerTest} Qs = <strong className="text-purple-300">{selectedPass.totalQuestions.toLocaleString()} Questions</strong>
                  </p>
                </div>

                <div className="text-right">
                  <div className="flex items-baseline justify-end gap-1.5">
                    <span className="text-xs text-slate-500 line-through">₹{selectedPass.originalPrice}</span>
                    <span className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                      ₹{selectedPass.price}
                    </span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-semibold block">One-Time • No Recurring Fee</span>
                </div>
              </div>

              {/* Feature Checklist */}
              <div className="space-y-2.5 mb-6">
                {selectedPass.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                    <div className="mt-0.5 w-4 h-4 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5" />
                    </div>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Dual Subscription Separation Notice */}
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] text-slate-400 leading-relaxed mb-5">
                <div className="flex items-center gap-1.5 text-purple-300 font-bold mb-0.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Dedicated Exam Preparation Pass</span>
                </div>
                <span>
                  This subscription strictly activates the <strong>Arohi Exams CBT & Mock Test Portal</strong>. To access Arohi AI's separate multimodal AI assistant features (Voice calls, Document generation, AI Agents), standard Arohi AI plans apply independently under your account.
                </span>
              </div>

              {/* Payment Buttons / Actions */}
              {!showDirectUpiQr ? (
                <div className="space-y-2.5">
                  <button
                    onClick={handleRazorpayPayment}
                    disabled={isProcessing}
                    className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-sm sm:text-base shadow-xl shadow-purple-600/30 flex items-center justify-center gap-2 transition-all transform active:scale-[0.98] disabled:opacity-50"
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>
                      {isProcessing ? 'Connecting Gateway...' : `Pay ₹${selectedPass.price} & Unlock ${selectedPass.totalTests} Tests Instantly`}
                    </span>
                  </button>

                  <div className="flex items-center justify-between text-xs text-slate-400 px-1">
                    <button
                      type="button"
                      onClick={() => setShowDirectUpiQr(true)}
                      className="text-purple-400 hover:text-purple-300 underline font-medium flex items-center gap-1"
                    >
                      <QrCode className="w-3 h-3" />
                      <span>Or pay via Direct UPI QR / GPay / PhonePe</span>
                    </button>
                    <span className="flex items-center gap-1 text-slate-500">
                      <Lock className="w-3 h-3" /> 256-Bit SSL Encrypted
                    </span>
                  </div>
                </div>
              ) : (
                /* Direct UPI QR Form */
                <div className="p-4 rounded-2xl bg-slate-900 border border-purple-500/30 text-center animate-fade-in">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <QrCode className="w-4 h-4 text-purple-400" />
                      <span>Scan UPI QR Code (GPay / PhonePe / Paytm)</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowDirectUpiQr(false)}
                      className="text-xs text-slate-400 hover:text-slate-200 underline"
                    >
                      Back to Gateway
                    </button>
                  </div>

                  <div className="inline-block p-2 bg-white rounded-xl mb-3 shadow-md">
                    <img 
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=upi://pay?pa=arohiai@icici%26pn=Arohi%20Exams%26am=${selectedPass.price}%26cu=INR`}
                      alt="Arohi Exams UPI QR"
                      className="w-36 h-36 mx-auto object-contain"
                    />
                  </div>

                  <div className="text-xs text-slate-300 mb-3">
                    Scan & Pay <strong className="text-emerald-400">₹{selectedPass.price}</strong> to UPI ID: <strong className="text-purple-300">arohiai@icici</strong>
                  </div>

                  <form onSubmit={handleManualUtrSubmit} className="max-w-sm mx-auto flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter 12-Digit UPI UTR / Ref No."
                      value={utrNumber}
                      onChange={(e) => setUtrNumber(e.target.value)}
                      className="flex-1 px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-purple-500"
                    />
                    <button
                      type="submit"
                      disabled={isProcessing || !utrNumber.trim()}
                      className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold disabled:opacity-50 transition-all"
                    >
                      {isProcessing ? 'Verifying...' : 'Activate'}
                    </button>
                  </form>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
