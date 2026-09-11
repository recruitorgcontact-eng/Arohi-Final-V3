import React, { useState, useEffect, useRef, useMemo } from 'react';
import { createPortal } from 'react-dom';
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
  Box,
  Trophy,
  Award,
  Phone,
  PhoneCall,
  Camera,
  Layers,
  Volume2
} from 'lucide-react';
import { Language, getTranslation } from '../translations';
import { LANGUAGES_LIST } from './Header';
import { useAuth } from '../context/AuthContext';
import ArohiAvatar from './ArohiAvatar';
import ArohiVoiceCall from './ArohiVoiceCall';
import HeaderNotifications from './HeaderNotifications';
import ArohiExamsButtonBanner from './mocktests/ArohiExamsButtonBanner';
import ArohiOneBusinessOSButtonBanner from './business_os/ArohiOneBusinessOSButtonBanner';
import Mission87HeroBanner from './mission87/Mission87HeroBanner';
import {
  Icon3DBusinessOS,
  Icon3DAssistantOrb,
  Icon3DCallingAgents,
  Icon3DExamsCap,
  Icon3DInstitutions,
  Icon3DOpportunities
} from './products/Ecosystem3DIcons';

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
  onStartVoiceCall?: () => void;
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
  currency = 'INR',
  onStartVoiceCall
}: WelcomeLandingProps) {
  const { user, userData } = useAuth();
  const [isDirectVoiceCallModalOpen, setIsDirectVoiceCallModalOpen] = useState(false);
  
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

  // Intelligent First Name resolution for motivational hero lines
  const cleanFirstName = useMemo(() => {
    if (!user) return '';
    const raw = userData?.profile?.name || (userData as any)?.displayName || user.displayName || user.email?.split('@')[0] || '';
    if (!raw || raw === 'User' || raw === 'Honored Guest') return '';
    let name = raw;
    if (name.toLowerCase().includes('elitetraderjunoon')) {
      name = 'Junoon';
    } else if (name.includes('@')) {
      name = name.split('@')[0];
    }
    // Clean handles like junoon_nayak
    name = name.replace(/[_\-.]+/g, ' ');
    const first = name.trim().split(/\s+/)[0];
    return first ? first.charAt(0).toUpperCase() + first.slice(1) : '';
  }, [user, userData]);

  // Cheerful, motivational hero headlines with super-premium luxury palettes
  const motivationalLines = useMemo(() => {
    if (cleanFirstName) {
      return [
        {
          before: "Tell me what you want to achieve, ",
          name: cleanFirstName,
          after: "...",
          gradientDark: "from-white via-sky-200 to-blue-400",
          gradientLight: "from-zinc-950 via-blue-900 to-indigo-700",
          tag: "YOUR VISION"
        },
        {
          before: "What big dream are we building today, ",
          name: cleanFirstName,
          after: "?",
          gradientDark: "from-amber-100 via-[#f5eed6] to-[#d4af37]",
          gradientLight: "from-zinc-950 via-amber-900 to-yellow-700",
          tag: "BUILD BIG"
        },
        {
          before: "Let's turn your ideas into reality, ",
          name: cleanFirstName,
          after: "!",
          gradientDark: "from-emerald-100 via-teal-200 to-cyan-300",
          gradientLight: "from-zinc-950 via-emerald-900 to-teal-700",
          tag: "MAKE IT REAL"
        },
        {
          before: "Ready to unlock infinite opportunities, ",
          name: cleanFirstName,
          after: "?",
          gradientDark: "from-rose-100 via-pink-200 to-violet-300",
          gradientLight: "from-zinc-950 via-purple-900 to-rose-700",
          tag: "NEW HORIZONS"
        },
        {
          before: "Lead, create, and inspire today, ",
          name: cleanFirstName,
          after: "!",
          gradientDark: "from-white via-cyan-200 to-blue-400",
          gradientLight: "from-zinc-950 via-cyan-900 to-blue-700",
          tag: "SOVEREIGN CREATOR"
        }
      ];
    }
    return [
      {
        before: "Tell me what you want to achieve",
        name: "",
        after: "...",
        gradientDark: "from-white via-sky-200 to-blue-400",
        gradientLight: "from-zinc-950 via-blue-900 to-indigo-700",
        tag: "ONE AI"
      },
      {
        before: "What big dream are we building today",
        name: "",
        after: "?",
        gradientDark: "from-amber-100 via-[#f5eed6] to-[#d4af37]",
        gradientLight: "from-zinc-950 via-amber-900 to-yellow-700",
        tag: "BUILD BIG"
      },
      {
        before: "Let's turn your ideas into reality",
        name: "",
        after: "!",
        gradientDark: "from-emerald-100 via-teal-200 to-cyan-300",
        gradientLight: "from-zinc-950 via-emerald-900 to-teal-700",
        tag: "MAKE IT REAL"
      },
      {
        before: "Ready to unlock infinite opportunities",
        name: "",
        after: "?",
        gradientDark: "from-rose-100 via-pink-200 to-violet-300",
        gradientLight: "from-zinc-950 via-purple-900 to-rose-700",
        tag: "NEW HORIZONS"
      },
      {
        before: "Your potential is limitless—let's create",
        name: "",
        after: "!",
        gradientDark: "from-white via-cyan-200 to-blue-400",
        gradientLight: "from-zinc-950 via-cyan-900 to-blue-700",
        tag: "INFINITE POSSIBILITIES"
      }
    ];
  }, [cleanFirstName]);

  const [headlineIndex, setHeadlineIndex] = useState(0);
  const [isHeadlineHovered, setIsHeadlineHovered] = useState(false);

  // Auto-advance motivational headlines every 3.8 seconds smoothly
  useEffect(() => {
    if (isHeadlineHovered) return;
    const timer = setInterval(() => {
      setHeadlineIndex((prev) => (prev + 1) % motivationalLines.length);
    }, 3800);
    return () => clearInterval(timer);
  }, [isHeadlineHovered, motivationalLines.length]);

  const [landingInputText, setLandingInputText] = useState('');
  const landingTextareaRef = useRef<HTMLTextAreaElement | null>(null);

  const adjustLandingTextareaHeight = () => {
    if (landingTextareaRef.current) {
      landingTextareaRef.current.style.height = 'auto';
      const scrollH = landingTextareaRef.current.scrollHeight;
      landingTextareaRef.current.style.height = `${Math.min(Math.max(scrollH, 68), 160)}px`;
    }
  };

  useEffect(() => {
    adjustLandingTextareaHeight();
  }, [landingInputText]);
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
        ? 'bg-transparent text-white' 
        : 'bg-transparent text-slate-900'
    }`}>
      
      {/* 1. Sovereign Header Navigation */}
      <header className={`sticky top-0 z-40 w-full backdrop-blur-xl transition-colors ${
        isDarkMode 
          ? 'bg-[#0d0e12]/85 border-b border-white/[0.08]' 
          : 'bg-[#f9f9f6]/90 border-b border-black/[0.07]'
      }`}>
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          
          {/* Left: Menu / Navigation Toggle */}
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className={`p-2 rounded-xl border text-xs font-semibold tracking-tight transition-all cursor-pointer ${
              isDarkMode 
                ? 'bg-[#15171e] border-white/10 text-zinc-200 hover:bg-[#1a1d26] hover:border-[#d4af37]/40' 
                : 'bg-white border-black/8 text-zinc-800 hover:bg-zinc-50 shadow-xs'
            }`}
            aria-label="Menu"
            title="Menu"
          >
            <Menu className="w-4 h-4 text-[#d4af37]" />
          </button>

          {/* Center: Sleek & Premium Brand Identity */}
          <div className="flex flex-col items-center justify-center text-center cursor-pointer select-none group" onClick={() => { setActiveTab('home'); onEnter(); }}>
            <h1 className="text-xl sm:text-2xl font-black tracking-[-0.03em] flex items-center justify-center leading-none font-display">
              <span className={isDarkMode ? 'text-white tracking-tight' : 'text-zinc-950 tracking-tight'}>
                AROHI
              </span>
              <span className="ml-1 text-blue-600 dark:text-blue-500 font-black tracking-tight drop-shadow-[0_0_12px_rgba(37,99,235,0.35)]">
                AI
              </span>
            </h1>
            <p className="block text-[8.5px] sm:text-[9.5px] font-bold tracking-[0.24em] uppercase leading-none mt-1 text-zinc-500 dark:text-zinc-400 font-sans">
              One AI. Infinite Opportunities.
            </p>
          </div>

          {/* Right: User / Auth, Theme & Alerts */}
          <div className="flex items-center gap-2">
            {/* Sign Up / Account Button */}
            <button
              type="button"
              id="welcome-header-auth-btn"
              onClick={() => {
                if (user) {
                  if (setActiveTab) setActiveTab('profile');
                  if (onEnter) onEnter();
                } else {
                  if (onOpenAuth) {
                    onOpenAuth();
                  } else if (setActiveTab) {
                    setActiveTab('profile');
                  }
                }
              }}
              className="px-3 py-1.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 font-bold text-[11px] sm:text-xs leading-none shadow-xs flex items-center gap-1.5 transition-all hover:opacity-90 active:scale-95 cursor-pointer shrink-0"
              title={user ? 'Account / Profile' : 'Sign Up / Sign In'}
            >
              <User className="w-3.5 h-3.5 shrink-0 opacity-80" />
              <span className="whitespace-nowrap">
                {user ? (currentUserName.length > 10 ? `${currentUserName.slice(0, 10)}..` : currentUserName) : 'Sign In'}
              </span>
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-xl border transition-all cursor-pointer ${
                isDarkMode 
                  ? 'bg-[#15171e] border-white/10 text-amber-400 hover:bg-[#1c1f28]' 
                  : 'bg-white border-black/8 text-zinc-700 hover:bg-zinc-50 shadow-xs'
              }`}
              title={isDarkMode ? 'Switch to Linen Light' : 'Switch to Obsidian Dark'}
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Notification Bell & Expiry Alert */}
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
      <main className="max-w-4xl mx-auto px-4 pt-6 space-y-6">

        {/* Integrated 2-Day Free Trial Banner */}
        {!hasActiveSubscription && isTrialActive && (
          <div className={`rounded-2xl p-3.5 sm:p-4 border transition-all shadow-xs relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-3 ${
            isDarkMode 
              ? 'bg-[#15171e] border-amber-500/30 text-white' 
              : 'bg-white border-amber-500/30 text-zinc-900 shadow-xs'
          }`}>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs font-semibold text-center sm:text-left">
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span className="font-bold text-[#d4af37] uppercase tracking-wider text-[11px] sm:text-xs">🎁 2-Day Free Trial Active</span>
              </div>
              <span className="text-zinc-400 hidden sm:inline">•</span>
              <div className="flex items-center gap-1.5">
                <span className="text-zinc-500 dark:text-zinc-400 text-[11px] sm:text-xs">Time Remaining:</span>
                <span className="font-mono bg-zinc-100 dark:bg-black/40 px-2.5 py-0.5 rounded-lg border border-black/5 dark:border-white/10 text-zinc-900 dark:text-zinc-200 font-bold text-[11px] sm:text-xs">
                  {Math.floor(remainingHours / 24) > 0 ? `${Math.floor(remainingHours / 24)}d ` : ''}{remainingHours % 24}h {remainingMinutes}m {remainingSeconds}s
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={onUpgradeClick}
              className="bg-[#d4af37] hover:bg-[#c49f2b] text-zinc-950 font-bold text-[11px] uppercase tracking-wider px-4 py-2 rounded-xl shadow-xs transition-all cursor-pointer hover:scale-105 active:scale-95 shrink-0 whitespace-nowrap"
            >
              Upgrade for Minimum ₹399/mo
            </button>
          </div>
        )}

        {/* Stately Sovereign Hero Centerpiece with Super-Premium Editorial Lines */}
        <div 
          className="text-center pt-2 sm:pt-4 pb-2 select-none"
          onMouseEnter={() => setIsHeadlineHovered(true)}
          onMouseLeave={() => setIsHeadlineHovered(false)}
        >
          {/* Subtle Atelier Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-[11px] font-semibold tracking-[0.2em] uppercase mb-3 transition-all">
            <Sparkles className="w-3 h-3 text-blue-500" />
            <span>{motivationalLines[headlineIndex]?.tag || "A MORE HUMAN TOMORROW"}</span>
          </div>

          {/* Super-Premium Newsreader Editorial Headline (No lines or clutter underneath) */}
          <div className="min-h-[76px] sm:min-h-[96px] flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.h1
                key={headlineIndex}
                initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="font-newsreader text-3xl sm:text-5xl md:text-[54px] font-normal tracking-[-0.015em] leading-[1.2] px-3 text-center"
              >
                <span className={`bg-gradient-to-r ${
                  isDarkMode 
                    ? motivationalLines[headlineIndex]?.gradientDark 
                    : motivationalLines[headlineIndex]?.gradientLight
                } bg-clip-text text-transparent`}>
                  {motivationalLines[headlineIndex]?.before}
                  {motivationalLines[headlineIndex]?.name && (
                    <span className="font-apple not-italic font-bold tracking-tight bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 dark:from-[#fbbf24] dark:via-[#facc15] dark:to-[#f59e0b] bg-clip-text text-transparent px-1 inline-block drop-shadow-[0_1px_8px_rgba(245,158,11,0.25)]">
                      {motivationalLines[headlineIndex]?.name}
                    </span>
                  )}
                  {motivationalLines[headlineIndex]?.after}
                </span>
              </motion.h1>
            </AnimatePresence>
          </div>

          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-2 max-w-xl mx-auto leading-relaxed font-normal">
            One AI ecosystem for people, institutions and a brighter India.
          </p>
        </div>

        {/* Universal Sovereign Input Dock */}
        <div className="relative">
          <form onSubmit={handlePromptSubmit} className="relative">
            <div className={`flex flex-col rounded-2xl sm:rounded-3xl p-3.5 sm:p-4.5 border transition-all ${
              isListening
                ? 'bg-rose-500/5 border-rose-500 shadow-md ring-2 ring-rose-500/30'
                : isDarkMode 
                  ? 'atelier-dock-dark' 
                  : 'atelier-dock-light'
            }`}>
              
              {/* Text Input Area with Smooth Inner Scrolling */}
              <div className="w-full pt-1">
                <textarea 
                  ref={landingTextareaRef}
                  rows={2}
                  value={landingInputText}
                  onChange={(e) => {
                    setLandingInputText(e?.target?.value ?? "");
                    adjustLandingTextareaHeight();
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handlePromptSubmit();
                    }
                  }}
                  placeholder={isListening ? "Listening... Speak now in your language 🎙️" : "Ask Arohi anything..."}
                  className={`w-full bg-transparent text-sm sm:text-base font-normal outline-none px-2.5 py-1.5 leading-relaxed max-h-48 min-h-[64px] sm:min-h-[76px] overflow-y-auto resize-none custom-scrollbar ${
                    isListening
                      ? 'text-rose-400 dark:text-rose-300 font-medium placeholder-rose-400/80 animate-pulse'
                      : isDarkMode ? 'text-white placeholder-zinc-500' : 'text-zinc-900 placeholder-zinc-400'
                  }`}
                />
              </div>

              {/* Bottom Row inside Input Dock: Tools, Voice & Send */}
              <div className="flex items-center justify-between pt-3 pb-0.5 border-t border-black/5 dark:border-white/5">
                <div className="flex items-center gap-1.5 text-zinc-400 text-xs">
                  <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-black/5 dark:bg-white/5 text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
                    <Globe className="w-3 h-3 text-[#d4af37]" />
                    <span>{LANGUAGES_LIST.find(l => l.code === language)?.native || '150+ Langs'}</span>
                  </div>
                  <div className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-lg bg-black/5 dark:bg-white/5 text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
                    <ShieldCheck className="w-3 h-3 text-emerald-500" />
                    <span>Private &amp; Sovereign</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Camera / Vision Button */}
                  <button
                    type="button"
                    onClick={() => handleQuickAction("Please analyze this diagram or document image.")}
                    className="p-2 rounded-xl transition-all cursor-pointer text-zinc-400 hover:text-blue-500 hover:bg-blue-500/10"
                    title="Camera & Vision"
                  >
                    <Camera className="w-4 h-4" />
                  </button>

                  {/* Voice Button */}
                  <button
                    type="button"
                    onClick={toggleVoiceInput}
                    className={`p-2 rounded-xl transition-all cursor-pointer flex items-center justify-center ${
                      isListening
                        ? 'bg-rose-600 text-white ring-4 ring-rose-500/40 animate-pulse'
                        : isDarkMode
                        ? 'bg-white/10 hover:bg-white/15 text-zinc-200 hover:text-white'
                        : 'bg-black/5 hover:bg-black/10 text-zinc-700'
                    }`}
                    title={isListening ? "Stop listening" : "Speak to Arohi (Voice Recognition)"}
                  >
                    <Mic className={`w-4 h-4 ${isListening ? 'animate-bounce' : ''}`} />
                  </button>

                  {/* Send Button */}
                  <button
                    type="submit"
                    disabled={landingInputText.trim().length === 0 && !isListening}
                    className={`p-2 rounded-xl transition-all cursor-pointer flex items-center justify-center ${
                      landingInputText.trim().length > 0
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-xs hover:scale-105 active:scale-95'
                        : 'bg-black/5 dark:bg-white/5 text-zinc-400 cursor-not-allowed'
                    }`}
                    title="Send message"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Active Voice Listening Live Waveform */}
            {isListening && (
              <div className="mt-2.5 p-3.5 rounded-2xl bg-[#15171e] border border-rose-500/40 shadow-xl backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-3 animate-fadeIn">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <div className="flex items-end gap-1 h-6 px-2 py-1 bg-black/50 rounded-lg border border-rose-500/30">
                    <span className="w-1 bg-rose-400 rounded-full animate-bounce" style={{ height: `${Math.max(20, Math.min(100, micAudioLevel * 1.4))}%`, animationDuration: '400ms' }}></span>
                    <span className="w-1 bg-amber-400 rounded-full animate-bounce" style={{ height: `${Math.max(30, Math.min(100, micAudioLevel * 1.8))}%`, animationDuration: '300ms', animationDelay: '100ms' }}></span>
                    <span className="w-1 bg-cyan-400 rounded-full animate-bounce" style={{ height: `${Math.max(40, Math.min(100, micAudioLevel * 2.0))}%`, animationDuration: '500ms', animationDelay: '150ms' }}></span>
                    <span className="w-1 bg-rose-400 rounded-full animate-bounce" style={{ height: `${Math.max(25, Math.min(100, micAudioLevel * 1.5))}%`, animationDuration: '350ms', animationDelay: '75ms' }}></span>
                  </div>

                  <div className="min-w-0 flex-1 text-left">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
                      <span className="text-[11px] font-bold text-rose-300 uppercase tracking-wider font-mono">
                        Listening ({LANGUAGES_LIST.find(l => l.code === language)?.english || 'Native'})...
                      </span>
                    </div>
                    <p className="text-xs text-white font-medium truncate mt-0.5 max-w-[280px] sm:max-w-[360px]">
                      {landingInputText ? `"${landingInputText}"` : "Speak clearly into your microphone..."}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  {landingInputText.trim().length > 0 && (
                    <button
                      type="button"
                      onClick={() => submitVoiceQuery(landingInputText)}
                      className="px-3 py-1.5 rounded-xl bg-[#d4af37] text-zinc-950 text-xs font-bold transition-all cursor-pointer flex items-center gap-1 shadow-xs hover:scale-105"
                    >
                      <Send className="w-3 h-3" /> Ask Arohi
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => stopVoiceListening(true)}
                    className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}

            {/* Voice Error Notice */}
            {speechError && (
              <div className="mt-2 px-3.5 py-1.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 dark:text-rose-400 text-xs font-medium flex items-center gap-2 animate-fadeIn">
                <span>⚠️</span>
                <span>{speechError}</span>
              </div>
            )}
          </form>

          {/* 5 Quick Category Pills (Learn, Work, Solve, Create, In Your Language) */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-3.5">
            <button
              onClick={() => handleQuickAction("Teach me a concept or syllabus topic step by step with clear examples.")}
              className={`px-3.5 py-1.5 rounded-full border text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                isDarkMode ? 'bg-[#15171e] border-white/8 hover:border-blue-500/40 text-zinc-300' : 'bg-white border-black/8 hover:shadow-sm text-zinc-700'
              }`}
            >
              <span>🎓</span>
              <span>Learn</span>
            </button>

            <button
              onClick={() => handleQuickAction("Help me draft a professional work proposal, business email, or resume.")}
              className={`px-3.5 py-1.5 rounded-full border text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                isDarkMode ? 'bg-[#15171e] border-white/8 hover:border-emerald-500/40 text-zinc-300' : 'bg-white border-black/8 hover:shadow-sm text-zinc-700'
              }`}
            >
              <span>💼</span>
              <span>Work</span>
            </button>

            <button
              onClick={() => handleQuickAction("Walk me through solving this complex problem step-by-step.")}
              className={`px-3.5 py-1.5 rounded-full border text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                isDarkMode ? 'bg-[#15171e] border-white/8 hover:border-amber-500/40 text-zinc-300' : 'bg-white border-black/8 hover:shadow-sm text-zinc-700'
              }`}
            >
              <span>💡</span>
              <span>Solve</span>
            </button>

            <button
              onClick={() => handleQuickAction("Generate creative ideas, marketing copy, and visual prompts for my project.")}
              className={`px-3.5 py-1.5 rounded-full border text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                isDarkMode ? 'bg-[#15171e] border-white/8 hover:border-purple-500/40 text-zinc-300' : 'bg-white border-black/8 hover:shadow-sm text-zinc-700'
              }`}
            >
              <span>🎨</span>
              <span>Create</span>
            </button>

            <button
              onClick={() => handleQuickAction("Namaste Arohi! Let us speak in my regional Indian mother tongue.")}
              className={`px-3.5 py-1.5 rounded-full border text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                isDarkMode ? 'bg-[#15171e] border-white/8 hover:border-[#d4af37]/40 text-[#d4af37]' : 'bg-white border-black/8 hover:shadow-sm text-[#d4af37]'
              }`}
            >
              <span>🌐</span>
              <span>In Your Language</span>
            </button>
          </div>

          {/* DIRECT AROHI VOICE CALL - SEAMLESS LIVE BUBBLE HERO TRIGGER (NO BACKGROUND TAB) */}
          <div className="mt-5 sm:mt-6">
            <button
              type="button"
              id="direct-voice-call-frontpage-btn"
              onClick={() => {
                if (onStartVoiceCall) {
                  onStartVoiceCall();
                } else {
                  setIsDirectVoiceCallModalOpen(true);
                }
              }}
              className="group w-full flex items-center justify-between gap-3.5 sm:gap-5 p-2 sm:p-3 rounded-2xl transition-all duration-300 cursor-pointer text-left hover:bg-zinc-500/5 focus:outline-hidden"
            >
              <div className="flex items-center gap-3.5 sm:gap-4.5 min-w-0">
                {/* Arohi Live Animated Bubble with Ambient Halo */}
                <div className="relative flex items-center justify-center shrink-0">
                  {/* Subtle Ambient Radial Glow */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500/30 via-fuchsia-500/30 to-violet-600/30 blur-md group-hover:blur-lg group-hover:scale-110 transition-all duration-500 pointer-events-none" />
                  
                  {/* Arohi Live Orb Component */}
                  <div className="w-13 h-13 sm:w-15 sm:h-15 relative z-10">
                    <ArohiAvatar className="w-full h-full group-hover:scale-105 transition-transform duration-300" />
                  </div>

                  {/* Active Live Beacon Indicator */}
                  <span className="absolute -top-0.5 -right-0.5 z-20 flex h-3.5 w-3.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white dark:border-[#0d0e12]"></span>
                  </span>
                </div>

                {/* Text written side of the bubble */}
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-base sm:text-lg font-bold tracking-tight text-zinc-900 dark:text-white font-display group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      Direct Arohi Voice Call
                    </h3>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 dark:bg-emerald-400/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      LIVE
                    </span>
                  </div>
                  <p className="text-xs sm:text-[13px] text-zinc-600 dark:text-zinc-400 font-normal mt-0.5 flex items-center gap-1.5">
                    <span>150+ Vernacular Languages</span>
                    <span className="text-zinc-400 dark:text-zinc-600">•</span>
                    <span>Real-Time Voice AI</span>
                  </p>
                </div>
              </div>

              {/* Minimal Call Pill Action */}
              <div className="shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full border border-blue-500/30 bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 text-xs sm:text-sm font-semibold transition-all group-hover:scale-105">
                <Phone className="w-3.5 h-3.5 animate-pulse text-blue-500" />
                <span className="whitespace-nowrap">Call Arohi</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>
          </div>

          {/* Hero Visual: "For a Brighter India" Graphic Banner */}
          <div className={`mt-7 rounded-3xl p-6 sm:p-8 border relative overflow-hidden text-center shadow-lg transition-all ${
            isDarkMode 
              ? 'bg-gradient-to-r from-blue-950/40 via-indigo-950/50 to-purple-950/40 border-blue-500/30' 
              : 'bg-gradient-to-r from-blue-50/90 via-indigo-50/80 to-purple-50/90 border-blue-200/80'
          }`}>
            <div className="relative z-10 max-w-xl mx-auto space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 dark:bg-white/10 border border-blue-500/20 dark:border-white/15 text-[10px] sm:text-xs font-bold text-blue-700 dark:text-blue-200 tracking-wider">
                <span>🇮🇳</span>
                <span>PEOPLE · IDEAS · OPPORTUNITIES · A STRONGER TOMORROW</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-white font-display">
                Empowering 1.4 Billion Aspirations
              </h3>
              <div className="text-base sm:text-lg font-bold text-amber-600 dark:text-[#d4af37] italic font-newsreader">
                &ldquo;For a Brighter India&rdquo;
              </div>
            </div>
          </div>

          {/* 4 Sovereign Impact Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
            <div className={`p-3.5 rounded-2xl border text-center ${
              isDarkMode ? 'bg-[#15171e] border-white/8' : 'bg-white border-black/8 shadow-xs'
            }`}>
              <div className="text-xl sm:text-2xl font-black text-blue-600 dark:text-blue-400 font-display">1M+</div>
              <div className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-300 mt-0.5">Lives Touched</div>
            </div>
            <div className={`p-3.5 rounded-2xl border text-center ${
              isDarkMode ? 'bg-[#15171e] border-white/8' : 'bg-white border-black/8 shadow-xs'
            }`}>
              <div className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400 font-display">500+</div>
              <div className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-300 mt-0.5">Institutions</div>
            </div>
            <div className={`p-3.5 rounded-2xl border text-center ${
              isDarkMode ? 'bg-[#15171e] border-white/8' : 'bg-white border-black/8 shadow-xs'
            }`}>
              <div className="text-xl sm:text-2xl font-black text-amber-600 dark:text-amber-400 font-display">50+</div>
              <div className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-300 mt-0.5">Industries</div>
            </div>
            <div className={`p-3.5 rounded-2xl border text-center ${
              isDarkMode ? 'bg-[#15171e] border-white/8' : 'bg-white border-black/8 shadow-xs'
            }`}>
              <div className="text-xl sm:text-2xl font-black text-purple-600 dark:text-purple-400 font-display">150+</div>
              <div className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-300 mt-0.5">Languages</div>
            </div>
          </div>

          {/* THE 5 CORE PRODUCTS ECOSYSTEM GRID (SCREENSHOT 9 SHOWCASE) */}
          <div id="ecosystem-section" className="mt-8 space-y-4">
            <div className="flex items-center justify-between px-1">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-500">
                  ONE AI ECOSYSTEM
                </span>
                <h3 className="text-lg sm:text-xl font-black tracking-tight text-zinc-950 dark:text-white font-display">
                  Explore Arohi Ecosystem
                </h3>
              </div>
              <button
                onClick={() => {
                  setShowAllCategories(true);
                  const el = document.getElementById('solutions-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-xs font-bold text-blue-500 hover:text-blue-400 flex items-center gap-1 cursor-pointer group"
              >
                <span>See All Solutions</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
              
              {/* Product 1: Arohi One Business OS */}
              <div
                onClick={() => {
                  setActiveTab('business-os');
                  onEnter();
                }}
                className={`group p-4 sm:p-5 rounded-2xl border text-left cursor-pointer transition-all hover:scale-[1.015] active:scale-[0.99] flex items-center justify-between gap-3.5 shadow-xs hover:shadow-md ${
                  isDarkMode 
                    ? 'bg-gradient-to-br from-[#0c162c] via-[#091122] to-[#070b14] border-blue-900/40 hover:border-blue-500/60' 
                    : 'bg-gradient-to-br from-[#eff6ff] via-[#f7faff] to-white border-blue-100/90 hover:border-blue-300'
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-0 flex-1">
                  <div className="shrink-0 transition-transform group-hover:scale-105">
                    <Icon3DBusinessOS className="w-14 h-14 sm:w-16 sm:h-16" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm sm:text-base font-black text-zinc-950 dark:text-white tracking-tight leading-tight">
                      Arohi One Business OS
                    </h4>
                    <p className="text-[11px] sm:text-xs text-zinc-600 dark:text-zinc-300 mt-1 leading-snug line-clamp-2 font-medium">
                      Run. Automate. Grow. All in one.
                    </p>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200/90 dark:border-zinc-700 flex items-center justify-center text-zinc-700 dark:text-zinc-300 shrink-0 shadow-xs group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Product 2: Arohi AI Assistant */}
              <div
                onClick={() => {
                  setActiveTab('assistant');
                  onEnter();
                }}
                className={`group p-4 sm:p-5 rounded-2xl border text-left cursor-pointer transition-all hover:scale-[1.015] active:scale-[0.99] flex items-center justify-between gap-3.5 shadow-xs hover:shadow-md ${
                  isDarkMode 
                    ? 'bg-gradient-to-br from-[#191638] via-[#100e24] to-[#070b14] border-indigo-900/40 hover:border-indigo-500/60' 
                    : 'bg-gradient-to-br from-[#f5f3ff] via-[#faf8ff] to-white border-indigo-100/90 hover:border-indigo-300'
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-0 flex-1">
                  <div className="shrink-0 transition-transform group-hover:scale-105">
                    <Icon3DAssistantOrb className="w-14 h-14 sm:w-16 sm:h-16" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm sm:text-base font-black text-zinc-950 dark:text-white tracking-tight leading-tight">
                      Arohi AI Assistant
                    </h4>
                    <p className="text-[11px] sm:text-xs text-zinc-600 dark:text-zinc-300 mt-1 leading-snug line-clamp-2 font-medium">
                      Your intelligent companion for work and life.
                    </p>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200/90 dark:border-zinc-700 flex items-center justify-center text-zinc-700 dark:text-zinc-300 shrink-0 shadow-xs group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-all">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Product 3: Arohi Calling Agents */}
              <div
                onClick={() => {
                  setActiveTab('calling-agents');
                  onEnter();
                }}
                className={`group p-4 sm:p-5 rounded-2xl border text-left cursor-pointer transition-all hover:scale-[1.015] active:scale-[0.99] flex items-center justify-between gap-3.5 shadow-xs hover:shadow-md relative overflow-hidden ${
                  isDarkMode 
                    ? 'bg-gradient-to-br from-[#062419] via-[#051a12] to-[#070b14] border-emerald-900/40 hover:border-emerald-500/60' 
                    : 'bg-gradient-to-br from-[#ecfdf5] via-[#f4fdf8] to-white border-emerald-100/90 hover:border-emerald-300'
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-0 flex-1">
                  <div className="shrink-0 transition-transform group-hover:scale-105">
                    <Icon3DCallingAgents className="w-14 h-14 sm:w-16 sm:h-16" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <h4 className="text-sm sm:text-base font-black text-zinc-950 dark:text-white tracking-tight leading-tight">
                        Arohi Calling Agents
                      </h4>
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-[#00e676] text-zinc-950 shrink-0 shadow-xs">
                        NEW
                      </span>
                    </div>
                    <p className="text-[11px] sm:text-xs text-zinc-600 dark:text-zinc-300 mt-1 leading-snug line-clamp-2 font-medium">
                      AI that speaks. For every business.
                    </p>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200/90 dark:border-zinc-700 flex items-center justify-center text-zinc-700 dark:text-zinc-300 shrink-0 shadow-xs group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600 transition-all">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Product 4: Arohi Exams */}
              <div
                onClick={() => {
                  setActiveTab('exams');
                  onEnter();
                }}
                className={`group p-4 sm:p-5 rounded-2xl border text-left cursor-pointer transition-all hover:scale-[1.015] active:scale-[0.99] flex items-center justify-between gap-3.5 shadow-xs hover:shadow-md ${
                  isDarkMode 
                    ? 'bg-gradient-to-br from-[#2a1d06] via-[#1f1505] to-[#070b14] border-amber-900/40 hover:border-amber-500/60' 
                    : 'bg-gradient-to-br from-[#fffbeb] via-[#fffdf5] to-white border-amber-100/90 hover:border-amber-300'
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-0 flex-1">
                  <div className="shrink-0 transition-transform group-hover:scale-105">
                    <Icon3DExamsCap className="w-14 h-14 sm:w-16 sm:h-16" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm sm:text-base font-black text-zinc-950 dark:text-white tracking-tight leading-tight">
                      Arohi Exams
                    </h4>
                    <p className="text-[11px] sm:text-xs text-zinc-600 dark:text-zinc-300 mt-1 leading-snug line-clamp-2 font-medium">
                      Smarter assessments for a brighter future.
                    </p>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200/90 dark:border-zinc-700 flex items-center justify-center text-zinc-700 dark:text-zinc-300 shrink-0 shadow-xs group-hover:bg-amber-600 group-hover:text-white group-hover:border-amber-600 transition-all">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Product 5: Arohi for Institutions / Govt */}
              <div
                onClick={() => {
                  setActiveTab('institutions');
                  onEnter();
                }}
                className={`group p-4 sm:p-5 rounded-2xl border text-left cursor-pointer transition-all hover:scale-[1.015] active:scale-[0.99] flex items-center justify-between gap-3.5 shadow-xs hover:shadow-md ${
                  isDarkMode 
                    ? 'bg-gradient-to-br from-[#2e0e18] via-[#1e0a10] to-[#070b14] border-rose-900/40 hover:border-rose-500/60' 
                    : 'bg-gradient-to-br from-[#fff1f2] via-[#fff8f8] to-white border-rose-100/90 hover:border-rose-300'
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-0 flex-1">
                  <div className="shrink-0 transition-transform group-hover:scale-105">
                    <Icon3DInstitutions className="w-14 h-14 sm:w-16 sm:h-16" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm sm:text-base font-black text-zinc-950 dark:text-white tracking-tight leading-tight">
                      Arohi for Institutions / Govt
                    </h4>
                    <p className="text-[11px] sm:text-xs text-zinc-600 dark:text-zinc-300 mt-1 leading-snug line-clamp-2 font-medium">
                      Intelligent solutions for a stronger nation.
                    </p>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200/90 dark:border-zinc-700 flex items-center justify-center text-zinc-700 dark:text-zinc-300 shrink-0 shadow-xs group-hover:bg-rose-600 group-hover:text-white group-hover:border-rose-600 transition-all">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Product 6: Opportunities */}
              <div
                onClick={() => {
                  setActiveTab('opportunities');
                  onEnter();
                }}
                className={`group p-4 sm:p-5 rounded-2xl border text-left cursor-pointer transition-all hover:scale-[1.015] active:scale-[0.99] flex items-center justify-between gap-3.5 shadow-xs hover:shadow-md ${
                  isDarkMode 
                    ? 'bg-gradient-to-br from-[#0e172e] via-[#091122] to-[#070b14] border-blue-900/40 hover:border-blue-500/60' 
                    : 'bg-gradient-to-br from-[#eff6ff] via-[#f5f8ff] to-white border-blue-100/90 hover:border-blue-300'
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-0 flex-1">
                  <div className="shrink-0 transition-transform group-hover:scale-105">
                    <Icon3DOpportunities className="w-14 h-14 sm:w-16 sm:h-16" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm sm:text-base font-black text-zinc-950 dark:text-white tracking-tight leading-tight">
                      Opportunities
                    </h4>
                    <p className="text-[11px] sm:text-xs text-zinc-600 dark:text-zinc-300 mt-1 leading-snug line-clamp-2 font-medium">
                      Jobs, scholarships, schemes, careers and more.
                    </p>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200/90 dark:border-zinc-700 flex items-center justify-center text-zinc-700 dark:text-zinc-300 shrink-0 shadow-xs group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>

            </div>

            {/* Mission 87 Flagship Strategic Banner */}
            <div className="pt-2">
              <Mission87HeroBanner
                isDarkMode={isDarkMode}
                onClick={() => {
                  setActiveTab('mission87');
                  onEnter();
                }}
              />
            </div>
          </div>

        </div>

        {/* 3. "Specialized Sovereign Solutions" Section */}
        <div id="solutions-section" className="space-y-4 pt-2">
          
          {/* Section Header Row */}
          <div className="flex items-center justify-between px-1">
            <div>
              <h3 className="text-sm sm:text-base font-bold tracking-tight text-zinc-950 dark:text-white font-display">
                Specialized Sovereign Solutions
              </h3>
              <p className="text-[11px] text-zinc-600 dark:text-zinc-300 font-medium">
                Tailored intelligence across 20+ specialized audiences
              </p>
            </div>

            <button
              onClick={() => setShowAllCategories(!showAllCategories)}
              className="text-xs font-semibold text-[#d4af37] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>{showAllCategories ? 'Show Featured' : 'Browse All (20+)'}</span>
              <ChevronRight className={`w-3.5 h-3.5 transition-transform ${showAllCategories ? 'rotate-90' : ''}`} />
            </button>
          </div>

          {/* Search Bar when expanded */}
          {showAllCategories && (
            <div className="relative">
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-zinc-400" />
              <input 
                type="text" 
                value={categorySearchQuery}
                onChange={(e) => setCategorySearchQuery(e?.target?.value ?? "")}
                placeholder="Search across all 20 audience categories..."
                className={`w-full pl-10 pr-4 py-2.5 text-xs font-medium rounded-xl border outline-none transition-all ${
                  isDarkMode 
                    ? 'bg-[#15171e] border-white/10 text-white placeholder-zinc-500 focus:border-[#d4af37]' 
                    : 'bg-white border-black/8 text-zinc-900 placeholder-zinc-400 focus:border-[#d4af37] shadow-xs'
                }`}
              />
            </div>
          )}

          {/* Category Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
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
                  className={`group relative rounded-xl sm:rounded-2xl p-3 sm:p-4 border transition-all duration-200 cursor-pointer flex flex-col justify-between hover:scale-[1.01] active:scale-[0.99] ${
                    isDarkMode 
                      ? 'bg-[#15171e] border-white/6 hover:border-[#d4af37]/40 shadow-xs' 
                      : 'bg-white border-black/7 hover:border-black/20 shadow-xs'
                  }`}
                >
                  <div>
                    {/* Top Icon Badge */}
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-2.5 bg-black/5 dark:bg-white/5 text-zinc-700 dark:text-zinc-200 group-hover:text-[#d4af37] transition-colors">
                      <IconComp className="w-4 h-4" />
                    </div>

                    {/* Title */}
                    <h4 className="text-xs sm:text-sm font-bold tracking-tight leading-snug truncate text-zinc-950 dark:text-white">
                      {cat.title}
                    </h4>

                    {/* Subtitle */}
                    <p className="text-[10px] sm:text-xs text-zinc-600 dark:text-zinc-300 mt-1 leading-snug line-clamp-2 font-medium">
                      {cat.subtitle}
                    </p>
                  </div>

                  {/* Arrow Action Pill */}
                  <div className="flex justify-end mt-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center bg-black/5 dark:bg-white/5 text-zinc-400 group-hover:text-[#d4af37] group-hover:bg-[#d4af37]/10 transition-all">
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* 4. Trust & Sovereign Assurance Bar */}
        <div className={`rounded-xl p-3 border grid grid-cols-2 sm:grid-cols-4 gap-2 text-center transition-colors ${
          isDarkMode 
            ? 'bg-[#15171e] border-white/6 text-zinc-300' 
            : 'bg-white border-black/7 text-zinc-700 shadow-xs'
        }`}>
          <div className="flex flex-col items-center justify-center p-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500 mb-1" />
            <span className="text-xs font-bold leading-tight text-zinc-950 dark:text-white">100% Sovereign &amp; Safe</span>
            <span className="text-[9.5px] text-zinc-600 dark:text-zinc-300 leading-tight mt-0.5 font-medium">Encrypted client-side</span>
          </div>

          <div className="flex flex-col items-center justify-center p-1.5">
            <Globe className="w-4 h-4 text-[#d4af37] mb-1" />
            <span className="text-xs font-bold leading-tight text-zinc-950 dark:text-white">150+ Languages</span>
            <span className="text-[9.5px] text-zinc-600 dark:text-zinc-300 leading-tight mt-0.5 font-medium">Voice &amp; text in native script</span>
          </div>

          <div className="flex flex-col items-center justify-center p-1.5">
            <Zap className="w-4 h-4 text-amber-500 mb-1" />
            <span className="text-xs font-bold leading-tight text-zinc-950 dark:text-white">1M+ Daily Inquiries</span>
            <span className="text-[9.5px] text-zinc-600 dark:text-zinc-300 leading-tight mt-0.5 font-medium">Autonomous resolution</span>
          </div>

          <div className="flex flex-col items-center justify-center p-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 mb-1" />
            <span className="text-xs font-bold leading-tight text-zinc-950 dark:text-white">99.9% Uptime SLA</span>
            <span className="text-[9.5px] text-zinc-600 dark:text-zinc-300 leading-tight mt-0.5 font-medium">Resilient multi-engine</span>
          </div>
        </div>

        {/* 5. Arohi AI Membership / Upgrade Banner */}
        {hasActiveSubscription ? (
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 bg-gradient-to-r from-[#0a2315] via-[#0d331e] to-[#124528] text-white shadow-xl border border-emerald-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            {/* Crown Watermark */}
            <Crown className="absolute right-12 bottom-[-15px] sm:right-24 sm:bottom-[-20px] w-28 sm:w-40 h-28 sm:h-40 text-emerald-400/15 pointer-events-none" />

            <div className="relative z-10 space-y-1 text-left min-w-0 flex-1">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h4 className="text-sm sm:text-lg font-bold tracking-tight text-white whitespace-nowrap">{subscriptionPlanName}</h4>
                <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-300 fill-emerald-300 shrink-0" />
                <span className="bg-emerald-500/30 text-emerald-300 border border-emerald-400/50 text-[9px] font-black uppercase px-2 py-0.5 rounded-full tracking-wider flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Active &amp; Protected
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-emerald-100/90 font-medium leading-snug">
                Your subscription is active for 30 days. Enjoy full access to all LLM &amp; LMM capabilities, multimodal agents, and career tools.
              </p>
            </div>

            <button
              type="button"
              id="welcome-manage-membership-btn"
              onClick={() => {
                setActiveTab('pricing');
                onEnter();
              }}
              className="relative z-10 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-emerald-400 to-teal-300 text-slate-950 hover:from-emerald-300 hover:to-teal-200 text-xs sm:text-sm font-black tracking-tight shadow-lg hover:scale-105 active:scale-95 transition-all shrink-0 flex items-center gap-1 cursor-pointer whitespace-nowrap"
            >
              <span>Manage Membership</span>
              <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-950" />
            </button>
          </div>
        ) : (
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
              type="button"
              id="welcome-upgrade-bottom-btn"
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
        )}

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
                isDarkMode ? 'bg-[#080c18] border-r border-blue-950/70 text-white' : 'bg-white border-r border-slate-200 text-slate-900 shadow-xl'
              }`}
            >
              <div className="space-y-6">
                
                {/* Header inside Drawer */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-blue-950/60">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-full overflow-hidden shrink-0 border border-blue-500/40">
                      <ArohiAvatar className="w-full h-full" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-sm">Arohi AI</h3>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400">Opportunity Engine</p>
                    </div>
                  </div>

                  <button 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-blue-950/40 cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Mobile Drawer Auth Header */}
                <div className="p-3 bg-gradient-to-r from-blue-950/70 via-indigo-950/60 to-blue-900/60 dark:bg-gradient-to-r dark:from-blue-950/70 dark:via-indigo-950/60 dark:to-blue-900/60 rounded-2xl border border-blue-500/30 flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5 min-w-0 pr-2">
                    <div className="w-8 h-8 rounded-full bg-blue-600/30 flex items-center justify-center text-blue-400 shrink-0 border border-blue-400/30">
                      <User className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-white truncate">{user ? currentUserName : 'Welcome Guest'}</p>
                      <p className="text-[10px] text-blue-200 truncate">{user ? (user.email || 'Signed in') : 'Sign in to save your sessions'}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      if (onOpenAuth) onOpenAuth();
                      else if (setActiveTab) setActiveTab('profile');
                    }}
                    className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-extrabold shadow-md shrink-0 cursor-pointer"
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
                      setActiveTab('mission87');
                      onEnter();
                    }}
                    className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-bold bg-gradient-to-r from-amber-500/15 via-blue-500/10 to-emerald-500/15 border border-amber-500/30 text-amber-300 hover:bg-amber-500/20 flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base">🇮🇳</span>
                      <span>Mission 87 (Youth Movement)</span>
                    </div>
                    <span className="text-[9px] font-black uppercase bg-gradient-to-r from-amber-400 to-emerald-400 text-slate-950 px-1.5 py-0.5 rounded-md">
                      Free Pass
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setActiveTab('arohi');
                      onEnter();
                    }}
                    className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:text-blue-600 dark:hover:text-blue-400 flex items-center justify-between cursor-pointer"
                  >
                    <span>Voice Call & Chat</span>
                    <Sparkles className="w-4 h-4 text-blue-500" />
                  </button>

                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setActiveTab('mocktests');
                      onEnter();
                    }}
                    className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-bold bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/30 text-amber-600 dark:text-amber-300 hover:bg-amber-500/20 flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-amber-500" />
                      <span>Arohi Exams™ (CBT Tests)</span>
                    </div>
                    <span className="text-[9px] font-black uppercase bg-amber-400 text-slate-950 px-1.5 py-0.5 rounded-md">
                      Hot
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setActiveTab('business-os');
                      onEnter();
                    }}
                    className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-bold bg-cyan-500/10 dark:bg-cyan-500/15 border border-cyan-500/30 text-cyan-600 dark:text-cyan-300 hover:bg-cyan-500/20 flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-cyan-400" />
                      <span>AROHI ONE™ (Business OS)</span>
                    </div>
                    <span className="text-[9px] font-black uppercase bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 px-1.5 py-0.5 rounded-md">
                      New
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setActiveTab('syllabus');
                      onEnter();
                    }}
                    className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:text-blue-600 dark:hover:text-blue-400 flex items-center justify-between cursor-pointer"
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
                    className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:text-blue-600 dark:hover:text-blue-400 flex items-center justify-between cursor-pointer"
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
                    className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:text-blue-600 dark:hover:text-blue-400 flex items-center justify-between cursor-pointer"
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
                    <span className="text-[9px] font-bold text-blue-600 dark:text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded-full border border-blue-500/20">
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
                          ? 'bg-[#0c1224] border-blue-950 text-slate-100 placeholder:text-slate-500 focus:border-blue-500'
                          : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-blue-400'
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
                              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-400 shadow-md shadow-blue-900/30'
                              : isDarkMode
                              ? 'bg-[#0c1224] hover:bg-[#121b36] border-blue-950/70 text-slate-200 hover:border-blue-500/40'
                              : 'bg-slate-100 hover:bg-blue-50 border-slate-200 text-slate-700 hover:text-blue-700'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-1">
                            <span className="text-xs font-bold truncate">{l.native}</span>
                            {isSelected && (
                              <span className="w-1.5 h-1.5 rounded-full bg-[#00e676] shrink-0 shadow-[0_0_6px_#00e676]"></span>
                            )}
                          </div>
                          {l.native !== l.english && (
                            <span className={`text-[9px] truncate ${isSelected ? 'text-blue-200' : 'text-slate-400'}`}>
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
              <div className="pt-6 border-t border-slate-200 dark:border-blue-950/60 space-y-3">
                {onShare && (
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onShare();
                    }}
                    className="w-full px-4 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all active:scale-95"
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

      {/* DIRECT VOICE CALL MODAL PORTAL */}
      {isDirectVoiceCallModalOpen && createPortal(
        <div className="fixed inset-0 z-[9999] bg-[#070514] text-white overflow-hidden">
          <ArohiVoiceCall 
            onClose={() => setIsDirectVoiceCallModalOpen(false)} 
            language={language} 
            onNavigateTab={(tab) => {
              setIsDirectVoiceCallModalOpen(false);
              setActiveTab(tab);
              onEnter();
            }}
            uid={user?.uid}
          />
        </div>,
        document.body
      )}

    </div>
  );
}
