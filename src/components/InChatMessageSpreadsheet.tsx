import React, { useState } from 'react';
import {
  FileSpreadsheet,
  Download,
  FileText,
  Palette,
  Layers,
  Sparkles,
  ChevronDown
} from 'lucide-react';
import {
  ExcelWorkbookData,
  exportToExcel,
  exportToPDF,
  exportToWord,
  PresentationThemeKey,
  PRESENTATION_THEMES,
  resolvePresentationTheme
} from '../lib/documentExporter';

interface InChatMessageSpreadsheetProps {
  workbookData: ExcelWorkbookData;
  isDarkMode: boolean;
}

export default function InChatMessageSpreadsheet({
  workbookData,
  isDarkMode
}: InChatMessageSpreadsheetProps) {
  const [activeSheetIndex, setActiveSheetIndex] = useState(0);
  const [isExporting, setIsExporting] = useState(false);
  const [selectedThemeKey, setSelectedThemeKey] = useState<PresentationThemeKey>(() => {
    const resolved = resolvePresentationTheme(
      workbookData.theme,
      workbookData.title || workbookData.filename,
      JSON.stringify(workbookData.sheets?.[0]?.headers || '')
    );
    return resolved.key;
  });
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);

  const currentTheme = PRESENTATION_THEMES[selectedThemeKey] || PRESENTATION_THEMES.emerald_warmth;
  const sheets = workbookData.sheets || [];
  const currentSheet = sheets[activeSheetIndex] || {
    name: 'Sheet 1',
    headers: ['Column 1', 'Column 2'],
    rows: [['Item 1', 'Item 2']]
  };

  const handleDownloadExcel = () => {
    setIsExporting(true);
    try {
      exportToExcel(
        workbookData.filename || 'Arohi_Spreadsheet',
        workbookData.title || 'Arohi Data Export',
        workbookData,
        selectedThemeKey
      );
    } finally {
      setIsExporting(false);
    }
  };

  const generateMarkdownDoc = () => {
    let markdownDoc = `# ${workbookData.title || 'Arohi Spreadsheet Export'}\n\n`;
    markdownDoc += `> ${currentTheme.badgeText}\n\n`;
    sheets.forEach((sheet) => {
      markdownDoc += `## Sheet: ${sheet.name}\n\n`;
      markdownDoc += `| ${sheet.headers.join(' | ')} |\n`;
      markdownDoc += `| ${sheet.headers.map(() => '---').join(' | ')} |\n`;
      sheet.rows.forEach((row) => {
        markdownDoc += `| ${row.join(' | ')} |\n`;
      });
      markdownDoc += '\n\n';
    });
    return markdownDoc;
  };

  const handleExportPDF = () => {
    const doc = generateMarkdownDoc();
    exportToPDF(
      `${workbookData.filename || 'Arohi_Spreadsheet'}_Report`,
      workbookData.title || 'Arohi AI Spreadsheet Report',
      doc,
      selectedThemeKey
    );
  };

  const handleExportWord = () => {
    const doc = generateMarkdownDoc();
    exportToWord(
      `${workbookData.filename || 'Arohi_Spreadsheet'}_Document`,
      workbookData.title || 'Arohi AI Spreadsheet Document',
      doc,
      selectedThemeKey
    );
  };

  return (
    <div
      className={`my-4 rounded-2xl border overflow-hidden transition-all shadow-xl ${
        isDarkMode
          ? 'bg-[#0f172a] border-slate-700/60 shadow-black/60'
          : 'bg-white border-slate-200 shadow-slate-200'
      }`}
    >
      {/* Spreadsheet Header Bar */}
      <div
        className="px-4 py-3 flex flex-wrap items-center justify-between gap-3 border-b text-white"
        style={{ backgroundColor: `#${currentTheme.headerBg}` }}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center shadow-xs shrink-0"
            style={{ backgroundColor: `#${currentTheme.brandAccent}` }}
          >
            <FileSpreadsheet className="w-4 h-4 text-white" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border shadow-xs"
                style={{
                  backgroundColor: `#${currentTheme.badgeBg}`,
                  borderColor: `#${currentTheme.badgeBorder}`,
                  color: `#${currentTheme.badgeColor}`
                }}
              >
                {currentTheme.badgeText}
              </span>
              <span className="text-[11px] font-semibold text-slate-300">
                {sheets.length} {sheets.length === 1 ? 'Sheet' : 'Sheets'} • {currentSheet.rows.length} Rows
              </span>
            </div>
            <h3 className="text-sm font-bold truncate max-w-xs sm:max-w-md text-white mt-0.5">
              {workbookData.title || workbookData.filename || 'Financial & Data Model'}
            </h3>
          </div>
        </div>

        {/* Action Controls & Theme Selector */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Theme Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
              className="px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-all bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md"
              title="Change Presentation & Document Theme"
            >
              <Palette className="w-3.5 h-3.5 text-amber-300" />
              <span className="hidden md:inline">{currentTheme.name.split(',')[0]}</span>
              <ChevronDown className="w-3 h-3 opacity-70" />
            </button>

            {isThemeMenuOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-64 rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-1.5 z-50 animate-in fade-in zoom-in-95">
                <div className="px-2 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Select Theme Archetype
                </div>
                {Object.values(PRESENTATION_THEMES).map((t) => (
                  <button
                    key={t.key}
                    onClick={() => {
                      setSelectedThemeKey(t.key);
                      setIsThemeMenuOpen(false);
                    }}
                    className={`w-full text-left px-2.5 py-2 rounded-xl text-xs flex items-center justify-between cursor-pointer transition-all ${
                      selectedThemeKey === t.key
                        ? 'bg-purple-600 text-white font-bold'
                        : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="w-3 h-3 rounded-full shrink-0 border border-white/30"
                        style={{ backgroundColor: `#${t.brandAccent}` }}
                      />
                      <span className="truncate">{t.name}</span>
                    </div>
                    {selectedThemeKey === t.key && <span className="text-[10px]">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={handleExportWord}
            className="px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-all bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md shadow-xs"
            title="Download Word (.docx) Report"
          >
            <FileText className="w-3.5 h-3.5 text-blue-300" />
            <span className="hidden sm:inline">Word</span>
          </button>

          <button
            onClick={handleExportPDF}
            className="px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-all bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md shadow-xs"
            title="Download PDF Summary"
          >
            <FileText className="w-3.5 h-3.5 text-rose-300" />
            <span className="hidden sm:inline">PDF</span>
          </button>

          <button
            onClick={handleDownloadExcel}
            disabled={isExporting}
            style={{ backgroundColor: `#${currentTheme.brandAccent}` }}
            className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-white hover:opacity-90 shadow-md flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all"
          >
            <Download className="w-3.5 h-3.5 text-white" />
            <span>{isExporting ? 'Generating...' : 'Download .XLSX'}</span>
          </button>
        </div>
      </div>

      {/* Multi-Sheet Selector Tabs if > 1 sheet */}
      {sheets.length > 1 && (
        <div
          className={`px-4 py-2 border-b flex items-center gap-2 overflow-x-auto ${
            isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}
        >
          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider shrink-0">
            Worksheets:
          </span>
          {sheets.map((s, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSheetIndex(idx)}
              style={activeSheetIndex === idx ? { backgroundColor: `#${currentTheme.brandAccent}` } : undefined}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-all shrink-0 ${
                activeSheetIndex === idx
                  ? 'text-white shadow-xs'
                  : isDarkMode
                  ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>
      )}

      {/* Spreadsheet Grid Preview Container */}
      <div className="p-3 sm:p-4 overflow-x-auto max-h-[360px] overflow-y-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr
              style={{ backgroundColor: `#${currentTheme.cardBg}`, color: `#${currentTheme.textColorDark}` }}
              className="border-b font-bold"
            >
              <th className="py-2.5 px-3 font-mono text-[10px] text-zinc-400 text-center w-10 border-r border-black/10 dark:border-white/10">
                #
              </th>
              {currentSheet.headers.map((h, hIdx) => (
                <th
                  key={hIdx}
                  className="py-2.5 px-3 font-bold tracking-tight whitespace-nowrap border-r border-black/10 dark:border-white/10 last:border-r-0"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={isDarkMode ? 'divide-y divide-slate-800' : 'divide-y divide-slate-100'}>
            {currentSheet.rows.map((row, rIdx) => (
              <tr
                key={rIdx}
                className={`transition-colors ${
                  isDarkMode
                    ? rIdx % 2 === 0
                      ? 'bg-slate-900/40 hover:bg-slate-800/60'
                      : 'bg-slate-900/80 hover:bg-slate-800/60'
                    : rIdx % 2 === 0
                    ? 'bg-white hover:bg-slate-50'
                    : 'bg-slate-50/70 hover:bg-slate-50'
                }`}
              >
                <td className="py-2 px-2.5 font-mono text-[10px] text-zinc-400 text-center border-r border-black/10 dark:border-white/10 select-none">
                  {rIdx + 1}
                </td>
                {row.map((cell, cIdx) => (
                  <td
                    key={cIdx}
                    className={`py-2 px-3 border-r border-black/10 dark:border-white/10 last:border-r-0 ${
                      typeof cell === 'number'
                        ? 'font-mono text-right font-semibold'
                        : isDarkMode
                        ? 'text-slate-200'
                        : 'text-slate-800'
                    }`}
                    style={typeof cell === 'number' ? { color: `#${currentTheme.brandAccent}` } : undefined}
                  >
                    {typeof cell === 'number'
                      ? cell.toLocaleString('en-IN')
                      : String(cell)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Spreadsheet Status Footer */}
      <div
        className={`px-4 py-2 text-[11px] flex items-center justify-between border-t ${
          isDarkMode ? 'bg-slate-900/60 border-slate-800 text-zinc-400' : 'bg-slate-50 border-slate-200 text-zinc-600'
        }`}
      >
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" style={{ color: `#${currentTheme.brandAccent}` }} />
          <span>Calculated & Validated in Native Microsoft Excel (.xlsx) • {currentTheme.name}</span>
        </div>
        <span className="font-semibold">{currentSheet.rows.length} rows × {currentSheet.headers.length} cols</span>
      </div>
    </div>
  );
}
