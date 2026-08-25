import React, { useState } from 'react';
import { 
  Trophy, Medal, Award, Star, ArrowLeft, Filter, Search, 
  MapPin, CheckCircle2, Clock, Zap, Crown
} from 'lucide-react';
import { LeaderboardEntry } from '../../types/examTypes';

interface ExamLeaderboardViewProps {
  testTitle: string;
  userRank?: number;
  userScore?: number;
  userName?: string;
  isDarkMode?: boolean;
  onBack: () => void;
}

const SAMPLE_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, userId: 'u1', userName: 'Subhashree Mohapatra', userState: 'Odisha', score: 24.0, maxScore: 25, accuracy: 96, timeTakenMinutes: 48, percentile: 99.98, badge: 'Gold', submittedAt: '2026-02-18T14:20:00Z' },
  { rank: 2, userId: 'u2', userName: 'Priyanshu Verma', userState: 'Uttar Pradesh', score: 23.67, maxScore: 25, accuracy: 95, timeTakenMinutes: 52, percentile: 99.85, badge: 'Silver', submittedAt: '2026-02-18T15:10:00Z' },
  { rank: 3, userId: 'u3', userName: 'Ananya Deshmukh', userState: 'Maharashtra', score: 23.33, maxScore: 25, accuracy: 94, timeTakenMinutes: 49, percentile: 99.70, badge: 'Bronze', submittedAt: '2026-02-18T16:05:00Z' },
  { rank: 4, userId: 'u4', userName: 'Debasis Nayak', userState: 'Odisha', score: 22.67, maxScore: 25, accuracy: 92, timeTakenMinutes: 55, percentile: 99.40, badge: 'Top 1%', submittedAt: '2026-02-18T16:30:00Z' },
  { rank: 5, userId: 'u5', userName: 'Rohan Banerjee', userState: 'West Bengal', score: 22.33, maxScore: 25, accuracy: 91, timeTakenMinutes: 58, percentile: 99.15, badge: 'Top 1%', submittedAt: '2026-02-18T17:00:00Z' },
  { rank: 6, userId: 'u6', userName: 'Kavitha R.', userState: 'Tamil Nadu', score: 22.0, maxScore: 25, accuracy: 90, timeTakenMinutes: 54, percentile: 98.90, badge: 'Top 1%', submittedAt: '2026-02-18T17:20:00Z' },
  { rank: 7, userId: 'u7', userName: 'Soumyaranjan Panda', userState: 'Odisha', score: 21.67, maxScore: 25, accuracy: 89, timeTakenMinutes: 60, percentile: 98.60, badge: 'Top 1%', submittedAt: '2026-02-18T17:45:00Z' },
  { rank: 8, userId: 'u8', userName: 'Megha Sharma', userState: 'Delhi NCR', score: 21.33, maxScore: 25, accuracy: 88, timeTakenMinutes: 62, percentile: 98.30, submittedAt: '2026-02-18T18:10:00Z' },
  { rank: 9, userId: 'u9', userName: 'Amit Patel', userState: 'Gujarat', score: 21.0, maxScore: 25, accuracy: 87, timeTakenMinutes: 65, percentile: 98.00, submittedAt: '2026-02-18T18:30:00Z' },
  { rank: 10, userId: 'u10', userName: 'Lipsa Rout', userState: 'Odisha', score: 20.67, maxScore: 25, accuracy: 86, timeTakenMinutes: 63, percentile: 97.70, submittedAt: '2026-02-18T19:00:00Z' }
];

export default function ExamLeaderboardView({
  testTitle,
  userRank = 24,
  userScore = 18.5,
  userName = 'You (Aspirant)',
  isDarkMode = true,
  onBack
}: ExamLeaderboardViewProps) {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'odisha' | 'delhi' | 'up'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEntries = SAMPLE_LEADERBOARD.filter((entry) => {
    if (selectedFilter === 'odisha' && entry.userState !== 'Odisha') return false;
    if (selectedFilter === 'delhi' && entry.userState !== 'Delhi NCR') return false;
    if (selectedFilter === 'up' && entry.userState !== 'Uttar Pradesh') return false;
    if (searchQuery && !entry.userName.toLowerCase().includes(searchQuery.toLowerCase()) && !entry.userState.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-5xl mx-auto pb-12">
      {/* 1. TOP HEADER & BACK */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={onBack}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
            isDarkMode 
              ? 'bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border-white/10' 
              : 'bg-white hover:bg-slate-100 text-slate-800 hover:text-slate-950 border-slate-300 shadow-sm'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <div className="text-right">
          <span className={`text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full border ${
            isDarkMode 
              ? 'text-amber-400 bg-amber-500/10 border-amber-500/20' 
              : 'text-amber-950 bg-amber-100 border-amber-300 font-bold'
          }`}>
            Live Verified Ranks
          </span>
        </div>
      </div>

      {/* 2. LEADERBOARD HERO & PODIUM */}
      <div className={`border-2 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl transition-all ${
        isDarkMode 
          ? 'bg-gradient-to-b from-[#1c1244] via-[#120b2d] to-[#0d0822] border-amber-500/40 text-white dark-card' 
          : 'bg-white border-amber-300 text-slate-900 shadow-amber-50/50'
      }`}>
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${
            isDarkMode 
              ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' 
              : 'bg-amber-100 text-amber-950 border-amber-300 font-black'
          }`}>
            <Trophy className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span>All-India Mock Examination Standing</span>
          </div>
          <h2 className={`text-xl sm:text-3xl font-black ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>{testTitle}</h2>
          <p className={`text-xs ${isDarkMode ? 'text-slate-300' : 'text-slate-700 font-medium'}`}>
            Over 25,000+ candidates evaluated on standardized negative marking &amp; speed parameters.
          </p>
        </div>

        {/* User's Standing Highlight Bar */}
        <div className={`border p-4 rounded-2xl flex flex-wrap items-center justify-between gap-3 shadow-lg ${
          isDarkMode 
            ? 'bg-gradient-to-r from-purple-900/60 via-[#261557] to-indigo-900/60 border-purple-400/50' 
            : 'bg-gradient-to-r from-purple-50 via-indigo-50 to-purple-50 border-purple-200'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm border ${
              isDarkMode 
                ? 'bg-purple-500/30 border-purple-400/60 text-purple-300' 
                : 'bg-purple-600 border-purple-700 text-white'
            }`}>
              #{userRank}
            </div>
            <div>
              <p className={`text-xs font-black ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>{userName}</p>
              <p className={`text-[11px] ${isDarkMode ? 'text-slate-300' : 'text-slate-700 font-medium'}`}>Your Current All India Rank</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div>
              <span className={`block text-[10px] uppercase font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Your Score</span>
              <span className={`text-base font-black ${isDarkMode ? 'text-amber-300' : 'text-amber-800'}`}>{userScore.toFixed(1)}</span>
            </div>
            <div>
              <span className={`block text-[10px] uppercase font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Status</span>
              <span className={`font-bold ${isDarkMode ? 'text-emerald-400' : 'text-emerald-800'}`}>Verified Attempt</span>
            </div>
          </div>
        </div>

        {/* TOP 3 PODIUM */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
          {/* Silver Rank 2 */}
          <div className={`p-5 rounded-2xl text-center space-y-2 relative shadow-md border ${
            isDarkMode 
              ? 'bg-[#160f38] border-slate-400/30' 
              : 'bg-slate-50 border-slate-300'
          }`}>
            <span className="w-8 h-8 rounded-full bg-slate-300 text-slate-950 font-black text-xs flex items-center justify-center mx-auto shadow-lg">
              2
            </span>
            <h4 className={`text-sm font-black truncate ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>{SAMPLE_LEADERBOARD[1]?.userName}</h4>
            <p className={`text-[11px] flex items-center justify-center gap-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600 font-medium'}`}>
              <MapPin className="w-3 h-3 text-purple-600 dark:text-purple-400" /> {SAMPLE_LEADERBOARD[1]?.userState}
            </p>
            <div className="pt-1">
              <span className={`text-lg font-black ${isDarkMode ? 'text-slate-200' : 'text-slate-950'}`}>{SAMPLE_LEADERBOARD[1]?.score} Marks</span>
              <span className={`text-[10px] block font-bold ${isDarkMode ? 'text-emerald-400' : 'text-emerald-800'}`}>{SAMPLE_LEADERBOARD[1]?.accuracy}% Acc.</span>
            </div>
          </div>

          {/* Gold Rank 1 */}
          <div className={`p-6 rounded-2xl text-center space-y-2.5 relative shadow-xl transform sm:-translate-y-2 border-2 ${
            isDarkMode 
              ? 'bg-gradient-to-b from-[#2d1b69] to-[#1a1042] border-amber-400' 
              : 'bg-gradient-to-b from-amber-50 to-orange-50/40 border-amber-400 shadow-amber-100'
          }`}>
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-slate-950 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shadow-md">
              <Crown className="w-3 h-3" /> AIR 1
            </div>
            <span className="w-10 h-10 rounded-full bg-amber-400 text-slate-950 font-black text-sm flex items-center justify-center mx-auto shadow-xl">
              🥇
            </span>
            <h4 className={`text-base font-black truncate ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>{SAMPLE_LEADERBOARD[0]?.userName}</h4>
            <p className={`text-xs flex items-center justify-center gap-1 ${isDarkMode ? 'text-amber-200' : 'text-amber-900 font-bold'}`}>
              <MapPin className="w-3 h-3 text-amber-600 dark:text-amber-300" /> {SAMPLE_LEADERBOARD[0]?.userState}
            </p>
            <div className="pt-1">
              <span className={`text-2xl font-black ${isDarkMode ? 'text-amber-300' : 'text-amber-900'}`}>{SAMPLE_LEADERBOARD[0]?.score} Marks</span>
              <span className={`text-[11px] block font-bold ${isDarkMode ? 'text-emerald-300' : 'text-emerald-800'}`}>{SAMPLE_LEADERBOARD[0]?.accuracy}% Accuracy • {SAMPLE_LEADERBOARD[0]?.timeTakenMinutes} mins</span>
            </div>
          </div>

          {/* Bronze Rank 3 */}
          <div className={`p-5 rounded-2xl text-center space-y-2 relative shadow-md border ${
            isDarkMode 
              ? 'bg-[#160f38] border-amber-700/40' 
              : 'bg-slate-50 border-amber-200'
          }`}>
            <span className="w-8 h-8 rounded-full bg-amber-700 text-amber-100 font-black text-xs flex items-center justify-center mx-auto shadow-lg">
              3
            </span>
            <h4 className={`text-sm font-black truncate ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>{SAMPLE_LEADERBOARD[2]?.userName}</h4>
            <p className={`text-[11px] flex items-center justify-center gap-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600 font-medium'}`}>
              <MapPin className="w-3 h-3 text-purple-600 dark:text-purple-400" /> {SAMPLE_LEADERBOARD[2]?.userState}
            </p>
            <div className="pt-1">
              <span className={`text-lg font-black ${isDarkMode ? 'text-amber-500' : 'text-amber-900'}`}>{SAMPLE_LEADERBOARD[2]?.score} Marks</span>
              <span className={`text-[10px] block font-bold ${isDarkMode ? 'text-emerald-400' : 'text-emerald-800'}`}>{SAMPLE_LEADERBOARD[2]?.accuracy}% Acc.</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. RANKERS TABLE & REGIONAL FILTER */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h3 className={`text-base font-black flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>
            <Medal className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <span>Top Rankers Ranking Table</span>
          </h3>

          <div className="flex items-center gap-2">
            <div className={`flex items-center gap-1 p-1 rounded-xl border text-xs font-bold ${
              isDarkMode 
                ? 'bg-[#120d2a] border-[#2d2163]' 
                : 'bg-white border-slate-300 shadow-sm'
            }`}>
              {(['all', 'odisha', 'delhi', 'up'] as const).map((filterVal) => (
                <button
                  key={filterVal}
                  onClick={() => setSelectedFilter(filterVal)}
                  className={`px-3 py-1 rounded-lg transition-all cursor-pointer font-bold capitalize ${
                    selectedFilter === filterVal 
                      ? 'bg-purple-600 text-white shadow-sm' 
                      : isDarkMode 
                        ? 'text-slate-400 hover:text-white' 
                        : 'text-slate-700 hover:text-slate-950'
                  }`}
                >
                  {filterVal === 'all' ? 'All-India' : filterVal === 'up' ? 'UP' : filterVal}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Table container */}
        <div className={`border rounded-2xl overflow-x-auto shadow-xl ${
          isDarkMode 
            ? 'bg-[#120d2a] border-[#2d2163]' 
            : 'bg-white border-slate-200'
        }`}>
          <table className="w-full text-left text-xs">
            <thead className={`border-b text-[10px] font-black uppercase tracking-wider ${
              isDarkMode 
                ? 'bg-[#18113c] border-[#2d2163] text-slate-400' 
                : 'bg-slate-100 border-slate-200 text-slate-700'
            }`}>
              <tr>
                <th className="p-3.5 text-center">Rank</th>
                <th className="p-3.5">Candidate Name</th>
                <th className="p-3.5">State</th>
                <th className="p-3.5 text-right">Score</th>
                <th className="p-3.5 text-center">Accuracy</th>
                <th className="p-3.5 text-center">Time</th>
                <th className="p-3.5 text-right">Percentile</th>
              </tr>
            </thead>
            <tbody className={isDarkMode ? 'divide-y divide-[#23184d]' : 'divide-y divide-slate-100'}>
              {filteredEntries.map((entry) => (
                <tr key={entry.userId} className={isDarkMode ? 'hover:bg-white/5 transition-colors' : 'hover:bg-slate-50 transition-colors'}>
                  <td className="p-3.5 text-center font-black">
                    <span className={`w-6 h-6 rounded-lg inline-flex items-center justify-center text-xs ${
                      entry.rank === 1 ? 'bg-amber-400 text-slate-950 font-black' :
                      entry.rank === 2 ? 'bg-slate-300 text-slate-950 font-black' :
                      entry.rank === 3 ? 'bg-amber-700 text-white font-black' :
                      isDarkMode ? 'bg-slate-800 text-slate-300' : 'bg-slate-200 text-slate-800'
                    }`}>
                      {entry.rank}
                    </span>
                  </td>
                  <td className={`p-3.5 font-black ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>
                    {entry.userName}
                  </td>
                  <td className={`p-3.5 ${isDarkMode ? 'text-slate-400' : 'text-slate-700 font-medium'}`}>
                    {entry.userState}
                  </td>
                  <td className={`p-3.5 text-right font-black ${isDarkMode ? 'text-amber-300' : 'text-amber-900'}`}>
                    {entry.score.toFixed(2)}
                  </td>
                  <td className={`p-3.5 text-center font-bold ${isDarkMode ? 'text-emerald-400' : 'text-emerald-800'}`}>
                    {entry.accuracy}%
                  </td>
                  <td className={`p-3.5 text-center font-mono ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>
                    {entry.timeTakenMinutes}m
                  </td>
                  <td className={`p-3.5 text-right font-black ${isDarkMode ? 'text-purple-400' : 'text-purple-900'}`}>
                    {entry.percentile}%ile
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
