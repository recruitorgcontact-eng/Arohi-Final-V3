import React, { useState } from 'react';
import { Video, FileText, CheckCircle2, Users, ArrowRight, Globe } from 'lucide-react';
import ArohiMeetLogo from './ArohiMeetLogo';

interface MeetLandingViewProps {
  onGetStarted: () => void;
  onSignIn: () => void;
  onSelectLanguage?: (lang: string) => void;
}

export const MeetLandingView: React.FC<MeetLandingViewProps> = ({
  onGetStarted,
  onSignIn
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  const languages = ['English', 'हिंदी (Hindi)', 'ଓଡ଼ିଆ (Odia)', 'বাংলা (Bengali)', 'తెలుగు (Telugu)', 'தமிழ் (Tamil)', 'मराठी (Marathi)', 'Español', 'Français', 'Deutsch', 'العربية'];

  return (
    <div className="relative min-h-[92vh] w-full flex flex-col justify-between overflow-hidden bg-[#070B14] text-white select-none">
      {/* Twilight Skyline & High-Tech Executive Boardroom Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#070B14] via-[#090E1D]/90 to-[#05070E]" />
        
        {/* Soft Cosmic Aurora Rays */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-cyan-600/20 via-indigo-600/25 to-purple-600/20 blur-[120px] rounded-full" />
        
        {/* Boardroom Table Silhouette Graphic */}
        <div className="absolute bottom-28 inset-x-0 h-44 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-indigo-950/60 via-[#0a0f24]/80 to-transparent border-t border-cyan-500/10" />
      </div>

      {/* Top Bar with Narrative Header & Language Dropdown */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 pt-6 flex items-start justify-between">
        <div>
          <p className="text-sm md:text-base font-light text-slate-300">People</p>
          <p className="text-base md:text-lg font-semibold text-white">Share <span className="text-cyan-400">Ideas.</span></p>
          <p className="text-sm md:text-base font-light text-slate-300">Arohi Turns Them</p>
          <p className="text-base md:text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300">Into Progress.</p>
          <div className="w-12 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 mt-1 rounded-full" />
        </div>

        {/* Language Selector Pill */}
        <div className="relative">
          <button
            onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/60 text-xs text-slate-200 hover:border-cyan-500/50 hover:bg-slate-800 transition shadow-sm backdrop-blur-md"
          >
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span>{selectedLanguage}</span>
            <span className="text-[10px] text-slate-400">⌵</span>
          </button>

          {isLangDropdownOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-[#0F172A] border border-cyan-500/30 rounded-xl shadow-2xl py-1 z-50 backdrop-blur-xl">
              {languages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => {
                    setSelectedLanguage(lang);
                    setIsLangDropdownOpen(false);
                  }}
                  className="w-full text-left px-3 py-1.5 text-xs text-slate-300 hover:bg-cyan-500/20 hover:text-white transition"
                >
                  {lang}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Center Hero Section */}
      <div className="relative z-10 w-full max-w-xl mx-auto px-6 py-6 flex flex-col items-center text-center">
        {/* Large 3D Arohi Meet Emblem */}
        <div className="mb-4 transform hover:scale-105 transition duration-500">
          <ArohiMeetLogo size="hero" showTagline={false} />
        </div>

        {/* Tagline */}
        <p className="text-xs md:text-sm font-semibold tracking-[0.25em] text-slate-300 uppercase mb-2">
          MEET • DECIDE • REMEMBER • ACT
        </p>

        <p className="text-base md:text-xl font-light text-slate-300 mb-8 max-w-md">
          More than a meeting. <br />
          <span className="text-white font-medium">A smarter tomorrow.</span>
        </p>

        {/* 4 Feature Capsule Badges */}
        <div className="grid grid-cols-4 gap-2.5 md:gap-4 w-full mb-10">
          <div className="flex flex-col items-center p-3 rounded-2xl bg-[#0d1428]/80 border border-cyan-500/20 shadow-lg backdrop-blur-md hover:border-cyan-400/50 transition">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 mb-2">
              <Video className="w-5 h-5" />
            </div>
            <span className="text-[11px] md:text-xs font-medium text-slate-200 leading-tight">
              Video Meetings
            </span>
          </div>

          <div className="flex flex-col items-center p-3 rounded-2xl bg-[#0d1428]/80 border border-purple-500/20 shadow-lg backdrop-blur-md hover:border-purple-400/50 transition">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-400/40 flex items-center justify-center text-purple-300 mb-2">
              <FileText className="w-5 h-5" />
            </div>
            <span className="text-[11px] md:text-xs font-medium text-slate-200 leading-tight">
              AI Minutes of Meeting
            </span>
          </div>

          <div className="flex flex-col items-center p-3 rounded-2xl bg-[#0d1428]/80 border border-emerald-500/20 shadow-lg backdrop-blur-md hover:border-emerald-400/50 transition">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 mb-2">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <span className="text-[11px] md:text-xs font-medium text-slate-200 leading-tight">
              Action Tracking
            </span>
          </div>

          <div className="flex flex-col items-center p-3 rounded-2xl bg-[#0d1428]/80 border border-amber-500/20 shadow-lg backdrop-blur-md hover:border-amber-400/50 transition">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 mb-2">
              <Users className="w-5 h-5" />
            </div>
            <span className="text-[11px] md:text-xs font-medium text-slate-200 leading-tight">
              For Teams & Govt
            </span>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="w-full max-w-sm flex flex-col gap-3">
          <button
            onClick={onGetStarted}
            className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-fuchsia-600 text-white font-semibold text-sm md:text-base flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(6,182,212,0.45)] hover:shadow-[0_0_40px_rgba(6,182,212,0.65)] hover:scale-[1.02] active:scale-[0.98] transition"
          >
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onSignIn}
            className="w-full py-3 px-6 rounded-full bg-[#0a0f24]/90 border border-slate-700/80 text-slate-300 font-medium text-sm hover:text-white hover:border-cyan-500/50 transition active:scale-[0.98]"
          >
            Sign In
          </button>
        </div>
      </div>

      {/* Footer Sovereign Pride */}
      <div className="relative z-10 w-full py-4 text-center border-t border-slate-800/60 bg-[#050811]/90">
        <p className="text-xs text-slate-400 flex items-center justify-center gap-1.5 font-medium">
          Built with <span className="text-red-500">❤️</span> in India for a Smarter World 🇮🇳
        </p>
      </div>
    </div>
  );
};

export default MeetLandingView;
