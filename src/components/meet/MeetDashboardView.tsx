import React, { useState } from 'react';
import { 
  Bell, 
  Video, 
  Users, 
  Calendar, 
  FileText, 
  Sparkles, 
  Settings, 
  ArrowRight, 
  MoreVertical, 
  CheckCircle2, 
  MessageSquare, 
  Send,
  Home,
  BarChart3,
  Flame,
  Search
} from 'lucide-react';
import ArohiMeetLogo from './ArohiMeetLogo';
import ArohiMeetAvatar from './ArohiMeetAvatar';
import { MeetingSession, getInitials, getAvatarColor } from './meetData';

interface MeetDashboardViewProps {
  currentMeeting: MeetingSession;
  onStartMeeting: () => void;
  onJoinMeeting: () => void;
  onScheduleMeeting: () => void;
  onOpenMyMeetings: () => void;
  onOpenAskArohi: (initialQuery?: string) => void;
  onOpenSettings: () => void;
  onOpenUpcomingMeeting: (meeting: MeetingSession) => void;
  onOpenMinutesOfMeeting: () => void;
  onOpenLiveTranscript: () => void;
  onOpenActionTracker: () => void;
  onOpenSmartSummary: () => void;
  activeNavTab?: 'home' | 'meetings' | 'assistant' | 'contacts' | 'more';
  onNavTabChange?: (tab: 'home' | 'meetings' | 'assistant' | 'contacts' | 'more') => void;
}

export const MeetDashboardView: React.FC<MeetDashboardViewProps> = ({
  currentMeeting,
  onStartMeeting,
  onJoinMeeting,
  onScheduleMeeting,
  onOpenMyMeetings,
  onOpenAskArohi,
  onOpenSettings,
  onOpenUpcomingMeeting,
  onOpenMinutesOfMeeting,
  onOpenLiveTranscript,
  onOpenActionTracker,
  onOpenSmartSummary,
  activeNavTab = 'home',
  onNavTabChange
}) => {
  const [askInput, setAskInput] = useState('');
  const [currentUserName] = useState(() => localStorage.getItem('arohi_meet_user_name') || 'Leader');
  const userAvatarColor = getAvatarColor(currentUserName);
  const userInitials = getInitials(currentUserName);

  const handleAskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (askInput.trim()) {
      onOpenAskArohi(askInput.trim());
      setAskInput('');
    }
  };

  return (
    <div className="relative min-h-[92vh] w-full flex flex-col justify-between overflow-x-hidden bg-[#070B14] text-white select-none pb-20">
      {/* Background Lighting Gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Content Container */}
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 pt-5 flex-1">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800/60">
          <ArohiMeetLogo size="sm" showTagline={false} />

          <div className="flex items-center gap-3">
            {/* Notification Bell */}
            <button className="relative p-2 rounded-full bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 text-slate-300 hover:text-white transition">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-[#070B14]" />
            </button>

            {/* User Profile Pill */}
            <div 
              onClick={onOpenSettings}
              className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-900/80 border border-slate-800 cursor-pointer hover:border-cyan-500/40 transition"
            >
              <div
                style={{ backgroundColor: userAvatarColor }}
                className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-bold shadow"
              >
                {userInitials}
              </div>
              <span className="text-xs font-medium text-slate-200">
                Hello, <span className="font-semibold text-white">{currentUserName}</span>
              </span>
              <span className="text-[10px] text-slate-400">⌵</span>
            </div>
          </div>
        </div>

        {/* Motivational Hero Headline & Neon Stamp */}
        <div className="py-5 flex items-center justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Every Meeting
            </h1>
            <p className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-400">
              A Brighter Tomorrow
            </p>
            <p className="text-[9px] uppercase tracking-[0.25em] text-slate-400 mt-1">
              MEET • DECIDE • REMEMBER • ACT
            </p>
          </div>

          {/* Holographic Script Stamp */}
          <div className="hidden sm:block p-3 rounded-2xl bg-gradient-to-br from-indigo-950/40 via-purple-950/30 to-transparent border border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.15)] transform -rotate-2">
            <p className="text-xs font-serif italic text-purple-300 tracking-wide">
              Ideas
            </p>
            <p className="text-xs font-serif italic text-sky-300 tracking-wide">
              Decisions
            </p>
            <p className="text-xs font-serif italic text-emerald-300 tracking-wide">
              Action
            </p>
            <p className="text-xs font-serif italic text-white tracking-wide flex items-center gap-1 font-semibold">
              Together <span className="text-purple-400 not-italic">✦</span>
            </p>
          </div>
        </div>

        {/* Quick Action Large Dual Launchers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-4">
          {/* Start a Meeting */}
          <button
            onClick={onStartMeeting}
            className="group relative overflow-hidden rounded-2xl p-5 bg-gradient-to-r from-[#0369a1] via-[#0284c7] to-[#0ea5e9] text-left shadow-[0_0_25px_rgba(14,165,233,0.35)] hover:shadow-[0_0_35px_rgba(14,165,233,0.55)] transition duration-300 active:scale-[0.99]"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-11 h-11 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shadow-inner">
                <Video className="w-6 h-6" />
              </div>
              <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:translate-x-1 transition">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
            <h3 className="text-lg font-bold text-white mb-0.5">Start a Meeting</h3>
            <p className="text-xs text-sky-100 font-light">Instant. Secure. Smart.</p>
          </button>

          {/* Join a Meeting */}
          <button
            onClick={onJoinMeeting}
            className="group relative overflow-hidden rounded-2xl p-5 bg-gradient-to-r from-[#6b21a8] via-[#7c3aed] to-[#9333ea] text-left shadow-[0_0_25px_rgba(147,51,234,0.35)] hover:shadow-[0_0_35px_rgba(147,51,234,0.55)] transition duration-300 active:scale-[0.99]"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-11 h-11 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shadow-inner">
                <Users className="w-6 h-6" />
              </div>
              <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:translate-x-1 transition">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
            <h3 className="text-lg font-bold text-white mb-0.5">Join a Meeting</h3>
            <p className="text-xs text-purple-100 font-light">Enter code or link</p>
          </button>
        </div>

        {/* 4 Secondary Action Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-6">
          <button
            onClick={onScheduleMeeting}
            className="p-3.5 rounded-2xl bg-[#0c1224]/80 border border-slate-800/80 hover:border-cyan-500/40 hover:bg-[#0f1730] transition text-left flex flex-col justify-between group"
          >
            <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 mb-2">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-white">Schedule</p>
              <p className="text-[10px] text-slate-400">Plan ahead with Arohi</p>
            </div>
          </button>

          <button
            onClick={onOpenMyMeetings}
            className="p-3.5 rounded-2xl bg-[#0c1224]/80 border border-slate-800/80 hover:border-purple-500/40 hover:bg-[#0f1730] transition text-left flex flex-col justify-between group"
          >
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-2">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-white">My Meetings</p>
              <p className="text-[10px] text-slate-400">Access past meetings</p>
            </div>
          </button>

          <button
            onClick={() => onOpenAskArohi()}
            className="p-3.5 rounded-2xl bg-[#0c1224]/80 border border-slate-800/80 hover:border-pink-500/40 hover:bg-[#0f1730] transition text-left flex flex-col justify-between group"
          >
            <div className="w-8 h-8 rounded-lg bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-400 mb-2">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-white">Ask Arohi</p>
              <p className="text-[10px] text-slate-400">Find anything instantly</p>
            </div>
          </button>

          <button
            onClick={onOpenSettings}
            className="p-3.5 rounded-2xl bg-[#0c1224]/80 border border-slate-800/80 hover:border-emerald-500/40 hover:bg-[#0f1730] transition text-left flex flex-col justify-between group"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-2">
              <Settings className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-white">Settings</p>
              <p className="text-[10px] text-slate-400">Customize experience</p>
            </div>
          </button>
        </div>

        {/* Upcoming Meetings Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-white tracking-wide">
              Upcoming Meetings
            </h2>
            <button
              onClick={onOpenMyMeetings}
              className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition"
            >
              View All <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Meeting Card */}
          <div
            onClick={() => onOpenUpcomingMeeting(currentMeeting)}
            className="p-4 rounded-2xl bg-[#0c1224]/90 border border-slate-800 hover:border-cyan-500/50 cursor-pointer transition duration-200 group relative"
          >
            <div className="flex items-start gap-3.5">
              {/* Date Box */}
              <div className="w-14 h-14 rounded-xl bg-slate-900 border border-slate-700/80 flex flex-col items-center justify-center text-center flex-shrink-0">
                <span className="text-lg font-black text-white leading-none">{new Date().getDate()}</span>
                <span className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider mt-0.5">
                  {new Date().toLocaleString('en-US', { month: 'short' }).toUpperCase()}
                </span>
              </div>

              {/* Info Block */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h3 className="text-sm sm:text-base font-semibold text-white truncate group-hover:text-cyan-400 transition">
                    {currentMeeting.title}
                  </h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 flex-shrink-0">
                    Starting in 15 min
                  </span>
                </div>

                <p className="text-xs text-slate-400 flex items-center gap-2 mb-1.5 flex-wrap">
                  <span>🕒 {currentMeeting.timeRange}</span>
                  <span>•</span>
                  <span>👥 {currentMeeting.participantsCount} Participants</span>
                </p>

                <p className="text-xs text-slate-300 line-clamp-1">
                  {currentMeeting.description}
                </p>
              </div>

              <button className="text-slate-500 hover:text-slate-300 p-1">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* AI Meeting Tools Section */}
        <div className="mb-6">
          <div className="flex items-baseline justify-between mb-3">
            <h2 className="text-sm font-semibold text-white flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              AI Meeting Tools
            </h2>
            <span className="text-[11px] text-slate-400">
              Powerful tools for smarter meetings
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* AI Minutes */}
            <div
              onClick={onOpenMinutesOfMeeting}
              className="p-3.5 rounded-2xl bg-[#0c1224]/80 border border-slate-800 hover:border-cyan-500/40 cursor-pointer transition flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 flex-shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-white group-hover:text-cyan-300 transition">
                  AI Minutes
                </h4>
                <p className="text-[11px] text-slate-400">
                  Auto-generate minutes of meeting
                </p>
              </div>
            </div>

            {/* Live Transcript */}
            <div
              onClick={onOpenLiveTranscript}
              className="p-3.5 rounded-2xl bg-[#0c1224]/80 border border-slate-800 hover:border-purple-500/40 cursor-pointer transition flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 flex-shrink-0 font-bold text-xs">
                CC
              </div>
              <div>
                <h4 className="text-xs font-semibold text-white group-hover:text-purple-300 transition">
                  Live Transcript
                </h4>
                <p className="text-[11px] text-slate-400">
                  Real-time captions & translation
                </p>
              </div>
            </div>

            {/* Action Tracker */}
            <div
              onClick={onOpenActionTracker}
              className="p-3.5 rounded-2xl bg-[#0c1224]/80 border border-slate-800 hover:border-emerald-500/40 cursor-pointer transition flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 flex-shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-white group-hover:text-emerald-300 transition">
                  Action Tracker
                </h4>
                <p className="text-[11px] text-slate-400">
                  Turn decisions into actions
                </p>
              </div>
            </div>

            {/* Smart Summary */}
            <div
              onClick={onOpenSmartSummary}
              className="p-3.5 rounded-2xl bg-[#0c1224]/80 border border-slate-800 hover:border-amber-500/40 cursor-pointer transition flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 flex-shrink-0">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-white group-hover:text-amber-300 transition">
                  Smart Summary
                </h4>
                <p className="text-[11px] text-slate-400">
                  Key points, decisions & follow-ups
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Persistent Ask Arohi Copilot Banner */}
        <div className="p-3 rounded-2xl bg-gradient-to-r from-indigo-950/60 via-slate-900 to-[#0c1224] border border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.15)] flex flex-col sm:flex-row items-center gap-3 mb-4">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <ArohiMeetAvatar size="sm" status="listening" showBadge />
            <div>
              <p className="text-xs font-semibold text-white flex items-center gap-1">
                <span>Ask Arohi</span>
                <span className="text-[10px] text-cyan-400 font-normal">✦</span>
              </p>
              <p className="text-[10px] text-slate-400">Your AI Meeting Assistant</p>
            </div>
          </div>

          <form onSubmit={handleAskSubmit} className="flex-1 w-full flex items-center gap-2">
            <input
              type="text"
              value={askInput}
              onChange={(e) => setAskInput(e.target.value)}
              placeholder="Ask anything about your meetings..."
              className="flex-1 px-4 py-2 rounded-xl bg-slate-950/80 border border-slate-700/80 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition"
            />
            <button
              type="submit"
              className="w-8 h-8 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-md hover:scale-105 active:scale-95 transition"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Nav Bar matching mobile mockup Screen 3 */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-[#070B14]/95 border-t border-slate-800/80 backdrop-blur-xl py-2 px-6">
        <div className="max-w-md mx-auto flex items-center justify-between text-center">
          <button
            onClick={() => onNavTabChange?.('home')}
            className={`flex flex-col items-center gap-0.5 text-xs transition ${
              activeNavTab === 'home' ? 'text-cyan-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Home className="w-4 h-4" />
            <span className="text-[10px]">Home</span>
          </button>

          <button
            onClick={() => onNavTabChange?.('meetings')}
            className={`flex flex-col items-center gap-0.5 text-xs transition ${
              activeNavTab === 'meetings' ? 'text-cyan-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span className="text-[10px]">Meetings</span>
          </button>

          <button
            onClick={() => onNavTabChange?.('assistant')}
            className={`flex flex-col items-center gap-0.5 text-xs transition ${
              activeNavTab === 'assistant' ? 'text-cyan-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-[10px]">AI Assistant</span>
          </button>

          <button
            onClick={() => onNavTabChange?.('contacts')}
            className={`flex flex-col items-center gap-0.5 text-xs transition ${
              activeNavTab === 'contacts' ? 'text-cyan-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Users className="w-4 h-4" />
            <span className="text-[10px]">Contacts</span>
          </button>

          <button
            onClick={() => onNavTabChange?.('more')}
            className={`flex flex-col items-center gap-0.5 text-xs transition ${
              activeNavTab === 'more' ? 'text-cyan-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <MoreVertical className="w-4 h-4" />
            <span className="text-[10px]">More</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MeetDashboardView;
