import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { 
  Send, Bot, User, Sparkles, Plus, RefreshCw, Trash2, Mic, Paperclip, CheckCircle, 
  ArrowRight, Lightbulb, MapPin, Briefcase, Landmark, Award, Minus, X, Globe, Phone, 
  History, Download, FileText, FileSpreadsheet, ThumbsUp, ThumbsDown, Copy, MoreHorizontal, 
  Search, Image as ImageIcon, Video, Library, BookOpen, Settings, Volume2, VolumeX, Menu, 
  Camera, Shield, Check, Share2, Edit3, MessageCircle, SlidersHorizontal, ChevronRight, Zap, Mail, ExternalLink,
  Music, Disc, Play, Pause, Radio, Headphones, Navigation, Compass, Route,
  Brain, Cpu, Layers, Workflow, Clock, Folder, FolderPlus, FolderOpen, Grid, Box, Maximize2, Eye, ChevronDown
} from 'lucide-react';
import ArohiProjectsModal, { ArohiProject } from './ArohiProjectsModal';
import MoveChatToProjectModal from './MoveChatToProjectModal';
import Arohi3DLearningWorkspace from './learning3d/Arohi3DLearningWorkspace';
import McpGatewayModal from './McpGatewayModal';
import McpApprovalCard from './McpApprovalCard';
import McpWorkflowOrchestratorModal from './McpWorkflowOrchestratorModal';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import ArohiAvatar from './ArohiAvatar';
import { Language, getTranslation, getWelcomeContent, getSuggestedPrompts } from '../translations';
import ArohiVoiceCall from './ArohiVoiceCall';
import { generateCallSummaryPDF, generateResumePDF, analyzeTurns } from '../lib/pdfGenerator';
import { exportToPDF, exportToWord, exportToExcel } from '../lib/documentExporter';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { ArohiChatLink, parsePlainSegmentsWithLinks } from './ArohiChatLink';
import InChatMessageQuiz from './mocktests/InChatMessageQuiz';
import { getChatDisplayDate, getCallDisplayDate, formatRelativeChatDate, extractChatTimestamp } from '../utils/dateUtils';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  createdAt?: number | string;
  isStreaming?: boolean;
}

interface ChatHistory {
  id: string;
  title: string;
  date: string;
}

export interface SavedChat {
  id: string;
  title: string;
  date?: string;
  createdAt?: number | string;
  updatedAt?: number | string;
  messages: Message[];
  projectId?: string;
}

interface ArohiChatProps {
  initialPrompt?: string;
  onNavigateTab?: (tab: string) => void;
  onMinimize?: () => void;
  onClose?: () => void;
  language?: Language;
  isDarkMode?: boolean;
}

function getGmailWebUrl(mailtoUrl: string): string {
  try {
    const clean = mailtoUrl.replace(/^mailto:/i, '');
    const [emailPart, queryPart] = clean.split('?');
    const params = new URLSearchParams(queryPart || '');
    const subject = params.get('subject') || '';
    const body = params.get('body') || '';
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(emailPart)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  } catch (e) {
    return `https://mail.google.com/mail/u/0/#inbox?compose=new`;
  }
}

function preprocessMarkdownLinks(text: string): string {
  if (!text) return '';
  // 0. Decode raw HTML entities (&nbsp;, &amp;, &quot;, &#39;, &apos;) into standard characters
  let cleaned = text
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&apos;/gi, "'")
    .replace(/&#39;/gi, "'")
    .replace(/&ndash;/gi, '–')
    .replace(/&mdash;/gi, '—');

  // 1. Join any markdown link that spans multiple lines due to newlines inside mailto: or url
  cleaned = cleaned.replace(/((?:\*\*)?\[[^\]]+\]\()([\s\S]*?)(\)(?:\*\*)?)/g, (fullMatch, prefix, urlContent, suffix) => {
    const cleanedUrl = urlContent.replace(/\r?\n/g, '%0A');
    return prefix + cleanedUrl + suffix;
  });
  
  // 2. Unwrap bold around markdown links if formatted as **[Label](url)** or **[Label](mailto:...)**
  cleaned = cleaned.replace(/\*\*(\[[^\]]+\]\([^)]+\))\*\*/g, '$1');

  // 3. Convert raw mailto links like (mailto:foo@bar.com?...) or plain mailto:foo@bar.com into [Click Here to Open & Send in Gmail](mailto:...) if not already in markdown format
  cleaned = cleaned.replace(/(^|[^\]\(])(mailto:[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\S*)/g, (match, prefix, mailUrl) => {
    const cleanMailUrl = mailUrl.replace(/[\)\.\,\;]+$/, '');
    return `${prefix}[Click Here to Open & Send in Gmail](${cleanMailUrl})`;
  });

  return cleaned;
}

// Global helper functions for Image Sharing & Download
export async function downloadArohiImage(url: string, filename = `arohi-image-${Date.now()}.jpg`) {
  try {
    if (url.startsWith('data:')) {
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      return;
    }
    const res = await fetch(url);
    const blob = await res.blob();
    const blobUrl = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(blobUrl);
  } catch {
    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}

export async function shareArohiImage(url: string, title = 'Arohi AI Generated Image') {
  try {
    if (navigator.share) {
      if (url.startsWith('http')) {
        await navigator.share({
          title,
          text: `Created with Arohi AI: ${title}`,
          url: url
        });
        return;
      } else if (url.startsWith('data:')) {
        try {
          const res = await fetch(url);
          const blob = await res.blob();
          const file = new File([blob], `${title.replace(/\s+/g, '_')}.jpg`, { type: 'image/jpeg' });
          if (navigator.canShare && navigator.canShare({ files: [file] })) {
            await navigator.share({
              files: [file],
              title,
              text: `Created with Arohi AI: ${title}`
            });
            return;
          }
        } catch {
          // fallback
        }
      }
    }
    if (url.startsWith('http')) {
      await navigator.clipboard.writeText(url);
      alert('Image link copied to clipboard!');
    } else {
      downloadArohiImage(url, `${title.replace(/\s+/g, '_')}.jpg`);
    }
  } catch (err: any) {
    if (err.name !== 'AbortError') {
      console.warn('Share error:', err);
    }
  }
}

function renderMarkdown(content: string, isDarkMode = true, onNavigateTab?: (tab: string) => void) {
  const preprocessed = preprocessMarkdownLinks(content);

  // Helper to parse inline styles: [text](url), **bold**, *italic*, `code` and raw URLs
  const parseInline = (text: string): React.ReactNode[] => {
    const regex = /(\[[^\]]+\]\([^)]+\)\s*|\*\*.*?\*\*|\*.*?\*|`.*?`)/g;
    const pieces = text.split(regex);
    
    return pieces.flatMap((piece, idx): React.ReactNode[] => {
      if (piece.startsWith('[') && piece.includes('](') && piece.endsWith(')')) {
        const linkMatch = piece.match(/^\[(.*?)\]\((.*?)\)$/);
        if (linkMatch) {
          const label = linkMatch[1].replace(/\*\*/g, '').trim();
          let href = linkMatch[2].trim();
          const isMail = href.startsWith('mailto:');
          const isHash = href.startsWith('#');
          const isButtonLink = isHash || isMail || label.toLowerCase().includes('confirm') || label.toLowerCase().includes('pay') || label.toLowerCase().includes('authorize') || label.toLowerCase().includes('send') || label.toLowerCase().includes('gmail') || label.toLowerCase().includes('open');
          
          if (isHash) {
            const tabName = href.replace('#', '').trim();
            return [
              <span key={idx} className="inline-flex flex-wrap items-center gap-2 my-1 align-middle">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onNavigateTab) onNavigateTab(tabName);
                    else window.dispatchEvent(new CustomEvent('arohi_navigate_tab', { detail: tabName }));
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl font-black text-xs uppercase tracking-wider bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-500 hover:to-indigo-500 text-white shadow-md hover:shadow-purple-500/20 border border-purple-400/40 transition-all active:scale-95 cursor-pointer"
                >
                  <Zap className="w-3.5 h-3.5 text-yellow-300 shrink-0" />
                  <span>{label}</span>
                </button>
              </span>
            ];
          }

          if (isButtonLink) {
            const gmailWebUrl = isMail ? getGmailWebUrl(href) : null;
            return [
              <span key={idx} className="inline-flex flex-wrap items-center gap-2 my-2 align-middle">
                <a
                  href={href}
                  target={isMail ? '_self' : '_blank'}
                  rel="noreferrer"
                  onClick={(e) => {
                    if (isMail) {
                      try {
                        window.location.href = href;
                      } catch (err) {
                        if (gmailWebUrl) window.open(gmailWebUrl, '_blank');
                      }
                    }
                  }}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider shadow-lg transition-all active:scale-95 no-underline cursor-pointer border ${
                    isMail
                      ? 'bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 hover:from-rose-400 hover:to-amber-400 text-white border-rose-300/40 shadow-rose-900/40'
                      : 'bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 hover:from-emerald-300 hover:to-teal-300 text-slate-950 border-emerald-300/40'
                  }`}
                >
                  {isMail ? <Mail className="w-4 h-4 shrink-0" /> : <Zap className="w-4 h-4 fill-slate-950 shrink-0" />}
                  <span>{label}</span>
                </a>

                {isMail && gmailWebUrl && (
                  <a
                    href={gmailWebUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-extrabold text-[11px] ${
                      isDarkMode 
                        ? 'bg-[#22134d] hover:bg-[#311c6b] text-amber-300 border-amber-500/40 shadow-md' 
                        : 'bg-amber-100 hover:bg-amber-200 text-amber-950 border-amber-300 shadow-xs'
                    } border transition-all active:scale-95 no-underline cursor-pointer`}
                    title="Open directly in Gmail Web Compose"
                  >
                    <ExternalLink className={`w-3.5 h-3.5 ${isDarkMode ? 'text-amber-400' : 'text-amber-700'} shrink-0`} />
                    <span>Open in Gmail Web</span>
                  </a>
                )}
              </span>
            ];
          }
          return [<ArohiChatLink key={idx} href={href} label={label} isDarkMode={isDarkMode} />];
        }
      } else if (piece.startsWith('**') && piece.endsWith('**')) {
        const inner = piece.slice(2, -2);
        if (inner.includes('[') && inner.includes('](') && inner.includes(')')) {
          return [<strong key={idx} className={`font-extrabold ${isDarkMode ? 'text-[#c084fc]' : 'text-purple-950'}`}>{parseInline(inner)}</strong>];
        }
        return [<strong key={idx} className={`font-extrabold ${isDarkMode ? 'text-[#c084fc]' : 'text-purple-950'}`}>{parsePlainSegmentsWithLinks(inner, `bold-${idx}`, isDarkMode)}</strong>];
      } else if (piece.startsWith('*') && piece.endsWith('*')) {
        const inner = piece.slice(1, -1);
        return [<em key={idx} className={`italic ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>{parsePlainSegmentsWithLinks(inner, `italic-${idx}`, isDarkMode)}</em>];
      } else if (piece.startsWith('`') && piece.endsWith('`')) {
        return [<code key={idx} className={`${isDarkMode ? 'bg-slate-950/80 text-emerald-300 border-slate-800' : 'bg-purple-100/80 text-purple-950 border-purple-200'} px-1.5 py-0.5 rounded text-xs font-mono border`}>{piece.slice(1, -1)}</code>];
      }
      return parsePlainSegmentsWithLinks(piece, `plain-${idx}`, isDarkMode);
    });
  };

  const lines = preprocessed.split('\n');
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
          <ul key={`ul-${key}`} className={`list-disc pl-5 my-2 space-y-1 ${isDarkMode ? 'text-slate-100' : 'text-slate-800'}`}>
            {currentList.map((item) => (
              <li key={item.key} className={`text-xs md:text-sm font-medium leading-relaxed ${isDarkMode ? 'text-slate-100' : 'text-slate-800'}`}>
                {parseInline(item.content)}
                {item.subItems.length > 0 && (
                  <ul className={`list-circle pl-5 my-1 space-y-1 ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>
                    {item.subItems.map((sub, sIdx) => (
                      <li key={sIdx} className={isDarkMode ? 'text-slate-200' : 'text-slate-700'}>{parseInline(sub)}</li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        );
      } else if (listType === 'ol') {
        elements.push(
          <ol key={`ol-${key}`} className={`list-decimal pl-5 my-2 space-y-2 ${isDarkMode ? 'text-slate-100' : 'text-slate-800'}`}>
            {currentList.map((item) => (
              <li key={item.key} value={item.value} className={`text-xs md:text-sm font-medium leading-relaxed ${isDarkMode ? 'text-slate-100' : 'text-slate-800'}`}>
                {parseInline(item.content)}
                {item.subItems.length > 0 && (
                  <ul className={`list-disc pl-5 my-1 space-y-1 ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>
                    {item.subItems.map((sub, sIdx) => (
                      <li key={sIdx} className={isDarkMode ? 'text-slate-200' : 'text-slate-700'}>{parseInline(sub)}</li>
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
    
    // Check for Headers & Media
    if (trimmed.startsWith('![')) {
      pushList(index);
      const match = trimmed.match(/^!\[(.*?)\]\((.*?)\)$/);
      if (match) {
        const alt = match[1] || 'Generated AI Artwork';
        const src = match[2];
        elements.push(
          <div key={index} className={`my-3 rounded-2xl overflow-hidden border ${isDarkMode ? 'border-violet-500/30 bg-[#0d0922]' : 'border-slate-200 bg-slate-50/80'} shadow-xl p-2 group relative max-w-2xl mx-auto`}>
            <div className="relative overflow-hidden rounded-xl bg-black/20">
              <img 
                src={src} 
                alt={alt} 
                className="w-full h-auto max-h-[460px] object-cover rounded-xl shadow-md transition-all duration-300 group-hover:scale-[1.008]" 
                referrerPolicy="no-referrer" 
              />
              {/* Floating Action Overlay on Image: Instant Download & Share */}
              <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity bg-black/75 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 shadow-lg">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    downloadArohiImage(src, `${alt.replace(/\s+/g, '_')}.jpg`);
                  }}
                  className="text-white hover:text-cyan-300 flex items-center gap-1 text-[11px] font-semibold px-1.5 py-0.5 rounded-md transition-colors cursor-pointer"
                  title="Download Image"
                >
                  <Download className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Download</span>
                </button>
                <div className="w-[1px] h-3 bg-white/25" />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    shareArohiImage(src, alt);
                  }}
                  className="text-white hover:text-purple-300 flex items-center gap-1 text-[11px] font-semibold px-1.5 py-0.5 rounded-md transition-colors cursor-pointer"
                  title="Share Image"
                >
                  <Share2 className="w-3.5 h-3.5 text-purple-300" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>
        );
      } else {
        elements.push(
          <p key={index} className={`text-xs md:text-sm font-medium leading-relaxed ${isDarkMode ? 'text-slate-100' : 'text-slate-800'} mb-1.5`}>
            {parseInline(line)}
          </p>
        );
      }
    } else if (trimmed.startsWith('### ')) {
      pushList(index);
      elements.push(
        <h4 key={index} className={`text-xs md:text-sm font-extrabold ${isDarkMode ? 'text-white' : 'text-slate-900'} mt-4 mb-2 tracking-tight`}>
          {parseInline(trimmed.slice(4))}
        </h4>
      );
    } else if (trimmed.startsWith('## ')) {
      pushList(index);
      elements.push(
        <h3 key={index} className={`text-sm md:text-base font-extrabold ${isDarkMode ? 'text-white border-[#2d2163]' : 'text-slate-900 border-slate-200'} mt-5 mb-2 tracking-tight border-b pb-1`}>
          {parseInline(trimmed.slice(3))}
        </h3>
      );
    } else if (trimmed.startsWith('# ')) {
      pushList(index);
      elements.push(
        <h2 key={index} className={`text-base md:text-lg font-extrabold ${isDarkMode ? 'text-white' : 'text-slate-950'} mt-6 mb-3 tracking-tight`}>
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
      elements.push(<hr key={index} className={`my-3 ${isDarkMode ? 'border-[#2d2163]' : 'border-slate-300'}`} />);
    } else if (trimmed === '') {
      // Empty line maintains active list context
    }
    // Default Paragraph line
    else {
      pushList(index);
      elements.push(
        <p key={index} className={`text-xs md:text-sm font-medium leading-relaxed ${isDarkMode ? 'text-slate-100' : 'text-slate-800'} mb-1.5`}>
          {parseInline(line)}
        </p>
      );
    }
  });

  pushList(lines.length);

  return <div className={`space-y-1 ${isDarkMode ? 'text-slate-100' : 'text-slate-800'}`}>{elements}</div>;
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

function parseMessageMcpPayload(content: string) {
  const startIndex = content.indexOf('[AROHI_MCP_PAYLOAD_START]');
  const endIndex = content.indexOf('[AROHI_MCP_PAYLOAD_END]');
  
  if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
    const rawJson = content.substring(startIndex + '[AROHI_MCP_PAYLOAD_START]'.length, endIndex);
    const textWithoutJson = content.substring(0, startIndex) + content.substring(endIndex + '[AROHI_MCP_PAYLOAD_END]'.length);
    try {
      const parsedData = JSON.parse(rawJson);
      return {
        cleanedContent: textWithoutJson.trim(),
        mcpData: parsedData
      };
    } catch (e) {
      console.error("Failed to parse MCP payload JSON in message", e);
    }
  }
  return {
    cleanedContent: content,
    mcpData: null
  };
}

// Helper to dynamically extract genuine conversation topic titles from actual user queries
export function getConversationTopicTitle(chat?: SavedChat | { messages?: Message[]; title?: string }): string {
  if (!chat || !chat.messages || !Array.isArray(chat.messages) || chat.messages.length === 0) {
    return 'New Conversation';
  }

  // 1. Prioritize extracting the first genuine question/query asked by the user
  const firstUserMsg = chat.messages.find(
    m => m && m.role === 'user' && m.content && typeof m.content === 'string' && m.content.trim().length > 0
  );

  if (firstUserMsg) {
    let clean = firstUserMsg.content
      .replace(/\[File Uploaded:.*?\]/g, '')
      .replace(/\[RESUME_DOCX_DATA_START\][\s\S]*?\[RESUME_DOCX_DATA_END\]/g, '')
      .replace(/\[CALL_SUMMARY_DATA_START\][\s\S]*?\[CALL_SUMMARY_DATA_END\]/g, '')
      .replace(/\[AROHI_MCP_PAYLOAD_START\][\s\S]*?\[AROHI_MCP_PAYLOAD_END\]/g, '')
      .trim();

    if (clean) {
      // Remove leading markdown headers or bullets
      clean = clean.replace(/^[#*\-—\s>]+/, '').trim();
      const firstLine = clean.split('\n')[0].trim();
      if (firstLine.length > 0) {
        return firstLine.length > 38 ? firstLine.substring(0, 36) + '...' : firstLine;
      }
    }
  }

  // 2. Check for specialized assistant outputs (voice consultation, generated media)
  const firstAssistantMsg = chat.messages.find(
    m => m && m.id !== 'welcome' && m.role === 'assistant' && m.content && typeof m.content === 'string'
  );
  if (firstAssistantMsg && firstAssistantMsg.content) {
    if (firstAssistantMsg.content.includes('Voice Consultation')) return 'Voice Consultation';
    if (firstAssistantMsg.content.includes('Image Created') || firstAssistantMsg.content.includes('![')) return 'AI Image Studio';
    if (firstAssistantMsg.content.includes('Music Soundtrack')) return 'AI Music Composition';
    if (firstAssistantMsg.content.includes('Video Created')) return 'AI Video Studio';
  }

  // 3. Fallback to existing saved title if it's already a specific topic
  const existing = (chat.title || '').trim();
  if (
    existing &&
    !existing.toLowerCase().includes("let's get started") &&
    !existing.toLowerCase().includes("lets get started") &&
    !existing.toLowerCase().startsWith("hi ") &&
    existing !== 'New Conversation' &&
    existing !== 'New Discussion' &&
    existing !== 'New Chat' &&
    existing !== 'Arohi AI Consultation'
  ) {
    return existing;
  }

  return 'New Conversation';
}

export default function ArohiChat({ initialPrompt, onNavigateTab, onMinimize, onClose, language = 'en', isDarkMode = true }: ArohiChatProps) {
  const { user, userData, userMemory, refreshPersonalizationMemory } = useAuth();
  const [isMinimized, setIsMinimized] = useState(false);
  const [isVoiceCallOpen, setIsVoiceCallOpen] = useState(false);
  const [is3DLearningOpen, setIs3DLearningOpen] = useState(false);
  const [active3DTopic, setActive3DTopic] = useState('human_heart');
  const [isMemoryModalOpen, setIsMemoryModalOpen] = useState(false);
  const [isMcpGatewayOpen, setIsMcpGatewayOpen] = useState(false);
  const [isWorkflowOrchestratorOpen, setIsWorkflowOrchestratorOpen] = useState(false);
  const [isRefreshingMemory, setIsRefreshingMemory] = useState(false);
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
          provider: data.provider || 'gemini-2.5-flash',
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
          provider: data.provider || 'gemini-2.5-flash-google-maps'
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
          provider: data.provider || 'gemini-2.5-flash'
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

  // ChatGPT-style Arohi Projects States & Handlers
  const [isProjectsModalOpen, setIsProjectsModalOpen] = useState(false);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [moveChatModalTarget, setMoveChatModalTarget] = useState<{
    chatId: string;
    title: string;
    currentProjectId?: string | null;
  } | null>(null);

  // Inline editing project title in sidebar
  const [editingSidebarProjectId, setEditingSidebarProjectId] = useState<string | null>(null);
  const [editingSidebarProjectName, setEditingSidebarProjectName] = useState<string>('');
  const [isSidebarProjectsListExpanded, setIsSidebarProjectsListExpanded] = useState<boolean>(true);

  const startInlineEditProject = (projectId: string, currentName: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setEditingSidebarProjectId(projectId);
    setEditingSidebarProjectName(currentName);
  };

  const saveInlineEditProject = (projectId: string) => {
    const trimmed = editingSidebarProjectName.trim();
    if (trimmed && trimmed.length > 0) {
      handleUpdateProject(projectId, { name: trimmed });
    }
    setEditingSidebarProjectId(null);
    setEditingSidebarProjectName('');
  };

  const cancelInlineEditProject = () => {
    setEditingSidebarProjectId(null);
    setEditingSidebarProjectName('');
  };

  const getInitialProjects = (userId?: string): ArohiProject[] => {
    try {
      const key = userId ? `arohi_projects_${userId}` : 'guest_arohi_projects';
      const stored = localStorage.getItem(key);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          // Filter out any legacy demo projects so the user's workspace starts pure and empty
          const customUserProjects = parsed.filter(p => !['proj-career', 'proj-msme', 'proj-study'].includes(p.id));
          return customUserProjects;
        }
      }
    } catch (e) {
      console.warn('Error reading projects:', e);
    }
    return [];
  };

  const [projects, setProjects] = useState<ArohiProject[]>(() => getInitialProjects(user?.uid));

  const saveProjects = (newProjects: ArohiProject[]) => {
    setProjects(newProjects);
    try {
      const key = user?.uid ? `arohi_projects_${user.uid}` : 'guest_arohi_projects';
      localStorage.setItem(key, JSON.stringify(newProjects));
    } catch (e) {
      console.warn('Failed to save projects to storage:', e);
    }
  };

  const handleCreateProject = (p: Omit<ArohiProject, 'id' | 'createdAt' | 'updatedAt'>): string => {
    const newId = `proj-${Date.now()}`;
    const newProj: ArohiProject = {
      ...p,
      id: newId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    const updated = [newProj, ...projects];
    saveProjects(updated);
    return newId;
  };

  const handleUpdateProject = (id: string, updates: Partial<ArohiProject>) => {
    const updated = projects.map(p => p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p);
    saveProjects(updated);
  };

  const handleDeleteProject = (id: string) => {
    const updated = projects.filter(p => p.id !== id);
    saveProjects(updated);
    setSavedChats(prev => {
      const updatedChats = prev.map(c => c.projectId === id ? { ...c, projectId: undefined } : c);
      if (user) updateArohiChats(updatedChats).catch(() => {});
      try {
        const key = user?.uid ? `arohi_saved_chats_${user.uid}` : 'guest_arohi_chats';
        localStorage.setItem(key, JSON.stringify(updatedChats));
      } catch (e) {}
      return updatedChats;
    });
    if (activeProjectId === id) {
      setActiveProjectId(null);
    }
  };

  const handleMoveChatToProject = (chatId: string, targetProjectId: string | null) => {
    setSavedChats(prev => {
      const updatedChats = prev.map(c => {
        if (c.id === chatId) {
          return {
            ...c,
            projectId: targetProjectId || undefined
          };
        }
        return c;
      });
      if (user) updateArohiChats(updatedChats).catch(() => {});
      try {
        const key = user?.uid ? `arohi_saved_chats_${user.uid}` : 'guest_arohi_chats';
        localStorage.setItem(key, JSON.stringify(updatedChats));
      } catch (e) {}
      return updatedChats;
    });
  };

  const handleStartChatInProject = (projectId: string) => {
    setActiveProjectId(projectId);
    startNewChat(projectId);
  };

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
      }).catch(() => {});
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

    const cleanTurns = (summaryData.turns || []).filter(
      (t: any) => t && t.text && typeof t.text === 'string' && t.text.trim().length > 0
    );
    const userSpokenTurns = cleanTurns.filter(
      (t: any) => t.speaker === 'user' || t.speaker?.toLowerCase() === 'candidate'
    );

    let callAnalysis = summaryData.analysis;
    let computedSummaryText = summaryData.summaryText;

    // If we have actual spoken turns, analyze the conversation on the server to obtain genuine discussion points
    if (cleanTurns.length > 0 && userSpokenTurns.length > 0) {
      try {
        const res = await fetch('/api/analyze-call', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            turns: cleanTurns,
            callDuration: summaryData.duration,
            uid: user?.uid
          })
        });
        if (res.ok) {
          const data = await res.json();
          if (data.analysis) {
            callAnalysis = data.analysis;
            computedSummaryText = data.analysis.summary || computedSummaryText;
          }
        }
      } catch (err) {
        console.error('Error analyzing call transcript turns:', err);
      }
    }

    let summaryCardContent = '';
    if (callAnalysis?.summary && userSpokenTurns.length > 0) {
      summaryCardContent = `📞 **Voice Consultation Completed** (${durationFormatted})\n\n` +
        `📌 **Key Discussion Points on Call**:\n${callAnalysis.summary}\n\n`;

      if (callAnalysis.priorities && Array.isArray(callAnalysis.priorities) && callAnalysis.priorities.length > 0) {
        summaryCardContent += `🎯 **Takeaways & Recommended Next Steps**:\n`;
        callAnalysis.priorities.forEach((p: string) => {
          summaryCardContent += `• ${p}\n`;
        });
        summaryCardContent += `\n`;
      }
      summaryCardContent += `*Feel free to continue this discussion, ask follow-up questions, or request additional guidance right here in chat!*`;
    } else {
      summaryCardContent = `📞 **Voice Consultation Ended** (${durationFormatted})\n\nThank you for speaking with AROHI. How else can I assist you today?`;
    }

    const newMsg: Message = {
      id: `call-end-${Date.now()}`,
      role: 'assistant',
      content: summaryCardContent,
      timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
    };
    
    const updatedMessages = [...messages, newMsg];
    setMessages(updatedMessages);

    // Save and sync the updated chat
    let targetChatId = activeChatId;
    let currentSavedChats = [...savedChats];
    const now = Date.now();
    if (!targetChatId || currentSavedChats.length === 0) {
      targetChatId = 'chat-' + now;
      const newChatContainer = {
        id: targetChatId,
        title: userSpokenTurns.length > 0 ? 'Voice Discussion' : 'Voice Session',
        createdAt: now,
        updatedAt: now,
        date: 'Today',
        messages: [
          {
            id: 'welcome',
            role: 'assistant' as const,
            content: getWelcomeContent(language),
            timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
            createdAt: now
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
            updatedAt: now,
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

    // Sync call item with authentic summary
    const newCallItem = {
      id: `call-${Date.now()}`,
      duration: summaryData.duration,
      turns: cleanTurns,
      date: summaryData.date,
      summaryText: computedSummaryText || (userSpokenTurns.length > 0 ? 'Voice Consultation with Arohi AI' : `Voice call completed (${durationFormatted})`),
      isCareerRelated: callAnalysis ? !callAnalysis.topics?.business : true,
      analysis: callAnalysis || undefined
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

  // Helper to safely merge lifetime chat histories without losing past conversations
  const mergeSavedChats = (listA: SavedChat[] = [], listB: SavedChat[] = []): SavedChat[] => {
    const chatDict: Record<string, SavedChat> = {};
    for (const c of (listA || [])) {
      if (c && c.id) chatDict[c.id] = c;
    }
    for (const c of (listB || [])) {
      if (c && c.id) {
        const prev = chatDict[c.id];
        if (!prev) {
          chatDict[c.id] = c;
        } else {
          const inMsgs = Array.isArray(c.messages) ? c.messages.length : 0;
          const prevMsgs = Array.isArray(prev.messages) ? prev.messages.length : 0;
          if (inMsgs >= prevMsgs) {
            chatDict[c.id] = { ...prev, ...c };
          }
        }
      }
    }
    return Object.values(chatDict);
  };

  // Helper to load cached chats synchronously from localStorage
  const getInitialChats = (userId?: string): SavedChat[] => {
    try {
      const primaryKey = userId ? `arohi_saved_chats_${userId}` : 'guest_arohi_chats';
      const stored = localStorage.getItem(primaryKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((c: SavedChat) => ({
            ...c,
            title: getConversationTopicTitle(c)
          }));
        }
      }
      // Also check fallback guest keys if userId is provided
      if (userId) {
        const guestStored = localStorage.getItem('guest_arohi_chats');
        if (guestStored) {
          const parsed = JSON.parse(guestStored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed.map((c: SavedChat) => ({
              ...c,
              title: getConversationTopicTitle(c)
            }));
          }
        }
      }
    } catch (e) {
      console.warn('Error reading saved chats from cache:', e);
    }
    return [];
  };

  const { updateArohiChats, updateArohiCalls } = useAuth();
  const [activeTab, setActiveTab] = useState<'chats' | 'calls'>('chats');
  const [savedChats, setSavedChats] = useState<SavedChat[]>(() => {
    const cached = getInitialChats(user?.uid);
    if (cached.length > 0) return cached;
    if (userData?.arohiChats && Array.isArray(userData.arohiChats) && userData.arohiChats.length > 0) {
      return userData.arohiChats.map(c => ({
        ...c,
        title: getConversationTopicTitle(c)
      }));
    }
    return [];
  });
  const [savedCalls, setSavedCalls] = useState<any[]>([]);
  const [activeChatId, setActiveChatId] = useState<string>(() => {
    const cached = getInitialChats(user?.uid);
    if (cached.length > 0) return cached[0].id;
    if (userData?.arohiChats && Array.isArray(userData.arohiChats) && userData.arohiChats.length > 0) {
      return userData.arohiChats[0].id;
    }
    return '';
  });
  const [selectedCallDetail, setSelectedCallDetail] = useState<any | null>(null);
  const [isFetchingHistory, setIsFetchingHistory] = useState(false);
  const [hasFetchedLatest, setHasFetchedLatest] = useState(false);
  const hydratedUserRef = useRef<string | null>(null);
  const prevSyncedMessagesJsonRef = useRef<string>('');

  const currentUserName = user 
    ? (userData?.profile?.name || (userData as any)?.displayName || user.displayName || user.email?.split('@')[0] || 'User') 
    : 'User';
  const currentChatObj = savedChats.find(c => c.id === activeChatId) || savedChats[0];
  const activeChatTitle = currentChatObj ? getConversationTopicTitle(currentChatObj) : 'New Conversation';

  const filteredChats = savedChats.filter(chat => {
    if (activeProjectId && chat.projectId !== activeProjectId) {
      return false;
    }
    const topicTitle = getConversationTopicTitle(chat);
    return topicTitle.toLowerCase().includes(sidebarSearchQuery.toLowerCase()) ||
      chat.messages.some(m => m.content.toLowerCase().includes(sidebarSearchQuery.toLowerCase()));
  });
  const [isHistoryDrawerOpen, setIsHistoryDrawerOpen] = useState(false);

  // Hydration effect - merges remote and local conversations seamlessly
  useEffect(() => {
    const currentUserIdKey = user ? user.uid : 'guest';

    // Prevent repeated hydration loops if already hydrated for this user
    if (hydratedUserRef.current === currentUserIdKey) {
      return;
    }
    hydratedUserRef.current = currentUserIdKey;

    if (user) {
      const localCached = getInitialChats(user.uid);
      const remoteChats = (userData?.arohiChats && Array.isArray(userData.arohiChats)) ? userData.arohiChats : [];
      const merged = mergeSavedChats(localCached, remoteChats).map(c => ({
        ...c,
        title: getConversationTopicTitle(c)
      }));

      if (merged.length > 0) {
        setSavedChats(merged);
        try {
          localStorage.setItem(`arohi_saved_chats_${user.uid}`, JSON.stringify(merged));
        } catch (e) {}

        if (!activeChatId || !merged.some(c => c.id === activeChatId)) {
          setActiveChatId(merged[0].id);
          setMessages(merged[0].messages || []);
        }
      } else {
        // Brand new user with 0 historical conversations
        const now = Date.now();
        const defaultChatId = 'chat-' + now;
        const defaultChat: SavedChat = {
          id: defaultChatId,
          title: 'New Conversation',
          createdAt: now,
          updatedAt: now,
          date: 'Today',
          messages: [
            {
              id: 'welcome',
              role: 'assistant',
              content: getWelcomeContent(language),
              timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
              createdAt: now
            }
          ]
        };
        setSavedChats([defaultChat]);
        if (!activeChatId) {
          setActiveChatId(defaultChatId);
          setMessages(defaultChat.messages);
        }
        try {
          localStorage.setItem(`arohi_saved_chats_${user.uid}`, JSON.stringify([defaultChat]));
        } catch (e) {}
      }

      if (userData?.arohiCalls && Array.isArray(userData.arohiCalls)) {
        setSavedCalls(userData.arohiCalls);
      } else {
        const localCalls = localStorage.getItem('guest_arohi_calls');
        if (localCalls) {
          try {
            setSavedCalls(JSON.parse(localCalls));
          } catch (e) {}
        }
      }
    } else {
      // Guest session hydration
      const cached = getInitialChats();
      if (cached.length > 0) {
        setSavedChats(cached);
        if (!activeChatId || !cached.some(c => c.id === activeChatId)) {
          setActiveChatId(cached[0].id);
          setMessages(cached[0].messages || []);
        }
      } else {
        const now = Date.now();
        const defaultChatId = 'chat-' + now;
        const defaultChat: SavedChat = {
          id: defaultChatId,
          title: 'New Conversation',
          createdAt: now,
          updatedAt: now,
          date: 'Today',
          messages: [
            {
              id: 'welcome',
              role: 'assistant',
              content: getWelcomeContent(language),
              timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
              createdAt: now
            }
          ]
        };
        setSavedChats([defaultChat]);
        if (!activeChatId) {
          setActiveChatId(defaultChatId);
          setMessages(defaultChat.messages);
        }
        try {
          localStorage.setItem('guest_arohi_chats', JSON.stringify([defaultChat]));
        } catch (e) {}
      }

      const localCalls = localStorage.getItem('guest_arohi_calls');
      if (localCalls) {
        try {
          setSavedCalls(JSON.parse(localCalls));
        } catch (e) {}
      } else {
        setSavedCalls([]);
      }
    }
  }, [user?.uid]);

  // Fetch and restore the freshest conversation history from Firestore database when starting a session
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
            if (freshData.arohiChats && Array.isArray(freshData.arohiChats) && freshData.arohiChats.length > 0) {
              setSavedChats(prev => {
                const merged = mergeSavedChats(prev, freshData.arohiChats).map(c => ({
                  ...c,
                  title: getConversationTopicTitle(c)
                }));
                try {
                  localStorage.setItem(`arohi_saved_chats_${user.uid}`, JSON.stringify(merged));
                } catch (e) {}
                if (!activeChatId || !merged.some(c => c.id === activeChatId)) {
                  setActiveChatId(merged[0].id);
                  setMessages(merged[0].messages || []);
                }
                return merged;
              });
            }
            if (freshData.arohiCalls && Array.isArray(freshData.arohiCalls)) {
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
          if (freshData.arohiChats && Array.isArray(freshData.arohiChats) && freshData.arohiChats.length > 0) {
            setSavedChats(prev => {
              const merged = mergeSavedChats(prev, freshData.arohiChats).map(c => ({
                ...c,
                title: getConversationTopicTitle(c)
              }));
              try {
                localStorage.setItem(`arohi_saved_chats_${user.uid}`, JSON.stringify(merged));
              } catch (e) {}
              if (!activeChatId || !merged.some(c => c.id === activeChatId)) {
                setActiveChatId(merged[0].id);
                setMessages(merged[0].messages || []);
              }
              return merged;
            });
          }
          if (freshData.arohiCalls && Array.isArray(freshData.arohiCalls)) {
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

  // Persist messages changes safely and dynamically update conversation topic titles
  useEffect(() => {
    if (!activeChatId || messages.length === 0) return;

    const syncKey = `${activeChatId}::${JSON.stringify(messages)}`;
    if (prevSyncedMessagesJsonRef.current === syncKey) return;
    prevSyncedMessagesJsonRef.current = syncKey;

    const hasUserMessage = messages.some(m => m && m.role === 'user' && m.content && m.content.trim().length > 0);

    let updatedChatsToPersist: SavedChat[] | null = null;

    setSavedChats(prevChats => {
      const chatIndex = prevChats.findIndex(c => c.id === activeChatId);
      let updatedChats: SavedChat[];

      const dynamicTitle = getConversationTopicTitle({ messages, title: prevChats[chatIndex]?.title });
      const now = Date.now();

      if (chatIndex === -1) {
        const newChat: SavedChat = {
          id: activeChatId,
          title: dynamicTitle,
          createdAt: now,
          updatedAt: now,
          date: 'Today',
          messages
        };
        updatedChats = [newChat, ...prevChats];
      } else {
        updatedChats = prevChats.map(c => c.id === activeChatId ? { 
          ...c, 
          title: dynamicTitle, 
          messages,
          updatedAt: now,
          createdAt: c.createdAt || extractChatTimestamp(c) || now
        } : c);
      }

      // Re-order: Move active conversation to top if user sent messages
      if (hasUserMessage) {
        const activeIdx = updatedChats.findIndex(c => c.id === activeChatId);
        if (activeIdx > 0) {
          const [activeItem] = updatedChats.splice(activeIdx, 1);
          updatedChats = [activeItem, ...updatedChats];
        }
      }

      updatedChatsToPersist = updatedChats;

      if (user) {
        try {
          localStorage.setItem(`arohi_saved_chats_${user.uid}`, JSON.stringify(updatedChats));
        } catch (e) {}
      } else {
        try {
          localStorage.setItem('guest_arohi_chats', JSON.stringify(updatedChats));
        } catch (e) {}
      }

      return updatedChats;
    });

    // Cloud sync outside state updater function
    if (user && updatedChatsToPersist && (hasUserMessage || (updatedChatsToPersist as SavedChat[]).some(c => c.messages.some(m => m.role === 'user')))) {
      updateArohiChats(updatedChatsToPersist).catch(e => console.log('Chat update:', e));
    }
  }, [messages, activeChatId, user?.uid]);

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
    }).catch(() => {});

    // Check if user is asking for image generation
    const lowerText = text.toLowerCase().trim();
    
    // Check if user is asking for 3D Learning
    const is3DRequest = lowerText.includes('3d learning') || 
                        lowerText.includes('interactive 3d') || 
                        lowerText.includes('3d model') || 
                        lowerText.includes('show in 3d') || 
                        lowerText.includes('teach me in 3d') || 
                        lowerText.includes('heart in 3d') || 
                        lowerText.includes('3d heart') || 
                        lowerText.includes('3d cell') || 
                        lowerText.includes('3d dna') || 
                        lowerText.includes('3d solar system') || 
                        lowerText.includes('3d engine') || 
                        lowerText.includes('3d atom') || 
                        lowerText.includes('3d earth');

    if (is3DRequest) {
      let topic = 'human_heart';
      if (lowerText.includes('cell')) topic = 'animal_cell';
      else if (lowerText.includes('dna')) topic = 'dna_helix';
      else if (lowerText.includes('solar') || lowerText.includes('planet')) topic = 'solar_system';
      else if (lowerText.includes('engine') || lowerText.includes('car')) topic = 'four_stroke_engine';
      else if (lowerText.includes('atom') || lowerText.includes('bohr')) topic = 'bohr_atom';
      else if (lowerText.includes('earth') || lowerText.includes('crust')) topic = 'earth_layers';

      setActive3DTopic(topic);
      setIs3DLearningOpen(true);

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `✨ **Opening AROHI 3D Learning Workspace!**\n\nI have launched the interactive 3D model for subject exploration with **Levels 1–5 Integration**:\n- **Level 1**: Visual Learning & High-Definition Geometry\n- **Level 2**: Interactive 3D (360° Rotation, Pinch-Zoom, Part Inspection)\n- **Level 3**: Guided 3D Teaching (Arohi AI Step-by-Step Curriculum)\n- **Level 4**: Interactive Simulation (Cardiac Beat, Piston Motion, Planetary Orbit)\n- **Level 5**: AR/VR WebXR Immersive Experience\n\nYou can interact with the 3D model, click specific parts, ask natural language questions, and take interactive quizzes directly inside the workspace!`,
        timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsLoading(false);
      return;
    }

    const isImageRequest = 
      /^\/image\b/i.test(text) ||
      /\b(generate|create|make|draw|render|paint|design)\b.*?\b(image|picture|photo|logo|illustration|artwork|wallpaper|avatar|robot|portrait|workspace|office|interior)\b/i.test(text) ||
      /\b(image\s+of|picture\s+of|photo\s+of|sketch\s+of|painting\s+of|drawing\s+of)\b/i.test(text) ||
      lowerText.startsWith('generate image') || 
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
      lowerText.includes('create an image of') ||
      (lowerText.includes('realistic') && messages.length > 0 && messages.some(m => m.content.includes('![')));

    if (isImageRequest) {
      let promptText = text
        .replace(/^(feature 8|feature #8|implement feature 8|generate high-quality images|generate high quality images|generate image of|create image of|generate an image of|create an image of|create a logo for|generate image|create image|draw|\/image|make an image of|make image of|render an image of|draw an image of|create a picture of|picture of|photo of)/i, '')
        .trim();
      if (!promptText) promptText = text;

      const loadingMsgId = (Date.now() + 1).toString();
      const loadingAssistantMessage: Message = {
        id: loadingMsgId,
        role: 'assistant',
        content: `🎨 *Creating image...*`,
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
          // Deliver purely the image result directly without extra unnecessary text
          const formattedResponse = `![${promptText}](${data.imageUrl})`;

          setMessages((prev) => prev.map(m => m.id === loadingMsgId ? { ...m, content: formattedResponse } : m));

          // Sync assistant response to admin portal
          fetch('/api/admin/sync-chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              userEmail: uEmail,
              userName: uName,
              sender: 'arohi',
              text: `[Image Generated: ${promptText}]`,
              topic: activeTopic
            })
          }).catch(() => {});
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
          }).catch(() => {});
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
          }).catch(() => {});
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
          }).catch(() => {});
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
          }).catch(() => {});
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
          }).catch(() => {});
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

    const streamingMsgId = (Date.now() + 1).toString();
    const initialAssistantMessage: Message = {
      id: streamingMsgId,
      role: 'assistant',
      content: '',
      isStreaming: true,
      timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, initialAssistantMessage]);
    setIsLoading(true);

    const currentChat = savedChats.find(c => c.id === activeChatId);
    const targetProjId = currentChat?.projectId || activeProjectId;
    const activeProj = targetProjId ? projects.find(p => p.id === targetProjId) : null;
    let effectiveSystemContext = userMemory?.summaryContext || '';
    if (activeProj) {
      const projIntro = `[ACTIVE PROJECT CONTEXT: "${activeProj.name}"${activeProj.description ? ` - ${activeProj.description}` : ''}]`;
      const projRules = activeProj.customInstructions ? `\nCustom Project Instructions to follow strictly:\n${activeProj.customInstructions}` : '';
      effectiveSystemContext = `${effectiveSystemContext}\n${projIntro}${projRules}`.trim();
    }

    try {
      const response = await fetch('/api/chat-stream', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: text,
          history: messages.filter(m => m && m.content && m.content.trim().length > 0).map(m => ({ role: m.role || 'user', content: m.content })),
          file: fileToSend,
          language: language,
          uid: user?.uid,
          systemContext: effectiveSystemContext
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      if (!response.body) {
        throw new Error('No streaming response body available');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let accumulatedText = '';
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          const trimmed = line.trim();
          if (trimmed.startsWith('data: ')) {
            const dataStr = trimmed.slice(6).trim();
            if (!dataStr) continue;
            try {
              const data = JSON.parse(dataStr);
              if (data.chunk) {
                accumulatedText += data.chunk;
                setMessages((prev) => prev.map(m => m.id === streamingMsgId ? { ...m, content: accumulatedText } : m));
              } else if (data.done && data.response && !accumulatedText) {
                accumulatedText = data.response;
                setMessages((prev) => prev.map(m => m.id === streamingMsgId ? { ...m, content: accumulatedText } : m));
              }
            } catch (e) {
              console.warn('Error parsing SSE json:', e);
            }
          }
        }
      }

      if (!accumulatedText.trim()) {
        throw new Error('Streaming connection returned empty response');
      }

      // Mark streaming complete
      setMessages((prev) => prev.map(m => m.id === streamingMsgId ? { ...m, isStreaming: false } : m));

      // Sync assistant response to admin portal safely
      fetch('/api/admin/sync-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userEmail: uEmail,
          userName: uName,
          sender: 'arohi',
          text: accumulatedText,
          topic: activeTopic
        })
      }).catch(() => {});
    } catch (error) {
      console.warn('Primary stream fetch encountered an issue, attempting standard POST fallback:', error);
      let fallbackText = '';
      
      try {
        const fallbackRes = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: text,
            history: messages.filter(m => m && m.content && m.content.trim().length > 0).map(m => ({ role: m.role || 'user', content: m.content })),
            file: fileToSend,
            language: language,
            uid: user?.uid,
            systemContext: effectiveSystemContext
          })
        });
        if (fallbackRes.ok) {
          const fallbackData = await fallbackRes.json();
          if (fallbackData && fallbackData.response) {
            fallbackText = fallbackData.response;
          }
        }
      } catch (fbErr) {
        console.warn('Fallback /api/chat also encountered issue:', fbErr);
      }

      if (!fallbackText.trim()) {
        fallbackText = `I apologize for the brief connection hiccup! As **AROHI**, your AI opportunity advisor, I am ready to guide you on careers, government schemes, skills, and business opportunities. Please ask your question again or explore our Jobs board!`;
      }

      setMessages((prev) => prev.map(m => m.id === streamingMsgId ? {
        ...m,
        content: fallbackText,
        isStreaming: false
      } : m));

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
      }).catch(() => {});
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

  const startNewChat = (customProjectId?: string | null) => {
    const targetProjId = customProjectId !== undefined 
      ? (customProjectId || undefined) 
      : (activeProjectId || undefined);

    const now = Date.now();
    const newChatId = 'chat-' + now;
    const newChat: SavedChat = {
      id: newChatId,
      title: 'New Conversation',
      createdAt: now,
      updatedAt: now,
      date: 'Today',
      projectId: targetProjId,
      messages: [
        {
          id: 'welcome',
          role: 'assistant',
          content: getWelcomeContent(language),
          timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
          createdAt: now
        }
      ]
    };

    const updatedChats = [newChat, ...savedChats];
    setSavedChats(updatedChats);
    setActiveChatId(newChatId);
    setMessages(newChat.messages);

    if (user) {
      updateArohiChats(updatedChats).catch(() => {});
      try {
        localStorage.setItem(`arohi_saved_chats_${user.uid}`, JSON.stringify(updatedChats));
      } catch (e) {}
    } else {
      try {
        localStorage.setItem('guest_arohi_chats', JSON.stringify(updatedChats));
      } catch (e) {}
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

  const toggleRecording = async () => {
    if (recording) {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          console.error(e);
        }
        recognitionRef.current = null;
      }
      setRecording(false);
    } else {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (!SpeechRecognition) {
        alert("Speech recognition is not supported in this browser. Please type your message or open Arohi Voice Call for interactive speech.");
        return;
      }

      // Warm up microphone permissions
      try {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          await navigator.mediaDevices.getUserMedia({ audio: true });
        }
      } catch (permErr: any) {
        console.warn("getUserMedia permission error in chat:", permErr);
        if (permErr?.name === 'NotAllowedError' || permErr?.name === 'PermissionDeniedError') {
          alert("Microphone permission denied. Please allow microphone access in your browser settings to use voice input.");
          return;
        }
      }

      try {
        const rec = new SpeechRecognition();
        rec.continuous = true;
        rec.interimResults = true;
        rec.maxAlternatives = 1;
        
        // Set language dynamically to match the user's interface language selection
        const langMap: Record<string, string> = {
          en: 'en-IN',
          hi: 'hi-IN',
          or: 'or-IN',
          bn: 'bn-IN',
          te: 'te-IN',
          ta: 'ta-IN',
          mr: 'mr-IN',
          gu: 'gu-IN',
          pa: 'pa-IN',
          kn: 'kn-IN',
          ml: 'ml-IN',
          ur: 'ur-IN'
        };
        rec.lang = langMap[language] || 'en-IN';

        rec.onstart = () => {
          setRecording(true);
        };

        rec.onresult = (event: any) => {
          let finalTranscript = '';
          let interimTranscript = '';
          for (let i = 0; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              finalTranscript += event.results[i][0].transcript + ' ';
            } else {
              interimTranscript += event.results[i][0].transcript;
            }
          }
          const cleanText = (finalTranscript + interimTranscript).trim();
          if (cleanText) {
            setInput(cleanText);
          }
        };

        rec.onerror = (event: any) => {
          console.error('Speech recognition error in chat:', event.error);
          if (event.error === 'not-allowed') {
            alert("Microphone permission was denied. Please allow microphone in browser settings.");
            setRecording(false);
          } else if (event.error !== 'no-speech') {
            setRecording(false);
          }
        };

        rec.onend = () => {
          setRecording(false);
        };

        recognitionRef.current = rec;
        rec.start();
      } catch (e) {
        console.error('Speech recognition start failed:', e);
        setRecording(false);
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
    <div className={`flex ${isDarkMode ? 'bg-[#000000] text-slate-100' : 'bg-[#f8f9fe] text-slate-900'} overflow-hidden h-full w-full font-sans relative ${isVoiceCallOpen ? 'hidden' : ''}`}>
      
      {/* GEMINI & CHATGPT-STYLE NAVIGATION DRAWER / SIDEBAR */}
      <aside 
        className={`${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } fixed md:relative z-40 inset-y-0 left-0 flex flex-col w-80 md:w-72 h-screen h-[100dvh] max-h-[100dvh] md:h-full ${
          isDarkMode ? 'bg-[#090714] border-[#1a142e] text-slate-100' : 'bg-[#f1f3fa] border-slate-200 text-slate-900'
        } border-r p-4 shrink-0 transition-transform duration-300 ease-in-out font-sans select-none shadow-2xl overflow-hidden`}
      >
        {/* Sidebar Header: Brand + Search + Close */}
        <div className={`flex items-center justify-between pb-3 mb-2 px-1 border-b ${isDarkMode ? 'border-white/10' : 'border-slate-200'}`}>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#3b82f6] to-[#8b5cf6] flex items-center justify-center text-white shadow-md">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <h2 className={`text-lg font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'} flex items-center gap-1.5`}>
              Arohi <span className={`text-[10px] ${isDarkMode ? 'bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-300 border-purple-500/30' : 'bg-purple-100 text-purple-700 border-purple-300'} px-2 py-0.5 rounded font-black uppercase border`}>AI</span>
            </h2>
          </div>
          <div className="flex items-center gap-1">
            <button 
              onClick={() => setShowSearchInput(!showSearchInput)}
              className={`p-2 ${isDarkMode ? 'text-slate-300 hover:text-white hover:bg-white/10' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'} rounded-full transition-colors cursor-pointer`}
              title="Search Recents"
            >
              <Search className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className={`md:hidden p-2 ${isDarkMode ? 'text-slate-300 hover:text-white hover:bg-white/10' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'} rounded-full transition-colors cursor-pointer`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Top Quick Navigation List (Matches ChatGPT Sidebar) */}
        <div className="space-y-1 mb-3 py-1">
          <button
            onClick={() => {
              setIsMcpGatewayOpen(true);
              if (window.innerWidth < 768) setIsSidebarOpen(false);
            }}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold ${
              isDarkMode 
                ? 'text-white bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-purple-500/20 border-amber-500/40 hover:border-amber-400 hover:from-amber-500/30 hover:to-purple-500/30' 
                : 'text-amber-950 bg-gradient-to-r from-amber-100/90 via-orange-100/80 to-purple-100/80 border-amber-300 hover:border-amber-400 hover:from-amber-200/90 hover:to-purple-200/90'
            } border transition-all cursor-pointer text-left shadow-xs group mb-2`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <Zap className="w-5 h-5 text-amber-500 shrink-0 animate-pulse" />
              <div className="min-w-0">
                <div className={`font-extrabold leading-tight ${isDarkMode ? 'text-amber-200' : 'text-amber-950'}`}>
                  Apps & Everyday Tasks
                </div>
                <div className={`text-[10.5px] font-semibold leading-tight mt-0.5 ${isDarkMode ? 'text-amber-300/90' : 'text-amber-900'}`}>
                  Under Beta Testing Mode
                </div>
              </div>
            </div>
            <span className="text-[9px] bg-amber-500 text-slate-950 font-black px-1.5 py-0.5 rounded-md uppercase tracking-wider shrink-0 ml-2">
              BETA
            </span>
          </button>

          {/* Arohi Projects (ChatGPT-style Workspace) */}
          <div className="w-full">
            <div className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold ${
              activeProjectId
                ? (isDarkMode ? 'bg-purple-900/40 text-purple-200 border border-purple-500/50 shadow-xs' : 'bg-purple-100 text-purple-950 border border-purple-300 font-bold')
                : (isDarkMode ? 'text-slate-200 hover:text-white hover:bg-white/10' : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200/70')
            } transition-colors`}>
              <button
                onClick={() => {
                  setIsProjectsModalOpen(true);
                  if (window.innerWidth < 768) setIsSidebarOpen(false);
                }}
                className="flex items-center gap-3.5 min-w-0 flex-1 cursor-pointer text-left"
              >
                <Folder className={`w-5 h-5 ${activeProjectId ? 'text-purple-400' : (isDarkMode ? 'text-slate-300' : 'text-slate-600')} shrink-0`} />
                <div className="min-w-0 flex-1">
                  <span className="block truncate leading-tight">Projects</span>
                  {activeProjectId && (
                    <span className="text-[10px] text-purple-400 block truncate font-normal">
                      {projects.find(p => p.id === activeProjectId)?.name || 'Filtered'}
                    </span>
                  )}
                </div>
              </button>
              
              <div className="flex items-center gap-1 shrink-0">
                {projects.length > 0 && (
                  <button
                    onClick={() => setIsSidebarProjectsListExpanded(!isSidebarProjectsListExpanded)}
                    className="p-1 rounded-md text-purple-400 hover:text-purple-200 hover:bg-purple-500/20 cursor-pointer"
                    title={isSidebarProjectsListExpanded ? "Collapse Projects" : "Expand Projects"}
                  >
                    {isSidebarProjectsListExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                  </button>
                )}
                <button
                  onClick={() => setIsProjectsModalOpen(true)}
                  className="text-[10px] bg-purple-500/20 text-purple-300 font-extrabold px-1.5 py-0.5 rounded-md shrink-0 border border-purple-500/30 hover:bg-purple-500/30 cursor-pointer"
                  title="Open Projects Manager"
                >
                  {projects.length}
                </button>
              </div>
            </div>

            {/* Expandable Sidebar Projects List with Direct Inline Renaming */}
            {projects.length > 0 && isSidebarProjectsListExpanded && (
              <div className="mt-1.5 mb-2 pl-3 pr-1 space-y-1 border-l-2 border-purple-500/30 ml-4">
                {projects.map((proj) => {
                  const isEditingThis = editingSidebarProjectId === proj.id;
                  const isProjActive = activeProjectId === proj.id;
                  const projChatCount = savedChats.filter(c => c.projectId === proj.id).length;

                  if (isEditingThis) {
                    return (
                      <div 
                        key={proj.id}
                        className={`flex items-center gap-1.5 p-1.5 rounded-lg border text-xs ${
                          isDarkMode ? 'bg-purple-950/90 border-purple-400 text-white' : 'bg-white border-purple-400 text-purple-950 shadow-sm'
                        }`}
                      >
                        <input
                          type="text"
                          value={editingSidebarProjectName}
                          onChange={(e) => setEditingSidebarProjectName(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') saveInlineEditProject(proj.id);
                            if (e.key === 'Escape') cancelInlineEditProject();
                          }}
                          onBlur={() => saveInlineEditProject(proj.id)}
                          autoFocus
                          placeholder="Project name..."
                          className={`w-full px-2 py-0.5 text-xs font-semibold rounded bg-transparent border-0 focus:outline-none focus:ring-0 ${
                            isDarkMode ? 'text-white' : 'text-purple-950'
                          }`}
                        />
                        <button
                          onClick={() => saveInlineEditProject(proj.id)}
                          className="p-1 text-emerald-400 hover:text-emerald-300 shrink-0 cursor-pointer"
                          title="Save (Enter)"
                        >
                          <Check className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={cancelInlineEditProject}
                          className="p-1 text-rose-400 hover:text-rose-300 shrink-0 cursor-pointer"
                          title="Cancel (Esc)"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    );
                  }

                  return (
                    <div
                      key={proj.id}
                      className={`group flex items-center justify-between p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                        isProjActive
                          ? (isDarkMode ? 'bg-purple-900/50 text-purple-200 font-bold border border-purple-500/40' : 'bg-purple-100 text-purple-950 font-bold')
                          : (isDarkMode ? 'text-slate-300 hover:bg-white/5 hover:text-white' : 'text-slate-700 hover:bg-slate-200/60 hover:text-slate-900')
                      }`}
                      onClick={() => setActiveProjectId(isProjActive ? null : proj.id)}
                      title={`Click to filter by ${proj.name}. Click pen icon to rename.`}
                    >
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        <Folder className={`w-3.5 h-3.5 ${isProjActive ? 'text-purple-400' : 'text-slate-400'} shrink-0`} />
                        <span 
                          className="truncate max-w-[110px]"
                          onClick={(e) => {
                            e.stopPropagation();
                            startInlineEditProject(proj.id, proj.name, e);
                          }}
                          title="Click project name to rename inline"
                        >
                          {proj.name}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <span className="text-[10px] text-slate-400 px-1 py-0.2 rounded bg-slate-500/10 font-medium">
                          {projChatCount}
                        </span>
                        <button
                          onClick={(e) => startInlineEditProject(proj.id, proj.name, e)}
                          className="p-1 rounded opacity-0 group-hover:opacity-100 text-slate-400 hover:text-purple-400 hover:bg-purple-500/20 cursor-pointer transition-opacity"
                          title="Rename Project"
                        >
                          <Edit3 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Active Project Banner Filter Indicator */}
        {activeProjectId && (
          <div className={`mb-3 mx-0.5 p-2.5 rounded-xl border flex items-center justify-between text-xs ${
            isDarkMode ? 'bg-purple-950/50 border-purple-500/40 text-purple-200 shadow-sm' : 'bg-purple-50 border-purple-300 text-purple-900'
          }`}>
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <Folder className="w-4 h-4 text-purple-400 shrink-0" />
              <div className="min-w-0 flex-1">
                <div className="text-[9px] uppercase tracking-wider font-extrabold text-purple-400">Active Project</div>
                {editingSidebarProjectId === activeProjectId ? (
                  <div className="flex items-center gap-1 mt-0.5">
                    <input
                      type="text"
                      value={editingSidebarProjectName}
                      onChange={(e) => setEditingSidebarProjectName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') saveInlineEditProject(activeProjectId);
                        if (e.key === 'Escape') cancelInlineEditProject();
                      }}
                      onBlur={() => saveInlineEditProject(activeProjectId)}
                      autoFocus
                      className={`w-full px-2 py-0.5 text-xs font-bold rounded border ${
                        isDarkMode ? 'bg-purple-900/80 border-purple-400 text-white' : 'bg-white border-purple-400 text-purple-950'
                      } focus:outline-none focus:ring-1 focus:ring-purple-400`}
                    />
                    <button
                      onClick={() => saveInlineEditProject(activeProjectId)}
                      className="p-1 text-emerald-400 hover:text-emerald-300 cursor-pointer shrink-0"
                      title="Save name"
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={cancelInlineEditProject}
                      className="p-1 text-rose-400 hover:text-rose-300 cursor-pointer shrink-0"
                      title="Cancel"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <div
                    onClick={() => {
                      const curProj = projects.find(p => p.id === activeProjectId);
                      if (curProj) startInlineEditProject(curProj.id, curProj.name);
                    }}
                    className="group/title flex items-center gap-1.5 cursor-pointer min-w-0 mt-0.5"
                    title="Click project name to rename inline"
                  >
                    <span className="font-bold truncate text-xs hover:underline decoration-dotted">
                      {projects.find(p => p.id === activeProjectId)?.name}
                    </span>
                    <Edit3 className="w-3 h-3 text-purple-400 opacity-60 group-hover/title:opacity-100 shrink-0 transition-opacity" />
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-1.5 shrink-0 ml-2">
              <button
                onClick={() => handleStartChatInProject(activeProjectId)}
                className="text-[10px] px-2 py-0.5 rounded-md bg-purple-600 hover:bg-purple-500 text-white font-bold cursor-pointer"
                title="New Chat in this Project"
              >
                + Chat
              </button>
              <button
                onClick={() => setActiveProjectId(null)}
                className="text-[10px] text-slate-400 hover:text-white underline font-semibold cursor-pointer"
                title="Show all chats"
              >
                Show All
              </button>
            </div>
          </div>
        )}

        {/* Search input when toggled */}
        {showSearchInput && (
          <div className="mb-3 px-1">
            <input
              type="text"
              placeholder="Search conversation titles..."
              value={sidebarSearchQuery}
              onChange={(e) => setSidebarSearchQuery(e?.target?.value ?? "")}
              className={`w-full ${isDarkMode ? 'bg-[#18132d] border-[#30225d] text-white placeholder-slate-400' : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'} border rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#7c3aed]`}
              autoFocus
            />
          </div>
        )}

        {/* New Chat Button */}
        <button
          onClick={() => {
            startNewChat();
            if (window.innerWidth < 768) setIsSidebarOpen(false);
          }}
          className={`w-full flex items-center justify-center gap-2 px-3.5 py-2.5 mb-2 rounded-xl text-sm font-bold ${
            isDarkMode 
              ? 'bg-[#7c3aed] hover:bg-[#6d28d9] text-white shadow-md' 
              : 'bg-purple-600 hover:bg-purple-700 text-white shadow-sm'
          } transition-all cursor-pointer`}
        >
          <Plus className="w-4 h-4" />
          <span>{activeProjectId ? 'New Chat in Project' : 'New Chat'}</span>
        </button>

        {/* Recents Section Heading */}
        <div className={`flex items-center justify-between text-xs font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-500'} uppercase tracking-wider mb-2 px-3 pt-1`}>
          <span>{activeProjectId ? 'Project Recents' : 'Recents'}</span>
          {activeTab === 'calls' && (
            <button
              onClick={() => setActiveTab('chats')}
              className="text-[10px] text-blue-500 hover:underline normal-case font-medium cursor-pointer"
            >
              Show Chats
            </button>
          )}
        </div>

        {/* Scrollable Conversation History */}
        <div className="flex-1 min-h-0 overflow-y-auto space-y-1.5 pr-1.5 px-1 arohi-recents-scrollbar custom-scrollbar overscroll-contain">
          {activeTab === 'chats' ? (
            filteredChats.length === 0 ? (
              <div className={`text-center py-8 text-xs ${isDarkMode ? 'text-slate-500' : 'text-slate-400'} font-medium`}>
                {activeProjectId ? 'No chats in this project yet' : 'No recent conversations'}
              </div>
            ) : (
              filteredChats.map((item) => {
                const isActive = activeChatId === item.id;
                const displayTitle = getConversationTopicTitle(item);
                const msgCount = item.messages ? item.messages.filter(m => m.id !== 'welcome').length : 0;
                const projObj = item.projectId ? projects.find(p => p.id === item.projectId) : null;
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
                        ? (isDarkMode ? 'bg-gradient-to-r from-purple-600/30 to-blue-600/30 text-white font-semibold border border-purple-500/40 shadow-sm' : 'bg-purple-100 text-purple-950 font-bold border border-purple-300 shadow-xs')
                        : (isDarkMode ? 'text-slate-300 hover:bg-white/10 hover:text-white' : 'text-slate-700 hover:bg-slate-200/80 hover:text-slate-900')
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 pr-2">
                      <MessageCircle className={`w-4 h-4 shrink-0 ${isActive ? (isDarkMode ? 'text-purple-400' : 'text-purple-700') : (isDarkMode ? 'text-slate-400' : 'text-slate-500')}`} />
                      <div className="min-w-0">
                        <div className="truncate text-sm leading-tight">{displayTitle}</div>
                        <div className={`text-[10px] ${isDarkMode ? 'text-slate-400' : 'text-slate-500'} font-normal flex items-center gap-1.5 mt-0.5`}>
                          <span>{getChatDisplayDate(item)}</span>
                          {msgCount > 0 && (
                            <>
                              <span>•</span>
                              <span>{msgCount} {msgCount === 1 ? 'msg' : 'msgs'}</span>
                            </>
                          )}
                          {projObj && (
                            <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-md ${
                              isDarkMode ? 'bg-purple-950/70 text-purple-300 border border-purple-500/30' : 'bg-purple-100 text-purple-800'
                            } truncate max-w-[80px]`}>
                              📁 {projObj.name}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setMoveChatModalTarget({
                            chatId: item.id,
                            title: displayTitle,
                            currentProjectId: item.projectId
                          });
                        }}
                        className="p-1 rounded-md text-slate-400 hover:text-purple-400 hover:bg-purple-500/20 cursor-pointer"
                        title="Move to Project"
                      >
                        <Folder className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => deleteChat(item.id, e)}
                        className="p-1 rounded-md text-slate-400 hover:text-rose-500 hover:bg-rose-500/20 cursor-pointer"
                        title="Delete Chat"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })
            )
          ) : savedCalls.length === 0 ? (
            <div className={`text-center py-8 text-xs ${isDarkMode ? 'text-slate-500' : 'text-slate-400'} font-medium`}>
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
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium ${isDarkMode ? 'text-slate-300 hover:bg-white/10 hover:text-white' : 'text-slate-700 hover:bg-slate-200/80 hover:text-slate-900'} transition-colors cursor-pointer flex items-center justify-between group`}
              >
                <div className="truncate flex items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span className="truncate">{getCallDisplayDate(item)}</span>
                </div>
                <Trash2
                  onClick={(e) => deleteCall(item.id, e)}
                  className={`w-4 h-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'} opacity-0 group-hover:opacity-100 hover:text-rose-500 shrink-0 transition-opacity`}
                />
              </div>
            ))
          )}
        </div>

        {/* Bottom Bar: Chat Pill + User Profile Circle */}
        <div className={`pt-3 border-t ${isDarkMode ? 'border-white/10' : 'border-slate-200'} mt-2 px-1 flex items-center justify-between gap-2`}>
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

      {/* CENTER: GEMINI MAIN CHAT WINDOW */}
      <div className={`flex-1 flex flex-col min-w-0 ${isDarkMode ? 'bg-[#000000]' : 'bg-[#f8f9fe]'} relative h-full`}>
        
        {/* Gemini Minimal Top Header Bar */}
        <div className={`${isDarkMode ? 'bg-[#000000] border-[#1f1738]/60' : 'bg-white border-slate-200 shadow-xs'} border-b px-4 py-3 flex justify-between items-center z-20 shrink-0`}>
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className={`p-1.5 ${isDarkMode ? 'text-slate-300 hover:text-white hover:bg-[#17122e]' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'} rounded-lg transition-colors cursor-pointer`}
              title="Toggle Navigation Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="min-w-0 flex items-center gap-2">
              <h1 className={`font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'} text-base sm:text-lg tracking-tight truncate`}>
                {activeChatTitle || 'Arohi AI'}
              </h1>
              {currentChatObj?.projectId && (
                <button
                  onClick={() => setIsProjectsModalOpen(true)}
                  className={`hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold border transition-colors cursor-pointer ${
                    isDarkMode 
                      ? 'bg-purple-950/70 text-purple-300 border-purple-500/40 hover:bg-purple-900/80' 
                      : 'bg-purple-100 text-purple-900 border-purple-300 hover:bg-purple-200'
                  }`}
                  title="View Project Workspace"
                >
                  <Folder className="w-3 h-3 text-purple-400 shrink-0" />
                  <span className="truncate max-w-[130px]">
                    {projects.find(p => p.id === currentChatObj.projectId)?.name || 'Project'}
                  </span>
                </button>
              )}
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" title="Core AI Online"></span>
              <span className={`hidden sm:inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider shrink-0 ${
                isDarkMode 
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' 
                  : 'bg-amber-100 text-amber-900 border-amber-300'
              }`}>
                Under Beta Testing Mode
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              onClick={() => setIsVoiceCallOpen(true)}
              className={`p-2 rounded-full ${isDarkMode ? 'bg-[#181135] hover:bg-[#251b4e] text-emerald-400 border-[#3b2a80]' : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-200'} border transition-all cursor-pointer flex items-center gap-1.5`}
              title="Start Live Voice Call"
            >
              <Phone className="w-4 h-4 animate-pulse" />
              <span className={`text-[11px] font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'} hidden xs:inline pr-1`}>Voice</span>
            </button>

            <button
              onClick={() => handleSendMessage("Activate live video camera stream analysis")}
              className={`p-2 rounded-full ${isDarkMode ? 'bg-[#181135] hover:bg-[#251b4e] text-violet-300 border-[#3b2a80]' : 'bg-violet-50 hover:bg-violet-100 text-violet-700 border-violet-200'} border transition-all cursor-pointer`}
              title="Camera Stream"
            >
              <Video className="w-4 h-4" />
            </button>

            {/* 3D Learning Button hidden as requested by user */}

            <div className="relative">
              <button
                onClick={() => setActiveMessageMenuId(activeMessageMenuId === 'header' ? null : 'header')}
                className={`p-2 rounded-full ${isDarkMode ? 'text-slate-300 hover:text-white hover:bg-[#181135]' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'} transition-colors cursor-pointer`}
                title="Options"
              >
                <MoreHorizontal className="w-5 h-5" />
              </button>

              {activeMessageMenuId === 'header' && (
                <div className={`absolute right-0 top-11 w-56 ${isDarkMode ? 'bg-[#120c2b] border-[#302166] text-slate-200' : 'bg-white border-slate-200 text-slate-700 shadow-xl'} border rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150`}>
                  <button
                    onClick={() => {
                      if (currentChatObj) {
                        setMoveChatModalTarget({
                          chatId: currentChatObj.id,
                          title: activeChatTitle,
                          currentProjectId: currentChatObj.projectId
                        });
                      }
                      setActiveMessageMenuId(null);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs font-semibold ${isDarkMode ? 'text-purple-300 hover:bg-[#211745]' : 'text-purple-700 hover:bg-purple-50'} rounded-xl flex items-center gap-2 cursor-pointer`}
                  >
                    <Folder className="w-3.5 h-3.5 text-purple-400" /> Move Chat to Project
                  </button>
                  <button
                    onClick={() => {
                      setIsProjectsModalOpen(true);
                      setActiveMessageMenuId(null);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs font-semibold ${isDarkMode ? 'text-indigo-300 hover:bg-[#211745]' : 'text-indigo-700 hover:bg-indigo-50'} rounded-xl flex items-center gap-2 cursor-pointer`}
                  >
                    <FolderPlus className="w-3.5 h-3.5 text-indigo-400" /> Manage Projects
                  </button>
                  <div className={`my-1 border-t ${isDarkMode ? 'border-[#302166]' : 'border-slate-100'}`} />
                  <button
                    onClick={() => {
                      if (navigator.share) {
                        const allText = messages.map(m => `${m.role === 'user' ? 'User' : 'Arohi AI'}: ${m.content}`).join('\n\n');
                        navigator.share({
                          title: activeChatTitle || 'Arohi AI Conversation',
                          text: allText
                        }).catch(() => {});
                      } else {
                        const allText = messages.map(m => `${m.role === 'user' ? 'User' : 'Arohi AI'}: ${m.content}`).join('\n\n');
                        navigator.clipboard.writeText(allText);
                        alert('Conversation copied to clipboard!');
                      }
                      setActiveMessageMenuId(null);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs font-semibold ${isDarkMode ? 'text-purple-300 hover:bg-[#211745]' : 'text-purple-700 hover:bg-purple-50'} rounded-xl flex items-center gap-2`}
                  >
                    <Share2 className="w-3.5 h-3.5 text-purple-400" /> Share Conversation
                  </button>
                  <button
                    onClick={() => {
                      const allText = messages.map(m => `### ${m.role === 'user' ? 'User' : 'Arohi AI'}\n${m.content}`).join('\n\n---\n\n');
                      exportToPDF(activeChatTitle || 'Arohi_Conversation', 'Arohi AI Conversation Transcript', allText);
                      setActiveMessageMenuId(null);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs font-semibold ${isDarkMode ? 'text-cyan-300 hover:bg-[#211745]' : 'text-cyan-700 hover:bg-cyan-50'} rounded-xl flex items-center gap-2`}
                  >
                    <Download className="w-3.5 h-3.5 text-cyan-400" /> Download PDF
                  </button>
                  <div className={`my-1 border-t ${isDarkMode ? 'border-[#302166]' : 'border-slate-100'}`} />
                  <button
                    onClick={() => {
                      setIsMemoryModalOpen(true);
                      setActiveMessageMenuId(null);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs font-semibold ${isDarkMode ? 'text-amber-300 hover:bg-[#211745]' : 'text-amber-800 hover:bg-amber-50'} rounded-xl flex items-center gap-2`}
                  >
                    <Brain className="w-3.5 h-3.5 text-amber-500" /> Personalization Memory
                  </button>
                  <button
                    onClick={() => {
                      handleSummarizeChat();
                      setActiveMessageMenuId(null);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs font-semibold ${isDarkMode ? 'text-slate-200 hover:bg-[#211745] hover:text-white' : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'} rounded-xl flex items-center gap-2`}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Generate AI Summary
                  </button>
                  <button
                    onClick={() => {
                      setMessages([messages[0]]);
                      setActiveMessageMenuId(null);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs font-semibold ${isDarkMode ? 'text-slate-200 hover:bg-[#211745] hover:text-white' : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'} rounded-xl flex items-center gap-2`}
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-blue-500" /> Clear Messages
                  </button>
                  {onMinimize && (
                    <button
                      onClick={() => {
                        onMinimize();
                        setActiveMessageMenuId(null);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs font-semibold ${isDarkMode ? 'text-slate-200 hover:bg-[#211745] hover:text-white' : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'} rounded-xl flex items-center gap-2`}
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
                      className="w-full text-left px-3 py-2 text-xs font-semibold text-rose-500 hover:bg-rose-500/10 rounded-xl flex items-center gap-2"
                    >
                      <X className="w-3.5 h-3.5" /> Close Chat
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Messages Canvas Container */}
        <div ref={messagesContainerRef} className={`flex-1 overflow-y-auto px-4 sm:px-8 md:px-12 py-6 space-y-8 ${isDarkMode ? 'bg-[#000000]' : 'bg-[#f8f9fe]'}`}>
          {messages.map((msg) => {
            const summaryParsed = msg.role === 'assistant'
              ? parseMessageCallSummary(msg.content)
              : { cleanedContent: msg.content, summaryData: null };

            const resumeParsed = msg.role === 'assistant' 
              ? parseMessageResume(summaryParsed.cleanedContent) 
              : { cleanedContent: msg.content, resumeData: null };

            const parsed = msg.role === 'assistant'
              ? parseMessageMcpPayload(resumeParsed.cleanedContent)
              : { cleanedContent: msg.content, mcpData: null };

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
                    <div className="flex items-center gap-2">
                      <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-extrabold tracking-wide ${
                        isDarkMode 
                          ? 'bg-gradient-to-r from-purple-950/90 via-[#22134a] to-indigo-950/90 text-purple-200 border border-purple-500/40 shadow-[0_0_12px_rgba(168,85,247,0.2)]' 
                          : 'bg-purple-100 text-purple-950 border border-purple-300 shadow-xs'
                      }`}>
                        <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>Arohi Xaldra 7.0</span>
                      </div>
                    </div>
                  ) : (
                    <div className={`flex items-center gap-1.5 text-xs font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                      <span>You</span>
                    </div>
                  )}
                  <span className={`text-[10px] ${isDarkMode ? 'text-slate-500' : 'text-slate-400'} font-medium`}>{msg.timestamp}</span>
                </div>

                {/* Message Content Container */}
                <div className={`w-full text-left ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-r from-[#7c3aed] to-[#9333ea] text-white p-4 sm:p-5 rounded-2xl rounded-tr-xs shadow-lg max-w-[85%]'
                    : (isDarkMode ? 'text-slate-100 p-1 sm:p-2 font-normal text-base leading-relaxed' : 'text-slate-800 p-1 sm:p-2 font-normal text-base leading-relaxed')
                }`}>
                  {/* Parse standard markdown formatting */}
                  <div className={`prose ${
                    isDarkMode 
                      ? 'prose-invert prose-p:text-slate-100 prose-p:leading-relaxed prose-li:text-slate-100 prose-strong:text-[#c084fc] prose-strong:font-bold prose-headings:text-white text-slate-100' 
                      : 'prose-p:text-slate-800 prose-p:leading-relaxed prose-li:text-slate-800 prose-strong:text-purple-900 prose-strong:font-bold prose-headings:text-slate-900 text-slate-800'
                  } max-w-none text-sm sm:text-base leading-relaxed ${
                    msg.role === 'assistant' ? 'font-sans tracking-wide space-y-3' : 'text-white'
                  }`}>
                    {msg.role === 'assistant' && msg.isStreaming && !parsed.cleanedContent ? (
                      <div className={`flex items-center gap-2.5 text-xs font-semibold ${isDarkMode ? 'text-violet-300' : 'text-purple-700'} py-1`}>
                        <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center text-white shadow-md animate-spin shrink-0">
                          <Sparkles className="w-2.5 h-2.5" />
                        </div>
                        <span className="animate-pulse">AROHI is analyzing and formulating response...</span>
                      </div>
                    ) : (
                      <>
                        {renderMarkdown(parsed.cleanedContent, isDarkMode, onNavigateTab)}
                        {msg.role === 'assistant' && msg.isStreaming && (
                          <span className="inline-block w-2 h-4 ml-1 bg-amber-400 animate-pulse rounded-xs align-middle" />
                        )}
                      </>
                    )}
                  </div>

                  {resumeParsed.resumeData && (
                    <div className={`mt-4 p-4 rounded-2xl ${isDarkMode ? 'bg-gradient-to-br from-[#1b1342] to-[#25155c] border-[#a78bfa]/40' : 'bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200'} border shadow-xl flex flex-col sm:flex-row items-center justify-between gap-3 text-left`}>
                      <div className="flex items-center gap-3">
                        <div className={`p-2 ${isDarkMode ? 'bg-[#7c3aed]/30 text-[#c084fc] border-[#7c3aed]/50' : 'bg-purple-100 text-purple-700 border-purple-200'} rounded-xl border shrink-0`}>
                          <Briefcase className={`w-5 h-5 ${isDarkMode ? 'text-indigo-300' : 'text-purple-700'}`} />
                        </div>
                        <div>
                          <h4 className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'} uppercase tracking-wider`}>Download Word Resume</h4>
                          <p className={`text-[10px] ${isDarkMode ? 'text-slate-300' : 'text-slate-600'} mt-0.5 font-semibold`}>Professional Microsoft Word (.docx) layout ready for HR</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDownloadResumeDocx(resumeParsed.resumeData, msg.id)}
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

                  {parsed.mcpData && (
                    <McpApprovalCard payload={parsed.mcpData} isDarkMode={isDarkMode} />
                  )}

                  {msg.role === 'assistant' && !msg.isStreaming && parsed.cleanedContent && (
                    <InChatMessageQuiz
                      content={parsed.cleanedContent}
                      isDarkMode={isDarkMode}
                      onLaunchFullCbt={() => {
                        if (onNavigateTab) onNavigateTab('mocktests');
                      }}
                    />
                  )}
                </div>

                {/* GEMINI-STYLE ACTION BAR UNDER AI RESPONSES */}
                {msg.role === 'assistant' && (
                  <div className={`flex items-center gap-2 mt-2 px-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    {/* Thumbs Up */}
                    <button
                      onClick={() => toggleLikeMessage(msg.id)}
                      className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                        isDarkMode 
                          ? (isLiked ? 'text-[#c084fc] bg-[#1a1435]' : 'hover:bg-[#1a1435] hover:text-white')
                          : (isLiked ? 'text-purple-700 bg-purple-100' : 'hover:bg-slate-200 hover:text-slate-900')
                      }`}
                      title="Good response"
                    >
                      <ThumbsUp className="w-4 h-4" />
                    </button>

                    {/* Thumbs Down */}
                    <button
                      onClick={() => toggleDislikeMessage(msg.id)}
                      className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                        isDarkMode
                          ? (isDisliked ? 'text-rose-400 bg-[#1a1435]' : 'hover:bg-[#1a1435] hover:text-white')
                          : (isDisliked ? 'text-rose-600 bg-rose-100' : 'hover:bg-slate-200 hover:text-slate-900')
                      }`}
                      title="Bad response"
                    >
                      <ThumbsDown className="w-4 h-4" />
                    </button>

                    {/* Copy Button */}
                    <button
                      onClick={() => copyMessageToClipboard(msg.id, parsed.cleanedContent)}
                      className={`p-1.5 rounded-full ${isDarkMode ? 'hover:bg-[#1a1435] hover:text-white' : 'hover:bg-slate-200 hover:text-slate-900'} transition-colors cursor-pointer flex items-center gap-1`}
                      title="Copy response"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-500" />
                          <span className="text-[10px] text-emerald-500 font-bold">Copied!</span>
                        </>
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>

                    {/* Text to Speech Button */}
                    <button
                      onClick={() => speakMessage(msg.id, parsed.cleanedContent)}
                      className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                        isSpeaking 
                          ? (isDarkMode ? 'text-amber-400 bg-[#1a1435] animate-pulse' : 'text-amber-600 bg-amber-100 animate-pulse')
                          : (isDarkMode ? 'hover:bg-[#1a1435] hover:text-white' : 'hover:bg-slate-200 hover:text-slate-900')
                      }`}
                      title={isSpeaking ? "Stop speech" : "Read aloud"}
                    >
                      {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>

                    {/* More Action dropdown */}
                    <div className="relative">
                      <button
                        onClick={() => setActiveMessageMenuId(activeMessageMenuId === msg.id ? null : msg.id)}
                        className={`p-1.5 rounded-full ${isDarkMode ? 'hover:bg-[#1a1435] hover:text-white' : 'hover:bg-slate-200 hover:text-slate-900'} transition-colors cursor-pointer`}
                        title="More options"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </button>

                      {activeMessageMenuId === msg.id && (
                        <div className={`absolute left-0 bottom-8 w-48 ${isDarkMode ? 'bg-[#120c2b] border-[#302166] text-slate-200' : 'bg-white border-slate-200 text-slate-700 shadow-xl'} border rounded-2xl p-1.5 z-30 animate-in fade-in zoom-in-95 duration-150`}>
                          {/* Image specific Share and Download buttons */}
                          {(() => {
                            const imgMatch = msg.content.match(/!\[(.*?)\]\((.*?)\)/);
                            if (imgMatch) {
                              const altText = imgMatch[1] || 'arohi-artwork';
                              const imgSrc = imgMatch[2];
                              return (
                                <>
                                  <button
                                    onClick={() => {
                                      shareArohiImage(imgSrc, altText);
                                      setActiveMessageMenuId(null);
                                    }}
                                    className={`w-full text-left px-3 py-1.5 text-xs font-semibold ${isDarkMode ? 'text-purple-300 hover:bg-[#211745] hover:text-white' : 'text-purple-700 hover:bg-purple-50 hover:text-purple-900'} rounded-xl flex items-center gap-2 cursor-pointer`}
                                  >
                                    <Share2 className="w-3.5 h-3.5 text-purple-400" /> Share Image
                                  </button>
                                  <button
                                    onClick={() => {
                                      downloadArohiImage(imgSrc, `${altText.replace(/\s+/g, '_')}.jpg`);
                                      setActiveMessageMenuId(null);
                                    }}
                                    className={`w-full text-left px-3 py-1.5 text-xs font-semibold ${isDarkMode ? 'text-cyan-300 hover:bg-[#211745] hover:text-white' : 'text-cyan-700 hover:bg-cyan-50 hover:text-cyan-900'} rounded-xl flex items-center gap-2 cursor-pointer`}
                                  >
                                    <Download className="w-3.5 h-3.5 text-cyan-400" /> Download Image
                                  </button>
                                  <div className={`my-1 border-t ${isDarkMode ? 'border-[#302166]' : 'border-slate-100'}`} />
                                </>
                              );
                            }
                            return (
                              <button
                                onClick={() => {
                                  if (navigator.share) {
                                    navigator.share({
                                      title: 'Arohi AI Response',
                                      text: parsed.cleanedContent
                                    }).catch(() => {});
                                  } else {
                                    navigator.clipboard.writeText(parsed.cleanedContent);
                                    alert('Response copied to clipboard!');
                                  }
                                  setActiveMessageMenuId(null);
                                }}
                                className={`w-full text-left px-3 py-1.5 text-xs font-semibold ${isDarkMode ? 'text-purple-300 hover:bg-[#211745] hover:text-white' : 'text-purple-700 hover:bg-purple-50 hover:text-purple-900'} rounded-xl flex items-center gap-2 cursor-pointer`}
                              >
                                <Share2 className="w-3.5 h-3.5 text-purple-400" /> Share Text
                              </button>
                            );
                          })()}

                          <button
                            onClick={() => {
                              exportToPDF('Arohi_AI_Response', 'Arohi AI Response Document', parsed.cleanedContent);
                              setActiveMessageMenuId(null);
                            }}
                            className={`w-full text-left px-3 py-1.5 text-xs font-semibold ${isDarkMode ? 'text-slate-200 hover:bg-[#211745] hover:text-white' : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'} rounded-xl flex items-center gap-2 cursor-pointer`}
                          >
                            <FileText className="w-3.5 h-3.5 text-rose-500" /> Export PDF
                          </button>
                          <button
                            onClick={() => {
                              exportToWord('Arohi_AI_Response', 'Arohi AI Response Document', parsed.cleanedContent);
                              setActiveMessageMenuId(null);
                            }}
                            className={`w-full text-left px-3 py-1.5 text-xs font-semibold ${isDarkMode ? 'text-slate-200 hover:bg-[#211745] hover:text-white' : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'} rounded-xl flex items-center gap-2 cursor-pointer`}
                          >
                            <FileText className="w-3.5 h-3.5 text-blue-500" /> Export DOCX
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && !messages.some(m => m.isStreaming) && (
            <div className={`flex items-center gap-3 max-w-4xl mx-auto w-full py-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center text-white shadow-md animate-spin">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className={`text-xs sm:text-sm font-semibold ${isDarkMode ? 'text-violet-300' : 'text-purple-700'} animate-pulse`}>
                AROHI is analyzing and formulating response...
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* GEMINI AMBIENT AURA FLOATING BOTTOM DOCK BAR */}
        <div className="p-3 sm:p-4 max-w-4xl mx-auto w-full z-20">
          
          {uploadedFileName && (
            <div className={`mb-2 px-3 py-1.5 ${isDarkMode ? 'bg-[#1b123d] text-violet-200 border-[#4c31a5]' : 'bg-purple-50 text-purple-900 border-purple-200'} text-xs font-semibold rounded-2xl flex items-center justify-between border`}>
              <span className="truncate flex items-center gap-1.5">
                <Paperclip className={`w-3.5 h-3.5 ${isDarkMode ? 'text-violet-400' : 'text-purple-600'}`} /> File attached: {uploadedFileName}
              </span>
              <button 
                onClick={() => setUploadedFileName(null)}
                className="text-[10px] font-bold text-rose-500 hover:underline uppercase cursor-pointer"
              >
                Remove
              </button>
            </div>
          )}

          {/* Active Voice Input Banner */}
          {recording && (
            <div className="mb-2 px-3.5 py-2 rounded-2xl bg-gradient-to-r from-rose-950/90 via-purple-950/90 to-indigo-950/90 border border-rose-500/50 shadow-xl backdrop-blur-md flex items-center justify-between gap-2.5 animate-fadeIn">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="relative flex h-3 w-3 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
                </span>
                <div className="min-w-0">
                  <span className="text-[11px] font-black text-rose-300 uppercase tracking-wider block">
                    Listening ({language.toUpperCase()})...
                  </span>
                  <p className="text-xs text-white font-medium truncate max-w-[280px] sm:max-w-[400px]">
                    {input ? `"${input}"` : "Speak clearly into your microphone..."}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={toggleRecording}
                className="text-[10px] uppercase tracking-wider font-black px-3 py-1 rounded-xl bg-rose-600 hover:bg-rose-500 text-white transition-all cursor-pointer shrink-0 shadow-md hover:scale-105 active:scale-95"
              >
                Done
              </button>
            </div>
          )}

          {/* Arohi Xaldra 7.0 Model Indicator Watermark */}
          <div className="flex items-center justify-between px-3.5 pb-1.5 text-[11px]">
            <div className="flex items-center gap-1.5 font-semibold select-none">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span className={isDarkMode ? 'text-slate-400' : 'text-slate-500'}>Model:</span>
              <span className="font-extrabold bg-gradient-to-r from-purple-400 via-violet-300 to-indigo-300 bg-clip-text text-transparent">
                Arohi Xaldra 7.0
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 text-[10px] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block"></span>
              <span className={isDarkMode ? 'text-emerald-400/90 font-semibold' : 'text-emerald-700 font-semibold'}>Zero-Downtime Active</span>
            </div>
          </div>

          {/* Floating Gemini Capsule Dock */}
          <div className={`${
            recording
              ? 'bg-rose-950/30 border-rose-500/70 shadow-[0_0_25px_rgba(244,63,94,0.35)] ring-2 ring-rose-500/40'
              : isDarkMode 
                ? 'bg-[#0e0a21]/90 border-[#2b2158] shadow-[0_10px_35px_rgba(0,0,0,0.8)]' 
                : 'bg-white/95 border-purple-200/90 shadow-[0_10px_30px_rgba(124,58,237,0.12)]'
          } backdrop-blur-2xl border rounded-full p-2 sm:p-2.5 flex items-center gap-2 transition-all`}>
            
            {/* Camera / Vision Stream Button */}
            <label className={`p-2.5 sm:p-3 ${isDarkMode ? 'bg-[#181136] hover:bg-[#271c54] text-slate-300 hover:text-white' : 'bg-slate-100 hover:bg-purple-50 text-slate-600 hover:text-purple-700'} rounded-full transition-colors cursor-pointer shrink-0`} title="Camera / Vision Upload">
              <Camera className="w-4 h-4 sm:w-5 sm:h-5" />
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleFileUpload} 
                className="hidden" 
              />
            </label>

            {/* Document Upload Button */}
            <label className={`p-2.5 sm:p-3 ${isDarkMode ? 'bg-[#181136] hover:bg-[#271c54] text-slate-300 hover:text-white' : 'bg-slate-100 hover:bg-purple-50 text-slate-600 hover:text-purple-700'} rounded-full transition-colors cursor-pointer shrink-0`} title="Attach Document">
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
              placeholder={recording ? "Listening... Speak now 🎙️" : "Tell me what you want to achieve..."}
              value={input}
              onChange={(e) => setInput(e?.target?.value ?? "")}
              onKeyDown={handleKeyPress}
              className={`flex-1 min-w-0 bg-transparent px-2 sm:px-3 py-2 text-sm ${
                recording 
                  ? 'text-rose-400 dark:text-rose-300 font-bold placeholder-rose-400/80 animate-pulse'
                  : isDarkMode ? 'text-white placeholder-slate-400' : 'text-slate-900 placeholder-slate-400'
              } focus:outline-none font-medium`}
            />

            {/* Microphone Speech to Text Button */}
            <button
              onClick={toggleRecording}
              className={`p-2.5 sm:p-3 rounded-full transition-all shrink-0 cursor-pointer ${
                recording 
                  ? 'bg-rose-600 text-white animate-pulse shadow-[0_0_15px_rgba(244,63,94,0.6)] ring-4 ring-rose-500/40' 
                  : (isDarkMode ? 'bg-[#181136] hover:bg-[#271c54] text-slate-300 hover:text-white' : 'bg-slate-100 hover:bg-purple-50 text-slate-600 hover:text-purple-700')
              }`}
              title={recording ? "Stop listening" : "Speech to text (Voice Input)"}
            >
              <Mic className={`w-4 h-4 sm:w-5 sm:h-5 ${recording ? 'animate-bounce' : ''}`} />
            </button>

            {/* Send Button */}
            <button
              onClick={() => handleSendMessage()}
              disabled={(!input.trim() && !uploadedFileName) || isLoading}
              className={`p-2.5 sm:p-3 bg-[#7c3aed] hover:bg-[#6d28d9] ${isDarkMode ? 'disabled:bg-[#181230] disabled:text-slate-600' : 'disabled:bg-slate-200 disabled:text-slate-400'} text-white rounded-full shadow-md cursor-pointer disabled:cursor-not-allowed transition-all shrink-0 flex items-center justify-center`}
            >
              <Send className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          <div className={`mt-2 text-center text-[10px] ${isDarkMode ? 'text-slate-500' : 'text-slate-500'} font-medium flex items-center justify-center gap-2`}>
            <span>Arohi Xaldra 7.0</span>
            <span>•</span>
            <span>Arohi AI Universal Ecosystem</span>
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
              onChange={(e) => setNewNotebookTitle(e?.target?.value ?? "")}
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
                      onChange={(e) => setStudioPrompt(e?.target?.value ?? "")}
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
                        onChange={(e) => setStudioEditInstruction(e?.target?.value ?? "")}
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
                      onChange={(e) => setMusicPrompt(e?.target?.value ?? "")}
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
                      onChange={(e) => setVideoPrompt(e?.target?.value ?? "")}
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
                      onChange={(e) => setDocResearchPrompt(e?.target?.value ?? "")}
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
                          onChange={(e) => setMapsOrigin(e?.target?.value ?? "")}
                          placeholder="e.g. Connaught Place, New Delhi"
                          className="w-full bg-[#131d33] border border-[#223354] rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-slate-400 mb-1 block">Destination Point</label>
                        <input
                          type="text"
                          value={mapsDestination}
                          onChange={(e) => setMapsDestination(e?.target?.value ?? "")}
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
                        onChange={(e) => setMapsPrompt(e?.target?.value ?? "")}
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
                      onChange={(e) => setIntelligenceContent(e?.target?.value ?? "")}
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
                      onChange={(e) => setIntelligenceInstruction(e?.target?.value ?? "")}
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

      {/* USER PERSONALIZATION MEMORY MANAGER MODAL */}
      {isMemoryModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0f0a24] border border-[#3b2a80] rounded-3xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#18103c] to-[#261559] px-6 py-4 border-b border-[#3b2a80] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-amber-500/20 rounded-2xl border border-amber-500/40 text-amber-300">
                  <Brain className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    User Personalization Manager
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
                      System Context Sync Active
                    </span>
                  </h3>
                  <p className="text-xs text-slate-300">
                    Arohi AI Memory State loaded from Firestore & AuthContext
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsMemoryModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-[#3b2a80]/50 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-200">
              {/* Profile Context Banner */}
              <div className="bg-gradient-to-br from-[#1c1346] to-[#120a2e] p-4 rounded-2xl border border-[#3b2a80] space-y-3">
                <div className="flex items-center justify-between border-b border-[#3b2a80]/60 pb-2">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-purple-400" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">Active Memory Profile</span>
                  </div>
                  <button
                    onClick={async () => {
                      setIsRefreshingMemory(true);
                      await refreshPersonalizationMemory();
                      setIsRefreshingMemory(false);
                    }}
                    disabled={isRefreshingMemory}
                    className="flex items-center gap-1.5 text-xs text-amber-300 hover:text-amber-200 bg-amber-500/10 hover:bg-amber-500/20 px-2.5 py-1 rounded-xl border border-amber-500/30 transition-all cursor-pointer"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isRefreshingMemory ? 'animate-spin' : ''}`} />
                    <span>Sync Firestore</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400">User: </span>
                    <span className="text-white font-semibold">{userMemory?.displayName || user?.displayName || 'Honored Guest'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Email: </span>
                    <span className="text-white font-semibold">{userMemory?.email || user?.email || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Active Goal: </span>
                    <span className="text-amber-300 font-semibold">{userMemory?.activeGoal || 'Career Upskilling'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Education: </span>
                    <span className="text-white font-semibold">{userMemory?.education || 'Graduate'}</span>
                  </div>
                </div>
              </div>

              {/* Memory Metrics */}
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 bg-[#181138] rounded-2xl border border-[#3b2a80]/60">
                  <div className="text-xl font-extrabold text-amber-300">{userMemory?.totalChatsCount || 0}</div>
                  <div className="text-[11px] text-slate-400 font-medium">Text Conversations</div>
                </div>
                <div className="p-3 bg-[#181138] rounded-2xl border border-[#3b2a80]/60">
                  <div className="text-xl font-extrabold text-emerald-400">{userMemory?.totalCallsCount || 0}</div>
                  <div className="text-[11px] text-slate-400 font-medium">Voice Calls</div>
                </div>
                <div className="p-3 bg-[#181138] rounded-2xl border border-[#3b2a80]/60">
                  <div className="text-xl font-extrabold text-purple-300">{userMemory?.pastInteractionLogs?.length || 0}</div>
                  <div className="text-[11px] text-slate-400 font-medium">Recorded Logs</div>
                </div>
              </div>

              {/* Past Interaction Logs */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <History className="w-4 h-4 text-amber-400" />
                  Past Interaction Memory Logs ({userMemory?.pastInteractionLogs?.length || 0})
                </h4>

                {(!userMemory?.pastInteractionLogs || userMemory.pastInteractionLogs.length === 0) ? (
                  <div className="p-4 rounded-2xl bg-[#140d30] border border-[#2b1f59] text-center text-xs text-slate-400">
                    No past interaction logs recorded yet. Start chatting or call Arohi AI to create memory logs!
                  </div>
                ) : (
                  <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                    {userMemory.pastInteractionLogs.map((log) => (
                      <div key={log.id} className="p-3 rounded-2xl bg-[#150e33] border border-[#2d1e5e] hover:border-amber-500/40 transition-all text-xs space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white flex items-center gap-1.5">
                            {log.type === 'chat' && <Sparkles className="w-3.5 h-3.5 text-purple-400" />}
                            {log.type === 'call' && <Phone className="w-3.5 h-3.5 text-emerald-400" />}
                            {log.type === 'activity' && <Zap className="w-3.5 h-3.5 text-amber-400" />}
                            {log.type === 'application' && <Briefcase className="w-3.5 h-3.5 text-indigo-400" />}
                            {log.title}
                          </span>
                          <span className="text-[10px] text-slate-400 bg-[#21174a] px-2 py-0.5 rounded-full">{log.date}</span>
                        </div>
                        <p className="text-slate-300 text-[11px] leading-relaxed line-clamp-2">{log.summary}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* System Level Prompt Preview */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-emerald-400" />
                  Live System Context Memory Prompt
                </h4>
                <div className="p-3 bg-[#0a061a] border border-[#23174a] rounded-2xl text-[11px] font-mono text-slate-300 overflow-x-auto whitespace-pre-wrap max-h-40 overflow-y-auto">
                  {userMemory?.summaryContext || 'Initializing user memory context...'}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-[#120a2e] px-6 py-3 border-t border-[#3b2a80] flex items-center justify-between">
              <span className="text-xs text-slate-400 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>Encrypted & Persisted in Firestore Collection</span>
              </span>
              <button
                onClick={() => setIsMemoryModalOpen(false)}
                className="px-4 py-2 bg-gradient-to-r from-[#7c3aed] to-[#9333ea] hover:from-[#6d28d9] hover:to-[#7e22ce] text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer"
              >
                Close Memory Inspector
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3D Learning Workspace Modal */}
      {is3DLearningOpen && (
        <Arohi3DLearningWorkspace
          onExit={() => setIs3DLearningOpen(false)}
          initialTopicId={active3DTopic}
          isDarkMode={true}
        />
      )}

      {/* MCP Super-App Gateway Modal */}
      <McpGatewayModal
        isOpen={isMcpGatewayOpen}
        onClose={() => setIsMcpGatewayOpen(false)}
        onSendPromptToChat={(promptText) => handleSendMessage(promptText)}
      />

      {/* MCP Workflow Orchestrator Modal */}
      <McpWorkflowOrchestratorModal
        isOpen={isWorkflowOrchestratorOpen}
        onClose={() => setIsWorkflowOrchestratorOpen(false)}
        onSendPromptToChat={(promptText) => handleSendMessage(promptText)}
      />

      {/* ChatGPT-style Arohi Projects Workspace Modal */}
      <ArohiProjectsModal
        isOpen={isProjectsModalOpen}
        onClose={() => setIsProjectsModalOpen(false)}
        projects={projects}
        savedChats={savedChats}
        activeProjectId={activeProjectId}
        onSelectProject={(projId) => setActiveProjectId(projId)}
        onCreateProject={handleCreateProject}
        onUpdateProject={handleUpdateProject}
        onDeleteProject={handleDeleteProject}
        onStartChatInProject={handleStartChatInProject}
        onMoveChatToProject={handleMoveChatToProject}
        onOpenChat={(chatId) => {
          const found = savedChats.find(c => c.id === chatId);
          if (found) {
            setActiveChatId(found.id);
            setMessages(found.messages);
          }
        }}
        isDarkMode={isDarkMode}
      />

      {/* Move Chat to Project Modal */}
      {moveChatModalTarget && (
        <MoveChatToProjectModal
          isOpen={Boolean(moveChatModalTarget)}
          onClose={() => setMoveChatModalTarget(null)}
          chatId={moveChatModalTarget.chatId}
          chatTitle={moveChatModalTarget.title}
          currentProjectId={moveChatModalTarget.currentProjectId}
          projects={projects}
          onMoveChat={handleMoveChatToProject}
          onCreateProject={handleCreateProject}
          isDarkMode={isDarkMode}
        />
      )}

    </div>
  );
}
