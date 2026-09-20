import React, { useState } from 'react';
import { Home, Package, LayoutGrid, Compass, MoreHorizontal, X, User, Sparkles, MessageSquare, ShieldCheck, Briefcase, FileText, CreditCard, HelpCircle, Phone, Globe, Stethoscope } from 'lucide-react';
import { Language } from '../translations';

interface BottomNavBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  language?: Language;
  onQuickChat?: (prompt: string) => void;
  setIsChatOpen?: (isOpen: boolean) => void;
  isChatOpen?: boolean;
  isChatMinimized?: boolean;
  setIsChatMinimized?: (isMin: boolean) => void;
  isDarkMode?: boolean;
  onOpenSidebar?: () => void;
}

export default function BottomNavBar({ 
  activeTab, 
  onTabChange, 
  onQuickChat,
  setIsChatOpen,
  isChatOpen,
  isChatMinimized,
  setIsChatMinimized,
  isDarkMode = true,
  onOpenSidebar
}: BottomNavBarProps) {
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  // Active state determinations matching mock-up
  const isHomeActive = activeTab === 'home';
  const isProductsActive = [
    'business-os', 
    'assistant', 
    'calling-agents', 
    'exams', 
    'institutions', 
    'govt',
    'products'
  ].includes(activeTab);

  const isSolutionsActive = [
    'tools', 
    'solutions', 
    'syllabus', 
    'courses'
  ].includes(activeTab);

  const isOpportunitiesActive = [
    'opportunities', 
    'jobs', 
    'mission87', 
    'career', 
    'resume'
  ].includes(activeTab);

  const isMoreActive = [
    'dashboard', 
    'profile', 
    'account', 
    'pricing', 
    'admin', 
    'partner', 
    'franchise', 
    'faqs', 
    'contact', 
    'blogs'
  ].includes(activeTab) || isMoreMenuOpen;

  const handleProductsClick = () => {
    setIsMoreMenuOpen(false);
    if (activeTab === 'home') {
      const el = document.getElementById('ecosystem-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 500, behavior: 'smooth' });
      }
    } else {
      onTabChange('home');
      setTimeout(() => {
        const el = document.getElementById('ecosystem-section');
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    }
  };

  const handleSolutionsClick = () => {
    setIsMoreMenuOpen(false);
    if (activeTab === 'home') {
      const el = document.getElementById('solutions-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        onTabChange('tools');
      }
    } else {
      onTabChange('tools');
    }
  };

  const handleMoreClick = () => {
    if (onOpenSidebar) {
      onOpenSidebar();
    } else {
      setIsMoreMenuOpen(prev => !prev);
    }
  };

  return (
    <>
      {/* Quick "More" Modal Drawer if sidebar handler not present or on click */}
      {isMoreMenuOpen && (
        <div 
          className="fixed inset-0 z-[85] bg-black/60 backdrop-blur-sm flex flex-col justify-end animate-in fade-in duration-200"
          onClick={() => setIsMoreMenuOpen(false)}
        >
          <div 
            className={`w-full max-w-md mx-auto rounded-t-3xl border-t border-x p-5 space-y-4 shadow-2xl mb-16 animate-in slide-in-from-bottom duration-250 ${
              isDarkMode 
                ? 'bg-[#0f1424] border-zinc-800 text-white' 
                : 'bg-white border-zinc-200 text-zinc-900'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-black/5 dark:border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                <h3 className="text-sm font-black tracking-tight uppercase">Arohi AI Ecosystem & Suites</h3>
              </div>
              <button 
                onClick={() => setIsMoreMenuOpen(false)}
                className="p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs font-semibold">
              <button
                onClick={() => {
                  onTabChange('dashboard');
                  setIsMoreMenuOpen(false);
                }}
                className="p-3 rounded-xl border border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.03] hover:border-blue-500/40 text-left flex items-center gap-2.5 transition-all"
              >
                <User className="w-4 h-4 text-blue-500 shrink-0" />
                <span>My Profile & Wallet</span>
              </button>

              <button
                onClick={() => {
                  setIsMoreMenuOpen(false);
                  if (setIsChatOpen) setIsChatOpen(true);
                  if (setIsChatMinimized) setIsChatMinimized(false);
                  if (onQuickChat) onQuickChat("Hi Arohi, let's explore!");
                  onTabChange('arohi');
                }}
                className="p-3 rounded-xl border border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.03] hover:border-indigo-500/40 text-left flex items-center gap-2.5 transition-all"
              >
                <Sparkles className="w-4 h-4 text-indigo-500 shrink-0" />
                <span>Ask Arohi AI</span>
              </button>

              <button
                onClick={() => {
                  onTabChange('mission87');
                  setIsMoreMenuOpen(false);
                }}
                className="p-3 rounded-xl border border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.03] hover:border-emerald-500/40 text-left flex items-center gap-2.5 transition-all"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Mission 87 Portal</span>
              </button>

              <button
                onClick={() => {
                  onTabChange('vetmitra');
                  setIsMoreMenuOpen(false);
                }}
                className="p-3 rounded-xl border border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.03] hover:border-teal-500/40 text-left flex items-center gap-2.5 transition-all"
              >
                <Stethoscope className="w-4 h-4 text-teal-500 shrink-0" />
                <span>Arohi VetMitra™</span>
              </button>

              <button
                onClick={() => {
                  onTabChange('pricing');
                  setIsMoreMenuOpen(false);
                }}
                className="p-3 rounded-xl border border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.03] hover:border-amber-500/40 text-left flex items-center gap-2.5 transition-all"
              >
                <CreditCard className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Pricing Plans</span>
              </button>

              <button
                onClick={() => {
                  onTabChange('resume');
                  setIsMoreMenuOpen(false);
                }}
                className="p-3 rounded-xl border border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.03] hover:border-purple-500/40 text-left flex items-center gap-2.5 transition-all"
              >
                <FileText className="w-4 h-4 text-purple-500 shrink-0" />
                <span>ATS Resume AI</span>
              </button>

              <button
                onClick={() => {
                  onTabChange('faqs');
                  setIsMoreMenuOpen(false);
                }}
                className="p-3 rounded-xl border border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.03] hover:border-rose-500/40 text-left flex items-center gap-2.5 transition-all"
              >
                <HelpCircle className="w-4 h-4 text-rose-500 shrink-0" />
                <span>FAQs &amp; Help Desk</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5-Item Bottom Navigation Bar matching the Mockup */}
      <nav 
        id="arohi-bottom-nav-bar"
        className={`fixed bottom-0 left-0 right-0 z-[80] transition-all duration-300 font-sans border-t select-none ${
          isDarkMode 
            ? 'bg-[#0b0e17]/96 border-zinc-800/80 text-zinc-400 backdrop-blur-xl shadow-[0_-8px_30px_rgba(0,0,0,0.7)]' 
            : 'bg-white/98 border-zinc-200/90 text-zinc-500 backdrop-blur-xl shadow-[0_-4px_25px_rgba(0,0,0,0.06)]'
        }`}
      >
        <div className="max-w-lg mx-auto px-2 py-1.5 flex items-center justify-around">
          
          {/* 1. Home Tab */}
          <button
            type="button"
            id="nav-tab-home"
            onClick={() => {
              setIsMoreMenuOpen(false);
              onTabChange('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`flex-1 py-1 px-1 flex flex-col items-center justify-center gap-1 transition-all cursor-pointer rounded-xl group ${
              isHomeActive 
                ? 'text-blue-600 dark:text-blue-400 font-black' 
                : 'hover:text-blue-600 dark:hover:text-blue-400 text-zinc-500 dark:text-zinc-400'
            }`}
          >
            <div className={`transition-transform duration-200 group-hover:scale-110 ${isHomeActive ? 'scale-105' : ''}`}>
              <Home 
                className="w-5 h-5" 
                fill={isHomeActive ? "currentColor" : "none"} 
                strokeWidth={isHomeActive ? 2.5 : 2} 
              />
            </div>
            <span className={`text-[10px] sm:text-[11px] leading-none tracking-tight ${isHomeActive ? 'font-black' : 'font-semibold'}`}>
              Home
            </span>
          </button>

          {/* 2. Products Tab (Isometric 3D Box Icon) */}
          <button
            type="button"
            id="nav-tab-products"
            onClick={handleProductsClick}
            className={`flex-1 py-1 px-1 flex flex-col items-center justify-center gap-1 transition-all cursor-pointer rounded-xl group ${
              isProductsActive 
                ? 'text-blue-600 dark:text-blue-400 font-black' 
                : 'hover:text-blue-600 dark:hover:text-blue-400 text-zinc-500 dark:text-zinc-400'
            }`}
          >
            <div className={`transition-transform duration-200 group-hover:scale-110 ${isProductsActive ? 'scale-105' : ''}`}>
              <Package 
                className="w-5 h-5" 
                fill={isProductsActive ? "currentColor" : "none"} 
                fillOpacity={isProductsActive ? 0.2 : 0}
                strokeWidth={isProductsActive ? 2.5 : 2} 
              />
            </div>
            <span className={`text-[10px] sm:text-[11px] leading-none tracking-tight ${isProductsActive ? 'font-black' : 'font-semibold'}`}>
              Products
            </span>
          </button>

          {/* 3. Solutions Tab (2x2 Grid Icon) */}
          <button
            type="button"
            id="nav-tab-solutions"
            onClick={handleSolutionsClick}
            className={`flex-1 py-1 px-1 flex flex-col items-center justify-center gap-1 transition-all cursor-pointer rounded-xl group ${
              isSolutionsActive 
                ? 'text-blue-600 dark:text-blue-400 font-black' 
                : 'hover:text-blue-600 dark:hover:text-blue-400 text-zinc-500 dark:text-zinc-400'
            }`}
          >
            <div className={`transition-transform duration-200 group-hover:scale-110 ${isSolutionsActive ? 'scale-105' : ''}`}>
              <LayoutGrid 
                className="w-5 h-5" 
                fill={isSolutionsActive ? "currentColor" : "none"} 
                strokeWidth={isSolutionsActive ? 2.5 : 2} 
              />
            </div>
            <span className={`text-[10px] sm:text-[11px] leading-none tracking-tight ${isSolutionsActive ? 'font-black' : 'font-semibold'}`}>
              Solutions
            </span>
          </button>

          {/* 4. Opportunities Tab (Compass Icon) */}
          <button
            type="button"
            id="nav-tab-opportunities"
            onClick={() => {
              setIsMoreMenuOpen(false);
              onTabChange('opportunities');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`flex-1 py-1 px-1 flex flex-col items-center justify-center gap-1 transition-all cursor-pointer rounded-xl group ${
              isOpportunitiesActive 
                ? 'text-blue-600 dark:text-blue-400 font-black' 
                : 'hover:text-blue-600 dark:hover:text-blue-400 text-zinc-500 dark:text-zinc-400'
            }`}
          >
            <div className={`transition-transform duration-200 group-hover:scale-110 ${isOpportunitiesActive ? 'scale-105' : ''}`}>
              <Compass 
                className="w-5 h-5" 
                strokeWidth={isOpportunitiesActive ? 2.5 : 2} 
              />
            </div>
            <span className={`text-[10px] sm:text-[11px] leading-none tracking-tight ${isOpportunitiesActive ? 'font-black' : 'font-semibold'}`}>
              Opportunities
            </span>
          </button>

          {/* 5. More Tab (3 Horizontal Dots Icon) */}
          <button
            type="button"
            id="nav-tab-more"
            onClick={handleMoreClick}
            className={`flex-1 py-1 px-1 flex flex-col items-center justify-center gap-1 transition-all cursor-pointer rounded-xl group ${
              isMoreActive 
                ? 'text-blue-600 dark:text-blue-400 font-black' 
                : 'hover:text-blue-600 dark:hover:text-blue-400 text-zinc-500 dark:text-zinc-400'
            }`}
          >
            <div className={`transition-transform duration-200 group-hover:scale-110 ${isMoreActive ? 'scale-105' : ''}`}>
              <MoreHorizontal 
                className="w-5 h-5" 
                strokeWidth={isMoreActive ? 3 : 2} 
              />
            </div>
            <span className={`text-[10px] sm:text-[11px] leading-none tracking-tight ${isMoreActive ? 'font-black' : 'font-semibold'}`}>
              More
            </span>
          </button>

        </div>
      </nav>
    </>
  );
}
