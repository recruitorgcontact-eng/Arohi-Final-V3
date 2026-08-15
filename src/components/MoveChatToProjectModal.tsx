import React, { useState } from 'react';
import { Folder, FolderPlus, X, Check, Plus, ArrowRight } from 'lucide-react';
import { ArohiProject } from './ArohiProjectsModal';

interface MoveChatToProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  chatId: string;
  chatTitle: string;
  currentProjectId?: string | null;
  projects: ArohiProject[];
  onMoveChat: (chatId: string, projectId: string | null) => void;
  onCreateProject: (project: Omit<ArohiProject, 'id' | 'createdAt' | 'updatedAt'>) => string;
  isDarkMode?: boolean;
}

export default function MoveChatToProjectModal({
  isOpen,
  onClose,
  chatId,
  chatTitle,
  currentProjectId,
  projects,
  onMoveChat,
  onCreateProject,
  isDarkMode = true
}: MoveChatToProjectModalProps) {
  const [isCreatingInline, setIsCreatingInline] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectInstructions, setNewProjectInstructions] = useState('');

  if (!isOpen) return null;

  const handleSelect = (targetProjectId: string | null) => {
    onMoveChat(chatId, targetProjectId);
    onClose();
  };

  const handleCreateAndMove = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectName.trim()) return;

    const newId = onCreateProject({
      name: newProjectName.trim(),
      customInstructions: newProjectInstructions.trim(),
      color: 'bg-purple-600',
      icon: 'folder'
    });

    onMoveChat(chatId, newId);
    setIsCreatingInline(false);
    setNewProjectName('');
    setNewProjectInstructions('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150 select-none">
      <div className={`w-full max-w-md rounded-3xl border ${
        isDarkMode ? 'bg-[#120d2c] border-[#311f6b] text-white' : 'bg-white border-slate-200 text-slate-900 shadow-2xl'
      } p-5 shadow-2xl overflow-hidden`}>
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-purple-500/20 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-purple-600/30 border border-purple-500/40 flex items-center justify-center text-purple-300">
              <Folder className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm leading-tight text-white">Move Chat to Project</h4>
              <p className="text-[11px] text-slate-400 truncate max-w-[240px] mt-0.5">"{chatTitle}"</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {isCreatingInline ? (
          <form onSubmit={handleCreateAndMove} className="space-y-3">
            <div className="text-xs font-bold text-purple-300">Create & Move to New Project</div>
            <input
              type="text"
              required
              placeholder="Project Name (e.g. OPSC Prep, MSME Loan)"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              className={`w-full px-3.5 py-2.5 rounded-xl text-xs ${
                isDarkMode ? 'bg-[#1a123d] border-[#3a2770] text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
              } border focus:outline-none focus:ring-2 focus:ring-purple-500`}
              autoFocus
            />
            <textarea
              rows={2}
              placeholder="Custom instructions (optional)..."
              value={newProjectInstructions}
              onChange={(e) => setNewProjectInstructions(e.target.value)}
              className={`w-full px-3.5 py-2 rounded-xl text-xs ${
                isDarkMode ? 'bg-[#1a123d] border-[#3a2770] text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
              } border focus:outline-none focus:ring-2 focus:ring-purple-500`}
            />
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsCreatingInline(false)}
                className="px-3 py-1.5 text-xs text-slate-400 hover:text-white cursor-pointer"
              >
                Back
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#7c3aed] text-white text-xs font-bold rounded-xl shadow-md cursor-pointer"
              >
                Create & Move
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-2">
            <p className="text-xs text-slate-300 mb-2">Select a project destination:</p>

            {/* Option: General / No Project */}
            <div
              onClick={() => handleSelect(null)}
              className={`p-3 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                !currentProjectId
                  ? (isDarkMode ? 'bg-purple-950/40 border-purple-500/60 text-white font-bold' : 'bg-purple-50 border-purple-300 text-purple-950')
                  : (isDarkMode ? 'bg-[#160f38] border-[#291b5c] text-slate-300 hover:bg-[#1f154d]' : 'bg-slate-50 border-slate-200 hover:bg-slate-100')
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="text-sm">💬</span>
                <div className="text-xs">General / Unassigned (No Project)</div>
              </div>
              {!currentProjectId && <Check className="w-4 h-4 text-purple-400" />}
            </div>

            {/* Existing Projects List */}
            <div className="max-h-[220px] overflow-y-auto space-y-1.5 pr-1">
              {projects.map(proj => {
                const isSelected = currentProjectId === proj.id;
                return (
                  <div
                    key={proj.id}
                    onClick={() => handleSelect(proj.id)}
                    className={`p-3 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                      isSelected
                        ? (isDarkMode ? 'bg-purple-950/40 border-purple-500/60 text-white font-bold' : 'bg-purple-50 border-purple-300 text-purple-950')
                        : (isDarkMode ? 'bg-[#160f38] border-[#291b5c] text-slate-300 hover:bg-[#1f154d]' : 'bg-slate-50 border-slate-200 hover:bg-slate-100')
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 pr-2">
                      <div className={`w-6 h-6 rounded-lg ${proj.color || 'bg-purple-600'} text-white flex items-center justify-center shrink-0 text-xs`}>
                        <Folder className="w-3 h-3" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-semibold truncate leading-tight">{proj.name}</div>
                        {proj.description && (
                          <div className="text-[10px] text-slate-400 truncate mt-0.5">{proj.description}</div>
                        )}
                      </div>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-purple-400 shrink-0" />}
                  </div>
                );
              })}
            </div>

            {/* Create New Project Option */}
            <button
              onClick={() => setIsCreatingInline(true)}
              className="w-full mt-3 flex items-center justify-center gap-2 p-2.5 rounded-xl border border-dashed border-purple-500/40 text-purple-300 hover:bg-purple-600/20 text-xs font-bold cursor-pointer transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Project</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
