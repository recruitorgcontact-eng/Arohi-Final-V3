import React, { useState } from 'react';
import { 
  Copy, Check, Download, ExternalLink, ChevronDown, ChevronUp, 
  Code2, Eye, Laptop, Smartphone, RefreshCw, Maximize2, Minimize2,
  FileCode, Play
} from 'lucide-react';

interface ArohiCodeSnippetProps {
  code: string;
  language?: string;
  isDarkMode?: boolean;
}

export const ArohiCodeSnippet: React.FC<ArohiCodeSnippetProps> = ({
  code,
  language = 'text',
  isDarkMode = true
}) => {
  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [iframeKey, setIframeKey] = useState(0);
  const [isFullscreenPreview, setIsFullscreenPreview] = useState(false);

  const cleanLang = (language || 'text').trim().toLowerCase();
  const lineCount = code.split('\n').length;
  const isLongCode = lineCount > 12;

  // Determine standard file extension and file name
  const getFileMetadata = (lang: string, codeContent: string) => {
    switch (lang) {
      case 'html':
      case 'htm':
        return { ext: 'html', filename: 'index.html', label: 'HTML', isWeb: true };
      case 'css':
        return { ext: 'css', filename: 'styles.css', label: 'CSS', isWeb: true };
      case 'javascript':
      case 'js':
        return { ext: 'js', filename: 'script.js', label: 'JavaScript', isWeb: true };
      case 'typescript':
      case 'ts':
        return { ext: 'ts', filename: 'app.ts', label: 'TypeScript', isWeb: false };
      case 'jsx':
        return { ext: 'jsx', filename: 'Component.jsx', label: 'React JSX', isWeb: false };
      case 'tsx':
        return { ext: 'tsx', filename: 'Component.tsx', label: 'React TSX', isWeb: false };
      case 'python':
      case 'py':
        return { ext: 'py', filename: 'main.py', label: 'Python', isWeb: false };
      case 'json':
        return { ext: 'json', filename: 'data.json', label: 'JSON', isWeb: false };
      case 'sql':
        return { ext: 'sql', filename: 'query.sql', label: 'SQL', isWeb: false };
      case 'bash':
      case 'sh':
      case 'shell':
        return { ext: 'sh', filename: 'script.sh', label: 'Shell', isWeb: false };
      case 'c':
        return { ext: 'c', filename: 'main.c', label: 'C', isWeb: false };
      case 'cpp':
      case 'c++':
        return { ext: 'cpp', filename: 'main.cpp', label: 'C++', isWeb: false };
      case 'java':
        return { ext: 'java', filename: 'Main.java', label: 'Java', isWeb: false };
      case 'rust':
      case 'rs':
        return { ext: 'rs', filename: 'main.rs', label: 'Rust', isWeb: false };
      default: {
        // Auto-detect if code looks like HTML
        if (codeContent.includes('<!DOCTYPE html>') || (codeContent.includes('<html') && codeContent.includes('</html>'))) {
          return { ext: 'html', filename: 'index.html', label: 'HTML', isWeb: true };
        }
        return { ext: 'txt', filename: 'code.txt', label: lang ? lang.toUpperCase() : 'CODE', isWeb: false };
      }
    }
  };

  const meta = getFileMetadata(cleanLang, code);
  const isPreviewableWeb = meta.isWeb || meta.ext === 'html';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleDownload = () => {
    try {
      let mimeType = 'text/plain;charset=utf-8';
      if (meta.ext === 'html') mimeType = 'text/html;charset=utf-8';
      else if (meta.ext === 'css') mimeType = 'text/css;charset=utf-8';
      else if (meta.ext === 'js') mimeType = 'text/javascript;charset=utf-8';
      else if (meta.ext === 'json') mimeType = 'application/json;charset=utf-8';

      const blob = new Blob([code], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = meta.filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 2000);
    } catch (e) {
      console.error('Download failed', e);
    }
  };

  // Safe srcDoc content for iframe preview
  const getPreviewDocument = () => {
    if (meta.ext === 'html') {
      // If full document, serve as is; if partial snippet, wrap in responsive HTML5 template
      if (code.includes('<!DOCTYPE') || code.includes('<html')) {
        return code;
      }
      return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-900 text-slate-100 p-4 font-sans antialiased">
  ${code}
</body>
</html>`;
    }
    return code;
  };

  return (
    <div className={`my-3.5 rounded-2xl overflow-hidden border transition-all duration-200 shadow-md ${
      isDarkMode 
        ? 'bg-zinc-950 border-zinc-800/90 text-zinc-100 shadow-black/40' 
        : 'bg-zinc-900 border-zinc-700 text-zinc-100 shadow-zinc-400/20'
    }`}>
      {/* Top Header Tab */}
      <div className="flex items-center justify-between px-3.5 py-2.5 bg-zinc-900/95 border-b border-zinc-800 text-xs font-mono select-none">
        {/* Left info: Language badge & File designation */}
        <div className="flex items-center gap-2 min-w-0">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-semibold tracking-wider uppercase text-[11px]">
            <Code2 className="w-3.5 h-3.5 shrink-0" />
            <span>{meta.label}</span>
          </div>
          <span className="text-zinc-400 truncate text-[12px] font-medium" title={meta.filename}>
            {meta.filename}
          </span>
          <span className="text-zinc-600 hidden sm:inline text-[11px]">
            • {lineCount} {lineCount === 1 ? 'line' : 'lines'}
          </span>
        </div>

        {/* Right action icons: Expand/Squeeze, Copy, Download */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Squeeze / Expand Toggle */}
          {isLongCode && (
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-sans text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors border border-transparent hover:border-zinc-700 cursor-pointer"
              title={isExpanded ? "Squeeze (collapse) code" : "Expand full code"}
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="w-3.5 h-3.5 text-zinc-400" />
                  <span className="text-[11px] font-medium hidden sm:inline">Squeeze</span>
                </>
              ) : (
                <>
                  <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
                  <span className="text-[11px] font-medium hidden sm:inline">Expand</span>
                </>
              )}
            </button>
          )}

          {/* Copy Button */}
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-sans bg-zinc-800/80 hover:bg-zinc-750 text-zinc-200 hover:text-white transition-all border border-zinc-700/60 cursor-pointer active:scale-95"
            title="Copy code to clipboard"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-[11px] font-medium text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-zinc-400" />
                <span className="text-[11px] font-medium">Copy</span>
              </>
            )}
          </button>

          {/* Direct File Download Button */}
          <button
            type="button"
            onClick={handleDownload}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-sans font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm transition-all border border-emerald-400/30 cursor-pointer active:scale-95"
            title={`Download ${meta.filename} directly`}
          >
            {downloaded ? (
              <>
                <Check className="w-3.5 h-3.5 text-white" />
                <span className="text-[11px]">Saved</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5 text-white" />
                <span className="text-[11px]">Download</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Viewer Body (Expandable & Squeezable) */}
      <div className="relative">
        <pre
          className={`p-4 font-mono text-[13px] sm:text-[13.5px] leading-relaxed overflow-x-auto text-zinc-200 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent ${
            isLongCode && !isExpanded ? 'max-h-[260px] overflow-y-hidden' : 'max-h-[680px] overflow-y-auto'
          }`}
        >
          <code>{code}</code>
        </pre>

        {/* Gradient fade and Quick Expand Button when Squeezed */}
        {isLongCode && !isExpanded && (
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-zinc-950 via-zinc-950/85 to-transparent flex items-end justify-center pb-2.5 pointer-events-auto">
            <button
              type="button"
              onClick={() => setIsExpanded(true)}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white border border-zinc-600/80 shadow-lg transition-all active:scale-95 cursor-pointer backdrop-blur-sm"
            >
              <ChevronDown className="w-3.5 h-3.5 text-emerald-400" />
              <span>Expand all {lineCount} lines</span>
            </button>
          </div>
        )}
      </div>

      {/* Bottom Action Strip: Website Preview Button & Download shortcuts */}
      {isPreviewableWeb && (
        <div className="px-3.5 py-2.5 bg-zinc-900/90 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowPreview(!showPreview)}
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-semibold text-xs transition-all duration-200 active:scale-95 cursor-pointer border ${
                showPreview
                  ? 'bg-purple-600 hover:bg-purple-500 text-white border-purple-400/50 shadow-md shadow-purple-900/30'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-400/40 shadow-sm shadow-emerald-950/40'
              }`}
            >
              {showPreview ? (
                <>
                  <Eye className="w-4 h-4" />
                  <span>Hide Website Preview</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white" />
                  <span>Website Preview</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-medium text-xs text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-750 border border-zinc-700 transition-all cursor-pointer"
            >
              <FileCode className="w-3.5 h-3.5 text-emerald-400" />
              <span>Get {meta.filename}</span>
            </button>
          </div>

          <span className="text-[11px] text-zinc-400 hidden sm:inline">
            Directly openable in Chrome, Safari & Edge
          </span>
        </div>
      )}

      {/* Embedded Live Website Preview Sandbox */}
      {isPreviewableWeb && showPreview && (
        <div className="border-t border-zinc-800 bg-zinc-950 p-3 sm:p-4">
          {/* Preview Toolbar */}
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-800/70 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-semibold text-zinc-200 text-xs tracking-wide">
                Live Interactive Sandbox
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Responsive Device Switcher */}
              <div className="flex items-center bg-zinc-900 p-0.5 rounded-lg border border-zinc-800">
                <button
                  type="button"
                  onClick={() => setPreviewDevice('desktop')}
                  className={`p-1.5 rounded-md transition-colors ${
                    previewDevice === 'desktop'
                      ? 'bg-zinc-800 text-white shadow-xs'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                  title="Desktop Canvas (100%)"
                >
                  <Laptop className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewDevice('mobile')}
                  className={`p-1.5 rounded-md transition-colors ${
                    previewDevice === 'mobile'
                      ? 'bg-zinc-800 text-white shadow-xs'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                  title="Mobile Device Simulation (375px)"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Refresh Sandbox */}
              <button
                type="button"
                onClick={() => setIframeKey(k => k + 1)}
                className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-zinc-800 transition-colors"
                title="Reload Sandbox"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>

              {/* Pop out to full screen preview modal */}
              <button
                type="button"
                onClick={() => setIsFullscreenPreview(!isFullscreenPreview)}
                className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-zinc-800 transition-colors"
                title={isFullscreenPreview ? "Standard Size" : "Full Screen View"}
              >
                {isFullscreenPreview ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Sandbox Iframe Container */}
          <div className="flex justify-center bg-zinc-900/50 rounded-xl p-1.5 sm:p-2 border border-zinc-800">
            <div
              className={`transition-all duration-300 w-full overflow-hidden rounded-lg bg-white shadow-2xl ${
                previewDevice === 'mobile' ? 'max-w-[385px] border-4 border-zinc-800' : 'max-w-full'
              }`}
            >
              <iframe
                key={iframeKey}
                title="Arohi Website Preview"
                srcDoc={getPreviewDocument()}
                sandbox="allow-scripts allow-modals allow-forms allow-same-origin"
                className={`w-full border-0 transition-all ${
                  isFullscreenPreview ? 'h-[620px]' : previewDevice === 'mobile' ? 'h-[540px]' : 'h-[440px]'
                }`}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
