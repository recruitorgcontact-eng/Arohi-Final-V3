// Arohi MEET™ Real-Time Setup & Green Room Device Configurator
// Dynamic User Identity, Real Camera & Mic Check, Agenda Customization & Instant Room Provisioning

import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, 
  Calendar, 
  Video, 
  VideoOff,
  Mic,
  MicOff,
  Headphones, 
  Users, 
  Check, 
  FileText, 
  Sparkles, 
  Globe, 
  CheckCircle2, 
  Plus, 
  Trash2,
  Link as LinkIcon, 
  Clock, 
  Crown,
  Share2,
  Copy,
  CheckCheck
} from 'lucide-react';
import ArohiMeetLogo from './ArohiMeetLogo';
import ArohiMeetAvatar from './ArohiMeetAvatar';
import { MeetingSession, getInitials, getAvatarColor, generateRoomCode } from './meetData';

interface MeetSetupViewProps {
  onBack: () => void;
  onLaunchMeeting: (config: Partial<MeetingSession>) => void;
  onScheduleForLater?: () => void;
}

export const MeetSetupView: React.FC<MeetSetupViewProps> = ({
  onBack,
  onLaunchMeeting,
  onScheduleForLater
}) => {
  const [meetingMode, setMeetingMode] = useState<'video' | 'audio' | 'in-person'>('video');
  const [title, setTitle] = useState('Executive Strategy Session');
  const [description, setDescription] = useState('Strategic review, cross-functional collaboration, and action roadmap.');

  // User Identity
  const [userName, setUserName] = useState(() => {
    return localStorage.getItem('arohi_meet_user_name') || 'Executive Host';
  });
  const [userRole, setUserRole] = useState<'Host' | 'Chairperson' | 'Speaker' | 'Secretariat' | 'Guest'>('Host');
  
  // Hardware test states
  const [isCameraActive, setIsCameraActive] = useState(true);
  const [isMicActive, setIsMicActive] = useState(true);
  const [audioLevel, setAudioLevel] = useState(0);
  const [mediaError, setMediaError] = useState<string | null>(null);

  const videoPreviewRef = useRef<HTMLVideoElement>(null);
  const previewStreamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Generated room code for preview & sharing
  const [previewCode] = useState(() => generateRoomCode());
  const [hasCopiedLink, setHasCopiedLink] = useState(false);

  // AI & Governance toggles
  const [enableAiMinutes, setEnableAiMinutes] = useState(true);
  const [allowRecording, setAllowRecording] = useState(true);
  const [liveTranscript, setLiveTranscript] = useState(true);
  const [multiLanguage, setMultiLanguage] = useState(true);
  const [autoActionItems, setAutoActionItems] = useState(true);
  const [allowScreenSharing, setAllowScreenSharing] = useState(true);
  
  // Agenda
  const [agenda, setAgenda] = useState<string[]>([
    'Welcome & Meeting Objectives',
    'Strategy & Operations Review',
    'Decisions Recap & Next Action Protocol'
  ]);
  const [newAgendaItem, setNewAgendaItem] = useState('');

  // Start preview media stream
  useEffect(() => {
    let isCancelled = false;

    async function startPreview() {
      try {
        if (!navigator.mediaDevices?.getUserMedia) {
          setMediaError('Media devices not supported in this browser');
          return;
        }

        const stream = await navigator.mediaDevices.getUserMedia({
          video: isCameraActive ? { width: { ideal: 640 }, height: { ideal: 360 } } : false,
          audio: true
        });

        if (isCancelled) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }

        previewStreamRef.current = stream;
        if (videoPreviewRef.current && isCameraActive) {
          videoPreviewRef.current.srcObject = stream;
          videoPreviewRef.current.play().catch(() => {});
        }

        // Setup audio level meter
        try {
          const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
          if (AudioContextClass) {
            const ctx = new AudioContextClass();
            audioContextRef.current = ctx;
            const analyser = ctx.createAnalyser();
            const micSource = ctx.createMediaStreamSource(stream);
            micSource.connect(analyser);
            analyser.fftSize = 64;
            const dataArray = new Uint8Array(analyser.frequencyBinCount);

            const checkAudio = () => {
              if (isCancelled) return;
              analyser.getByteFrequencyData(dataArray);
              let sum = 0;
              for (let i = 0; i < dataArray.length; i++) sum += dataArray[i];
              const avg = sum / dataArray.length;
              setAudioLevel(Math.min(100, Math.round((avg / 128) * 100)));
              requestAnimationFrame(checkAudio);
            };
            requestAnimationFrame(checkAudio);
          }
        } catch {}
      } catch (err: any) {
        console.warn('Green room media setup notice:', err?.message || err);
        setMediaError(err?.name === 'NotAllowedError' ? 'Camera/Mic permission denied' : 'Camera not detected');
      }
    }

    startPreview();

    return () => {
      isCancelled = true;
      if (previewStreamRef.current) {
        previewStreamRef.current.getTracks().forEach((t) => t.stop());
      }
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, [isCameraActive]);

  // Toggle Camera
  const toggleCamera = () => {
    setIsCameraActive((prev) => !prev);
  };

  // Toggle Mic
  const toggleMic = () => {
    setIsMicActive((prev) => {
      const next = !prev;
      if (previewStreamRef.current) {
        previewStreamRef.current.getAudioTracks().forEach((t) => (t.enabled = next));
      }
      return next;
    });
  };

  const handleAddAgenda = (e: React.FormEvent) => {
    e.preventDefault();
    if (newAgendaItem.trim()) {
      setAgenda([...agenda, newAgendaItem.trim()]);
      setNewAgendaItem('');
    }
  };

  const handleRemoveAgenda = (idx: number) => {
    setAgenda(agenda.filter((_, i) => i !== idx));
  };

  const handleCopyInvite = () => {
    const inviteText = `Join my Arohi Meet session!\nRoom Code: ${previewCode}\nDirect Link: ${window.location.origin}/?tab=meet&room=${previewCode}`;
    navigator.clipboard.writeText(inviteText);
    setHasCopiedLink(true);
    setTimeout(() => setHasCopiedLink(false), 2500);
  };

  const handleStart = () => {
    localStorage.setItem('arohi_meet_user_name', userName.trim() || 'Host');
    
    // Stop local preview before launching room
    if (previewStreamRef.current) {
      previewStreamRef.current.getTracks().forEach((t) => t.stop());
    }

    onLaunchMeeting({
      code: previewCode,
      title: title.trim() || 'Executive Strategy Session',
      description: description.trim(),
      mode: meetingMode,
      organizer: userName.trim() || 'Host',
      agenda: agenda.length > 0 ? agenda : ['Discussion & Agenda Review', 'Decisions Recap'],
      settings: {
        enableAiMinutes,
        allowRecording,
        liveTranscript,
        multiLanguage,
        autoActionItems,
        allowScreenSharing,
        language: 'en'
      }
    });
  };

  return (
    <div className="relative min-h-[92vh] w-full bg-[#070B14] text-white select-none pb-24 overflow-x-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-72 h-72 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Top Header */}
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 pt-5 pb-3 flex items-center justify-between border-b border-slate-800/60">
        <button
          onClick={onBack}
          className="p-2 rounded-full bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white hover:border-cyan-500/50 transition"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <ArohiMeetLogo size="sm" showTagline={false} />

        <button
          onClick={onScheduleForLater}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-700 text-xs text-slate-200 hover:border-cyan-400/50 transition"
        >
          <Calendar className="w-3.5 h-3.5 text-cyan-400" />
          <span>Schedule</span>
          <span className="text-[10px] text-slate-400">›</span>
        </button>
      </div>

      {/* Form Container */}
      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 pt-5">
        {/* Title & Subtitle */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Pre-Meeting <span className="text-cyan-400">Green Room</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              Check your camera, mic & identity before entering the room.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-cyan-400 font-bold">
              {previewCode}
            </span>
            <button
              onClick={handleCopyInvite}
              className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20 transition flex items-center gap-1 text-xs"
              title="Copy Room Link & Code"
            >
              {hasCopiedLink ? <CheckCheck className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* 1. Device Preview & Identity Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Camera Viewfinder */}
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-xl flex flex-col justify-between p-3">
            {isCameraActive && !mediaError ? (
              <video
                ref={videoPreviewRef}
                autoPlay
                playsInline
                muted
                className="absolute inset-0 w-full h-full object-cover scale-x-[-1]"
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-[#0e172e]">
                <div
                  style={{ backgroundColor: getAvatarColor(userName) }}
                  className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold mb-2 shadow-lg"
                >
                  {getInitials(userName)}
                </div>
                <span className="text-xs text-slate-400 font-medium">
                  {mediaError ? mediaError : 'Camera is Off'}
                </span>
              </div>
            )}

            {/* Top Badge */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-medium text-slate-200">
                Live Preview
              </span>

              {/* Live Mic Level Indicator */}
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-[11px]">
                <Mic className={`w-3 h-3 ${isMicActive ? 'text-emerald-400' : 'text-rose-400'}`} />
                <div className="w-12 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${isMicActive ? audioLevel : 0}%` }}
                    className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 transition-all duration-75"
                  />
                </div>
              </div>
            </div>

            {/* Bottom Controls Bar */}
            <div className="relative z-10 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={toggleMic}
                className={`p-2.5 rounded-xl border transition ${
                  isMicActive
                    ? 'bg-slate-900/90 border-slate-700 text-white hover:bg-slate-800'
                    : 'bg-rose-500/20 border-rose-500/50 text-rose-400'
                }`}
                title={isMicActive ? 'Mute Microphone' : 'Unmute Microphone'}
              >
                {isMicActive ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
              </button>

              <button
                type="button"
                onClick={toggleCamera}
                className={`p-2.5 rounded-xl border transition ${
                  isCameraActive
                    ? 'bg-slate-900/90 border-slate-700 text-white hover:bg-slate-800'
                    : 'bg-rose-500/20 border-rose-500/50 text-rose-400'
                }`}
                title={isCameraActive ? 'Turn Off Camera' : 'Turn On Camera'}
              >
                {isCameraActive ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* User Profile & Role Selector */}
          <div className="p-4 rounded-2xl bg-[#0c1224]/90 border border-slate-800 flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
                Your In-Meeting Identity
              </h3>

              {/* Name Input */}
              <div className="mb-3">
                <label className="text-[11px] text-slate-400 block mb-1 font-medium">Display Name *</label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Your Full Name"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>

              {/* Role Picker */}
              <div>
                <label className="text-[11px] text-slate-400 block mb-1 font-medium">Role in this Session</label>
                <div className="grid grid-cols-3 gap-1.5">
                  {(['Host', 'Chairperson', 'Speaker', 'Secretariat', 'Guest'] as const).map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setUserRole(r)}
                      className={`px-2.5 py-2 rounded-xl text-xs font-medium border transition text-center ${
                        userRole === r
                          ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 font-semibold'
                          : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Share Link */}
            <div className="pt-3 border-t border-slate-800/80 mt-3 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">Share with invitees:</span>
              <button
                type="button"
                onClick={handleCopyInvite}
                className="text-xs text-cyan-400 hover:underline flex items-center gap-1 font-medium"
              >
                {hasCopiedLink ? 'Invite Copied!' : 'Copy Meeting Invite'}
              </button>
            </div>
          </div>
        </div>

        {/* Meeting Mode Selector (Video / Audio / In-Person) */}
        <div className="grid grid-cols-3 gap-2.5 mb-6">
          <button
            type="button"
            onClick={() => setMeetingMode('video')}
            className={`p-3.5 rounded-2xl border text-left transition relative flex flex-col justify-between ${
              meetingMode === 'video'
                ? 'bg-gradient-to-br from-[#0c2340] to-[#0d162d] border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.25)]'
                : 'bg-[#0c1224]/80 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                <Video className="w-4 h-4" />
              </div>
              <div
                className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                  meetingMode === 'video' ? 'bg-cyan-500 border-cyan-400 text-slate-950' : 'border-slate-600'
                }`}
              >
                {meetingMode === 'video' && <Check className="w-2.5 h-2.5 stroke-[3]" />}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-white">Video Meeting</p>
              <p className="text-[10px] text-slate-400">Multi-party WebRTC</p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setMeetingMode('audio')}
            className={`p-3.5 rounded-2xl border text-left transition relative flex flex-col justify-between ${
              meetingMode === 'audio'
                ? 'bg-gradient-to-br from-[#24133d] to-[#120b22] border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.25)]'
                : 'bg-[#0c1224]/80 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center">
                <Headphones className="w-4 h-4" />
              </div>
              <div
                className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                  meetingMode === 'audio' ? 'bg-purple-500 border-purple-400 text-slate-950' : 'border-slate-600'
                }`}
              >
                {meetingMode === 'audio' && <Check className="w-2.5 h-2.5 stroke-[3]" />}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-white">Audio Only</p>
              <p className="text-[10px] text-slate-400">Crystal voice stream</p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setMeetingMode('in-person')}
            className={`p-3.5 rounded-2xl border text-left transition relative flex flex-col justify-between ${
              meetingMode === 'in-person'
                ? 'bg-gradient-to-br from-[#1c2c20] to-[#0c1610] border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.25)]'
                : 'bg-[#0c1224]/80 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
              <div
                className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                  meetingMode === 'in-person' ? 'bg-emerald-500 border-emerald-400 text-slate-950' : 'border-slate-600'
                }`}
              >
                {meetingMode === 'in-person' && <Check className="w-2.5 h-2.5 stroke-[3]" />}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-white">Hybrid / Notes</p>
              <p className="text-[10px] text-slate-400">AI live transcription</p>
            </div>
          </button>
        </div>

        {/* Inputs Block */}
        <div className="space-y-4 mb-6">
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <label className="font-medium text-slate-300">Meeting Title *</label>
              <span>{title.length}/100</span>
            </div>
            <input
              type="text"
              value={title}
              maxLength={100}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Executive Strategy Session"
              className="w-full px-4 py-3 rounded-2xl bg-[#0c1224]/90 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <label className="font-medium text-slate-300">Description / Focus (Optional)</label>
              <span>{description.length}/500</span>
            </div>
            <textarea
              rows={2}
              value={description}
              maxLength={500}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief overview of goals and discussion points..."
              className="w-full px-4 py-2.5 rounded-2xl bg-[#0c1224]/90 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition resize-none"
            />
          </div>
        </div>

        {/* Dynamic Agenda Section */}
        <div className="mb-6 p-4 rounded-2xl bg-[#0c1224]/90 border border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-cyan-400" />
              <span>Agenda Items ({agenda.length})</span>
            </h3>
          </div>

          <div className="space-y-2 mb-3">
            {agenda.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between gap-2 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300"
              >
                <span className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-md bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold text-[10px]">
                    {idx + 1}
                  </span>
                  <span>{item}</span>
                </span>
                <button
                  type="button"
                  onClick={() => handleRemoveAgenda(idx)}
                  className="text-slate-500 hover:text-rose-400 transition"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          <form onSubmit={handleAddAgenda} className="flex gap-2">
            <input
              type="text"
              value={newAgendaItem}
              onChange={(e) => setNewAgendaItem(e.target.value)}
              placeholder="+ Add agenda topic..."
              className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-xs text-white font-semibold transition"
            >
              Add
            </button>
          </form>
        </div>

        {/* Primary Launch Button */}
        <button
          onClick={handleStart}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(6,182,212,0.45)] hover:shadow-[0_0_40px_rgba(6,182,212,0.65)] hover:scale-[1.01] active:scale-[0.99] transition mb-4"
        >
          <Video className="w-5 h-5" />
          <span>Enter Meeting Room</span>
          <span>→</span>
        </button>

        {/* Arohi Intelligence Helper */}
        <div className="p-3.5 rounded-2xl bg-[#0c1224]/90 border border-cyan-500/20 flex items-center gap-3">
          <ArohiMeetAvatar size="sm" status="ready" />
          <div className="flex-1">
            <p className="text-xs font-semibold text-white flex items-center gap-1">
              <span>Arohi AI Co-Host Ready</span>
              <span className="text-cyan-400">✦</span>
            </p>
            <p className="text-[11px] text-slate-300">
              Real-time multi-party WebRTC audio/video with continuous live transcription & Gemini AI Minutes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetSetupView;
