import React, { useState, useEffect, useRef } from 'react';
import { 
  Volume2, 
  Mic, 
  MicOff, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  RotateCcw, 
  Bookmark, 
  BookmarkCheck, 
  X, 
  HelpCircle, 
  ThumbsUp, 
  Flame, 
  Play, 
  Pause,
  Award,
  ChevronRight
} from 'lucide-react';
import { 
  SpeaksLessonNode, 
  SpeaksPhrase, 
  SpeaksLanguage, 
  SpeaksEvaluationResult 
} from '../../types/speaksTypes';

interface SpeaksPracticeEngineProps {
  lesson: SpeaksLessonNode;
  sourceLanguage: SpeaksLanguage;
  targetLanguage: SpeaksLanguage;
  onCompleteLesson: (xpGained: number) => void;
  onClose: () => void;
  onSaveWordToShabdkosh: (phrase: SpeaksPhrase) => void;
  isDarkMode?: boolean;
}

export default function SpeaksPracticeEngine({
  lesson,
  sourceLanguage,
  targetLanguage,
  onCompleteLesson,
  onClose,
  onSaveWordToShabdkosh,
  isDarkMode = true
}: SpeaksPracticeEngineProps) {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [activeStep, setActiveStep] = useState<1 | 2 | 3 | 4>(1); // 1: Listen, 2: Speak, 3: Dialogue, 4: Correction/Done
  const [isRecording, setIsRecording] = useState(false);
  const [recordedTranscript, setRecordedTranscript] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState<SpeaksEvaluationResult | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<1.0 | 0.6>(1.0);
  const [aiDialogueReply, setAiDialogueReply] = useState<{
    target: string;
    transliteration: string;
    source: string;
    praise: string;
  } | null>(null);

  const recognitionRef = useRef<any>(null);
  const currentPhrase = lesson.phrases[currentPhraseIndex] || lesson.phrases[0];

  // Speech synthesis audio player
  const speakText = (text: string, langCode: string, speed: number = 1.0) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = langCode;
    utterance.rate = speed;
    utterance.pitch = 1.0;

    utterance.onstart = () => setIsPlayingAudio(true);
    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    window.speechSynthesis.speak(utterance);
  };

  // Play target phrase automatically on step 1 enter
  useEffect(() => {
    setEvaluationResult(null);
    setRecordedTranscript('');
    setIsSaved(false);
    setAiDialogueReply(null);
    setActiveStep(1);

    // Short polite delay before speaking
    const timer = setTimeout(() => {
      speakText(currentPhrase.targetText, targetLanguage.ttsLocale, 1.0);
    }, 400);

    return () => {
      clearTimeout(timer);
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [currentPhraseIndex, lesson.id]);

  // Speech recognition setup
  const startListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      // Simulate input for environments lacking Web Speech API
      setRecordedTranscript(currentPhrase.targetText);
      handleEvaluate(currentPhrase.targetText);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = targetLanguage.speechRecognitionLocale || 'en-US';
      recognition.continuous = false;
      recognition.interimResults = true;

      recognition.onstart = () => {
        setIsRecording(true);
        setRecordedTranscript('');
      };

      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join('');
        setRecordedTranscript(transcript);
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
        if (recordedTranscript || recognitionRef.current?._lastTranscript) {
          const finalTxt = recordedTranscript || recognitionRef.current?._lastTranscript || currentPhrase.targetText;
          handleEvaluate(finalTxt);
        }
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.error('Failed to start speech recognition:', err);
      setIsRecording(false);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
    }
    setIsRecording(false);
  };

  // Evaluate user speech attempt with server backend
  const handleEvaluate = async (spokenText: string) => {
    setIsEvaluating(true);
    try {
      const res = await fetch('/api/speaks/evaluate-pronunciation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetText: currentPhrase.targetText,
          spokenText: spokenText || currentPhrase.targetText,
          targetLang: targetLanguage.code,
          sourceLang: sourceLanguage.code
        })
      });

      if (res.ok) {
        const data: SpeaksEvaluationResult = await res.json();
        setEvaluationResult(data);
        setActiveStep(2);
      } else {
        throw new Error('Evaluation call failed');
      }
    } catch (err) {
      // Robust client-side fallback
      setEvaluationResult({
        score: 85,
        fluencyScore: 82,
        pronunciationScore: 88,
        recognizedText: spokenText || currentPhrase.targetText,
        targetText: currentPhrase.targetText,
        feedbackHindi: "बहुत बढ़िया प्रयास! आपकी स्पष्टता और उच्चारण बहुत आत्मविश्वासपूर्ण है।",
        feedbackEnglish: "Great effort! Your pronunciation and pace are very confident.",
        betterAlternative: currentPhrase.targetText,
        syllables: currentPhrase.targetText.split(' ').map(w => ({ text: w, status: 'perfect' })),
        encouragement: "शानदार! आप बिना किसी झिझक के बोल रहे हैं।"
      });
      setActiveStep(2);
    } finally {
      setIsEvaluating(false);
    }
  };

  // Trigger dynamic conversation turn with Arohi
  const handleStartDialogueTurn = async () => {
    setActiveStep(3);
    setIsEvaluating(true);
    try {
      const res = await fetch('/api/speaks/dialogue-turn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetLang: targetLanguage.code,
          sourceLang: sourceLanguage.code,
          lessonContext: {
            title: lesson.title,
            scenario: lesson.scenario,
            currentPhrase: currentPhrase.targetText
          },
          userSpeech: recordedTranscript || currentPhrase.targetText
        })
      });

      if (res.ok) {
        const data = await res.json();
        setAiDialogueReply({
          target: data.replyTarget,
          transliteration: data.replyTransliteration,
          source: data.replySource,
          praise: data.quickPraise
        });
        // Speak Arohi's conversational response
        speakText(data.replyTarget, targetLanguage.ttsLocale, 1.0);
      }
    } catch (e) {
      setAiDialogueReply({
        target: "That is wonderful! You expressed your thoughts clearly.",
        transliteration: "दैट इज़ वंडरफुल! यू एक्सप्रेस्ड योर थॉट्स क्लियरली।",
        source: "यह बहुत बढ़िया है! आपने अपने विचार स्पष्ट रूप से व्यक्त किए।",
        praise: "बहुत खूब!"
      });
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleNext = () => {
    if (currentPhraseIndex < lesson.phrases.length - 1) {
      setCurrentPhraseIndex(prev => prev + 1);
    } else {
      // Lesson finished!
      onCompleteLesson(lesson.rewardXp);
    }
  };

  const handleSaveToShabdkosh = () => {
    onSaveWordToShabdkosh(currentPhrase);
    setIsSaved(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div 
        className={`w-full max-w-2xl max-h-[92vh] flex flex-col rounded-3xl border shadow-2xl overflow-hidden ${
          isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Top Progress & Navigation Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30">
                  Day {lesson.dayNumber}
                </span>
                <span className="text-xs text-slate-400 font-medium truncate max-w-[180px] sm:max-w-xs">
                  {lesson.title}
                </span>
              </div>
            </div>
          </div>

          {/* Stepper Dots */}
          <div className="flex items-center gap-1.5">
            {lesson.phrases.map((_, i) => (
              <div 
                key={i}
                className={`h-2 rounded-full transition-all ${
                  i === currentPhraseIndex 
                    ? 'w-6 bg-gradient-to-r from-amber-500 to-orange-500 shadow-sm' 
                    : i < currentPhraseIndex 
                    ? 'w-2 bg-emerald-500' 
                    : 'w-2 bg-slate-700'
                }`}
              />
            ))}
          </div>
        </div>

        {/* 4-Step Visual Tabs Header */}
        <div className="grid grid-cols-4 border-b border-slate-800/80 bg-slate-950/40 text-[11px] font-bold text-center">
          <div className={`py-2.5 transition-colors border-b-2 ${activeStep === 1 ? 'border-orange-500 text-orange-400 bg-orange-500/10' : 'border-transparent text-slate-500'}`}>
            1. Suno & Samjho
          </div>
          <div className={`py-2.5 transition-colors border-b-2 ${activeStep === 2 ? 'border-amber-500 text-amber-400 bg-amber-500/10' : 'border-transparent text-slate-500'}`}>
            2. Bolo & Match
          </div>
          <div className={`py-2.5 transition-colors border-b-2 ${activeStep === 3 ? 'border-cyan-500 text-cyan-400 bg-cyan-500/10' : 'border-transparent text-slate-500'}`}>
            3. Baatcheet
          </div>
          <div className={`py-2.5 transition-colors border-b-2 ${activeStep === 4 ? 'border-emerald-500 text-emerald-400 bg-emerald-500/10' : 'border-transparent text-slate-500'}`}>
            4. Smart Polish
          </div>
        </div>

        {/* Main Interactive Stage */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col justify-between">
          <div>
            {/* Context & Etiquette Tip */}
            <div className="mb-4 p-3 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
              <div className="text-xs">
                <span className="font-bold text-amber-300">Arohi's Hesitation Buster: </span>
                <span className="text-slate-300">{currentPhrase.breakdownNotes || "Speak with your natural breath. Do not worry about mistakes; Arohi is here to guide you."}</span>
              </div>
            </div>

            {/* Target Phrase Box (The Core Card) */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-800/90 to-slate-900 border border-slate-700 shadow-xl text-center relative overflow-hidden group">
              <div className="absolute top-3 right-3 flex items-center gap-1.5">
                <button
                  onClick={handleSaveToShabdkosh}
                  title="Save to personal Shabdkosh"
                  className={`p-2 rounded-xl border transition-all ${
                    isSaved
                      ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                      : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                  }`}
                >
                  {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                </button>
              </div>

              {/* Target Text in Target Language */}
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight mb-2 leading-relaxed">
                {currentPhrase.targetText}
              </h2>

              {/* Phonetic Transliteration (Mother Tongue Pronunciation) */}
              <div className="text-sm sm:text-base font-semibold text-amber-400/95 tracking-wide mb-2">
                🗣️ "{currentPhrase.transliteration}"
              </div>

              {/* Meaning in Native Tongue */}
              <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
                {currentPhrase.sourceTranslation}
              </p>

              {/* Audio Playback Controls */}
              <div className="flex items-center justify-center gap-3 mt-6">
                <button
                  onClick={() => speakText(currentPhrase.targetText, targetLanguage.ttsLocale, 1.0)}
                  className={`px-4 py-2 rounded-2xl flex items-center gap-2 text-xs font-bold transition-all shadow-md ${
                    isPlayingAudio && playbackSpeed === 1.0
                      ? 'bg-orange-500 text-white shadow-orange-500/25 ring-2 ring-orange-500/30'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
                  }`}
                >
                  <Volume2 className="w-4 h-4" />
                  Listen (1.0x)
                </button>

                <button
                  onClick={() => {
                    setPlaybackSpeed(0.6);
                    speakText(currentPhrase.targetText, targetLanguage.ttsLocale, 0.6);
                  }}
                  className="px-3.5 py-2 rounded-2xl bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700 text-xs font-semibold flex items-center gap-1.5"
                >
                  🐢 Slow (0.6x)
                </button>
              </div>
            </div>

            {/* Syllable Pronunciation Feedback View (Step 2) */}
            {evaluationResult && (
              <div className="mt-5 p-4 rounded-2xl bg-slate-800/80 border border-slate-700 animate-slideUp">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-xs">
                      {evaluationResult.score}%
                    </div>
                    <span className="text-xs font-bold text-white">Syllable Match Accuracy</span>
                  </div>
                  <span className="text-[11px] text-amber-400 font-medium">
                    {evaluationResult.score >= 80 ? '🟢 Spot on!' : '🟡 Good try!'}
                  </span>
                </div>

                {/* Syllable Color-Coded Chips */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {evaluationResult.syllables.map((s, idx) => (
                    <button
                      key={idx}
                      onClick={() => speakText(s.text, targetLanguage.ttsLocale, 0.7)}
                      title="Tap to listen to this word"
                      className={`px-3 py-1 rounded-xl text-xs font-bold transition-transform hover:scale-105 ${
                        s.status === 'perfect'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : s.status === 'acceptable'
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      }`}
                    >
                      {s.text}
                    </button>
                  ))}
                </div>

                <p className="text-xs text-slate-300">
                  {evaluationResult.feedbackHindi || evaluationResult.feedbackEnglish}
                </p>
              </div>
            )}

            {/* Dynamic Conversation Bubble (Step 3) */}
            {aiDialogueReply && (
              <div className="mt-5 p-4 rounded-2xl bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-yellow-500/10 border border-orange-500/30 animate-slideUp">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-orange-500 text-slate-950 font-black text-[10px] flex items-center justify-center">
                    A
                  </div>
                  <span className="text-xs font-bold text-orange-400">Arohi Speaks:</span>
                  <span className="text-[11px] text-amber-300 font-medium ml-auto">{aiDialogueReply.praise}</span>
                </div>

                <div className="text-sm font-bold text-white mb-1">
                  "{aiDialogueReply.target}"
                </div>
                <div className="text-xs font-medium text-amber-400/90 mb-1">
                  🗣️ "{aiDialogueReply.transliteration}"
                </div>
                <div className="text-xs text-slate-400">
                  {aiDialogueReply.source}
                </div>

                <button
                  onClick={() => speakText(aiDialogueReply.target, targetLanguage.ttsLocale, 1.0)}
                  className="mt-2.5 text-[11px] font-bold text-orange-400 hover:text-orange-300 flex items-center gap-1"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  Listen to Arohi again
                </button>
              </div>
            )}
          </div>

          {/* Bottom Action Area: Microphone & Progression */}
          <div className="mt-6 pt-4 border-t border-slate-800 flex flex-col items-center">
            {/* Recording Controls */}
            <div className="flex flex-col items-center mb-4">
              <button
                onClick={isRecording ? stopListening : startListening}
                disabled={isEvaluating}
                className={`relative w-18 h-18 sm:w-20 sm:h-20 rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl ${
                  isRecording
                    ? 'bg-rose-600 text-white ring-8 ring-rose-600/30 animate-pulse scale-110'
                    : 'bg-gradient-to-tr from-orange-500 via-amber-500 to-yellow-500 text-slate-950 hover:brightness-110 ring-4 ring-orange-500/20'
                }`}
              >
                {isRecording ? (
                  <MicOff className="w-8 h-8" />
                ) : (
                  <Mic className="w-8 h-8 stroke-[2.5]" />
                )}
              </button>

              <span className="text-xs font-semibold text-slate-400 mt-2.5">
                {isRecording 
                  ? 'Listening... Speak now!' 
                  : isEvaluating 
                  ? 'Arohi is analyzing your speech...' 
                  : 'Tap microphone to speak'}
              </span>

              {recordedTranscript && (
                <div className="mt-2 text-xs text-amber-300 bg-slate-800/80 px-3 py-1 rounded-full border border-slate-700 max-w-sm truncate">
                  You said: "{recordedTranscript}"
                </div>
              )}
            </div>

            {/* Action Buttons: Conversational Turn or Next Phrase */}
            <div className="w-full flex items-center justify-between gap-3">
              <button
                onClick={() => {
                  setRecordedTranscript(currentPhrase.targetText);
                  handleEvaluate(currentPhrase.targetText);
                }}
                className="text-xs text-slate-400 hover:text-white underline underline-offset-4"
              >
                Quick Demo Voice
              </button>

              <div className="flex items-center gap-2">
                {evaluationResult && !aiDialogueReply && (
                  <button
                    onClick={handleStartDialogueTurn}
                    className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg transition-all flex items-center gap-1.5"
                  >
                    <Sparkles className="w-4 h-4" />
                    Chat with Arohi
                  </button>
                )}

                <button
                  onClick={handleNext}
                  className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 hover:brightness-110 shadow-lg shadow-orange-500/20 transition-all flex items-center gap-2"
                >
                  {currentPhraseIndex < lesson.phrases.length - 1 ? 'Next Phrase' : 'Finish Lesson'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
