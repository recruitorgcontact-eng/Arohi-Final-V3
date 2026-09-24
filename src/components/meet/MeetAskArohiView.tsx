import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, 
  Sparkles, 
  Send, 
  Search, 
  Lightbulb, 
  CheckCircle2, 
  Users, 
  FileText, 
  Plus, 
  Mic, 
  Camera, 
  Share2, 
  Check, 
  Calendar, 
  Link as LinkIcon, 
  MessageSquare,
  ShieldCheck
} from 'lucide-react';
import ArohiMeetLogo from './ArohiMeetLogo';
import ArohiMeetAvatar from './ArohiMeetAvatar';
import { MeetingSession } from './meetData';

interface MeetAskArohiViewProps {
  meeting: MeetingSession;
  onBack: () => void;
  initialQuery?: string;
}

interface ArohiChatMessage {
  id: string;
  sender: 'user' | 'arohi';
  text: string;
  timestamp: string;
  decisions?: Array<{ number: number; text: string; status: string }>;
  actionPills?: string[];
  quickActions?: Array<{ label: string; action: string }>;
}

export const MeetAskArohiView: React.FC<MeetAskArohiViewProps> = ({
  meeting,
  onBack,
  initialQuery
}) => {
  const [activeFilter, setActiveFilter] = useState<'ask' | 'search' | 'insights' | 'actions' | 'people' | 'documents'>('ask');
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Chat message thread initialized with dynamic contextual greeting
  const [messages, setMessages] = useState<ArohiChatMessage[]>(() => [
    {
      id: 'm-welcome',
      sender: 'arohi',
      text: `Hello! I am Arohi, your real-time meeting intelligence copilot. I am actively tracking "${meeting.title}". You can ask me to summarize discussion points, extract decisions, look up speaker statements, or draft an email update.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      quickActions: [
        { label: 'Summarize Discussion', action: 'summary' },
        { label: 'Show Key Decisions', action: 'decisions' },
        { label: 'List Action Items', action: 'actions' }
      ]
    }
  ]);

  // Handle Initial Query if passed from parent
  useEffect(() => {
    if (initialQuery && initialQuery.trim()) {
      handleAskQuery(initialQuery.trim());
    }
  }, [initialQuery]);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleAskQuery = async (queryText: string) => {
    if (!queryText.trim()) return;

    const userMsg: ArohiChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: queryText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/meet/ask-arohi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          meetingTitle: meeting.title,
          meetingDate: meeting.date,
          executiveSummary: meeting.executiveSummary,
          transcript: meeting.transcript.map((t) => `${t.speakerName}: ${t.text}`).join('\n'),
          decisions: meeting.decisions,
          actionItems: meeting.actionItems,
          question: queryText
        })
      });

      if (res.ok) {
        const data = await res.json();
        const arohiReply: ArohiChatMessage = {
          id: `a-${Date.now()}`,
          sender: 'arohi',
          text: data.answer || "I've reviewed the meeting records. Here are the relevant findings.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          decisions: data.decisions,
          actionPills: data.actionPills || ['Show timeline', 'Related discussions', 'Add to tasks']
        };
        setMessages((prev) => [...prev, arohiReply]);
      } else {
        throw new Error('API request failed');
      }
    } catch (err) {
      // Intelligent contextual fallback
      setTimeout(() => {
        let reply = "Based on the meeting transcript:";
        let pills = ['Show timeline', 'Add to tasks'];

        if (queryText.toLowerCase().includes('decision')) {
          if (meeting.decisions && meeting.decisions.length > 0) {
            reply = `Recorded Decisions in ${meeting.title}:\n` + meeting.decisions.map((d, i) => `${i + 1}. [${d.status}] ${d.title}`).join('\n');
          } else {
            reply = `No formal decisions have been logged yet for "${meeting.title}". You can extract them using the "AI Live Summarize" button in the meeting room.`;
          }
        } else if (queryText.toLowerCase().includes('action') || queryText.toLowerCase().includes('task')) {
          if (meeting.actionItems && meeting.actionItems.length > 0) {
            reply = `Action Items for ${meeting.title}:\n` + meeting.actionItems.map((a, i) => `${i + 1}. ${a.task} (Assignee: ${a.assignee}, Due: ${a.dueDate})`).join('\n');
          } else {
            reply = `No action items have been assigned yet for "${meeting.title}".`;
          }
        } else if (queryText.toLowerCase().includes('email')) {
          reply = `Subject: Summary & Action Items - ${meeting.title}\n\nDear Team,\n\nThank you for participating in today's session (${meeting.title}).\n\nMinutes and transcripts have been compiled securely.\n\nWarm regards,\nArohi AI Copilot`;
          pills = ['Copy Email', 'Send via Gmail', 'Edit Draft'];
        } else {
          reply = `For "${meeting.title}", Arohi is actively monitoring discussion transcripts and agenda points to keep your executive records structured.`;
        }

        const fallbackMsg: ArohiChatMessage = {
          id: `a-fb-${Date.now()}`,
          sender: 'arohi',
          text: reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          actionPills: pills
        };
        setMessages((prev) => [...prev, fallbackMsg]);
      }, 700);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestionCards = [
    'What decisions were made?',
    'What were the key discussion points?',
    'Who was assigned the budget report?',
    'Show me the vendor options discussed',
    'Show pending action items',
    'What objections were raised?',
    'Summarize this meeting in 1 minute',
    'Create follow-up email for the team'
  ];

  return (
    <div className="relative min-h-[92vh] w-full flex flex-col justify-between bg-[#070B14] text-white select-none pb-14 overflow-x-hidden">
      {/* Glow Ambience */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Top Header Bar */}
      <div className="w-full px-4 sm:px-6 py-3 flex items-center justify-between border-b border-slate-800 bg-[#070B14]/90 backdrop-blur-md z-30">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <ArohiMeetLogo size="sm" showTagline={false} />
        </div>

        {/* Arohi Persona Speech Greeting */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:block px-3 py-1 rounded-full bg-purple-950/40 border border-purple-500/30 text-xs text-purple-300">
            I'm here to help! 💜
          </div>
          <ArohiMeetAvatar size="sm" status="ready" showBadge />
        </div>
      </div>

      {/* Main Container */}
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 pt-4 flex-1 flex flex-col justify-between">
        {/* Subtitle */}
        <div className="mb-4">
          <h1 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <span>Ask Arohi</span>
            <span className="text-cyan-400 text-xs px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30">
              Meeting Intelligence
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Get answers, summaries, decisions, and actions from this meeting or your past meetings.
          </p>
        </div>

        {/* Sub-Filters Pill Row (Screen 9) */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 mb-4 border-b border-slate-800/80">
          {[
            { id: 'ask', label: '💬 Ask' },
            { id: 'search', label: '🔍 Search' },
            { id: 'insights', label: '💡 Insights' },
            { id: 'actions', label: ' Actions' },
            { id: 'people', label: '👥 People' },
            { id: 'documents', label: '📄 Documents' }
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id as any)}
              className={`px-3.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                activeFilter === f.id
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_12px_rgba(6,182,212,0.4)]'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* 8 Suggestion Query Cards Grid (Screen 9) */}
        {messages.length <= 4 && (
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Suggested Questions
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {suggestionCards.map((suggestion, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAskQuery(suggestion)}
                  className="p-3 rounded-2xl bg-[#0c1224]/80 border border-slate-800/90 hover:border-cyan-500/50 hover:bg-[#0f1730] transition text-left flex items-center justify-between group"
                >
                  <span className="text-xs text-slate-300 group-hover:text-white font-medium">
                    {suggestion}
                  </span>
                  <span className="text-slate-500 group-hover:text-cyan-400 text-xs transition">
                    ›
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Chat Conversation Thread */}
        <div className="flex-1 space-y-4 mb-4 overflow-y-auto max-h-[500px] pr-1">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              {/* Message Bubble */}
              <div
                className={`max-w-[90%] sm:max-w-[80%] p-4 rounded-2xl ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-br-none shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                    : 'bg-[#0c1224] border border-slate-800 text-slate-200 rounded-bl-none shadow-lg'
                }`}
              >
                {/* Header for Arohi */}
                {msg.sender === 'arohi' && (
                  <div className="flex items-center gap-2 mb-2 pb-1.5 border-b border-slate-800/80">
                    <ArohiMeetAvatar size="xs" status="ready" />
                    <span className="font-semibold text-xs text-white">Arohi</span>
                    <span className="text-[10px] text-cyan-400">✦ Meeting Intelligence</span>
                  </div>
                )}

                <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                  {msg.text}
                </p>

                {/* Structured Decisions List inside Message Bubble */}
                {msg.decisions && (
                  <div className="mt-3 space-y-2">
                    {msg.decisions.map((d) => (
                      <div
                        key={d.number}
                        className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-2 text-xs"
                      >
                        <span className="w-4 h-4 rounded-full bg-slate-800 text-cyan-400 font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">
                          {d.number}
                        </span>
                        <div className="flex-1">
                          <p className="text-slate-200">{d.text}</p>
                        </div>
                        <span className="px-1.5 py-0.2 rounded text-[9px] bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold">
                          {d.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Action Pills */}
                {msg.actionPills && (
                  <div className="flex flex-wrap gap-1.5 mt-3 pt-2 border-t border-slate-800/80">
                    {msg.actionPills.map((pill, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleAskQuery(pill)}
                        className="px-2.5 py-1 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-700 text-[10px] text-cyan-300 font-medium transition"
                      >
                        ✦ {pill}
                      </button>
                    ))}
                  </div>
                )}

                {/* Quick Action Buttons */}
                {msg.quickActions && (
                  <div className="flex flex-wrap gap-2 mt-3 pt-2 border-t border-slate-800/80">
                    {msg.quickActions.map((qa, idx) => (
                      <button
                        key={idx}
                        className="px-3 py-1 rounded-xl bg-slate-900 hover:bg-cyan-500/20 border border-slate-700 hover:border-cyan-500/40 text-xs text-slate-200 transition"
                      >
                        {qa.label}
                      </button>
                    ))}
                  </div>
                )}

                <span className="block text-[9px] text-slate-400 mt-2 text-right">
                  {msg.timestamp}
                </span>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 p-3 rounded-2xl bg-[#0c1224] border border-slate-800 w-fit">
              <ArohiMeetAvatar size="xs" status="listening" />
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce delay-100" />
                <span className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce delay-200" />
              </div>
              <span className="text-xs text-slate-400">Arohi is analyzing meeting memory...</span>
            </div>
          )}
          <div ref={chatBottomRef} />
        </div>

        {/* Bottom Input Area matching Screen 9 */}
        <div className="pt-2">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAskQuery(inputQuery);
            }}
            className="p-2 rounded-2xl bg-[#0c1224] border border-slate-800 flex items-center gap-2 shadow-2xl focus-within:border-cyan-500/50"
          >
            <button
              type="button"
              className="p-2 rounded-xl text-slate-400 hover:text-white transition"
              title="Add attachment / context"
            >
              <Plus className="w-4 h-4" />
            </button>

            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Ask Arohi anything about this meeting..."
              className="flex-1 px-3 py-2 bg-transparent text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none"
            />

            <button
              type="button"
              className="p-2 rounded-xl text-slate-400 hover:text-cyan-400 transition"
              title="Voice Input"
            >
              <Mic className="w-4 h-4" />
            </button>

            <button
              type="button"
              className="p-2 rounded-xl text-slate-400 hover:text-cyan-400 transition"
              title="Visual Context"
            >
              <Camera className="w-4 h-4" />
            </button>

            <button
              type="submit"
              disabled={!inputQuery.trim() || isLoading}
              className="p-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 disabled:opacity-50 text-white font-bold transition hover:scale-105 active:scale-95"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Context Status Bar */}
          <div className="flex items-center justify-between text-[10px] text-slate-500 px-3 pt-2">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                This Meeting ⌵
              </span>
              <span>•</span>
              <span className="text-slate-400 truncate max-w-[150px]">
                {meeting.title} ⌵
              </span>
            </div>

            <div className="flex items-center gap-1 text-cyan-400/80">
              <ShieldCheck className="w-3 h-3" />
              <span>Secure & Private</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetAskArohiView;
