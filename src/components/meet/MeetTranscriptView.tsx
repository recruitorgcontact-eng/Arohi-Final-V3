import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Sparkles, 
  Download, 
  Search, 
  Globe, 
  Check, 
  Bookmark, 
  Volume2, 
  PhoneOff, 
  MoreVertical, 
  Users, 
  FileText, 
  Filter, 
  Send,
  Languages
} from 'lucide-react';
import ArohiMeetLogo from './ArohiMeetLogo';
import ArohiMeetAvatar from './ArohiMeetAvatar';
import { MeetingSession, TranscriptEntry } from './meetData';

interface MeetTranscriptViewProps {
  meeting: MeetingSession;
  onBack: () => void;
  onEndMeeting?: () => void;
  onOpenAskArohi: (initialQuery?: string) => void;
}

export const MeetTranscriptView: React.FC<MeetTranscriptViewProps> = ({
  meeting,
  onBack,
  onEndMeeting,
  onOpenAskArohi
}) => {
  const [activeTab, setActiveTab] = useState<'transcript' | 'highlights' | 'speakers' | 'summary' | 'translation'>('transcript');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('English (Auto-detect)');
  const [translateTarget, setTranslateTarget] = useState('Hindi (हिंदी)');
  const [isTranslating, setIsTranslating] = useState(false);

  // Settings
  const [realtimeTranscription, setRealtimeTranscription] = useState(true);
  const [speakerIdentification, setSpeakerIdentification] = useState(true);
  const [autoPunctuation, setAutoPunctuation] = useState(true);
  const [profanityFilter, setProfanityFilter] = useState(true);

  // Local transcript entries with highlight toggles
  const [entries, setEntries] = useState<TranscriptEntry[]>(meeting.transcript);
  const [askArohiInput, setAskArohiInput] = useState('');

  const handleToggleHighlight = (id: string) => {
    setEntries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, isHighlight: !e.isHighlight } : e))
    );
  };

  const filteredEntries = entries.filter((e) => {
    if (activeTab === 'highlights') {
      return e.isHighlight && e.text.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return (
      e.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.speakerName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleDownload = () => {
    const text = entries
      .map((e) => `[${e.timestamp}] ${e.speakerName} (${e.speakerRole || 'Member'}):\n${e.text}\n`)
      .join('\n');
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Arohi_Transcript_${meeting.title.replace(/\s+/g, '_')}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="relative min-h-[92vh] w-full flex flex-col justify-between bg-[#070B14] text-white select-none pb-12 overflow-x-hidden">
      {/* Background Lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Top Header Bar (Screen 8) */}
      <div className="w-full px-4 sm:px-6 py-3 flex items-center justify-between border-b border-slate-800 bg-[#070B14]/90 backdrop-blur-md z-30">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <ArohiMeetLogo size="sm" showTagline={false} />

          <div className="hidden sm:flex items-center gap-2 pl-2">
            <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Live Meeting {meeting.durationFormatted || '00:42:18'}
            </span>

            <span className="text-xs text-slate-400 flex items-center gap-1">
              👥 30 Participants
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onEndMeeting && (
            <button
              onClick={onEndMeeting}
              className="px-3 py-1.5 rounded-full bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs flex items-center gap-1 shadow-md"
            >
              <PhoneOff className="w-3.5 h-3.5" />
              <span>End</span>
            </button>
          )}

          <button className="p-1.5 rounded-full bg-slate-900 text-slate-400 hover:text-white">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Page Title & Slogan */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 pt-4 pb-2 flex items-center justify-between">
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <span className="text-cyan-400">🗎</span>
            <span>Live Transcript</span>
          </h1>
          <p className="text-xs text-slate-400">
            Real-time transcription. Multi-language. AI-powered.
          </p>
        </div>

        <div className="hidden sm:block p-2 rounded-xl bg-purple-950/20 border border-purple-500/20 text-purple-300 font-serif italic text-xs">
          Conversations into Impact ✦
        </div>
      </div>

      {/* Sub Tabs Pill Row */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 mb-3">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar border-b border-slate-800/80 pb-2">
          {(['transcript', 'highlights', 'speakers', 'summary', 'translation'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3.5 py-1 rounded-full text-xs font-semibold capitalize transition ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_12px_rgba(6,182,212,0.4)]'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Left Transcript Stream | Right Arohi Intelligence & Settings */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-3 gap-4 flex-1">
        {/* ==================================================== */}
        {/* LEFT COLUMN (2/3): REAL-TIME TRANSCRIPT FEED         */}
        {/* ==================================================== */}
        <div className="lg:col-span-2 p-4 rounded-2xl bg-[#0c1224]/90 border border-slate-800 flex flex-col justify-between">
          {/* Search bar inside transcript */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3 gap-2">
            <div className="flex-1 relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search spoken keywords, topics, or speakers..."
                className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
            </div>

            <button
              onClick={handleDownload}
              className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-slate-200 flex items-center gap-1.5 flex-shrink-0"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>Export</span>
            </button>
          </div>

          {/* Scrollable Conversation Stream */}
          <div className="flex-1 space-y-3.5 overflow-y-auto max-h-[500px] pr-2">
            {filteredEntries.length === 0 ? (
              <div className="py-16 px-4 text-center">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto mb-3">
                  <FileText className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-semibold text-white mb-1">No Transcript Entries Yet</h4>
                <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                  As speech is recognized during the call, spoken sentences will automatically appear here with exact timestamps and speaker diarization.
                </p>
              </div>
            ) : (
              filteredEntries.map((turn) => (
                <div
                  key={turn.id}
                  className={`p-3 rounded-xl border transition ${
                    turn.isHighlight
                      ? 'bg-purple-950/20 border-purple-500/40 shadow-[0_0_15px_rgba(168,85,247,0.15)]'
                      : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2">
                      <img
                        src={turn.avatar}
                        alt={turn.speakerName}
                        className="w-6 h-6 rounded-full object-cover border border-slate-700"
                      />
                      <span className="font-semibold text-xs text-cyan-400">
                        {turn.speakerName}
                      </span>
                      {turn.speakerRole && (
                        <span className="text-[10px] text-slate-500">({turn.speakerRole})</span>
                      )}
                      <span className="text-[10px] text-slate-500">{turn.timestamp}</span>
                    </div>

                    {/* Bookmark / Highlight Action */}
                    <button
                      onClick={() => handleToggleHighlight(turn.id)}
                      className={`p-1 rounded transition ${
                        turn.isHighlight
                          ? 'text-purple-400 bg-purple-500/20'
                          : 'text-slate-500 hover:text-slate-300'
                      }`}
                      title={turn.isHighlight ? 'Unmark Highlight' : 'Mark as Highlight'}
                    >
                      <Bookmark className="w-3.5 h-3.5 fill-current" />
                    </button>
                  </div>

                  {/* Spoken Text */}
                  <p className="text-xs text-slate-200 leading-relaxed font-light">
                    {turn.text}
                  </p>

                  {/* Optional Translated Sub-Text */}
                  {activeTab === 'translation' && turn.translatedText && (
                    <p className="text-xs text-purple-300 font-serif mt-1 pt-1 border-t border-purple-500/20">
                      {turn.translatedText}
                    </p>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Bottom Waveform & Recording Indicator */}
          <div className="pt-3 border-t border-slate-800/80 mt-3 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
              <span className="text-slate-300 font-medium">Recording... 42:18</span>
            </div>

            <button
              onClick={() => {
                if (entries.length > 0) {
                  handleToggleHighlight(entries[entries.length - 1].id);
                }
              }}
              className="px-3 py-1 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/40 text-purple-300 text-xs flex items-center gap-1.5 transition"
            >
              <Bookmark className="w-3 h-3" />
              <span>Mark Highlight</span>
            </button>
          </div>
        </div>

        {/* ==================================================== */}
        {/* RIGHT COLUMN (1/3): AROHI INTEL & CONTROLS          */}
        {/* ==================================================== */}
        <div className="space-y-4">
          {/* Arohi Avatar Status Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-950/60 to-[#0c1224] border border-cyan-500/30">
            <div className="flex items-center gap-3 mb-2">
              <ArohiMeetAvatar size="sm" status="listening" showBadge />
              <div>
                <h3 className="text-xs font-bold text-white flex items-center gap-1">
                  <span>Arohi is listening...</span>
                  <span className="text-cyan-400">✦</span>
                </h3>
                <p className="text-[10px] text-slate-400">
                  Transcribing, identifying speakers & capturing key points.
                </p>
              </div>
            </div>
          </div>

          {/* Live Stats Grid */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-[10px] text-slate-400">Participants</span>
              <p className="text-base font-bold text-white mt-0.5">30</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-[10px] text-slate-400">Speakers</span>
              <p className="text-base font-bold text-cyan-400 mt-0.5">7</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-[10px] text-slate-400">Duration</span>
              <p className="text-base font-bold text-purple-400 mt-0.5">42:18</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-[10px] text-slate-400">Accuracy</span>
              <p className="text-base font-bold text-emerald-400 mt-0.5">98%</p>
            </div>
          </div>

          {/* Detected Speakers Chips */}
          <div className="p-3.5 rounded-2xl bg-[#0c1224]/90 border border-slate-800">
            <p className="text-xs font-semibold text-slate-300 mb-2">Detected Speakers</p>
            <div className="flex flex-wrap gap-1.5">
              {[
                { tag: 'JN', name: 'Junoon' },
                { tag: 'PS', name: 'Priya' },
                { tag: 'DS', name: 'Dr. Mohanty' },
                { tag: 'RV', name: 'Rakesh' },
                { tag: 'AD', name: 'Anita' },
                { tag: 'SK', name: 'Khan' },
                { tag: '+24', name: 'Members' }
              ].map((s, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-lg bg-slate-900 border border-slate-700 text-[10px] font-semibold text-slate-300"
                >
                  <span className="text-cyan-400 font-bold">{s.tag}</span> {s.name}
                </span>
              ))}
            </div>
          </div>

          {/* Transcript Settings Form (Screen 8) */}
          <div className="p-4 rounded-2xl bg-[#0c1224]/90 border border-slate-800 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Transcript Settings
            </h4>

            {/* Language Selection */}
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Source Language</label>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="w-full px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-400"
              >
                <option>English (Auto-detect)</option>
                <option>Hindi (हिंदी)</option>
                <option>Odia (ଓଡ଼ିଆ)</option>
                <option>Bengali (বাংলা)</option>
                <option>Spanish (Español)</option>
              </select>
            </div>

            {/* Toggles */}
            <div className="space-y-2 pt-1 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Real-time transcription</span>
                <input
                  type="checkbox"
                  checked={realtimeTranscription}
                  onChange={(e) => setRealtimeTranscription(e.target.checked)}
                  className="accent-cyan-500 rounded"
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-300">Speaker identification</span>
                <input
                  type="checkbox"
                  checked={speakerIdentification}
                  onChange={(e) => setSpeakerIdentification(e.target.checked)}
                  className="accent-cyan-500 rounded"
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-300">Auto punctuation</span>
                <input
                  type="checkbox"
                  checked={autoPunctuation}
                  onChange={(e) => setAutoPunctuation(e.target.checked)}
                  className="accent-cyan-500 rounded"
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-300">Profanity filter</span>
                <input
                  type="checkbox"
                  checked={profanityFilter}
                  onChange={(e) => setProfanityFilter(e.target.checked)}
                  className="accent-cyan-500 rounded"
                />
              </div>
            </div>

            {/* Translate to */}
            <div className="pt-2 border-t border-slate-800">
              <label className="text-[11px] text-slate-400 block mb-1">Translate to (optional)</label>
              <select
                value={translateTarget}
                onChange={(e) => {
                  setTranslateTarget(e.target.value);
                  setActiveTab('translation');
                }}
                className="w-full px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-purple-300 focus:outline-none focus:border-purple-400"
              >
                <option>Hindi (हिंदी)</option>
                <option>Odia (ଓଡ଼ିଆ)</option>
                <option>Bengali (বাংলা)</option>
                <option>Tamil (தமிழ்)</option>
                <option>Telugu (తెలుగు)</option>
                <option>French (Français)</option>
                <option>Spanish (Español)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Bottom Ask Arohi Bar (Screen 8 Bottom) */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 pt-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (askArohiInput.trim()) {
              onOpenAskArohi(askArohiInput.trim());
              setAskArohiInput('');
            }
          }}
          className="p-2.5 rounded-2xl bg-[#0c1224] border border-cyan-500/30 flex items-center gap-2 shadow-lg"
        >
          <ArohiMeetAvatar size="xs" status="ready" />
          <input
            type="text"
            value={askArohiInput}
            onChange={(e) => setAskArohiInput(e.target.value)}
            placeholder="✦ Ask Arohi anything about this transcript..."
            className="flex-1 px-3 py-1.5 rounded-xl bg-slate-950 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />
          <button
            type="submit"
            className="p-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default MeetTranscriptView;
