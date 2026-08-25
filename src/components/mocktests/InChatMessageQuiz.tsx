import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  CheckCircle2, XCircle, Award, Sparkles, ArrowRight, ArrowLeft,
  HelpCircle, RefreshCw, Check, Brain, Play, RotateCcw,
  BookOpen, Layers, CheckCircle, TrendingUp, Zap, Clock,
  Bookmark, Flag, Eye, ShieldCheck, ListOrdered, CheckSquare,
  AlertTriangle, Pause, Volume2, VolumeX, BarChart2, Lock
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../firebase';
import { doc, updateDoc, arrayUnion, setDoc, getDoc } from 'firebase/firestore';
import ArohiExamPassModal from './ArohiExamPassModal';

export interface ParsedQuizQuestion {
  id: string;
  questionNumber: number;
  text: string;
  options: { id: string; text: string }[];
  correctOption?: string; // 'A', 'B', 'C', 'D'
  explanation?: string;
  subject?: string;
  topic?: string;
}

export interface ParsedFlashcard {
  id: string;
  cardNumber: number;
  topic: string;
  front: string;
  back: string;
  mnemonic?: string;
}

interface InChatMessageQuizProps {
  content: string;
  isDarkMode?: boolean;
  onLaunchFullCbt?: () => void;
  onSyncScore?: (report: any) => void;
}

/**
 * Ultra-resilient Parser for MCQs generated in AI Chat:
 * - Parses single-choice questions with 4 options (A-D or a-d)
 * - Supports arbitrary numbering: Q1., Question 1:, **1.**, 1), Section A - Q1., etc.
 * - Supports options on separate lines or inline (a) ... (b) ... (c) ... (d)
 * - Supports inline Answer lines AND bottom Answer Key sections (e.g. "1. (b)", "2. A")
 */
export function parseMcqsFromText(text: string): ParsedQuizQuestion[] {
  if (!text || typeof text !== 'string') return [];

  // Remove code blocks
  const cleanedText = text
    .replace(/\r\n/g, '\n')
    .replace(/```(?:html|css|js|jsx|tsx|json|text)?[\s\S]*?```/gi, '');

  // Step 1: Scan for any separate Answer Key section at the bottom of the text
  const answerKeyMap: Record<number, { answer: string; explanation?: string }> = {};
  const answerKeySectionMatch = cleanedText.match(/(?:###?\s*)?(?:Answer\s*Key|Answers|Solutions|Marking\s*Scheme|Detailed\s*Answers)[\s\S]*$/i);
  
  if (answerKeySectionMatch) {
    const answerKeyText = answerKeySectionMatch[0];
    const keyLines = answerKeyText.split('\n');
    
    let currentKeyQNum: number | null = null;
    let currentExplanation = '';

    keyLines.forEach((line) => {
      const match = line.match(/(?:^|\b)(?:Q(?:uestion)?\.?\s*)?(\d+)[\.\:\)\-]?\s*(?:Answer|Ans|Option)?\s*[\:\-\.]?\s*(?:\*\*)?\(?([A-D])\)?(?:\*\*)?(.*)/i);
      if (match) {
        if (currentKeyQNum !== null && answerKeyMap[currentKeyQNum]) {
          if (currentExplanation.trim()) {
            answerKeyMap[currentKeyQNum].explanation = currentExplanation.trim();
          }
        }
        currentKeyQNum = parseInt(match[1], 10);
        const ans = match[2].toUpperCase();
        const trailing = (match[3] || '').replace(/^\s*[\:\-\.]\s*/, '').replace(/^\*\*(?:Explanation|Reason)\:\*\*\s*/i, '').trim();
        answerKeyMap[currentKeyQNum] = {
          answer: ans,
          explanation: trailing || undefined
        };
        currentExplanation = trailing;
      } else if (currentKeyQNum !== null && (line.toLowerCase().includes('explanation') || line.toLowerCase().includes('reason') || line.toLowerCase().includes('solution'))) {
        const expMatch = line.match(/(?:Explanation|Reason|Solution|Note)\s*[\:\-]?\s*(.+)$/i);
        if (expMatch) {
          currentExplanation = expMatch[1].replace(/^\*\*/, '').replace(/\*\*$/, '').trim();
          if (answerKeyMap[currentKeyQNum]) {
            answerKeyMap[currentKeyQNum].explanation = currentExplanation;
          }
        }
      } else if (currentKeyQNum !== null && line.trim() && !line.startsWith('#')) {
        currentExplanation += ' ' + line.trim();
        if (answerKeyMap[currentKeyQNum]) {
          answerKeyMap[currentKeyQNum].explanation = currentExplanation.trim();
        }
      }
    });
  }

  // Step 2: Split main body by Question markers
  // Strip the answer key from question splitting to avoid false questions
  const questionsOnlyText = answerKeySectionMatch 
    ? cleanedText.substring(0, answerKeySectionMatch.index) 
    : cleanedText;

  // Split on Question blocks: matches "Q1.", "**Q1.**", "1.", "Question 1:", "**1.**"
  const rawBlocks = questionsOnlyText.split(/(?=(?:(?:(?:\*\*|\*|#+)?\s*(?:Question|Ques|Q|Q\.)\s*\d+[\.\:\)]|(?:\*\*|\*|#+)?\s*\b\d+[\.\)]\s+(?=[A-Z0-9\(\"\'\`\*\~])))|(?:\n\s*---\s*\n))/i);

  const questions: ParsedQuizQuestion[] = [];

  rawBlocks.forEach((block, idx) => {
    const lines = block.trim().split('\n').map(l => l.trim()).filter(Boolean);
    if (lines.length === 0) return;

    let questionNumber = questions.length + 1;
    let questionText = '';
    const options: { id: string; text: string }[] = [];
    let correctOption: string | undefined = undefined;
    let explanation = '';

    // Detect question number from first line if explicit
    const firstLine = lines[0];
    const qNumMatch = firstLine.match(/(?:Question|Ques|Q|Q\.)?\s*(\d+)[\.\:\)]/i) || firstLine.match(/^(\d+)[\.\)]\s+/);
    if (qNumMatch) {
      const parsedNum = parseInt(qNumMatch[1], 10);
      if (!isNaN(parsedNum) && parsedNum > 0 && parsedNum <= 100) {
        questionNumber = parsedNum;
      }
    }

    lines.forEach((rawLine) => {
      const line = rawLine.replace(/^\*+\s*/, '').trim();

      // Check for inline options on a single line: "(a) opt1 (b) opt2 (c) opt3 (d) opt4"
      const inlineOptsMatch = line.match(/\(?([A-D])\)?[\.\:\)\-]\s*([^\(]+?)\s*\(?([B-D])\)?[\.\:\)\-]\s*([^\(]+?)\s*\(?([C-D])\)?[\.\:\)\-]\s*([^\(]+?)\s*\(?(D)\)?[\.\:\)\-]\s*(.+)$/i);
      if (inlineOptsMatch) {
        const pairs = [
          { id: inlineOptsMatch[1].toUpperCase(), text: inlineOptsMatch[2].trim() },
          { id: inlineOptsMatch[3].toUpperCase(), text: inlineOptsMatch[4].trim() },
          { id: inlineOptsMatch[5].toUpperCase(), text: inlineOptsMatch[6].trim() },
          { id: inlineOptsMatch[7].toUpperCase(), text: inlineOptsMatch[8].trim() }
        ];
        pairs.forEach(p => {
          if (!options.some(o => o.id === p.id)) {
            options.push(p);
          }
        });
        return;
      }

      // Check standard option line pattern: A) / A. / (A) / [A] / **A)** / - A) / (a) / a)
      const optMatch = 
        line.match(/^[\*\-_]?\s*\(?([A-D])\)?[\.\:\)\-]\s*(.+)$/i) ||
        line.match(/^\*\*\(?([A-D])\)?[\.\:\)\-]?\*\*\s*(.+)$/i) ||
        line.match(/^[\*\-_]?\s*\*\*([A-D])[\.\:\)]\*\*\s*(.+)$/i) ||
        line.match(/^\[([A-D])\]\s*(.+)$/i) ||
        line.match(/^Option\s*([A-D])\s*[\:\-]\s*(.+)$/i);

      // Check for Inline Correct Answer line
      const ansMatch = line.match(/(?:Correct\s*(?:Answer|Option)|Answer|Ans)\s*[\:\-]?\s*(?:\*\*)?\(?([A-D])\)?(?:\*\*)?/i);
      
      // Check for Explanation line
      const expMatch = line.match(/(?:Explanation|Solution|Reason|Note)\s*[\:\-]?\s*(.+)$/i);

      if (optMatch && !line.toLowerCase().startsWith('answer') && !line.toLowerCase().startsWith('correct')) {
        const optLetter = optMatch[1].toUpperCase();
        const optCleanText = optMatch[2].replace(/^\*\*/, '').replace(/\*\*$/, '').trim();
        if (!options.some(o => o.id === optLetter)) {
          options.push({
            id: optLetter,
            text: optCleanText
          });
        }
      } else if (ansMatch) {
        correctOption = ansMatch[1].toUpperCase();
      } else if (expMatch) {
        explanation = expMatch[1].replace(/^\*\*/, '').replace(/\*\*$/, '').trim();
      } else if (options.length === 0 && !questionText) {
        const cleanedQ = rawLine
          .replace(/^#+\s*/, '')
          .replace(/^\*+\s*/, '')
          .replace(/^(?:\*\*)?(?:Question|Q|Ques|Q\.)?\s*\d+[\.\:\)]\s*(?:\*\*)?/i, '')
          .replace(/^Section\s+[A-Z]\s*[-:]?\s*/i, '')
          .trim();
        if (cleanedQ) {
          questionText = cleanedQ;
        }
      } else if (options.length === 0 && questionText) {
        // Multi-line question continuation
        const continuationLine = rawLine.replace(/^#+\s*/, '').replace(/^\*+\s*/, '').trim();
        if (!continuationLine.toLowerCase().startsWith('section') && !continuationLine.toLowerCase().startsWith('note:')) {
          questionText += ' ' + continuationLine;
        }
      }
    });

    // If answer or explanation missing, look up from bottom Answer Key map
    if (!correctOption && answerKeyMap[questionNumber]) {
      correctOption = answerKeyMap[questionNumber].answer;
      if (!explanation && answerKeyMap[questionNumber].explanation) {
        explanation = answerKeyMap[questionNumber].explanation || '';
      }
    }

    if (questionText && options.length >= 2) {
      questions.push({
        id: `chat_q_${questionNumber}_${idx}`,
        questionNumber: questionNumber,
        text: questionText,
        options,
        correctOption,
        explanation
      });
    }
  });

  // Sort strictly by questionNumber if parsed
  questions.sort((a, b) => a.questionNumber - b.questionNumber);

  return questions;
}

export function parseFlashcardsFromText(text: string): ParsedFlashcard[] {
  if (!text) return [];

  const flashcards: ParsedFlashcard[] = [];
  const cardBlocks = text.split(/(?=(?:(?:(?:\*\*|\*|#+)?\s*(?:Flashcard|Card)\s*\d+[\.\:\)]))|(?:\n\s*---\s*\n))/i);

  cardBlocks.forEach((block, idx) => {
    const lines = block.trim().split('\n').map(l => l.trim()).filter(Boolean);
    if (lines.length < 2) return;

    let topic = '';
    let front = '';
    let back = '';
    let mnemonic = '';

    lines.forEach((line) => {
      const topicMatch = line.match(/(?:Flashcard|Card)\s*\d+[\.\:\)]?\s*(?:\:\s*|\-\s*)?(.*)/i);
      const frontMatch = line.match(/(?:Front|Question|Concept|Term|Key Term)\s*[\:\-]\s*(.*)/i);
      const backMatch = line.match(/(?:Back|Answer|Definition|Explanation|Meaning)\s*[\:\-]\s*(.*)/i);
      const mneMatch = line.match(/(?:Mnemonic|Memory Aid|Tip|Formula|Note)\s*[\:\-]\s*(.*)/i);

      if (frontMatch) {
        front = frontMatch[1].replace(/^\*\*/, '').replace(/\*\*$/, '').trim();
      } else if (backMatch) {
        back = backMatch[1].replace(/^\*\*/, '').replace(/\*\*$/, '').trim();
      } else if (mneMatch) {
        mnemonic = mneMatch[1].replace(/^\*\*/, '').replace(/\*\*$/, '').trim();
      } else if (topicMatch && !topic) {
        topic = topicMatch[1].replace(/^\*\*/, '').replace(/\*\*$/, '').trim();
      }
    });

    if ((front && back) || (topic && (front || back))) {
      flashcards.push({
        id: `card_${idx + 1}`,
        cardNumber: flashcards.length + 1,
        topic: topic || `Card ${flashcards.length + 1}`,
        front: front || topic,
        back: back || 'Review the core key points and formulas on this topic.',
        mnemonic
      });
    }
  });

  return flashcards;
}

export default function InChatMessageQuiz({
  content,
  isDarkMode = true,
  onLaunchFullCbt,
  onSyncScore
}: InChatMessageQuizProps) {
  const { user, userData, incrementFreeExamAttempt } = useAuth();
  const userName = user?.displayName || (user?.email ? user.email.split('@')[0] : 'Aspirant');

  const parsedQuestions = useMemo(() => parseMcqsFromText(content), [content]);
  const parsedFlashcards = useMemo(() => parseFlashcardsFromText(content), [content]);

  const [activeTab, setActiveTab] = useState<'quiz' | 'flashcards'>('quiz');
  
  // Real CBT Simulator State
  const [examMode, setExamMode] = useState<'practice' | 'cbt'>('practice'); // 'practice' (instant feedback) or 'cbt' (timed exam + palette)
  const [viewStyle, setViewStyle] = useState<'card' | 'scroll'>('scroll'); // 'card' (single Q) or 'scroll' (all Qs)
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  
  // Answers & Attempts
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [markedForReview, setMarkedForReview] = useState<Record<string, boolean>>({});
  const [showExplanation, setShowExplanation] = useState<Record<string, boolean>>({});
  const [isExamSubmitted, setIsExamSubmitted] = useState<boolean>(false);
  const [hasSyncedSubmission, setHasSyncedSubmission] = useState<boolean>(false);

  // Arohi Exam Pass Modal State
  const [isExamPassModalOpen, setIsExamPassModalOpen] = useState(false);
  const [passModalTier, setPassModalTier] = useState<'silver' | 'gold' | 'platinum'>('silver');

  const freeAttemptsCount = userData?.freeExamAttemptsCount || 0;
  const hasActivePass = !!userData?.examPass;
  const isFreeLimitExceeded = freeAttemptsCount >= 5 && !hasActivePass;

  // Timer State
  const defaultExamMinutes = Math.max(5, Math.min(180, Math.round(parsedQuestions.length * 1.2)));
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState<number>(defaultExamMinutes * 60);
  const [isTimerPaused, setIsTimerPaused] = useState<boolean>(false);

  // Flashcards state
  const [activeCardIdx, setActiveCardIdx] = useState<number>(0);
  const [isCardFlipped, setIsCardFlipped] = useState<boolean>(false);

  // Sound Engine
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Reset/sync questions when content changes
  useEffect(() => {
    if (parsedQuestions.length === 0 && parsedFlashcards.length > 0) {
      setActiveTab('flashcards');
    } else {
      setTimeRemainingSeconds(defaultExamMinutes * 60);
    }
  }, [parsedQuestions.length, parsedFlashcards.length, defaultExamMinutes]);

  // Live Countdown Timer for CBT Mode
  useEffect(() => {
    if (examMode !== 'cbt' || isExamSubmitted || isTimerPaused || timeRemainingSeconds <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setTimeRemainingSeconds(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          // Auto submit on time out
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [examMode, isExamSubmitted, isTimerPaused, timeRemainingSeconds]);

  if (parsedQuestions.length === 0 && parsedFlashcards.length === 0) {
    return null;
  }

  const playClickSound = () => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(900, ctx.currentTime + 0.05);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.05);
      }
    } catch (e) {}
  };

  const handleSelectOption = (qId: string, optId: string) => {
    playClickSound();

    if (examMode === 'practice') {
      // In practice mode, lock and show explanation immediately
      if (selectedAnswers[qId]) return;
      const updated = { ...selectedAnswers, [qId]: optId };
      setSelectedAnswers(updated);
      setShowExplanation(prev => ({ ...prev, [qId]: true }));

      if (Object.keys(updated).length === parsedQuestions.length && !hasSyncedSubmission) {
        handleFinalEvaluationAndSync(updated);
      }
    } else {
      // In CBT mode, allow changing answers before final submission
      if (isExamSubmitted) return;
      const current = selectedAnswers[qId];
      if (current === optId) {
        // Deselect / clear
        const copy = { ...selectedAnswers };
        delete copy[qId];
        setSelectedAnswers(copy);
      } else {
        setSelectedAnswers(prev => ({ ...prev, [qId]: optId }));
      }
    }
  };

  const toggleMarkForReview = (qId: string) => {
    setMarkedForReview(prev => ({ ...prev, [qId]: !prev[qId] }));
  };

  const clearResponse = (qId: string) => {
    if (isExamSubmitted) return;
    const copy = { ...selectedAnswers };
    delete copy[qId];
    setSelectedAnswers(copy);
  };

  const handleSubmitExam = () => {
    setIsExamSubmitted(true);
    handleFinalEvaluationAndSync(selectedAnswers);
  };

  const handleFinalEvaluationAndSync = async (answers: Record<string, string>) => {
    const total = parsedQuestions.length;
    let correct = 0;
    let wrong = 0;
    let attempted = 0;

    parsedQuestions.forEach(q => {
      const userAns = answers[q.id];
      if (userAns) {
        attempted++;
        if (q.correctOption && userAns.toUpperCase() === q.correctOption.toUpperCase()) {
          correct++;
        } else {
          wrong++;
        }
      }
    });

    const unattempted = total - attempted;
    const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
    const positiveMarks = correct * 4;
    const negativeMarks = wrong * 1;
    const finalScoreMarks = Math.max(0, positiveMarks - negativeMarks);
    const maxScore = total * 4;
    const timeSpentSec = (defaultExamMinutes * 60) - Math.max(0, timeRemainingSeconds);

    // Dynamic Title & Subject extraction
    let examSubject = 'Academic Practice & Science';
    if (content.toLowerCase().includes('science')) examSubject = 'CBSE Class 9 Science';
    else if (content.toLowerCase().includes('nursing')) examSubject = 'Nursing Officer Exam';
    else if (content.toLowerCase().includes('ssc')) examSubject = 'SSC Aptitude & Reasoning';
    else if (content.toLowerCase().includes('upsc')) examSubject = 'UPSC GS Prelims';
    else if (content.toLowerCase().includes('math')) examSubject = 'Mathematics';

    const submissionData = {
      id: `in_chat_exam_${Date.now()}`,
      examTitle: `${examSubject} (${total} MCQs Mock Test)`,
      subject: examSubject,
      totalQuestions: total,
      answeredCount: attempted,
      correctCount: correct,
      wrongCount: wrong,
      unattemptedCount: unattempted,
      accuracy: attempted > 0 ? Math.round((correct / attempted) * 100) : 0,
      scoreMarks: finalScoreMarks,
      maxScore: maxScore,
      percentage: percentage,
      timeSpentSeconds: timeSpentSec,
      totalDurationMinutes: defaultExamMinutes,
      completedAt: new Date().toISOString(),
      source: examMode === 'cbt' ? 'In-Chat CBT Exam Mode' : 'In-Chat Interactive Practice',
      userName: userName
    };

    // 1. Sync to localStorage for instant offline access
    try {
      const existingStr = localStorage.getItem('arohi_mock_test_submissions');
      const existing = existingStr ? JSON.parse(existingStr) : [];
      existing.unshift(submissionData);
      localStorage.setItem('arohi_mock_test_submissions', JSON.stringify(existing.slice(0, 50)));
    } catch (e) {}

    // 2. Sync to Firestore User Profile
    if (user && user.uid && db) {
      try {
        const userRef = doc(db, 'users', user.uid);
        await updateDoc(userRef, {
          mockTestHistory: arrayUnion(submissionData),
          lastExamDate: new Date().toISOString(),
          'stats.totalMockTestsAttempted': (await getDoc(userRef)).data()?.stats?.totalMockTestsAttempted ? (await getDoc(userRef)).data()?.stats?.totalMockTestsAttempted + 1 : 1
        }).catch(async () => {
          // If updateDoc fails because document doesn't exist, create it
          await setDoc(userRef, {
            mockTestHistory: [submissionData],
            lastExamDate: new Date().toISOString()
          }, { merge: true });
        });
      } catch (firestoreErr) {
        console.warn('Firestore mock test sync noted:', firestoreErr);
      }
    }

    // 3. Post to backend server endpoint
    try {
      fetch('/api/mocktests/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ submission: submissionData })
      }).catch(() => {});
    } catch (e) {}

    // 4. Dispatch global event so Student Profile & UserDashboard updates in real time
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('arohi_mock_test_completed', { detail: submissionData }));
    }

    if (onSyncScore) {
      onSyncScore(submissionData);
    }

    // 5. Track attempt count for free pass quota
    try {
      if (incrementFreeExamAttempt) {
        incrementFreeExamAttempt().catch(() => {});
      }
    } catch (e) {}

    setHasSyncedSubmission(true);
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setMarkedForReview({});
    setShowExplanation({});
    setIsExamSubmitted(false);
    setHasSyncedSubmission(false);
    setTimeRemainingSeconds(defaultExamMinutes * 60);
    setCurrentQIndex(0);
  };

  const handleLaunchFullCbtSimulator = () => {
    // Package all parsed questions into standard MockTest schema
    const customMockTest = {
      id: `chat_test_${Date.now()}`,
      slug: `custom-chat-exam-${Date.now()}`,
      title: `Live All-India CBT Exam Simulator (${parsedQuestions.length} Questions)`,
      shortDescription: `Curated directly from your chat conversation. Complete with live timer, question palette, negative marking, and rank percentile.`,
      mainCategory: 'competitive_central',
      subCategory: 'cbse_class_10',
      categoryLabel: 'Custom Exam Simulator',
      targetExam: 'Custom Practice Exam',
      durationMinutes: defaultExamMinutes,
      totalQuestions: parsedQuestions.length,
      totalMarks: parsedQuestions.length * 4,
      isLive: true,
      isFree: true,
      attemptsCount: 12450,
      sections: [
        {
          id: 'sec_1',
          name: 'Section A - Core Subject MCQs',
          totalQuestions: parsedQuestions.length,
          totalMarks: parsedQuestions.length * 4,
          positiveMarksPerQuestion: 4,
          negativeMarksPerQuestion: 1
        }
      ],
      questions: parsedQuestions.map((q, idx) => ({
        id: `q_${idx + 1}`,
        questionNumber: idx + 1,
        sectionId: 'sec_1',
        sectionName: 'Section A',
        subject: 'General Practice',
        topic: 'Exam Questions',
        type: 'single_choice',
        text: q.text,
        options: q.options.map(opt => ({ id: opt.id, text: opt.text })),
        correctAnswer: q.correctOption || 'A',
        positiveMarks: 4,
        negativeMarks: 1,
        difficulty: 'medium',
        explanation: q.explanation || 'Review standard textbook definitions for step-by-step resolution.'
      }))
    };

    // Store in sessionStorage for MockTestsHub to load immediately
    try {
      sessionStorage.setItem('arohi_active_custom_cbt', JSON.stringify(customMockTest));
    } catch (e) {}

    if (onLaunchFullCbt) {
      onLaunchFullCbt();
    }
  };

  // Format time remaining MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const answeredCount = Object.keys(selectedAnswers).length;
  const markedCount = Object.keys(markedForReview).filter(k => markedForReview[k]).length;
  const correctCount = parsedQuestions.filter(q => q.correctOption && selectedAnswers[q.id]?.toUpperCase() === q.correctOption.toUpperCase()).length;
  const scorePercentage = parsedQuestions.length > 0 ? Math.round((correctCount / parsedQuestions.length) * 100) : 0;
  const currentQ = parsedQuestions[currentQIndex] || parsedQuestions[0];

  return (
    <div 
      id="in_chat_exam_center"
      className={`mt-4 p-3.5 sm:p-5 rounded-3xl border ${
        isDarkMode 
          ? 'bg-[#120a2e]/98 border-purple-500/40 text-slate-100 shadow-2xl backdrop-blur-md ring-1 ring-purple-500/20' 
          : 'bg-white border-purple-200 text-slate-900 shadow-xl'
      } space-y-4 my-3`}
    >
      {/* Arohi Exam Pass Promotion / Limit Reached Alert */}
      {isFreeLimitExceeded ? (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/20 via-purple-600/25 to-pink-500/20 border border-amber-500/40 text-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="bg-amber-500 text-slate-950 font-black text-[10px] uppercase px-2 py-0.5 rounded-full">
                5 Free Tests Limit Reached
              </span>
              <span className="text-xs font-black text-amber-300">Unlock All-India Full-Length Passes</span>
            </div>
            <p className="text-xs text-slate-300">
              You've completed {freeAttemptsCount} in-chat tests! Upgrade to <strong>Arohi Exams™ Pass</strong> for 10, 25, or 60 full 100-question CBT mock papers with dynamic shuffling.
            </p>
          </div>
          <div className="flex items-center gap-1.5 shrink-0 flex-wrap sm:flex-nowrap">
            <button
              onClick={() => {
                setPassModalTier('silver');
                setIsExamPassModalOpen(true);
              }}
              className="px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-slate-200 to-white text-slate-950 font-black text-xs hover:scale-105 transition-all shadow-md cursor-pointer"
            >
              10 Tests (₹99)
            </button>
            <button
              onClick={() => {
                setPassModalTier('gold');
                setIsExamPassModalOpen(true);
              }}
              className="px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 font-black text-xs hover:scale-105 transition-all shadow-md cursor-pointer"
            >
              25 Tests (₹199)
            </button>
            <button
              onClick={() => {
                setPassModalTier('platinum');
                setIsExamPassModalOpen(true);
              }}
              className="px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500 text-slate-950 font-black text-xs hover:scale-105 transition-all shadow-md cursor-pointer"
            >
              60 Tests (₹299)
            </button>
          </div>
        </div>
      ) : (
        <div className="px-3 py-2 rounded-xl bg-purple-900/30 border border-purple-500/20 text-slate-300 flex items-center justify-between gap-2 text-xs">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span>Free Exam Quota: <strong>{Math.max(0, 5 - freeAttemptsCount)} of 5 Free in-chat tests remaining</strong></span>
          </span>
          <button
            onClick={() => {
              setPassModalTier('silver');
              setIsExamPassModalOpen(true);
            }}
            className="text-[11px] font-black text-purple-300 hover:text-white underline cursor-pointer"
          >
            Explore ₹99, ₹199 & ₹299 Passes
          </button>
        </div>
      )}

      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-purple-500/20 pb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-amber-500 border border-purple-400/40 flex items-center justify-center text-white shadow-md shrink-0">
            <Brain className="w-5 h-5 text-yellow-300" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="text-xs sm:text-sm font-black text-white flex items-center gap-1.5">
                <span>Arohi Interactive Exam & Mock Test Center</span>
              </h4>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">
                {parsedQuestions.length} Questions Detected
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Live in-chat exam simulation with countdown timer, question palette & profile history sync
            </p>
          </div>
        </div>

        {/* Action Controls & Mode Switcher */}
        <div className="flex items-center gap-2 flex-wrap self-start sm:self-auto">
          {/* Practice vs CBT Mode Switch */}
          {parsedQuestions.length > 0 && (
            <div className="flex items-center bg-black/50 p-1 rounded-xl border border-purple-500/30 text-xs">
              <button
                id="btn_mode_practice"
                onClick={() => setExamMode('practice')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1 ${
                  examMode === 'practice'
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Instant feedback upon selecting an answer"
              >
                <Zap className="w-3 h-3 text-yellow-300" />
                <span>Practice</span>
              </button>

              <button
                id="btn_mode_cbt"
                onClick={() => setExamMode('cbt')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1 ${
                  examMode === 'cbt'
                    ? 'bg-amber-500 text-slate-950 shadow-sm font-black'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Timed Computer Based Test with Question Palette"
              >
                <Clock className="w-3 h-3 text-slate-950" />
                <span>CBT Exam</span>
              </button>
            </div>
          )}

          {/* Tab Selector if both Quiz and Flashcards exist */}
          {parsedFlashcards.length > 0 && (
            <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-purple-500/30">
              <button
                onClick={() => setActiveTab('quiz')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                  activeTab === 'quiz' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                <HelpCircle className="w-3 h-3" />
                <span>Quiz</span>
              </button>
              <button
                onClick={() => setActiveTab('flashcards')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                  activeTab === 'flashcards' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Layers className="w-3 h-3" />
                <span>Cards ({parsedFlashcards.length})</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 1. QUIZ / CBT EXAM MODE */}
      {activeTab === 'quiz' && parsedQuestions.length > 0 && (
        <div className="space-y-4">
          
          {/* Status & Timer Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-purple-950/50 border border-purple-500/30 text-xs">
            <div className="flex items-center gap-3 flex-wrap">
              {/* Live Timer if CBT mode */}
              {examMode === 'cbt' && (
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border font-black ${
                  timeRemainingSeconds < 180 
                    ? 'bg-rose-950/80 border-rose-500 text-rose-300 animate-pulse' 
                    : 'bg-indigo-950/80 border-indigo-500/50 text-amber-300'
                }`}>
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>Time Left: {formatTime(timeRemainingSeconds)}</span>
                  <button
                    onClick={() => setIsTimerPaused(!isTimerPaused)}
                    className="ml-1 p-0.5 hover:text-white text-slate-400 cursor-pointer"
                    title={isTimerPaused ? 'Resume Timer' : 'Pause Timer'}
                  >
                    {isTimerPaused ? <Play className="w-3 h-3 text-emerald-400" /> : <Pause className="w-3 h-3" />}
                  </button>
                </div>
              )}

              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-slate-300">
                  Attempted: <strong className="text-white">{answeredCount} / {parsedQuestions.length}</strong>
                </span>
                <div className="w-20 sm:w-28 h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-500 to-emerald-400 transition-all duration-300"
                    style={{ width: `${(answeredCount / parsedQuestions.length) * 100}%` }}
                  />
                </div>
              </div>

              {markedCount > 0 && (
                <span className="text-[11px] text-amber-400 font-semibold flex items-center gap-1 bg-amber-500/10 px-2 py-0.5 rounded-lg border border-amber-500/20">
                  <Flag className="w-3 h-3" />
                  <span>{markedCount} Review</span>
                </span>
              )}
            </div>

            {/* View Switcher & Audio */}
            <div className="flex items-center gap-2">
              <div className="flex items-center bg-black/40 p-1 rounded-xl border border-purple-500/20 text-[11px]">
                <button
                  onClick={() => setViewStyle('scroll')}
                  className={`px-2 py-0.5 rounded-lg font-bold transition-all cursor-pointer ${
                    viewStyle === 'scroll' ? 'bg-purple-700 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                  title="Show all questions in a scrollable list"
                >
                  All Questions
                </button>
                <button
                  onClick={() => setViewStyle('card')}
                  className={`px-2 py-0.5 rounded-lg font-bold transition-all cursor-pointer ${
                    viewStyle === 'card' ? 'bg-purple-700 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                  title="Focus on one question at a time (CBT Style)"
                >
                  Card Mode
                </button>
              </div>

              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="p-1.5 rounded-xl bg-purple-900/40 hover:bg-purple-800/60 text-slate-300 border border-purple-500/30 cursor-pointer"
                title={soundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
              >
                {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-purple-300" /> : <VolumeX className="w-3.5 h-3.5 text-slate-500" />}
              </button>
            </div>
          </div>

          {/* CBT QUESTION PALETTE (1 to 30) */}
          <div className="p-3 rounded-2xl bg-black/40 border border-purple-500/25 space-y-2">
            <div className="flex items-center justify-between text-[11px] text-slate-400 font-semibold">
              <span className="flex items-center gap-1.5 text-slate-200">
                <ListOrdered className="w-3.5 h-3.5 text-purple-400" />
                <span>Question Palette ({parsedQuestions.length} Questions)</span>
              </span>
              <div className="flex items-center gap-3 text-[10px]">
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span> Answered ({answeredCount})</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block"></span> Review ({markedCount})</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-slate-700 inline-block"></span> Pending ({parsedQuestions.length - answeredCount})</span>
              </div>
            </div>

            {/* Palette Grid */}
            <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto pr-1 py-1 custom-scrollbar">
              {parsedQuestions.map((q, idx) => {
                const isAnswered = !!selectedAnswers[q.id];
                const isMarked = !!markedForReview[q.id];
                const isCurrent = currentQIndex === idx;

                let badgeClass = 'bg-slate-800/80 text-slate-400 border-slate-700 hover:border-purple-400 hover:text-white';
                if (isAnswered && isMarked) {
                  badgeClass = 'bg-gradient-to-r from-emerald-600 to-amber-600 text-white font-bold border-amber-400 ring-1 ring-amber-400/50';
                } else if (isAnswered) {
                  badgeClass = 'bg-emerald-600 text-white font-bold border-emerald-400 shadow-xs';
                } else if (isMarked) {
                  badgeClass = 'bg-amber-500 text-slate-950 font-black border-amber-300';
                }

                if (isCurrent) {
                  badgeClass += ' ring-2 ring-purple-400 scale-105';
                }

                return (
                  <button
                    key={q.id}
                    id={`palette_q_${idx + 1}`}
                    onClick={() => {
                      setCurrentQIndex(idx);
                      if (viewStyle === 'scroll') {
                        const el = document.getElementById(`question_card_${q.id}`);
                        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }
                    }}
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg border text-xs flex items-center justify-center transition-all cursor-pointer ${badgeClass}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 1A. CARD-BY-CARD CBT VIEW */}
          {viewStyle === 'card' && currentQ && (
            <div 
              id={`question_card_${currentQ.id}`}
              className="p-4 sm:p-5 rounded-2xl bg-[#18103c] border border-purple-500/30 space-y-4 shadow-lg animate-in fade-in duration-150"
            >
              {/* Question Header & Flag Button */}
              <div className="flex items-start justify-between gap-3 border-b border-purple-500/20 pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white text-xs font-black flex items-center justify-center shadow-md">
                    Q{currentQIndex + 1}
                  </span>
                  <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">
                    Question {currentQIndex + 1} of {parsedQuestions.length}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleMarkForReview(currentQ.id)}
                    className={`px-2.5 py-1 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center gap-1.5 ${
                      markedForReview[currentQ.id]
                        ? 'bg-amber-500 text-slate-950 border-amber-400 font-black shadow-sm'
                        : 'bg-purple-900/40 text-slate-300 border-purple-500/30 hover:border-amber-400'
                    }`}
                  >
                    <Bookmark className="w-3 h-3" />
                    <span>{markedForReview[currentQ.id] ? 'Marked' : 'Mark for Review'}</span>
                  </button>

                  {selectedAnswers[currentQ.id] && !isExamSubmitted && (
                    <button
                      onClick={() => clearResponse(currentQ.id)}
                      className="px-2.5 py-1 rounded-xl text-xs font-semibold text-rose-300 bg-rose-950/40 border border-rose-500/30 hover:bg-rose-900/60 cursor-pointer"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              {/* Question Text */}
              <p className="text-sm sm:text-base font-bold text-white leading-relaxed">
                {currentQ.text}
              </p>

              {/* Options Grid */}
              <div className="grid grid-cols-1 gap-2.5 pt-1">
                {currentQ.options.map((opt) => {
                  const userChoice = selectedAnswers[currentQ.id];
                  const isSelected = userChoice === opt.id;
                  const showAns = (examMode === 'practice' && isSelected) || isExamSubmitted;
                  const isThisCorrect = currentQ.correctOption && opt.id.toUpperCase() === currentQ.correctOption.toUpperCase();

                  let optStyles = 'bg-[#100b28] border-[#291c57] text-slate-300 hover:border-purple-400 hover:text-white';
                  
                  if (isSelected && !showAns) {
                    optStyles = 'bg-purple-900/70 border-purple-400 text-white font-bold ring-1 ring-purple-400';
                  }

                  if (showAns) {
                    if (isThisCorrect) {
                      optStyles = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold ring-1 ring-emerald-500/60';
                    } else if (isSelected && !isThisCorrect) {
                      optStyles = 'bg-rose-950/80 border-rose-500 text-rose-200 font-bold ring-1 ring-rose-500/60';
                    } else {
                      optStyles = 'opacity-50 border-transparent bg-[#0d0920] text-slate-500';
                    }
                  }

                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSelectOption(currentQ.id, opt.id)}
                      disabled={isExamSubmitted || (examMode === 'practice' && !!selectedAnswers[currentQ.id])}
                      className={`w-full p-3 rounded-xl border text-left text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-between gap-3 ${optStyles}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-6 h-6 rounded-lg text-[11px] font-black flex items-center justify-center shrink-0 ${
                          isSelected ? 'bg-purple-600 text-white' : 'bg-white/10 text-slate-300'
                        }`}>
                          {opt.id}
                        </span>
                        <span className="leading-snug">{opt.text}</span>
                      </div>

                      {showAns && isThisCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      )}
                      {showAns && isSelected && !isThisCorrect && (
                        <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation in practice mode or after submission */}
              {((examMode === 'practice' && selectedAnswers[currentQ.id]) || isExamSubmitted) && (currentQ.explanation || currentQ.correctOption) && (
                <div className="p-3.5 rounded-xl bg-purple-950/70 border border-purple-500/40 text-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-black uppercase text-amber-300 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>Correct Answer: Option {currentQ.correctOption}</span>
                    </span>
                    {selectedAnswers[currentQ.id] && (
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        selectedAnswers[currentQ.id]?.toUpperCase() === currentQ.correctOption?.toUpperCase()
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-rose-500/20 text-rose-300'
                      }`}>
                        {selectedAnswers[currentQ.id]?.toUpperCase() === currentQ.correctOption?.toUpperCase() ? '+4 Marks (Correct)' : '-1 Mark (Negative)'}
                      </span>
                    )}
                  </div>
                  {currentQ.explanation && (
                    <p className="text-[11px] text-slate-300 leading-relaxed pt-1.5 border-t border-purple-500/20">
                      {currentQ.explanation}
                    </p>
                  )}
                </div>
              )}

              {/* Navigation Prev / Next Buttons */}
              <div className="flex items-center justify-between gap-3 pt-3 border-t border-purple-500/20">
                <button
                  disabled={currentQIndex === 0}
                  onClick={() => setCurrentQIndex(prev => Math.max(0, prev - 1))}
                  className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </button>

                {currentQIndex < parsedQuestions.length - 1 ? (
                  <button
                    onClick={() => setCurrentQIndex(prev => Math.min(parsedQuestions.length - 1, prev + 1))}
                    className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
                  >
                    <span>Save & Next</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  !isExamSubmitted && (
                    <button
                      onClick={handleSubmitExam}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg transition-all cursor-pointer"
                    >
                      Submit Exam
                    </button>
                  )
                )}
              </div>
            </div>
          )}

          {/* 1B. ALL QUESTIONS SCROLL VIEW */}
          {viewStyle === 'scroll' && (
            <div className="space-y-3.5">
              {parsedQuestions.map((q, idx) => {
                const userChoice = selectedAnswers[q.id];
                const isSelected = !!userChoice;
                const showAns = (examMode === 'practice' && isSelected) || isExamSubmitted;
                const isCorrect = showAns && q.correctOption && userChoice?.toUpperCase() === q.correctOption?.toUpperCase();

                return (
                  <div 
                    key={q.id}
                    id={`question_card_${q.id}`}
                    className={`p-3.5 sm:p-4 rounded-2xl border transition-all ${
                      isDarkMode ? 'bg-[#18103c] border-[#2e2060]' : 'bg-white border-purple-100'
                    } space-y-3`}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between gap-2.5">
                      <div className="flex items-start gap-2.5">
                        <span className="w-6 h-6 rounded-lg bg-purple-600/30 text-purple-300 border border-purple-500/40 text-[11px] font-black flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                          Q{idx + 1}
                        </span>
                        <p className="text-xs sm:text-sm font-bold text-white leading-snug">
                          {q.text}
                        </p>
                      </div>

                      {examMode === 'cbt' && (
                        <button
                          onClick={() => toggleMarkForReview(q.id)}
                          className={`p-1.5 rounded-lg border text-[10px] font-bold shrink-0 transition-all cursor-pointer ${
                            markedForReview[q.id] 
                              ? 'bg-amber-500 text-slate-950 border-amber-300' 
                              : 'bg-purple-900/40 text-slate-400 border-purple-500/30 hover:text-white'
                          }`}
                          title="Mark for Review"
                        >
                          <Bookmark className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    {/* Options */}
                    <div className="grid grid-cols-1 gap-2 pt-1">
                      {q.options.map((opt) => {
                        const isThisChosen = userChoice === opt.id;
                        const isThisCorrect = q.correctOption && opt.id.toUpperCase() === q.correctOption.toUpperCase();

                        let optStyles = isDarkMode 
                          ? 'bg-[#100b28] border-[#291c57] text-slate-300 hover:border-purple-400 hover:text-white' 
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-purple-300';

                        if (isThisChosen && !showAns) {
                          optStyles = 'bg-purple-900/70 border-purple-400 text-white font-bold ring-1 ring-purple-400';
                        }

                        if (showAns) {
                          if (isThisCorrect) {
                            optStyles = 'bg-emerald-950/70 border-emerald-500 text-emerald-200 font-bold ring-1 ring-emerald-500/50';
                          } else if (isThisChosen && !isThisCorrect) {
                            optStyles = 'bg-rose-950/70 border-rose-500 text-rose-200 font-bold ring-1 ring-rose-500/50';
                          } else {
                            optStyles = 'opacity-40 border-transparent bg-[#0d0920] text-slate-500';
                          }
                        }

                        return (
                          <button
                            key={opt.id}
                            disabled={isExamSubmitted || (examMode === 'practice' && !!selectedAnswers[q.id])}
                            onClick={() => handleSelectOption(q.id, opt.id)}
                            className={`w-full p-2.5 sm:p-3 rounded-xl border text-left text-xs transition-all cursor-pointer flex items-center justify-between gap-2.5 ${optStyles}`}
                          >
                            <div className="flex items-center gap-2.5">
                              <span className={`w-5 h-5 rounded-lg text-[10px] font-black flex items-center justify-center shrink-0 ${
                                isThisChosen ? 'bg-purple-600 text-white' : 'bg-white/10 text-slate-300'
                              }`}>
                                {opt.id}
                              </span>
                              <span className="leading-snug">{opt.text}</span>
                            </div>

                            {showAns && isThisCorrect && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                            )}
                            {showAns && isThisChosen && !isThisCorrect && (
                              <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Instant Feedback in practice mode or after submission */}
                    {showAns && (q.explanation || q.correctOption) && (
                      <div className="p-3 rounded-xl bg-purple-950/60 border border-purple-500/30 text-xs space-y-1 animate-in fade-in duration-200">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] font-black uppercase tracking-wider text-purple-300 flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-yellow-300" />
                            <span>Correct Answer: Option {q.correctOption}</span>
                          </span>
                          {userChoice && (
                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                              isCorrect ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                            }`}>
                              {isCorrect ? '+4 Marks (Correct)' : '-1 Mark (Wrong)'}
                            </span>
                          )}
                        </div>
                        {q.explanation && (
                          <p className="text-[11px] text-slate-300 leading-relaxed pt-1 border-t border-purple-500/20">
                            {q.explanation}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Submit Button for CBT Mode */}
              {examMode === 'cbt' && !isExamSubmitted && (
                <div className="pt-2 text-center">
                  <button
                    id="btn_submit_cbt_scroll"
                    onClick={handleSubmitExam}
                    className="w-full sm:w-auto px-8 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm uppercase tracking-wider shadow-xl transition-all cursor-pointer"
                  >
                    Submit Final CBT Exam ({answeredCount}/{parsedQuestions.length} Answered)
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Exam Completion & Result Summary Banner */}
          {(isExamSubmitted || (examMode === 'practice' && answeredCount === parsedQuestions.length)) && (
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-purple-900/90 via-indigo-900/90 to-purple-950/90 border border-emerald-500/50 shadow-2xl space-y-4 animate-in zoom-in-95 duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-300 shrink-0 shadow-inner">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <h5 className="font-extrabold text-sm sm:text-base text-white flex items-center gap-2">
                      <span>Exam Completed Successfully!</span>
                      <span className="text-xs text-amber-300 bg-amber-400/20 border border-amber-400/30 px-2.5 py-0.5 rounded-full font-bold">
                        {scorePercentage >= 80 ? 'Outstanding 🌟' : scorePercentage >= 50 ? 'Good Effort 👍' : 'Needs Practice 📚'}
                      </span>
                    </h5>
                    <p className="text-[11px] text-emerald-300 font-semibold flex items-center gap-1 mt-0.5">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Logged to your Student Profile & Arohi Mock Tests History</span>
                    </p>
                  </div>
                </div>

                {/* Score Stats Grid */}
                <div className="flex items-center gap-4 sm:border-l sm:border-purple-500/30 sm:pl-4">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Score</span>
                    <span className="text-base sm:text-lg font-black text-amber-300">{correctCount} / {parsedQuestions.length}</span>
                    <span className="text-xs text-slate-300 font-bold ml-1">({scorePercentage}%)</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Marks (+4/-1)</span>
                    <span className="text-base sm:text-lg font-black text-emerald-400">
                      {Math.max(0, correctCount * 4 - (answeredCount - correctCount) * 1)} / {parsedQuestions.length * 4}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2.5 pt-2 border-t border-purple-500/30">
                {onLaunchFullCbt && (
                  <button
                    id="btn_launch_cbt_simulator"
                    onClick={handleLaunchFullCbtSimulator}
                    className="flex-1 min-w-[220px] px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Play className="w-3.5 h-3.5 fill-slate-950 text-slate-950" />
                    <span>Open in All-India CBT Portal (Full Screen)</span>
                  </button>
                )}

                <button
                  onClick={handleResetQuiz}
                  className="px-4 py-2.5 rounded-xl bg-purple-900/60 hover:bg-purple-800 text-slate-200 hover:text-white font-bold text-xs border border-purple-500/40 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Test</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 2. FLASHCARDS ACTIVE RECALL MODE */}
      {activeTab === 'flashcards' && parsedFlashcards.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-300">
            <span className="font-bold">Card {activeCardIdx + 1} of {parsedFlashcards.length}</span>
            <span className="text-[11px] text-purple-300">Click card or flip button to reveal explanation & answer</span>
          </div>

          {/* Interactive Flip Card */}
          {(() => {
            const card = parsedFlashcards[activeCardIdx];
            if (!card) return null;

            return (
              <div
                onClick={() => setIsCardFlipped(!isCardFlipped)}
                className={`w-full min-h-[190px] p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between select-none shadow-xl ${
                  isCardFlipped
                    ? 'bg-gradient-to-br from-[#211247] to-[#120a2e] border-emerald-500/50 text-white'
                    : 'bg-gradient-to-br from-[#18103c] to-[#0f0928] border-purple-500/40 text-slate-100 hover:border-purple-400'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between border-b border-purple-500/20 pb-2 mb-3">
                    <span className="text-[10px] font-black uppercase tracking-wider text-purple-300 flex items-center gap-1">
                      <BookOpen className="w-3 h-3 text-amber-300" />
                      <span>{card.topic}</span>
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isCardFlipped ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                    }`}>
                      {isCardFlipped ? 'Answer Revealed' : 'Click to Flip'}
                    </span>
                  </div>

                  <div className="py-2">
                    {!isCardFlipped ? (
                      <p className="text-sm sm:text-base font-bold text-white leading-relaxed">
                        {card.front}
                      </p>
                    ) : (
                      <div className="space-y-2">
                        <p className="text-xs sm:text-sm text-emerald-200 leading-relaxed font-medium">
                          {card.back}
                        </p>
                        {card.mnemonic && (
                          <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-[11px] text-amber-300">
                            <strong>💡 Memory Tip:</strong> {card.mnemonic}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-400 pt-2 border-t border-purple-500/20 mt-2">
                  <span>Press space or tap to flip</span>
                  <span className="font-semibold text-purple-300">Card {activeCardIdx + 1}/{parsedFlashcards.length}</span>
                </div>
              </div>
            );
          })()}

          {/* Flashcard Navigation */}
          <div className="flex items-center justify-between gap-3 pt-1">
            <button
              disabled={activeCardIdx === 0}
              onClick={() => {
                setActiveCardIdx(prev => Math.max(0, prev - 1));
                setIsCardFlipped(false);
              }}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-xs flex items-center gap-1 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>

            <button
              onClick={() => setIsCardFlipped(!isCardFlipped)}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              <span>{isCardFlipped ? 'Show Front' : 'Reveal Back'}</span>
            </button>

            <button
              disabled={activeCardIdx === parsedFlashcards.length - 1}
              onClick={() => {
                setActiveCardIdx(prev => Math.min(parsedFlashcards.length - 1, prev + 1));
                setIsCardFlipped(false);
              }}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-xs flex items-center gap-1 transition-all cursor-pointer"
            >
              <span>Next</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Arohi Exam Pass Modal */}
      <ArohiExamPassModal
        isOpen={isExamPassModalOpen}
        onClose={() => setIsExamPassModalOpen(false)}
        isDarkMode={isDarkMode}
        selectedTier={passModalTier}
      />
    </div>
  );
}
