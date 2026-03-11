import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';

import { Project, Story, BqConfig, OAuthConfig, PendingDelete, DataDictionary } from './types';
import { usePersistedState } from './hooks/usePersistedState';
import { useGoogleAuth } from './hooks/useGoogleAuth';

import { Sidebar } from './components/Sidebar';
import { ProjectOverview } from './components/ProjectOverview';
import { ActiveStoryView } from './components/ActiveStoryView';
import { WelcomeScreen } from './components/WelcomeScreen';
import { UndoToast } from './components/UndoToast';

import { ConfirmDeleteModal } from './components/modals/ConfirmDeleteModal';
import { ProjectNameModal } from './components/modals/ProjectNameModal';
import { SettingsModal } from './components/modals/SettingsModal';

export default function App() {
  // ── Persisted state ──────────────────────────────────────────────────────
  const [projects, setProjects] = usePersistedState<Project[]>('quori_projects_v2', []);
  const [stories, setStories] = usePersistedState<Story[]>('quori_stories_v2', []);
  const [activeProjectId, setActiveProjectId] = usePersistedState<string | null>('quori_active_project_v2', null);
  const [activeStoryId, setActiveStoryId] = usePersistedState<string | null>('quori_active_story_v2', null);
  const [bqConfig, setBqConfig] = usePersistedState<BqConfig>('quori_bq_config', {
    projectId: 'my-analytics-project',
    location: 'US',
  });
  const [isSidebarOpen, setIsSidebarOpen] = usePersistedState('quori_sidebar_open', true);
  const [oauthConfig, setOAuthConfig] = usePersistedState<OAuthConfig>('quori_oauth_config', {
    clientId: '',
    clientSecret: '',
  });
  const [dataDictionary, setDataDictionary] = usePersistedState<DataDictionary>('quori_data_dictionary', { tables: {} });
  const [theme, setTheme] = usePersistedState<'dark' | 'light'>('quori_theme', 'dark');

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const handleToggleTheme = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'));

  // ── Google Auth ───────────────────────────────────────────────────────────
  const { user: googleUser, signIn, signOut } = useGoogleAuth(oauthConfig);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [signInError, setSignInError] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    setIsSigningIn(true);
    setSignInError(null);
    try {
      await signIn();
    } catch (err) {
      setSignInError((err as Error).message);
    } finally {
      setIsSigningIn(false);
    }
  };

  // ── UI state ─────────────────────────────────────────────────────────────
  const [searchTerm, setSearchTerm] = useState('');
  const [showConfig, setShowConfig] = useState(false);

  // Project modals
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);
  const [projectModal, setProjectModal] = useState<
    { mode: 'create' } | { mode: 'rename'; id: string } | null
  >(null);
  const [projectModalName, setProjectModalName] = useState('');

  // Undo toast
  const [pendingDelete, setPendingDelete] = useState<PendingDelete | null>(null);

  // ── Derived values ────────────────────────────────────────────────────────
  const activeStory = useMemo(
    () => stories.find(s => s.id === activeStoryId) ?? null,
    [stories, activeStoryId],
  );
  const activeProject = useMemo(
    () => projects.find(p => p.id === activeProjectId) ?? null,
    [projects, activeProjectId],
  );
  const activeProjectStories = useMemo(
    () =>
      activeProject
        ? stories
            .filter(s => s.projectId === activeProject.id)
            .sort((a, b) => a.order - b.order)
        : [],
    [activeProject, stories],
  );

  // ── Project actions ───────────────────────────────────────────────────────
  const handleProjectClick = (projectId: string) => {
    setActiveProjectId(projectId);
    setActiveStoryId(null);
    setProjects(prev => prev.map(p => p.id === projectId ? { ...p, isExpanded: true } : p));
  };

  const handleToggleProject = (e: React.MouseEvent, projectId: string) => {
    e.stopPropagation();
    setProjects(prev => prev.map(p => p.id === projectId ? { ...p, isExpanded: !p.isExpanded } : p));
  };

  const handleRenameProject = (e: React.MouseEvent, projectId: string, currentName: string) => {
    e.stopPropagation();
    setProjectModal({ mode: 'rename', id: projectId });
    setProjectModalName(currentName);
  };

  const handleDeleteProject = (e: React.MouseEvent, projectId: string) => {
    e.stopPropagation();
    setProjectToDelete(projectId);
  };

  const confirmDeleteProject = () => {
    if (!projectToDelete) return;
    const id = projectToDelete;
    const deletedProject = projects.find(p => p.id === id);
    const deletedStories = stories.filter(s => s.projectId === id);

    setProjects(prev => prev.filter(p => p.id !== id));
    setStories(prev => prev.filter(s => s.projectId !== id));
    if (activeProjectId === id) { setActiveProjectId(null); setActiveStoryId(null); }
    setProjectToDelete(null);

    setPendingDelete({
      type: 'project',
      label: `Project "${deletedProject?.name ?? ''}" deleted`,
      restore: () => {
        setProjects(prev => [...prev, ...(deletedProject ? [deletedProject] : [])]);
        setStories(prev => [...prev, ...deletedStories]);
      },
    });
  };

  const confirmProjectModal = () => {
    if (!projectModal) return;
    if (!projectModalName.trim()) return;

    if (projectModal.mode === 'create') {
      const newId = crypto.randomUUID();
      setProjects(prev => [...prev, { id: newId, name: projectModalName.trim(), isExpanded: true }]);
      setActiveProjectId(newId);
      setActiveStoryId(null);
    } else {
      setProjects(prev =>
        prev.map(p => p.id === projectModal.id ? { ...p, name: projectModalName.trim() } : p),
      );
    }
    setProjectModal(null);
    setProjectModalName('');
  };

  // ── Story actions ─────────────────────────────────────────────────────────
  const handleStoryClick = (storyId: string, projectId: string) => {
    setActiveStoryId(storyId);
    setActiveProjectId(projectId);
  };

  const handleAddStory = useCallback((projectId: string) => {
    const maxOrder = stories.filter(s => s.projectId === projectId)
      .reduce((m, s) => Math.max(m, s.order ?? 0), 0);
    const newStory: Story = {
      id: crypto.randomUUID(),
      projectId,
      title: 'Untitled Analysis',
      status: 'draft',
      tags: [],
      lastModified: new Date().toISOString(),
      versions: [],
      order: maxOrder + 1,
    };
    setStories(prev => [newStory, ...prev]);
    setActiveStoryId(newStory.id);
    setActiveProjectId(projectId);
    setProjects(prev => prev.map(p => p.id === projectId ? { ...p, isExpanded: true } : p));
  }, [stories, setStories, setActiveStoryId, setActiveProjectId, setProjects]);

  const handleDeleteStory = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const deleted = stories.find(s => s.id === id);
    setStories(prev => prev.filter(s => s.id !== id));
    if (activeStoryId === id) setActiveStoryId(null);

    setPendingDelete({
      type: 'story',
      label: `Query "${deleted?.title ?? ''}" deleted`,
      restore: () => {
        if (deleted) setStories(prev => [deleted, ...prev]);
      },
    });
  };

  const handleRenameStory = (storyId: string, newTitle: string) => {
    setStories(prev => prev.map(s => s.id === storyId ? { ...s, title: newTitle } : s));
  };

  const updateStory = (updated: Story) =>
    setStories(prev => prev.map(s => s.id === updated.id ? updated : s));

  const handleReorderStories = (orderedIds: string[]) => {
    setStories(prev =>
      prev.map(s => {
        const idx = orderedIds.indexOf(s.id);
        return idx !== -1 ? { ...s, order: idx } : s;
      }),
    );
  };

  // ── Undo toast ────────────────────────────────────────────────────────────
  const handleUndo = () => {
    pendingDelete?.restore();
    setPendingDelete(null);
  };

  // ── Export / Import ───────────────────────────────────────────────────────
  const handleExport = () => {
    const data = { projects, stories, exportedAt: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `quori-export-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      try {
        const data = JSON.parse(ev.target?.result as string);
        const importedProjects: Project[] = data.projects ?? [];
        const importedStories: Story[] = data.stories ?? [];

        setProjects(prev => {
          const existingIds = new Set(prev.map(p => p.id));
          return [...prev, ...importedProjects.filter(p => !existingIds.has(p.id))];
        });
        setStories(prev => {
          const existingIds = new Set(prev.map(s => s.id));
          return [...prev, ...importedStories.filter(s => !existingIds.has(s.id))];
        });
      } catch {
        alert('Invalid JSON file.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="flex h-screen bg-slate-900 text-slate-200 overflow-hidden font-sans">
      {/* Sidebar */}
      <div
        className={`${isSidebarOpen ? 'w-80' : 'w-0'} flex-shrink-0 bg-slate-950 border-r border-slate-800 transition-all duration-300 flex flex-col overflow-hidden`}
      >
        <Sidebar
          projects={projects}
          stories={stories}
          activeProjectId={activeProjectId}
          activeStoryId={activeStoryId}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onProjectClick={handleProjectClick}
          onStoryClick={handleStoryClick}
          onToggleProject={handleToggleProject}
          onRenameProject={handleRenameProject}
          onDeleteProject={handleDeleteProject}
          onAddProject={() => { setProjectModal({ mode: 'create' }); setProjectModalName(''); }}
          onAddStory={handleAddStory}
          onDeleteStory={handleDeleteStory}
          onRenameStory={handleRenameStory}
          onOpenSettings={() => setShowConfig(true)}
          googleUser={googleUser}
          theme={theme}
          onToggleTheme={handleToggleTheme}
          hasAiAccess={!!googleUser}
        />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col h-full bg-slate-925 relative overflow-hidden">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute top-4 left-4 z-10 bg-slate-800 p-1 rounded-md text-slate-400 hover:text-white border border-slate-700"
        >
          <ChevronRight className={`w-4 h-4 transition-transform ${isSidebarOpen ? 'rotate-180' : ''}`} />
        </button>

        {activeStoryId && activeStory ? (
          <ActiveStoryView
            story={activeStory}
            onUpdate={updateStory}
            bqConfig={bqConfig}
            accessToken={googleUser?.accessToken ?? null}
            dataDictionary={dataDictionary}
            onUpdateDictionary={setDataDictionary}
          />
        ) : activeProjectId && activeProject ? (
          <ProjectOverview
            project={activeProject}
            stories={activeProjectStories}
            onOpenStory={id => handleStoryClick(id, activeProject.id)}
            onAddStory={() => handleAddStory(activeProject.id)}
            onDeleteStory={handleDeleteStory}
            onUpdateStory={updateStory}
            onReorderStories={handleReorderStories}
          />
        ) : (
          <WelcomeScreen
            hasGoogleUser={!!googleUser}
            projectCount={projects.length}
            onCreateProject={() => { setProjectModal({ mode: 'create' }); setProjectModalName(''); }}
            onOpenSettings={() => setShowConfig(true)}
          />
        )}
      </div>

      {/* ── Modals ─────────────────────────────────────────────────────────── */}

      {projectToDelete && (
        <ConfirmDeleteModal
          title="Delete Project?"
          message={
            <>
              Are you sure you want to delete this project? This will{' '}
              <strong>permanently delete all queries</strong> inside it. This action cannot be
              undone.
            </>
          }
          confirmLabel="Delete Project"
          onConfirm={confirmDeleteProject}
          onCancel={() => setProjectToDelete(null)}
        />
      )}

      {projectModal && (
        <ProjectNameModal
          mode={projectModal.mode}
          value={projectModalName}
          onChange={setProjectModalName}
          onConfirm={confirmProjectModal}
          onCancel={() => setProjectModal(null)}
        />
      )}

      {showConfig && (
        <SettingsModal
          bqConfig={bqConfig}
          onBqConfigChange={setBqConfig}
          oauthConfig={oauthConfig}
          onOAuthConfigChange={setOAuthConfig}
          googleUser={googleUser}
          onGoogleSignIn={handleGoogleSignIn}
          onGoogleSignOut={signOut}
          isSigningIn={isSigningIn}
          signInError={signInError}
          onClose={() => setShowConfig(false)}
          onExport={handleExport}
          onImport={handleImport}
        />
      )}

      {/* Undo Toast */}
      {pendingDelete && (
        <UndoToast
          message={pendingDelete.label}
          onUndo={handleUndo}
          onDismiss={() => setPendingDelete(null)}
        />
      )}
    </div>
  );
}
