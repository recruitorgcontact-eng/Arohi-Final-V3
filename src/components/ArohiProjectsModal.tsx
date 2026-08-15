import React, { useState } from 'react';
import { 
  Folder, FolderPlus, Plus, X, Edit3, Trash2, MessageCircle, 
  Sparkles, Check, ArrowRight, BookOpen, Briefcase, Code, Rocket,
  GraduationCap, Target, Cpu, Settings, ChevronRight, Filter, FileText
} from 'lucide-react';

export interface ArohiProject {
  id: string;
  name: string;
  description?: string;
  customInstructions?: string;
  color?: string;
  icon?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SavedChatWithProject {
  id: string;
  title: string;
  date: string;
  messages: any[];
  projectId?: string;
}

const PROJECT_COLORS = [
  { name: 'Purple', bg: 'bg-purple-600', text: 'text-purple-400', border: 'border-purple-500/40', badge: 'bg-purple-500/20 text-purple-300' },
  { name: 'Blue', bg: 'bg-blue-600', text: 'text-blue-400', border: 'border-blue-500/40', badge: 'bg-blue-500/20 text-blue-300' },
  { name: 'Emerald', bg: 'bg-emerald-600', text: 'text-emerald-400', border: 'border-emerald-500/40', badge: 'bg-emerald-500/20 text-emerald-300' },
  { name: 'Amber', bg: 'bg-amber-600', text: 'text-amber-400', border: 'border-amber-500/40', badge: 'bg-amber-500/20 text-amber-300' },
  { name: 'Rose', bg: 'bg-rose-600', text: 'text-rose-400', border: 'border-rose-500/40', badge: 'bg-rose-500/20 text-rose-300' },
  { name: 'Cyan', bg: 'bg-cyan-600', text: 'text-cyan-400', border: 'border-cyan-500/40', badge: 'bg-cyan-500/20 text-cyan-300' },
  { name: 'Indigo', bg: 'bg-indigo-600', text: 'text-indigo-400', border: 'border-indigo-500/40', badge: 'bg-indigo-500/20 text-indigo-300' },
];

const PROJECT_ICONS = [
  { id: 'folder', icon: Folder, label: 'Folder' },
  { id: 'briefcase', icon: Briefcase, label: 'Work' },
  { id: 'graduation', icon: GraduationCap, label: 'Study' },
  { id: 'code', icon: Code, label: 'Code' },
  { id: 'rocket', icon: Rocket, label: 'Launch' },
  { id: 'target', icon: Target, label: 'Goals' },
  { id: 'sparkles', icon: Sparkles, label: 'Creative' },
];

interface ArohiProjectsModalProps {
  isOpen: boolean;
  onClose: () => void;
  projects: ArohiProject[];
  savedChats: SavedChatWithProject[];
  activeProjectId?: string | null;
  onSelectProject: (projectId: string | null) => void;
  onCreateProject: (project: Omit<ArohiProject, 'id' | 'createdAt' | 'updatedAt'>) => string;
  onUpdateProject: (id: string, updates: Partial<ArohiProject>) => void;
  onDeleteProject: (id: string) => void;
  onStartChatInProject: (projectId: string) => void;
  onMoveChatToProject: (chatId: string, projectId: string | null) => void;
  onOpenChat: (chatId: string) => void;
  isDarkMode?: boolean;
}

export default function ArohiProjectsModal({
  isOpen,
  onClose,
  projects,
  savedChats,
  activeProjectId,
  onSelectProject,
  onCreateProject,
  onUpdateProject,
  onDeleteProject,
  onStartChatInProject,
  onMoveChatToProject,
  onOpenChat,
  isDarkMode = true
}: ArohiProjectsModalProps) {
  const [selectedViewProjectId, setSelectedViewProjectId] = useState<string | null>(activeProjectId || null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [customInstructions, setCustomInstructions] = useState('');
  const [color, setColor] = useState('bg-purple-600');
  const [iconId, setIconId] = useState('folder');

  // Move Chats Dialog inside Project view
  const [isAddChatsDialogOpen, setIsAddChatsDialogOpen] = useState(false);
  const [inlineEditingProjectId, setInlineEditingProjectId] = useState<string | null>(null);
  const [inlineEditingProjectName, setInlineEditingProjectName] = useState('');

  const saveInlineProjectName = (projId: string) => {
    const trimmed = inlineEditingProjectName.trim();
    if (trimmed) {
      onUpdateProject(projId, { name: trimmed });
    }
    setInlineEditingProjectId(null);
    setInlineEditingProjectName('');
  };

  if (!isOpen) return null;

  const currentProject = projects.find(p => p.id === selectedViewProjectId);
  const chatsInCurrentProject = selectedViewProjectId 
    ? savedChats.filter(c => c.projectId === selectedViewProjectId)
    : [];
  const unassignedChats = savedChats.filter(c => !c.projectId || c.projectId !== selectedViewProjectId);

  const resetForm = () => {
    setName('');
    setDescription('');
    setCustomInstructions('');
    setColor('bg-purple-600');
    setIconId('folder');
    setIsCreatingNew(false);
    setEditingProjectId(null);
  };

  const handleStartCreate = () => {
    setName('');
    setDescription('');
    setCustomInstructions('');
    setColor('bg-purple-600');
    setIconId('folder');
    setEditingProjectId(null);
    setIsCreatingNew(true);
  };

  const handleStartEdit = (p: ArohiProject) => {
    setName(p.name);
    setDescription(p.description || '');
    setCustomInstructions(p.customInstructions || '');
    setColor(p.color || 'bg-purple-600');
    setIconId(p.icon || 'folder');
    setIsCreatingNew(false);
    setEditingProjectId(p.id);
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (editingProjectId) {
      onUpdateProject(editingProjectId, {
        name: name.trim(),
        description: description.trim(),
        customInstructions: customInstructions.trim(),
        color,
        icon: iconId,
        updatedAt: new Date().toISOString()
      });
      setEditingProjectId(null);
    } else {
      const newId = onCreateProject({
        name: name.trim(),
        description: description.trim(),
        customInstructions: customInstructions.trim(),
        color,
        icon: iconId
      });
      setSelectedViewProjectId(newId);
      setIsCreatingNew(false);
    }
    resetForm();
  };

  const getIconComponent = (id?: string) => {
    const found = PROJECT_ICONS.find(i => i.id === id);
    const IconComp = found ? found.icon : Folder;
    return <IconComp className="w-4 h-4" />;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 select-none">
      <div className={`w-full max-w-4xl max-h-[90vh] rounded-3xl ${
        isDarkMode ? 'bg-[#0f0b24] border-[#2c1d61] text-white' : 'bg-white border-slate-200 text-slate-900 shadow-2xl'
      } border flex flex-col overflow-hidden shadow-2xl relative`}>

        {/* Modal Header */}
        <div className={`px-6 py-4 flex items-center justify-between border-b ${
          isDarkMode ? 'bg-[#150f33] border-[#281b57]' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-lg">
              <Folder className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold tracking-tight">Arohi Projects</h3>
                <span className="text-[10px] bg-purple-500/20 text-purple-300 font-extrabold px-2 py-0.5 rounded-md uppercase border border-purple-500/30">
                  Workspace
                </span>
              </div>
              <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Group conversations, apply custom instructions, and start focused chats.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-xl ${
              isDarkMode ? 'text-slate-400 hover:text-white hover:bg-white/10' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200'
            } transition-colors cursor-pointer`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden min-h-[420px]">
          
          {/* Left Column: Project List & Actions */}
          <div className={`w-full md:w-72 border-r ${
            isDarkMode ? 'bg-[#0b081c] border-[#22164a]' : 'bg-slate-50/80 border-slate-200'
          } p-3.5 flex flex-col overflow-y-auto shrink-0 space-y-2`}>
            
            <button
              onClick={handleStartCreate}
              className="w-full flex items-center justify-center gap-2 px-3.5 py-2.5 bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-bold text-xs rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <FolderPlus className="w-4 h-4" />
              <span>New Project</span>
            </button>

            <div className={`text-[11px] font-extrabold uppercase tracking-wider px-2 pt-2 ${
              isDarkMode ? 'text-slate-400' : 'text-slate-500'
            }`}>
              Your Projects ({projects.length})
            </div>

            {projects.length === 0 ? (
              <div className={`text-center py-8 text-xs ${isDarkMode ? 'text-slate-500' : 'text-slate-400'} px-3`}>
                No projects created yet. Click "+ New Project" to organize your chats!
              </div>
            ) : (
              <div className="space-y-1.5 flex-1">
                {projects.map(proj => {
                  const isSelected = selectedViewProjectId === proj.id;
                  const chatCount = savedChats.filter(c => c.projectId === proj.id).length;
                  return (
                    <div
                      key={proj.id}
                      onClick={() => {
                        setSelectedViewProjectId(proj.id);
                        setIsCreatingNew(false);
                        setEditingProjectId(null);
                      }}
                      className={`w-full text-left p-3 rounded-2xl transition-all cursor-pointer flex items-center justify-between group border ${
                        isSelected
                          ? (isDarkMode ? 'bg-[#22164a] border-purple-500/50 text-white shadow-md' : 'bg-purple-100 border-purple-300 text-purple-950 font-bold shadow-xs')
                          : (isDarkMode ? 'bg-[#140f2e]/60 border-[#281b57] text-slate-300 hover:bg-[#1a143b] hover:text-white' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100')
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0 pr-2">
                        <div className={`w-7 h-7 rounded-xl ${proj.color || 'bg-purple-600'} text-white flex items-center justify-center shrink-0 shadow-xs`}>
                          {getIconComponent(proj.icon)}
                        </div>
                        <div className="min-w-0">
                          <div className="font-bold text-xs truncate leading-tight">{proj.name}</div>
                          <div className={`text-[10px] ${isDarkMode ? 'text-slate-400' : 'text-slate-500'} mt-0.5`}>
                            {chatCount} {chatCount === 1 ? 'chat' : 'chats'}
                          </div>
                        </div>
                      </div>
                      <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${isSelected ? 'text-purple-400 translate-x-0.5' : 'text-slate-500 opacity-40'}`} />
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Column: Project Details, Chat Manager, or Create/Edit Form */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto flex flex-col justify-between">
            
            {/* VIEW 1: CREATE OR EDIT FORM */}
            {(isCreatingNew || editingProjectId) ? (
              <form onSubmit={handleSaveForm} className="space-y-4 max-w-lg">
                <div className="flex items-center justify-between border-b pb-3 border-purple-500/20">
                  <h4 className="font-extrabold text-sm sm:text-base flex items-center gap-2">
                    <FolderPlus className="w-5 h-5 text-purple-400" />
                    <span>{editingProjectId ? 'Edit Project' : 'Create New Project'}</span>
                  </h4>
                  <button
                    type="button"
                    onClick={resetForm}
                    className={`text-xs ${isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'} cursor-pointer`}
                  >
                    Cancel
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-slate-300">
                    Project Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., OPSC OAS 2026 Preparation, MSME Udyam Loan, React Portfolio"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs ${
                      isDarkMode ? 'bg-[#181136] border-[#382673] text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    } border focus:outline-none focus:ring-2 focus:ring-purple-500`}
                    autoFocus
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-slate-300">
                    Description (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="Brief objective or focus of this project..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs ${
                      isDarkMode ? 'bg-[#181136] border-[#382673] text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    } border focus:outline-none focus:ring-2 focus:ring-purple-500`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-slate-300">
                    Custom Project Instructions (System Context)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Always respond concisely in Odia/English. Prioritize OPSC syllabus questions, case studies, and official government data."
                    value={customInstructions}
                    onChange={(e) => setCustomInstructions(e.target.value)}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs ${
                      isDarkMode ? 'bg-[#181136] border-[#382673] text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    } border focus:outline-none focus:ring-2 focus:ring-purple-500 leading-relaxed`}
                  />
                  <span className={`text-[10px] ${isDarkMode ? 'text-slate-400' : 'text-slate-500'} mt-1 block`}>
                    Every chat started inside this project will automatically inherit these instructions.
                  </span>
                </div>

                {/* Color & Icon Pickers */}
                <div className="grid grid-cols-2 gap-4 pt-1">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider mb-2 text-slate-300">
                      Color Theme
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {PROJECT_COLORS.map(c => (
                        <button
                          key={c.name}
                          type="button"
                          onClick={() => setColor(c.bg)}
                          className={`w-7 h-7 rounded-xl ${c.bg} flex items-center justify-center cursor-pointer transition-transform ${color === c.bg ? 'scale-110 ring-2 ring-white ring-offset-2 ring-offset-[#0f0b24]' : 'opacity-70 hover:opacity-100'}`}
                        >
                          {color === c.bg && <Check className="w-3.5 h-3.5 text-white" />}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider mb-2 text-slate-300">
                      Icon
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {PROJECT_ICONS.map(i => {
                        const IconComp = i.icon;
                        const isSelected = iconId === i.id;
                        return (
                          <button
                            key={i.id}
                            type="button"
                            onClick={() => setIconId(i.id)}
                            className={`w-7 h-7 rounded-xl flex items-center justify-center cursor-pointer transition-all border ${
                              isSelected 
                                ? 'bg-purple-600 text-white border-purple-400' 
                                : (isDarkMode ? 'bg-[#181136] text-slate-400 border-[#382673] hover:text-white' : 'bg-slate-100 text-slate-600 border-slate-200')
                            }`}
                            title={i.label}
                          >
                            <IconComp className="w-3.5 h-3.5" />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <button
                    type="button"
                    onClick={resetForm}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold ${
                      isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                    } cursor-pointer`}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#7c3aed] hover:bg-[#6d28d9] text-white shadow-md cursor-pointer transition-all active:scale-95"
                  >
                    {editingProjectId ? 'Save Changes' : 'Create Project'}
                  </button>
                </div>
              </form>
            ) : currentProject ? (
              /* VIEW 2: ACTIVE PROJECT DETAILS & CHATS */
              <div className="space-y-5">
                
                {/* Project Header Banner */}
                <div className={`p-4 sm:p-5 rounded-2xl border ${
                  isDarkMode ? 'bg-[#160f38] border-[#311f6b]' : 'bg-purple-50/70 border-purple-200'
                } flex flex-col sm:flex-row sm:items-center justify-between gap-4`}>
                  <div className="flex items-start sm:items-center gap-3.5">
                    <div className={`w-12 h-12 rounded-2xl ${currentProject.color || 'bg-purple-600'} text-white flex items-center justify-center shrink-0 shadow-lg text-lg`}>
                      {getIconComponent(currentProject.icon)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        {inlineEditingProjectId === currentProject.id ? (
                          <div className="flex items-center gap-1.5">
                            <input
                              type="text"
                              value={inlineEditingProjectName}
                              onChange={(e) => setInlineEditingProjectName(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') saveInlineProjectName(currentProject.id);
                                if (e.key === 'Escape') {
                                  setInlineEditingProjectId(null);
                                  setInlineEditingProjectName('');
                                }
                              }}
                              onBlur={() => saveInlineProjectName(currentProject.id)}
                              autoFocus
                              className={`px-2 py-0.5 text-base sm:text-lg font-black rounded-lg border ${
                                isDarkMode ? 'bg-purple-900/80 border-purple-400 text-white' : 'bg-white border-purple-400 text-purple-950'
                              } focus:outline-none focus:ring-1 focus:ring-purple-400`}
                            />
                            <button
                              onClick={() => saveInlineProjectName(currentProject.id)}
                              className="p-1 text-emerald-400 hover:text-emerald-300 cursor-pointer"
                              title="Save"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                setInlineEditingProjectId(null);
                                setInlineEditingProjectName('');
                              }}
                              className="p-1 text-rose-400 hover:text-rose-300 cursor-pointer"
                              title="Cancel"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <div
                            onClick={() => {
                              setInlineEditingProjectId(currentProject.id);
                              setInlineEditingProjectName(currentProject.name);
                            }}
                            className="group/name flex items-center gap-2 cursor-pointer"
                            title="Click to rename project inline"
                          >
                            <h3 className="text-base sm:text-lg font-black text-white leading-tight hover:underline decoration-dotted">
                              {currentProject.name}
                            </h3>
                            <Edit3 className="w-3.5 h-3.5 text-purple-400 opacity-60 group-hover/name:opacity-100 transition-opacity" />
                          </div>
                        )}
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isDarkMode ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' : 'bg-purple-100 text-purple-900'
                        }`}>
                          {chatsInCurrentProject.length} {chatsInCurrentProject.length === 1 ? 'chat' : 'chats'}
                        </span>
                      </div>
                      {currentProject.description && (
                        <p className={`text-xs ${isDarkMode ? 'text-slate-300' : 'text-slate-600'} mt-1 font-medium`}>
                          {currentProject.description}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleStartEdit(currentProject)}
                      className={`p-2 rounded-xl text-xs font-semibold ${
                        isDarkMode ? 'bg-[#22164f] hover:bg-[#301f70] text-purple-300' : 'bg-white hover:bg-slate-100 text-purple-700 border border-purple-200'
                      } flex items-center gap-1.5 cursor-pointer`}
                      title="Edit project details"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Are you sure you want to delete "${currentProject.name}"? Contained chats will remain unassigned.`)) {
                          onDeleteProject(currentProject.id);
                          setSelectedViewProjectId(null);
                        }
                      }}
                      className={`p-2 rounded-xl text-xs font-semibold ${
                        isDarkMode ? 'bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-500/30' : 'bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200'
                      } flex items-center gap-1.5 cursor-pointer`}
                      title="Delete project"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Custom Instructions Preview Card */}
                {currentProject.customInstructions && (
                  <div className={`p-3.5 rounded-xl border text-xs leading-relaxed ${
                    isDarkMode ? 'bg-[#110c29] border-[#291b5c] text-purple-200' : 'bg-purple-50/50 border-purple-200 text-purple-900'
                  }`}>
                    <div className="font-bold text-[10px] uppercase tracking-wider text-purple-400 mb-1 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> Project Instructions Active
                    </div>
                    <p className="line-clamp-2">{currentProject.customInstructions}</p>
                  </div>
                )}

                {/* Actions: Start Chat in Project & Add Existing Chats */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                  <div className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                    Conversations in this Project
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsAddChatsDialogOpen(true)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold ${
                        isDarkMode ? 'bg-[#1e1545] hover:bg-[#2c1d66] text-purple-300 border border-purple-500/30' : 'bg-white hover:bg-purple-50 text-purple-700 border border-purple-300'
                      } cursor-pointer transition-all flex items-center gap-1.5`}
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Move Chats Here</span>
                    </button>

                    <button
                      onClick={() => {
                        onStartChatInProject(currentProject.id);
                        onClose();
                      }}
                      className="px-4 py-1.5 rounded-xl text-xs font-extrabold bg-[#7c3aed] hover:bg-[#6d28d9] text-white shadow-md cursor-pointer transition-all flex items-center gap-1.5 active:scale-95"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Start Chat in Project</span>
                    </button>
                  </div>
                </div>

                {/* List of Chats in this Project */}
                <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                  {chatsInCurrentProject.length === 0 ? (
                    <div className={`p-8 text-center rounded-2xl border ${
                      isDarkMode ? 'bg-[#120d2b]/60 border-[#261852] text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-500'
                    }`}>
                      <MessageCircle className="w-8 h-8 mx-auto mb-2 opacity-40 text-purple-400" />
                      <p className="text-xs font-semibold">No chats in this project yet.</p>
                      <p className="text-[11px] text-slate-500 mt-1">
                        Click <strong>"Start Chat in Project"</strong> or <strong>"Move Chats Here"</strong> to begin!
                      </p>
                    </div>
                  ) : (
                    chatsInCurrentProject.map(chat => (
                      <div
                        key={chat.id}
                        className={`p-3 rounded-2xl border transition-all flex items-center justify-between ${
                          isDarkMode ? 'bg-[#140e33] border-[#291b5c] hover:border-purple-500/50' : 'bg-white border-slate-200 hover:border-purple-300 shadow-xs'
                        }`}
                      >
                        <div
                          onClick={() => {
                            onOpenChat(chat.id);
                            onClose();
                          }}
                          className="flex items-center gap-3 min-w-0 cursor-pointer flex-1 pr-3"
                        >
                          <MessageCircle className="w-4 h-4 text-purple-400 shrink-0" />
                          <div className="min-w-0">
                            <h5 className="font-bold text-xs truncate leading-tight text-white">{chat.title}</h5>
                            <span className="text-[10px] text-slate-400 mt-0.5 block">{chat.date || 'Recent'}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={() => onMoveChatToProject(chat.id, null)}
                            className={`p-1.5 rounded-lg text-[10px] font-semibold ${
                              isDarkMode ? 'text-slate-400 hover:text-rose-300 hover:bg-rose-950/30' : 'text-slate-500 hover:text-rose-600 hover:bg-rose-50'
                            } cursor-pointer`}
                            title="Remove from this project"
                          >
                            Remove
                          </button>
                          <button
                            onClick={() => {
                              onOpenChat(chat.id);
                              onClose();
                            }}
                            className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-[#7c3aed] hover:bg-[#6d28d9] text-white cursor-pointer"
                          >
                            Open
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

              </div>
            ) : (
              /* VIEW 3: EMPTY STATE / NO PROJECT SELECTED */
              <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
                <div className="w-16 h-16 rounded-3xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                  <FolderPlus className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-extrabold text-base text-white">Select or Create a Project</h4>
                  <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'} max-w-sm mt-1`}>
                    ChatGPT-style projects keep your study notes, career consultations, and business discussions neatly isolated.
                  </p>
                </div>
                <button
                  onClick={handleStartCreate}
                  className="px-5 py-2.5 bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-bold text-xs rounded-xl shadow-lg cursor-pointer transition-all active:scale-95"
                >
                  Create Your First Project
                </button>
              </div>
            )}

            {/* Footer buttons */}
            <div className={`mt-6 pt-4 border-t ${
              isDarkMode ? 'border-[#22164a]' : 'border-slate-200'
            } flex items-center justify-between text-xs`}>
              <button
                onClick={() => {
                  onSelectProject(null);
                  onClose();
                }}
                className={`text-xs font-semibold ${
                  isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                } cursor-pointer`}
              >
                View All Chats (Unfiltered)
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold cursor-pointer"
              >
                Done
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* DIALOG: MOVE CHATS INTO CURRENT PROJECT */}
      {isAddChatsDialogOpen && currentProject && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className={`w-full max-w-md rounded-3xl border ${
            isDarkMode ? 'bg-[#120d2c] border-[#311f6b] text-white' : 'bg-white border-slate-200 text-slate-900 shadow-2xl'
          } p-5 flex flex-col max-h-[80vh]`}>
            
            <div className="flex items-center justify-between pb-3 border-b border-purple-500/20 mb-3">
              <h4 className="font-extrabold text-sm flex items-center gap-2">
                <Folder className="w-4 h-4 text-purple-400" />
                <span>Move Chats into "{currentProject.name}"</span>
              </h4>
              <button
                onClick={() => setIsAddChatsDialogOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-400 mb-3">
              Select any conversation to move it into this project:
            </p>

            <div className="flex-1 overflow-y-auto space-y-2 pr-1 min-h-[160px]">
              {unassignedChats.length === 0 ? (
                <div className="text-center py-8 text-xs text-slate-500">
                  No other conversations available to move.
                </div>
              ) : (
                unassignedChats.map(chat => (
                  <div
                    key={chat.id}
                    onClick={() => {
                      onMoveChatToProject(chat.id, currentProject.id);
                    }}
                    className={`p-3 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                      isDarkMode ? 'bg-[#181138] border-[#291b5c] hover:border-purple-500 hover:bg-[#20154a]' : 'bg-slate-50 border-slate-200 hover:bg-purple-50'
                    }`}
                  >
                    <div className="min-w-0 pr-2">
                      <div className="text-xs font-bold truncate text-white">{chat.title}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{chat.date}</div>
                    </div>
                    <span className="text-[11px] font-bold text-purple-400 bg-purple-500/20 px-2 py-1 rounded-lg shrink-0 flex items-center gap-1">
                      <Plus className="w-3 h-3" /> Move
                    </span>
                  </div>
                ))
              )}
            </div>

            <div className="pt-3 border-t border-purple-500/20 flex justify-end mt-3">
              <button
                onClick={() => setIsAddChatsDialogOpen(false)}
                className="px-4 py-2 bg-[#7c3aed] text-white text-xs font-bold rounded-xl cursor-pointer"
              >
                Done
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
