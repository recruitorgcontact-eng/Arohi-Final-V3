import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { 
  X, 
  Mail, 
  Lock, 
  User, 
  Sparkles, 
  Loader2, 
  AlertCircle,
  CheckCircle2,
  Phone,
  Smartphone,
  ChevronLeft,
  ChevronRight,
  Fingerprint,
  Check,
  Tag,
  RefreshCw,
  GraduationCap,
  Rocket,
  Briefcase,
  Users,
  TrendingUp,
  Target,
  Bot
} from 'lucide-react';
import { auth } from '../firebase';
import { RecaptchaVerifier } from 'firebase/auth';
import { isBiometricSupported } from '../lib/webauthn';
import { PRICING_TIERS } from '../data/pricingData';
import { LottieSuccessAnimation } from './LottieSuccess';
import ArohiAvatar from './ArohiAvatar';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'signin' | 'signup' | 'forgot' | 'phone' | 'onboarding';
  upgradePrompt?: string | null;
}

const ORBIT_NODES = [
  { id: 'learn', label: 'Learn', icon: GraduationCap, color: '#c084fc', border: 'rgba(192, 132, 252, 0.6)', glow: 'rgba(192, 132, 252, 0.4)' },
  { id: 'build', label: 'Build', icon: Rocket, color: '#fbbf24', border: 'rgba(251, 191, 36, 0.6)', glow: 'rgba(251, 191, 36, 0.4)' },
  { id: 'work', label: 'Work', icon: Briefcase, color: '#22d3ee', border: 'rgba(34, 211, 238, 0.6)', glow: 'rgba(34, 211, 238, 0.4)' },
  { id: 'connect', label: 'Connect', icon: Users, color: '#60a5fa', border: 'rgba(96, 165, 250, 0.6)', glow: 'rgba(96, 165, 250, 0.4)' },
  { id: 'grow', label: 'Grow', icon: TrendingUp, color: '#f472b6', border: 'rgba(244, 114, 182, 0.6)', glow: 'rgba(244, 114, 182, 0.4)' },
  { id: 'achieve', label: 'Achieve', icon: Target, color: '#a855f7', border: 'rgba(168, 85, 247, 0.6)', glow: 'rgba(168, 85, 247, 0.4)' }
];

export default function AuthModal({ isOpen, onClose, initialMode = 'signin', upgradePrompt }: AuthModalProps) {
  const { 
    signIn, 
    signUp, 
    signInWithGoogle, 
    signInWithApple, 
    signInWithPhone, 
    resetPassword,
    signInWithBiometrics,
    userData,
    updateUserProfile
  } = useAuth();

  // 'portal' = the luxury hero landing screen matching the reference design
  // 'email_form' = detailed email / password form (toggle signin/signup)
  // 'phone' = phone OTP verification
  // 'forgot' = forgot password
  // 'onboarding' = mandatory profile setup
  const [viewState, setViewState] = useState<'portal' | 'email_form' | 'phone' | 'forgot' | 'onboarding'>(
    initialMode === 'phone' ? 'phone' : initialMode === 'onboarding' ? 'onboarding' : 'portal'
  );

  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>(
    initialMode === 'signup' ? 'signup' : 'signin'
  );

  useEffect(() => {
    if (isOpen) {
      if (initialMode === 'phone') {
        setViewState('phone');
      } else if (initialMode === 'onboarding') {
        setViewState('onboarding');
      } else if (initialMode === 'signup') {
        setActiveTab('signup');
        setViewState('portal');
      } else {
        setActiveTab('signin');
        setViewState('portal');
      }
    }
  }, [isOpen, initialMode]);

  const [role, setRole] = useState<'candidate' | 'recruiter'>('candidate');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [selectedPlanName, setSelectedPlanName] = useState<string>('Starter Plan');
  const [onboardName, setOnboardName] = useState('');
  const [onboardPhone, setOnboardPhone] = useState('');

  // Coupon / Promo Code State
  const [authCouponInput, setAuthCouponInput] = useState('');
  const [authCouponError, setAuthCouponError] = useState('');
  const [authCouponSuccess, setAuthCouponSuccess] = useState('');
  const [isApplyingAuthCoupon, setIsApplyingAuthCoupon] = useState(false);

  const handleApplyAuthCoupon = () => {
    const cleanCode = authCouponInput.trim().toUpperCase();
    if (!cleanCode) {
      setAuthCouponError('Please enter a valid coupon code.');
      return;
    }

    setIsApplyingAuthCoupon(true);
    setAuthCouponError('');
    setAuthCouponSuccess('');

    setTimeout(() => {
      setIsApplyingAuthCoupon(false);
      if (cleanCode === 'JUNOON' || cleanCode === 'JUNOON399' || cleanCode === 'AROHI399' || cleanCode === 'PRO399') {
        setSelectedPlanName('Starter Plan');
        try {
          localStorage.setItem('arohi_applied_coupon', cleanCode);
          localStorage.setItem('arohi_subscriptions', JSON.stringify({ path1: true }));
        } catch (e) {}

        setAuthCouponSuccess(`🎉 Coupon "${cleanCode}" applied! Starter Plan (₹399/mo) activated.`);
        setAuthCouponInput('');
      } else {
        setAuthCouponError('Invalid coupon code. Please check and try again.');
      }
    }, 400);
  };

  useEffect(() => {
    if (viewState === 'onboarding' && userData) {
      if (!onboardName) {
        if (userData.profile?.name && userData.profile.name !== 'Honored Guest') {
          setOnboardName(userData.profile.name);
        } else if (userData.displayName && userData.displayName !== 'Honored Guest') {
          setOnboardName(userData.displayName);
        }
      }
      
      if (!onboardPhone) {
        const currentPhone = userData.profile?.phone || '';
        const isPhoneDefault = currentPhone === '+91 98765 43210' || currentPhone === '9876543210' || currentPhone === '';
        if (!isPhoneDefault) {
          setOnboardPhone(currentPhone.replace(/^\+91\s*/, '').replace(/\s+/g, ''));
        }
      }
    }
  }, [viewState, userData, onboardName, onboardPhone]);

  // Biometric Auth Support States
  const [isBioSupported, setIsBioSupported] = useState(false);
  const [hasEnrolledKey, setHasEnrolledKey] = useState(false);

  useEffect(() => {
    async function checkSupport() {
      const supported = await isBiometricSupported();
      setIsBioSupported(supported);
    }
    if (isOpen) {
      checkSupport();
    }
  }, [isOpen]);

  useEffect(() => {
    if (email) {
      const enrolled = !!localStorage.getItem(`recruit_biometric_${email.trim().toLowerCase()}`);
      setHasEnrolledKey(enrolled);
    } else {
      setHasEnrolledKey(false);
    }
  }, [email]);

  const handleBiometricLogin = async () => {
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setError("Please input your email address first to login using biometric scanners.");
      return;
    }
    setError(null);
    setSuccess(null);
    setIsLoading(true);
    try {
      await signInWithBiometrics(trimmedEmail);
      setSuccess("⚡ Cryptographic signature matched! Logging in securely...");
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Fingerprint / Face ID verification was rejected or cancelled.");
    } finally {
      setIsLoading(false);
    }
  };
  
  // Phone sign-in states
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState<any>(null);
  const [recaptchaVerifier, setRecaptchaVerifier] = useState<any>(null);

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    return () => {
      if (recaptchaVerifier) {
        try {
          recaptchaVerifier.clear();
        } catch (e) {
          console.warn('Error clearing recaptcha', e);
        }
      }
    };
  }, [recaptchaVerifier]);

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    setError(null);
    setSuccess(null);
    setIsLoading(true);
    try {
      await signInWithGoogle(role);
      setSuccess(`Successfully authenticated! Welcome to Arohi AI.`);
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (err: any) {
      const errCode = err?.code || '';
      const errMsg = err?.message || '';
      const isPopupClosed = 
        errCode === 'auth/popup-closed-by-user' || 
        errMsg.includes('popup-closed-by-user') || 
        errCode === 'auth/cancelled-popup-request' ||
        errMsg.includes('cancelled-popup-request');

      if (isPopupClosed) {
        console.info('Google Sign-In pop-up was closed by user.');
        setError('Google Sign-In was cancelled. If pop-ups are blocked, click "Open in New Tab" at the top-right to sign in easily!');
      } else {
        console.error('Google Sign-In error:', err);
        let displayMsg = errMsg || 'An error occurred during Google sign-in.';
        if (errCode === 'auth/popup-blocked' || errMsg.includes('popup-blocked')) {
          displayMsg = 'Google Sign-In pop-up was blocked by your browser. Please allow pop-ups, or click "Open in New Tab" at top-right.';
        }
        setError(displayMsg);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleAppleSignIn = async () => {
    setError(null);
    setSuccess(null);
    setIsLoading(true);
    try {
      await signInWithApple(role);
      setSuccess(`Successfully authenticated! Welcome to Arohi AI.`);
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (err: any) {
      const errCode = err?.code || '';
      const errMsg = err?.message || '';
      const isPopupClosed = 
        errCode === 'auth/popup-closed-by-user' || 
        errMsg.includes('popup-closed-by-user') || 
        errCode === 'auth/cancelled-popup-request' ||
        errMsg.includes('cancelled-popup-request');

      if (isPopupClosed) {
        console.info('Apple Sign-In pop-up was closed by user.');
        setError('Apple Sign-In was cancelled. If pop-ups are blocked, click "Open in New Tab" at top-right.');
      } else if (errCode === 'auth/operation-not-allowed' || errMsg.includes('operation-not-allowed') || errMsg.includes('not enabled')) {
        console.warn('Apple Sign-In is not enabled on this Firebase project.');
        setError('Apple Sign-In is not enabled on this Firebase project yet. Please use "Continue with Google" or "Continue with Email" to sign in instantly!');
      } else {
        console.error('Apple Sign-In error:', err);
        let displayMsg = errMsg || 'An error occurred during Apple sign-in.';
        if (errCode === 'auth/popup-blocked' || errMsg.includes('popup-blocked')) {
          displayMsg = 'Apple Sign-In pop-up was blocked. Please allow pop-ups or use "Open in New Tab".';
        }
        setError(displayMsg);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    try {
      if (!phoneNumber) {
        throw new Error('Please enter a valid phone number.');
      }

      let formattedPhone = phoneNumber.trim();
      if (!formattedPhone.startsWith('+')) {
        if (formattedPhone.length === 10) {
          formattedPhone = `+91${formattedPhone}`;
        } else {
          throw new Error('Please include your country code (e.g., +91 for India).');
        }
      }

      let verifier = recaptchaVerifier;
      if (!verifier) {
        verifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
          size: 'invisible',
          'expired-callback': () => {
            setError('reCAPTCHA expired. Please try again.');
          }
        });
        setRecaptchaVerifier(verifier);
      }

      const confirmation = await signInWithPhone(formattedPhone, verifier, role);
      setConfirmationResult(confirmation);
      setOtpSent(true);
      setSuccess(`Verification code sent successfully to ${formattedPhone}!`);
    } catch (err: any) {
      console.error(err);
      let errMsg = err.message || 'Failed to send verification code.';
      if (err.code === 'auth/invalid-phone-number') {
        errMsg = 'Invalid phone number format. Please check the number.';
      } else if (err.code === 'auth/too-many-requests') {
        errMsg = 'Too many requests. Please try again later.';
      }
      setError(errMsg);
      if (recaptchaVerifier) {
        try {
          recaptchaVerifier.clear();
          setRecaptchaVerifier(null);
        } catch (e) {}
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    try {
      if (!otp) {
        throw new Error('Please enter the 6-digit OTP code.');
      }
      if (!confirmationResult) {
        throw new Error('No OTP session found. Please request another code.');
      }

      await confirmationResult.confirm(otp);
      setSuccess('Successfully signed in with Phone! Welcome back.');
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (err: any) {
      console.error(err);
      let errMsg = err.message || 'Invalid OTP code. Please try again.';
      if (err.code === 'auth/invalid-verification-code') {
        errMsg = 'Incorrect verification code. Please try again.';
      }
      setError(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    try {
      if (activeTab === 'signin') {
        if (!email || !password) {
          throw new Error('Please fill in all fields.');
        }
        await signIn(email, password);
        setSuccess('Successfully signed in! Welcome back.');
        setTimeout(() => {
          onClose();
        }, 1000);
      } else if (activeTab === 'signup') {
        if (!email || !password || !name) {
          throw new Error('Please fill in all fields.');
        }
        if (!signupPhone || signupPhone.trim().length !== 10) {
          throw new Error('Please enter your valid 10-digit mobile number.');
        }
        if (password.length < 6) {
          throw new Error('Password must be at least 6 characters.');
        }
        const formattedPhone = `+91 ${signupPhone.trim().slice(0, 5)} ${signupPhone.trim().slice(5)}`;
        await signUp(email, password, name, role, formattedPhone);

        const chosenPlan = PRICING_TIERS.find(p => p.name === selectedPlanName) || PRICING_TIERS[0];
        try {
          const savedDetails = JSON.parse(localStorage.getItem('arohi_subscription_details') || '{}');
          savedDetails['path1'] = { tierName: chosenPlan.name, price: chosenPlan.price, margin: chosenPlan.margin };
          localStorage.setItem('arohi_subscription_details', JSON.stringify(savedDetails));

          const savedSubs = JSON.parse(localStorage.getItem('arohi_subscriptions') || '{}');
          savedSubs['path1'] = true;
          localStorage.setItem('arohi_subscriptions', JSON.stringify(savedSubs));
        } catch (e) {}

        setSuccess(`Account created successfully with ${chosenPlan.name} (₹${chosenPlan.price}/mo)! Welcome to Arohi AI.`);
        setTimeout(() => {
          onClose();
        }, 1500);
      }
    } catch (err: any) {
      console.error(err);
      let errMsg = err.message || 'An unexpected error occurred.';
      if (err.code === 'auth/operation-not-allowed' || errMsg.includes('operation-not-allowed')) {
        errMsg = 'Email/Password sign-in is not enabled yet in Firebase.';
      } else if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        errMsg = 'Invalid email or password.';
      } else if (err.code === 'auth/email-already-in-use') {
        errMsg = 'This email is already in use.';
      } else if (err.code === 'auth/invalid-email') {
        errMsg = 'Please enter a valid email address.';
      } else if (err.code === 'auth/weak-password') {
        errMsg = 'The password is too weak. Must be at least 6 characters.';
      }
      setError(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);
    try {
      if (!email) {
        throw new Error('Please enter your email address.');
      }
      await resetPassword(email);
      setSuccess('Password reset link sent to your email.');
      setTimeout(() => {
        setViewState('email_form');
      }, 1800);
    } catch (err: any) {
      setError(err.message || 'Failed to send reset link.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnboardingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    try {
      if (!onboardName.trim()) {
        throw new Error('Please enter your Full Name.');
      }
      if (!onboardPhone || onboardPhone.replace(/\D/g, '').length !== 10) {
        throw new Error('Please enter a valid 10-digit mobile number.');
      }

      const cleanPhone = onboardPhone.replace(/\D/g, '');
      const formattedPhone = `+91 ${cleanPhone.slice(0, 5)} ${cleanPhone.slice(5)}`;

      await updateUserProfile({
        name: onboardName.trim(),
        phone: formattedPhone
      });

      setSuccess('Mandatory details updated successfully! Welcome back.');
      setTimeout(() => {
        onClose();
        setViewState('portal');
      }, 1500);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to update mandatory details.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      id="arohi-luxury-auth-modal" 
      className="fixed inset-0 z-[250] flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-xl animate-fade-in overflow-y-auto max-w-[100vw] overflow-x-hidden box-border"
    >
      {/* Invisible Recaptcha Anchor */}
      <div id="recaptcha-container"></div>

      {/* Main Luxury Cosmic Card */}
      <div 
        className="relative w-full max-w-[420px] bg-[#09090d] border border-white/15 rounded-[2rem] p-6 sm:p-7 shadow-[0_25px_80px_rgba(0,0,0,0.9),0_0_40px_rgba(255,255,255,0.03)] my-auto mx-auto overflow-hidden text-white"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, #161724 0%, #090a10 65%, #050508 100%)'
        }}
      >
        {/* Sleek ambient glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-40 bg-gradient-to-b from-sky-500/10 via-indigo-500/10 to-transparent rounded-full blur-3xl" />
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          id="close-arohi-auth-modal-btn"
          aria-label="Close modal"
          className="absolute top-4 right-4 p-2 rounded-full text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 cursor-pointer transition-all active:scale-95 z-20 backdrop-blur-md"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Global Alert Notification */}
        {error && (
          <div className="relative z-10 mb-3 p-3 bg-red-500/15 border border-red-500/40 rounded-xl text-red-200 text-xs flex items-start gap-2 animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span className="font-medium leading-tight flex-1">{error}</span>
          </div>
        )}
        {success && (
          <div className="relative z-10 mb-3 p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-200 text-xs flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="font-semibold leading-tight">{success}</span>
          </div>
        )}

        {/* Upgrade / Plan Notice if present */}
        {upgradePrompt && viewState === 'portal' && (
          <div className="relative z-10 mb-3 p-2.5 bg-gradient-to-r from-amber-500/20 via-purple-900/40 to-fuchsia-900/30 border border-amber-400/50 rounded-xl flex items-center gap-2 shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0 animate-pulse" />
            <p className="text-[11px] font-bold text-amber-200 leading-tight">
              {upgradePrompt}
            </p>
          </div>
        )}

        {/* ============================================================ */}
        {/* VIEW 1: HERO LUXURY PORTAL (Exact Match to User Image) */}
        {/* ============================================================ */}
        {viewState === 'portal' && (
          <div className="relative z-10 flex flex-col items-center text-center">
            
            {/* 1. Sleek Apple/Nike Tier Industrial Brand Title */}
            <div className="relative pt-3 pb-2 flex flex-col items-center">
              
              {/* Monolithic Precision AROHI AI Logotype */}
              <div className="relative inline-block select-none px-2 text-center">
                {/* Subtle back ambient glow */}
                <span 
                  className="absolute inset-0 text-3xl sm:text-4xl font-black tracking-tight uppercase blur-lg opacity-25 select-none pointer-events-none text-center bg-gradient-to-r from-white via-sky-200 to-indigo-300 bg-clip-text text-transparent"
                  aria-hidden="true"
                >
                  AROHI AI
                </span>

                <h1 className="text-3xl sm:text-4xl font-black tracking-[-0.03em] uppercase relative z-10 text-center flex items-center justify-center gap-1.5 font-sans">
                  <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400 drop-shadow-[0_2px_12px_rgba(255,255,255,0.18)]">
                    AROHI
                  </span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-300 to-fuchsia-400 drop-shadow-[0_0_16px_rgba(99,102,241,0.4)]">
                    AI
                  </span>
                </h1>
              </div>

              {/* Minimalist Apple/Nike Precision Slogan */}
              <p className="text-[10px] sm:text-[11px] font-semibold tracking-[0.24em] text-zinc-400 uppercase mt-1.5 flex items-center justify-center gap-1.5 font-sans">
                <span className="text-zinc-300">One AI.</span>
                <span className="text-zinc-400">Infinite Opportunities.</span>
              </p>
            </div>

            {/* 2. Centerpiece: The Animated Orbital Constellation with Live Arohi AI Core */}
            <div className="relative w-[280px] h-[270px] sm:w-[310px] sm:h-[295px] my-2 flex items-center justify-center">
              
              {/* Outer Orbital Orbit Trajectory Ring */}
              <div className="absolute inset-2 sm:inset-3 rounded-full border border-violet-500/20 pointer-events-none" />
              
              {/* Rotating Constellation Ring with Node Dots */}
              <motion.div 
                className="absolute inset-2 sm:inset-3 rounded-full border border-dashed border-amber-400/25 pointer-events-none"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 45, ease: 'linear' }}
              />

              {/* Glowing Particle Halo */}
              <div className="absolute w-44 h-44 rounded-full bg-gradient-to-tr from-amber-500/20 via-purple-600/30 to-cyan-400/20 blur-xl animate-pulse" />

              {/* ---------------------------------------------------- */}
              {/* CENTER LIVE AROHI CORE & ASK AROHI BUBBLE */}
              {/* ---------------------------------------------------- */}
              <div className="relative z-10 flex flex-col items-center justify-center">
                
                {/* Floating "ASK AROHI! ✨" Live Badge */}
                <div className="absolute -top-3.5 z-30 bg-gradient-to-r from-[#17103a] via-[#4c1d95] to-[#6327d4] text-white px-2.5 py-0.5 rounded-full border border-[#7c3aed]/80 text-[8px] sm:text-[9px] font-black tracking-wider uppercase shadow-[0_4px_18px_rgba(124,58,237,0.7)] backdrop-blur-md flex items-center gap-1 whitespace-nowrap select-none pointer-events-none animate-pulse">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00e676] animate-ping shrink-0" />
                  <span>ASK AROHI! ✨</span>
                </div>

                {/* Main Glowing Avatar Core Container */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full p-0 flex items-center justify-center">
                  
                  {/* Glowing Concentric Outer Rings */}
                  <div className="absolute inset-0 rounded-full border-2 border-amber-400/60 shadow-[0_0_25px_rgba(251,191,36,0.5)] animate-pulse" />
                  <motion.div 
                    className="absolute -inset-1.5 rounded-full border border-cyan-400/50"
                    animate={{ rotate: -360 }}
                    transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
                  />
                  <div className="absolute inset-1 rounded-full border-2 border-purple-500/70 shadow-[inset_0_0_20px_rgba(168,85,247,0.8)]" />
                  
                  {/* Pinging pulse aura */}
                  <span className="absolute inset-0 rounded-full border-2 border-purple-400/50 animate-ping opacity-50 pointer-events-none" />

                  {/* Core Arohi Avatar */}
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-[#090714] shadow-[0_0_25px_rgba(124,58,237,0.8)] border border-purple-400/60 flex items-center justify-center">
                    <ArohiAvatar className="w-full h-full scale-[1.08] object-cover transition-transform duration-500 hover:scale-120" />
                  </div>

                  {/* Live Active Status Indicator Dot */}
                  <span className="absolute bottom-1 right-1 sm:bottom-1.5 sm:right-1.5 w-3.5 h-3.5 sm:w-4 sm:h-4 bg-[#00e676] rounded-full border-2 border-[#090714] z-20 shadow-[0_0_10px_#00e676]" />
                </div>
              </div>

              {/* ---------------------------------------------------- */}
              {/* 6 SURROUNDING ORBITING CAPABILITY SPHERES */}
              {/* ---------------------------------------------------- */}
              {/* Top-Left: Learn */}
              <div className="absolute top-2 left-4 sm:left-6 flex flex-col items-center gap-1 group cursor-default">
                <div 
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110"
                  style={{
                    background: 'radial-gradient(circle, #241147 30%, #0f0521 100%)',
                    border: '1.5px solid rgba(192, 132, 252, 0.7)',
                    boxShadow: '0 0 15px rgba(192, 132, 252, 0.4)'
                  }}
                >
                  <GraduationCap className="w-5 h-5 text-purple-300" />
                </div>
                <span className="text-[10px] sm:text-xs font-semibold text-slate-200">Learn</span>
              </div>

              {/* Top-Right: Build */}
              <div className="absolute top-2 right-4 sm:right-6 flex flex-col items-center gap-1 group cursor-default">
                <div 
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110"
                  style={{
                    background: 'radial-gradient(circle, #3d2407 30%, #150901 100%)',
                    border: '1.5px solid rgba(251, 191, 36, 0.7)',
                    boxShadow: '0 0 15px rgba(251, 191, 36, 0.4)'
                  }}
                >
                  <Rocket className="w-5 h-5 text-amber-300" />
                </div>
                <span className="text-[10px] sm:text-xs font-semibold text-slate-200">Build</span>
              </div>

              {/* Middle-Left: Work */}
              <div className="absolute top-1/2 -translate-y-1/2 left-0 sm:left-1 flex flex-col items-center gap-1 group cursor-default">
                <div 
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110"
                  style={{
                    background: 'radial-gradient(circle, #08283a 30%, #031019 100%)',
                    border: '1.5px solid rgba(34, 211, 238, 0.7)',
                    boxShadow: '0 0 15px rgba(34, 211, 238, 0.4)'
                  }}
                >
                  <Briefcase className="w-5 h-5 text-cyan-300" />
                </div>
                <span className="text-[10px] sm:text-xs font-semibold text-slate-200">Work</span>
              </div>

              {/* Middle-Right: Connect */}
              <div className="absolute top-1/2 -translate-y-1/2 right-0 sm:right-1 flex flex-col items-center gap-1 group cursor-default">
                <div 
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110"
                  style={{
                    background: 'radial-gradient(circle, #0e1e47 30%, #040a1c 100%)',
                    border: '1.5px solid rgba(96, 165, 250, 0.7)',
                    boxShadow: '0 0 15px rgba(96, 165, 250, 0.4)'
                  }}
                >
                  <Users className="w-5 h-5 text-blue-300" />
                </div>
                <span className="text-[10px] sm:text-xs font-semibold text-slate-200">Connect</span>
              </div>

              {/* Bottom-Left: Grow */}
              <div className="absolute bottom-1 left-5 sm:left-7 flex flex-col items-center gap-1 group cursor-default">
                <div 
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110"
                  style={{
                    background: 'radial-gradient(circle, #380d2b 30%, #150310 100%)',
                    border: '1.5px solid rgba(244, 114, 182, 0.7)',
                    boxShadow: '0 0 15px rgba(244, 114, 182, 0.4)'
                  }}
                >
                  <TrendingUp className="w-5 h-5 text-pink-300" />
                </div>
                <span className="text-[10px] sm:text-xs font-semibold text-slate-200">Grow</span>
              </div>

              {/* Bottom-Right: Achieve */}
              <div className="absolute bottom-1 right-5 sm:right-7 flex flex-col items-center gap-1 group cursor-default">
                <div 
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110"
                  style={{
                    background: 'radial-gradient(circle, #2d0b47 30%, #11031d 100%)',
                    border: '1.5px solid rgba(168, 85, 247, 0.7)',
                    boxShadow: '0 0 15px rgba(168, 85, 247, 0.4)'
                  }}
                >
                  <Target className="w-5 h-5 text-purple-300" />
                </div>
                <span className="text-[10px] sm:text-xs font-semibold text-slate-200">Achieve</span>
              </div>
            </div>

            {/* 3. Sleek Purpose Statement */}
            <div className="my-2 space-y-0.5 font-sans">
              <p className="text-[11px] sm:text-xs text-zinc-400 font-medium tracking-wide">
                Engineered for <span className="text-zinc-200 font-semibold">Learning</span>, <span className="text-zinc-200 font-semibold">Work</span>, <span className="text-zinc-200 font-semibold">Business</span> &amp; <span className="text-zinc-200 font-semibold">Life</span>
              </p>
            </div>

            {/* 4. Industrial Precision Authentication Buttons Stack */}
            <div className="w-full space-y-2.5 mt-4">
              
              {/* Google Button */}
              <button
                type="button"
                id="luxury-google-auth-btn"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="w-full relative group overflow-hidden rounded-2xl cursor-pointer transition-all duration-200 active:scale-[0.98] disabled:opacity-50"
              >
                <div className="flex items-center justify-between px-5 py-3.5 rounded-2xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 hover:border-white/30 transition-all shadow-sm">
                  <div className="flex items-center gap-3.5">
                    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21.35,11.1H12v2.7h5.38c-0.24,1.28 -0.96,2.37 -2.04,3.1v2.57h3.3c1.93,-1.78 3.04,-4.4 3.04,-7.4C21.68,11.83 21.56,11.43 21.35,11.1z" fill="#4285F4" />
                      <path d="M12,20.62c2.43,0 4.47,-0.8 5.96,-2.18l-3.3,-2.57c-0.9,0.6 -2.08,0.97 -3.3,0.97 -2.34,0 -4.33,-1.58 -5.04,-3.7H2.9v2.66C4.38,18.73 7.97,20.62 12,20.62z" fill="#34A853" />
                      <path d="M6.96,13.14a5.2,5.2 0 0 1 0,-3.28V7.2H2.9a8.96,8.96 0 0 0 0,7.9l4.06,-3.26z" fill="#FBBC05" />
                      <path d="M12,5.38c1.32,0 2.5,0.45 3.44,1.35l2.58,-2.58C16.46,2.73 14.43,1.9 12,1.9 7.97,1.9 4.38,3.79 2.9,6.54L6.96,9.8C7.67,7.68 9.66,5.38 12,5.38z" fill="#EA4335" />
                    </svg>
                    <span className="text-xs sm:text-sm font-semibold text-white tracking-tight">Continue with Google</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                </div>
              </button>

              {/* Email / Password Button */}
              <button
                type="button"
                id="luxury-email-auth-btn"
                onClick={() => setViewState('email_form')}
                className="w-full relative group overflow-hidden rounded-2xl cursor-pointer transition-all duration-200 active:scale-[0.98]"
              >
                <div className="flex items-center justify-between px-5 py-3.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 transition-all shadow-sm">
                  <div className="flex items-center gap-3.5">
                    <Mail className="w-5 h-5 text-zinc-300 shrink-0" />
                    <span className="text-xs sm:text-sm font-semibold text-zinc-200 group-hover:text-white tracking-tight">Continue with Email</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                </div>
              </button>
            </div>

            {/* 5. Legal Footer */}
            <div className="mt-5 pt-1 text-[10px] text-zinc-400 leading-relaxed max-w-[320px] font-sans">
              By continuing you agree to our{' '}
              <span className="text-zinc-300 hover:text-white underline underline-offset-2 cursor-pointer">Terms of Service</span> and{' '}
              <span className="text-zinc-300 hover:text-white underline underline-offset-2 cursor-pointer">Privacy Policy</span>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* VIEW 2: EMAIL / PASSWORD DETAILED FORM (SIGN IN & SIGN UP) */}
        {/* ============================================================ */}
        {viewState === 'email_form' && (
          <div className="relative z-10 space-y-4">
            
            {/* Top Back Navigation */}
            <div className="flex items-center justify-between pb-1 border-b border-violet-900/40">
              <button
                type="button"
                onClick={() => {
                  setViewState('portal');
                  setError(null);
                  setSuccess(null);
                }}
                className="text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
              >
                <ChevronLeft className="w-4 h-4 text-amber-300" />
                <span>Back to Portal</span>
              </button>

              <span className="text-xs font-mono font-bold text-amber-300">
                {activeTab === 'signin' ? 'Email Sign In' : 'New Account'}
              </span>
            </div>

            {/* Signin vs Signup Tabs */}
            <div className="flex bg-[#0a0518] p-1 rounded-xl border border-purple-500/30">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('signin');
                  setError(null);
                }}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  activeTab === 'signin'
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                SIGN IN
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('signup');
                  setError(null);
                }}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  activeTab === 'signup'
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                CREATE ACCOUNT
              </button>
            </div>

            {/* Main Form */}
            <form onSubmit={handleAuthSubmit} className="space-y-3">
              
              {/* Full name & Phone on Signup */}
              {activeTab === 'signup' && (
                <>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-300 uppercase tracking-wider block">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-[#0a0518] border border-purple-500/30 rounded-xl py-2 pl-10 pr-4 text-xs font-semibold text-white placeholder-slate-600 focus:outline-none focus:border-amber-400 transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-300 uppercase tracking-wider block">Mobile Number</label>
                    <div className="relative flex">
                      <div className="flex items-center justify-center bg-[#0a0518] border border-purple-500/30 border-r-0 rounded-l-xl px-3 text-xs font-bold text-slate-300">
                        +91
                      </div>
                      <div className="relative flex-1">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input
                          type="tel"
                          placeholder="9876543210"
                          value={signupPhone}
                          onChange={(e) => setSignupPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                          className="w-full bg-[#0a0518] border border-purple-500/30 rounded-r-xl py-2 pl-10 pr-4 text-xs font-semibold text-white placeholder-slate-600 focus:outline-none focus:border-amber-400 transition-all"
                          required
                          pattern="[0-9]{10}"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Plan selector preview */}
                  <div className="space-y-1 pt-1">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] font-bold text-amber-300 uppercase">Subscription Plan</label>
                      <span className="text-[9px] text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                        2-Day Free Trial
                      </span>
                    </div>
                    <div className="max-h-32 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
                      {PRICING_TIERS.map(tier => {
                        const isSelected = selectedPlanName === tier.name;
                        return (
                          <div
                            key={tier.name}
                            onClick={() => setSelectedPlanName(tier.name)}
                            className={`p-2 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                              isSelected
                                ? 'bg-purple-900/40 border-amber-400/80 text-white'
                                : 'bg-[#0a0518] border-purple-900/50 text-slate-300'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                                isSelected ? 'border-amber-400 bg-amber-500 text-black' : 'border-slate-600'
                              }`}>
                                {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                              </div>
                              <span className="text-xs font-bold">{tier.name}</span>
                            </div>
                            <span className="text-xs font-bold text-amber-300">₹{tier.price}/mo</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}

              {/* Email */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-300 uppercase tracking-wider block">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#0a0518] border border-purple-500/30 rounded-xl py-2 pl-10 pr-4 text-xs font-semibold text-white placeholder-slate-600 focus:outline-none focus:border-amber-400 transition-all"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">Password</label>
                  {activeTab === 'signin' && (
                    <button
                      type="button"
                      onClick={() => setViewState('forgot')}
                      className="text-[10px] font-bold text-purple-400 hover:text-amber-300 transition-colors cursor-pointer"
                    >
                      Forgot Password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#0a0518] border border-purple-500/30 rounded-xl py-2 pl-10 pr-4 text-xs font-semibold text-white placeholder-slate-600 focus:outline-none focus:border-amber-400 transition-all"
                    required
                    minLength={6}
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-amber-500 via-purple-600 to-indigo-600 hover:from-amber-400 hover:to-indigo-500 transition-all active:scale-95 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2 shadow-lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Authenticating...</span>
                  </>
                ) : (
                  <span>{activeTab === 'signin' ? 'Sign In to Arohi' : 'Create My Account'}</span>
                )}
              </button>

              {/* Biometrics */}
              {activeTab === 'signin' && isBioSupported && hasEnrolledKey && (
                <button
                  type="button"
                  onClick={handleBiometricLogin}
                  disabled={isLoading}
                  className="w-full py-2.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider text-purple-300 bg-[#120a2e] hover:bg-[#1a0e3f] border border-purple-500/30 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Fingerprint className="w-4 h-4 text-purple-400 animate-pulse" />
                  <span>Sign In with Face ID / Touch ID</span>
                </button>
              )}
            </form>
          </div>
        )}

        {/* ============================================================ */}
        {/* VIEW 3: PHONE SIGN-IN / OTP FLOW */}
        {/* ============================================================ */}
        {viewState === 'phone' && (
          <div className="relative z-10 space-y-4">
            <div className="flex items-center justify-between pb-1 border-b border-violet-900/40">
              <button
                type="button"
                onClick={() => {
                  setViewState('portal');
                  setOtpSent(false);
                  setPhoneNumber('');
                  setOtp('');
                  setError(null);
                }}
                className="text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
              >
                <ChevronLeft className="w-4 h-4 text-cyan-400" />
                <span>Back to Portal</span>
              </button>
              <span className="text-xs font-mono font-bold text-cyan-300">Phone Verification</span>
            </div>

            {!otpSent ? (
              <form onSubmit={handleSendOtp} className="space-y-4">
                <div className="p-3 bg-[#0a0518] border border-cyan-500/30 rounded-2xl text-center">
                  <Smartphone className="w-7 h-7 text-cyan-400 mx-auto mb-1.5 animate-pulse" />
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">SMS OTP Authentication</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Enter your 10-digit mobile number to receive a secure code.</p>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-300 uppercase tracking-wider block">Mobile Number</label>
                  <div className="relative flex">
                    <div className="flex items-center justify-center bg-[#0a0518] border border-purple-500/30 border-r-0 rounded-l-xl px-3 text-xs font-bold text-slate-300">
                      +91
                    </div>
                    <div className="relative flex-1">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        type="tel"
                        placeholder="9876543210"
                        value={phoneNumber.replace(/^\+91/, '')}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="w-full bg-[#0a0518] border border-purple-500/30 rounded-r-xl py-2.5 pl-10 pr-4 text-xs font-semibold text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 transition-all"
                        required
                        pattern="[0-9]{10}"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 transition-all active:scale-95 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2 shadow-lg"
                >
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>Send OTP Code</span>}
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div className="p-3 bg-[#0a0518] border border-cyan-500/30 rounded-2xl text-center">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Enter 6-Digit OTP</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Code sent to {phoneNumber}</p>
                </div>

                <div className="space-y-1">
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="text"
                      placeholder="123456"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      className="w-full bg-[#0a0518] border border-cyan-500/40 rounded-xl py-2.5 pl-10 pr-4 text-sm font-semibold text-white tracking-[0.4em] text-center focus:outline-none focus:border-cyan-400 transition-all"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 transition-all active:scale-95 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2 shadow-lg"
                >
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>Verify &amp; Sign In</span>}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setOtpSent(false);
                    setOtp('');
                  }}
                  className="w-full text-center text-xs text-cyan-400 hover:underline font-semibold cursor-pointer"
                >
                  Change Mobile Number
                </button>
              </form>
            )}
          </div>
        )}

        {/* ============================================================ */}
        {/* VIEW 4: FORGOT PASSWORD */}
        {/* ============================================================ */}
        {viewState === 'forgot' && (
          <form onSubmit={handleForgotSubmit} className="relative z-10 space-y-4">
            <div className="flex items-center justify-between pb-1 border-b border-violet-900/40">
              <button
                type="button"
                onClick={() => setViewState('email_form')}
                className="text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4 text-amber-300" />
                <span>Back to Sign In</span>
              </button>
              <span className="text-xs font-mono font-bold text-amber-300">Reset Password</span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Enter your registered email address and we will dispatch a secure password reset link to your inbox.
            </p>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-300 uppercase tracking-wider block">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#0a0518] border border-purple-500/30 rounded-xl py-2 pl-10 pr-4 text-xs font-semibold text-white placeholder-slate-600 focus:outline-none focus:border-amber-400 transition-all"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-amber-500 via-purple-600 to-indigo-600 hover:from-amber-400 hover:to-indigo-500 transition-all active:scale-95 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2 shadow-lg"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>Send Reset Link</span>}
            </button>
          </form>
        )}

        {/* ============================================================ */}
        {/* VIEW 5: MANDATORY ONBOARDING SETUP */}
        {/* ============================================================ */}
        {viewState === 'onboarding' && (
          <form onSubmit={handleOnboardingSubmit} className="relative z-10 space-y-4">
            <div className="p-3 bg-[#0a0518] border border-amber-400/40 rounded-2xl text-center">
              <Sparkles className="w-7 h-7 text-amber-300 mx-auto mb-1.5 animate-bounce" />
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">Complete Profile Setup</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">Your Name &amp; Mobile number are required to access Arohi AI features.</p>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-300 uppercase tracking-wider block">Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={onboardName}
                  onChange={(e) => setOnboardName(e.target.value)}
                  className="w-full bg-[#0a0518] border border-purple-500/30 rounded-xl py-2 pl-10 pr-4 text-xs font-semibold text-white placeholder-slate-600 focus:outline-none focus:border-amber-400 transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-300 uppercase tracking-wider block">Mobile Number</label>
              <div className="relative flex">
                <div className="flex items-center justify-center bg-[#0a0518] border border-purple-500/30 border-r-0 rounded-l-xl px-3 text-xs font-bold text-slate-300">
                  +91
                </div>
                <div className="relative flex-1">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="tel"
                    placeholder="9876543210"
                    value={onboardPhone}
                    onChange={(e) => setOnboardPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    className="w-full bg-[#0a0518] border border-purple-500/30 rounded-r-xl py-2 pl-10 pr-4 text-xs font-semibold text-white placeholder-slate-600 focus:outline-none focus:border-amber-400 transition-all"
                    required
                    pattern="[0-9]{10}"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-amber-500 via-purple-600 to-indigo-600 hover:from-amber-400 hover:to-indigo-500 transition-all active:scale-95 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2 shadow-lg"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>Save &amp; Enter Dashboard</span>}
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
