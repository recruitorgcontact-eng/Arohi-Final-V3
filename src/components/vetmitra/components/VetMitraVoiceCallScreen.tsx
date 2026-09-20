// Screen 3: Live Spoken Veterinary Voice Call Screen matching Mockup 3
// Dark twilight backdrop with ambient cow photography, glowing resonant voice orb, dual live subtitles, and hands-free action pills

import React, { useState, useEffect } from 'react';
import { 
  PhoneOff, Mic, MicOff, Volume2, Video, 
  Sparkles, Camera, FileText, AlertTriangle, ShieldCheck, ChevronUp, ChevronDown
} from 'lucide-react';
import { VetLanguage, VetSpecies } from '../types';
import { VET_STOCK_IMAGES } from '../data/vetStockImages';
import { playArohiVoice, stopArohiVoice } from '../../../utils/arohiVoicePlayer';

interface Props {
  language: VetLanguage;
  species: VetSpecies;
  animalName?: string;
  onEndCall: () => void;
  onOpenEmergency: () => void;
}

export const VetMitraVoiceCallScreen: React.FC<Props> = ({
  language,
  species,
  animalName = 'Ganga',
  onEndCall,
  onOpenEmergency,
}) => {
  const isOdia = language === 'or';
  const [callDuration, setCallDuration] = useState(165); // 02:45 matching mockup
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [showSubtitles, setShowSubtitles] = useState(true);

  // Subtitles turn matching Mockup 3
  const [userSubtitle, setUserSubtitle] = useState({
    odia: 'ମୋ ଗାଈର ଦୁଧ କମି ଯାଇଛି। ଖାଦ୍ୟ ଠିକ୍ ଅଛି କି ନାହିଁ?',
    en: 'My cow’s milk has reduced. Is the feed okay?',
    time: '02:42',
  });

  const [arohiSubtitle, setArohiSubtitle] = useState({
    odia: 'ବୁଝିଲି। ମୁଁ ଆପଣଙ୍କୁ କିଛି ପ୍ରଶ୍ନ ପଚାରିବି ଏବଂ ସଠିକ୍ ପରାମର୍ଶ ଦେବି।',
    en: 'I understand. I will ask you a few questions and give the right advice.',
    time: '02:45',
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleActionClick = (topic: string) => {
    if (topic === 'camera') {
      setIsCameraActive(!isCameraActive);
    } else if (topic === 'eating_less') {
      setUserSubtitle({
        odia: 'ସେ ଠିକ୍‌ରେ ଘାସ ଖାଉନାହିଁ ଓ ଜାବର କମିଛି।',
        en: 'It is eating less fodder and rumination is slow.',
        time: formatTimer(callDuration),
      });
      setArohiSubtitle({
        odia: 'ଜାବର କମିବା ଫାଇବର ଅଭାବ କିମ୍ବା ଆସିଡୋସିସ୍ର ଲକ୍ଷଣ। ଶୁଖିଲା ନଡ଼ା ବଢ଼ାନ୍ତୁ।',
        en: 'Low rumination signals fiber deficit or rumen acidosis. Increase dry paddy straw.',
        time: formatTimer(callDuration + 2),
      });
      playArohiVoice(
        isOdia 
          ? 'ଜାବର କମିବା ଫାଇବର ଅଭାବ କିମ୍ବା ଆସିଡୋସିସ୍ର ଲକ୍ଷଣ। ଶୁଖିଲା ନଡ଼ା ବଢ଼ାନ୍ତୁ।'
          : 'Low rumination signals fiber deficit or rumen acidosis. Increase dry paddy straw.',
        { language: isOdia ? 'or-IN' : 'en-IN' }
      );
    } else if (topic === 'check_ration') {
      setUserSubtitle({
        odia: 'ଆଜିର ସମ୍ପୂର୍ଣ୍ଣ NASEM ରେସନ୍ କୁହନ୍ତୁ।',
        en: 'Calculate the complete NASEM daily ration for my cow.',
        time: formatTimer(callDuration),
      });
      setArohiSubtitle({
        odia: 'ଦୈନିକ ୧୫ କିଲୋ ନେପିୟର, ୪ କିଲୋ ନଡ଼ା, ୨.୫ କିଲୋ ମକା ଚୂନା ଓ ୫୦ ଗ୍ରାମ ମିନେରାଲ ଦିଅନ୍ତୁ।',
        en: 'Feed 15kg Napier, 4kg straw, 2.5kg maize grain, and 50g mineral mix.',
        time: formatTimer(callDuration + 2),
      });
      playArohiVoice(
        isOdia
          ? 'ଦୈନିକ ୧୫ କିଲୋ ନେପିୟର, ୪ କିଲୋ ନଡ଼ା, ୨.୫ କିଲୋ ମକା ଚୂନା ଓ ୫୦ ଗ୍ରାମ ମିନେରାଲ ଦିଅନ୍ତୁ।'
          : 'Feed 15kg Napier, 4kg straw, 2.5kg maize grain, and 50g mineral mix.',
        { language: isOdia ? 'or-IN' : 'en-IN' }
      );
    }
  };

  return (
    <div className="relative min-h-[750px] rounded-3xl overflow-hidden bg-slate-950 text-white flex flex-col justify-between p-4 sm:p-6 shadow-2xl border-2 border-slate-800 animate-in fade-in-50 duration-300">
      {/* Background Ambience with Subtle Cow Photography (Matching Mockup 3) */}
      <div className="absolute inset-0 z-0">
        <img
          src={VET_STOCK_IMAGES.cattleJersey}
          alt="Dairy Cow Backdrop"
          className="w-full h-full object-cover object-left opacity-25 filter blur-[1px]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/90" />
      </div>

      {/* Top Status & Emergency Bar */}
      <div className="relative z-10 flex items-center justify-between pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-black tracking-tight text-slate-100 flex items-center gap-2">
              <span>Arohi VetMitra™</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                LIVE CALL
              </span>
            </h3>
            <p className="text-[11px] text-slate-400">AI Veterinary Voice Call • {animalName}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Active Call Timer Pill */}
          <div className="px-3 py-1 rounded-full bg-slate-900/90 border border-slate-800 text-xs font-mono font-bold flex items-center gap-2 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>{formatTimer(callDuration)}</span>
          </div>

          <button
            onClick={onOpenEmergency}
            className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs flex items-center gap-1.5 shadow-sm transition-transform active:scale-95"
          >
            <span>Emergency 1962</span>
          </button>
        </div>
      </div>

      {/* Central Interactive Soundwave Orb (Matching Mockup 3) */}
      <div className="relative z-10 flex flex-col items-center justify-center my-auto py-6 space-y-4 text-center">
        {/* Animated Resonant Glow Rings */}
        <div className="relative w-44 h-44 sm:w-52 sm:h-52 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping duration-1000" />
          <div className="absolute inset-3 rounded-full bg-gradient-to-tr from-emerald-500/30 to-teal-400/20 blur-md animate-pulse" />
          
          <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full bg-gradient-to-br from-emerald-400 via-teal-500 to-emerald-700 shadow-2xl shadow-emerald-500/50 flex items-center justify-center border-4 border-emerald-300/40">
            {/* Center Core */}
            <div className="w-24 h-24 rounded-full bg-slate-950 flex items-center justify-center">
              <span className="text-3xl">🐄</span>
            </div>
          </div>
        </div>

        <div className="space-y-1">
          <h4 className="text-lg sm:text-xl font-extrabold text-white">
            Arohi is listening...
          </h4>
          <p className="text-xs text-slate-400 max-w-xs mx-auto">
            {isOdia
              ? 'ସ୍ୱାଭାବିକ ଭାବେ ଓଡ଼ିଆରେ କଥା ହୁଅନ୍ତୁ। ମୁଁ ଆପଣଙ୍କ ଭାଷା ବୁଝୁଛି।'
              : 'Speak naturally. I understand your language and accent.'}
          </p>
        </div>

        {/* Mode & Audio Indicators */}
        <div className="flex items-center gap-2 text-xs">
          <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 font-medium">
            {species.toUpperCase()} MODE
          </span>
          <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-emerald-400 font-medium">
            {isOdia ? 'ଓଡ଼ିଆ (Odia)' : 'English'}
          </span>
          <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 font-medium">
            HD Clear Voice
          </span>
        </div>
      </div>

      {/* Dual Real-Time Subtitles Stream (Matching Mockup 3) */}
      {showSubtitles && (
        <div className="relative z-10 space-y-2 max-w-xl mx-auto w-full">
          {/* User Bubble */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3 space-y-1 backdrop-blur-md">
            <div className="flex items-center justify-between text-[10px] text-slate-400">
              <span className="font-bold text-emerald-400">You (Farmer)</span>
              <span>{userSubtitle.time}</span>
            </div>
            <p className="text-xs font-bold text-slate-100">{userSubtitle.odia}</p>
            <p className="text-[11px] text-slate-400">{userSubtitle.en}</p>
          </div>

          {/* Arohi Bubble */}
          <div className="bg-emerald-950/40 border border-emerald-800/60 rounded-2xl p-3 space-y-1 backdrop-blur-md">
            <div className="flex items-center justify-between text-[10px] text-emerald-300">
              <span className="font-bold">Arohi VetMitra</span>
              <span>{arohiSubtitle.time}</span>
            </div>
            <p className="text-xs font-bold text-emerald-100">{arohiSubtitle.odia}</p>
            <p className="text-[11px] text-emerald-300/80">{arohiSubtitle.en}</p>
          </div>
        </div>
      )}

      {/* Quick Hands-Free Action Pills (Matching Mockup 3) */}
      <div className="relative z-10 flex items-center justify-center gap-2 overflow-x-auto py-2">
        <button
          onClick={() => handleActionClick('camera')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition-all ${
            isCameraActive ? 'bg-emerald-600 text-white border-emerald-500' : 'bg-slate-900/90 text-slate-200 border-slate-800'
          }`}
        >
          <Camera className="w-3.5 h-3.5" />
          <span>{isCameraActive ? 'Camera On' : 'Show with camera'}</span>
        </button>

        <button
          onClick={() => handleActionClick('eating_less')}
          className="px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-800 text-xs font-bold flex items-center gap-1.5 transition-colors"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>It’s eating less</span>
        </button>

        <button
          onClick={() => handleActionClick('check_ration')}
          className="px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-800 text-xs font-bold flex items-center gap-1.5 transition-colors"
        >
          <span>🌱</span>
          <span>Check ration</span>
        </button>
      </div>

      {/* Primary Call Controls (Matching Mockup 3) */}
      <div className="relative z-10 flex items-center justify-center gap-4 sm:gap-6 pt-3 border-t border-slate-800/80">
        {/* Mute Button */}
        <button
          onClick={() => setIsMuted(!isMuted)}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
            isMuted ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40' : 'bg-slate-900 text-slate-200 hover:bg-slate-800 border border-slate-800'
          }`}
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        </button>

        {/* Speaker Toggle */}
        <button
          onClick={() => setIsSpeakerOn(!isSpeakerOn)}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
            isSpeakerOn ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-900 text-slate-200 border border-slate-800'
          }`}
          title="Speaker"
        >
          <Volume2 className="w-5 h-5" />
        </button>

        {/* Video Camera Toggle */}
        <button
          onClick={() => setIsCameraActive(!isCameraActive)}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
            isCameraActive ? 'bg-blue-600 text-white' : 'bg-slate-900 text-slate-200 border border-slate-800'
          }`}
          title="Live Camera Feed"
        >
          <Video className="w-5 h-5" />
        </button>

        {/* End Call (Big Crimson Pill) */}
        <button
          onClick={onEndCall}
          className="w-14 h-14 rounded-full bg-rose-600 hover:bg-rose-500 text-white flex items-center justify-center shadow-lg shadow-rose-900/50 transition-transform active:scale-95"
          title="End Call"
        >
          <PhoneOff className="w-6 h-6" />
        </button>
      </div>

      {/* Subtitles Toggle Bar at bottom */}
      <div className="relative z-10 text-center pt-2">
        <button
          onClick={() => setShowSubtitles(!showSubtitles)}
          className="text-[11px] text-slate-500 hover:text-slate-300 font-semibold inline-flex items-center gap-1"
        >
          <span>Live Subtitles: {showSubtitles ? 'On' : 'Off'} (ରିଅଲ୍ ଟାଇମ୍ ଅନୁବାଦ)</span>
          {showSubtitles ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />}
        </button>
      </div>
    </div>
  );
};
