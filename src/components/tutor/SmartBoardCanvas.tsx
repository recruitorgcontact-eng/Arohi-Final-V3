import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  PenTool, 
  Eraser, 
  Maximize2, 
  RotateCcw, 
  Download, 
  Eye, 
  CheckCircle2, 
  HelpCircle, 
  BookOpen, 
  Layers, 
  Volume2, 
  VolumeX, 
  Lightbulb, 
  FileQuestion,
  GraduationCap
} from 'lucide-react';

export interface SmartBoardSlide {
  id: string;
  title: string;
  topic: string;
  latexFormula?: string;
  bullets: string[];
  keyInsight: string;
  diagramType?: 'circuit' | 'cell' | 'flowchart' | 'cartesian' | 'dna';
  practiceQuestion?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

interface SmartBoardCanvasProps {
  activeSlide: SmartBoardSlide;
  tutorName: string;
  tutorTitle: string;
  subject: string;
  isSpeaking: boolean;
  onSelectOption?: (index: number) => void;
  onAskTutorDoubt?: (doubtText: string) => void;
}

export default function SmartBoardCanvas({
  activeSlide,
  tutorName,
  tutorTitle,
  subject,
  isSpeaking,
  onSelectOption,
  onAskTutorDoubt
}: SmartBoardCanvasProps) {
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [doubtInput, setDoubtInput] = useState('');
  const [boardColorMode, setBoardColorMode] = useState<'chalkboard' | 'whiteboard' | 'graph'>('chalkboard');

  // Interactive freehand pen drawing on Smart Board
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [penColor, setPenColor] = useState('#22d3ee'); // cyan
  const [penSize, setPenSize] = useState(3);
  const [toolMode, setToolMode] = useState<'pen' | 'highlighter' | 'eraser'>('pen');

  // Reset quiz on slide change
  useEffect(() => {
    setSelectedQuizAnswer(null);
    setQuizSubmitted(false);
  }, [activeSlide.id]);

  // Canvas drawing handlers
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    if (toolMode === 'eraser') {
      ctx.clearRect(x - 12, y - 12, 24, 24);
    } else {
      ctx.strokeStyle = penColor;
      ctx.lineWidth = toolMode === 'highlighter' ? penSize * 4 : penSize;
      ctx.globalAlpha = toolMode === 'highlighter' ? 0.35 : 1.0;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearDrawingLayer = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const handleQuizAnswer = (idx: number) => {
    setSelectedQuizAnswer(idx);
    setQuizSubmitted(true);
    if (onSelectOption) onSelectOption(idx);
  };

  const handleSendDoubt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!doubtInput.trim()) return;
    if (onAskTutorDoubt) onAskTutorDoubt(doubtInput.trim());
    setDoubtInput('');
  };

  // Render SVG educational diagrams
  const renderDiagram = () => {
    switch (activeSlide.diagramType) {
      case 'circuit':
        return (
          <div className="relative w-full h-44 bg-slate-950/60 rounded-xl border border-cyan-500/20 flex items-center justify-center p-3 overflow-hidden">
            <svg viewBox="0 0 400 160" className="w-full h-full max-h-40">
              <rect x="10" y="10" width="380" height="140" fill="none" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" rx="8" />
              {/* Battery */}
              <line x1="40" y1="80" x2="100" y2="80" stroke="#38bdf8" strokeWidth="3" />
              <line x1="100" y1="50" x2="100" y2="110" stroke="#f43f5e" strokeWidth="4" />
              <line x1="110" y1="65" x2="110" y2="95" stroke="#38bdf8" strokeWidth="2.5" />
              <text x="95" y="40" fill="#f43f5e" fontSize="12" fontWeight="bold">V (EMF)</text>
              <line x1="110" y1="80" x2="170" y2="80" stroke="#38bdf8" strokeWidth="3" />
              
              {/* Resistor R1 */}
              <path d="M 170 80 L 180 65 L 190 95 L 200 65 L 210 95 L 220 80" fill="none" stroke="#a855f7" strokeWidth="3" />
              <text x="185" y="55" fill="#c084fc" fontSize="12" fontWeight="bold">R (Ω)</text>
              
              {/* Load / Bulb */}
              <line x1="220" y1="80" x2="280" y2="80" stroke="#38bdf8" strokeWidth="3" />
              <circle cx="300" cy="80" r="16" fill="rgba(251, 191, 36, 0.15)" stroke="#fbbf24" strokeWidth="3" />
              <path d="M 290 70 L 310 90 M 290 90 L 310 70" stroke="#fbbf24" strokeWidth="2" />
              <text x="290" y="115" fill="#fde047" fontSize="11" fontWeight="bold">Load</text>
              
              {/* Ground & Current Arrow */}
              <line x1="316" y1="80" x2="360" y2="80" stroke="#38bdf8" strokeWidth="3" />
              <line x1="360" y1="80" x2="360" y2="135" stroke="#38bdf8" strokeWidth="3" />
              <line x1="360" y1="135" x2="40" y2="135" stroke="#38bdf8" strokeWidth="3" />
              <line x1="40" y1="135" x2="40" y2="80" stroke="#38bdf8" strokeWidth="3" />
              
              {/* Current Vector */}
              <polygon points="250,75 265,80 250,85" fill="#22c55e" />
              <text x="240" y="70" fill="#4ade80" fontSize="11" fontWeight="bold">I →</text>
            </svg>
            <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/30 text-[10px] text-cyan-300 font-mono">
              Ohm&apos;s Law Circuit: V = I · R
            </div>
          </div>
        );
      case 'cell':
        return (
          <div className="relative w-full h-44 bg-slate-950/60 rounded-xl border border-emerald-500/20 flex items-center justify-center p-3 overflow-hidden">
            <svg viewBox="0 0 400 160" className="w-full h-full max-h-40">
              {/* Cell Membrane */}
              <ellipse cx="200" cy="80" rx="170" ry="65" fill="#042f2e" stroke="#10b981" strokeWidth="3" />
              {/* Nucleus */}
              <circle cx="150" cy="80" r="32" fill="#0f172a" stroke="#6366f1" strokeWidth="2.5" />
              <circle cx="150" cy="80" r="14" fill="#4f46e5" opacity="0.6" />
              <text x="125" y="85" fill="#c7d2fe" fontSize="10" fontWeight="bold">Nucleolus</text>
              {/* Mitochondria */}
              <ellipse cx="265" cy="60" rx="22" ry="12" fill="#78350f" stroke="#f59e0b" strokeWidth="2" transform="rotate(-15 265 60)" />
              <text x="290" y="65" fill="#fde68a" fontSize="10">Mitochondria</text>
              {/* Ribosomes */}
              <circle cx="210" cy="110" r="3" fill="#ec4899" />
              <circle cx="225" cy="115" r="3" fill="#ec4899" />
              <circle cx="240" cy="108" r="3" fill="#ec4899" />
              <text x="248" y="116" fill="#f472b6" fontSize="10">Ribosomes</text>
            </svg>
            <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/30 text-[10px] text-emerald-300 font-mono">
              Eukaryotic Cell Architecture
            </div>
          </div>
        );
      case 'dna':
        return (
          <div className="relative w-full h-44 bg-slate-950/60 rounded-xl border border-violet-500/20 flex items-center justify-center p-3 overflow-hidden">
            <svg viewBox="0 0 400 160" className="w-full h-full max-h-40">
              <path d="M 20 40 Q 60 120 100 40 T 180 40 T 260 40 T 340 40 T 380 40" fill="none" stroke="#818cf8" strokeWidth="3" />
              <path d="M 20 120 Q 60 40 100 120 T 180 120 T 260 120 T 340 120 T 380 120" fill="none" stroke="#ec4899" strokeWidth="3" />
              {/* Base pairs */}
              <line x1="60" y1="80" x2="60" y2="80" stroke="#facc15" strokeWidth="4" />
              <line x1="100" y1="40" x2="100" y2="120" stroke="#34d399" strokeWidth="2.5" strokeDasharray="3 3" />
              <line x1="140" y1="80" x2="140" y2="80" stroke="#facc15" strokeWidth="4" />
              <line x1="180" y1="40" x2="180" y2="120" stroke="#38bdf8" strokeWidth="2.5" strokeDasharray="3 3" />
              <line x1="220" y1="80" x2="220" y2="80" stroke="#facc15" strokeWidth="4" />
              <line x1="260" y1="40" x2="260" y2="120" stroke="#34d399" strokeWidth="2.5" strokeDasharray="3 3" />
              <line x1="300" y1="80" x2="300" y2="80" stroke="#facc15" strokeWidth="4" />
              <line x1="340" y1="40" x2="340" y2="120" stroke="#38bdf8" strokeWidth="2.5" strokeDasharray="3 3" />
              <text x="30" y="25" fill="#a5b4fc" fontSize="11" fontWeight="bold">5&apos; → 3&apos; Strand</text>
              <text x="30" y="145" fill="#f472b6" fontSize="11" fontWeight="bold">3&apos; → 5&apos; Complementary</text>
            </svg>
            <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-violet-950/80 border border-violet-500/30 text-[10px] text-violet-300 font-mono">
              Double Helix DNA Model (Watson &amp; Crick)
            </div>
          </div>
        );
      case 'cartesian':
        return (
          <div className="relative w-full h-44 bg-slate-950/60 rounded-xl border border-blue-500/20 flex items-center justify-center p-3 overflow-hidden">
            <svg viewBox="0 0 400 160" className="w-full h-full max-h-40">
              {/* Axes */}
              <line x1="20" y1="130" x2="380" y2="130" stroke="#64748b" strokeWidth="2" />
              <line x1="60" y1="150" x2="60" y2="20" stroke="#64748b" strokeWidth="2" />
              <text x="370" y="145" fill="#94a3b8" fontSize="11" fontWeight="bold">x</text>
              <text x="45" y="25" fill="#94a3b8" fontSize="11" fontWeight="bold">y = f(x)</text>
              {/* Curve y = x^2 / 4 */}
              <path d="M 60 130 Q 180 120 220 80 T 360 25" fill="none" stroke="#38bdf8" strokeWidth="3" />
              {/* Tangent line */}
              <line x1="160" y1="110" x2="280" y2="50" stroke="#f43f5e" strokeWidth="2" strokeDasharray="4 2" />
              <circle cx="220" cy="80" r="4" fill="#fbbf24" />
              <text x="228" y="78" fill="#fde047" fontSize="10" fontWeight="bold">Slope = dy/dx</text>
            </svg>
            <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-blue-950/80 border border-blue-500/30 text-[10px] text-blue-300 font-mono">
              Calculus: Differential Calculus &amp; Tangents
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#070512] border border-slate-800/90 rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden text-left relative">
      
      {/* 1. SMART BOARD TOP BAR & CONTROLS */}
      <div className="bg-[#0b081e] border-b border-slate-800 px-4 py-3 flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center shadow-md">
            <GraduationCap className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-400 font-mono">
                AROHI SMART BOARD 4K
              </span>
              {isSpeaking && (
                <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-fuchsia-950/80 border border-fuchsia-500/40 text-fuchsia-300 animate-pulse">
                  <Volume2 className="w-3 h-3 text-fuchsia-400" />
                  Live Teaching
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-400 font-medium">
              {tutorName} · {subject}
            </p>
          </div>
        </div>

        {/* Board Tools: Chalkboard theme & drawing controls */}
        <div className="flex items-center gap-1.5 bg-[#05030e] p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setBoardColorMode('chalkboard')}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
              boardColorMode === 'chalkboard'
                ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Chalkboard
          </button>
          <button
            onClick={() => setBoardColorMode('whiteboard')}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
              boardColorMode === 'whiteboard'
                ? 'bg-slate-800 text-white border border-slate-600'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Whiteboard
          </button>
          <button
            onClick={() => setBoardColorMode('graph')}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
              boardColorMode === 'graph'
                ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Graph Grid
          </button>

          <div className="h-4 w-px bg-slate-800 mx-1" />

          {/* Interactive Annotation Tools */}
          <button
            onClick={() => { setToolMode('pen'); setPenColor('#22d3ee'); }}
            className={`p-1.5 rounded-lg text-xs transition-all cursor-pointer ${
              toolMode === 'pen' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50' : 'text-slate-400 hover:text-white'
            }`}
            title="Cyan Chalk Pen"
          >
            <PenTool className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => { setToolMode('pen'); setPenColor('#facc15'); }}
            className="w-4 h-4 rounded-full bg-yellow-400 hover:scale-110 transition-transform cursor-pointer border border-white/20"
            title="Yellow Chalk"
          />
          <button
            onClick={() => { setToolMode('pen'); setPenColor('#f43f5e'); }}
            className="w-4 h-4 rounded-full bg-rose-500 hover:scale-110 transition-transform cursor-pointer border border-white/20"
            title="Pink/Red Chalk"
          />
          <button
            onClick={() => setToolMode('highlighter')}
            className={`p-1.5 rounded-lg text-xs transition-all cursor-pointer ${
              toolMode === 'highlighter' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50' : 'text-slate-400 hover:text-white'
            }`}
            title="Highlighter"
          >
            <Sparkles className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setToolMode('eraser')}
            className={`p-1.5 rounded-lg text-xs transition-all cursor-pointer ${
              toolMode === 'eraser' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/50' : 'text-slate-400 hover:text-white'
            }`}
            title="Chalk Eraser"
          >
            <Eraser className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={clearDrawingLayer}
            className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg text-xs cursor-pointer transition-colors"
            title="Wipe Smart Board"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 2. MAIN SMART BOARD SURFACE */}
      <div 
        className={`relative flex-1 p-5 md:p-7 overflow-y-auto custom-scrollbar transition-colors duration-500 ${
          boardColorMode === 'chalkboard'
            ? 'bg-[#061510] text-emerald-50'
            : boardColorMode === 'whiteboard'
            ? 'bg-[#0d1117] text-slate-100'
            : 'bg-[#060d1a] text-cyan-50'
        }`}
        style={{
          backgroundImage: boardColorMode === 'graph' 
            ? 'radial-gradient(rgba(56, 189, 248, 0.15) 1px, transparent 1px)' 
            : boardColorMode === 'chalkboard'
            ? 'radial-gradient(rgba(16, 185, 129, 0.08) 1px, transparent 1px)'
            : 'none',
          backgroundSize: '24px 24px'
        }}
      >
        {/* Transparent Interactive Drawing Overlay Canvas */}
        <canvas
          ref={canvasRef}
          width={900}
          height={600}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="absolute inset-0 w-full h-full pointer-events-auto z-10 cursor-crosshair"
        />

        {/* Content Layer (Under the drawing canvas) */}
        <div className="relative z-0 space-y-6 max-w-4xl mx-auto">
          
          {/* Lesson Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-950/90 border border-emerald-500/40 text-emerald-300 font-mono">
                {activeSlide.topic}
              </span>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-white mt-1.5 tracking-tight font-serif">
                {activeSlide.title}
              </h1>
            </div>
            <div className="text-[11px] text-slate-400 font-mono bg-black/30 px-3 py-1.5 rounded-lg border border-white/5 w-fit">
              Class Mode: Interactive Socratic
            </div>
          </div>

          {/* Mathematical / Scientific Core Equation Highlight */}
          {activeSlide.latexFormula && (
            <div className="p-4 rounded-2xl bg-black/40 border border-cyan-500/30 backdrop-blur-md shadow-inner flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[9px] font-black uppercase text-cyan-400 font-mono tracking-widest block">
                  KEY GOVERNING FORMULA / THEOREM
                </span>
                <div className="text-lg sm:text-2xl font-mono font-bold text-amber-300 tracking-wider">
                  {activeSlide.latexFormula}
                </div>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-cyan-950/60 border border-cyan-400/30 text-[10px] text-cyan-300 font-medium text-center">
                Step-by-step verified
              </div>
            </div>
          )}

          {/* SVG Diagram / Visual Model */}
          {activeSlide.diagramType && renderDiagram()}

          {/* Conceptual Breakdown Points */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 font-mono flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
              Core Classroom Takeaways
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {activeSlide.bullets.map((bullet, idx) => (
                <div 
                  key={idx}
                  className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-emerald-500/40 transition-colors flex items-start gap-2.5 text-xs font-medium leading-relaxed text-slate-200"
                >
                  <span className="w-5 h-5 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{bullet}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Golden Faculty Insight Callout */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/40 via-yellow-950/20 to-amber-950/40 border border-amber-500/40 flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-amber-300">
                {tutorName}&apos;s Golden Exam Tip:
              </h4>
              <p className="text-xs text-amber-100/90 leading-relaxed font-medium mt-0.5">
                {activeSlide.keyInsight}
              </p>
            </div>
          </div>

          {/* Instant Smart Board Check-for-Understanding Quiz */}
          {activeSlide.practiceQuestion && (
            <div className="p-5 rounded-2xl bg-black/50 border border-purple-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase text-purple-400 font-mono tracking-widest flex items-center gap-1.5">
                  <FileQuestion className="w-3.5 h-3.5 text-purple-400" />
                  SMART BOARD CHECK-FOR-UNDERSTANDING
                </span>
                <span className="text-[10px] text-slate-400 font-medium">1 Question Diagnostic</span>
              </div>
              <p className="text-sm font-bold text-white">
                {activeSlide.practiceQuestion.question}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {activeSlide.practiceQuestion.options.map((opt, i) => {
                  const isSelected = selectedQuizAnswer === i;
                  const isCorrect = i === activeSlide.practiceQuestion?.correctIndex;
                  let btnStyle = "bg-white/[0.04] border-white/10 text-slate-300 hover:bg-white/[0.08]";
                  if (quizSubmitted) {
                    if (isCorrect) {
                      btnStyle = "bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold";
                    } else if (isSelected && !isCorrect) {
                      btnStyle = "bg-rose-950/80 border-rose-500 text-rose-200";
                    }
                  } else if (isSelected) {
                    btnStyle = "bg-purple-950/80 border-purple-500 text-purple-200";
                  }

                  return (
                    <button
                      key={i}
                      onClick={() => handleQuizAnswer(i)}
                      disabled={quizSubmitted}
                      className={`p-3 rounded-xl border text-xs font-medium text-left transition-all cursor-pointer flex items-center justify-between ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      {quizSubmitted && isCorrect && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {quizSubmitted && (
                <div className="pt-2 text-xs leading-relaxed text-slate-300 bg-purple-950/30 p-3 rounded-xl border border-purple-500/20">
                  <span className="font-bold text-purple-300">Explanation: </span>
                  {activeSlide.practiceQuestion.explanation}
                </div>
              )}
            </div>
          )}

        </div>
      </div>

      {/* 3. BOTTOM DOUBT BAR */}
      <div className="bg-[#0b081e] border-t border-slate-800 p-3 flex items-center gap-2 shrink-0">
        <HelpCircle className="w-4 h-4 text-cyan-400 shrink-0 hidden sm:block" />
        <form onSubmit={handleSendDoubt} className="flex-1 flex items-center gap-2">
          <input
            type="text"
            value={doubtInput}
            onChange={(e) => setDoubtInput(e.target.value)}
            placeholder={`Have a doubt on this step? Ask ${tutorName} or interrupt via voice anytime...`}
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white text-xs font-bold rounded-xl transition-all cursor-pointer shadow-md shrink-0"
          >
            Ask Board Doubt
          </button>
        </form>
      </div>

    </div>
  );
}
