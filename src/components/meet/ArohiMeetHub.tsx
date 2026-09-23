import React, { useState, useEffect } from 'react';
import { 
  getCurrentMeeting, 
  saveMeeting, 
  getStoredMeetings, 
  DEFAULT_MEETING, 
  DEMO_MEETING,
  createRealMeetingSession,
  MeetingSession 
} from './meetData';
import MeetLandingView from './MeetLandingView';
import MeetDashboardView from './MeetDashboardView';
import MeetSetupView from './MeetSetupView';
import MeetRoomView from './MeetRoomView';
import MeetTranscriptView from './MeetTranscriptView';
import MeetPostMeetingView from './MeetPostMeetingView';
import MeetAskArohiView from './MeetAskArohiView';
import { X, Video, Users } from 'lucide-react';

export type ArohiMeetView = 
  | 'splash' 
  | 'home' 
  | 'setup' 
  | 'room' 
  | 'transcript' 
  | 'post' 
  | 'ask-arohi';

interface ArohiMeetHubProps {
  initialView?: ArohiMeetView;
  onExit?: () => void;
}

export const ArohiMeetHub: React.FC<ArohiMeetHubProps> = ({
  initialView = 'home',
  onExit
}) => {
  const [currentView, setCurrentView] = useState<ArohiMeetView>(initialView);
  const [currentMeeting, setCurrentMeeting] = useState<MeetingSession>(() => getCurrentMeeting());
  const [askArohiInitialQuery, setAskArohiInitialQuery] = useState<string | undefined>();
  
  // Join Modal
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [joinCodeInput, setJoinCodeInput] = useState('');

  // Save changes whenever currentMeeting updates
  useEffect(() => {
    saveMeeting(currentMeeting);
  }, [currentMeeting]);

  // Handler for Start Instant Real Clean Meeting
  const handleStartInstantMeeting = () => {
    const freshRealSession = createRealMeetingSession('Live Strategy Session');
    setCurrentMeeting(freshRealSession);
    setCurrentView('room');
  };

  // Handler for Opening Mock Showcase Demo Meeting
  const handleOpenDemoShowcase = () => {
    setCurrentMeeting(DEMO_MEETING);
    setCurrentView('post');
  };

  // Handler for Launching from Setup Configurator
  const handleLaunchFromSetup = (config: Partial<MeetingSession>) => {
    const freshSession: MeetingSession = {
      ...createRealMeetingSession(config.title || 'Scheduled Meeting', config.agenda),
      ...config,
      status: 'live'
    };
    setCurrentMeeting(freshSession);
    setCurrentView('room');
  };

  // Handler for Joining Existing Meeting
  const handleJoinWithCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (joinCodeInput.trim()) {
      const code = joinCodeInput.trim();
      const existing = getStoredMeetings().find(
        (m) => m.code.toLowerCase() === code.toLowerCase() || m.id === code
      );
      if (existing) {
        setCurrentMeeting(existing);
      } else {
        // Create joined fresh session
        const freshJoined = createRealMeetingSession(`Room ${code.toUpperCase()}`);
        freshJoined.code = code.toUpperCase();
        setCurrentMeeting(freshJoined);
      }
      setIsJoinModalOpen(false);
      setJoinCodeInput('');
      setCurrentView('room');
    }
  };

  // Handler for ending meeting and moving to post-meeting MOM Hub
  const handleEndMeeting = (finalSession: MeetingSession) => {
    setCurrentMeeting(finalSession);
    setCurrentView('post');
  };

  // Open Ask Arohi with optional pre-filled prompt
  const handleOpenAskArohi = (query?: string) => {
    setAskArohiInitialQuery(query);
    setCurrentView('ask-arohi');
  };

  return (
    <div className="relative w-full min-h-screen bg-[#070B14] text-white">
      {/* 1. Splash Screen (Screen 2) */}
      {currentView === 'splash' && (
        <MeetLandingView
          onGetStarted={() => setCurrentView('home')}
          onSignIn={() => setCurrentView('home')}
        />
      )}

      {/* 2. Executive Dashboard (Screen 3) */}
      {currentView === 'home' && (
        <MeetDashboardView
          currentMeeting={currentMeeting}
          onStartMeeting={handleStartInstantMeeting}
          onJoinMeeting={() => setIsJoinModalOpen(true)}
          onScheduleMeeting={() => setCurrentView('setup')}
          onOpenMyMeetings={() => setCurrentView('post')}
          onOpenAskArohi={handleOpenAskArohi}
          onOpenSettings={() => setCurrentView('setup')}
          onOpenUpcomingMeeting={(m) => {
            setCurrentMeeting(m);
            setCurrentView('room');
          }}
          onOpenMinutesOfMeeting={() => setCurrentView('post')}
          onOpenLiveTranscript={() => setCurrentView('transcript')}
          onOpenActionTracker={() => setCurrentView('post')}
          onOpenSmartSummary={() => setCurrentView('post')}
          onNavTabChange={(tab) => {
            if (tab === 'meetings') setCurrentView('post');
            else if (tab === 'assistant') setCurrentView('ask-arohi');
            else if (tab === 'home') setCurrentView('home');
          }}
        />
      )}

      {/* 3. New Meeting / Schedule Setup (Screen 7) */}
      {currentView === 'setup' && (
        <MeetSetupView
          onBack={() => setCurrentView('home')}
          onLaunchMeeting={handleLaunchFromSetup}
          onScheduleForLater={() => setCurrentView('home')}
        />
      )}

      {/* 4. Active In-Call Room: Grid or Split (Screens 4 & 5) */}
      {currentView === 'room' && (
        <MeetRoomView
          meeting={currentMeeting}
          onEndMeeting={handleEndMeeting}
          onOpenAskArohi={handleOpenAskArohi}
          onOpenTranscriptView={() => setCurrentView('transcript')}
        />
      )}

      {/* 5. Dedicated Live Transcript & Linguistic Hub (Screen 8) */}
      {currentView === 'transcript' && (
        <MeetTranscriptView
          meeting={currentMeeting}
          onBack={() => setCurrentView('room')}
          onEndMeeting={() => handleEndMeeting(currentMeeting)}
          onOpenAskArohi={handleOpenAskArohi}
        />
      )}

      {/* 6. Post-Meeting Intelligence & MOM Hub (Screen 6) */}
      {currentView === 'post' && (
        <MeetPostMeetingView
          meeting={currentMeeting}
          onBack={() => setCurrentView('home')}
          onOpenAskArohi={handleOpenAskArohi}
          onOpenTranscript={() => setCurrentView('transcript')}
        />
      )}

      {/* 7. Dedicated "Ask Arohi" Meeting Assistant (Screen 9) */}
      {currentView === 'ask-arohi' && (
        <MeetAskArohiView
          meeting={currentMeeting}
          onBack={() => setCurrentView('home')}
          initialQuery={askArohiInitialQuery}
        />
      )}

      {/* ==================================================== */}
      {/* JOIN MEETING MODAL                                   */}
      {/* ==================================================== */}
      {isJoinModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md p-6 rounded-3xl bg-[#0c1224] border border-cyan-500/30 shadow-[0_0_40px_rgba(6,182,212,0.25)] relative">
            <button
              onClick={() => setIsJoinModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Join a Meeting</h3>
                <p className="text-xs text-slate-400">Enter your code or invite link</p>
              </div>
            </div>

            <form onSubmit={handleJoinWithCode} className="space-y-4">
              <div>
                <label className="text-xs text-slate-300 block mb-1 font-medium">
                  Meeting Code or Link
                </label>
                <input
                  type="text"
                  value={joinCodeInput}
                  onChange={(e) => setJoinCodeInput(e.target.value)}
                  placeholder="e.g. ARM-883-912 or https://meet.arohi.ai/..."
                  className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  autoFocus
                />
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 flex items-center justify-between">
                <span>Demo Code: <strong className="text-cyan-400 font-mono">ARM-883-912</strong></span>
                <button
                  type="button"
                  onClick={() => setJoinCodeInput('ARM-883-912')}
                  className="text-cyan-400 hover:underline text-[11px]"
                >
                  Insert
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-white font-bold text-sm shadow-[0_0_20px_rgba(147,51,234,0.4)] hover:shadow-[0_0_30px_rgba(147,51,234,0.6)] transition active:scale-95"
              >
                Join Meeting Now →
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArohiMeetHub;
