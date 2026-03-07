import React, { useState, useRef, useEffect } from 'react';
import {
  Database, Search, Plus, ChevronRight, Folder, FolderOpen,
  Pencil, Trash2, Settings, LogIn,
} from 'lucide-react';
import { Project, Story, GoogleUser } from '../types';

interface SidebarProps {
  projects: Project[];
  stories: Story[];
  activeProjectId: string | null;
  activeStoryId: string | null;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onProjectClick: (projectId: string) => void;
  onStoryClick: (storyId: string, projectId: string) => void;
  onToggleProject: (e: React.MouseEvent, projectId: string) => void;
  onRenameProject: (e: React.MouseEvent, projectId: string, currentName: string) => void;
  onDeleteProject: (e: React.MouseEvent, projectId: string) => void;
  onAddProject: () => void;
  onAddStory: (projectId: string) => void;
  onDeleteStory: (e: React.MouseEvent, storyId: string) => void;
  onRenameStory: (storyId: string, newTitle: string) => void;
  onOpenSettings: () => void;
  googleUser: GoogleUser | null;
}

export function Sidebar({
  projects,
  stories,
  activeProjectId,
  activeStoryId,
  searchTerm,
  onSearchChange,
  onProjectClick,
  onStoryClick,
  onToggleProject,
  onRenameProject,
  onDeleteProject,
  onAddProject,
  onAddStory,
  onDeleteStory,
  onRenameStory,
  onOpenSettings,
  googleUser,
}: SidebarProps) {
  const [editingStoryId, setEditingStoryId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState('');
  const editInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingStoryId) editInputRef.current?.focus();
  }, [editingStoryId]);

  const startEditStory = (e: React.MouseEvent, story: Story) => {
    e.stopPropagation();
    setEditingStoryId(story.id);
    setEditingTitle(story.title);
  };

  const commitEditStory = () => {
    if (editingStoryId && editingTitle.trim()) {
      onRenameStory(editingStoryId, editingTitle.trim());
    }
    setEditingStoryId(null);
  };

  return (
    <>
      {/* Header */}
      <div className="p-4 border-b border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-lg">
            <Database className="w-6 h-6" />
            <span>Quori</span>
          </div>
          <button
            onClick={onOpenSettings}
            className="text-slate-500 hover:text-white transition-colors"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
        <button
          onClick={onAddProject}
          className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg text-sm font-medium transition-colors mb-2 shadow-lg shadow-indigo-900/20"
        >
          <Folder className="w-4 h-4" /> New Project
        </button>
        <div className="relative mb-3">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search library..."
            className="w-full bg-slate-900 border border-slate-800 rounded-md py-2 pl-9 pr-3 text-sm text-slate-300 focus:outline-none focus:border-indigo-500 placeholder-slate-600"
            value={searchTerm}
            onChange={e => onSearchChange(e.target.value)}
          />
        </div>
      </div>

      {/* Project list */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="px-2 py-2 space-y-1">
          {projects.map(project => {
            const projectStories = stories.filter(
              s =>
                s.projectId === project.id &&
                (s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  s.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))),
            );
            if (searchTerm && projectStories.length === 0) return null;

            const isActiveProject = activeProjectId === project.id && !activeStoryId;

            return (
              <div key={project.id} className="mb-2">
                {/* Project row */}
                <div
                  className={`flex items-center justify-between px-2 py-1.5 rounded-md cursor-pointer group transition-colors ${
                    isActiveProject
                      ? 'bg-indigo-900/30 text-indigo-300'
                      : 'hover:bg-slate-900 text-slate-400'
                  }`}
                  onClick={() => onProjectClick(project.id)}
                >
                  <div className="flex items-center gap-2 overflow-hidden flex-1">
                    {project.isExpanded ? (
                      <FolderOpen className="w-4 h-4 flex-shrink-0" />
                    ) : (
                      <Folder className="w-4 h-4 flex-shrink-0" />
                    )}
                    <span
                      className={`text-sm font-semibold truncate ${
                        isActiveProject ? 'text-indigo-200' : 'text-slate-300'
                      }`}
                    >
                      {project.name}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <button
                      onClick={e => onRenameProject(e, project.id, project.name)}
                      className="opacity-0 group-hover:opacity-100 p-1 hover:text-white text-slate-500 transition-opacity mr-1"
                      title="Rename Folder"
                    >
                      <Pencil className="w-3 h-3" />
                    </button>
                    <button
                      onClick={e => onDeleteProject(e, project.id)}
                      className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-400 text-slate-500 transition-opacity mr-1"
                      title="Delete Folder"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                    <button
                      onClick={e => { e.stopPropagation(); onAddStory(project.id); }}
                      className="opacity-0 group-hover:opacity-100 p-1 hover:text-white text-slate-500 transition-opacity"
                      title="New Query in this Project"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={e => onToggleProject(e, project.id)}
                      className="p-1 hover:text-white text-slate-500"
                    >
                      <ChevronRight
                        className={`w-3.5 h-3.5 transition-transform ${project.isExpanded ? 'rotate-90' : ''}`}
                      />
                    </button>
                  </div>
                </div>

                {/* Stories */}
                {project.isExpanded && (
                  <div className="pl-3 mt-1 space-y-0.5 border-l border-slate-800 ml-3.5">
                    {projectStories.length === 0 ? (
                      <div className="px-3 py-2 text-xs text-slate-600 italic">No queries yet</div>
                    ) : (
                      projectStories.map(story => (
                        <div
                          key={story.id}
                          onClick={() => onStoryClick(story.id, project.id)}
                          className={`group relative pl-3 pr-2 py-2 rounded-r-md cursor-pointer transition-all border-l-2 ${
                            activeStoryId === story.id
                              ? 'bg-indigo-900/10 border-indigo-500'
                              : 'border-transparent hover:bg-slate-900'
                          }`}
                        >
                          <div className="flex justify-between items-start gap-1">
                            {editingStoryId === story.id ? (
                              <input
                                ref={editInputRef}
                                value={editingTitle}
                                onChange={e => setEditingTitle(e.target.value)}
                                onBlur={commitEditStory}
                                onKeyDown={e => {
                                  if (e.key === 'Enter') commitEditStory();
                                  if (e.key === 'Escape') setEditingStoryId(null);
                                }}
                                onClick={e => e.stopPropagation()}
                                className="flex-1 bg-slate-800 text-slate-200 text-xs px-1 rounded outline-none border border-indigo-500 min-w-0"
                              />
                            ) : (
                              <h3
                                className={`font-medium text-xs truncate flex-1 ${
                                  activeStoryId === story.id
                                    ? 'text-indigo-300'
                                    : 'text-slate-400 group-hover:text-slate-300'
                                }`}
                                onDoubleClick={e => startEditStory(e, story)}
                                title="Double-click to rename"
                              >
                                {story.title}
                              </h3>
                            )}
                            <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100">
                              <button
                                onClick={e => startEditStory(e, story)}
                                className="p-0.5 hover:text-indigo-400 transition-colors text-slate-600"
                                title="Rename"
                              >
                                <Pencil className="w-2.5 h-2.5" />
                              </button>
                              <button
                                onClick={e => onDeleteStory(e, story.id)}
                                className="p-0.5 hover:text-red-400 transition-colors text-slate-600"
                                title="Delete"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* User footer */}
      <div className="border-t border-slate-800 p-3">
        {googleUser ? (
          <button
            onClick={onOpenSettings}
            className="w-full flex items-center gap-3 px-2 py-1.5 rounded-lg hover:bg-slate-900 transition-colors group"
            title="Signed in — open Settings"
          >
            <img
              src={googleUser.picture}
              alt={googleUser.name}
              className="w-7 h-7 rounded-full border border-slate-700 flex-shrink-0"
            />
            <div className="flex-1 min-w-0 text-left">
              <p className="text-xs font-medium text-slate-300 truncate">{googleUser.name}</p>
              <p className="text-[10px] text-slate-500 truncate">{googleUser.email}</p>
            </div>
            <Settings className="w-3.5 h-3.5 text-slate-600 group-hover:text-slate-400 flex-shrink-0" />
          </button>
        ) : (
          <button
            onClick={onOpenSettings}
            className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-slate-900 transition-colors text-xs"
            title="Connect Google account"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Connect Google Account</span>
          </button>
        )}
      </div>
    </>
  );
}
