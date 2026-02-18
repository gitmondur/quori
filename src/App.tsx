import React, { useState, useEffect, useMemo } from 'react';
import { 
  Database, 
  Search, 
  Plus, 

  ChevronRight, 
  ChevronDown, 
  Code2, 
  Save, 
  Trash2, 
  Copy, 

  GitBranch,
  Sparkles,
  Loader,
  Wand2,
  Settings,

  ExternalLink,

  Clock,
  Folder,
  FolderOpen,

  PlusSquare,
  Pencil,

  Table,
  PanelRightClose,
  PanelRightOpen,
  Clipboard,
  Key,
  X,
  AlertTriangle
} from 'lucide-react';

// --- Gemini API Helper (Stateless) ---
const callGemini = async (prompt: string, apiKey: string) => {
  if (!apiKey) return "Error: API Key is missing.";

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
  const payload = {
    contents: [{ parts: [{ text: prompt }] }]
  };

  const delays = [1000, 2000, 4000, 8000, 16000];
  
  for (let i = 0; i <= delays.length; i++) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        if (response.status === 429 && i < delays.length) {
          await new Promise(r => setTimeout(r, delays[i]));
          continue;
        }
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated.";
    } catch (error) {
      if (i === delays.length) {
        console.error("Gemini API failed after retries:", error);
        return "Error: Could not reach the AI service.";
      }
      await new Promise(r => setTimeout(r, delays[i]));
    }
  }
  return "Error: Request failed.";
};

// --- Helper: Extract Tables from SQL ---
const extractTables = (versions: any[]) => {
  const uniqueTables = new Set();
  const tableRegex = /\b(?:FROM|JOIN)\s+([`a-zA-Z0-9_.-]+)/gi;

  versions.forEach(v => {
    let match;
    const regex = new RegExp(tableRegex); 
    while ((match = regex.exec(v.query)) !== null) {
      let tableName = match[1];
      tableName = tableName.replace(/`/g, '');
      if (!tableName.startsWith('(') && tableName.toUpperCase() !== 'SELECT' && tableName.toUpperCase() !== 'UNNEST') {
        uniqueTables.add(tableName);
      }
    }
  });

  return Array.from(uniqueTables).sort();
};

// --- Simple SQL Syntax Highlighter ---
const SQLHighlighter = ({ code }: { code: string }) => {
  const highlight = (text: string) => {
    if (!text) return "";
    const keywords = /\b(SELECT|FROM|WHERE|AND|OR|GROUP BY|ORDER BY|LIMIT|JOIN|LEFT|RIGHT|INNER|OUTER|ON|AS|COUNT|SUM|AVG|MAX|MIN|HAVING|INSERT|UPDATE|DELETE|CREATE|DROP|ALTER|WITH|PARTITION|CLUSTER)\b/gi;
    const strings = /'[^']*'/g;
    const backticks = /`[^`]*`/g;
    const numbers = /\b\d+\b/g;

    const tokens = text.split(/(\s+)/);

    return tokens.map((token, i) => {
      if (token.match(keywords)) {
        return <span key={i} className="text-blue-400 font-bold">{token}</span>;
      } else if (token.match(strings)) {
        return <span key={i} className="text-amber-300">{token}</span>;
      } else if (token.match(backticks)) {
        return <span key={i} className="text-purple-300">{token}</span>;
      } else if (token.match(numbers)) {
        return <span key={i} className="text-emerald-300">{token}</span>;
      }
      return <span key={i} className="text-slate-300">{token}</span>;
    });
  };

  return (
    <pre className="font-mono text-sm overflow-x-auto whitespace-pre-wrap">
      {highlight(code)}
    </pre>
  );
};

// --- Empty Defaults ---
const initialProjects: any[] = [];
const initialStories: any[] = [];

export default function App() {
  // --- Local Storage Initialization (v2 keys to force fresh start) ---
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem("quory_projects_v2");
    return saved ? JSON.parse(saved) : initialProjects;
  });
  
  const [stories, setStories] = useState(() => {
    const saved = localStorage.getItem("quory_stories_v2");
    return saved ? JSON.parse(saved) : initialStories;
  });

  const [activeProjectId, setActiveProjectId] = useState(() => {
    const saved = localStorage.getItem("quory_active_project_v2");
    return saved ? JSON.parse(saved) : null;
  });

  const [activeStoryId, setActiveStoryId] = useState(() => {
    const saved = localStorage.getItem("quory_active_story_v2");
    return saved ? JSON.parse(saved) : null;
  });

  const [bqConfig, setBqConfig] = useState(() => {
    const saved = localStorage.getItem("quory_bq_config");
    return saved ? JSON.parse(saved) : { projectId: "my-analytics-project", location: "US" };
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    const saved = localStorage.getItem("quory_sidebar_open");
    return saved ? JSON.parse(saved) : true;
  });

  // --- UI State ---
  const [searchTerm, setSearchTerm] = useState("");
  const [showConfig, setShowConfig] = useState(false);
  const [geminiApiKey, setGeminiApiKey] = useState(localStorage.getItem("quory_gemini_api_key") || "");
  const [showApiKeyModal, setShowApiKeyModal] = useState(!localStorage.getItem("quory_gemini_api_key"));
  
  // Modal States
  const [projectToDelete, setProjectToDelete] = useState(null); // ID of project to delete
  const [showCreateProjectModal, setShowCreateProjectModal] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  
  // Rename Modal State
  const [showRenameProjectModal, setShowRenameProjectModal] = useState(false);
  const [projectToRenameId, setProjectToRenameId] = useState(null);
  const [renameProjectName, setRenameProjectName] = useState("");

  // --- Persist State Changes ---
  useEffect(() => { localStorage.setItem("quory_projects_v2", JSON.stringify(projects)); }, [projects]);
  useEffect(() => { localStorage.setItem("quory_stories_v2", JSON.stringify(stories)); }, [stories]);
  useEffect(() => { localStorage.setItem("quory_active_project_v2", JSON.stringify(activeProjectId)); }, [activeProjectId]);
  useEffect(() => { localStorage.setItem("quory_active_story_v2", JSON.stringify(activeStoryId)); }, [activeStoryId]);
  useEffect(() => { localStorage.setItem("quory_bq_config", JSON.stringify(bqConfig)); }, [bqConfig]);
  useEffect(() => { localStorage.setItem("quory_sidebar_open", JSON.stringify(isSidebarOpen)); }, [isSidebarOpen]);

  // --- Computed Values ---
  const activeStory = useMemo(() => stories.find((s: any) => s.id === activeStoryId), [stories, activeStoryId]);
  const activeProject = useMemo(() => projects.find((p: any) => p.id === activeProjectId), [projects, activeProjectId]);
  const activeProjectStories = useMemo(() => activeProject ? stories.filter((s: any) => s.projectId === activeProject.id) : [], [activeProject, stories]);

  // --- Actions ---
  const handleSaveApiKey = (key: string) => {
    localStorage.setItem("quory_gemini_api_key", key);
    setGeminiApiKey(key);
    setShowApiKeyModal(false);
  };

  const handleProjectClick = (projectId: any) => {
    setActiveProjectId(projectId);
    setActiveStoryId(null);
    setProjects(projects.map((p: any) => p.id === projectId ? { ...p, isExpanded: true } : p));
  };

  const handleStoryClick = (storyId: any, projectId: any) => {
    setActiveStoryId(storyId);
    setActiveProjectId(projectId);
  };

  const toggleProjectExpansion = (e: React.MouseEvent, projectId: any) => {
    e.stopPropagation();
    setProjects(projects.map((p: any) => p.id === projectId ? { ...p, isExpanded: !p.isExpanded } : p));
  };

  const handleRenameProject = (e: React.MouseEvent, projectId: any, currentName: string) => {
    e.stopPropagation();
    setProjectToRenameId(projectId);
    setRenameProjectName(currentName);
    setShowRenameProjectModal(true);
  };

  const confirmRenameProject = () => {
    if (renameProjectName && renameProjectName.trim() !== "") {
      setProjects(projects.map((p: any) => p.id === projectToRenameId ? { ...p, name: renameProjectName } : p));
      setShowRenameProjectModal(false);
      setProjectToRenameId(null);
    }
  };

  const confirmDeleteProject = () => {
    if (!projectToDelete) return;
    
    // Delete stories associated with the project
    const newStories = stories.filter((s: any) => s.projectId !== projectToDelete);
    setStories(newStories);
    
    // Delete the project
    const newProjects = projects.filter((p: any) => p.id !== projectToDelete);
    setProjects(newProjects);

    if (activeProjectId === projectToDelete) {
      setActiveProjectId(null);
      setActiveStoryId(null);
    }
    setProjectToDelete(null);
  };

  const handleAddProject = () => {
    setNewProjectName("");
    setShowCreateProjectModal(true);
  };

  const confirmAddProject = () => {
    if (!newProjectName.trim()) return;
    const newId = `p-${Date.now()}`;
    setProjects([...projects, { id: newId, name: newProjectName, isExpanded: true }]);
    setActiveProjectId(newId);
    setActiveStoryId(null);
    setShowCreateProjectModal(false);
  };

  const handleAddStory = (projectId: any) => {
    const newStory = {
      id: Date.now(),
      projectId: projectId,
      title: "Untitled Analysis",
      status: "draft",
      tags: [],
      lastModified: new Date().toISOString(),
      versions: [] // Start with NO versions so user sees "Add new iteration" immediately
    };
    setStories([newStory, ...stories]);
    setActiveStoryId(newStory.id);
    setActiveProjectId(projectId);
    setProjects(projects.map((p: any) => p.id === projectId ? { ...p, isExpanded: true } : p));
  };

  const updateStory = (updatedStory: any) => setStories(stories.map((s: any) => s.id === updatedStory.id ? updatedStory : s));

  const handleDeleteStory = (e: React.MouseEvent, id: any) => {
    e.stopPropagation();
    const newStories = stories.filter((s: any) => s.id !== id);
    setStories(newStories);
    if (activeStoryId === id) setActiveStoryId(null);
  };

  // Explicitly using React.Fragment to ensure React is used in JSX
  return (
    <div className="flex h-screen bg-slate-900 text-slate-200 overflow-hidden font-sans">
      
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'w-80' : 'w-0'} flex-shrink-0 bg-slate-950 border-r border-slate-800 transition-all duration-300 flex flex-col`}>
        <div className="p-4 border-b border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-lg">
              <Database className="w-6 h-6" />
              <span>Quory</span>
            </div>
            <button onClick={() => setShowConfig(true)} className="text-slate-500 hover:text-white transition-colors">
              <Settings className="w-4 h-4" />
            </button>
          </div>
          <button onClick={handleAddProject} className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg text-sm font-medium transition-colors mb-2 shadow-lg shadow-indigo-900/20"><Folder className="w-4 h-4" /> New Project</button>
          <div className="relative mb-3"><Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" /><input type="text" placeholder="Search library..." className="w-full bg-slate-900 border border-slate-800 rounded-md py-2 pl-9 pr-3 text-sm text-slate-300 focus:outline-none focus:border-indigo-500 placeholder-slate-600" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /></div>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar">
           <div className="px-2 py-2 space-y-1">
             {projects.map((project: any) => {
               const projectStories = stories.filter((s: any) => s.projectId === project.id && (s.title.toLowerCase().includes(searchTerm.toLowerCase()) || s.tags.some((t: any) => t.toLowerCase().includes(searchTerm.toLowerCase()))));
               if (searchTerm && projectStories.length === 0) return null;
               const isActiveProject = activeProjectId === project.id && !activeStoryId;
               return (
                 <div key={project.id} className="mb-2">
                    <div className={`flex items-center justify-between px-2 py-1.5 rounded-md cursor-pointer group transition-colors ${isActiveProject ? 'bg-indigo-900/30 text-indigo-300' : 'hover:bg-slate-900 text-slate-400'}`} onClick={() => handleProjectClick(project.id)}>
                      <div className="flex items-center gap-2 overflow-hidden flex-1">{project.isExpanded ? <FolderOpen className="w-4 h-4 flex-shrink-0" /> : <Folder className="w-4 h-4 flex-shrink-0" />}<span className={`text-sm font-semibold truncate ${isActiveProject ? 'text-indigo-200' : 'text-slate-300'}`}>{project.name}</span></div>
                      <div className="flex items-center">
                         <button onClick={(e) => handleRenameProject(e, project.id, project.name)} className="opacity-0 group-hover:opacity-100 p-1 hover:text-white text-slate-500 transition-opacity mr-1" title="Rename Folder"><Pencil className="w-3 h-3" /></button>
                         <button 
                           onClick={(e) => { e.stopPropagation(); setProjectToDelete(project.id); }} 
                           className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-400 text-slate-500 transition-opacity mr-1" 
                           title="Delete Folder"
                         >
                           <Trash2 className="w-3 h-3" />
                         </button>
                         <button onClick={(e) => { e.stopPropagation(); handleAddStory(project.id); }} className="opacity-0 group-hover:opacity-100 p-1 hover:text-white text-slate-500 transition-opacity" title="New Query in this Project"><Plus className="w-3.5 h-3.5" /></button>
                         <button onClick={(e) => toggleProjectExpansion(e, project.id)} className="p-1 hover:text-white text-slate-500"><ChevronRight className={`w-3.5 h-3.5 transition-transform ${project.isExpanded ? 'rotate-90' : ''}`} /></button>
                      </div>
                    </div>
                    {project.isExpanded && (
                      <div className="pl-3 mt-1 space-y-0.5 border-l border-slate-800 ml-3.5">
                        {projectStories.length === 0 ? (<div className="px-3 py-2 text-xs text-slate-600 italic">No queries yet</div>) : (
                          projectStories.map((story: any) => (
                            <div key={story.id} onClick={() => handleStoryClick(story.id, project.id)} className={`group relative pl-3 pr-2 py-2 rounded-r-md cursor-pointer transition-all border-l-2 ${activeStoryId === story.id ? 'bg-indigo-900/10 border-indigo-500' : 'border-transparent hover:bg-slate-900'}`}>
                              <div className="flex justify-between items-start"><h3 className={`font-medium text-xs truncate w-32 ${activeStoryId === story.id ? 'text-indigo-300' : 'text-slate-400 group-hover:text-slate-300'}`}>{story.title}</h3><button onClick={(e) => handleDeleteStory(e, story.id)} className="opacity-0 group-hover:opacity-100 p-0.5 hover:text-red-400 transition-opacity text-slate-600"><Trash2 className="w-3 h-3" /></button></div>
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
      </div>

      {/* Main Content Switcher */}
      <div className="flex-1 flex flex-col h-full bg-slate-925 relative overflow-hidden">
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className={`absolute top-4 ${isSidebarOpen ? 'left-4' : 'left-4'} z-10 bg-slate-800 p-1 rounded-md text-slate-400 hover:text-white border border-slate-700`}>{isSidebarOpen ? <ChevronRight className="w-4 h-4 rotate-180" /> : <ChevronRight className="w-4 h-4" />}</button>

        {activeStoryId && activeStory ? (
          <ActiveStoryView story={activeStory} onUpdate={updateStory} bqConfig={bqConfig} geminiApiKey={geminiApiKey} />
        ) : activeProjectId && activeProject ? (
          <ProjectOverview project={activeProject} stories={activeProjectStories} onOpenStory={(id: any) => handleStoryClick(id, activeProject.id)} onAddStory={() => handleAddStory(activeProject.id)} onDeleteStory={handleDeleteStory} onUpdateStory={updateStory} />
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-600">
            <div className="w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center mb-6 border border-slate-800"><Database className="w-10 h-10 text-indigo-500/50" /></div>
            <h2 className="text-xl font-bold text-slate-300 mb-2">Welcome to Quory</h2>
            <p className="text-slate-500 max-w-sm text-center">Select a project from the sidebar to view its queries or create a new one.</p>
            <button onClick={handleAddProject} className="mt-6 text-indigo-400 hover:text-indigo-300 text-sm font-medium flex items-center gap-2"><PlusSquare className="w-4 h-4" /> Create your first Project</button>
          </div>
        )}
      </div>

      {/* Delete Project Modal */}
      {projectToDelete && (
        <div className="fixed inset-0 z-[70] bg-slate-950/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 p-6 rounded-xl max-w-sm w-full shadow-2xl">
            <div className="flex items-center gap-3 mb-4 text-amber-500">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="text-lg font-bold text-white">Delete Project?</h3>
            </div>
            <p className="text-slate-400 text-sm mb-6">
              Are you sure you want to delete this project? This will <strong>permanently delete all queries</strong> inside it. This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setProjectToDelete(null)}
                className="px-4 py-2 text-slate-400 hover:text-white text-sm font-medium transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={confirmDeleteProject}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors"
              >
                Delete Project
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Project Modal */}
      {showCreateProjectModal && (
        <div className="fixed inset-0 z-[70] bg-slate-950/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 p-6 rounded-xl max-w-sm w-full shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Folder className="w-5 h-5 text-indigo-400" /> New Project
              </h3>
              <button onClick={() => setShowCreateProjectModal(false)} className="text-slate-500 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <input 
              type="text" 
              placeholder="Project Name" 
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white mb-6 focus:border-indigo-500 outline-none"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') confirmAddProject(); }}
              autoFocus
            />
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setShowCreateProjectModal(false)}
                className="px-4 py-2 text-slate-400 hover:text-white text-sm font-medium transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={confirmAddProject}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors"
              >
                Create Project
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rename Project Modal */}
      {showRenameProjectModal && (
        <div className="fixed inset-0 z-[70] bg-slate-950/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 p-6 rounded-xl max-w-sm w-full shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Pencil className="w-5 h-5 text-indigo-400" /> Rename Project
              </h3>
              <button onClick={() => setShowRenameProjectModal(false)} className="text-slate-500 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <input 
              type="text" 
              placeholder="Project Name" 
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white mb-6 focus:border-indigo-500 outline-none"
              value={renameProjectName}
              onChange={(e) => setRenameProjectName(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') confirmRenameProject(); }}
              autoFocus
            />
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setShowRenameProjectModal(false)}
                className="px-4 py-2 text-slate-400 hover:text-white text-sm font-medium transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={confirmRenameProject}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors"
              >
                Save Name
              </button>
            </div>
          </div>
        </div>
      )}

      {/* API Key Modal */}
      {showApiKeyModal && (
        <div className="fixed inset-0 z-[60] bg-slate-950/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 p-8 rounded-xl max-w-md w-full shadow-2xl animate-in fade-in zoom-in-95 duration-300 relative">
             <button onClick={() => setShowApiKeyModal(false)} className="absolute top-4 right-4 text-slate-500 hover:text-white" title="Skip for now"><X className="w-5 h-5" /></button>
             <div className="flex justify-center mb-4"><div className="p-3 bg-indigo-500/10 rounded-full"><Key className="w-8 h-8 text-indigo-400" /></div></div>
             <h2 className="text-xl font-bold text-white mb-2 text-center">Welcome to Quory</h2>
             <p className="text-slate-400 mb-6 text-sm text-center">To use AI features like smart naming and explanations, please enter your Gemini API Key. You can also skip this and add it later in settings.</p>
             <input type="password" placeholder="Enter API Key (AIza...)" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white mb-4 focus:border-indigo-500 outline-none" onKeyDown={(e) => { if (e.key === 'Enter') handleSaveApiKey(e.currentTarget.value); }} />
             <div className="flex flex-col gap-3">
               <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-lg transition-colors" onClick={(e) => { const input = e.currentTarget.parentElement?.previousSibling as HTMLInputElement; handleSaveApiKey(input.value); }}>Save Key & Start</button>
               <button className="w-full text-slate-500 hover:text-slate-300 text-sm font-medium transition-colors" onClick={() => setShowApiKeyModal(false)}>Skip for now</button>
             </div>
             <p className="mt-4 text-xs text-center text-slate-500">Don't have a key? <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="text-indigo-400 hover:underline">Get one here</a></p>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {showConfig && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-slate-900 border border-slate-700 p-6 rounded-xl w-96 shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-4">Settings</h3>
            <div className="space-y-4">
              <div><label className="block text-xs font-medium text-slate-400 mb-1">BigQuery Project ID</label><input type="text" value={bqConfig.projectId} onChange={(e) => setBqConfig({...bqConfig, projectId: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-sm text-white focus:border-indigo-500 outline-none" /></div>
              <div><label className="block text-xs font-medium text-slate-400 mb-1">Gemini API Key</label><input type="password" value={geminiApiKey} onChange={(e) => { setGeminiApiKey(e.target.value); localStorage.setItem("quory_gemini_api_key", e.target.value); }} className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-sm text-white focus:border-indigo-500 outline-none" placeholder="Optional" /></div>
            </div>
            <div className="flex justify-end mt-6"><button onClick={() => setShowConfig(false)} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm">Close</button></div>
          </div>
        </div>
      )}
    </div>
  );
}

// --- Component: Project Overview ---
function ProjectOverview({ project, stories, onOpenStory, onAddStory, onDeleteStory, onUpdateStory }: any) {
  return (
    <div className="flex flex-col h-full">
      <div className="p-8 pb-4 border-b border-slate-800 bg-slate-950/30">
        <div className="flex items-center gap-3 mb-2 text-slate-500 text-sm font-medium uppercase tracking-wider"><Folder className="w-4 h-4" /> Project</div>
        <h1 className="text-3xl font-bold text-white mb-4 pl-1">{project.name}</h1>
        <div className="flex gap-4 pl-1 text-sm text-slate-400"><span>{stories.length} Queries</span></div>
      </div>
      <div className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-slate-925">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl">
          <button onClick={onAddStory} className="flex flex-col items-center justify-center h-48 rounded-xl border-2 border-dashed border-slate-700 hover:border-indigo-500 hover:bg-slate-900/50 transition-all group"><div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform"><Plus className="w-6 h-6 text-indigo-400" /></div><span className="text-slate-400 font-medium group-hover:text-white">New Query Analysis</span></button>
          {stories.map((story: any) => <StorySummaryCard key={story.id} story={story} onOpen={() => onOpenStory(story.id)} onDelete={(e: any) => onDeleteStory(e, story.id)} onUpdate={onUpdateStory} />)}
        </div>
      </div>
    </div>
  );
}

function StorySummaryCard({ story, onOpen, onDelete, onUpdate }: any) {
  const [isExpanded, setIsExpanded] = useState(false);
  const latestVersion = story.versions[story.versions.length - 1];

  const handleStatusClick = (e: any) => {
    e.stopPropagation();
    const nextStatus = story.status === 'draft' ? 'active' : story.status === 'active' ? 'done' : 'draft';
    onUpdate({ ...story, status: nextStatus });
  };

  const statusColors: any = {
    draft: 'bg-amber-950 text-amber-400 border-amber-900 hover:bg-amber-900 cursor-pointer',
    active: 'bg-emerald-950 text-emerald-400 border-emerald-900 hover:bg-emerald-900 cursor-pointer',
    done: 'bg-blue-950 text-blue-400 border-blue-900 hover:bg-blue-900 cursor-pointer'
  };

  return (
    <div className={`bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-slate-600 transition-all flex flex-col ${isExpanded ? 'row-span-2' : ''}`}>
      <div className="p-5 flex-1">
        <div className="flex justify-between items-start mb-3"><div className="flex gap-2"><button onClick={handleStatusClick} className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border transition-colors ${statusColors[story.status] || statusColors.draft}`} title="Click to change status">{story.status}</button></div><button onClick={onDelete} className="text-slate-600 hover:text-red-400 transition-colors"><Trash2 className="w-4 h-4" /></button></div>
        <h3 className="text-lg font-semibold text-slate-200 mb-2 line-clamp-2 leading-tight" title={story.title}>{story.title}</h3>
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-4"><Clock className="w-3 h-3" /> {new Date(story.lastModified).toLocaleDateString()}<span>•</span><span>{story.versions.length} versions</span></div>
        {story.tags.length > 0 && (<div className="flex flex-wrap gap-1 mb-4">{story.tags.slice(0, 3).map((tag: any) => (<span key={tag} className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded">#{tag}</span>))}</div>)}
      </div>
      <div className="bg-slate-950 border-t border-slate-800">
        <button onClick={() => setIsExpanded(!isExpanded)} className="w-full px-4 py-2 flex items-center justify-between text-xs font-medium text-slate-500 hover:text-indigo-400 hover:bg-slate-900/50 transition-colors"><span className="flex items-center gap-2"><Code2 className="w-3 h-3" /> {isExpanded ? 'Hide Query' : 'Preview Latest Query'}</span><ChevronDown className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-180' : ''}`} /></button>
        {isExpanded && (<div className="p-3 border-t border-slate-800 overflow-x-auto"><div className="text-xs font-mono text-slate-400 whitespace-pre-wrap max-h-32 overflow-y-auto custom-scrollbar">{latestVersion?.query || "-- No Query --"}</div></div>)}
        <button onClick={onOpen} className="w-full py-3 bg-slate-900 hover:bg-indigo-600/10 hover:text-indigo-400 text-slate-400 text-sm font-medium border-t border-slate-800 transition-colors flex items-center justify-center gap-2">Open Analysis <ExternalLink className="w-3 h-3" /></button>
      </div>
    </div>
  );
}

// --- Active Story View ---
function ActiveStoryView({ story, onUpdate, bqConfig, geminiApiKey }: any) {
  const [newQueryMode, setNewQueryMode] = useState(false);
  const [draftQuery, setDraftQuery] = useState("");
  const [draftNote, setDraftNote] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(() => {
    const saved = localStorage.getItem("quory_right_panel_open");
    return saved ? JSON.parse(saved) : true;
  });
  const [versionToDelete, setVersionToDelete] = useState(null); // ID of version to delete

  const detectedTables = useMemo(() => extractTables(story.versions), [story.versions]);

  useEffect(() => { localStorage.setItem("quory_right_panel_open", JSON.stringify(isRightPanelOpen)); }, [isRightPanelOpen]);

  const handleTitleChange = (e: any) => onUpdate({ ...story, title: e.target.value });
  
  const handleStatusClick = () => {
    const nextStatus = story.status === 'draft' ? 'active' : story.status === 'active' ? 'done' : 'draft';
    onUpdate({ ...story, status: nextStatus });
  };

  const statusColors: any = {
    draft: 'bg-amber-900/30 text-amber-400 border-amber-800 hover:bg-amber-900/50 cursor-pointer',
    active: 'bg-emerald-900/30 text-emerald-400 border-emerald-800 hover:bg-emerald-900/50 cursor-pointer',
    done: 'bg-blue-900/30 text-blue-400 border-blue-800 hover:bg-blue-900/50 cursor-pointer'
  };

  const handleOpenInConsole = () => {
    const textArea = document.createElement("textarea"); textArea.value = draftQuery; document.body.appendChild(textArea); textArea.select();
    try { document.execCommand('copy'); } catch (err) {} document.body.removeChild(textArea);
    const encodedQuery = encodeURIComponent(draftQuery);
    const url = `https://console.cloud.google.com/bigquery?project=${bqConfig.projectId}&page=query&query=${encodedQuery}`;
    window.open(url, '_blank');
  };



  const handleAddVersion = async () => {
    let finalNote = draftNote;
    setIsSaving(true);
    
    if (!finalNote.trim() && geminiApiKey) {
      try {
        const lastVersion = story.versions[story.versions.length - 1];
        const previousQuery = lastVersion ? lastVersion.query : "";
        const prompt = `Summarize the changes in the following SQL query compared to the previous version in less than 10 words. Previous: "${previousQuery}". Current: "${draftQuery}". Just the summary.`;
        finalNote = await callGemini(prompt, geminiApiKey);
      } catch (err) { finalNote = "Auto-saved version"; }
    } else if (!finalNote.trim()) {
      finalNote = "Query update"; 
    }

    const newVersion = { id: `v-${Date.now()}`, timestamp: new Date().toISOString(), note: finalNote || "Query update", query: draftQuery, executionTime: "-", bytesProcessed: "-", rowCount: 0 };
    onUpdate({ ...story, lastModified: new Date().toISOString(), versions: [...story.versions, newVersion] });
    setNewQueryMode(false); setDraftQuery(""); setDraftNote(""); setIsSaving(false);
  };

  const confirmDeleteVersion = () => {
    if (!versionToDelete) return;
    const newVersions = story.versions.filter((v: any) => v.id !== versionToDelete);
    onUpdate({ ...story, versions: newVersions });
    setVersionToDelete(null);
  };
  
  const handleAIGenerate = async () => {
    if (!geminiApiKey) { alert("Please configure your Gemini API Key in Settings to use AI Draft."); return; }
    if (!draftNote.trim()) { alert("Please enter a note/description first."); return; }
    setIsGenerating(true);
    const lastVersion = story.versions[story.versions.length - 1];
    const previousQuery = lastVersion ? lastVersion.query : "None (New Query)";
    const prompt = `You are an expert BigQuery SQL assistant. User Request: "${draftNote}". Previous Query: ${previousQuery}. Task: Generate updated SQL. Return ONLY raw SQL.`;
    const result = await callGemini(prompt, geminiApiKey);
    const cleanSQL = result.replace(/```sql/g, '').replace(/```/g, '').trim();
    setDraftQuery(cleanSQL); setIsGenerating(false);
  };
  
  const handleCopyTable = (tableName: any) => { const textArea = document.createElement("textarea"); textArea.value = tableName; document.body.appendChild(textArea); textArea.select(); try { document.execCommand('copy'); } catch (err) {} document.body.removeChild(textArea); };

  return (
    <div className="flex h-full">
      <div className="flex-1 flex flex-col min-w-0">
        <div className="p-6 pb-2 border-b border-slate-800 bg-slate-950/30">
          <div className="flex items-center justify-between mb-4 pl-8">
             <input type="text" value={story.title} onChange={handleTitleChange} className="bg-transparent text-2xl font-bold text-slate-100 focus:outline-none focus:border-b border-indigo-500 w-full" />
             <div className="flex gap-2"><button onClick={handleStatusClick} className={`px-2 py-1 rounded-full text-xs font-medium border transition-colors ${statusColors[story.status] || statusColors.draft}`} title="Click to change status">{story.status}</button><button onClick={() => setIsRightPanelOpen(!isRightPanelOpen)} className={`ml-2 p-1.5 rounded-md transition-colors ${isRightPanelOpen ? 'bg-indigo-900/50 text-indigo-300' : 'text-slate-500 hover:text-white hover:bg-slate-800'}`} title="Toggle Table Overview">{isRightPanelOpen ? <PanelRightClose className="w-5 h-5" /> : <PanelRightOpen className="w-5 h-5" />}</button></div>
          </div>
          <div className="pl-8 flex gap-4 text-sm text-slate-500"><p>{story.versions.length} iterations</p><p>Last edited {new Date(story.lastModified).toLocaleString()}</p></div>
        </div>
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          <div className="max-w-4xl mx-auto pl-4 border-l-2 border-slate-800 space-y-8 pb-32">
            {story.versions.map((version: any, idx: number) => (<QueryCard key={version.id} version={version} index={idx} total={story.versions.length} onFork={() => { setDraftQuery(version.query); setNewQueryMode(true); }} onDelete={() => setVersionToDelete(version.id)} geminiApiKey={geminiApiKey} />))}
            <div className="relative pt-4">
               <div className="absolute -left-[25px] top-8 w-4 h-4 rounded-full bg-indigo-600 border-4 border-slate-900 shadow-lg shadow-indigo-500/50 z-10"></div>
               {!newQueryMode ? (
                 <button onClick={() => { const lastQuery = story.versions[story.versions.length - 1]?.query || ""; setDraftQuery(lastQuery); setNewQueryMode(true); }} className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-medium ml-4 transition-colors"><Plus className="w-5 h-5" /> Add new iteration</button>
               ) : (
                 <div className="ml-4 bg-slate-900 border border-slate-700 rounded-xl overflow-hidden shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-300">
                   <div className="bg-slate-800/50 p-3 border-b border-slate-700 flex items-center justify-between"><div className="flex items-center gap-2 text-indigo-400 font-medium"><Code2 className="w-4 h-4" /><span>New Iteration</span></div><button onClick={() => setNewQueryMode(false)} className="text-slate-500 hover:text-slate-300">Cancel</button></div>
                   <div className="p-4 space-y-4">
                     <div className="flex flex-col gap-2"><label className="text-xs text-slate-500 uppercase font-semibold">Description / Prompt</label><div className="flex gap-2"><input type="text" placeholder="What did you change? (Leave empty for AI auto-name)" className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:border-indigo-500 focus:outline-none placeholder-slate-600" value={draftNote} onChange={(e) => setDraftNote(e.target.value)} autoFocus /><button onClick={handleAIGenerate} disabled={isGenerating || !draftNote} className={`flex items-center gap-2 px-3 py-2 text-white rounded-lg text-xs font-medium transition-all ${!geminiApiKey ? 'bg-slate-700 opacity-50 cursor-not-allowed' : 'bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500'}`} title={!geminiApiKey ? "Requires API Key" : "Generate with AI"}>{isGenerating ? <Loader className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />} AI Draft</button></div></div>
                     <div className="relative"><textarea value={draftQuery} onChange={(e) => { setDraftQuery(e.target.value); }} className="w-full h-48 bg-slate-950 font-mono text-sm p-4 rounded-lg border border-slate-800 focus:border-indigo-500 focus:outline-none text-slate-300 resize-none leading-relaxed" spellCheck="false" placeholder="Write SQL here..." /></div>
                     <div className="flex justify-end items-center pt-2 border-t border-slate-800/50">
                       <div className="flex gap-3">
                          <button onClick={handleOpenInConsole} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 text-sm font-medium transition-colors border border-slate-700" title="Copy Query and Open BigQuery Console"><ExternalLink className="w-4 h-4" /> Copy & Open Console</button>
                          <button onClick={handleAddVersion} disabled={!draftQuery || isSaving} className="flex items-center gap-2 px-6 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 text-sm font-medium shadow-lg shadow-indigo-900/20 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed">{isSaving ? <Loader className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} {isSaving ? "Naming..." : "Save Version"}</button>
                       </div>
                     </div>
                   </div>
                 </div>
               )}
            </div>
          </div>
        </div>
      </div>
      <div className={`transition-all duration-300 border-l border-slate-800 bg-slate-950 flex flex-col ${isRightPanelOpen ? 'w-72' : 'w-0 overflow-hidden'}`}>
        <div className="p-4 border-b border-slate-800 flex items-center gap-2"><Table className="w-4 h-4 text-indigo-400" /><span className="font-bold text-sm text-slate-200">Table Overview</span><span className="ml-auto bg-slate-800 text-slate-400 text-[10px] px-1.5 py-0.5 rounded-full">{detectedTables.length}</span></div>
        <div className="flex-1 overflow-y-auto p-2 custom-scrollbar">
           {detectedTables.length === 0 ? (<div className="text-center p-6 text-slate-600 text-xs italic">No tables detected yet. Write some SQL with FROM or JOIN clauses.</div>) : (
             <div className="space-y-1">
               {detectedTables.map((table: any, i: number) => (
                 <div key={i} className="group flex items-start justify-between p-2 hover:bg-slate-900 rounded-md transition-colors cursor-pointer" onClick={() => handleCopyTable(table)}>
                   <div className="flex items-center gap-2 min-w-0"><Table className="w-3 h-3 text-slate-500 mt-0.5 flex-shrink-0" /><span className="text-xs text-slate-300 font-mono break-all leading-tight">{table}</span></div><button className="opacity-0 group-hover:opacity-100 p-1 text-slate-500 hover:text-indigo-400 transition-all" title="Copy Table Name"><Clipboard className="w-3 h-3" /></button>
                 </div>
               ))}
             </div>
           )}
        </div>
      </div>

      {/* Delete Version Modal */}
      {versionToDelete && (
        <div className="fixed inset-0 z-[70] bg-slate-950/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 p-6 rounded-xl max-w-sm w-full shadow-2xl">
            <div className="flex items-center gap-3 mb-4 text-amber-500">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="text-lg font-bold text-white">Delete Version?</h3>
            </div>
            <p className="text-slate-400 text-sm mb-6">
              Are you sure you want to delete this specific query version? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setVersionToDelete(null)} className="px-4 py-2 text-slate-400 hover:text-white text-sm font-medium transition-colors">Cancel</button>
              <button onClick={confirmDeleteVersion} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function QueryCard({ version, index, total, onFork, onDelete, geminiApiKey }: any) {
  const [isExpanded, setIsExpanded] = useState(index === total - 1);
  const [copied, setCopied] = useState(false);
  const [explanation, setExplanation] = useState(null);
  const [isExplaining, setIsExplaining] = useState(false);

  const handleCopy = () => { const textArea = document.createElement("textarea"); textArea.value = version.query; document.body.appendChild(textArea); textArea.select(); try { document.execCommand('copy'); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch (err) {} document.body.removeChild(textArea); };
  const handleExplain = async (e: any) => {
    e.stopPropagation();
    if (explanation) { setExplanation(null); return; }
    if (!geminiApiKey) { alert("Please configure your Gemini API Key in Settings to use Smart Explain."); return; }
    setIsExplaining(true); setIsExpanded(true);
    const result = await callGemini(`Explain this SQL briefly: ${version.query}`, geminiApiKey);
    setExplanation(result); setIsExplaining(false);
  };

  return (
    <div className="relative group">
      <div className={`absolute -left-[25px] top-6 w-4 h-4 rounded-full border-4 border-slate-900 z-10 transition-colors duration-300 ${isExpanded ? 'bg-indigo-500' : 'bg-slate-600 group-hover:bg-slate-500'}`}></div>
      <div className={`ml-4 rounded-xl border transition-all duration-300 overflow-hidden ${isExpanded ? 'bg-slate-900 border-slate-700 shadow-xl' : 'bg-slate-900/30 border-slate-800/50 hover:bg-slate-900/80 hover:border-slate-700'}`}>
        <div onClick={() => setIsExpanded(!isExpanded)} className="p-4 flex items-start justify-between cursor-pointer select-none">
          <div className="flex gap-4 items-center"><div className={`p-2 rounded-lg ${isExpanded ? 'bg-indigo-500/10 text-indigo-400' : 'bg-slate-800 text-slate-500'}`}><Code2 className="w-5 h-5" /></div><div><div className="flex items-center gap-3"><h4 className={`font-semibold text-sm ${isExpanded ? 'text-slate-200' : 'text-slate-400'}`}>{version.note}</h4>{!isExpanded && <span className="text-xs text-slate-600 font-mono">{version.query.slice(0, 40)}...</span>}</div><p className="text-xs text-slate-500 mt-1">Version {index + 1} • {new Date(version.timestamp).toLocaleTimeString()}</p></div></div>
          <div className="flex items-center gap-2">
            <button onClick={handleExplain} className={`p-2 rounded hover:bg-slate-800 transition-colors ${explanation ? 'text-indigo-400 bg-indigo-500/10' : 'text-slate-500 hover:text-indigo-400'} ${!geminiApiKey ? 'opacity-50' : ''}`} title={!geminiApiKey ? "Requires API Key" : "Explain with AI"}>{isExplaining ? <Loader className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}</button>
            <button onClick={(e) => { e.stopPropagation(); onFork(); }} className="p-2 hover:bg-slate-800 rounded text-slate-500 hover:text-indigo-400 transition-colors"><GitBranch className="w-4 h-4" /></button>
            <button onClick={(e) => { e.stopPropagation(); onDelete(); }} className="p-2 hover:bg-red-900/30 rounded text-slate-500 hover:text-red-400 transition-colors" title="Delete this version"><Trash2 className="w-4 h-4" /></button>
            <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
          </div>
        </div>
        {isExpanded && (
          <div className="border-t border-slate-800">
            {explanation && (<div className="bg-indigo-900/10 p-4 border-b border-indigo-500/20 flex gap-3"><Wand2 className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" /><div className="text-sm text-indigo-200 leading-relaxed">{explanation}</div></div>)}
            <div className="bg-slate-950 p-4 font-mono text-sm relative group/code"><SQLHighlighter code={version.query} /><button onClick={handleCopy} className="absolute top-2 right-2 p-2 bg-slate-800 rounded opacity-0 group-hover/code:opacity-100 hover:bg-slate-700 transition-all text-xs text-slate-300 flex items-center gap-1">{copied ? "Copied!" : <><Copy className="w-3 h-3" /> Copy</>}</button></div>
            <div className="bg-slate-900/50 p-3 flex justify-between items-center text-xs text-slate-500 border-t border-slate-800"><span className="flex items-center gap-1"><Database className="w-3 h-3 text-blue-500" /> ID: {version.id}</span></div>
          </div>
        )}
      </div>
    </div>
  );
}