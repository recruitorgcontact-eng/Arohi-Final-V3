import { useState } from 'react';
import { 
  FileText, 
  Video, 
  Building2, 
  Landmark, 
  GraduationCap, 
  Award, 
  Briefcase, 
  Store, 
  Bot, 
  Sparkles, 
  ArrowRight,
  Zap,
  BookOpen,
  Music,
  Image,
  Code,
  HelpCircle,
  Scale,
  PenTool,
  PhoneCall,
  Search,
  CheckCircle2,
  Cpu
} from 'lucide-react';

interface ToolsHubProps {
  onNavigateTab: (tab: string) => void;
  onOpenAuth?: () => void;
  onQuickChat?: (prompt: string) => void;
}

export default function ToolsHub({ onNavigateTab, onQuickChat }: ToolsHubProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const toolsList = [
    {
      id: 'music',
      title: 'AI Music & Song Generator',
      category: 'AI CREATIVE & AUDIO',
      catFilter: 'CREATIVE',
      description: 'Compose original song lyrics, background soundscapes, melody arrangements, and AI audio music tracks.',
      icon: Music,
      color: 'from-pink-500 via-purple-600 to-indigo-600',
      badge: 'NEW AI',
      prompt: 'Hello Arohi! I want to generate AI music, write lyrics, and compose a song. Please help me create custom audio, music tracks, and song lyrics.'
    },
    {
      id: 'image',
      title: 'AI Image & Art Studio',
      category: 'AI CREATIVE & AUDIO',
      catFilter: 'CREATIVE',
      description: 'Generate HD artwork, photo enhancements, logo concepts, banners, and visual design graphics with prompts.',
      icon: Image,
      color: 'from-cyan-500 via-blue-600 to-indigo-600',
      badge: 'HD CREATIVE',
      prompt: 'Hello Arohi! I want to create an image, logo, or artwork using AI. Guide me on generating visual designs and image prompts.'
    },
    {
      id: 'arohi',
      title: 'AI Live Voice Call & Speech',
      category: '150+ LANGUAGES',
      catFilter: 'AUDIO & VOICE',
      description: 'Have 24/7 real-time voice conversations with Arohi AI in 150+ native Indian & regional languages.',
      icon: PhoneCall,
      color: 'from-purple-600 via-fuchsia-600 to-pink-600',
      badge: '24/7 LIVE',
      prompt: 'Hello Arohi! Let\'s speak over real-time voice call in my native language.'
    },
    {
      id: 'video',
      title: 'AI Video Script & Storyboard',
      category: 'AI CREATIVE & AUDIO',
      catFilter: 'CREATIVE',
      description: 'Generate short-form video scripts for YouTube/Reels, scene storyboards, and voiceover audio scripts.',
      icon: Video,
      color: 'from-rose-500 to-pink-600',
      badge: 'VIRAL REELS',
      prompt: 'Hello Arohi! Help me write a viral YouTube/Reels video script, storyboard, and voiceover outline.'
    },
    {
      id: 'code',
      title: 'AI Code & Math Debugger',
      category: 'DEVELOPER & MATH',
      catFilter: 'PRODUCTIVITY',
      description: 'Solve complex programming bugs, debug code snippets, write algorithms, and solve multi-step math equations.',
      icon: Code,
      color: 'from-emerald-500 to-teal-700',
      badge: 'DEV & MATH',
      prompt: 'Hello Arohi! Help me solve a coding problem or step-by-step mathematical equation.'
    },
    {
      id: 'quiz',
      title: 'AI Quiz & Flashcard Generator',
      category: 'ACADEMICS & EXAMS',
      catFilter: 'LEARNING',
      description: 'Generate interactive practice MCQs, speed quizzes, and revision flashcards for school & competitive exams.',
      icon: HelpCircle,
      color: 'from-amber-500 to-orange-600',
      badge: 'INSTANT MCQS',
      prompt: 'Hello Arohi! Generate an interactive quiz and study flashcards on my target subject or topic.'
    },
    {
      id: 'writer',
      title: 'AI Content Writer & Summarizer',
      category: 'WRITING & DOCS',
      catFilter: 'PRODUCTIVITY',
      description: 'Summarize long documents & articles, write essays, craft executive emails, and generate blog posts.',
      icon: PenTool,
      color: 'from-indigo-500 to-purple-700',
      badge: 'SMART DOCS',
      prompt: 'Hello Arohi! Help me write an essay, article, executive email, or summarize a long document.'
    },
    {
      id: 'legal',
      title: 'AI Legal & Policy Advisor',
      category: 'CITIZEN RIGHTS',
      catFilter: 'BUSINESS & GOVT',
      description: 'Understand citizen legal rights, draft agreement summaries, and get simplified regulatory policy guides.',
      icon: Scale,
      color: 'from-blue-600 to-cyan-700',
      badge: 'LAW & POLICY',
      prompt: 'Hello Arohi! Explain citizen legal rights, regulatory rules, or summarize a contract agreement.'
    },
    {
      id: 'resume',
      title: 'AI Resume Builder & ATS Scanner',
      category: 'CAREER BOOST',
      catFilter: 'CAREER',
      description: 'Build ATS-optimized professional resumes, check keyword density, score layout compliance, and export PDFs.',
      icon: FileText,
      color: 'from-purple-500 to-indigo-600',
      badge: 'POPULAR',
      tabId: 'resume'
    },
    {
      id: 'interview',
      title: 'AI Mock Interview Coach',
      category: 'INTERVIEW PREP',
      catFilter: 'CAREER',
      description: 'Practice real-time technical & HR mock interviews in Hindi, English, or Odia with instant feedback.',
      icon: Video,
      color: 'from-pink-500 to-rose-600',
      badge: 'LIVE AI',
      tabId: 'interview'
    },
    {
      id: 'business',
      title: 'MSME & Startup Assistant',
      category: 'BUSINESS & LOANS',
      catFilter: 'BUSINESS & GOVT',
      description: 'Validate startup ideas, calculate Mudra & PMEGP loan eligibility, and explore subsidy guidelines.',
      icon: Building2,
      color: 'from-emerald-500 to-teal-600',
      badge: 'GOVT SUBMIT',
      tabId: 'business'
    },
    {
      id: 'schemes',
      title: 'Govt Schemes & Subsidies',
      category: 'POLICY & GRANTS',
      catFilter: 'BUSINESS & GOVT',
      description: 'Discover Central & State Government welfare programs, Mukhyamantri schemes, and eligibility steps.',
      icon: Landmark,
      color: 'from-amber-500 to-orange-600',
      badge: 'VERIFIED',
      tabId: 'schemes'
    },
    {
      id: 'mocktests',
      title: 'All-India Mock Tests & CBT Exam Portal',
      category: 'EXAMS & CBT SIMULATOR',
      catFilter: 'LEARNING',
      description: 'Practice real exam simulations with exact timing, negative marking, All-India Leaderboard, and AI diagnostic reports for Class 1-12, Nursing, SSC, UPSC, and NEET.',
      icon: Award,
      color: 'from-rose-500 via-purple-600 to-indigo-600',
      badge: 'ALL-INDIA CBT',
      tabId: 'mocktests'
    },
    {
      id: 'syllabus',
      title: 'School Syllabus Portal (Class 1-10)',
      category: 'ACADEMICS',
      catFilter: 'LEARNING',
      description: 'Access Odisha Board (BSE) and CBSE curriculum, exam patterns, subject syllabi, and study notes.',
      icon: BookOpen,
      color: 'from-cyan-500 to-blue-600',
      badge: 'ODISHA & CBSE',
      tabId: 'syllabus'
    },
    {
      id: 'courses',
      title: 'Skills & Academy Certifications',
      category: 'UP-SKILLING',
      catFilter: 'LEARNING',
      description: 'Enroll in market-demanded skill courses, computer applications, digital marketing, and spoken English.',
      icon: GraduationCap,
      color: 'from-violet-500 to-purple-600',
      badge: 'CERTIFIED',
      tabId: 'courses'
    },
    {
      id: 'jobs',
      title: 'Sarkari & Private Jobs Portal',
      category: 'RECRUITMENT',
      catFilter: 'CAREER',
      description: 'Browse central/state government notifications, UPSC, SSC, Banking, Railways, and private vacancies.',
      icon: Briefcase,
      color: 'from-blue-600 to-indigo-700',
      badge: 'DAILY UPDATES',
      tabId: 'jobs'
    },
    {
      id: 'employer',
      title: 'Recruiter & Employer Portal',
      category: 'FOR EMPLOYERS',
      catFilter: 'BUSINESS & GOVT',
      description: 'Post job vacancies, manage candidate applications, screen resumes, and issue official interview letters.',
      icon: Award,
      color: 'from-fuchsia-600 to-pink-600',
      badge: 'HIRING',
      tabId: 'employer'
    },
    {
      id: 'franchise',
      title: 'AECN Franchise Partner Portal',
      category: 'BUSINESS PARTNER',
      catFilter: 'BUSINESS & GOVT',
      description: 'Join India\'s premier skill ecosystem as an official AECN learning & career franchise partner.',
      icon: Store,
      color: 'from-yellow-500 to-amber-600',
      badge: 'PARTNERSHIP',
      tabId: 'franchise'
    }
  ];

  const categories = [
    { id: 'ALL', label: 'All Capabilities (17)' },
    { id: 'CREATIVE', label: '🎵 Creative, Music & Media' },
    { id: 'CAREER', label: '💼 Career & Jobs' },
    { id: 'BUSINESS & GOVT', label: '🏢 Business & Schemes' },
    { id: 'LEARNING', label: '📚 Academics & Courses' },
    { id: 'PRODUCTIVITY', label: '⚡ Code, Math & Writing' }
  ];

  const filteredTools = toolsList.filter(tool => {
    const matchesCategory = selectedCategory === 'ALL' || tool.catFilter === selectedCategory;
    const matchesSearch = tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tool.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleLaunchTool = (tool: typeof toolsList[0]) => {
    if (tool.tabId) {
      onNavigateTab(tool.tabId);
    } else if (tool.prompt && onQuickChat) {
      onQuickChat(tool.prompt);
    } else {
      onNavigateTab('arohi');
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom duration-300 pb-16 text-left">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#120b2e] via-[#1a1240] to-[#0d0922] border border-[#3b2b80]/50 rounded-3xl p-6 md:p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-purple-500/10 text-purple-300 border border-purple-500/30 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-pulse" />
            AI Capabilities & Tools Suite
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
            All AI Capabilities <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-400">In One Place</span>
          </h1>
          <p className="text-sm text-slate-300 font-medium leading-relaxed">
            From <strong>AI Music Generation</strong>, <strong>Image Studio</strong>, and <strong>Video Scripting</strong> to ATS Resume Auditing, Mock Interview Coaching, Business Loan Calculators, and Code/Math Solvers — launch any tool below instantly.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigateTab('solutions')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-purple-600/30 transition-all cursor-pointer hover:scale-105 active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
              <span>Explore 100+ Real Life Solutions Directory (23 Audiences)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all shrink-0 cursor-pointer border ${
                  selectedCategory === cat.id
                    ? 'bg-purple-600 border-purple-500 text-white shadow-md'
                    : 'bg-[#120e2b] border-[#2d2163] text-slate-300 hover:border-purple-500/40 hover:bg-[#1a143d]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64 shrink-0">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e?.target?.value ?? "")}
              placeholder="Search AI tools..."
              className="w-full bg-[#120e2b] border border-[#2d2163] rounded-xl pl-9 pr-3 py-2 text-xs font-medium text-white placeholder-slate-400 outline-none focus:border-purple-500 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Grid of Tools */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredTools.map((tool) => {
          const IconComponent = tool.icon;
          return (
            <div
              key={tool.id}
              onClick={() => handleLaunchTool(tool)}
              className="group bg-[#120e2b]/90 hover:bg-[#1a143d] border border-[#2d2163] hover:border-[#7c3aed]/50 rounded-2xl p-5 transition-all duration-200 shadow-xl hover:shadow-[0_10px_30px_rgba(124,58,237,0.25)] flex flex-col justify-between cursor-pointer relative overflow-hidden"
            >
              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-2xl bg-gradient-to-br ${tool.color} text-white shadow-md group-hover:scale-110 transition-transform duration-200`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300">
                    {tool.badge}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[10px] font-black uppercase tracking-wider text-purple-400 font-mono block">
                    {tool.category}
                  </span>
                  <h3 className="text-base font-black text-white group-hover:text-purple-200 transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-xs text-slate-300 font-medium leading-relaxed">
                    {tool.description}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-[#251a54] flex items-center justify-between relative z-10 text-xs font-black text-purple-400 group-hover:text-purple-300">
                <span className="flex items-center gap-1">
                  Launch Capability <Zap className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300" />
                </span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}

