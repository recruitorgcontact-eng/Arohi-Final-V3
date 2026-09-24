import React, { useState, useEffect } from 'react';
import { 
  getCurrentMeeting, 
  saveMeeting, 
  getStoredMeetings, 
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
import { X, Video, Users, Sparkles } from 'lucide-react';

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

  // Handle URL room param on mount (e.g. ?room=ARM-883-912 or ?meet=ARM-...)
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const roomParam = params.get('room') || params.get('meet') || params.get('join');
      if (roomParam) {
        const code = roomParam.trim().toUpperCase();
        const existing = getStoredMeetings().find(
          (m) => m.code.toUpperCase() === code || m.id === code
        );
        if (existing) {
          setCurrentMeeting(existing);
        } else {
          const freshJoined = createRealMeetingSession(`Room ${code}`);
          freshJoined.code = code;
          setCurrentMeeting(freshJoined);
        }
        // Take them to setup / green room so they can preview their camera & mic
        setCurrentView('setup');
      }
    } catch {}
  }, []);

  // Save changes whenever currentMeeting updates
  useEffect(() => {
    saveMeeting(currentMeeting);
  }, [currentMeeting]);

  // Handler for Start Instant Real Clean Meeting
  const handleStartInstantMeeting = () => {
    const savedName = localStorage.getItem('arohi_meet_user_name') || 'Host';
    const freshRealSession = createRealMeetingSession('Live Strategy Session', savedName, 'Host');
    setCurrentMeeting(freshRealSession);
    setCurrentView('setup');
  };

  // Handler for Launching from Setup Configurator
  const handleLaunchFromSetup = (config: Partial<MeetingSession>) => {
    const savedName = localStorage.getItem('arohi_meet_user_name') || config.organizer || 'Host';
    const freshSession: MeetingSession = {
      ...createRealMeetingSession(config.title || 'Live Strategy Session', savedName, 'Host', config.agenda),
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
      let code = joinCodeInput.trim();
      // Extract code if user pasted link
      if (code.includes('room=')) {
        const match = code.match(/room=([A-Za-z0-9\-]+)/);
        if (match) code = match[1];
      } else if (code.includes('/')) {
        const parts = code.split('/');
        code = parts[parts.length - 1];
      }
      code = code.toUpperCase();

      const existing = getStoredMeetings().find(
        (m) => m.code.toUpperCase() === code || m.id === code
      );
      if (existing) {
        setCurrentMeeting(existing);
      } else {
        const savedName = localStorage.getItem('arohi_meet_user_name') || 'Participant';
        const freshJoined = createRealMeetingSession(`Room ${code}`, savedName, 'Participant');
        freshJoined.code = code;
        setCurrentMeeting(freshJoined);
      }
      setIsJoinModalOpen(false);
      setJoinCodeInput('');
      setCurrentView('setup');
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
      {/* 1. Splash Screen */}
      {currentView === 'splash' && (
        <MeetLandingView
          onGetStarted={() => setCurrentView('home')}
          onSignIn={() => setCurrentView('home')}
        />
      )}

      {/* 2. Executive Dashboard */}
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
            setCurrentView('setup');
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

      {/* 3. New Meeting / Pre-Call Green Room Setup */}
      {currentView === 'setup' && (
        <MeetSetupView
          onBack={() => setCurrentView('home')}
          onLaunchMeeting={handleLaunchFromSetup}
          onScheduleForLater={() => setCurrentView('home')}
        />
      )}

      {/* 4. Active In-Call Room: Real Multi-Party WebRTC Grid or Split */}
      {currentView === 'room' && (
        <MeetRoomView
          meeting={currentMeeting}
          onEndMeeting={handleEndMeeting}
          onOpenAskArohi={handleOpenAskArohi}
          onOpenTranscriptView={() => setCurrentView('transcript')}
        />
      )}

      {/* 5. Dedicated Live Transcript Hub */}
      {currentView === 'transcript' && (
        <MeetTranscriptView
          meeting={currentMeeting}
          onBack={() => setCurrentView('room')}
          onEndMeeting={() => handleEndMeeting(currentMeeting)}
          onOpenAskArohi={handleOpenAskArohi}
        />
      )}

      {/* 6. Post-Meeting Intelligence & MOM Hub */}
      {currentView === 'post' && (
        <MeetPostMeetingView
          meeting={currentMeeting}
          onBack={() => setCurrentView('home')}
          onOpenAskArohi={handleOpenAskArohi}
          onOpenTranscript={() => setCurrentView('transcript')}
        />
      )}

      {/* 7. Dedicated "Ask Arohi" Meeting Assistant */}
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
                <h3 className="text-base font-bold text-white">Join Meeting</h3>
                <p className="text-xs text-slate-400">Enter room code or meeting link</p>
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
                  placeholder="e.g. ARM-482-917 or https://.../?room=ARM-482-917"
                  className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  autoFocus
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-white font-bold text-sm shadow-[0_0_20px_rgba(147,51,234,0.4)] hover:shadow-[0_0_30px_rgba(147,51,234,0.6)] transition active:scale-95"
              >
                Continue to Room →
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArohiMeetHub;
