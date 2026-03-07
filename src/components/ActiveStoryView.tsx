import { useState, useMemo } from 'react';
import {
  Code2, Plus, Save, Loader, Sparkles, ExternalLink,
  Table, PanelRightClose, PanelRightOpen, Clipboard, Database,
  Lightbulb, X, RefreshCw,
} from 'lucide-react';
import { Story, BqConfig } from '../types';
import { QueryCard } from './QueryCard';
import { SchemaExplorer } from './SchemaExplorer';
import { MarkdownRenderer } from './MarkdownRenderer';
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

type RightTab = 'detected' | 'schema';

interface ActiveStoryViewProps {
  story: Story;
  bqConfig: BqConfig;
  geminiApiKey: string;
  accessToken: string | null;
  onUpdate: (story: Story) => void;
}

function buildInsightsPrompt(story: Story): string {
  const versionsSummary = story.versions.map((v, i) => {
    const date = new Date(v.timestamp).toLocaleString();
    return `Version ${i + 1} (${date}):\nNote: "${v.note}"\nQuery:\n\`\`\`sql\n${v.query}\n\`\`\``
  }).join('\n\n')

  return `You are reviewing a BigQuery SQL investigation story called "${story.title}" (status: ${story.status}).
The analyst made ${story.versions.length} version(s):

${versionsSummary}

Write a concise analysis using EXACTLY these four ## sections:

## Investigation Goal
What was the analyst trying to discover? (1-2 sentences)

## How the Query Evolved
Key changes and improvements across versions as a short bullet list. Skip this section if there is only one version.

## What the Final Query Returns
Plain-language description of what the latest query does and the shape of its output.

## Suggested Next Steps
2-3 concrete, actionable follow-up ideas as a numbered list.

Be specific, practical, and brief. Use **bold** for key terms.`
}

export function ActiveStoryView({
  story,
  bqConfig,
  geminiApiKey,
  accessToken,
  onUpdate,
}: ActiveStoryViewProps) {
  const [newQueryMode, setNewQueryMode] = useState(false);
  const [draftQuery, setDraftQuery] = useState('');
  const [draftNote, setDraftNote] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isRightPanelOpen, setIsRightPanelOpen] = usePersistedState('quori_right_panel_open', true);
  const [rightTab, setRightTab] = usePersistedState<RightTab>('quori_right_tab', 'detected');
  const [versionToDelete, setVersionToDelete] = useState<string | null>(null);

  // Insights state
  const [insights, setInsights] = useState<string | null>(null);
  const [isInsighting, setIsInsighting] = useState(false);

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

  const handleGenerateInsights = async () => {
    if (!geminiApiKey) {
      alert('Please configure your Gemini API Key in Settings to use Generate Insights.');
      return;
    }
    if (story.versions.length === 0) {
      alert('Add at least one query version before generating insights.');
      return;
    }
    setIsInsighting(true);
    setInsights(null);
    const result = await callGemini(buildInsightsPrompt(story), geminiApiKey);
    setInsights(result);
    setIsInsighting(false);
  };

  return (
    <div className="flex h-full">
      {/* ── Main timeline ───────────────────────────────────────────────── */}
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
            <div className="flex gap-2 items-center">
              <button
                onClick={handleStatusClick}
                className={`px-2 py-1 rounded-full text-xs font-medium border transition-colors ${STATUS_COLORS[story.status]}`}
                title="Click to change status"
              >
                {story.status}
              </button>
              {/* Generate Insights */}
              <button
                onClick={handleGenerateInsights}
                disabled={isInsighting || !geminiApiKey || story.versions.length === 0}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                  insights
                    ? 'bg-amber-900/30 text-amber-300 border-amber-700 hover:bg-amber-900/50'
                    : geminiApiKey
                    ? 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-amber-300'
                    : 'bg-slate-800/50 text-slate-600 border-slate-800 cursor-not-allowed'
                }`}
                title={!geminiApiKey ? 'Requires Gemini API Key' : 'Generate AI insights for this story'}
              >
                {isInsighting
                  ? <Loader className="w-3.5 h-3.5 animate-spin" />
                  : <Lightbulb className="w-3.5 h-3.5" />}
                {isInsighting ? 'Analysing…' : 'Insights'}
              </button>
              <button
                onClick={() => setIsRightPanelOpen(!isRightPanelOpen)}
                className={`p-1.5 rounded-md transition-colors ${
                  isRightPanelOpen
                    ? 'bg-indigo-900/50 text-indigo-300'
                    : 'text-slate-500 hover:text-white hover:bg-slate-800'
                }`}
                title="Toggle side panel"
              >
                {isRightPanelOpen
                  ? <PanelRightClose className="w-5 h-5" />
                  : <PanelRightOpen className="w-5 h-5" />}
              </button>
            </div>
          </div>
          <div className="pl-8 flex gap-4 text-sm text-slate-500">
            <p>{story.versions.length} iterations</p>
            <p>Last edited {new Date(story.lastModified).toLocaleString()}</p>
          </div>
        </div>

        {/* Insights panel */}
        {(isInsighting || insights) && (
          <div className="mx-6 mt-4 bg-gradient-to-br from-amber-950/30 to-slate-900/80 border border-amber-800/40 rounded-xl overflow-hidden shadow-lg flex-shrink-0">
            {/* Panel header */}
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-amber-800/30 bg-amber-900/10">
              <Lightbulb className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span className="text-sm font-semibold text-amber-300 flex-1">AI Insights</span>
              <button
                onClick={handleGenerateInsights}
                disabled={isInsighting}
                className="p-1 text-amber-600 hover:text-amber-400 transition-colors"
                title="Regenerate"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isInsighting ? 'animate-spin' : ''}`} />
              </button>
              <button
                onClick={() => setInsights(null)}
                className="p-1 text-slate-500 hover:text-slate-300 transition-colors"
                title="Dismiss"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            {/* Panel body */}
            <div className="px-4 py-3 max-h-72 overflow-y-auto custom-scrollbar">
              {isInsighting ? (
                <div className="flex items-center gap-3 py-4 text-slate-500">
                  <Loader className="w-4 h-4 animate-spin text-amber-500" />
                  <span className="text-sm">Reading your query history…</span>
                </div>
              ) : insights ? (
                <MarkdownRenderer text={insights} />
              ) : null}
            </div>
          </div>
        )}

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
                    <button onClick={() => setNewQueryMode(false)} className="text-slate-500 hover:text-slate-300">
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

      {/* ── Right panel ─────────────────────────────────────────────────── */}
      <div
        className={`transition-all duration-300 border-l border-slate-800 bg-slate-950 flex flex-col ${
          isRightPanelOpen ? 'w-72' : 'w-0 overflow-hidden'
        }`}
      >
        {/* Tab bar */}
        <div className="flex border-b border-slate-800 flex-shrink-0">
          <button
            onClick={() => setRightTab('detected')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium transition-colors border-b-2 ${
              rightTab === 'detected'
                ? 'border-indigo-500 text-indigo-300'
                : 'border-transparent text-slate-500 hover:text-slate-300'
            }`}
          >
            <Table className="w-3.5 h-3.5" />
            Detected
            {detectedTables.length > 0 && (
              <span className="bg-slate-800 text-slate-400 text-[9px] px-1 py-0.5 rounded-full">
                {detectedTables.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setRightTab('schema')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium transition-colors border-b-2 ${
              rightTab === 'schema'
                ? 'border-indigo-500 text-indigo-300'
                : 'border-transparent text-slate-500 hover:text-slate-300'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            Schema
            {!accessToken && (
              <span className="text-[9px] text-amber-600" title="Sign in with Google to use">●</span>
            )}
          </button>
        </div>

        {/* Tab content */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {rightTab === 'detected' ? (
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
                        title="Copy table name"
                      >
                        <Clipboard className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="flex-1 overflow-hidden flex flex-col pt-2">
              <SchemaExplorer
                projectId={bqConfig.projectId}
                accessToken={accessToken}
              />
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
