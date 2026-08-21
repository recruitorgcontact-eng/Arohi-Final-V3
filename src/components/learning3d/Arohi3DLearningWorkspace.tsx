import React, { useState, useEffect, useRef } from 'react';
import { 
  Learning3DModel, 
  ModelPart, 
  TeachingMode, 
  ViewMode, 
  SubjectType, 
  ChatMessage3D, 
  DifficultyLevel 
} from '../../types/learning3d';
import { LEARNING_3D_MODELS, search3DModels } from './modelsRegistry';
import { ThreeCanvas3D } from './ThreeCanvas3D';
import { 
  Box, 
  ArrowLeft, 
  Search, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  Sparkles, 
  HelpCircle, 
  BookOpen, 
  Award, 
  RefreshCw, 
  Send, 
  Mic, 
  MicOff, 
  Layers, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft,
  GraduationCap,
  Eye,
  RotateCcw,
  Maximize2,
  MoreVertical,
  Activity,
  X,
  Compass,
  Move,
  ZoomIn,
  Ruler,
  Crosshair,
  Bot
} from 'lucide-react';

interface Arohi3DLearningWorkspaceProps {
  onExit: () => void;
  initialTopicId?: string;
  isDarkMode?: boolean;
}

export const Arohi3DLearningWorkspace: React.FC<Arohi3DLearningWorkspaceProps> = ({
  onExit,
  initialTopicId = 'human_heart',
  isDarkMode = true
}) => {
  // Active Model State
  const [activeModel, setActiveModel] = useState<Learning3DModel>(() => {
    return LEARNING_3D_MODELS.find(m => m.id === initialTopicId) || LEARNING_3D_MODELS[0];
  });

  const [selectedPartId, setSelectedPartId] = useState<string | null>('left_ventricle');
  const [activeViewPreset, setActiveViewPreset] = useState<'normal' | 'xray' | 'exploded' | 'blood_flow'>('normal');
  const [isPlayingSimulation, setIsPlayingSimulation] = useState<boolean>(false);
  const [isAutoSpeakEnabled, setIsAutoSpeakEnabled] = useState<boolean>(true);
  const [isListeningVoice, setIsListeningVoice] = useState<boolean>(false);

  // Active Tool Mode
  const [activeTool, setActiveTool] = useState<'rotate' | 'zoom' | 'pan' | 'reset' | 'measure'>('rotate');

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [subjectFilter, setSubjectFilter] = useState<SubjectType | 'all'>('all');
  const [isModelMenuOpen, setIsModelMenuOpen] = useState<boolean>(false);

  // Chat Messages for Assistant / Ask Arohi
  const [chatMessages, setChatMessages] = useState<ChatMessage3D[]>([]);
  const [inputQuery, setInputQuery] = useState<string>('');
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);

  // Quiz State
  const [quizScore, setQuizScore] = useState<number>(0);
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);

  // Active Selected Part Object
  const selectedPart: ModelPart | undefined = activeModel.parts.find(p => p.id === selectedPartId) || activeModel.parts[0];

  // Speech Synthesis Ref
  const activeUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Text To Speech helper
  const speakText = (text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    try {
      if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
        window.speechSynthesis.cancel();
      }
      window.speechSynthesis.resume();

      const cleanText = text.replace(/[*#`_~$\\]/g, '').trim();
      if (!cleanText) return;

      const utterance = new SpeechSynthesisUtterance(cleanText);
      activeUtteranceRef.current = utterance;
      utterance.lang = 'en-IN';
      utterance.rate = 1.0;
      utterance.pitch = 1.35;

      const setVoiceAndSpeak = () => {
        const voices = window.speechSynthesis.getVoices();
        if (voices && voices.length > 0) {
          const strictlyFemaleVoices = voices.filter(v => {
            const nameLower = v.name.toLowerCase();
            const isExplicitMale = /\b(male|david|mark|george|ravi|hemant|prakash|richard|james|guy|stefan|daniel|alex|fred|thomas|nil|bruce|stefanos|adult|system)\b/i.test(nameLower) ||
                                   /google us english|google uk english male|microsoft david|microsoft mark/i.test(nameLower);
            return !isExplicitMale;
          });
          const pool = strictlyFemaleVoices.length > 0 ? strictlyFemaleVoices : voices;

          const preferredVoice = 
            pool.find(v => v.lang.toLowerCase().includes('en-in') && /\b(female|woman|girl|google|sangeeta|kalpana|veena|neerja|zira|samantha|victoria|helena|monica|luciana|karen|siri|natural|online)\b/i.test(v.name)) ||
            pool.find(v => v.lang.toLowerCase().includes('en') && /\b(female|woman|girl|google|sangeeta|kalpana|veena|neerja|zira|samantha|victoria|helena|monica|luciana|karen|siri|natural|online)\b/i.test(v.name)) ||
            pool.find(v => v.lang.toLowerCase().includes('en-in')) ||
            pool.find(v => /\b(female|woman|girl|google|sangeeta|kalpana|veena|neerja|zira|samantha|victoria|helena|monica|luciana|karen|siri|natural|online)\b/i.test(v.name)) ||
            pool[0];
          if (preferredVoice) utterance.voice = preferredVoice;
        }
        window.speechSynthesis.speak(utterance);
      };

      if (window.speechSynthesis.getVoices().length === 0) {
        window.speechSynthesis.onvoiceschanged = () => {
          setVoiceAndSpeak();
          window.speechSynthesis.onvoiceschanged = null;
        };
      } else {
        setVoiceAndSpeak();
      }
    } catch (e) {
      console.error('Arohi TTS error:', e);
    }
  };

  // Handle Model Change
  const handleSelectModel = (model: Learning3DModel) => {
    setActiveModel(model);
    setIsModelMenuOpen(false);
    setSelectedPartId(model.parts[0]?.id || null);
    setIsPlayingSimulation(false);
    setActiveViewPreset('normal');
  };

  // Handle View Preset Card Click
  const handleSelectPreset = (preset: 'normal' | 'xray' | 'exploded' | 'blood_flow') => {
    setActiveViewPreset(preset);
    if (preset === 'blood_flow') {
      setIsPlayingSimulation(true);
    } else {
      setIsPlayingSimulation(false);
    }
  };

  // Handle Ask Arohi Message
  const handleSendMessage = (customText?: string) => {
    const textToSend = customText || inputQuery;
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage3D = {
      id: `user_${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMsg]);
    if (!customText) setInputQuery('');
    setIsChatOpen(true);

    let replyText = `Analyzing **${selectedPart?.name || activeModel.name}**:\n\n${selectedPart?.detailedExplanation || activeModel.overviewText}\n\n**Key Significance**: ${selectedPart?.importanceText || activeModel.summary}`;
    
    if (textToSend.toLowerCase().includes('how it works') || textToSend.toLowerCase().includes('flow')) {
      handleSelectPreset('blood_flow');
      replyText = `Demonstrating blood circulation! Oxygen-depleted blood enters through the Vena Cava into the Right Atrium, moves to the Right Ventricle, and is pumped into the lungs via the Pulmonary Artery. Oxygenated blood returns via Pulmonary Veins to the Left Atrium and Left Ventricle, before pumping through the Aorta.`;
    }

    const arohiReply: ChatMessage3D = {
      id: `arohi_${Date.now()}`,
      sender: 'arohi',
      text: replyText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setTimeout(() => {
      setChatMessages(prev => [...prev, arohiReply]);
      if (isAutoSpeakEnabled) speakText(replyText);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col font-sans select-none bg-[#070a14] text-slate-100 overflow-hidden">
      
      {/* 1. HEADER BAR */}
      <header className="h-14 px-3 sm:px-6 bg-[#0c0f20] border-b border-indigo-900/40 flex items-center justify-between shrink-0 z-30">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onExit}
            className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 transition-all shrink-0"
            title="Back to Main Screen"
          >
            <ArrowLeft className="w-4 h-4 text-indigo-400" />
          </button>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shrink-0 shadow-lg shadow-purple-500/20">
              <Box className="w-4 h-4 text-white animate-pulse" />
            </div>
            <div className="hidden xs:block">
              <span className="font-extrabold text-sm tracking-tight bg-gradient-to-r from-white via-indigo-200 to-purple-300 bg-clip-text text-transparent">
                AROHI 3D Learning
              </span>
            </div>
          </div>

          <span className="px-2 py-0.5 rounded-full bg-purple-950/80 border border-purple-500/40 text-[10px] font-bold text-purple-300 uppercase shrink-0">
            3D/AR Studio
          </span>
        </div>

        {/* Model Dropdown & AR/VR controls */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setIsModelMenuOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 bg-indigo-950/90 hover:bg-indigo-900 border border-indigo-500/40 rounded-xl text-xs font-bold text-indigo-200 transition-all shadow-md shadow-indigo-950/50"
          >
            <Layers className="w-4 h-4 text-indigo-400" />
            <span className="max-w-[120px] sm:max-w-[180px] truncate">{activeModel.name}</span>
            <span className="text-[10px]">▼</span>
          </button>

          <div className="hidden sm:flex items-center gap-1.5">
            <button className="px-2.5 py-1 bg-slate-900/80 hover:bg-slate-800 border border-slate-700 rounded-lg text-xs font-bold text-slate-300 flex items-center gap-1">
              <span>📱</span> AR
            </button>
            <button className="px-2.5 py-1 bg-slate-900/80 hover:bg-slate-800 border border-slate-700 rounded-lg text-xs font-bold text-slate-300 flex items-center gap-1">
              <span>🥽</span> VR
            </button>
          </div>

          <button
            onClick={() => setIsAutoSpeakEnabled(!isAutoSpeakEnabled)}
            className={`p-2 rounded-xl border transition-all ${
              isAutoSpeakEnabled 
                ? 'bg-purple-950/80 text-purple-300 border-purple-500/40' 
                : 'bg-slate-900 text-slate-500 border-slate-800'
            }`}
            title={isAutoSpeakEnabled ? "Auto Speak ON" : "Auto Speak OFF"}
          >
            {isAutoSpeakEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* 2. MAIN STUDIO WORKSPACE */}
      <div className="flex-1 flex flex-col overflow-y-auto md:overflow-hidden relative scrollbar-thin">
        
        {/* UPPER SECTION: 3-COLUMN STUDIO LAYOUT */}
        <div className="flex-1 flex flex-col md:flex-row overflow-visible md:overflow-hidden relative min-h-0">
          
          {/* COLUMN 1: LEFT SIDEBAR (VIEW MODES & TOOLS) */}
          <div className="w-full md:w-48 bg-[#090c1a] border-b md:border-b-0 md:border-r border-indigo-900/30 p-2.5 flex md:flex-col justify-between overflow-x-auto md:overflow-y-auto shrink-0 z-20 scrollbar-none">
            <div className="space-y-4 flex-1">
              {/* VIEW MODES */}
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 px-1 block mb-1.5">
                  VIEW MODES
                </span>
                <div className="flex md:flex-col gap-1">
                  <button
                    onClick={() => handleSelectPreset('normal')}
                    className={`flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-xs font-extrabold transition-all text-left whitespace-nowrap ${
                      activeViewPreset === 'normal'
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-purple-600/30'
                        : 'bg-slate-900/60 hover:bg-slate-800 text-slate-300'
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5 text-indigo-300" />
                    <span>Normal</span>
                  </button>

                  <button
                    onClick={() => handleSelectPreset('xray')}
                    className={`flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-xs font-extrabold transition-all text-left whitespace-nowrap ${
                      activeViewPreset === 'xray'
                        ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                        : 'bg-slate-900/60 hover:bg-slate-800 text-slate-300'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                    <span>X-Ray</span>
                  </button>

                  <button
                    onClick={() => handleSelectPreset('exploded')}
                    className={`flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-xs font-extrabold transition-all text-left whitespace-nowrap ${
                      activeViewPreset === 'exploded'
                        ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                        : 'bg-slate-900/60 hover:bg-slate-800 text-slate-300'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5 text-purple-300" />
                    <span>Exploded</span>
                  </button>

                  <button
                    onClick={() => handleSelectPreset('blood_flow')}
                    className={`flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-xs font-extrabold transition-all text-left whitespace-nowrap ${
                      activeViewPreset === 'blood_flow'
                        ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30 animate-pulse'
                        : 'bg-slate-900/60 hover:bg-slate-800 text-slate-300'
                    }`}
                  >
                    <Activity className="w-3.5 h-3.5 text-rose-300" />
                    <span>Blood Flow</span>
                  </button>
                </div>
              </div>

              {/* TOOLS */}
              <div className="hidden md:block">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 px-1 block mb-1.5">
                  TOOLS
                </span>
                <div className="space-y-1">
                  <button
                    onClick={() => setActiveTool('rotate')}
                    className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all text-left ${
                      activeTool === 'rotate' ? 'bg-indigo-950 border border-indigo-500/50 text-indigo-200' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Compass className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Rotate</span>
                  </button>

                  <button
                    onClick={() => setActiveTool('zoom')}
                    className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all text-left ${
                      activeTool === 'zoom' ? 'bg-indigo-950 border border-indigo-500/50 text-indigo-200' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <ZoomIn className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Zoom</span>
                  </button>

                  <button
                    onClick={() => setActiveTool('pan')}
                    className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all text-left ${
                      activeTool === 'pan' ? 'bg-indigo-950 border border-indigo-500/50 text-indigo-200' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Move className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Pan</span>
                  </button>

                  <button
                    onClick={() => setActiveTool('reset')}
                    className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-xs font-bold text-slate-400 hover:text-white"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Reset</span>
                  </button>

                  <button
                    onClick={() => setActiveTool('measure')}
                    className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all text-left ${
                      activeTool === 'measure' ? 'bg-indigo-950 border border-indigo-500/50 text-indigo-200' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Ruler className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Measure</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* COLUMN 2: CENTER 3D VIEWPORT WITH SPATIAL CALLOUTS */}
          <div className="flex-1 bg-[#050710] relative flex flex-col min-h-[380px] h-[52vh] md:h-full">
            <div className="flex-1 w-full h-full min-h-[380px] relative">
              <ThreeCanvas3D
                model={activeModel}
                selectedPartId={selectedPartId}
                onSelectPart={(id) => setSelectedPartId(id)}
                isPlayingSimulation={isPlayingSimulation}
                onToggleSimulation={() => setIsPlayingSimulation(!isPlayingSimulation)}
                simulationSpeed={1}
                viewMode={activeViewPreset === 'blood_flow' ? '3d' : '3d'}
                onChangeViewMode={() => {}}
                isDarkMode={isDarkMode}
              />
            </div>
          </div>

          {/* COLUMN 3: RIGHT INSPECTOR PANEL (SELECTED PART DETAILS) */}
          <div className="w-full md:w-80 bg-[#090c1a] border-t md:border-t-0 md:border-l border-indigo-900/30 p-3.5 flex flex-col justify-between shrink-0 z-20">
            {selectedPart ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-indigo-900/40 pb-2">
                  <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-500 animate-pulse" />
                    <span>{selectedPart.name}</span>
                  </h3>
                  <button 
                    onClick={() => setSelectedPartId(null)}
                    className="text-slate-400 hover:text-white p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed font-medium">
                  {selectedPart.description}
                </p>

                {/* Metric Badges */}
                <div className="space-y-2 pt-1">
                  <div className="p-2.5 rounded-xl bg-[#0f1329] border border-indigo-900/40 text-xs">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Wall Thickness</span>
                    <span className="font-extrabold text-indigo-300 text-sm">
                      {selectedPart.id === 'left_ventricle' ? '10–15 mm' : selectedPart.id === 'right_ventricle' ? '3–5 mm' : '2–3 mm'}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#0f1329] border border-indigo-900/40 text-xs">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Function</span>
                    <span className="font-extrabold text-purple-300">
                      {selectedPart.functionText}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleSendMessage(`Explain ${selectedPart.name} in detail`)}
                  className="w-full py-2.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white rounded-xl text-xs font-extrabold transition-all shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2"
                >
                  <Bot className="w-4 h-4" />
                  <span>Ask Arohi AI</span>
                </button>
              </div>
            ) : (
              <div className="text-center py-6 text-slate-400 text-xs">
                Select any structure on the 3D model to inspect details.
              </div>
            )}
          </div>

        </div>

        {/* LOWER SECTION: 4 PRESET VIEW CARDS GRID */}
        <div className="p-2.5 bg-[#080b18] border-t border-indigo-900/40 grid grid-cols-2 md:grid-cols-4 gap-2 shrink-0">
          
          {/* Preset 1: NORMAL VIEW */}
          <div
            onClick={() => handleSelectPreset('normal')}
            className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center gap-2.5 ${
              activeViewPreset === 'normal'
                ? 'bg-indigo-950/90 border-indigo-500 text-white shadow-lg shadow-indigo-950/60 ring-1 ring-indigo-400'
                : 'bg-[#0d1024] border-slate-800 text-slate-400 hover:border-slate-700 hover:bg-[#121630]'
            }`}
          >
            <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 shrink-0">
              <Eye className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="text-xs font-black text-white block">NORMAL VIEW</span>
              <span className="text-[10px] text-slate-400 line-clamp-1">Standard anatomical model</span>
            </div>
          </div>

          {/* Preset 2: X-RAY VIEW */}
          <div
            onClick={() => handleSelectPreset('xray')}
            className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center gap-2.5 ${
              activeViewPreset === 'xray'
                ? 'bg-cyan-950/90 border-cyan-500 text-white shadow-lg shadow-cyan-950/60 ring-1 ring-cyan-400'
                : 'bg-[#0d1024] border-slate-800 text-slate-400 hover:border-slate-700 hover:bg-[#121630]'
            }`}
          >
            <div className="w-8 h-8 rounded-lg bg-cyan-600/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="text-xs font-black text-white block">X-RAY VIEW</span>
              <span className="text-[10px] text-slate-400 line-clamp-1">Translucent inner structures</span>
            </div>
          </div>

          {/* Preset 3: EXPLODED VIEW */}
          <div
            onClick={() => handleSelectPreset('exploded')}
            className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center gap-2.5 ${
              activeViewPreset === 'exploded'
                ? 'bg-purple-950/90 border-purple-500 text-white shadow-lg shadow-purple-950/60 ring-1 ring-purple-400'
                : 'bg-[#0d1024] border-slate-800 text-slate-400 hover:border-slate-700 hover:bg-[#121630]'
            }`}
          >
            <div className="w-8 h-8 rounded-lg bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-400 shrink-0">
              <Layers className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="text-xs font-black text-white block">EXPLODED VIEW</span>
              <span className="text-[10px] text-slate-400 line-clamp-1">Separated component study</span>
            </div>
          </div>

          {/* Preset 4: BLOOD FLOW ANIMATION */}
          <div
            onClick={() => handleSelectPreset('blood_flow')}
            className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
              activeViewPreset === 'blood_flow'
                ? 'bg-rose-950/90 border-rose-500 text-white shadow-lg shadow-rose-950/60 ring-1 ring-rose-400'
                : 'bg-[#0d1024] border-slate-800 text-slate-400 hover:border-slate-700 hover:bg-[#121630]'
            }`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-rose-600/20 border border-rose-500/40 flex items-center justify-center text-rose-400 shrink-0">
                <Activity className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-xs font-black text-white block">BLOOD FLOW</span>
                <div className="flex items-center gap-2 text-[9px] text-slate-400">
                  <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block" /> Blue</span>
                  <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-rose-500 inline-block" /> Red</span>
                </div>
              </div>
            </div>
            <Play className={`w-4 h-4 shrink-0 ${activeViewPreset === 'blood_flow' ? 'text-rose-400 animate-ping' : 'text-slate-500'}`} />
          </div>

        </div>

        {/* BOTTOM ROW WIDGETS (EXPLANATION & QUICK QUIZ) */}
        <div className="px-2.5 py-2 bg-[#060814] border-t border-indigo-900/40 grid grid-cols-1 md:grid-cols-2 gap-2.5 shrink-0">
          
          {/* WIDGET 1: AROHI EXPLANATION */}
          <div className="p-3 rounded-xl bg-[#0b0e21] border border-indigo-900/40 space-y-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Bot className="w-4 h-4 text-purple-400" />
                <span className="text-xs font-extrabold text-white">Arohi Explanation</span>
              </div>
              <button
                onClick={() => speakText(selectedPart?.detailedExplanation || activeModel.overviewText)}
                className="p-1 rounded-lg bg-indigo-950 text-indigo-300 hover:bg-indigo-900"
                title="Play Audio Narration"
              >
                <Volume2 className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-medium line-clamp-2">
              {selectedPart?.detailedExplanation || activeModel.overviewText}
            </p>
          </div>

          {/* WIDGET 2: QUICK QUIZ */}
          <div className="p-3 rounded-xl bg-[#0b0e21] border border-amber-500/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-amber-400 flex items-center gap-1">
                <Award className="w-4 h-4" /> Quick Quiz
              </span>
              <span className="text-[10px] font-bold text-amber-300 bg-amber-950 px-2 py-0.5 rounded-full border border-amber-500/30">
                Score: {quizScore}
              </span>
            </div>

            <p className="text-xs font-bold text-white">
              Which valve prevents backflow from the left ventricle to the left atrium?
            </p>

            <div className="grid grid-cols-2 gap-1.5">
              {['Aortic Valve', 'Mitral Valve', 'Tricuspid Valve', 'Pulmonary Valve'].map((opt, idx) => {
                const isCorrect = idx === 1; // Mitral Valve
                const isSelected = selectedQuizOption === idx;

                let style = "bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800";
                if (selectedQuizOption !== null) {
                  if (isCorrect) style = "bg-emerald-950 border-emerald-500 text-emerald-200 font-bold";
                  else if (isSelected) style = "bg-rose-950 border-rose-500 text-rose-200";
                }

                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedQuizOption(idx);
                      if (isCorrect && selectedQuizOption === null) setQuizScore(prev => prev + 10);
                    }}
                    className={`py-1 px-2 rounded-lg border text-[11px] transition-all text-left truncate ${style}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

      </div>

      {/* 3. MODEL SELECTION MODAL */}
      {isModelMenuOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in">
          <div className="w-full max-w-3xl max-h-[85vh] bg-[#0f1326] border border-indigo-900/50 rounded-2xl flex flex-col shadow-2xl overflow-hidden">
            
            {/* Modal Header */}
            <div className="p-4 bg-[#141933] border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-sm sm:text-base font-extrabold text-white flex items-center gap-2">
                  <Box className="w-4 h-4 text-indigo-400" />
                  <span>3D Learning Models Registry</span>
                </h3>
                <p className="text-xs text-slate-400 font-medium">
                  Select an interactive 3D model across science, engineering, geography & medicine
                </p>
              </div>

              <button
                onClick={() => setIsModelMenuOpen(false)}
                className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Modal Search & Filters */}
            <div className="p-3 border-b border-slate-800 flex flex-col sm:flex-row gap-2 bg-[#0b0e1d]">
              <div className="flex-1 flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5">
                <Search className="w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e?.target?.value ?? '')}
                  placeholder="Search 3D models (heart, brain, cell, engine, solar system...)"
                  className="w-full bg-transparent text-xs text-white outline-none placeholder-slate-500 font-medium"
                />
              </div>

              <div className="flex items-center gap-1 overflow-x-auto scrollbar-none py-0.5">
                {(['all', 'biology', 'chemistry', 'physics', 'astronomy', 'engineering', 'geography'] as const).map((subj) => (
                  <button
                    key={subj}
                    onClick={() => setSubjectFilter(subj)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold capitalize transition-all whitespace-nowrap ${
                      subjectFilter === subj
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    {subj}
                  </button>
                ))}
              </div>
            </div>

            {/* Model Grid Cards */}
            <div className="flex-1 overflow-y-auto p-4 grid grid-cols-1 sm:grid-cols-2 gap-3 scrollbar-thin">
              {search3DModels(searchQuery).filter(m => subjectFilter === 'all' || m.subject === subjectFilter).map((model) => (
                <div
                  key={model.id}
                  onClick={() => handleSelectModel(model)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                    activeModel.id === model.id
                      ? 'bg-indigo-950/80 border-indigo-500 text-white shadow-lg shadow-indigo-950/60'
                      : 'bg-[#12162b] border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-[#181d38]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-xs font-black text-white">{model.name}</span>
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-purple-900/60 border border-purple-500/30 text-purple-300 uppercase">
                        {model.subject}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                      {model.summary}
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                    <span>{model.parts.length} 3D Components</span>
                    <span className="text-indigo-400 font-bold">Open 3D Model →</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default Arohi3DLearningWorkspace;
