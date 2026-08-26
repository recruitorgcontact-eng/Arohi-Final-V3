import React, { useState } from 'react';
import {
  FileSpreadsheet,
  Download,
  FileText,
  Layers,
  Table as TableIcon,
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { ExcelWorkbookData, exportToExcel, exportToPDF } from '../lib/documentExporter';

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

  const sheets = workbookData.sheets || [];
  const currentSheet = sheets[activeSheetIndex] || {
    name: 'Sheet 1',
    headers: ['Column 1', 'Column 2'],
    rows: [['Item 1', 'Item 2']]
  };

  const handleDownloadExcel = () => {
    setIsExporting(true);
    try {
      exportToExcel(workbookData.filename || 'Arohi_Spreadsheet', workbookData.title || 'Arohi Data', workbookData);
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportPDF = () => {
    let markdownDoc = `# ${workbookData.title || 'Arohi Spreadsheet Export'}\n\n`;
    sheets.forEach((sheet) => {
      markdownDoc += `## Sheet: ${sheet.name}\n\n`;
      markdownDoc += `| ${sheet.headers.join(' | ')} |\n`;
      markdownDoc += `| ${sheet.headers.map(() => '---').join(' | ')} |\n`;
      sheet.rows.forEach((row) => {
        markdownDoc += `| ${row.join(' | ')} |\n`;
      });
      markdownDoc += '\n\n';
    });

    exportToPDF(
      `${workbookData.filename || 'Arohi_Spreadsheet'}_Report`,
      workbookData.title || 'Arohi AI Spreadsheet Report',
      markdownDoc
    );
  };

  return (
    <div
      className={`my-4 rounded-2xl border overflow-hidden transition-all shadow-xl ${
        isDarkMode
          ? 'bg-[#0f172a] border-emerald-500/30'
          : 'bg-white border-emerald-200'
      }`}
    >
      {/* Spreadsheet Header Bar */}
      <div
        className={`px-4 py-3 flex flex-wrap items-center justify-between gap-2 border-b ${
          isDarkMode
            ? 'bg-gradient-to-r from-[#064e3b]/50 to-[#022c22]/70 border-emerald-500/20 text-emerald-200'
            : 'bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-100 text-emerald-950'
        }`}
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
            <FileSpreadsheet className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                Live Spreadsheet
              </span>
              <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                {sheets.length} {sheets.length === 1 ? 'Sheet' : 'Sheets'} • {currentSheet.rows.length} Rows
              </span>
            </div>
            <h3 className="text-sm font-bold truncate max-w-xs sm:max-w-md">
              {workbookData.title || workbookData.filename || 'Financial & Data Model'}
            </h3>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportPDF}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-all border ${
              isDarkMode
                ? 'bg-zinc-900/60 hover:bg-zinc-800 text-zinc-300 border-zinc-700'
                : 'bg-white hover:bg-zinc-50 text-zinc-700 border-zinc-200 shadow-xs'
            }`}
            title="Download PDF Summary"
          >
            <FileText className="w-3.5 h-3.5 text-rose-500" />
            <span className="hidden sm:inline">PDF</span>
          </button>

          <button
            onClick={handleDownloadExcel}
            disabled={isExporting}
            className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-md flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all"
          >
            <Download className="w-3.5 h-3.5 text-emerald-200" />
            <span>{isExporting ? 'Generating .XLSX...' : 'Download .XLSX'}</span>
          </button>
        </div>
      </div>

      {/* Multi-Sheet Selector Tabs if > 1 sheet */}
      {sheets.length > 1 && (
        <div className={`px-4 py-2 border-b flex items-center gap-2 overflow-x-auto ${isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider shrink-0">
            Worksheets:
          </span>
          {sheets.map((s, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSheetIndex(idx)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-all shrink-0 ${
                activeSheetIndex === idx
                  ? 'bg-emerald-600 text-white shadow-xs'
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
            <tr className={isDarkMode ? 'bg-slate-800/90 text-emerald-300 border-b border-slate-700' : 'bg-emerald-100/60 text-emerald-950 border-b border-emerald-200'}>
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
                      ? 'bg-slate-900/40 hover:bg-emerald-950/30'
                      : 'bg-slate-900/80 hover:bg-emerald-950/30'
                    : rIdx % 2 === 0
                    ? 'bg-white hover:bg-emerald-50/50'
                    : 'bg-slate-50/70 hover:bg-emerald-50/50'
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
                        ? 'font-mono text-right text-emerald-600 dark:text-emerald-400 font-medium'
                        : isDarkMode
                        ? 'text-slate-200'
                        : 'text-slate-800'
                    }`}
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
      <div className={`px-4 py-2 text-[11px] flex items-center justify-between border-t ${isDarkMode ? 'bg-slate-900/60 border-slate-800 text-zinc-400' : 'bg-slate-50 border-slate-200 text-zinc-600'}`}>
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
          <span>Calculated & Validated in Native Microsoft Excel (.xlsx)</span>
        </div>
        <span className="font-semibold">{currentSheet.rows.length} rows × {currentSheet.headers.length} cols</span>
      </div>
    </div>
  );
}
