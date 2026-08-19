import React, { useState } from 'react';
import { 
  CheckCircle2, XCircle, Award, Sparkles, ArrowRight, 
  HelpCircle, RefreshCw, Check, Brain, Play
} from 'lucide-react';

interface ParsedQuizQuestion {
  id: string;
  questionNumber: number;
  text: string;
  options: { id: string; text: string }[];
  correctOption?: string;
  explanation?: string;
}

interface InChatMessageQuizProps {
  content: string;
  isDarkMode?: boolean;
  onLaunchFullCbt?: () => void;
}

export function parseMcqsFromText(text: string): ParsedQuizQuestion[] {
  if (!text) return [];

  const questions: ParsedQuizQuestion[] = [];
  
  // Look for Question patterns like:
  // Q1. / Question 1: / 1. What is...
  // A) ... B) ... C) ... D) ...
  // Correct Answer: A / Answer: A
  
  const questionBlocks = text.split(/(?:(?:\r?\n){1,2}(?=(?:Q(?:uestion)?\s*\d+[\.\:\)]|\d+\.\s+[A-Z]))|(?:\r?\n\s*---\s*\r?\n))/i);

  questionBlocks.forEach((block, idx) => {
    const lines = block.trim().split('\n').map(l => l.trim()).filter(Boolean);
    if (lines.length < 3) return;

    let questionText = '';
    const options: { id: string; text: string }[] = [];
    let correctOption: string | undefined = undefined;
    let explanation = '';

    lines.forEach((line) => {
      // Check for Option pattern: A) / A. / (A) / [A]
      const optMatch = line.match(/^[\*\-]?\s*\(?([A-D])\)?[Rank\.\:\-]\s*(.+)$/i) || line.match(/^[\*\-]?\s*([A-D])[\.\:\)]\s+(.+)$/i);
      // Check for Correct Answer line
      const ansMatch = line.match(/(?:Correct\s*(?:Answer|Option)|Answer|Ans)\s*[\:\-]?\s*\(?([A-D])\)?/i);
      // Check for Explanation line
      const expMatch = line.match(/(?:Explanation|Solution|Reason)\s*[\:\-]?\s*(.+)$/i);

      if (optMatch && !line.toLowerCase().startsWith('answer')) {
        options.push({
          id: optMatch[1].toUpperCase(),
          text: optMatch[2].trim()
        });
      } else if (ansMatch) {
        correctOption = ansMatch[1].toUpperCase();
      } else if (expMatch) {
        explanation = expMatch[1].trim();
      } else if (options.length === 0 && !questionText) {
        questionText = line.replace(/^(?:Q(?:uestion)?\s*\d+[\.\:\)]|\d+\.)\s*/i, '');
      } else if (options.length === 0) {
        questionText += ' ' + line;
      }
    });

    if (questionText && options.length >= 2) {
      questions.push({
        id: `chat_q_${idx + 1}`,
        questionNumber: idx + 1,
        text: questionText,
        options,
        correctOption,
        explanation
      });
    }
  });

  return questions;
}

export default function InChatMessageQuiz({
  content,
  isDarkMode = true,
  onLaunchFullCbt
}: InChatMessageQuizProps) {
  const parsedQuestions = parseMcqsFromText(content);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [showExplanation, setShowExplanation] = useState<Record<string, boolean>>({});

  if (parsedQuestions.length === 0) {
    return null;
  }

  const handleSelect = (qId: string, optId: string) => {
    if (selectedAnswers[qId]) return; // locked after choice for realistic learning
    setSelectedAnswers(prev => ({ ...prev, [qId]: optId }));
    setShowExplanation(prev => ({ ...prev, [qId]: true }));
  };

  const answeredCount = Object.keys(selectedAnswers).length;
  const correctCount = parsedQuestions.filter(q => q.correctOption && selectedAnswers[q.id] === q.correctOption).length;

  return (
    <div className={`mt-4 p-4 sm:p-5 rounded-3xl border ${
      isDarkMode 
        ? 'bg-[#120a2e]/90 border-purple-500/40 text-slate-100 shadow-2xl' 
        : 'bg-purple-50/90 border-purple-200 text-slate-900 shadow-lg'
    } space-y-5 my-3`}>
      
      {/* Interactive Header */}
      <div className="flex items-center justify-between gap-3 border-b border-purple-500/20 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-purple-600/30 border border-purple-500/40 flex items-center justify-center text-purple-300">
            <Brain className="w-4 h-4 text-yellow-300" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-black text-white flex items-center gap-1.5">
              <span>Interactive In-Chat Practice Quiz</span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">
                {parsedQuestions.length} Questions
              </span>
            </h4>
            <p className="text-[10px] text-slate-400">Click any option to test your knowledge with real-time feedback</p>
          </div>
        </div>

        {answeredCount > 0 && (
          <div className="text-right">
            <span className="text-[10px] text-slate-400 block font-bold">Score</span>
            <span className="text-xs sm:text-sm font-black text-amber-300">{correctCount} / {answeredCount}</span>
          </div>
        )}
      </div>

      {/* Questions Stack */}
      <div className="space-y-4">
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
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-md bg-purple-600/20 text-purple-300 border border-purple-500/30 text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">
                  {q.questionNumber}
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
                      optStyles = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-bold';
                    } else if (isSelected && !isThisCorrect) {
                      optStyles = 'bg-rose-950/60 border-rose-500 text-rose-200 font-bold';
                    } else {
                      optStyles = 'opacity-50 border-transparent bg-[#0d0920] text-slate-400';
                    }
                  }

                  return (
                    <button
                      key={opt.id}
                      disabled={isAnswered}
                      onClick={() => handleSelect(q.id, opt.id)}
                      className={`w-full p-2.5 sm:p-3 rounded-xl border text-left text-xs transition-all cursor-pointer flex items-center justify-between gap-2 ${optStyles}`}
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

              {/* Instant Explanation */}
              {isAnswered && (q.explanation || q.correctOption) && (
                <div className="p-3 rounded-xl bg-purple-950/50 border border-purple-500/30 text-xs space-y-1 animate-in fade-in">
                  <span className="text-[10px] font-black uppercase tracking-wider text-purple-300 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-yellow-300" />
                    <span>Correct Answer: Option {q.correctOption}</span>
                  </span>
                  {q.explanation && (
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      {q.explanation}
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer & Full CBT Launcher CTA */}
      {onLaunchFullCbt && (
        <div className="pt-2 border-t border-purple-500/20 flex items-center justify-between gap-3">
          <p className="text-[10px] text-slate-400">Want full examination timing, negative marking and All-India Rank?</p>
          <button
            onClick={onLaunchFullCbt}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-[11px] font-black uppercase tracking-wider shadow-md transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
          >
            <Play className="w-3 h-3 fill-white text-white" />
            <span>Open in CBT Exam Center</span>
          </button>
        </div>
      )}

    </div>
  );
}
