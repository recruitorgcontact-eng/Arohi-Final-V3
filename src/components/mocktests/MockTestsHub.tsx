import React, { useState, useEffect, useCallback } from 'react';
import { 
  Home, BookOpen, Sparkles, BarChart2, User, Award, 
  Flame, Bell, Menu, GraduationCap, Building2, Search, 
  Crown, ArrowRight, ShieldCheck, ChevronRight
} from 'lucide-react';
import { MockTest, TestSubmission, TestResultReport, SectionResult, ExamQuestion } from '../../types/examTypes';
import { INITIAL_MOCK_TESTS } from '../../data/mockTestsData';
import { ensureTestComplete } from '../../utils/examQuestionExpander';
import CbtExamPlayer from './CbtExamPlayer';
import ExamResultView from './ExamResultView';
import ExamAiAnalysisView from './ExamAiAnalysisView';
import ExamLeaderboardView from './ExamLeaderboardView';
import CustomExamGenerator from './CustomExamGenerator';
import ArohiExamPassModal from './ArohiExamPassModal';
import ExamKGLandingPage from './ExamKGLandingPage';
import SchoolBoardKGLandingPage from './SchoolBoardKGLandingPage';
import SchoolBoardsDirectoryView from './SchoolBoardsDirectoryView';
import { MasterSchoolBoardDefinition, SchoolBoardGrade, SchoolBoardGradeSubject } from '../../data/schoolBoardsKnowledgeGraph';
import { resolveKGLineage } from '../../data/examKnowledgeGraph';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../firebase';
import { doc, updateDoc, arrayUnion, setDoc } from 'firebase/firestore';

// Subcomponents for the 7 screenshots
import ArohiExamsHome from './ArohiExamsHome';
import ArohiExamsCatalogView from './ArohiExamsCatalogView';
import ArohiExamsResultScreen from './ArohiExamsResultScreen';
import ArohiAiAnalysisScreen from './ArohiAiAnalysisScreen';
import ArohiStudyPlanScreen from './ArohiStudyPlanScreen';
import ArohiAiMentorScreen from './ArohiAiMentorScreen';
import ExamSubjectPickerModal from './ExamSubjectPickerModal';
import ArohiExamsArena from './ArohiExamsArena';

interface MockTestsHubProps {
  isDarkMode?: boolean;
  onNavigateTab?: (tab: string) => void;
  onOpenChatWithPrompt?: (prompt: string) => void;
  initialTestSlug?: string;
  onOpenAuth?: () => void;
}

export default function MockTestsHub({
  isDarkMode = false,
  onNavigateTab,
  onOpenChatWithPrompt,
  initialTestSlug,
  onOpenAuth
}: MockTestsHubProps) {
  const { user, userData, userMemory, incrementFreeExamAttempt, consumeExamPassTest } = useAuth();
  const rawDisplayName = 
    userData?.profile?.name || 
    userData?.displayName || 
    userMemory?.displayName || 
    user?.displayName || 
    (user?.email ? user.email.split('@')[0] : '');

  const userName = user ? (rawDisplayName?.trim() || 'User') : 'User';
  const userState = (userData?.profile?.location || (user as any)?.state) || 'Odisha';

  const [allTests, setAllTests] = useState<MockTest[]>(INITIAL_MOCK_TESTS);
  
  // Real pass quota tracking (from userData or local storage)
  const [localPass, setLocalPass] = useState<any>(() => {
    try {
      const stored = localStorage.getItem('arohi_exam_pass');
      return stored ? JSON.parse(stored) : null;
    } catch { return null; }
  });

  useEffect(() => {
    const handlePassUpdate = (e: any) => {
      if (e.detail) setLocalPass(e.detail);
    };
    window.addEventListener('arohi_exam_pass_activated', handlePassUpdate);
    window.addEventListener('arohi_exam_pass_updated', handlePassUpdate);
    return () => {
      window.removeEventListener('arohi_exam_pass_activated', handlePassUpdate);
      window.removeEventListener('arohi_exam_pass_updated', handlePassUpdate);
    };
  }, []);

  const activePass = userData?.examPass || localPass;
  const passTier = activePass?.tier || 'silver';
  const passTotalTests = activePass?.totalTests || (passTier === 'silver' ? 10 : passTier === 'gold' ? 25 : 60);
  const passTestsRemaining = typeof activePass?.testsRemaining === 'number' 
    ? activePass.testsRemaining 
    : (activePass ? passTotalTests : 0);
  
  const hasActivePass = Boolean(activePass && passTestsRemaining > 0);
  const isPassExhausted = Boolean(activePass && passTestsRemaining <= 0);

  const [localSubmissionCount, setLocalSubmissionCount] = useState<number>(() => {
    try {
      const list = JSON.parse(localStorage.getItem('arohi_mock_test_submissions') || '[]');
      return Array.isArray(list) ? list.length : 0;
    } catch (e) {
      return 0;
    }
  });

  const MAX_FREE_TESTS = 5;
  const freeAttemptsCount = Number(
    userData?.freeExamAttemptsCount ?? localSubmissionCount
  );
  const remainingFreeTests = Math.max(0, MAX_FREE_TESTS - freeAttemptsCount);
  const isFreeLimitExceeded = !hasActivePass && freeAttemptsCount >= MAX_FREE_TESTS;
  
  // 5-Tab Navigation System: 'home' | 'exams' | 'ai_mentor' | 'results' | 'profile'
  // Special Sub-views: 'player' | 'ai_analysis' | 'study_plan' | 'leaderboard' | 'generator' | 'kg_landing' | 'school_boards' | 'school_landing' | 'arena'
  const [activeTab, setActiveTab] = useState<'home' | 'exams' | 'ai_mentor' | 'results' | 'profile'>('home');
  const [subView, setSubView] = useState<'none' | 'player' | 'ai_analysis' | 'study_plan' | 'leaderboard' | 'generator' | 'kg_landing' | 'school_boards' | 'school_landing' | 'arena'>('none');
  const [selectedCategoryTab, setSelectedCategoryTab] = useState<'all' | 'school' | 'competitive' | 'state'>('all');

  const [selectedTest, setSelectedTest] = useState<MockTest | null>(null);
  const [selectedBoard, setSelectedBoard] = useState<MasterSchoolBoardDefinition | null>(null);
  const [selectedGradeSlug, setSelectedGradeSlug] = useState<string>('class-10');
  const [activeReport, setActiveReport] = useState<TestResultReport | null>(null);
  const [isExamPassModalOpen, setIsExamPassModalOpen] = useState(false);
  const [passModalTier, setPassModalTier] = useState<'silver' | 'gold' | 'platinum'>('silver');

  // Exam Subject & Paper Picker State
  const [isSubjectPickerOpen, setIsSubjectPickerOpen] = useState(false);
  const [pickerInitialCategory, setPickerInitialCategory] = useState<'all' | 'school' | 'competitive' | 'state'>('all');
  const [pickerSelectedTest, setPickerSelectedTest] = useState<MockTest | null>(null);

  // Intercepting Selection Handler to open Subject Picker Modal for All Categories
  const [pickerSelectedSetNumber, setPickerSelectedSetNumber] = useState<number>(1);

  const handleSelectTestWithSubjectPicker = useCallback((test: MockTest, setNumber?: number) => {
    setPickerSelectedTest(test);
    setPickerSelectedSetNumber(setNumber || test.currentSetNumber || test.setNumber || 1);
    if (test.mainCategory?.toLowerCase().includes('state') || test.subCategory?.includes('OPSC') || test.subCategory?.includes('Police') || test.subCategory?.includes('BPSC') || test.subCategory?.includes('TET')) {
      setPickerInitialCategory('state');
    } else if (test.mainCategory?.toLowerCase().includes('school') || test.board) {
      setPickerInitialCategory('school');
    } else {
      setPickerInitialCategory('competitive');
    }
    setIsSubjectPickerOpen(true);
  }, []);

  const handleOpenSubjectPicker = useCallback((cat?: 'all' | 'school' | 'competitive' | 'state', test?: MockTest, setNumber?: number) => {
    if (cat) setPickerInitialCategory(cat);
    if (test) {
      setPickerSelectedTest(test);
      setPickerSelectedSetNumber(setNumber || test.currentSetNumber || test.setNumber || 1);
    } else {
      setPickerSelectedTest(null);
      setPickerSelectedSetNumber(1);
    }
    setIsSubjectPickerOpen(true);
  }, []);

  // Master Launch Handler with Complete Questions Expansion and Pass / Free-Quota Check
  const handleLaunchTest = useCallback((test: MockTest, setNumber?: number) => {
    if (!hasActivePass && freeAttemptsCount >= MAX_FREE_TESTS) {
      setPassModalTier(activePass?.tier || 'silver');
      setIsExamPassModalOpen(true);
      return;
    }
    const targetSet = setNumber || test.currentSetNumber || test.setNumber || 1;
    const completeTest = ensureTestComplete(test, targetSet);
    setSelectedTest(completeTest);
    setSubView('player');
  }, [hasActivePass, freeAttemptsCount, activePass]);

  // Check for dynamic custom CBT test from chat or initialTestSlug
  useEffect(() => {
    try {
      const storedCustom = sessionStorage.getItem('arohi_active_custom_cbt');
      if (storedCustom) {
        const customObj: MockTest = JSON.parse(storedCustom);
        if (customObj && customObj.id && Array.isArray(customObj.questions) && customObj.questions.length > 0) {
          sessionStorage.removeItem('arohi_active_custom_cbt');
          const completeCustom = ensureTestComplete(customObj);
          setAllTests(prev => [completeCustom, ...prev.filter(t => t.id !== completeCustom.id)]);
          setSelectedTest(completeCustom);
          setSubView('player');
          return;
        }
      }
    } catch (e) {}

    if (initialTestSlug) {
      const setMatch = initialTestSlug.match(/-set-(\d+)$/i);
      const parsedSet = setMatch ? parseInt(setMatch[1], 10) : 1;
      const cleanSlug = initialTestSlug.replace(/-set-\d+$/i, '');
      const match = allTests.find(t => 
        t.slug === initialTestSlug || 
        t.id === initialTestSlug ||
        t.slug === cleanSlug ||
        t.id === cleanSlug
      );
      if (match) {
        handleLaunchTest(match, parsedSet);
      }
    }
  }, [initialTestSlug, allTests, handleLaunchTest]);

  // Handle Test Submission & Rigorous Evaluation (All Questions)
  const handleTestSubmission = async (submission: TestSubmission) => {
    const activeTest = submission.preparedTest || selectedTest;
    if (!activeTest) return;

    const questionsToEvaluate = (submission.preparedQuestions && submission.preparedQuestions.length > 0)
      ? submission.preparedQuestions
      : activeTest.questions;

    let positiveMarksTotal = 0;
    let negativeMarksDeducted = 0;
    let totalCorrect = 0;
    let totalIncorrect = 0;
    let totalAttempted = 0;
    let totalUnattempted = 0;
    let totalMarkedForReview = 0;

    const subjectAccuracy: Record<string, { attempted: number; correct: number; accuracy: number }> = {};
    const weakTopicsSet = new Set<string>();
    const strongTopicsSet = new Set<string>();

    const detailedQuestions: Array<ExamQuestion & { userResponse?: string; isCorrect: boolean; timeTaken: number }> = [];

    questionsToEvaluate.forEach((q) => {
      const state = submission.questionStates[q.id];
      const userResponse = submission.answers[q.id];
      const isAttempted = !!userResponse;
      const isCorrect = isAttempted && userResponse.toUpperCase() === q.correctAnswer.toUpperCase();
      const timeTaken = state?.timeSpentSeconds || 0;

      const subjectKey = q.subject || q.sectionName || 'General';
      if (!subjectAccuracy[subjectKey]) {
        subjectAccuracy[subjectKey] = { attempted: 0, correct: 0, accuracy: 0 };
      }

      if (isAttempted) {
        totalAttempted++;
        subjectAccuracy[subjectKey].attempted++;

        if (isCorrect) {
          totalCorrect++;
          positiveMarksTotal += (q.positiveMarks || 1.0);
          subjectAccuracy[subjectKey].correct++;
          if (q.topic) strongTopicsSet.add(q.topic);
        } else {
          totalIncorrect++;
          negativeMarksDeducted += (q.negativeMarks || 0.25);
          if (q.topic) weakTopicsSet.add(q.topic);
        }
      } else {
        totalUnattempted++;
      }

      if (state?.status === 'marked_for_review' || state?.status === 'answered_and_marked') {
        totalMarkedForReview++;
      }

      detailedQuestions.push({
        ...q,
        userResponse,
        isCorrect,
        timeTaken
      });
    });

    Object.keys(subjectAccuracy).forEach((subj) => {
      const d = subjectAccuracy[subj];
      d.accuracy = d.attempted > 0 ? (d.correct / d.attempted) * 100 : 0;
    });

    const finalRawScore = Math.max(0, Number((positiveMarksTotal - negativeMarksDeducted).toFixed(2)));
    const totalMaxMarks = activeTest.totalMarks || questionsToEvaluate.length;
    const scorePercentage = totalMaxMarks > 0 ? Number(((finalRawScore / totalMaxMarks) * 100).toFixed(1)) : 0;
    const accuracyPercentage = totalAttempted > 0 ? Number(((totalCorrect / totalAttempted) * 100).toFixed(1)) : 0;

    const baselinePercentile = Math.min(99.9, Math.max(5.0, Number(((scorePercentage * 0.85) + (accuracyPercentage * 0.15)).toFixed(1))));
    const totalParticipants = activeTest.attemptsCount || 125678;
    const calculatedAir = Math.max(1, Math.round(totalParticipants * (1 - (baselinePercentile / 100))));
    const totalStateParticipants = Math.round(totalParticipants * 0.12);
    const calculatedStateRank = Math.max(1, Math.round(totalStateParticipants * (1 - (baselinePercentile / 100))));

    const sectionResults: SectionResult[] = activeTest.sections.map((sec) => {
      const secQuestions = detailedQuestions.filter(q => q.sectionId === sec.id);
      let secCorrect = 0;
      let secIncorrect = 0;
      let secAttempted = 0;
      let secPos = 0;
      let secNeg = 0;
      let secTime = 0;

      secQuestions.forEach(q => {
        secTime += q.timeTaken;
        if (q.userResponse) {
          secAttempted++;
          if (q.isCorrect) {
            secCorrect++;
            secPos += (q.positiveMarks || 1.0);
          } else {
            secIncorrect++;
            secNeg += (q.negativeMarks || 0.25);
          }
        }
      });

      const secScore = Math.max(0, Number((secPos - secNeg).toFixed(2)));
      const secAcc = secAttempted > 0 ? Number(((secCorrect / secAttempted) * 100).toFixed(1)) : 0;
      const actualSecTotalQ = secQuestions.length || sec.totalQuestions;
      const actualSecMaxScore = sec.totalMarks || (actualSecTotalQ * (sec.positiveMarksPerQuestion || 1.0));

      return {
        sectionId: sec.id,
        sectionName: sec.name,
        totalQuestions: actualSecTotalQ,
        attempted: secAttempted,
        correct: secCorrect,
        incorrect: secIncorrect,
        unattempted: actualSecTotalQ - secAttempted,
        score: secScore,
        maxScore: actualSecMaxScore,
        accuracy: secAcc,
        timeSpentSeconds: secTime
      };
    });

    const cutoff = activeTest.cutoffEstimated || (totalMaxMarks * 0.6);
    const hasClearedCutoff = finalRawScore >= cutoff;

    const report: TestResultReport = {
      id: `report_${Date.now()}`,
      testId: activeTest.id,
      testTitle: activeTest.title,
      mainCategory: activeTest.mainCategory,
      subCategory: activeTest.subCategory,
      userName: submission.userName,
      userState: submission.userState || userState,
      score: finalRawScore,
      maxScore: totalMaxMarks,
      percentage: scorePercentage,
      accuracyPercentage,
      percentile: baselinePercentile,
      allIndiaRank: calculatedAir,
      totalParticipants,
      stateRank: calculatedStateRank,
      totalStateParticipants,
      timeSpentSeconds: submission.totalTimeTakenSeconds,
      totalDurationSeconds: activeTest.durationMinutes * 60,
      totalQuestions: questionsToEvaluate.length,
      totalAttempted,
      totalCorrect,
      totalIncorrect,
      totalUnattempted,
      totalMarkedForReview,
      positiveMarksTotal,
      negativeMarksDeducted,
      cutoffScore: cutoff,
      hasClearedCutoff,
      sectionResults,
      subjectAccuracyBreakdown: subjectAccuracy,
      weakTopics: Array.from(weakTopicsSet),
      strongTopics: Array.from(strongTopicsSet),
      submittedAt: submission.completedAt,
      detailedQuestions
    };

    setActiveReport(report);
    setSelectedTest(activeTest);
    setSubView('none');
    setActiveTab('results');

    // Local Storage save
    const historyItem = {
      id: report.id,
      examTitle: selectedTest.title,
      subject: selectedTest.categoryLabel || 'Competitive Exam',
      totalQuestions: selectedTest.totalQuestions,
      answeredCount: totalAttempted,
      correctCount: totalCorrect,
      wrongCount: totalIncorrect,
      unattemptedCount: totalUnattempted,
      accuracy: Math.round(accuracyPercentage),
      scoreMarks: finalRawScore,
      maxScore: selectedTest.totalMarks,
      percentage: Math.round(scorePercentage),
      timeSpentSeconds: submission.totalTimeTakenSeconds,
      totalDurationMinutes: selectedTest.durationMinutes,
      completedAt: submission.completedAt,
      source: 'All-India CBT Portal',
      userName: userName
    };

    try {
      const existingStr = localStorage.getItem('arohi_mock_test_submissions');
      const existing = existingStr ? JSON.parse(existingStr) : [];
      existing.unshift(historyItem);
      localStorage.setItem('arohi_mock_test_submissions', JSON.stringify(existing.slice(0, 50)));
      setLocalSubmissionCount(existing.length);
    } catch (e) {}

    // Deduct test from pass quota if pass is active, otherwise increment free attempts counter
    if (hasActivePass && consumeExamPassTest) {
      consumeExamPassTest().then(res => {
        if (res && typeof res.testsRemaining === 'number') {
          setLocalPass((prev: any) => prev ? { ...prev, testsRemaining: res.testsRemaining } : prev);
        }
      }).catch(() => {});
    } else if (incrementFreeExamAttempt) {
      incrementFreeExamAttempt().catch(() => {});
    }

    // Firestore sync
    if (user && user.uid && db) {
      try {
        const userRef = doc(db, 'users', user.uid);
        await updateDoc(userRef, {
          mockTestHistory: arrayUnion(historyItem),
          lastExamDate: new Date().toISOString()
        }).catch(async () => {
          await setDoc(userRef, {
            mockTestHistory: [historyItem],
            lastExamDate: new Date().toISOString()
          }, { merge: true });
        });
      } catch (firestoreErr) {}
    }

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('arohi_mock_test_completed', { detail: historyItem }));
    }
  };

  return (
    <div className={`w-full min-h-[calc(100vh-64px)] relative transition-colors ${
      isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50/60 text-slate-900'
    }`}>
      
      {/* 1. TOP AROHI EXAMS HEADER APP BAR */}
      {subView !== 'player' && subView !== 'arena' && (
        <header className={`sticky top-0 z-40 w-full border-b backdrop-blur-xl px-3 sm:px-4 py-2 sm:py-2.5 transition-all ${
          isDarkMode 
            ? 'bg-zinc-950/80 border-white/[0.08] text-white' 
            : 'bg-white/80 border-black/[0.06] text-zinc-900 shadow-[0_1px_2px_rgba(0,0,0,0.02)]'
        }`}>
          <div className="max-w-4xl mx-auto flex items-center justify-between gap-2.5">
            <div className="flex items-center gap-2">
              <button 
                onClick={() => {
                  if (subView !== 'none') {
                    setSubView('none');
                  } else {
                    setActiveTab('home');
                  }
                }}
                className="p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-400 transition-colors cursor-pointer"
                aria-label="Menu"
              >
                <Menu className="w-4 h-4" />
              </button>
              
              <div 
                onClick={() => { setSubView('none'); setActiveTab('home'); }}
                className="flex items-center gap-2 cursor-pointer active:scale-95 transition-transform"
              >
                <div className="w-7 h-7 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 flex items-center justify-center text-xs font-semibold">
                  A
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-xs sm:text-[13px] tracking-tight text-zinc-900 dark:text-zinc-100">Arohi Exams</span>
                  <span className="px-1.5 py-0.2 rounded text-[9.5px] font-medium bg-zinc-100 dark:bg-white/[0.06] text-zinc-600 dark:text-zinc-300 border border-zinc-200/60 dark:border-white/[0.08]">
                    CBT
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {/* GAMING ARENA BUTTON (Apple Minimal Capsule) */}
              <button
                onClick={() => setSubView('arena')}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-zinc-100 dark:bg-white/[0.06] hover:bg-zinc-200 dark:hover:bg-white/[0.1] text-zinc-900 dark:text-zinc-100 border border-black/[0.06] dark:border-white/[0.08] cursor-pointer active:scale-95 transition-all"
                title="Enter Arohi Exams Gaming Arena (1v1 Duels & Tournaments)"
              >
                <Crown className="w-3 h-3 text-amber-500" />
                <span>Arena</span>
                <span className="px-1 py-0.2 rounded bg-amber-500/15 text-amber-600 dark:text-amber-400 text-[9px] font-semibold">1v1</span>
              </button>

              {hasActivePass ? (
                <button
                  onClick={() => setIsExamPassModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[11px] font-medium border border-emerald-500/20 cursor-pointer active:scale-95 transition-all"
                  title={`${activePass?.name || 'Exam Pass'}: ${passTestsRemaining} of ${passTotalTests} Tests Remaining`}
                >
                  <ShieldCheck className="w-3 h-3 text-emerald-500" />
                  <span>{passTestsRemaining}/{passTotalTests} Left</span>
                </button>
              ) : isPassExhausted ? (
                <button
                  onClick={() => {
                    setPassModalTier(activePass?.tier || 'silver');
                    setIsExamPassModalOpen(true);
                  }}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[11px] font-medium border border-amber-500/20 cursor-pointer active:scale-95 transition-all"
                  title="Your test pass quota is complete. Click to renew your pass."
                >
                  <span>Pass Expired</span>
                  <span className="text-[9px] uppercase font-semibold text-amber-600">Renew</span>
                </button>
              ) : (
                <button
                  onClick={() => setIsExamPassModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-white/[0.06] text-zinc-700 dark:text-zinc-300 text-[11px] font-medium border border-black/[0.06] dark:border-white/[0.08] cursor-pointer active:scale-95 transition-all"
                  title="Free Tier: Attend up to 5 mock tests across all categories"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>{remainingFreeTests}/5 Free</span>
                </button>
              )}

              <button
                onClick={() => setIsExamPassModalOpen(true)}
                className="hidden sm:inline-flex items-center gap-1 px-3 py-1 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 text-[11px] font-medium hover:opacity-90 cursor-pointer active:scale-95 transition-all"
              >
                <span>{hasActivePass ? 'Pass' : 'Get Pass'}</span>
              </button>

              <button 
                onClick={() => {
                  if (onOpenChatWithPrompt) {
                    onOpenChatWithPrompt("Arohi, what are today's top exam updates and trending test papers?");
                  }
                }}
                className="p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-400 relative transition-colors cursor-pointer"
                title="Exam Notifications"
              >
                <Bell className="w-3.5 h-3.5" />
                <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-amber-500"></span>
              </button>
            </div>
          </div>
        </header>
      )}

      {/* 2. MAIN VIEW SWITCHER */}
      <main className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
        {/* Full-Screen CBT Player */}
        {subView === 'player' && selectedTest && (
          <CbtExamPlayer
            test={selectedTest}
            userName={userName}
            userState={userState}
            isDarkMode={isDarkMode}
            onExit={() => setSubView('none')}
            onSubmit={handleTestSubmission}
          />
        )}

        {/* AI Analysis Sub-View */}
        {subView === 'ai_analysis' && (
          <ArohiAiAnalysisScreen
            isDarkMode={isDarkMode}
            report={activeReport}
            onBackToResult={() => setSubView('none')}
            onAskArohiInChat={onOpenChatWithPrompt}
            onOpenStudyPlan={() => {
              setSubView('none');
              setActiveTab('profile');
            }}
          />
        )}

        {/* School Boards Directory */}
        {subView === 'school_boards' && (
          <SchoolBoardsDirectoryView
            isDarkMode={isDarkMode}
            onBackToCatalog={() => setSubView('none')}
            onSelectBoard={(board, gradeSlug) => {
              setSelectedBoard(board);
              if (gradeSlug) setSelectedGradeSlug(gradeSlug);
              setSubView('school_landing');
            }}
          />
        )}

        {/* School Landing */}
        {subView === 'school_landing' && selectedBoard && (
          <SchoolBoardKGLandingPage
            board={selectedBoard}
            initialGradeSlug={selectedGradeSlug}
            isDarkMode={isDarkMode}
            onBack={() => setSubView('school_boards')}
            onStartBoardQuiz={(board, grade, subject) => {
              const matchedTest = allTests.find(t => 
                t.board?.toLowerCase().includes(board.code.toLowerCase()) ||
                t.title.toLowerCase().includes(board.code.toLowerCase())
              ) || allTests[0];
              handleLaunchTest(matchedTest);
            }}
          />
        )}

        {/* Custom Exam Generator */}
        {subView === 'generator' && (
          <CustomExamGenerator
            isDarkMode={isDarkMode}
            onBack={() => setSubView('none')}
            onLaunchGeneratedTest={(genTest) => {
              const completeGen = ensureTestComplete(genTest);
              setAllTests(prev => [completeGen, ...prev]);
              handleLaunchTest(completeGen);
            }}
          />
        )}

        {/* Arohi Exams Gaming Arena */}
        {subView === 'arena' && (
          <ArohiExamsArena
            isDarkMode={isDarkMode}
            onBackToExams={() => setSubView('none')}
            onNavigateTab={onNavigateTab}
            onOpenAuth={onOpenAuth}
          />
        )}

        {/* 5 BOTTOM BAR TABS */}
        {subView === 'none' && (
          <>
            {/* Tab 1: HOME (Screen 1) */}
            {activeTab === 'home' && (
              <ArohiExamsHome
                isDarkMode={isDarkMode}
                tests={allTests}
                freeAttemptsCount={freeAttemptsCount}
                remainingFreeTests={remainingFreeTests}
                hasActivePass={hasActivePass}
                maxFreeTests={MAX_FREE_TESTS}
                onSelectCategory={(cat) => {
                  handleOpenSubjectPicker(cat);
                }}
                onSelectTest={(t) => handleSelectTestWithSubjectPicker(t)}
                onOpenSubjectPicker={(cat, t) => handleOpenSubjectPicker(cat, t)}
                onOpenAiAnalysis={() => setSubView('ai_analysis')}
                onOpenStudyPlan={() => setActiveTab('profile')}
                onOpenAiMentor={() => setActiveTab('ai_mentor')}
                onOpenExamPass={() => setIsExamPassModalOpen(true)}
                onOpenArena={() => setSubView('arena')}
                onNavigateTab={onNavigateTab}
                onOpenAuth={onOpenAuth}
              />
            )}

            {/* Tab 2: EXAMS (Screen 2) */}
            {activeTab === 'exams' && (
              <ArohiExamsCatalogView
                isDarkMode={isDarkMode}
                tests={allTests}
                freeAttemptsCount={freeAttemptsCount}
                remainingFreeTests={remainingFreeTests}
                hasActivePass={hasActivePass}
                maxFreeTests={MAX_FREE_TESTS}
                onSelectTest={(t, setNumber) => handleSelectTestWithSubjectPicker(t, setNumber)}
                onDirectLaunchTest={(t, setNumber) => handleLaunchTest(t, setNumber)}
                onOpenSubjectPicker={(cat, t, setNumber) => handleOpenSubjectPicker(cat, t, setNumber)}
                onOpenExamPass={() => setIsExamPassModalOpen(true)}
                onOpenArena={() => setSubView('arena')}
                initialCategoryTab={selectedCategoryTab}
              />
            )}

            {/* Tab 3: AI MENTOR (Screen 7) */}
            {activeTab === 'ai_mentor' && (
              <ArohiAiMentorScreen
                isDarkMode={isDarkMode}
                onBack={() => setActiveTab('home')}
                onAskArohiInChat={onOpenChatWithPrompt}
              />
            )}

            {/* Tab 4: RESULTS (Screen 4) */}
            {activeTab === 'results' && (
              <ArohiExamsResultScreen
                isDarkMode={isDarkMode}
                report={activeReport}
                onOpenAiAnalysis={() => setSubView('ai_analysis')}
                onRetakeTest={() => {
                  if (selectedTest) handleLaunchTest(selectedTest);
                  else if (allTests.length > 0) handleLaunchTest(allTests[0]);
                }}
                onBackToCatalog={() => setActiveTab('exams')}
                onOpenChatWithPrompt={onOpenChatWithPrompt}
              />
            )}

            {/* Tab 5: PROFILE / STUDY PLAN (Screen 6) */}
            {activeTab === 'profile' && (
              <ArohiStudyPlanScreen
                isDarkMode={isDarkMode}
                onBack={() => setActiveTab('home')}
                onOpenAiMentor={() => setActiveTab('ai_mentor')}
                onAskArohiInChat={onOpenChatWithPrompt}
              />
            )}
          </>
        )}
      </main>

      {/* 3. 5-TAB BOTTOM NAVIGATION BAR (Apple Minimal Native Feel) */}
      {subView !== 'player' && subView !== 'arena' && (
        <nav className={`fixed bottom-0 left-0 right-0 z-50 border-t backdrop-blur-xl px-2 sm:px-4 py-1.5 transition-all ${
          isDarkMode 
            ? 'bg-zinc-950/85 border-white/[0.08] text-zinc-400' 
            : 'bg-white/85 border-black/[0.06] text-zinc-600 shadow-[0_-1px_3px_rgba(0,0,0,0.03)]'
        }`}>
          <div className="max-w-md mx-auto grid grid-cols-5 items-center text-center">
            
            {/* 1. Home */}
            <button
              onClick={() => { setSubView('none'); setActiveTab('home'); }}
              className={`flex flex-col items-center justify-center gap-0.5 py-1 transition-all cursor-pointer ${
                subView === 'none' && activeTab === 'home'
                  ? 'text-zinc-900 dark:text-zinc-100 font-semibold'
                  : 'text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
              }`}
            >
              <Home className="w-4 h-4" />
              <span className="text-[10px] tracking-tight">Home</span>
            </button>

            {/* 2. Exams */}
            <button
              onClick={() => { setSubView('none'); setSelectedCategoryTab('all'); setActiveTab('exams'); }}
              className={`flex flex-col items-center justify-center gap-0.5 py-1 transition-all cursor-pointer ${
                subView === 'none' && activeTab === 'exams'
                  ? 'text-zinc-900 dark:text-zinc-100 font-semibold'
                  : 'text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span className="text-[10px] tracking-tight">Exams</span>
            </button>

            {/* 3. Central Sleek Arohi AI Action Button */}
            <button
              onClick={() => { setSubView('none'); setActiveTab('ai_mentor'); }}
              className="flex flex-col items-center -mt-3 group cursor-pointer"
            >
              <div className="w-9 h-9 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 flex items-center justify-center shadow-sm group-hover:scale-105 group-active:scale-95 transition-transform">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-[9.5px] font-semibold text-zinc-900 dark:text-zinc-100 mt-0.5">AI Mentor</span>
            </button>

            {/* 4. Results */}
            <button
              onClick={() => { setSubView('none'); setActiveTab('results'); }}
              className={`flex flex-col items-center justify-center gap-0.5 py-1 transition-all cursor-pointer ${
                subView === 'none' && activeTab === 'results'
                  ? 'text-zinc-900 dark:text-zinc-100 font-semibold'
                  : 'text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
              }`}
            >
              <BarChart2 className="w-4 h-4" />
              <span className="text-[10px] tracking-tight">Results</span>
            </button>

            {/* 5. Profile */}
            <button
              onClick={() => { setSubView('none'); setActiveTab('profile'); }}
              className={`flex flex-col items-center justify-center gap-0.5 py-1 transition-all cursor-pointer ${
                subView === 'none' && activeTab === 'profile'
                  ? 'text-zinc-900 dark:text-zinc-100 font-semibold'
                  : 'text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
              }`}
            >
              <User className="w-4 h-4" />
              <span className="text-[10px] tracking-tight">Profile</span>
            </button>

          </div>
        </nav>
      )}

      {/* Pro Pass Modal */}
      {isExamPassModalOpen && (
        <ArohiExamPassModal
          isOpen={isExamPassModalOpen}
          onClose={() => setIsExamPassModalOpen(false)}
          isDarkMode={isDarkMode}
          selectedTier={passModalTier}
        />
      )}

      {/* Exam Subject & Paper Picker Modal */}
      {isSubjectPickerOpen && (
        <ExamSubjectPickerModal
          isOpen={isSubjectPickerOpen}
          onClose={() => setIsSubjectPickerOpen(false)}
          isDarkMode={isDarkMode}
          initialCategory={pickerInitialCategory}
          initialTest={pickerSelectedTest}
          initialSetNumber={pickerSelectedSetNumber}
          tests={allTests}
          userState={userState}
          onConfirmLaunch={(preparedTest, setNumber) => {
            setIsSubjectPickerOpen(false);
            handleLaunchTest(preparedTest, setNumber);
          }}
        />
      )}
    </div>
  );
}
