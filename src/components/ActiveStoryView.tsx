import { useState, useMemo } from 'react';
import {
  Code2, Plus, Save, Loader, Sparkles, ExternalLink,
  Table, PanelRightClose, PanelRightOpen, Clipboard,
} from 'lucide-react';
import { Story, BqConfig } from '../types';
import { QueryCard } from './QueryCard';
import { ConfirmDeleteModal } from './modals/ConfirmDeleteModal';
import { usePersistedState } from '../hooks/usePersistedState';
import { extractTables } from '../lib/extractTables';
import { callGemini } from '../lib/gemini';
import { copyToClipboard } from '../lib/clipboard';

const STATUS_COLORS: Record<Story['status'], string> = {
  draft: 'bg-amber-900/30 text-amber-400 border-amber-800 hover:bg-amber-900/50 cursor-pointer',
  active: 'bg-emerald-900/30 text-emerald-400 border-emerald-800 hover:bg-emerald-900/50 cursor-pointer',
  done: 'bg-blue-900/30 text-blue-400 border-blue-800 hover:bg-blue-900/50 cursor-pointer',
};

interface ActiveStoryViewProps {
  story: Story;
  bqConfig: BqConfig;
  geminiApiKey: string;
  onUpdate: (story: Story) => void;
}

export function ActiveStoryView({ story, bqConfig, geminiApiKey, onUpdate }: ActiveStoryViewProps) {
  const [newQueryMode, setNewQueryMode] = useState(false);
  const [draftQuery, setDraftQuery] = useState('');
  const [draftNote, setDraftNote] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isRightPanelOpen, setIsRightPanelOpen] = usePersistedState('quory_right_panel_open', true);
  const [versionToDelete, setVersionToDelete] = useState<string | null>(null);

  const detectedTables = useMemo(() => extractTables(story.versions), [story.versions]);

  const handleStatusClick = () => {
    const next: Record<Story['status'], Story['status']> = {
      draft: 'active', active: 'done', done: 'draft',
    };
    onUpdate({ ...story, status: next[story.status] });
  };

  const handleOpenInConsole = async () => {
    await copyToClipboard(draftQuery);
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
        const previousQuery = lastVersion ? lastVersion.query : '';
        const prompt = `Summarize the changes in the following SQL query compared to the previous version in less than 10 words. Previous: "${previousQuery}". Current: "${draftQuery}". Just the summary.`;
        finalNote = await callGemini(prompt, geminiApiKey);
      } catch {
        finalNote = 'Auto-saved version';
      }
    } else if (!finalNote.trim()) {
      finalNote = 'Query update';
    }

    const newVersion = {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      note: finalNote || 'Query update',
      query: draftQuery,
      executionTime: '-',
      bytesProcessed: '-',
      rowCount: 0,
    };

    onUpdate({
      ...story,
      lastModified: new Date().toISOString(),
      versions: [...story.versions, newVersion],
    });
    setNewQueryMode(false);
    setDraftQuery('');
    setDraftNote('');
    setIsSaving(false);
  };

  const confirmDeleteVersion = () => {
    if (!versionToDelete) return;
    onUpdate({ ...story, versions: story.versions.filter(v => v.id !== versionToDelete) });
    setVersionToDelete(null);
  };

  const handleAIGenerate = async () => {
    if (!geminiApiKey) {
      alert('Please configure your Gemini API Key in Settings to use AI Draft.');
      return;
    }
    if (!draftNote.trim()) {
      alert('Please enter a note/description first.');
      return;
    }
    setIsGenerating(true);
    const lastVersion = story.versions[story.versions.length - 1];
    const previousQuery = lastVersion ? lastVersion.query : 'None (New Query)';
    const prompt = `You are an expert BigQuery SQL assistant. User Request: "${draftNote}". Previous Query: ${previousQuery}. Task: Generate updated SQL. Return ONLY raw SQL.`;
    const result = await callGemini(prompt, geminiApiKey);
    setDraftQuery(result.replace(/```sql/g, '').replace(/```/g, '').trim());
    setIsGenerating(false);
  };

  return (
    <div className="flex h-full">
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="p-6 pb-2 border-b border-slate-800 bg-slate-950/30">
          <div className="flex items-center justify-between mb-4 pl-8">
            <input
              type="text"
              value={story.title}
              onChange={e => onUpdate({ ...story, title: e.target.value })}
              className="bg-transparent text-2xl font-bold text-slate-100 focus:outline-none focus:border-b border-indigo-500 w-full"
            />
            <div className="flex gap-2">
              <button
                onClick={handleStatusClick}
                className={`px-2 py-1 rounded-full text-xs font-medium border transition-colors ${STATUS_COLORS[story.status]}`}
                title="Click to change status"
              >
                {story.status}
              </button>
              <button
                onClick={() => setIsRightPanelOpen(!isRightPanelOpen)}
                className={`ml-2 p-1.5 rounded-md transition-colors ${
                  isRightPanelOpen
                    ? 'bg-indigo-900/50 text-indigo-300'
                    : 'text-slate-500 hover:text-white hover:bg-slate-800'
                }`}
                title="Toggle Table Overview"
              >
                {isRightPanelOpen ? <PanelRightClose className="w-5 h-5" /> : <PanelRightOpen className="w-5 h-5" />}
              </button>
            </div>
          </div>
          <div className="pl-8 flex gap-4 text-sm text-slate-500">
            <p>{story.versions.length} iterations</p>
            <p>Last edited {new Date(story.lastModified).toLocaleString()}</p>
          </div>
        </div>

        {/* Timeline */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          <div className="max-w-4xl mx-auto pl-4 border-l-2 border-slate-800 space-y-8 pb-32">
            {story.versions.map((version, idx) => (
              <QueryCard
                key={version.id}
                version={version}
                index={idx}
                total={story.versions.length}
                geminiApiKey={geminiApiKey}
                onFork={() => { setDraftQuery(version.query); setNewQueryMode(true); }}
                onDelete={() => setVersionToDelete(version.id)}
              />
            ))}

            {/* New Iteration */}
            <div className="relative pt-4">
              <div className="absolute -left-[25px] top-8 w-4 h-4 rounded-full bg-indigo-600 border-4 border-slate-900 shadow-lg shadow-indigo-500/50 z-10" />
              {!newQueryMode ? (
                <button
                  onClick={() => {
                    const lastQuery = story.versions[story.versions.length - 1]?.query ?? '';
                    setDraftQuery(lastQuery);
                    setNewQueryMode(true);
                  }}
                  className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-medium ml-4 transition-colors"
                >
                  <Plus className="w-5 h-5" /> Add new iteration
                </button>
              ) : (
                <div className="ml-4 bg-slate-900 border border-slate-700 rounded-xl overflow-hidden shadow-2xl">
                  <div className="bg-slate-800/50 p-3 border-b border-slate-700 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-indigo-400 font-medium">
                      <Code2 className="w-4 h-4" />
                      <span>New Iteration</span>
                    </div>
                    <button
                      onClick={() => setNewQueryMode(false)}
                      className="text-slate-500 hover:text-slate-300"
                    >
                      Cancel
                    </button>
                  </div>
                  <div className="p-4 space-y-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs text-slate-500 uppercase font-semibold">
                        Description / Prompt
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="What did you change? (Leave empty for AI auto-name)"
                          className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:border-indigo-500 focus:outline-none placeholder-slate-600"
                          value={draftNote}
                          onChange={e => setDraftNote(e.target.value)}
                          autoFocus
                        />
                        <button
                          onClick={handleAIGenerate}
                          disabled={isGenerating || !draftNote}
                          className={`flex items-center gap-2 px-3 py-2 text-white rounded-lg text-xs font-medium transition-all ${
                            !geminiApiKey
                              ? 'bg-slate-700 opacity-50 cursor-not-allowed'
                              : 'bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500'
                          }`}
                          title={!geminiApiKey ? 'Requires API Key' : 'Generate with AI'}
                        >
                          {isGenerating ? <Loader className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                          AI Draft
                        </button>
                      </div>
                    </div>
                    <textarea
                      value={draftQuery}
                      onChange={e => setDraftQuery(e.target.value)}
                      className="w-full h-48 bg-slate-950 font-mono text-sm p-4 rounded-lg border border-slate-800 focus:border-indigo-500 focus:outline-none text-slate-300 resize-none leading-relaxed"
                      spellCheck={false}
                      placeholder="Write SQL here..."
                    />
                    <div className="flex justify-end items-center pt-2 border-t border-slate-800/50">
                      <div className="flex gap-3">
                        <button
                          onClick={handleOpenInConsole}
                          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 text-sm font-medium transition-colors border border-slate-700"
                          title="Copy Query and Open BigQuery Console"
                        >
                          <ExternalLink className="w-4 h-4" /> Copy & Open Console
                        </button>
                        <button
                          onClick={handleAddVersion}
                          disabled={!draftQuery || isSaving}
                          className="flex items-center gap-2 px-6 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 text-sm font-medium shadow-lg shadow-indigo-900/20 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSaving ? <Loader className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                          {isSaving ? 'Naming...' : 'Save Version'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel: Table Overview */}
      <div
        className={`transition-all duration-300 border-l border-slate-800 bg-slate-950 flex flex-col ${
          isRightPanelOpen ? 'w-72' : 'w-0 overflow-hidden'
        }`}
      >
        <div className="p-4 border-b border-slate-800 flex items-center gap-2">
          <Table className="w-4 h-4 text-indigo-400" />
          <span className="font-bold text-sm text-slate-200">Table Overview</span>
          <span className="ml-auto bg-slate-800 text-slate-400 text-[10px] px-1.5 py-0.5 rounded-full">
            {detectedTables.length}
          </span>
        </div>
        <div className="flex-1 overflow-y-auto p-2 custom-scrollbar">
          {detectedTables.length === 0 ? (
            <div className="text-center p-6 text-slate-600 text-xs italic">
              No tables detected yet. Write some SQL with FROM or JOIN clauses.
            </div>
          ) : (
            <div className="space-y-1">
              {detectedTables.map((table, i) => (
                <div
                  key={i}
                  className="group flex items-start justify-between p-2 hover:bg-slate-900 rounded-md transition-colors cursor-pointer"
                  onClick={() => copyToClipboard(table)}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <Table className="w-3 h-3 text-slate-500 mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-slate-300 font-mono break-all leading-tight">{table}</span>
                  </div>
                  <button
                    className="opacity-0 group-hover:opacity-100 p-1 text-slate-500 hover:text-indigo-400 transition-all"
                    title="Copy Table Name"
                  >
                    <Clipboard className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Delete Version Modal */}
      {versionToDelete && (
        <ConfirmDeleteModal
          title="Delete Version?"
          message="Are you sure you want to delete this query version? This action cannot be undone."
          confirmLabel="Delete"
          onConfirm={confirmDeleteVersion}
          onCancel={() => setVersionToDelete(null)}
        />
      )}
    </div>
  );
}
