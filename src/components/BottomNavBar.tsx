import React from 'react';
import { Home, MessageSquare, Grid, User } from 'lucide-react';
import { Language } from '../translations';
import ArohiAvatar from './ArohiAvatar';

interface BottomNavBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  language: Language;
  onQuickChat?: (prompt: string) => void;
  setIsChatOpen?: (isOpen: boolean) => void;
  isChatOpen?: boolean;
  isChatMinimized?: boolean;
  setIsChatMinimized?: (isMin: boolean) => void;
  isDarkMode?: boolean;
}

export default function BottomNavBar({ 
  activeTab, 
  onTabChange, 
  onQuickChat,
  setIsChatOpen,
  isChatOpen,
  isChatMinimized,
  setIsChatMinimized,
  isDarkMode = true
}: BottomNavBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-[80] p-3 pointer-events-none font-sans">
      <div className={`max-w-md mx-auto rounded-3xl border px-5 py-2.5 flex items-center justify-between pointer-events-auto backdrop-blur-2xl shadow-2xl transition-all duration-300 ${
        isDarkMode 
          ? 'bg-[#0a0f20]/92 border-blue-500/20 text-slate-400 shadow-[0_15px_50px_rgba(0,0,0,0.85)]' 
          : 'bg-white/90 border-slate-200/90 text-slate-600 shadow-[0_12px_45px_-8px_rgba(37,99,235,0.12)]'
      }`}>
        
        {/* Home Tab */}
        <button
          onClick={() => {
            onTabChange('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center gap-0.5 py-1 px-2.5 transition-all cursor-pointer rounded-xl ${
            activeTab === 'home' 
              ? 'text-blue-600 dark:text-blue-400 font-black scale-105' 
              : 'hover:text-blue-600 dark:hover:text-blue-400 text-slate-500 dark:text-slate-400'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-bold">Home</span>
        </button>

        {/* Chat Tab */}
        <button
          onClick={() => {
            onTabChange('arohi');
            if (setIsChatOpen) setIsChatOpen(true);
            if (setIsChatMinimized) setIsChatMinimized(false);
            if (onQuickChat) onQuickChat("Hi Arohi, let's chat!");
          }}
          className={`flex flex-col items-center gap-0.5 py-1 px-2.5 transition-all cursor-pointer rounded-xl ${
            activeTab === 'arohi' 
              ? 'text-blue-600 dark:text-blue-400 font-black scale-105' 
              : 'hover:text-blue-600 dark:hover:text-blue-400 text-slate-500 dark:text-slate-400'
          }`}
        >
          <MessageSquare className="w-5 h-5" />
          <span className="text-[10px] font-bold">Chat</span>
        </button>

        {/* Central Ask Arohi Floating Avatar Button */}
        <div className="relative -mt-9 flex flex-col items-center justify-center">
          {/* ASK AROHI! Floating Animated Pill Badge */}
          <div className="mb-1 bg-gradient-to-r from-[#091533] via-[#1d4ed8] to-[#2563eb] text-white px-3 py-0.5 rounded-full border border-blue-400/60 text-[9px] font-black tracking-wider uppercase shadow-[0_4px_18px_rgba(37,99,235,0.45)] backdrop-blur-md flex items-center gap-1.5 whitespace-nowrap select-none pointer-events-none z-20 animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00e676] animate-ping shrink-0"></span>
            <span>ASK AROHI! ✨</span>
          </div>

          {/* Core Circular Avatar Button */}
          <button
            onClick={() => {
              if (isChatOpen) {
                if (isChatMinimized) {
                  if (setIsChatMinimized) setIsChatMinimized(false);
                } else {
                  if (setIsChatOpen) setIsChatOpen(false);
                }
              } else {
                if (setIsChatOpen) setIsChatOpen(true);
                if (setIsChatMinimized) setIsChatMinimized(false);
                onTabChange('arohi');
              }
            }}
            className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full p-0 bg-transparent active:scale-95 transition-all duration-300 shadow-[0_8px_32px_rgba(37,99,235,0.4)] border-2 border-blue-400 hover:border-cyan-300 cursor-pointer overflow-visible group"
            title="Talk to AROHI"
          >
            {/* The Arohi image filling the entire button */}
            <div className="w-full h-full rounded-full overflow-hidden bg-[#080c18]">
              <ArohiAvatar className="w-full h-full scale-[1.08] object-cover transition-transform duration-500 group-hover:scale-120" />
            </div>

            {/* Glowing ring animation */}
            <span className="absolute inset-0 rounded-full border-2 border-blue-400/40 animate-ping opacity-60 pointer-events-none"></span>

            {/* Active green status light */}
            <span className="absolute bottom-0.5 right-0.5 w-4 h-4 bg-[#00e676] rounded-full border-2 border-[#080c18] z-10 shadow-[0_0_8px_#00e676]"></span>
          </button>
        </div>

        {/* Tools Tab */}
        <button
          onClick={() => {
            onTabChange('tools');
          }}
          className={`flex flex-col items-center gap-0.5 py-1 px-2.5 transition-all cursor-pointer rounded-xl ${
            activeTab === 'tools' || activeTab === 'syllabus'
              ? 'text-blue-600 dark:text-blue-400 font-black scale-105' 
              : 'hover:text-blue-600 dark:hover:text-blue-400 text-slate-500 dark:text-slate-400'
          }`}
        >
          <Grid className="w-5 h-5" />
          <span className="text-[10px] font-bold">Tools</span>
        </button>

        {/* Profile Tab */}
        <button
          onClick={() => {
            onTabChange('dashboard');
          }}
          className={`flex flex-col items-center gap-0.5 py-1 px-2.5 transition-all cursor-pointer rounded-xl ${
            activeTab === 'dashboard' || activeTab === 'account' || activeTab === 'profile'
              ? 'text-blue-600 dark:text-blue-400 font-black scale-105' 
              : 'hover:text-blue-600 dark:hover:text-blue-400 text-slate-500 dark:text-slate-400'
          }`}
        >
          <User className="w-5 h-5" />
          <span className="text-[10px] font-bold">Profile</span>
        </button>

      </div>
    </div>
  );
}


