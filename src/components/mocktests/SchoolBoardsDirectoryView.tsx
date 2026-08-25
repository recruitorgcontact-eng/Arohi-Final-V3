import React, { useState } from 'react';
import { 
  Building, GraduationCap, MapPin, Search, Sparkles, BookOpen, 
  Layers, ArrowRight, ShieldCheck, Globe2, ChevronRight, CheckCircle2, Award
} from 'lucide-react';
import { 
  MASTER_SCHOOL_BOARDS_MAP, 
  ALL_SCHOOL_BOARDS_LIST, 
  MasterSchoolBoardDefinition 
} from '../../data/schoolBoardsKnowledgeGraph';

interface SchoolBoardsDirectoryViewProps {
  isDarkMode?: boolean;
  onSelectBoard: (board: MasterSchoolBoardDefinition, gradeSlug?: string) => void;
  onBackToCatalog: () => void;
}

export default function SchoolBoardsDirectoryView({
  isDarkMode = true,
  onSelectBoard,
  onBackToCatalog
}: SchoolBoardsDirectoryViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStateFilter, setSelectedStateFilter] = useState('all');

  const filteredBoards = ALL_SCHOOL_BOARDS_LIST.filter((board) => {
    if (selectedStateFilter !== 'all' && board.stateId !== selectedStateFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = board.name.toLowerCase().includes(q);
      const matchCode = board.code.toLowerCase().includes(q);
      const matchState = board.stateName.toLowerCase().includes(q);
      const matchRegional = board.nameRegional && board.nameRegional.toLowerCase().includes(q);
      if (!matchName && !matchCode && !matchState && !matchRegional) return false;
    }
    return true;
  });

  const uniqueStates = Array.from(new Set(ALL_SCHOOL_BOARDS_LIST.map(b => b.stateId)));

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-16 max-w-7xl mx-auto">
      
      {/* 1. HERO HEADER */}
      <div className={`p-6 sm:p-10 rounded-3xl border relative overflow-hidden shadow-2xl ${
        isDarkMode 
          ? 'bg-gradient-to-br from-[#1c1145] via-[#100a29] to-[#250d4b] border-purple-500/40 text-white' 
          : 'bg-gradient-to-br from-purple-50 via-white to-indigo-50 border-purple-200 text-slate-900 shadow-purple-100'
      }`}>
        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
              isDarkMode ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-amber-100 text-amber-900 border border-amber-300'
            }`}>
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Classes 1 to 12 School Education Engine</span>
            </span>
            <span className={`text-xs px-3 py-1 rounded-full font-bold ${
              isDarkMode ? 'bg-purple-600/30 text-purple-300 border border-purple-500/30' : 'bg-purple-100 text-purple-900 border border-purple-200'
            }`}>
              National &amp; 28 State Education Boards
            </span>
          </div>

          <h1 className={`text-2xl sm:text-4xl font-black tracking-tight leading-tight ${
            isDarkMode ? 'text-white' : 'text-slate-900'
          }`}>
            Pan-India School Boards &amp; Annual Exam Question Banks <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300 bg-clip-text text-transparent">
              From Class 1 to Class 12 (NCERT &amp; SCERT)
            </span>
          </h1>

          <p className={`text-xs sm:text-sm font-medium leading-relaxed max-w-2xl ${
            isDarkMode ? 'text-slate-300' : 'text-slate-700'
          }`}>
            Official sample papers, chapter-wise MCQs, unit test simulators, and board examination test series tailored for CBSE, ICSE, NIOS, BSE Odisha, UPMSP, BSEB, Maharashtra SSC/HSC, and all state education boards.
          </p>

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={onBackToCatalog}
              className={`px-4 py-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                isDarkMode 
                  ? 'bg-white/10 hover:bg-white/15 text-purple-200 border-white/10' 
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300 shadow-sm'
              }`}
            >
              ← Back to Competitive Exam Tracks
            </button>
          </div>
        </div>
      </div>

      {/* 2. SEARCH & FILTER CONTROLS */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-purple-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Board by Name or Code (e.g., CBSE, BSE Odisha, UP Board, Class 10)..."
            className={`w-full pl-10 pr-4 py-2.5 rounded-2xl border text-xs font-medium outline-none transition-all ${
              isDarkMode 
                ? 'bg-[#120d2a] border-[#291e56] text-white focus:border-purple-500 placeholder-slate-500' 
                : 'bg-white border-slate-300 text-slate-900 focus:border-purple-600 shadow-sm placeholder-slate-400'
            }`}
          />
        </div>

        <select
          value={selectedStateFilter}
          onChange={(e) => setSelectedStateFilter(e.target.value)}
          className={`px-4 py-2.5 rounded-2xl border text-xs font-bold outline-none cursor-pointer ${
            isDarkMode ? 'bg-[#120d2a] border-[#291e56] text-purple-200' : 'bg-white border-slate-300 text-slate-800'
          }`}
        >
          <option value="all">All States &amp; Central</option>
          <option value="central">Central / National (CBSE, ICSE, NIOS)</option>
          <option value="odisha">Odisha (BSE &amp; CHSE)</option>
          <option value="uttar-pradesh">Uttar Pradesh (UPMSP)</option>
          <option value="bihar">Bihar (BSEB)</option>
          <option value="maharashtra">Maharashtra (MSBSHSE)</option>
          <option value="rajasthan">Rajasthan (RBSE)</option>
          <option value="west-bengal">West Bengal (WBBSE)</option>
          <option value="madhya-pradesh">Madhya Pradesh (MPBSE)</option>
          <option value="tamil-nadu">Tamil Nadu (TNDGE)</option>
          <option value="karnataka">Karnataka (KSEAB)</option>
          <option value="andhra-pradesh">Andhra Pradesh (BSEAP)</option>
          <option value="telangana">Telangana (TS BIE)</option>
          <option value="gujarat">Gujarat (GSEB)</option>
          <option value="kerala">Kerala (KBPE)</option>
          <option value="punjab">Punjab (PSEB)</option>
          <option value="assam">Assam (SEBA)</option>
        </select>
      </div>

      {/* 3. BOARDS CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredBoards.map((board) => (
          <div
            key={board.id}
            className={`p-6 rounded-3xl border transition-all flex flex-col justify-between space-y-5 shadow-lg ${
              isDarkMode 
                ? 'bg-[#120d2a] border-[#291e56] hover:border-purple-500/60 hover:shadow-[0_8px_30px_rgba(124,58,237,0.2)]' 
                : 'bg-white border-slate-200 hover:border-purple-300 hover:shadow-md'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md border ${
                  isDarkMode ? 'bg-amber-500/15 text-amber-300 border-amber-500/30' : 'bg-amber-50 text-amber-900 border-amber-200'
                }`}>
                  {board.stateName}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                  isDarkMode ? 'bg-purple-900/40 text-purple-300 border-purple-500/30' : 'bg-purple-50 text-purple-800 border-purple-200'
                }`}>
                  Classes {board.classesCovered[0]}–{board.classesCovered[board.classesCovered.length - 1]}
                </span>
              </div>

              <div>
                <h3 className={`text-base font-black leading-snug ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  {board.name}
                </h3>
                {board.nameRegional && (
                  <p className={`text-xs font-semibold mt-0.5 ${isDarkMode ? 'text-purple-300' : 'text-purple-700'}`}>
                    {board.nameRegional}
                  </p>
                )}
              </div>

              <div className="space-y-1 text-xs">
                <div className="flex items-center gap-1.5 opacity-75">
                  <Building className="w-3.5 h-3.5 text-purple-400" />
                  <span>Headquarters: {board.headquarters}</span>
                </div>
                <div className="flex items-center gap-1.5 opacity-75">
                  <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Curriculum: {board.curriculumStandard}</span>
                </div>
                <div className="flex items-center gap-1.5 opacity-75">
                  <Globe2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Mediums: {board.mediumsOfInstruction.slice(0, 3).join(', ')}</span>
                </div>
              </div>

              {/* Quick Class Shortcut Pills */}
              <div className="pt-2">
                <div className="text-[10px] uppercase font-bold text-slate-400 mb-1.5">Quick Select Board Classes:</div>
                <div className="flex flex-wrap gap-1">
                  {Object.entries(board.gradesMap).slice(0, 4).map(([gSlug, g]) => (
                    <button
                      key={gSlug}
                      type="button"
                      onClick={() => onSelectBoard(board, gSlug)}
                      className={`text-[11px] px-2.5 py-1 rounded-xl border font-bold transition-all cursor-pointer ${
                        isDarkMode 
                          ? 'bg-[#18113c] hover:bg-purple-600/30 border-purple-500/20 text-purple-200' 
                          : 'bg-slate-100 hover:bg-purple-100 border-slate-200 text-slate-800'
                      }`}
                    >
                      Class {g.gradeNumber}
                    </button>
                  ))}
                  {Object.keys(board.gradesMap).length > 4 && (
                    <button
                      type="button"
                      onClick={() => onSelectBoard(board)}
                      className={`text-[11px] px-2 py-1 rounded-xl border font-bold opacity-80 cursor-pointer ${
                        isDarkMode ? 'border-purple-500/20 text-cyan-300' : 'border-slate-200 text-purple-700'
                      }`}
                    >
                      +{Object.keys(board.gradesMap).length - 4} more
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-purple-500/10 flex items-center justify-between">
              <span className="text-[11px] font-bold text-amber-400">
                {Object.keys(board.gradesMap).length} Standard Classes
              </span>
              <button
                onClick={() => onSelectBoard(board)}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-black uppercase tracking-wider shadow-md transition-all cursor-pointer flex items-center gap-1 hover:scale-105"
              >
                <span>Open Board Hub</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
