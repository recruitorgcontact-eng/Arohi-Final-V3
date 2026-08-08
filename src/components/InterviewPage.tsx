import { useState, useEffect } from 'react';
import { Sparkles, MessageSquare, Video, Mic, Award, ChevronRight, CheckCircle2, ShieldAlert, Play, RotateCcw } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface Question {
  id: number;
  text: string;
}

interface Evaluation {
  score: number;
  confidenceScore: number;
  communicationClarity: number;
  grammarScore: number;
  feedbackText: string;
  suggestedAnswer: string;
}

export default function InterviewPage() {
  const { user, updateDiagnostics } = useAuth();
  const [domain, setDomain] = useState<'developer' | 'banking' | 'civil' | 'msme'>('developer');
  const [activeQuestionIdx, setActiveQuestionIdx] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluation, setEvaluation] = useState<Evaluation | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  const questions: Record<string, Question[]> = {
    developer: [
      { id: 1, text: 'Tell me about yourself and your experience working with React and Node.js.' },
      { id: 2, text: 'Explain the difference between SQL and NoSQL databases. When would you prefer which?' },
      { id: 3, text: 'How do you handle state optimization or slow API response queries in a client-server application?' }
    ],
    banking: [
      { id: 1, text: 'Why do you want to join public sector banking? What value do you bring to IBPS clerks?' },
      { id: 2, text: 'Explain what a Mudra Loan is and its three categorizations.' },
      { id: 3, text: 'How would you handle an angry retail customer who complains about a pending cash transaction?' }
    ],
    civil: [
      { id: 1, text: 'What is your motivation for joining administrative service? Why not private sectors?' },
      { id: 2, text: 'How would you manage local relief operations in rural zones during sudden monsoonal flash floods?' },
      { id: 3, text: 'How do you balance political pressures and standard legal frameworks in administrative duties?' }
    ],
    msme: [
      { id: 1, text: 'Explain your business idea. How does it serve local rural or urban consumer segments?' },
      { id: 2, text: 'How do you plan to leverage central government schemes like PMEGP or Startup India seed funding?' },
      { id: 3, text: 'What is your customer acquisition strategy with a limited initial budget?' }
    ]
  };

  const handleEvaluate = () => {
    if (!userAnswer.trim()) return;
    setIsEvaluating(true);
    setEvaluation(null);

    // Dynamic Mock responses based on the length of answer and selected track
    setTimeout(() => {
      const length = userAnswer.length;
      let score = Math.min(65 + Math.floor(length / 10), 95);
      let confidence = Math.min(70 + Math.floor(length / 12), 94);
      let clarity = Math.min(60 + Math.floor(length / 8), 92);
      
      setEvaluation({
        score,
        confidenceScore: confidence,
        communicationClarity: clarity,
        grammarScore: 88,
        feedbackText: `### Performance Summary
Excellent effort! Your answer displays strong conceptual understanding and addresses the key expectations.

* **Key Strengths:** Clearly articulated structure and appropriate professional terminology.
* **Areas of Improvement:** You could expand on quantitative achievements. For instance, cite specific percentage increments or past performance metrics to sound more persuasive.`,
        suggestedAnswer: `Here is AROHI's recommended phrasing:
"I bring a balanced combination of technical proficiency and structured problem-solving. In my past work, I focused on high-performance frameworks, ensuring database optimizations reduced page latencies by 30% while collaborating effectively with design stakeholders."`
      });
      setIsEvaluating(false);

      // Save to localStorage
      localStorage.setItem('recruit_interview_score', score.toString());

      // Save to Firestore if logged in
      if (user) {
        updateDiagnostics({ interviewScore: score }).catch(err => console.error("Error updating interview diagnostics:", err));
      }
    }, 2000);
  };

  const nextQuestion = () => {
    if (activeQuestionIdx < questions[domain].length - 1) {
      setActiveQuestionIdx(activeQuestionIdx + 1);
      setUserAnswer('');
      setEvaluation(null);
    }
  };

  const previousQuestion = () => {
    if (activeQuestionIdx > 0) {
      setActiveQuestionIdx(activeQuestionIdx - 1);
      setUserAnswer('');
      setEvaluation(null);
    }
  };

  const handleSpeech = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setTimeout(() => {
        setIsRecording(false);
        const userName = user?.displayName || localStorage.getItem('recruit_user_name') || 'a candidate';
        setUserAnswer(`I am ${userName}. I have been preparing for professional career opportunities and building technical skills. I prioritize clean, structured execution and continuous learning.`);
      }, 3500);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-gradient-to-br from-[#0a0718] via-[#0d0922] to-[#06040e] border border-slate-800/80 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative overflow-hidden text-left">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute left-1/3 -top-10 w-48 h-48 bg-purple-500/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#091515] border border-teal-500/30 text-teal-300 px-3.5 py-1 rounded-full text-[11px] font-bold tracking-wide shadow-sm mb-3">
            <span className="w-2 h-2 rounded-full bg-[#00e676] animate-pulse"></span>
            AROHI Preparation Portal
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
            Interview AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500">Preparation Simulator</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl font-medium leading-relaxed mt-2">
            Practice answering realistic technical, banking, administrative, and startup pitch questions. Receive immediate metrics on grammar, vocabulary, confidence, and recommended optimal answers.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Options Card */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-[#0c091f]/80 backdrop-blur-xl p-5 md:p-6 rounded-2xl border border-slate-800/80 shadow-xl text-slate-100">
            <h3 className="text-xs font-black uppercase tracking-wider text-purple-300 mb-4 border-b border-slate-800/80 pb-2.5 flex items-center gap-2">
              <Video className="w-4.5 h-4.5 text-purple-400" /> Choose Interview Track
            </h3>

            <div className="space-y-2.5">
              {[
                { id: 'developer', label: 'Technical Web Developer', desc: 'React, Node, databases & deployment' },
                { id: 'banking', label: 'IBPS Banking & Clerk', desc: 'Finance rules, operations & customer handling' },
                { id: 'civil', label: 'Civil Administrative Services', desc: 'UPSC/PCS situations and ethics' },
                { id: 'msme', label: 'MSME Startup Founder Pitch', desc: 'Idea validation, capital & MSME loans' }
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setDomain(t.id as any);
                    setActiveQuestionIdx(0);
                    setUserAnswer('');
                    setEvaluation(null);
                  }}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer block shadow-sm ${
                    domain === t.id
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-purple-400/50 font-bold shadow-[0_4px_15px_rgba(124,58,237,0.3)]'
                      : 'bg-[#080614]/80 hover:bg-slate-800/80 border-slate-800 text-slate-300'
                  }`}
                >
                  <span className="block text-xs font-bold text-white">{t.label}</span>
                  <span className={`block text-[10px] font-medium mt-0.5 ${domain === t.id ? 'text-purple-100' : 'text-slate-400'}`}>{t.desc}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Q&A Simulator Panel */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-[#0c091f]/80 backdrop-blur-xl rounded-2xl border border-slate-800/80 shadow-xl p-6 space-y-6 text-slate-100">
            
            <div className="flex justify-between items-center text-[10px] font-black uppercase text-purple-300">
              <span>Domain Active: <strong className="text-white">{domain.toUpperCase()}</strong></span>
              <span>Question {activeQuestionIdx + 1} of {questions[domain].length}</span>
            </div>

            <div className="bg-[#080614] border border-slate-800 p-4.5 rounded-xl flex gap-3.5 items-start">
              <div className="bg-purple-950 text-[#00e676] p-2 rounded-lg shrink-0 border border-purple-500/30">
                <MessageSquare className="w-5 h-5 animate-pulse" />
              </div>
              <div className="space-y-1 text-left">
                <span className="block text-[9px] font-black uppercase tracking-wider text-purple-300">AROHI asks:</span>
                <p className="text-xs md:text-sm font-extrabold text-white leading-snug">
                  {questions[domain][activeQuestionIdx].text}
                </p>
              </div>
            </div>

            {/* Answer Box */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">Your Phrasing Answer</label>
                <button
                  onClick={handleSpeech}
                  className={`text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full flex items-center gap-1 shadow-sm transition-all cursor-pointer border ${
                    isRecording 
                      ? 'bg-rose-600 text-white border-rose-500 animate-pulse'
                      : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200'
                  }`}
                >
                  <Mic className="w-3.5 h-3.5" />
                  {isRecording ? 'Listening...' : 'Simulate Voice'}
                </button>
              </div>

              <textarea
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Type your professional response clearly. Expand details to achieve a higher score..."
                rows={6}
                className="w-full bg-[#080614]/90 border border-slate-700/80 rounded-xl p-3.5 text-xs md:text-sm font-medium text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
              />
            </div>

            {/* Controls */}
            <div className="flex justify-between items-center gap-3">
              <div className="flex gap-2">
                <button
                  onClick={previousQuestion}
                  disabled={activeQuestionIdx === 0}
                  className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 border border-slate-700 text-slate-200 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  Prev Q
                </button>
                <button
                  onClick={nextQuestion}
                  disabled={activeQuestionIdx === questions[domain].length - 1}
                  className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 border border-slate-700 text-slate-200 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  Next Q
                </button>
              </div>

              <button
                onClick={handleEvaluate}
                disabled={isEvaluating || !userAnswer.trim()}
                className="bg-gradient-to-r from-purple-600 via-indigo-600 to-indigo-700 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-40 text-white font-black text-xs uppercase tracking-wider px-6 py-3 rounded-xl shadow-[0_4px_25px_rgba(124,58,237,0.35)] cursor-pointer transition-all active:scale-95"
              >
                {isEvaluating ? 'AROHI Analysis running...' : 'Submit Phrasing & Evaluate'}
              </button>
            </div>

          </div>

          {evaluation && (
            <div className="bg-[#0c091f]/80 backdrop-blur-xl rounded-2xl border border-slate-800/80 shadow-xl p-6 space-y-6 text-slate-100">
              
              <h4 className="text-xs font-black uppercase tracking-wider text-purple-300 flex items-center gap-2">
                <Award className="w-4.5 h-4.5 text-purple-400" /> AROHI Performance Evaluation
              </h4>

              {/* Grid of scores */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                {[
                  { label: 'Overall Score', score: evaluation.score, suffix: '/100' },
                  { label: 'Confidence index', score: evaluation.confidenceScore, suffix: '%' },
                  { label: 'Clarity rating', score: evaluation.communicationClarity, suffix: '%' },
                  { label: 'Grammar score', score: evaluation.grammarScore, suffix: '%' }
                ].map((item, idx) => (
                  <div key={idx} className="bg-[#080614] border border-slate-800 p-3.5 rounded-xl text-center">
                    <span className="block text-[9px] text-slate-400 uppercase font-black tracking-wider leading-none">{item.label}</span>
                    <span className="block text-xl font-black text-white mt-1.5">{item.score}{item.suffix}</span>
                  </div>
                ))}
              </div>

              <div className="text-slate-300 text-xs font-medium whitespace-pre-line leading-relaxed border-t border-slate-800/80 pt-4">
                {evaluation.feedbackText}
              </div>

              <div className="bg-emerald-950/40 text-emerald-300 p-4 rounded-xl border border-emerald-500/30 text-xs font-semibold leading-relaxed">
                <span className="block font-black text-[10px] uppercase tracking-wider text-[#00e676] mb-1">Recommended Re-phrasing:</span>
                {evaluation.suggestedAnswer}
              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}
