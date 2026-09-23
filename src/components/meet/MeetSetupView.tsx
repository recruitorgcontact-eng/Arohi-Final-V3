import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Calendar, 
  Video, 
  Headphones, 
  Users, 
  Check, 
  FileText, 
  Sparkles, 
  Globe, 
  CheckCircle2, 
  Monitor, 
  Plus, 
  Link as LinkIcon, 
  Clock, 
  Crown,
  Share2
} from 'lucide-react';
import ArohiMeetLogo from './ArohiMeetLogo';
import ArohiMeetAvatar from './ArohiMeetAvatar';
import { MeetingSession, DEFAULT_MEETING } from './meetData';

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
  const [title, setTitle] = useState('Quarterly Budget & Growth Review');
  const [description, setDescription] = useState('Reviewing Q3 performance metrics, capital allocation for digital growth, and team hiring roadmap.');
  
  // Governance & AI toggles
  const [enableAiMinutes, setEnableAiMinutes] = useState(true);
  const [allowRecording, setAllowRecording] = useState(true);
  const [liveTranscript, setLiveTranscript] = useState(true);
  const [multiLanguage, setMultiLanguage] = useState(true);
  const [autoActionItems, setAutoActionItems] = useState(true);
  const [allowScreenSharing, setAllowScreenSharing] = useState(true);
  
  // Agenda
  const [agenda, setAgenda] = useState([
    'Project Updates & Status Review',
    'Quarterly Budget Review & Allocation',
    'Digital Campaign Proposal & Outlay',
    'Infrastructure Upgrade & Vendor Selection',
    'Open Discussion & Next Action Protocol'
  ]);
  const [newAgendaItem, setNewAgendaItem] = useState('');

  // Calendar
  const [addToCalendar, setAddToCalendar] = useState(true);
  const [generateLink, setGenerateLink] = useState(true);

  const handleUseTemplate = () => {
    setAgenda([
      '1. Review previous meeting action items',
      '2. Current sprint milestones & metrics',
      '3. Budget allocations & capex approval',
      '4. Department hurdles & risk mitigation',
      '5. Action items assignment & next sync'
    ]);
  };

  const handleAddAgenda = (e: React.FormEvent) => {
    e.preventDefault();
    if (newAgendaItem.trim()) {
      setAgenda([...agenda, newAgendaItem.trim()]);
      setNewAgendaItem('');
    }
  };

  const handleStart = () => {
    onLaunchMeeting({
      title: title || 'Executive Strategy Session',
      description,
      mode: meetingMode,
      agenda,
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
        <div className="mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            New <span className="text-cyan-400">Meeting</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Set it up your way. Arohi takes care of the rest.
          </p>
        </div>

        {/* Meeting Mode Selector (Video / Audio / In-Person) */}
        <div className="grid grid-cols-3 gap-2.5 mb-6">
          {/* Video */}
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
              <p className="text-[10px] text-slate-400">Face to face, anywhere</p>
            </div>
          </button>

          {/* Audio Only */}
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
              <p className="text-[10px] text-slate-400">Crystal clear audio</p>
            </div>
          </button>

          {/* In-Person */}
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
              <p className="text-xs font-semibold text-white">In-Person</p>
              <p className="text-[10px] text-slate-400">Add room details</p>
            </div>
          </button>
        </div>

        {/* Inputs Block */}
        <div className="space-y-4 mb-6">
          {/* Title */}
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <label className="font-medium text-slate-300">Meeting Title *</label>
              <span>{title.length}/100</span>
            </div>
            <div className="relative">
              <input
                type="text"
                value={title}
                maxLength={100}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Quarterly Budget Review"
                className="w-full px-4 py-3 rounded-2xl bg-[#0c1224]/90 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <label className="font-medium text-slate-300">Add Description (Optional)</label>
              <span>{description.length}/500</span>
            </div>
            <textarea
              rows={2}
              value={description}
              maxLength={500}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Agenda, meeting goals, key topics..."
              className="w-full px-4 py-2.5 rounded-2xl bg-[#0c1224]/90 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition resize-none"
            />
          </div>
        </div>

        {/* AI & Governance Toggles (2 columns x 3 rows) */}
        <div className="mb-6">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
            AI & Governance Capabilities
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {/* Enable AI Minutes */}
            <div className="p-3 rounded-2xl bg-[#0c1224]/90 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-pink-500/10 text-pink-400 flex items-center justify-center">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">Enable AI Minutes</p>
                  <p className="text-[10px] text-slate-400">Auto-generate notes & summary</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setEnableAiMinutes(!enableAiMinutes)}
                className={`w-10 h-5 rounded-full p-0.5 transition ${
                  enableAiMinutes ? 'bg-cyan-500' : 'bg-slate-700'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition transform ${
                    enableAiMinutes ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Allow Recording */}
            <div className="p-3 rounded-2xl bg-[#0c1224]/90 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 flex items-center justify-center">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">Allow Recording</p>
                  <p className="text-[10px] text-slate-400">Save meeting for later</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setAllowRecording(!allowRecording)}
                className={`w-10 h-5 rounded-full p-0.5 transition ${
                  allowRecording ? 'bg-cyan-500' : 'bg-slate-700'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition transform ${
                    allowRecording ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Live Transcript & Captions */}
            <div className="p-3 rounded-2xl bg-[#0c1224]/90 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold text-[10px]">
                  CC
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">Live Transcript & Captions</p>
                  <p className="text-[10px] text-slate-400">Real-time transcription</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setLiveTranscript(!liveTranscript)}
                className={`w-10 h-5 rounded-full p-0.5 transition ${
                  liveTranscript ? 'bg-cyan-500' : 'bg-slate-700'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition transform ${
                    liveTranscript ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Multi-language Translation */}
            <div className="p-3 rounded-2xl bg-[#0c1224]/90 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">Multi-language Translation</p>
                  <p className="text-[10px] text-slate-400">150+ languages supported</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setMultiLanguage(!multiLanguage)}
                className={`w-10 h-5 rounded-full p-0.5 transition ${
                  multiLanguage ? 'bg-cyan-500' : 'bg-slate-700'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition transform ${
                    multiLanguage ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Auto Action Items */}
            <div className="p-3 rounded-2xl bg-[#0c1224]/90 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">Auto Action Items</p>
                  <p className="text-[10px] text-slate-400">Detect and track tasks</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setAutoActionItems(!autoActionItems)}
                className={`w-10 h-5 rounded-full p-0.5 transition ${
                  autoActionItems ? 'bg-cyan-500' : 'bg-slate-700'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition transform ${
                    autoActionItems ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Allow Screen Sharing */}
            <div className="p-3 rounded-2xl bg-[#0c1224]/90 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                  <Monitor className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">Allow Screen Sharing</p>
                  <p className="text-[10px] text-slate-400">Let participants share</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setAllowScreenSharing(!allowScreenSharing)}
                className={`w-10 h-5 rounded-full p-0.5 transition ${
                  allowScreenSharing ? 'bg-cyan-500' : 'bg-slate-700'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition transform ${
                    allowScreenSharing ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Agenda Section with Template Option */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Add Agenda (Optional)
            </h3>
            <button
              type="button"
              onClick={handleUseTemplate}
              className="text-xs text-cyan-400 hover:text-cyan-300 font-medium transition"
            >
              Use Template
            </button>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#0c1224]/90 border border-slate-800 space-y-2">
            {agenda.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-slate-200">
                <span className="w-4 h-4 rounded-full bg-slate-800 text-[10px] flex items-center justify-center text-cyan-400 font-semibold flex-shrink-0">
                  {idx + 1}
                </span>
                <span className="flex-1">{item}</span>
              </div>
            ))}

            <form onSubmit={handleAddAgenda} className="flex gap-2 pt-2 border-t border-slate-800/80">
              <input
                type="text"
                value={newAgendaItem}
                onChange={(e) => setNewAgendaItem(e.target.value)}
                placeholder="+ Add agenda topic..."
                className="flex-1 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
              <button
                type="submit"
                className="px-3 py-1.5 rounded-xl bg-slate-800 text-xs text-slate-200 hover:text-white"
              >
                Add
              </button>
            </form>
          </div>
        </div>

        {/* Participants & Calendar Sync Block */}
        <div className="p-4 rounded-2xl bg-[#0c1224]/90 border border-slate-800 mb-6 space-y-4">
          {/* Organizer Info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
                alt="Junoon"
                className="w-8 h-8 rounded-full object-cover"
              />
              <div>
                <p className="text-xs font-semibold text-white flex items-center gap-1">
                  Junoon Nayak <Crown className="w-3 h-3 text-amber-400" />
                </p>
                <p className="text-[10px] text-slate-400">Organizer</p>
              </div>
            </div>

            <button
              type="button"
              className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-cyan-400 hover:border-cyan-400 transition"
            >
              + Add Participants
            </button>
          </div>

          {/* Link Generation Toggle */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-800/60">
            <div className="flex items-center gap-2">
              <LinkIcon className="w-4 h-4 text-cyan-400" />
              <div>
                <p className="text-xs font-semibold text-white">Generate Meeting Link</p>
                <p className="text-[10px] text-slate-400">Anyone with the link can join</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setGenerateLink(!generateLink)}
              className={`w-10 h-5 rounded-full p-0.5 transition ${
                generateLink ? 'bg-cyan-500' : 'bg-slate-700'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition transform ${
                  generateLink ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Calendar Sync Toggle */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-800/60">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-purple-400" />
              <div>
                <p className="text-xs font-semibold text-white">Add to Calendar</p>
                <p className="text-[10px] text-slate-400">Google, Outlook or others</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setAddToCalendar(!addToCalendar)}
              className={`w-10 h-5 rounded-full p-0.5 transition ${
                addToCalendar ? 'bg-cyan-500' : 'bg-slate-700'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition transform ${
                  addToCalendar ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Primary Launch Button */}
        <button
          onClick={handleStart}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-fuchsia-600 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(6,182,212,0.45)] hover:shadow-[0_0_40px_rgba(6,182,212,0.65)] hover:scale-[1.01] active:scale-[0.99] transition mb-4"
        >
          <Video className="w-5 h-5" />
          <span>Start Meeting</span>
          <span>→</span>
        </button>

        {/* Arohi Helper Card */}
        <div className="p-3.5 rounded-2xl bg-[#0c1224]/90 border border-cyan-500/20 flex items-center gap-3">
          <ArohiMeetAvatar size="sm" status="ready" />
          <div className="flex-1">
            <p className="text-xs font-semibold text-white flex items-center gap-1">
              <span>Arohi is ready!</span>
              <span className="text-cyan-400">✦</span>
            </p>
            <p className="text-[11px] text-slate-300">
              I'll take notes, track actions and keep everyone aligned.
            </p>
          </div>
          <span className="text-[10px] font-serif italic text-purple-300 hidden sm:block">
            Meetings that matter.
          </span>
        </div>
      </div>
    </div>
  );
};

export default MeetSetupView;
