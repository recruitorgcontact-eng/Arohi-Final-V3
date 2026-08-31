import React, { useState, useEffect } from 'react';
import { 
  Trophy, Flame, Award, Zap, Shield, Crown, Sparkles, 
  ChevronRight, Swords, Users, Skull, Puzzle, Target, 
  Coins, Gem, Bell, CheckCircle2, ArrowRight, Star, 
  ArrowLeft, RefreshCw, X, Play, Volume2, VolumeX,
  Timer, HelpCircle, Gift, ShoppingBag, Lock, Check,
  TrendingUp, BarChart3, BookOpen, AlertCircle, Share2,
  Heart, Compass, Search, Filter, Layers, ChevronDown
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { audioEngine } from '../../utils/audioEngine';
import { arohiArenaVoice } from '../../utils/arohiArenaVoice';
import { 
  ARENA_CLASS_TRACKS, 
  ARENA_SUBJECTS_LIST, 
  generateArenaQuestionSet, 
  ArenaQuestion, 
  ClassTrack 
} from '../../utils/arenaQuestionEngine';

interface ArohiExamsArenaProps {
  isDarkMode?: boolean;
  onBackToExams?: () => void;
  onNavigateTab?: (tab: string) => void;
  onOpenAuth?: () => void;
}

// Interactive Game Modal Types
type ActiveGameModal = 
  | 'none' 
  | 'quick_duel' 
  | 'squad_battle' 
  | 'boss_battle' 
  | 'survival' 
  | 'puzzle' 
  | 'weakness_quest' 
  | 'tournament_details' 
  | 'leaderboard_full' 
  | 'shop' 
  | 'rewards'
  | 'profile'
  | 'class_picker'
  | 'subject_picker';

interface TournamentItem {
  id: string;
  daysLeft: number;
  title: string;
  category: string;
  prizePool: string;
  participants: string;
  themeColor: 'amber' | 'purple' | 'cyan' | 'emerald';
  badgeBg: string;
  btnBg: string;
  description: string;
  schedule: { stage: string; days: string; details: string }[];
  prizes: { rank: string; amount: string }[];
}

const TOURNAMENTS_DATA: TournamentItem[] = [
  {
    id: 'maths_champ',
    daysLeft: 15,
    title: 'NATIONAL MATHS CHAMPIONSHIP',
    category: 'Mathematics',
    prizePool: '₹50,000',
    participants: '12,458+',
    themeColor: 'amber',
    badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    btnBg: 'bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-slate-950 font-black shadow-lg shadow-amber-500/25',
    description: '30-day knockout championship testing mental math, calculus, algebra, geometry, and real-world logic.',
    schedule: [
      { stage: 'Day 1–5', days: 'Qualifiers', details: 'Top 5,000 students advance' },
      { stage: 'Day 6–15', days: 'Regional Battles', details: 'State & district ranking rounds' },
      { stage: 'Day 16–25', days: 'Elite Knockouts', details: '1v1 speed calculation brackets' },
      { stage: 'Day 26–29', days: 'Semi-Finals', details: 'Top 50 finalists live battle' },
      { stage: 'Day 30', days: '🏆 Grand Final', details: 'National live streamed championship' }
    ],
    prizes: [
      { rank: '🥇 National Champion', amount: '₹50,000' },
      { rank: '🥈 Runner-up', amount: '₹25,000' },
      { rank: '🥉 Third Place', amount: '₹10,000' },
      { rank: 'Top 10 Finalists', amount: '₹5,000 each' },
      { rank: '📈 Biggest Improvement Award', amount: '₹5,000' },
      { rank: '⚡ Most Consistent Streak', amount: '₹2,500' }
    ]
  },
  {
    id: 'science_league',
    daysLeft: 18,
    title: 'ALL-INDIA SCIENCE LEAGUE',
    category: 'Physics, Chemistry & Biology',
    prizePool: '₹35,000',
    participants: '8,732+',
    themeColor: 'purple',
    badgeBg: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
    btnBg: 'bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 text-white font-black shadow-lg shadow-purple-600/25',
    description: 'Competitive scenario-based science laboratory simulations and concept application challenges.',
    schedule: [
      { stage: 'Day 1–7', days: 'Concept League', details: 'Physics & Chemistry fundamentals' },
      { stage: 'Day 8–18', days: 'Lab Master Battles', details: 'Scenario based numerical trials' }
    ],
    prizes: [
      { rank: '🥇 Champion', amount: '₹35,000' },
      { rank: '🥈 Runner-up', amount: '₹15,000' },
      { rank: '🥉 Third', amount: '₹7,500' },
      { rank: '🎯 Weakness Crusher Award', amount: '₹2,500' }
    ]
  },
  {
    id: 'english_cup',
    daysLeft: 22,
    title: 'ENGLISH MASTERS CUP',
    category: 'Grammar, Vocabulary & Comprehension',
    prizePool: '₹25,000',
    participants: '6,921+',
    themeColor: 'cyan',
    badgeBg: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
    btnBg: 'bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-600 text-slate-950 font-black shadow-lg shadow-cyan-500/25',
    description: 'Fast-paced verbal ability, sentence correction, reading comprehension, and speed grammar arena.',
    schedule: [
      { stage: 'Day 1–10', days: 'Vocabulary Sprint', details: 'Speed anagrams & grammar duels' },
      { stage: 'Day 11–22', days: 'Grand Cup Finals', details: 'Timed reading analysis' }
    ],
    prizes: [
      { rank: '🥇 Champion', amount: '₹25,000' },
      { rank: '🥈 Runner-up', amount: '₹10,000' },
      { rank: '🥉 Third', amount: '₹5,000' }
    ]
  },
  {
    id: 'gk_arena',
    daysLeft: 30,
    title: 'BHARAT GENERAL KNOWLEDGE CUP',
    category: 'Current Affairs & General Studies',
    prizePool: '₹15,000',
    participants: '5,210+',
    themeColor: 'emerald',
    badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    btnBg: 'bg-gradient-to-r from-emerald-500 via-teal-600 to-emerald-600 text-slate-950 font-black shadow-lg shadow-emerald-500/25',
    description: 'All-India General Knowledge cup spanning Indian History, Constitution, Science, and World Geography.',
    schedule: [
      { stage: 'Day 1–15', days: 'Open Qualifiers', details: 'Daily 20-question rapid rounds' },
      { stage: 'Day 16–30', days: 'National Finals', details: 'Live buzzer battle round' }
    ],
    prizes: [
      { rank: '🥇 Champion', amount: '₹15,000' },
      { rank: '🥈 Runner-up', amount: '₹7,500' },
      { rank: '🥉 Third', amount: '₹3,000' }
    ]
  }
];

// Sample Duel Questions for the 1v1 Battle Engine
const DUEL_QUESTIONS = [
  {
    question: "If 3x + 5 = 20, what is the value of 6x - 4?",
    options: ["26", "30", "15", "22"],
    correctIndex: 0,
    hint: "Solve 3x = 15 => x = 5. Then compute 6(5) - 4.",
    explanation: "3x = 20 - 5 = 15 => x = 5. Then 6(5) - 4 = 30 - 4 = 26."
  },
  {
    question: "Which organelle is universally known as the powerhouse of the cell?",
    options: ["Golgi Apparatus", "Mitochondria", "Ribosome", "Endoplasmic Reticulum"],
    correctIndex: 1,
    hint: "It generates most of the chemical energy (ATP) needed for cellular biochemical reactions.",
    explanation: "Mitochondria generate ATP through cellular respiration, earning the title 'powerhouse of the cell'."
  },
  {
    question: "What is the perimeter of a rectangle with length 14 cm and width 8 cm?",
    options: ["44 cm", "112 cm", "36 cm", "48 cm"],
    correctIndex: 0,
    hint: "Perimeter = 2 × (Length + Width).",
    explanation: "Perimeter = 2 × (14 + 8) = 2 × 22 = 44 cm."
  },
  {
    question: "What is the value of sin 30° + cos 60°?",
    options: ["0", "1", "1/2", "√3/2"],
    correctIndex: 1,
    hint: "sin 30° = 1/2 and cos 60° = 1/2.",
    explanation: "sin 30° = 0.5, cos 60° = 0.5. Sum = 0.5 + 0.5 = 1."
  },
  {
    question: "Which of the following is the fastest speed of light in a vacuum?",
    options: ["3 × 10⁸ m/s", "3 × 10⁶ m/s", "3 × 10⁵ km/s", "Both A and C"],
    correctIndex: 3,
    hint: "3 × 10⁸ m/s equals 300,000 km/s (3 × 10⁵ km/s).",
    explanation: "Light travels at approx 300,000 km/s or 3 × 10⁸ meters per second. Both A and C represent the exact same speed."
  }
];

// Arohi Inspiring Grand Tournament Motivational Lines (Ambient Blinking & Rotating)
const AROHI_MOTIVATIONAL_LINES = [
  "⚡ Arohi: 'Victory belongs to the most persevering — fight for every single mark!'",
  "🏆 Arohi: 'Your All-India Rank is forged in the silence of daily disciplined practice.'",
  "✨ Arohi: 'Champions train when no one is watching. Stay laser-focused on the crown!'",
  "🎯 Arohi: 'Turn your exam anxiety into unstoppable tactical precision!'",
  "💎 Arohi: 'Every weak concept you master today is a golden trophy in your vault!'",
  "🔥 Arohi: 'Consistency beats raw talent when talent fails to practice daily!'",
  "⚔️ Arohi: 'One question at a time. Breathe, analyze with precision, and conquer the Arena!'",
  "🌟 Arohi: 'Believe in your preparation. You are built for greatness and national success!'",
  "🚀 Arohi: 'Speed with accuracy creates champions — master your tempo and rise!'"
];

export default function ArohiExamsArena({
  isDarkMode = true,
  onBackToExams,
  onNavigateTab,
  onOpenAuth
}: ArohiExamsArenaProps) {
  const { user, userData, updateArenaStats } = useAuth();

  // User Profile in Arena
  const rawDisplayName = 
    userData?.profile?.name || 
    userData?.displayName || 
    user?.displayName || 
    (user?.email ? user.email.split('@')[0] : 'Aarav Nayak');

  const playerName = rawDisplayName || 'Aarav Nayak';

  // Gamified Economy & Stats State (Persisted in localStorage)
  const [energy, setEnergy] = useState<number>(() => {
    return Number(localStorage.getItem('arohi_arena_energy') || 120);
  });
  const [goldCoins, setGoldCoins] = useState<number>(() => {
    return Number(localStorage.getItem('arohi_arena_coins') || 12450);
  });
  const [gems, setGems] = useState<number>(() => {
    return Number(localStorage.getItem('arohi_arena_gems') || 267);
  });
  const [xp, setXp] = useState<number>(() => {
    return Number(localStorage.getItem('arohi_arena_xp') || 12450);
  });
  const [level, setLevel] = useState<number>(18);
  const [winningStreak, setWinningStreak] = useState<number>(12);
  const [dailyRewardClaimed, setDailyRewardClaimed] = useState<boolean>(() => {
    return localStorage.getItem('arohi_arena_daily_claimed') === new Date().toISOString().slice(0, 10);
  });

  // Active Navigation & Modals State
  const [activeTab, setActiveTab] = useState<string>('home');
  const [activeLeaderboardTab, setActiveLeaderboardTab] = useState<'india' | 'state' | 'school' | 'friends'>('india');
  const [activeModal, setActiveModal] = useState<ActiveGameModal>('none');
  const [selectedTournament, setSelectedTournament] = useState<TournamentItem | null>(null);
  const [registeredTournamentIds, setRegisteredTournamentIds] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('arohi_registered_tournaments') || '[]');
    } catch {
      return [];
    }
  });

  const handleRegisterTournament = (tournament: TournamentItem) => {
    try { audioEngine.playSuccess(); } catch {}
    if (!registeredTournamentIds.includes(tournament.id)) {
      const updated = [...registeredTournamentIds, tournament.id];
      setRegisteredTournamentIds(updated);
      try {
        localStorage.setItem('arohi_registered_tournaments', JSON.stringify(updated));
      } catch {}
      setGoldCoins(prev => prev + 250);
      setGems(prev => prev + 5);
      arohiArenaVoice.announceTournamentJoined(tournament.title, tournament.prizePool);
    } else {
      arohiArenaVoice.speak(`You are already registered for ${tournament.title}! Your seat is confirmed.`);
    }
  };

  // Ambient Arohi Motivation Rotator
  const [motivationIndex, setMotivationIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMotivationIndex((prev) => (prev + 1) % AROHI_MOTIVATIONAL_LINES.length);
    }, 4800);
    return () => clearInterval(interval);
  }, []);

  // ==============================================================
  // CLASS-WISE & SUBJECT-WISE DYNAMIC QUESTION ARENA STATE
  // ==============================================================
  const [selectedClassTrack, setSelectedClassTrack] = useState<string>(() => {
    return localStorage.getItem('arohi_arena_class_track') || 'class_secondary';
  });
  const [selectedSubject, setSelectedSubject] = useState<string>(() => {
    return localStorage.getItem('arohi_arena_subject') || 'All Combined (Grand Clash)';
  });

  const currentClassTrackObj = 
    ARENA_CLASS_TRACKS.find(t => t.id === selectedClassTrack) || ARENA_CLASS_TRACKS[2];

  const handleSelectClassTrack = (trackId: string) => {
    setSelectedClassTrack(trackId);
    try {
      localStorage.setItem('arohi_arena_class_track', trackId);
      audioEngine.playSuccess();
    } catch {}
    const track = ARENA_CLASS_TRACKS.find(t => t.id === trackId);
    if (track) {
      arohiArenaVoice.speak(`Class Track updated to ${track.name}. Prepare for battle!`);
    }
  };

  const handleSelectSubject = (subjectName: string) => {
    setSelectedSubject(subjectName);
    try {
      localStorage.setItem('arohi_arena_subject', subjectName);
      audioEngine.playButtonTap();
    } catch {}
    arohiArenaVoice.speak(`Subject set to ${subjectName}. Loading unique questions!`);
  };

  // Weak Areas State
  const [weakAreas, setWeakAreas] = useState([
    { id: 'trig', topic: 'Trigonometry', accuracy: 41, status: 'Needs Focus', textCol: 'text-rose-400', barCol: 'bg-rose-500' },
    { id: 'alg', topic: 'Algebra', accuracy: 56, status: 'Improving', textCol: 'text-amber-400', barCol: 'bg-amber-500' },
    { id: 'geo', topic: 'Geometry', accuracy: 68, status: 'Average', textCol: 'text-yellow-400', barCol: 'bg-yellow-500' },
    { id: 'stat', topic: 'Statistics', accuracy: 82, status: 'Strong', textCol: 'text-emerald-400', barCol: 'bg-emerald-500' }
  ]);

  // DUEL ENGINE STATE (Dynamic Unlimited Questions)
  const [duelQuestions, setDuelQuestions] = useState<ArenaQuestion[]>([]);
  const [duelPhase, setDuelPhase] = useState<'searching' | 'battle' | 'result'>('searching');
  const [duelOpponent, setDuelOpponent] = useState({
    name: 'Rahul Sharma',
    location: 'Delhi',
    level: 17,
    avatarSeed: 'opponent',
    score: 0
  });
  const [duelCurrentQIndex, setDuelCurrentQIndex] = useState(0);
  const [duelUserScore, setDuelUserScore] = useState(0);
  const [duelSelectedOption, setDuelSelectedOption] = useState<number | null>(null);
  const [duelTimeLeft, setDuelTimeLeft] = useState(15);
  const [duelArohiMessage, setDuelArohiMessage] = useState("Ready, Champion? Show your speed & accuracy!");
  const [duelStreak, setDuelStreak] = useState(0);

  // 4v4 SQUAD BATTLE ENGINE STATE
  const [squadQuestions, setSquadQuestions] = useState<ArenaQuestion[]>([]);
  const [squadPhase, setSquadPhase] = useState<'lineup' | 'battle' | 'result'>('battle');
  const [squadQIndex, setSquadQIndex] = useState(0);
  const [squadUserScore, setSquadUserScore] = useState(0);
  const [squadTeamScore, setSquadTeamScore] = useState(0);
  const [squadOpponentScore, setSquadOpponentScore] = useState(0);
  const [squadSelectedOpt, setSquadSelectedOpt] = useState<number | null>(null);
  const [squadTimeLeft, setSquadTimeLeft] = useState(15);
  const [squadTeammates, setSquadTeammates] = useState([
    { name: playerName, role: 'Captain', score: 0, isUser: true },
    { name: 'Pooja Reddy', role: 'Science Ace', score: 0, isUser: false },
    { name: 'Vikram Patel', role: 'Speed Ace', score: 0, isUser: false },
    { name: 'Ananya Sen', role: 'Logic Master', score: 0, isUser: false },
  ]);

  // BOSS BATTLE ENGINE STATE
  const [bossHp, setBossHp] = useState(100);
  const [bossPlayerHp, setBossPlayerHp] = useState(100);
  const [bossQuestions, setBossQuestions] = useState<ArenaQuestion[]>([]);
  const [bossQIndex, setBossQIndex] = useState(0);
  const [bossPhase, setBossPhase] = useState<'battle' | 'victory' | 'defeat'>('battle');
  const [bossSelectedOpt, setBossSelectedOpt] = useState<number | null>(null);
  const [bossTimeLeft, setBossTimeLeft] = useState(15);
  const [bossInfo, setBossInfo] = useState({
    name: 'THE QUANTUM DRAGON',
    title: 'Lord of Mechanics & Quantum Realms',
    avatarBg: 'bg-rose-600/20 border-rose-500 text-rose-400',
    attackName: 'Quantum Heat Wave'
  });

  // SURVIVAL GAUNTLET (ENDLESS) STATE
  const [survivalQuestions, setSurvivalQuestions] = useState<ArenaQuestion[]>([]);
  const [survivalQIndex, setSurvivalQIndex] = useState(0);
  const [survivalLives, setSurvivalLives] = useState(3);
  const [survivalScore, setSurvivalScore] = useState(0);
  const [survivalStreak, setSurvivalStreak] = useState(0);
  const [survivalMultiplier, setSurvivalMultiplier] = useState(1);
  const [survivalBestScore, setSurvivalBestScore] = useState(() => {
    return Number(localStorage.getItem('arohi_arena_survival_best') || 0);
  });
  const [survivalPhase, setSurvivalPhase] = useState<'playing' | 'gameover'>('playing');
  const [survivalSelectedOpt, setSurvivalSelectedOpt] = useState<number | null>(null);
  const [survivalTimeLeft, setSurvivalTimeLeft] = useState(15);

  // WEAKNESS QUEST ENGINE STATE
  const [questTargetTopic, setQuestTargetTopic] = useState('Trigonometry');
  const [questQuestions, setQuestQuestions] = useState<ArenaQuestion[]>([]);
  const [questQIndex, setQuestQIndex] = useState(0);
  const [questSelectedOpt, setQuestSelectedOpt] = useState<number | null>(null);
  const [questPhase, setQuestPhase] = useState<'select' | 'battle' | 'mastered'>('battle');
  const [questInitialPower, setQuestInitialPower] = useState(41);
  const [questFinalPower, setQuestFinalPower] = useState(74);

  // AROHI ARENA FLAGSHIP VOICE STATE & CONTROLLER
  const [isVoiceMuted, setIsVoiceMuted] = useState<boolean>(() => arohiArenaVoice.isMuted());
  const [isArohiSpeaking, setIsArohiSpeaking] = useState<boolean>(() => arohiArenaVoice.getSpeakingState());

  useEffect(() => {
    const unsubSpeak = arohiArenaVoice.subscribeSpeaking(setIsArohiSpeaking);
    const unsubMute = arohiArenaVoice.subscribeMute(setIsVoiceMuted);

    // Flagship Arohi Voice Initial Welcome Announcement
    const timer = setTimeout(() => {
      arohiArenaVoice.announceArenaWelcome();
    }, 600);

    return () => {
      unsubSpeak();
      unsubMute();
      clearTimeout(timer);
      arohiArenaVoice.stopSpeaking();
    };
  }, []);

  // Sync Arena State to Firestore automatically for logged-in user
  useEffect(() => {
    if (user?.uid) {
      const statsPayload = {
        coins: goldCoins,
        gems,
        registeredTournaments: registeredTournamentIds,
        classTrack: selectedClassTrack,
        targetSubject: selectedSubject,
        survivalHighScore: survivalBestScore,
        dailyClaimedDate: localStorage.getItem('arohi_arena_daily_claimed') || '',
        lastPlayedAt: new Date().toISOString()
      };
      updateArenaStats(statsPayload).catch(err => {
        console.warn('Arena cloud sync note:', err);
      });
    }
  }, [goldCoins, gems, registeredTournamentIds, selectedClassTrack, selectedSubject, survivalBestScore, user?.uid]);

  // CLAIM DAILY REWARD HANDLER
  const handleClaimDailyReward = () => {
    if (dailyRewardClaimed) return;
    try {
      audioEngine.playSuccess();
    } catch {}
    const bonusCoins = 500;
    const bonusGems = 15;
    const newCoins = goldCoins + bonusCoins;
    const newGems = gems + bonusGems;
    setGoldCoins(newCoins);
    setGems(newGems);
    setDailyRewardClaimed(true);
    localStorage.setItem('arohi_arena_coins', String(newCoins));
    localStorage.setItem('arohi_arena_gems', String(newGems));
    localStorage.setItem('arohi_arena_daily_claimed', new Date().toISOString().slice(0, 10));
    
    // Spoken by Flagship Arohi Voice
    arohiArenaVoice.announceRewardClaimed(bonusCoins, bonusGems);
  };

  // ==============================================================
  // 1. START 1v1 QUICK DUEL (With Unlimited Unique Questions)
  // ==============================================================
  const handleStartQuickDuel = () => {
    try {
      audioEngine.playButtonTap();
    } catch {}

    // Generate fresh unique questions based on active class & subject
    const freshQuestions = generateArenaQuestionSet(selectedClassTrack, selectedSubject, 5, 'medium');
    setDuelQuestions(freshQuestions);

    setDuelPhase('searching');
    setDuelUserScore(0);
    const randomOpponent = {
      name: ['Rahul Sharma', 'Ananya Sen', 'Vikram Patel', 'Pooja Reddy', 'Tanya Mishra', 'Rohan Gupta'][Math.floor(Math.random() * 6)],
      location: ['Odisha', 'Delhi', 'Karnataka', 'Maharashtra', 'West Bengal', 'Telangana'][Math.floor(Math.random() * 6)],
      level: 17 + Math.floor(Math.random() * 3),
      avatarSeed: 'opponent',
      score: 0
    };
    setDuelOpponent(randomOpponent);
    setDuelCurrentQIndex(0);
    setDuelSelectedOption(null);
    setDuelTimeLeft(15);
    setDuelStreak(0);
    setDuelArohiMessage(`Searching for student challenger in ${currentClassTrackObj.name}...`);
    setActiveModal('quick_duel');

    // Simulate instant matching in 1.4s
    setTimeout(() => {
      setDuelPhase('battle');
      setDuelArohiMessage(`⚔️ Match Found! You're facing ${randomOpponent.name} on ${selectedSubject}. Question 1 is live!`);
      // Spoken by Flagship Arohi Voice
      arohiArenaVoice.announceDuelMatchFound(randomOpponent.name, selectedSubject);
    }, 1400);
  };

  // DUEL TIMER
  useEffect(() => {
    if (activeModal === 'quick_duel' && duelPhase === 'battle' && duelTimeLeft > 0 && duelSelectedOption === null) {
      const timer = setTimeout(() => {
        setDuelTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (activeModal === 'quick_duel' && duelPhase === 'battle' && duelTimeLeft === 0 && duelSelectedOption === null) {
      handleAnswerDuelQuestion(-1);
    }
  }, [activeModal, duelPhase, duelTimeLeft, duelSelectedOption]);

  const handleAnswerDuelQuestion = (optIdx: number) => {
    setDuelSelectedOption(optIdx);
    const currentQ = duelQuestions[duelCurrentQIndex] || duelQuestions[0];
    if (!currentQ) return;
    const isCorrect = optIdx === currentQ.correctIndex;

    const opponentCorrect = Math.random() < 0.75;
    if (opponentCorrect) {
      setDuelOpponent(prev => ({ ...prev, score: prev.score + 10 }));
    }

    if (isCorrect) {
      try { audioEngine.playCorrect(); } catch {}
      const timeBonus = Math.max(1, Math.floor(duelTimeLeft / 2));
      const points = 10 + timeBonus;
      const nextStreak = duelStreak + 1;
      setDuelUserScore(prev => prev + points);
      setDuelStreak(nextStreak);
      setDuelArohiMessage(`🔥 BOOM! Correct! +${points} pts (Speed Bonus). You lead!`);
      arohiArenaVoice.announceStreak(nextStreak);
    } else {
      try { audioEngine.playIncorrect(); } catch {}
      setDuelStreak(0);
      setDuelArohiMessage("⚠️ Concept note: " + currentQ.explanation);
      arohiArenaVoice.announceIncorrect();
    }

    // Proceed to next question or results
    setTimeout(() => {
      if (duelCurrentQIndex + 1 < duelQuestions.length) {
        setDuelCurrentQIndex(prev => prev + 1);
        setDuelSelectedOption(null);
        setDuelTimeLeft(15);
      } else {
        setDuelPhase('result');
        const won = duelUserScore > duelOpponent.score;
        if (won) {
          try { audioEngine.playSuccess(); } catch {}
          setGoldCoins(c => c + 150);
          setXp(x => x + 250);
          setGems(g => g + 5);
          setWinningStreak(s => s + 1);
          setDuelArohiMessage(`🏆 VICTORY! You defeated ${duelOpponent.name} and climbed the India ranking!`);
          arohiArenaVoice.announceDuelVictory(duelUserScore, 150, 250);
        } else {
          setDuelArohiMessage("Close match! Keep sharpening your skills in Weakness Quest.");
          arohiArenaVoice.announceDuelDefeat(duelUserScore);
        }
      }
    }, 1400);
  };

  // ==============================================================
  // 2. START 4v4 SQUAD BATTLE
  // ==============================================================
  const handleStartSquadBattle = () => {
    try { audioEngine.playButtonTap(); } catch {}
    const freshSquadQ = generateArenaQuestionSet(selectedClassTrack, selectedSubject, 4, 'medium');
    setSquadQuestions(freshSquadQ);
    setSquadQIndex(0);
    setSquadUserScore(0);
    setSquadTeamScore(0);
    setSquadOpponentScore(0);
    setSquadSelectedOpt(null);
    setSquadTimeLeft(15);
    setSquadTeammates([
      { name: playerName, role: 'Captain', score: 0, isUser: true },
      { name: 'Pooja Reddy', role: 'Science Ace', score: 0, isUser: false },
      { name: 'Vikram Patel', role: 'Speed Ace', score: 0, isUser: false },
      { name: 'Ananya Sen', role: 'Logic Master', score: 0, isUser: false },
    ]);
    setSquadPhase('battle');
    setActiveModal('squad_battle');
    arohiArenaVoice.speak(`4v4 Squad Battle started in ${selectedSubject}! Coordinate with Pooja, Vikram, and Ananya.`);
  };

  // SQUAD TIMER
  useEffect(() => {
    if (activeModal === 'squad_battle' && squadPhase === 'battle' && squadTimeLeft > 0 && squadSelectedOpt === null) {
      const timer = setTimeout(() => {
        setSquadTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (activeModal === 'squad_battle' && squadPhase === 'battle' && squadTimeLeft === 0 && squadSelectedOpt === null) {
      handleAnswerSquadQuestion(-1);
    }
  }, [activeModal, squadPhase, squadTimeLeft, squadSelectedOpt]);

  const handleAnswerSquadQuestion = (optIdx: number) => {
    setSquadSelectedOpt(optIdx);
    const currentQ = squadQuestions[squadQIndex] || squadQuestions[0];
    if (!currentQ) return;
    const isCorrect = optIdx === currentQ.correctIndex;

    const userPts = isCorrect ? (10 + Math.max(1, Math.floor(squadTimeLeft / 2))) : 0;
    if (isCorrect) {
      try { audioEngine.playCorrect(); } catch {}
    } else {
      try { audioEngine.playIncorrect(); } catch {}
    }

    // Teammates also answer
    const teammatePts = [
      Math.random() > 0.3 ? 12 : 0,
      Math.random() > 0.35 ? 10 : 0,
      Math.random() > 0.25 ? 14 : 0
    ];
    const enemyTotalThisRound = Math.floor(Math.random() * 25) + 15;

    const totalOurTeamThisRound = userPts + teammatePts[0] + teammatePts[1] + teammatePts[2];

    setSquadUserScore(prev => prev + userPts);
    setSquadTeamScore(prev => prev + totalOurTeamThisRound);
    setSquadOpponentScore(prev => prev + enemyTotalThisRound);

    setSquadTeammates(prev => [
      { ...prev[0], score: prev[0].score + userPts },
      { ...prev[1], score: prev[1].score + teammatePts[0] },
      { ...prev[2], score: prev[2].score + teammatePts[1] },
      { ...prev[3], score: prev[3].score + teammatePts[2] },
    ]);

    setTimeout(() => {
      if (squadQIndex + 1 < squadQuestions.length) {
        setSquadQIndex(prev => prev + 1);
        setSquadSelectedOpt(null);
        setSquadTimeLeft(15);
      } else {
        setSquadPhase('result');
        const won = (squadTeamScore + totalOurTeamThisRound) >= (squadOpponentScore + enemyTotalThisRound);
        if (won) {
          try { audioEngine.playSuccess(); } catch {}
          setGoldCoins(c => c + 300);
          setXp(x => x + 500);
          setGems(g => g + 10);
          arohiArenaVoice.speak(`Squad Victory! Your team dominated with ${squadTeamScore + totalOurTeamThisRound} points!`);
        } else {
          arohiArenaVoice.speak("Match complete! Good team effort, let's rematch!");
        }
      }
    }, 1400);
  };

  // ==============================================================
  // 3. START BOSS BATTLE (Dynamic Subject Bosses)
  // ==============================================================
  const handleStartBossBattle = () => {
    try { audioEngine.playButtonTap(); } catch {}
    const sLower = selectedSubject.toLowerCase();
    let bInfo = {
      name: 'THE QUANTUM DRAGON',
      title: 'Lord of Mechanics & Quantum Physics',
      avatarBg: 'bg-rose-600/20 border-rose-500 text-rose-400',
      attackName: 'Quantum Heat Wave'
    };

    if (sLower.includes('math') || sLower.includes('arith') || sLower.includes('quant')) {
      bInfo = {
        name: 'THE CALCULUS TITAN',
        title: 'Master of Infinite Integrals & Equations',
        avatarBg: 'bg-amber-600/20 border-amber-500 text-amber-400',
        attackName: 'Matrix Seismic Slam'
      };
    } else if (sLower.includes('chem') || sLower.includes('matter')) {
      bInfo = {
        name: 'THE ACIDIC HYDRA',
        title: 'Beast of Toxic Reactions & Elements',
        avatarBg: 'bg-emerald-600/20 border-emerald-500 text-emerald-400',
        attackName: 'Corrosive Acid Spray'
      };
    } else if (sLower.includes('bio') || sLower.includes('life')) {
      bInfo = {
        name: 'THE BIO-CHIMERA',
        title: 'Titan of Cellular Mutations & Genetics',
        avatarBg: 'bg-teal-600/20 border-teal-500 text-teal-400',
        attackName: 'Cellular Spore Blast'
      };
    } else if (sLower.includes('eng') || sLower.includes('vocab')) {
      bInfo = {
        name: 'THE GRAMMAR BEHEMOTH',
        title: 'Ancient Guardian of Verbal Dominance',
        avatarBg: 'bg-cyan-600/20 border-cyan-500 text-cyan-400',
        attackName: 'Semantic Confusion Roar'
      };
    } else if (sLower.includes('polity') || sLower.includes('gk') || sLower.includes('history')) {
      bInfo = {
        name: 'THE EXAM OVERLORD',
        title: 'Supreme Ruler of General Studies',
        avatarBg: 'bg-purple-600/20 border-purple-500 text-purple-400',
        attackName: 'Knowledge Vortex'
      };
    }

    setBossInfo(bInfo);
    const freshBossQ = generateArenaQuestionSet(selectedClassTrack, selectedSubject, 6, 'hard');
    setBossQuestions(freshBossQ);
    setBossQIndex(0);
    setBossHp(100);
    setBossPlayerHp(100);
    setBossSelectedOpt(null);
    setBossTimeLeft(15);
    setBossPhase('battle');
    setActiveModal('boss_battle');
    arohiArenaVoice.speak(`Boss battle initiated against ${bInfo.name}! Strike with accurate answers!`);
  };

  // BOSS TIMER
  useEffect(() => {
    if (activeModal === 'boss_battle' && bossPhase === 'battle' && bossTimeLeft > 0 && bossSelectedOpt === null) {
      const timer = setTimeout(() => {
        setBossTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (activeModal === 'boss_battle' && bossPhase === 'battle' && bossTimeLeft === 0 && bossSelectedOpt === null) {
      handleAnswerBossQuestion(-1);
    }
  }, [activeModal, bossPhase, bossTimeLeft, bossSelectedOpt]);

  const handleAnswerBossQuestion = (optIdx: number) => {
    setBossSelectedOpt(optIdx);
    const currentQ = bossQuestions[bossQIndex] || bossQuestions[0];
    if (!currentQ) return;
    const isCorrect = optIdx === currentQ.correctIndex;

    if (isCorrect) {
      try { audioEngine.playCorrect(); } catch {}
      const damage = Math.floor(Math.random() * 10) + 25; // 25-35 dmg
      const newBossHp = Math.max(0, bossHp - damage);
      setBossHp(newBossHp);
      arohiArenaVoice.speak(`Critical Strike! You dealt ${damage} damage to ${bossInfo.name}!`);

      if (newBossHp <= 0) {
        setTimeout(() => {
          try { audioEngine.playSuccess(); } catch {}
          setBossPhase('victory');
          setGoldCoins(c => c + 500);
          setGems(g => g + 15);
          setXp(x => x + 800);
          arohiArenaVoice.announceBossDefeated(bossInfo.name, 500, 15);
        }, 1000);
        return;
      }
    } else {
      try { audioEngine.playIncorrect(); } catch {}
      const bossDmg = 25;
      const newPlayerHp = Math.max(0, bossPlayerHp - bossDmg);
      setBossPlayerHp(newPlayerHp);
      arohiArenaVoice.speak(`Missed! ${bossInfo.name} used ${bossInfo.attackName} and dealt ${bossDmg} damage!`);

      if (newPlayerHp <= 0) {
        setTimeout(() => {
          setBossPhase('defeat');
          arohiArenaVoice.speak("Your shield depleted! Heal up and challenge the Boss again.");
        }, 1000);
        return;
      }
    }

    setTimeout(() => {
      if (bossQIndex + 1 < bossQuestions.length) {
        setBossQIndex(prev => prev + 1);
        setBossSelectedOpt(null);
        setBossTimeLeft(15);
      } else {
        // If out of questions but both alive, compare remaining HP
        if (bossHp <= 40) {
          setBossPhase('victory');
          setGoldCoins(c => c + 350);
          setGems(g => g + 8);
          arohiArenaVoice.speak(`Boss repelled! Victory secured.`);
        } else {
          setBossPhase('defeat');
        }
      }
    }, 1400);
  };

  // ==============================================================
  // 4. START ENDLESS SURVIVAL GAUNTLET
  // ==============================================================
  const handleStartSurvival = () => {
    try { audioEngine.playButtonTap(); } catch {}
    // Pre-generate 12 endless questions
    const initialSurvivalQuestions = generateArenaQuestionSet(selectedClassTrack, selectedSubject, 12, 'medium');
    setSurvivalQuestions(initialSurvivalQuestions);
    setSurvivalQIndex(0);
    setSurvivalLives(3);
    setSurvivalScore(0);
    setSurvivalStreak(0);
    setSurvivalMultiplier(1);
    setSurvivalSelectedOpt(null);
    setSurvivalTimeLeft(15);
    setSurvivalPhase('playing');
    setActiveModal('survival');
    arohiArenaVoice.speak(`Endless Survival Gauntlet started in ${selectedSubject}! 3 Lives, 0 room for error.`);
  };

  // SURVIVAL TIMER
  useEffect(() => {
    if (activeModal === 'survival' && survivalPhase === 'playing' && survivalTimeLeft > 0 && survivalSelectedOpt === null) {
      const timer = setTimeout(() => {
        setSurvivalTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (activeModal === 'survival' && survivalPhase === 'playing' && survivalTimeLeft === 0 && survivalSelectedOpt === null) {
      handleAnswerSurvivalQuestion(-1);
    }
  }, [activeModal, survivalPhase, survivalTimeLeft, survivalSelectedOpt]);

  const handleAnswerSurvivalQuestion = (optIdx: number) => {
    setSurvivalSelectedOpt(optIdx);
    const currentQ = survivalQuestions[survivalQIndex] || survivalQuestions[0];
    if (!currentQ) return;
    const isCorrect = optIdx === currentQ.correctIndex;

    if (isCorrect) {
      try { audioEngine.playCorrect(); } catch {}
      const nextStreak = survivalStreak + 1;
      const nextMultiplier = nextStreak >= 10 ? 5 : nextStreak >= 6 ? 3 : nextStreak >= 3 ? 2 : nextStreak >= 2 ? 1.5 : 1;
      const pts = Math.round(10 * nextMultiplier);
      const nextScore = survivalScore + pts;
      setSurvivalScore(nextScore);
      setSurvivalStreak(nextStreak);
      setSurvivalMultiplier(nextMultiplier);
      arohiArenaVoice.announceStreak(nextStreak);

      if (nextScore > survivalBestScore) {
        setSurvivalBestScore(nextScore);
        try { localStorage.setItem('arohi_arena_survival_best', String(nextScore)); } catch {}
      }
    } else {
      try { audioEngine.playIncorrect(); } catch {}
      const remainingLives = survivalLives - 1;
      setSurvivalLives(remainingLives);
      setSurvivalStreak(0);
      setSurvivalMultiplier(1);

      if (remainingLives <= 0) {
        setTimeout(() => {
          setSurvivalPhase('gameover');
          const coinsEarned = Math.round(survivalScore * 2);
          setGoldCoins(c => c + coinsEarned);
          setXp(x => x + survivalScore * 3);
          arohiArenaVoice.speak(`Survival Run Over! You survived with ${survivalScore} points and earned ${coinsEarned} coins!`);
        }, 1000);
        return;
      } else {
        arohiArenaVoice.speak(`Life lost! ${remainingLives} lives remaining.`);
      }
    }

    setTimeout(() => {
      // Dynamic infinite generation: append more questions if nearing end
      if (survivalQIndex + 3 >= survivalQuestions.length) {
        const extraQuestions = generateArenaQuestionSet(selectedClassTrack, selectedSubject, 6, 'medium');
        setSurvivalQuestions(prev => [...prev, ...extraQuestions]);
      }
      setSurvivalQIndex(prev => prev + 1);
      setSurvivalSelectedOpt(null);
      // Speed up timer based on streak
      const nextTimer = Math.max(8, 15 - Math.floor(survivalStreak / 3));
      setSurvivalTimeLeft(nextTimer);
    }, 1300);
  };

  // ==============================================================
  // 5. START WEAKNESS QUEST (Targeted Diagnosis)
  // ==============================================================
  const handleStartWeaknessQuest = (topic: string = 'Trigonometry') => {
    setQuestTargetTopic(topic);
    setQuestInitialPower(topic === 'Trigonometry' ? 41 : 56);
    setQuestFinalPower(topic === 'Trigonometry' ? 74 : 85);

    // Generate 3 targeted questions
    const targetedQuestions = generateArenaQuestionSet(selectedClassTrack, topic, 3, 'medium');
    setQuestQuestions(targetedQuestions);
    setQuestQIndex(0);
    setQuestSelectedOpt(null);
    setQuestPhase('battle');
    setActiveModal('weakness_quest');
    arohiArenaVoice.announceWeaknessQuestStart(topic);
  };

  const handleAnswerWeaknessQuestion = (optIdx: number) => {
    setQuestSelectedOpt(optIdx);
    const currentQ = questQuestions[questQIndex] || questQuestions[0];
    if (!currentQ) return;
    const isCorrect = optIdx === currentQ.correctIndex;

    if (isCorrect) {
      try { audioEngine.playCorrect(); } catch {}
      arohiArenaVoice.speak("Correct! Step-by-step logic verified.");
    } else {
      try { audioEngine.playIncorrect(); } catch {}
      arohiArenaVoice.speak(`Hint: ${currentQ.hint}`);
    }

    setTimeout(() => {
      if (questQIndex + 1 < questQuestions.length) {
        setQuestQIndex(prev => prev + 1);
        setQuestSelectedOpt(null);
      } else {
        setQuestPhase('mastered');
        try { audioEngine.playSuccess(); } catch {}
        setWeakAreas(prev => prev.map(a => a.topic === questTargetTopic ? { 
          ...a, 
          accuracy: questFinalPower, 
          status: 'Strong', 
          textCol: 'text-emerald-400', 
          barCol: 'bg-emerald-500' 
        } : a));
        setGoldCoins(c => c + 200);
        setGems(g => g + 5);
        arohiArenaVoice.announceWeaknessMastered(questTargetTopic, questFinalPower);
      }
    }, 1400);
  };

  return (
    <div className="min-h-screen bg-[#050212] text-white font-sans selection:bg-purple-500 selection:text-white pb-28 overflow-x-hidden antialiased relative">
      
      {/* ============================================================== */}
      {/* GRAND TOURNAMENT ANIMATED BACKGROUND ENGINE */}
      {/* ============================================================== */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* 1. Grand Stadium Spotlight Beams (Sweeping Animated Light Rays) */}
        <div className="absolute -top-32 -left-20 w-[550px] h-[850px] bg-gradient-to-b from-amber-400/15 via-purple-600/5 to-transparent rotate-[-25deg] blur-3xl transform-gpu animate-pulse" style={{ animationDuration: '6s' }} />
        <div className="absolute -top-40 -right-20 w-[600px] h-[900px] bg-gradient-to-b from-cyan-400/15 via-indigo-600/5 to-transparent rotate-[30deg] blur-3xl transform-gpu animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-purple-800/15 via-pink-600/10 to-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

        {/* 2. Cyber-Arena Championship Floor Grid */}
        <div 
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `radial-gradient(circle at center, #a855f7 1px, transparent 1px), linear-gradient(to right, #4f46e5 1px, transparent 1px), linear-gradient(to bottom, #4f46e5 1px, transparent 1px)`,
            backgroundSize: '32px 32px, 64px 64px, 64px 64px',
            maskImage: 'radial-gradient(ellipse 80% 80% at 50% 30%, black 40%, transparent 100%)'
          }}
        />

        {/* 3. Floating Golden Starlight & Cosmic Sparkles */}
        <div className="absolute top-20 left-[15%] w-1.5 h-1.5 rounded-full bg-amber-300 shadow-[0_0_8px_#f59e0b] animate-ping" style={{ animationDuration: '3.5s' }} />
        <div className="absolute top-48 right-[18%] w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_10px_#06b6d4] animate-ping" style={{ animationDuration: '4.8s' }} />
        <div className="absolute top-[45%] left-[8%] w-1.5 h-1.5 rounded-full bg-yellow-200 shadow-[0_0_8px_#fef08a] animate-pulse" style={{ animationDuration: '2.5s' }} />
        <div className="absolute top-[65%] right-[12%] w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_10px_#c084fc] animate-ping" style={{ animationDuration: '5.2s' }} />

        {/* 4. Ambient Floating & Gently Blinking Motivational Lines From Arohi in Background */}
        <div className="absolute top-36 right-8 max-w-sm hidden xl:block select-none opacity-20 hover:opacity-40 transition-opacity">
          <div className="text-[10px] font-mono font-bold tracking-widest text-amber-200/70 uppercase italic animate-pulse flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>"VICTORY BELONGS TO THE PERSEVERING" • AROHI</span>
          </div>
        </div>

        <div className="absolute top-[48%] -left-6 max-w-md hidden lg:block select-none opacity-15 hover:opacity-35 transition-opacity -rotate-90 origin-bottom-left">
          <div className="text-[9px] font-mono font-black tracking-[0.25em] text-cyan-200/60 uppercase animate-pulse flex items-center gap-2" style={{ animationDuration: '4s' }}>
            <Crown className="w-3 h-3 text-cyan-400" />
            <span>"EVERY QUESTION SOLVED IS A RANK CONQUERED" • AROHI</span>
          </div>
        </div>

        <div className="absolute bottom-40 right-10 max-w-sm hidden xl:block select-none opacity-20 hover:opacity-40 transition-opacity">
          <div className="text-[10px] font-mono font-bold tracking-widest text-purple-200/70 uppercase italic animate-pulse flex items-center gap-1.5" style={{ animationDuration: '5s' }}>
            <Zap className="w-3 h-3 text-purple-400" />
            <span>"CHAMPIONS TRAIN IN THE SILENCE OF DISCIPLINE" • AROHI</span>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 1. TOP STICKY MOBILE-FIRST APP BAR (High-Density Esports UI) */}
      {/* ============================================================== */}
      <header className="sticky top-0 z-40 bg-[#07031c]/95 backdrop-blur-2xl border-b border-purple-900/40 px-3 sm:px-6 py-2 shadow-2xl transition-all relative">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          
          {/* Left: Branding & Back Button */}
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
            {onBackToExams && (
              <button
                onClick={onBackToExams}
                className="p-1.5 sm:p-2 rounded-xl bg-purple-950/80 hover:bg-purple-900 text-purple-300 border border-purple-800/50 transition-all cursor-pointer shrink-0 active:scale-95 shadow-sm"
                title="Back to CBT Mock Tests Hub"
              >
                <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            )}
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-tr from-amber-400 via-yellow-400 to-amber-600 flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.6)] shrink-0 animate-pulse">
                <Crown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-950 fill-slate-950" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h1 className="text-xs sm:text-sm font-black tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-100 to-yellow-300 truncate">
                    AROHI ARENA
                  </h1>
                  <span className="inline-flex text-[8px] font-black uppercase tracking-wider px-1.5 py-0.2 rounded bg-gradient-to-r from-red-600 to-pink-600 text-white shadow-[0_0_8px_rgba(239,68,68,0.5)] animate-pulse">
                    LIVE
                  </span>
                </div>
                <p className="text-[9px] sm:text-[10px] font-bold text-purple-300/75 truncate hidden sm:block tracking-tight">
                  National Esports League • Compete & Win Cash Prizes
                </p>
              </div>
            </div>
          </div>

          {/* Right: Currency Bar, Flagship Arohi Voice & Profile */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            
            {/* Flagship Arohi Voice Synthesizer Pill */}
            <button
              onClick={() => {
                if (isArohiSpeaking) {
                  arohiArenaVoice.stopSpeaking();
                } else {
                  const nextMuted = arohiArenaVoice.toggleMute();
                  if (!nextMuted) {
                    arohiArenaVoice.announceArenaWelcome();
                  }
                }
              }}
              className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 rounded-full border transition-all cursor-pointer active:scale-95 ${
                isArohiSpeaking
                  ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white border-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.6)] animate-pulse'
                  : isVoiceMuted
                  ? 'bg-purple-950/60 text-slate-400 border-purple-800/40 hover:text-purple-200'
                  : 'bg-purple-900/50 text-purple-200 border-purple-600/40 hover:bg-purple-800/60 shadow-xs'
              }`}
              title={
                isArohiSpeaking
                  ? 'Arohi Zypher is speaking (Click to pause)'
                  : isVoiceMuted
                  ? 'Arohi Zypher Voice Muted (Click to enable live commentary)'
                  : 'Arohi Zypher HD Voice Active (Click to replay announcement)'
              }
            >
              {isVoiceMuted ? (
                <VolumeX className="w-3 h-3 text-slate-400 shrink-0" />
              ) : (
                <Volume2 className={`w-3 h-3 ${isArohiSpeaking ? 'text-amber-300 animate-bounce' : 'text-purple-300'} shrink-0`} />
              )}
              <span className="text-[9px] sm:text-[10px] font-black tracking-tight">
                {isArohiSpeaking ? 'Zypher Speaking...' : isVoiceMuted ? 'Muted' : 'Arohi Zypher'}
              </span>
              {isArohiSpeaking && (
                <span className="flex gap-0.5 items-end h-2 ml-0.5">
                  <span className="w-0.5 h-full bg-white animate-pulse" />
                  <span className="w-0.5 h-1.5 bg-amber-300 animate-pulse delay-75" />
                  <span className="w-0.5 h-2.5 bg-white animate-pulse delay-150" />
                </span>
              )}
            </button>

            {/* Gold Coins Pill */}
            <div 
              onClick={() => setActiveModal('shop')}
              className="flex items-center gap-1 px-2 sm:px-2.5 py-0.8 rounded-full bg-[#201305] border border-amber-500/40 text-amber-300 text-[10px] sm:text-[11px] font-black shadow-inner cursor-pointer hover:border-amber-400 transition-all active:scale-95"
              title="Arena Gold Coins"
            >
              <Coins className="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" />
              <span className="font-mono">{goldCoins.toLocaleString('en-IN')}</span>
            </div>

            {/* Gems Pill */}
            <div 
              onClick={() => setActiveModal('shop')}
              className="hidden xs:flex items-center gap-1 px-2 sm:px-2.5 py-0.8 rounded-full bg-[#05172b] border border-cyan-500/40 text-cyan-300 text-[10px] sm:text-[11px] font-black shadow-inner cursor-pointer hover:border-cyan-400 transition-all active:scale-95"
              title="Arena Gems"
            >
              <Gem className="w-3 h-3 text-cyan-400 fill-cyan-400 shrink-0" />
              <span className="font-mono">{gems}</span>
            </div>

            {/* Notification Bell */}
            <button 
              onClick={() => setActiveModal('rewards')}
              className="relative p-1.5 rounded-xl bg-purple-950/60 hover:bg-purple-900 border border-purple-800/40 text-purple-200 transition-all cursor-pointer active:scale-95"
              title="Arena Rewards & Notifications"
            >
              <Bell className="w-3.5 h-3.5" />
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-rose-500 text-white text-[8px] font-black rounded-full flex items-center justify-center border-2 border-[#0a0820] shadow-sm">
                5
              </span>
            </button>

            {/* User Level Pill & Avatar */}
            <div 
              className="relative cursor-pointer group shrink-0 active:scale-95 transition-all" 
              onClick={() => setActiveModal('profile')}
              title="View Profile"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-tr from-purple-600 via-pink-500 to-amber-400 p-[1.5px] shadow-[0_0_12px_rgba(168,85,247,0.5)]">
                <div className="w-full h-full rounded-full bg-[#0e0625] flex items-center justify-center overflow-hidden">
                  <span className="font-black text-[11px] text-amber-300">
                    {playerName.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 text-[7px] font-black px-1 rounded-full border border-slate-950 shadow-xs">
                Lv.18
              </div>
            </div>

          </div>
        </div>

        {/* ============================================================== */}
        {/* GRAND TOURNAMENT LIVE MOTIVATION BROADCAST MARQUEE (Arohi Live) */}
        {/* ============================================================== */}
        <div className="max-w-7xl mx-auto mt-2 pt-1.5 pb-0.5 border-t border-purple-900/30 flex items-center justify-between gap-2 overflow-hidden">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[8px] sm:text-[9px] font-black uppercase tracking-wider shrink-0 shadow-xs">
              <Sparkles className="w-2.5 h-2.5 text-amber-300 animate-spin" style={{ animationDuration: '4s' }} />
              <span>MOTIVATION</span>
            </div>
            
            {/* Gently Blinking Animated Arohi Motivation Text */}
            <div className="min-w-0 flex-1">
              <p 
                key={motivationIndex}
                className="text-[10px] sm:text-[11px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-300 truncate animate-pulse tracking-tight"
                style={{ animationDuration: '3s' }}
              >
                {AROHI_MOTIVATIONAL_LINES[motivationIndex]}
              </p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-3 shrink-0 text-[9px] font-mono text-purple-300/80">
            <span className="flex items-center gap-1 text-emerald-400 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              5,420 Warriors Live
            </span>
            <span>•</span>
            <span className="text-amber-300 font-black">₹1,25,000+ Prize Pool</span>
          </div>
        </div>

        {/* Horizontal Mobile Nav Bar (Fast Category Switching) */}
        <div className="max-w-7xl mx-auto flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-2 pb-0.5 mt-1 border-t border-purple-900/20">
          {[
            { id: 'home', label: '🔥 Arena Home', action: () => setActiveTab('home') },
            { id: 'duel', label: '⚡ 1v1 Quick Duel', action: handleStartQuickDuel },
            { id: 'tournaments', label: '🏆 Tournaments (₹50k)', action: () => { setSelectedTournament(TOURNAMENTS_DATA[0]); setActiveModal('tournament_details'); } },
            { id: 'boss', label: '💀 Boss Battles', action: () => setActiveModal('boss_battle') },
            { id: 'squad', label: '👥 4v4 Squad', action: () => setActiveModal('squad_battle') },
            { id: 'weakness', label: '🎯 Weakness Quest', action: () => handleStartWeaknessQuest() },
            { id: 'ranks', label: '📊 Leaderboards', action: () => setActiveModal('leaderboard_full') },
            { id: 'shop', label: '🛍️ Arena Shop', action: () => setActiveModal('shop') },
            { id: 'rewards', label: '🎁 Daily Gift', action: () => setActiveModal('rewards') }
          ].map((item) => (
            <button
              key={item.id}
              onClick={item.action}
              className="px-2.5 py-1 rounded-full bg-purple-950/60 hover:bg-purple-800/70 text-purple-200 hover:text-white border border-purple-800/40 text-[10px] sm:text-[11px] font-black uppercase tracking-tight whitespace-nowrap transition-all cursor-pointer shrink-0 active:scale-95 shadow-xs"
            >
              {item.label}
            </button>
          ))}
        </div>
      </header>

      {/* ============================================================== */}
      {/* 2. MAIN ARENA VIEWPORT (Mobile-First Responsive Grid) */}
      {/* ============================================================== */}
      <main className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-6 space-y-6 relative z-10">
        
        {/* ============================================================== */}
        {/* HERO WARRIOR DASHBOARD (Player Profile, Streak & Level) */}
        {/* ============================================================== */}
        <div className="relative rounded-3xl p-4 sm:p-5 border border-purple-700/40 bg-gradient-to-br from-[#120a3a]/90 via-[#0e072a]/90 to-[#07041a]/95 backdrop-blur-xl shadow-[0_0_30px_rgba(88,28,135,0.3)] overflow-hidden">
          {/* Cosmic Background Glows */}
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDuration: '5s' }} />
          <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDuration: '7s' }} />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
            
            {/* Left: Player Identity & XP Bar */}
            <div className="flex items-center gap-3.5 sm:gap-5 w-full md:w-auto">
              <div className="relative shrink-0 flex flex-col items-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-tr from-purple-600 via-pink-500 to-amber-400 p-[2px] shadow-[0_0_20px_rgba(168,85,247,0.5)]">
                  <div className="w-full h-full rounded-3xl bg-[#0d0725] flex items-center justify-center overflow-hidden">
                    <Swords className="w-8 h-8 sm:w-10 sm:h-10 text-amber-300 drop-shadow-[0_0_8px_rgba(245,158,11,0.8)] animate-pulse" />
                  </div>
                </div>
                <div className="absolute -bottom-2 bg-gradient-to-r from-purple-700 to-indigo-700 text-white text-[8px] sm:text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border border-purple-400/50 shadow-md flex items-center gap-1 whitespace-nowrap">
                  <Crown className="w-2.5 h-2.5 text-amber-300" />
                  <span>WARRIOR</span>
                </div>
              </div>

              <div className="space-y-1 flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h2 className="text-base sm:text-2xl font-black tracking-tight text-white truncate">
                    {playerName}
                  </h2>
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 fill-blue-500/20 shrink-0" />
                </div>
                <div className="text-[10px] sm:text-xs font-mono text-purple-300/70">
                  ID: ARH-2405187 • National League Tier 3
                </div>

                {/* Level Progress */}
                <div className="pt-1 space-y-1 max-w-sm">
                  <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-extrabold">
                    <span className="text-amber-300 tracking-wider">XP LEVEL 18</span>
                    <span className="text-slate-400 font-mono">12,450 / 18,000 XP</span>
                  </div>
                  <div className="w-full h-2 sm:h-2.5 rounded-full bg-slate-950 border border-purple-900/60 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 rounded-full shadow-[0_0_8px_rgba(245,158,11,0.6)]"
                      style={{ width: `${(12450 / 18000) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Key Metric Badges (Rank & Streak) */}
            <div className="grid grid-cols-2 gap-3 w-full md:w-auto">
              
              {/* Rank Card */}
              <div 
                onClick={() => setActiveModal('leaderboard_full')}
                className="p-3 sm:p-3.5 rounded-2xl bg-[#1a0f3d]/80 border border-amber-500/30 hover:border-amber-400/60 text-left transition-all cursor-pointer shadow-lg active:scale-95"
              >
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0">
                    <Trophy className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider block">
                      INDIA RANK
                    </span>
                    <div className="text-lg sm:text-xl font-black text-amber-300 leading-tight">
                      #236
                    </div>
                  </div>
                </div>
                <div className="text-[9px] font-bold text-emerald-400 mt-1.5 pt-1.5 border-t border-purple-900/40 flex items-center justify-between">
                  <span>▲ 214 this week</span>
                  <span className="text-purple-300">View ↗</span>
                </div>
              </div>

              {/* Winning Streak Card */}
              <div className="p-3 sm:p-3.5 rounded-2xl bg-[#1a0f3d]/80 border border-orange-500/30 text-left shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center shrink-0">
                    <Flame className="w-4 h-4 fill-orange-500 animate-bounce" />
                  </div>
                  <div>
                    <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider block">
                      STREAK
                    </span>
                    <div className="text-lg sm:text-xl font-black text-orange-400 leading-tight">
                      {winningStreak} 🔥
                    </div>
                  </div>
                </div>
                <div className="text-[9px] font-bold text-slate-400 mt-1.5 pt-1.5 border-t border-purple-900/40">
                  Best Record: 18 Wins
                </div>
              </div>

            </div>
          </div>

          {/* 5-Metric Strip */}
          <div className="mt-4 pt-3.5 border-t border-purple-900/40 grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3 text-center">
            <div className="p-2 rounded-xl bg-purple-950/40 border border-purple-900/30">
              <div className="text-[9px] font-bold text-slate-400 uppercase flex items-center justify-center gap-1">
                <Trophy className="w-3 h-3 text-amber-400" />
                <span>TROPHIES</span>
              </div>
              <div className="text-sm sm:text-base font-black text-white mt-0.5">24</div>
            </div>

            <div className="p-2 rounded-xl bg-purple-950/40 border border-purple-900/30">
              <div className="text-[9px] font-bold text-slate-400 uppercase flex items-center justify-center gap-1">
                <Target className="w-3 h-3 text-cyan-400" />
                <span>WIN RATE</span>
              </div>
              <div className="text-sm sm:text-base font-black text-cyan-400 mt-0.5">78%</div>
            </div>

            <div className="p-2 rounded-xl bg-purple-950/40 border border-purple-900/30">
              <div className="text-[9px] font-bold text-slate-400 uppercase flex items-center justify-center gap-1">
                <Shield className="w-3 h-3 text-emerald-400" />
                <span>ACCURACY</span>
              </div>
              <div className="text-sm sm:text-base font-black text-emerald-400 mt-0.5">82%</div>
            </div>

            <div className="p-2 rounded-xl bg-purple-950/40 border border-purple-900/30">
              <div className="text-[9px] font-bold text-slate-400 uppercase flex items-center justify-center gap-1">
                <Crown className="w-3 h-3 text-yellow-400" />
                <span>TOTAL WINS</span>
              </div>
              <div className="text-sm sm:text-base font-black text-yellow-300 mt-0.5">156</div>
            </div>

            <div className="col-span-2 sm:col-span-1 p-2 rounded-xl bg-emerald-950/40 border border-emerald-500/30">
              <div className="text-[9px] font-bold text-emerald-400 uppercase flex items-center justify-center gap-1">
                <Coins className="w-3 h-3 text-emerald-400" />
                <span>PRIZE WON</span>
              </div>
              <div className="text-sm sm:text-base font-black text-emerald-400 mt-0.5">₹24,500</div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* CLASS-WISE & SUBJECT-WISE COMMAND HUB (Unlimited Custom Questions) */}
        {/* ============================================================== */}
        <section className="relative rounded-3xl p-4 sm:p-5 border border-purple-600/40 bg-gradient-to-br from-[#180e46]/95 via-[#110935]/95 to-[#090420]/95 backdrop-blur-xl shadow-[0_0_30px_rgba(147,51,234,0.25)] space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-purple-800/40">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-400 to-yellow-500 flex items-center justify-center text-slate-950 font-black shadow-md">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-black tracking-wide uppercase text-white flex items-center gap-2">
                    <span>CUSTOMIZE BATTLE TRACK</span>
                    <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 animate-pulse">
                      UNLIMITED UNIQUE TESTS
                    </span>
                  </h3>
                  <p className="text-[11px] text-purple-300/80">
                    Select your exact class / target exam & subject to fight with non-repeating procedural questions
                  </p>
                </div>
              </div>
            </div>

            {/* Class Track Selector Trigger Button */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveModal('class_picker')}
                className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-purple-900/80 hover:bg-purple-800 text-white border border-purple-500/50 shadow-md cursor-pointer active:scale-95 transition-all text-xs font-black"
              >
                <span className="text-base">{currentClassTrackObj.icon}</span>
                <span className="truncate max-w-[160px] sm:max-w-[220px]">{currentClassTrackObj.name}</span>
                <ChevronDown className="w-4 h-4 text-amber-300 shrink-0" />
              </button>
            </div>
          </div>

          {/* Subject Pills Selection */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-300">
              <span className="flex items-center gap-1.5 text-purple-200">
                <Layers className="w-3.5 h-3.5 text-amber-400" />
                <span>CHOOSE SUBJECT:</span>
              </span>
              <span className="text-[11px] text-amber-300 font-mono">
                Active: <strong className="text-white">{selectedSubject}</strong>
              </span>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 pt-0.5">
              {ARENA_SUBJECTS_LIST.map((subj, idx) => {
                const isActive = selectedSubject === subj;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectSubject(subj)}
                    className={`px-3 py-1.5 rounded-xl border text-xs font-black whitespace-nowrap transition-all cursor-pointer shrink-0 active:scale-95 flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 text-white border-amber-400 shadow-[0_0_15px_rgba(168,85,247,0.5)]'
                        : 'bg-purple-950/60 hover:bg-purple-900/60 text-purple-300/80 border-purple-800/40 hover:text-white'
                    }`}
                  >
                    <span>⚡</span>
                    <span>{subj}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* GAME MODES (Joyful Touch Grid with Animated Cards) */}
        {/* ============================================================== */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              <h3 className="text-sm sm:text-base font-black tracking-wide uppercase text-white">
                BATTLE MODES
              </h3>
            </div>
            <span className="text-[11px] font-bold text-purple-300/80">
              ⚡ 5,280+ Students Live • {selectedSubject}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            
            {/* 1. QUICK DUEL */}
            <div 
              onClick={handleStartQuickDuel}
              className="rounded-3xl p-3.5 sm:p-4 border border-blue-500/40 bg-gradient-to-b from-[#0f1d46] to-[#070e24] text-center flex flex-col justify-between hover:scale-[1.03] active:scale-95 transition-all cursor-pointer shadow-lg group relative overflow-hidden"
            >
              <div className="w-11 h-11 sm:w-12 sm:h-12 mx-auto rounded-2xl bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-slate-950 transition-colors shadow-sm">
                <Swords className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="my-2 space-y-0.5">
                <h4 className="text-xs sm:text-sm font-black text-white uppercase tracking-tight">
                  1v1 DUEL
                </h4>
                <div className="text-[10px] font-bold text-blue-400">Live Match</div>
                <p className="text-[9px] text-slate-400 line-clamp-1">
                  Speed calculation & accuracy
                </p>
              </div>
              <button className="w-full py-1.5 rounded-xl bg-blue-600 group-hover:bg-blue-500 text-white font-black text-[10px] uppercase tracking-wider transition-all shadow-md">
                BATTLE NOW
              </button>
            </div>

            {/* 2. SQUAD BATTLE */}
            <div 
              onClick={handleStartSquadBattle}
              className="rounded-3xl p-3.5 sm:p-4 border border-purple-500/40 bg-gradient-to-b from-[#210f44] to-[#0e0724] text-center flex flex-col justify-between hover:scale-[1.03] active:scale-95 transition-all cursor-pointer shadow-lg group relative overflow-hidden"
            >
              <div className="w-11 h-11 sm:w-12 sm:h-12 mx-auto rounded-2xl bg-purple-500/20 border border-purple-400/40 flex items-center justify-center text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-colors shadow-sm">
                <Users className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="my-2 space-y-0.5">
                <h4 className="text-xs sm:text-sm font-black text-white uppercase tracking-tight">
                  4v4 SQUAD
                </h4>
                <div className="text-[10px] font-bold text-purple-400">Team Battle</div>
                <p className="text-[9px] text-slate-400 line-clamp-1">
                  Team up with classmates
                </p>
              </div>
              <button className="w-full py-1.5 rounded-xl bg-purple-600 group-hover:bg-purple-500 text-white font-black text-[10px] uppercase tracking-wider transition-all shadow-md">
                ENTER SQUAD
              </button>
            </div>

            {/* 3. BOSS BATTLE */}
            <div 
              onClick={handleStartBossBattle}
              className="rounded-3xl p-3.5 sm:p-4 border border-rose-500/40 bg-gradient-to-b from-[#330f28] to-[#160612] text-center flex flex-col justify-between hover:scale-[1.03] active:scale-95 transition-all cursor-pointer shadow-lg group relative overflow-hidden"
            >
              <div className="w-11 h-11 sm:w-12 sm:h-12 mx-auto rounded-2xl bg-rose-500/20 border border-rose-400/40 flex items-center justify-center text-rose-400 group-hover:bg-rose-500 group-hover:text-white transition-colors shadow-sm">
                <Skull className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="my-2 space-y-0.5">
                <h4 className="text-xs sm:text-sm font-black text-white uppercase tracking-tight">
                  BOSS BATTLE
                </h4>
                <div className="text-[10px] font-bold text-rose-400">
                  {selectedSubject.includes('Math') ? 'Calculus Titan' : selectedSubject.includes('Chem') ? 'Acidic Hydra' : 'Quantum Dragon'}
                </div>
                <p className="text-[9px] text-slate-400 line-clamp-1">
                  Defeat subject bosses
                </p>
              </div>
              <button className="w-full py-1.5 rounded-xl bg-rose-600 group-hover:bg-rose-500 text-white font-black text-[10px] uppercase tracking-wider transition-all shadow-md">
                FIGHT BOSS
              </button>
            </div>

            {/* 4. SURVIVAL ARENA */}
            <div 
              onClick={handleStartSurvival}
              className="rounded-3xl p-3.5 sm:p-4 border border-teal-500/40 bg-gradient-to-b from-[#0e2c30] to-[#051315] text-center flex flex-col justify-between hover:scale-[1.03] active:scale-95 transition-all cursor-pointer shadow-lg group relative overflow-hidden"
            >
              <div className="w-11 h-11 sm:w-12 sm:h-12 mx-auto rounded-2xl bg-teal-500/20 border border-teal-400/40 flex items-center justify-center text-teal-400 group-hover:bg-teal-500 group-hover:text-slate-950 transition-colors shadow-sm">
                <Shield className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="my-2 space-y-0.5">
                <h4 className="text-xs sm:text-sm font-black text-white uppercase tracking-tight">
                  SURVIVAL
                </h4>
                <div className="text-[10px] font-bold text-teal-400">Endless Gauntlet</div>
                <p className="text-[9px] text-slate-400 line-clamp-1">
                  3 Lives • Infinite Qs
                </p>
              </div>
              <button className="w-full py-1.5 rounded-xl bg-teal-600 group-hover:bg-teal-500 text-slate-950 font-black text-[10px] uppercase tracking-wider transition-all shadow-md">
                SURVIVE
              </button>
            </div>

            {/* 5. WEAKNESS QUEST */}
            <div 
              onClick={() => handleStartWeaknessQuest(weakAreas[0].topic)}
              className="col-span-2 sm:col-span-1 rounded-3xl p-3.5 sm:p-4 border border-amber-500/40 bg-gradient-to-b from-[#2e200e] to-[#140d04] text-center flex flex-col justify-between hover:scale-[1.03] active:scale-95 transition-all cursor-pointer shadow-lg group relative overflow-hidden"
            >
              <div className="w-11 h-11 sm:w-12 sm:h-12 mx-auto rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors shadow-sm">
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="my-2 space-y-0.5">
                <h4 className="text-xs sm:text-sm font-black text-white uppercase tracking-tight">
                  WEAKNESS QUEST
                </h4>
                <div className="text-[10px] font-bold text-amber-400">AI Power Boost</div>
                <p className="text-[9px] text-slate-400 line-clamp-1">
                  Fix error-prone topics
                </p>
              </div>
              <button className="w-full py-1.5 rounded-xl bg-amber-500 group-hover:bg-amber-400 text-slate-950 font-black text-[10px] uppercase tracking-wider transition-all shadow-md">
                BOOST +25%
              </button>
            </div>

          </div>
        </section>

        {/* ============================================================== */}
        {/* UPCOMING NATIONAL CHAMPIONSHIPS & CASH TOURNAMENTS */}
        {/* ============================================================== */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-400" />
              <h3 className="text-sm sm:text-base font-black tracking-wide uppercase text-white">
                NATIONAL TOURNAMENTS
              </h3>
            </div>
            <button 
              onClick={() => {
                setSelectedTournament(TOURNAMENTS_DATA[0]);
                setActiveModal('tournament_details');
              }}
              className="text-xs font-bold text-purple-400 hover:text-purple-300 cursor-pointer flex items-center gap-0.5"
            >
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {TOURNAMENTS_DATA.map((tourn) => (
              <div
                key={tourn.id}
                className="rounded-3xl p-4 sm:p-5 border border-purple-900/40 bg-gradient-to-b from-[#170e3e] to-[#09051c] flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:border-purple-500/60 shadow-xl group"
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md border ${tourn.badgeBg}`}>
                    {tourn.daysLeft} DAYS LEFT
                  </span>
                  <span className="text-[11px] font-bold text-slate-400">
                    👥 {tourn.participants}
                  </span>
                </div>

                <div className="my-4 text-center space-y-1">
                  <h4 className="text-sm sm:text-base font-black tracking-tight text-white group-hover:text-amber-300 transition-colors line-clamp-2">
                    {tourn.title}
                  </h4>
                  <div className="text-[10px] font-semibold text-purple-300/80">
                    Grand Cash Prize Pool
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400">
                    {tourn.prizePool}
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedTournament(tourn);
                    setActiveModal('tournament_details');
                  }}
                  className={`w-full py-2.5 rounded-2xl text-xs uppercase tracking-wider shadow-md transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-1.5 ${
                    registeredTournamentIds.includes(tourn.id)
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 font-black'
                      : tourn.btnBg
                  }`}
                >
                  {registeredTournamentIds.includes(tourn.id) ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>REGISTERED ✓</span>
                    </>
                  ) : (
                    <span>REGISTER FREE</span>
                  )}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================== */}
        {/* SPLIT SECTION: LEADERBOARD vs WEAK AREAS */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          
          {/* LEFT: LEADERBOARD */}
          <div className="rounded-3xl p-4 sm:p-5 border border-purple-900/40 bg-gradient-to-b from-[#130d38] to-[#09051e] shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3.5">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-amber-400" />
                  <h3 className="text-sm sm:text-base font-black uppercase text-white">
                    LIVE RANKINGS
                  </h3>
                </div>

                {/* Filter Tabs */}
                <div className="flex items-center gap-1 p-1 rounded-xl bg-purple-950/60 border border-purple-800/40 text-[10px] font-bold">
                  {(['india', 'state', 'school', 'friends'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveLeaderboardTab(tab)}
                      className={`px-2 py-0.5 rounded-lg capitalize transition-all cursor-pointer ${
                        activeLeaderboardTab === tab
                          ? 'bg-purple-600 text-white font-extrabold shadow-xs'
                          : 'text-purple-300/70 hover:text-white'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Top Rankers List */}
              <div className="space-y-2">
                {[
                  { rank: 1, name: 'Riya Sharma', level: 20, xp: '15,680 XP', badge: '🥇', isUser: false },
                  { rank: 2, name: 'Aryan Verma', level: 19, xp: '14,250 XP', badge: '🥈', isUser: false },
                  { rank: 3, name: 'Kabir Singh', level: 19, xp: '13,890 XP', badge: '🥉', isUser: false },
                  { rank: 4, name: 'Aarav Nayak (You)', level: 18, xp: '12,450 XP', badge: '4', isUser: true },
                  { rank: 5, name: 'Neha Iyer', level: 18, xp: '11,980 XP', badge: '5', isUser: false },
                ].map((entry) => (
                  <div
                    key={entry.rank}
                    className={`flex items-center justify-between p-2.5 sm:p-3 rounded-2xl border transition-all ${
                      entry.isUser
                        ? 'bg-gradient-to-r from-blue-900/60 via-indigo-900/60 to-purple-900/60 border-blue-400/60 shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                        : 'bg-[#181142]/60 border-purple-900/30 hover:bg-[#1f1555]/60'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                      <span className="w-5 text-center font-black text-xs text-amber-300 shrink-0">
                        {entry.badge}
                      </span>
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-purple-800/80 border border-purple-400/40 flex items-center justify-center text-xs font-bold text-white shrink-0">
                        {entry.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <div className={`text-xs font-bold truncate ${entry.isUser ? 'text-blue-200' : 'text-white'}`}>
                          {entry.name}
                        </div>
                        <div className="text-[10px] text-purple-300/70">
                          Level {entry.level}
                        </div>
                      </div>
                    </div>
                    <div className="font-mono text-xs font-black text-amber-300 shrink-0">
                      {entry.xp}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setActiveModal('leaderboard_full')}
              className="mt-4 w-full py-2.5 rounded-2xl bg-purple-950/60 hover:bg-purple-900/80 border border-purple-700/40 text-purple-300 text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer active:scale-95"
            >
              VIEW FULL NATIONAL LEADERBOARD
            </button>
          </div>

          {/* RIGHT: WEAK AREAS & AI DIAGNOSTIC */}
          <div className="rounded-3xl p-4 sm:p-5 border border-purple-900/40 bg-gradient-to-b from-[#130d38] to-[#09051e] shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3.5">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-400" />
                  <h3 className="text-sm sm:text-base font-black uppercase text-white">
                    AI WEAKNESS DIAGNOSIS
                  </h3>
                </div>
                <button 
                  onClick={() => handleStartWeaknessQuest()}
                  className="text-xs font-bold text-cyan-400 hover:underline cursor-pointer"
                >
                  Deep Analysis
                </button>
              </div>

              {/* Weakness Diagnostic Bars */}
              <div className="space-y-2.5">
                {weakAreas.map((area) => (
                  <div
                    key={area.id}
                    className="p-3 rounded-2xl bg-[#181142]/60 border border-purple-900/30 flex items-center justify-between gap-3"
                  >
                    <div className="flex-1 space-y-1 min-w-0">
                      <div className="flex items-center justify-between text-xs font-extrabold">
                        <span className="text-white truncate">{area.topic}</span>
                        <span className={area.textCol}>{area.status}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-slate-400">
                          {area.accuracy}%
                        </span>
                        <div className="flex-1 h-1.5 rounded-full bg-slate-950 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${area.barCol}`}
                            style={{ width: `${area.accuracy}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleStartWeaknessQuest(area.topic)}
                      className="px-2.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-[10px] font-black uppercase tracking-wider cursor-pointer active:scale-95 transition-all shrink-0"
                    >
                      FIX NOW
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => handleStartWeaknessQuest('Trigonometry')}
              className="mt-4 w-full py-3 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-xs uppercase tracking-wider shadow-[0_4px_20px_rgba(124,58,237,0.5)] border border-purple-400/50 cursor-pointer active:scale-95 transition-all"
            >
              LAUNCH AI WEAKNESS QUEST (5 MIN)
            </button>
          </div>

        </div>

        {/* ============================================================== */}
        {/* BOTTOM 4-CARD ACTIVITY DECK */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          
          {/* Card 1: DAILY QUEST */}
          <div className="p-3.5 rounded-3xl border border-purple-900/40 bg-[#120c35]/80 flex items-center justify-between gap-3 shadow-lg">
            <div className="w-10 h-10 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
              <Target className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[9px] font-black text-purple-300 uppercase">DAILY QUEST</div>
              <div className="text-xs font-bold text-white truncate">Play 3 games today</div>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex-1 h-1.5 bg-slate-900 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 rounded-full" style={{ width: '66%' }} />
                </div>
                <span className="text-[10px] font-bold text-slate-400">2/3</span>
                <span className="text-[10px] font-black text-cyan-300 flex items-center gap-0.5">
                  <Gem className="w-3 h-3" /> 25
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: DAILY REWARD */}
          <div className="p-3.5 rounded-3xl border border-amber-500/40 bg-[#251908]/80 flex items-center justify-between gap-3 shadow-lg">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <Gift className="w-5 h-5 animate-bounce" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[9px] font-black text-amber-300 uppercase">DAILY GIFT</div>
              <div className="text-xs font-bold text-white truncate">Claim +500 Coins +15 Gems</div>
              <button
                onClick={handleClaimDailyReward}
                disabled={dailyRewardClaimed}
                className={`mt-1.5 w-full py-1 rounded-xl font-black text-[9px] uppercase tracking-wider cursor-pointer active:scale-95 transition-all ${
                  dailyRewardClaimed
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 text-slate-950 shadow-md'
                }`}
              >
                {dailyRewardClaimed ? 'CLAIMED TODAY ✓' : 'CLAIM NOW'}
              </button>
            </div>
          </div>

          {/* Card 3: VICTORY CHEST */}
          <div className="p-3.5 rounded-3xl border border-blue-500/40 bg-[#0e1738]/80 flex items-center justify-between gap-3 shadow-lg">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
              <Trophy className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[9px] font-black text-blue-300 uppercase">VICTORY CHEST</div>
              <div className="text-xs font-bold text-white truncate">Win 2 more duels</div>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex-1 h-1.5 bg-slate-900 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: '50%' }} />
                </div>
                <span className="text-[10px] font-bold text-slate-400">1/2</span>
              </div>
            </div>
          </div>

          {/* Card 4: ARENA SHOP */}
          <div className="p-3.5 rounded-3xl border border-pink-500/40 bg-[#280d28]/80 flex items-center justify-between gap-3 shadow-lg">
            <div className="w-10 h-10 rounded-2xl bg-pink-500/20 text-pink-400 flex items-center justify-center shrink-0">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[9px] font-black text-pink-300 uppercase">POWER SHOP</div>
              <div className="text-xs font-bold text-white truncate">Boosters & Avatar Rings</div>
              <button
                onClick={() => setActiveModal('shop')}
                className="mt-1.5 w-full py-1 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-black text-[9px] uppercase tracking-wider cursor-pointer active:scale-95 transition-all shadow-md"
              >
                OPEN SHOP
              </button>
            </div>
          </div>

        </div>

      </main>

      {/* ============================================================== */}
      {/* 3. STICKY BOTTOM APP DOCK (Native App Feel) */}
      {/* ============================================================== */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#070319]/95 backdrop-blur-2xl border-t border-purple-900/40 py-2 px-4 shadow-2xl">
        <div className="max-w-md mx-auto flex items-center justify-around">
          
          <button 
            onClick={() => { if (onNavigateTab) onNavigateTab('home'); }}
            className="flex flex-col items-center gap-0.5 text-slate-400 hover:text-white cursor-pointer active:scale-95 transition-all"
          >
            <BookOpen className="w-4 h-4" />
            <span className="text-[10px] font-bold">Home</span>
          </button>

          <button 
            onClick={() => { if (onNavigateTab) onNavigateTab('courses'); }}
            className="flex flex-col items-center gap-0.5 text-slate-400 hover:text-white cursor-pointer active:scale-95 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-[10px] font-bold">Learn</span>
          </button>

          {/* Central Highlighted Arena Button */}
          <div 
            onClick={() => {
              try { audioEngine.playButtonTap(); } catch {}
              arohiArenaVoice.announceArenaWelcome();
            }}
            className="-mt-5 flex flex-col items-center cursor-pointer active:scale-95 transition-all"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 via-pink-600 to-amber-400 p-[2px] shadow-[0_0_20px_rgba(168,85,247,0.8)]">
              <div className="w-full h-full rounded-2xl bg-[#0e0724] flex items-center justify-center text-amber-300">
                <Swords className="w-6 h-6 animate-pulse" />
              </div>
            </div>
            <span className="text-[9px] font-black text-amber-300 mt-1">ARENA</span>
          </div>

          <button 
            onClick={() => { if (onBackToExams) onBackToExams(); else if (onNavigateTab) onNavigateTab('mocktests'); }}
            className="flex flex-col items-center gap-0.5 text-slate-400 hover:text-white cursor-pointer active:scale-95 transition-all"
          >
            <Shield className="w-4 h-4" />
            <span className="text-[10px] font-bold">Mock Tests</span>
          </button>

          <button 
            onClick={() => setActiveModal('leaderboard_full')}
            className="flex flex-col items-center gap-0.5 text-slate-400 hover:text-white cursor-pointer active:scale-95 transition-all"
          >
            <BarChart3 className="w-4 h-4" />
            <span className="text-[10px] font-bold">Ranks</span>
          </button>

        </div>
      </div>

      {/* ============================================================== */}
      {/* MODAL 1: 1v1 LIVE QUICK DUEL (Mobile-Optimized) */}
      {/* ============================================================== */}
      {/* ============================================================== */}
      {/* MODAL 1: 1v1 QUICK DUEL (Dynamic Questions & Real-Time Match) */}
      {/* ============================================================== */}
      {activeModal === 'quick_duel' && (
        <div className="fixed inset-0 z-[250] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto overscroll-contain animate-in fade-in duration-200">
          <div className="w-full max-w-xl rounded-3xl bg-[#0f0a28]/98 border border-purple-500/50 shadow-2xl p-5 sm:p-6 relative my-auto max-h-[86vh] sm:max-h-[90vh] overflow-y-auto flex flex-col space-y-4 animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setActiveModal('none')}
              className="absolute top-3.5 right-3.5 p-2 rounded-xl bg-purple-950/90 hover:bg-purple-900 text-slate-300 hover:text-white border border-purple-800/60 z-30 cursor-pointer active:scale-95"
            >
              <X className="w-5 h-5" />
            </button>

            {duelPhase === 'searching' && (
              <div className="py-10 sm:py-14 text-center space-y-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-purple-600/20 border-2 border-purple-500 flex items-center justify-center animate-spin">
                  <Swords className="w-8 h-8 sm:w-10 sm:h-10 text-purple-300" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-white">SEARCHING FOR OPPONENT...</h3>
                  <p className="text-xs text-purple-300/80 mt-1">
                    Matching with a real student in India for <span className="text-amber-400 font-bold">{selectedSubject}</span> ({currentClassTrackObj.name})
                  </p>
                </div>
                <div className="flex items-center justify-center gap-3 text-[11px] font-mono text-slate-400">
                  <span>Server: Bharat-Sync</span>
                  <span>•</span>
                  <span>MMR: Balanced</span>
                </div>
              </div>
            )}

            {duelPhase === 'battle' && (
              <div className="space-y-4">
                {/* Score Bar */}
                <div className="flex items-center justify-between p-2.5 sm:p-3 rounded-2xl bg-purple-950/50 border border-purple-800/40">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-purple-600 text-white font-black text-xs flex items-center justify-center">
                      {playerName.charAt(0)}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white truncate max-w-[90px] sm:max-w-none">{playerName}</div>
                      <div className="text-xs font-black text-amber-400">{duelUserScore} pts</div>
                    </div>
                  </div>

                  {/* Timer */}
                  <div className="text-center">
                    <div className="text-[9px] font-bold text-slate-400 uppercase">TIME</div>
                    <div className={`text-base sm:text-lg font-black font-mono ${duelTimeLeft <= 5 ? 'text-rose-400 animate-ping' : 'text-white'}`}>
                      00:{duelTimeLeft.toString().padStart(2, '0')}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-right">
                    <div>
                      <div className="text-xs font-bold text-white truncate max-w-[90px] sm:max-w-none">{duelOpponent.name}</div>
                      <div className="text-xs font-black text-blue-400">{duelOpponent.score} pts</div>
                    </div>
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-600 text-white font-black text-xs flex items-center justify-center">
                      {duelOpponent.name.charAt(0)}
                    </div>
                  </div>
                </div>

                {/* Arohi Prompt Banner */}
                <div className="p-2.5 rounded-2xl bg-gradient-to-r from-purple-900/50 to-indigo-900/50 border border-purple-500/30 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
                  <span className="text-[11px] sm:text-xs font-bold text-purple-200 line-clamp-2">
                    Arohi: "{duelArohiMessage}"
                  </span>
                </div>

                {/* Question Container */}
                {(() => {
                  const currentQ = (duelQuestions && duelQuestions.length > 0)
                    ? duelQuestions[duelCurrentQIndex % duelQuestions.length]
                    : DUEL_QUESTIONS[duelCurrentQIndex % DUEL_QUESTIONS.length];

                  return (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                        <span>Question {duelCurrentQIndex + 1} of {(duelQuestions && duelQuestions.length) || 5}</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => arohiArenaVoice.announceQuestion(currentQ.question, currentQ.options)}
                            className="px-2 py-1 rounded-lg bg-purple-900/60 hover:bg-purple-800 text-amber-300 transition-all flex items-center gap-1 text-[10px] font-bold border border-purple-700/40 cursor-pointer shadow-xs active:scale-95"
                            title="Listen to question spoken by Flagship Arohi Voice"
                          >
                            <Volume2 className="w-3 h-3" />
                            <span>Read</span>
                          </button>
                          <span className="text-amber-300 font-bold text-[11px]">+10 Pts</span>
                        </div>
                      </div>

                      <div className="p-3.5 sm:p-4 rounded-2xl bg-[#170e3c] border border-purple-900/50 text-xs sm:text-sm font-bold text-white leading-relaxed">
                        {currentQ.question}
                      </div>

                      {/* Options Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {currentQ.options.map((opt, oIdx) => {
                          const isSelected = duelSelectedOption === oIdx;
                          const isCorrect = oIdx === currentQ.correctIndex;
                          let btnStyle = 'bg-[#1a1042] border-purple-900/50 text-slate-200 hover:bg-purple-900/50';
                          if (duelSelectedOption !== null) {
                            if (isCorrect) btnStyle = 'bg-emerald-600 text-white border-emerald-400 font-black';
                            else if (isSelected) btnStyle = 'bg-rose-600 text-white border-rose-400 font-black';
                          }

                          return (
                            <button
                              key={oIdx}
                              disabled={duelSelectedOption !== null}
                              onClick={() => handleAnswerDuelQuestion(oIdx)}
                              className={`p-3 rounded-xl border text-xs font-bold text-left transition-all cursor-pointer active:scale-95 ${btnStyle}`}
                            >
                              <span className="font-mono text-slate-400 mr-1.5">
                                {String.fromCharCode(65 + oIdx)}.
                              </span>
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

            {duelPhase === 'result' && (
              <div className="py-6 text-center space-y-4">
                <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto rounded-full bg-gradient-to-tr from-amber-400 to-yellow-500 flex items-center justify-center shadow-xl">
                  <Trophy className="w-7 h-7 sm:w-8 sm:h-8 text-slate-950" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    {duelUserScore >= duelOpponent.score ? '🎉 VICTORY!' : '⚡ BATTLE COMPLETE'}
                  </h3>
                  <p className="text-xs text-purple-300 mt-1">
                    Your Score: <span className="font-black text-amber-400">{duelUserScore} pts</span> vs Opponent: <span className="font-black text-blue-400">{duelOpponent.score} pts</span>
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-purple-950/40 border border-purple-800/40 flex items-center justify-center gap-5">
                  <div className="text-center">
                    <div className="text-[9px] font-bold text-slate-400 uppercase">XP REWARD</div>
                    <div className="text-xs sm:text-sm font-black text-amber-300">+250 XP</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[9px] font-bold text-slate-400 uppercase">COINS</div>
                    <div className="text-xs sm:text-sm font-black text-amber-400">+150 🪙</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[9px] font-bold text-slate-400 uppercase">DIAMONDS</div>
                    <div className="text-xs sm:text-sm font-black text-cyan-400">+5 💎</div>
                  </div>
                </div>

                <div className="flex gap-2.5">
                  <button
                    onClick={handleStartQuickDuel}
                    className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 text-white font-black text-xs uppercase tracking-wider shadow-lg cursor-pointer active:scale-95"
                  >
                    PLAY AGAIN (NEW QUESTIONS)
                  </button>
                  <button
                    onClick={() => setActiveModal('none')}
                    className="px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs cursor-pointer active:scale-95"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL 2: 4v4 SQUAD BATTLE (Dynamic Team Arena) */}
      {/* ============================================================== */}
      {activeModal === 'squad_battle' && (
        <div className="fixed inset-0 z-[250] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto overscroll-contain animate-in fade-in duration-200">
          <div className="w-full max-w-xl rounded-3xl bg-[#0f0a28]/98 border border-purple-500/50 shadow-2xl p-5 sm:p-6 relative my-auto max-h-[86vh] sm:max-h-[90vh] overflow-y-auto flex flex-col space-y-4 animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setActiveModal('none')}
              className="absolute top-3.5 right-3.5 p-2 rounded-xl bg-purple-950/90 hover:bg-purple-900 text-slate-300 hover:text-white border border-purple-800/60 z-30 cursor-pointer active:scale-95"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-purple-600/30 border border-purple-500/50 flex items-center justify-center text-purple-300">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[9px] font-black uppercase text-purple-400 tracking-wider">TEAM CO-OP • {selectedSubject}</span>
                <h3 className="text-base font-black text-white">4v4 SQUAD ARENA</h3>
              </div>
            </div>

            {squadPhase === 'battle' && (
              <div className="space-y-4">
                {/* Team Scores */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-3 rounded-2xl bg-emerald-950/40 border border-emerald-500/40">
                    <div className="text-[10px] font-bold text-emerald-300 uppercase">Your Squad</div>
                    <div className="text-lg font-black text-emerald-400 font-mono">{squadTeamScore} pts</div>
                  </div>
                  <div className="p-3 rounded-2xl bg-rose-950/40 border border-rose-500/40 text-right">
                    <div className="text-[10px] font-bold text-rose-300 uppercase">Enemy Squad</div>
                    <div className="text-lg font-black text-rose-400 font-mono">{squadOpponentScore} pts</div>
                  </div>
                </div>

                {/* Squad Lineup with Real-time Contributions */}
                <div className="space-y-1.5">
                  <div className="text-[11px] font-bold text-slate-300">Squad Members:</div>
                  <div className="grid grid-cols-2 gap-2">
                    {squadTeammates.map((mem, i) => (
                      <div key={i} className={`p-2 rounded-xl border flex items-center justify-between ${mem.isUser ? 'bg-purple-900/40 border-purple-500/60' : 'bg-[#170e3c] border-purple-900/40'}`}>
                        <div className="flex items-center gap-2 min-w-0">
                          <div className={`w-6 h-6 rounded-full font-bold text-xs flex items-center justify-center ${mem.isUser ? 'bg-amber-500 text-slate-950' : 'bg-purple-700 text-white'}`}>
                            {mem.name.charAt(0)}
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs font-bold text-white truncate">{mem.name}</div>
                            <div className="text-[9px] text-purple-300 truncate">{mem.role}</div>
                          </div>
                        </div>
                        <span className="text-xs font-mono font-bold text-amber-300 shrink-0">+{mem.score}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Active Question */}
                {(() => {
                  const currentQ = squadQuestions[squadQIndex] || squadQuestions[0];
                  if (!currentQ) return null;
                  return (
                    <div className="space-y-3 pt-1">
                      <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                        <span>Question {squadQIndex + 1} of {squadQuestions.length || 4}</span>
                        <div className="flex items-center gap-2">
                          <span className={`font-mono font-bold ${squadTimeLeft <= 5 ? 'text-rose-400 animate-pulse' : 'text-amber-300'}`}>
                            ⏱ {squadTimeLeft}s
                          </span>
                        </div>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-[#170e3c] border border-purple-900/50 text-xs sm:text-sm font-bold text-white">
                        {currentQ.question}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {currentQ.options.map((opt, oIdx) => {
                          const isSelected = squadSelectedOpt === oIdx;
                          const isCorrect = oIdx === currentQ.correctIndex;
                          let btnStyle = 'bg-[#1a1042] border-purple-900/50 text-slate-200 hover:bg-purple-900/50';
                          if (squadSelectedOpt !== null) {
                            if (isCorrect) btnStyle = 'bg-emerald-600 text-white border-emerald-400 font-bold';
                            else if (isSelected) btnStyle = 'bg-rose-600 text-white border-rose-400 font-bold';
                          }

                          return (
                            <button
                              key={oIdx}
                              disabled={squadSelectedOpt !== null}
                              onClick={() => handleAnswerSquadQuestion(oIdx)}
                              className={`p-3 rounded-xl border text-xs font-bold text-left transition-all cursor-pointer active:scale-95 ${btnStyle}`}
                            >
                              <span className="font-mono text-slate-400 mr-1.5">{String.fromCharCode(65 + oIdx)}.</span>
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

            {squadPhase === 'result' && (
              <div className="py-6 text-center space-y-4">
                <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-tr from-amber-400 to-yellow-500 flex items-center justify-center shadow-xl">
                  <Trophy className="w-7 h-7 text-slate-950" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white">
                    {squadTeamScore >= squadOpponentScore ? '🎉 SQUAD VICTORY!' : '⚡ SQUAD BATTLE CONCLUDED'}
                  </h3>
                  <p className="text-xs text-purple-300 mt-1">
                    Your Team: <span className="font-black text-emerald-400">{squadTeamScore} pts</span> vs Enemy: <span className="font-black text-rose-400">{squadOpponentScore} pts</span>
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-purple-950/40 border border-purple-800/40 flex items-center justify-center gap-5">
                  <div className="text-center">
                    <div className="text-[9px] font-bold text-slate-400 uppercase">XP REWARD</div>
                    <div className="text-xs font-black text-amber-300">+500 XP</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[9px] font-bold text-slate-400 uppercase">COINS</div>
                    <div className="text-xs font-black text-amber-400">+300 🪙</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[9px] font-bold text-slate-400 uppercase">DIAMONDS</div>
                    <div className="text-xs font-black text-cyan-400">+10 💎</div>
                  </div>
                </div>

                <div className="flex gap-2.5">
                  <button
                    onClick={handleStartSquadBattle}
                    className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 text-white font-black text-xs uppercase tracking-wider shadow-lg cursor-pointer active:scale-95"
                  >
                    PLAY SQUAD AGAIN
                  </button>
                  <button
                    onClick={() => setActiveModal('none')}
                    className="px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs cursor-pointer active:scale-95"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL 3: WEAKNESS QUEST (Targeted Diagnosis Micro-Quest) */}
      {/* ============================================================== */}
      {activeModal === 'weakness_quest' && (
        <div className="fixed inset-0 z-[250] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto overscroll-contain animate-in fade-in duration-200">
          <div className="w-full max-w-lg rounded-3xl bg-[#0f0a28]/98 border border-purple-500/50 shadow-2xl p-5 sm:p-6 relative my-auto max-h-[86vh] sm:max-h-[90vh] overflow-y-auto flex flex-col space-y-4 animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setActiveModal('none')}
              className="absolute top-3.5 right-3.5 p-2 rounded-xl bg-purple-950/90 hover:bg-purple-900 text-slate-300 hover:text-white border border-purple-800/60 z-30 cursor-pointer active:scale-95"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-purple-600/30 border border-purple-500/50 flex items-center justify-center text-purple-300">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[9px] font-black uppercase text-purple-400 tracking-wider">AI WEAKNESS QUEST</span>
                <h3 className="text-base font-black text-white">{questTargetTopic} Power Boost</h3>
              </div>
            </div>

            {questPhase === 'battle' && (
              <div className="space-y-3">
                <div className="p-3.5 rounded-2xl bg-[#170e3c] border border-purple-900/50 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-slate-400">Target Accuracy:</span>
                    <span className="text-emerald-400 font-mono font-black">{questInitialPower}% ➔ {questFinalPower}%</span>
                  </div>
                  <p className="text-xs text-purple-200/90 leading-relaxed">
                    Solve this diagnostic challenge to unlock accuracy mastery and climb your national percentile.
                  </p>
                </div>

                {(() => {
                  const currentQ = questQuestions[questQIndex] || questQuestions[0];
                  if (!currentQ) return null;
                  return (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                        <span>Challenge {questQIndex + 1} of {questQuestions.length || 3}</span>
                        <button
                          onClick={() => arohiArenaVoice.announceQuestion(currentQ.question, currentQ.options)}
                          className="px-2 py-1 rounded-lg bg-purple-900/60 hover:bg-purple-800 text-amber-300 transition-all flex items-center gap-1 text-[10px] font-bold border border-purple-700/40 cursor-pointer"
                        >
                          <Volume2 className="w-3 h-3" />
                          <span>Read</span>
                        </button>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-[#1a1144] border border-purple-800/40 text-xs sm:text-sm font-bold text-white">
                        {currentQ.question}
                      </div>

                      {currentQ.hint && (
                        <div className="p-2.5 rounded-xl bg-purple-950/60 border border-purple-800/40 text-[11px] text-amber-300 font-mono">
                          💡 Hint: {currentQ.hint}
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {currentQ.options.map((opt, oIdx) => {
                          const isSelected = questSelectedOpt === oIdx;
                          const isCorrect = oIdx === currentQ.correctIndex;
                          let btnStyle = 'bg-[#1b1145] hover:bg-purple-600 text-white border-purple-800/50';
                          if (questSelectedOpt !== null) {
                            if (isCorrect) btnStyle = 'bg-emerald-600 text-white border-emerald-400 font-bold';
                            else if (isSelected) btnStyle = 'bg-rose-600 text-white border-rose-400 font-bold';
                          }

                          return (
                            <button
                              key={oIdx}
                              disabled={questSelectedOpt !== null}
                              onClick={() => handleAnswerWeaknessQuestion(oIdx)}
                              className={`p-3 rounded-xl text-xs font-bold border text-left cursor-pointer active:scale-95 transition-all ${btnStyle}`}
                            >
                              <span className="font-mono text-slate-400 mr-1.5">{String.fromCharCode(65 + oIdx)}.</span>
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

            {questPhase === 'mastered' && (
              <div className="py-6 text-center space-y-4">
                <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center text-emerald-400 shadow-xl">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white">WEAKNESS MASTERED!</h3>
                  <p className="text-xs text-purple-300 mt-1">
                    {questTargetTopic} boosted to <span className="font-black text-emerald-400">{questFinalPower}% Accuracy</span>!
                  </p>
                </div>
                <div className="p-3 rounded-2xl bg-purple-950/40 border border-purple-800/40 flex items-center justify-center gap-4 text-xs font-bold text-amber-300">
                  <span>+200 Coins 🪙</span>
                  <span>•</span>
                  <span>+5 Gems 💎</span>
                </div>
                <button
                  onClick={() => setActiveModal('none')}
                  className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider cursor-pointer active:scale-95"
                >
                  RETURN TO ARENA
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL 4: BOSS BATTLE (Dynamic Subject Bosses with Live HP) */}
      {/* ============================================================== */}
      {activeModal === 'boss_battle' && (
        <div className="fixed inset-0 z-[250] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto overscroll-contain animate-in fade-in duration-200">
          <div className="w-full max-w-lg rounded-3xl bg-[#150716]/98 border border-rose-500/50 shadow-2xl p-5 sm:p-6 relative my-auto max-h-[86vh] sm:max-h-[90vh] overflow-y-auto flex flex-col space-y-4 animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setActiveModal('none')}
              className="absolute top-3.5 right-3.5 p-2 rounded-xl bg-rose-950/90 hover:bg-rose-900 text-slate-300 hover:text-white border border-rose-800/60 z-30 cursor-pointer active:scale-95"
            >
              <X className="w-5 h-5" />
            </button>

            {bossPhase === 'battle' && (
              <div className="space-y-4 text-center">
                <div className={`w-14 h-14 mx-auto rounded-full border-2 flex items-center justify-center animate-pulse ${bossInfo.avatarBg}`}>
                  <Skull className="w-7 h-7" />
                </div>

                <div>
                  <span className="text-[9px] font-black text-rose-400 uppercase tracking-widest">STAGE BOSS • {selectedSubject}</span>
                  <h3 className="text-lg sm:text-xl font-black text-white">{bossInfo.name}</h3>
                  <p className="text-xs text-rose-200/80 mt-0.5">{bossInfo.title}</p>
                </div>

                {/* HP Gauges */}
                <div className="grid grid-cols-2 gap-3 text-left">
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-bold text-rose-300">
                      <span>Boss HP</span>
                      <span>{bossHp}/100</span>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-slate-950 overflow-hidden border border-rose-900/50">
                      <div className="h-full bg-gradient-to-r from-rose-600 to-red-500 rounded-full transition-all duration-300" style={{ width: `${bossHp}%` }} />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-bold text-cyan-300">
                      <span>Your Shield</span>
                      <span>{bossPlayerHp}/100</span>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-slate-950 overflow-hidden border border-cyan-900/50">
                      <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-300" style={{ width: `${bossPlayerHp}%` }} />
                    </div>
                  </div>
                </div>

                {/* Question Combat */}
                {(() => {
                  const currentQ = bossQuestions[bossQIndex] || bossQuestions[0];
                  if (!currentQ) return null;
                  return (
                    <div className="space-y-3 pt-2 text-left">
                      <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                        <span>Attack Spell #{bossQIndex + 1}</span>
                        <span className="text-amber-400 font-bold">⏱ {bossTimeLeft}s</span>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-[#200e1f] border border-rose-900/50 text-xs sm:text-sm font-bold text-white">
                        {currentQ.question}
                      </div>

                      <div className="grid grid-cols-1 gap-2">
                        {currentQ.options.map((opt, oIdx) => {
                          const isSelected = bossSelectedOpt === oIdx;
                          const isCorrect = oIdx === currentQ.correctIndex;
                          let btnStyle = 'bg-[#250d22] border-rose-900/50 text-slate-200 hover:bg-rose-900/50';
                          if (bossSelectedOpt !== null) {
                            if (isCorrect) btnStyle = 'bg-emerald-600 text-white border-emerald-400 font-bold';
                            else if (isSelected) btnStyle = 'bg-rose-600 text-white border-rose-400 font-bold';
                          }

                          return (
                            <button
                              key={oIdx}
                              disabled={bossSelectedOpt !== null}
                              onClick={() => handleAnswerBossQuestion(oIdx)}
                              className={`p-3 rounded-xl border text-xs font-bold text-left transition-all cursor-pointer active:scale-95 ${btnStyle}`}
                            >
                              <span className="font-mono text-slate-400 mr-1.5">{String.fromCharCode(65 + oIdx)}.</span>
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

            {bossPhase === 'victory' && (
              <div className="py-6 text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-amber-400 to-yellow-500 flex items-center justify-center shadow-xl">
                  <Crown className="w-8 h-8 text-slate-950" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-white">BOSS SLAIN! 🏆</h3>
                  <p className="text-xs text-rose-300 mt-1">You conquered {bossInfo.name} and proved academic mastery!</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-rose-950/40 border border-rose-800/40 flex items-center justify-center gap-5">
                  <div className="text-center">
                    <div className="text-[9px] font-bold text-slate-400 uppercase">XP REWARD</div>
                    <div className="text-xs font-black text-amber-300">+800 XP</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[9px] font-bold text-slate-400 uppercase">COINS</div>
                    <div className="text-xs font-black text-amber-400">+500 🪙</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[9px] font-bold text-slate-400 uppercase">DIAMONDS</div>
                    <div className="text-xs font-black text-cyan-400">+15 💎</div>
                  </div>
                </div>
                <div className="flex gap-2.5">
                  <button
                    onClick={handleStartBossBattle}
                    className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 text-white font-black text-xs uppercase tracking-wider cursor-pointer active:scale-95"
                  >
                    BATTLE NEXT BOSS
                  </button>
                  <button
                    onClick={() => setActiveModal('none')}
                    className="px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs cursor-pointer active:scale-95"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}

            {bossPhase === 'defeat' && (
              <div className="py-6 text-center space-y-4">
                <div className="w-14 h-14 mx-auto rounded-full bg-rose-900/40 border border-rose-500 flex items-center justify-center text-rose-400">
                  <Skull className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white">DEFEAT BY {bossInfo.name}</h3>
                  <p className="text-xs text-slate-400 mt-1">Review your core subject concepts and try again!</p>
                </div>
                <button
                  onClick={handleStartBossBattle}
                  className="w-full py-3 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs uppercase tracking-wider cursor-pointer active:scale-95"
                >
                  RETRY BOSS BATTLE
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL 5: ENDLESS SURVIVAL GAUNTLET (3 Lives, Unlimited Multipliers) */}
      {/* ============================================================== */}
      {activeModal === 'survival' && (
        <div className="fixed inset-0 z-[250] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto overscroll-contain animate-in fade-in duration-200">
          <div className="w-full max-w-lg rounded-3xl bg-[#08181a]/98 border border-teal-500/50 shadow-2xl p-5 sm:p-6 relative my-auto max-h-[86vh] sm:max-h-[90vh] overflow-y-auto flex flex-col space-y-4 animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setActiveModal('none')}
              className="absolute top-3.5 right-3.5 p-2 rounded-xl bg-teal-950/90 hover:bg-teal-900 text-slate-300 hover:text-white border border-teal-800/60 z-30 cursor-pointer active:scale-95"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-teal-500/20 border border-teal-400/40 flex items-center justify-center text-teal-400">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[9px] font-black uppercase text-teal-400 tracking-wider">ENDLESS GAUNTLET • {selectedSubject}</span>
                <h3 className="text-base font-black text-white">SURVIVAL ARENA</h3>
              </div>
            </div>

            {survivalPhase === 'playing' && (
              <div className="space-y-4">
                {/* Stats Bar */}
                <div className="p-3 rounded-2xl bg-[#0b282c] border border-teal-800/50 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1 text-rose-400">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <Heart key={i} className={`w-4 h-4 ${i < survivalLives ? 'fill-rose-500 text-rose-500' : 'text-slate-600'}`} />
                    ))}
                    <span className="ml-1 text-[11px] font-bold text-slate-300">{survivalLives} Lives</span>
                  </div>

                  <div className="text-center">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Score</span>
                    <span className="text-base font-black text-amber-400 font-mono">{survivalScore}</span>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-teal-300 uppercase font-bold block">Multiplier</span>
                    <span className="text-xs font-black text-teal-300 font-mono">{survivalMultiplier}x</span>
                  </div>
                </div>

                {/* Question */}
                {(() => {
                  const currentQ = survivalQuestions[survivalQIndex] || survivalQuestions[0];
                  if (!currentQ) return null;
                  return (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                        <span>Wave #{survivalQIndex + 1}</span>
                        <span className={`font-bold ${survivalTimeLeft <= 4 ? 'text-rose-400 animate-pulse' : 'text-teal-300'}`}>
                          ⏱ {survivalTimeLeft}s
                        </span>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-[#0e2f34] border border-teal-800/40 text-xs sm:text-sm font-bold text-white">
                        {currentQ.question}
                      </div>

                      <div className="grid grid-cols-1 gap-2">
                        {currentQ.options.map((opt, oIdx) => {
                          const isSelected = survivalSelectedOpt === oIdx;
                          const isCorrect = oIdx === currentQ.correctIndex;
                          let btnStyle = 'bg-[#0f343a] border-teal-900/60 text-slate-200 hover:bg-teal-900/50';
                          if (survivalSelectedOpt !== null) {
                            if (isCorrect) btnStyle = 'bg-emerald-600 text-white border-emerald-400 font-bold';
                            else if (isSelected) btnStyle = 'bg-rose-600 text-white border-rose-400 font-bold';
                          }

                          return (
                            <button
                              key={oIdx}
                              disabled={survivalSelectedOpt !== null}
                              onClick={() => handleAnswerSurvivalQuestion(oIdx)}
                              className={`p-3 rounded-xl border text-xs font-bold text-left transition-all cursor-pointer active:scale-95 ${btnStyle}`}
                            >
                              <span className="font-mono text-slate-400 mr-1.5">{String.fromCharCode(65 + oIdx)}.</span>
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

            {survivalPhase === 'gameover' && (
              <div className="py-6 text-center space-y-4">
                <div className="w-14 h-14 mx-auto rounded-full bg-rose-500/20 border-2 border-rose-500 flex items-center justify-center text-rose-400">
                  <Shield className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white">SURVIVAL RUN CONCLUDED</h3>
                  <p className="text-xs text-teal-300 mt-1">
                    You survived to Wave #{survivalQIndex + 1} with <span className="font-black text-amber-400">{survivalScore} pts</span>!
                  </p>
                </div>
                <div className="p-3 rounded-2xl bg-teal-950/50 border border-teal-800/40 text-xs font-bold text-amber-300">
                  High Score: {survivalBestScore} pts • Coins Earned: +{Math.round(survivalScore * 2)} 🪙
                </div>
                <div className="flex gap-2.5">
                  <button
                    onClick={handleStartSurvival}
                    className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 font-black text-xs uppercase tracking-wider cursor-pointer active:scale-95"
                  >
                    TRY AGAIN
                  </button>
                  <button
                    onClick={() => setActiveModal('none')}
                    className="px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs cursor-pointer active:scale-95"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL 6: CLASS & EXAM TRACK PICKER */}
      {/* ============================================================== */}
      {activeModal === 'class_picker' && (
        <div className="fixed inset-0 z-[250] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto overscroll-contain animate-in fade-in duration-200">
          <div className="w-full max-w-2xl rounded-3xl bg-[#0f0a28]/98 border border-purple-500/50 shadow-2xl p-5 sm:p-6 relative my-auto max-h-[86vh] sm:max-h-[90vh] overflow-y-auto flex flex-col space-y-4 animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setActiveModal('none')}
              className="absolute top-3.5 right-3.5 p-2 rounded-xl bg-purple-950/90 hover:bg-purple-900 text-slate-300 hover:text-white border border-purple-800/60 z-30 cursor-pointer active:scale-95"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-purple-600/30 border border-purple-500/50 flex items-center justify-center text-purple-300">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[9px] font-black uppercase text-purple-400 tracking-wider">ALL-INDIA SYLLABUS SYNC</span>
                <h3 className="text-base font-black text-white">SELECT CLASS OR COMPETITIVE EXAM</h3>
              </div>
            </div>

            <p className="text-xs text-purple-200/80">
              Questions in all game modes (Duels, 4v4 Squads, Boss Battles, Survival) will calibrate to your selected grade:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[50vh] overflow-y-auto pr-1">
              {ARENA_CLASS_TRACKS.map((t) => {
                const isSelected = selectedClassTrack === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => {
                      handleSelectClassTrack(t.id);
                      setActiveModal('none');
                    }}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer active:scale-95 flex items-start gap-3 ${
                      isSelected
                        ? 'bg-purple-600/30 border-amber-400 ring-2 ring-amber-400/40 shadow-lg'
                        : 'bg-[#170e3c] border-purple-900/40 hover:bg-purple-900/40'
                    }`}
                  >
                    <div className="w-9 h-9 rounded-xl bg-purple-900/50 border border-purple-700/50 flex items-center justify-center text-lg shrink-0">
                      <span>{t.icon}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-xs font-black text-white truncate">{t.name}</span>
                        {isSelected && <span className="text-[10px] font-bold text-amber-400">ACTIVE ✓</span>}
                      </div>
                      <div className="text-[10px] text-purple-300 font-bold mt-0.5">{t.badge}</div>
                      <p className="text-[10px] text-slate-400 mt-1 line-clamp-2">{t.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL 7: SUBJECT FILTER PICKER */}
      {/* ============================================================== */}
      {activeModal === 'subject_picker' && (
        <div className="fixed inset-0 z-[250] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto overscroll-contain animate-in fade-in duration-200">
          <div className="w-full max-w-xl rounded-3xl bg-[#0f0a28]/98 border border-purple-500/50 shadow-2xl p-5 sm:p-6 relative my-auto max-h-[86vh] sm:max-h-[90vh] overflow-y-auto flex flex-col space-y-4 animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setActiveModal('none')}
              className="absolute top-3.5 right-3.5 p-2 rounded-xl bg-purple-950/90 hover:bg-purple-900 text-slate-300 hover:text-white border border-purple-800/60 z-30 cursor-pointer active:scale-95"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400">
                <Filter className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[9px] font-black uppercase text-amber-400 tracking-wider">TOPIC SPECIALIZATION</span>
                <h3 className="text-base font-black text-white">SELECT BATTLE SUBJECT</h3>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[50vh] overflow-y-auto pr-1">
              {ARENA_SUBJECTS_LIST.map((subj, idx) => {
                const isSelected = selectedSubject === subj;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      handleSelectSubject(subj);
                      setActiveModal('none');
                    }}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer active:scale-95 flex items-center justify-between ${
                      isSelected
                        ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold ring-1 ring-amber-400/50'
                        : 'bg-[#170e3c] border-purple-900/40 text-slate-200 hover:bg-purple-900/40'
                    }`}
                  >
                    <span className="text-xs font-bold">{subj}</span>
                    {isSelected && <span className="text-xs font-black">✓</span>}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL 8: TOURNAMENT DETAILS */}
      {/* ============================================================== */}
      {activeModal === 'tournament_details' && selectedTournament && (
        <div className="fixed inset-0 z-[250] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto overscroll-contain animate-in fade-in duration-200">
          <div className="w-full max-w-2xl rounded-3xl bg-[#0f0a28]/98 border-2 border-amber-500/40 shadow-[0_0_50px_rgba(245,158,11,0.25)] p-5 sm:p-7 relative my-auto max-h-[86vh] sm:max-h-[90vh] overflow-y-auto flex flex-col space-y-4 animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setActiveModal('none')}
              className="absolute top-4 right-4 p-2 rounded-xl bg-purple-950/90 hover:bg-purple-900 text-slate-300 hover:text-white border border-purple-800/60 z-30 cursor-pointer active:scale-95 transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1.5 pr-8">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`text-[9px] font-black uppercase px-2.5 py-0.5 rounded-full border ${selectedTournament.badgeBg}`}>
                  ⏳ {selectedTournament.daysLeft} DAYS REMAINING
                </span>
                <span className="text-[9px] font-black uppercase px-2.5 py-0.5 rounded-full bg-purple-900/50 text-purple-300 border border-purple-700/40">
                  📚 {selectedTournament.category}
                </span>
                <span className="text-[9px] font-black uppercase px-2.5 py-0.5 rounded-full bg-emerald-900/40 text-emerald-300 border border-emerald-700/40">
                  👥 {selectedTournament.participants} Registered
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                {selectedTournament.title}
              </h3>
              <p className="text-xs sm:text-sm text-purple-200/90 leading-relaxed">
                {selectedTournament.description}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-gradient-to-br from-[#170e3c] to-[#0d0725] border border-amber-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-amber-400" />
                  <span className="text-xs font-black text-amber-300 uppercase tracking-wider">
                    GUARANTEED CASH PRIZE POOL
                  </span>
                </div>
                <span className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 font-mono">
                  {selectedTournament.prizePool}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {selectedTournament.prizes.map((p, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-purple-950/60 border border-purple-800/40 flex items-center justify-between">
                    <span className="text-slate-200 font-bold">{p.rank}</span>
                    <span className="text-amber-300 font-black font-mono">{p.amount}</span>
                  </div>
                ))}
              </div>
            </div>

            {selectedTournament.schedule && selectedTournament.schedule.length > 0 && (
              <div className="p-3.5 rounded-2xl bg-[#140e32] border border-purple-900/40 space-y-2">
                <span className="text-[10px] font-black uppercase text-purple-400 tracking-wider block">
                  CHAMPIONSHIP TIMELINE & STAGES
                </span>
                <div className="space-y-1.5 text-xs">
                  {selectedTournament.schedule.map((stg, sIdx) => (
                    <div key={sIdx} className="flex items-center justify-between p-2 rounded-xl bg-purple-950/40 border border-purple-800/30 text-slate-300">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                          {stg.stage}
                        </span>
                        <span className="font-bold text-white">{stg.days}</span>
                      </div>
                      <span className="text-[11px] text-purple-300/80 text-right">{stg.details}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-2 space-y-2">
              <button
                onClick={() => {
                  handleRegisterTournament(selectedTournament);
                  setActiveModal('none');
                }}
                className={`w-full py-4 rounded-2xl font-black text-xs sm:text-sm uppercase tracking-wider shadow-xl cursor-pointer active:scale-95 transition-all flex items-center justify-center gap-2 ${
                  registeredTournamentIds.includes(selectedTournament.id)
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-emerald-500/30'
                    : 'bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-slate-950 shadow-amber-500/30'
                }`}
              >
                {registeredTournamentIds.includes(selectedTournament.id) ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-white" />
                    <span>REGISTERED & SEAT CONFIRMED ✓</span>
                  </>
                ) : (
                  <>
                    <Trophy className="w-5 h-5 text-slate-950" />
                    <span>REGISTER FREE FOR THIS CHAMPIONSHIP</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setActiveModal('none')}
                className="w-full py-2.5 rounded-xl bg-purple-950/60 hover:bg-purple-900/60 text-slate-400 hover:text-white font-bold text-xs uppercase cursor-pointer transition-colors"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL 9: ARENA POWER SHOP */}
      {/* ============================================================== */}
      {activeModal === 'shop' && (
        <div className="fixed inset-0 z-[250] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto overscroll-contain animate-in fade-in duration-200">
          <div className="w-full max-w-lg rounded-3xl bg-[#0f0a28]/98 border border-purple-500/50 shadow-2xl p-5 sm:p-6 relative my-auto max-h-[86vh] sm:max-h-[90vh] overflow-y-auto flex flex-col space-y-4 animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setActiveModal('none')}
              className="absolute top-3.5 right-3.5 p-2 rounded-xl bg-purple-950/90 hover:bg-purple-900 text-slate-300 hover:text-white border border-purple-800/60 z-30 cursor-pointer active:scale-95"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-black text-white">ARENA POWER SHOP</h3>
                <p className="text-xs text-purple-300">Boosters, rings & tournament golden passes</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                { name: '2X XP Booster (24h)', cost: '500 Coins', icon: Zap },
                { name: 'Cyber Avatar Aura', cost: '1,500 Coins', icon: Crown },
                { name: 'AI Hint Compass', cost: '25 Gems', icon: Sparkles },
                { name: 'Tournament Golden Ticket', cost: '50 Gems', icon: Trophy }
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="p-3 rounded-2xl bg-[#170e3c] border border-purple-900/50 space-y-1.5 text-center">
                    <Icon className="w-5 h-5 mx-auto text-amber-400" />
                    <div className="text-xs font-bold text-white">{item.name}</div>
                    <div className="text-[11px] font-mono text-amber-300 font-bold">{item.cost}</div>
                    <button
                      onClick={() => {
                        try { audioEngine.playSuccess(); } catch {}
                        arohiArenaVoice.announceItemEquipped(item.name);
                      }}
                      className="w-full py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-[10px] cursor-pointer active:scale-95"
                    >
                      BUY & EQUIP
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL 10: FULL NATIONAL LEADERBOARD */}
      {/* ============================================================== */}
      {activeModal === 'leaderboard_full' && (
        <div className="fixed inset-0 z-[250] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto overscroll-contain animate-in fade-in duration-200">
          <div className="w-full max-w-xl rounded-3xl bg-[#0f0a28]/98 border border-purple-500/50 shadow-2xl p-5 sm:p-6 relative my-auto max-h-[86vh] sm:max-h-[90vh] overflow-y-auto flex flex-col space-y-4 animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setActiveModal('none')}
              className="absolute top-3.5 right-3.5 p-2 rounded-xl bg-purple-950/90 hover:bg-purple-900 text-slate-300 hover:text-white border border-purple-800/60 z-30 cursor-pointer active:scale-95"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400">
                <Trophy className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-black text-white">ALL-INDIA LEADERBOARD</h3>
                <p className="text-xs text-purple-300">National Season 4 • Top Rankers</p>
              </div>
            </div>

            <div className="space-y-2 max-h-[55vh] overflow-y-auto pr-1">
              {[
                { rank: 1, name: 'Riya Sharma', location: 'Delhi', xp: '15,680 XP', badge: '🥇' },
                { rank: 2, name: 'Aryan Verma', location: 'Maharashtra', xp: '14,250 XP', badge: '🥈' },
                { rank: 3, name: 'Kabir Singh', location: 'Punjab', xp: '13,890 XP', badge: '🥉' },
                { rank: 4, name: 'Aarav Nayak (You)', location: 'Odisha', xp: '12,450 XP', badge: '4', isUser: true },
                { rank: 5, name: 'Neha Iyer', location: 'Tamil Nadu', xp: '11,980 XP', badge: '5' },
                { rank: 6, name: 'Vikram Patel', location: 'Gujarat', xp: '11,420 XP', badge: '6' },
                { rank: 7, name: 'Pooja Reddy', location: 'Telangana', xp: '10,950 XP', badge: '7' },
                { rank: 8, name: 'Ananya Sen', location: 'West Bengal', xp: '10,310 XP', badge: '8' },
              ].map((r) => (
                <div
                  key={r.rank}
                  className={`flex items-center justify-between p-3 rounded-2xl border ${
                    r.isUser
                      ? 'bg-blue-900/40 border-blue-400/50'
                      : 'bg-[#181142]/60 border-purple-900/30'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 text-center font-black text-xs text-amber-300">{r.badge}</span>
                    <div className="w-7 h-7 rounded-full bg-purple-800 flex items-center justify-center text-xs font-bold text-white">
                      {r.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">{r.name}</div>
                      <div className="text-[10px] text-purple-300/70">{r.location}</div>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-black text-amber-300">{r.xp}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL 11: REWARDS CENTER */}
      {/* ============================================================== */}
      {activeModal === 'rewards' && (
        <div className="fixed inset-0 z-[250] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto overscroll-contain animate-in fade-in duration-200">
          <div className="w-full max-w-lg rounded-3xl bg-[#0f0a28]/98 border border-purple-500/50 shadow-2xl p-5 sm:p-6 relative my-auto max-h-[86vh] sm:max-h-[90vh] overflow-y-auto flex flex-col space-y-4 animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setActiveModal('none')}
              className="absolute top-3.5 right-3.5 p-2 rounded-xl bg-purple-950/90 hover:bg-purple-900 text-slate-300 hover:text-white border border-purple-800/60 z-30 cursor-pointer active:scale-95"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-pink-500/20 border border-pink-400/40 flex items-center justify-center text-pink-400">
                <Gift className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-black text-white">ARENA REWARD CENTER</h3>
                <p className="text-xs text-purple-300">Daily check-ins, season trophies & tournament drops</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#170e3c] border border-purple-900/50 space-y-2">
              <div className="text-xs font-bold text-amber-300 uppercase tracking-wider">Today's Streak Bonus:</div>
              <div className="flex items-center justify-between text-xs text-white">
                <span>🔥 12-Day Winning Streak</span>
                <span className="font-bold text-amber-400">+500 Coins +15 Gems</span>
              </div>
              <button
                onClick={handleClaimDailyReward}
                disabled={dailyRewardClaimed}
                className={`w-full py-2.5 rounded-xl font-black text-xs uppercase tracking-wider cursor-pointer active:scale-95 ${
                  dailyRewardClaimed
                    ? 'bg-slate-800 text-slate-500'
                    : 'bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 shadow-md'
                }`}
              >
                {dailyRewardClaimed ? 'CLAIMED TODAY ✓' : 'CLAIM REWARD'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL 12: WARRIOR PROFILE */}
      {/* ============================================================== */}
      {activeModal === 'profile' && (
        <div className="fixed inset-0 z-[250] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto overscroll-contain animate-in fade-in duration-200">
          <div className="w-full max-w-lg rounded-3xl bg-[#0f0a28]/98 border border-purple-500/50 shadow-2xl p-5 sm:p-6 relative my-auto max-h-[86vh] sm:max-h-[90vh] overflow-y-auto flex flex-col space-y-4 animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setActiveModal('none')}
              className="absolute top-3.5 right-3.5 p-2 rounded-xl bg-purple-950/90 hover:bg-purple-900 text-slate-300 hover:text-white border border-purple-800/60 z-30 cursor-pointer active:scale-95"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white font-black text-lg shadow-lg">
                {playerName.charAt(0)}
              </div>
              <div>
                <h3 className="text-base font-black text-white">{playerName}</h3>
                <p className="text-xs text-purple-300">Level {level} Elite Scholar • India Rank #236</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2.5 rounded-xl bg-purple-950/40 border border-purple-900/40">
                <div className="text-[9px] font-bold text-slate-400">WIN STREAK</div>
                <div className="text-sm font-black text-orange-400">{winningStreak} 🔥</div>
              </div>
              <div className="p-2.5 rounded-xl bg-purple-950/40 border border-purple-900/40">
                <div className="text-[9px] font-bold text-slate-400">TOTAL COINS</div>
                <div className="text-sm font-black text-amber-400">{goldCoins.toLocaleString()} 🪙</div>
              </div>
              <div className="p-2.5 rounded-xl bg-purple-950/40 border border-purple-900/40">
                <div className="text-[9px] font-bold text-slate-400">DIAMONDS</div>
                <div className="text-sm font-black text-cyan-400">{gems} 💎</div>
              </div>
            </div>

            <button
              onClick={() => setActiveModal('none')}
              className="w-full py-3 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-black text-xs uppercase tracking-wider cursor-pointer active:scale-95"
            >
              Back to Arena
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
