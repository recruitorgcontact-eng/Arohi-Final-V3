import React, { useState, useEffect, useRef } from 'react';
import { 
  Bell, 
  AlertTriangle, 
  Calendar, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  ShieldAlert, 
  Zap, 
  X, 
  RefreshCw,
  Gift,
  ExternalLink,
  ChevronRight,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { computeSubscriptionState } from '../utils/subscriptionEngine';

interface HeaderNotificationsProps {
  hasActiveSubscription: boolean;
  subscriptionEndDate: number;
  subscriptionPlanName?: string;
  onRenewSubscription: () => void;
  onSetSubscriptionEndDate?: (newTimestamp: number) => void;
  isDarkMode?: boolean;
  onOpenAuth?: () => void;
  onNavigateTab?: (tab: string) => void;
  user?: any;
  currency?: 'INR' | 'USD';
}

export default function HeaderNotifications({
  hasActiveSubscription,
  subscriptionEndDate,
  subscriptionPlanName = 'Starter Plan (₹399/mo)',
  onRenewSubscription,
  onSetSubscriptionEndDate,
  isDarkMode = true,
  onOpenAuth,
  onNavigateTab,
  user,
  currency = 'INR'
}: HeaderNotificationsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'subscription' | 'announcements'>('all');
  const userStorageKey = user?.uid ? `arohi_read_notifications_${user.uid}` : 'arohi_read_notifications_guest';
  const [readNotifications, setReadNotifications] = useState<Record<string, boolean>>(() => {
    try {
      const key = user?.uid ? `arohi_read_notifications_${user.uid}` : 'arohi_read_notifications_guest';
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  // Re-sync read notifications when user changes
  useEffect(() => {
    try {
      const key = user?.uid ? `arohi_read_notifications_${user.uid}` : 'arohi_read_notifications_guest';
      const saved = localStorage.getItem(key);
      setReadNotifications(saved ? JSON.parse(saved) : {});
    } catch (e) {
      setReadNotifications({});
    }
  }, [user?.uid]);

  const [showSimulateBar, setShowSimulateBar] = useState(false);
  const [currentTime, setCurrentTime] = useState(Date.now());
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Close on outside click or escape
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setIsOpen(false);
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  // Calculate subscription remaining time strictly based on centralized subscription state
  const subState = computeSubscriptionState({
    email: user?.email,
    subscriptions: hasActiveSubscription ? { path1: true } : {},
    subscriptionEndDate,
    subscriptionPlanName,
    currentTime
  });

  const isSubscribed = subState.isSubscribed;
  const isExpired = subState.isExpired;
  const msRemaining = subState.msRemaining;
  const daysRemaining = subState.daysRemaining;
  const hoursRemaining = subState.hoursRemaining;
  const minutesRemaining = subState.minutesRemaining;

  // Alert condition: ONLY active subscribers who are within 7 days of expiry and not yet expired
  const is7DaysAlertActive = subState.shouldShowExpiryAlert;
  const isExpiredAlertActive = isSubscribed && isExpired && !subState.isLifetimeVip;
  const isActiveGoodStanding = isSubscribed && !isExpired && (daysRemaining > 7 || subState.isLifetimeVip);

  // Format expiry date nicely
  const expiryDateFormatted = subscriptionEndDate > 0 ? new Date(subscriptionEndDate).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }) : 'N/A';

  const expiryTimeFormatted = subscriptionEndDate > 0 ? new Date(subscriptionEndDate).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  }) : 'N/A';

  const markAsRead = (id: string) => {
    const updated = { ...readNotifications, [id]: true };
    setReadNotifications(updated);
    try {
      localStorage.setItem(userStorageKey, JSON.stringify(updated));
    } catch (e) {}
  };

  const markAllAsRead = () => {
    const updated = {
      ...readNotifications,
      'sub_expiry_alert': true,
      'cashback_offer': true,
      'multilingual_launch': true,
      'jobs_feed': true
    };
    setReadNotifications(updated);
    try {
      localStorage.setItem(userStorageKey, JSON.stringify(updated));
    } catch (e) {}
  };

  const unreadCount = ((is7DaysAlertActive || isExpiredAlertActive) && !readNotifications['sub_expiry_alert'] ? 1 : 0) +
    (!readNotifications['cashback_offer'] ? 1 : 0) +
    (!readNotifications['multilingual_launch'] ? 1 : 0);

  // Quick simulator presets
  const handleSimulateDays = (days: number) => {
    if (onSetSubscriptionEndDate) {
      const targetTime = Date.now() + (days * 24 * 60 * 60 * 1000) + (4 * 60 * 60 * 1000);
      onSetSubscriptionEndDate(targetTime);
    }
  };

  return (
    <div className="relative inline-block font-sans">
      {/* Header Notification Bell Trigger Button */}
      <button
        ref={buttonRef}
        type="button"
        id="header-notification-bell-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="Notification Center - Subscription Expiry Alerts"
        className={`relative p-1.5 sm:p-2.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-center ${
          isOpen
            ? 'bg-purple-600/20 border-purple-500 text-purple-300 ring-2 ring-purple-500/40 shadow-lg'
            : isDarkMode
            ? 'bg-[#131728] border-slate-800 text-slate-200 hover:bg-[#1a2038] hover:border-purple-500/40'
            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shadow-xs hover:border-purple-300'
        }`}
        title={
          is7DaysAlertActive
            ? `⚠️ Subscription Ending in ${daysRemaining} days! Click to review renewal options.`
            : isExpiredAlertActive
            ? '🚨 Subscription expired! Click to renew.'
            : isActiveGoodStanding
            ? `✨ Active Subscription (${daysRemaining} days remaining)`
            : 'Notifications & Ecosystem Updates'
        }
      >
        <Bell className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform ${is7DaysAlertActive ? 'text-amber-400 animate-[wiggle_1s_ease-in-out_infinite]' : isExpiredAlertActive ? 'text-rose-400 animate-pulse' : ''}`} />
        
        {/* Animated Alert Badge on the Bell: ONLY when actually in 7-day warning or expired */}
        {is7DaysAlertActive ? (
          <span className="absolute -top-1.5 -right-1.5 flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-gradient-to-r from-rose-500 to-amber-500 text-white font-black text-[9px] leading-none shadow-md shadow-rose-500/40 border border-white dark:border-[#070814] animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
            <span>{daysRemaining}d</span>
          </span>
        ) : isExpiredAlertActive ? (
          <span className="absolute -top-1.5 -right-1.5 flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-rose-600 text-white font-black text-[9px] leading-none shadow-md shadow-rose-600/40 border border-white dark:border-[#070814] animate-pulse">
            <span>0d</span>
          </span>
        ) : unreadCount > 0 ? (
          <span className="absolute top-1 right-1 sm:top-1.5 sm:right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white dark:ring-[#070814] animate-pulse"></span>
        ) : null}
      </button>

      {/* Notification Dropdown Popover Container */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={dropdownRef}
            id="header-notification-dropdown-popover"
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className={`absolute right-0 mt-2.5 w-[92vw] sm:w-[440px] max-w-[460px] rounded-3xl shadow-2xl border z-50 overflow-hidden backdrop-blur-2xl ${
              isDarkMode 
                ? 'bg-[#0f0b24]/98 border-[#2e2160] text-slate-100 shadow-[0_20px_60px_rgba(0,0,0,0.8)]' 
                : 'bg-white/98 border-purple-100 text-slate-900 shadow-[0_20px_50px_rgba(124,58,237,0.15)]'
            }`}
          >
            {/* Popover Top Gradient Bar */}
            <div className="h-1.5 bg-gradient-to-r from-amber-400 via-rose-500 to-purple-600"></div>

            {/* Header section inside dropdown */}
            <div className={`p-4 border-b flex items-center justify-between ${
              isDarkMode ? 'border-slate-800/80 bg-[#140e33]/80' : 'border-slate-100 bg-purple-50/50'
            }`}>
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
                  <Bell className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm tracking-tight flex items-center gap-2">
                    <span>Notification Center</span>
                    {unreadCount > 0 && (
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-rose-500 text-white">
                        {unreadCount} New
                      </span>
                    )}
                  </h3>
                  <p className="text-[11px] text-slate-400 dark:text-slate-400">
                    Service status, subscription alerts & updates
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {unreadCount > 0 && (
                  <button
                    type="button"
                    onClick={markAllAsRead}
                    className="text-[10px] font-bold text-purple-400 hover:text-purple-300 dark:text-purple-300 hover:underline px-2 py-1 cursor-pointer transition-colors"
                  >
                    Mark read
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/50 cursor-pointer transition-colors"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className={`px-4 pt-2.5 pb-2 border-b flex items-center gap-1.5 text-xs font-bold ${
              isDarkMode ? 'border-slate-800/60 bg-[#0c081e]' : 'border-slate-100 bg-slate-50'
            }`}>
              <button
                type="button"
                onClick={() => setActiveFilter('all')}
                className={`px-3 py-1 rounded-full text-[11px] font-black transition-all cursor-pointer ${
                  activeFilter === 'all'
                    ? 'bg-purple-600 text-white shadow-xs'
                    : isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All Alerts
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter('subscription')}
                className={`px-3 py-1 rounded-full text-[11px] font-black transition-all cursor-pointer flex items-center gap-1 ${
                  activeFilter === 'subscription'
                    ? 'bg-amber-500 text-slate-950 shadow-xs'
                    : isDarkMode ? 'text-slate-400 hover:text-amber-300' : 'text-slate-600 hover:text-amber-700'
                }`}
              >
                <span>Subscription</span>
                {is7DaysAlertActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping"></span>
                )}
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter('announcements')}
                className={`px-3 py-1 rounded-full text-[11px] font-black transition-all cursor-pointer ${
                  activeFilter === 'announcements'
                    ? 'bg-purple-600 text-white shadow-xs'
                    : isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Ecosystem News
              </button>
            </div>

            {/* Main Notifications Scroll Area */}
            <div className="max-h-[380px] sm:max-h-[420px] overflow-y-auto p-3 space-y-3 custom-scrollbar">

              {/* 1A. PRIMARY HIGHLIGHT: 7-DAY SUBSCRIPTION EXPIRY WARNING (Only when active & <= 7 days) */}
              {(activeFilter === 'all' || activeFilter === 'subscription') && is7DaysAlertActive && (
                <div 
                  id="subscription-expiry-alert-card"
                  className={`rounded-2xl p-4 border transition-all relative overflow-hidden text-left shadow-lg ${
                    daysRemaining <= 3 
                      ? 'bg-gradient-to-br from-rose-950/70 via-[#28131d] to-[#170c29] border-rose-500/70 shadow-rose-950/30'
                      : 'bg-gradient-to-br from-amber-950/60 via-[#24172f] to-[#140c26] border-amber-400/70 shadow-amber-950/30'
                  }`}
                >
                  {/* Subtle pulsing background glow */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>

                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className={`p-2 rounded-xl flex items-center justify-center shrink-0 border ${
                        daysRemaining <= 3 
                          ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse' 
                          : 'bg-amber-500/20 text-amber-300 border-amber-400/40'
                      }`}>
                        <ShieldAlert className="w-5 h-5" />
                      </div>
                      <div>
                        <span className={`text-[10px] font-black tracking-widest uppercase px-2 py-0.5 rounded-md inline-block ${
                          daysRemaining <= 3
                            ? 'bg-rose-500/30 text-rose-300 border border-rose-500/50'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-400/40'
                        }`}>
                          ⚠️ SERVICE INTERRUPTION WARNING
                        </span>
                        <h4 className="font-extrabold text-sm text-white mt-1 leading-tight">
                          7-Day Advance Notice: Renews Soon
                        </h4>
                      </div>
                    </div>

                    {/* Expiry Badge */}
                    <div className="text-right shrink-0">
                      <span className={`inline-flex items-center gap-1 font-mono font-black text-xs px-2.5 py-1 rounded-full border ${
                        daysRemaining <= 3
                          ? 'bg-rose-500/20 text-rose-200 border-rose-500/40'
                          : 'bg-amber-400/20 text-amber-200 border-amber-400/50'
                      }`}>
                        <Clock className="w-3.5 h-3.5" />
                        {daysRemaining}d {hoursRemaining}h Left
                      </span>
                    </div>
                  </div>

                  {/* Informational Body */}
                  <div className="mt-3 text-xs text-slate-200 space-y-1.5">
                    <p className="leading-relaxed text-[11.5px]">
                      Your <strong className="text-amber-300 font-bold">{subscriptionPlanName}</strong> subscription period ends on{' '}
                      <strong className="text-white underline decoration-amber-400/60">{expiryDateFormatted} at {expiryTimeFormatted}</strong>.
                    </p>
                    <p className="text-[11px] text-slate-300 leading-normal">
                      Renew in advance to guarantee continuous, zero-downtime access to your AI agents, priority LLM/LMM tokens, custom resume grades, and saved job applications.
                    </p>
                  </div>

                  {/* Benefit Callout */}
                  <div className="mt-3 p-2 rounded-xl bg-[#0e0a1f]/80 border border-purple-500/20 flex items-center justify-between text-[10.5px]">
                    <span className="flex items-center gap-1 text-emerald-300 font-bold">
                      <Gift className="w-3.5 h-3.5 text-emerald-400" />
                      100% Cashback on Renewal
                    </span>
                    <span className="text-amber-300 font-mono font-black">
                      +1,000 Arohi Coins
                    </span>
                  </div>

                  {/* Urgent Renewal CTA Button */}
                  <div className="mt-3.5 flex flex-col sm:flex-row items-center gap-2">
                    <button
                      type="button"
                      id="renew-subscription-now-btn"
                      onClick={() => {
                        setIsOpen(false);
                        onRenewSubscription();
                      }}
                      className="w-full sm:flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-300 hover:from-amber-300 hover:to-yellow-200 text-slate-950 font-black text-xs tracking-tight shadow-md hover:shadow-amber-400/30 transition-all transform active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Zap className="w-4 h-4 fill-current text-slate-950" />
                      <span>Renew Subscription ({currency === 'USD' ? '$5' : '₹399'}/mo)</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
                    </button>

                    {onNavigateTab && (
                      <button
                        type="button"
                        onClick={() => {
                          setIsOpen(false);
                          onNavigateTab('pricing');
                        }}
                        className="w-full sm:w-auto py-2.5 px-3 rounded-xl border border-slate-700 bg-slate-800/60 hover:bg-slate-700/80 text-white font-bold text-xs transition-colors cursor-pointer text-center whitespace-nowrap"
                      >
                        View Plans
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* 1B. EXPIRED SUBSCRIPTION CARD (Only when subscription was active and reached 0) */}
              {(activeFilter === 'all' || activeFilter === 'subscription') && isExpiredAlertActive && (
                <div 
                  id="subscription-expired-alert-card"
                  className="rounded-2xl p-4 border bg-gradient-to-br from-rose-950/80 via-[#260a16] to-[#15040d] border-rose-500/80 shadow-rose-950/40 text-left shadow-lg"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse">
                        <ShieldAlert className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-black tracking-widest uppercase px-2 py-0.5 rounded-md inline-block bg-rose-500 text-white">
                          🚨 SUBSCRIPTION EXPIRED
                        </span>
                        <h4 className="font-extrabold text-sm text-white mt-1 leading-tight">
                          Immediate Action: Plan Has Ended
                        </h4>
                      </div>
                    </div>
                    <span className="font-mono font-black text-xs px-2.5 py-1 rounded-full bg-rose-500 text-white">
                      0d Left
                    </span>
                  </div>

                  <div className="mt-3 text-xs text-slate-200 space-y-1">
                    <p className="leading-relaxed">
                      Your subscription ended on <strong className="text-white">{expiryDateFormatted}</strong>. Reactivate now to resume unlimited AI queries, live voice tools, and resume parsing.
                    </p>
                  </div>

                  <div className="mt-3.5">
                    <button
                      type="button"
                      onClick={() => {
                        setIsOpen(false);
                        onRenewSubscription();
                      }}
                      className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-400 hover:to-amber-400 text-white font-black text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Zap className="w-4 h-4 fill-current" />
                      <span>Reactivate Subscription Now</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* 1C. HEALTHY ACTIVE SUBSCRIPTION CARD (When active and > 7 days left) */}
              {(activeFilter === 'all' || activeFilter === 'subscription') && isActiveGoodStanding && (
                <div 
                  id="subscription-healthy-card"
                  className="rounded-2xl p-4 border bg-gradient-to-br from-emerald-950/40 via-[#111e24] to-[#0d1622] border-emerald-500/40 text-left shadow-md space-y-2.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div>
                        <span className="text-[10px] font-black tracking-wider uppercase px-2 py-0.5 rounded-md inline-flex items-center gap-1 bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                          Active &amp; Protected
                        </span>
                        <h4 className="font-extrabold text-sm text-white mt-1 leading-tight">
                          {subscriptionPlanName}
                        </h4>
                      </div>
                    </div>
                    <span className="text-right text-[11px] font-mono text-emerald-300 font-bold bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-1 rounded-full">
                      {daysRemaining} Days Left
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    Your membership is active through <strong className="text-white">{expiryDateFormatted}</strong>. You have unrestricted access to all multimodal AI models, 150+ regional voice engines, and career tools.
                  </p>

                  <div className="pt-1 flex items-center justify-between border-t border-emerald-500/20 text-[11px]">
                    <span className="text-slate-400">Next Renewal: {expiryDateFormatted}</span>
                    {onNavigateTab && (
                      <button
                        type="button"
                        onClick={() => {
                          setIsOpen(false);
                          onNavigateTab('pricing');
                        }}
                        className="text-emerald-400 hover:text-emerald-300 font-bold underline cursor-pointer"
                      >
                        Manage Plan →
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* 1D. NON-SUBSCRIBED / DISCOVERY CARD (When user has no active subscription) */}
              {(activeFilter === 'all' || activeFilter === 'subscription') && !isSubscribed && (
                <div 
                  id="subscription-discovery-card"
                  className="rounded-2xl p-4 border bg-gradient-to-br from-purple-950/40 via-[#180f2d] to-[#0e0a1f] border-purple-500/30 text-left shadow-md space-y-2.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30">
                        <Sparkles className="w-5 h-5 text-purple-300" />
                      </div>
                      <div>
                        <span className="text-[10px] font-black tracking-wider uppercase px-2 py-0.5 rounded-md inline-block bg-purple-500/20 text-purple-300 border border-purple-400/30">
                          PRO MEMBERSHIP
                        </span>
                        <h4 className="font-extrabold text-sm text-white mt-1 leading-tight">
                          Upgrade to Arohi AI Pro
                        </h4>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono text-amber-300 font-black bg-amber-500/10 border border-amber-500/30 px-2 py-1 rounded-full">
                      {currency === 'USD' ? '$5/mo' : '₹399/mo'}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    Unlock unrestricted access to Arohi Multimodal LLM, 150+ language voice synthesis, resume builders, and verified job postings with 100% Coins Cashback.
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      setIsOpen(false);
                      if (onNavigateTab) {
                        onNavigateTab('pricing');
                      } else {
                        onRenewSubscription();
                      }
                    }}
                    className="w-full py-2 px-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-xs shadow-sm transition-all cursor-pointer flex items-center justify-center gap-1"
                  >
                    <span>View Subscription Plans</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* 2. Platform Announcement: 100% Cashback Promo */}
              {(activeFilter === 'all' || activeFilter === 'announcements') && (
                <div className={`p-3.5 rounded-2xl border transition-all text-left space-y-1.5 ${
                  isDarkMode 
                    ? 'bg-[#140f2b] border-[#291c52] hover:border-purple-500/40' 
                    : 'bg-white border-purple-100 hover:border-purple-300 shadow-xs'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="text-[9.5px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md flex items-center gap-1">
                      <Gift className="w-3 h-3" /> Special Promo
                    </span>
                    <span className="text-[10px] text-slate-400">Active</span>
                  </div>
                  <h5 className="font-bold text-xs text-slate-900 dark:text-white">
                    100% Subscription Cashback Active
                  </h5>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-normal">
                    Upgrade to Starter Plan (₹399/mo) and get the complete ₹399 credited back to your Arohi Coins Wallet instantly for mock tests and expert courses.
                  </p>
                </div>
              )}

              {/* 3. Platform Announcement: 150+ Languages & Voice Chat */}
              {(activeFilter === 'all' || activeFilter === 'announcements') && (
                <div className={`p-3.5 rounded-2xl border transition-all text-left space-y-1.5 ${
                  isDarkMode 
                    ? 'bg-[#140f2b] border-[#291c52] hover:border-purple-500/40' 
                    : 'bg-white border-purple-100 hover:border-purple-300 shadow-xs'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="text-[9.5px] font-black uppercase tracking-wider text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded-md flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> AI Update
                    </span>
                    <span className="text-[10px] text-slate-400">Live</span>
                  </div>
                  <h5 className="font-bold text-xs text-slate-900 dark:text-white">
                    150+ Multilingual Voice & Multimodal LLM
                  </h5>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-normal">
                    Speak naturally in Odia, Hindi, Bengali, Tamil, Telugu, English and 150+ languages with sub-second voice interactions and document OCR.
                  </p>
                </div>
              )}

              {/* 4. Live Sarkari & Corporate Job Sync */}
              {(activeFilter === 'all' || activeFilter === 'announcements') && (
                <div className={`p-3.5 rounded-2xl border transition-all text-left space-y-1.5 ${
                  isDarkMode 
                    ? 'bg-[#140f2b] border-[#291c52] hover:border-purple-500/40' 
                    : 'bg-white border-purple-100 hover:border-purple-300 shadow-xs'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="text-[9.5px] font-black uppercase tracking-wider text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-md flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Daily Sync
                    </span>
                    <span className="text-[10px] text-slate-400">Daily</span>
                  </div>
                  <h5 className="font-bold text-xs text-slate-900 dark:text-white">
                    Official Central & State Govt Job Postings
                  </h5>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-normal">
                    Verified UPSC, SSC, Railway, Banking, and Private vacancies refreshed every 24 hours with printable application slips.
                  </p>
                </div>
              )}

            </div>

            {/* Test & Simulation Tool Section for Reviewing Expiry States */}
            <div className={`p-3 border-t text-xs ${
              isDarkMode ? 'border-slate-800 bg-[#0d0921]' : 'border-slate-100 bg-slate-50'
            }`}>
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setShowSimulateBar(!showSimulateBar)}
                  className="text-[10px] font-bold text-slate-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <RefreshCw className={`w-3 h-3 ${showSimulateBar ? 'rotate-180 text-amber-400' : ''} transition-transform`} />
                  <span>{showSimulateBar ? 'Hide Simulation Tools' : 'Simulate 7-Day / 3-Day Alert'}</span>
                </button>
                <span className="text-[9.5px] text-slate-500 font-mono">
                  Current: {daysRemaining}d {hoursRemaining}h left
                </span>
              </div>

              {showSimulateBar && (
                <div className="mt-2 pt-2 border-t border-slate-800/60 flex flex-wrap items-center gap-1.5">
                  <span className="text-[9px] text-slate-400 font-bold uppercase block w-full text-left">
                    Set Subscription Period for Testing:
                  </span>
                  <button
                    type="button"
                    onClick={() => handleSimulateDays(7)}
                    className="px-2 py-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-400/40 rounded-lg text-[10px] font-black cursor-pointer transition-all"
                  >
                    7 Days (Alert Trigger)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSimulateDays(3)}
                    className="px-2 py-1 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 rounded-lg text-[10px] font-black cursor-pointer transition-all"
                  >
                    3 Days (Urgent)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSimulateDays(1)}
                    className="px-2 py-1 bg-rose-600/30 hover:bg-rose-600/40 text-rose-200 border border-rose-400 rounded-lg text-[10px] font-black cursor-pointer transition-all"
                  >
                    1 Day (Critical)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSimulateDays(30)}
                    className="px-2 py-1 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/40 rounded-lg text-[10px] font-black cursor-pointer transition-all"
                  >
                    Reset to 30 Days
                  </button>
                </div>
              )}
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
