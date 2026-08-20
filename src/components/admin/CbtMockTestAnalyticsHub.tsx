import React, { useState, useMemo } from 'react';
import { 
  Award, Search, Filter, Download, ArrowUpRight, CheckCircle2, AlertCircle, Clock, 
  User, Check, X, BarChart3, TrendingUp, Percent, FileCheck, Layers, Sparkles
} from 'lucide-react';
import { MockTestSubmissionRecord, INITIAL_MOCKTEST_SUBMISSIONS } from '../../data/adminMockData';

interface CbtMockTestAnalyticsHubProps {
  submissions?: MockTestSubmissionRecord[];
  onSelectUserEmail?: (email: string) => void;
}

export default function CbtMockTestAnalyticsHub({
  submissions = INITIAL_MOCKTEST_SUBMISSIONS,
  onSelectUserEmail
}: CbtMockTestAnalyticsHubProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExam, setSelectedExam] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [activeSubmissionDetail, setActiveSubmissionDetail] = useState<MockTestSubmissionRecord | null>(null);

  // Filtered submissions
  const filteredSubmissions = useMemo(() => {
    return submissions.filter((sub) => {
      if (selectedExam !== 'all' && sub.targetExam !== selectedExam) {
        return false;
      }
      if (selectedStatus !== 'all' && sub.status !== selectedStatus) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = sub.userName.toLowerCase().includes(q);
        const matchesEmail = sub.userEmail.toLowerCase().includes(q);
        const matchesTitle = sub.testTitle.toLowerCase().includes(q);
        const matchesExam = sub.targetExam.toLowerCase().includes(q);
        return matchesName || matchesEmail || matchesTitle || matchesExam;
      }
      return true;
    });
  }, [submissions, selectedExam, selectedStatus, searchQuery]);

  // Aggregate metrics
  const totalSubmissions = submissions.length;
  const qualifiedCount = submissions.filter(s => s.status === 'Qualified').length;
  const qualifiedRate = totalSubmissions > 0 ? Math.round((qualifiedCount / totalSubmissions) * 100) : 0;
  const avgScorePercent = totalSubmissions > 0 ? Math.round(submissions.reduce((acc, s) => acc + s.percentage, 0) / totalSubmissions) : 0;
  const avgAccuracy = totalSubmissions > 0 ? Math.round(submissions.reduce((acc, s) => acc + s.accuracyPercent, 0) / totalSubmissions) : 0;

  const handleExportCSV = () => {
    const headers = ['Submission ID', 'Test Title', 'Target Exam', 'Candidate Name', 'Email', 'State', 'Score', 'Total Marks', 'Percentage', 'Accuracy %', 'Time Taken', 'Percentile Rank', 'Status', 'Submitted At'];
    const rows = filteredSubmissions.map(s => [
      `"${s.id}"`,
      `"${s.testTitle.replace(/"/g, '""')}"`,
      `"${s.targetExam}"`,
      `"${s.userName}"`,
      `"${s.userEmail}"`,
      `"${s.userState || 'Odisha'}"`,
      s.score,
      s.totalMarks,
      `${s.percentage}%`,
      `${s.accuracyPercent}%`,
      `"${s.timeTakenFormatted}"`,
      `${s.percentileRank || 0}%`,
      `"${s.status}"`,
      `"${s.submittedAt}"`
    ]);
    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `arohi_cbt_mocktest_analytics_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Top Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-[#0c0822]/80 border border-amber-500/30 p-4 rounded-2xl flex items-center justify-between shadow-[0_0_20px_rgba(245,158,11,0.06)]">
          <div>
            <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider block">
              Total Tests Attempted
            </span>
            <span className="text-2xl font-black text-white mt-1 block">
              {totalSubmissions} Submissions
            </span>
            <span className="text-[9px] text-amber-400 font-mono mt-0.5 block">
              All CBT Exams Active
            </span>
          </div>
          <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-2xl text-amber-400">
            <Award className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-[#0c0822]/80 border border-emerald-500/30 p-4 rounded-2xl flex items-center justify-between shadow-[0_0_20px_rgba(16,185,129,0.06)]">
          <div>
            <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider block">
              Qualified Rate
            </span>
            <span className="text-2xl font-black text-[#00e676] mt-1 block">
              {qualifiedRate}% Pass Rate
            </span>
            <span className="text-[9px] text-emerald-400 font-mono mt-0.5 block">
              {qualifiedCount} Candidates Qualified
            </span>
          </div>
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-[#00e676]">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-[#0c0822]/80 border border-cyan-500/30 p-4 rounded-2xl flex items-center justify-between shadow-[0_0_20px_rgba(6,182,212,0.06)]">
          <div>
            <span className="text-[10px] font-bold text-cyan-300 uppercase tracking-wider block">
              Average Score Percentage
            </span>
            <span className="text-2xl font-black text-cyan-300 mt-1 block">
              {avgScorePercent}%
            </span>
            <span className="text-[9px] text-cyan-400 font-mono mt-0.5 block">
              Based on All-India Normalization
            </span>
          </div>
          <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl text-cyan-400">
            <Percent className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-[#0c0822]/80 border border-purple-500/30 p-4 rounded-2xl flex items-center justify-between shadow-[0_0_20px_rgba(168,85,247,0.06)]">
          <div>
            <span className="text-[10px] font-bold text-purple-300 uppercase tracking-wider block">
              Average Accuracy %
            </span>
            <span className="text-2xl font-black text-purple-300 mt-1 block">
              {avgAccuracy}%
            </span>
            <span className="text-[9px] text-purple-400 font-mono mt-0.5 block">
              Negative Marking Protected
            </span>
          </div>
          <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-2xl text-purple-400">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#0e0928]/90 border border-[#2b1b58] p-4 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-3 shadow-lg">
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          {/* Keyword Search */}
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by test name, student, exam..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#160f38] border border-[#3b2575] rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-500 font-semibold"
            />
          </div>

          {/* Exam Filter */}
          <select
            value={selectedExam}
            onChange={(e) => setSelectedExam(e.target.value)}
            className="bg-[#160f38] border border-[#3b2575] rounded-xl px-3 py-2 text-xs text-slate-200 font-semibold focus:outline-none cursor-pointer"
          >
            <option value="all">All Target Exams</option>
            <option value="OSSC CGL">OSSC CGL (Combined Graduate)</option>
            <option value="Banking (IBPS PO)">Banking (IBPS PO / Clerk)</option>
            <option value="Odisha Police SI">Odisha Police Sub-Inspector</option>
            <option value="SSC CGL">SSC CGL Tier-1</option>
            <option value="OPSC OAS">OPSC Odisha Civil Services</option>
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-[#160f38] border border-[#3b2575] rounded-xl px-3 py-2 text-xs text-slate-200 font-semibold focus:outline-none cursor-pointer"
          >
            <option value="all">All Statuses</option>
            <option value="Qualified">Qualified</option>
            <option value="Needs Practice">Needs Practice</option>
          </select>
        </div>

        <button
          onClick={handleExportCSV}
          className="bg-[#1b1442] hover:bg-[#2e1f6e] border border-[#3c2885] text-amber-300 hover:text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
          title="Export CBT submissions as CSV"
        >
          <Download className="w-3.5 h-3.5 text-amber-400" />
          <span>Export CBT Analytics (CSV)</span>
        </button>
      </div>

      {/* Submissions Roster Table */}
      <div className="bg-[#090715]/75 border border-[#2b1b54]/80 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-4 bg-[#120d2c]/65 border-b border-[#2b1b54] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400" />
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-300">
              Candidate CBT Test Submissions & Performance Ledger
            </h4>
            <span className="bg-amber-950/80 text-amber-300 border border-amber-500/30 text-[9px] font-mono px-2 py-0.5 rounded-full">
              {filteredSubmissions.length} Submissions
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs font-semibold">
            <thead>
              <tr className="bg-slate-900/65 text-slate-400 border-b border-[#221644] uppercase tracking-wider text-[9px] font-black">
                <th className="py-3 px-4">Test Title & Exam</th>
                <th className="py-3 px-4">Aspirant Profile</th>
                <th className="py-3 px-4 text-center">Score / Total</th>
                <th className="py-3 px-4 text-center">Accuracy %</th>
                <th className="py-3 px-4 text-center">Time Taken</th>
                <th className="py-3 px-4 text-center">All-India Rank</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#221644]">
              {filteredSubmissions.map((sub) => (
                <tr key={sub.id} className="hover:bg-purple-950/10 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-bold text-white text-xs">{sub.testTitle}</div>
                    <span className="text-[9px] font-mono font-bold uppercase px-1.5 py-0.5 bg-amber-950/40 text-amber-300 border border-amber-500/20 rounded mt-1 inline-block">
                      {sub.targetExam}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-200">{sub.userName}</div>
                    <div className="text-[10px] text-slate-400 font-mono mt-0.5">{sub.userEmail}</div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="font-black text-white text-xs font-mono">{sub.score}</span>
                    <span className="text-slate-500 text-[10px] font-mono"> / {sub.totalMarks}</span>
                    <div className="text-[9px] text-cyan-400 font-mono mt-0.5">{sub.percentage}%</div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="font-black text-purple-300 font-mono">{sub.accuracyPercent}%</span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="text-[10px] font-mono text-slate-300 flex items-center justify-center gap-1">
                      <Clock className="w-3 h-3 text-slate-500" />
                      {sub.timeTakenFormatted}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-950/30 px-2 py-0.5 rounded border border-amber-500/20">
                      {sub.percentileRank ? `${sub.percentileRank}th %ile` : 'Top 10%'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${
                      sub.status === 'Qualified'
                        ? 'bg-emerald-500/15 text-[#00e676] border border-emerald-500/25'
                        : 'bg-amber-500/15 text-amber-400 border border-amber-500/25'
                    }`}>
                      {sub.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => setActiveSubmissionDetail(sub)}
                      className="bg-[#1d143c] hover:bg-[#341d6e] border border-[#3d2780] text-amber-300 hover:text-white px-2.5 py-1 rounded-xl text-[10px] font-extrabold cursor-pointer transition-all"
                    >
                      View Report
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Submission Detail Modal */}
      {activeSubmissionDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#0b0820] border border-amber-500/40 rounded-3xl w-full max-w-xl text-slate-200 shadow-2xl shadow-amber-950/60 overflow-hidden relative">
            <div className="bg-gradient-to-r from-[#170e3a] via-[#120a2e] to-[#0c0824] p-5 border-b border-[#2d1b64] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-amber-500/10 border border-amber-400/30 rounded-xl text-amber-400">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">
                    CBT Performance Scorecard
                  </h3>
                  <p className="text-[11px] text-slate-400 font-mono mt-0.5">{activeSubmissionDetail.testTitle}</p>
                </div>
              </div>

              <button
                onClick={() => setActiveSubmissionDetail(null)}
                className="p-2 hover:bg-white/10 rounded-xl text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs font-semibold">
              <div className="grid grid-cols-2 gap-3 bg-[#110c2e]/70 border border-[#271954] p-3.5 rounded-2xl">
                <div>
                  <span className="text-[9px] uppercase font-bold text-slate-500 block">Candidate</span>
                  <span className="text-xs font-bold text-white">{activeSubmissionDetail.userName}</span>
                  <span className="text-[10px] text-slate-400 font-mono block">{activeSubmissionDetail.userEmail}</span>
                </div>
                <div>
                  <span className="text-[9px] uppercase font-bold text-slate-500 block">Submitted At</span>
                  <span className="text-xs font-bold text-amber-300 font-mono">{activeSubmissionDetail.submittedAt}</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="bg-[#120a2d]/60 border border-[#2e1d5a] p-3 rounded-2xl text-center">
                  <span className="text-[9px] uppercase font-bold text-slate-400 block">Score</span>
                  <span className="text-xl font-black text-emerald-400 font-mono mt-1 block">
                    {activeSubmissionDetail.score}/{activeSubmissionDetail.totalMarks}
                  </span>
                </div>
                <div className="bg-[#120a2d]/60 border border-[#2e1d5a] p-3 rounded-2xl text-center">
                  <span className="text-[9px] uppercase font-bold text-slate-400 block">Accuracy</span>
                  <span className="text-xl font-black text-cyan-400 font-mono mt-1 block">
                    {activeSubmissionDetail.accuracyPercent}%
                  </span>
                </div>
                <div className="bg-[#120a2d]/60 border border-[#2e1d5a] p-3 rounded-2xl text-center">
                  <span className="text-[9px] uppercase font-bold text-slate-400 block">Percentile</span>
                  <span className="text-xl font-black text-amber-400 font-mono mt-1 block">
                    {activeSubmissionDetail.percentileRank || 95}th
                  </span>
                </div>
              </div>

              <div className="bg-[#110c2e]/40 border border-[#271954] p-3.5 rounded-2xl space-y-2">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Question Distribution</span>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-emerald-950/30 border border-emerald-500/20 p-2 rounded-xl">
                    <span className="text-[9px] text-emerald-400 block">Correct</span>
                    <span className="text-sm font-bold text-white font-mono">{activeSubmissionDetail.correctAnswers || 120}</span>
                  </div>
                  <div className="bg-red-950/30 border border-red-500/20 p-2 rounded-xl">
                    <span className="text-[9px] text-red-400 block">Incorrect</span>
                    <span className="text-sm font-bold text-white font-mono">{activeSubmissionDetail.wrongAnswers || 24}</span>
                  </div>
                  <div className="bg-slate-900/50 border border-slate-700/20 p-2 rounded-xl">
                    <span className="text-[9px] text-slate-400 block">Unattempted</span>
                    <span className="text-sm font-bold text-white font-mono">{activeSubmissionDetail.unattempted || 6}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-[#0e0a2a] border-t border-[#2d1b64] flex justify-end">
              <button
                onClick={() => setActiveSubmissionDetail(null)}
                className="bg-amber-600 hover:bg-amber-500 text-white px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer"
              >
                Close Scorecard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
