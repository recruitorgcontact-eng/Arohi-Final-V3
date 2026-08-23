import React, { createContext, useContext, useEffect, useState } from 'react';
import { Application } from '../types';
import { isLifetimeVipEmail, persistSubscriptionActivation, LIFETIME_MS } from '../utils/subscriptionEngine';
import { 
  onAuthStateChanged,
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  sendPasswordResetEmail, 
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  OAuthProvider,
  signInWithPhoneNumber,
  RecaptchaVerifier
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { authenticateBiometricDevice } from '../lib/webauthn';
import { getChatDisplayDate, getCallDisplayDate } from '../utils/dateUtils';

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
}

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  location: string;
  education: string;
  activeGoal: string;
  resumeUrl?: string;
}

export interface InteractionLogItem {
  id: string;
  type: 'chat' | 'call' | 'activity' | 'application';
  title: string;
  summary: string;
  date: string;
}

export interface UserPersonalizationMemory {
  displayName: string;
  email: string;
  role: string;
  profile: UserProfile;
  summaryContext: string;
  pastInteractionLogs: InteractionLogItem[];
  activeGoal: string;
  education: string;
  location: string;
  totalChatsCount: number;
  totalCallsCount: number;
  lastInteractionDate: string;
}

export interface UserData {
  uid: string;
  email: string;
  displayName: string;
  role?: 'candidate' | 'recruiter';
  profile: UserProfile;
  enrolledCourses: string[];
  completedModules: Record<string, string[]>;
  checkedChecklist: Record<string, boolean>;
  earnedCertificates: string[];
  savedItems: Array<{ id: string; title: string; type: string; desc: string }>;
  applications: Application[];
  isSubscribed?: boolean;
  subscriptionPlanName?: string;
  subscriptionEndDate?: number;
  subscriptions?: Record<string, boolean>;
  subscriptionDetails?: Record<string, { tierName: string; price: number; margin: number }>;
  subscribedAt?: number;
  paymentMethod?: string;
  paymentId?: string;
  arohiChats?: Array<{
    id: string;
    title: string;
    date: string;
    messages: Array<{
      id: string;
      role: 'user' | 'assistant';
      content: string;
      timestamp: string;
    }>;
  }>;
  arohiCalls?: Array<{
    id: string;
    duration: number;
    turns: any[];
    date: string;
    summaryText: string;
    isCareerRelated: boolean;
  }>;
  diagnostics?: {
    atsScore: number;
    interviewScore: number;
    businessScore: number;
  };
  activities?: Array<{
    id: string;
    type: string;
    title: string;
    description: string;
    timestamp: string;
  }>;
  mockTestHistory?: any[];
  lastExamDate?: string;
  examPass?: {
    tier: 'silver' | 'gold';
    name: string;
    totalTests: number;
    testsRemaining: number;
    activatedAt: string;
    paymentMethod: string;
  };
  freeExamAttemptsCount?: number;
  stats?: Record<string, any>;
  entrySource?: string;
  updatedAt?: string;
}

export function cleanLegacyProfileDefaults(profile?: Partial<UserProfile>): UserProfile {
  const p: UserProfile = {
    name: profile?.name || '',
    email: profile?.email || '',
    phone: profile?.phone || '',
    location: profile?.location || '',
    education: profile?.education || '',
    activeGoal: profile?.activeGoal || '',
    resumeUrl: profile?.resumeUrl || ''
  };

  // Remove legacy dummy defaults that were previously hardcoded for all users
  if (p.activeGoal === 'Skills, Courses & Career Preparation' || p.activeGoal === 'Mudra Loan Business & Franchise Setup') {
    p.activeGoal = '';
  }
  if (p.location === 'Delhi NCR' || p.location === 'Delhi') {
    const localLocation = typeof window !== 'undefined' ? localStorage.getItem('recruit_user_location') : null;
    if (!localLocation || localLocation === 'Delhi NCR' || localLocation === 'Delhi') {
      p.location = '';
    }
  }
  if (p.education === 'Graduate' || p.education === 'Business Owner') {
    const localEdu = typeof window !== 'undefined' ? localStorage.getItem('recruit_user_education') : null;
    if (!localEdu || localEdu === 'Graduate' || localEdu === 'Business Owner') {
      p.education = '';
    }
  }
  if (p.phone === '+91 98765 43210') {
    p.phone = '';
  }

  return p;
}

export function buildPersonalizationMemory(data: UserData): UserPersonalizationMemory {
  const displayName = data.displayName || data.profile?.name || data.email?.split('@')[0] || 'Honored Guest';
  const email = data.email || '';
  const role = data.role || 'candidate';
  const rawProfile: UserProfile = data.profile || {
    name: displayName,
    email: email,
    phone: '',
    location: '',
    education: '',
    activeGoal: ''
  };
  const profile = cleanLegacyProfileDefaults(rawProfile);

  const chats = data.arohiChats || [];
  const calls = data.arohiCalls || [];
  const activities = data.activities || [];
  const apps = data.applications || [];

  const interactionLogs: InteractionLogItem[] = [];

  // Parse chat logs
  chats.forEach((chat) => {
    let summaryStr = '';
    if (chat.messages && chat.messages.length > 0) {
      const userMsgs = chat.messages.filter(m => m && m.role === 'user').map(m => m.content);
      const assistantMsgs = chat.messages.filter(m => m && m.role === 'assistant').map(m => m.content);
      const lastAssistant = assistantMsgs.length > 0 ? assistantMsgs[assistantMsgs.length - 1] : '';
      
      if (userMsgs.length > 0) {
        summaryStr = `Topics discussed: "${userMsgs.slice(-3).join(' | ')}". ${lastAssistant ? `Arohi advised: "${lastAssistant.substring(0, 150)}..."` : ''}`;
      } else {
        summaryStr = `Chat session with ${chat.messages.length} messages.`;
      }
    } else {
      summaryStr = `Chat session titled "${chat.title || 'Discussion'}".`;
    }

    const chatDisplayDate = getChatDisplayDate(chat);
    interactionLogs.push({
      id: chat.id || `chat_${Math.random()}`,
      type: 'chat',
      title: chat.title || 'Arohi AI Consultation',
      summary: summaryStr,
      date: chatDisplayDate
    });
  });

  // Parse voice call logs
  calls.forEach((call) => {
    const durationMin = Math.round((call.duration || 0) / 60);
    const callDisplayDate = getCallDisplayDate(call);
    interactionLogs.push({
      id: call.id || `call_${Math.random()}`,
      type: 'call',
      title: `Voice Discussion (${durationMin > 0 ? durationMin + 'm' : 'Live'})`,
      summary: call.summaryText || 'Dynamic Arohi AI audio consultation completed.',
      date: callDisplayDate
    });
  });

  // Parse activity logs
  activities.slice(0, 8).forEach((act) => {
    interactionLogs.push({
      id: act.id || `act_${Math.random()}`,
      type: 'activity',
      title: act.title || 'User Action',
      summary: act.description || 'System interaction recorded.',
      date: act.timestamp || 'Recent'
    });
  });

  // Parse applications
  apps.forEach((app: any) => {
    const jobTitle = app.jobTitle || app.postingTitle || 'Job Position';
    const company = app.companyName || 'Recruit India Portal';
    interactionLogs.push({
      id: app.id || `app_${Math.random()}`,
      type: 'application',
      title: `Applied to ${jobTitle}`,
      summary: `Applied at ${company} (${app.status || 'Submitted'})`,
      date: app.appliedDate || 'Recent'
    });
  });

  // Build high-density system-level context string for Arohi AI Engine
  let summaryContext = `=== AROHI PERSONALIZATION MEMORY ENGINE ===\n`;
  summaryContext += `* User Name: ${displayName}\n`;
  summaryContext += `* Primary Email: ${email}\n`;
  summaryContext += `* Target Role: ${role === 'recruiter' ? 'Business Owner / Recruiter / Entrepreneur' : 'Jobseeker / Candidate / Student'}\n`;
  if (profile.education) summaryContext += `* Education Background: ${profile.education}\n`;
  if (profile.activeGoal) summaryContext += `* Active Career/Interest Goal: ${profile.activeGoal}\n`;
  if (profile.location) summaryContext += `* Location: ${profile.location}\n`;
  if (profile.phone) summaryContext += `* Contact Phone: ${profile.phone}\n`;

  if (chats.length > 0) {
    summaryContext += `\n* Past Text Discussions (${chats.length} total sessions):\n`;
    chats.slice(0, 5).forEach((c, idx) => {
      const topMsg = c.messages && c.messages.length > 0 ? c.messages[0].content : '';
      summaryContext += `  ${idx + 1}. [${getChatDisplayDate(c)}] Title: "${c.title}" ${topMsg ? `| Initial query: "${topMsg.substring(0, 80)}..."` : ''}\n`;
    });
  }

  if (calls.length > 0) {
    summaryContext += `\n* Past Voice Call Sessions (${calls.length} total calls):\n`;
    calls.slice(0, 4).forEach((call, idx) => {
      summaryContext += `  ${idx + 1}. [${getCallDisplayDate(call)}] ${call.summaryText ? call.summaryText.substring(0, 120) : 'Interactive voice call'}\n`;
    });
  }

  if (apps.length > 0) {
    summaryContext += `\n* Job Applications Tracked: ${apps.slice(0, 4).map((a: any) => `${a.jobTitle || a.postingTitle || 'Position'} (${a.status || 'Submitted'})`).join(', ')}\n`;
  }

  if (data.enrolledCourses && data.enrolledCourses.length > 0) {
    summaryContext += `\n* Enrolled Courses: ${data.enrolledCourses.join(', ')}\n`;
  }

  summaryContext += `\nPERSONALIZATION DIRECTIVES: You are Arohi AI, a warm, highly empathetic mentor. Greet ${displayName} naturally, remember their past queries, shared interactions, and genuine goals. Never assume or fix a default location (like Delhi) or career goal unless the user explicitly stated it. Arohi learns dynamically from what the user asks and discusses across chats and calls.`;

  return {
    displayName,
    email,
    role,
    profile,
    summaryContext,
    pastInteractionLogs: interactionLogs,
    activeGoal: profile.activeGoal,
    education: profile.education,
    location: profile.location,
    totalChatsCount: chats.length,
    totalCallsCount: calls.length,
    lastInteractionDate: interactionLogs[0]?.date || new Date().toLocaleDateString('en-IN')
  };
}

interface AuthContextType {
  user: User | null;
  userData: UserData | null;
  userMemory: UserPersonalizationMemory | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<any>;
  signUp: (email: string, password: string, name: string, role?: 'candidate' | 'recruiter', phone?: string) => Promise<void>;
  signInWithGoogle: (role?: 'candidate' | 'recruiter') => Promise<any>;
  signInWithApple: (role?: 'candidate' | 'recruiter') => Promise<any>;
  signInWithPhone: (phoneNumber: string, recaptchaVerifier: any, role?: 'candidate' | 'recruiter') => Promise<any>;
  signOutUser: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  refreshPersonalizationMemory: () => Promise<UserPersonalizationMemory | null>;
  updateUserProfile: (profile: Partial<UserProfile>) => Promise<void>;
  updateCareerProgress: (progress: {
    enrolledCourses?: string[];
    completedModules?: Record<string, string[]>;
    checkedChecklist?: Record<string, boolean>;
    earnedCertificates?: Record<string, any> | string[];
  }) => Promise<void>;
  updateBookmarks: (savedItems: Array<{ id: string; title: string; type: string; desc: string }>) => Promise<void>;
  updateApplications: (applications: Application[]) => Promise<void>;
  updateArohiChats: (arohiChats: any[]) => Promise<void>;
  updateArohiCalls: (arohiCalls: any[]) => Promise<void>;
  updateDiagnostics: (diagnostics: {
    atsScore?: number;
    interviewScore?: number;
    businessScore?: number;
  }) => Promise<void>;
  updateActivities: (activities: Array<{
    id: string;
    type: string;
    title: string;
    description: string;
    timestamp: string;
  }>) => Promise<void>;
  updateUserSubscription: (subData: {
    isSubscribed: boolean;
    subscriptionPlanName?: string;
    subscriptionEndDate?: number;
    subscriptions?: Record<string, boolean>;
    subscriptionDetails?: Record<string, { tierName: string; price: number; margin: number }>;
    paymentMethod?: string;
    paymentId?: string;
  }) => Promise<void>;
  activateExamPass: (tier: 'silver' | 'gold', paymentMethod?: string) => Promise<void>;
  incrementFreeExamAttempt: () => Promise<number>;
  signInWithBiometrics: (email: string) => Promise<void>;
}

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export function getEntrySource(): string {
  if (typeof window === 'undefined') return 'Unknown';
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (navigator as any).standalone || document.referrer.includes('android-app://');
  const ua = navigator.userAgent;
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
  
  if (isStandalone) {
    if (isMobile) {
      if (/iPhone|iPad|iPod/i.test(ua)) {
        return "Installed PWA (iOS Mobile)";
      }
      return "Installed PWA (Android Mobile)";
    }
    return "Installed PWA (Desktop)";
  }
  
  if (/iPhone|iPad|iPod/i.test(ua)) {
    if (/FxiOS/i.test(ua)) return "Mobile Firefox (iOS)";
    if (/CriOS/i.test(ua)) return "Mobile Chrome (iOS)";
    return "Mobile Safari (iOS)";
  }
  if (/Android/i.test(ua)) {
    if (/Firefox/i.test(ua)) return "Mobile Firefox (Android)";
    return "Mobile Chrome (Android)";
  }
  if (/Macintosh/i.test(ua)) return "Desktop Safari/Chrome (macOS)";
  if (/Windows/i.test(ua)) return "Desktop Chrome/Edge (Windows)";
  if (/Linux/i.test(ua)) return "Desktop Chrome/Firefox (Linux)";
  return "Website Browser";
}

// Helper to safely merge lifetime chat histories without losing past conversations
const mergeArohiChatLists = (listA: any[] = [], listB: any[] = []): any[] => {
  const map = new Map<string, any>();
  for (const c of (listA || [])) {
    if (c && c.id) map.set(c.id, c);
  }
  for (const c of (listB || [])) {
    if (c && c.id) {
      const prev = map.get(c.id);
      if (!prev) {
        map.set(c.id, c);
      } else {
        const inMsgs = Array.isArray(c.messages) ? c.messages.length : 0;
        const prevMsgs = Array.isArray(prev.messages) ? prev.messages.length : 0;
        if (inMsgs >= prevMsgs) {
          map.set(c.id, { ...prev, ...c });
        }
      }
    }
  }
  return Array.from(map.values());
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('recruit_user');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return null;
  });
  const [userData, setUserData] = useState<UserData | null>(() => {
    try {
      const savedUser = localStorage.getItem('recruit_user');
      if (savedUser) {
        const u = JSON.parse(savedUser);
        const cached = localStorage.getItem(`recruit_user_data_${u.uid}`);
        if (cached) {
          const parsed = JSON.parse(cached);
          const cachedChats = localStorage.getItem(`arohi_saved_chats_${u.uid}`);
          if (cachedChats) {
            try {
              const chatsArr = JSON.parse(cachedChats);
              if (Array.isArray(chatsArr) && chatsArr.length > 0) {
                parsed.arohiChats = mergeArohiChatLists(parsed.arohiChats || [], chatsArr);
              }
            } catch (e) {}
          }
          return parsed;
        }
      }
    } catch (e) {}
    return null;
  });
  const [userMemory, setUserMemory] = useState<UserPersonalizationMemory | null>(null);
  const [loading, setLoading] = useState(false);

  // Sync memory state automatically whenever userData changes
  useEffect(() => {
    if (userData) {
      try {
        const memory = buildPersonalizationMemory(userData);
        setUserMemory(memory);
      } catch (err) {
        console.error("Error building user personalization memory:", err);
      }
    } else {
      setUserMemory(null);
    }
  }, [userData]);

  // Helper to fetch or create user data with multiple fallback layers
  const loadAndSyncUserData = async (firebaseUser: any, role?: 'candidate' | 'recruiter'): Promise<UserData> => {
    const uid = firebaseUser.uid;
    const email = firebaseUser.email || '';
    const displayName = firebaseUser.displayName || 'Honored Guest';
    const entrySource = getEntrySource();

    // Helper to merge local cached chats into fetched user data
    const enrichUserDataWithChats = (data: UserData): UserData => {
      try {
        const cachedChats = localStorage.getItem(`arohi_saved_chats_${uid}`);
        if (cachedChats) {
          const chatsArr = JSON.parse(cachedChats);
          if (Array.isArray(chatsArr) && chatsArr.length > 0) {
            data.arohiChats = mergeArohiChatLists(data.arohiChats || [], chatsArr);
          }
        }
      } catch (e) {}
      localStorage.setItem(`recruit_user_data_${uid}`, JSON.stringify(data));
      if (data.arohiChats && data.arohiChats.length > 0) {
        try {
          localStorage.setItem(`arohi_saved_chats_${uid}`, JSON.stringify(data.arohiChats));
        } catch (e) {}
      }
      // Resilient VIP & Subscription sync
      const isVip = isLifetimeVipEmail(data?.email || email);
      if (isVip) {
        data.isSubscribed = true;
        data.subscriptionPlanName = 'Enterprise Lifetime VIP (Permanent Access)';
        data.subscriptionEndDate = Date.now() + LIFETIME_MS;
        data.subscriptions = { path1: true, path2: true, path3: true, path4: true };
        data.paymentMethod = 'Founder VIP Exemption';
        persistSubscriptionActivation({
          planName: 'Enterprise Lifetime VIP (Permanent Access)',
          price: 0,
          customEndDate: Date.now() + LIFETIME_MS,
          paymentMethod: 'Founder VIP Exemption'
        });
      } else if (data && (data.isSubscribed || (data.subscriptionEndDate && data.subscriptionEndDate > Date.now()))) {
        try {
          const now = Date.now();
          const endDate = (data.subscriptionEndDate && data.subscriptionEndDate > now)
            ? data.subscriptionEndDate
            : now + (30 * 24 * 60 * 60 * 1000);
          const subs = data.subscriptions || { path1: true, path2: false, path3: false, path4: false };
          localStorage.setItem('arohi_subscriptions', JSON.stringify(subs));
          localStorage.setItem('arohi_subscription_end_date', endDate.toString());
          if (data.subscriptionPlanName) {
            localStorage.setItem('arohi_subscription_plan_name', data.subscriptionPlanName);
          }
          if (data.subscriptionDetails) {
            localStorage.setItem('arohi_subscription_details', JSON.stringify(data.subscriptionDetails));
          }
        } catch (e) {}
      }
      return data;
    };

    // Layer 1: Server-side API proxy (fast, server-to-server, 100% immune to iframe/browser WebSocket blocks)
    try {
      const response = await fetch('/api/auth/me', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid, entrySource })
      });
      if (response.ok) {
        const resData = await response.json();
        if (resData?.success && resData?.userData) {
          const uData = enrichUserDataWithChats(resData.userData as UserData);
          return uData;
        }
      }
    } catch (err) {
      console.warn("Resilient Auth: Server-side '/api/auth/me' call failed. Trying next layer.", err);
    }

    // Layer 2: Server-side google-sync / signup API proxy (makes sure user is initialized)
    try {
      const response = await fetch('/api/auth/google-sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid, email, displayName, role, entrySource })
      });
      if (response.ok) {
        const resData = await response.json();
        if (resData?.success && resData?.userData) {
          const uData = enrichUserDataWithChats(resData.userData as UserData);
          return uData;
        }
      }
    } catch (err) {
      console.warn("Resilient Auth: Server-side '/api/auth/google-sync' call failed. Trying next layer.", err);
    }

    // Layer 3: Direct Client-side Firestore SDK (sometimes works if browser has no iframe security block)
    try {
      const docRef = doc(db, 'users', uid);
      const docSnap = await getDoc(docRef);
      if (docSnap && docSnap.exists()) {
        let uData = docSnap.data() as UserData;
        
        // If entrySource is different, update it client-side too
        if (entrySource && uData.entrySource !== entrySource) {
          uData.entrySource = entrySource;
          try {
            await setDoc(docRef, uData);
          } catch (e) {
            console.warn("Client-side direct entrySource update failed.", e);
          }
        }

        uData = enrichUserDataWithChats(uData);
        return uData;
      } else {
        // Create initial user doc client-side if missing
        const initialData: UserData = enrichUserDataWithChats({
          uid,
          email,
          displayName,
          role: role || 'candidate',
          entrySource: entrySource,
          profile: {
            name: displayName || email.split('@')[0] || 'User',
            email: email,
            phone: '',
            location: '',
            education: '',
            activeGoal: ''
          },
          enrolledCourses: [],
          completedModules: {},
          checkedChecklist: {},
          earnedCertificates: [],
          savedItems: [],
          applications: [],
          diagnostics: {
            atsScore: 0,
            interviewScore: 0,
            businessScore: 0
          },
          activities: []
        });
        await setDoc(docRef, initialData);
        return initialData;
      }
    } catch (err) {
      console.warn("Resilient Auth: Client-side Firestore direct SDK call failed. Trying cache fallback.", err);
    }

    // Layer 4: Local Storage Cached Data (Ultimate robust offline operation)
    const cached = localStorage.getItem(`recruit_user_data_${uid}`);
    if (cached) {
      try {
        return JSON.parse(cached) as UserData;
      } catch (e) {
        console.error("Failed to parse cached user data:", e);
      }
    }

    // Layer 5: Fallback default object (never let the UI crash or spinner spin forever)
    const fallbackData: UserData = {
      uid,
      email,
      displayName,
      role: role || 'candidate',
      profile: {
        name: displayName || email.split('@')[0] || 'User',
        email: email,
        phone: '',
        location: '',
        education: '',
        activeGoal: ''
      },
      enrolledCourses: [],
      completedModules: {},
      checkedChecklist: {},
      earnedCertificates: [],
      savedItems: [],
      applications: [],
      diagnostics: {
        atsScore: 0,
        interviewScore: 0,
        businessScore: 0
      },
      activities: []
    };
    localStorage.setItem(`recruit_user_data_${uid}`, JSON.stringify(fallbackData));
    return fallbackData;
  };

  // Monitor auth state from Firebase client SDK
  useEffect(() => {
    let unsubscribe = () => {};
    try {
      unsubscribe = onAuthStateChanged(
        auth,
        async (firebaseUser) => {
          try {
            if (firebaseUser) {
              const loggedUser: User = {
                uid: firebaseUser.uid,
                email: firebaseUser.email,
                displayName: firebaseUser.displayName,
              };
              setUser(loggedUser);
              localStorage.setItem('recruit_user', JSON.stringify(loggedUser));

              const storedRole = sessionStorage.getItem('recruit_phone_signup_role') as 'candidate' | 'recruiter' | null;
              if (storedRole) {
                sessionStorage.removeItem('recruit_phone_signup_role');
              }

              // Fetch up-to-date userData through our multi-layer resilient function
              const data = await loadAndSyncUserData(firebaseUser, storedRole || undefined);
              setUserData(data);
            } else {
              // Check if we already have a logged-in user in localStorage
              const stored = localStorage.getItem('recruit_user');
              if (stored) {
                try {
                  const cachedUser = JSON.parse(stored);
                  setUser(cachedUser);
                  const cachedDataStr = localStorage.getItem(`recruit_user_data_${cachedUser.uid}`);
                  if (cachedDataStr) {
                    setUserData(JSON.parse(cachedDataStr));
                  }
                } catch (e) {
                  setUser(null);
                  setUserData(null);
                  localStorage.removeItem('recruit_user');
                }
              } else {
                setUser(null);
                setUserData(null);
              }
            }
          } catch (err) {
            console.error("Error inside onAuthStateChanged:", err);
          } finally {
            setLoading(false);
          }
        },
        (error) => {
          console.warn("Firebase Auth listener error (e.g. invalid API key or offline mode):", error?.message || error);
          try {
            const stored = localStorage.getItem('recruit_user');
            if (stored) {
              setUser(JSON.parse(stored));
            }
          } catch (e) {
            setUser(null);
          }
          setLoading(false);
        }
      );
    } catch (err) {
      console.warn("Failed to initialize onAuthStateChanged listener:", err);
      setLoading(false);
    }

    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      const loggedUser: User = {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName
      };
      setUser(loggedUser);
      localStorage.setItem('recruit_user', JSON.stringify(loggedUser));

      // Fetch user document
      const data = await loadAndSyncUserData(firebaseUser);
      setUserData(data);
      return data;
    } catch (clientErr: any) {
      console.warn("Client sign-in failed. Trying server-side proxy fallback...", clientErr);
      
      try {
        const response = await fetch('/api/auth/signin', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email.trim(), password, entrySource: getEntrySource() })
        });
        
        const resData = await response.json();
        if (response.ok && resData?.success && resData?.user) {
          const loggedUser: User = {
            uid: resData.user.uid,
            email: resData.user.email,
            displayName: resData.user.displayName
          };
          setUser(loggedUser);
          localStorage.setItem('recruit_user', JSON.stringify(loggedUser));
          setUserData(resData.userData);
          return resData.userData;
        } else {
          let errText = resData?.error || 'Invalid email or password.';
          if (errText.includes('INVALID_PASSWORD') || errText.includes('INVALID_LOGIN_CREDENTIALS')) {
            errText = 'Invalid email or password. Please check your credentials.';
          } else if (errText.includes('EMAIL_NOT_FOUND')) {
            errText = 'No account found with this email. Please click CREATE ACCOUNT to register.';
          }
          throw new Error(errText);
        }
      } catch (serverErr: any) {
        console.error("Server-side proxy fallback failed:", serverErr);
        // Use server error if available, or clean message instead of raw technical domain error
        let finalMessage = serverErr.message || 'Authentication failed.';
        if (finalMessage.includes('auth/unauthorized-domain') || clientErr.message?.includes('auth/unauthorized-domain')) {
          if (serverErr.message && !serverErr.message.includes('auth/unauthorized-domain')) {
            finalMessage = serverErr.message;
          } else {
            finalMessage = `Domain Authorization Required: To sign in with client SDK on ${window.location.hostname}, please add this domain to Firebase Console -> Auth -> Settings -> Authorized Domains. Otherwise, verify your email and password to use server authentication.`;
          }
        } else if (finalMessage.includes('api-key-not-valid')) {
          finalMessage = 'Firebase Client Error: (auth/api-key-not-valid). Please check if your Google Cloud API Key is restricted in your GCP Console -> Credentials!';
        }
        throw new Error(finalMessage);
      }
    }
  };

  const signUp = async (email: string, password: string, name: string, role?: 'candidate' | 'recruiter', phone?: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      // Update display name in Firebase Auth
      await updateProfile(firebaseUser, { displayName: name });

      const initialData: UserData = {
        uid: firebaseUser.uid,
        email: firebaseUser.email || '',
        displayName: name,
        role: role || 'candidate',
        entrySource: getEntrySource(),
        profile: {
          name: name || firebaseUser.email?.split('@')[0] || 'User',
          email: firebaseUser.email || '',
          phone: phone || '',
          location: '',
          education: '',
          activeGoal: ''
        },
        enrolledCourses: [],
        completedModules: {},
        checkedChecklist: {},
        earnedCertificates: [],
        savedItems: [],
        applications: [],
        diagnostics: {
          atsScore: 0,
          interviewScore: 0,
          businessScore: 0
        },
        activities: []
      };

      // Attempt registration/sync via server-side first
      try {
        const response = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: name,
            role: role || 'candidate',
            mobile: phone || '',
            entrySource: getEntrySource()
          })
        });
        if (response.ok) {
          const resData = await response.json();
          if (resData?.success && resData?.userData) {
            setUserData(resData.userData);
            localStorage.setItem(`recruit_user_data_${firebaseUser.uid}`, JSON.stringify(resData.userData));
            return;
          }
        }
      } catch (err) {
        console.warn("Server signup endpoint failed, using client fallback", err);
      }

      // Direct Client-side Firestore write fallback
      const docRef = doc(db, 'users', firebaseUser.uid);
      try {
        await setDoc(docRef, initialData);
      } catch (err) {
        console.warn("Client-side setDoc on signup failed, continuing offline", err);
      }

      const loggedUser: User = {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: name
      };
      setUser(loggedUser);
      setUserData(initialData);
      localStorage.setItem('recruit_user', JSON.stringify(loggedUser));
      localStorage.setItem(`recruit_user_data_${firebaseUser.uid}`, JSON.stringify(initialData));
    } catch (clientErr: any) {
      console.warn("Client sign-up failed. Trying server-side proxy fallback...", clientErr);
      
      try {
        const response = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email.trim(), password, name, role: role || 'candidate', mobile: phone || '', entrySource: getEntrySource() })
        });
        
        const resData = await response.json();
        if (response.ok && resData?.success && resData?.user) {
          const loggedUser: User = {
            uid: resData.user.uid,
            email: resData.user.email,
            displayName: resData.user.displayName
          };
          setUser(loggedUser);
          localStorage.setItem('recruit_user', JSON.stringify(loggedUser));
          setUserData(resData.userData);
          return;
        } else {
          let errText = resData?.error || 'Server-side registration failed.';
          if (errText.includes('EMAIL_EXISTS')) {
            errText = 'An account with this email address already exists. Please SIGN IN instead.';
          }
          throw new Error(errText);
        }
      } catch (serverErr: any) {
        console.error("Server-side proxy fallback failed:", serverErr);
        let finalMessage = serverErr.message || 'Registration failed.';
        if (finalMessage.includes('auth/unauthorized-domain') || clientErr.message?.includes('auth/unauthorized-domain')) {
          if (serverErr.message && !serverErr.message.includes('auth/unauthorized-domain')) {
            finalMessage = serverErr.message;
          } else {
            finalMessage = `Domain Authorization Notice: Add ${window.location.hostname} to Firebase Console -> Authentication -> Authorized Domains to use direct client SDK, or submit registration again to use server proxy.`;
          }
        } else if (finalMessage.includes('api-key-not-valid')) {
          finalMessage = 'Firebase Client Error: (auth/api-key-not-valid). Please check if your Google Cloud API Key is restricted in your GCP Console -> Credentials!';
        }
        throw new Error(finalMessage);
      }
    }
  };

  const signInWithGoogle = async (role?: 'candidate' | 'recruiter') => {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });

      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;

      const loggedUser: User = {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName
      };
      setUser(loggedUser);
      localStorage.setItem('recruit_user', JSON.stringify(loggedUser));

      // Fetch user document
      const data = await loadAndSyncUserData(firebaseUser, role);
      setUserData(data);
      return data;
    } catch (err: any) {
      if (err?.code === 'auth/operation-not-allowed' || err?.message?.includes('operation-not-allowed')) {
        throw new Error(`Google Sign-In is not enabled in your Firebase Console. Please enable Google provider in Firebase Console -> Authentication -> Sign-in method.`);
      }
      if (err?.code === 'auth/unauthorized-domain' || err?.message?.includes('unauthorized-domain')) {
        throw new Error(`Google Sign-In Domain Error: "${window.location.hostname}" is not authorized in your Firebase Console. Please add "${window.location.hostname}" to Firebase Console -> Authentication -> Settings -> Authorized Domains.`);
      }
      throw err;
    }
  };

  const signInWithApple = async (role?: 'candidate' | 'recruiter') => {
    try {
      const provider = new OAuthProvider('apple.com');
      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;

      const loggedUser: User = {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName || 'Apple User'
      };
      setUser(loggedUser);
      localStorage.setItem('recruit_user', JSON.stringify(loggedUser));

      // Fetch user document
      const data = await loadAndSyncUserData(firebaseUser, role);
      setUserData(data);
      return data;
    } catch (err: any) {
      if (err?.code === 'auth/operation-not-allowed' || err?.message?.includes('operation-not-allowed')) {
        throw new Error(`Apple Sign-In is not enabled on this Firebase project yet. Please use "Continue with Google" or "Continue with Email" to sign in instantly!`);
      }
      if (err?.code === 'auth/unauthorized-domain' || err?.message?.includes('unauthorized-domain')) {
        throw new Error(`Apple Sign-In Domain Error: "${window.location.hostname}" is not authorized in your Firebase Console. Please add "${window.location.hostname}" to Firebase Console -> Authentication -> Settings -> Authorized Domains.`);
      }
      throw err;
    }
  };

  const signInWithPhone = async (phoneNumber: string, recaptchaVerifier: any, role?: 'candidate' | 'recruiter') => {
    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
    
    // Store the desired role in session storage/local storage so we can associate it when confirmation finishes (if needed)
    if (role) {
      sessionStorage.setItem('recruit_phone_signup_role', role);
    }
    return confirmationResult;
  };

  const signOutUser = async () => {
    await signOut(auth);
    setUser(null);
    setUserData(null);
    localStorage.removeItem('recruit_user');
  };

  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  const signInWithBiometrics = async (email: string) => {
    const emailKey = email.trim().toLowerCase();
    const rawRecord = localStorage.getItem(`recruit_biometric_${emailKey}`);
    if (!rawRecord) {
      throw new Error("No enrolled biometric credentials found on this device for this email. Please sign in with email/password first, then enroll this device in your Profile.");
    }

    const verified = await authenticateBiometricDevice(emailKey);
    if (!verified) {
      throw new Error("Biometric verification was rejected.");
    }

    const storedUserStr = localStorage.getItem(`recruit_biometric_user_${emailKey}`);
    if (!storedUserStr) {
      throw new Error("Biometric association context not found. Please sign in with email/password once to sync.");
    }

    const cachedUser = JSON.parse(storedUserStr);
    const loggedUser: User = {
      uid: cachedUser.uid,
      email: cachedUser.email,
      displayName: cachedUser.displayName || email.split('@')[0]
    };

    setUser(loggedUser);
    localStorage.setItem('recruit_user', JSON.stringify(loggedUser));

    try {
      const data = await loadAndSyncUserData({ uid: cachedUser.uid, email: cachedUser.email } as any);
      setUserData(data);
    } catch (err) {
      console.warn("Could not load real-time Firestore user data during biometric login. Loading local cache...", err);
      const localDataStr = localStorage.getItem(`recruit_user_data_${cachedUser.uid}`);
      if (localDataStr) {
        setUserData(JSON.parse(localDataStr));
      }
    }
  };

  const updateUserProfile = async (profileUpdate: Partial<UserProfile>) => {
    if (!user) return;
    const currentProfile = userData?.profile || {};
    const updatedProfile = { ...currentProfile, ...profileUpdate };
    const updatedUserData = userData ? { 
      ...userData, 
      profile: updatedProfile as UserProfile,
      displayName: profileUpdate.name || userData.displayName
    } : null;

    // Optimistically update local state & cache
    if (updatedUserData) {
      setUserData(updatedUserData);
      localStorage.setItem(`recruit_user_data_${user.uid}`, JSON.stringify(updatedUserData));
    }

    // Layer 1: Server-side API (preferred, robust)
    try {
      const response = await fetch('/api/auth/update-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid: user.uid, profile: profileUpdate })
      });
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.userData) {
          setUserData(data.userData);
          localStorage.setItem(`recruit_user_data_${user.uid}`, JSON.stringify(data.userData));
          return;
        }
      }
    } catch (err) {
      console.warn("Server-side profile update failed, attempting direct client-side Firestore SDK:", err);
    }

    // Layer 2: Client-side Firestore SDK fallback
    try {
      const docRef = doc(db, 'users', user.uid);
      const updatePayload: any = {
        profile: updatedProfile,
        updatedAt: new Date().toISOString()
      };
      if (profileUpdate.name) {
        updatePayload.displayName = profileUpdate.name;
      }
      await updateDoc(docRef, updatePayload);
    } catch (err) {
      console.warn("Both server-side and client-side Firestore profile updates failed. Changes saved locally.", err);
    }
  };

  const updateCareerProgress = async (progress: {
    enrolledCourses?: string[];
    completedModules?: Record<string, string[]>;
    checkedChecklist?: Record<string, boolean>;
    earnedCertificates?: string[];
  }) => {
    if (!user) return;
    const updatedUserData = userData ? { ...userData, ...progress } : null;

    // Optimistically update local state & cache
    if (updatedUserData) {
      setUserData(updatedUserData);
      localStorage.setItem(`recruit_user_data_${user.uid}`, JSON.stringify(updatedUserData));
    }

    // Layer 1: Server-side API
    try {
      const response = await fetch('/api/auth/update-career', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid: user.uid, progress })
      });
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.userData) {
          setUserData(data.userData);
          localStorage.setItem(`recruit_user_data_${user.uid}`, JSON.stringify(data.userData));
          return;
        }
      }
    } catch (err) {
      console.warn("Server-side career progress update failed, attempting direct client-side Firestore SDK:", err);
    }

    // Layer 2: Client-side Firestore SDK fallback
    try {
      const docRef = doc(db, 'users', user.uid);
      const updatePayload: any = {};
      if (progress.enrolledCourses) updatePayload.enrolledCourses = progress.enrolledCourses;
      if (progress.completedModules) updatePayload.completedModules = progress.completedModules;
      if (progress.checkedChecklist) updatePayload.checkedChecklist = progress.checkedChecklist;
      if (progress.earnedCertificates) updatePayload.earnedCertificates = progress.earnedCertificates;
      updatePayload.updatedAt = new Date().toISOString();
      await updateDoc(docRef, updatePayload);
    } catch (err) {
      console.warn("Both server-side and client-side Firestore career updates failed. Changes saved locally.", err);
    }
  };

  const updateBookmarks = async (savedItems: Array<{ id: string; title: string; type: string; desc: string }>) => {
    if (!user) return;
    const updatedUserData = userData ? { ...userData, savedItems } : null;

    // Optimistically update local state & cache
    if (updatedUserData) {
      setUserData(updatedUserData);
      localStorage.setItem(`recruit_user_data_${user.uid}`, JSON.stringify(updatedUserData));
    }

    // Layer 1: Server-side API
    try {
      const response = await fetch('/api/auth/update-bookmarks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid: user.uid, savedItems })
      });
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.userData) {
          setUserData(data.userData);
          localStorage.setItem(`recruit_user_data_${user.uid}`, JSON.stringify(data.userData));
          return;
        }
      }
    } catch (err) {
      console.warn("Server-side bookmarks update failed, attempting direct client-side Firestore SDK:", err);
    }

    // Layer 2: Client-side Firestore SDK fallback
    try {
      const docRef = doc(db, 'users', user.uid);
      await updateDoc(docRef, {
        savedItems,
        updatedAt: new Date().toISOString()
      });
    } catch (err) {
      console.warn("Both server-side and client-side Firestore bookmarks updates failed. Changes saved locally.", err);
    }
  };

  const updateApplications = async (applications: Application[]) => {
    if (!user) return;
    const updatedUserData = userData ? { ...userData, applications } : null;

    // Optimistically update local state & cache
    if (updatedUserData) {
      setUserData(updatedUserData);
      localStorage.setItem(`recruit_user_data_${user.uid}`, JSON.stringify(updatedUserData));
    }

    // Layer 1: Server-side API
    try {
      const response = await fetch('/api/auth/update-applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid: user.uid, applications })
      });
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.userData) {
          setUserData(data.userData);
          localStorage.setItem(`recruit_user_data_${user.uid}`, JSON.stringify(data.userData));
          return;
        }
      }
    } catch (err) {
      console.warn("Server-side applications update failed, attempting direct client-side Firestore SDK:", err);
    }

    // Layer 2: Client-side Firestore SDK fallback
    try {
      const docRef = doc(db, 'users', user.uid);
      await updateDoc(docRef, {
        applications,
        updatedAt: new Date().toISOString()
      });
    } catch (err) {
      console.warn("Both server-side and client-side Firestore applications updates failed. Changes saved locally.", err);
    }
  };

  const updateArohiChats = async (arohiChats: any[]) => {
    if (!user) return;
    const updatedUserData = userData ? { ...userData, arohiChats } : null;

    // Optimistically update local state & cache
    if (updatedUserData) {
      setUserData(updatedUserData);
      localStorage.setItem(`recruit_user_data_${user.uid}`, JSON.stringify(updatedUserData));
    }

    // Layer 1: Server-side API
    try {
      const response = await fetch('/api/auth/update-arohi-chats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid: user.uid, arohiChats })
      });
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.userData) {
          setUserData(data.userData);
          localStorage.setItem(`recruit_user_data_${user.uid}`, JSON.stringify(data.userData));
          return;
        }
      }
    } catch (err) {
      console.warn("Server-side arohi-chats update failed, attempting direct client-side Firestore SDK:", err);
    }

    // Layer 2: Client-side Firestore SDK fallback
    try {
      const docRef = doc(db, 'users', user.uid);
      await updateDoc(docRef, {
        arohiChats,
        updatedAt: new Date().toISOString()
      });
    } catch (err) {
      console.warn("Both server-side and client-side Firestore arohi-chats updates failed. Changes saved locally.", err);
    }
  };

  const updateArohiCalls = async (arohiCalls: any[]) => {
    if (!user) return;
    const updatedUserData = userData ? { ...userData, arohiCalls } : null;

    // Optimistically update local state & cache
    if (updatedUserData) {
      setUserData(updatedUserData);
      localStorage.setItem(`recruit_user_data_${user.uid}`, JSON.stringify(updatedUserData));
    }

    // Layer 1: Server-side API
    try {
      const response = await fetch('/api/auth/update-arohi-calls', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid: user.uid, arohiCalls })
      });
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.userData) {
          setUserData(data.userData);
          localStorage.setItem(`recruit_user_data_${user.uid}`, JSON.stringify(data.userData));
          return;
        }
      }
    } catch (err) {
      console.warn("Server-side arohi-calls update failed, attempting direct client-side Firestore SDK:", err);
    }

    // Layer 2: Client-side Firestore SDK fallback
    try {
      const docRef = doc(db, 'users', user.uid);
      await updateDoc(docRef, {
        arohiCalls,
        updatedAt: new Date().toISOString()
      });
    } catch (err) {
      console.warn("Both server-side and client-side Firestore arohi-calls updates failed. Changes saved locally.", err);
    }
  };

  const updateDiagnostics = async (diagnosticsUpdate: {
    atsScore?: number;
    interviewScore?: number;
    businessScore?: number;
  }) => {
    if (!user) return;
    const currentDiagnostics = userData?.diagnostics || { atsScore: 0, interviewScore: 0, businessScore: 0 };
    const updatedDiagnostics = { ...currentDiagnostics, ...diagnosticsUpdate };
    const updatedUserData = userData ? { ...userData, diagnostics: updatedDiagnostics } : null;

    // Optimistically update local state & cache
    if (updatedUserData) {
      setUserData(updatedUserData);
      localStorage.setItem(`recruit_user_data_${user.uid}`, JSON.stringify(updatedUserData));
    }

    // Layer 1: Server-side API
    try {
      const response = await fetch('/api/auth/update-diagnostics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid: user.uid, diagnostics: updatedDiagnostics })
      });
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.userData) {
          setUserData(data.userData);
          localStorage.setItem(`recruit_user_data_${user.uid}`, JSON.stringify(data.userData));
          return;
        }
      }
    } catch (err) {
      console.warn("Server-side diagnostics update failed, attempting direct client-side Firestore SDK:", err);
    }

    // Layer 2: Client-side Firestore SDK fallback
    try {
      const docRef = doc(db, 'users', user.uid);
      await updateDoc(docRef, {
        diagnostics: updatedDiagnostics,
        updatedAt: new Date().toISOString()
      });
    } catch (err) {
      console.warn("Both server-side and client-side Firestore diagnostics updates failed. Changes saved locally.", err);
    }
  };

  const updateActivities = async (activities: Array<{
    id: string;
    type: string;
    title: string;
    description: string;
    timestamp: string;
  }>) => {
    if (!user) return;
    const updatedUserData = userData ? { ...userData, activities } : null;

    // Optimistically update local state & cache
    if (updatedUserData) {
      setUserData(updatedUserData);
      localStorage.setItem(`recruit_user_data_${user.uid}`, JSON.stringify(updatedUserData));
    }

    // Layer 1: Server-side API
    try {
      const response = await fetch('/api/auth/update-activities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid: user.uid, activities })
      });
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.userData) {
          setUserData(data.userData);
          localStorage.setItem(`recruit_user_data_${user.uid}`, JSON.stringify(data.userData));
          return;
        }
      }
    } catch (err) {
      console.warn("Server-side activities update failed, attempting direct client-side Firestore SDK:", err);
    }

    // Layer 2: Client-side Firestore SDK fallback
    try {
      const docRef = doc(db, 'users', user.uid);
      await updateDoc(docRef, {
        activities,
        updatedAt: new Date().toISOString()
      });
    } catch (err) {
      console.warn("Both server-side and client-side Firestore activities updates failed. Changes saved locally.", err);
    }
  };

  const updateUserSubscription = async (subData: {
    isSubscribed: boolean;
    subscriptionPlanName?: string;
    subscriptionEndDate?: number;
    subscriptions?: Record<string, boolean>;
    subscriptionDetails?: Record<string, { tierName: string; price: number; margin: number }>;
    paymentMethod?: string;
    paymentId?: string;
  }) => {
    if (!user) return;
    const now = Date.now();
    const thirtyDays = 30 * 24 * 60 * 60 * 1000;
    const endDate = subData.subscriptionEndDate || (now + thirtyDays);
    const planName = subData.subscriptionPlanName || 'Starter Plan (₹399/mo)';
    const subs = subData.subscriptions || { path1: true, path2: false, path3: false, path4: false };
    const details = subData.subscriptionDetails || { path1: { tierName: planName, price: 399, margin: 199.5 } };
    
    const subPayload = {
      isSubscribed: Boolean(subData.isSubscribed),
      subscriptionPlanName: planName,
      subscriptionEndDate: endDate,
      subscriptions: subs,
      subscriptionDetails: details,
      subscribedAt: now,
      paymentMethod: subData.paymentMethod || 'Razorpay / UPI',
      paymentId: subData.paymentId || `pay_${now}`,
      updatedAt: new Date().toISOString()
    };

    const updatedUserData = userData ? { ...userData, ...subPayload } : null;

    if (updatedUserData) {
      setUserData(updatedUserData);
      localStorage.setItem(`recruit_user_data_${user.uid}`, JSON.stringify(updatedUserData));
    }

    persistSubscriptionActivation({
      planName,
      price: details.path1?.price || 399,
      paymentMethod: subData.paymentMethod || 'Razorpay / UPI',
      customEndDate: endDate
    });

    // Layer 1: Server-side API
    try {
      const response = await fetch('/api/auth/update-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid: user.uid, ...subPayload })
      });
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.userData) {
          setUserData(data.userData);
          localStorage.setItem(`recruit_user_data_${user.uid}`, JSON.stringify(data.userData));
          return;
        }
      }
    } catch (err) {
      console.warn("Server-side subscription update failed, attempting direct client-side Firestore SDK:", err);
    }

    // Layer 2: Client-side Firestore SDK fallback
    try {
      const docRef = doc(db, 'users', user.uid);
      await updateDoc(docRef, subPayload);
    } catch (err) {
      console.warn("Both server-side and client-side Firestore subscription updates failed. Changes saved locally.", err);
    }
  };

  const activateExamPass = async (tier: 'silver' | 'gold', paymentMethod: string = 'Razorpay / UPI') => {
    const totalTests = tier === 'silver' ? 20 : 50;
    const name = tier === 'silver' ? 'Arohi Exams™ Silver Pass' : 'Arohi Exams™ Gold Mega Pass';
    
    const passObj = {
      tier,
      name,
      totalTests,
      testsRemaining: totalTests,
      activatedAt: new Date().toISOString(),
      paymentMethod
    };

    if (userData) {
      const updated = { ...userData, examPass: passObj };
      setUserData(updated);
      if (user?.uid) {
        localStorage.setItem(`recruit_user_data_${user.uid}`, JSON.stringify(updated));
      }
    }

    try {
      localStorage.setItem('arohi_exam_pass', JSON.stringify(passObj));
      window.dispatchEvent(new CustomEvent('arohi_exam_pass_activated', { detail: passObj }));
    } catch (e) {}

    if (user?.uid) {
      try {
        const docRef = doc(db, 'users', user.uid);
        await updateDoc(docRef, {
          examPass: passObj,
          updatedAt: new Date().toISOString()
        });
      } catch (err) {
        console.warn('Firestore exam pass update fallback noted:', err);
      }
    }
  };

  const incrementFreeExamAttempt = async (): Promise<number> => {
    let currentCount = 0;
    try {
      currentCount = Number(localStorage.getItem('arohi_free_exam_count') || 0);
    } catch (e) {}

    const newCount = currentCount + 1;
    try {
      localStorage.setItem('arohi_free_exam_count', String(newCount));
    } catch (e) {}

    if (userData) {
      const updated = { ...userData, freeExamAttemptsCount: newCount };
      setUserData(updated);
      if (user?.uid) {
        localStorage.setItem(`recruit_user_data_${user.uid}`, JSON.stringify(updated));
      }
    }

    if (user?.uid) {
      try {
        const docRef = doc(db, 'users', user.uid);
        await updateDoc(docRef, {
          freeExamAttemptsCount: newCount,
          updatedAt: new Date().toISOString()
        });
      } catch (err) {}
    }

    return newCount;
  };

  const refreshPersonalizationMemory = async (): Promise<UserPersonalizationMemory | null> => {
    if (!user) return null;
    try {
      const freshData = await loadAndSyncUserData({ uid: user.uid, email: user.email } as any);
      if (freshData) {
        setUserData(freshData);
        const memory = buildPersonalizationMemory(freshData);
        setUserMemory(memory);
        return memory;
      }
    } catch (err) {
      console.error("Failed to refresh user personalization memory:", err);
    }
    return userMemory;
  };

  return (
    <AuthContext.Provider value={{
      user,
      userData,
      userMemory,
      loading,
      signIn,
      signUp,
      signInWithGoogle,
      signInWithApple,
      signInWithPhone,
      signOutUser,
      resetPassword,
      refreshPersonalizationMemory,
      signInWithBiometrics,
      updateUserProfile,
      updateCareerProgress,
      updateBookmarks,
      updateApplications,
      updateArohiChats,
      updateArohiCalls,
      updateDiagnostics,
      updateActivities,
      updateUserSubscription,
      activateExamPass,
      incrementFreeExamAttempt
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
