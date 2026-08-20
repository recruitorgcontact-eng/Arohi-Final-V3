/**
 * Arohi AI Enterprise-Grade Subscription & Trial State Engine
 * 
 * Centralized Single Source of Truth for subscription validity, trial countdown,
 * lifetime VIP access, coupon validation, and multi-layered persistence synchronization.
 */

import { UserData } from '../context/AuthContext';

export const TWO_DAYS_MS = 2 * 24 * 60 * 60 * 1000;
export const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;
export const ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000;
export const LIFETIME_MS = 50 * 365 * 24 * 60 * 60 * 1000; // 50 years

// Permanent VIP / Founder Whitelist
export const PERMANENT_VIP_EMAILS: readonly string[] = [
  'elitetraderjunoon@gmail.com',
  'admin@arohiai.com',
  'founder@arohiai.com'
];

// Valid Promotional & Activation Coupons
export const VALID_COUPON_CODES: readonly string[] = [
  'JUNOON',
  'JUNOON399',
  'AROHI399',
  'PRO399',
  'FREE399',
  'VIP399',
  'ELITE399',
  'FOUNDER399'
];

/**
 * Checks if an email belongs to the permanent VIP / Founder tier
 */
export function isLifetimeVipEmail(email?: string | null): boolean {
  if (!email) return false;
  const clean = email.trim().toLowerCase();
  return PERMANENT_VIP_EMAILS.some(vip => vip.toLowerCase() === clean);
}

/**
 * Validates whether a coupon code is authorized
 */
export function isValidCouponCode(code?: string | null): boolean {
  if (!code) return false;
  const clean = code.trim().toUpperCase();
  if (VALID_COUPON_CODES.includes(clean)) return true;
  if (clean.startsWith('AROHI-') && clean.length >= 7) return true; // Referral codes
  if (clean.startsWith('VIP-') || clean.startsWith('PRO-') || clean.startsWith('JUNOON-')) return true;
  return false;
}

export interface SubscriptionStatus {
  // Primary active status
  isSubscribed: boolean;
  isLifetimeVip: boolean;
  hasActiveAccess: boolean; // Subscribed OR Trial Active

  // Plan Details
  planName: string;
  paymentMethod: string;
  couponApplied: string | null;
  
  // Subscription Cycle Timings
  effectiveEndDate: number;
  daysRemaining: number;
  hoursRemaining: number;
  minutesRemaining: number;
  secondsRemaining: number;
  msRemaining: number;
  isExpired: boolean;
  isExpiringSoon: boolean; // <= 7 days

  // Trial Timings (Mutually Exclusive with Active Subscription)
  isTrialActive: boolean;
  isTrialExpired: boolean;
  trialStartTime: number;
  trialDaysRemaining: number;
  trialHoursRemaining: number;
  trialMinutesRemaining: number;
  trialSecondsRemaining: number;
  trialMsRemaining: number;

  // UI Visibility Flags
  shouldShowTrialBadge: boolean;
  shouldShowTrialExpiredModal: boolean;
  shouldShowExpiryAlert: boolean;
}

export interface SubscriptionEngineInput {
  email?: string | null;
  userData?: UserData | null;
  subscriptions?: Record<string, boolean> | null;
  subscriptionEndDate?: number | null;
  subscriptionPlanName?: string | null;
  appliedCoupon?: string | null;
  trialStartTime?: number | null;
  currentTime?: number;
}

/**
 * Computes deterministic subscription and trial status with absolute consistency.
 */
export function computeSubscriptionState(input: SubscriptionEngineInput): SubscriptionStatus {
  const currentTime = input.currentTime || Date.now();
  const email = input.email || input.userData?.email || null;
  const isVip = isLifetimeVipEmail(email);

  // Check saved coupon from input or localStorage
  let activeCoupon = input.appliedCoupon || null;
  if (!activeCoupon && typeof window !== 'undefined') {
    try {
      activeCoupon = localStorage.getItem('arohi_applied_coupon');
    } catch (e) {}
  }
  const hasValidCoupon = isValidCouponCode(activeCoupon);

  // Check storage items as fallback
  let storedSubs: Record<string, boolean> = input.subscriptions || {};
  let storedEndDate: number = input.subscriptionEndDate || 0;
  let storedPlanName: string = input.subscriptionPlanName || '';

  if (typeof window !== 'undefined') {
    try {
      if (Object.keys(storedSubs).length === 0) {
        const saved = localStorage.getItem('arohi_subscriptions');
        if (saved) storedSubs = JSON.parse(saved);
      }
      if (!storedEndDate) {
        const savedEnd = localStorage.getItem('arohi_subscription_end_date');
        if (savedEnd) storedEndDate = parseInt(savedEnd, 10) || 0;
      }
      if (!storedPlanName) {
        storedPlanName = localStorage.getItem('arohi_subscription_plan_name') || '';
      }
    } catch (e) {}
  }

  // 1. VIP Overrides everything
  if (isVip) {
    const vipEndDate = currentTime + LIFETIME_MS;
    return {
      isSubscribed: true,
      isLifetimeVip: true,
      hasActiveAccess: true,
      planName: 'Enterprise Lifetime VIP (Permanent Access)',
      paymentMethod: 'Founder VIP Exemption',
      couponApplied: activeCoupon || 'PERMANENT_VIP',
      effectiveEndDate: vipEndDate,
      daysRemaining: 18250,
      hoursRemaining: 0,
      minutesRemaining: 0,
      secondsRemaining: 0,
      msRemaining: LIFETIME_MS,
      isExpired: false,
      isExpiringSoon: false,
      isTrialActive: false,
      isTrialExpired: false,
      trialStartTime: 0,
      trialDaysRemaining: 0,
      trialHoursRemaining: 0,
      trialMinutesRemaining: 0,
      trialSecondsRemaining: 0,
      trialMsRemaining: 0,
      shouldShowTrialBadge: false,
      shouldShowTrialExpiredModal: false,
      shouldShowExpiryAlert: false
    };
  }

  // 2. Resolve Firestore & Local Storage Subscriptions
  const firestoreSubscribed = Boolean(input.userData?.isSubscribed);
  const firestoreEndDate = input.userData?.subscriptionEndDate || 0;
  const isFirestoreActive = firestoreSubscribed || (firestoreEndDate > currentTime);

  const isLocalEndDateValid = storedEndDate > currentTime;
  const hasActiveLocalPaths = Object.values(storedSubs).some(Boolean);

  // User is subscribed if Firestore indicates so, local end date is valid, active paths exist, or valid coupon is active
  const isSubscribed = Boolean(
    isFirestoreActive || 
    isLocalEndDateValid || 
    (hasActiveLocalPaths && storedEndDate > currentTime) ||
    hasValidCoupon
  );

  // Compute effective end date
  let effectiveEndDate = 0;
  if (isSubscribed) {
    if (firestoreEndDate > 0) {
      effectiveEndDate = firestoreEndDate;
    } else if (storedEndDate > 0) {
      effectiveEndDate = storedEndDate;
    } else {
      effectiveEndDate = currentTime + THIRTY_DAYS_MS;
    }
  }

  const isExpired = isSubscribed && effectiveEndDate > 0 && effectiveEndDate <= currentTime;
  const subMsRemaining = (isSubscribed && !isExpired) ? Math.max(0, effectiveEndDate - currentTime) : 0;
  const daysRemaining = Math.floor(subMsRemaining / (1000 * 60 * 60 * 24));
  const hoursRemaining = Math.floor((subMsRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutesRemaining = Math.floor((subMsRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const secondsRemaining = Math.floor((subMsRemaining % (1000 * 60)) / 1000);

  // 3. Resolve Trial State (Strictly for non-subscribed users)
  let resolvedTrialStart = input.trialStartTime || 0;
  if (!resolvedTrialStart && typeof window !== 'undefined') {
    try {
      const savedTrial = localStorage.getItem('arohi_trial_start');
      if (savedTrial) resolvedTrialStart = parseInt(savedTrial, 10) || 0;
    } catch (e) {}
  }
  if (!resolvedTrialStart) {
    resolvedTrialStart = currentTime;
  }

  const trialElapsed = currentTime - resolvedTrialStart;
  const isTrialTimeRemaining = trialElapsed < TWO_DAYS_MS;
  
  // STRICT RULE: If the user is subscribed, trial is FALSE (never show trial badge or expired badge)
  const isTrialActive = !isSubscribed && isTrialTimeRemaining;
  const isTrialExpired = !isSubscribed && !isTrialTimeRemaining;

  const trialMsRemaining = isTrialActive ? Math.max(0, TWO_DAYS_MS - trialElapsed) : 0;
  const trialDaysRemaining = Math.floor(trialMsRemaining / (1000 * 60 * 60 * 24));
  const trialHoursRemaining = Math.floor(trialMsRemaining / (1000 * 60 * 60));
  const trialMinutesRemaining = Math.floor((trialMsRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const trialSecondsRemaining = Math.floor((trialMsRemaining % (1000 * 60)) / 1000);

  const planName = input.userData?.subscriptionPlanName || 
    storedPlanName || 
    (hasValidCoupon ? `Starter Plan (Coupon ${activeCoupon})` : 'Starter Plan (₹399/mo)');

  const paymentMethod = input.userData?.paymentMethod || (hasValidCoupon ? `Coupon (${activeCoupon})` : 'Web Gateway');

  return {
    isSubscribed,
    isLifetimeVip: false,
    hasActiveAccess: isSubscribed || isTrialActive,
    planName,
    paymentMethod,
    couponApplied: activeCoupon,
    effectiveEndDate,
    daysRemaining,
    hoursRemaining,
    minutesRemaining,
    secondsRemaining,
    msRemaining: subMsRemaining,
    isExpired,
    isExpiringSoon: isSubscribed && !isExpired && daysRemaining <= 7,
    isTrialActive,
    isTrialExpired,
    trialStartTime: resolvedTrialStart,
    trialDaysRemaining,
    trialHoursRemaining,
    trialMinutesRemaining,
    trialSecondsRemaining,
    trialMsRemaining,
    shouldShowTrialBadge: !isSubscribed && isTrialActive,
    shouldShowTrialExpiredModal: !isSubscribed && isTrialExpired,
    shouldShowExpiryAlert: isSubscribed && !isExpired && daysRemaining <= 7
  };
}

/**
 * Persists atomic subscription activation across all cache layers.
 */
export function persistSubscriptionActivation(params: {
  planName?: string;
  price?: number;
  couponCode?: string;
  paymentMethod?: string;
  customEndDate?: number;
}): { endDate: number; subs: Record<string, boolean>; details: any } {
  const now = Date.now();
  const endDate = params.customEndDate || (now + THIRTY_DAYS_MS);
  const planName = params.planName || 'Starter Plan (₹399/mo)';
  const subs = { path1: true, path2: false, path3: false, path4: false };
  const details = {
    path1: {
      tierName: planName,
      price: params.price ?? 399,
      margin: (params.price ?? 399) / 2
    }
  };

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('arohi_subscriptions', JSON.stringify(subs));
      localStorage.setItem('arohi_subscription_end_date', endDate.toString());
      localStorage.setItem('arohi_subscription_details', JSON.stringify(details));
      localStorage.setItem('arohi_subscription_plan_name', planName);
      if (params.couponCode) {
        localStorage.setItem('arohi_applied_coupon', params.couponCode.trim().toUpperCase());
      }
    } catch (e) {}
  }

  return { endDate, subs, details };
}
