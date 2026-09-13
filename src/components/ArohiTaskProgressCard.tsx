import React from 'react';
import { Globe, FileCode, Sparkles, CheckCircle2, Loader2, Cpu, Presentation, Layers } from 'lucide-react';

export interface TaskProgressData {
  title: string;
  status: 'working' | 'completed';
  type?: 'website' | 'presentation' | 'code' | 'research' | 'general';
  steps: string[];
}

interface ArohiTaskProgressCardProps {
  data: TaskProgressData;
  isDarkMode?: boolean;
}

export const ArohiTaskProgressCard: React.FC<ArohiTaskProgressCardProps> = ({
  data,
  isDarkMode = true
}) => {
  const getIcon = () => {
    switch (data.type) {
      case 'website':
        return <Globe className="w-4 h-4 text-purple-400" />;
      case 'presentation':
        return <Presentation className="w-4 h-4 text-amber-400" />;
      case 'code':
        return <FileCode className="w-4 h-4 text-blue-400" />;
      case 'research':
        return <Cpu className="w-4 h-4 text-emerald-400" />;
      default:
        return <Layers className="w-4 h-4 text-cyan-400" />;
    }
  };

  const isWorking = data.status === 'working';

  return (
    <div className={`my-3.5 rounded-2xl p-4 sm:p-5 border transition-all ${
      isDarkMode 
        ? 'bg-[#121520]/95 border-slate-700/60 shadow-xl shadow-black/40 text-slate-100' 
        : 'bg-white border-slate-200/90 shadow-lg text-slate-900'
    }`}>
      {/* Top Header */}
      <div className="flex items-center justify-between gap-3 mb-3">
        <span className="text-xs sm:text-[13px] font-bold tracking-tight text-white/90">
          Task progress
        </span>
        <span className={`px-2.5 py-0.5 rounded-full text-[10.5px] font-semibold tracking-wide border ${
          isWorking
            ? 'bg-slate-800/80 text-slate-300 border-slate-700/80 animate-pulse'
            : 'bg-emerald-950/60 text-emerald-300 border-emerald-800/60'
        }`}>
          {isWorking ? 'Working...' : 'Completed'}
        </span>
      </div>

      {/* Task Identity Row */}
      <div className="flex items-center justify-between gap-2 pb-2.5 mb-2.5 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${
            isDarkMode ? 'bg-slate-800/80' : 'bg-slate-100'
          }`}>
            {getIcon()}
          </div>
          <span className="text-sm font-bold text-white tracking-tight">
            {data.title || 'Generation'}
          </span>
        </div>
        {isWorking ? (
          <Loader2 className="w-4 h-4 text-purple-400 animate-spin" />
        ) : (
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
        )}
      </div>

      {/* Steps List */}
      <div className="space-y-1.5 pl-1">
        {data.steps.map((step, idx) => (
          <div key={idx} className="text-xs sm:text-[12.5px] text-slate-300 leading-relaxed flex items-start gap-2">
            <span className="text-purple-400/80 select-none text-[11px] mt-0.5">•</span>
            <span>{step}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export function parseMessageTaskProgress(content: string): { cleanedContent: string; taskProgressData: TaskProgressData | null } {
  if (!content) return { cleanedContent: content, taskProgressData: null };

  const taskProgressRegex = /```task_progress\s*([\s\S]*?)```/i;
  const match = content.match(taskProgressRegex);

  if (!match) {
    return { cleanedContent: content, taskProgressData: null };
  }

  try {
    const rawBlock = match[1];
    const lines = rawBlock.split('\n').map(l => l.trim()).filter(Boolean);
    
    let title = 'Project Task';
    let status: 'working' | 'completed' = 'working';
    let type: TaskProgressData['type'] = 'general';
    const steps: string[] = [];

    for (const line of lines) {
      if (line.toLowerCase().startsWith('title:')) {
        title = line.slice(6).trim();
      } else if (line.toLowerCase().startsWith('status:')) {
        const s = line.slice(7).trim().toLowerCase();
        status = s.includes('complete') ? 'completed' : 'working';
      } else if (line.toLowerCase().startsWith('type:')) {
        const t = line.slice(5).trim().toLowerCase() as TaskProgressData['type'];
        type = t;
      } else if (line.startsWith('-') || line.startsWith('•') || line.startsWith('*')) {
        steps.push(line.replace(/^[-•*]\s*/, ''));
      } else if (line.length > 0) {
        steps.push(line);
      }
    }

    if (title.toLowerCase().includes('website') || title.toLowerCase().includes('site')) {
      type = 'website';
    } else if (title.toLowerCase().includes('presentation') || title.toLowerCase().includes('deck') || title.toLowerCase().includes('slide')) {
      type = 'presentation';
    } else if (title.toLowerCase().includes('code') || title.toLowerCase().includes('app')) {
      type = 'code';
    }

    const cleaned = content.replace(taskProgressRegex, '').trim();

    return {
      cleanedContent: cleaned,
      taskProgressData: {
        title,
        status,
        type,
        steps: steps.length > 0 ? steps : ['Processing request and applying modifications...']
      }
    };
  } catch (e) {
    return { cleanedContent: content, taskProgressData: null };
  }
}
