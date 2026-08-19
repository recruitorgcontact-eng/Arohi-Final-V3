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
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-xs font-bold transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <div className="text-right">
          <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            Live Verified Ranks
          </span>
        </div>
      </div>

      {/* 2. LEADERBOARD HERO & PODIUM */}
      <div className="bg-gradient-to-b from-[#1c1244] via-[#120b2d] to-[#0d0822] border-2 border-amber-500/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl text-white">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider border border-amber-500/30">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>All-India Mock Examination Standing</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-black">{testTitle}</h2>
          <p className="text-xs text-slate-300">
            Over 25,000+ candidates evaluated on standardized negative marking &amp; speed parameters.
          </p>
        </div>

        {/* User's Standing Highlight Bar */}
        <div className="bg-gradient-to-r from-purple-900/60 via-[#261557] to-indigo-900/60 border border-purple-400/50 p-4 rounded-2xl flex flex-wrap items-center justify-between gap-3 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/30 border border-purple-400/60 flex items-center justify-center font-black text-purple-300 text-sm">
              #{userRank}
            </div>
            <div>
              <p className="text-xs font-black text-white">{userName}</p>
              <p className="text-[11px] text-slate-300">Your Current All India Rank</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Your Score</span>
              <span className="text-base font-black text-amber-300">{userScore.toFixed(1)}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Status</span>
              <span className="text-emerald-400 font-bold">Verified Attempt</span>
            </div>
          </div>
        </div>

        {/* TOP 3 PODIUM */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
          {/* Silver Rank 2 */}
          <div className="order-2 sm:order-1 bg-[#160f38] border border-slate-400/30 p-5 rounded-2xl text-center space-y-2 relative shadow-md">
            <span className="w-8 h-8 rounded-full bg-slate-300 text-slate-950 font-black text-xs flex items-center justify-center mx-auto shadow-lg">
              2
            </span>
            <h4 className="text-sm font-black text-white truncate">{SAMPLE_LEADERBOARD[1]?.userName}</h4>
            <p className="text-[11px] text-slate-400 flex items-center justify-center gap-1">
              <MapPin className="w-3 h-3 text-purple-400" /> {SAMPLE_LEADERBOARD[1]?.userState}
            </p>
            <div className="pt-1">
              <span className="text-lg font-black text-slate-200">{SAMPLE_LEADERBOARD[1]?.score} Marks</span>
              <span className="text-[10px] text-emerald-400 block font-bold">{SAMPLE_LEADERBOARD[1]?.accuracy}% Acc.</span>
            </div>
          </div>

          {/* Gold Rank 1 */}
          <div className="order-1 sm:order-2 bg-gradient-to-b from-[#2d1b69] to-[#1a1042] border-2 border-amber-400 p-6 rounded-2xl text-center space-y-2.5 relative shadow-xl transform sm:-translate-y-2">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-slate-950 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shadow-md">
              <Crown className="w-3 h-3" /> AIR 1
            </div>
            <span className="w-10 h-10 rounded-full bg-amber-400 text-slate-950 font-black text-sm flex items-center justify-center mx-auto shadow-xl">
              🥇
            </span>
            <h4 className="text-base font-black text-white truncate">{SAMPLE_LEADERBOARD[0]?.userName}</h4>
            <p className="text-xs text-amber-200 flex items-center justify-center gap-1">
              <MapPin className="w-3 h-3 text-amber-300" /> {SAMPLE_LEADERBOARD[0]?.userState}
            </p>
            <div className="pt-1">
              <span className="text-2xl font-black text-amber-300">{SAMPLE_LEADERBOARD[0]?.score} Marks</span>
              <span className="text-[11px] text-emerald-300 block font-bold">{SAMPLE_LEADERBOARD[0]?.accuracy}% Accuracy • {SAMPLE_LEADERBOARD[0]?.timeTakenMinutes} mins</span>
            </div>
          </div>

          {/* Bronze Rank 3 */}
          <div className="order-3 bg-[#160f38] border border-amber-700/40 p-5 rounded-2xl text-center space-y-2 relative shadow-md">
            <span className="w-8 h-8 rounded-full bg-amber-700 text-amber-100 font-black text-xs flex items-center justify-center mx-auto shadow-lg">
              3
            </span>
            <h4 className="text-sm font-black text-white truncate">{SAMPLE_LEADERBOARD[2]?.userName}</h4>
            <p className="text-[11px] text-slate-400 flex items-center justify-center gap-1">
              <MapPin className="w-3 h-3 text-purple-400" /> {SAMPLE_LEADERBOARD[2]?.userState}
            </p>
            <div className="pt-1">
              <span className="text-lg font-black text-amber-500">{SAMPLE_LEADERBOARD[2]?.score} Marks</span>
              <span className="text-[10px] text-emerald-400 block font-bold">{SAMPLE_LEADERBOARD[2]?.accuracy}% Acc.</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. RANKERS TABLE & REGIONAL FILTER */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h3 className="text-base font-black text-white flex items-center gap-2">
            <Medal className="w-5 h-5 text-purple-400" />
            <span>Top Rankers Ranking Table</span>
          </h3>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-[#120d2a] p-1 rounded-xl border border-[#2d2163] text-xs font-bold">
              <button
                onClick={() => setSelectedFilter('all')}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  selectedFilter === 'all' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                All-India
              </button>
              <button
                onClick={() => setSelectedFilter('odisha')}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  selectedFilter === 'odisha' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Odisha
              </button>
              <button
                onClick={() => setSelectedFilter('delhi')}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  selectedFilter === 'delhi' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Delhi
              </button>
              <button
                onClick={() => setSelectedFilter('up')}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  selectedFilter === 'up' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                UP
              </button>
            </div>
          </div>
        </div>

        {/* Table container */}
        <div className="bg-[#120d2a] border border-[#2d2163] rounded-2xl overflow-x-auto shadow-xl">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-[#18113c] border-b border-[#2d2163] text-[10px] font-black uppercase tracking-wider text-slate-400">
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
            <tbody className="divide-y divide-[#23184d]">
              {filteredEntries.map((entry) => (
                <tr key={entry.userId} className="hover:bg-white/5 transition-colors">
                  <td className="p-3.5 text-center font-black">
                    <span className={`w-6 h-6 rounded-lg inline-flex items-center justify-center text-xs ${
                      entry.rank === 1 ? 'bg-amber-400 text-slate-950 font-black' :
                      entry.rank === 2 ? 'bg-slate-300 text-slate-950 font-black' :
                      entry.rank === 3 ? 'bg-amber-700 text-white font-black' :
                      'bg-slate-800 text-slate-300'
                    }`}>
                      {entry.rank}
                    </span>
                  </td>
                  <td className="p-3.5 font-bold text-white">
                    {entry.userName}
                  </td>
                  <td className="p-3.5 text-slate-400">
                    {entry.userState}
                  </td>
                  <td className="p-3.5 text-right font-black text-amber-300">
                    {entry.score.toFixed(2)}
                  </td>
                  <td className="p-3.5 text-center font-bold text-emerald-400">
                    {entry.accuracy}%
                  </td>
                  <td className="p-3.5 text-center text-slate-400 font-mono">
                    {entry.timeTakenMinutes}m
                  </td>
                  <td className="p-3.5 text-right font-black text-purple-400">
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
