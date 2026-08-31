import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, DollarSign, TrendingUp, Share2, Copy, Check, ArrowUpRight, 
  Wallet, Landmark, ShieldCheck, Sparkles, AlertCircle, ArrowRight, 
  Award, QrCode, MessageSquare, Send, RefreshCw, Filter, Search, 
  CheckCircle2, Clock, ChevronRight, Lock, LogOut, UserPlus, Gift,
  Download, ExternalLink, HelpCircle
} from 'lucide-react';
import { PartnerProfile, PartnerConversion, PartnerPayout, PartnerDashboardStats } from '../types/partner';

interface PartnerPortalProps {
  initialCode?: string | null;
  onNavigateHome?: () => void;
  onNavigatePricing?: () => void;
}

const STORAGE_PARTNER_SESSION_KEY = 'arohi_partner_session_code';
const STORAGE_PARTNER_PIN_KEY = 'arohi_partner_session_pin';

export default function PartnerPortal({ initialCode, onNavigateHome }: PartnerPortalProps) {
  // Authentication State
  const [partnerCode, setPartnerCode] = useState<string>(() => {
    return initialCode || localStorage.getItem(STORAGE_PARTNER_SESSION_KEY) || 'JUNOON1000';
  });
  const [loginIdentifier, setLoginIdentifier] = useState(initialCode || '');
  const [loginPin, setLoginPin] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return Boolean(localStorage.getItem(STORAGE_PARTNER_SESSION_KEY));
  });

  // Portal Data State
  const [partnerData, setPartnerData] = useState<PartnerProfile | null>(null);
  const [stats, setStats] = useState<PartnerDashboardStats['metrics'] | null>(null);
  const [conversions, setConversions] = useState<PartnerConversion[]>([]);
  const [payouts, setPayouts] = useState<PartnerPayout[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // UI Tabs & Modals
  const [activeTab, setActiveTab] = useState<'overview' | 'share' | 'ledger' | 'payouts' | 'simulator'>('overview');
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isPayoutModalOpen, setIsPayoutModalOpen] = useState(false);
  const [isBankModalOpen, setIsBankModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  // Form States
  const [applyForm, setApplyForm] = useState({
    name: '',
    email: '',
    phone: '',
    requestedCode: '',
    pin: '1000',
    upiId: '',
    targetStudents: 1000
  });

  const [payoutForm, setPayoutForm] = useState({
    amount: '',
    payoutMethod: 'UPI' as 'UPI' | 'Bank Transfer',
    payoutDetails: '',
    notes: ''
  });

  const [bankForm, setBankForm] = useState({
    upiId: '',
    accountHolderName: '',
    accountNumber: '',
    ifscCode: '',
    bankName: ''
  });

  // Search & Filter in Ledger
  const [ledgerSearch, setLedgerSearch] = useState('');
  const [ledgerFilter, setLedgerFilter] = useState<'all' | 'credited' | 'settled'>('all');

  // Simulator State
  const [simStudents, setSimStudents] = useState<number>(1000);
  const [simPlanPrice, setSimPlanPrice] = useState<number>(499); // ₹499 Exams Pass / Career Pro

  // Referral URL calculation
  const referralUrl = useMemo(() => {
    const code = partnerData?.referralCode || partnerCode || 'JUNOON1000';
    if (typeof window !== 'undefined') {
      return `${window.location.origin}/?ref=${code}`;
    }
    return `https://arohiai.com/?ref=${code}`;
  }, [partnerData?.referralCode, partnerCode]);

  // Load Partner Dashboard Data
  const loadPartnerStats = async (codeToFetch: string) => {
    if (!codeToFetch) return;
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const res = await fetch(`/api/partner/stats?code=${encodeURIComponent(codeToFetch)}`);
      if (res.ok) {
        const data = await res.json();
        setPartnerData(data.partner);
        setStats(data.metrics);
        setConversions(data.conversions || []);
        setPayouts(data.payouts || []);
        setIsLoggedIn(true);
        localStorage.setItem(STORAGE_PARTNER_SESSION_KEY, data.partner.referralCode);
        setBankForm({
          upiId: data.partner.bankDetails?.upiId || '',
          accountHolderName: data.partner.bankDetails?.accountHolderName || '',
          accountNumber: data.partner.bankDetails?.accountNumber || '',
          ifscCode: data.partner.bankDetails?.ifscCode || '',
          bankName: data.partner.bankDetails?.bankName || ''
        });
      } else {
        const err = await res.json();
        setErrorMessage(err.error || 'Could not load partner account.');
      }
    } catch (err: any) {
      console.warn('Fallback partner fetch:', err);
      // Resilient local state if network or server restart
      setErrorMessage('Using cached connection. Please verify login.');
    } finally {
      setIsLoading(false);
    }
  };

  // Initial load if session exists
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_PARTNER_SESSION_KEY);
    if (saved) {
      setPartnerCode(saved);
      loadPartnerStats(saved);
    } else if (initialCode) {
      setPartnerCode(initialCode);
      setLoginIdentifier(initialCode);
      loadPartnerStats(initialCode);
    }
  }, [initialCode]);

  // Handle Login
  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!loginIdentifier || !loginPin) {
      setErrorMessage('Please enter both your Referral Code/Email and PIN.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);
    try {
      const res = await fetch('/api/partner/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier: loginIdentifier, pin: loginPin })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setPartnerData(data.partner);
        setStats(data.stats.metrics);
        setConversions(data.stats.conversions || []);
        setPayouts(data.stats.payouts || []);
        setIsLoggedIn(true);
        localStorage.setItem(STORAGE_PARTNER_SESSION_KEY, data.partner.referralCode);
        localStorage.setItem(STORAGE_PARTNER_PIN_KEY, loginPin);
        setSuccessMessage(`Welcome back, ${data.partner.name}!`);
        setTimeout(() => setSuccessMessage(null), 4000);
      } else {
        setErrorMessage(data.error || 'Login failed. Please check your credentials.');
      }
    } catch (err: any) {
      setErrorMessage('Server connection error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Quick preset login helper
  const handleQuickLogin = (code: string, pin: string) => {
    setLoginIdentifier(code);
    setLoginPin(pin);
    loadPartnerStats(code);
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem(STORAGE_PARTNER_SESSION_KEY);
    localStorage.removeItem(STORAGE_PARTNER_PIN_KEY);
    setIsLoggedIn(false);
    setPartnerData(null);
    setStats(null);
    setLoginPin('');
  };

  // Handle Apply Registration
  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!applyForm.name || !applyForm.email) {
      setErrorMessage('Please fill in your name and email.');
      return;
    }
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const res = await fetch('/api/partner/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...applyForm,
          bankDetails: { upiId: applyForm.upiId }
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setPartnerData(data.partner);
        setStats(data.stats.metrics);
        setConversions(data.stats.conversions || []);
        setPayouts(data.stats.payouts || []);
        setIsLoggedIn(true);
        setIsApplyModalOpen(false);
        localStorage.setItem(STORAGE_PARTNER_SESSION_KEY, data.partner.referralCode);
        setSuccessMessage(`Partner ID ${data.partner.referralCode} activated with 15% commission!`);
        setTimeout(() => setSuccessMessage(null), 5000);
      } else {
        setErrorMessage(data.error || 'Application failed.');
      }
    } catch (err) {
      setErrorMessage('Error connecting to server.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Request Payout
  const handleRequestPayout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!payoutForm.amount || Number(payoutForm.amount) < 100) {
      setErrorMessage('Minimum payout withdrawal amount is ₹100.');
      return;
    }

    const currentBalance = stats?.unpaidCommissionBalance || 0;
    if (Number(payoutForm.amount) > currentBalance) {
      setErrorMessage(`Amount exceeds your available balance of ₹${currentBalance}.`);
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/partner/request-payout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          partnerCode: partnerData?.referralCode,
          amount: Number(payoutForm.amount),
          payoutMethod: payoutForm.payoutMethod,
          payoutDetails: payoutForm.payoutDetails || partnerData?.bankDetails?.upiId || 'UPI',
          notes: payoutForm.notes
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStats(data.stats.metrics);
        setPayouts(data.stats.payouts || []);
        setIsPayoutModalOpen(false);
        setPayoutForm({ amount: '', payoutMethod: 'UPI', payoutDetails: '', notes: '' });
        setSuccessMessage(data.message || 'Payout request submitted successfully!');
        setTimeout(() => setSuccessMessage(null), 5000);
      } else {
        setErrorMessage(data.error || 'Failed to submit payout request.');
      }
    } catch (err) {
      setErrorMessage('Server error submitting payout.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Save Bank Details
  const handleSaveBankDetails = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bankForm.upiId && !bankForm.accountNumber) {
      setErrorMessage('Please provide either a UPI ID or Bank Account Number.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/partner/bank-details', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          partnerCode: partnerData?.referralCode,
          bankDetails: bankForm
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        if (partnerData) {
          setPartnerData({ ...partnerData, bankDetails: bankForm });
        }
        setIsBankModalOpen(false);
        setSuccessMessage('Payment and bank details updated successfully!');
        setTimeout(() => setSuccessMessage(null), 4000);
      } else {
        setErrorMessage(data.error || 'Failed to save bank details.');
      }
    } catch (err) {
      setErrorMessage('Server connection error.');
    } finally {
      setIsLoading(false);
    }
  };

  // Copy referral link to clipboard
  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  // Copy referral code
  const handleCopyCode = () => {
    const code = partnerData?.referralCode || partnerCode;
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  // WhatsApp Share Message
  const handleWhatsAppShare = () => {
    const code = partnerData?.referralCode || partnerCode;
    const msg = encodeURIComponent(
      `🚀 *Join Arohi AI - India's #1 Opportunity & Exam Prep Engine!*\n\n` +
      `Prepare for CBSE, OPSC OAS, UPSC, SSC CGL & 100+ AI Tools (100/100 ATS Resumes, Voice Mock Interviews & DPRs).\n\n` +
      `🎁 *Use my Referral Code:* *${code}* to get *100% Coin Cashback* & Instant Access!\n\n` +
      `👉 Join here: ${referralUrl}`
    );
    window.open(`https://api.whatsapp.com/send?text=${msg}`, '_blank');
  };

  // Telegram Share Message
  const handleTelegramShare = () => {
    const msg = encodeURIComponent(`Join Arohi AI with code ${partnerData?.referralCode || partnerCode} for 100% Cashback & 100+ AI Tools!`);
    window.open(`https://t.me/share/url?url=${encodeURIComponent(referralUrl)}&text=${msg}`, '_blank');
  };

  // Filtered ledger
  const filteredConversions = useMemo(() => {
    return conversions.filter(c => {
      const matchSearch = 
        c.studentEmail.toLowerCase().includes(ledgerSearch.toLowerCase()) ||
        c.planName.toLowerCase().includes(ledgerSearch.toLowerCase()) ||
        (c.studentName && c.studentName.toLowerCase().includes(ledgerSearch.toLowerCase()));
      const matchFilter = ledgerFilter === 'all' || c.status === ledgerFilter;
      return matchSearch && matchFilter;
    });
  }, [conversions, ledgerSearch, ledgerFilter]);

  // Simulator dynamic calculations
  const projectedRevenue = simStudents * simPlanPrice;
  const projectedCommission = Math.round((projectedRevenue * 15) / 100);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-24 selection:bg-amber-500 selection:text-black">
      {/* Top Banner Navigation */}
      <header className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {onNavigateHome && (
              <button 
                onClick={onNavigateHome}
                className="text-xs font-semibold text-slate-400 hover:text-white px-2.5 py-1.5 rounded-lg border border-slate-800 hover:border-slate-700 transition-colors flex items-center gap-1.5"
              >
                ← Back to Main App
              </button>
            )}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center font-black text-black text-sm shadow-md shadow-amber-500/20">
                15%
              </div>
              <div>
                <span className="font-bold text-base text-white tracking-tight flex items-center gap-1.5">
                  Arohi AI <span className="text-amber-400 font-extrabold">Partner Hub</span>
                </span>
                <span className="hidden sm:inline-block text-[11px] text-slate-400 font-medium ml-2 border-l border-slate-700 pl-2">
                  Influencer & 1,000 Students Commission Portal
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isLoggedIn && partnerData ? (
              <div className="flex items-center gap-2 sm:gap-4">
                <div className="text-right hidden sm:block">
                  <div className="text-xs font-bold text-white flex items-center justify-end gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    {partnerData.name}
                  </div>
                  <div className="text-[11px] font-mono text-amber-400">
                    ID: {partnerData.referralCode} (15% Comm.)
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-950/40 rounded-lg border border-slate-800 transition-colors"
                  title="Logout from Partner Portal"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsApplyModalOpen(true)}
                className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold rounded-lg shadow-md shadow-amber-500/20 transition-all flex items-center gap-1.5"
              >
                <UserPlus className="w-3.5 h-3.5" />
                Become a Partner
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* Toast Notifications */}
        <AnimatePresence>
          {successMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-sm flex items-center justify-between shadow-lg"
            >
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="font-medium">{successMessage}</span>
              </div>
              <button onClick={() => setSuccessMessage(null)} className="text-emerald-400 hover:text-emerald-200 text-xs">Dismiss</button>
            </motion.div>
          )}

          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 p-4 rounded-xl bg-red-950/80 border border-red-500/40 text-red-300 text-sm flex items-center justify-between shadow-lg"
            >
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                <span className="font-medium">{errorMessage}</span>
              </div>
              <button onClick={() => setErrorMessage(null)} className="text-red-400 hover:text-red-200 text-xs">Dismiss</button>
            </motion.div>
          )}
        </AnimatePresence>

        {!isLoggedIn ? (
          /* ============================================================
             INFLUENCER LOGIN / UNIQUE ACCESS SCREEN
             ============================================================ */
          <div className="max-w-3xl mx-auto py-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-4">
                <Sparkles className="w-3.5 h-3.5" /> 15% Flat Cash Commission on Every Student & Payment
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Influencer &amp; Partner <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-200">Earnings Portal</span>
              </h1>
              <p className="mt-2 text-amber-400 font-mono text-xs font-bold tracking-wide">
                Direct Portal URL: <span className="underline select-all">arohiai.com/partners</span>
              </p>
              <p className="mt-2 text-slate-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
                Log in with your unique Partner Referral ID to view live student onboardings, track gross business, simulate revenue, and withdraw your 15% commission to UPI/Bank.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Partner Referral Code or Registered Email
                  </label>
                  <input
                    type="text"
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                    placeholder="e.g. JUNOON1000 or techguru@gmail.com"
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 font-mono text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all uppercase"
                    required
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                      Security PIN
                    </label>
                    <span className="text-[11px] text-slate-500">Default: 1000</span>
                  </div>
                  <input
                    type="password"
                    value={loginPin}
                    onChange={(e) => setLoginPin(e.target.value)}
                    placeholder="4-digit Security PIN"
                    maxLength={8}
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 font-mono text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-black font-bold text-sm rounded-xl shadow-lg shadow-amber-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" /> Verifying Credentials...
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" /> Log In to Partner Dashboard
                    </>
                  )}
                </button>
              </form>

              {/* Quick Demo Access Buttons */}
              <div className="mt-8 pt-6 border-t border-slate-800">
                <p className="text-xs text-slate-400 text-center font-medium mb-3">
                  Or test with an instant demo influencer account:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    onClick={() => handleQuickLogin('JUNOON1000', '1000')}
                    className="px-3 py-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/40 rounded-xl text-left transition-all text-xs"
                  >
                    <div className="font-bold text-amber-400 font-mono">JUNOON1000</div>
                    <div className="text-[10px] text-slate-400">Commander Junoon</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickLogin('STUDENT1000', '1000')}
                    className="px-3 py-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/40 rounded-xl text-left transition-all text-xs"
                  >
                    <div className="font-bold text-emerald-400 font-mono">STUDENT1000</div>
                    <div className="text-[10px] text-slate-400">Campus Ambassador</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickLogin('TECHGURU', '1234')}
                    className="px-3 py-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/40 rounded-xl text-left transition-all text-xs"
                  >
                    <div className="font-bold text-blue-400 font-mono">TECHGURU</div>
                    <div className="text-[10px] text-slate-400">Creator Network</div>
                  </button>
                </div>
              </div>

              <div className="mt-6 text-center">
                <button
                  type="button"
                  onClick={() => setIsApplyModalOpen(true)}
                  className="text-xs text-amber-400 hover:text-amber-300 font-semibold underline underline-offset-4"
                >
                  Don't have a Partner ID yet? Register as a New Influencer Partner →
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* ============================================================
             AUTHENTICATED PARTNER DASHBOARD
             ============================================================ */
          <div className="space-y-6">
            {/* Top Partner Identity & Quick Share Card */}
            <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 relative overflow-hidden shadow-xl">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-bold uppercase tracking-wider flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" /> Verified 15% Partner
                    </span>
                    <span className="text-xs text-slate-400">Active since {partnerData?.joinedAt ? new Date(partnerData.joinedAt).toLocaleDateString('en-GB') : 'August 2026'}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-white tracking-tight">
                    {partnerData?.name || 'Arohi Partner'}
                  </h2>
                  <p className="text-xs text-slate-400 mt-1 max-w-xl">
                    Every student signing up or purchasing a subscription with your referral code gives you a <strong className="text-amber-400">flat 15% lifetime cash commission</strong>.
                  </p>
                </div>

                {/* Quick Share Links */}
                <div className="bg-slate-950/80 border border-slate-800 p-3.5 rounded-xl flex flex-col sm:flex-row items-center gap-3">
                  <div className="text-left w-full sm:w-auto">
                    <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Your Referral Link</div>
                    <div className="font-mono text-xs text-amber-400 truncate max-w-[240px] font-semibold">
                      {referralUrl}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      onClick={handleCopyLink}
                      className="flex-1 sm:flex-none px-3 py-2 bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5"
                    >
                      {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      {copiedLink ? 'Copied!' : 'Copy Link'}
                    </button>
                    <button
                      onClick={handleWhatsAppShare}
                      className="px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5"
                      title="Share to WhatsApp"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">WhatsApp</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Metric KPI Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Card 1: 1,000 Students Target Progress */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 relative overflow-hidden">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Students Goal</span>
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                    <Users className="w-4 h-4" />
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-white">{stats?.totalStudents || 0}</span>
                  <span className="text-xs text-slate-400 font-medium">/ {stats?.targetStudents || 1000} Goal</span>
                </div>
                <div className="mt-3">
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-amber-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${stats?.targetProgressPercent || 0}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-medium">
                    <span>{stats?.targetProgressPercent || 0}% Completed</span>
                    <span>{(stats?.targetStudents || 1000) - (stats?.totalStudents || 0)} Remaining</span>
                  </div>
                </div>
              </div>

              {/* Card 2: Gross Business Generated */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 relative overflow-hidden">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Gross Business</span>
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-black text-white">
                  ₹{(stats?.totalGrossRevenue || 0).toLocaleString('en-IN')}
                </div>
                <div className="mt-2 text-xs text-slate-400">
                  Total student subscription & pass revenue generated
                </div>
              </div>

              {/* Card 3: Total 15% Commission Earned */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 relative overflow-hidden">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">15% Commission</span>
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                    <DollarSign className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-black text-amber-400">
                  ₹{(stats?.totalCommissionEarned || 0).toLocaleString('en-IN')}
                </div>
                <div className="mt-2 text-xs text-slate-400 flex items-center justify-between">
                  <span>Paid Out: ₹{(stats?.totalPaidOut || 0).toLocaleString('en-IN')}</span>
                  <span className="text-emerald-400 font-semibold">15% Fixed</span>
                </div>
              </div>

              {/* Card 4: Available Payout Balance */}
              <div className="bg-slate-900 border border-amber-500/30 rounded-2xl p-5 relative overflow-hidden bg-gradient-to-b from-slate-900 to-amber-950/20">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Available Balance</span>
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                    <Wallet className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-black text-white">
                  ₹{(stats?.unpaidCommissionBalance || 0).toLocaleString('en-IN')}
                </div>
                <div className="mt-3">
                  <button
                    onClick={() => {
                      setPayoutForm(prev => ({ ...prev, payoutDetails: partnerData?.bankDetails?.upiId || '' }));
                      setIsPayoutModalOpen(true);
                    }}
                    disabled={(stats?.unpaidCommissionBalance || 0) < 100}
                    className="w-full py-1.5 px-3 bg-amber-500 hover:bg-amber-400 disabled:bg-slate-800 disabled:text-slate-600 text-black font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" /> Request Payout
                  </button>
                </div>
              </div>
            </div>

            {/* Dashboard Sub-Tabs Navigation */}
            <div className="flex border-b border-slate-800 gap-2 overflow-x-auto pb-1">
              {[
                { id: 'overview', label: 'Overview & Targets', icon: Award },
                { id: 'share', label: 'Share & Marketing Kit', icon: Share2 },
                { id: 'ledger', label: `Conversion Ledger (${conversions.length})`, icon: DollarSign },
                { id: 'simulator', label: '15% Earning Calculator', icon: TrendingUp },
                { id: 'payouts', label: 'Payouts & Banking', icon: Landmark }
              ].map(tab => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-4 py-2.5 text-xs font-bold rounded-xl flex items-center gap-2 transition-all whitespace-nowrap ${
                      isActive
                        ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Tab 1: Overview & Targets */}
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  {/* Goal Milestone Card */}
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-base font-bold text-white flex items-center gap-2">
                          <Award className="w-4 h-4 text-amber-400" />
                          1,000 Students Milestone Tracker
                        </h3>
                        <p className="text-xs text-slate-400 mt-0.5">
                          Tiered rewards and commission settlements for your student onboarding drive.
                        </p>
                      </div>
                      <span className="text-xs font-bold text-amber-400 px-2.5 py-1 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                        15% Lifetime Cut
                      </span>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-300 font-semibold">Progress to 1,000 Students</span>
                        <span className="font-mono font-bold text-amber-400">{stats?.totalStudents || 0} / 1,000</span>
                      </div>
                      <div className="w-full bg-slate-950 h-3.5 rounded-full overflow-hidden border border-slate-800">
                        <div 
                          className="bg-gradient-to-r from-amber-500 via-orange-500 to-emerald-400 h-full rounded-full transition-all duration-700"
                          style={{ width: `${Math.max(4, stats?.targetProgressPercent || 0)}%` }}
                        />
                      </div>

                      {/* Milestone Badges */}
                      <div className="grid grid-cols-3 gap-3 pt-2">
                        <div className={`p-3 rounded-xl border text-center ${
                          (stats?.totalStudents || 0) >= 100 
                            ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300' 
                            : 'bg-slate-950 border-slate-800 text-slate-500'
                        }`}>
                          <div className="text-xs font-bold">100 Students</div>
                          <div className="text-[10px] mt-0.5">Silver Partner</div>
                        </div>
                        <div className={`p-3 rounded-xl border text-center ${
                          (stats?.totalStudents || 0) >= 500 
                            ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300' 
                            : 'bg-slate-950 border-slate-800 text-slate-500'
                        }`}>
                          <div className="text-xs font-bold">500 Students</div>
                          <div className="text-[10px] mt-0.5">Gold Partner</div>
                        </div>
                        <div className={`p-3 rounded-xl border text-center ${
                          (stats?.totalStudents || 0) >= 1000 
                            ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300' 
                            : 'bg-slate-950 border-slate-800 text-slate-500'
                        }`}>
                          <div className="text-xs font-bold">1,000 Students</div>
                          <div className="text-[10px] mt-0.5">Diamond Ambassador</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recent Conversions Stream */}
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-base font-bold text-white">Recent Conversions</h3>
                      <button 
                        onClick={() => setActiveTab('ledger')}
                        className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
                      >
                        View Full Ledger →
                      </button>
                    </div>

                    {conversions.length === 0 ? (
                      <div className="text-center py-8 text-slate-500 text-xs">
                        No conversions recorded yet. Share your referral link to start earning!
                      </div>
                    ) : (
                      <div className="space-y-2.5">
                        {conversions.slice(0, 5).map(conv => (
                          <div key={conv.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 flex items-center justify-between text-xs">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold font-mono">
                                15%
                              </div>
                              <div>
                                <div className="font-bold text-white">{conv.planName}</div>
                                <div className="text-[11px] text-slate-400 font-mono">{conv.studentEmail} • {new Date(conv.timestamp).toLocaleDateString('en-GB')}</div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-emerald-400">+₹{conv.commissionAmount}</div>
                              <div className="text-[10px] text-slate-500">Paid ₹{conv.amount}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Column: Banking & Fast Share */}
                <div className="space-y-6">
                  {/* Bank / UPI Summary Card */}
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-bold text-white flex items-center gap-2">
                        <Landmark className="w-4 h-4 text-amber-400" />
                        Payout Destination
                      </h3>
                      <button
                        onClick={() => setIsBankModalOpen(true)}
                        className="text-xs text-amber-400 hover:underline font-semibold"
                      >
                        Edit
                      </button>
                    </div>

                    <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-400">UPI ID:</span>
                        <span className="font-mono font-bold text-white">{partnerData?.bankDetails?.upiId || 'Not Configured'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Account Name:</span>
                        <span className="text-slate-200">{partnerData?.bankDetails?.accountHolderName || partnerData?.name || '-'}</span>
                      </div>
                      {partnerData?.bankDetails?.bankName && (
                        <div className="flex justify-between">
                          <span className="text-slate-400">Bank:</span>
                          <span className="text-slate-200">{partnerData.bankDetails.bankName}</span>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => setIsPayoutModalOpen(true)}
                      disabled={(stats?.unpaidCommissionBalance || 0) < 100}
                      className="mt-4 w-full py-2.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-black font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Wallet className="w-3.5 h-3.5" />
                      Withdraw ₹{(stats?.unpaidCommissionBalance || 0).toLocaleString('en-IN')}
                    </button>
                  </div>

                  {/* Why Partner with Arohi Callout */}
                  <div className="bg-gradient-to-br from-amber-950/30 to-orange-950/20 border border-amber-500/20 rounded-2xl p-5 text-xs space-y-2.5">
                    <div className="font-bold text-amber-400 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4" /> Partner Guarantee
                    </div>
                    <p className="text-slate-300 leading-relaxed">
                      All referrals are locked via persistent cookies & database attribution. Whenever your student renews or purchases additional exams passes, your 15% is automatically credited.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Share & Marketing Kit */}
            {activeTab === 'share' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  {/* Share Links Box */}
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <Share2 className="w-4 h-4 text-amber-400" />
                      Your Unique Referral Links
                    </h3>

                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase">
                        Direct Landing Referral URL
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          readOnly
                          value={referralUrl}
                          className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-amber-400 font-mono text-xs focus:outline-none"
                        />
                        <button
                          onClick={handleCopyLink}
                          className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs rounded-xl flex items-center gap-1.5 whitespace-nowrap transition-colors"
                        >
                          {copiedLink ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                          {copiedLink ? 'Copied' : 'Copy'}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase">
                        Referral Code (For Manual Entry at Checkout / Signup)
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          readOnly
                          value={partnerData?.referralCode || partnerCode}
                          className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono text-xs font-bold focus:outline-none"
                        />
                        <button
                          onClick={handleCopyCode}
                          className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 whitespace-nowrap transition-colors"
                        >
                          {copiedCode ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                          {copiedCode ? 'Copied' : 'Copy Code'}
                        </button>
                      </div>
                    </div>

                    {/* Social Quick Share Buttons */}
                    <div className="pt-2">
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2.5">
                        One-Click Social Broadcast
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        <button
                          onClick={handleWhatsAppShare}
                          className="py-2.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                        >
                          <MessageSquare className="w-4 h-4" /> WhatsApp
                        </button>
                        <button
                          onClick={handleTelegramShare}
                          className="py-2.5 px-3 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                        >
                          <Send className="w-4 h-4" /> Telegram
                        </button>
                        <button
                          onClick={() => {
                            const text = encodeURIComponent(`Prepare for UPSC, CBSE & Govt Exams with Arohi AI. Use code ${partnerData?.referralCode} for 100% cashback: ${referralUrl}`);
                            window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
                          }}
                          className="py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                        >
                          Twitter / X
                        </button>
                        <button
                          onClick={() => {
                            window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(referralUrl)}`, '_blank');
                          }}
                          className="py-2.5 px-3 bg-blue-700 hover:bg-blue-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                        >
                          LinkedIn
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Pre-written Copy Templates for Students */}
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                    <h3 className="text-base font-bold text-white">Ready-to-Use Post Templates</h3>
                    
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-amber-400 uppercase">Student & Exam Group Copy</span>
                        <button
                          onClick={() => {
                            const text = `🎯 *Crack Exams & Build 100/100 ATS Resumes with Arohi AI!*\n\nGet AI CBT Mock Tests, Unlimited Question Practice & Voice Mentorship.\n\nUse Code *${partnerData?.referralCode || partnerCode}* for 100% Coin Cashback: ${referralUrl}`;
                            navigator.clipboard.writeText(text);
                            setSuccessMessage('Student promo copy copied to clipboard!');
                            setTimeout(() => setSuccessMessage(null), 3000);
                          }}
                          className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1"
                        >
                          <Copy className="w-3 h-3" /> Copy Text
                        </button>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed font-sans">
                        🎯 <strong>Crack Exams & Build 100/100 ATS Resumes with Arohi AI!</strong><br />
                        Get AI CBT Mock Tests, Unlimited Question Practice & Voice Mentorship.<br />
                        Use Code <strong>{partnerData?.referralCode || partnerCode}</strong> for 100% Coin Cashback: {referralUrl}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Column: Visual QR Code & Partner ID badge */}
                <div className="space-y-6">
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 mx-auto flex items-center justify-center font-bold">
                      <QrCode className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Digital Referral Badge</h4>
                      <p className="text-xs text-slate-400 mt-1">Scan or screenshot to share on Instagram Stories or WhatsApp Status.</p>
                    </div>

                    <div className="p-4 bg-white rounded-xl max-w-[200px] mx-auto shadow-xl">
                      {/* Stylized QR Code placeholder representation */}
                      <div className="aspect-square bg-slate-900 rounded-lg flex flex-col items-center justify-center p-3 text-center">
                        <span className="text-[10px] font-black tracking-widest text-amber-400 uppercase font-mono">AROHI AI</span>
                        <div className="my-2 p-2 bg-amber-500 rounded text-black font-black text-xs font-mono">
                          {partnerData?.referralCode || partnerCode}
                        </div>
                        <span className="text-[9px] text-slate-300">15% Commission</span>
                      </div>
                    </div>

                    <div className="text-[11px] text-slate-400 font-mono">
                      Code: <strong className="text-amber-400">{partnerData?.referralCode || partnerCode}</strong>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Conversion Ledger */}
            {activeTab === 'ledger' && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-emerald-400" />
                      Live Student Conversion Ledger
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Detailed record of every student enrollment, plan purchase, and credited 15% commission.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Search student / plan..."
                        value={ledgerSearch}
                        onChange={(e) => setLedgerSearch(e.target.value)}
                        className="pl-8 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <select
                      value={ledgerFilter}
                      onChange={(e) => setLedgerFilter(e.target.value as any)}
                      className="px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-300 focus:outline-none"
                    >
                      <option value="all">All Status</option>
                      <option value="credited">Credited</option>
                      <option value="settled">Settled</option>
                    </select>
                  </div>
                </div>

                {filteredConversions.length === 0 ? (
                  <div className="text-center py-12 text-slate-500 text-xs">
                    No matching conversion records found.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider">
                          <th className="pb-3 font-semibold">Date & Time</th>
                          <th className="pb-3 font-semibold">Student</th>
                          <th className="pb-3 font-semibold">Plan / Pass</th>
                          <th className="pb-3 font-semibold text-right">Gross Paid</th>
                          <th className="pb-3 font-semibold text-right">Your 15% Commission</th>
                          <th className="pb-3 font-semibold text-center">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60">
                        {filteredConversions.map((conv) => (
                          <tr key={conv.id} className="hover:bg-slate-800/30 transition-colors">
                            <td className="py-3 font-mono text-slate-400">
                              {new Date(conv.timestamp).toLocaleDateString('en-GB')} {new Date(conv.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </td>
                            <td className="py-3">
                              <div className="font-semibold text-white">{conv.studentName || 'Student Aspirant'}</div>
                              <div className="font-mono text-[11px] text-slate-400">{conv.studentEmail}</div>
                            </td>
                            <td className="py-3">
                              <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[11px] font-medium">
                                {conv.planName}
                              </span>
                            </td>
                            <td className="py-3 text-right font-bold text-white">
                              ₹{conv.amount}
                            </td>
                            <td className="py-3 text-right font-bold text-emerald-400">
                              +₹{conv.commissionAmount}
                            </td>
                            <td className="py-3 text-center">
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                {conv.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* Tab 4: Simulator */}
            {activeTab === 'simulator' && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-amber-400" />
                    15% Commission Earning Simulator
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Calculate your projected earnings when onboarding 100, 500, 1,000, or more students.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-slate-950 p-6 rounded-2xl border border-slate-800">
                  <div className="space-y-5">
                    <div>
                      <div className="flex justify-between text-xs font-semibold text-slate-300 mb-2">
                        <span>Number of Students Referred</span>
                        <span className="text-amber-400 font-bold font-mono text-sm">{simStudents.toLocaleString('en-IN')} Students</span>
                      </div>
                      <input
                        type="range"
                        min="50"
                        max="5000"
                        step="50"
                        value={simStudents}
                        onChange={(e) => setSimStudents(Number(e.target.value))}
                        className="w-full accent-amber-500 bg-slate-800 cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                        <span>50 Students</span>
                        <span>1,000 Goal</span>
                        <span>5,000 Scale</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-2">
                        Average Plan / Pass Price
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { name: 'Monthly', price: 399 },
                          { name: 'Exams Pass', price: 499 },
                          { name: 'Yearly Pro', price: 999 }
                        ].map(tier => (
                          <button
                            key={tier.price}
                            type="button"
                            onClick={() => setSimPlanPrice(tier.price)}
                            className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                              simPlanPrice === tier.price
                                ? 'bg-amber-500 text-black border-amber-400'
                                : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                            }`}
                          >
                            <div>{tier.name}</div>
                            <div className="text-[10px] opacity-80">₹{tier.price}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Calculated Outcome Box */}
                  <div className="bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-slate-900 p-6 rounded-xl border border-amber-500/30 text-center space-y-3">
                    <div className="text-xs uppercase font-bold text-amber-400 tracking-wider">
                      Your Projected 15% Commission
                    </div>
                    <div className="text-4xl font-black text-white tracking-tight">
                      ₹{projectedCommission.toLocaleString('en-IN')}
                    </div>
                    <div className="text-xs text-slate-400">
                      from <strong className="text-white">₹{projectedRevenue.toLocaleString('en-IN')}</strong> total student subscriptions
                    </div>
                    <div className="pt-2 text-[11px] text-emerald-400 font-semibold flex items-center justify-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Instant weekly settlement to UPI / Bank
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 5: Payouts & Banking */}
            {activeTab === 'payouts' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Left Column: Request Payout Action */}
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <Wallet className="w-4 h-4 text-amber-400" />
                      Withdraw Commission
                    </h3>

                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <div className="text-xs text-slate-400">Available Payout Balance</div>
                      <div className="text-2xl font-black text-amber-400">
                        ₹{(stats?.unpaidCommissionBalance || 0).toLocaleString('en-IN')}
                      </div>
                    </div>

                    <button
                      onClick={() => setIsPayoutModalOpen(true)}
                      disabled={(stats?.unpaidCommissionBalance || 0) < 100}
                      className="w-full py-3 bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-black font-bold text-xs rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-1.5"
                    >
                      <ArrowUpRight className="w-4 h-4" /> Request Payout Now
                    </button>
                    <p className="text-[11px] text-slate-500 text-center">Minimum withdrawal: ₹100 • Processed in 24-48 hrs</p>
                  </div>

                  {/* Right 2 Columns: Payout History */}
                  <div className="md:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-bold text-white flex items-center gap-2">
                        <Clock className="w-4 h-4 text-blue-400" />
                        Payout History & Settlements
                      </h3>
                      <button
                        onClick={() => setIsBankModalOpen(true)}
                        className="text-xs text-amber-400 hover:underline font-semibold"
                      >
                        Update Banking Details
                      </button>
                    </div>

                    {payouts.length === 0 ? (
                      <div className="text-center py-8 text-slate-500 text-xs">
                        No payout withdrawal requests submitted yet.
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                          <thead>
                            <tr className="border-b border-slate-800 text-slate-400 text-[10px] uppercase font-semibold">
                              <th className="pb-2">Request Date</th>
                              <th className="pb-2">Amount</th>
                              <th className="pb-2">Method / Details</th>
                              <th className="pb-2">Status</th>
                              <th className="pb-2">UTR Ref</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-800/60">
                            {payouts.map(p => (
                              <tr key={p.id} className="hover:bg-slate-800/30">
                                <td className="py-3 font-mono text-slate-400">
                                  {new Date(p.requestedAt).toLocaleDateString('en-GB')}
                                </td>
                                <td className="py-3 font-bold text-white">
                                  ₹{p.amount.toLocaleString('en-IN')}
                                </td>
                                <td className="py-3 text-slate-300 font-mono text-[11px]">
                                  {p.payoutMethod} • {p.payoutDetails}
                                </td>
                                <td className="py-3">
                                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                    p.status === 'paid'
                                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                      : p.status === 'approved'
                                      ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                                      : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                  }`}>
                                    {p.status}
                                  </span>
                                </td>
                                <td className="py-3 font-mono text-[11px] text-slate-400">
                                  {p.utr || '-'}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* ============================================================
          MODAL 1: APPLY AS A NEW INFLUENCER PARTNER
          ============================================================ */}
      <AnimatePresence>
        {isApplyModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-500 text-black font-black flex items-center justify-center text-xs">
                    15%
                  </div>
                  <h3 className="text-lg font-bold text-white">Become an Arohi AI Partner</h3>
                </div>
                <button onClick={() => setIsApplyModalOpen(false)} className="text-slate-400 hover:text-white">✕</button>
              </div>

              <p className="text-xs text-slate-400 mb-5">
                Register as an official creator or campus partner. Get your custom referral link and earn a flat 15% lifetime cash commission on all student joins.
              </p>

              <form onSubmit={handleApply} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Full Name / Channel Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Mohanty or TechOdisha"
                    value={applyForm.name}
                    onChange={(e) => setApplyForm({ ...applyForm, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="you@gmail.com"
                      value={applyForm.email}
                      onChange={(e) => setApplyForm({ ...applyForm, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">WhatsApp / Phone</label>
                    <input
                      type="tel"
                      placeholder="+91 9876543210"
                      value={applyForm.phone}
                      onChange={(e) => setApplyForm({ ...applyForm, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">Desired Referral Code</label>
                    <input
                      type="text"
                      placeholder="e.g. ODISHA1000"
                      value={applyForm.requestedCode}
                      onChange={(e) => setApplyForm({ ...applyForm, requestedCode: e.target.value.toUpperCase() })}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-amber-400 font-mono font-bold focus:outline-none focus:border-amber-500 uppercase"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">4-Digit Security PIN</label>
                    <input
                      type="password"
                      maxLength={6}
                      value={applyForm.pin}
                      onChange={(e) => setApplyForm({ ...applyForm, pin: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">UPI ID for Commission Payouts (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. username@okhdfcbank or 9876543210@paytm"
                    value={applyForm.upiId}
                    onChange={(e) => setApplyForm({ ...applyForm, upiId: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono focus:outline-none focus:border-amber-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-black font-bold rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-1.5"
                >
                  {isLoading ? 'Creating Account...' : 'Activate Partner Account (15% Commission)'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ============================================================
          MODAL 2: REQUEST PAYOUT WITHDRAWAL
          ============================================================ */}
      <AnimatePresence>
        {isPayoutModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl relative"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Wallet className="w-4 h-4 text-amber-400" />
                  Request Commission Payout
                </h3>
                <button onClick={() => setIsPayoutModalOpen(false)} className="text-slate-400 hover:text-white">✕</button>
              </div>

              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 mb-4 text-xs">
                <div className="text-slate-400">Available Balance to Withdraw:</div>
                <div className="text-xl font-black text-amber-400 mt-0.5">
                  ₹{(stats?.unpaidCommissionBalance || 0).toLocaleString('en-IN')}
                </div>
              </div>

              <form onSubmit={handleRequestPayout} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Withdrawal Amount (₹)</label>
                  <input
                    type="number"
                    min="100"
                    max={stats?.unpaidCommissionBalance || 0}
                    required
                    placeholder="Enter amount (min ₹100)"
                    value={payoutForm.amount}
                    onChange={(e) => setPayoutForm({ ...payoutForm, amount: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono font-bold focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Payout Method</label>
                  <select
                    value={payoutForm.payoutMethod}
                    onChange={(e) => setPayoutForm({ ...payoutForm, payoutMethod: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none"
                  >
                    <option value="UPI">UPI Transfer</option>
                    <option value="Bank Transfer">NEFT / IMPS Bank Transfer</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    {payoutForm.payoutMethod === 'UPI' ? 'UPI ID' : 'Bank Account / IFSC / Holder Name'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={payoutForm.payoutMethod === 'UPI' ? 'user@okaxis' : 'A/C 123456789, IFSC: SBIN0001234'}
                    value={payoutForm.payoutDetails}
                    onChange={(e) => setPayoutForm({ ...payoutForm, payoutDetails: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono focus:outline-none focus:border-amber-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-xl shadow-lg shadow-amber-500/20 transition-all"
                >
                  {isLoading ? 'Submitting Request...' : 'Confirm Withdrawal Request'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ============================================================
          MODAL 3: EDIT BANKING & UPI DETAILS
          ============================================================ */}
      <AnimatePresence>
        {isBankModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl relative"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Landmark className="w-4 h-4 text-amber-400" />
                  Update Payout Banking Settings
                </h3>
                <button onClick={() => setIsBankModalOpen(false)} className="text-slate-400 hover:text-white">✕</button>
              </div>

              <form onSubmit={handleSaveBankDetails} className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">UPI ID (Primary / Instant)</label>
                  <input
                    type="text"
                    placeholder="e.g. name@okhdfcbank"
                    value={bankForm.upiId}
                    onChange={(e) => setBankForm({ ...bankForm, upiId: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="pt-2 border-t border-slate-800">
                  <span className="text-[11px] font-bold text-slate-400 uppercase">Or Direct Bank Account</span>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Beneficiary Name</label>
                  <input
                    type="text"
                    placeholder="Full Name as in Bank"
                    value={bankForm.accountHolderName}
                    onChange={(e) => setBankForm({ ...bankForm, accountHolderName: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">Account Number</label>
                    <input
                      type="text"
                      placeholder="Account No."
                      value={bankForm.accountNumber}
                      onChange={(e) => setBankForm({ ...bankForm, accountNumber: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">IFSC Code</label>
                    <input
                      type="text"
                      placeholder="e.g. SBIN0001234"
                      value={bankForm.ifscCode}
                      onChange={(e) => setBankForm({ ...bankForm, ifscCode: e.target.value.toUpperCase() })}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono focus:outline-none uppercase"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Bank Name & Branch</label>
                  <input
                    type="text"
                    placeholder="e.g. State Bank of India, Bhubaneswar"
                    value={bankForm.bankName}
                    onChange={(e) => setBankForm({ ...bankForm, bankName: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-xl shadow-lg shadow-amber-500/20 transition-all mt-2"
                >
                  {isLoading ? 'Saving...' : 'Save Bank Details'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
