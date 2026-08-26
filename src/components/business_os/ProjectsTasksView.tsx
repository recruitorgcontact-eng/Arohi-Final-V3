import React, { useState } from 'react';
import {
  FolderKanban,
  Plus,
  CheckCircle2,
  Clock,
  AlertTriangle,
  User,
  Calendar,
  Layers,
  ArrowRight
} from 'lucide-react';
import { useBusinessOS } from './BusinessOSContext';
import { ProjectTask } from './types';

export default function ProjectsTasksView() {
  const { projects, tasks, updateTaskStatus, setQuickCreateType } = useBusinessOS();
  const [selectedProjectId, setSelectedProjectId] = useState<string>('all');

  const filteredTasks = tasks.filter(t =>
    selectedProjectId === 'all' || t.projectId === selectedProjectId
  );

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="bg-white dark:bg-[#121214] border border-black/[0.06] dark:border-white/[0.08] rounded-2xl p-4 sm:p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 flex items-center justify-center">
            <FolderKanban className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white tracking-tight">
              Projects, Client Deliverables & Agile Tasks
            </h2>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">
              Organize customer implementations, engineering milestones, and team task sprints
            </p>
          </div>
        </div>

        <button
          onClick={() => setQuickCreateType('task')}
          className="px-4 py-2 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95 self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Create Task</span>
        </button>
      </div>

      {/* Projects Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {projects.map((proj) => (
          <div
            key={proj.id}
            onClick={() => setSelectedProjectId(proj.id === selectedProjectId ? 'all' : proj.id)}
            className={`bg-white dark:bg-[#121214] border rounded-2xl p-4 space-y-3 cursor-pointer transition-all shadow-[0_1px_3px_rgba(0,0,0,0.03)] ${
              selectedProjectId === proj.id ? 'border-purple-500 ring-1 ring-purple-500' : 'border-black/[0.06] dark:border-white/[0.08] hover:border-black/[0.12] dark:hover:border-white/[0.15]'
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase text-purple-600 dark:text-purple-400">{proj.clientName}</span>
                <h3 className="font-bold text-zinc-900 dark:text-white text-sm mt-0.5">{proj.name}</h3>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase border ${
                proj.status === 'in_progress' ? 'bg-violet-50 dark:bg-violet-950/40 text-violet-700 dark:text-violet-400 border-violet-200 dark:border-violet-800/40' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700'
              }`}>
                {proj.status.replace('_', ' ')}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                <span>Completion</span>
                <span className="text-zinc-900 dark:text-white">{proj.progressPercentage}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden border border-black/[0.04] dark:border-white/[0.06]">
                <div
                  className="h-full bg-gradient-to-r from-purple-600 to-indigo-500 rounded-full transition-all"
                  style={{ width: `${proj.progressPercentage}%` }}
                ></div>
              </div>
            </div>

            <div className="pt-2 border-t border-black/[0.04] dark:border-white/[0.06] flex justify-between text-[11px] text-zinc-500 dark:text-zinc-400">
              <span>Budget: <strong className="text-emerald-600 dark:text-emerald-400">₹{(proj.budget / 100000).toFixed(1)}L</strong></span>
              <span>Deadline: <strong className="text-zinc-700 dark:text-zinc-300">{proj.deadline}</strong></span>
            </div>
          </div>
        ))}
      </div>

      {/* Sprint Tasks Table */}
      <div className="bg-white dark:bg-[#121214] border border-black/[0.06] dark:border-white/[0.08] rounded-2xl p-4 sm:p-5 space-y-3.5 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
        <div className="flex items-center justify-between border-b border-black/[0.06] dark:border-white/[0.08] pb-3">
          <div>
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white">Active Sprint Tasks</h3>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">Deliverables across selected projects</p>
          </div>
          {selectedProjectId !== 'all' && (
            <button
              onClick={() => setSelectedProjectId('all')}
              className="text-xs text-purple-600 dark:text-purple-400 hover:underline font-semibold cursor-pointer"
            >
              Show All Projects
            </button>
          )}
        </div>

        <div className="space-y-2">
          {filteredTasks.map((t) => (
            <div
              key={t.id}
              className="p-3.5 rounded-xl bg-zinc-50/80 dark:bg-zinc-900/80 border border-black/[0.06] dark:border-white/[0.08] hover:border-violet-400 dark:hover:border-violet-600 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded border ${
                    t.priority === 'urgent'
                      ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-800/40'
                      : 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800/40'
                  }`}>
                    {t.priority}
                  </span>
                  <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">Due: {t.dueDate}</span>
                </div>
                <h4 className="text-xs font-bold text-zinc-900 dark:text-white">{t.title}</h4>
                <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
                  <User className="w-3.5 h-3.5 text-zinc-400" />
                  <span className="text-zinc-700 dark:text-zinc-300 font-medium">{t.assignedTo}</span>
                </div>
              </div>

              {/* Status Update Selector */}
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <select
                  value={t.status}
                  onChange={(e) => updateTaskStatus(t.id, e.target.value as ProjectTask['status'])}
                  className="bg-white dark:bg-zinc-800 border border-black/[0.08] dark:border-white/[0.1] rounded-xl px-2.5 py-1 text-xs text-zinc-800 dark:text-zinc-200 font-semibold focus:outline-none cursor-pointer"
                >
                  <option value="todo">To Do</option>
                  <option value="in_progress">In Progress</option>
                  <option value="review">Under Review</option>
                  <option value="completed">Completed ✓</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
