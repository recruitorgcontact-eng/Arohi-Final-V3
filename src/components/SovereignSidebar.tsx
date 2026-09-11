import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MessageSquare,
  Plus,
  Briefcase,
  Sparkles,
  GraduationCap,
  FileCheck,
  Bot,
  Globe,
  Coins,
  Sun,
  Moon,
  User,
  PanelLeftClose,
  PanelLeft,
  ChevronRight,
  ShieldCheck,
  Search,
  ExternalLink,
  Layers,
  Crown,
  HeartHandshake
} from 'lucide-react';
import ArohiAvatar from './ArohiAvatar';
import { Language } from '../translations';
import { LANGUAGES_LIST } from './Header';

interface SovereignSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onNewChat: () => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  user: any;
  onOpenAuth: () => void;
  hasActiveSubscription?: boolean;
  isTrialActive?: boolean;
  remainingHours?: number;
  remainingMinutes?: number;
  remainingSeconds?: number;
  onUpgradeClick?: () => void;
  arohiCoinBalance?: number;
}

export const SovereignSidebar: React.FC<SovereignSidebarProps> = ({
  isOpen,
  onToggle,
  activeTab,
  setActiveTab,
  onNewChat,
  language,
  onLanguageChange,
  isDarkMode,
  onToggleTheme,
  user,
  onOpenAuth,
  hasActiveSubscription = false,
  isTrialActive = false,
  remainingHours = 0,
  remainingMinutes = 0,
  onUpgradeClick,
  arohiCoinBalance = 0,
}) => {
  const [isLangModalOpen, setIsLangModalOpen] = useState(false);
  const [langSearch, setLangSearch] = useState('');

  const currentLangObj = LANGUAGES_LIST.find((l) => l.code === language) || LANGUAGES_LIST[0];

  const suites = [
    {
      id: 'home',
      label: 'Arohi Studio',
      icon: MessageSquare,
      badge: 'Universal',
      description: 'Conversational LLM cum LMM'
    },
    {
      id: 'business-os',
      label: 'Business OS',
      icon: Briefcase,
      badge: '18 Tools',
      description: 'GST Invoices, CRM & Brain Sync'
    },
    {
      id: 'mission87',
      label: 'Mission 87',
      icon: Sparkles,
      badge: 'Movement',
      badgeGold: true,
      description: '5 Sovereign Earning Ladders'
    },
    {
      id: 'career',
      label: 'Career & Mock Interview',
      icon: Bot,
      badge: 'ATS 100/100',
      description: 'Live Voice Simulator & Resumes'
    },
    {
      id: 'mocktests',
      label: 'Arohi Exams™',
      icon: GraduationCap,
      badge: 'CBT Arena',
      description: 'UPSC, SSC, Banking & NEET'
    },
    {
      id: 'solutions',
      label: 'Solutions Directory',
      icon: Layers,
      badge: '100+ Apps',
      description: '23 Audience Use-Cases'
    },
    {
      id: 'partner',
      label: 'Partner & Franchise',
      icon: HeartHandshake,
      badge: '15% Comm.',
      description: 'AECN Centers & Sovereign Growth'
    }
  ];

  return (
    <>
      {/* Backdrop (Mobile & Desktop) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onToggle}
            className="fixed inset-0 z-[95] bg-black/60 backdrop-blur-xs cursor-pointer"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Panel - Strictly Fixed Viewport Drawer */}
      <motion.aside
        aria-label="Sovereign Atelier Sidebar"
        initial={false}
        animate={{
          x: isOpen ? 0 : -340,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 bottom-0 left-0 z-[100] flex flex-col h-full w-72 sm:w-80 overflow-hidden border-r shadow-2xl transition-colors ${
          isDarkMode
            ? 'bg-[#111319] border-white/10 text-zinc-200 shadow-black/80'
            : 'bg-[#F4F4F0] border-black/10 text-zinc-800 shadow-zinc-400/30'
        } ${!isOpen ? 'pointer-events-none' : 'pointer-events-auto'}`}
      >
        <div className="flex flex-col h-full w-full select-none">
          {/* Top Bar: Brand & Close */}
          <div className="flex items-center justify-between px-4 pt-4 pb-2">
            <button
              onClick={() => {
                setActiveTab('home');
                onNewChat();
              }}
              className="flex items-center gap-2.5 text-left group cursor-pointer"
            >
              <div className="w-8 h-8 rounded-lg overflow-hidden border border-[#D4AF37]/30 shadow-xs group-hover:scale-105 transition-transform bg-[#D4AF37]/10 flex items-center justify-center">
                <ArohiAvatar className="w-full h-full" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-display font-black tracking-wider text-sm uppercase text-zinc-900 dark:text-zinc-100">
                    Arohi <span className="text-blue-600 dark:text-blue-500 font-black">AI</span>
                  </span>
                </div>
                <p className="text-[9px] text-zinc-500 dark:text-zinc-400 font-semibold tracking-tight">
                  One AI. Infinite Opportunities.
                </p>
              </div>
            </button>

            <button
              onClick={onToggle}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
              title="Collapse Sidebar"
            >
              <PanelLeftClose className="w-4 h-4" />
            </button>
          </div>

          {/* New Chat Primary Action Button (Claude / OpenAI style) */}
          <div className="px-3 pt-2 pb-3">
            <button
              onClick={() => {
                setActiveTab('home');
                onNewChat();
              }}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all shadow-xs cursor-pointer border bg-white dark:bg-[#1A1D24] text-zinc-900 dark:text-zinc-100 border-zinc-200 dark:border-zinc-800 hover:border-[#D4AF37]/40 hover:shadow-sm active:scale-[0.99]"
            >
              <div className="flex items-center gap-2">
                <Plus className="w-4 h-4 text-[#D4AF37]" />
                <span>New Conversation</span>
              </div>
              <kbd className="hidden sm:inline-block text-[9px] font-mono px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-400">
                ⌘K
              </kbd>
            </button>
          </div>

          {/* Suites Navigation List */}
          <div className="flex-1 overflow-y-auto px-3 space-y-1 custom-scrollbar">
            <div className="px-2 py-1.5 text-[9.5px] font-mono font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              Sovereign Ecosystem
            </div>

            {suites.map((suite) => {
              const Icon = suite.icon;
              const isSelected = activeTab === suite.id || (suite.id === 'home' && activeTab === 'arohi');

              return (
                <button
                  key={suite.id}
                  onClick={() => {
                    setActiveTab(suite.id);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left transition-all cursor-pointer group ${
                    isSelected
                      ? isDarkMode
                        ? 'bg-[#1C1F28] text-white border border-white/10 shadow-xs'
                        : 'bg-white text-zinc-900 border border-black/8 shadow-xs'
                      : 'hover:bg-black/5 dark:hover:bg-white/5 text-zinc-600 dark:text-zinc-400 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-[#D4AF37]/15 text-[#D4AF37]'
                          : 'bg-zinc-200/60 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-semibold truncate leading-tight">
                        {suite.label}
                      </div>
                      <div className="text-[9.5px] text-zinc-400 truncate leading-tight mt-0.5">
                        {suite.description}
                      </div>
                    </div>
                  </div>

                  {suite.badge && (
                    <span
                      className={`text-[8.5px] font-mono font-bold uppercase px-1.5 py-0.5 rounded-full shrink-0 ${
                        suite.badgeGold
                          ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30'
                          : isSelected
                          ? 'bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
                          : 'bg-black/5 dark:bg-white/5 text-zinc-400'
                      }`}
                    >
                      {suite.badge}
                    </span>
                  )}
                </button>
              );
            })}

            {/* Sovereign Divyangjan Portal Card */}
            <div className="pt-2">
              <button
                onClick={() => {
                  setActiveTab('home');
                  onNewChat();
                  // Pre-fill Divyangjan inquiry
                }}
                className="w-full p-2.5 rounded-xl border border-amber-500/20 bg-amber-500/5 hover:bg-amber-500/10 text-left transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs">♿</span>
                  <span className="text-[11px] font-bold text-amber-700 dark:text-amber-300">
                    Divyangjan Portal (PwD)
                  </span>
                </div>
                <p className="text-[9px] text-zinc-500 dark:text-zinc-400 leading-tight">
                  RPwD Act 2016 4% job reservation, UDID &amp; ADIP aid guides.
                </p>
              </button>
            </div>
          </div>

          {/* Bottom Footer: Account, Pro Status, Language & Theme */}
          <div className="p-3 border-t border-black/6 dark:border-white/6 space-y-2 bg-black/[0.02] dark:bg-white/[0.01]">
            {/* Free Trial / Membership Status Card */}
            {!hasActiveSubscription && isTrialActive ? (
              <div
                onClick={onUpgradeClick}
                className="p-2.5 rounded-xl bg-gradient-to-r from-amber-500/10 to-blue-500/10 border border-amber-500/30 cursor-pointer hover:border-amber-500/50 transition-all flex items-center justify-between"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-1 text-[10.5px] font-bold text-amber-600 dark:text-amber-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Free Trial Active</span>
                  </div>
                  <div className="text-[9px] text-zinc-500 font-mono mt-0.5">
                    {remainingHours}h {remainingMinutes}m remaining
                  </div>
                </div>
                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-amber-500 text-zinc-950 uppercase tracking-wider shadow-xs">
                  Upgrade
                </span>
              </div>
            ) : hasActiveSubscription ? (
              <div
                onClick={onUpgradeClick}
                className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 cursor-pointer flex items-center justify-between"
              >
                <div className="flex items-center gap-1.5">
                  <Crown className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-[10.5px] font-bold text-emerald-600 dark:text-emerald-400">
                    Sovereign Pro Member
                  </span>
                </div>
                <span className="text-[8px] font-mono text-emerald-500 font-bold uppercase">
                  Active
                </span>
              </div>
            ) : (
              <div
                onClick={onUpgradeClick}
                className="p-2 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-[#D4AF37]/50 cursor-pointer flex items-center justify-between transition-colors"
              >
                <span className="text-[10px] font-semibold text-zinc-600 dark:text-zinc-300">
                  Upgrade to Sovereign Pro
                </span>
                <span className="text-[9px] font-bold text-[#D4AF37]">₹399/mo</span>
              </div>
            )}

            {/* Arohi Coins & Rewards Pill */}
            {arohiCoinBalance > 0 && (
              <div className="flex items-center justify-between px-2 py-1 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[10px] font-bold border border-amber-500/20">
                <div className="flex items-center gap-1.5">
                  <Coins className="w-3 h-3 text-amber-500" />
                  <span>Arohi Coins</span>
                </div>
                <span className="font-mono font-black">{arohiCoinBalance}</span>
              </div>
            )}

            {/* Controls Bar: Language, Theme, Auth */}
            <div className="flex items-center justify-between pt-1 gap-1">
              {/* Language Selector Trigger */}
              <button
                onClick={() => setIsLangModalOpen(true)}
                className="flex items-center gap-1 px-2 py-1 rounded-lg text-[10.5px] font-medium text-zinc-600 dark:text-zinc-400 hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer transition-colors border border-transparent hover:border-black/5"
                title="Select language"
              >
                <Globe className="w-3 h-3 text-zinc-400" />
                <span className="truncate max-w-[65px]">{currentLangObj.native}</span>
              </button>

              <div className="flex items-center gap-1">
                {/* Theme Toggle */}
                <button
                  onClick={onToggleTheme}
                  className="p-1.5 rounded-lg text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
                  title={isDarkMode ? 'Switch to Linen Light' : 'Switch to Obsidian Dark'}
                >
                  {isDarkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
                </button>

                {/* Profile / Auth Button */}
                <button
                  onClick={onOpenAuth}
                  className="flex items-center gap-1 p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer transition-colors"
                  title={user ? user.email : 'Sign in'}
                >
                  <div className="w-6 h-6 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-300 font-bold text-[10px] border border-black/10 dark:border-white/10">
                    {user ? (user.displayName?.[0] || user.email?.[0] || 'U').toUpperCase() : <User className="w-3 h-3" />}
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Language Selector Modal */}
      <AnimatePresence>
        {isLangModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsLangModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className={`relative z-10 w-full max-w-md rounded-2xl p-5 border shadow-2xl overflow-hidden flex flex-col max-h-[80vh] ${
                isDarkMode ? 'bg-[#15171E] border-white/10 text-white' : 'bg-white border-zinc-200 text-zinc-900'
              }`}
            >
              <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-[#D4AF37]" />
                  <h3 className="text-sm font-bold">150+ Multilingual Access</h3>
                </div>
                <button
                  onClick={() => setIsLangModalOpen(false)}
                  className="text-xs text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="py-3">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-zinc-400" />
                  <input
                    type="text"
                    placeholder="Search languages (Odia, Hindi, English, Spanish...)"
                    value={langSearch}
                    onChange={(e) => setLangSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto grid grid-cols-2 gap-1.5 pr-1 custom-scrollbar">
                {LANGUAGES_LIST.filter(
                  (l) =>
                    l.native.toLowerCase().includes(langSearch.toLowerCase()) ||
                    l.english.toLowerCase().includes(langSearch.toLowerCase()) ||
                    l.code.toLowerCase().includes(langSearch.toLowerCase())
                ).map((l) => {
                  const isSelected = language === l.code;
                  return (
                    <button
                      key={l.code}
                      onClick={() => {
                        onLanguageChange(l.code as Language);
                        setIsLangModalOpen(false);
                      }}
                      className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#D4AF37]/15 border-[#D4AF37] text-zinc-900 dark:text-zinc-100 font-bold'
                          : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 text-zinc-600 dark:text-zinc-300'
                      }`}
                    >
                      <div className="text-xs font-semibold truncate">{l.native}</div>
                      <div className="text-[10px] text-zinc-400 truncate">{l.english}</div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SovereignSidebar;
