import { useState, useMemo } from 'react';
import { X, Copy, Download, Check } from 'lucide-react';
import { Story } from '../../types';
import { storyToMarkdown, ShareOptions, DEFAULT_SHARE_OPTIONS } from '../../lib/storyToMarkdown';
import { copyToClipboard } from '../../lib/clipboard';

interface ShareStoryModalProps {
  story: Story;
  detectedTables: string[];
  insights: string | null;
  onClose: () => void;
}

interface ToggleProps {
  label: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (v: boolean) => void;
}

function Toggle({ label, checked, disabled, onChange }: ToggleProps) {
  return (
    <button
      onClick={() => !disabled && onChange(!checked)}
      disabled={disabled}
      className={`px-3 py-1 rounded-full text-xs font-medium border transition-all select-none ${
        disabled
          ? 'opacity-40 cursor-not-allowed border-slate-700 text-slate-600 bg-transparent'
          : checked
          ? 'bg-indigo-600 border-indigo-500 text-white'
          : 'bg-transparent border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-300'
      }`}
    >
      {label}
    </button>
  );
}

export function ShareStoryModal({ story, detectedTables, insights, onClose }: ShareStoryModalProps) {
  const [options, setOptions] = useState<ShareOptions>({
    ...DEFAULT_SHARE_OPTIONS,
    includeInsights: !!insights,
  });
  const [copied, setCopied] = useState(false);

  const set = <K extends keyof ShareOptions>(key: K, value: ShareOptions[K]) =>
    setOptions(prev => ({ ...prev, [key]: value }));

  const markdown = useMemo(
    () => storyToMarkdown(story, options, detectedTables, insights),
    [story, options, detectedTables, insights],
  );

  const handleCopy = async () => {
    await copyToClipboard(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const slug = story.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const filename = `${slug || 'story'}-${new Date().toISOString().slice(0, 10)}.md`;
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-2xl shadow-2xl flex flex-col max-h-[85vh]">

        {/* ── Header ────────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 flex-shrink-0">
          <div>
            <h3 className="text-base font-bold text-slate-100">Share Story</h3>
            <p className="text-xs text-slate-500 mt-0.5 truncate max-w-sm">{story.title}</p>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-500 hover:text-slate-300 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ── Options ───────────────────────────────────────────────────── */}
        <div className="px-6 py-3 border-b border-slate-800 flex-shrink-0 space-y-2">
          {/* Iterations */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-slate-500 w-16 flex-shrink-0">Versions</span>
            <button
              onClick={() => set('iterations', 'all')}
              className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${
                options.iterations === 'all'
                  ? 'bg-indigo-600 border-indigo-500 text-white'
                  : 'bg-transparent border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-300'
              }`}
            >
              All ({story.versions.length})
            </button>
            <button
              onClick={() => set('iterations', 'latest')}
              className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${
                options.iterations === 'latest'
                  ? 'bg-indigo-600 border-indigo-500 text-white'
                  : 'bg-transparent border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-300'
              }`}
            >
              Latest only
            </button>
          </div>

          {/* Field toggles */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-slate-500 w-16 flex-shrink-0">Include</span>
            <Toggle label="SQL"        checked={options.includeSQL}       onChange={v => set('includeSQL', v)} />
            <Toggle label="Notes"      checked={options.includeNotes}     onChange={v => set('includeNotes', v)} />
            <Toggle label="Timestamps" checked={options.includeTimestamps} onChange={v => set('includeTimestamps', v)} />
            <Toggle
              label={`Tables${detectedTables.length > 0 ? ` (${detectedTables.length})` : ''}`}
              checked={options.includeTables}
              disabled={detectedTables.length === 0}
              onChange={v => set('includeTables', v)}
            />
            <Toggle
              label="Insights"
              checked={options.includeInsights}
              disabled={!insights}
              onChange={v => set('includeInsights', v)}
            />
          </div>
        </div>

        {/* ── Preview ───────────────────────────────────────────────────── */}
        <div className="flex-1 overflow-hidden flex flex-col min-h-0">
          <div className="px-6 pt-3 pb-1 flex-shrink-0">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">Preview</span>
          </div>
          <div className="flex-1 overflow-y-auto px-6 pb-4 custom-scrollbar">
            <pre className="text-xs text-slate-300 font-mono leading-relaxed whitespace-pre-wrap break-words bg-slate-950 rounded-lg p-4 border border-slate-800">
              {markdown}
            </pre>
          </div>
        </div>

        {/* ── Actions ───────────────────────────────────────────────────── */}
        <div className="px-6 py-4 border-t border-slate-800 flex justify-end gap-3 flex-shrink-0">
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium border border-slate-700 transition-colors"
          >
            <Download className="w-4 h-4" /> Download .md
          </button>
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied!' : 'Copy to clipboard'}
          </button>
        </div>
      </div>
    </div>
  );
}
