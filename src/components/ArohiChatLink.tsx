import React from 'react';
import { Globe, ExternalLink, Mail } from 'lucide-react';

export interface ArohiChatLinkProps {
  href: string;
  label?: string;
  className?: string;
  isDarkMode?: boolean;
}

export function extractAndCleanUrl(raw: string): { url: string; href: string; leadingPunct: string; trailingPunct: string } {
  let str = raw;
  let leadingPunct = '';
  
  // Handle leading parenthesis or space
  const leadingMatch = str.match(/^([\s(]+)(.*)/);
  if (leadingMatch) {
    leadingPunct = leadingMatch[1];
    str = leadingMatch[2];
  }

  let trailingPunct = '';
  // Trim trailing punctuation like . , ; ! ? ) ] " '
  while (/[.,;!?:)"'\]]$/.test(str)) {
    trailingPunct = str.slice(-1) + trailingPunct;
    str = str.slice(0, -1);
  }

  let href = str;
  if (href.startsWith('www.')) {
    href = 'https://' + href;
  }

  return { url: str, href, leadingPunct, trailingPunct };
}

export const ArohiChatLink: React.FC<ArohiChatLinkProps> = ({ href, label, className = '', isDarkMode = true }) => {
  let cleanHref = href.trim();
  if (cleanHref.startsWith('www.')) {
    cleanHref = 'https://' + cleanHref;
  }

  const isMail = cleanHref.startsWith('mailto:');
  const isHash = cleanHref.startsWith('#');
  
  // Extract domain for badge/display
  let domain = '';
  if (!isHash) {
    try {
      const urlObj = new URL(cleanHref);
      domain = urlObj.hostname.replace(/^www\./, '');
    } catch (e) {
      domain = cleanHref.replace(/^https?:\/\//, '').split('/')[0].split('?')[0];
    }
  }

  const isRaw = !label || label === href || label === cleanHref || label.startsWith('http://') || label.startsWith('https://') || label.startsWith('www.');
  
  // Format clean display label for raw URLs vs custom text
  let displayLabel = label || href;
  if (isRaw && !isHash) {
    try {
      const urlObj = new URL(cleanHref);
      const path = urlObj.pathname + urlObj.search;
      displayLabel = domain + (path !== '/' && path.length < 35 ? path : (path !== '/' ? path.slice(0, 32) + '...' : ''));
    } catch (e) {
      displayLabel = domain || href;
    }
  }

  if (isHash) {
    const tabName = cleanHref.replace('#', '').trim();
    return (
      <a
        href={cleanHref}
        onClick={(e) => {
          e.preventDefault();
          window.dispatchEvent(new CustomEvent('arohi_navigate_tab', { detail: tabName }));
          const targetEl = document.getElementById(tabName);
          if (targetEl) targetEl.scrollIntoView({ behavior: 'smooth' });
        }}
        title={`Navigate to ${displayLabel}`}
        className={`inline-flex items-center gap-1.5 px-3 py-1 my-0.5 mx-0.5 rounded-xl font-black text-xs tracking-wider transition-all duration-200 active:scale-95 no-underline cursor-pointer align-middle border ${
          isDarkMode
            ? 'bg-gradient-to-r from-purple-900/90 via-indigo-900/90 to-purple-950/90 hover:from-purple-800 hover:to-indigo-800 text-purple-200 border-purple-400/50 shadow-md'
            : 'bg-purple-100 hover:bg-purple-200 text-purple-950 border-purple-300 shadow-xs'
        } ${className}`}
      >
        <span className="truncate max-w-[240px] sm:max-w-[420px] leading-tight">{displayLabel}</span>
        <ExternalLink className="w-3 h-3 text-purple-300 shrink-0" />
      </a>
    );
  }

  return (
    <a
      href={cleanHref}
      target={isMail ? '_self' : '_blank'}
      rel="noopener noreferrer"
      title={`Open ${cleanHref}`}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 my-0.5 mx-0.5 rounded-lg font-bold text-xs sm:text-sm tracking-wide transition-all duration-200 active:scale-95 no-underline cursor-pointer align-middle group border ${
        isMail
          ? (isDarkMode
              ? 'bg-gradient-to-r from-rose-950/80 via-pink-950/80 to-amber-950/80 hover:from-rose-900/90 hover:to-amber-900/90 text-rose-200 border-rose-500/50 shadow-md shadow-rose-950/40'
              : 'bg-rose-50 hover:bg-rose-100 text-rose-900 border-rose-300 shadow-xs')
          : (isDarkMode
              ? 'bg-gradient-to-r from-[#1b123d] via-[#241757] to-[#181136] hover:from-[#2a1a63] hover:to-[#20144d] text-amber-300 hover:text-amber-100 border-amber-500/50 hover:border-amber-400 shadow-md shadow-violet-950/40'
              : 'bg-purple-50 hover:bg-purple-100 text-purple-950 hover:text-purple-900 border-purple-300 hover:border-purple-400 shadow-xs')
      } ${className}`}
    >
      {isMail ? (
        <Mail className={`w-3.5 h-3.5 ${isDarkMode ? 'text-rose-400' : 'text-rose-600'} shrink-0`} />
      ) : (
        <Globe className={`w-3.5 h-3.5 ${isDarkMode ? 'text-amber-400' : 'text-purple-600'} shrink-0 group-hover:rotate-12 transition-transform duration-200`} />
      )}

      <span className="truncate max-w-[240px] sm:max-w-[420px] leading-tight">{displayLabel}</span>

      {!isRaw && domain && !isMail && (
        <span className={`text-[10px] font-mono font-medium ${isDarkMode ? 'text-purple-300/80 bg-purple-950/80 border-purple-700/50' : 'text-purple-700 bg-purple-100/90 border-purple-300'} border px-1.5 py-0.2 rounded shrink-0 hidden md:inline-block`}>
          {domain}
        </span>
      )}

      <ExternalLink className={`w-3 h-3 ${isDarkMode ? 'text-amber-400/80' : 'text-purple-500'} shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200`} />
    </a>
  );
};

export function parsePlainSegmentsWithLinks(plainText: string, keyPrefix: string, isDarkMode = true): React.ReactNode[] {
  if (!plainText) return [];

  // Regex to detect raw URLs (https://, http://, www.)
  const urlRegex = /(https?:\/\/[^\s<>()"'\`\]]+|(?:^|[\s(])www\.[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+(?:\/[^\s<>()"'\`\]]*)?)/gi;

  const matches = Array.from(plainText.matchAll(urlRegex));
  if (matches.length === 0) {
    return [plainText];
  }

  const nodes: React.ReactNode[] = [];
  let lastIdx = 0;

  matches.forEach((match, mIdx) => {
    const rawMatch = match[0];
    const matchStart = match.index ?? 0;

    // Text before the URL match
    if (matchStart > lastIdx) {
      nodes.push(plainText.slice(lastIdx, matchStart));
    }

    // Clean and extract URL and surrounding punctuation
    const { url, href, leadingPunct, trailingPunct } = extractAndCleanUrl(rawMatch);

    if (leadingPunct) {
      nodes.push(leadingPunct);
    }

    nodes.push(
      <ArohiChatLink key={`${keyPrefix}-rawurl-${mIdx}`} href={href} label={url} isDarkMode={isDarkMode} />
    );

    if (trailingPunct) {
      nodes.push(trailingPunct);
    }

    lastIdx = matchStart + rawMatch.length;
  });

  if (lastIdx < plainText.length) {
    nodes.push(plainText.slice(lastIdx));
  }

  return nodes;
}
