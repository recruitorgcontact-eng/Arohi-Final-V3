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
  const { user, userData, userMemory, incrementFreeExamAttempt } = useAuth();
  const rawDisplayName = 
    userData?.profile?.name || 
    userData?.displayName || 
    userMemory?.displayName || 
    user?.displayName || 
    (user?.email ? user.email.split('@')[0] : '');

  const userName = user ? (rawDisplayName?.trim() || 'User') : 'User';
  const userState = (userData?.profile?.location || (user as any)?.state) || 'Odisha';

  const [allTests, setAllTests] = useState<MockTest[]>(INITIAL_MOCK_TESTS);
  
  // Free tier quota policy: 5 free tests in all categories
  const hasActivePass = Boolean(
    userData?.examPass || 
    (typeof window !== 'undefined' && localStorage.getItem('arohi_exam_pass'))
  );

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
  // Special Sub-views: 'player' | 'ai_analysis' | 'study_plan' | 'leaderboard' | 'generator' | 'kg_landing' | 'school_boards' | 'school_landing'
  const [activeTab, setActiveTab] = useState<'home' | 'exams' | 'ai_mentor' | 'results' | 'profile'>('home');
  const [subView, setSubView] = useState<'none' | 'player' | 'ai_analysis' | 'study_plan' | 'leaderboard' | 'generator' | 'kg_landing' | 'school_boards' | 'school_landing'>('none');
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
  const handleSelectTestWithSubjectPicker = useCallback((test: MockTest) => {
    setPickerSelectedTest(test);
    if (test.mainCategory?.toLowerCase().includes('state') || test.subCategory?.includes('OPSC') || test.subCategory?.includes('Police') || test.subCategory?.includes('BPSC') || test.subCategory?.includes('TET')) {
      setPickerInitialCategory('state');
    } else if (test.mainCategory?.toLowerCase().includes('school') || test.board) {
      setPickerInitialCategory('school');
    } else {
      setPickerInitialCategory('competitive');
    }
    setIsSubjectPickerOpen(true);
  }, []);

  const handleOpenSubjectPicker = useCallback((cat?: 'all' | 'school' | 'competitive' | 'state', test?: MockTest) => {
    if (cat) setPickerInitialCategory(cat);
    if (test) setPickerSelectedTest(test);
    else setPickerSelectedTest(null);
    setIsSubjectPickerOpen(true);
  }, []);

  // Master Launch Handler with Complete Questions Expansion and 5-Free-Tests Quota Check
  const handleLaunchTest = useCallback((test: MockTest) => {
    if (!hasActivePass && freeAttemptsCount >= MAX_FREE_TESTS) {
      setPassModalTier('silver');
      setIsExamPassModalOpen(true);
      return;
    }
    const completeTest = ensureTestComplete(test);
    setSelectedTest(completeTest);
    setSubView('player');
  }, [hasActivePass, freeAttemptsCount]);

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
      const match = allTests.find(t => t.slug === initialTestSlug || t.id === initialTestSlug);
      if (match) {
        handleLaunchTest(match);
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

    // Increment free attempts counter if user does not have an active pass
    if (!hasActivePass && incrementFreeExamAttempt) {
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
      {subView !== 'player' && (
        <header className={`sticky top-0 z-40 w-full border-b backdrop-blur-xl px-4 py-3.5 transition-all ${
          isDarkMode 
            ? 'bg-slate-950/90 border-slate-800/80 text-white shadow-sm' 
            : 'bg-white/90 border-slate-200/80 text-slate-900 shadow-xs'
        }`}>
          <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => {
                  if (subView !== 'none') {
                    setSubView('none');
                  } else {
                    setActiveTab('home');
                  }
                }}
                className="p-2 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
                aria-label="Menu"
              >
                <Menu className="w-5 h-5" />
              </button>
              
              <div 
                onClick={() => { setSubView('none'); setActiveTab('home'); }}
                className="flex items-center gap-2.5 cursor-pointer active:scale-95 transition-transform"
              >
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white text-sm font-black shadow-sm">
                  A
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-black text-sm sm:text-base tracking-tight text-slate-900 dark:text-white">Arohi Exams</span>
                    <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 text-[10px] font-black uppercase tracking-wider">
                      CBT Pro
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {hasActivePass ? (
                <button
                  onClick={() => setIsExamPassModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-700 shadow-xs cursor-pointer hover:bg-emerald-100 active:scale-95 transition-all"
                >
                  <Crown className="w-4 h-4 fill-amber-400 text-amber-500" />
                  <span>Pass Active</span>
                </button>
              ) : (
                <button
                  onClick={() => setIsExamPassModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-50 to-indigo-50 text-purple-900 dark:from-purple-950/60 dark:to-indigo-950/60 dark:text-purple-200 text-xs font-bold border border-purple-200 dark:border-purple-800 shadow-xs cursor-pointer hover:border-purple-400 active:scale-95 transition-all"
                  title="Free Tier: Attend up to 5 mock tests across all categories"
                >
                  <span className="text-sm">🎁</span>
                  <span>Free: {remainingFreeTests}/5</span>
                  <span className="hidden sm:inline font-semibold text-[11px] text-purple-600 dark:text-purple-400">Left</span>
                </button>
              )}

              <button
                onClick={() => setIsExamPassModalOpen(true)}
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-xs cursor-pointer active:scale-95 transition-all"
              >
                <Crown className="w-3.5 h-3.5 fill-slate-950 text-slate-950" />
                <span>Get Pass</span>
              </button>

              <button 
                onClick={() => {
                  if (onOpenChatWithPrompt) {
                    onOpenChatWithPrompt("Arohi, what are today's top exam updates and trending test papers?");
                  }
                }}
                className="p-2 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 relative transition-colors cursor-pointer"
                title="Exam Notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-purple-600 animate-pulse"></span>
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
                onSelectTest={(t) => handleSelectTestWithSubjectPicker(t)}
                onOpenSubjectPicker={(cat, t) => handleOpenSubjectPicker(cat, t)}
                onOpenExamPass={() => setIsExamPassModalOpen(true)}
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

      {/* 3. 5-TAB BOTTOM NAVIGATION BAR (Native App Feel) */}
      {subView !== 'player' && (
        <nav className={`fixed bottom-0 left-0 right-0 z-50 border-t backdrop-blur-2xl px-3 sm:px-6 py-2.5 transition-all ${
          isDarkMode 
            ? 'bg-slate-950/95 border-slate-800/90 text-slate-400 shadow-2xl' 
            : 'bg-white/95 border-slate-200/90 text-slate-600 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]'
        }`}>
          <div className="max-w-lg mx-auto grid grid-cols-5 items-center text-center">
            
            {/* 1. Home */}
            <button
              onClick={() => { setSubView('none'); setActiveTab('home'); }}
              className={`flex flex-col items-center justify-center gap-1 py-1 rounded-2xl transition-all cursor-pointer ${
                subView === 'none' && activeTab === 'home'
                  ? 'text-purple-600 dark:text-purple-400 font-bold scale-105'
                  : 'hover:text-slate-900 dark:hover:text-white active:scale-95'
              }`}
            >
              <div className={`p-1 rounded-xl transition-colors ${subView === 'none' && activeTab === 'home' ? 'bg-purple-100/70 dark:bg-purple-950/70' : ''}`}>
                <Home className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <span className="text-xs tracking-tight">Home</span>
            </button>

            {/* 2. Exams */}
            <button
              onClick={() => { setSubView('none'); setSelectedCategoryTab('all'); setActiveTab('exams'); }}
              className={`flex flex-col items-center justify-center gap-1 py-1 rounded-2xl transition-all cursor-pointer ${
                subView === 'none' && activeTab === 'exams'
                  ? 'text-purple-600 dark:text-purple-400 font-bold scale-105'
                  : 'hover:text-slate-900 dark:hover:text-white active:scale-95'
              }`}
            >
              <div className={`p-1 rounded-xl transition-colors ${subView === 'none' && activeTab === 'exams' ? 'bg-purple-100/70 dark:bg-purple-950/70' : ''}`}>
                <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <span className="text-xs tracking-tight">Exams</span>
            </button>

            {/* 3. Central Elevated Arohi AI Action Button */}
            <button
              onClick={() => { setSubView('none'); setActiveTab('ai_mentor'); }}
              className="flex flex-col items-center -mt-6 group cursor-pointer"
            >
              <div className="relative">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 opacity-40 blur-sm group-hover:opacity-75 transition-opacity"></div>
                <div className="relative w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-purple-600 via-indigo-600 to-purple-700 text-white flex items-center justify-center shadow-xl group-hover:scale-105 group-active:scale-95 transition-transform border-2 border-white dark:border-slate-900">
                  <Sparkles className="w-6 h-6 fill-white text-white animate-pulse" />
                </div>
              </div>
              <span className="text-xs font-black text-purple-600 dark:text-purple-400 mt-1">Arohi AI</span>
            </button>

            {/* 4. Results */}
            <button
              onClick={() => { setSubView('none'); setActiveTab('results'); }}
              className={`flex flex-col items-center justify-center gap-1 py-1 rounded-2xl transition-all cursor-pointer ${
                subView === 'none' && activeTab === 'results'
                  ? 'text-purple-600 dark:text-purple-400 font-bold scale-105'
                  : 'hover:text-slate-900 dark:hover:text-white active:scale-95'
              }`}
            >
              <div className={`p-1 rounded-xl transition-colors ${subView === 'none' && activeTab === 'results' ? 'bg-purple-100/70 dark:bg-purple-950/70' : ''}`}>
                <BarChart2 className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <span className="text-xs tracking-tight">Results</span>
            </button>

            {/* 5. Profile */}
            <button
              onClick={() => { setSubView('none'); setActiveTab('profile'); }}
              className={`flex flex-col items-center justify-center gap-1 py-1 rounded-2xl transition-all cursor-pointer ${
                subView === 'none' && activeTab === 'profile'
                  ? 'text-purple-600 dark:text-purple-400 font-bold scale-105'
                  : 'hover:text-slate-900 dark:hover:text-white active:scale-95'
              }`}
            >
              <div className={`p-1 rounded-xl transition-colors ${subView === 'none' && activeTab === 'profile' ? 'bg-purple-100/70 dark:bg-purple-950/70' : ''}`}>
                <User className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <span className="text-xs tracking-tight">Profile</span>
            </button>

          </div>
        </nav>
      )}

      {/* Pro Pass Modal */}
      <ArohiExamPassModal
        isOpen={isExamPassModalOpen}
        onClose={() => setIsExamPassModalOpen(false)}
        isDarkMode={isDarkMode}
        selectedTier={passModalTier}
      />

      {/* Exam Subject & Paper Picker Modal */}
      <ExamSubjectPickerModal
        isOpen={isSubjectPickerOpen}
        onClose={() => setIsSubjectPickerOpen(false)}
        isDarkMode={isDarkMode}
        initialCategory={pickerInitialCategory}
        initialTest={pickerSelectedTest}
        tests={allTests}
        userState={userState}
        onConfirmLaunch={(preparedTest) => {
          setIsSubjectPickerOpen(false);
          handleLaunchTest(preparedTest);
        }}
      />
    </div>
  );
}
