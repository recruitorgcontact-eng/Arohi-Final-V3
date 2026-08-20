import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, XCircle, Award, Sparkles, ArrowRight, 
  HelpCircle, RefreshCw, Check, Brain, Play, RotateCcw,
  BookOpen, Layers, CheckCircle, TrendingUp, Zap
} from 'lucide-react';

interface ParsedQuizQuestion {
  id: string;
  questionNumber: number;
  text: string;
  options: { id: string; text: string }[];
  correctOption?: string;
  explanation?: string;
}

interface ParsedFlashcard {
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

export function parseMcqsFromText(text: string): ParsedQuizQuestion[] {
  if (!text) return [];

  const questions: ParsedQuizQuestion[] = [];
  
  // Clean markdown bold stars from question lines for reliable matching
  const cleanedText = text
    .replace(/\r\n/g, '\n')
    .replace(/```(?:html|css|js|jsx|tsx|json|text)?[\s\S]*?```/gi, ''); // remove any raw code blocks if present

  // Split on Question blocks
  const questionBlocks = cleanedText.split(/(?=(?:(?:(?:\*\*|\*|#+)?\s*(?:Question|Q|Ques)\s*\d+[\.\:\)]|\b\d+\.\s+[A-Z]))|(?:\n\s*---\s*\n))/i);

  questionBlocks.forEach((block, idx) => {
    const lines = block.trim().split('\n').map(l => l.trim()).filter(Boolean);
    if (lines.length < 2) return;

    let questionText = '';
    const options: { id: string; text: string }[] = [];
    let correctOption: string | undefined = undefined;
    let explanation = '';

    lines.forEach((rawLine) => {
      // Clean leading markdown formatting
      const line = rawLine.replace(/^\*+\s*/, '').trim();

      // Check for Option pattern: A) / A. / (A) / [A] / **A)** / - A)
      const optMatch = 
        line.match(/^[\*\-_]?\s*\(?([A-D])\)?[\.\:\)\-]\s*(.+)$/i) ||
        line.match(/^\*\*\(?([A-D])\)?[\.\:\)\-]?\*\*\s*(.+)$/i) ||
        line.match(/^[\*\-_]?\s*\*\*([A-D])[\.\:\)]\*\*\s*(.+)$/i);

      // Check for Correct Answer line
      const ansMatch = line.match(/(?:Correct\s*(?:Answer|Option)|Answer|Ans)\s*[\:\-]?\s*(?:\*\*)?\(?([A-D])\)?(?:\*\*)?/i);
      
      // Check for Explanation line
      const expMatch = line.match(/(?:Explanation|Solution|Reason|Note)\s*[\:\-]?\s*(.+)$/i);

      if (optMatch && !line.toLowerCase().startsWith('answer') && !line.toLowerCase().startsWith('correct')) {
        const optLetter = optMatch[1].toUpperCase();
        const optCleanText = optMatch[2].replace(/^\*\*/, '').replace(/\*\*$/, '').trim();
        // Avoid duplicate options
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
          .replace(/^(?:\*\*)?(?:Question|Q|Ques)?\s*\d+[\.\:\)]\s*(?:\*\*)?/i, '')
          .trim();
        if (cleanedQ) {
          questionText = cleanedQ;
        }
      } else if (options.length === 0 && questionText) {
        questionText += ' ' + rawLine.replace(/^#+\s*/, '').replace(/^\*+\s*/, '').trim();
      }
    });

    if (questionText && options.length >= 2) {
      questions.push({
        id: `chat_q_${idx + 1}`,
        questionNumber: questions.length + 1,
        text: questionText,
        options,
        correctOption,
        explanation
      });
    }
  });

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
  const parsedQuestions = parseMcqsFromText(content);
  const parsedFlashcards = parseFlashcardsFromText(content);

  const [activeTab, setActiveTab] = useState<'quiz' | 'flashcards'>('quiz');
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [showExplanation, setShowExplanation] = useState<Record<string, boolean>>({});
  const [activeCardIdx, setActiveCardIdx] = useState<number>(0);
  const [isCardFlipped, setIsCardFlipped] = useState<boolean>(false);
  const [hasSyncedSubmission, setHasSyncedSubmission] = useState<boolean>(false);

  // If only flashcards exist and no MCQs, default to flashcards tab
  useEffect(() => {
    if (parsedQuestions.length === 0 && parsedFlashcards.length > 0) {
      setActiveTab('flashcards');
    }
  }, [parsedQuestions.length, parsedFlashcards.length]);

  if (parsedQuestions.length === 0 && parsedFlashcards.length === 0) {
    return null;
  }

  const handleSelect = (qId: string, optId: string) => {
    if (selectedAnswers[qId]) return; // locked after choice for authentic testing
    
    const updated = { ...selectedAnswers, [qId]: optId };
    setSelectedAnswers(updated);
    setShowExplanation(prev => ({ ...prev, [qId]: true }));

    // Check if all questions are now answered
    if (Object.keys(updated).length === parsedQuestions.length && !hasSyncedSubmission) {
      handleCompleteQuiz(updated);
    }
  };

  const handleCompleteQuiz = (answers: Record<string, string>) => {
    const total = parsedQuestions.length;
    const correct = parsedQuestions.filter(q => q.correctOption && answers[q.id] === q.correctOption).length;
    const percentage = Math.round((correct / total) * 100);

    const submissionData = {
      id: `in_chat_exam_${Date.now()}`,
      examTitle: `In-Chat Interactive Practice Exam (${total} MCQs)`,
      subject: 'Academic Practice & Quick Quiz',
      totalQuestions: total,
      answeredCount: total,
      correctCount: correct,
      wrongCount: total - correct,
      accuracy: percentage,
      scoreMarks: correct * 4 - (total - correct) * 1, // standard +4 / -1 marking
      completedAt: new Date().toISOString(),
      source: 'In-Chat Live Simulator'
    };

    // 1. Sync to local storage
    try {
      const existingStr = localStorage.getItem('arohi_mock_test_submissions');
      const existing = existingStr ? JSON.parse(existingStr) : [];
      existing.unshift(submissionData);
      localStorage.setItem('arohi_mock_test_submissions', JSON.stringify(existing.slice(0, 50)));
    } catch (e) {}

    // 2. Post to server mock tests sync endpoint
    try {
      fetch('/api/mocktests/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ submission: submissionData })
      }).catch(() => {});
    } catch (e) {}

    // 3. Trigger callback if passed
    if (onSyncScore) {
      onSyncScore(submissionData);
    }

    setHasSyncedSubmission(true);
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setShowExplanation({});
    setHasSyncedSubmission(false);
  };

  const answeredCount = Object.keys(selectedAnswers).length;
  const correctCount = parsedQuestions.filter(q => q.correctOption && selectedAnswers[q.id] === q.correctOption).length;
  const isQuizFinished = parsedQuestions.length > 0 && answeredCount === parsedQuestions.length;
  const scorePercentage = parsedQuestions.length > 0 ? Math.round((correctCount / parsedQuestions.length) * 100) : 0;

  return (
    <div className={`mt-4 p-4 sm:p-5 rounded-3xl border ${
      isDarkMode 
        ? 'bg-[#120a2e]/95 border-purple-500/40 text-slate-100 shadow-2xl backdrop-blur-md' 
        : 'bg-purple-50/95 border-purple-200 text-slate-900 shadow-lg'
    } space-y-4 my-3`}>
      
      {/* Header & Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-purple-500/20 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 border border-purple-400/40 flex items-center justify-center text-white shadow-md">
            <Brain className="w-4 h-4 text-yellow-300" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-black text-white flex items-center gap-2">
              <span>Interactive Exam & Study Center</span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">
                Live In-Chat
              </span>
            </h4>
            <p className="text-[10px] text-slate-400">Click options to test yourself directly, track score, or open full CBT Exam</p>
          </div>
        </div>

        {/* Tab Selector if both Quiz and Flashcards exist */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto bg-black/40 p-1 rounded-xl border border-purple-500/30">
          {parsedQuestions.length > 0 && (
            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                activeTab === 'quiz'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <HelpCircle className="w-3 h-3" />
              <span>Quiz ({parsedQuestions.length})</span>
            </button>
          )}

          {parsedFlashcards.length > 0 && (
            <button
              onClick={() => setActiveTab('flashcards')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                activeTab === 'flashcards'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-3 h-3" />
              <span>Flashcards ({parsedFlashcards.length})</span>
            </button>
          )}
        </div>
      </div>

      {/* 1. QUIZ MODE */}
      {activeTab === 'quiz' && parsedQuestions.length > 0 && (
        <div className="space-y-4">
          
          {/* Progress Bar & Quick Status */}
          <div className="flex items-center justify-between gap-3 text-xs bg-purple-950/40 p-2.5 rounded-2xl border border-purple-500/20">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-slate-300">
                Answered: <strong className="text-white">{answeredCount} / {parsedQuestions.length}</strong>
              </span>
              <div className="w-24 sm:w-36 h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 to-emerald-400 transition-all duration-300"
                  style={{ width: `${(answeredCount / parsedQuestions.length) * 100}%` }}
                />
              </div>
            </div>

            {answeredCount > 0 && (
              <div className="flex items-center gap-2 text-right">
                <span className="text-[10px] text-slate-400 font-medium">Score:</span>
                <span className="font-black text-amber-300">{correctCount} / {answeredCount}</span>
                <span className="text-[10px] font-bold text-emerald-400">({Math.round((correctCount / answeredCount) * 100)}%)</span>
              </div>
            )}
          </div>

          {/* Question Cards Stack */}
          <div className="space-y-3.5">
            {parsedQuestions.map((q) => {
              const userChoice = selectedAnswers[q.id];
              const isAnswered = !!userChoice;
              const isCorrect = isAnswered && q.correctOption && userChoice === q.correctOption;

              return (
                <div 
                  key={q.id}
                  className={`p-3.5 sm:p-4 rounded-2xl border transition-all ${
                    isDarkMode ? 'bg-[#18103c] border-[#2e2060]' : 'bg-white border-purple-100'
                  } space-y-3`}
                >
                  {/* Question Text */}
                  <div className="flex items-start gap-2.5">
                    <span className="w-6 h-6 rounded-lg bg-purple-600/25 text-purple-300 border border-purple-500/40 text-[11px] font-black flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                      Q{q.questionNumber}
                    </span>
                    <p className="text-xs sm:text-sm font-bold text-white leading-snug">
                      {q.text}
                    </p>
                  </div>

                  {/* Options */}
                  <div className="grid grid-cols-1 gap-2 pt-1">
                    {q.options.map((opt) => {
                      const isSelected = userChoice === opt.id;
                      const isThisCorrect = q.correctOption && opt.id === q.correctOption;

                      let optStyles = isDarkMode 
                        ? 'bg-[#100b28] border-[#291c57] text-slate-300 hover:border-purple-400 hover:text-white' 
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-purple-300';

                      if (isAnswered) {
                        if (isThisCorrect) {
                          optStyles = 'bg-emerald-950/70 border-emerald-500 text-emerald-200 font-bold ring-1 ring-emerald-500/50';
                        } else if (isSelected && !isThisCorrect) {
                          optStyles = 'bg-rose-950/70 border-rose-500 text-rose-200 font-bold ring-1 ring-rose-500/50';
                        } else {
                          optStyles = 'opacity-40 border-transparent bg-[#0d0920] text-slate-500';
                        }
                      }

                      return (
                        <button
                          key={opt.id}
                          disabled={isAnswered}
                          onClick={() => handleSelect(q.id, opt.id)}
                          className={`w-full p-2.5 sm:p-3 rounded-xl border text-left text-xs transition-all cursor-pointer flex items-center justify-between gap-2.5 ${optStyles}`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span className={`w-5 h-5 rounded-lg text-[10px] font-black flex items-center justify-center shrink-0 ${
                              isSelected ? 'bg-purple-600 text-white' : 'bg-white/10 text-slate-300'
                            }`}>
                              {opt.id}
                            </span>
                            <span className="leading-snug">{opt.text}</span>
                          </div>

                          {isAnswered && isThisCorrect && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          )}
                          {isAnswered && isSelected && !isThisCorrect && (
                            <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Instant Feedback & Detailed Explanation */}
                  {isAnswered && (q.explanation || q.correctOption) && (
                    <div className="p-3 rounded-xl bg-purple-950/60 border border-purple-500/30 text-xs space-y-1 animate-in fade-in duration-200">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-black uppercase tracking-wider text-purple-300 flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-yellow-300" />
                          <span>Correct Answer: Option {q.correctOption}</span>
                        </span>
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                          isCorrect ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                        }`}>
                          {isCorrect ? '+4 Marks (Correct)' : '-1 Mark (Wrong)'}
                        </span>
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
          </div>

          {/* Exam Completion & Sync Banner */}
          {isQuizFinished && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-900/90 via-indigo-900/90 to-purple-950/90 border border-emerald-500/50 shadow-xl space-y-3 animate-in zoom-in-95 duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-300 shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-extrabold text-sm text-white flex items-center gap-2">
                      <span>Exam Completed!</span>
                      <span className="text-xs text-amber-300 bg-amber-400/20 border border-amber-400/30 px-2 py-0.5 rounded-full font-bold">
                        {scorePercentage >= 80 ? 'Outstanding 🌟' : scorePercentage >= 50 ? 'Good Effort 👍' : 'Needs Practice 📚'}
                      </span>
                    </h5>
                    <p className="text-[11px] text-emerald-300 font-semibold flex items-center gap-1 mt-0.5">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Score Synced & Saved to Your Arohi Profile & Dashboard History</span>
                    </p>
                  </div>
                </div>

                <div className="text-right sm:border-l sm:border-purple-500/30 sm:pl-4">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Final Result</span>
                  <span className="text-base font-black text-amber-300">{correctCount} / {parsedQuestions.length}</span>
                  <span className="text-xs text-slate-300 font-bold ml-1">({scorePercentage}%)</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-purple-500/30">
                {onLaunchFullCbt && (
                  <button
                    onClick={onLaunchFullCbt}
                    className="flex-1 min-w-[200px] px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Play className="w-3.5 h-3.5 fill-slate-950 text-slate-950" />
                    <span>Appear in Full All-India CBT Exam</span>
                  </button>
                )}

                <button
                  onClick={handleResetQuiz}
                  className="px-3.5 py-2.5 rounded-xl bg-purple-900/60 hover:bg-purple-800 text-slate-200 hover:text-white font-bold text-xs border border-purple-500/40 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Quiz</span>
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
            <span className="text-[11px] text-purple-300">Click card or flip button to reveal answer</span>
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
                      {isCardFlipped ? 'BACK / ANSWER' : 'FRONT / QUESTION'}
                    </span>
                  </div>

                  <div className="py-2">
                    <p className="text-sm sm:text-base font-bold leading-relaxed text-white">
                      {isCardFlipped ? card.back : card.front}
                    </p>

                    {isCardFlipped && card.mnemonic && (
                      <div className="mt-3 p-2.5 rounded-xl bg-purple-950/80 border border-purple-500/30 text-xs text-amber-200">
                        <strong>💡 Key Formula / Memory Aid:</strong> {card.mnemonic}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-400 pt-3 border-t border-purple-500/20">
                  <span>{isCardFlipped ? '✓ Answer Revealed' : '❓ Tap anywhere to flip'}</span>
                  <span className="text-purple-300 font-bold flex items-center gap-1">
                    <RotateCcw className="w-3 h-3" /> Flip Card
                  </span>
                </div>
              </div>
            );
          })()}

          {/* Flashcard Navigation Controls */}
          <div className="flex items-center justify-between gap-3 pt-2">
            <button
              disabled={activeCardIdx === 0}
              onClick={() => {
                setActiveCardIdx(prev => Math.max(0, prev - 1));
                setIsCardFlipped(false);
              }}
              className="px-3.5 py-2 rounded-xl bg-purple-900/50 hover:bg-purple-800 disabled:opacity-30 text-white text-xs font-bold border border-purple-500/30 cursor-pointer transition-all"
            >
              ← Previous Card
            </button>

            <button
              onClick={() => setIsCardFlipped(!isCardFlipped)}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-extrabold shadow-md cursor-pointer transition-all flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{isCardFlipped ? 'Show Question' : 'Reveal Answer'}</span>
            </button>

            <button
              disabled={activeCardIdx === parsedFlashcards.length - 1}
              onClick={() => {
                setActiveCardIdx(prev => Math.min(parsedFlashcards.length - 1, prev + 1));
                setIsCardFlipped(false);
              }}
              className="px-3.5 py-2 rounded-xl bg-purple-900/50 hover:bg-purple-800 disabled:opacity-30 text-white text-xs font-bold border border-purple-500/30 cursor-pointer transition-all"
            >
              Next Card →
            </button>
          </div>
        </div>
      )}

      {/* Footer Direct CBT Exam Link */}
      {onLaunchFullCbt && (
        <div className="pt-3 border-t border-purple-500/20 flex flex-col sm:flex-row items-center justify-between gap-2.5">
          <p className="text-[11px] text-slate-300 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
            <span>Ready for full time limits, negative marking & All-India Rank?</span>
          </p>
          <button
            onClick={onLaunchFullCbt}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-black uppercase tracking-wider shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5 shrink-0"
          >
            <Play className="w-3 h-3 fill-white text-white" />
            <span>Open All-India CBT Exam Portal</span>
          </button>
        </div>
      )}

    </div>
  );
}

