import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  Mic, 
  Send, 
  Camera, 
  Globe, 
  FileText, 
  Calendar, 
  Search, 
  CheckCircle2, 
  ArrowRight, 
  Bot, 
  Zap, 
  Brain, 
  ShieldCheck, 
  MessageSquare, 
  BookOpen, 
  Layers, 
  HelpCircle,
  Volume2
} from 'lucide-react';
import ArohiAvatar from '../ArohiAvatar';
import { Language } from '../../translations';

interface ArohiAssistantProductPageProps {
  onNavigateTab: (tab: string) => void;
  onQuickChat: (prompt: string) => void;
  onOpenVoiceCall?: () => void;
  isDarkMode?: boolean;
  language?: Language;
}

export default function ArohiAssistantProductPage({
  onNavigateTab,
  onQuickChat,
  onOpenVoiceCall,
  isDarkMode = true
}: ArohiAssistantProductPageProps) {
  const [inputPrompt, setInputPrompt] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const capabilities = [
    { label: 'Chat', icon: MessageSquare },
    { label: 'Voice', icon: Mic },
    { label: 'Vision', icon: Camera },
    { label: 'Docs', icon: FileText },
    { label: 'Web Grounded', icon: Globe },
    { label: 'Multi-Tools', icon: Zap }
  ];

  const quickStarters = [
    {
      title: 'Explain a concept',
      desc: 'Simple, step-by-step explanations',
      icon: BookOpen,
      color: 'from-blue-500 to-indigo-600',
      prompt: 'Explain quantum computing in simple everyday analogies with real-world examples.'
    },
    {
      title: 'Summarize this document',
      desc: 'Extract key takeaways instantly',
      icon: FileText,
      color: 'from-emerald-500 to-teal-600',
      prompt: 'Summarize the Union Budget highlights and key allocations for youth and technology.'
    },
    {
      title: 'Help me plan my day',
      desc: 'Time blocking and priority schedule',
      icon: Calendar,
      color: 'from-amber-500 to-orange-600',
      prompt: 'Create a high-productivity study and revision schedule for my upcoming exams.'
    },
    {
      title: 'Create an image',
      desc: 'Arohi Neural Vision synthesis',
      icon: Camera,
      color: 'from-fuchsia-500 to-pink-600',
      prompt: 'Generate an artistic concept illustration of a futuristic smart solar village in India.'
    },
    {
      title: 'Research this topic',
      desc: 'Deep multi-source synthesis',
      icon: Search,
      color: 'from-cyan-500 to-blue-600',
      prompt: 'Provide a comprehensive research briefing on latest advancements in renewable hydrogen energy in India.'
    },
    {
      title: 'Solve a problem',
      desc: 'Math, logic, code and equations',
      icon: Zap,
      color: 'from-purple-500 to-violet-600',
      prompt: 'Walk me through solving quadratic equations and calculus integration step-by-step.'
    }
  ];

  const sampleConversations = [
    {
      badge: 'Document Intelligence',
      title: 'Summarize this PDF for me',
      description: 'Upload any PDF, document, or research paper to get chapter breakdown, citations, and actionable conclusions.',
      tag: 'PDF, DOCX, TXT'
    },
    {
      badge: 'Neural Vision',
      title: 'Analyze this photo or diagram',
      description: 'Snap a picture of a handwritten math problem, circuit schematic, or medical report for instant neural analysis.',
      tag: 'JPG, PNG, WebP'
    },
    {
      badge: 'Voice Career Coach',
      title: 'Help me practice an interview',
      description: 'Simulate high-stakes behavioral and technical mock interviews with real-time vocal feedback in 150+ vernacular dialects.',
      tag: 'Real-Time Voice'
    }
  ];

  const popularLanguages = [
    'English', 'हिन्दी (Hindi)', 'ଓଡ଼ିଆ (Odia)', 'বাংলা (Bengali)', 
    'தமிழ் (Tamil)', 'తెలుగు (Telugu)', 'ಕನ್ನಡ (Kannada)', 'मराठी (Marathi)', 
    'ગુજરાતી (Gujarati)', 'ਪੰਜਾਬੀ (Punjabi)', 'മലയാളം (Malayalam)', 'অসমীয়া (Assamese)'
  ];

  const handleSend = (text?: string) => {
    const q = text || inputPrompt.trim();
    if (!q) return;
    onQuickChat(q);
  };

  return (
    <div className="w-full space-y-12 pb-20 font-sans">
      {/* 1. Header Hero Section */}
      <section className="text-center pt-4 sm:pt-8 max-w-4xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-600 dark:text-blue-400 text-xs font-black uppercase tracking-widest mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>AROHI AI ASSISTANT</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-zinc-900 dark:text-white leading-tight">
          Your intelligent companion for work, study and life.
        </h1>
        <p className="text-sm sm:text-lg text-zinc-600 dark:text-zinc-400 mt-3 max-w-2xl mx-auto leading-relaxed">
          Ask. Create. Learn. Solve. Achieve. In 150+ languages.
        </p>

        {/* Feature Capability Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
          {capabilities.map((c, i) => {
            const Icon = c.icon;
            return (
              <div 
                key={i}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/8 dark:border-white/10 text-xs font-semibold text-zinc-700 dark:text-zinc-300 backdrop-blur-sm"
              >
                <Icon className="w-3.5 h-3.5 text-blue-500" />
                <span>{c.label}</span>
              </div>
            );
          })}
        </div>

        {/* Interactive Chat & Action Mockup */}
        <div className="mt-8 max-w-2xl mx-auto text-left">
          {/* Greeting Bubble */}
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 rounded-2xl overflow-hidden border border-blue-500/30 p-0.5 bg-blue-950/40 shrink-0 shadow-md">
              <ArohiAvatar className="w-full h-full" />
            </div>
            <div className="bg-white dark:bg-[#15171e] p-3.5 rounded-2xl rounded-tl-sm border border-black/8 dark:border-white/10 shadow-sm text-sm text-zinc-800 dark:text-zinc-200">
              <p className="font-medium">
                Hi! I&apos;m Arohi 👋 Ask me anything — I&apos;m here to help you study, build, solve problems, or launch your ideas.
              </p>
            </div>
          </div>

          {/* Action Input Dock */}
          <div className={`p-2.5 rounded-2xl border shadow-lg transition-all ${
            isDarkMode ? 'bg-[#15171e]/95 border-blue-500/30 shadow-[0_10px_35px_rgba(0,0,0,0.5)]' : 'bg-white border-zinc-200 shadow-xl'
          }`}>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-500 shrink-0 ml-1.5" />
              <input
                type="text"
                value={inputPrompt}
                onChange={(e) => setInputPrompt(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask Arohi anything..."
                className="flex-1 bg-transparent text-sm sm:text-base outline-none text-zinc-900 dark:text-white placeholder-zinc-400 py-1.5"
              />
              <button
                type="button"
                onClick={() => onQuickChat('Hi Arohi, let us speak!')}
                className="p-2 rounded-xl text-zinc-400 hover:text-blue-500 hover:bg-blue-500/10 transition-colors"
                title="Voice consultation"
              >
                <Mic className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => onQuickChat('Please analyze this diagram or document image.')}
                className="p-2 rounded-xl text-zinc-400 hover:text-blue-500 hover:bg-blue-500/10 transition-colors"
                title="Vision & image upload"
              >
                <Camera className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => handleSend()}
                className="p-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
                title="Send query"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. 6 Quick Action Cards */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white">
            What would you like to achieve today?
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Instant intelligence tuned for every day, study, and high-impact tasks.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
          {quickStarters.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={index}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSend(item.prompt)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-3.5 ${
                  isDarkMode 
                    ? 'bg-[#15171e]/80 border-white/8 hover:border-blue-500/40 hover:bg-[#1a1d26]' 
                    : 'bg-white border-black/8 hover:border-blue-500/40 hover:shadow-md'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} text-white flex items-center justify-center shrink-0 shadow-sm`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center justify-between">
                    <span>{item.title}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* 3. "Try These with Arohi" Multi-Modal Showcase */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="bg-gradient-to-r from-blue-900/20 via-indigo-900/20 to-purple-900/20 rounded-3xl border border-blue-500/20 p-6 sm:p-8 backdrop-blur-md">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">
                MULTI-MODAL INTELLIGENCE
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white mt-1">
                Try these with Arohi
              </h2>
            </div>
            <button
              onClick={() => onQuickChat('Hello Arohi! Show me your top multimodal capabilities.')}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              Open Full Chat Experience →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {sampleConversations.map((card, i) => (
              <div 
                key={i}
                className="bg-white/80 dark:bg-[#0e1017]/80 rounded-2xl p-4 border border-black/6 dark:border-white/8 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                    {card.badge}
                  </span>
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mt-2.5">
                    {card.title}
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
                    {card.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-black/5 dark:border-white/5 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-zinc-400">{card.tag}</span>
                  <button
                    onClick={() => handleSend(card.title)}
                    className="text-xs font-bold text-blue-500 hover:text-blue-400 flex items-center gap-1 cursor-pointer"
                  >
                    Try Now <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. 150+ Multilingual Showcase */}
      <section className="max-w-5xl mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-[#d4af37] mb-2">
          <Globe className="w-4 h-4" />
          <span>VERNACULAR SOVEREIGNTY</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white">
          Available in 150+ Languages
        </h2>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1.5 max-w-xl mx-auto">
          Truly Indian. Truly Global. Arohi speaks, thinks, and replies in your mother tongue with native clarity.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-2 mt-6 max-w-3xl mx-auto">
          {popularLanguages.map((lang, idx) => (
            <button
              key={idx}
              onClick={() => onQuickChat(`Namaste Arohi! Let us speak in ${lang}.`)}
              className="px-3.5 py-1.5 rounded-full bg-white dark:bg-[#15171e] border border-black/8 dark:border-white/10 text-xs font-semibold text-zinc-800 dark:text-zinc-200 hover:border-[#d4af37]/60 hover:text-[#d4af37] transition-all cursor-pointer shadow-xs"
            >
              {lang}
            </button>
          ))}
        </div>
      </section>

      {/* 5. Metrics & Trust Banner */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-4 rounded-2xl bg-white/70 dark:bg-[#15171e]/70 border border-black/6 dark:border-white/8">
            <div className="text-2xl sm:text-3xl font-black text-blue-600 dark:text-blue-400 font-display">1M+</div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400 font-medium mt-0.5">Queries Daily</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/70 dark:bg-[#15171e]/70 border border-black/6 dark:border-white/8">
            <div className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 font-display">150+</div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400 font-medium mt-0.5">Languages Supported</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/70 dark:bg-[#15171e]/70 border border-black/6 dark:border-white/8">
            <div className="text-2xl sm:text-3xl font-black text-amber-600 dark:text-amber-400 font-display">99.9%</div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400 font-medium mt-0.5">Sovereign Uptime</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/70 dark:bg-[#15171e]/70 border border-black/6 dark:border-white/8">
            <div className="text-2xl sm:text-3xl font-black text-purple-600 dark:text-purple-400 font-display">17+</div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400 font-medium mt-0.5">AI Engine Capabilities</div>
          </div>
        </div>
      </section>
    </div>
  );
}
