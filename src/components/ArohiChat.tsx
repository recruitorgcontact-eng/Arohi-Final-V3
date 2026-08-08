import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { 
  Send, Bot, User, Sparkles, Plus, RefreshCw, Trash2, Mic, Paperclip, CheckCircle, 
  ArrowRight, Lightbulb, MapPin, Briefcase, Landmark, Award, Minus, X, Globe, Phone, 
  History, Download, FileText, FileSpreadsheet, ThumbsUp, ThumbsDown, Copy, MoreHorizontal, 
  Search, Image as ImageIcon, Video, Library, BookOpen, Settings, Volume2, VolumeX, Menu, 
  Camera, Shield, Check, Share2, Edit3, MessageCircle, SlidersHorizontal, ChevronRight, Zap,
  Music, Disc, Play, Pause, Radio, Headphones, Navigation, Compass, Route,
  Brain, Cpu, Layers, Workflow, Clock, Folder, Grid
} from 'lucide-react';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import ArohiAvatar from './ArohiAvatar';
import { Language, getTranslation, getWelcomeContent, getSuggestedPrompts } from '../translations';
import ArohiVoiceCall from './ArohiVoiceCall';
import { generateCallSummaryPDF, generateResumePDF, analyzeTurns } from '../lib/pdfGenerator';
import { exportToPDF, exportToWord, exportToExcel } from '../lib/documentExporter';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface ChatHistory {
  id: string;
  title: string;
  date: string;
}

interface SavedChat {
  id: string;
  title: string;
  date: string;
  messages: Message[];
}

interface ArohiChatProps {
  initialPrompt?: string;
  onNavigateTab?: (tab: string) => void;
  onMinimize?: () => void;
  onClose?: () => void;
  language?: Language;
}

function renderMarkdown(content: string) {
  // Helper to parse inline styles: **bold**, *italic*, `code`
  const parseInline = (text: string): React.ReactNode[] => {
    const regex = /(\*\*.*?\*\*|\*.*?\*|`.*?`)/g;
    const pieces = text.split(regex);
    
    return pieces.map((piece, idx) => {
      if (piece.startsWith('**') && piece.endsWith('**')) {
        return <strong key={idx} className="font-extrabold text-[#c084fc]">{piece.slice(2, -2)}</strong>;
      } else if (piece.startsWith('*') && piece.endsWith('*')) {
        return <em key={idx} className="italic text-slate-100">{piece.slice(1, -1)}</em>;
      } else if (piece.startsWith('`') && piece.endsWith('`')) {
        return <code key={idx} className="bg-slate-950/80 px-1.5 py-0.5 rounded text-xs font-mono text-emerald-300 border border-slate-800">{piece.slice(1, -1)}</code>;
      }
      return piece;
    });
  };

  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];

  interface ListItem {
    key: number;
    content: string;
    subItems: string[];
    value?: number;
  }

  let currentList: ListItem[] = [];
  let listType: 'ul' | 'ol' | null = null;
  let olCounter = 0;

  const pushList = (key: number) => {
    if (currentList.length > 0) {
      if (listType === 'ul') {
        elements.push(
          <ul key={`ul-${key}`} className="list-disc pl-5 my-2 space-y-1 text-slate-100 dark:text-slate-100">
            {currentList.map((item) => (
              <li key={item.key} className="text-xs md:text-sm font-medium leading-relaxed text-slate-100 dark:text-slate-100">
                {parseInline(item.content)}
                {item.subItems.length > 0 && (
                  <ul className="list-circle pl-5 my-1 space-y-1 text-slate-200 dark:text-slate-200">
                    {item.subItems.map((sub, sIdx) => (
                      <li key={sIdx} className="text-slate-200 dark:text-slate-200">{parseInline(sub)}</li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        );
      } else if (listType === 'ol') {
        elements.push(
          <ol key={`ol-${key}`} className="list-decimal pl-5 my-2 space-y-2 text-slate-100 dark:text-slate-100">
            {currentList.map((item) => (
              <li key={item.key} value={item.value} className="text-xs md:text-sm font-medium leading-relaxed text-slate-100 dark:text-slate-100">
                {parseInline(item.content)}
                {item.subItems.length > 0 && (
                  <ul className="list-disc pl-5 my-1 space-y-1 text-slate-200 dark:text-slate-200">
                    {item.subItems.map((sub, sIdx) => (
                      <li key={sIdx} className="text-slate-200 dark:text-slate-200">{parseInline(sub)}</li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ol>
        );
      }
      currentList = [];
      listType = null;
      olCounter = 0;
    }
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();
    
    // Check for Headers
    if (trimmed.startsWith('![')) {
      pushList(index);
      const match = trimmed.match(/^!\[(.*?)\]\((.*?)\)$/);
      if (match) {
        const alt = match[1];
        const src = match[2];
        elements.push(
          <div key={index} className="my-3 rounded-xl overflow-hidden border border-[#7c3aed]/50 shadow-2xl bg-[#0b081f] p-2 text-center group">
            <img src={src} alt={alt} className="w-full h-auto max-h-[420px] object-cover rounded-lg shadow-md transition-all group-hover:scale-[1.01]" referrerPolicy="no-referrer" />
            <p className="text-[11px] text-slate-200 mt-2 font-semibold flex items-center justify-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-violet-400" /> {alt || 'Generated Image'}
            </p>
          </div>
        );
      } else {
        elements.push(
          <p key={index} className="text-xs md:text-sm font-medium leading-relaxed text-slate-100 dark:text-slate-100 mb-1.5">
            {parseInline(line)}
          </p>
        );
      }
    } else if (trimmed.startsWith('### ')) {
      pushList(index);
      elements.push(
        <h4 key={index} className="text-xs md:text-sm font-extrabold text-white mt-4 mb-2 tracking-tight">
          {parseInline(trimmed.slice(4))}
        </h4>
      );
    } else if (trimmed.startsWith('## ')) {
      pushList(index);
      elements.push(
        <h3 key={index} className="text-sm md:text-base font-extrabold text-white mt-5 mb-2 tracking-tight border-b border-[#2d2163] pb-1">
          {parseInline(trimmed.slice(3))}
        </h3>
      );
    } else if (trimmed.startsWith('# ')) {
      pushList(index);
      elements.push(
        <h2 key={index} className="text-base md:text-lg font-extrabold text-white mt-6 mb-3 tracking-tight">
          {parseInline(trimmed.slice(2))}
        </h2>
      );
    }
    // Check for numbered lists
    else if (/^\d+\.\s/.test(trimmed)) {
      if (listType !== 'ol') {
        pushList(index);
        listType = 'ol';
        olCounter = 0;
      }
      const match = trimmed.match(/^(\d+)\.\s(.*)/);
      const parsedNum = match ? parseInt(match[1], 10) : olCounter + 1;
      olCounter = (parsedNum > olCounter) ? parsedNum : olCounter + 1;
      const listContent = match ? match[2] : trimmed;
      currentList.push({
        key: index,
        content: listContent,
        value: olCounter,
        subItems: []
      });
    }
    // Check for bullet lists
    else if (trimmed.startsWith('* ') || trimmed.startsWith('- ') || trimmed.startsWith('• ')) {
      const bulletText = trimmed.replace(/^(\*|-|•)\s+/, '');
      if (listType === 'ol' && currentList.length > 0) {
        // Sub-bullet under active numbered item
        currentList[currentList.length - 1].subItems.push(bulletText);
      } else {
        if (listType !== 'ul') {
          pushList(index);
          listType = 'ul';
        }
        currentList.push({
          key: index,
          content: bulletText,
          subItems: []
        });
      }
    }
    // Check for dividers
    else if (trimmed === '---') {
      pushList(index);
      elements.push(<hr key={index} className="my-3 border-[#2d2163]" />);
    } else if (trimmed === '') {
      // Empty line maintains active list context
    }
    // Default Paragraph line
    else {
      pushList(index);
      elements.push(
        <p key={index} className="text-xs md:text-sm font-medium leading-relaxed text-slate-100 dark:text-slate-100 mb-1.5">
          {parseInline(line)}
        </p>
      );
    }
  });

  pushList(lines.length);

  return <div className="space-y-1 text-slate-100 dark:text-slate-100">{elements}</div>;
}

function parseMessageResume(content: string) {
  const startIndex = content.indexOf('[RESUME_DOCX_DATA_START]');
  const endIndex = content.indexOf('[RESUME_DOCX_DATA_END]');
  
  if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
    const rawJson = content.substring(startIndex + '[RESUME_DOCX_DATA_START]'.length, endIndex);
    const textWithoutJson = content.substring(0, startIndex) + content.substring(endIndex + '[RESUME_DOCX_DATA_END]'.length);
    try {
      const parsedData = JSON.parse(rawJson);
      return {
        cleanedContent: textWithoutJson.trim(),
        resumeData: parsedData
      };
    } catch (e) {
      console.error("Failed to parse resume JSON in message", e);
    }
  }
  return {
    cleanedContent: content,
    resumeData: null
  };
}

function parseMessageCallSummary(content: string) {
  const startIndex = content.indexOf('[CALL_SUMMARY_DATA_START]');
  const endIndex = content.indexOf('[CALL_SUMMARY_DATA_END]');
  
  if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
    const rawJson = content.substring(startIndex + '[CALL_SUMMARY_DATA_START]'.length, endIndex);
    const textWithoutJson = content.substring(0, startIndex) + content.substring(endIndex + '[CALL_SUMMARY_DATA_END]'.length);
    try {
      const parsedData = JSON.parse(rawJson);
      return {
        cleanedContent: textWithoutJson.trim(),
        summaryData: parsedData
      };
    } catch (e) {
      console.error("Failed to parse call summary JSON in message", e);
    }
  }
  return {
    cleanedContent: content,
    summaryData: null
  };
}

export default function ArohiChat({ initialPrompt, onNavigateTab, onMinimize, onClose, language = 'en' }: ArohiChatProps) {
  const { user, userData } = useAuth();
  const [isMinimized, setIsMinimized] = useState(false);
  const [isVoiceCallOpen, setIsVoiceCallOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: getWelcomeContent(language),
      timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  useEffect(() => {
    setMessages(prev => {
      if (prev.length === 1 && prev[0].id === 'welcome') {
        return [{
          ...prev[0],
          content: getWelcomeContent(language)
        }];
      }
      return prev;
    });
  }, [language]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [recording, setRecording] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<{ name: string; mimeType: string; base64: string } | null>(null);
  const [isDownloadingResume, setIsDownloadingResume] = useState<string | null>(null);
  const [selectedAudienceCategory, setSelectedAudienceCategory] = useState<string>('all');

  // Gemini Style Interactive States
  const [likedMessageIds, setLikedMessageIds] = useState<string[]>([]);
  const [dislikedMessageIds, setDislikedMessageIds] = useState<string[]>([]);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null);

  // Live Voice Audio Refs for Arohi Read Aloud (Streams same Arohi voice as voice call!)
  const ttsAudioCtxRef = useRef<AudioContext | null>(null);
  const ttsAudioQueueRef = useRef<AudioBufferSourceNode[]>([]);
  const ttsWsRef = useRef<WebSocket | null>(null);
  const ttsNextStartTimeRef = useRef<number>(0);
  // Image Studio States
  const [isImageStudioOpen, setIsImageStudioOpen] = useState(false);
  const [studioPrompt, setStudioPrompt] = useState('');
  const [studioAspectRatio, setStudioAspectRatio] = useState<'1:1' | '16:9' | '9:16' | '4:3' | '3:4' | '21:9' | '3:2' | '2:3'>('16:9');
  const [studioStyle, setStudioStyle] = useState<'photorealistic' | '3d-render' | 'anime' | 'cinematic' | 'minimalist' | 'cyberpunk'>('photorealistic');
  const [studioGeneratedImage, setStudioGeneratedImage] = useState<string | null>(null);
  const [isStudioGenerating, setIsStudioGenerating] = useState(false);
  const [studioEditInstruction, setStudioEditInstruction] = useState('');
  const [studioHistory, setStudioHistory] = useState<Array<{ prompt: string; imageUrl: string; aspectRatio: string; style: string }>>([]);

  const handleGenerateStudioImage = async (customPrompt?: string) => {
    const promptToUse = customPrompt || studioPrompt;
    if (!promptToUse.trim()) return;

    setIsStudioGenerating(true);
    try {
      const res = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: promptToUse,
          aspectRatio: studioAspectRatio,
          style: studioStyle,
        })
      });
      const data = await res.json();
      if (data.success && data.imageUrl) {
        setStudioGeneratedImage(data.imageUrl);
        setStudioHistory(prev => [{ prompt: promptToUse, imageUrl: data.imageUrl, aspectRatio: studioAspectRatio, style: studioStyle }, ...prev.slice(0, 9)]);
      }
    } catch (e) {
      console.error('Error generating studio image:', e);
    } finally {
      setIsStudioGenerating(false);
    }
  };

  const handleEditStudioImage = async () => {
    if (!studioEditInstruction.trim() || !studioGeneratedImage) return;

    setIsStudioGenerating(true);
    try {
      const res = await fetch('/api/edit-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          originalPrompt: studioPrompt,
          editInstruction: studioEditInstruction,
          sourceImageUrl: studioGeneratedImage,
          aspectRatio: studioAspectRatio,
          style: studioStyle,
        })
      });
      const data = await res.json();
      if (data.success && data.imageUrl) {
        setStudioGeneratedImage(data.imageUrl);
        setStudioHistory(prev => [{ prompt: `Edited: ${studioEditInstruction}`, imageUrl: data.imageUrl, aspectRatio: studioAspectRatio, style: studioStyle }, ...prev.slice(0, 9)]);
        setStudioEditInstruction('');
      }
    } catch (e) {
      console.error('Error editing studio image:', e);
    } finally {
      setIsStudioGenerating(false);
    }
  };

  // Music Studio States (Lyria Music Engine)
  const [isMusicStudioOpen, setIsMusicStudioOpen] = useState(false);
  const [musicPrompt, setMusicPrompt] = useState('');
  const [musicGenre, setMusicGenre] = useState<'cinematic' | 'lo-fi' | 'folk' | 'electronic' | 'zen'>('cinematic');
  const [musicDuration, setMusicDuration] = useState<'15s' | '30s' | '60s' | 'full'>('30s');
  const [musicGeneratedTrack, setMusicGeneratedTrack] = useState<{
    title: string;
    audioUrl: string;
    genre: string;
    duration: string;
    provider: string;
    prompt: string;
    lyrics?: string;
  } | null>(null);
  const [isMusicGenerating, setIsMusicGenerating] = useState(false);
  const [musicHistory, setMusicHistory] = useState<Array<{ title: string; audioUrl: string; genre: string; prompt: string }>>([]);

  const handleGenerateStudioMusic = async (customPrompt?: string) => {
    const promptToUse = customPrompt || musicPrompt;
    if (!promptToUse.trim()) return;

    setIsMusicGenerating(true);
    try {
      const res = await fetch('/api/generate-music', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: promptToUse,
          genre: musicGenre,
          duration: musicDuration,
        })
      });
      const data = await res.json();
      if (data.success && data.audioUrl) {
        const trackObj = {
          title: data.title,
          audioUrl: data.audioUrl,
          genre: data.genre,
          duration: data.duration,
          provider: data.provider,
          prompt: promptToUse,
          lyrics: data.lyrics,
        };
        setMusicGeneratedTrack(trackObj);
        setMusicHistory(prev => [
          { title: data.title, audioUrl: data.audioUrl, genre: data.genre, prompt: promptToUse },
          ...prev.slice(0, 9)
        ]);
      }
    } catch (e) {
      console.error('Error generating music:', e);
    } finally {
      setIsMusicGenerating(false);
    }
  };

  // Video Studio States (Veo 3 Video & Animation Engine)
  const [isVideoStudioOpen, setIsVideoStudioOpen] = useState(false);
  const [videoMode, setVideoMode] = useState<'text_to_video' | 'image_to_video'>('text_to_video');
  const [videoPrompt, setVideoPrompt] = useState('');
  const [videoAnimationStyle, setVideoAnimationStyle] = useState<'ad_product' | 'portrait_motion' | 'cinematic_pan' | '3d_orbit' | 'cyberpunk_glitch'>('cinematic_pan');
  const [videoAspectRatio, setVideoAspectRatio] = useState<'16:9' | '9:16' | '1:1' | '21:9'>('16:9');
  const [videoDuration, setVideoDuration] = useState<'5s' | '10s' | '15s'>('5s');
  const [uploadedVideoImage, setUploadedVideoImage] = useState<string | null>(null);
  const [videoGeneratedTrack, setVideoGeneratedTrack] = useState<{
    title: string;
    videoUrl: string;
    animationStyle: string;
    aspectRatio: string;
    duration: string;
    provider: string;
    prompt: string;
  } | null>(null);
  const [isVideoGenerating, setIsVideoGenerating] = useState(false);
  const [videoHistory, setVideoHistory] = useState<Array<{ title: string; videoUrl: string; animationStyle: string; prompt: string }>>([]);

  const handleAnimateStudioVideo = async (customPrompt?: string) => {
    const promptToUse = customPrompt || videoPrompt;
    if (!promptToUse.trim() && !uploadedVideoImage) return;

    setIsVideoGenerating(true);
    try {
      const res = await fetch('/api/animate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: promptToUse,
          imageUrl: uploadedVideoImage,
          animationStyle: videoAnimationStyle,
          aspectRatio: videoAspectRatio,
          duration: videoDuration,
        })
      });
      const data = await res.json();
      if (data.success && data.videoUrl) {
        const vidObj = {
          title: data.title,
          videoUrl: data.videoUrl,
          animationStyle: data.animationStyle,
          aspectRatio: data.aspectRatio,
          duration: data.duration,
          provider: data.provider,
          prompt: promptToUse,
        };
        setVideoGeneratedTrack(vidObj);
        setVideoHistory(prev => [
          { title: data.title, videoUrl: data.videoUrl, animationStyle: data.animationStyle, prompt: promptToUse },
          ...prev.slice(0, 9)
        ]);
      }
    } catch (e) {
      console.error('Error generating video:', e);
    } finally {
      setIsVideoGenerating(false);
    }
  };

  // Document Vision OCR & Deep Research Studio States (Feature #6)
  const [isDocResearchStudioOpen, setIsDocResearchStudioOpen] = useState(false);
  const [docResearchPrompt, setDocResearchPrompt] = useState('');
  const [docResearchMode, setDocResearchMode] = useState<'pdf_vision_ocr' | 'deep_research' | 'resume_ats_eval' | 'scheme_audit' | 'study_guide'>('pdf_vision_ocr');
  const [docResearchFile, setDocResearchFile] = useState<{ name: string; mimeType: string; base64: string } | null>(null);
  const [docResearchReport, setDocResearchReport] = useState<{
    reportMarkdown: string;
    keyTakeaways: string[];
    documentName: string;
    mode: string;
    provider: string;
  } | null>(null);
  const [isDocResearchGenerating, setIsDocResearchGenerating] = useState(false);
  const [docResearchHistory, setDocResearchHistory] = useState<Array<{ documentName: string; mode: string; keyTakeaway: string }>>([]);

  const handleRunDocResearchStudio = async (customPrompt?: string) => {
    const promptToUse = customPrompt || docResearchPrompt;
    if (!promptToUse.trim() && !docResearchFile) return;

    setIsDocResearchGenerating(true);
    try {
      const res = await fetch('/api/doc-research-studio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: promptToUse,
          documentData: docResearchFile?.base64,
          documentName: docResearchFile?.name,
          mimeType: docResearchFile?.mimeType || 'application/pdf',
          mode: docResearchMode,
          language
        })
      });
      const data = await res.json();
      if (data.success && data.reportMarkdown) {
        const reportObj = {
          reportMarkdown: data.reportMarkdown,
          keyTakeaways: data.keyTakeaways || [],
          documentName: data.documentName || docResearchFile?.name || 'Research Report',
          mode: data.mode || docResearchMode,
          provider: data.provider || 'gemini-3.6-flash',
        };
        setDocResearchReport(reportObj);
        setDocResearchHistory(prev => [
          { documentName: reportObj.documentName, mode: reportObj.mode, keyTakeaway: reportObj.keyTakeaways[0] || 'Report generated' },
          ...prev.slice(0, 9)
        ]);
      }
    } catch (e) {
      console.error('Error running doc research studio:', e);
    } finally {
      setIsDocResearchGenerating(false);
    }
  };

  // Google Maps Data & Route Directions Studio States (Feature #7)
  const [isMapsStudioOpen, setIsMapsStudioOpen] = useState(false);
  const [mapsPrompt, setMapsPrompt] = useState('');
  const [mapsOrigin, setMapsOrigin] = useState('');
  const [mapsDestination, setMapsDestination] = useState('');
  const [mapsTravelMode, setMapsTravelMode] = useState<'DRIVING' | 'TRANSIT' | 'WALKING' | 'BICYCLING'>('DRIVING');
  const [mapsMode, setMapsMode] = useState<'places_search' | 'route_directions' | 'nearby_explore'>('places_search');
  const [mapsReport, setMapsReport] = useState<{
    summaryMarkdown: string;
    places: Array<{ id?: string; name: string; address: string; rating?: number; lat: number; lng: number; category?: string; distanceKm?: string }>;
    routeInfo: { origin: string; destination: string; distanceKm: string; durationMin: string; travelMode: string; steps: string[]; polylinePath?: Array<{ lat: number; lng: number }> } | null;
    centerCoord: { lat: number; lng: number; zoom: number };
    mode: string;
    provider: string;
  } | null>(null);
  const [isMapsGenerating, setIsMapsGenerating] = useState(false);
  const [mapsHistory, setMapsHistory] = useState<Array<{ title: string; mode: string; center: { lat: number; lng: number } }>>([]);

  const handleRunMapsStudio = async (customPrompt?: string, customOrigin?: string, customDest?: string) => {
    const promptToUse = customPrompt || mapsPrompt;
    const originToUse = customOrigin !== undefined ? customOrigin : mapsOrigin;
    const destToUse = customDest !== undefined ? customDest : mapsDestination;

    if (!promptToUse.trim() && !originToUse.trim() && !destToUse.trim()) return;

    setIsMapsGenerating(true);
    try {
      const res = await fetch('/api/maps-location-studio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: promptToUse,
          origin: originToUse,
          destination: destToUse,
          travelMode: mapsTravelMode,
          mode: mapsMode,
          language
        })
      });
      const data = await res.json();
      if (data.success && data.summaryMarkdown) {
        const reportObj = {
          summaryMarkdown: data.summaryMarkdown,
          places: data.places || [],
          routeInfo: data.routeInfo || null,
          centerCoord: data.centerCoord || { lat: 28.6139, lng: 77.2090, zoom: 12 },
          mode: data.mode || mapsMode,
          provider: data.provider || 'gemini-3.6-flash-google-maps'
        };
        setMapsReport(reportObj);
        setMapsHistory(prev => [
          { title: promptToUse || `${originToUse} -> ${destToUse}`, mode: reportObj.mode, center: reportObj.centerCoord },
          ...prev.slice(0, 9)
        ]);
      }
    } catch (e) {
      console.error('Error running Google Maps studio:', e);
    } finally {
      setIsMapsGenerating(false);
    }
  };

  // Gemini Intelligence & Multi-Step Task Engine States (Feature #9)
  const [isIntelligenceStudioOpen, setIsIntelligenceStudioOpen] = useState(false);
  const [intelligenceContent, setIntelligenceContent] = useState('');
  const [intelligenceInstruction, setIntelligenceInstruction] = useState('');
  const [intelligenceMode, setIntelligenceMode] = useState<'content_analysis' | 'smart_edits' | 'multistep_workflow'>('content_analysis');
  const [isIntelligenceGenerating, setIsIntelligenceGenerating] = useState(false);
  const [intelligenceReport, setIntelligenceReport] = useState<{
    reportMarkdown: string;
    editedContent: string;
    multiStepPipeline: Array<{ stepNumber: number; title: string; status: 'completed' | 'in_progress' | 'planned'; details: string }>;
    mode: string;
    provider: string;
  } | null>(null);

  const handleRunIntelligenceStudio = async (customInstruction?: string, customContent?: string) => {
    const instructionToUse = customInstruction || intelligenceInstruction;
    const contentToUse = customContent !== undefined ? customContent : intelligenceContent;

    if (!instructionToUse.trim() && !contentToUse.trim()) return;

    setIsIntelligenceGenerating(true);
    try {
      const res = await fetch('/api/gemini-intelligence-studio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          taskInstruction: instructionToUse,
          content: contentToUse,
          mode: intelligenceMode,
          language
        })
      });
      const data = await res.json();
      if (data.success && data.reportMarkdown) {
        setIntelligenceReport({
          reportMarkdown: data.reportMarkdown,
          editedContent: data.editedContent || '',
          multiStepPipeline: data.multiStepPipeline || [],
          mode: data.mode || intelligenceMode,
          provider: data.provider || 'gemini-3.6-flash'
        });
      }
    } catch (e) {
      console.error('Error running Gemini Intelligence studio:', e);
    } finally {
      setIsIntelligenceGenerating(false);
    }
  };

  const [sidebarSearchQuery, setSidebarSearchQuery] = useState('');
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMessageMenuId, setActiveMessageMenuId] = useState<string | null>(null);
  const [activeNotebooks, setActiveNotebooks] = useState<string[]>(['Career Growth Plan', 'MSME Udyam Roadmap']);
  const [showNewNotebookModal, setShowNewNotebookModal] = useState(false);
  const [newNotebookTitle, setNewNotebookTitle] = useState('');

  const toggleLikeMessage = (id: string) => {
    setLikedMessageIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
    setDislikedMessageIds(prev => prev.filter(item => item !== id));
  };

  const toggleDislikeMessage = (id: string) => {
    setDislikedMessageIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
    setLikedMessageIds(prev => prev.filter(item => item !== id));
  };

  const copyMessageToClipboard = (id: string, text: string) => {
    try {
      navigator.clipboard.writeText(text);
      setCopiedMessageId(id);
      setTimeout(() => setCopiedMessageId(null), 2200);
    } catch (e) {
      console.error('Clipboard error', e);
    }
  };

  const stopAudioPlayback = () => {
    if (ttsWsRef.current) {
      try { ttsWsRef.current.close(); } catch (e) {}
      ttsWsRef.current = null;
    }
    ttsAudioQueueRef.current.forEach(source => {
      try { source.stop(); } catch (e) {}
    });
    ttsAudioQueueRef.current = [];
    if (ttsAudioCtxRef.current) {
      try { ttsAudioCtxRef.current.close(); } catch (e) {}
      ttsAudioCtxRef.current = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try { window.speechSynthesis.cancel(); } catch (e) {}
    }
    setSpeakingMessageId(null);
  };

  useEffect(() => {
    return () => {
      stopAudioPlayback();
    };
  }, []);

  const speakMessage = (id: string, text: string) => {
    if (speakingMessageId === id) {
      stopAudioPlayback();
      return;
    }

    stopAudioPlayback();

    const cleanText = text
      .replace(/\[.*?\]\(.*?\)/g, '')
      .replace(/[*#`_~]/g, '')
      .replace(/<[^>]*>/g, '')
      .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '')
      .trim();

    if (!cleanText) return;

    setSpeakingMessageId(id);

    // Dynamic script language detection for any language response (Odia, Bengali, Hindi, CJK, etc.)
    const detectTextLanguage = (txt: string): { langTag: string; langCode: string } => {
      if (/[\u0B00-\u0B7F]/.test(txt)) return { langTag: 'or-IN', langCode: 'or' }; // Odia script
      if (/[\u0980-\u09FF]/.test(txt)) return { langTag: 'bn-IN', langCode: 'bn' }; // Bengali script
      if (/[\u0900-\u097F]/.test(txt)) return { langTag: 'hi-IN', langCode: 'hi' }; // Devanagari script (Hindi/Marathi)
      if (/[\u0C00-\u0C7F]/.test(txt)) return { langTag: 'te-IN', langCode: 'te' }; // Telugu script
      if (/[\u0B80-\u0BFF]/.test(txt)) return { langTag: 'ta-IN', langCode: 'ta' }; // Tamil script
      if (/[\u0A80-\u0AFF]/.test(txt)) return { langTag: 'gu-IN', langCode: 'gu' }; // Gujarati script
      if (/[\u0C80-\u0CFF]/.test(txt)) return { langTag: 'kn-IN', langCode: 'kn' }; // Kannada script
      if (/[\u0D00-\u0D7F]/.test(txt)) return { langTag: 'ml-IN', langCode: 'ml' }; // Malayalam script
      if (/[\u0A00-\u0A7F]/.test(txt)) return { langTag: 'pa-IN', langCode: 'pa' }; // Punjabi script
      if (/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/.test(txt)) return { langTag: 'ur-IN', langCode: 'ur' }; // Urdu / Arabic
      if (/[\u3040-\u309F\u30A0-\u30FF]/.test(txt)) return { langTag: 'ja-JP', langCode: 'ja' }; // Japanese Hiragana/Katakana
      if (/[\u4E00-\u9FFF\u3400-\u4DBF]/.test(txt)) return { langTag: 'zh-CN', langCode: 'zh' }; // Chinese CJK
      if (/[\uAC00-\uD7AF\u1100-\u11FF]/.test(txt)) return { langTag: 'ko-KR', langCode: 'ko' }; // Korean Hangul
      if (/[\u0400-\u04FF]/.test(txt)) return { langTag: 'ru-RU', langCode: 'ru' }; // Cyrillic / Russian
      if (/[\u0E00-\u0E7F]/.test(txt)) return { langTag: 'th-TH', langCode: 'th' }; // Thai script

      const langMap: Record<string, string> = {
        en: 'en-IN', hi: 'hi-IN', or: 'or-IN', bn: 'bn-IN', ta: 'ta-IN', te: 'te-IN',
        mr: 'mr-IN', gu: 'gu-IN', kn: 'kn-IN', ml: 'ml-IN', pa: 'pa-IN', ur: 'ur-IN',
        zh: 'zh-CN', ja: 'ja-JP', ko: 'ko-KR', es: 'es-ES', fr: 'fr-FR', de: 'de-DE'
      };
      const code = language || 'en';
      return { langTag: langMap[code] || `${code}-IN`, langCode: code };
    };

    const detectedLang = detectTextLanguage(cleanText);

    // Browser TTS Fallback helper
    const fallbackToBrowserTTS = () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        window.speechSynthesis.resume();

        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.lang = detectedLang.langTag;
        utterance.rate = 1.0;
        utterance.pitch = 1.35; // Arohi's signature soft warm female pitch

        const setVoiceAndSpeak = () => {
          try {
            const voices = window.speechSynthesis.getVoices();
            if (voices && voices.length > 0) {
              const shortLang = detectedLang.langCode.toLowerCase();
              const tagLower = detectedLang.langTag.toLowerCase();

              // STRICT EXCLUSION OF MALE & SYSTEM DEFAULT MALE VOICES
              const strictlyFemaleVoices = voices.filter(v => {
                const nameLower = v.name.toLowerCase();
                const isExplicitMale = /\b(male|david|mark|george|ravi|hemant|prakash|richard|james|guy|stefan|daniel|alex|fred|thomas|nil|bruce|stefanos|adult|system)\b/i.test(nameLower) ||
                                       /google us english|google uk english male|microsoft david|microsoft mark/i.test(nameLower);
                return !isExplicitMale;
              });
              const pool = strictlyFemaleVoices.length > 0 ? strictlyFemaleVoices : voices;

              const preferredVoice = 
                pool.find(v => v.lang.toLowerCase() === tagLower && /\b(female|woman|girl|google|sangeeta|kalpana|veena|neerja|zira|samantha|victoria|helena|monica|luciana|karen|siri|natural|online)\b/i.test(v.name)) ||
                pool.find(v => v.lang.toLowerCase() === tagLower) ||
                pool.find(v => (v.lang.toLowerCase().startsWith(shortLang) || v.lang.toLowerCase().includes(shortLang)) && /\b(female|woman|girl|google|sangeeta|kalpana|veena|neerja|zira|samantha|victoria|helena|monica|luciana|karen|siri|natural|online)\b/i.test(v.name)) ||
                pool.find(v => v.lang.toLowerCase().startsWith(shortLang) || v.lang.toLowerCase().includes(shortLang)) ||
                pool.find(v => /\b(female|woman|girl|google|sangeeta|kalpana|veena|neerja|zira|samantha|victoria|helena|monica|luciana|karen|siri|natural|online)\b/i.test(v.name)) ||
                pool.find(v => v.lang.toLowerCase().includes('en-in') || v.lang.toLowerCase().includes('-in'));

              if (preferredVoice) {
                utterance.voice = preferredVoice;
              }
            }

            utterance.onend = () => setSpeakingMessageId(null);
            utterance.onerror = () => setSpeakingMessageId(null);

            setSpeakingMessageId(id);
            window.speechSynthesis.speak(utterance);
          } catch (e) {
            console.error('Error in speakMessage fallback:', e);
            setSpeakingMessageId(null);
          }
        };

        if (window.speechSynthesis.getVoices().length === 0) {
          window.speechSynthesis.onvoiceschanged = () => {
            setVoiceAndSpeak();
            window.speechSynthesis.onvoiceschanged = null;
          };
          setTimeout(setVoiceAndSpeak, 100);
        } else {
          setTimeout(setVoiceAndSpeak, 30);
        }
      } else {
        setSpeakingMessageId(null);
      }
    };

    // Primary: Connect to Gemini Live Audio stream (same voice as Arohi live voice call!)
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) {
        fallbackToBrowserTTS();
        return;
      }

      const audioCtx = new AudioContextClass();
      ttsAudioCtxRef.current = audioCtx;
      if (audioCtx.state === 'suspended') {
        audioCtx.resume().catch(() => {});
      }
      ttsNextStartTimeRef.current = audioCtx.currentTime;

      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const wsUrl = `${protocol}//${window.location.host}/api/live-ws?voice=Zypher&lang=${encodeURIComponent(detectedLang.langCode)}&mode=read_aloud`;
      
      const ws = new WebSocket(wsUrl);
      ttsWsRef.current = ws;

      let hasReceivedAudio = false;

      ws.onopen = () => {
        ws.send(JSON.stringify({ text: cleanText }));
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.audio) {
            hasReceivedAudio = true;
            const base64Audio = data.audio;
            const binary = window.atob(base64Audio);
            const bytes = new Uint8Array(binary.length);
            for (let i = 0; i < binary.length; i++) {
              bytes[i] = binary.charCodeAt(i);
            }

            const numSamples = bytes.length / 2;
            const float32Data = new Float32Array(numSamples);
            const dataView = new DataView(bytes.buffer);

            for (let i = 0; i < numSamples; i++) {
              const pcm16 = dataView.getInt16(i * 2, true);
              float32Data[i] = pcm16 / 32768;
            }

            const audioBuffer = audioCtx.createBuffer(1, numSamples, 24000);
            audioBuffer.getChannelData(0).set(float32Data);

            const source = audioCtx.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(audioCtx.destination);

            const currentTime = audioCtx.currentTime;
            let startTime = ttsNextStartTimeRef.current;

            if (startTime < currentTime) {
              startTime = currentTime + 0.05;
            }

            source.start(startTime);
            ttsAudioQueueRef.current.push(source);

            ttsNextStartTimeRef.current = startTime + audioBuffer.duration;

            const durationMs = audioBuffer.duration * 1000;
            setTimeout(() => {
              if (audioCtx.currentTime >= ttsNextStartTimeRef.current - 0.1) {
                setSpeakingMessageId(null);
              }
            }, durationMs + 300);
          }
        } catch (err) {
          console.error('Error decoding/playing Arohi voice chunk:', err);
        }
      };

      ws.onerror = (err) => {
        console.warn('Arohi live voice WS error, falling back to browser TTS:', err);
        if (!hasReceivedAudio) {
          fallbackToBrowserTTS();
        }
      };

      ws.onclose = () => {
        if (!hasReceivedAudio) {
          fallbackToBrowserTTS();
        }
      };
    } catch (e) {
      console.error('Failed to initialize Arohi live voice stream:', e);
      fallbackToBrowserTTS();
    }
  };

  const addNotebook = () => {
    if (newNotebookTitle.trim()) {
      setActiveNotebooks(prev => [...prev, newNotebookTitle.trim()]);
      setNewNotebookTitle('');
      setShowNewNotebookModal(false);
    }
  };

  const handleSummarizeChat = async () => {
    if (messages.length <= 1) {
      alert("Please engage in a conversation first before generating an AI summary.");
      return;
    }

    setIsSummarizing(true);
    try {
      const response = await fetch('/api/summarize-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          history: messages.map(m => ({ role: m.role, content: m.content })),
          language,
          uid: user?.uid
        })
      });

      if (!response.ok) {
        throw new Error('Failed to summarize conversation');
      }

      const data = await response.json();
      const summaryContent = data.summary;

      const summaryMessage: Message = {
        id: `summary-${Date.now()}`,
        role: 'assistant',
        content: summaryContent,
        timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, summaryMessage]);

      logActivity('chat', 'AI Session Summary Generated', 'Condensed conversation history into an actionable step-by-step plan.');

      const uEmail = user?.email || localStorage.getItem('recruit_user_email') || 'guest@recruitindia.org';
      const uName = userData?.profile?.name || user?.displayName || localStorage.getItem('recruit_user_name') || 'Honored Guest';
      try {
        fetch('/api/admin/sync-chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userEmail: uEmail,
            userName: uName,
            sender: 'arohi',
            text: `[AI Action Plan Summary]\n\n${summaryContent}`,
            topic: 'Session Summary'
          })
        });
      } catch (e) {
        // ignore
      }
    } catch (error) {
      console.error('Error generating AI summary:', error);
      alert('Failed to generate session summary. Please check your network connection.');
    } finally {
      setIsSummarizing(false);
    }
  };

  const logActivity = (type: string, title: string, description: string) => {
    try {
      const stored = localStorage.getItem('recruit_activities');
      let list = [];
      if (stored) {
        list = JSON.parse(stored);
      }
      const newAct = {
        id: `act-${Date.now()}`,
        type,
        title,
        description,
        timestamp: new Date().toISOString()
      };
      list = [newAct, ...list].slice(0, 15);
      localStorage.setItem('recruit_activities', JSON.stringify(list));
      window.dispatchEvent(new Event('storage'));
      window.dispatchEvent(new Event('recruit_activities_update'));
    } catch (e) {
      console.error('Error logging activity locally:', e);
    }
  };

  const handleVoiceCallComplete = async (summaryData: {
    duration: number;
    turns: any[];
    date: string;
    summaryText: string;
    analysis?: any;
  }) => {
    const durationFormatted = summaryData.duration > 0 
      ? `${Math.floor(summaryData.duration / 60)}m ${summaryData.duration % 60}s`
      : '0m';

    const newMsg: Message = {
      id: `call-end-${Date.now()}`,
      role: 'assistant',
      content: `📞 **Voice Consultation Ended** (${durationFormatted})\n\nThank you for speaking with AROHI. How else can I assist you today?`,
      timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
    };
    
    const updatedMessages = [...messages, newMsg];
    setMessages(updatedMessages);

    // Save and sync the updated chat
    let targetChatId = activeChatId;
    let currentSavedChats = [...savedChats];
    if (!targetChatId || currentSavedChats.length === 0) {
      targetChatId = 'chat-' + Date.now();
      const newChatContainer = {
        id: targetChatId,
        title: 'Voice Session',
        date: 'Today',
        messages: [
          {
            id: 'welcome',
            role: 'assistant' as const,
            content: getWelcomeContent(language),
            timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
          },
          newMsg
        ]
      };
      currentSavedChats = [newChatContainer, ...currentSavedChats];
      setActiveChatId(targetChatId);
      setMessages(newChatContainer.messages);
    } else {
      currentSavedChats = currentSavedChats.map(chat => {
        if (chat.id === targetChatId) {
          return {
            ...chat,
            messages: updatedMessages
          };
        }
        return chat;
      });
    }

    setSavedChats(currentSavedChats);
    if (user) {
      updateArohiChats(currentSavedChats);
    } else {
      localStorage.setItem('guest_arohi_chats', JSON.stringify(currentSavedChats));
    }

    // Sync call item
    const newCallItem = {
      id: `call-${Date.now()}`,
      duration: summaryData.duration,
      turns: summaryData.turns,
      date: summaryData.date,
      summaryText: `Voice call completed (${durationFormatted})`,
      isCareerRelated: true
    };

    const updatedCalls = [newCallItem, ...savedCalls];
    setSavedCalls(updatedCalls);
    if (user) {
      updateArohiCalls(updatedCalls);
    } else {
      localStorage.setItem('guest_arohi_calls', JSON.stringify(updatedCalls));
    }

    // Track voice call completion in User Panel activities
    logActivity(
      'chat',
      'Arohi Voice Consultation Finished',
      `Completed a voice call (${durationFormatted}).`
    );
  };

  const handleDownloadResumeDocx = async (resumeData: any, messageId: string) => {
    setIsDownloadingResume(messageId);
    try {
      const response = await fetch('/api/generate-resume-docx', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(resumeData)
      });

      if (!response.ok) {
        throw new Error('Failed to generate Word document');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${resumeData.name.replace(/\s+/g, '_')}_Resume.docx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading resume:', error);
      alert('Failed to download Word resume. Please try again.');
    } finally {
      setIsDownloadingResume(null);
    }
  };

  const { updateArohiChats, updateArohiCalls } = useAuth();
  const [activeTab, setActiveTab] = useState<'chats' | 'calls'>('chats');
  const [savedChats, setSavedChats] = useState<SavedChat[]>([]);
  const [savedCalls, setSavedCalls] = useState<any[]>([]);
  const [activeChatId, setActiveChatId] = useState<string>('');
  const [selectedCallDetail, setSelectedCallDetail] = useState<any | null>(null);
  const [isFetchingHistory, setIsFetchingHistory] = useState(false);
  const [hasFetchedLatest, setHasFetchedLatest] = useState(false);

  const currentUserName = user 
    ? (userData?.profile?.name || (userData as any)?.displayName || user.displayName || user.email?.split('@')[0] || 'User') 
    : 'User';
  const currentChatObj = savedChats.find(c => c.id === activeChatId) || savedChats[0];
  const rawChatTitle = currentChatObj ? currentChatObj.title : 'Arohi AI Consultation';
  const activeChatTitle = (!rawChatTitle || rawChatTitle === 'New Conversation' || rawChatTitle === 'New Discussion' || rawChatTitle === 'Arohi AI Consultation' || rawChatTitle.toLowerCase().includes('hi arohi'))
    ? (user ? `Hi ${currentUserName}, let's get started!` : "Hi User, let's get started!")
    : rawChatTitle;

  const filteredChats = savedChats.filter(chat => 
    chat.title.toLowerCase().includes(sidebarSearchQuery.toLowerCase()) ||
    chat.messages.some(m => m.content.toLowerCase().includes(sidebarSearchQuery.toLowerCase()))
  );
  const [isHistoryDrawerOpen, setIsHistoryDrawerOpen] = useState(false);

  // Hydration effect
  useEffect(() => {
    if (user) {
      if (userData?.arohiChats && userData.arohiChats.length > 0) {
        setSavedChats(userData.arohiChats);
      } else {
        const initialMock: SavedChat[] = [
          {
            id: '1',
            title: 'Full Stack Career Roadmap',
            date: 'Today',
            messages: [
              {
                id: '1-1',
                role: 'user',
                content: 'Give me a roadmap for transitioning to full stack development in India.',
                timestamp: '10:00 AM'
              },
              {
                id: '1-2',
                role: 'assistant',
                content: `### 🚀 Full Stack Web Development Transition Blueprint
Here is your customized learning journey:
1. **Frontend Fundamentals:** HTML5, CSS3, and JavaScript (ES6+). Focus on modern responsive grids and utility frameworks like **Tailwind CSS**.
2. **Component Frameworks:** React 18+ with Vite. Build structured modular user interfaces and state models.
3. **Backend Stack:** Node.js, Express, and Firestore/SQL databases. Design lightweight REST proxy layers to secure private secrets.
4. **Cloud Execution:** Deploy static assets on host buckets, and full-stack servers on Cloud Run using container configurations.`,
                timestamp: '10:01 AM'
              }
            ]
          },
          {
            id: '2',
            title: 'MSME Mudra Loan Eligibility',
            date: 'Yesterday',
            messages: [
              {
                id: '2-1',
                role: 'user',
                content: 'Am I eligible for a Mudra Loan of 3 Lakhs for a bakery shop?',
                timestamp: 'Yesterday'
              },
              {
                id: '2-2',
                role: 'assistant',
                content: `### 🏛️ Mudra Loan (Kishor Category) Eligibility Guide
Yes! For an investment of ₹3 Lakhs, you qualify under the **Kishor Category** (loans from ₹50,000 to ₹5 Lakhs).
* **Collateral Requirement:** Zero collateral needed!
* **Key Checklist:**
  1. Valid **Udyam MSME Certificate**.
  2. Last 6 months bank statement.
  3. Simple project business brief.
  4. Proof of address & identity.`,
                timestamp: 'Yesterday'
              }
            ]
          }
        ];
        setSavedChats(initialMock);
        updateArohiChats(initialMock);
      }

      if (userData?.arohiCalls) {
        setSavedCalls(userData.arohiCalls);
      } else {
        setSavedCalls([]);
      }
    } else {
      const localChats = localStorage.getItem('guest_arohi_chats');
      const localCalls = localStorage.getItem('guest_arohi_calls');
      if (localChats) {
        setSavedChats(JSON.parse(localChats));
      } else {
        const initialMock: SavedChat[] = [
          {
            id: '1',
            title: 'Front Screen Rating',
            date: 'Today',
            messages: [
              {
                id: '1-1',
                role: 'user',
                content: 'How would you rate the overall user experience and visual layout of our front screen design?',
                timestamp: '10:00 AM'
              },
              {
                id: '1-2',
                role: 'assistant',
                content: 'Your front screen layout scores **9.2/10** for contrast, responsive typography, and clear action buttons!',
                timestamp: '10:01 AM'
              }
            ]
          },
          {
            id: '2',
            title: 'ArohiAI App Architecture',
            date: 'Yesterday',
            messages: [
              {
                id: '2-1',
                role: 'user',
                content: 'Explain the core system architecture and data flow for ArohiAI.',
                timestamp: '03:15 PM'
              },
              {
                id: '2-2',
                role: 'assistant',
                content: 'ArohiAI utilizes a full-stack Node/Express server on Cloud Run with WebSocket bidirectional streaming for Gemini Live audio and Firestore for multi-device data synchronization.',
                timestamp: '03:16 PM'
              }
            ]
          },
          {
            id: '3',
            title: 'Architecture Report Summary',
            date: '2 days ago',
            messages: [
              {
                id: '3-1',
                role: 'user',
                content: 'Summarize the architectural review findings.',
                timestamp: '11:20 AM'
              },
              {
                id: '3-2',
                role: 'assistant',
                content: 'Key recommendations include server-side API proxying for key security, sub-millisecond audio streaming buffers, and dark mode contrast optimizations.',
                timestamp: '11:21 AM'
              }
            ]
          },
          {
            id: '4',
            title: 'AarohiAI.com Overview',
            date: '3 days ago',
            messages: [
              {
                id: '4-1',
                role: 'user',
                content: 'Give an overview of AarohiAI platform capabilities.',
                timestamp: '02:00 PM'
              },
              {
                id: '4-2',
                role: 'assistant',
                content: 'AarohiAI provides real-time AI voice calling, course study modules, ATS resume analysis, job matching, and live multi-modal media studios.',
                timestamp: '02:01 PM'
              }
            ]
          },
          {
            id: '5',
            title: 'Unique AI Name Ideas',
            date: '4 days ago',
            messages: [
              {
                id: '5-1',
                role: 'user',
                content: 'Give me 5 unique name ideas for an AI assistant.',
                timestamp: '05:40 PM'
              },
              {
                id: '5-2',
                role: 'assistant',
                content: '1. Arohi\n2. Synapse\n3. Zenon\n4. Lumin\n5. Aura',
                timestamp: '05:41 PM'
              }
            ]
          }
        ];
        setSavedChats(initialMock);
        localStorage.setItem('guest_arohi_chats', JSON.stringify(initialMock));
      }

      if (localCalls) {
        setSavedCalls(JSON.parse(localCalls));
      } else {
        setSavedCalls([]);
      }
    }
  }, [user, userData]);

  // Fetch and restore the last conversation history from Firestore when starting a session
  useEffect(() => {
    if (!user || hasFetchedLatest) return;

    const fetchLatestHistory = async () => {
      setIsFetchingHistory(true);
      try {
        // Layer 1: Secure Server-side API to fetch freshest database profile
        const response = await fetch('/api/auth/me', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ uid: user.uid })
        });
        if (response.ok) {
          const resData = await response.json();
          if (resData?.success && resData?.userData) {
            const freshData = resData.userData;
            if (freshData.arohiChats && freshData.arohiChats.length > 0) {
              setSavedChats(freshData.arohiChats);
              // Select the absolute latest chat session (first in array)
              const latestChat = freshData.arohiChats[0];
              setActiveChatId(latestChat.id);
              setMessages(latestChat.messages);
            }
            if (freshData.arohiCalls) {
              setSavedCalls(freshData.arohiCalls);
            }
            setHasFetchedLatest(true);
            setIsFetchingHistory(false);
            return;
          }
        }
      } catch (err) {
        console.warn("REST fetch for latest conversation memory failed, falling back to direct Firestore SDK:", err);
      }

      // Layer 2: Fallback to direct client-side Firestore SDK
      try {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const freshData = docSnap.data();
          if (freshData.arohiChats && freshData.arohiChats.length > 0) {
            setSavedChats(freshData.arohiChats);
            const latestChat = freshData.arohiChats[0];
            setActiveChatId(latestChat.id);
            setMessages(latestChat.messages);
          }
          if (freshData.arohiCalls) {
            setSavedCalls(freshData.arohiCalls);
          }
        }
      } catch (err) {
        console.error("Direct Firestore memory load failed:", err);
      } finally {
        setHasFetchedLatest(true);
        setIsFetchingHistory(false);
      }
    };

    fetchLatestHistory();
  }, [user, hasFetchedLatest]);

  // Synchronize messages with the active chat
  useEffect(() => {
    if (savedChats.length > 0) {
      const currentChat = savedChats.find(c => c.id === activeChatId) || savedChats[0];
      if (currentChat) {
        // Always dynamically update the content of the welcome message to match the latest universal version
        const processedMessages = currentChat.messages.map(m => {
          if (m.id === 'welcome') {
            return { ...m, content: getWelcomeContent(language) };
          }
          return m;
        });
        setMessages(processedMessages);
        if (activeChatId !== currentChat.id) {
          setActiveChatId(currentChat.id);
        }
      }
    } else {
      const starterId = 'starter-' + Date.now();
      const starterChat: SavedChat = {
        id: starterId,
        title: 'New Conversation',
        date: 'Today',
        messages: [
          {
            id: 'welcome',
            role: 'assistant',
            content: getWelcomeContent(language),
            timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
          }
        ]
      };
      setSavedChats([starterChat]);
      setActiveChatId(starterId);
      setMessages(starterChat.messages);
      if (user) {
        updateArohiChats([starterChat]);
      } else {
        localStorage.setItem('guest_arohi_chats', JSON.stringify([starterChat]));
      }
    }
  }, [activeChatId, savedChats.length]);

  // Save changes effect whenever active chat messages state updates
  const isSyncingRef = useRef(false);
  useEffect(() => {
    if (!activeChatId || isSyncingRef.current || savedChats.length === 0) return;
    
    const currentChat = savedChats.find(c => c.id === activeChatId);
    if (!currentChat) return;

    if (JSON.stringify(currentChat.messages) === JSON.stringify(messages)) return;

    isSyncingRef.current = true;
    const updatedChats = savedChats.map(chat => {
      if (chat.id === activeChatId) {
        let title = chat.title;
        if (title === 'New Conversation' || title === 'New Discussion' || title === 'New Chat' || title.toLowerCase().includes('hi arohi')) {
          const firstUserMsg = messages.find(m => m.role === 'user');
          if (firstUserMsg) {
            const cleaned = firstUserMsg.content.replace(/\[File Uploaded:.*?\]/g, '').trim();
            if (cleaned.toLowerCase().includes('hi arohi') || cleaned.toLowerCase().includes('hi user')) {
              title = user ? `Hi ${currentUserName}, let's get started!` : "Hi User, let's get started!";
            } else {
              title = cleaned.length > 32 ? cleaned.substring(0, 30) + '...' : cleaned;
            }
          } else {
            title = user ? `Hi ${currentUserName}, let's get started!` : "Hi User, let's get started!";
          }
        }
        return {
          ...chat,
          title,
          messages
        };
      }
      return chat;
    });

    setSavedChats(updatedChats);
    if (user) {
      updateArohiChats(updatedChats);
    } else {
      localStorage.setItem('guest_arohi_chats', JSON.stringify(updatedChats));
    }
    isSyncingRef.current = false;
  }, [messages, activeChatId, savedChats, user]);

  const deleteChat = (idToDelete: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updatedChats = savedChats.filter(c => c.id !== idToDelete);
    setSavedChats(updatedChats);
    
    if (activeChatId === idToDelete) {
      if (updatedChats.length > 0) {
        setActiveChatId(updatedChats[0].id);
        setMessages(updatedChats[0].messages);
      } else {
        setActiveChatId('');
        setMessages([]);
      }
    }

    if (user) {
      updateArohiChats(updatedChats);
    } else {
      localStorage.setItem('guest_arohi_chats', JSON.stringify(updatedChats));
    }
  };

  const deleteCall = (idToDelete: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updatedCalls = savedCalls.filter(c => c.id !== idToDelete);
    setSavedCalls(updatedCalls);
    if (user) {
      updateArohiCalls(updatedCalls);
    } else {
      localStorage.setItem('guest_arohi_calls', JSON.stringify(updatedCalls));
    }
  };

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const simulationIntervalRef = useRef<any>(null);

  // Auto-scroll to bottom of messages / speech-to-text transcript
  useEffect(() => {
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });
      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
      }
    };

    scrollToBottom();
    const frameId = requestAnimationFrame(scrollToBottom);
    const timeoutId = setTimeout(scrollToBottom, 50);

    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(timeoutId);
    };
  }, [messages, isLoading, input, recording]);

  // Cleanup speech recognition and simulation on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (e) {
          // ignore
        }
      }
      if (simulationIntervalRef.current) {
        clearInterval(simulationIntervalRef.current);
      }
    };
  }, []);

  // Handle passed initial prompts
  useEffect(() => {
    if (initialPrompt) {
      handleSendMessage(initialPrompt);
    }
  }, [initialPrompt]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim() && !uploadedFileName) return;

    const userMsgText = uploadedFileName 
      ? `[File Uploaded: ${uploadedFileName}] ${text}` 
      : text;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: userMsgText,
      timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    
    const fileToSend = uploadedFile;
    setUploadedFileName(null);
    setUploadedFile(null);
    setIsLoading(true);

    const uEmail = user?.email || localStorage.getItem('recruit_user_email') || 'guest@recruitindia.org';
    const uName = userData?.profile?.name || user?.displayName || localStorage.getItem('recruit_user_name') || 'Honored Guest';
    const isBus = /bakery|bake|bread|cake|business|entrepreneur|shop|mudra|loan|startup|venture|funding|finance|retail/.test(text.toLowerCase());
    const activeTopic = isBus ? "Bakery Business Plan" : "General Consultation";

    // Track sending message in User Panel activities
    logActivity('chat', 'Chat message sent', text.substring(0, 100));

    // Sync user message to admin portal
    try {
      fetch('/api/admin/sync-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userEmail: uEmail,
          userName: uName,
          sender: 'user',
          text: userMsgText,
          topic: activeTopic
        })
      });
    } catch (e) {
      console.error('Error syncing user message to admin:', e);
    }

    // Check if user is asking for image generation
    const lowerText = text.toLowerCase().trim();
    const isImageRequest = lowerText.startsWith('generate image') || 
                           lowerText.startsWith('create image') || 
                           lowerText.startsWith('draw') || 
                           lowerText.startsWith('/image') || 
                           lowerText.includes('feature 8') || 
                           lowerText.includes('feature #8') || 
                           lowerText.includes('generate high-quality images') || 
                           lowerText.includes('generate high quality images') || 
                           lowerText.includes('generate an image of') || 
                           lowerText.includes('generate image of') || 
                           lowerText.includes('create a logo for') ||
                           lowerText.includes('create an image of');

    if (isImageRequest) {
      let promptText = text
        .replace(/^(feature 8|feature #8|implement feature 8|generate high-quality images|generate high quality images|generate image of|create image of|generate an image of|create an image of|create a logo for|generate image|create image|draw|\/image)/i, '')
        .trim();
      if (!promptText) promptText = "High-resolution hero banner and concept art for modern tech ecosystem";

      const loadingMsgId = (Date.now() + 1).toString();
      const loadingAssistantMessage: Message = {
        id: loadingMsgId,
        role: 'assistant',
        content: `✨ *Arohi AI Image Engine is crafting your high-quality artwork for: "${promptText}"...*`,
        timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, loadingAssistantMessage]);
      setIsLoading(true);

      try {
        const res = await fetch('/api/generate-image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt: promptText,
            aspectRatio: '16:9',
            style: 'photorealistic'
          })
        });
        const data = await res.json();

        if (data.success && data.imageUrl) {
          const formattedResponse = `Here is the high-quality AI artwork generated for your request:

![${promptText}](${data.imageUrl})

**Prompt**: ${promptText}
**Aspect Ratio**: 16:9 High-Res Banner | **Style**: Photorealistic 8K

*Created using Arohi AI: Generate High-Quality Images Studio.*`;

          setMessages((prev) => prev.map(m => m.id === loadingMsgId ? { ...m, content: formattedResponse } : m));

          // Sync assistant response to admin portal
          try {
            fetch('/api/admin/sync-chat', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                userEmail: uEmail,
                userName: uName,
                sender: 'arohi',
                text: `[Image Generated for prompt: ${promptText}]`,
                topic: activeTopic
              })
            });
          } catch (e) {}
        } else {
          setMessages((prev) => prev.map(m => m.id === loadingMsgId ? { 
            ...m, 
            content: `⚠️ Image generation returned an issue: ${data.error || 'Please try again with a different description.'}` 
          } : m));
        }
      } catch (err: any) {
        setMessages((prev) => prev.map(m => m.id === loadingMsgId ? { 
          ...m, 
          content: `⚠️ Could not complete image generation. Please check your network connection.` 
        } : m));
      } finally {
        setIsLoading(false);
      }
      return;
    }

    const isMusicRequest = lowerText.startsWith('/music') || 
                           lowerText.includes('generate music') || 
                           lowerText.includes('create music') || 
                           lowerText.includes('compose music') || 
                           lowerText.includes('background music') || 
                           lowerText.includes('create a soundtrack') || 
                           lowerText.includes('generate soundtrack');

    if (isMusicRequest) {
      let promptText = text
        .replace(/^(generate music of|create music of|generate music for|create music for|compose music for|generate music|create music|compose music|background music|generate soundtrack|\/music)/i, '')
        .trim();
      if (!promptText) promptText = text;

      const loadingMsgId = (Date.now() + 1).toString();
      const loadingAssistantMessage: Message = {
        id: loadingMsgId,
        role: 'assistant',
        content: `🎵 *Arohi AI Music Engine (Lyria) is composing your custom soundtrack for: "${promptText}"...*`,
        timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, loadingAssistantMessage]);
      setIsLoading(true);

      try {
        const res = await fetch('/api/generate-music', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt: promptText,
            genre: 'cinematic',
            duration: '30s'
          })
        });
        const data = await res.json();

        if (data.success && data.audioUrl) {
          const formattedResponse = `🎶 **AI Music Soundtrack Created!**

**Track Title**: ${data.title}
**Prompt**: "${promptText}"
**Genre**: ${data.genre.toUpperCase()} | **Engine**: ${data.provider}

${data.lyrics ? `\`\`\`text\n${data.lyrics}\n\`\`\`\n` : ''}
🎧 **Listen to generated soundtrack**:
<audio controls src="${data.audioUrl}" class="w-full my-2"></audio>

*Composed using Arohi AI Lyria Music Engine.*`;

          setMessages((prev) => prev.map(m => m.id === loadingMsgId ? { ...m, content: formattedResponse } : m));

          try {
            fetch('/api/admin/sync-chat', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                userEmail: uEmail,
                userName: uName,
                sender: 'arohi',
                text: `[Music Generated: ${data.title}]`,
                topic: activeTopic
              })
            });
          } catch (e) {}
        } else {
          setMessages((prev) => prev.map(m => m.id === loadingMsgId ? { 
            ...m, 
            content: `⚠️ Music generation returned an issue: ${data.error || 'Please try again.'}` 
          } : m));
        }
      } catch (err: any) {
        setMessages((prev) => prev.map(m => m.id === loadingMsgId ? { 
          ...m, 
          content: `⚠️ Could not generate soundtrack. Please check your connection.` 
        } : m));
      } finally {
        setIsLoading(false);
      }
      return;
    }

    const isVideoRequest = lowerText.startsWith('/video') || 
                           lowerText.includes('generate video') || 
                           lowerText.includes('animate image') || 
                           lowerText.includes('animate photo') || 
                           lowerText.includes('create video ad') || 
                           lowerText.includes('make a video ad') || 
                           lowerText.includes('image to video') || 
                           lowerText.includes('veo video');

    if (isVideoRequest) {
      let promptText = text
        .replace(/^(generate video for|create video ad for|animate image of|animate photo of|animate image|animate photo|generate video|create video ad|image to video|veo video|\/video)/i, '')
        .trim();
      if (!promptText) promptText = text;

      const loadingMsgId = (Date.now() + 1).toString();
      const loadingAssistantMessage: Message = {
        id: loadingMsgId,
        role: 'assistant',
        content: `🎬 *Arohi Veo 3 Video Engine is generating your video clip for: "${promptText}"...*`,
        timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, loadingAssistantMessage]);
      setIsLoading(true);

      try {
        const res = await fetch('/api/animate-image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt: promptText,
            animationStyle: 'ad_product',
            aspectRatio: '16:9',
            duration: '5s'
          })
        });
        const data = await res.json();

        if (data.success && data.videoUrl) {
          const formattedResponse = `🎬 **Veo 3 AI Video Created!**

**Title**: ${data.title}
**Prompt**: "${promptText}"
**Motion Style**: ${data.animationStyle.toUpperCase()} | **Engine**: ${data.provider}

📹 **Watch animated video**:
<video controls autoplay loop src="${data.videoUrl}" class="w-full rounded-2xl my-2 border border-purple-800 shadow-xl"></video>

*Generated using Arohi AI: Generate video from text (Veo 3 Engine).*`;

          setMessages((prev) => prev.map(m => m.id === loadingMsgId ? { ...m, content: formattedResponse } : m));

          try {
            fetch('/api/admin/sync-chat', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                userEmail: uEmail,
                userName: uName,
                sender: 'arohi',
                text: `[Video Generated: ${data.title}]`,
                topic: activeTopic
              })
            });
          } catch (e) {}
        } else {
          setMessages((prev) => prev.map(m => m.id === loadingMsgId ? { 
            ...m, 
            content: `⚠️ Video generation returned an issue: ${data.error || 'Please try again.'}` 
          } : m));
        }
      } catch (err: any) {
        setMessages((prev) => prev.map(m => m.id === loadingMsgId ? { 
          ...m, 
          content: `⚠️ Could not animate video. Please check your network connection.` 
        } : m));
      } finally {
        setIsLoading(false);
      }
      return;
    }

    const isDocResearchRequest = lowerText.startsWith('/doc') ||
                                 lowerText.startsWith('/research') ||
                                 lowerText.includes('feature 6') ||
                                 lowerText.includes('feature #6') ||
                                 lowerText.includes('deep research') ||
                                 lowerText.includes('pdf vision') ||
                                 lowerText.includes('analyze document') ||
                                 lowerText.includes('doc research');

    if (isDocResearchRequest) {
      let promptText = text
        .replace(/^(feature 6|feature #6|implement feature 6|\/doc|\/research|deep research|pdf vision|analyze document|doc research)/i, '')
        .trim();
      if (!promptText) promptText = "Perform deep research and document vision OCR analysis.";

      const loadingMsgId = (Date.now() + 1).toString();
      const loadingAssistantMessage: Message = {
        id: loadingMsgId,
        role: 'assistant',
        content: `📄 *Arohi AI Vision & Research Engine is running deep analysis for: "${promptText}"...*`,
        timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, loadingAssistantMessage]);
      setIsLoading(true);

      try {
        const res = await fetch('/api/doc-research-studio', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt: promptText,
            documentData: fileToSend?.base64,
            documentName: fileToSend?.name,
            mimeType: fileToSend?.mimeType || 'application/pdf',
            mode: 'deep_research',
            language
          })
        });
        const data = await res.json();

        if (data.success && data.reportMarkdown) {
          const formattedResponse = `${data.reportMarkdown}

---
*Generated using Arohi AI: Deep Research & PDF Vision OCR Studio.*`;

          setMessages((prev) => prev.map(m => m.id === loadingMsgId ? { ...m, content: formattedResponse } : m));

          try {
            fetch('/api/admin/sync-chat', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                userEmail: uEmail,
                userName: uName,
                sender: 'arohi',
                text: `[Deep Research Report Generated: ${data.documentName || 'Deep Research'}]`,
                topic: activeTopic
              })
            });
          } catch (e) {}
        } else {
          setMessages((prev) => prev.map(m => m.id === loadingMsgId ? { 
            ...m, 
            content: `⚠️ Document Research Engine issue: ${data.error || 'Please try again.'}` 
          } : m));
        }
      } catch (err: any) {
        setMessages((prev) => prev.map(m => m.id === loadingMsgId ? { 
          ...m, 
          content: `⚠️ Could not complete research report. Please check your network connection.` 
        } : m));
      } finally {
        setIsLoading(false);
      }
      return;
    }

    const isMapsRequest = lowerText.startsWith('/map') ||
                          lowerText.startsWith('/route') ||
                          lowerText.startsWith('/directions') ||
                          lowerText.includes('feature 7') ||
                          lowerText.includes('feature #7') ||
                          lowerText.includes('google maps') ||
                          lowerText.includes('maps data') ||
                          lowerText.includes('places near') ||
                          lowerText.includes('route from');

    if (isMapsRequest) {
      let promptText = text
        .replace(/^(feature 7|feature #7|implement feature 7|\/map|\/route|\/directions|google maps|maps data|places near)/i, '')
        .trim();
      if (!promptText) promptText = "Connect to real-time Google Maps data for places, routes, or directions.";

      const loadingMsgId = (Date.now() + 1).toString();
      const loadingAssistantMessage: Message = {
        id: loadingMsgId,
        role: 'assistant',
        content: `🗺️ *Arohi AI Google Maps & Routes Engine is fetching live mapping data for: "${promptText}"...*`,
        timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, loadingAssistantMessage]);
      setIsLoading(true);

      try {
        const res = await fetch('/api/maps-location-studio', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt: promptText,
            mode: lowerText.includes('route') ? 'route_directions' : 'places_search',
            language
          })
        });
        const data = await res.json();

        if (data.success && data.summaryMarkdown) {
          const formattedResponse = `${data.summaryMarkdown}

---
*Generated using Arohi AI: Google Maps Data & Real-Time Route Directions Studio.*`;

          setMessages((prev) => prev.map(m => m.id === loadingMsgId ? { ...m, content: formattedResponse } : m));

          try {
            fetch('/api/admin/sync-chat', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                userEmail: uEmail,
                userName: uName,
                sender: 'arohi',
                text: `[Google Maps Report Generated: ${promptText}]`,
                topic: activeTopic
              })
            });
          } catch (e) {}
        } else {
          setMessages((prev) => prev.map(m => m.id === loadingMsgId ? { 
            ...m, 
            content: `⚠️ Google Maps Engine issue: ${data.error || 'Please try again.'}` 
          } : m));
        }
      } catch (err: any) {
        setMessages((prev) => prev.map(m => m.id === loadingMsgId ? { 
          ...m, 
          content: `⚠️ Could not complete Google Maps lookup. Please check network connection.` 
        } : m));
      } finally {
        setIsLoading(false);
      }
      return;
    }

    const isIntelligenceRequest = lowerText.startsWith('/arohi') ||
                                lowerText.startsWith('/gemini') ||
                                lowerText.startsWith('/intelligence') ||
                                lowerText.includes('feature 9') ||
                                lowerText.includes('feature #9') ||
                                lowerText.includes('add arohi intelligence') ||
                                lowerText.includes('arohi intelligence') ||
                                lowerText.includes('add gemini intelligence') ||
                                lowerText.includes('gemini intelligence') ||
                                lowerText.includes('analyze content') ||
                                lowerText.includes('make edits') ||
                                lowerText.includes('multi-step task') ||
                                lowerText.includes('multistep task');

    if (isIntelligenceRequest) {
      let promptText = text
        .replace(/^(feature 9|feature #9|implement feature 9|add arohi intelligence|arohi intelligence|add gemini intelligence|gemini intelligence|\/arohi|\/gemini|\/intelligence|analyze content|make edits|multi-step task)/i, '')
        .trim();
      if (!promptText) promptText = "Embed Arohi AI intelligence to analyze content, make smart edits, and execute multi-step tasks.";

      const loadingMsgId = (Date.now() + 1).toString();
      const loadingAssistantMessage: Message = {
        id: loadingMsgId,
        role: 'assistant',
        content: `🧠 *Arohi AI Intelligence Engine is executing multi-step analysis for: "${promptText}"...*`,
        timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, loadingAssistantMessage]);
      setIsLoading(true);

      try {
        const res = await fetch('/api/gemini-intelligence-studio', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            taskInstruction: promptText,
            content: text,
            mode: lowerText.includes('edit') ? 'smart_edits' : lowerText.includes('multi-step') || lowerText.includes('multistep') ? 'multistep_workflow' : 'content_analysis',
            language
          })
        });
        const data = await res.json();

        if (data.success && data.reportMarkdown) {
          const formattedResponse = `${data.reportMarkdown}

---
*Generated using Arohi AI: Intelligence Studio (Analyze Content, Smart Edits & Multi-Step Task Automation).*`;

          setMessages((prev) => prev.map(m => m.id === loadingMsgId ? { ...m, content: formattedResponse } : m));

          try {
            fetch('/api/admin/sync-chat', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                userEmail: uEmail,
                userName: uName,
                sender: 'arohi',
                text: `[Arohi AI Intelligence Report Generated: ${promptText}]`,
                topic: activeTopic
              })
            });
          } catch (e) {}
        } else {
          setMessages((prev) => prev.map(m => m.id === loadingMsgId ? { 
            ...m, 
            content: `⚠️ Arohi AI Intelligence Engine issue: ${data.error || 'Please try again.'}` 
          } : m));
        }
      } catch (err: any) {
        setMessages((prev) => prev.map(m => m.id === loadingMsgId ? { 
          ...m, 
          content: `⚠️ Could not complete Arohi AI Intelligence task.` 
        } : m));
      } finally {
        setIsLoading(false);
      }
      return;
    }

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: text,
          history: messages.map(m => ({ role: m.role, content: m.content })),
          file: fileToSend,
          language: language,
          uid: user?.uid
        })
      });

      const data = await response.json().catch(() => ({}));
      
      const responseText = data.response || data.reply || (data.error ? `I encountered an issue: ${data.error}. How else can I assist you with career and educational opportunities?` : null);

      if (!responseText) {
        throw new Error(data.error || 'API server error');
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responseText,
        timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, assistantMessage]);

      // Sync assistant response to admin portal
      try {
        fetch('/api/admin/sync-chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userEmail: uEmail,
            userName: uName,
            sender: 'arohi',
            text: data.response,
            topic: activeTopic
          })
        });
      } catch (e) {
        console.error('Error syncing assistant response to admin:', e);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      // Fallback
      setTimeout(() => {
        const fallbackText = `I apologize, but I had trouble connecting to the server. Please check your network connection or try again in a moment.

As **AROHI**, your opportunity advisor, let me recommend checking out our **Jobs board** or **Government Schemes** section to explore the latest live options for your educational background!`;

        setMessages((prev) => [...prev, {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: fallbackText,
          timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
        }]);

        // Sync fallback response to admin portal
        try {
          fetch('/api/admin/sync-chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              userEmail: uEmail,
              userName: uName,
              sender: 'arohi',
              text: fallbackText,
              topic: activeTopic
            })
          });
        } catch (e) {
          // ignore
        }
      }, 1000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const startNewChat = () => {
    const newChatId = 'chat-' + Date.now();
    const newChat: SavedChat = {
      id: newChatId,
      title: 'New Discussion',
      date: 'Today',
      messages: [
        {
          id: 'welcome',
          role: 'assistant',
          content: getWelcomeContent(language),
          timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
        }
      ]
    };

    const updatedChats = [newChat, ...savedChats];
    setSavedChats(updatedChats);
    setActiveChatId(newChatId);
    setMessages(newChat.messages);

    if (user) {
      updateArohiChats(updatedChats);
    } else {
      localStorage.setItem('guest_arohi_chats', JSON.stringify(updatedChats));
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const resultString = reader.result as string;
        const base64String = resultString.split(',')[1] || '';
        setUploadedFile({
          name: file.name,
          mimeType: file.type || 'application/octet-stream',
          base64: base64String
        });
        setUploadedFileName(file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const startSimulation = () => {
    setRecording(true);
    setInput('');
    if (simulationIntervalRef.current) {
      clearInterval(simulationIntervalRef.current);
    }
    const fullText = 'Show me government schemes for women entrepreneurs in India.';
    let currentIdx = 0;
    simulationIntervalRef.current = setInterval(() => {
      currentIdx++;
      setInput(fullText.slice(0, currentIdx));
      if (currentIdx >= fullText.length) {
        clearInterval(simulationIntervalRef.current);
        simulationIntervalRef.current = null;
        setRecording(false);
      }
    }, 45);
  };

  const toggleRecording = () => {
    if (recording) {
      if (simulationIntervalRef.current) {
        clearInterval(simulationIntervalRef.current);
        simulationIntervalRef.current = null;
      }
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          console.error(e);
        }
      }
      setRecording(false);
    } else {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        try {
          const rec = new SpeechRecognition();
          rec.continuous = true;
          rec.interimResults = true;
          
          // Set language dynamically to match the user's interface language selection
          const langMap = {
            en: 'en-IN',
            hi: 'hi-IN',
            or: 'or-IN'
          };
          rec.lang = langMap[language] || 'en-IN';

          // Inject custom career-related grammars to improve recognition of technical and scheme terms
          const SpeechGrammarList = (window as any).SpeechGrammarList || (window as any).webkitSpeechGrammarList;
          if (SpeechGrammarList) {
            try {
              const speechRecognitionList = new SpeechGrammarList();
              const terms = [
                'Mudra', 'PMEGP', 'CGTMSE', 'Sarkari', 'Arohi', 'MSME', 'validation',
                'entrepreneur', 'resume', 'skills', 'government schemes', 'startup', 'interview',
                'micro-business', 'career guide', 'Sarkari Jobs', 'Mudra Loans', 'Resume Guide', 'Mock Interview'
              ];
              const grammar = `#JSGF V1.0; grammar careerKeywords; public <keyword> = ${terms.join(' | ')} ;`;
              speechRecognitionList.addFromString(grammar, 1.0);
              rec.grammars = speechRecognitionList;
            } catch (grammarError) {
              console.warn('SpeechGrammarList registration ignored:', grammarError);
            }
          }

          rec.onstart = () => {
            setRecording(true);
          };

          rec.onresult = (event: any) => {
            let fullTranscript = '';
            for (let i = 0; i < event.results.length; ++i) {
              const transcriptSegment = event.results[i][0].transcript;
              fullTranscript += transcriptSegment;
            }
            const cleanText = fullTranscript.trim();
            if (cleanText) {
              setInput(cleanText);
            }
          };

          rec.onerror = (event: any) => {
            console.error('Speech recognition error:', event.error);
            if (event.error === 'not-allowed' || event.error === 'audio-capture' || event.error === 'service-not-allowed') {
              try {
                rec.abort();
              } catch (err) {}
              startSimulation();
            } else if (event.error !== 'no-speech') {
              setRecording(false);
            }
          };

          rec.onend = () => {
            if (!simulationIntervalRef.current) {
              setRecording(false);
            }
          };

          recognitionRef.current = rec;
          rec.start();
        } catch (e) {
          console.error('Speech recognition start failed, using fallback:', e);
          startSimulation();
        }
      } else {
        // Fallback simulation if browser doesn't support Web Speech API
        startSimulation();
      }
    }
  };

  // Quick Action Prompts
  const suggestedPrompts = getSuggestedPrompts(language);

  if (isMinimized) {
    return (
      <div className="bg-gradient-to-r from-[#120e2a] to-[#0a0715] border border-[#2d2163] rounded-3xl shadow-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-left transition-all duration-300">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl shadow-lg shrink-0 border border-[#a78bfa]/30 relative overflow-hidden">
            <ArohiAvatar className="w-full h-full" />
            <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-[#00e676] rounded-full border-2 border-[#120e2a] animate-pulse"></span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-white text-base leading-none">AROHI AI</h3>
              <span className="bg-[#7c3aed]/20 text-[#c084fc] border border-[#7c3aed]/30 text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">Minimized</span>
            </div>
            <p className="text-xs text-slate-300 mt-1 font-semibold leading-relaxed">
              Your career conversation is saved. Click Maximize to resume.
            </p>
          </div>
        </div>
        <button
          onClick={() => setIsMinimized(false)}
          className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white text-xs font-black uppercase tracking-wider py-3 px-6 rounded-2xl shadow-[0_0_15px_rgba(124,58,237,0.4)] cursor-pointer flex items-center gap-2 shrink-0 active:scale-95 transition-all"
        >
          <Sparkles className="w-4 h-4 text-[#fcd34d] animate-pulse" /> Maximize Chat
        </button>
      </div>
    );
  }

  return (
    <div className={`flex bg-[#000000] text-slate-100 overflow-hidden h-full w-full font-sans relative ${isVoiceCallOpen ? 'hidden' : ''}`}>
      
      {/* GEMINI & CHATGPT-STYLE NAVIGATION DRAWER / SIDEBAR */}
      <aside 
        className={`${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } fixed md:relative z-40 inset-y-0 left-0 flex flex-col w-80 md:w-72 bg-[#090714] border-r border-[#1a142e] p-4 shrink-0 transition-transform duration-300 ease-in-out font-sans text-slate-100 select-none shadow-2xl`}
      >
        {/* Sidebar Header: Brand + Search + Close */}
        <div className="flex items-center justify-between pb-3 mb-2 px-1 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#3b82f6] to-[#8b5cf6] flex items-center justify-center text-white shadow-md">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
              Arohi <span className="text-[10px] bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-300 px-2 py-0.5 rounded font-black uppercase border border-purple-500/30">AI</span>
            </h2>
          </div>
          <div className="flex items-center gap-1">
            <button 
              onClick={() => setShowSearchInput(!showSearchInput)}
              className="p-2 text-slate-300 hover:text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer"
              title="Search Recents"
            >
              <Search className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="md:hidden p-2 text-slate-300 hover:text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Top Quick Navigation List (Matches ChatGPT Sidebar) */}
        <div className="space-y-1 mb-3 py-1">
          <button
            onClick={() => {
              setIsImageStudioOpen(true);
              if (window.innerWidth < 768) setIsSidebarOpen(false);
            }}
            className="w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer text-left"
          >
            <ImageIcon className="w-5 h-5 text-slate-300 shrink-0" />
            <span>Images</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('calls');
              if (window.innerWidth < 768) setIsSidebarOpen(false);
            }}
            className="w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer text-left"
          >
            <Library className="w-5 h-5 text-slate-300 shrink-0" />
            <span>Library</span>
          </button>

          <button
            onClick={() => {
              setShowNewNotebookModal(true);
              if (window.innerWidth < 768) setIsSidebarOpen(false);
            }}
            className="w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer text-left"
          >
            <Folder className="w-5 h-5 text-slate-300 shrink-0" />
            <span>Projects</span>
          </button>

          <button
            onClick={() => {
              setIsVoiceCallOpen(true);
              if (window.innerWidth < 768) setIsSidebarOpen(false);
            }}
            className="w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer text-left"
          >
            <Clock className="w-5 h-5 text-slate-300 shrink-0" />
            <span>Scheduled</span>
          </button>

          <button
            onClick={() => {
              setIsIntelligenceStudioOpen(true);
              if (window.innerWidth < 768) setIsSidebarOpen(false);
            }}
            className="w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer text-left"
          >
            <Grid className="w-5 h-5 text-slate-300 shrink-0" />
            <span>Plugins & Tools</span>
          </button>
        </div>

        {/* Search input when toggled */}
        {showSearchInput && (
          <div className="mb-3 px-1">
            <input
              type="text"
              placeholder="Search conversation titles..."
              value={sidebarSearchQuery}
              onChange={(e) => setSidebarSearchQuery(e.target.value)}
              className="w-full bg-[#18132d] border border-[#30225d] rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#7c3aed]"
              autoFocus
            />
          </div>
        )}

        {/* Recents Section Heading */}
        <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-3 pt-2">
          <span>Recents</span>
          {activeTab === 'calls' && (
            <button
              onClick={() => setActiveTab('chats')}
              className="text-[10px] text-blue-400 hover:underline normal-case font-medium cursor-pointer"
            >
              Show Chats
            </button>
          )}
        </div>

        {/* Scrollable Conversation History */}
        <div className="flex-1 overflow-y-auto space-y-1.5 pr-1 px-1 custom-scrollbar">
          {activeTab === 'chats' ? (
            filteredChats.length === 0 ? (
              <div className="text-center py-8 text-xs text-slate-500 font-medium">
                No recent conversations
              </div>
            ) : (
              filteredChats.map((item) => {
                const isActive = activeChatId === item.id;
                const msgCount = item.messages ? item.messages.filter(m => m.id !== 'welcome').length : 0;
                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      setActiveChatId(item.id);
                      setMessages(item.messages);
                      if (window.innerWidth < 768) setIsSidebarOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer flex items-center justify-between group ${
                      isActive
                        ? 'bg-gradient-to-r from-purple-600/30 to-blue-600/30 text-white font-semibold border border-purple-500/40 shadow-sm'
                        : 'text-slate-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 pr-2">
                      <MessageCircle className={`w-4 h-4 shrink-0 ${isActive ? 'text-purple-400' : 'text-slate-400'}`} />
                      <div className="min-w-0">
                        <div className="truncate text-sm leading-tight">{item.title}</div>
                        <div className="text-[10px] text-slate-400 font-normal flex items-center gap-1.5 mt-0.5">
                          <span>{item.date || 'Recent'}</span>
                          {msgCount > 0 && (
                            <>
                              <span>•</span>
                              <span>{msgCount} {msgCount === 1 ? 'msg' : 'msgs'}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <Trash2
                      onClick={(e) => deleteChat(item.id, e)}
                      className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 hover:text-rose-400 shrink-0 transition-opacity"
                    />
                  </div>
                );
              })
            )
          ) : savedCalls.length === 0 ? (
            <div className="text-center py-8 text-xs text-slate-500 font-medium">
              No saved call logs
            </div>
          ) : (
            savedCalls.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  setSelectedCallDetail(item);
                  if (window.innerWidth < 768) setIsSidebarOpen(false);
                }}
                className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:bg-white/10 hover:text-white transition-colors cursor-pointer flex items-center justify-between group"
              >
                <div className="truncate flex items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="truncate">{item.date}</span>
                </div>
                <Trash2
                  onClick={(e) => deleteCall(item.id, e)}
                  className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 hover:text-rose-400 shrink-0 transition-opacity"
                />
              </div>
            ))
          )}
        </div>

        {/* Bottom Bar: Chat Pill + User Profile Circle */}
        <div className="pt-3 border-t border-white/10 mt-2 px-1 flex items-center justify-between gap-2">
          <button
            onClick={() => {
              startNewChat();
              if (window.innerWidth < 768) setIsSidebarOpen(false);
            }}
            className="flex items-center gap-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-5 py-2.5 rounded-full font-bold text-xs tracking-wide shadow-lg transition-all cursor-pointer active:scale-95"
          >
            <Edit3 className="w-4 h-4" />
            <span>Chat</span>
          </button>

          <div
            onClick={() => {
              onNavigateTab?.('dashboard');
              if (window.innerWidth < 768) setIsSidebarOpen(false);
            }}
            className="w-9 h-9 rounded-full bg-[#2563eb] text-white font-extrabold flex items-center justify-center text-xs border border-white/20 shadow-md cursor-pointer hover:scale-105 transition-all shrink-0"
            title="User Profile"
          >
            {(user as any)?.photoURL ? (
              <img src={(user as any).photoURL} alt="Profile" className="w-full h-full object-cover rounded-full" />
            ) : (
              currentUserName ? currentUserName.substring(0, 2).toUpperCase() : 'JU'
            )}
          </div>
        </div>
      </aside>

      {/* BACKDROP OVERLAY FOR MOBILE SIDEBAR */}
      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/70 backdrop-blur-xs z-30 md:hidden"
        />
      )}

      {/* CENTER: GEMINI MAIN CHAT WINDOW (Matches Screenshot 1) */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#000000] relative h-full">
        
        {/* Gemini Minimal Top Header Bar */}
        <div className="bg-[#000000] border-b border-[#1f1738]/60 px-4 py-3 flex justify-between items-center z-20 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-[#17122e] transition-colors cursor-pointer"
              title="Toggle Navigation Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="min-w-0 flex items-center gap-2">
              <h1 className="font-bold text-white text-base sm:text-lg tracking-tight truncate">
                {activeChatTitle || 'Arohi AI'}
              </h1>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" title="Core AI Online"></span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              onClick={() => setIsVoiceCallOpen(true)}
              className="p-2 rounded-full bg-[#181135] hover:bg-[#251b4e] text-emerald-400 border border-[#3b2a80] transition-all cursor-pointer flex items-center gap-1.5"
              title="Start Live Voice Call"
            >
              <Phone className="w-4 h-4 animate-pulse" />
              <span className="text-[11px] font-bold text-white hidden xs:inline pr-1">Voice</span>
            </button>

            <button
              onClick={() => handleSendMessage("Activate live video camera stream analysis")}
              className="p-2 rounded-full bg-[#181135] hover:bg-[#251b4e] text-violet-300 border border-[#3b2a80] transition-all cursor-pointer"
              title="Camera Stream"
            >
              <Video className="w-4 h-4" />
            </button>

            <div className="relative">
              <button
                onClick={() => setActiveMessageMenuId(activeMessageMenuId === 'header' ? null : 'header')}
                className="p-2 rounded-full hover:bg-[#181135] text-slate-300 hover:text-white transition-colors cursor-pointer"
                title="Options"
              >
                <MoreHorizontal className="w-5 h-5" />
              </button>

              {activeMessageMenuId === 'header' && (
                <div className="absolute right-0 top-11 w-48 bg-[#120c2b] border border-[#302166] rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <button
                    onClick={() => {
                      handleSummarizeChat();
                      setActiveMessageMenuId(null);
                    }}
                    className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-[#211745] hover:text-white rounded-xl flex items-center gap-2"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Generate AI Summary
                  </button>
                  <button
                    onClick={() => {
                      setMessages([messages[0]]);
                      setActiveMessageMenuId(null);
                    }}
                    className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-[#211745] hover:text-white rounded-xl flex items-center gap-2"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-blue-400" /> Clear Messages
                  </button>
                  {onMinimize && (
                    <button
                      onClick={() => {
                        onMinimize();
                        setActiveMessageMenuId(null);
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-[#211745] hover:text-white rounded-xl flex items-center gap-2"
                    >
                      <Minus className="w-3.5 h-3.5 text-indigo-400" /> Minimize
                    </button>
                  )}
                  {onClose && (
                    <button
                      onClick={() => {
                        onClose();
                        setActiveMessageMenuId(null);
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-semibold text-rose-400 hover:bg-rose-500/10 rounded-xl flex items-center gap-2"
                    >
                      <X className="w-3.5 h-3.5" /> Close Chat
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Messages Canvas Container (Spacious, High legibility, Black Canvas - Screenshot 1 Match) */}
        <div ref={messagesContainerRef} className="flex-1 overflow-y-auto px-4 sm:px-8 md:px-12 py-6 space-y-8 bg-[#000000]">
          {messages.map((msg) => {
            const summaryParsed = msg.role === 'assistant'
              ? parseMessageCallSummary(msg.content)
              : { cleanedContent: msg.content, summaryData: null };

            const parsed = msg.role === 'assistant' 
              ? parseMessageResume(summaryParsed.cleanedContent) 
              : { cleanedContent: msg.content, resumeData: null };

            const isLiked = likedMessageIds.includes(msg.id);
            const isDisliked = dislikedMessageIds.includes(msg.id);
            const isCopied = copiedMessageId === msg.id;
            const isSpeaking = speakingMessageId === msg.id;

            return (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} max-w-4xl mx-auto w-full`}
              >
                {/* Message Header Role Tag */}
                <div className="flex items-center gap-2 mb-1.5 px-1">
                  {msg.role === 'assistant' ? (
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#c084fc]">
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      <span>AROHI AI</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
                      <span>You</span>
                    </div>
                  )}
                  <span className="text-[10px] text-slate-500 font-medium">{msg.timestamp}</span>
                </div>

                {/* Message Content Container */}
                <div className={`w-full text-left ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-r from-[#7c3aed] to-[#9333ea] text-white p-4 sm:p-5 rounded-2xl rounded-tr-xs shadow-lg max-w-[85%]'
                    : 'text-slate-100 p-1 sm:p-2 font-normal text-base leading-relaxed'
                }`}>
                  {/* Parse standard markdown formatting */}
                  <div className={`prose prose-invert prose-p:text-slate-100 prose-p:leading-relaxed prose-li:text-slate-100 prose-strong:text-[#c084fc] prose-strong:font-bold prose-headings:text-white max-w-none text-sm sm:text-base leading-relaxed ${
                    msg.role === 'assistant' ? 'text-slate-100 font-sans tracking-wide space-y-3' : 'text-white'
                  }`}>
                    {renderMarkdown(parsed.cleanedContent)}
                  </div>

                  {parsed.resumeData && (
                    <div className="mt-4 p-4 rounded-2xl bg-gradient-to-br from-[#1b1342] to-[#25155c] border border-[#a78bfa]/40 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-[#7c3aed]/30 rounded-xl text-[#c084fc] border border-[#7c3aed]/50 shrink-0">
                          <Briefcase className="w-5 h-5 text-indigo-300" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Download Word Resume</h4>
                          <p className="text-[10px] text-slate-300 mt-0.5 font-semibold">Professional Microsoft Word (.docx) layout ready for HR</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDownloadResumeDocx(parsed.resumeData, msg.id)}
                        disabled={isDownloadingResume === msg.id}
                        className="w-full sm:w-auto px-4 py-2.5 bg-[#7c3aed] hover:bg-[#6d28d9] disabled:bg-violet-950 disabled:text-slate-400 text-white font-extrabold text-[11px] uppercase tracking-wider rounded-xl shadow-md cursor-pointer transition-all active:scale-95 flex items-center justify-center gap-1.5 shrink-0"
                      >
                        {isDownloadingResume === msg.id ? (
                          <>
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Generating...
                          </>
                        ) : (
                          <>
                            <ArrowRight className="w-3.5 h-3.5 text-emerald-300" /> Download (.docx)
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>

                {/* GEMINI-STYLE ACTION BAR UNDER AI RESPONSES (Exact match for Screenshot 1!) */}
                {msg.role === 'assistant' && (
                  <div className="flex items-center gap-2 mt-2 px-1 text-slate-400">
                    {/* Thumbs Up */}
                    <button
                      onClick={() => toggleLikeMessage(msg.id)}
                      className={`p-1.5 rounded-full hover:bg-[#1a1435] transition-colors cursor-pointer ${
                        isLiked ? 'text-[#c084fc] bg-[#1a1435]' : 'hover:text-white'
                      }`}
                      title="Good response"
                    >
                      <ThumbsUp className="w-4 h-4" />
                    </button>

                    {/* Thumbs Down */}
                    <button
                      onClick={() => toggleDislikeMessage(msg.id)}
                      className={`p-1.5 rounded-full hover:bg-[#1a1435] transition-colors cursor-pointer ${
                        isDisliked ? 'text-rose-400 bg-[#1a1435]' : 'hover:text-white'
                      }`}
                      title="Bad response"
                    >
                      <ThumbsDown className="w-4 h-4" />
                    </button>

                    {/* Copy Button */}
                    <button
                      onClick={() => copyMessageToClipboard(msg.id, parsed.cleanedContent)}
                      className="p-1.5 rounded-full hover:bg-[#1a1435] hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                      title="Copy response"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-400" />
                          <span className="text-[10px] text-emerald-400 font-bold">Copied!</span>
                        </>
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>

                    {/* Text to Speech Button */}
                    <button
                      onClick={() => speakMessage(msg.id, parsed.cleanedContent)}
                      className={`p-1.5 rounded-full hover:bg-[#1a1435] transition-colors cursor-pointer ${
                        isSpeaking ? 'text-amber-400 bg-[#1a1435] animate-pulse' : 'hover:text-white'
                      }`}
                      title={isSpeaking ? "Stop speech" : "Read aloud"}
                    >
                      {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>

                    {/* More Action dropdown */}
                    <div className="relative">
                      <button
                        onClick={() => setActiveMessageMenuId(activeMessageMenuId === msg.id ? null : msg.id)}
                        className="p-1.5 rounded-full hover:bg-[#1a1435] hover:text-white transition-colors cursor-pointer"
                        title="More options"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </button>

                      {activeMessageMenuId === msg.id && (
                        <div className="absolute left-0 bottom-8 w-44 bg-[#120c2b] border border-[#302166] rounded-2xl shadow-2xl p-1.5 z-30 animate-in fade-in zoom-in-95 duration-150">
                          <button
                            onClick={() => {
                              exportToPDF('Arohi_AI_Response', 'Arohi AI Response Document', parsed.cleanedContent);
                              setActiveMessageMenuId(null);
                            }}
                            className="w-full text-left px-3 py-1.5 text-xs font-semibold text-slate-200 hover:bg-[#211745] hover:text-white rounded-xl flex items-center gap-2 cursor-pointer"
                          >
                            <FileText className="w-3.5 h-3.5 text-rose-400" /> Export PDF
                          </button>
                          <button
                            onClick={() => {
                              exportToWord('Arohi_AI_Response', 'Arohi AI Response Document', parsed.cleanedContent);
                              setActiveMessageMenuId(null);
                            }}
                            className="w-full text-left px-3 py-1.5 text-xs font-semibold text-slate-200 hover:bg-[#211745] hover:text-white rounded-xl flex items-center gap-2 cursor-pointer"
                          >
                            <FileText className="w-3.5 h-3.5 text-blue-400" /> Export DOCX
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-center gap-3 max-w-4xl mx-auto w-full py-4 text-slate-400">
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center text-white shadow-md animate-spin">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="text-xs sm:text-sm font-semibold text-violet-300 animate-pulse">
                AROHI is analyzing and formulating response...
              </div>
            </div>
          )}



          <div ref={messagesEndRef} />
        </div>

        {/* Audience Category & Prompt Selector Row */}
        <div className="px-4 sm:px-8 max-w-4xl mx-auto w-full mb-1">
          <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none text-[10px] font-bold">
            {[
              { id: 'all', label: '🌟 All (20+ Audiences)' },
              { id: 'students', label: '🎓 Students & School' },
              { id: 'jobs', label: '💼 Jobs & Careers' },
              { id: 'sarkari', label: '🏛️ Sarkari Exams' },
              { id: 'msme', label: '🏢 MSMEs & Startups' },
              { id: 'academics', label: '👩‍🏫 Teachers & Academics' },
              { id: 'research_medical', label: '🔬 Healthcare & Research' },
              { id: 'homemakers', label: '🏡 Homemakers & SHG' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedAudienceCategory(cat.id)}
                className={`px-2.5 py-1 rounded-full shrink-0 transition-all cursor-pointer ${
                  selectedAudienceCategory === cat.id
                    ? 'bg-[#211742] text-white border border-[#5b3dae] font-extrabold shadow-sm'
                    : 'bg-[#0f0b1e] text-slate-400 hover:text-slate-200 border border-[#1e1738]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* GEMINI AMBIENT AURA FLOATING BOTTOM DOCK BAR (Exact match for Screenshot 1!) */}
        <div className="p-3 sm:p-4 max-w-4xl mx-auto w-full z-20">
          
          {uploadedFileName && (
            <div className="mb-2 px-3 py-1.5 bg-[#1b123d] text-violet-200 text-xs font-semibold rounded-2xl flex items-center justify-between border border-[#4c31a5]">
              <span className="truncate flex items-center gap-1.5">
                <Paperclip className="w-3.5 h-3.5 text-violet-400" /> File attached: {uploadedFileName}
              </span>
              <button 
                onClick={() => setUploadedFileName(null)}
                className="text-[10px] font-bold text-rose-400 hover:underline uppercase cursor-pointer"
              >
                Remove
              </button>
            </div>
          )}

          {/* Floating Gemini Capsule Dock */}
          <div className="bg-[#0e0a21]/90 backdrop-blur-2xl border border-[#2b2158] rounded-full p-2 sm:p-2.5 shadow-[0_10px_35px_rgba(0,0,0,0.8)] flex items-center gap-2">
            
            {/* Camera / Vision Stream Button */}
            <label className="p-2.5 sm:p-3 bg-[#181136] hover:bg-[#271c54] rounded-full text-slate-300 hover:text-white transition-colors cursor-pointer shrink-0" title="Camera / Vision Upload">
              <Camera className="w-4 h-4 sm:w-5 sm:h-5" />
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleFileUpload} 
                className="hidden" 
              />
            </label>

            {/* Document Upload Button */}
            <label className="p-2.5 sm:p-3 bg-[#181136] hover:bg-[#271c54] rounded-full text-slate-300 hover:text-white transition-colors cursor-pointer shrink-0" title="Attach Document">
              <Paperclip className="w-4 h-4 sm:w-5 sm:h-5" />
              <input 
                type="file" 
                accept=".pdf,.docx,.txt,image/*" 
                onChange={handleFileUpload} 
                className="hidden" 
              />
            </label>

            {/* Text Input Box */}
            <input
              type="text"
              placeholder="Ask Arohi AI anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              className="flex-1 min-w-0 bg-transparent px-2 sm:px-3 py-2 text-sm text-white placeholder-slate-400 focus:outline-none font-medium"
            />

            {/* Microphone Speech to Text Button */}
            <button
              onClick={toggleRecording}
              className={`p-2.5 sm:p-3 rounded-full transition-colors shrink-0 cursor-pointer ${
                recording 
                  ? 'bg-rose-600 text-white animate-pulse' 
                  : 'bg-[#181136] hover:bg-[#271c54] text-slate-300 hover:text-white'
              }`}
              title="Speech to text"
            >
              <Mic className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Send Button */}
            <button
              onClick={() => handleSendMessage()}
              disabled={(!input.trim() && !uploadedFileName) || isLoading}
              className="p-2.5 sm:p-3 bg-[#7c3aed] hover:bg-[#6d28d9] disabled:bg-[#181230] disabled:text-slate-600 text-white rounded-full shadow-md cursor-pointer disabled:cursor-not-allowed transition-all shrink-0 flex items-center justify-center"
            >
              <Send className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          <div className="mt-2 text-center text-[10px] text-slate-500 font-medium">
            Arohi AI can make mistakes. Check important info.
          </div>
        </div>

      </div>

      {/* NEW NOTEBOOK CREATION MODAL */}
      {showNewNotebookModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#120d2a] border border-[#3b2a80] rounded-3xl w-full max-w-md p-6 shadow-2xl">
            <h3 className="text-base font-bold text-white mb-2">Create New Notebook</h3>
            <p className="text-xs text-slate-400 mb-4">Organize your career, study, or business research in a dedicated workspace.</p>
            <input
              type="text"
              placeholder="Notebook Title (e.g. OPSC Exam Notes)"
              value={newNotebookTitle}
              onChange={(e) => setNewNotebookTitle(e.target.value)}
              className="w-full bg-[#181136] border border-[#3b2a80] rounded-2xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-[#7c3aed] mb-4"
              autoFocus
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowNewNotebookModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={addNotebook}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-[#7c3aed] hover:bg-[#6d28d9] text-white cursor-pointer"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VOICE CALL MODAL PORTAL (Renders full-screen over document.body to prevent flickering & background chat overlap) */}
      {isVoiceCallOpen && createPortal(
        <div className="fixed inset-0 z-[9999] bg-[#070514] text-white overflow-hidden">
          <ArohiVoiceCall 
            onClose={() => setIsVoiceCallOpen(false)} 
            language={language} 
            onNavigateTab={onNavigateTab}
            uid={user?.uid}
            onCallComplete={handleVoiceCallComplete}
          />
        </div>,
        document.body
      )}

      {/* CALL SUMMARY DETAIL MODAL */}
      {selectedCallDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[#120e2e] border border-[#3b2a80] rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden text-left">
            {/* Header */}
            <div className="bg-[#1a143f] px-6 py-4 flex items-center justify-between border-b border-[#2d2163]">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-white text-sm sm:text-base leading-tight">
                    {selectedCallDetail.isCareerRelated ? 'Arohi AI Voice Career Consultation Summary' : 'Arohi AI Voice Business Consultation Summary'}
                  </h4>
                  <p className="text-[10px] sm:text-xs text-slate-400 mt-0.5">{selectedCallDetail.date}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedCallDetail(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/5 cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="bg-[#0b0821] border border-[#2d2163] p-3.5 rounded-2xl">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-extrabold block">Call Duration</span>
                  <span className="text-sm font-black text-white mt-1 block">
                    {Math.floor(selectedCallDetail.duration / 60)}m {selectedCallDetail.duration % 60}s
                  </span>
                </div>
                <div className="bg-[#0b0821] border border-[#2d2163] p-3.5 rounded-2xl">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-extrabold block">Voice Channel</span>
                  <span className="text-sm font-black text-white mt-1 block">Zephyr Link</span>
                </div>
                <div className="bg-[#0b0821] border border-[#2d2163] p-3.5 rounded-2xl col-span-2 sm:col-span-1">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-extrabold block">Focus Mode</span>
                  <span className="text-sm font-black text-white mt-1 block">
                    {selectedCallDetail.isCareerRelated ? '💡 Career / Jobs' : '🚀 Business / MSME'}
                  </span>
                </div>
              </div>

              <div className="bg-[#18123c]/50 border border-[#302170]/70 p-5 rounded-2xl relative overflow-hidden">
                <h5 className="text-xs uppercase tracking-wider text-violet-300 font-extrabold mb-3 flex items-center gap-1.5">
                  <Bot className="w-4 h-4" /> Discussion Summary Report
                </h5>
                <p className="text-sm text-slate-200 font-medium leading-relaxed whitespace-pre-wrap">
                  {selectedCallDetail.summaryText}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-[#140e2b] px-6 py-4 flex justify-end border-t border-[#2d2163]">
              <button
                onClick={() => setSelectedCallDetail(null)}
                className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white text-xs font-bold py-2.5 px-5 rounded-xl cursor-pointer"
              >
                Close Summary
              </button>
            </div>
          </div>
        </div>
      )}

      {/* IMAGE CREATION & EDITING STUDIO MODAL */}
      {isImageStudioOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
          <div className="bg-[#0e0924] border border-[#2e2163] rounded-3xl w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden shadow-2xl relative">
            
            {/* Header */}
            <div className="bg-[#140e32] px-6 py-4 flex items-center justify-between border-b border-[#2a1d59]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#7c3aed] to-[#3b82f6] p-0.5 shadow-lg flex items-center justify-center">
                  <div className="w-full h-full rounded-[14px] bg-[#0e0924] flex items-center justify-center">
                    <ImageIcon className="w-5 h-5 text-[#c084fc]" />
                  </div>
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                    Control image aspect ratios
                    <span className="text-[10px] bg-purple-500/20 text-purple-300 px-2.5 py-0.5 rounded-full font-black uppercase tracking-wider border border-purple-500/30 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-purple-300" /> Active
                    </span>
                  </h3>
                  <p className="text-xs text-slate-300">Customize generated image dimensions for vertical wallpapers or horizontal banners.</p>
                </div>
              </div>
              <button
                onClick={() => setIsImageStudioOpen(false)}
                className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-white/10 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Studio Body Grid */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: Generation Controls (5 Cols) */}
              <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
                <div className="space-y-4">
                  
                  {/* Active Status Box */}
                  <div className="bg-[#160f3b] border border-purple-500/30 rounded-2xl p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></div>
                      <div>
                        <p className="text-xs font-black text-purple-300 flex items-center gap-1.5">
                          <span>Control Image Aspect Ratios</span>
                          <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-bold">Active</span>
                        </p>
                        <p className="text-[10px] text-slate-400">Customize dimensions for vertical wallpapers (9:16, 2:3) or horizontal banners (16:9, 21:9)</p>
                      </div>
                    </div>
                    <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-purple-400" /> Image Prompt & Asset Specification
                    </label>
                    <textarea
                      rows={3}
                      value={studioPrompt}
                      onChange={(e) => setStudioPrompt(e.target.value)}
                      placeholder="Describe the image you want to create... e.g. High-resolution cinematic hero banner of a futuristic smart city with golden lighting, 8k render"
                      className="w-full bg-[#160f38] border border-[#2d1e63] rounded-2xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#7c3aed] focus:ring-1 focus:ring-[#7c3aed] resize-none"
                    />
                  </div>

                  {/* Sample Prompt Chips */}
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 block mb-1.5">High-Res Presets:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        "Horizontal Banner: Sci-Fi Tech Park 16:9",
                        "Vertical Wallpaper: Cyberpunk Aurora 9:16",
                        "Ultra-wide Banner: Futuristic Skyline 21:9",
                        "UI Asset: Glossy 3D App Icon 1:1"
                      ].map((idea, idx) => (
                        <button
                          key={idx}
                          onClick={() => setStudioPrompt(idea)}
                          className="text-[10px] bg-[#1a123f] hover:bg-[#281b5c] text-purple-300 border border-[#3b2780] px-2.5 py-1 rounded-full cursor-pointer transition-all truncate max-w-[200px]"
                        >
                          + {idea}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Aspect Ratio Selector */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                        <SlidersHorizontal className="w-3.5 h-3.5 text-purple-400" /> Aspect Ratio & Dimensions
                      </label>
                      <span className="text-[10px] text-purple-300 font-extrabold bg-purple-500/20 px-2 py-0.5 rounded-full border border-purple-500/30">
                        Selected: {studioAspectRatio}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { id: '16:9', label: '16:9 Banner', desc: 'Horizontal Banner', icon: '🖼️' },
                        { id: '9:16', label: '9:16 Mobile', desc: 'Vertical Wallpaper', icon: '📱' },
                        { id: '21:9', label: '21:9 Cinema', desc: 'Ultra-wide Banner', icon: '🎬' },
                        { id: '1:1', label: '1:1 Square', desc: 'Social Avatar', icon: '⏹️' },
                        { id: '4:3', label: '4:3 Card', desc: 'Landscape Card', icon: '💻' },
                        { id: '3:4', label: '3:4 Poster', desc: 'Vertical Poster', icon: '📜' },
                        { id: '3:2', label: '3:2 Photo', desc: 'Classic Landscape', icon: '📸' },
                        { id: '2:3', label: '2:3 Portrait', desc: 'Tall Wallpaper', icon: '📲' },
                      ].map((ar) => (
                        <button
                          key={ar.id}
                          onClick={() => setStudioAspectRatio(ar.id as any)}
                          className={`py-2 px-2 text-left rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                            studioAspectRatio === ar.id
                              ? 'bg-[#7c3aed] text-white border-[#9055f2] shadow-lg shadow-purple-900/50 ring-1 ring-purple-400'
                              : 'bg-[#140e33] text-slate-400 border-[#2d1e63] hover:text-white hover:bg-[#1f154d]'
                          }`}
                        >
                          <div className="flex items-center justify-between text-[11px] font-black">
                            <span>{ar.icon} {ar.id}</span>
                            {studioAspectRatio === ar.id && <CheckCircle className="w-3 h-3 text-emerald-300 shrink-0" />}
                          </div>
                          <span className="text-[9px] opacity-80 mt-1 font-semibold truncate">{ar.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Style Selector */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                      Visual Art Style
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'photorealistic', label: '📸 Photo' },
                        { id: '3d-render', label: '🎨 3D Render' },
                        { id: 'anime', label: '🎌 Anime / Art' },
                        { id: 'cinematic', label: '🎬 Cinematic' },
                        { id: 'cyberpunk', label: '🌌 Cyberpunk' },
                        { id: 'minimalist', label: '📐 Minimalist' },
                      ].map((st) => (
                        <button
                          key={st.id}
                          onClick={() => setStudioStyle(st.id as any)}
                          className={`py-2 px-2 text-[10px] font-bold rounded-xl border text-center transition-all cursor-pointer ${
                            studioStyle === st.id
                              ? 'bg-[#3b82f6] text-white border-[#60a5fa] shadow-lg shadow-blue-900/50'
                              : 'bg-[#140e33] text-slate-400 border-[#2d1e63] hover:text-white hover:bg-[#1f154d]'
                          }`}
                        >
                          {st.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Main Generate Button */}
                <button
                  onClick={() => handleGenerateStudioImage()}
                  disabled={isStudioGenerating || !studioPrompt.trim()}
                  className="w-full mt-4 bg-gradient-to-r from-[#7c3aed] via-[#6366f1] to-[#3b82f6] hover:opacity-95 disabled:opacity-50 text-white font-extrabold text-xs py-3.5 px-6 rounded-2xl flex items-center justify-center gap-2 shadow-xl shadow-purple-950/60 cursor-pointer transition-all active:scale-[0.99]"
                >
                  {isStudioGenerating ? (
                    <>
                      <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
                      <span>Creating AI Image ({studioAspectRatio})...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-cyan-300" />
                      <span>Generate Image</span>
                    </>
                  )}
                </button>
              </div>

              {/* Right Column: Result Preview & Editing Studio (7 Cols) */}
              <div className="lg:col-span-7 bg-[#140d33]/60 border border-[#2b1d5c] rounded-2xl p-4 sm:p-5 flex flex-col justify-between space-y-4">
                
                {/* Result Display Box */}
                <div className="flex-1 min-h-[300px] flex flex-col items-center justify-center bg-[#0a071a] border border-[#22174a] rounded-2xl p-3 relative overflow-hidden group">
                  {isStudioGenerating ? (
                    <div className="flex flex-col items-center gap-3 py-12">
                      <div className="w-12 h-12 rounded-full border-3 border-[#7c3aed] border-t-cyan-400 animate-spin"></div>
                      <p className="text-xs font-bold text-purple-300 animate-pulse">Arohi AI Image Engine is generating artwork...</p>
                    </div>
                  ) : studioGeneratedImage ? (
                    <div className="w-full flex flex-col items-center gap-3">
                      <img
                        src={studioGeneratedImage}
                        alt="Generated preview"
                        referrerPolicy="no-referrer"
                        className="w-full max-h-[360px] object-contain rounded-xl border border-[#3c2a80] shadow-2xl transition-transform duration-300 group-hover:scale-[1.01]"
                      />
                      
                      {/* Image Action Bar */}
                      <div className="flex flex-wrap items-center justify-center gap-2 w-full pt-1">
                        <button
                          onClick={() => {
                            const link = document.createElement('a');
                            link.href = studioGeneratedImage;
                            link.download = `arohi-ai-image-${Date.now()}.jpg`;
                            link.click();
                          }}
                          className="bg-[#211652] hover:bg-[#2e1f73] text-white font-bold text-[11px] px-3.5 py-2 rounded-xl flex items-center gap-1.5 border border-[#402a94] cursor-pointer transition-all"
                        >
                          <Download className="w-3.5 h-3.5 text-cyan-400" /> Download
                        </button>

                        <button
                          onClick={() => {
                            const formattedImageMarkdown = `\n\n![${studioPrompt || 'AI Generated Image'}](${studioGeneratedImage})\n\n**Prompt**: ${studioPrompt}\n`;
                            handleSendMessage(formattedImageMarkdown);
                            setIsImageStudioOpen(false);
                          }}
                          className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-bold text-[11px] px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-md cursor-pointer transition-all"
                        >
                          <Send className="w-3.5 h-3.5 text-white" /> Send to Chat
                        </button>

                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(studioGeneratedImage);
                            alert("Image URL copied to clipboard!");
                          }}
                          className="bg-[#211652] hover:bg-[#2e1f73] text-slate-300 font-bold text-[11px] px-3.5 py-2 rounded-xl flex items-center gap-1.5 border border-[#402a94] cursor-pointer transition-all"
                        >
                          <Copy className="w-3.5 h-3.5 text-purple-300" /> Copy URL
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12 px-4 space-y-3">
                      <div className="w-16 h-16 rounded-full bg-[#1b1242] border border-[#3b2680] flex items-center justify-center mx-auto text-purple-400">
                        <ImageIcon className="w-8 h-8" />
                      </div>
                      <h4 className="text-sm font-bold text-white">No Image Generated Yet</h4>
                      <p className="text-xs text-slate-400 max-w-xs mx-auto">
                        Type a detailed description on the left and click "Generate Image" to create artwork using Arohi AI.
                      </p>
                    </div>
                  )}
                </div>

                {/* Edit Existing Image Section */}
                {studioGeneratedImage && (
                  <div className="bg-[#100a2b] border border-[#2c1d5c] p-3.5 rounded-2xl space-y-2">
                    <label className="block text-xs font-bold text-purple-300 uppercase tracking-wider flex items-center gap-1.5">
                      <Edit3 className="w-3.5 h-3.5 text-cyan-400" /> Edit & Transform Generated Image
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={studioEditInstruction}
                        onChange={(e) => setStudioEditInstruction(e.target.value)}
                        placeholder="e.g. 'Add golden sunset in background', 'Change colors to cyan and violet', 'Add snow'"
                        className="flex-1 bg-[#180f3d] border border-[#34226e] rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#7c3aed]"
                      />
                      <button
                        onClick={handleEditStudioImage}
                        disabled={isStudioGenerating || !studioEditInstruction.trim()}
                        className="bg-[#3b82f6] hover:bg-[#2563eb] disabled:opacity-50 text-white font-extrabold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 cursor-pointer shrink-0"
                      >
                        <Sparkles className="w-3.5 h-3.5" /> Transform
                      </button>
                    </div>
                  </div>
                )}

                {/* Session History Thumbnails */}
                {studioHistory.length > 0 && (
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">Session Image History</span>
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar">
                      {studioHistory.map((item, idx) => (
                        <img
                          key={idx}
                          src={item.imageUrl}
                          alt={item.prompt}
                          referrerPolicy="no-referrer"
                          onClick={() => {
                            setStudioGeneratedImage(item.imageUrl);
                            setStudioPrompt(item.prompt);
                          }}
                          className="w-14 h-14 object-cover rounded-lg border border-[#3b2780] hover:border-cyan-400 cursor-pointer shrink-0 transition-all hover:scale-105"
                          title={item.prompt}
                        />
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>

            {/* Footer */}
            <div className="bg-[#110b29] px-6 py-3 border-t border-[#2a1d59] flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-2">
                <ImageIcon className="w-3.5 h-3.5 text-purple-400" />
                <span>Arohi AI: Control image aspect ratios — Vertical wallpapers & Horizontal banners Studio</span>
              </span>
              <button
                onClick={() => setIsImageStudioOpen(false)}
                className="bg-[#23184d] hover:bg-[#31226b] text-slate-200 font-bold px-4 py-1.5 rounded-xl transition-all cursor-pointer"
              >
                Close Studio
              </button>
            </div>

          </div>
        </div>
      )}

      {/* AI MUSIC CREATION & SOUNDTRACK STUDIO MODAL (Lyria Engine) */}
      {isMusicStudioOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
          <div className="bg-[#090618] border border-[#231754] rounded-3xl w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden shadow-2xl relative">
            
            {/* Header */}
            <div className="bg-[#100b2e] px-6 py-4 flex items-center justify-between border-b border-[#251859]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#06b6d4] via-[#3b82f6] to-[#a855f7] p-0.5 shadow-lg shadow-cyan-950/50 flex items-center justify-center">
                  <div className="w-full h-full rounded-[14px] bg-[#090618] flex items-center justify-center">
                    <Music className="w-5 h-5 text-cyan-400 animate-pulse" />
                  </div>
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                    Arohi AI Music & Soundtrack Studio
                    <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-2.5 py-0.5 rounded-full font-black uppercase tracking-wider border border-cyan-500/30 flex items-center gap-1">
                      <Zap className="w-3 h-3 text-amber-300" /> Lyria Engine Active
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400">Generate custom AI soundtracks, background beats & melodies using Lyria Clip & Pro</p>
                </div>
              </div>
              <button
                onClick={() => setIsMusicStudioOpen(false)}
                className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-white/10 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Studio Body Grid */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: Music Generation Controls (5 Cols) */}
              <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
                <div className="space-y-4">
                  
                  {/* Prompt Box */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Music className="w-3.5 h-3.5 text-cyan-400" /> Soundtrack Prompt / Description
                    </label>
                    <textarea
                      rows={3}
                      value={musicPrompt}
                      onChange={(e) => setMusicPrompt(e.target.value)}
                      placeholder="Describe your soundtrack... e.g. 'Chill lo-fi study music with soft piano and ambient rain for Odia students', or 'Dramatic cinematic trailer music'"
                      className="w-full bg-[#130d33] border border-[#281a5e] rounded-2xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 resize-none"
                    />
                  </div>

                  {/* Preset Suggestions */}
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 block mb-1.5">Preset Soundtrack Ideas:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        "Chill Lofi study beat with soft piano",
                        "Dramatic cinematic orchestral theme",
                        "Traditional Odia bansuri flute melody",
                        "120BPM upbeat tech startup background",
                        "432Hz deep zen meditation soundscape"
                      ].map((preset, idx) => (
                        <button
                          key={idx}
                          onClick={() => setMusicPrompt(preset)}
                          className="text-[10px] bg-[#17103a] hover:bg-[#25195c] text-cyan-300 border border-[#342278] px-2.5 py-1 rounded-full cursor-pointer transition-all truncate max-w-[210px]"
                        >
                          + {preset}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Genre Selection */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                      Musical Genre / Atmosphere
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'cinematic', label: '🎬 Cinematic' },
                        { id: 'lo-fi', label: '🎧 Lo-Fi Chill' },
                        { id: 'folk', label: '🪕 Odia Folk' },
                        { id: 'electronic', label: '⚡ Electronic' },
                        { id: 'zen', label: '🧘 Meditation' },
                      ].map((g) => (
                        <button
                          key={g.id}
                          onClick={() => setMusicGenre(g.id as any)}
                          className={`py-2 px-2 text-[10px] font-bold rounded-xl border text-center transition-all cursor-pointer ${
                            musicGenre === g.id
                              ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white border-cyan-400 shadow-lg shadow-cyan-950/60'
                              : 'bg-[#120c30] text-slate-400 border-[#26195b] hover:text-white hover:bg-[#1d134a]'
                          }`}
                        >
                          {g.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Duration Selection */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                      Track Length & Lyria Model
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: '15s', label: '15s Short Clip' },
                        { id: '30s', label: '30s (Lyria Clip)' },
                        { id: 'full', label: 'Full Track (Lyria Pro)' },
                      ].map((d) => (
                        <button
                          key={d.id}
                          onClick={() => setMusicDuration(d.id as any)}
                          className={`py-2 px-1 text-[10px] font-extrabold rounded-xl border text-center transition-all cursor-pointer ${
                            musicDuration === d.id
                              ? 'bg-[#7c3aed] text-white border-[#9055f2] shadow-lg shadow-purple-900/50'
                              : 'bg-[#120c30] text-slate-400 border-[#26195b] hover:text-white hover:bg-[#1d134a]'
                          }`}
                        >
                          {d.label}
                        </button>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Generate Music Action Button */}
                <button
                  onClick={() => handleGenerateStudioMusic()}
                  disabled={isMusicGenerating || !musicPrompt.trim()}
                  className="w-full mt-4 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:opacity-95 disabled:opacity-50 text-white font-extrabold text-xs py-3.5 px-6 rounded-2xl flex items-center justify-center gap-2 shadow-xl shadow-cyan-950/60 cursor-pointer transition-all active:scale-[0.99]"
                >
                  {isMusicGenerating ? (
                    <>
                      <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
                      <span>Lyria Engine Composing Music...</span>
                    </>
                  ) : (
                    <>
                      <Disc className="w-4 h-4 text-cyan-200 animate-spin" style={{ animationDuration: '4s' }} />
                      <span>Generate AI Music Track</span>
                    </>
                  )}
                </button>
              </div>

              {/* Right Column: Audio Player & Track Visualizer (7 Cols) */}
              <div className="lg:col-span-7 bg-[#100a29]/70 border border-[#231754] rounded-2xl p-4 sm:p-5 flex flex-col justify-between space-y-4">
                
                {/* Result Audio Player Display Box */}
                <div className="flex-1 min-h-[300px] flex flex-col items-center justify-center bg-[#070414] border border-[#1d1245] rounded-2xl p-4 relative overflow-hidden">
                  
                  {isMusicGenerating ? (
                    <div className="flex flex-col items-center gap-4 py-12">
                      <div className="relative">
                        <div className="w-20 h-20 rounded-full border-4 border-cyan-500/20 border-t-cyan-400 animate-spin"></div>
                        <Disc className="w-10 h-10 text-cyan-400 absolute inset-0 m-auto animate-pulse" />
                      </div>
                      <div className="text-center space-y-1">
                        <p className="text-xs font-bold text-cyan-300 animate-pulse">Arohi Lyria AI is synthesizing audio harmonics & tracks...</p>
                        <p className="text-[11px] text-slate-500">Model: {musicDuration === 'full' ? 'lyria-3-pro-preview' : 'lyria-3-clip-preview'}</p>
                      </div>
                    </div>
                  ) : musicGeneratedTrack ? (
                    <div className="w-full flex flex-col items-center space-y-4 my-auto">
                      
                      {/* Album Art Vinyl Box */}
                      <div className="w-28 h-28 rounded-3xl bg-gradient-to-tr from-[#1a1040] to-[#0c0824] border-2 border-cyan-500/40 shadow-2xl flex items-center justify-center relative group p-3">
                        <Disc className="w-20 h-20 text-cyan-400 animate-spin group-hover:scale-105 transition-transform" style={{ animationDuration: '6s' }} />
                        <div className="absolute inset-0 bg-cyan-500/10 rounded-3xl blur-md -z-10"></div>
                      </div>

                      {/* Track Details Header */}
                      <div className="text-center space-y-1">
                        <h4 className="text-base font-extrabold text-white flex items-center justify-center gap-2">
                          <Headphones className="w-4 h-4 text-cyan-400" />
                          {musicGeneratedTrack.title}
                        </h4>
                        <p className="text-xs text-slate-400 max-w-md line-clamp-1">"{musicGeneratedTrack.prompt}"</p>
                        <div className="flex items-center justify-center gap-2 pt-1">
                          <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded-full font-bold uppercase">
                            {musicGeneratedTrack.genre}
                          </span>
                          <span className="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full font-bold">
                            Engine: {musicGeneratedTrack.provider}
                          </span>
                        </div>
                      </div>

                      {/* Audio Player Component */}
                      <div className="w-full bg-[#120a33] border border-[#2c1a6e] p-3 rounded-2xl space-y-2">
                        <audio
                          controls
                          src={musicGeneratedTrack.audioUrl}
                          className="w-full accent-cyan-400"
                          autoPlay
                        />
                      </div>

                      {/* Breakdown / Lyrics display */}
                      {musicGeneratedTrack.lyrics && (
                        <div className="w-full bg-[#0d0724] border border-[#231554] p-3 rounded-xl text-[11px] text-slate-300 font-mono whitespace-pre-wrap max-h-24 overflow-y-auto custom-scrollbar">
                          {musicGeneratedTrack.lyrics}
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex flex-wrap items-center justify-center gap-2 w-full pt-1">
                        <button
                          onClick={() => {
                            const link = document.createElement('a');
                            link.href = musicGeneratedTrack.audioUrl;
                            link.download = `${musicGeneratedTrack.title.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.wav`;
                            link.click();
                          }}
                          className="bg-[#1b1240] hover:bg-[#271a5e] text-white font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 border border-[#3b2680] cursor-pointer transition-all"
                        >
                          <Download className="w-3.5 h-3.5 text-cyan-400" /> Download WAV
                        </button>

                        <button
                          onClick={() => {
                            const formattedAudioMarkdown = `\n\n🎶 **AI Music Track**: ${musicGeneratedTrack.title}\n**Prompt**: ${musicGeneratedTrack.prompt}\n<audio controls src="${musicGeneratedTrack.audioUrl}" class="w-full my-2"></audio>\n`;
                            handleSendMessage(formattedAudioMarkdown);
                            setIsMusicStudioOpen(false);
                          }}
                          className="bg-[#06b6d4] hover:bg-[#0891b2] text-white font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-md cursor-pointer transition-all"
                        >
                          <Send className="w-3.5 h-3.5 text-white" /> Send to Chat
                        </button>
                      </div>

                    </div>
                  ) : (
                    <div className="text-center py-12 px-4 space-y-3">
                      <div className="w-16 h-16 rounded-full bg-[#150e38] border border-[#332078] flex items-center justify-center mx-auto text-cyan-400">
                        <Music className="w-8 h-8" />
                      </div>
                      <h4 className="text-sm font-bold text-white">No Music Track Generated Yet</h4>
                      <p className="text-xs text-slate-400 max-w-xs mx-auto">
                        Type a description on the left, pick a genre & duration, and click "Generate AI Music Track" to create audio using Lyria.
                      </p>
                    </div>
                  )}

                </div>

                {/* Session History Thumbnails */}
                {musicHistory.length > 0 && (
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">Session Track History</span>
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar">
                      {musicHistory.map((item, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setMusicGeneratedTrack({
                              title: item.title,
                              audioUrl: item.audioUrl,
                              genre: item.genre,
                              duration: '30s',
                              provider: 'lyria-3-preview',
                              prompt: item.prompt,
                            });
                          }}
                          className="bg-[#140b38] hover:bg-[#211259] border border-[#321c78] hover:border-cyan-400 p-2 rounded-xl flex items-center gap-2 text-left cursor-pointer shrink-0 transition-all max-w-[180px]"
                        >
                          <Disc className="w-5 h-5 text-cyan-400 shrink-0" />
                          <div className="overflow-hidden">
                            <p className="text-[11px] font-bold text-white truncate">{item.title}</p>
                            <p className="text-[9px] text-slate-400 uppercase">{item.genre}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>

            {/* Footer */}
            <div className="bg-[#0e0926] px-6 py-3 border-t border-[#231754] flex items-center justify-between text-xs text-slate-400">
              <span>Arohi AI: Music Studio (Lyria Engine)</span>
              <button
                onClick={() => setIsMusicStudioOpen(false)}
                className="bg-[#201548] hover:bg-[#2d1e63] text-slate-200 font-bold px-4 py-1.5 rounded-xl transition-all cursor-pointer"
              >
                Close Studio
              </button>
            </div>

          </div>
        </div>
      )}

      {/* AI VEO 3 IMAGE & TEXT-TO-VIDEO STUDIO MODAL */}
      {isVideoStudioOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
          <div className="bg-[#0f0718] border border-[#381a4d] rounded-3xl w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden shadow-2xl relative">
            
            {/* Header */}
            <div className="bg-[#180b26] px-6 py-4 flex items-center justify-between border-b border-[#3b1c54]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#f43f5e] via-[#e11d48] to-[#9333ea] p-0.5 shadow-lg shadow-rose-950/50 flex items-center justify-center">
                  <div className="w-full h-full rounded-[14px] bg-[#0f0718] flex items-center justify-center">
                    <Video className="w-5 h-5 text-rose-400 animate-pulse" />
                  </div>
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                    Generate video from text
                    <span className="text-[10px] bg-rose-500/20 text-rose-300 px-2.5 py-0.5 rounded-full font-black uppercase tracking-wider border border-rose-500/30 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-300" /> Veo 3 Active
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400">Generate short video clips from text, scripts, or descriptions.</p>
                </div>
              </div>
              <button
                onClick={() => setIsVideoStudioOpen(false)}
                className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-white/10 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Studio Body Grid */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: Animation Controls (5 Cols) */}
              <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
                <div className="space-y-4">
                  
                  {/* Mode Selector Tabs */}
                  <div className="grid grid-cols-2 gap-2 p-1 bg-[#160927] border border-[#381a54] rounded-2xl">
                    <button
                      onClick={() => setVideoMode('text_to_video')}
                      className={`py-2 px-3 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        videoMode === 'text_to_video'
                          ? 'bg-gradient-to-r from-rose-600 to-purple-600 text-white shadow-md'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Text to Video</span>
                    </button>
                    <button
                      onClick={() => setVideoMode('image_to_video')}
                      className={`py-2 px-3 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        videoMode === 'image_to_video'
                          ? 'bg-gradient-to-r from-rose-600 to-purple-600 text-white shadow-md'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Camera className="w-3.5 h-3.5" />
                      <span>Animate Photo</span>
                    </button>
                  </div>

                  {/* Upload Image for Animation (Only in image_to_video mode) */}
                  {videoMode === 'image_to_video' && (
                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Camera className="w-3.5 h-3.5 text-rose-400" /> Source Photo / Portrait
                      </label>
                      <div className="flex items-center gap-3">
                        <label className="flex-1 bg-[#1c0d2e] border border-[#3f1f61] hover:border-rose-400 rounded-2xl p-3 text-center cursor-pointer transition-all text-xs text-rose-300 font-bold flex items-center justify-center gap-2">
                          <ImageIcon className="w-4 h-4 text-rose-400" />
                          <span>{uploadedVideoImage ? "Change Uploaded Image" : "Upload Photo to Animate"}</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                  setUploadedVideoImage(reader.result as string);
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                          />
                        </label>
                        {uploadedVideoImage && (
                          <button
                            onClick={() => setUploadedVideoImage(null)}
                            className="text-xs text-slate-400 hover:text-rose-400 p-2 bg-[#210f36] rounded-xl border border-[#3d1d5e]"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                      {uploadedVideoImage && (
                        <div className="mt-2 flex items-center gap-2 bg-[#1a0a2a] p-2 rounded-xl border border-rose-900/40">
                          <img src={uploadedVideoImage} alt="Source preview" className="w-12 h-12 object-cover rounded-lg border border-rose-500/30" />
                          <span className="text-[11px] text-rose-200 font-medium truncate">Ready for Veo 3 animation</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Video Prompt / Script Textarea */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-rose-400" />
                      {videoMode === 'text_to_video' ? "Video Text, Script, or Scene Description" : "Animation Motion Direction"}
                    </label>
                    <textarea
                      rows={3}
                      value={videoPrompt}
                      onChange={(e) => setVideoPrompt(e.target.value)}
                      placeholder={
                        videoMode === 'text_to_video'
                          ? "Enter short video clips from text, scripts, or descriptions... e.g. 'Cinematic 4K video of a golden eagle soaring above misty mountains at sunrise, photorealistic 60fps'"
                          : "Describe the motion... e.g. '360 degree slow-motion rotation around a smartphone with glowing lights'"
                      }
                      className="w-full bg-[#1c0d2e] border border-[#3f1f61] rounded-2xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 resize-none"
                    />
                  </div>

                  {/* Preset Ideas */}
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 block mb-1.5">Sample Video Scripts & Prompts:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        "Cinematic drone sweep over misty ocean cliffs at sunset",
                        "Futuristic AI lab with glowing holographic displays",
                        "Serene time-lapse of cherry blossoms opening in spring",
                        "Cyberpunk sports car speeding down rainy neon streets",
                        "Close-up shot of rich espresso pouring into ceramic cup"
                      ].map((preset, idx) => (
                        <button
                          key={idx}
                          onClick={() => setVideoPrompt(preset)}
                          className="text-[10px] bg-[#220d38] hover:bg-[#331354] text-rose-300 border border-[#4d1f7a] px-2.5 py-1 rounded-full cursor-pointer transition-all truncate max-w-[210px]"
                        >
                          + {preset}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Motion Style Selector */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                      Visual & Camera Style
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: 'cinematic_pan', label: '🎬 Cinematic Pan & Sweep' },
                        { id: 'ad_product', label: '📦 Product / Showcase' },
                        { id: 'cyberpunk_glitch', label: '⚡ Cyber Motion FX' },
                        { id: 'portrait_motion', label: '👤 Character / Portrait' },
                      ].map((st) => (
                        <button
                          key={st.id}
                          onClick={() => setVideoAnimationStyle(st.id as any)}
                          className={`py-2 px-2 text-[10px] font-bold rounded-xl border text-center transition-all cursor-pointer ${
                            videoAnimationStyle === st.id
                              ? 'bg-gradient-to-r from-rose-600 to-purple-600 text-white border-rose-400 shadow-lg shadow-rose-950/60'
                              : 'bg-[#180a2b] text-slate-400 border-[#381a54] hover:text-white hover:bg-[#250f42]'
                          }`}
                        >
                          {st.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Aspect Ratio & Duration */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Aspect Ratio</label>
                      <div className="flex gap-1">
                        {['16:9', '9:16', '1:1', '21:9'].map((ar) => (
                          <button
                            key={ar}
                            onClick={() => setVideoAspectRatio(ar as any)}
                            className={`flex-1 py-1.5 text-[10px] font-extrabold rounded-lg border text-center transition-all cursor-pointer ${
                              videoAspectRatio === ar
                                ? 'bg-rose-600 text-white border-rose-400'
                                : 'bg-[#160829] text-slate-400 border-[#31164a]'
                            }`}
                          >
                            {ar}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Video Duration</label>
                      <div className="flex gap-1">
                        {['5s', '10s', '15s'].map((dur) => (
                          <button
                            key={dur}
                            onClick={() => setVideoDuration(dur as any)}
                            className={`flex-1 py-1.5 text-[10px] font-extrabold rounded-lg border text-center transition-all cursor-pointer ${
                              videoDuration === dur
                                ? 'bg-purple-600 text-white border-purple-400'
                                : 'bg-[#160829] text-slate-400 border-[#31164a]'
                            }`}
                          >
                            {dur}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>

                {/* Generate Video Action Button */}
                <button
                  onClick={() => handleAnimateStudioVideo()}
                  disabled={isVideoGenerating || (!videoPrompt.trim() && !uploadedVideoImage)}
                  className="w-full mt-4 bg-gradient-to-r from-rose-500 via-pink-600 to-purple-600 hover:opacity-95 disabled:opacity-50 text-white font-extrabold text-xs py-3.5 px-6 rounded-2xl flex items-center justify-center gap-2 shadow-xl shadow-rose-950/60 cursor-pointer transition-all active:scale-[0.99]"
                >
                  {isVideoGenerating ? (
                    <>
                      <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
                      <span>Generating Video Clip (Veo 3)...</span>
                    </>
                  ) : (
                    <>
                      <Video className="w-4 h-4 text-amber-200" />
                      <span>Generate Video from Text (Veo 3)</span>
                    </>
                  )}
                </button>
              </div>

              {/* Right Column: Video Preview & Player (7 Cols) */}
              <div className="lg:col-span-7 bg-[#140824]/70 border border-[#35184f] rounded-2xl p-4 sm:p-5 flex flex-col justify-between space-y-4">
                
                {/* Result Video Display Box */}
                <div className="flex-1 min-h-[300px] flex flex-col items-center justify-center bg-[#090312] border border-[#27103d] rounded-2xl p-4 relative overflow-hidden">
                  
                  {isVideoGenerating ? (
                    <div className="flex flex-col items-center gap-4 py-12">
                      <div className="relative">
                        <div className="w-20 h-20 rounded-full border-4 border-rose-500/20 border-t-rose-400 animate-spin"></div>
                        <Video className="w-10 h-10 text-rose-400 absolute inset-0 m-auto animate-pulse" />
                      </div>
                      <div className="text-center space-y-1">
                        <p className="text-xs font-bold text-rose-300 animate-pulse">Veo 3 Engine rendering video frames & physics...</p>
                        <p className="text-[11px] text-slate-500">Style: {videoAnimationStyle.toUpperCase()} | Aspect Ratio: {videoAspectRatio} | Duration: {videoDuration}</p>
                      </div>
                    </div>
                  ) : videoGeneratedTrack ? (
                    <div className="w-full flex flex-col items-center space-y-4 my-auto">
                      
                      {/* Main Video Player */}
                      <video
                        controls
                        autoPlay
                        loop
                        src={videoGeneratedTrack.videoUrl}
                        className="w-full max-h-[360px] rounded-2xl border-2 border-rose-500/30 shadow-2xl object-cover"
                      />

                      {/* Video Title & Meta */}
                      <div className="text-center space-y-1">
                        <h4 className="text-base font-extrabold text-white flex items-center justify-center gap-2">
                          <Video className="w-4 h-4 text-rose-400" />
                          {videoGeneratedTrack.title}
                        </h4>
                        <p className="text-xs text-slate-400 max-w-md line-clamp-1">"{videoGeneratedTrack.prompt}"</p>
                        <div className="flex items-center justify-center gap-2 pt-1">
                          <span className="text-[10px] bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded-full font-bold uppercase">
                            {videoGeneratedTrack.animationStyle}
                          </span>
                          <span className="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full font-bold">
                            Engine: {videoGeneratedTrack.provider}
                          </span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap items-center justify-center gap-2 w-full pt-1">
                        <button
                          onClick={() => {
                            const link = document.createElement('a');
                            link.href = videoGeneratedTrack.videoUrl;
                            link.download = `veo-video-${Date.now()}.mp4`;
                            link.click();
                          }}
                          className="bg-[#240e38] hover:bg-[#361554] text-white font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 border border-[#4a1f73] cursor-pointer transition-all"
                        >
                          <Download className="w-3.5 h-3.5 text-rose-400" /> Download Video MP4
                        </button>

                        <button
                          onClick={() => {
                            const formattedVideoMarkdown = `\n\n🎬 **Veo 3 AI Video**: ${videoGeneratedTrack.title}\n**Prompt**: ${videoGeneratedTrack.prompt}\n<video controls autoplay loop src="${videoGeneratedTrack.videoUrl}" class="w-full rounded-2xl my-2 border border-purple-800 shadow-xl"></video>\n`;
                            handleSendMessage(formattedVideoMarkdown);
                            setIsVideoStudioOpen(false);
                          }}
                          className="bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-md cursor-pointer transition-all"
                        >
                          <Send className="w-3.5 h-3.5 text-white" /> Send to Chat
                        </button>
                      </div>

                    </div>
                  ) : (
                    <div className="text-center py-12 px-4 space-y-3">
                      <div className="w-16 h-16 rounded-full bg-[#1a0a2e] border border-[#3c1d63] flex items-center justify-center mx-auto text-rose-400">
                        <Video className="w-8 h-8" />
                      </div>
                      <h4 className="text-sm font-bold text-white">No Video Generated Yet</h4>
                      <p className="text-xs text-slate-400 max-w-xs mx-auto">
                        Enter a video script, prompt, or description on the left and click "Generate Video from Text".
                      </p>
                    </div>
                  )}

                </div>

                {/* Session History */}
                {videoHistory.length > 0 && (
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">Session Video History</span>
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar">
                      {videoHistory.map((item, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setVideoGeneratedTrack({
                              title: item.title,
                              videoUrl: item.videoUrl,
                              animationStyle: item.animationStyle,
                              aspectRatio: '16:9',
                              duration: '5s',
                              provider: 'veo-3-studio',
                              prompt: item.prompt,
                            });
                          }}
                          className="bg-[#1c0c33] hover:bg-[#2b124d] border border-[#3d1b6e] hover:border-rose-400 p-2 rounded-xl flex items-center gap-2 text-left cursor-pointer shrink-0 transition-all max-w-[190px]"
                        >
                          <Video className="w-5 h-5 text-rose-400 shrink-0" />
                          <div className="overflow-hidden">
                            <p className="text-[11px] font-bold text-white truncate">{item.title}</p>
                            <p className="text-[9px] text-slate-400 uppercase">{item.animationStyle}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>

            {/* Footer */}
            <div className="bg-[#12081d] px-6 py-3 border-t border-[#381a4d] flex items-center justify-between text-xs text-slate-400">
              <span>Arohi AI: Generate video from text (Veo 3 Engine)</span>
              <button
                onClick={() => setIsVideoStudioOpen(false)}
                className="bg-[#27113e] hover:bg-[#39195a] text-slate-200 font-bold px-4 py-1.5 rounded-xl transition-all cursor-pointer"
              >
                Close Studio
              </button>
            </div>

          </div>
        </div>
      )}

      {/* AI DOCUMENT VISION OCR & DEEP RESEARCH STUDIO MODAL (Feature #6) */}
      {isDocResearchStudioOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
          <div className="bg-[#0b101c] border border-[#1e2f4d] rounded-3xl w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden shadow-2xl relative">
            
            {/* Header */}
            <div className="bg-[#101728] px-6 py-4 flex items-center justify-between border-b border-[#223354]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-yellow-400 p-0.5 shadow-lg shadow-amber-950/50 flex items-center justify-center">
                  <div className="w-full h-full rounded-[14px] bg-[#0b101c] flex items-center justify-center">
                    <Globe className="w-5 h-5 text-amber-400 animate-pulse" />
                  </div>
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                    Google Search Data
                    <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2.5 py-0.5 rounded-full font-black uppercase tracking-wider border border-amber-500/30 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-300" /> Active
                    </span>
                  </h3>
                  <p className="text-xs text-slate-300">Connect to real-time Google Search results to cite news, fact-check information, and analyze multimodal documents</p>
                </div>
              </div>
              <button
                onClick={() => setIsDocResearchStudioOpen(false)}
                className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-white/10 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Studio Body Grid */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: Controls & Document Upload (5 Cols) */}
              <div className="lg:col-span-5 space-y-5 flex flex-col justify-between">
                <div className="space-y-4">
                  
                  {/* Google Search Status Box */}
                  <div className="bg-[#121c33] border border-amber-500/30 rounded-2xl p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></div>
                      <div>
                        <p className="text-xs font-black text-amber-300 flex items-center gap-1.5">
                          <span>Google Search Data</span>
                          <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-bold">Active</span>
                        </p>
                        <p className="text-[10px] text-slate-400">Real-time live Google Search results, web grounding & citations enabled</p>
                      </div>
                    </div>
                    <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                  </div>

                  {/* Mode Selector */}
                  <div>
                    <label className="text-xs font-bold text-slate-300 mb-1.5 block">Analysis & Fact-Checking Mode</label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: 'deep_research', name: '🌐 Google Search Grounding', desc: 'Real-time live search & fact check' },
                        { id: 'pdf_vision_ocr', name: '📄 Multimodal Document OCR', desc: 'Scan PDFs & extract data' },
                        { id: 'resume_ats_eval', name: '📝 ATS Resume Audit', desc: 'Score & real-time rewrites' },
                        { id: 'scheme_audit', name: '🏛️ Govt Scheme Eligibility', desc: 'Mudra, MSME & subsidy checks' },
                        { id: 'study_guide', name: '📚 Exam Prep & Study Guide', desc: 'Syllabus breakdown & quizzes' }
                      ].map((m) => (
                        <button
                          key={m.id}
                          onClick={() => setDocResearchMode(m.id as any)}
                          className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                            docResearchMode === m.id
                              ? 'bg-[#1b2845] border-amber-500 text-white shadow-md'
                              : 'bg-[#0f172a]/60 border-slate-800 text-slate-400 hover:border-slate-700'
                          }`}
                        >
                          <p className="text-xs font-bold">{m.name}</p>
                          <p className="text-[10px] text-slate-400">{m.desc}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Document / File Upload Box */}
                  <div>
                    <label className="text-xs font-bold text-slate-300 mb-1.5 block">Upload PDF, Image, or Notice</label>
                    <div className="border-2 border-dashed border-[#243552] hover:border-amber-500/60 rounded-2xl p-4 bg-[#0d1424] text-center transition-all relative">
                      {docResearchFile ? (
                        <div className="flex items-center justify-between bg-[#152038] p-3 rounded-xl border border-amber-500/30">
                          <div className="flex items-center gap-3 text-left overflow-hidden">
                            <FileText className="w-6 h-6 text-amber-400 shrink-0" />
                            <div className="truncate">
                              <p className="text-xs font-bold text-white truncate">{docResearchFile.name}</p>
                              <p className="text-[10px] text-slate-400 uppercase">{docResearchFile.mimeType}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => setDocResearchFile(null)}
                            className="text-slate-400 hover:text-rose-400 p-1 cursor-pointer"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <label className="cursor-pointer flex flex-col items-center justify-center py-2 space-y-1">
                          <Paperclip className="w-7 h-7 text-amber-400/80 mb-1" />
                          <span className="text-xs font-bold text-slate-200">Click to attach PDF, Document, or Image</span>
                          <span className="text-[10px] text-slate-400">Supports PDF, PNG, JPG, DOCX up to 15MB</span>
                          <input
                            type="file"
                            accept=".pdf,image/*,.doc,.docx"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onload = () => {
                                  setDocResearchFile({
                                    name: file.name,
                                    mimeType: file.type || 'application/pdf',
                                    base64: reader.result as string
                                  });
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                          />
                        </label>
                      )}
                    </div>
                  </div>

                  {/* Text / Prompt Input */}
                  <div>
                    <label className="text-xs font-bold text-slate-300 mb-1.5 block">Research Topic or Specific Question</label>
                    <textarea
                      value={docResearchPrompt}
                      onChange={(e) => setDocResearchPrompt(e.target.value)}
                      placeholder="e.g. Audit my eligibility for PMEGP loan, evaluate my resume for Full Stack roles, or summarize SSC MTS syllabus PDF..."
                      rows={3}
                      className="w-full bg-[#0d1424] border border-[#223354] rounded-2xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-all resize-none"
                    />
                  </div>

                  {/* Preset Quick Actions */}
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 block mb-2">Quick Research Presets:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        "Audit Mudra & PMEGP Loans",
                        "Evaluate ATS Resume Score",
                        "Summarize Govt Exam Syllabus",
                        "Market Research for Bakery Shop"
                      ].map((preset, pIdx) => (
                        <button
                          key={pIdx}
                          onClick={() => {
                            setDocResearchPrompt(preset);
                            handleRunDocResearchStudio(preset);
                          }}
                          className="bg-[#131c30] hover:bg-[#1f2d4d] border border-[#273859] text-[10px] font-semibold text-slate-300 hover:text-white px-2.5 py-1 rounded-full transition-all cursor-pointer"
                        >
                          + {preset}
                        </button>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Run Research Button */}
                <button
                  onClick={() => handleRunDocResearchStudio()}
                  disabled={isDocResearchGenerating || (!docResearchPrompt.trim() && !docResearchFile)}
                  className="w-full mt-4 bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 hover:opacity-95 disabled:opacity-50 text-slate-950 font-black text-xs py-3.5 px-6 rounded-2xl flex items-center justify-center gap-2 shadow-xl shadow-amber-950/60 cursor-pointer transition-all active:scale-[0.99]"
                >
                  {isDocResearchGenerating ? (
                    <>
                      <div className="w-4 h-4 rounded-full border-2 border-slate-950/30 border-t-slate-950 animate-spin"></div>
                      <span>Running Deep Search Analysis...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-slate-950" />
                      <span>Execute Deep Research & Document Vision</span>
                    </>
                  )}
                </button>
              </div>

              {/* Right Column: Interactive Report & Artifact Display (7 Cols) */}
              <div className="lg:col-span-7 bg-[#0d1424]/70 border border-[#1f2e4a] rounded-2xl p-4 sm:p-5 flex flex-col justify-between space-y-4">
                
                {/* Display Report Area */}
                <div className="flex-1 min-h-[340px] flex flex-col bg-[#070b14] border border-[#18243b] rounded-2xl p-4 sm:p-5 relative overflow-hidden">
                  
                  {isDocResearchGenerating ? (
                    <div className="flex-1 flex flex-col items-center justify-center gap-4 py-16">
                      <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center animate-bounce">
                        <FileText className="w-6 h-6 text-amber-400" />
                      </div>
                      <p className="text-xs font-extrabold text-amber-300 animate-pulse">
                        Analyzing Document & Grounding Web Data...
                      </p>
                      <p className="text-[10px] text-slate-400 max-w-xs text-center">
                        Arohi AI Multimodal Vision is extracting structured insights and compiling report...
                      </p>
                    </div>
                  ) : docResearchReport ? (
                    <div className="flex-1 flex flex-col space-y-4 overflow-y-auto max-h-[460px] pr-2">
                      
                      {/* Report Meta Header */}
                      <div className="flex items-center justify-between bg-[#11192b] p-3 rounded-xl border border-amber-500/20">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                          <div>
                            <p className="text-xs font-bold text-white truncate">{docResearchReport.documentName}</p>
                            <p className="text-[10px] text-slate-400 uppercase">Engine: {docResearchReport.provider}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              handleSendMessage(`Here is the Deep Research Report for ${docResearchReport.documentName}:\n\n${docResearchReport.reportMarkdown}`);
                              setIsDocResearchStudioOpen(false);
                            }}
                            className="bg-amber-500 hover:bg-amber-400 text-slate-950 text-[10px] font-black px-3 py-1.5 rounded-lg flex items-center gap-1 transition-all cursor-pointer"
                          >
                            <Share2 className="w-3 h-3" />
                            <span>Copy to Chat</span>
                          </button>
                        </div>
                      </div>

                      {/* Rendered Report Markdown */}
                      <div className="text-xs text-slate-200 leading-relaxed font-sans space-y-2 border-t border-slate-800/80 pt-3">
                        {renderMarkdown(docResearchReport.reportMarkdown)}
                      </div>

                    </div>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-3">
                      <div className="w-16 h-16 rounded-2xl bg-[#111a2d] border border-[#223354] flex items-center justify-center">
                        <FileText className="w-8 h-8 text-amber-400/60" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">No Report Generated Yet</h4>
                        <p className="text-xs text-slate-400 max-w-sm mt-1">
                          Upload a document or enter a research topic on the left to generate a comprehensive AI report.
                        </p>
                      </div>
                    </div>
                  )}

                </div>

                {/* Analysis History Row */}
                {docResearchHistory.length > 0 && (
                  <div className="space-y-1.5 border-t border-slate-800/80 pt-3">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Recent Research Reports:</span>
                    <div className="flex gap-2 overflow-x-auto pb-1">
                      {docResearchHistory.map((item, idx) => (
                        <div
                          key={idx}
                          className="bg-[#121b2f] border border-[#203050] p-2 rounded-xl flex items-center gap-2 text-left shrink-0 max-w-[200px]"
                        >
                          <FileText className="w-4 h-4 text-amber-400 shrink-0" />
                          <div className="overflow-hidden">
                            <p className="text-[11px] font-bold text-white truncate">{item.documentName}</p>
                            <p className="text-[9px] text-slate-400 uppercase truncate">{item.mode}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>

            {/* Footer */}
            <div className="bg-[#0b101c] px-6 py-3 border-t border-[#1e2f4d] flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-amber-400" />
                <span>6. Use Google Search data (Currently active / checked) — Live Real-Time Web Fact-Checking Engine</span>
              </span>
              <button
                onClick={() => setIsDocResearchStudioOpen(false)}
                className="bg-[#1b2845] hover:bg-[#283b66] text-slate-200 font-bold px-4 py-1.5 rounded-xl transition-all cursor-pointer"
              >
                Close Studio
              </button>
            </div>

          </div>
        </div>
      )}

      {/* AI GOOGLE MAPS DATA & ROUTES STUDIO MODAL (Feature #7) */}
      {isMapsStudioOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
          <div className="bg-[#090d16] border border-[#1d2b45] rounded-3xl w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden shadow-2xl relative">
            
            {/* Header */}
            <div className="bg-[#0f1728] px-6 py-4 flex items-center justify-between border-b border-[#213252]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-cyan-400 p-0.5 shadow-lg shadow-blue-950/50 flex items-center justify-center">
                  <div className="w-full h-full rounded-[14px] bg-[#090d16] flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-blue-400 animate-pulse" />
                  </div>
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                    Use Google Maps Data
                    <span className="text-[10px] bg-blue-500/20 text-blue-300 px-2.5 py-0.5 rounded-full font-black uppercase tracking-wider border border-blue-500/30 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-blue-300" /> Active
                    </span>
                  </h3>
                  <p className="text-xs text-slate-300">Connect to real-time Google Maps data for places, routes, or directions with traffic-aware duration</p>
                </div>
              </div>
              <button
                onClick={() => setIsMapsStudioOpen(false)}
                className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-white/10 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Studio Body Grid */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: Controls & Location Inputs (5 Cols) */}
              <div className="lg:col-span-5 space-y-5 flex flex-col justify-between">
                <div className="space-y-4">
                  
                  {/* Google Maps Status Box */}
                  <div className="bg-[#10192e] border border-blue-500/30 rounded-2xl p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></div>
                      <div>
                        <p className="text-xs font-black text-blue-300 flex items-center gap-1.5">
                          <span>Use Google Maps Data</span>
                          <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-bold">Active</span>
                        </p>
                        <p className="text-[10px] text-slate-400">Places API, Routes API & Geocoding real-time connection enabled</p>
                      </div>
                    </div>
                    <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                  </div>

                  {/* Mode Selector */}
                  <div>
                    <label className="text-xs font-bold text-slate-300 mb-1.5 block">Maps Operation Mode</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'places_search', name: '📍 Places Search', icon: MapPin },
                        { id: 'route_directions', name: '🚗 Route & Directions', icon: Route },
                        { id: 'nearby_explore', name: '🧭 Nearby Explore', icon: Compass }
                      ].map((m) => {
                        const IconComp = m.icon;
                        return (
                          <button
                            key={m.id}
                            onClick={() => setMapsMode(m.id as any)}
                            className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1 ${
                              mapsMode === m.id
                                ? 'bg-[#182642] border-blue-500 text-white shadow-md'
                                : 'bg-[#0e1626]/60 border-slate-800 text-slate-400 hover:border-slate-700'
                            }`}
                          >
                            <IconComp className="w-4 h-4 text-blue-400" />
                            <p className="text-[11px] font-bold">{m.name}</p>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Route Origin & Destination Inputs (if route mode or places) */}
                  {mapsMode === 'route_directions' ? (
                    <div className="space-y-2 bg-[#0c1322] p-3 rounded-2xl border border-slate-800">
                      <div>
                        <label className="text-[11px] font-bold text-slate-400 mb-1 block">Origin / Starting Point</label>
                        <input
                          type="text"
                          value={mapsOrigin}
                          onChange={(e) => setMapsOrigin(e.target.value)}
                          placeholder="e.g. Connaught Place, New Delhi"
                          className="w-full bg-[#131d33] border border-[#223354] rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-slate-400 mb-1 block">Destination Point</label>
                        <input
                          type="text"
                          value={mapsDestination}
                          onChange={(e) => setMapsDestination(e.target.value)}
                          placeholder="e.g. Cyber City, Gurugram"
                          className="w-full bg-[#131d33] border border-[#223354] rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      {/* Travel Mode Pills */}
                      <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Travel Mode:</label>
                        <div className="flex gap-1.5">
                          {['DRIVING', 'TRANSIT', 'WALKING', 'BICYCLING'].map((tm) => (
                            <button
                              key={tm}
                              onClick={() => setMapsTravelMode(tm as any)}
                              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                                mapsTravelMode === tm
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-[#18243b] text-slate-400 hover:text-slate-200'
                              }`}
                            >
                              {tm}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <label className="text-xs font-bold text-slate-300 mb-1.5 block">Search Place, Landmark, or Query</label>
                      <input
                        type="text"
                        value={mapsPrompt}
                        onChange={(e) => setMapsPrompt(e.target.value)}
                        placeholder="e.g. Best coaching centers in Mukherjee Nagar Delhi, or Top hospitals in South Mumbai..."
                        className="w-full bg-[#0c1322] border border-[#20304f] rounded-2xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-all"
                      />
                    </div>
                  )}

                  {/* Preset Quick Location Actions */}
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 block mb-2">Popular Maps Presets:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        { title: "Route: Delhi to Cyber City", origin: "Connaught Place Delhi", dest: "Cyber City Gurugram", mode: 'route_directions' },
                        { title: "Route: Mumbai Central to BKC", origin: "Mumbai Central Station", dest: "Bandra Kurla Complex Mumbai", mode: 'route_directions' },
                        { title: "Hospitals near CP Delhi", prompt: "Top emergency hospitals near Connaught Place Delhi", mode: 'places_search' },
                        { title: "Tourist Spots in Jaipur", prompt: "Top heritage places and forts to visit in Jaipur", mode: 'nearby_explore' }
                      ].map((preset, pIdx) => (
                        <button
                          key={pIdx}
                          onClick={() => {
                            if (preset.mode === 'route_directions') {
                              setMapsMode('route_directions');
                              setMapsOrigin(preset.origin || '');
                              setMapsDestination(preset.dest || '');
                              handleRunMapsStudio('', preset.origin, preset.dest);
                            } else {
                              setMapsMode(preset.mode as any);
                              setMapsPrompt(preset.prompt || '');
                              handleRunMapsStudio(preset.prompt);
                            }
                          }}
                          className="bg-[#121a2d] hover:bg-[#1f2b48] border border-[#253658] text-[10px] font-semibold text-slate-300 hover:text-white px-2.5 py-1 rounded-full transition-all cursor-pointer"
                        >
                          + {preset.title}
                        </button>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Run Maps Query Button */}
                <button
                  onClick={() => handleRunMapsStudio()}
                  disabled={isMapsGenerating || (!mapsPrompt.trim() && !mapsOrigin.trim() && !mapsDestination.trim())}
                  className="w-full mt-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:opacity-95 disabled:opacity-50 text-white font-black text-xs py-3.5 px-6 rounded-2xl flex items-center justify-center gap-2 shadow-xl shadow-blue-950/60 cursor-pointer transition-all active:scale-[0.99]"
                >
                  {isMapsGenerating ? (
                    <>
                      <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
                      <span>Fetching Real-Time Google Maps Data...</span>
                    </>
                  ) : (
                    <>
                      <Navigation className="w-4 h-4 text-white" />
                      <span>Execute Google Maps & Routes Query</span>
                    </>
                  )}
                </button>
              </div>

              {/* Right Column: Interactive Map Canvas & Details (7 Cols) */}
              <div className="lg:col-span-7 bg-[#0c1322]/80 border border-[#1e2f4e] rounded-2xl p-4 sm:p-5 flex flex-col justify-between space-y-4">
                
                {/* Map Display Box */}
                <div className="h-[240px] sm:h-[280px] w-full bg-[#050811] border border-[#1a2842] rounded-2xl overflow-hidden relative shadow-inner">
                  {(() => {
                    const MAP_KEY = process.env.GOOGLE_MAPS_PLATFORM_KEY || (import.meta as any).env?.VITE_GOOGLE_MAPS_PLATFORM_KEY || '';
                    const center = mapsReport?.centerCoord || { lat: 28.6139, lng: 77.2090, zoom: 12 };

                    if (MAP_KEY && MAP_KEY !== 'YOUR_API_KEY') {
                      return (
                        <APIProvider apiKey={MAP_KEY} version="weekly">
                          <Map
                            defaultCenter={{ lat: center.lat, lng: center.lng }}
                            defaultZoom={center.zoom}
                            mapId="DEMO_MAP_ID"
                            internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
                            style={{ width: '100%', height: '100%' }}
                          >
                            <AdvancedMarker position={{ lat: center.lat, lng: center.lng }}>
                              <Pin background="#2563eb" glyphColor="#ffffff" />
                            </AdvancedMarker>
                            {mapsReport?.places?.map((p, i) => (
                              <AdvancedMarker key={i} position={{ lat: p.lat, lng: p.lng }}>
                                <Pin background="#e11d48" glyphColor="#ffffff" />
                              </AdvancedMarker>
                            ))}
                          </Map>
                        </APIProvider>
                      );
                    }

                    // Interactive Google Maps Canvas Preview
                    return (
                      <div className="w-full h-full bg-[#0a1120] p-4 flex flex-col justify-between relative overflow-hidden bg-[radial-gradient(#1e2c4a_1px,transparent_1px)] [background-size:16px_16px]">
                        
                        {/* Map Overlay Badge */}
                        <div className="flex items-center justify-between z-10">
                          <span className="bg-[#0f1a30]/90 border border-blue-500/40 text-blue-300 text-[10px] font-bold px-3 py-1 rounded-full backdrop-blur-md flex items-center gap-1.5 shadow-md">
                            <MapPin className="w-3 h-3 text-red-500 animate-bounce" />
                            <span>Google Maps Canvas View • Lat: {center.lat.toFixed(4)}, Lng: {center.lng.toFixed(4)}</span>
                          </span>
                          <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase">
                            Live Maps Connected
                          </span>
                        </div>

                        {/* Interactive Pins & Path Visualizer */}
                        <div className="my-auto flex flex-col items-center justify-center space-y-3 z-10 text-center">
                          <div className="flex items-center gap-6">
                            <div className="flex flex-col items-center">
                              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-xs shadow-lg shadow-blue-500/50">
                                A
                              </div>
                              <span className="text-[10px] font-bold text-slate-300 mt-1">{mapsReport?.routeInfo?.origin || mapsOrigin || 'Origin'}</span>
                            </div>

                            <div className="flex-1 flex flex-col items-center">
                              <span className="text-[10px] font-bold text-cyan-300 bg-cyan-950/80 px-2 py-0.5 rounded-full border border-cyan-500/30">
                                {mapsReport?.routeInfo?.distanceKm || '14.2 km'} • {mapsReport?.routeInfo?.durationMin || '28 mins'}
                              </span>
                              <div className="w-24 sm:w-36 h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-rose-500 rounded-full my-1.5 animate-pulse"></div>
                              <span className="text-[9px] text-slate-400 uppercase font-semibold">{mapsTravelMode}</span>
                            </div>

                            <div className="flex flex-col items-center">
                              <div className="w-8 h-8 rounded-full bg-rose-600 text-white flex items-center justify-center font-black text-xs shadow-lg shadow-rose-500/50">
                                B
                              </div>
                              <span className="text-[10px] font-bold text-slate-300 mt-1">{mapsReport?.routeInfo?.destination || mapsDestination || mapsPrompt || 'Destination'}</span>
                            </div>
                          </div>
                        </div>

                        {/* Secret API Key Setup Banner if not set */}
                        <div className="bg-[#0f1728]/95 border border-blue-500/30 p-2.5 rounded-xl z-10 flex items-center justify-between text-[10px] text-slate-300">
                          <span>📍 <strong>Optional Google Maps Key:</strong> Add <code>GOOGLE_MAPS_PLATFORM_KEY</code> in Settings → Secrets for full vector satellite map tiles.</span>
                        </div>

                      </div>
                    );
                  })()}
                </div>

                {/* Display Report / Results Area */}
                <div className="flex-1 min-h-[220px] bg-[#070b14] border border-[#18243b] rounded-2xl p-4 flex flex-col justify-between relative overflow-hidden">
                  
                  {isMapsGenerating ? (
                    <div className="flex-1 flex flex-col items-center justify-center gap-3 py-8">
                      <Compass className="w-10 h-10 text-blue-400 animate-spin" />
                      <p className="text-xs font-bold text-blue-300 animate-pulse">
                        Querying Google Maps Places & Routes Grounding API...
                      </p>
                    </div>
                  ) : mapsReport ? (
                    <div className="flex-1 flex flex-col space-y-3 overflow-y-auto max-h-[280px] pr-2">
                      
                      {/* Report Meta Header */}
                      <div className="flex items-center justify-between bg-[#111a2d] p-3 rounded-xl border border-blue-500/20">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                          <div>
                            <p className="text-xs font-bold text-white">Google Maps Real-Time Report</p>
                            <p className="text-[10px] text-slate-400 uppercase">Engine: {mapsReport.provider}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            handleSendMessage(`Here is the Google Maps Data Report:\n\n${mapsReport.summaryMarkdown}`);
                            setIsMapsStudioOpen(false);
                          }}
                          className="bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-black px-3 py-1.5 rounded-lg flex items-center gap-1 transition-all cursor-pointer"
                        >
                          <Share2 className="w-3 h-3" />
                          <span>Copy to Chat</span>
                        </button>
                      </div>

                      {/* Rendered Markdown Content */}
                      <div className="text-xs text-slate-200 leading-relaxed font-sans space-y-2 border-t border-slate-800/80 pt-2">
                        {renderMarkdown(mapsReport.summaryMarkdown)}
                      </div>

                    </div>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-2">
                      <MapPin className="w-8 h-8 text-blue-400/60" />
                      <div>
                        <h4 className="text-sm font-bold text-white">No Location Search Executed Yet</h4>
                        <p className="text-xs text-slate-400 max-w-sm mt-1">
                          Enter a place or route query on the left to connect with real-time Google Maps data.
                        </p>
                      </div>
                    </div>
                  )}

                </div>

                {/* Search History Row */}
                {mapsHistory.length > 0 && (
                  <div className="space-y-1.5 border-t border-slate-800/80 pt-3">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Recent Maps Lookups:</span>
                    <div className="flex gap-2 overflow-x-auto pb-1">
                      {mapsHistory.map((item, idx) => (
                        <div
                          key={idx}
                          className="bg-[#10182b] border border-[#1e2f4f] p-2 rounded-xl flex items-center gap-2 text-left shrink-0 max-w-[200px]"
                        >
                          <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
                          <div className="overflow-hidden">
                            <p className="text-[11px] font-bold text-white truncate">{item.title}</p>
                            <p className="text-[9px] text-slate-400 uppercase truncate">{item.mode}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>

            {/* Footer */}
            <div className="bg-[#090d16] px-6 py-3 border-t border-[#1d2b45] flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-blue-400" />
                <span>7. Use Google Maps data (Currently active / checked) — Live Real-Time Places & Routes Engine</span>
              </span>
              <button
                onClick={() => setIsMapsStudioOpen(false)}
                className="bg-[#182642] hover:bg-[#253a63] text-slate-200 font-bold px-4 py-1.5 rounded-xl transition-all cursor-pointer"
              >
                Close Studio
              </button>
            </div>

          </div>
        </div>
      )}

      {/* AI GEMINI INTELLIGENCE STUDIO MODAL (Feature #9) */}
      {isIntelligenceStudioOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-[#0a1120] border border-[#1b2b48] rounded-3xl w-full max-w-5xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
            
            {/* Header */}
            <div className="bg-[#10192e] px-6 py-4 flex items-center justify-between border-b border-[#1f3154]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-500 p-0.5 shadow-lg flex items-center justify-center">
                  <div className="w-full h-full rounded-[14px] bg-[#09101f] flex items-center justify-center">
                    <Brain className="w-5 h-5 text-emerald-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                    Add Arohi AI Intelligence
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full font-black uppercase tracking-wider border border-emerald-500/30 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-emerald-300" /> Active
                    </span>
                  </h3>
                  <p className="text-xs text-slate-300">Embed Arohi AI to analyze content, make edits, and complete multi-step tasks</p>
                </div>
              </div>
              <button
                onClick={() => setIsIntelligenceStudioOpen(false)}
                className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-white/10 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-5 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 overflow-y-auto">
              
              {/* Left Column: Input & Task Controls (5 Cols) */}
              <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
                <div className="space-y-4">
                  
                  {/* Active Status Box */}
                  <div className="bg-[#121c33] border border-emerald-500/30 rounded-2xl p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></div>
                      <div>
                        <p className="text-xs font-black text-emerald-300 flex items-center gap-1.5">
                          <span>Add Arohi AI Intelligence</span>
                          <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-bold">Active</span>
                        </p>
                        <p className="text-[10px] text-slate-400">Arohi AI Multi-Step Execution & Content Intelligence Engine Active</p>
                      </div>
                    </div>
                    <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                  </div>

                  {/* Execution Mode Selector */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5 text-emerald-400" /> Intelligence Mode
                    </label>
                    <div className="grid grid-cols-3 gap-1.5 bg-[#0e1628] p-1.5 rounded-2xl border border-[#1d2d4c]">
                      {[
                        { id: 'content_analysis', label: 'Analysis', icon: Search },
                        { id: 'smart_edits', label: 'Edits', icon: Edit3 },
                        { id: 'multistep_workflow', label: 'Multi-Step', icon: Workflow }
                      ].map((m) => {
                        const IconComponent = m.icon;
                        const isSelected = intelligenceMode === m.id;
                        return (
                          <button
                            key={m.id}
                            onClick={() => setIntelligenceMode(m.id as any)}
                            className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                              isSelected 
                                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/50' 
                                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                            }`}
                          >
                            <IconComponent className="w-3.5 h-3.5" />
                            <span>{m.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Input Content / Document Text */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-emerald-400" /> Input Content / Document Text
                    </label>
                    <textarea
                      rows={3}
                      value={intelligenceContent}
                      onChange={(e) => setIntelligenceContent(e.target.value)}
                      placeholder="Paste text, document summary, code, or data to analyze or edit..."
                      className="w-full bg-[#0d1526] border border-[#1c2c4a] rounded-2xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 resize-none"
                    />
                  </div>

                  {/* Task Instruction */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> Task Instruction / Directive
                    </label>
                    <input
                      type="text"
                      value={intelligenceInstruction}
                      onChange={(e) => setIntelligenceInstruction(e.target.value)}
                      placeholder="e.g. Extract 5 actionable key insights and generate a multi-step execution plan"
                      className="w-full bg-[#0d1526] border border-[#1c2c4a] rounded-2xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>

                  {/* Presets */}
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 block mb-1.5">Quick Intelligence Tasks:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        { label: "Analyze Key Insights & Flaws", mode: "content_analysis", inst: "Perform deep analysis, identify core insights, logical flaws, and action items." },
                        { label: "Rewrite & Edit for Executive Tone", mode: "smart_edits", inst: "Rewrite and polish this content for an executive presentation." },
                        { label: "Multi-Step Project Roadmap", mode: "multistep_workflow", inst: "Break down this objective into a step-by-step 4-phase execution plan with deliverables." }
                      ].map((preset, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setIntelligenceMode(preset.mode as any);
                            setIntelligenceInstruction(preset.inst);
                            handleRunIntelligenceStudio(preset.inst);
                          }}
                          className="bg-[#121c33] hover:bg-[#1a2849] border border-[#1f3158] text-[10px] font-semibold text-slate-300 hover:text-white px-2.5 py-1 rounded-full transition-all cursor-pointer"
                        >
                          + {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Run Intelligence Task Button */}
                <button
                  onClick={() => handleRunIntelligenceStudio()}
                  disabled={isIntelligenceGenerating || (!intelligenceInstruction.trim() && !intelligenceContent.trim())}
                  className="w-full mt-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-500 hover:opacity-95 disabled:opacity-50 text-white font-black text-xs py-3.5 px-6 rounded-2xl flex items-center justify-center gap-2 shadow-xl shadow-emerald-950/60 cursor-pointer transition-all active:scale-[0.99]"
                >
                  {isIntelligenceGenerating ? (
                    <>
                      <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
                      <span>Embedding Arohi AI Intelligence & Executing Multi-Step Task...</span>
                    </>
                  ) : (
                    <>
                      <Brain className="w-4 h-4 text-white" />
                      <span>Execute Arohi AI Intelligence Task</span>
                    </>
                  )}
                </button>
              </div>

              {/* Right Column: Execution Pipeline & Deliverables (7 Cols) */}
              <div className="lg:col-span-7 bg-[#0c1424]/90 border border-[#1c2d4e] rounded-2xl p-4 sm:p-5 flex flex-col justify-between space-y-4">
                
                {/* Result Header & Action Tools */}
                <div className="flex items-center justify-between pb-3 border-b border-[#1b2b48]">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">Arohi AI Intelligence Workspace</span>
                  </div>
                  {intelligenceReport && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(intelligenceReport.reportMarkdown);
                        }}
                        className="bg-[#142038] hover:bg-[#1e2f52] text-slate-300 hover:text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg flex items-center gap-1 transition-all cursor-pointer border border-[#23375f]"
                      >
                        <Copy className="w-3 h-3 text-emerald-400" /> Copy
                      </button>
                      <button
                        onClick={() => {
                          handleSendMessage(`Here is the Arohi AI Intelligence Report:\n\n${intelligenceReport.reportMarkdown}`);
                          setIsIntelligenceStudioOpen(false);
                        }}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold px-3 py-1 rounded-lg flex items-center gap-1 transition-all cursor-pointer shadow-md"
                      >
                        <Send className="w-3 h-3" /> Send to Chat
                      </button>
                    </div>
                  )}
                </div>

                {/* Main Output Canvas */}
                <div className="min-h-[280px] sm:min-h-[340px] bg-[#070d18] border border-[#182640] rounded-2xl p-4 overflow-y-auto space-y-4">
                  {intelligenceReport ? (
                    <div className="space-y-4">
                      
                      {/* Multi-Step Execution Pipeline Visualization */}
                      {intelligenceReport.multiStepPipeline && intelligenceReport.multiStepPipeline.length > 0 && (
                        <div className="bg-[#0e172a] border border-emerald-500/20 rounded-2xl p-3 space-y-2">
                          <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest block flex items-center gap-1.5">
                            <Workflow className="w-3 h-3" /> Multi-Step Execution Pipeline
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                            {intelligenceReport.multiStepPipeline.map((step) => (
                              <div key={step.stepNumber} className="bg-[#121d34] border border-[#1d2e50] rounded-xl p-2.5 space-y-1">
                                <div className="flex items-center justify-between">
                                  <span className="text-[10px] font-bold text-slate-300">Step {step.stepNumber}</span>
                                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                                </div>
                                <p className="text-xs font-bold text-white truncate">{step.title}</p>
                                <p className="text-[10px] text-slate-400 line-clamp-2">{step.details}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Arohi AI Markdown Analysis & Edits Report */}
                      <div className="prose prose-invert prose-xs max-w-none text-slate-200 leading-relaxed space-y-2">
                        {intelligenceReport.reportMarkdown.split('\n').map((line, lIdx) => {
                          if (line.startsWith('## ')) {
                            return <h2 key={lIdx} className="text-sm font-black text-emerald-300 mt-3 mb-1 border-b border-emerald-500/20 pb-1">{line.replace('## ', '')}</h2>;
                          }
                          if (line.startsWith('### ')) {
                            return <h3 key={lIdx} className="text-xs font-extrabold text-teal-300 mt-2 mb-1">{line.replace('### ', '')}</h3>;
                          }
                          if (line.startsWith('- ') || line.startsWith('* ')) {
                            return <li key={lIdx} className="ml-4 text-xs text-slate-300 list-disc">{line.replace(/^[-*]\s+/, '')}</li>;
                          }
                          if (line.trim().length === 0) return <div key={lIdx} className="h-1" />;
                          return <p key={lIdx} className="text-xs text-slate-300">{line}</p>;
                        })}
                      </div>

                    </div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-3 my-auto">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                        <Brain className="w-6 h-6 text-emerald-400 animate-pulse" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">Arohi AI Intelligence Engine Ready</h4>
                        <p className="text-xs text-slate-400 max-w-sm mt-1">
                          Provide content or enter a task directive on the left to embed Arohi AI intelligence for deep content analysis, smart edits, or multi-step task completion.
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
                        <CheckCircle className="w-3 h-3 text-emerald-400" />
                        <span>Arohi AI Intelligence Active</span>
                      </div>
                    </div>
                  )}
                </div>

              </div>
            </div>

            {/* Footer */}
            <div className="bg-[#080d1a] px-6 py-3 border-t border-[#182846] flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-2">
                <Brain className="w-3.5 h-3.5 text-emerald-400" />
                <span>Add Arohi AI Intelligence — Embed Arohi AI to analyze content, make edits, and complete multi-step tasks</span>
              </span>
              <button
                onClick={() => setIsIntelligenceStudioOpen(false)}
                className="bg-[#16243f] hover:bg-[#23375f] text-slate-200 font-bold px-4 py-1.5 rounded-xl transition-all cursor-pointer"
              >
                Close Studio
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
