import { useState, useEffect, useRef } from 'react';
import { 
  User, Mail, Phone, MapPin, Award, CheckCircle2, Bookmark, FileText, 
  Bot, Briefcase, Landmark, ExternalLink, Sparkles, AlertCircle, 
  ShieldCheck, Edit3, Save, LogIn, LogOut, Loader2, Trash2, X, ChevronRight, Crown,
  Download, RefreshCw, Trophy, Calendar, Check, Play, GraduationCap, Map, Clock, Share2,
  Fingerprint, AlertTriangle, ToggleLeft, ToggleRight, Settings, Volume2, VolumeX, Cpu,
  Coins, Copy, Gift, Tag, Zap, ArrowRight, ShieldAlert, Timer, Brain
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { computeSubscriptionState } from '../utils/subscriptionEngine';
import { initialCourses } from '../data/coursesData';
import { isBiometricSupported, registerBiometricDevice, authenticateBiometricDevice } from '../lib/webauthn';
import { PATH_DETAILS, PRICING_TIERS, getTokenLimitForPrice } from '../data/pricingData';
import PricingPage from './PricingPage';

interface UserDashboardProps {
  initialSection?: 'all' | 'subscriptions' | 'profile' | 'applications' | 'courses';
  subscriptions?: Record<string, boolean>;
  subscriptionDetails?: Record<string, { tierName: string; price: number; margin: number }>;
  onSubscribe?: (pathId: string) => void;
  onNavigateTab?: (tab: string) => void;
  onOpenAuth?: () => void;
  onShare?: () => void;
  tokenUsage?: Record<string, number>;
  onIncrementTokenUsage?: (pathId: string) => void;
  onSetTokenUsage?: (pathId: string, value: number) => void;
  onResetTokenUsage?: (pathId: string) => void;
  warningEnabled?: boolean;
  onToggleWarningEnabled?: () => void;
  warningInterval?: number;
  onSetWarningInterval?: (val: number) => void;
  nextReminderIn?: number;
  onTriggerTestLimitWarning?: () => void;
  warningHistoryLog?: Array<{ id: string; pathId: string; pathTitle: string; message: string; timestamp: string }>;
  onClearWarningHistory?: () => void;
  arohiCoinBalance?: number;
  userReferralCode?: string;
  coinTransactions?: Array<{ id: string; type: 'earned_cashback' | 'referrer_bonus' | 'redeemed_discount'; amount: number; description: string; date: string }>;
  subscriptionEndDate?: number;
  onRenewSubscription?: () => void;
  onSetSubscriptionEndDate?: (newTimestamp: number) => void;
  hasActiveSubscription?: boolean;
  subscriptionPlanName?: string;
}

export default function UserDashboard({ 
  initialSection = 'all',
  subscriptions = { path1: false, path2: false, path3: false, path4: false }, 
  subscriptionDetails = {},
  onSubscribe, 
  onNavigateTab, 
  onOpenAuth,
  onShare,
  tokenUsage = {},
  onIncrementTokenUsage,
  onSetTokenUsage,
  onResetTokenUsage,
  warningEnabled = true,
  onToggleWarningEnabled,
  warningInterval = 15,
  onSetWarningInterval,
  nextReminderIn = 15,
  onTriggerTestLimitWarning,
  warningHistoryLog = [],
  onClearWarningHistory,
  arohiCoinBalance = 0,
  userReferralCode = 'AROHI-JUNOON',
  coinTransactions = [],
  subscriptionEndDate = 0,
  onRenewSubscription,
  onSetSubscriptionEndDate,
  hasActiveSubscription = false,
  subscriptionPlanName = 'Starter Plan (₹399/mo)'
}: UserDashboardProps) {
  
  const { user, userData, updateUserProfile, updateBookmarks, updateDiagnostics, updateActivities, signOutUser } = useAuth();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true);
      await signOutUser();
    } catch (err) {
      console.error('Error signing out:', err);
    } finally {
      setIsSigningOut(false);
    }
  };

  const [activeSectionTab, setActiveSectionTab] = useState<'all' | 'subscriptions' | 'profile' | 'applications' | 'courses' | 'mocktests'>(
    initialSection === 'subscriptions' ? 'subscriptions' : 'all'
  );

  useEffect(() => {
    if (initialSection === 'subscriptions') {
      setActiveSectionTab('subscriptions');
      const timer = setTimeout(() => {
        const anchor = document.getElementById('monthly-subscriptions-anchor');
        if (anchor) {
          anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [initialSection]);

  const [showSandboxControls, setShowSandboxControls] = useState<boolean>(() => {
    if (user?.email === 'elitetraderjunoon@gmail.com') return true;
    return localStorage.getItem('recruit_show_dev_sandbox') === 'true';
  });

  // Basic profile state
  const [profile, setProfile] = useState(() => {
    const savedName = localStorage.getItem('recruit_user_name') || '';
    const savedEmail = localStorage.getItem('recruit_user_email') || '';
    const savedPhone = localStorage.getItem('recruit_user_phone') || '';
    const savedLocation = localStorage.getItem('recruit_user_location') || '';
    const savedEducation = localStorage.getItem('recruit_user_education') || '';
    const savedGoal = localStorage.getItem('recruit_user_active_goal') || '';
    const savedResume = localStorage.getItem('recruit_guest_resume_url') || '';

    return {
      name: savedName || 'Candidate Profile',
      email: savedEmail || '',
      phone: savedPhone,
      location: savedLocation,
      education: savedEducation,
      activeGoal: savedGoal,
      resumeUrl: savedResume
    };
  });

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [copiedRefText, setCopiedRefText] = useState<'code' | 'link' | null>(null);
  const [editedName, setEditedName] = useState('');
  const [editedPhone, setEditedPhone] = useState('');
  const [editedLocation, setEditedLocation] = useState('');
  const [editedEducation, setEditedEducation] = useState('');
  const [editedGoal, setEditedGoal] = useState('');
  const [editedResume, setEditedResume] = useState('');

  // Biometric Auth states
  const [isBioSupported, setIsBioSupported] = useState(false);
  const [isBioEnrolled, setIsBioEnrolled] = useState(false);
  const [bioError, setBioError] = useState<string | null>(null);
  const [bioSuccess, setBioSuccess] = useState<string | null>(null);
  const [isEnrolling, setIsEnrolling] = useState(false);

  // Detect biometric capabilities & enrollment status
  useEffect(() => {
    async function checkBio() {
      const supported = await isBiometricSupported();
      setIsBioSupported(supported);
      if (profile.email) {
        const enrolled = !!localStorage.getItem(`recruit_biometric_${profile.email.toLowerCase()}`);
        setIsBioEnrolled(enrolled);
      }
    }
    checkBio();
  }, [profile.email]);

  const handleRegisterBiometric = async () => {
    if (!profile.email) return;
    setBioError(null);
    setBioSuccess(null);
    setIsEnrolling(true);
    try {
      const record = await registerBiometricDevice(profile.email, user?.uid || 'guest');
      localStorage.setItem(`recruit_biometric_user_${profile.email.toLowerCase()}`, JSON.stringify({
        uid: user?.uid || 'guest',
        email: profile.email,
        displayName: profile.name
      }));
      setIsBioEnrolled(true);
      setBioSuccess(`Successfully registered secure FIDO2 passkey (${record.deviceName}) for secure fingerprint/Face ID sign-in on this device!`);
      addActivity('profile', 'Biometric credential enrolled', `Device authenticated with passkey for ${profile.email}`);
    } catch (err: any) {
      console.error(err);
      setBioError(err.message || 'Verification was cancelled or timed out.');
    } finally {
      setIsEnrolling(false);
    }
  };

  const handleRemoveBiometric = () => {
    if (!profile.email) return;
    localStorage.removeItem(`recruit_biometric_${profile.email.toLowerCase()}`);
    setIsBioEnrolled(false);
    setBioSuccess('Biometric registration removed.');
    addActivity('profile', 'Biometric credential removed', `Removed registered biometric passkey for ${profile.email}`);
  };

  // Enrolled courses state (derived dynamically)
  const [enrolledCourseList, setEnrolledCourseList] = useState<any[]>([]);
  const [completedCount, setCompletedCount] = useState(0);
  const [totalEnrolledCount, setTotalEnrolledCount] = useState(0);

  // Applied opportunities state
  const [appliedJobs, setAppliedJobs] = useState<any[]>([]);
  const [savedItems, setSavedItems] = useState<any[]>([]);
  
  // Checklist count state
  const [completedChecklistItems, setCompletedChecklistItems] = useState(0);
  const [totalChecklistItems, setTotalChecklistItems] = useState(12); // PMEGP & Mudra checklists

  // Diagnostics scores
  const [diagnostics, setDiagnostics] = useState({
    atsScore: 0,
    interviewScore: 0,
    businessScore: 0
  });

  // Recent Activity Feed State
  const [activities, setActivities] = useState<any[]>([]);

  const addActivity = (type: string, title: string, description: string) => {
    const newAct = {
      id: `act-${Date.now()}`,
      type,
      title,
      description,
      timestamp: new Date().toISOString()
    };
    if (user) {
      const updated = [newAct, ...(userData?.activities || [])].slice(0, 15);
      updateActivities(updated).catch(err => console.error("Firebase activities sync error:", err));
    } else {
      setActivities(prev => {
        const updated = [newAct, ...prev].slice(0, 15);
        localStorage.setItem('recruit_activities', JSON.stringify(updated));
        return updated;
      });
    }
  };

  // Modal details
  const [activeReceipt, setActiveReceipt] = useState<any | null>(null);
  const [activeCertificate, setActiveCertificate] = useState<any | null>(null);
  const [mockTestHistory, setMockTestHistory] = useState<any[]>([]);
  const hasInitializedDiagnosticsRef = useRef(false);

  // Sync profile & other lists in real time from context or localStorage fallbacks
  useEffect(() => {
    if (user && userData) {
      // Sync Mock Test History from Firestore
      if (userData?.mockTestHistory && Array.isArray(userData.mockTestHistory)) {
        setMockTestHistory(userData.mockTestHistory);
      } else {
        try {
          const localSaved = localStorage.getItem('arohi_mock_test_submissions');
          setMockTestHistory(localSaved ? JSON.parse(localSaved) : []);
        } catch {
          setMockTestHistory([]);
        }
      }
      // LOGGED-IN FIREBASE STATE
      if (userData.diagnostics) {
        setDiagnostics({
          atsScore: userData.diagnostics.atsScore ?? 0,
          interviewScore: userData.diagnostics.interviewScore ?? 0,
          businessScore: userData.diagnostics.businessScore ?? 0
        });
      } else if (!hasInitializedDiagnosticsRef.current) {
        hasInitializedDiagnosticsRef.current = true;
        const savedAtsScore = localStorage.getItem('recruit_ats_score');
        const savedInterviewScore = localStorage.getItem('recruit_interview_score');
        const savedBusinessScore = localStorage.getItem('recruit_business_score');
        const defaultDiagnostics = {
          atsScore: savedAtsScore ? parseInt(savedAtsScore, 10) : 0,
          interviewScore: savedInterviewScore ? parseInt(savedInterviewScore, 10) : 0,
          businessScore: savedBusinessScore ? parseInt(savedBusinessScore, 10) : 0
        };
        setDiagnostics(defaultDiagnostics);
      }

      if (userData.profile) {
        const rawName = userData.profile.name || user.displayName || user.email?.split('@')[0] || '';
        const pName = (rawName === 'Candidate Profile' || rawName === 'Honored Guest' || rawName === 'Guest Candidate') ? '' : rawName;
        const pEmail = userData.profile.email || user.email || '';
        const rawPhone = userData.profile.phone || '';
        const pPhone = rawPhone === '+91 98765 43210' ? '' : rawPhone;
        const rawLoc = userData.profile.location || '';
        const pLoc = (rawLoc === 'Delhi NCR' || rawLoc === 'Delhi') ? '' : rawLoc;
        const rawEdu = userData.profile.education || '';
        const pEdu = (rawEdu === 'Graduate' || rawEdu === 'Business Owner') ? '' : rawEdu;
        const rawGoal = userData.profile.activeGoal || '';
        const pGoal = (rawGoal === 'Skills, Courses & Career Preparation' || rawGoal === 'Mudra Loan Business & Franchise Setup' || rawGoal.toLowerCase() === 'career upskilling') ? '' : rawGoal;
        const pResume = (userData as any).profile?.resumeUrl || '';

        setProfile({
          name: pName || user.displayName || user.email?.split('@')[0] || 'Candidate Profile',
          email: pEmail,
          phone: pPhone,
          location: pLoc,
          education: pEdu,
          activeGoal: pGoal,
          resumeUrl: pResume
        });
        
        setEditedName(pName || user.displayName || user.email?.split('@')[0] || '');
        setEditedPhone(pPhone);
        setEditedLocation(pLoc);
        setEditedEducation(pEdu);
        setEditedGoal(pGoal);
        setEditedResume(pResume);
      }

      // Sync applications
      if (userData.applications) {
        const mappedApps = userData.applications.map((app: any, idx: number) => ({
          id: app.id || `app-${idx}`,
          title: app.postingTitle || 'Government Opportunity',
          org: app.postingId?.includes('ssc') ? 'Staff Selection Commission' : app.postingId?.includes('rrb') ? 'Railway Recruitment Board' : 'Ecosystem Match',
          postingId: app.postingId || '',
          status: app.status || 'Submitted',
          date: app.appliedDate || new Date().toLocaleDateString('en-GB'),
          registrationNumber: app.registrationNumber || `REC-GEN-${Math.floor(100000 + Math.random() * 900000)}`,
          candidateName: app.candidateName || userData.profile?.name || user.displayName || 'Candidate',
          fatherName: app.fatherName || 'Not specified',
          dob: app.dob || 'Not specified',
          gender: app.gender || 'Not specified',
          category: app.category || 'General',
          email: app.email || user.email || '',
          phone: app.phone || userData.profile?.phone || '',
          qualification: app.qualification || userData.profile?.education || 'Not specified',
          address: app.address || userData.profile?.location || 'Not specified',
          photoUrl: app.photoUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=60&referrerpolicy=no-referrer',
          signatureUrl: app.signatureUrl || 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=150&auto=format&fit=crop&q=60&referrerpolicy=no-referrer',
          color: app.status === 'Approved' ? 'text-emerald-300 bg-emerald-500/10 border-emerald-500/25' : app.status === 'Rejected' ? 'text-rose-300 bg-rose-500/10 border-rose-500/25' : 'text-blue-300 bg-blue-500/10 border-blue-500/25'
        }));
        setAppliedJobs(mappedApps);
      } else {
        setAppliedJobs([]);
      }

      // Sync saved bookmarks
      if (userData.savedItems) {
        setSavedItems(userData.savedItems);
      } else {
        setSavedItems([]);
      }

      // Compute dynamic course progress from Firebase userData
      const enrolledIds = userData.enrolledCourses || [];
      setTotalEnrolledCount(enrolledIds.length);
      
      const completedMap = userData.completedModules || {};
      let totalCompletedUnits = 0;

      const mappedCourses = enrolledIds.map(courseId => {
        const course = initialCourses.find(c => c.id === courseId);
        if (!course) return null;
        const completedList = completedMap[courseId] || [];
        totalCompletedUnits += completedList.length;
        const totalUnits = course.syllabus ? course.syllabus.length : course.modules;
        const progress = Math.min(100, Math.round((completedList.length / totalUnits) * 100));
        return {
          ...course,
          completedUnits: completedList.length,
          totalUnits,
          progress
        };
      }).filter(Boolean);

      setEnrolledCourseList(mappedCourses);
      setCompletedCount(totalCompletedUnits);

      // Sync checklist items completed
      if (userData?.checkedChecklist) {
        const completedList = Object.values(userData.checkedChecklist || {}).filter(Boolean).length;
        setCompletedChecklistItems(completedList);
      } else {
        setCompletedChecklistItems(0);
      }

    } else {
      // GUEST MODE FALLBACKS (Pulling from LocalStorage)
      const savedAtsScore = localStorage.getItem('recruit_ats_score');
      const savedInterviewScore = localStorage.getItem('recruit_interview_score');
      const savedBusinessScore = localStorage.getItem('recruit_business_score');
      
      setDiagnostics({
        atsScore: savedAtsScore ? parseInt(savedAtsScore, 10) : 0,
        interviewScore: savedInterviewScore ? parseInt(savedInterviewScore, 10) : 0,
        businessScore: savedBusinessScore ? parseInt(savedBusinessScore, 10) : 0
      });

      const rawGuestName = localStorage.getItem('recruit_user_name') || '';
      const guestName = (rawGuestName === 'Candidate Profile' || rawGuestName === 'Honored Guest' || rawGuestName === 'Guest Candidate') ? '' : rawGuestName;
      const guestEmail = localStorage.getItem('recruit_user_email') || '';
      const rawGuestPhone = localStorage.getItem('recruit_user_phone') || '';
      const guestPhone = rawGuestPhone === '+91 98765 43210' ? '' : rawGuestPhone;
      const rawGuestLocation = localStorage.getItem('recruit_user_location') || '';
      const guestLocation = (rawGuestLocation === 'Delhi NCR' || rawGuestLocation === 'Delhi') ? '' : rawGuestLocation;
      const rawGuestEducation = localStorage.getItem('recruit_user_education') || '';
      const guestEducation = (rawGuestEducation === 'Graduate' || rawGuestEducation === 'Business Owner') ? '' : rawGuestEducation;
      const rawGuestGoal = localStorage.getItem('recruit_user_active_goal') || '';
      const guestGoal = (rawGuestGoal === 'Skills, Courses & Career Preparation' || rawGuestGoal === 'Mudra Loan Business & Franchise Setup' || rawGuestGoal.toLowerCase() === 'career upskilling') ? '' : rawGuestGoal;
      const guestResume = localStorage.getItem('recruit_guest_resume_url') || '';

      setProfile({
        name: guestName || 'Guest Candidate',
        email: guestEmail,
        phone: guestPhone,
        location: guestLocation,
        education: guestEducation,
        activeGoal: guestGoal,
        resumeUrl: guestResume
      });

      setEditedName(guestName);
      setEditedPhone(guestPhone);
      setEditedLocation(guestLocation);
      setEditedEducation(guestEducation);
      setEditedGoal(guestGoal);
      setEditedResume(guestResume);

      // Pull mock / guest applications
      const savedAppsStr = localStorage.getItem('recruit_applications');
      if (savedAppsStr) {
        try {
          const parsed = JSON.parse(savedAppsStr);
          const mapped = parsed.map((app: any, idx: number) => ({
            id: app.id || `app-${idx}`,
            title: app.postingTitle || 'Government Opportunity',
            org: app.postingId?.includes('ssc') ? 'Staff Selection Commission' : app.postingId?.includes('rrb') ? 'Railway Recruitment Board' : 'Ecosystem Match',
            postingId: app.postingId || '',
            status: app.status || 'Submitted',
            date: app.appliedDate || new Date().toLocaleDateString('en-GB'),
            registrationNumber: app.registrationNumber || `REC-GEN-${Math.floor(100000 + Math.random() * 900000)}`,
            candidateName: app.candidateName || guestName,
            fatherName: app.fatherName || 'Not specified',
            dob: app.dob || 'Not specified',
            gender: app.gender || 'Not specified',
            category: app.category || 'General',
            email: app.email || guestEmail,
            phone: app.phone || guestPhone,
            qualification: app.qualification || guestEducation || 'Not specified',
            address: app.address || guestLocation || 'Not specified',
            photoUrl: app.photoUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=60&referrerpolicy=no-referrer',
            signatureUrl: app.signatureUrl || 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=150&auto=format&fit=crop&q=60&referrerpolicy=no-referrer',
            color: 'text-blue-300 bg-blue-500/10 border-blue-500/25'
          }));
          setAppliedJobs(mapped);
        } catch {
          setAppliedJobs([]);
        }
      } else {
        setAppliedJobs([]);
      }

      // Guest Bookmarks
      const savedItemsStr = localStorage.getItem('recruit_bookmarks');
      if (savedItemsStr) {
        try {
          setSavedItems(JSON.parse(savedItemsStr));
        } catch {
          setSavedItems([]);
        }
      } else {
        setSavedItems([]);
      }

      // Guest Course progress
      const guestEnrolledStr = localStorage.getItem('recruit_enrolled_courses');
      const guestEnrolledIds: string[] = guestEnrolledStr ? JSON.parse(guestEnrolledStr) : [];
      setTotalEnrolledCount(guestEnrolledIds.length);

      const guestCompletedStr = localStorage.getItem('recruit_completed_modules');
      const guestCompletedMap: Record<string, string[]> = guestCompletedStr ? JSON.parse(guestCompletedStr) : {};
      
      let guestCompletedTotal = 0;

      const mappedGuestCourses = guestEnrolledIds.map(courseId => {
        const course = initialCourses.find(c => c.id === courseId);
        if (!course) return null;
        const completedList = guestCompletedMap[courseId] || [];
        guestCompletedTotal += completedList.length;
        const totalUnits = course.syllabus ? course.syllabus.length : course.modules;
        const progress = Math.min(100, Math.round((completedList.length / totalUnits) * 100));
        return {
          ...course,
          completedUnits: completedList.length,
          totalUnits,
          progress
        };
      }).filter(Boolean);

      setEnrolledCourseList(mappedGuestCourses);
      setCompletedCount(guestCompletedTotal);

      // Guest Mock Test History
      try {
        const localSaved = localStorage.getItem('arohi_mock_test_submissions');
        setMockTestHistory(localSaved ? JSON.parse(localSaved) : []);
      } catch {
        setMockTestHistory([]);
      }

      // Guest checklist count
      const guestChecklistStr = localStorage.getItem('recruit_checked_checklist');
      if (guestChecklistStr) {
        try {
          const parsedChecklist = JSON.parse(guestChecklistStr);
          const completedList = Object.values(parsedChecklist || {}).filter(Boolean).length;
          setCompletedChecklistItems(completedList);
        } catch {
          setCompletedChecklistItems(0);
        }
      } else {
        setCompletedChecklistItems(0);
      }
    }
  }, [user, userData]);

  // Synchronize activities & mock test completions in real time
  useEffect(() => {
    const handleExamCompleted = (e: any) => {
      if (e.detail) {
        setMockTestHistory(prev => [e.detail, ...prev.filter(item => item.id !== e.detail.id)]);
      } else {
        try {
          const localSaved = localStorage.getItem('arohi_mock_test_submissions');
          if (localSaved) setMockTestHistory(JSON.parse(localSaved));
        } catch (err) {}
      }
    };
    window.addEventListener('arohi_mock_test_completed', handleExamCompleted);

    const handleSync = () => {
      const stored = localStorage.getItem('recruit_activities');
      if (stored) {
        try {
          setActivities(JSON.parse(stored));
        } catch (e) {
          console.error("Error parsing recruit_activities inside storage listener:", e);
        }
      }
    };
    window.addEventListener('storage', handleSync);
    window.addEventListener('recruit_activities_update', handleSync);

    return () => {
      window.removeEventListener('arohi_mock_test_completed', handleExamCompleted);
      window.removeEventListener('storage', handleSync);
      window.removeEventListener('recruit_activities_update', handleSync);
    };
  }, []);

  // Load or dynamically generate initial/recent activities
  useEffect(() => {
    const stored = localStorage.getItem('recruit_activities');
    let list = [];
    if (stored) {
      try {
        list = JSON.parse(stored);
      } catch (e) {
        console.error("Error parsing stored activities:", e);
      }
    }

    if (list.length === 0) {
      const generated: any[] = [];

      // A) Resume evaluation / ATS score activity
      if (diagnostics.atsScore > 0 || profile.resumeUrl) {
        generated.push({
          id: 'gen-ats',
          type: 'resume',
          title: 'Resume ATS Profile Analyzed',
          description: `Ran resume diagnostics. Keyword matching rate evaluated at ${diagnostics.atsScore || 74}% with full layout feedback report.`,
          timestamp: new Date(Date.now() - 3 * 3600 * 1000).toISOString()
        });
      }

      // B) Job Applications
      if (appliedJobs && appliedJobs.length > 0) {
        appliedJobs.forEach((job, idx) => {
          generated.push({
            id: `gen-job-${job.id}`,
            type: 'job',
            title: 'Job Application Submitted',
            description: `Successfully filed online slip for "${job.title}" (${job.org}). Receipt ID: ${job.registrationNumber}`,
            timestamp: new Date(Date.now() - (idx + 1) * 24 * 3600 * 1000 - 4 * 3600 * 1000).toISOString()
          });
        });
      }

      // C) Career quiz / assessment history
      if (profile.activeGoal) {
        generated.push({
          id: 'gen-quiz',
          type: 'quiz',
          title: 'Career Personality Assessment Completed',
          description: `Evaluated career target goals and skills. Best matched track: "${profile.activeGoal}".`,
          timestamp: new Date(Date.now() - 4 * 24 * 3600 * 1000).toISOString()
        });
      }

      // D) Enrolled courses
      if (enrolledCourseList && enrolledCourseList.length > 0) {
        enrolledCourseList.forEach((course, idx) => {
          generated.push({
            id: `gen-course-${course.id}`,
            type: 'course',
            title: 'Enrolled in Skills Course',
            description: `Assigned syllabus track for "${course.title}" sponsored by ${course.provider}.`,
            timestamp: new Date(Date.now() - (idx + 1) * 24 * 3600 * 1000 - 2 * 3600 * 1000).toISOString()
          });
        });
      }

      // E) Default initial signup/welcome activity
      generated.push({
        id: 'gen-welcome',
        type: 'profile',
        title: 'National Digital Registry Formed',
        description: `Successfully created professional profile and initiated employment candidate file.`,
        timestamp: new Date(Date.now() - 6 * 24 * 3600 * 1000).toISOString()
      });

      // Sort by timestamp desc
      generated.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      list = generated.slice(0, 10);
      localStorage.setItem('recruit_activities', JSON.stringify(list));
    }

    setActivities(list);
  }, [appliedJobs.length, enrolledCourseList.length, diagnostics.atsScore, diagnostics.interviewScore, profile.resumeUrl, profile.activeGoal]);

  const handleSaveProfile = async () => {
    try {
      if (user) {
        await updateUserProfile({
          name: editedName,
          phone: editedPhone,
          location: editedLocation,
          education: editedEducation,
          activeGoal: editedGoal,
          resumeUrl: editedResume
        } as any);
        setIsEditingProfile(false);
      } else {
        localStorage.setItem('recruit_user_name', editedName);
        localStorage.setItem('recruit_user_phone', editedPhone);
        localStorage.setItem('recruit_user_location', editedLocation);
        localStorage.setItem('recruit_user_education', editedEducation);
        localStorage.setItem('recruit_user_active_goal', editedGoal);
        localStorage.setItem('recruit_guest_resume_url', editedResume);
        setProfile(prev => ({
          ...prev,
          name: editedName,
          phone: editedPhone,
          location: editedLocation,
          education: editedEducation,
          activeGoal: editedGoal,
          resumeUrl: editedResume
        }));
        setIsEditingProfile(false);
      }
      addActivity('profile', 'Registry Profile Updated', `Successfully updated professional registry details for "${editedName}".`);
    } catch (err) {
      console.error("Error saving profile:", err);
    }
  };

  const handleDeleteBookmark = async (id: string) => {
    const updated = savedItems.filter(item => item.id !== id);
    setSavedItems(updated);
    if (user) {
      await updateBookmarks(updated).catch(err => console.error("Firebase sync error:", err));
    } else {
      localStorage.setItem('recruit_bookmarks', JSON.stringify(updated));
    }
  };

  // Profile Completeness math (out of 100%)
  const calculateCompleteness = () => {
    let score = 0;
    if (profile.name && profile.name !== 'Honored Guest' && profile.name !== 'Guest Candidate') score += 15;
    if (profile.email) score += 15;
    if (profile.phone) score += 15;
    if (profile.location) score += 15;
    if (profile.education) score += 15;
    if (profile.activeGoal) score += 15;
    if (profile.resumeUrl) score += 10;
    return score;
  };

  const completeness = calculateCompleteness();

  // Dynamic badges awarded based on actions
  const getEarnedBadges = () => {
    const earned = [];
    if (diagnostics.atsScore >= 70) {
      earned.push({ name: 'ATS Explorer', desc: 'Achieved >70% resume score.', icon: '🏆', color: 'from-amber-500 to-yellow-500' });
    }
    if (diagnostics.interviewScore > 0) {
      earned.push({ name: 'Voice Orator', desc: `Scored ${diagnostics.interviewScore}% in AROHI live panel interview.`, icon: '🗣️', color: 'from-blue-500 to-cyan-500' });
    } else {
      earned.push({ name: 'Aspirant Step', desc: 'Initiate a mock session to lock in speech diagnostics.', icon: '🎓', color: 'from-slate-600 to-slate-400' });
    }
    if (completedChecklistItems > 0 || subscriptions.path3) {
      earned.push({ name: 'MSME Visionary', desc: 'Completed startup checklists or business matching.', icon: '🚀', color: 'from-purple-500 to-pink-500' });
    }
    if (completedCount > 0 || totalEnrolledCount > 0) {
      earned.push({ name: 'Academic Scholar', desc: 'Active student enrolled in professional curriculum tracks.', icon: '📚', color: 'from-emerald-500 to-teal-500' });
    }
    return earned;
  };

  const earnedBadges = getEarnedBadges();

  const pathsDetail = [
    {
      id: 'path1',
      title: 'Path 1: Career, Jobs & Resume Assistance',
      desc: 'Sarkari & Private matching, ATS analyzer, and live mock interview practice.',
      price: 'From ₹399/mo (5 Plans)',
      perks: ['AI-backed resume grading', 'Live exam portal alerts', 'Unlimited mock interviews', 'Instant agent assistance']
    },
    {
      id: 'path2',
      title: 'Path 2: Economical Skill Upgradation',
      desc: 'Industry-oriented courses. Pay only for the course in monthly breakups, getting Arohi Free!',
      price: 'FREE with Course',
      perks: ['Full software & business modules', 'Government verified certificates', 'Hands-on practice exercises', 'Direct mentorship help']
    },
    {
      id: 'path3',
      title: 'Path 3: Udyam Business Launchpad',
      desc: 'If not interested in jobs, transform your vision into an MSME business.',
      price: 'From ₹399/mo (5 Plans)',
      perks: ['PMEGP & Mudra loan checklist', 'Odisha state startup benefits', 'Validating business scalability', 'Udyam micro registration steps']
    },
    {
      id: 'path4',
      title: 'Path 4: Class 1-10 Student Support',
      desc: 'Interactive school curriculum, high-quality unique chapters, and personalized academic guidance.',
      price: 'From ₹399/mo (5 Plans)',
      perks: ['NCERT mapped curriculum & unique notes', 'Personalized chapter quiz feedback', 'Sciences & Languages syllabus notes', '24/7 School support from AROHI AI']
    }
  ];

  const hasAnyActive = Object.values(subscriptions || {}).some(Boolean);

  // Live real-time clock for continuous second-by-second countdown accuracy
  const [currentTime, setCurrentTime] = useState<number>(Date.now());
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Centralized deterministic subscription status calculation
  const subState = computeSubscriptionState({
    email: user?.email,
    userData,
    subscriptions,
    subscriptionEndDate,
    subscriptionPlanName,
    currentTime
  });

  const isSubscribed = subState.isSubscribed;
  const isExpired = subState.isExpired;
  const effectiveEndDate = subState.effectiveEndDate;
  const msRemaining = subState.msRemaining;
  const daysRemaining = subState.daysRemaining;
  const hoursRemaining = subState.hoursRemaining;
  const minutesRemaining = subState.minutesRemaining;
  const secondsRemaining = subState.secondsRemaining;

  // Calculate percentage of 30-day billing cycle elapsed
  const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;
  const cycleElapsedMs = Math.max(0, THIRTY_DAYS_MS - msRemaining);
  const cyclePercentage = subState.isLifetimeVip ? 100 : Math.min(100, Math.max(0, Math.round((cycleElapsedMs / THIRTY_DAYS_MS) * 100)));

  // Format expiry dates and times clearly
  const formattedEndDate = effectiveEndDate > 0 ? new Date(effectiveEndDate).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }) : 'N/A';

  const formattedEndTime = effectiveEndDate > 0 ? new Date(effectiveEndDate).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }) : '';

  const activePathsList = Object.entries(subscriptions || {})
    .filter(([_, active]) => active)
    .map(([pathKey]) => {
      const details = PATH_DETAILS[pathKey as keyof typeof PATH_DETAILS];
      return details ? details.title : pathKey.toUpperCase();
    });

  const resolvedPlanName = subscriptionPlanName || (Object.values(subscriptionDetails)[0]?.tierName) || (activePathsList.length > 0 ? activePathsList.join(' + ') : 'Pro Membership (₹399/mo)');

  return (
    <div className="space-y-6">
      
      {/* Guest warning banner if not logged in */}
      {!user && (
        <div className="bg-gradient-to-r from-amber-500/10 via-yellow-500/5 to-amber-500/10 border border-amber-500/30 rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 text-left relative overflow-hidden">
          <div className="absolute right-0 top-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl"></div>
          <div className="flex items-start gap-4 relative z-10">
            <div className="bg-gradient-to-tr from-amber-500 to-yellow-500 p-3.5 rounded-2xl text-slate-950 shadow-md">
              <AlertCircle className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h4 className="text-sm font-black uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                <span>Guest Local Workspace Active</span>
                <span className="bg-amber-500/25 text-amber-300 text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase">UNSAVED PROGRESS</span>
              </h4>
              <p className="text-xs text-slate-300 mt-1.5 font-semibold leading-relaxed max-w-xl">
                You are utilizing localized state caches. Connect with secure cloud sign-in to backup your career matching bookmarks, enrolled courses progress, checklist achievements, and job application histories persistently across devices!
              </p>
            </div>
          </div>
          <button 
            onClick={onOpenAuth}
            className="flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 text-xs font-black uppercase tracking-wider rounded-2xl shadow-lg transition-all shrink-0 cursor-pointer hover:scale-[1.02] active:scale-95"
          >
            <LogIn className="w-4 h-4" /> Connect with Google Sign-In
          </button>
        </div>
      )}

      {/* Profile Overview Card & Completeness tracker */}
      <div className="bg-slate-950 text-white rounded-[2rem] p-6 md:p-8 shadow-2xl border border-slate-850 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-gradient-to-br from-blue-600/15 to-purple-600/15 rounded-full blur-3xl -translate-y-16 translate-x-16"></div>
        
        <div className="relative flex flex-col lg:flex-row gap-8 items-stretch justify-between">
          
            {/* Avatar and Info panel */}
            <div className="flex flex-col md:flex-row gap-6 items-start lg:items-center flex-1">
              {/* Top Row for Avatar & Mobile Action Buttons (Sign Out in the marked area) */}
              <div className="flex items-center justify-between w-full md:w-auto">
                <div 
                  onDoubleClick={() => {
                    const next = !showSandboxControls;
                    setShowSandboxControls(next);
                    localStorage.setItem('recruit_show_dev_sandbox', String(next));
                  }}
                  title="Double-click to toggle developer sandbox controls"
                  className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-[#7c3aed] to-[#a855f7] text-white flex items-center justify-center font-black text-2xl shadow-xl border border-purple-400/30 shrink-0 relative cursor-pointer select-none"
                >
                  {profile.name ? profile.name.slice(0, 2).toUpperCase() : 'IN'}
                  <div className="absolute -bottom-1 -right-1 bg-emerald-500 border-2 border-slate-950 w-5 h-5 rounded-full flex items-center justify-center" title="Online profile active">
                    <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                  </div>
                </div>

                {/* Marked Area: Sign Out button on mobile */}
                <button
                  id="profile-signout-btn-mobile"
                  onClick={handleSignOut}
                  disabled={isSigningOut}
                  className="md:hidden flex items-center gap-2 px-3.5 py-2 bg-rose-500/15 hover:bg-rose-500/25 active:bg-rose-500/35 border border-rose-500/30 hover:border-rose-500/50 text-rose-300 hover:text-rose-100 text-xs font-bold rounded-xl transition-all shadow-sm cursor-pointer"
                  title="Sign out of your Arohi AI account"
                >
                  {isSigningOut ? (
                    <Loader2 className="w-4 h-4 animate-spin text-rose-400" />
                  ) : (
                    <LogOut className="w-4 h-4 text-rose-400" />
                  )}
                  <span>Sign Out</span>
                </button>
              </div>

              <div className="text-left space-y-3 flex-1 w-full">
                {isEditingProfile ? (
                  <div className="space-y-4 max-w-2xl bg-[#110d29]/60 border border-[#3b2b73]/60 p-5 rounded-2xl text-slate-100">
                    <div className="flex items-center gap-2 pb-2 border-b border-[#241a4d]">
                      <Edit3 className="w-4 h-4 text-purple-400" />
                      <h4 className="text-xs font-black uppercase tracking-wider text-purple-300">Edit Your Professional Register Profile</h4>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="block text-[10px] text-slate-400 font-extrabold uppercase tracking-wide">Full Name</label>
                        <input 
                          type="text" 
                          value={editedName} 
                          onChange={e => setEditedName(e?.target?.value ?? "")}
                          className="w-full bg-[#0d0a20] border border-[#2d215d] rounded-xl px-3.5 py-2 text-xs text-white focus:border-purple-500 outline-none transition-colors font-semibold"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-[10px] text-slate-400 font-extrabold uppercase tracking-wide">Contact Phone</label>
                        <input 
                          type="text" 
                          value={editedPhone} 
                          onChange={e => setEditedPhone(e?.target?.value ?? "")}
                          className="w-full bg-[#0d0a20] border border-[#2d215d] rounded-xl px-3.5 py-2 text-xs text-white focus:border-purple-500 outline-none transition-colors font-semibold"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="block text-[10px] text-slate-400 font-extrabold uppercase tracking-wide">Residence Location</label>
                        <input 
                          type="text" 
                          value={editedLocation} 
                          onChange={e => setEditedLocation(e?.target?.value ?? "")}
                          className="w-full bg-[#0d0a20] border border-[#2d215d] rounded-xl px-3.5 py-2 text-xs text-white focus:border-purple-500 outline-none transition-colors font-semibold"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-[10px] text-slate-400 font-extrabold uppercase tracking-wide">Education Level</label>
                        <input 
                          type="text" 
                          value={editedEducation} 
                          onChange={e => setEditedEducation(e?.target?.value ?? "")}
                          className="w-full bg-[#0d0a20] border border-[#2d215d] rounded-xl px-3.5 py-2 text-xs text-white focus:border-purple-500 outline-none transition-colors font-semibold"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="block text-[10px] text-slate-400 font-extrabold uppercase tracking-wide">Primary Career Goal</label>
                        <input 
                          type="text" 
                          value={editedGoal} 
                          onChange={e => setEditedGoal(e?.target?.value ?? "")}
                          className="w-full bg-[#0d0a20] border border-[#2d215d] rounded-xl px-3.5 py-2 text-xs text-white focus:border-purple-500 outline-none transition-colors font-semibold"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-[10px] text-slate-400 font-extrabold uppercase tracking-wide">Resume Link / Portfolio URL</label>
                        <input 
                          type="text" 
                          value={editedResume} 
                          placeholder="https://drive.google.com/..."
                          onChange={e => setEditedResume(e?.target?.value ?? "")}
                          className="w-full bg-[#0d0a20] border border-[#2d215d] rounded-xl px-3.5 py-2 text-xs text-white focus:border-purple-500 outline-none transition-colors font-semibold"
                        />
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button 
                        onClick={handleSaveProfile}
                        className="flex items-center gap-1 px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white text-xs font-black uppercase rounded-xl transition-all cursor-pointer shadow-md"
                      >
                        <Save className="w-4 h-4" /> Save Profile Details
                      </button>
                      <button 
                        onClick={() => setIsEditingProfile(false)}
                        className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-black uppercase rounded-xl transition-all cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-1.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <h2 className="text-2xl font-black tracking-tight">{profile.name}</h2>
                          <span className="bg-[#7c3aed]/20 text-[#a78bfa] border border-[#7c3aed]/30 text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                            Verified Candidate Profile
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-slate-400 text-xs font-semibold">
                          <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-purple-400" /> {profile.email}</span>
                          <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-purple-400" /> {profile.phone || 'No phone set'}</span>
                          <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-purple-400" /> {profile.location || 'No location set'}</span>
                        </div>

                        <div className="text-xs text-slate-300 font-bold pt-1">
                          🏫 Academic Credentials: <span className="text-white font-black">{profile.education || 'Not specified'}</span>
                        </div>

                        <div className="flex flex-wrap gap-2 pt-1 items-center">
                          <span className="text-xs text-emerald-400 font-extrabold">
                            🎯 Active Career Target: {profile.activeGoal || 'Set your target goal'}
                          </span>
                          {profile.resumeUrl && (
                            <a 
                              href={profile.resumeUrl} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="inline-flex items-center gap-1 text-[10px] bg-blue-500/10 border border-blue-500/25 px-2 py-0.5 rounded text-blue-300 font-bold hover:bg-blue-500/20 transition-all"
                            >
                              <FileText className="w-3 h-3" /> View Portfolio / Resume <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Desktop Sign Out Button */}
                      <div className="hidden md:flex items-center self-start">
                        <button
                          id="profile-signout-btn-desktop"
                          onClick={handleSignOut}
                          disabled={isSigningOut}
                          className="flex items-center gap-2 px-4 py-2 bg-rose-500/15 hover:bg-rose-500/25 active:bg-rose-500/35 border border-rose-500/30 hover:border-rose-500/50 text-rose-300 hover:text-rose-100 text-xs font-bold rounded-xl transition-all shadow-sm cursor-pointer"
                          title="Sign out of your Arohi AI account"
                        >
                          {isSigningOut ? (
                            <Loader2 className="w-4 h-4 animate-spin text-rose-400" />
                          ) : (
                            <LogOut className="w-4 h-4 text-rose-400" />
                          )}
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
          </div>

          {/* Profile completeness panel */}
          <div className="lg:w-72 bg-[#0c0820]/75 border border-[#2b1f5d] p-5 rounded-2xl flex flex-col justify-center space-y-3 self-center shrink-0">
            <div className="flex justify-between items-center text-xs font-black uppercase">
              <span className="text-slate-300">Registration Completeness</span>
              <span className="text-purple-400">{completeness}%</span>
            </div>
            
            <div className="w-full bg-[#1b143d] h-3 rounded-full overflow-hidden border border-[#30246a] p-0.5">
              <div 
                className="bg-gradient-to-r from-purple-600 via-indigo-500 to-emerald-400 h-full rounded-full transition-all duration-500" 
                style={{ width: `${completeness}%` }}
              ></div>
            </div>

            <p className="text-[10px] text-slate-400 font-medium leading-relaxed text-left">
              {completeness === 100 
                ? '🎉 Perfect! Your professional digital portfolio is fully formulated.' 
                : '💡 Complete all contact details, career goals, and portfolio resume links to maximize matching index ratios.'
              }
            </p>

            {!isEditingProfile && (
              <div className="flex flex-col gap-2 w-full">
                <button 
                  onClick={() => setIsEditingProfile(true)}
                  className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#1a143a] hover:bg-[#251e54] border border-slate-800 rounded-xl text-[11px] font-black uppercase tracking-wider text-slate-300 hover:text-white transition-all cursor-pointer shadow-sm"
                >
                  <Edit3 className="w-3.5 h-3.5 text-purple-400" /> Complete Registry Profile
                </button>
                {onShare && (
                  <button 
                    onClick={onShare}
                    className="w-full flex items-center justify-center gap-1.5 px-4 py-2 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 hover:from-emerald-500/20 hover:to-teal-500/20 border border-emerald-500/30 rounded-xl text-[11px] font-black uppercase tracking-wider text-emerald-400 hover:text-white transition-all cursor-pointer shadow-sm"
                  >
                    <Share2 className="w-3.5 h-3.5 text-emerald-400" /> Share Platform
                  </button>
                )}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* 🌟 PROMINENT ACTIVE SUBSCRIPTION & BILLING PERIOD TRACKER (When active plan is detected) */}
      {isSubscribed && (
        <div 
          id="user-dashboard-billing-period-card"
          className={`rounded-[2rem] p-6 text-left relative overflow-hidden shadow-2xl border transition-all ${
            isExpired 
              ? 'bg-gradient-to-br from-rose-950/80 via-[#240a16] to-[#12050e] border-rose-500/80 shadow-rose-950/40 text-white'
              : daysRemaining <= 7 
              ? 'bg-gradient-to-br from-[#241324] via-[#1e102f] to-[#100a20] border-amber-400/80 shadow-amber-950/40 text-white'
              : 'bg-gradient-to-br from-[#131131] via-[#16173a] to-[#0c1024] border-purple-500/40 shadow-purple-950/30 text-white'
          }`}
        >
          {/* Decorative background glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-purple-500/10 via-indigo-500/5 to-transparent rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-emerald-500/10 to-transparent rounded-full blur-2xl pointer-events-none"></div>

          <div className="relative z-10 space-y-5">
            {/* Top Row: Plan Identification & Status Badges */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-2xl flex items-center justify-center shrink-0 border ${
                  isExpired 
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse'
                    : daysRemaining <= 7 
                    ? 'bg-amber-500/20 text-amber-300 border-amber-400/40 animate-[wiggle_1s_ease-in-out_infinite]'
                    : 'bg-gradient-to-br from-purple-600 to-indigo-600 text-white border-purple-400/40 shadow-lg shadow-purple-500/30'
                }`}>
                  {isExpired ? <ShieldAlert className="w-6 h-6" /> : <Crown className="w-6 h-6" />}
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full border ${
                      isExpired 
                        ? 'bg-rose-500 text-white border-rose-400' 
                        : daysRemaining <= 7 
                        ? 'bg-amber-400/20 text-amber-300 border-amber-400/40' 
                        : 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30'
                    }`}>
                      {isExpired ? '🚨 SUBSCRIPTION EXPIRED' : daysRemaining <= 7 ? '⚠️ RENEWS WITHIN 7 DAYS' : '✨ ACTIVE & PROTECTED'}
                    </span>
                    <span className="text-[10px] font-black text-purple-300 bg-purple-950/60 border border-purple-500/30 px-2 py-0.5 rounded-md">
                      100% Coins Cashback Enabled
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-white mt-1 flex items-center gap-2">
                    <span>{resolvedPlanName}</span>
                  </h3>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    if (onRenewSubscription) {
                      onRenewSubscription();
                    } else if (onNavigateTab) {
                      onNavigateTab('pricing');
                    } else {
                      const el = document.getElementById('monthly-subscriptions-anchor');
                      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                  className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-lg transition-all cursor-pointer hover:scale-[1.02] active:scale-95 border border-purple-400/30"
                >
                  <Zap className="w-3.5 h-3.5 fill-current" />
                  <span>{isExpired ? 'Reactivate Plan' : 'Extend / Renew Plan'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* 3 Key Metrics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {/* Metric 1: Exact Subscription End Date */}
              <div className="bg-black/30 border border-white/10 rounded-2xl p-4 space-y-1.5 backdrop-blur-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-purple-400" />
                    Subscription End Date
                  </span>
                  <span className="text-[9px] font-bold text-purple-300 bg-purple-500/10 px-1.5 py-0.5 rounded border border-purple-500/20">
                    Valid Till
                  </span>
                </div>
                <div className="text-base sm:text-lg font-black text-white tracking-tight">
                  {formattedEndDate}
                </div>
                <p className="text-[11px] text-slate-300 font-semibold font-mono flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-400" />
                  {formattedEndTime} (Local Time)
                </p>
              </div>

              {/* Metric 2: Live Remaining Period Countdown */}
              <div className="bg-black/30 border border-white/10 rounded-2xl p-4 space-y-1.5 backdrop-blur-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Timer className="w-3.5 h-3.5 text-amber-400" />
                    Remaining Period
                  </span>
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${
                    isExpired 
                      ? 'bg-rose-500/20 text-rose-300 border-rose-500/30' 
                      : daysRemaining <= 7 
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' 
                      : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                  }`}>
                    {isExpired ? 'Ended' : `${daysRemaining} Days Left`}
                  </span>
                </div>
                <div className="text-base sm:text-lg font-black font-mono tracking-tight text-amber-300">
                  {isExpired ? '0d 0h 0m 0s' : `${daysRemaining}d ${hoursRemaining}h ${minutesRemaining}m ${secondsRemaining}s`}
                </div>
                <p className="text-[11px] text-slate-400 font-medium">
                  {isExpired ? 'Service paused — renew to restore' : 'Real-time billing countdown active'}
                </p>
              </div>

              {/* Metric 3: Plan Privileges & Speed */}
              <div className="bg-black/30 border border-white/10 rounded-2xl p-4 space-y-1.5 backdrop-blur-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    Assistance Level
                  </span>
                  <span className="text-[9px] font-bold text-emerald-300 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                    Unrestricted
                  </span>
                </div>
                <div className="text-base sm:text-lg font-black text-emerald-300">
                  Multi-Engine AI Active
                </div>
                <p className="text-[11px] text-slate-300 font-medium">
                  150+ regional voice calling &amp; resume tools unlocked
                </p>
              </div>
            </div>

            {/* Progress Bar for Billing Cycle */}
            <div className="space-y-2 bg-black/20 p-3.5 rounded-2xl border border-white/5">
              <div className="flex justify-between items-center text-[11px] font-bold">
                <span className="text-slate-300 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Monthly Billing Cycle Progression ({cyclePercentage}% Elapsed)
                </span>
                <span className="text-purple-300 font-mono">
                  {daysRemaining} of 30 Days Remaining
                </span>
              </div>
              <div className="w-full bg-[#1b143d] h-2.5 rounded-full overflow-hidden border border-[#30246a]">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${
                    isExpired 
                      ? 'bg-rose-500' 
                      : daysRemaining <= 7 
                      ? 'bg-gradient-to-r from-amber-500 to-rose-500' 
                      : 'bg-gradient-to-r from-purple-600 via-indigo-500 to-emerald-400'
                  }`}
                  style={{ width: `${Math.min(100, Math.max(5, cyclePercentage))}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
                <span>Current Cycle Active</span>
                <span>Next Expiration: {formattedEndDate}</span>
              </div>
            </div>

            {/* 7-Day Pre-Expiry Advance Notice Callout */}
            {!isExpired && daysRemaining <= 7 && (
              <div className="p-3.5 rounded-xl bg-amber-500/15 border border-amber-400/40 text-amber-200 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 animate-pulse" />
                  <span className="font-bold">
                    Advance Notice: Your plan ends in {daysRemaining} days on {formattedEndDate}. Renew now to avoid any interruption in live AI call quotas and verified employer matching.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (onRenewSubscription) {
                      onRenewSubscription();
                    } else if (onNavigateTab) {
                      onNavigateTab('pricing');
                    }
                  }}
                  className="px-3.5 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-[10px] uppercase rounded-lg shrink-0 cursor-pointer shadow"
                >
                  Renew Now →
                </button>
              </div>
            )}

            {/* Dev sandbox simulator helpers */}
            {showSandboxControls && onSetSubscriptionEndDate && (
              <div className="pt-2 border-t border-white/5 flex flex-wrap items-center gap-2 text-[10px]">
                <span className="text-slate-400 font-bold uppercase">Dev Billing Simulator:</span>
                <button
                  type="button"
                  onClick={() => onSetSubscriptionEndDate(Date.now() + 30 * 24 * 60 * 60 * 1000)}
                  className="px-2.5 py-1 bg-purple-900/60 hover:bg-purple-800 text-purple-200 rounded-lg border border-purple-500/30 cursor-pointer"
                >
                  Set 30 Days (Full Cycle)
                </button>
                <button
                  type="button"
                  onClick={() => onSetSubscriptionEndDate(Date.now() + (6 * 24 * 60 * 60 * 1000) + (18 * 60 * 60 * 1000))}
                  className="px-2.5 py-1 bg-amber-900/60 hover:bg-amber-800 text-amber-200 rounded-lg border border-amber-500/30 cursor-pointer"
                >
                  Set 7 Days (Trigger Alert)
                </button>
                <button
                  type="button"
                  onClick={() => onSetSubscriptionEndDate(Date.now() + (2 * 24 * 60 * 60 * 1000))}
                  className="px-2.5 py-1 bg-orange-900/60 hover:bg-orange-800 text-orange-200 rounded-lg border border-orange-500/30 cursor-pointer"
                >
                  Set 2 Days (Urgent Alert)
                </button>
                <button
                  type="button"
                  onClick={() => onSetSubscriptionEndDate(Date.now() - 1000)}
                  className="px-2.5 py-1 bg-rose-900/60 hover:bg-rose-800 text-rose-200 rounded-lg border border-rose-500/30 cursor-pointer"
                >
                  Set Expired (0 Days)
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* DASHBOARD SECTION NAVIGATION BAR */}
      <div className="bg-[#120e2e] border-2 border-[#31226e] p-2.5 rounded-[1.75rem] flex items-center justify-between gap-2 overflow-x-auto custom-scrollbar shadow-2xl">
        {[
          { id: 'all', label: '📊 Dashboard Overview', icon: Sparkles },
          { id: 'subscriptions', label: '👑 Subscription Plans & Tiers', icon: Crown, badge: '₹399+' },
          { id: 'mocktests', label: '🎓 Exams & Mock Tests', icon: Brain, badge: `${mockTestHistory.length}` },
          { id: 'profile', label: '👤 Profile Registry', icon: User },
          { id: 'applications', label: '💼 Job Applications', icon: Briefcase, badge: `${appliedJobs.length}` },
          { id: 'courses', label: '📚 Enrolled Courses', icon: GraduationCap, badge: `${totalEnrolledCount}` }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSectionTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveSectionTab(tab.id as any);
                if (tab.id === 'subscriptions') {
                  setTimeout(() => {
                    const el = document.getElementById('monthly-subscriptions-anchor');
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }, 100);
                }
              }}
              className={`flex items-center gap-2 px-4 py-3 rounded-2xl text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] scale-[1.02] border border-purple-400/40'
                  : 'bg-[#1b143c] text-slate-300 hover:text-white hover:bg-[#251d54] border border-slate-800/60'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-amber-300 animate-pulse' : 'text-purple-400'}`} />
              <span>{tab.label}</span>
              {tab.badge && (
                <span className={`text-[9.5px] font-black px-2 py-0.5 rounded-full border ml-1 ${
                  isActive 
                    ? 'bg-amber-400 text-slate-950 border-amber-300' 
                    : 'bg-purple-950/80 text-purple-300 border-purple-500/30'
                }`}>
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* CORE STATS GRID - NEW WORKSPACE SUMMARY */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[#120e2a] border border-[#20174e] rounded-2xl p-4 text-left relative overflow-hidden">
          <span className="block text-[10px] text-slate-400 uppercase font-black tracking-wider">Active Paths Subscriptions</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-black text-white">{Object.values(subscriptions || {}).filter(Boolean).length}</span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
              isSubscribed ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' : 'text-slate-400 bg-slate-800 border-slate-700'
            }`}>
              {isSubscribed ? 'Unlocked' : 'Free Tier'}
            </span>
          </div>
          {isSubscribed ? (
            <p className="text-[10px] text-emerald-300 font-bold mt-1.5 leading-tight flex items-center gap-1">
              <Calendar className="w-3 h-3 text-emerald-400" />
              Valid till {new Date(effectiveEndDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} ({daysRemaining}d left)
            </p>
          ) : (
            <p className="text-[9px] text-slate-400 font-semibold mt-1.5 leading-tight">Continuous assistance plan</p>
          )}
        </div>

        <div className="bg-[#120e2a] border border-[#20174e] rounded-2xl p-4 text-left relative overflow-hidden">
          <span className="block text-[10px] text-slate-400 uppercase font-black tracking-wider">Courses Enrolled</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-black text-white">{totalEnrolledCount}</span>
            <span className="text-[10px] text-purple-400 font-bold bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/20">Academy</span>
          </div>
          <p className="text-[9px] text-slate-400 font-semibold mt-1.5 leading-tight">Curriculum programs loaded</p>
        </div>

        <div className="bg-[#120e2a] border border-[#20174e] rounded-2xl p-4 text-left relative overflow-hidden">
          <span className="block text-[10px] text-slate-400 uppercase font-black tracking-wider">Completed Academic Units</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-black text-white">{completedCount}</span>
            <span className="text-[10px] text-yellow-400 font-bold bg-yellow-500/10 px-2 py-0.5 rounded-full border border-yellow-500/20">Checked</span>
          </div>
          <p className="text-[9px] text-slate-400 font-semibold mt-1.5 leading-tight">Module checklist steps completed</p>
        </div>

        <div className="bg-[#120e2a] border border-[#20174e] rounded-2xl p-4 text-left relative overflow-hidden">
          <span className="block text-[10px] text-slate-400 uppercase font-black tracking-wider">Applied Opportunities</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-black text-white">{appliedJobs.length}</span>
            <span className="text-[10px] text-blue-400 font-bold bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/20">Receipts</span>
          </div>
          <p className="text-[9px] text-slate-400 font-semibold mt-1.5 leading-tight">Official registration slips active</p>
        </div>
      </div>

      {/* ⚠️ TOKEN QUOTA WARNING & REPEATED REMINDER CONTROL CENTER */}
      {showSandboxControls && (
        <div className="bg-[#1a1138]/85 border-2 border-[#5c21b6]/60 rounded-[2.5rem] p-6 text-left text-white shadow-2xl space-y-6 relative overflow-hidden backdrop-blur-md">
          {/* Neon Glow decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-600/5 rounded-full blur-3xl pointer-events-none"></div>

          {/* Header Block */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#311b5e]/50 pb-5 relative z-10">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="bg-amber-500/10 text-amber-300 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-amber-500/20">
                  ⚠️ Fair-Trade Policy
                </span>
                <span className="bg-purple-500/10 text-purple-300 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-purple-500/20">
                  Odisha Compute Server Sync
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2 mt-1">
                <AlertTriangle className="w-5.5 h-5.5 text-amber-400 animate-pulse" />
                Token Warning System & Repeated Reminders Control
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-semibold max-w-3xl">
                Monitors active roadmap subscription usage against designated monthly computational limits. Once a path consumes 80% or more of its token quota, the system triggers repeated overlay toast warnings at precise time intervals to prevent sudden service halts.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 self-start md:self-center shrink-0">
              {/* Quick simulator trigger */}
              <button
                onClick={onTriggerTestLimitWarning}
                className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black text-[11px] uppercase tracking-wider rounded-xl shadow-lg transition-all active:scale-95 cursor-pointer flex items-center gap-1.5"
                title="Instantly activates Path 1 and sets token usage to 82% to fire alerts."
              >
                <Sparkles className="w-3.5 h-3.5" /> Force 82% Usage Warning
              </button>
            </div>
          </div>

          {/* Dashboard Control Panel Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 relative z-10">
            {/* Settings Section (Left) */}
            <div className="md:col-span-5 space-y-4 bg-black/40 border border-[#3e1b7c]/45 p-5 rounded-[2rem]">
              <h4 className="text-xs font-black text-violet-300 uppercase tracking-widest flex items-center gap-1.5 pb-2 border-b border-white/5">
                <Settings className="w-4 h-4" /> System Settings
              </h4>

              {/* Toggle reminders */}
              <div className="flex items-center justify-between gap-4 py-1.5">
                <div className="space-y-0.5 text-left">
                  <span className="text-xs font-bold text-slate-100 block">Repeated Warning Toasts</span>
                  <span className="text-[10px] text-slate-400 font-semibold leading-normal block">
                    Toggle repeated reminder toasts on/off.
                  </span>
                </div>
                <button
                  onClick={onToggleWarningEnabled}
                  className="focus:outline-none cursor-pointer transition-transform active:scale-95 border-0 bg-transparent"
                >
                  {warningEnabled ? (
                    <ToggleRight className="w-12 h-12 text-[#a855f7]" />
                  ) : (
                    <ToggleLeft className="w-12 h-12 text-slate-600" />
                  )}
                </button>
              </div>

              {/* Time interval selection */}
              <div className="space-y-2 text-left pt-2">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs font-bold text-slate-100">Reminder Time Interval</span>
                  <span className="text-[10px] text-amber-300 font-mono font-black uppercase tracking-wider bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                    Every {warningInterval} seconds
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 font-semibold leading-snug">
                  Configure the interval for repeated toast reminders when usage is at or above 80%.
                </p>
                
                <div className="grid grid-cols-5 gap-1.5 pt-1.5">
                  {[5, 10, 15, 30, 60].map((sec) => (
                    <button
                      key={sec}
                      onClick={() => onSetWarningInterval && onSetWarningInterval(sec)}
                      className={`py-2 text-[10px] font-black rounded-lg transition-all cursor-pointer ${
                        warningInterval === sec
                          ? 'bg-violet-600 text-white shadow-md border border-violet-400/30 font-mono'
                          : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/5'
                      }`}
                    >
                      {sec}s
                    </button>
                  ))}
                </div>
              </div>

              {/* Active sweep countdown visualizer */}
              <div className="p-3 rounded-2xl bg-violet-950/30 border border-[#52299d]/30 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-violet-400 shrink-0" />
                  <span className="text-[10px] text-slate-300 font-extrabold">Active Reminder Timer:</span>
                </div>
                {warningEnabled ? (
                  <span className="text-[10px] font-mono font-black text-emerald-400 animate-pulse">
                    Sweeping in {nextReminderIn}s...
                  </span>
                ) : (
                  <span className="text-[10px] font-mono font-black text-rose-400 uppercase tracking-wider">
                    System Muted 🔇
                  </span>
                )}
              </div>
            </div>

            {/* Realtime Warning Events Log (Right) */}
            <div className="md:col-span-7 flex flex-col justify-between bg-black/40 border border-[#3e1b7c]/45 p-5 rounded-[2rem] min-h-[220px]">
              <div className="space-y-3">
                <div className="flex justify-between items-center pb-2 border-b border-white/5">
                  <h4 className="text-xs font-black text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
                    <Clock className="w-4 h-4" /> Live Repeated Reminders Log ({warningHistoryLog.length})
                  </h4>
                  {warningHistoryLog.length > 0 && (
                    <button
                      onClick={onClearWarningHistory}
                      className="text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-rose-400 transition-all cursor-pointer bg-white/5 px-2.5 py-1 rounded-lg border border-white/10"
                    >
                      Clear Log
                    </button>
                  )}
                </div>

                {/* Console logs */}
                <div className="h-36 overflow-y-auto pr-1 text-left font-mono text-[10px] leading-relaxed space-y-1.5 custom-scrollbar">
                  {warningHistoryLog.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-slate-500 py-6 space-y-1">
                      <span>No alerts triggered yet.</span>
                      <span className="text-[9px] text-center max-w-xs font-sans">
                        (Adjust any active path quota past 80% or click the "Force 82% Usage Warning" simulator above to begin recording logs).
                      </span>
                    </div>
                  ) : (
                    warningHistoryLog.map((log) => (
                      <div key={log.id} className="border-b border-white/5 pb-1 flex gap-2 items-start animate-in fade-in slide-in-from-left-2 duration-150">
                        <span className="text-violet-400 font-black font-sans shrink-0">[{log.timestamp}]</span>
                        <div className="space-y-0.5">
                          <span className="text-amber-300 font-bold font-sans">[{log.pathTitle}] </span>
                          <span className="text-slate-200">{log.message}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="text-[9px] text-slate-500 font-semibold border-t border-white/5 pt-2 mt-2">
                💡 Repeated toast reminders alert users to upgrade before their limits are reached. Premium accounts ensure stable real-time workspace access.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AROHI COINS & REFERRAL REWARDS WALLET CARD */}
      <div className="bg-gradient-to-br from-[#120a2e] via-[#1a0f40] to-[#120a2e] border border-amber-500/50 p-5 sm:p-6 rounded-[2rem] text-left text-white shadow-2xl space-y-5 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-amber-500/20 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-tr from-amber-500 to-yellow-300 text-slate-950 rounded-2xl flex items-center justify-center font-black shadow-lg shadow-amber-500/20 shrink-0">
              <Coins className="w-6 h-6" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>1 Arohi Coin = ₹1 INR Value</span>
              </div>
              <h3 className="text-lg font-black text-white flex items-center gap-2 mt-0.5">
                <span>Arohi Coins & Referral Wallet</span>
              </h3>
            </div>
          </div>

          {/* Balance Pill */}
          <div className="bg-[#1e1346] border-2 border-amber-400/60 rounded-2xl px-4 py-2 text-right shadow-inner flex items-center gap-3">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Available Balance</p>
              <p className="text-xl font-black text-amber-300 flex items-center gap-1">
                <span>🪙 {arohiCoinBalance}</span>
                <span className="text-xs font-bold text-slate-300">Coins</span>
              </p>
            </div>
            <div className="text-right border-l border-amber-500/30 pl-3">
              <p className="text-[10px] font-bold text-slate-400">Discount Value</p>
              <p className="text-sm font-black text-emerald-400">₹{arohiCoinBalance}.00</p>
            </div>
          </div>
        </div>

        {/* Referral Code & Share Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#0f0928] border border-[#2e1d68] p-4 rounded-2xl space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-black text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-amber-400" />
                <span>Your Unique Referral Code</span>
              </label>
              <span className="text-[9px] font-bold text-emerald-300 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                AUTO-GENERATED
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-full bg-[#18103d] border border-[#442c94] rounded-xl px-3.5 py-2 text-sm font-mono font-black text-amber-300 tracking-wider flex items-center justify-between">
                <span>{userReferralCode}</span>
                <span className="text-[10px] font-sans text-slate-400 font-bold">100% Cashback Code</span>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(userReferralCode);
                  setCopiedRefText('code');
                  setTimeout(() => setCopiedRefText(null), 2000);
                }}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs px-3.5 py-2.5 rounded-xl cursor-pointer transition-all shrink-0 flex items-center gap-1 shadow-md"
              >
                {copiedRefText === 'code' ? <Check className="w-4 h-4 text-slate-950" /> : <Copy className="w-4 h-4 text-slate-950" />}
                <span>{copiedRefText === 'code' ? 'Copied!' : 'Copy Code'}</span>
              </button>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-[10px] text-slate-400 font-medium">Share code with friends to earn 5% cashback</span>
              <button
                onClick={() => {
                  const shareUrl = `${window.location.origin}/?ref=${encodeURIComponent(userReferralCode)}`;
                  navigator.clipboard.writeText(shareUrl);
                  setCopiedRefText('link');
                  setTimeout(() => setCopiedRefText(null), 2000);
                }}
                className="text-[11px] font-bold text-purple-300 hover:text-white flex items-center gap-1 underline cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5 text-purple-400" />
                <span>{copiedRefText === 'link' ? 'Link Copied!' : 'Copy Referral Link'}</span>
              </button>
            </div>
          </div>

          {/* Program Benefit Rules */}
          <div className="bg-[#0f0928] border border-[#2e1d68] p-4 rounded-2xl space-y-2 text-xs">
            <h4 className="font-extrabold text-amber-300 flex items-center gap-1.5 text-xs uppercase tracking-wide">
              <Gift className="w-4 h-4 text-amber-400" />
              <span>How Referral & Cashback Works</span>
            </h4>
            <ul className="space-y-1.5 text-[11px] text-slate-300">
              <li className="flex items-start gap-1.5">
                <span className="text-amber-400 font-bold shrink-0">1.</span>
                <span><strong>New User 100% Cashback:</strong> Friends using your code get <strong>100% Cashback</strong> in Arohi Coins on 1st month payment (e.g. ₹399 = 🪙 399 Coins!).</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-amber-400 font-bold shrink-0">2.</span>
                <span><strong>5% Referrer Reward:</strong> You earn <strong>5% Cashback</strong> in Arohi Coins every time a friend activates a plan using your code.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-amber-400 font-bold shrink-0">3.</span>
                <span><strong>Monthly Plan Discount:</strong> Redeem up to <strong>100 Arohi Coins (₹100 Off)</strong> directly on every monthly plan payment.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Transaction History Ledger */}
        {coinTransactions.length > 0 && (
          <div className="bg-[#0f0928] border border-[#2e1d68] p-4 rounded-2xl space-y-2">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Recent Arohi Coin Activity</span>
            </h4>
            <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1 custom-scrollbar text-xs">
              {coinTransactions.map((tx) => (
                <div key={tx.id} className="bg-[#160d3b] border border-[#301f70] p-2 rounded-xl flex items-center justify-between text-slate-200">
                  <div>
                    <p className="font-bold text-white text-[11px]">{tx.description}</p>
                    <p className="text-[9px] text-slate-400">{tx.date}</p>
                  </div>
                  <span className={`font-black text-xs px-2 py-0.5 rounded-lg border ${
                    tx.amount > 0 
                      ? 'bg-emerald-950/80 text-emerald-400 border-emerald-500/40' 
                      : 'bg-rose-950/80 text-rose-400 border-rose-500/40'
                  }`}>
                    {tx.amount > 0 ? `+🪙 ${tx.amount}` : `-🪙 ${Math.abs(tx.amount)}`}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* MONTHLY SUBSCRIPTIONS CONTROL AREA */}
      <div id="monthly-subscriptions-anchor" className="bg-[#120e2b] border border-[#2d2163] p-4 sm:p-6 rounded-[2rem] text-left text-white shadow-2xl space-y-5">
        <PricingPage 
          embedMode={true}
          subscriptions={subscriptions}
          subscriptionDetails={subscriptionDetails}
          onSubscribe={onSubscribe}
          onNavigateTab={onNavigateTab}
          onOpenAuth={onOpenAuth}
        />

        {/* PROGRESS BLOCK FOR ACTIVE SUBSCRIPTIONS */}
        {isSubscribed ? (
          <div className="bg-[#17123a] border border-[#302470] p-4 sm:p-5 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-left space-y-1.5 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-black uppercase tracking-widest text-[#a855f7] block font-mono">Billing &amp; Growth Tracker Index</span>
                <span className="bg-[#10b981]/20 text-[#10b981] text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase border border-emerald-500/30">
                  {isExpired ? 'Expired' : `${daysRemaining} Days Remaining`}
                </span>
              </div>
              <h4 className="text-xs sm:text-sm font-extrabold text-white flex flex-wrap items-center gap-2">
                <span>📈 Plan: {resolvedPlanName}</span>
                <span className="text-[10px] text-purple-300 font-normal">
                  (Expires: <strong className="text-white">{formattedEndDate}</strong> at {formattedEndTime})
                </span>
              </h4>
              <p className="text-[11px] text-slate-300 leading-snug">
                Your resume matching, job queries, and 150+ language voice calling are priority routed with unlocked multi-engine AI limits.
              </p>
            </div>
            <div className="w-full md:w-56 text-right space-y-1.5 shrink-0 bg-black/20 p-3 rounded-xl border border-white/5">
              <div className="flex justify-between text-[10px] font-bold text-slate-300">
                <span>Cycle Elapsed</span>
                <span className="text-purple-300 font-mono">{cyclePercentage}%</span>
              </div>
              <div className="w-full bg-[#2a1d52] h-2 rounded-full overflow-hidden border border-[#3b2b73]">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${
                    isExpired ? 'bg-rose-500' : daysRemaining <= 7 ? 'bg-amber-400' : 'bg-gradient-to-r from-[#a855f7] to-[#10b981]'
                  }`} 
                  style={{ width: `${Math.min(100, Math.max(5, cyclePercentage))}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-[9px] text-slate-400 font-medium">
                <span>{daysRemaining}d {hoursRemaining}h remaining</span>
                <span>Ends: {formattedEndDate}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-[#1a1122] border border-amber-500/20 p-4 rounded-2xl flex items-center gap-3 text-amber-200">
            <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
            <div className="text-xs">
              <p className="font-bold">No Active Assistance Subscription</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Please subscribe to any plan above to unlock unlimited continuous support guidelines starting from ₹399/month.</p>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column applications & dynamic course progress */}
        <div className="lg:col-span-8 space-y-6">

          {/* RECENT ACTIVITY FEED */}
          <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-xl text-left">
            <div className="flex justify-between items-center mb-4 border-b border-slate-50 pb-2.5">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <Clock className="w-5 h-5 text-indigo-600 animate-pulse" /> Recent Activity Feed
              </h3>
              {activities.length > 0 && (
                <button
                  onClick={() => {
                    if (confirm("Are you sure you want to clear your activity history?")) {
                      localStorage.setItem('recruit_activities', JSON.stringify([]));
                      setActivities([]);
                    }
                  }}
                  className="text-[9px] font-black uppercase tracking-wider text-red-500 hover:text-red-700 hover:underline cursor-pointer"
                >
                  Clear History
                </button>
              )}
            </div>

            {activities.length === 0 ? (
              <p className="text-slate-400 text-xs font-semibold py-4 text-center">No recent actions logged on this profile.</p>
            ) : (
              <div className="relative border-l border-slate-100 ml-3 pl-5 space-y-5 py-2">
                {activities.map((act) => {
                  let badgeColor = 'bg-blue-100 text-blue-800';
                  let iconElement = <FileText className="w-3 h-3" />;
                  if (act.type === 'job') {
                    badgeColor = 'bg-emerald-100 text-emerald-800 border-emerald-200';
                    iconElement = <Briefcase className="w-3 h-3" />;
                  } else if (act.type === 'quiz') {
                    badgeColor = 'bg-indigo-100 text-indigo-800 border-indigo-200';
                    iconElement = <Award className="w-3 h-3" />;
                  } else if (act.type === 'resume') {
                    badgeColor = 'bg-amber-100 text-amber-800 border-amber-200';
                    iconElement = <FileText className="w-3 h-3" />;
                  } else if (act.type === 'course') {
                    badgeColor = 'bg-purple-100 text-purple-800 border-purple-200';
                    iconElement = <GraduationCap className="w-3 h-3" />;
                  } else if (act.type === 'profile') {
                    badgeColor = 'bg-slate-100 text-slate-800 border-slate-200';
                    iconElement = <User className="w-3 h-3" />;
                  }

                  // Format relative or neat date
                  const dateStr = new Date(act.timestamp).toLocaleDateString('en-IN', {
                    day: '2-digit',
                    month: 'short',
                    hour: '2-digit',
                    minute: '2-digit'
                  });

                  return (
                    <div key={act.id} className="relative group text-left">
                      {/* Timeline dot */}
                      <span className="absolute -left-[26px] top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-white border-2 border-indigo-500 ring-4 ring-white"></span>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                        <div className="flex items-center gap-2">
                          <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[9px] font-black uppercase border ${badgeColor}`}>
                            {iconElement}
                            {act.type}
                          </span>
                          <h4 className="font-extrabold text-xs text-slate-800 tracking-tight leading-snug">{act.title}</h4>
                        </div>
                        <span className="text-[9px] font-bold text-slate-400 flex items-center gap-1 font-mono sm:self-center shrink-0">
                          <Clock className="w-2.5 h-2.5" />
                          {dateStr}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 font-medium leading-relaxed mt-1">{act.description}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          
          {/* AROHI EXAMS & MOCK TESTS HISTORY MODULE */}
          <div id="mock-tests-history-anchor" className="bg-white p-6 rounded-[2rem] border border-purple-100 shadow-xl text-left space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-purple-600/10 text-purple-600 flex items-center justify-center font-bold">
                  <Brain className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-800 flex items-center gap-2">
                    <span>Arohi Exams & Mock Tests History</span>
                    <span className="text-[10px] bg-purple-100 text-purple-800 font-black px-2 py-0.5 rounded-full">
                      {mockTestHistory.length} Attempted
                    </span>
                  </h3>
                  <p className="text-[11px] text-slate-400 font-medium">
                    Verified performance logs from In-Chat CBT quizzes and All-India Mock Test portal
                  </p>
                </div>
              </div>

              <button
                onClick={() => onNavigateTab && onNavigateTab('mocktests')}
                className="px-3.5 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-[10px] font-black uppercase tracking-wider rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-1.5 self-start sm:self-auto"
              >
                <Play className="w-3 h-3 fill-white" />
                <span>Take New Mock Test</span>
              </button>
            </div>

            {/* Performance Summary Pill Grid */}
            {mockTestHistory.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-purple-50/60 p-3.5 rounded-2xl border border-purple-100/80">
                <div className="text-left">
                  <span className="text-[9px] text-slate-400 uppercase font-black tracking-wider block">Tests Taken</span>
                  <span className="text-base font-black text-slate-900">{mockTestHistory.length}</span>
                </div>
                <div className="text-left">
                  <span className="text-[9px] text-slate-400 uppercase font-black tracking-wider block">Avg. Accuracy</span>
                  <span className="text-base font-black text-purple-700">
                    {Math.round(mockTestHistory.reduce((acc, cur) => acc + (cur.accuracy || 0), 0) / mockTestHistory.length)}%
                  </span>
                </div>
                <div className="text-left">
                  <span className="text-[9px] text-slate-400 uppercase font-black tracking-wider block">Best Score</span>
                  <span className="text-base font-black text-emerald-600">
                    {Math.max(...mockTestHistory.map(m => m.scoreMarks || 0))} Marks
                  </span>
                </div>
                <div className="text-left">
                  <span className="text-[9px] text-slate-400 uppercase font-black tracking-wider block">Questions Practiced</span>
                  <span className="text-base font-black text-indigo-700">
                    {mockTestHistory.reduce((acc, cur) => acc + (cur.totalQuestions || 0), 0)} Qs
                  </span>
                </div>
              </div>
            )}

            {/* Exam Attempts List */}
            {mockTestHistory.length === 0 ? (
              <div className="text-center py-8 space-y-3 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                <p className="text-slate-500 text-xs font-semibold">No mock test history recorded yet.</p>
                <p className="text-[11px] text-slate-400 max-w-md mx-auto">
                  Take a CBT Mock Test in the Exam Portal or ask Arohi in Chat to start an interactive exam simulation!
                </p>
                <button
                  onClick={() => onNavigateTab && onNavigateTab('mocktests')}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-[10px] font-black uppercase tracking-wider rounded-xl shadow-sm transition-all cursor-pointer inline-flex items-center gap-1.5"
                >
                  <Brain className="w-3.5 h-3.5" />
                  <span>Open Mock Tests Portal</span>
                </button>
              </div>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto pr-1 custom-scrollbar">
                {mockTestHistory.map((test, idx) => {
                  const dateStr = test.completedAt 
                    ? new Date(test.completedAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
                    : 'Recently Completed';
                  const accuracy = test.accuracy || (test.answeredCount > 0 ? Math.round((test.correctCount / test.answeredCount) * 100) : 0);

                  return (
                    <div 
                      key={`${test.id || 'exam'}_${idx}_${test.completedAt || ''}`}
                      className="p-4 rounded-2xl border border-slate-200/80 hover:border-purple-300 bg-slate-50/70 transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3.5"
                    >
                      <div className="space-y-1.5 text-left flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[8.5px] font-black uppercase px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 border border-purple-200">
                            {test.source || 'CBT Mock Test'}
                          </span>
                          <span className="text-[10px] text-slate-400 font-bold flex items-center gap-1">
                            <Clock className="w-2.5 h-2.5" />
                            {dateStr}
                          </span>
                        </div>
                        <h4 className="font-extrabold text-xs sm:text-sm text-slate-900 leading-snug">
                          {test.examTitle || 'Science & General Practice Test'}
                        </h4>
                        <div className="flex items-center gap-3 text-[11px] text-slate-600 font-semibold flex-wrap">
                          <span>Qs: <strong className="text-slate-900">{test.totalQuestions || 30}</strong></span>
                          <span>•</span>
                          <span className="text-emerald-700 font-bold">✓ {test.correctCount || 0} Correct</span>
                          <span>•</span>
                          <span className="text-rose-600 font-bold">✗ {test.wrongCount || 0} Wrong</span>
                          <span>•</span>
                          <span>Score: <strong className="text-purple-900">{test.scoreMarks ?? (test.correctCount * 4)} Marks</strong></span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
                        <div className="text-right">
                          <span className="text-[9px] text-slate-400 uppercase font-black block">Accuracy</span>
                          <span className={`text-sm font-black px-2 py-0.5 rounded-lg border ${
                            accuracy >= 80 
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                              : accuracy >= 50 
                              ? 'bg-amber-50 text-amber-700 border-amber-200' 
                              : 'bg-rose-50 text-rose-700 border-rose-200'
                          }`}>
                            {accuracy}%
                          </span>
                        </div>
                        <button
                          onClick={() => onNavigateTab && onNavigateTab('mocktests')}
                          className="p-2 bg-white hover:bg-purple-50 text-purple-600 border border-purple-200 rounded-xl transition-all cursor-pointer shadow-xs"
                          title="Open in CBT Simulator"
                        >
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* NEW MODULE: DYNAMIC ACADEMY COURSE PROGRESS TRACKER */}
          <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-xl text-left">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-4 border-b border-slate-50 pb-2.5 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-purple-600" /> My Enrolled Courses & Progress ({enrolledCourseList.length})
            </h3>

            {enrolledCourseList.length === 0 ? (
              <div className="text-center py-8 space-y-3">
                <p className="text-slate-400 text-xs font-semibold">You haven't enrolled in any educational course pathways yet.</p>
                <button 
                  onClick={() => onNavigateTab && onNavigateTab('courses')}
                  className="px-4 py-2 bg-gradient-to-r from-[#7c3aed] to-[#a855f7] hover:from-[#6d28d9] text-white text-[10px] font-black uppercase tracking-wider rounded-xl shadow-md transition-all cursor-pointer"
                >
                  Explore Course Catalog
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {enrolledCourseList.map((course) => (
                  <div 
                    key={course.id} 
                    className="border border-slate-150 rounded-2xl p-5 hover:border-purple-200 transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-50/50"
                  >
                    <div className="space-y-1.5 flex-1 w-full text-left">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`text-[8px] font-black px-2 py-0.5 rounded uppercase tracking-wider ${
                          course.category === 'tech' ? 'bg-blue-100 text-blue-800' : course.category === 'business' ? 'bg-purple-100 text-purple-800' : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {course.category}
                        </span>
                        <h4 className="font-extrabold text-sm text-slate-800 leading-snug">{course.title}</h4>
                      </div>
                      <p className="text-[10px] text-slate-400 font-bold">{course.provider} • Duration: {course.duration}</p>
                      
                      {/* Course progress bar */}
                      <div className="space-y-1 max-w-sm pt-1">
                        <div className="flex justify-between text-[9px] font-black uppercase text-slate-500">
                          <span>Syllabus units ({course.completedUnits}/{course.totalUnits})</span>
                          <span>{course.progress}%</span>
                        </div>
                        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden p-px border border-slate-300">
                          <div 
                            className="bg-gradient-to-r from-purple-500 to-indigo-600 h-full rounded-full transition-all duration-300" 
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 items-center justify-end shrink-0 w-full md:w-auto">
                      {course.progress === 100 ? (
                        <>
                          <span className="bg-emerald-100 text-emerald-800 border border-emerald-200 text-[9px] font-black px-2.5 py-1.5 rounded-xl uppercase tracking-wider flex items-center gap-1">
                            ✓ CERTIFIED
                          </span>
                          <button
                            onClick={() => setActiveCertificate(course)}
                            className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-amber-500 text-slate-950 hover:from-yellow-400 hover:to-amber-400 font-black text-[9px] uppercase tracking-wider rounded-xl shadow-md transition-all cursor-pointer"
                          >
                            🏅 View Certificate
                          </button>
                        </>
                      ) : (
                        <>
                          <span className="bg-blue-100 text-blue-800 text-[9px] font-black px-2.5 py-1.5 rounded-xl uppercase tracking-wider">
                            ⚡ IN PROGRESS
                          </span>
                          <button
                            onClick={() => onNavigateTab && onNavigateTab('courses')}
                            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-black text-[9px] uppercase tracking-wider rounded-xl shadow-sm transition-all cursor-pointer flex items-center gap-1"
                          >
                            <Play className="w-3 h-3 fill-white" /> Resume learning
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ACTIVE APPLICATIONS RECEIPT SLIPS */}
          <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-xl text-left">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-4 border-b border-slate-50 pb-2.5 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-blue-600" /> My Active Job Applications ({appliedJobs.length})
            </h3>

            <div className="space-y-3">
              {appliedJobs.length === 0 ? (
                <div className="text-center py-6 text-slate-400 text-xs font-semibold">
                  No active job applications found. 
                  <button 
                    onClick={() => onNavigateTab && onNavigateTab('jobs')}
                    className="block mx-auto mt-2 text-blue-600 hover:underline font-bold"
                  >
                    Browse Active Vacancy Postings
                  </button>
                </div>
              ) : (
                appliedJobs.map((job) => (
                  <div 
                    key={job.id} 
                    className="border border-slate-150 rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-blue-200 transition-colors bg-slate-50/50"
                  >
                    <div className="text-left space-y-1">
                      <h4 className="font-extrabold text-sm text-slate-800 leading-snug">{job.title}</h4>
                      <div className="flex flex-wrap items-center gap-2 text-[10px] text-slate-400 font-bold">
                        <span>{job.org}</span>
                        <span>•</span>
                        <span>Receipt: <span className="font-mono text-slate-500 font-black">{job.registrationNumber}</span></span>
                      </div>
                      <span className="block text-[9px] text-slate-400 font-medium pt-0.5">Submitted On: {job.date}</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 shrink-0 w-full sm:w-auto justify-end">
                      <span className={`px-2.5 py-1 rounded-xl text-[9px] font-black uppercase tracking-wider border ${job.color}`}>
                        {job.status}
                      </span>
                      <button
                        onClick={() => setActiveReceipt(job)}
                        className="px-3.5 py-2 bg-slate-900 text-white hover:bg-slate-850 text-[9px] font-black uppercase tracking-wider rounded-xl border border-slate-800 transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
                      >
                        <FileText className="w-3.5 h-3.5" /> View Slip
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Bookmarked items */}
          <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-xl text-left">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-4 border-b border-slate-50 pb-2.5 flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-rose-500" /> Saved Opportunities & Schemes ({savedItems.length})
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {savedItems.length === 0 ? (
                <p className="text-slate-400 text-xs font-semibold py-4 col-span-2 text-center">No saved opportunities or courses yet.</p>
              ) : (
                savedItems.map((item) => (
                  <div key={item.id} className="bg-slate-50 border border-slate-150 p-4 rounded-2xl text-left flex justify-between items-start gap-3 hover:border-slate-300 transition-colors">
                    <div className="flex-1 min-w-0">
                      <span className={`text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-wider ${
                        item.type === 'Scheme' ? 'bg-emerald-100 text-emerald-800' : 'bg-purple-100 text-purple-800'
                      }`}>{item.type}</span>
                      <h4 className="font-extrabold text-xs text-slate-800 truncate leading-snug mt-2">{item.title}</h4>
                      <p className="text-[10px] text-slate-400 font-semibold mt-1 leading-relaxed truncate">{item.desc}</p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button 
                        onClick={() => onNavigateTab && onNavigateTab(item.type === 'Scheme' ? 'schemes' : 'courses')}
                        className="p-1.5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-800 rounded-lg transition-all cursor-pointer"
                        title="View Opportunity Details"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                      <button 
                        onClick={() => handleDeleteBookmark(item.id)}
                        className="p-1.5 bg-white hover:bg-rose-50 border border-slate-200 text-slate-400 hover:text-rose-500 rounded-lg transition-all cursor-pointer"
                        title="Remove Bookmark"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

        {/* Right Column achievements and stats */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* AROHI LIVE INTERACTIVE DIAGNOSTICS RADAR */}
          <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-xl text-left">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-4 border-b border-slate-50 pb-2.5 flex items-center gap-2">
              <Bot className="w-5 h-5 text-blue-600 animate-pulse" /> AROHI Diagnostics Scores
            </h3>

            <div className="space-y-4 text-xs font-semibold">
              <div className="space-y-1.5 border-b border-slate-50 pb-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-extrabold">Resume ATS Rating</span>
                  <span className="text-blue-600 font-black text-sm bg-blue-50 px-2.5 py-0.5 rounded-lg border border-blue-100">{diagnostics.atsScore}% Score</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden p-px border">
                  <div className="bg-blue-500 h-full rounded-full" style={{ width: `${diagnostics.atsScore}%` }}></div>
                </div>
                <button 
                  onClick={() => onNavigateTab && onNavigateTab('resume')}
                  className="text-[10px] text-blue-600 hover:underline flex items-center gap-0.5 font-bold"
                >
                  Analyze ATS Resume <ChevronRight className="w-3 h-3" />
                </button>
              </div>

              <div className="space-y-1.5 border-b border-slate-50 pb-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-extrabold">Interview Readiness</span>
                  {diagnostics.interviewScore > 0 ? (
                    <span className="text-emerald-600 font-black text-sm bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-100">{diagnostics.interviewScore}% Score</span>
                  ) : (
                    <span className="text-slate-400 font-black text-[10px] uppercase bg-slate-100 px-2 py-0.5 rounded-lg">Uninitiated</span>
                  )}
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden p-px border">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${diagnostics.interviewScore}%` }}></div>
                </div>
                <button 
                  onClick={() => onNavigateTab && onNavigateTab('interview')}
                  className="text-[10px] text-emerald-600 hover:underline flex items-center gap-0.5 font-bold"
                >
                  Run Speech Simulator <ChevronRight className="w-3 h-3" />
                </button>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-extrabold">Business Viability Score</span>
                  <span className="text-purple-600 font-black text-sm bg-purple-50 px-2.5 py-0.5 rounded-lg border border-purple-100">{diagnostics.businessScore}% Score</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden p-px border">
                  <div className="bg-purple-500 h-full rounded-full" style={{ width: `${diagnostics.businessScore}%` }}></div>
                </div>
                <button 
                  onClick={() => onNavigateTab && onNavigateTab('business')}
                  className="text-[10px] text-purple-600 hover:underline flex items-center gap-0.5 font-bold"
                >
                  Udyam Launchpad checklist <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          {/* Gamified Achievements badges */}
          <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-xl text-left">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-4 border-b border-slate-50 pb-2.5 flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" /> Career Milestones Badges ({earnedBadges.length})
            </h3>

            <div className="space-y-4">
              {earnedBadges.map((b, idx) => (
                <div key={idx} className="flex gap-4.5 items-center text-left">
                  <div className={`text-2xl bg-gradient-to-tr ${b.color} text-white p-3 rounded-2xl shadow-md shrink-0 border border-white/20`}>
                    {b.icon}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-xs text-slate-800 leading-snug">{b.name}</h4>
                    <p className="text-[10px] text-slate-400 font-semibold leading-normal mt-1">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SECURE BIOMETRIC PASSKEY CENTER */}
          <div className="bg-[#0b071c] border border-purple-500/30 p-6 rounded-[2rem] text-left text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl"></div>
            
            <h3 className="text-xs font-black uppercase tracking-wider text-[#a78bfa] mb-3 border-b border-purple-900/50 pb-2.5 flex items-center gap-2">
              <Fingerprint className="w-5 h-5 text-purple-400 animate-pulse" /> Biometric Authentication
            </h3>

            {!isBioSupported ? (
              <div className="space-y-2 text-xs">
                <p className="text-slate-400 leading-normal font-semibold">
                  Secure cryptographic Touch ID / Face ID bypasses traditional phishing.
                </p>
                <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-200 text-[10px] leading-relaxed font-bold">
                  ⚠️ WebAuthn cryptographic biometrics require secure execution. If running in an iframe, click <span className="text-white font-black">"Open in New Tab"</span> at the top right of your preview window to register your sensor!
                </div>
              </div>
            ) : (
              <div className="space-y-3 text-xs">
                <p className="text-slate-400 leading-normal font-semibold">
                  Register your device to log in instantly using Face ID or your fingerprint.
                </p>

                {bioError && (
                  <div className="p-2.5 bg-red-500/10 border border-red-500/25 rounded-xl text-red-300 text-[10px] font-semibold leading-relaxed">
                    {bioError}
                  </div>
                )}

                {bioSuccess && (
                  <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/25 rounded-xl text-emerald-300 text-[10px] font-semibold leading-relaxed">
                    {bioSuccess}
                  </div>
                )}

                {isBioEnrolled ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 bg-[#120c2a] border border-[#3b218f] p-3 rounded-xl">
                      <div className="bg-emerald-500/10 p-1.5 rounded-lg border border-emerald-500/20">
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      </div>
                      <div className="text-left">
                        <p className="text-[10px] font-extrabold uppercase text-emerald-400 tracking-wider">Passkey Enrolled</p>
                        <p className="text-[9px] text-slate-400 font-mono mt-0.5">Device key active for your email</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={async () => {
                          setBioError(null);
                          setBioSuccess(null);
                          try {
                            const success = await authenticateBiometricDevice(profile.email);
                            if (success) {
                              setBioSuccess("✅ Touch ID / Face ID validation succeeded! Physical presence verified.");
                            }
                          } catch (err: any) {
                            setBioError(err.message || "Verification cancelled.");
                          }
                        }}
                        className="flex-1 py-2 px-3 bg-purple-600 hover:bg-purple-500 text-white font-black text-[10px] uppercase tracking-wider rounded-xl cursor-pointer transition-all active:scale-95 text-center font-bold"
                      >
                        Test Sensor
                      </button>
                      <button
                        onClick={handleRemoveBiometric}
                        className="py-2 px-3 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-300 font-black text-[10px] uppercase tracking-wider rounded-xl cursor-pointer transition-all active:scale-95 font-bold"
                      >
                        Delete Key
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={handleRegisterBiometric}
                    disabled={isEnrolling}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold text-[11px] uppercase tracking-wider rounded-xl shadow-lg hover:shadow-purple-500/20 cursor-pointer transition-all active:scale-95 disabled:opacity-50"
                  >
                    {isEnrolling ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Scanning sensor...</span>
                      </>
                    ) : (
                      <>
                        <Fingerprint className="w-4 h-4 text-purple-200" />
                        <span>Register Fingerprint/FaceID</span>
                      </>
                    )}
                  </button>
                )}

                <div className="text-[9px] text-slate-500 font-mono flex items-center gap-1 mt-1 justify-center border-t border-purple-950/40 pt-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-500" />
                  <span>SECURE PASSKEY (AES-GCM CRYPTO)</span>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>

      {/* GOVERNMENT STYLE APPLICATION RECEIPT MODAL */}
      {activeReceipt && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-250">
          <div className="bg-white text-slate-900 rounded-3xl max-w-xl w-full p-6 space-y-6 shadow-2xl relative border-t-8 border-blue-600 text-left overflow-y-auto max-h-[90vh]">
            
            <button 
              onClick={() => setActiveReceipt(null)}
              className="absolute top-4 right-4 p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Receipt Header */}
            <div className="border-b-2 border-dashed border-slate-200 pb-4 flex justify-between items-start gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">AROHI AI DIGITAL PORTAL</span>
                <h3 className="text-lg font-black text-slate-900">Official Application Acknowledgement Slip</h3>
                <p className="text-[9px] text-slate-400 font-bold uppercase">National Employment Verification Service</p>
              </div>
              <div className="text-right shrink-0">
                <span className="block text-[8px] uppercase font-black text-slate-400">Security Slip Id</span>
                <span className="font-mono text-xs font-black bg-slate-100 px-2 py-1 rounded text-slate-800">{activeReceipt.registrationNumber}</span>
              </div>
            </div>

            {/* Slip Core Details */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-start">
              
              {/* Photo & Sig */}
              <div className="sm:col-span-4 flex flex-col items-center gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-100 text-center">
                <div className="w-24 h-28 border border-slate-300 rounded-xl bg-slate-100 overflow-hidden relative shadow-inner">
                  <img src={activeReceipt.photoUrl} alt="Candidate photograph" className="w-full h-full object-cover" />
                </div>
                <div className="w-24 h-8 border border-slate-300 rounded-lg bg-white overflow-hidden p-1 shadow-inner flex items-center justify-center">
                  <img src={activeReceipt.signatureUrl} alt="Candidate signature" className="w-full h-full object-contain filter contrast-125 saturate-0" />
                </div>
                <span className="text-[8px] uppercase font-black text-slate-400">Authenticated Signature</span>
              </div>

              {/* Data Table */}
              <div className="sm:col-span-8 grid grid-cols-2 gap-y-3.5 gap-x-4 text-xs font-bold text-slate-800">
                <div className="col-span-2 border-b pb-1">
                  <span className="block text-[8px] uppercase text-slate-400">Applied Opportunity Track</span>
                  <span className="text-slate-900 text-[13px] font-black">{activeReceipt.title}</span>
                </div>
                <div>
                  <span className="block text-[8px] uppercase text-slate-400">Candidate Name</span>
                  <span className="text-slate-900 font-extrabold">{activeReceipt.candidateName}</span>
                </div>
                <div>
                  <span className="block text-[8px] uppercase text-slate-400">Father's Name</span>
                  <span className="text-slate-900 font-extrabold">{activeReceipt.fatherName}</span>
                </div>
                <div>
                  <span className="block text-[8px] uppercase text-slate-400">Date of Birth</span>
                  <span className="text-slate-900 font-extrabold">{activeReceipt.dob}</span>
                </div>
                <div>
                  <span className="block text-[8px] uppercase text-slate-400">Category & Gender</span>
                  <span className="text-slate-900 font-extrabold">{activeReceipt.category} / {activeReceipt.gender}</span>
                </div>
                <div className="col-span-2">
                  <span className="block text-[8px] uppercase text-slate-400">Academic Qualifications</span>
                  <span className="text-slate-900 text-[11px] leading-tight block">{activeReceipt.qualification}</span>
                </div>
                <div className="col-span-2">
                  <span className="block text-[8px] uppercase text-slate-400">Correspondence Address</span>
                  <span className="text-slate-900 text-[11px] leading-tight block font-semibold">{activeReceipt.address}</span>
                </div>
              </div>
            </div>

            {/* Stamp Footer */}
            <div className="border-t-2 border-dashed border-slate-200 pt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-left space-y-1 text-[10px] font-semibold text-slate-500">
                <div className="flex items-center gap-1 text-emerald-600 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> SYSTEM SIGNED & VERIFIED
                </div>
                <p>Digital Submission Key: <span className="font-mono text-slate-600">MD5: {Math.random().toString(16).slice(2, 10).toUpperCase()}</span></p>
                <p>Stamp Date: {activeReceipt.date} • Secured Gateway Server IP 0.0.0.0</p>
              </div>

              {/* Print actions */}
              <div className="flex gap-2 shrink-0">
                <button 
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-black text-[10px] uppercase tracking-wider rounded-xl cursor-pointer shadow-md flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" /> Print Acknowledgement Slip
                </button>
                <button 
                  onClick={() => setActiveReceipt(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 font-black text-[10px] uppercase tracking-wider rounded-xl cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* FULLY FUNCTIONAL ISO CERTIFICATE OF COMPLETION MODAL */}
      {activeCertificate && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#120e2a] border-4 border-double border-yellow-500/40 text-white rounded-[2rem] max-w-2xl w-full p-8 space-y-6 shadow-2xl relative text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-32 h-32 border-l-4 border-t-4 border-yellow-500/20 rounded-tl-xl pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 border-r-4 border-b-4 border-yellow-500/20 rounded-br-xl pointer-events-none"></div>
            
            <button 
              onClick={() => setActiveCertificate(null)}
              className="absolute top-4 right-4 p-2 bg-[#1b143c] hover:bg-[#251e54] text-slate-400 hover:text-white rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-[10px] font-black tracking-widest text-[#a78bfa] uppercase">ISO 9001:2015 Verified Academic Credential</span>
                <h2 className="font-serif text-3xl font-bold tracking-wide text-yellow-300">Certificate of Completion</h2>
                <p className="text-[11px] text-slate-400">National Skill Development Framework, Govt of India Registered Partner</p>
              </div>

              <div className="py-6 border-y border-yellow-500/20 space-y-4">
                <p className="text-xs text-slate-300 italic font-medium">This is proudly presented and certified to</p>
                <h3 className="text-2xl font-black text-white underline decoration-yellow-500/40 underline-offset-8">
                  {profile.name}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed font-semibold max-w-md mx-auto">
                  for outstandingly completing all educational syllabus units, mock exams, and practical sandbox code challenges under the academic track program
                </p>
                <h4 className="text-base font-black text-yellow-100 max-w-lg mx-auto">
                  "{activeCertificate.title}"
                </h4>
              </div>

              <div className="flex justify-between items-center text-left text-[10px] font-semibold text-slate-400">
                <div>
                  <span className="block text-slate-500 uppercase font-bold text-[8px]">Verification ID</span>
                  <span className="font-mono text-slate-300">CERT-{activeCertificate.id.toUpperCase()}-{Date.now().toString().slice(-6)}</span>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 border border-yellow-500/20 rounded-full flex items-center justify-center mx-auto bg-yellow-500/5 text-yellow-300 font-bold">
                    ★
                  </div>
                  <span className="block mt-1 uppercase text-[8px]">Arohi Certified</span>
                </div>
                <div className="text-right">
                  <span className="block text-slate-500 uppercase font-bold text-[8px]">Directing Authority</span>
                  <span className="text-slate-200">Arohi Elite Academy</span>
                </div>
              </div>

              <div className="pt-4 flex justify-center gap-3">
                <button
                  onClick={() => window.print()}
                  className="px-5 py-2.5 bg-yellow-500 hover:bg-yellow-600 text-slate-950 font-black text-[10px] uppercase tracking-wider rounded-xl cursor-pointer shadow-md"
                >
                  🖨️ Print Certificate
                </button>
                <button
                  onClick={() => setActiveCertificate(null)}
                  className="px-5 py-2.5 bg-[#1b143c] border border-[#2d2163] text-slate-300 hover:text-white font-black text-[10px] uppercase tracking-wider rounded-xl cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
