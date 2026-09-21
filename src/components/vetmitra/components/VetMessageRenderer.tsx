import React from 'react';

/**
 * Strips all raw markdown symbols (###, **, *, ---, _, backticks) for clean text-to-speech
 */
export function cleanTextForVoice(text: string): string {
  if (!text) return '';
  return text
    .replace(/^#{1,6}\s*/gm, '') // Remove heading hashes
    .replace(/---+/g, ' ') // Remove horizontal rules
    .replace(/\*\*([^*]+)\*\*/g, '$1') // Remove bold asterisks
    .replace(/\*([^*]+)\*/g, '$1') // Remove italic asterisks
    .replace(/^\s*[\*\-•]\s*/gm, '') // Remove bullet markers
    .replace(/`{1,3}([^`]+)`{1,3}/g, '$1') // Remove code backticks
    .replace(/_{1,2}([^_]+)_{1,2}/g, '$1') // Remove underscores
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/**
 * Parses inline formatting like **bold**, *italic*, stripping the raw symbols
 * and rendering proper React elements with clean styling.
 */
function renderInlineContent(text: string): React.ReactNode[] {
  // Regex to match **bold**, *italic*, and backtick snippets
  const parts: React.ReactNode[] = [];
  const regex = /(\*\*([^*]+)\*\*|\*([^*]+)\*|`([^`]+)`)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    // Push preceding plain text
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }

    if (match[2]) {
      // Bold: match[2]
      parts.push(
        <strong key={`b-${match.index}`} className="font-bold text-slate-950">
          {match[2]}
        </strong>
      );
    } else if (match[3]) {
      // Italic: match[3]
      parts.push(
        <em key={`i-${match.index}`} className="italic text-slate-800">
          {match[3]}
        </em>
      );
    } else if (match[4]) {
      // Code snippet: match[4]
      parts.push(
        <span
          key={`c-${match.index}`}
          className="px-1.5 py-0.5 rounded-md bg-slate-100 font-mono text-xs text-emerald-900 font-semibold border border-slate-200"
        >
          {match[4]}
        </span>
      );
    }

    lastIndex = regex.lastIndex;
  }

  // Push remainder
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts;
}

interface VetMessageRendererProps {
  content: string;
  isUser?: boolean;
}

/**
 * Cleanly renders veterinary messages without raw markdown hashes (###),
 * asterisk clutter (* **Item:**), or raw dashed lines (---).
 * Uses high-contrast, deep dark typography for crisp readability on prescription cards.
 */
export const VetMessageRenderer: React.FC<VetMessageRendererProps> = ({ content, isUser }) => {
  if (!content) return null;

  if (isUser) {
    return (
      <div className="text-sm leading-relaxed whitespace-pre-wrap font-medium text-white">
        {content}
      </div>
    );
  }

  // Split content into lines for structured clean formatting
  const lines = content.split(/\r?\n/);
  const elements: React.ReactNode[] = [];

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    if (!trimmed) {
      // Empty line - add small rhythmic spacing if previous element exists
      if (elements.length > 0) {
        elements.push(<div key={`space-${i}`} className="h-2" />);
      }
      continue;
    }

    // Horizontal Rule: --- or ***
    if (/^[-*_]{3,}$/.test(trimmed)) {
      elements.push(
        <hr key={`hr-${i}`} className="my-3 border-t border-slate-200" />
      );
      continue;
    }

    // Heading 1-4 with ###, ##, #, ####
    if (/^#{1,6}\s+/.test(trimmed)) {
      const headingText = trimmed.replace(/^#{1,6}\s+/, '').trim();
      elements.push(
        <div
          key={`heading-${i}`}
          className="pt-2 pb-1 text-[15px] sm:text-base font-bold text-slate-950 flex items-center gap-2 border-b border-slate-200"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" />
          <span>{renderInlineContent(headingText)}</span>
        </div>
      );
      continue;
    }

    // Numbered Item: e.g. "1. **Title:** text" or "୧. text"
    const numberedMatch = trimmed.match(/^(\d+|[୧-୯]+|[ivx]+)[\.\)]\s+(.*)/i);
    if (numberedMatch) {
      const numLabel = numberedMatch[1];
      const itemBody = numberedMatch[2];
      elements.push(
        <div key={`num-${i}`} className="flex items-start gap-2.5 py-1">
          <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-900 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 border border-emerald-300">
            {numLabel}
          </span>
          <div className="flex-1 text-sm text-slate-900 leading-relaxed font-normal">
            {renderInlineContent(itemBody)}
          </div>
        </div>
      );
      continue;
    }

    // Bullet Item: "* **Label:**" or "- text" or "• text"
    const bulletMatch = trimmed.match(/^[\*\-•]\s+(.*)/);
    if (bulletMatch) {
      const itemBody = bulletMatch[1];
      elements.push(
        <div key={`bullet-${i}`} className="flex items-start gap-2 py-0.5 pl-1">
          <span className="text-emerald-700 font-bold text-sm leading-none mt-1 shrink-0">
            •
          </span>
          <div className="flex-1 text-sm text-slate-900 leading-relaxed font-normal">
            {renderInlineContent(itemBody)}
          </div>
        </div>
      );
      continue;
    }

    // Regular text paragraph
    elements.push(
      <p key={`p-${i}`} className="text-sm text-slate-900 leading-relaxed font-normal">
        {renderInlineContent(trimmed)}
      </p>
    );
  }

  return <div className="space-y-1.5 text-slate-900">{elements}</div>;
};
