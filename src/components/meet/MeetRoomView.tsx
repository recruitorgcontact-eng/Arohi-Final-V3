import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  Monitor, 
  Users, 
  MessageSquare, 
  Radio, 
  MoreVertical, 
  PhoneOff, 
  ShieldCheck, 
  Sparkles, 
  FileText, 
  CheckCircle2, 
  Send, 
  LayoutGrid, 
  SplitSquareVertical, 
  Download, 
  Share2, 
  Globe, 
  Clock, 
  Flame, 
  ArrowLeft,
  X,
  Volume2
} from 'lucide-react';
import ArohiMeetLogo from './ArohiMeetLogo';
import ArohiMeetAvatar from './ArohiMeetAvatar';
import { 
  MeetingSession, 
  MeetingParticipant, 
  TranscriptEntry, 
  DecisionItem, 
  ActionItem,
  INITIAL_OVERFLOW_PARTICIPANTS 
} from './meetData';

interface MeetRoomViewProps {
  meeting: MeetingSession;
  onEndMeeting: (updatedMeeting: MeetingSession) => void;
  onOpenAskArohi: (initialPrompt?: string) => void;
  onOpenTranscriptView: () => void;
}

export const MeetRoomView: React.FC<MeetRoomViewProps> = ({
  meeting,
  onEndMeeting,
  onOpenAskArohi,
  onOpenTranscriptView
}) => {
  // View mode: 'grid' (Screen 4) or 'split' (Screen 5)
  const [viewLayout, setViewLayout] = useState<'grid' | 'split'>('grid');

  // Hardware states
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isRecording, setIsRecording] = useState(true);
  const [cameraError, setCameraError] = useState<string | null>(null);

  // Active call duration timer: starts from 0 for fresh sessions or resumes from meeting state
  const [durationSeconds, setDurationSeconds] = useState(meeting.durationSeconds || 0);
  
  // Real-time collaborative meeting state
  const [participants, setParticipants] = useState<MeetingParticipant[]>(meeting.participants || []);
  const [transcript, setTranscript] = useState<TranscriptEntry[]>(meeting.transcript || []);
  const [decisions, setDecisions] = useState<DecisionItem[]>(meeting.decisions || []);
  const [actionItems, setActionItems] = useState<ActionItem[]>(meeting.actionItems || []);
  
  // Collaborative Tabs in Split View
  const [splitTab, setSplitTab] = useState<'transcript' | 'notes' | 'agenda' | 'actions'>('transcript');
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [isSummarizingLive, setIsSummarizingLive] = useState(false);
  
  // In-call chat drawer
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ sender: string; text: string; time: string }>>(() => {
    return meeting.id.includes('demo')
      ? [
          { sender: 'Priya Sharma', text: 'Sharing the revised pitch deck in drive.', time: '10:15 AM' },
          { sender: 'Dr. S. Mohanty', text: 'I support the Phase 1 capex rollout.', time: '10:18 AM' }
        ]
      : [];
  });
  const [newChatText, setNewChatText] = useState('');
  
  // Participants drawer
  const [isParticipantsOpen, setIsParticipantsOpen] = useState(false);
  
  // Ask Arohi inline question
  const [arohiQuery, setArohiQuery] = useState('');

  // Video Element Ref
  const userVideoRef = useRef<HTMLVideoElement>(null);
  const screenShareVideoRef = useRef<HTMLVideoElement>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const screenStreamRef = useRef<MediaStream | null>(null);

  // Format seconds to HH:MM:SS
  const formatTime = (secs: number) => {
    const hrs = Math.floor(secs / 3600);
    const mins = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${hrs > 0 ? String(hrs).padStart(2, '0') + ':' : ''}${String(mins).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  // Timer Tick
  useEffect(() => {
    const timer = setInterval(() => {
      setDurationSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // WebRTC / Camera Media Stream initialization
  useEffect(() => {
    let isMounted = true;

    async function initUserMedia() {
      try {
        if (!navigator.mediaDevices?.getUserMedia) return;
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        });
        if (isMounted) {
          mediaStreamRef.current = stream;
          if (userVideoRef.current) {
            userVideoRef.current.srcObject = stream;
            userVideoRef.current.play().catch(() => {});
          }
        }
      } catch (err: any) {
        console.warn('Camera/Mic permission not granted, using simulated studio feed:', err);
        setCameraError('Simulated camera active');
      }
    }

    initUserMedia();

    return () => {
      isMounted = false;
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Handle Mute Mic
  const handleToggleMic = () => {
    const next = !isMicMuted;
    setIsMicMuted(next);
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getAudioTracks().forEach((track) => {
        track.enabled = !next;
      });
    }
    // Update Junoon's status in participants list
    setParticipants((prev) =>
      prev.map((p) => (p.id === 'junoon-nayak' ? { ...p, isMuted: next, isSpeaking: !next } : p))
    );
  };

  // Handle Video Toggle
  const handleToggleVideo = () => {
    const next = !isVideoOff;
    setIsVideoOff(next);
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getVideoTracks().forEach((track) => {
        track.enabled = !next;
      });
    }
    setParticipants((prev) =>
      prev.map((p) => (p.id === 'junoon-nayak' ? { ...p, isVideoOff: next } : p))
    );
  };

  // Handle Screen Share
  const handleToggleScreenShare = async () => {
    if (!isScreenSharing) {
      try {
        const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        screenStreamRef.current = stream;
        setIsScreenSharing(true);
        if (screenShareVideoRef.current) {
          screenShareVideoRef.current.srcObject = stream;
          screenShareVideoRef.current.play().catch(() => {});
        }
        stream.getVideoTracks()[0].onended = () => {
          setIsScreenSharing(false);
        };
      } catch (e) {
        console.log('Screen share cancelled');
      }
    } else {
      if (screenStreamRef.current) {
        screenStreamRef.current.getTracks().forEach((track) => track.stop());
      }
      setIsScreenSharing(false);
    }
  };

  // Live Speech Recognition (Microphone Speech-to-Text into Live Transcript)
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    let recognition: any;
    try {
      recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = false;
      recognition.lang = selectedLanguage.startsWith('Hindi') ? 'hi-IN' : 'en-US';

      recognition.onresult = (event: any) => {
        const lastIdx = event.results.length - 1;
        const spoken = event.results[lastIdx][0]?.transcript?.trim();
        if (spoken) {
          const now = new Date();
          const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          const newEntry: TranscriptEntry = {
            id: `t-user-${Date.now()}`,
            speakerId: 'junoon-nayak',
            speakerName: 'Junoon Nayak',
            speakerRole: 'Chairperson',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
            timestamp: timeStr,
            timeSeconds: durationSeconds,
            text: spoken,
            isHighlight: false
          };
          setTranscript((prev) => [...prev, newEntry]);
        }
      };

      if (!isMicMuted) {
        recognition.start();
      }
    } catch (e) {
      // Speech recognition fallback
    }

    return () => {
      try {
        if (recognition) recognition.stop();
      } catch {}
    };
  }, [isMicMuted, selectedLanguage, durationSeconds]);

  // Trigger Live Real-time AI Summarization
  const handleLiveSummarize = async () => {
    setIsSummarizingLive(true);
    try {
      const res = await fetch('/api/meet/summarize-live', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: meeting.title,
          transcript: transcript.map((t) => `${t.speakerName}: ${t.text}`).join('\n')
        })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.decisions?.length) {
          setDecisions(data.decisions);
        }
        if (data.actionItems?.length) {
          setActionItems(data.actionItems);
        }
      }
    } catch (err) {
      console.warn('Live summarize fallback active:', err);
    } finally {
      setIsSummarizingLive(false);
    }
  };

  // Create & Download MOM Document
  const handleCreateMOM = () => {
    const momText = `# MINUTES OF MEETING: ${meeting.title.toUpperCase()}
Date: ${meeting.date}
Timing: ${meeting.timeRange}
Duration: ${formatTime(durationSeconds)}
Participants: 30 (${participants.map((p) => p.name).join(', ')})
Chairperson: Junoon Nayak

---

## 1. EXECUTIVE SUMMARY
${meeting.executiveSummary}

## 2. AGENDA
${meeting.agenda.map((a, i) => `${i + 1}. ${a}`).join('\n')}

## 3. KEY DECISIONS TAKEN
${decisions.map((d, i) => `${i + 1}. [${d.status.toUpperCase()}] ${d.title}`).join('\n')}

## 4. ACTION ITEMS MATRIX
${actionItems.map((a) => `- [${a.status.toUpperCase()}] ${a.task} -> Assignee: ${a.assignee} (Due: ${a.dueDate})`).join('\n')}

## 5. COMPLETE VERBATIM TRANSCRIPT
${transcript.map((t) => `[${t.timestamp}] ${t.speakerName} (${t.speakerRole}): "${t.text}"`).join('\n\n')}

---
Generated by Arohi MEET™ — Institutional AI Minutes Engine.
`;

    const blob = new Blob([momText], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `MOM_${meeting.title.replace(/\s+/g, '_')}_${Date.now()}.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Leave / End Meeting
  const handleLeaveOrEnd = () => {
    const updated: MeetingSession = {
      ...meeting,
      durationSeconds,
      durationFormatted: formatTime(durationSeconds),
      transcript,
      decisions,
      actionItems,
      status: 'completed'
    };
    onEndMeeting(updated);
  };

  return (
    <div className="relative min-h-[95vh] w-full flex flex-col justify-between bg-[#070B14] text-white select-none overflow-x-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* ==================================================== */}
      {/* HEADER BAR (Matching Screen 4 & Screen 5)             */}
      {/* ==================================================== */}
      <div className="w-full px-4 sm:px-6 py-3.5 flex items-center justify-between border-b border-slate-800/80 bg-[#070B14]/90 backdrop-blur-md z-30">
        <div className="flex items-center gap-3">
          <ArohiMeetLogo size="sm" showTagline={false} />
          <div className="hidden sm:block h-4 w-px bg-slate-800" />
          
          <div className="flex items-center gap-2">
            <h2 className="text-sm sm:text-base font-semibold text-white flex items-center gap-1.5 cursor-pointer hover:text-cyan-400 transition">
              <span>{meeting.title}</span>
              <span className="text-[10px] text-slate-400">⌵</span>
            </h2>

            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-[11px] text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{participants.length} {participants.length === 1 ? 'Participant (You)' : 'Participants'}</span>
              <span className="text-slate-500">•</span>
              <span className="font-mono">{formatTime(durationSeconds)}</span>
            </div>

            {/* Encrypted Security Badge */}
            <div className="hidden md:flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[10px] text-cyan-400">
              <ShieldCheck className="w-3 h-3" />
              <span>Secure End-to-end encrypted</span>
            </div>
          </div>
        </div>

        {/* Quick Header Actions: Layout Switcher & Red Leave Pill */}
        <div className="flex items-center gap-2.5">
          {/* Layout Grid / Split Toggle */}
          <button
            onClick={() => setViewLayout(viewLayout === 'grid' ? 'split' : 'grid')}
            title="Toggle Split / Grid View"
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition flex items-center gap-1 text-xs"
          >
            {viewLayout === 'grid' ? (
              <>
                <SplitSquareVertical className="w-4 h-4 text-cyan-400" />
                <span className="hidden sm:inline">Split View</span>
              </>
            ) : (
              <>
                <LayoutGrid className="w-4 h-4 text-purple-400" />
                <span className="hidden sm:inline">Grid View</span>
              </>
            )}
          </button>

          {/* Red Leave / End Meeting Pill */}
          <button
            onClick={handleLeaveOrEnd}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-semibold text-xs shadow-[0_0_15px_rgba(239,68,68,0.4)] active:scale-95 transition"
          >
            <PhoneOff className="w-3.5 h-3.5" />
            <span>Leave</span>
          </button>
        </div>
      </div>

      {/* In-Call Quick Feature Filter Chips (Screen 4) */}
      <div className="w-full px-4 sm:px-6 py-2 flex items-center gap-2 overflow-x-auto no-scrollbar border-b border-slate-800/40 bg-[#090d1c]/60">
        <button
          onClick={() => setIsRecording(!isRecording)}
          className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 transition flex-shrink-0 ${
            isRecording
              ? 'bg-emerald-500/10 border border-emerald-500/40 text-emerald-400'
              : 'bg-slate-900 border border-slate-800 text-slate-400'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>AI Recording ON</span>
        </button>

        <button
          onClick={onOpenTranscriptView}
          className="px-3 py-1 rounded-full text-xs font-medium bg-purple-500/10 border border-purple-500/30 text-purple-300 hover:bg-purple-500/20 flex items-center gap-1.5 transition flex-shrink-0"
        >
          <span className="font-bold text-[10px]">CC</span>
          <span>Live Transcript</span>
        </button>

        <button
          onClick={handleCreateMOM}
          className="px-3 py-1 rounded-full text-xs font-medium bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20 flex items-center gap-1.5 transition flex-shrink-0"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>AI Minutes</span>
        </button>

        <button
          onClick={() => setViewLayout(viewLayout === 'grid' ? 'split' : 'grid')}
          className="px-3 py-1 rounded-full text-xs font-medium bg-slate-900 border border-slate-800 text-slate-300 hover:border-slate-700 flex items-center gap-1.5 transition flex-shrink-0"
        >
          <LayoutGrid className="w-3.5 h-3.5 text-cyan-400" />
          <span>{viewLayout === 'grid' ? 'Switch to Dual Pane' : 'Switch to Full Grid'}</span>
        </button>
      </div>

      {/* ==================================================== */}
      {/* MAIN MEETING VIEWPORT: GRID or SPLIT                */}
      {/* ==================================================== */}
      <div className="flex-1 w-full max-w-7xl mx-auto p-3 sm:p-5 flex flex-col justify-between">
        {viewLayout === 'grid' ? (
          /* ================================================ */
          /* SCREEN 4: 6-PERSON VIDEO GRID VIEW              */
          /* ================================================ */
          <div className="flex-1 flex flex-col justify-between">
            {/* Dynamic Video Viewport (1 large view if alone, or grid when multiple) */}
            <div className={`grid gap-3 mb-3 ${
              participants.length === 1 
                ? 'grid-cols-1 max-w-2xl mx-auto w-full' 
                : participants.length === 2 
                  ? 'grid-cols-1 sm:grid-cols-2' 
                  : 'grid-cols-2 md:grid-cols-3'
            }`}>
              {participants.slice(0, 6).map((participant) => {
                const isUser = participant.id === 'user-self' || participant.id === 'junoon-nayak';
                const isSpeaking = participant.isSpeaking && !participant.isMuted;

                return (
                  <div
                    key={participant.id}
                    className={`relative aspect-video rounded-2xl overflow-hidden bg-slate-900/90 border transition-all duration-300 group shadow-lg ${
                      isSpeaking
                        ? 'border-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.35)] ring-2 ring-emerald-500/30'
                        : 'border-slate-800/80 hover:border-slate-700'
                    }`}
                  >
                    {/* Live Video Feed for User or Photo Feed for Participant */}
                    {isUser ? (
                      <div className="w-full h-full relative overflow-hidden bg-[#0A0F1D]">
                        {!isVideoOff ? (
                          <video
                            ref={userVideoRef}
                            autoPlay
                            playsInline
                            muted
                            className="w-full h-full object-cover scale-x-[-1]"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-[#0e172e]">
                            <div className="w-20 h-20 rounded-full bg-cyan-600/20 border-2 border-cyan-400 flex items-center justify-center text-cyan-300 text-xl font-bold mb-2">
                              YOU
                            </div>
                            <span className="text-xs text-slate-400 font-medium">Camera Paused</span>
                          </div>
                        )}

                        {/* In-Call Status Graphic */}
                        <div className="absolute top-2.5 right-2.5 p-1 px-2 rounded-lg bg-black/40 backdrop-blur-md border border-cyan-400/30 text-[9px] font-serif italic text-cyan-300 pointer-events-none">
                          {participants.length === 1 ? 'Live Speaker Room' : 'Ideas Decisions Action'}
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-full relative overflow-hidden bg-[#0A0F1D]">
                        <img
                          src={participant.avatar}
                          alt={participant.name}
                          className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                        />
                        {/* Gradient tint */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                      </div>
                    )}

                    {/* Participant Name Tag & Mic Indicator */}
                    <div className="absolute bottom-2.5 inset-x-2.5 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-xs">
                        <span className="font-semibold text-white truncate max-w-[120px]">
                          {participant.name}
                        </span>
                        {participant.role && (
                          <span className="text-[10px] text-slate-400">({participant.role})</span>
                        )}
                      </div>

                      {/* Mic Status Icon */}
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center backdrop-blur-md border ${
                          (isUser ? isMicMuted : participant.isMuted)
                            ? 'bg-rose-500/20 border-rose-500/40 text-rose-400'
                            : 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
                        }`}
                      >
                        {(isUser ? isMicMuted : participant.isMuted) ? (
                          <MicOff className="w-3 h-3" />
                        ) : (
                          <Mic className="w-3 h-3 animate-pulse" />
                        )}
                      </div>
                    </div>

                    {/* 3-dots Menu button */}
                    <button className="absolute top-2.5 left-2.5 p-1 rounded-lg bg-black/40 text-slate-400 hover:text-white transition">
                      <MoreVertical className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Overflow Participants Avatar Row (Only in Demo Mode) */}
            {meeting.id.includes('demo') && (
              <div className="w-full py-2 px-3 rounded-2xl bg-[#0c1224]/80 border border-slate-800 flex items-center gap-2 mb-3">
                {INITIAL_OVERFLOW_PARTICIPANTS.map((op, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-900 border border-slate-800 text-xs"
                  >
                    <span
                      className={`w-5 h-5 rounded-full ${op.bg} text-white font-bold text-[10px] flex items-center justify-center`}
                    >
                      {op.initials}
                    </span>
                    <span className="text-slate-300 font-medium text-xs">{op.name}</span>
                    <MicOff className="w-3 h-3 text-rose-400" />
                  </div>
                ))}
                <div className="px-2.5 py-1 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
                  +21 Participants
                </div>
              </div>
            )}

            {/* Floating Arohi Listening Bar (Screen 4 Bottom) */}
            <div className="w-full p-3 rounded-2xl bg-gradient-to-r from-indigo-950/70 via-slate-900 to-[#0c1224] border border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.2)] flex items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-3">
                <ArohiMeetAvatar size="sm" status="listening" showBadge />
                <div>
                  <p className="text-xs font-semibold text-white flex items-center gap-1.5">
                    <span>Arohi is listening...</span>
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  </p>
                  <p className="text-[10px] text-slate-400">
                    Capturing discussion, generating insights in real-time.
                  </p>
                </div>
              </div>

              {/* Real-time Waveform Audio Visualizer */}
              <div className="hidden sm:flex items-center gap-1 h-6">
                {[12, 24, 16, 28, 20, 32, 18, 24, 14, 30, 22, 16].map((h, i) => (
                  <span
                    key={i}
                    style={{ height: `${h}px` }}
                    className="w-1 rounded-full bg-gradient-to-t from-cyan-500 to-purple-500 animate-pulse"
                  />
                ))}
              </div>

              <button
                onClick={() => onOpenAskArohi()}
                className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md transition active:scale-95"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Ask Arohi</span>
              </button>
            </div>
          </div>
        ) : (
          /* ================================================ */
          /* SCREEN 5: SPLIT-SCREEN COLLABORATIVE WORKSPACE   */
          /* ================================================ */
          <div className="flex-1 flex flex-col justify-between">
            {/* Top Compact Video Row */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-3">
              {participants.slice(0, 6).map((participant) => {
                const isUser = participant.id === 'junoon-nayak';
                const isSpeaking = participant.isSpeaking && !participant.isMuted;

                return (
                  <div
                    key={participant.id}
                    className={`relative aspect-video rounded-xl overflow-hidden bg-slate-900 border ${
                      isSpeaking ? 'border-emerald-400 ring-2 ring-emerald-500/40' : 'border-slate-800'
                    }`}
                  >
                    <img
                      src={participant.avatar}
                      alt={participant.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-1 inset-x-1 flex items-center justify-between text-[10px] bg-black/60 px-1.5 py-0.5 rounded backdrop-blur-sm">
                      <span className="truncate max-w-[60px] text-white font-medium">
                        {participant.name.split(' ')[0]}
                      </span>
                      {participant.isMuted ? (
                        <MicOff className="w-2.5 h-2.5 text-rose-400" />
                      ) : (
                        <Mic className="w-2.5 h-2.5 text-emerald-400" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Split Switcher Tabs */}
            <div className="flex items-center gap-2 mb-3 border-b border-slate-800 pb-2">
              <button
                onClick={() => setSplitTab('transcript')}
                className={`px-3 py-1 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 ${
                  splitTab === 'transcript'
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
                    : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                <span>🗎 Live Transcript</span>
              </button>

              <button
                onClick={() => setSplitTab('notes')}
                className={`px-3 py-1 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 ${
                  splitTab === 'notes'
                    ? 'bg-purple-600 text-white font-bold shadow-md'
                    : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                <span>📄 AI Notes</span>
              </button>

              <button
                onClick={() => setSplitTab('agenda')}
                className={`px-3 py-1 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 ${
                  splitTab === 'agenda'
                    ? 'bg-indigo-600 text-white font-bold shadow-md'
                    : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                <span>📋 Agenda</span>
              </button>

              <button
                onClick={() => setSplitTab('actions')}
                className={`px-3 py-1 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 ${
                  splitTab === 'actions'
                    ? 'bg-emerald-600 text-white font-bold shadow-md'
                    : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                <span> Action Items</span>
              </button>
            </div>

            {/* Two-Column Collaborative Workspace (Left: Transcript | Right: AI Summary) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3 flex-1 min-h-[360px]">
              {/* Left Column: Live Transcript Stream */}
              <div className="p-4 rounded-2xl bg-[#0c1224]/90 border border-slate-800 flex flex-col justify-between">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800/80 mb-3">
                  <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Live Transcript</span>
                  </h3>

                  {/* Language Selector */}
                  <div className="flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-slate-300">
                    <Globe className="w-3 h-3 text-cyan-400" />
                    <span>{selectedLanguage}</span>
                    <span className="text-[9px]">⌵</span>
                  </div>
                </div>

                {/* Conversation Scroll Area */}
                <div className="space-y-3 overflow-y-auto max-h-[300px] pr-2">
                  {transcript.length === 0 ? (
                    <div className="py-12 px-4 text-center">
                      <div className="w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto mb-2.5">
                        <Mic className="w-5 h-5 animate-pulse" />
                      </div>
                      <p className="text-xs font-medium text-white mb-1">Microphone is active & listening</p>
                      <p className="text-[11px] text-slate-400 max-w-xs mx-auto leading-relaxed">
                        Speak into your microphone. Arohi will transcribe your speech in real time with high institutional precision.
                      </p>
                    </div>
                  ) : (
                    transcript.map((turn) => (
                      <div key={turn.id} className="flex items-start gap-2.5 text-xs">
                        <img
                          src={turn.avatar}
                          alt={turn.speakerName}
                          className="w-7 h-7 rounded-full object-cover flex-shrink-0 mt-0.5 border border-slate-700"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="font-semibold text-cyan-400">{turn.speakerName}</span>
                            <span className="text-[10px] text-slate-500">{turn.timestamp}</span>
                          </div>
                          <p className="text-slate-200 leading-relaxed font-light">{turn.text}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <div className="pt-2 border-t border-slate-800/60 mt-2 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Transcribing in real-time...
                  </span>
                  <button
                    onClick={onOpenTranscriptView}
                    className="text-cyan-400 hover:underline"
                  >
                    Open Full View →
                  </button>
                </div>
              </div>

              {/* Right Column: Live AI Summary (Decisions & Action Items) */}
              <div className="p-4 rounded-2xl bg-[#0c1224]/90 border border-slate-800 flex flex-col justify-between">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800/80 mb-3">
                  <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                    <span>AI Summary</span>
                    <span className="px-1.5 py-0.2 rounded-full bg-emerald-500/10 text-emerald-400 text-[9px] border border-emerald-500/30">
                      Live
                    </span>
                  </h3>

                  <button
                    onClick={handleLiveSummarize}
                    disabled={isSummarizingLive}
                    className="text-[11px] text-purple-400 hover:text-purple-300 font-medium"
                  >
                    {isSummarizingLive ? 'Generating...' : 'Refresh AI'}
                  </button>
                </div>

                <div className="space-y-4 overflow-y-auto max-h-[300px] pr-2 text-xs">
                  {/* Key Discussion Points */}
                  <div>
                    <h4 className="font-semibold text-slate-300 flex items-center gap-1.5 mb-1.5">
                      <FileText className="w-3.5 h-3.5 text-sky-400" />
                      <span>Key Discussion Points</span>
                    </h4>
                    {transcript.length === 0 ? (
                      <p className="text-[11px] text-slate-500 italic pl-5">
                        Points will populate as discussion progresses or when you click "Summarize Now".
                      </p>
                    ) : (
                      <ul className="space-y-1 text-slate-400 text-[11px] pl-5 list-disc marker:text-cyan-400">
                        {transcript.slice(-4).map((t, idx) => (
                          <li key={idx} className="line-clamp-2">
                            <strong className="text-slate-300">{t.speakerName}:</strong> {t.text}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Decisions Taken */}
                  <div>
                    <h4 className="font-semibold text-slate-300 flex items-center gap-1.5 mb-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Decisions Taken ({decisions.length})</span>
                    </h4>
                    {decisions.length === 0 ? (
                      <p className="text-[11px] text-slate-500 italic pl-5">
                        No decisions finalized yet. Spoken resolutions will be synthesized into formal decisions.
                      </p>
                    ) : (
                      <div className="space-y-1.5">
                        {decisions.map((d) => (
                          <div key={d.id} className="flex items-start gap-1.5 text-[11px] text-slate-300">
                            <span className="text-emerald-400 mt-0.5">✓</span>
                            <span>{d.title}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Action Items */}
                  <div>
                    <h4 className="font-semibold text-slate-300 flex items-center gap-1.5 mb-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span>Action Items ({actionItems.length})</span>
                    </h4>
                    {actionItems.length === 0 ? (
                      <p className="text-[11px] text-slate-500 italic pl-5">
                        No action items assigned. Click "Summarize Now" to extract actionable tasks.
                      </p>
                    ) : (
                      <div className="space-y-1.5">
                        {actionItems.map((a) => (
                          <div key={a.id} className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-[11px]">
                            <p className="font-medium text-white">{a.task}</p>
                            <p className="text-slate-400 text-[10px] mt-0.5">
                              Assignee: <span className="text-cyan-400">{a.assignee}</span> • Due: {a.dueDate}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Quick Bottom Actions */}
                <div className="pt-2 border-t border-slate-800/60 mt-2 flex items-center justify-between gap-2">
                  <button
                    onClick={handleLiveSummarize}
                    className="flex-1 py-1.5 px-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-[11px] font-medium text-slate-200 border border-slate-700 flex items-center justify-center gap-1"
                  >
                    <FileText className="w-3 h-3 text-cyan-400" />
                    <span>Summarize Now</span>
                  </button>

                  <button
                    onClick={handleCreateMOM}
                    className="flex-1 py-1.5 px-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-[11px] font-medium text-slate-200 border border-slate-700 flex items-center justify-center gap-1"
                  >
                    <Download className="w-3 h-3 text-purple-400" />
                    <span>Create MOM</span>
                  </button>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      alert('Meeting link copied to clipboard!');
                    }}
                    className="p-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700"
                    title="Share Meeting"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ==================================================== */}
      {/* BOTTOM IN-CALL CONTROL BAR (Screen 4 & 5 Bottom)     */}
      {/* ==================================================== */}
      <div className="w-full px-4 sm:px-8 py-3 bg-[#070B14]/95 border-t border-slate-800/80 backdrop-blur-xl z-30">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          {/* Mute Mic */}
          <button
            onClick={handleToggleMic}
            className={`flex flex-col items-center gap-1 transition ${
              isMicMuted ? 'text-rose-400' : 'text-slate-300 hover:text-white'
            }`}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center border transition ${
                isMicMuted
                  ? 'bg-rose-500/20 border-rose-500/50 text-rose-400'
                  : 'bg-slate-900 border-slate-700 text-white hover:border-slate-500'
              }`}
            >
              {isMicMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </div>
            <span className="text-[10px]">{isMicMuted ? 'Unmute' : 'Mute'}</span>
          </button>

          {/* Stop Video */}
          <button
            onClick={handleToggleVideo}
            className={`flex flex-col items-center gap-1 transition ${
              isVideoOff ? 'text-rose-400' : 'text-slate-300 hover:text-white'
            }`}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center border transition ${
                isVideoOff
                  ? 'bg-rose-500/20 border-rose-500/50 text-rose-400'
                  : 'bg-slate-900 border-slate-700 text-white hover:border-slate-500'
              }`}
            >
              {isVideoOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
            </div>
            <span className="text-[10px]">{isVideoOff ? 'Start Video' : 'Stop Video'}</span>
          </button>

          {/* Share Screen */}
          <button
            onClick={handleToggleScreenShare}
            className={`flex flex-col items-center gap-1 transition ${
              isScreenSharing ? 'text-cyan-400' : 'text-slate-300 hover:text-white'
            }`}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center border transition ${
                isScreenSharing
                  ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-400'
                  : 'bg-slate-900 border-slate-700 text-white hover:border-slate-500'
              }`}
            >
              <Monitor className="w-5 h-5" />
            </div>
            <span className="text-[10px]">Share</span>
          </button>

          {/* Participants */}
          <button
            onClick={() => setIsParticipantsOpen(!isParticipantsOpen)}
            className="flex flex-col items-center gap-1 text-slate-300 hover:text-white relative"
          >
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-900 border border-slate-700 text-white relative">
              <Users className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 px-1.5 py-0.2 rounded-full bg-cyan-500 text-slate-950 font-bold text-[9px]">
                {participants.length}
              </span>
            </div>
            <span className="text-[10px]">Participants</span>
          </button>

          {/* In-Call Chat */}
          <button
            onClick={() => setIsChatOpen(!isChatOpen)}
            className="flex flex-col items-center gap-1 text-slate-300 hover:text-white relative"
          >
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-900 border border-slate-700 text-white relative">
              <MessageSquare className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white font-bold text-[9px] flex items-center justify-center">
                5
              </span>
            </div>
            <span className="text-[10px]">Chat</span>
          </button>

          {/* Record */}
          <button
            onClick={() => setIsRecording(!isRecording)}
            className={`flex flex-col items-center gap-1 transition ${
              isRecording ? 'text-rose-400' : 'text-slate-300 hover:text-white'
            }`}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center border transition ${
                isRecording
                  ? 'bg-rose-500/20 border-rose-500/50 text-rose-400'
                  : 'bg-slate-900 border-slate-700 text-white hover:border-slate-500'
              }`}
            >
              <Radio className="w-5 h-5 animate-pulse" />
            </div>
            <span className="text-[10px]">{isRecording ? 'Recording' : 'Record'}</span>
          </button>

          {/* End Call Button */}
          <button
            onClick={handleLeaveOrEnd}
            className="flex flex-col items-center gap-1 text-rose-400"
          >
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-rose-600 hover:bg-rose-500 text-white shadow-lg active:scale-95 transition">
              <PhoneOff className="w-5 h-5" />
            </div>
            <span className="text-[10px] text-rose-400">Leave</span>
          </button>
        </div>
      </div>

      {/* ==================================================== */}
      {/* IN-CALL CHAT DRAWER                                  */}
      {/* ==================================================== */}
      {isChatOpen && (
        <div className="fixed inset-y-0 right-0 w-80 sm:w-96 bg-[#0c1224] border-l border-slate-800 shadow-2xl z-50 flex flex-col justify-between">
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-cyan-400" />
              <span>In-Call Chat</span>
            </h3>
            <button
              onClick={() => setIsChatOpen(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 p-4 space-y-3 overflow-y-auto">
            {chatMessages.map((msg, idx) => (
              <div key={idx} className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-cyan-400">{msg.sender}</span>
                  <span className="text-[10px] text-slate-500">{msg.time}</span>
                </div>
                <p className="text-slate-200">{msg.text}</p>
              </div>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (newChatText.trim()) {
                const now = new Date();
                setChatMessages([
                  ...chatMessages,
                  {
                    sender: 'Junoon Nayak',
                    text: newChatText.trim(),
                    time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                  }
                ]);
                setNewChatText('');
              }
            }}
            className="p-3 border-t border-slate-800 flex gap-2"
          >
            <input
              type="text"
              value={newChatText}
              onChange={(e) => setNewChatText(e.target.value)}
              placeholder="Send message to everyone..."
              className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
            <button
              type="submit"
              className="p-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* ==================================================== */}
      {/* PARTICIPANTS DRAWER                                 */}
      {/* ==================================================== */}
      {isParticipantsOpen && (
        <div className="fixed inset-y-0 right-0 w-80 sm:w-96 bg-[#0c1224] border-l border-slate-800 shadow-2xl z-50 flex flex-col justify-between">
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-cyan-400" />
              <span>Participants ({participants.length})</span>
            </h3>
            <button
              onClick={() => setIsParticipantsOpen(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 p-4 space-y-2 overflow-y-auto">
            {participants.map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between p-2 rounded-xl bg-slate-900 border border-slate-800"
              >
                <div className="flex items-center gap-2.5">
                  <img
                    src={p.avatar}
                    alt={p.name}
                    className="w-8 h-8 rounded-full object-cover border border-slate-700"
                  />
                  <div>
                    <p className="text-xs font-semibold text-white">{p.name}</p>
                    <p className="text-[10px] text-slate-400">{p.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  {p.isMuted ? (
                    <MicOff className="w-3.5 h-3.5 text-rose-400" />
                  ) : (
                    <Mic className="w-3.5 h-3.5 text-emerald-400" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MeetRoomView;
