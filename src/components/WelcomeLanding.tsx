import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  GraduationCap, 
  Briefcase, 
  BookOpen, 
  Users, 
  Landmark, 
  Grid, 
  Sparkles, 
  Mic, 
  Send, 
  FileText, 
  Calculator, 
  PenTool, 
  Calendar, 
  ChevronRight, 
  ShieldCheck, 
  Globe, 
  Zap, 
  CheckCircle2, 
  Crown, 
  Home, 
  MessageSquare, 
  User, 
  ArrowRight, 
  Search, 
  Menu, 
  X, 
  Bell, 
  Sun, 
  Moon, 
  Lightbulb, 
  FlaskConical, 
  Activity, 
  Stethoscope, 
  Cpu, 
  UserCheck, 
  Building, 
  Network, 
  Bot, 
  Share2,
  Scale,
  Theater,
  Palette,
  Box
} from 'lucide-react';
import { Language, getTranslation } from '../translations';
import { LANGUAGES_LIST } from './Header';
import { useAuth } from '../context/AuthContext';
import ArohiAvatar from './ArohiAvatar';
import HeaderNotifications from './HeaderNotifications';

interface WelcomeLandingProps {
  onEnter: () => void;
  setActiveTab: (tab: string) => void;
  activeTab?: string;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  setIsChatOpen?: (isOpen: boolean) => void;
  onQuickChat?: (prompt: string) => void;
  onShare?: () => void;
  isDarkMode?: boolean;
  onToggleTheme?: () => void;
  onOpenAuth?: () => void;
  hasActiveSubscription?: boolean;
  isTrialActive?: boolean;
  remainingHours?: number;
  remainingMinutes?: number;
  remainingSeconds?: number;
  onUpgradeClick?: () => void;
  onOpen3DLearning?: (topicId?: string) => void;
  subscriptionEndDate?: number;
  subscriptionPlanName?: string;
  onRenewSubscription?: () => void;
  onSetSubscriptionEndDate?: (newTimestamp: number) => void;
  currency?: 'INR' | 'USD';
}

export default function WelcomeLanding({ 
  onEnter, 
  setActiveTab, 
  activeTab = 'home',
  language, 
  onLanguageChange, 
  setIsChatOpen,
  onQuickChat,
  onShare,
  isDarkMode: propIsDarkMode,
  onToggleTheme: propToggleTheme,
  onOpenAuth,
  hasActiveSubscription = false,
  isTrialActive = false,
  remainingHours = 0,
  remainingMinutes = 0,
  remainingSeconds = 0,
  onUpgradeClick,
  onOpen3DLearning,
  subscriptionEndDate,
  subscriptionPlanName = 'Starter Plan (₹399/mo)',
  onRenewSubscription,
  onSetSubscriptionEndDate,
  currency = 'INR'
}: WelcomeLandingProps) {
  const { user, userData } = useAuth();
  
  // Local theme state fallback if parent props are not provided
  const [localIsDarkMode, setLocalIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('arohi_theme_mode');
    return saved ? saved === 'dark' : true;
  });

  const isDarkMode = propIsDarkMode !== undefined ? propIsDarkMode : localIsDarkMode;

  const toggleTheme = () => {
    if (propToggleTheme) {
      propToggleTheme();
    } else {
      const newMode = !localIsDarkMode;
      setLocalIsDarkMode(newMode);
      localStorage.setItem('arohi_theme_mode', newMode ? 'dark' : 'light');
    }
  };

  const currentUserName = user 
    ? (userData?.profile?.name || (userData as any)?.displayName || user.displayName || user.email?.split('@')[0] || 'User') 
    : 'User';

  const [landingInputText, setLandingInputText] = useState('');
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [categorySearchQuery, setCategorySearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [drawerLangSearch, setDrawerLangSearch] = useState('');
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechError, setSpeechError] = useState<string | null>(null);
  const [micAudioLevel, setMicAudioLevel] = useState<number>(0);
  const recognitionRef = useRef<any>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const spokenTranscriptRef = useRef<string>('');
  const autoSubmitTimerRef = useRef<any>(null);
  const hasSubmittedVoiceRef = useRef<boolean>(false);

  useEffect(() => {
    return () => {
      stopVoiceListening(false);
    };
  }, []);

  // Safe voice stop helper
  const stopVoiceListening = (submitIfTextAvailable = false) => {
    if (autoSubmitTimerRef.current) {
      clearTimeout(autoSubmitTimerRef.current);
      autoSubmitTimerRef.current = null;
    }

    if (recognitionRef.current) {
      try {
        recognitionRef.current.onend = null;
        recognitionRef.current.onerror = null;
        recognitionRef.current.stop();
      } catch (e) {}
      recognitionRef.current = null;
    }

    if (mediaStreamRef.current) {
      try {
        mediaStreamRef.current.getTracks().forEach(t => t.stop());
      } catch (e) {}
      mediaStreamRef.current = null;
    }

    if (audioContextRef.current) {
      try {
        audioContextRef.current.close();
      } catch (e) {}
      audioContextRef.current = null;
    }

    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }

    setIsListening(false);
    setMicAudioLevel(0);

    if (submitIfTextAvailable && !hasSubmittedVoiceRef.current) {
      const query = spokenTranscriptRef.current.trim() || landingInputText.trim();
      if (query.length > 0) {
        hasSubmittedVoiceRef.current = true;
        setLandingInputText('');
        spokenTranscriptRef.current = '';
        if (onQuickChat) {
          onQuickChat(query);
        } else {
          onEnter();
        }
      }
    }
  };

  // Submit recorded voice query directly to Arohi Chat
  const submitVoiceQuery = (textToSubmit?: string) => {
    if (hasSubmittedVoiceRef.current) return;
    const finalQuery = (textToSubmit || spokenTranscriptRef.current || landingInputText).trim();
    if (!finalQuery) {
      stopVoiceListening(false);
      return;
    }

    hasSubmittedVoiceRef.current = true;
    stopVoiceListening(false);
    setLandingInputText('');
    spokenTranscriptRef.current = '';

    if (onQuickChat) {
      onQuickChat(finalQuery);
    } else {
      onEnter();
    }
  };

  const toggleVoiceInput = async () => {
    if (isListening) {
      // If already listening, stopping should submit any spoken query
      const currentSpoken = spokenTranscriptRef.current.trim() || landingInputText.trim();
      if (currentSpoken) {
        submitVoiceQuery(currentSpoken);
      } else {
        stopVoiceListening(false);
      }
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSpeechError("Speech Recognition is not supported by this browser. Opening Arohi Live Voice...");
      if (onQuickChat) {
        onQuickChat("Hello Arohi, I want to talk to you via voice.");
      } else {
        onEnter();
      }
      setTimeout(() => setSpeechError(null), 4000);
      return;
    }

    setSpeechError(null);
    hasSubmittedVoiceRef.current = false;
    spokenTranscriptRef.current = '';
    setLandingInputText('');

    // Warm up microphone permissions and create audio visualizer
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaStreamRef.current = stream;

        try {
          const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
          if (AudioContextClass) {
            const ctx = new AudioContextClass();
            audioContextRef.current = ctx;
            const analyser = ctx.createAnalyser();
            analyser.fftSize = 64;
            const source = ctx.createMediaStreamSource(stream);
            source.connect(analyser);

            const dataArray = new Uint8Array(analyser.frequencyBinCount);
            const checkVolume = () => {
              if (!audioContextRef.current) return;
              analyser.getByteFrequencyData(dataArray);
              let sum = 0;
              for (let i = 0; i < dataArray.length; i++) {
                sum += dataArray[i];
              }
              const avg = sum / dataArray.length;
              setMicAudioLevel(Math.min(100, Math.round((avg / 128) * 100)));
              animFrameRef.current = requestAnimationFrame(checkVolume);
            };
            checkVolume();
          }
        } catch (audioErr) {
          console.warn("Audio meter init skipped:", audioErr);
        }
      }
    } catch (permErr: any) {
      console.warn("getUserMedia permission error:", permErr);
      if (permErr?.name === 'NotAllowedError' || permErr?.name === 'PermissionDeniedError') {
        setSpeechError("Microphone permission denied. Please allow microphone in your browser settings to use voice input.");
        setTimeout(() => setSpeechError(null), 5000);
        return;
      }
    }

    try {
      const rec = new SpeechRecognition();
      rec.continuous = true;
      rec.interimResults = true;
      rec.maxAlternatives = 1;

      const langMap: Record<string, string> = {
        en: 'en-IN',
        hi: 'hi-IN',
        or: 'or-IN',
        bn: 'bn-IN',
        te: 'te-IN',
        ta: 'ta-IN',
        mr: 'mr-IN',
        gu: 'gu-IN',
        pa: 'pa-IN',
        kn: 'kn-IN',
        ml: 'ml-IN',
        ur: 'ur-IN'
      };
      rec.lang = langMap[language] || 'en-IN';

      rec.onstart = () => {
        setIsListening(true);
        setSpeechError(null);
      };

      rec.onresult = (event: any) => {
        let finalTranscript = '';
        let interimTranscript = '';
        for (let i = 0; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript + ' ';
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }
        const cleanTranscript = (finalTranscript + interimTranscript).trim();
        if (cleanTranscript) {
          spokenTranscriptRef.current = cleanTranscript;
          setLandingInputText(cleanTranscript);

          // Reset silence timer on every newly recognized chunk of speech
          if (autoSubmitTimerRef.current) {
            clearTimeout(autoSubmitTimerRef.current);
          }
          // After 2.0 seconds of silence following spoken words, auto-submit to chat
          autoSubmitTimerRef.current = setTimeout(() => {
            if (spokenTranscriptRef.current.trim().length > 0) {
              submitVoiceQuery(spokenTranscriptRef.current.trim());
            }
          }, 2000);
        }
      };

      rec.onerror = (event: any) => {
        console.warn("Speech recognition error:", event.error);
        if (event.error === 'not-allowed') {
          setSpeechError("Microphone permission was denied. Please allow microphone access to speak.");
          stopVoiceListening(false);
        } else if (event.error === 'audio-capture') {
          setSpeechError("No microphone hardware found. Please check your mic connection.");
          stopVoiceListening(false);
        } else if (event.error === 'no-speech') {
          // Keep listening for speech without throwing a harsh error
        } else if (event.error === 'network') {
          setSpeechError("Network error with speech recognition service. Please try again.");
          stopVoiceListening(false);
        }
      };

      rec.onend = () => {
        // If recognition ended naturally and user had spoken something, submit it!
        const queryToSubmit = spokenTranscriptRef.current.trim();
        if (queryToSubmit.length > 0 && !hasSubmittedVoiceRef.current) {
          submitVoiceQuery(queryToSubmit);
        } else {
          setIsListening(false);
        }
      };

      recognitionRef.current = rec;
      rec.start();
    } catch (err: any) {
      console.error("Speech recognition start failed:", err);
      stopVoiceListening(false);
      setSpeechError("Could not start voice input. You can open Arohi Voice Call for direct interactive speech.");
      setTimeout(() => setSpeechError(null), 4000);
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handlePromptSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const query = landingInputText.trim() || "Hello Arohi, I want to learn more!";
    if (onQuickChat) {
      onQuickChat(query);
    } else {
      onEnter();
    }
  };

  const handleQuickAction = (actionPrompt: string) => {
    if (onQuickChat) {
      onQuickChat(actionPrompt);
    } else {
      onEnter();
    }
  };

  // 20 Full Category Tags defined with precise icons, prompts and colors matching mockup
  const allCategoryTags = [
    {
      key: 'students',
      title: 'Students',
      subtitle: 'Study help, notes, exams & more',
      icon: GraduationCap,
      colorLight: 'bg-indigo-600 text-white shadow-sm',
      colorDark: 'bg-indigo-600 text-white shadow-sm',
      borderLight: 'border-purple-200/60',
      borderDark: 'border-purple-500/30',
      titleLight: 'text-indigo-600 dark:text-indigo-400',
      titleDark: 'text-indigo-400',
      arrowBgLight: 'bg-purple-100 text-indigo-600',
      arrowBgDark: 'bg-purple-950/70 text-purple-300',
      tabId: 'syllabus',
      prompt: 'Hello Arohi! I am a Student. Please help me with study planning, exam preparation, note summaries, and step-by-step conceptual explanations.'
    },
    {
      key: 'businesses',
      title: 'Businesses',
      subtitle: 'Marketing, content, support & more',
      icon: Briefcase,
      colorLight: 'bg-emerald-500 text-white shadow-sm',
      colorDark: 'bg-emerald-500 text-white shadow-sm',
      borderLight: 'border-emerald-200/60',
      borderDark: 'border-emerald-500/30',
      titleLight: 'text-emerald-600 dark:text-emerald-400',
      titleDark: 'text-emerald-400',
      arrowBgLight: 'bg-emerald-100 text-emerald-600',
      arrowBgDark: 'bg-emerald-950/70 text-emerald-300',
      tabId: 'business',
      prompt: 'Hello Arohi! I run a Business/MSME. Please assist me with marketing strategies, content creation, customer support ideas, and business growth plans.'
    },
    {
      key: 'teachers',
      title: 'Teachers',
      subtitle: 'Lessons, quizzes, explainer & more',
      icon: BookOpen,
      colorLight: 'bg-blue-600 text-white shadow-sm',
      colorDark: 'bg-blue-600 text-white shadow-sm',
      borderLight: 'border-blue-200/60',
      borderDark: 'border-blue-500/30',
      titleLight: 'text-blue-600 dark:text-blue-400',
      titleDark: 'text-blue-400',
      arrowBgLight: 'bg-blue-100 text-blue-600',
      arrowBgDark: 'bg-blue-950/70 text-blue-300',
      tabId: 'syllabus',
      prompt: 'Hello Arohi! I am an Educator/Teacher. Help me create structured lesson plans, interactive student quizzes, explainer notes, and classroom activities.'
    },
    {
      key: 'parents',
      title: 'Parents',
      subtitle: 'Track progress, guidance & more',
      icon: Users,
      colorLight: 'bg-rose-500 text-white shadow-sm',
      colorDark: 'bg-rose-500 text-white shadow-sm',
      borderLight: 'border-rose-200/60',
      borderDark: 'border-rose-500/30',
      titleLight: 'text-rose-600 dark:text-rose-400',
      titleDark: 'text-rose-400',
      arrowBgLight: 'bg-rose-100 text-rose-600',
      arrowBgDark: 'bg-rose-950/70 text-rose-300',
      tabId: 'syllabus',
      prompt: 'Hello Arohi! I am a Parent. Guide me on tracking my child\'s academic progress, educational advice, and nurturing overall learning development.'
    },
    {
      key: 'govAspirant',
      title: 'Govt. Aspirants',
      subtitle: 'Exam prep, current affairs & more',
      icon: Landmark,
      colorLight: 'bg-amber-500 text-white shadow-sm',
      colorDark: 'bg-amber-500 text-white shadow-sm',
      borderLight: 'border-amber-200/60',
      borderDark: 'border-amber-500/30',
      titleLight: 'text-amber-600 dark:text-amber-400',
      titleDark: 'text-amber-400',
      arrowBgLight: 'bg-amber-100 text-amber-600',
      arrowBgDark: 'bg-amber-950/70 text-amber-300',
      tabId: 'jobs',
      prompt: 'Hello Arohi! I am preparing for Government Competitive Exams (UPSC, SSC, Railway, Banking, OPSC). Provide current affairs, MCQs, and exam strategy.'
    },
    {
      key: 'moreTools',
      title: 'More Tools & AI Capabilities',
      subtitle: 'Music Gen, Image Studio, Code, Business & 17+ Tools',
      icon: Grid,
      colorLight: 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-sm',
      colorDark: 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-sm',
      borderLight: 'border-violet-300/80',
      borderDark: 'border-violet-500/40',
      titleLight: 'text-indigo-600 dark:text-indigo-400',
      titleDark: 'text-indigo-300',
      arrowBgLight: 'bg-indigo-100 text-indigo-600',
      arrowBgDark: 'bg-indigo-950/70 text-indigo-300',
      tabId: 'tools'
    },
    {
      key: 'jobSeeker',
      title: 'Job Seekers',
      subtitle: 'Active job alerts & interview prep',
      icon: Briefcase,
      colorLight: 'bg-teal-100 text-teal-600',
      colorDark: 'bg-teal-500/20 text-teal-400',
      borderLight: 'border-teal-200/60',
      borderDark: 'border-teal-500/30',
      titleLight: 'text-teal-900',
      titleDark: 'text-teal-300',
      arrowBgLight: 'bg-teal-50 text-teal-600',
      arrowBgDark: 'bg-teal-500/20 text-teal-300',
      tabId: 'jobs',
      prompt: 'Hello Arohi! I am looking for a Job. Please assist me with resume optimization, AI mock interviews, job alerts, and cover letter writing.'
    },
    {
      key: 'entrepreneurs',
      title: 'Entrepreneurs',
      subtitle: 'Startups, MSME schemes & plans',
      icon: Lightbulb,
      colorLight: 'bg-yellow-100 text-yellow-600',
      colorDark: 'bg-yellow-500/20 text-yellow-400',
      borderLight: 'border-yellow-200/60',
      borderDark: 'border-yellow-500/30',
      titleLight: 'text-yellow-900',
      titleDark: 'text-yellow-300',
      arrowBgLight: 'bg-yellow-50 text-yellow-600',
      arrowBgDark: 'bg-yellow-500/20 text-yellow-300',
      tabId: 'business',
      prompt: 'Hello Arohi! I am an Entrepreneur. Assist me with startup ideas, business plan drafting, MSME government schemes, and pitch decks.'
    },
    {
      key: 'scientists',
      title: 'Scientists',
      subtitle: 'Research papers, data & simulations',
      icon: FlaskConical,
      colorLight: 'bg-cyan-100 text-cyan-600',
      colorDark: 'bg-cyan-500/20 text-cyan-400',
      borderLight: 'border-cyan-200/60',
      borderDark: 'border-cyan-500/30',
      titleLight: 'text-cyan-900',
      titleDark: 'text-cyan-300',
      arrowBgLight: 'bg-cyan-50 text-cyan-600',
      arrowBgDark: 'bg-cyan-500/20 text-cyan-300',
      tabId: 'courses',
      prompt: 'Hello Arohi! I am a Scientist/Researcher. Help me analyze research papers, review scientific literature, and interpret complex data.'
    },
    {
      key: 'researchers',
      title: 'Researchers',
      subtitle: 'Data audits, whitepapers & citations',
      icon: Activity,
      colorLight: 'bg-sky-100 text-sky-600',
      colorDark: 'bg-sky-500/20 text-sky-400',
      borderLight: 'border-sky-200/60',
      borderDark: 'border-sky-500/30',
      titleLight: 'text-sky-900',
      titleDark: 'text-sky-300',
      arrowBgLight: 'bg-sky-50 text-sky-600',
      arrowBgDark: 'bg-sky-500/20 text-sky-300',
      tabId: 'courses',
      prompt: 'Hello Arohi! I am an Academic Researcher. Assist me with data audits, whitepaper synthesis, literature reviews, and citations.'
    },
    {
      key: 'doctors',
      title: 'Doctors',
      subtitle: 'Clinical studies & medical logs',
      icon: Stethoscope,
      colorLight: 'bg-red-100 text-red-600',
      colorDark: 'bg-red-500/20 text-red-400',
      borderLight: 'border-red-200/60',
      borderDark: 'border-red-500/30',
      titleLight: 'text-red-900',
      titleDark: 'text-red-300',
      arrowBgLight: 'bg-red-50 text-red-600',
      arrowBgDark: 'bg-red-500/20 text-red-300',
      tabId: 'courses',
      prompt: 'Hello Arohi! As a Healthcare Professional, assist me with medical literature summaries, clinical trial updates, and health logs.'
    },
    {
      key: 'advocates',
      title: 'Advocates',
      subtitle: 'Legal research & case studies',
      icon: Scale,
      colorLight: 'bg-amber-100 text-amber-700',
      colorDark: 'bg-amber-500/20 text-amber-400',
      borderLight: 'border-amber-200/60',
      borderDark: 'border-amber-500/30',
      titleLight: 'text-amber-900',
      titleDark: 'text-amber-300',
      arrowBgLight: 'bg-amber-50 text-amber-600',
      arrowBgDark: 'bg-amber-500/20 text-amber-300',
      tabId: 'courses',
      prompt: 'Hello Arohi! I am an Advocate / Legal Professional. Assist me with legal research summaries, statutory analysis, case precedents, and draft outlines.'
    },
    {
      key: 'thespians',
      title: 'Thespians',
      subtitle: 'Scripts, monologues & drama arts',
      icon: Theater,
      colorLight: 'bg-purple-100 text-purple-700',
      colorDark: 'bg-purple-500/20 text-purple-400',
      borderLight: 'border-purple-200/60',
      borderDark: 'border-purple-500/30',
      titleLight: 'text-purple-900',
      titleDark: 'text-purple-300',
      arrowBgLight: 'bg-purple-50 text-purple-600',
      arrowBgDark: 'bg-purple-500/20 text-purple-300',
      tabId: 'courses',
      prompt: 'Hello Arohi! I am a Thespian / Performing Artist. Assist me with script analysis, monologue writing, character breakdown, and stage performance concepts.'
    },
    {
      key: 'artists',
      title: 'Artists',
      subtitle: 'Visual arts & creative concepts',
      icon: Palette,
      colorLight: 'bg-pink-100 text-pink-700',
      colorDark: 'bg-pink-500/20 text-pink-400',
      borderLight: 'border-pink-200/60',
      borderDark: 'border-pink-500/30',
      titleLight: 'text-pink-900',
      titleDark: 'text-pink-300',
      arrowBgLight: 'bg-pink-50 text-pink-600',
      arrowBgDark: 'bg-pink-500/20 text-pink-300',
      tabId: 'courses',
      prompt: 'Hello Arohi! I am an Artist / Creative Professional. Help me brainstorm visual concepts, artistic themes, portfolio strategies, and digital art tools.'
    },
    {
      key: 'engineers',
      title: 'Engineers',
      subtitle: 'System architecture & code prep',
      icon: Cpu,
      colorLight: 'bg-indigo-100 text-indigo-600',
      colorDark: 'bg-indigo-500/20 text-indigo-400',
      borderLight: 'border-indigo-200/60',
      borderDark: 'border-indigo-500/30',
      titleLight: 'text-indigo-900',
      titleDark: 'text-indigo-300',
      arrowBgLight: 'bg-indigo-50 text-indigo-600',
      arrowBgDark: 'bg-indigo-500/20 text-indigo-300',
      tabId: 'courses',
      prompt: 'Hello Arohi! I am an Engineer. Help me with code debugging, system architecture design, technical documentation, and software concepts.'
    },
    {
      key: 'professionals',
      title: 'Professionals',
      subtitle: 'Career growth & executive tips',
      icon: UserCheck,
      colorLight: 'bg-fuchsia-100 text-fuchsia-600',
      colorDark: 'bg-fuchsia-500/20 text-fuchsia-400',
      borderLight: 'border-fuchsia-200/60',
      borderDark: 'border-fuchsia-500/30',
      titleLight: 'text-fuchsia-900',
      titleDark: 'text-fuchsia-300',
      arrowBgLight: 'bg-fuchsia-50 text-fuchsia-600',
      arrowBgDark: 'bg-fuchsia-500/20 text-fuchsia-300',
      tabId: 'jobs',
      prompt: 'Hello Arohi! I am a Working Professional. Provide guidance on career growth, executive email writing, leadership, and workplace productivity.'
    },
    {
      key: 'universities',
      title: 'Universities',
      subtitle: 'Curriculum & student placement',
      icon: GraduationCap,
      colorLight: 'bg-pink-100 text-pink-600',
      colorDark: 'bg-pink-500/20 text-pink-400',
      borderLight: 'border-pink-200/60',
      borderDark: 'border-pink-500/30',
      titleLight: 'text-pink-900',
      titleDark: 'text-pink-300',
      arrowBgLight: 'bg-pink-50 text-pink-600',
      arrowBgDark: 'bg-pink-500/20 text-pink-300',
      tabId: 'syllabus',
      prompt: 'Hello Arohi! Assist with higher education curriculum planning, student ops, placement strategies, and academic administration.'
    },
    {
      key: 'organizations',
      title: 'Organizations',
      subtitle: 'Cross-team workflows & audits',
      icon: Network,
      colorLight: 'bg-purple-100 text-purple-600',
      colorDark: 'bg-purple-500/20 text-purple-400',
      borderLight: 'border-purple-200/60',
      borderDark: 'border-purple-500/30',
      titleLight: 'text-purple-900',
      titleDark: 'text-purple-300',
      arrowBgLight: 'bg-purple-50 text-purple-600',
      arrowBgDark: 'bg-purple-500/20 text-purple-300',
      tabId: 'business',
      prompt: 'Hello Arohi! Help my organization optimize cross-team workflows, AI adoption, documentation, and operational efficiency.'
    },
    {
      key: 'govOfficials',
      title: 'Govt. Officials',
      subtitle: 'Policy drafts & civic compliance',
      icon: ShieldCheck,
      colorLight: 'bg-orange-100 text-orange-600',
      colorDark: 'bg-orange-500/20 text-orange-400',
      borderLight: 'border-orange-200/60',
      borderDark: 'border-orange-500/30',
      titleLight: 'text-orange-900',
      titleDark: 'text-orange-300',
      arrowBgLight: 'bg-orange-50 text-orange-600',
      arrowBgDark: 'bg-orange-500/20 text-orange-300',
      tabId: 'business',
      prompt: 'Hello Arohi! Assist with policy drafting summaries, civic compliance guidelines, public administration notes, and governance research.'
    },
    {
      key: 'privateOfficials',
      title: 'Private Officials',
      subtitle: 'Corporate governance & growth',
      icon: Building,
      colorLight: 'bg-teal-100 text-teal-600',
      colorDark: 'bg-teal-500/20 text-teal-400',
      borderLight: 'border-teal-200/60',
      borderDark: 'border-teal-500/30',
      titleLight: 'text-teal-900',
      titleDark: 'text-teal-300',
      arrowBgLight: 'bg-teal-50 text-teal-600',
      arrowBgDark: 'bg-teal-500/20 text-teal-300',
      tabId: 'business',
      prompt: 'Hello Arohi! Assist with corporate governance strategies, executive reporting, compliance frameworks, and organizational growth.'
    },
    {
      key: 'humans',
      title: 'Humans',
      subtitle: 'General learning & career advice',
      icon: User,
      colorLight: 'bg-fuchsia-100 text-fuchsia-600',
      colorDark: 'bg-fuchsia-500/20 text-fuchsia-400',
      borderLight: 'border-fuchsia-200/60',
      borderDark: 'border-fuchsia-500/30',
      titleLight: 'text-fuchsia-900',
      titleDark: 'text-fuchsia-300',
      arrowBgLight: 'bg-fuchsia-50 text-fuchsia-600',
      arrowBgDark: 'bg-fuchsia-500/20 text-fuchsia-300',
      tabId: 'arohi',
      prompt: 'Hello Arohi! I want to expand my knowledge, learn new skills, get daily motivation, and boost my personal development.'
    },
    {
      key: 'aliens',
      title: 'Aliens',
      subtitle: 'Quantum logic & interstellar data',
      icon: Bot,
      colorLight: 'bg-lime-100 text-lime-600',
      colorDark: 'bg-lime-500/20 text-lime-400',
      borderLight: 'border-lime-200/60',
      borderDark: 'border-lime-500/30',
      titleLight: 'text-lime-900',
      titleDark: 'text-lime-300',
      arrowBgLight: 'bg-lime-50 text-lime-600',
      arrowBgDark: 'bg-lime-500/20 text-lime-300',
      tabId: 'arohi',
      prompt: 'Greetings Arohi! Explain quantum computing, astrophysics, advanced space technologies, and futuristic speculative science.'
    },
    {
      key: 'marsCitizens',
      title: 'Citizens of Mars & Jupiter',
      subtitle: 'Terraforming & space station ops',
      icon: Globe,
      colorLight: 'bg-rose-100 text-rose-600',
      colorDark: 'bg-rose-500/20 text-rose-400',
      borderLight: 'border-rose-200/60',
      borderDark: 'border-rose-500/30',
      titleLight: 'text-rose-900',
      titleDark: 'text-rose-300',
      arrowBgLight: 'bg-rose-50 text-rose-600',
      arrowBgDark: 'bg-rose-500/20 text-rose-300',
      tabId: 'arohi',
      prompt: 'Hello Arohi! Tell me about Mars colonization plans, space habitat engineering, terraforming tech, and interplanetary exploration.'
    }
  ];

  const filteredCategories = allCategoryTags.filter(cat => 
    cat.title.toLowerCase().includes(categorySearchQuery.toLowerCase()) ||
    cat.subtitle.toLowerCase().includes(categorySearchQuery.toLowerCase())
  );

  const displayedCategories = showAllCategories 
    ? filteredCategories 
    : allCategoryTags.slice(0, 6);

  return (
    <div className={`min-h-screen w-full transition-colors duration-300 font-sans select-none pb-28 ${
      isDarkMode 
        ? 'bg-[#070814] text-white' 
        : 'bg-[#f8f9fe] text-slate-900'
    }`}>
      
      {/* 1. Header Navigation */}
      <header className={`sticky top-0 z-40 w-full backdrop-blur-md transition-colors ${
        isDarkMode 
          ? 'bg-[#070814]/90 border-b border-slate-800/60' 
          : 'bg-[#f8f9fe]/90 border-b border-slate-200/80'
      }`}>
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          
          {/* Left: Hamburger Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className={`p-2.5 rounded-2xl border transition-all cursor-pointer ${
              isDarkMode 
                ? 'bg-[#131728] border-slate-800 text-slate-200 hover:bg-[#1a2038]' 
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm'
            }`}
            aria-label="Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Center: Logo and Tagline */}
          <div className="flex flex-col items-center justify-center text-center">
            <h1 className="text-lg sm:text-2xl font-black tracking-tight flex items-center gap-1 font-sans">
              <span className={isDarkMode ? 'text-white' : 'text-slate-900'}>AROHI</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500">
                AI
              </span>
            </h1>
            <p className="block text-[9.5px] sm:text-xs font-semibold tracking-tight leading-none mt-0.5">
              <span className={isDarkMode ? 'text-slate-300' : 'text-slate-600'}>One AI. </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500 font-bold">
                Infinite Opportunities.
              </span>
            </p>
          </div>

          {/* Right: Very Tiny Sign Up / Sign In Button, Theme Toggle, & Bell Buttons */}
          <div className="flex items-center gap-1 sm:gap-2">
            
            {/* Very Tiny Sign Up / Sign In Button */}
            <button
              type="button"
              onClick={() => {
                if (onOpenAuth) {
                  onOpenAuth();
                } else if (setActiveTab) {
                  setActiveTab('profile');
                }
              }}
              className="px-2 py-1 sm:px-2.5 sm:py-1 rounded-full bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-[9px] sm:text-[10px] leading-none shadow-xs shadow-purple-600/30 flex items-center gap-1 transition-all active:scale-95 cursor-pointer border border-purple-300/40 shrink-0 tracking-tight"
              title={user ? 'Account / Profile' : 'Sign Up / Sign In'}
            >
              <User className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-purple-100 shrink-0" />
              <span className="whitespace-nowrap font-bold">
                {user ? (currentUserName.length > 7 ? `${currentUserName.slice(0, 7)}..` : currentUserName) : 'Sign Up / Sign In'}
              </span>
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className={`p-1.5 sm:p-2.5 rounded-2xl border transition-all cursor-pointer ${
                isDarkMode 
                  ? 'bg-[#131728] border-slate-800 text-amber-400 hover:bg-[#1a2038]' 
                  : 'bg-white border-slate-200 text-purple-600 hover:bg-slate-50 shadow-sm'
              }`}
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? <Sun className="w-4 h-4 sm:w-5 sm:h-5" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>

            {/* Notification Bell & 7-Day Pre-Expiry Alert Dropdown Center */}
            <HeaderNotifications 
              hasActiveSubscription={hasActiveSubscription}
              subscriptionEndDate={subscriptionEndDate}
              subscriptionPlanName={subscriptionPlanName}
              onRenewSubscription={() => {
                if (onUpgradeClick) {
                  onUpgradeClick();
                } else if (onRenewSubscription) {
                  onRenewSubscription();
                } else {
                  setActiveTab('pricing');
                  onEnter();
                }
              }}
              onSetSubscriptionEndDate={onSetSubscriptionEndDate}
              isDarkMode={isDarkMode}
              onOpenAuth={onOpenAuth}
              onNavigateTab={(tab) => {
                setActiveTab(tab);
                onEnter();
              }}
              user={user}
              currency={currency}
            />
          </div>

        </div>
      </header>

      {/* 2. Main Scrollable Container */}
      <main className="max-w-4xl mx-auto px-4 pt-4 space-y-6">

        {/* Integrated 2-Day Free Trial Banner inside Front Screen UI */}
        {!hasActiveSubscription && isTrialActive && (
          <div className={`rounded-2xl sm:rounded-3xl p-3.5 sm:p-4 border transition-all shadow-md relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-3 ${
            isDarkMode 
              ? 'bg-gradient-to-r from-[#1d123d] via-[#140e30] to-[#241148] border-purple-500/40 text-white shadow-[0_8px_25px_rgba(124,58,237,0.25)]' 
              : 'bg-gradient-to-r from-purple-900 via-indigo-900 to-fuchsia-900 border-purple-400/50 text-white shadow-purple-200'
          }`}>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs font-semibold text-center sm:text-left">
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span className="font-black text-amber-300 uppercase tracking-wider text-[11px] sm:text-xs">🎁 2-Day Free Trial Active</span>
              </div>
              <span className="text-slate-400 hidden sm:inline">|</span>
              <div className="flex items-center gap-1.5">
                <span className="text-slate-300 text-[11px] sm:text-xs">Time Remaining:</span>
                <span className="font-mono bg-purple-950/90 px-2.5 py-0.5 rounded-lg border border-purple-400/40 text-amber-200 font-bold text-[11px] sm:text-xs shadow-inner">
                  {Math.floor(remainingHours / 24) > 0 ? `${Math.floor(remainingHours / 24)}d ` : ''}{remainingHours % 24}h {remainingMinutes}m {remainingSeconds}s
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={onUpgradeClick}
              className="bg-gradient-to-r from-emerald-400 to-teal-300 hover:from-emerald-300 hover:to-teal-200 text-slate-950 font-black text-[11px] uppercase tracking-wider px-4 py-1.5 rounded-full shadow-md transition-all cursor-pointer hover:scale-105 active:scale-95 shrink-0 whitespace-nowrap"
            >
              Upgrade for Minimum ₹399/mo
            </button>
          </div>
        )}

        {/* Hero Card ("Hello! I'm Arohi 👋") */}
        <div className={`relative rounded-2xl sm:rounded-3xl p-4 sm:p-5 transition-all border ${
          isDarkMode
            ? 'bg-gradient-to-b from-[#111322] via-[#0d0f1b] to-[#121425] border-slate-800/80 shadow-[0_8px_30px_rgba(0,0,0,0.4)]'
            : 'bg-gradient-to-b from-white via-purple-50/20 to-fuchsia-50/40 border-purple-100/80 shadow-[0_8px_30px_rgba(124,58,237,0.06)]'
        }`}>
          
          {/* Top Info Header inside Card */}
          <div className="flex items-center gap-3 mb-3.5">
            {/* 3D Arohi Avatar Container with Glowing Frame */}
            <div className="relative shrink-0 w-12 h-12 sm:w-16 sm:h-16">
              <ArohiAvatar className="w-full h-full" />
            </div>

            {/* Greeting Text */}
            <div className="flex-1 min-w-0">
              <h2 className="text-base sm:text-lg font-bold tracking-tight flex items-center gap-1">
                <span className={isDarkMode ? 'text-white' : 'text-slate-900'}>Hello! I'm</span>
                <span className="text-purple-500 dark:text-purple-400 font-extrabold">Arohi</span>
                <span>👋</span>
              </h2>
              <p className={`text-[11px] sm:text-xs font-normal mt-0.5 leading-snug ${
                isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                Your AI Assistant for Learning, Work, Business & Life.
              </p>
            </div>
          </div>

          {/* Floating Search/Prompt Input Field */}
          <form onSubmit={handlePromptSubmit} className="relative mb-3">
            <div className={`flex items-center gap-2 rounded-2xl p-1.5 sm:p-2 border transition-all ${
              isListening
                ? 'bg-purple-950/30 border-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.3)] ring-2 ring-rose-500/50'
                : isDarkMode 
                  ? 'bg-[#0a0b18] border-slate-800 focus-within:border-purple-500/60 shadow-inner' 
                  : 'bg-white border-slate-200/90 focus-within:border-purple-400 shadow-xs'
            }`}>
              
              {/* Left Sparkles Icon / Recording Pulse */}
              <div className="pl-2.5 text-purple-500 shrink-0 flex items-center justify-center">
                {isListening ? (
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
                  </span>
                ) : (
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse text-purple-500" />
                )}
              </div>

              {/* Input Text Area */}
              <input 
                type="text" 
                value={landingInputText}
                onChange={(e) => setLandingInputText(e?.target?.value ?? "")}
                placeholder={isListening ? "Listening... Speak now 🎙️" : "Tell me what you want to achieve..."}
                className={`w-full bg-transparent text-xs sm:text-sm font-medium outline-none px-1 ${
                  isListening
                    ? 'text-rose-400 dark:text-rose-300 font-bold placeholder-rose-400/80 animate-pulse'
                    : isDarkMode ? 'text-white placeholder-slate-500' : 'text-slate-900 placeholder-slate-400'
                }`}
              />

              {/* If user typed or spoke text, show Send button */}
              {landingInputText.trim().length > 0 && (
                <button
                  type="submit"
                  className="p-2 sm:p-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white shadow-md active:scale-95 transition-all shrink-0 cursor-pointer"
                  title="Send to Arohi AI"
                >
                  <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              )}

              {/* Right Glowing Mic Voice Button */}
              <button
                type="button"
                onClick={toggleVoiceInput}
                className={`p-2 sm:p-2.5 rounded-xl text-white shadow-md hover:scale-105 active:scale-95 transition-all shrink-0 cursor-pointer flex items-center justify-center ${
                  isListening
                    ? 'bg-rose-600 ring-4 ring-rose-500/40 animate-pulse shadow-rose-500/50'
                    : 'bg-gradient-to-r from-purple-600 to-indigo-600 shadow-[0_4px_12px_rgba(124,58,237,0.35)]'
                }`}
                title={isListening ? "Stop listening" : "Speak to Arohi AI (Voice Input)"}
              >
                <Mic className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isListening ? 'animate-bounce' : ''}`} />
              </button>
            </div>

            {/* Active Voice Listening Live Waveform & Control Bar */}
            {isListening && (
              <div className="mt-2 p-3 rounded-2xl bg-gradient-to-r from-purple-950/90 via-indigo-950/90 to-rose-950/80 border border-rose-500/50 shadow-xl backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-2.5 animate-fadeIn">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  {/* Pulsing Audio Waveform Bars */}
                  <div className="flex items-end gap-1 h-6 px-1.5 py-1 bg-black/40 rounded-lg border border-rose-500/30">
                    <span className="w-1 bg-rose-400 rounded-full animate-bounce" style={{ height: `${Math.max(20, Math.min(100, micAudioLevel * 1.4))}%`, animationDuration: '400ms' }}></span>
                    <span className="w-1 bg-fuchsia-400 rounded-full animate-bounce" style={{ height: `${Math.max(30, Math.min(100, micAudioLevel * 1.8))}%`, animationDuration: '300ms', animationDelay: '100ms' }}></span>
                    <span className="w-1 bg-purple-400 rounded-full animate-bounce" style={{ height: `${Math.max(40, Math.min(100, micAudioLevel * 2.0))}%`, animationDuration: '500ms', animationDelay: '150ms' }}></span>
                    <span className="w-1 bg-rose-400 rounded-full animate-bounce" style={{ height: `${Math.max(25, Math.min(100, micAudioLevel * 1.5))}%`, animationDuration: '350ms', animationDelay: '75ms' }}></span>
                    <span className="w-1 bg-amber-400 rounded-full animate-bounce" style={{ height: `${Math.max(20, Math.min(100, micAudioLevel * 1.2))}%`, animationDuration: '450ms', animationDelay: '200ms' }}></span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
                      <span className="text-[11px] font-black text-rose-300 uppercase tracking-wider">
                        Listening ({LANGUAGES_LIST.find(l => l.code === language)?.english || 'Native Language'})...
                      </span>
                    </div>
                    <p className="text-xs text-white font-semibold truncate mt-0.5 max-w-[280px] sm:max-w-[360px]">
                      {landingInputText ? `"${landingInputText}"` : "Speak clearly into your microphone..."}
                    </p>
                    {landingInputText && (
                      <p className="text-[10px] text-purple-300/80 animate-pulse mt-0.5">
                        Speaking captured • Opening chat in a moment...
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 w-full sm:w-auto justify-end">
                  {landingInputText.trim().length > 0 && (
                    <button
                      type="button"
                      onClick={() => submitVoiceQuery(landingInputText)}
                      className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-purple-500 to-rose-500 hover:from-purple-400 hover:to-rose-400 text-white text-[11px] font-black uppercase tracking-wider shadow-md transition-all cursor-pointer flex items-center gap-1 hover:scale-105 active:scale-95 shrink-0"
                    >
                      <Send className="w-3 h-3" /> Ask Arohi
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      if (landingInputText.trim().length > 0 || spokenTranscriptRef.current.trim().length > 0) {
                        submitVoiceQuery();
                      } else {
                        stopVoiceListening(false);
                      }
                    }}
                    className="px-3 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-[11px] font-bold uppercase tracking-wider border border-white/25 transition-all cursor-pointer shrink-0 active:scale-95"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}

            {/* Voice Error Notice */}
            {speechError && (
              <div className="mt-1.5 px-3 py-1 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[10px] sm:text-xs font-semibold flex items-center gap-1.5 animate-fadeIn">
                <span>⚠️</span>
                <span>{speechError}</span>
              </div>
            )}
          </form>

          {/* Quick Action Chips Below Input Bar - Solid icon container + compact 2-line text matching mockup */}
          <div className="grid grid-cols-4 gap-1 sm:gap-1.5">
            <button
              onClick={() => handleQuickAction("Please summarize this article or long document for me.")}
              className={`flex items-center gap-1 sm:gap-1.5 px-1 py-1.5 sm:px-2.5 sm:py-2 rounded-xl border transition-all cursor-pointer min-w-0 ${
                isDarkMode 
                  ? 'bg-[#121528]/90 border-slate-800 text-slate-200 hover:bg-[#1a1f3a]' 
                  : 'bg-white border-slate-200 text-slate-900 hover:bg-purple-50/80 shadow-xs'
              }`}
            >
              <div className="w-4.5 h-4.5 sm:w-5.5 sm:h-5.5 rounded-md bg-indigo-600 text-white flex items-center justify-center shrink-0">
                <FileText className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
              </div>
              <div className={`text-left font-bold text-[8px] xs:text-[9px] sm:text-[10px] leading-[1.15] tracking-tight min-w-0 flex-1 ${
                isDarkMode ? 'text-slate-100' : 'text-slate-900'
              }`}>
                <div className="truncate">Summarize</div>
                <div className="truncate">Article</div>
              </div>
            </button>

            <button
              onClick={() => handleQuickAction("Help me solve this question step by step with explanations.")}
              className={`flex items-center gap-1 sm:gap-1.5 px-1 py-1.5 sm:px-2.5 sm:py-2 rounded-xl border transition-all cursor-pointer min-w-0 ${
                isDarkMode 
                  ? 'bg-[#121528]/90 border-slate-800 text-slate-200 hover:bg-[#1a1f3a]' 
                  : 'bg-white border-slate-200 text-slate-900 hover:bg-emerald-50/80 shadow-xs'
              }`}
            >
              <div className="w-4.5 h-4.5 sm:w-5.5 sm:h-5.5 rounded-md bg-emerald-500 text-white flex items-center justify-center shrink-0">
                <Calculator className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
              </div>
              <div className={`text-left font-bold text-[8px] xs:text-[9px] sm:text-[10px] leading-[1.15] tracking-tight min-w-0 flex-1 ${
                isDarkMode ? 'text-slate-100' : 'text-slate-900'
              }`}>
                <div className="truncate">Solve</div>
                <div className="truncate">Question</div>
              </div>
            </button>

            <button
              onClick={() => handleQuickAction("Help me write an essay, letter, email, or creative content.")}
              className={`flex items-center gap-1 sm:gap-1.5 px-1 py-1.5 sm:px-2.5 sm:py-2 rounded-xl border transition-all cursor-pointer min-w-0 ${
                isDarkMode 
                  ? 'bg-[#121528]/90 border-slate-800 text-slate-200 hover:bg-[#1a1f3a]' 
                  : 'bg-white border-slate-200 text-slate-900 hover:bg-blue-50/80 shadow-xs'
              }`}
            >
              <div className="w-4.5 h-4.5 sm:w-5.5 sm:h-5.5 rounded-md bg-blue-600 text-white flex items-center justify-center shrink-0">
                <PenTool className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
              </div>
              <div className={`text-left font-bold text-[8px] xs:text-[9px] sm:text-[10px] leading-[1.15] tracking-tight min-w-0 flex-1 ${
                isDarkMode ? 'text-slate-100' : 'text-slate-900'
              }`}>
                <div className="truncate">Write</div>
                <div className="truncate">Anything</div>
              </div>
            </button>

            <button
              onClick={() => handleQuickAction("Create a customized study, work, or exam preparation schedule.")}
              className={`flex items-center gap-1 sm:gap-1.5 px-1 py-1.5 sm:px-2.5 sm:py-2 rounded-xl border transition-all cursor-pointer min-w-0 ${
                isDarkMode 
                  ? 'bg-[#121528]/90 border-slate-800 text-slate-200 hover:bg-[#1a1f3a]' 
                  : 'bg-white border-slate-200 text-slate-900 hover:bg-amber-50/80 shadow-xs'
              }`}
            >
              <div className="w-4.5 h-4.5 sm:w-5.5 sm:h-5.5 rounded-md bg-amber-500 text-white flex items-center justify-center shrink-0">
                <Calendar className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
              </div>
              <div className={`text-left font-bold text-[8px] xs:text-[9px] sm:text-[10px] leading-[1.15] tracking-tight min-w-0 flex-1 ${
                isDarkMode ? 'text-slate-100' : 'text-slate-900'
              }`}>
                <div className="truncate">Help Me</div>
                <div className="truncate">Plan</div>
              </div>
            </button>
          </div>



        </div>

        {/* 3. "Explore Arohi AI" Section */}
        <div className="space-y-4">
          
          {/* Section Header Row */}
          <div className="flex items-center justify-between">
            <h3 className={`text-base sm:text-lg font-black tracking-tight ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>
              Explore Arohi AI
            </h3>

            <button
              onClick={() => setShowAllCategories(!showAllCategories)}
              className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>{showAllCategories ? 'Show Featured' : 'See All'}</span>
              <ChevronRight className={`w-4 h-4 transition-transform ${showAllCategories ? 'rotate-90' : ''}`} />
            </button>
          </div>

          {/* Search Bar when expanded */}
          {showAllCategories && (
            <div className="relative">
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                value={categorySearchQuery}
                onChange={(e) => setCategorySearchQuery(e?.target?.value ?? "")}
                placeholder="Search across all 20 audience categories..."
                className={`w-full pl-10 pr-4 py-2.5 text-xs font-medium rounded-2xl border outline-none transition-all ${
                  isDarkMode 
                    ? 'bg-[#131728] border-slate-800 text-white placeholder-slate-500 focus:border-purple-500' 
                    : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-purple-500 shadow-sm'
                }`}
              />
            </div>
          )}

          {/* Category Cards Grid - 3 Columns matching mockup exactly */}
          <div className="grid grid-cols-3 gap-2.5 sm:gap-3.5">
            {displayedCategories.map((cat) => {
              const IconComp = cat.icon;
              return (
                <div
                  key={cat.key}
                  onClick={() => {
                    if (cat.tabId === 'tools' || cat.key === 'moreTools') {
                      setActiveTab('tools');
                      onEnter();
                    } else if (cat.prompt) {
                      handleQuickAction(cat.prompt);
                    } else if (cat.tabId) {
                      setActiveTab(cat.tabId);
                      onEnter();
                    }
                  }}
                  className={`group relative rounded-2xl sm:rounded-3xl p-2.5 sm:p-3.5 border transition-all duration-300 cursor-pointer flex flex-col justify-between hover:scale-[1.02] active:scale-[0.98] ${
                    isDarkMode 
                      ? `bg-[#0f1123]/90 ${cat.borderDark} hover:border-purple-500/50 shadow-sm` 
                      : `bg-white ${cat.borderLight} hover:border-purple-300 shadow-sm hover:shadow-md`
                  }`}
                >
                  <div>
                    {/* Top Icon Badge */}
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl flex items-center justify-center mb-2 transition-transform group-hover:scale-105 ${
                      isDarkMode ? cat.colorDark : cat.colorLight
                    }`}>
                      <IconComp className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>

                    {/* Title */}
                    <h4 className={`text-xs sm:text-sm font-black tracking-tight leading-snug truncate ${
                      isDarkMode ? cat.titleDark : cat.titleLight
                    }`}>
                      {cat.title}
                    </h4>

                    {/* Subtitle */}
                    <p className={`text-[9.5px] sm:text-[11px] font-medium mt-0.5 leading-tight line-clamp-2 ${
                      isDarkMode ? 'text-slate-400' : 'text-slate-500'
                    }`}>
                      {cat.subtitle}
                    </p>
                  </div>

                  {/* Arrow Action Pill */}
                  <div className="flex justify-end mt-2.5">
                    <div className={`w-5.5 h-5.5 sm:w-6.5 sm:h-6.5 rounded-full flex items-center justify-center transition-all group-hover:translate-x-1 ${
                      isDarkMode ? cat.arrowBgDark : cat.arrowBgLight
                    }`}>
                      <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* 4. Trust & Stats Bar (4 Badges in 4 Columns) */}
        <div className={`rounded-2xl p-2.5 sm:p-3.5 border grid grid-cols-4 gap-1.5 sm:gap-3 text-center ${
          isDarkMode 
            ? 'bg-[#0f1123]/80 border-slate-800/80 text-slate-300' 
            : 'bg-white border-slate-200/80 text-slate-700 shadow-sm'
        }`}>
          <div className="flex flex-col items-center justify-center p-1">
            <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 mb-1" />
            <span className="text-[10px] sm:text-xs font-black leading-tight">100% Secure</span>
            <span className={`text-[8px] sm:text-[9.5px] font-medium leading-tight mt-0.5 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Your data is always safe</span>
          </div>

          <div className="flex flex-col items-center justify-center p-1">
            <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500 mb-1" />
            <span className="text-[10px] sm:text-xs font-black leading-tight">150+ Languages</span>
            <span className={`text-[8px] sm:text-[9.5px] font-medium leading-tight mt-0.5 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Chat & content in your language</span>
          </div>

          <div className="flex flex-col items-center justify-center p-1">
            <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 mb-1" />
            <span className="text-[10px] sm:text-xs font-black leading-tight">1M+ Queries</span>
            <span className={`text-[8px] sm:text-[9.5px] font-medium leading-tight mt-0.5 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Answered everyday</span>
          </div>

          <div className="flex flex-col items-center justify-center p-1">
            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 mb-1" />
            <span className="text-[10px] sm:text-xs font-black leading-tight">99.9% Uptime</span>
            <span className={`text-[8px] sm:text-[9.5px] font-medium leading-tight mt-0.5 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Reliable & always available</span>
          </div>
        </div>

        {/* 5. Arohi AI Premium Upgrade Banner */}
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 bg-gradient-to-r from-[#210936] via-[#3a0a52] to-[#6b0d59] text-white shadow-xl border border-amber-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          {/* Crown Watermark */}
          <Crown className="absolute right-12 bottom-[-15px] sm:right-24 sm:bottom-[-20px] w-28 sm:w-40 h-28 sm:h-40 text-purple-400/15 pointer-events-none" />

          <div className="relative z-10 space-y-1 text-left min-w-0 flex-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h4 className="text-sm sm:text-lg font-bold tracking-tight text-white whitespace-nowrap">Arohi AI Premium</h4>
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300 fill-amber-300 shrink-0" />
              <span className="bg-amber-500/30 text-amber-300 border border-amber-400/50 text-[9px] font-black uppercase px-2 py-0.5 rounded-full tracking-wider">
                🎁 100% Cashback Offer
              </span>
            </div>
            <p className="text-[10px] sm:text-xs text-purple-200/90 font-medium leading-snug">
              Get <strong>100% Cashback in Arohi Coins</strong> on 1st month payment + earn <strong>5% referral rewards</strong>!
            </p>
          </div>

          <button
            onClick={() => {
              if (onUpgradeClick) {
                onUpgradeClick();
              } else {
                setActiveTab('pricing');
                onEnter();
              }
            }}
            className="relative z-10 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-950 hover:from-amber-300 hover:to-yellow-200 text-xs sm:text-sm font-black tracking-tight shadow-lg hover:scale-105 active:scale-95 transition-all shrink-0 flex items-center gap-1 cursor-pointer whitespace-nowrap"
          >
            <span>Upgrade with 100% Cashback</span>
            <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-950" />
          </button>
        </div>

      </main>

      {/* 7. Slide-over Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50"
            />

            {/* Menu Panel */}
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={`fixed top-0 bottom-0 left-0 w-80 max-w-[85vw] z-50 p-6 flex flex-col justify-between overflow-y-auto ${
                isDarkMode ? 'bg-[#0d0f20] text-white' : 'bg-white text-slate-900'
              }`}
            >
              <div className="space-y-6">
                
                {/* Header inside Drawer */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-full overflow-hidden shrink-0 border border-purple-500/30">
                      <ArohiAvatar className="w-full h-full" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-sm">Arohi AI</h3>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400">Opportunity Engine</p>
                    </div>
                  </div>

                  <button 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Mobile Drawer Auth Header */}
                <div className="p-3 bg-gradient-to-r from-purple-900/40 via-fuchsia-900/30 to-indigo-900/40 rounded-2xl border border-purple-500/30 flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5 min-w-0 pr-2">
                    <div className="w-8 h-8 rounded-full bg-purple-600/50 flex items-center justify-center text-white shrink-0">
                      <User className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-white truncate">{user ? currentUserName : 'Welcome Guest'}</p>
                      <p className="text-[10px] text-purple-300 truncate">{user ? (user.email || 'Signed in') : 'Sign in to save your sessions'}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      if (onOpenAuth) onOpenAuth();
                      else if (setActiveTab) setActiveTab('profile');
                    }}
                    className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-xs font-extrabold shadow-md shrink-0 cursor-pointer"
                  >
                    {user ? 'Account' : 'Sign Up / Sign In'}
                  </button>
                </div>

                {/* Quick Navigation Links */}
                <div className="space-y-2">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2">Navigation</p>
                  
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setActiveTab('arohi');
                      onEnter();
                    }}
                    className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold hover:bg-purple-50 dark:hover:bg-purple-950/40 hover:text-purple-600 flex items-center justify-between cursor-pointer"
                  >
                    <span>Voice Call & Chat</span>
                    <Sparkles className="w-4 h-4 text-purple-500" />
                  </button>

                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setActiveTab('syllabus');
                      onEnter();
                    }}
                    className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold hover:bg-purple-50 dark:hover:bg-purple-950/40 hover:text-purple-600 flex items-center justify-between cursor-pointer"
                  >
                    <span>Odia & CBSE Syllabus Hub</span>
                    <BookOpen className="w-4 h-4 text-blue-500" />
                  </button>

                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setActiveTab('jobs');
                      onEnter();
                    }}
                    className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold hover:bg-purple-50 dark:hover:bg-purple-950/40 hover:text-purple-600 flex items-center justify-between cursor-pointer"
                  >
                    <span>Govt & Private Jobs Portal</span>
                    <Landmark className="w-4 h-4 text-amber-500" />
                  </button>

                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setActiveTab('business');
                      onEnter();
                    }}
                    className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold hover:bg-purple-50 dark:hover:bg-purple-950/40 hover:text-purple-600 flex items-center justify-between cursor-pointer"
                  >
                    <span>Business & Startup Hub</span>
                    <Briefcase className="w-4 h-4 text-emerald-500" />
                  </button>
                </div>

                {/* Language Switcher inside Drawer with Full Scrolling & Search */}
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between px-2">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Language ({language.toUpperCase()})
                    </p>
                    <span className="text-[9px] font-bold text-purple-400 bg-purple-500/10 px-2.5 py-0.5 rounded-full border border-purple-500/20">
                      150+ Languages
                    </span>
                  </div>

                  {/* Optional Quick Search Filter for Languages */}
                  <div className="relative px-1">
                    <input
                      type="text"
                      value={drawerLangSearch}
                      onChange={(e) => setDrawerLangSearch(e.target.value)}
                      placeholder="Search language..."
                      className={`w-full text-xs px-3 py-1.5 rounded-xl border outline-none transition-all ${
                        isDarkMode
                          ? 'bg-[#0a0c1a] border-slate-850 text-slate-100 placeholder:text-slate-500 focus:border-purple-500'
                          : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-purple-400'
                      }`}
                    />
                    {drawerLangSearch && (
                      <button
                        onClick={() => setDrawerLangSearch('')}
                        className="absolute right-3 top-1.5 text-[10px] text-slate-400 hover:text-white font-bold"
                      >
                        ✕
                      </button>
                    )}
                  </div>

                  {/* Scrollable Languages Grid */}
                  <div className="grid grid-cols-2 gap-1.5 max-h-60 overflow-y-auto pr-1 custom-scrollbar">
                    {LANGUAGES_LIST.filter((l) => {
                      if (!drawerLangSearch.trim()) return true;
                      const q = drawerLangSearch.toLowerCase();
                      return (
                        l.native.toLowerCase().includes(q) ||
                        l.english.toLowerCase().includes(q) ||
                        l.code.toLowerCase().includes(q)
                      );
                    }).map((l) => {
                      const isSelected = language === l.code;
                      return (
                        <button
                          key={l.code}
                          onClick={() => {
                            onLanguageChange(l.code as Language);
                            setIsMobileMenuOpen(false);
                          }}
                          className={`px-3 py-2 rounded-xl text-left transition-all cursor-pointer flex flex-col justify-center min-w-0 border ${
                            isSelected
                              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-purple-400 shadow-md shadow-purple-900/30'
                              : isDarkMode
                              ? 'bg-[#111428] hover:bg-[#191e3a] border-slate-800/80 text-slate-200 hover:border-slate-700'
                              : 'bg-slate-100 hover:bg-purple-50 border-slate-200 text-slate-700 hover:text-purple-700'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-1">
                            <span className="text-xs font-bold truncate">{l.native}</span>
                            {isSelected && (
                              <span className="w-1.5 h-1.5 rounded-full bg-[#00e676] shrink-0 shadow-[0_0_6px_#00e676]"></span>
                            )}
                          </div>
                          {l.native !== l.english && (
                            <span className={`text-[9px] truncate ${isSelected ? 'text-purple-200' : 'text-slate-400'}`}>
                              {l.english}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Share & Theme Controls inside Drawer */}
              <div className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-3">
                {onShare && (
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onShare();
                    }}
                    className="w-full px-4 py-2.5 rounded-2xl bg-purple-600 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md cursor-pointer"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Share Arohi AI App</span>
                  </button>
                )}

                <div className="text-center">
                  <p className="text-[10px] text-slate-400 font-medium">Arohi AI v3.0 • Certified & Secure</p>
                </div>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
