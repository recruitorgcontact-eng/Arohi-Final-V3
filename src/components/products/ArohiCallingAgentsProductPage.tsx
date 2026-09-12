import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { 
  PhoneCall, 
  Mic, 
  Volume2, 
  Sparkles, 
  Play, 
  Pause, 
  PhoneForwarded, 
  PhoneIncoming, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Building2, 
  Headphones, 
  Users, 
  Clock, 
  Globe,
  Award,
  Zap,
  Phone,
  Loader2
} from 'lucide-react';
import { playArohiVoice, stopArohiVoice } from '../../utils/arohiVoicePlayer';

interface ArohiCallingAgentsProductPageProps {
  onLaunchLiveDashboard: () => void;
  onNavigateTab: (tab: string) => void;
  isDarkMode?: boolean;
}

export default function ArohiCallingAgentsProductPage({
  onLaunchLiveDashboard,
  onNavigateTab,
  isDarkMode = true
}: ArohiCallingAgentsProductPageProps) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioLoading, setAudioLoading] = useState(false);
  const [activeVoiceLanguage, setActiveVoiceLanguage] = useState('Hindi');
  const [selectedAgentIndex, setSelectedAgentIndex] = useState(0);

  const badges = [
    'Natural Conversations',
    'Multilingual (150+)',
    '24/7 Availability',
    'Scalable & Secure'
  ];

  const agentProfiles = [
    {
      title: 'Inbound Receptionist',
      type: 'INBOUND',
      desc: 'Answers customer inquiries instantly, verifies caller details, answers FAQs, and books appointments into your calendar.',
      icon: PhoneIncoming,
      color: 'from-blue-500 to-cyan-500',
      sampleText: 'Namaste! Thank you for calling Arohi Medical Center. How may I assist you with your consultation booking today?'
    },
    {
      title: 'Outbound Sales & Qualifier',
      type: 'OUTBOUND',
      desc: 'Contacts leads within 30 seconds of form submission. Qualifies budget, timeline, and decision-maker status.',
      icon: PhoneForwarded,
      color: 'from-emerald-500 to-teal-500',
      sampleText: 'Hello Rajesh ji, this is Arohi from Solar Bharat. I noticed you requested an estimation for your rooftop solar system!'
    },
    {
      title: 'Payment & Dues Recovery',
      type: 'OUTBOUND / REMINDER',
      desc: 'Courteous, compliant payment reminder calls. Sends instant payment link over WhatsApp during the call.',
      icon: Clock,
      color: 'from-amber-500 to-orange-500',
      sampleText: 'Namaste Priya ji, calling with a friendly reminder regarding your invoice number 402 due tomorrow. Can I text you the UPI link?'
    },
    {
      title: 'Customer Satisfaction & NPS',
      type: 'FEEDBACK',
      desc: 'Gathers post-service feedback, reviews, and resolves complaints before they hit social media.',
      icon: Headphones,
      color: 'from-purple-500 to-indigo-500',
      sampleText: 'Hello! Arohi calling from Royal Stay Hotel. How was your room service experience today? We would love your rating out of 5.'
    },
    {
      title: 'Event & Webinar RSVP Caller',
      type: 'OUTBOUND',
      desc: 'Boosts live attendance by calling registrants 1 hour prior to confirm seat reservations.',
      icon: Users,
      color: 'from-rose-500 to-pink-500',
      sampleText: 'Hi Amit, your seat for the AI Entrepreneurship Masterclass starts in 45 minutes. Are you joining from mobile or laptop?'
    },
    {
      title: 'Custom Enterprise Voice Agent',
      type: 'SPECIALIZED',
      desc: 'Tailored specifically with your enterprise database, API webhooks, and custom reasoning workflows.',
      icon: Zap,
      color: 'from-violet-500 to-fuchsia-500',
      sampleText: 'Connecting to enterprise core. Authentication token verified. Ready to execute multi-step database transactions.'
    }
  ];

  const industries = [
    { name: 'Healthcare & Clinics', icon: '🏥', desc: 'Patient appointments, lab report alerts, reminders' },
    { name: 'Education & Coaching', icon: '🎓', desc: 'Student lead qualification, fee reminders, counseling' },
    { name: 'Banking & Financial Services', icon: '🏦', desc: 'KYC guidance, loan verification, EMI alerts' },
    { name: 'Retail & E-commerce', icon: '🛍️', desc: 'Cash-on-Delivery confirmation, address verification' },
    { name: 'Real Estate & Builders', icon: '🏢', desc: 'Site visit scheduling, buyer budget qualification' },
    { name: 'Automobile Dealerships', icon: '🚗', desc: 'Service reminders, test-drive bookings, follow-ups' }
  ];

  // Stop active Arohi voice playback
  const stopAudioPlayback = () => {
    stopArohiVoice();
    setIsPlayingAudio(false);
    setAudioLoading(false);
  };

  // Play audio using Arohi Flagship 24kHz studio voice (identical to Arohi live calls)
  const handleToggleAudio = (customText?: string) => {
    if (isPlayingAudio || audioLoading) {
      stopAudioPlayback();
      if (!customText) return;
    }

    const textToSpeak = customText || agentProfiles[selectedAgentIndex].sampleText;
    stopAudioPlayback();
    setAudioLoading(true);

    playArohiVoice(textToSpeak, {
      voice: 'Zypher',
      allowBrowserRoboticVoice: false, // Strictly never degrade to robotic system voices
      onStart: () => {
        setAudioLoading(false);
        setIsPlayingAudio(true);
      },
      onEnd: () => {
        setAudioLoading(false);
        setIsPlayingAudio(false);
      },
      onError: () => {
        setAudioLoading(false);
        setIsPlayingAudio(false);
      }
    });
  };

  useEffect(() => {
    return () => {
      stopAudioPlayback();
    };
  }, []);

  return (
    <div className="w-full space-y-12 pb-20 font-sans">
      {/* 1. Hero Section */}
      <section className="text-center pt-4 sm:pt-8 max-w-4xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-black uppercase tracking-widest mb-4">
          <PhoneCall className="w-3.5 h-3.5" />
          <span>AROHI CALLING AGENTS</span>
          <span className="px-1.5 py-0.2 rounded bg-emerald-500 text-white text-[9px] font-black">NEW</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-zinc-900 dark:text-white leading-tight">
          AI that doesn&apos;t just respond. It speaks.
        </h1>
        <p className="text-sm sm:text-lg text-zinc-600 dark:text-zinc-400 mt-3 max-w-2xl mx-auto leading-relaxed">
          Human-like AI voice agents for every business. Available in 150+ languages. Always on, zero wait times, infinite scale.
        </p>

        {/* Feature Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-5">
          {badges.map((b, i) => (
            <span
              key={i}
              className="px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 border border-black/8 dark:border-white/10 text-xs font-semibold text-zinc-700 dark:text-zinc-300"
            >
              ✓ {b}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
          <button
            onClick={onLaunchLiveDashboard}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-sm uppercase tracking-wider shadow-lg hover:shadow-emerald-500/25 transition-all cursor-pointer flex items-center gap-2"
          >
            <Phone className="w-4 h-4" />
            <span>Launch Calling Agent Cockpit</span>
          </button>
          <button
            onClick={() => handleToggleAudio()}
            className="px-5 py-3 rounded-2xl bg-white/80 dark:bg-white/5 hover:bg-black/5 dark:hover:bg-white/10 border border-black/10 dark:border-white/15 text-zinc-800 dark:text-zinc-200 font-bold text-sm transition-all cursor-pointer flex items-center gap-2"
          >
            {audioLoading ? (
              <Loader2 className="w-4 h-4 text-emerald-500 animate-spin" />
            ) : isPlayingAudio ? (
              <Pause className="w-4 h-4 text-rose-500" />
            ) : (
              <Play className="w-4 h-4 text-emerald-500" />
            )}
            <span>
              {audioLoading 
                ? 'Connecting Voice Preview...' 
                : isPlayingAudio 
                  ? 'Stop Voice Demo' 
                  : 'Hear Voice Sample (0:45)'}
            </span>
          </button>
        </div>

        {/* Interactive Caller Showcase Card with Waveform & Gender Switcher */}
        <div className="mt-10 max-w-2xl mx-auto rounded-3xl p-6 bg-gradient-to-b from-white to-slate-50 dark:from-[#15171e] dark:to-[#0c0d12] border border-emerald-500/30 shadow-2xl text-left relative overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-black/5 dark:border-white/8">
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${isPlayingAudio ? 'bg-emerald-500 animate-ping' : 'bg-emerald-500/70'}`}></span>
              <span className="text-xs font-bold text-emerald-500 uppercase tracking-wider font-mono">
                Live Voice Call Channel
              </span>
            </div>

            {/* Arohi Voice Persona Badge */}
            <div className="flex items-center gap-2 px-3 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-bold font-mono tracking-tight">Arohi Natural Voice</span>
            </div>
          </div>

          <div className="flex items-start gap-4 my-5">
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center text-2xl shadow-lg shrink-0 ${
              isPlayingAudio ? 'ring-4 ring-emerald-500/30 animate-pulse' : ''
            }`}>
              🎙️
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center justify-between gap-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                    Arohi Voice Agent (Warm &amp; Natural)
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-mono font-bold">
                    STUDIO QUALITY
                  </span>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-500">
                  {agentProfiles[selectedAgentIndex].type}
                </span>
              </div>

              <p className="text-sm text-zinc-600 dark:text-zinc-300 mt-1 italic leading-relaxed">
                &ldquo;{agentProfiles[selectedAgentIndex].sampleText}&rdquo;
              </p>

              {/* Animated Live Voice Waveform */}
              <div className="flex items-center gap-1 mt-3 h-8 px-3 py-1 bg-black/5 dark:bg-black/40 rounded-xl border border-black/5 dark:border-white/5">
                {[40, 65, 85, 30, 95, 75, 45, 80, 60, 90, 50, 70, 85, 40, 65, 80, 55, 90, 45, 60].map((h, i) => (
                  <span
                    key={i}
                    className={`flex-1 rounded-full transition-all duration-200 ${
                      isPlayingAudio 
                        ? 'bg-gradient-to-t from-emerald-500 to-teal-300 animate-pulse' 
                        : audioLoading
                        ? 'bg-amber-400/50 animate-pulse'
                        : 'bg-zinc-400/30'
                    }`}
                    style={{ 
                      height: isPlayingAudio 
                        ? `${Math.max(20, (h * ((i % 4) + 1)) % 100)}%` 
                        : audioLoading 
                        ? `${(i % 5) * 15 + 20}%`
                        : '20%' 
                    }}
                  ></span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-black/5 dark:border-white/5">
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleToggleAudio()}
                disabled={audioLoading}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-75 text-white text-xs font-bold flex items-center gap-2 cursor-pointer shadow-sm transition-all"
              >
                {audioLoading ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : isPlayingAudio ? (
                  <Pause className="w-3.5 h-3.5" />
                ) : (
                  <Play className="w-3.5 h-3.5" />
                )}
                <span>
                  {audioLoading 
                    ? 'Playing Sample...' 
                    : isPlayingAudio 
                      ? 'Stop Voice' 
                      : 'Listen to Voice Sample'}
                </span>
              </button>
              <span className="text-xs text-zinc-500 hidden sm:inline">
                {isPlayingAudio ? '● Arohi Voice Live Preview' : 'Authentic human-like voice with natural regional inflection'}
              </span>
            </div>
            <button
              onClick={onLaunchLiveDashboard}
              className="text-xs font-bold text-emerald-500 hover:text-emerald-400 flex items-center gap-1 cursor-pointer"
            >
              Open Dialing Studio →
            </button>
          </div>
        </div>
      </section>

      {/* 2. 6 Pre-Tuned Voice Agent Profiles */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white">
            Pre-Trained Voice Agents Ready in Minutes
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Choose from ready-made personas or customize tone, language, knowledge and webhook actions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
          {agentProfiles.map((p, idx) => {
            const Icon = p.icon;
            const isSelected = selectedAgentIndex === idx;
            return (
              <div
                key={idx}
                onClick={() => {
                  setSelectedAgentIndex(idx);
                  handleToggleAudio(p.sampleText);
                }}
                className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${
                  isSelected 
                    ? 'ring-2 ring-emerald-500 border-emerald-500 bg-emerald-500/5 shadow-md' 
                    : isDarkMode 
                    ? 'bg-[#15171e] border-white/8 hover:border-emerald-500/40' 
                    : 'bg-white border-black/8 hover:shadow-md'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${p.color} text-white flex items-center justify-center shadow-xs`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/10 text-zinc-500 dark:text-zinc-300">
                    {p.type}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{p.title}</h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed line-clamp-3">
                  {p.desc}
                </p>
                <div className="mt-3 pt-2 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-[11px]">
                  <span className="text-emerald-500 font-bold flex items-center gap-1.5">
                    {isSelected && (isPlayingAudio || audioLoading) ? (
                      <>
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                        <span>Streaming Voice</span>
                      </>
                    ) : isSelected ? (
                      '● Currently Selected'
                    ) : (
                      'Click to Preview'
                    )}
                  </span>
                  <div className="p-1 rounded-md bg-emerald-500/10 text-emerald-500">
                    {isSelected && isPlayingAudio ? (
                      <Pause className="w-3.5 h-3.5 text-rose-500" />
                    ) : (
                      <Volume2 className="w-3.5 h-3.5" />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Built for Every Industry */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="bg-gradient-to-r from-emerald-950/20 via-teal-950/20 to-slate-950/30 rounded-3xl border border-emerald-500/20 p-6 sm:p-8">
          <div className="text-center mb-6">
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">
              INDUSTRY ARCHITECTURES
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white mt-1">
              Built for Every Indian Industry
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {industries.map((ind, i) => (
              <div 
                key={i}
                className="bg-white/80 dark:bg-[#12141c]/80 rounded-2xl p-4 border border-black/6 dark:border-white/8"
              >
                <div className="text-2xl mb-2">{ind.icon}</div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{ind.name}</h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">{ind.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Telephony Metrics */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-4 rounded-2xl bg-white/70 dark:bg-[#15171e]/70 border border-black/6 dark:border-white/8">
            <div className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 font-display">1M+</div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400 font-medium mt-0.5">Calls Handled Monthly</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/70 dark:bg-[#15171e]/70 border border-black/6 dark:border-white/8">
            <div className="text-2xl sm:text-3xl font-black text-blue-600 dark:text-blue-400 font-display">500+</div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400 font-medium mt-0.5">Enterprises &amp; MSMEs</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/70 dark:bg-[#15171e]/70 border border-black/6 dark:border-white/8">
            <div className="text-2xl sm:text-3xl font-black text-amber-600 dark:text-amber-400 font-display">40%</div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400 font-medium mt-0.5">Higher Conversions</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/70 dark:bg-[#15171e]/70 border border-black/6 dark:border-white/8">
            <div className="text-2xl sm:text-3xl font-black text-purple-600 dark:text-purple-400 font-display">99.9%</div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400 font-medium mt-0.5">Carrier Grade SLA</div>
          </div>
        </div>
      </section>
    </div>
  );
}
