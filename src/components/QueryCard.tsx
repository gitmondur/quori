import React, { useState } from 'react';
import {
  Code2, ChevronDown, GitBranch, Sparkles, Loader,
  Copy, Trash2, Wand2,
} from 'lucide-react';
import { Version } from '../types';
import { SQLHighlighter } from './SQLHighlighter';
import { Tooltip } from './Tooltip';
import { callGemini } from '../lib/gemini';
import { copyToClipboard } from '../lib/clipboard';

interface QueryCardProps {
  version: Version;
  index: number;
  total: number;
  accessToken: string | null;
  projectId: string;
  onFork: () => void;
  onDelete: () => void;
}

export function QueryCard({ version, index, total, accessToken, projectId, onFork, onDelete }: QueryCardProps) {
  const [isExpanded, setIsExpanded] = useState(index === total - 1);
  const [copied, setCopied] = useState(false);
  const [explanation, setExplanation] = useState<string | null>(null);
  const [isExplaining, setIsExplaining] = useState(false);

  const handleCopy = async () => {
    await copyToClipboard(version.query);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExplain = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (explanation) { setExplanation(null); return; }
    setIsExplaining(true);
    setIsExpanded(true);
    const result = await callGemini(`Explain this SQL briefly: ${version.query}`, accessToken ?? '', projectId);
    setExplanation(result);
    setIsExplaining(false);
  };

  return (
    <div className="relative group">
      <div
        className={`absolute -left-[25px] top-6 w-4 h-4 rounded-full border-4 border-slate-900 z-10 transition-colors duration-300 ${
          isExpanded ? 'bg-indigo-500' : 'bg-slate-600 group-hover:bg-slate-500'
        }`}
      />
      <div
        className={`ml-4 rounded-xl border transition-all duration-300 overflow-hidden ${
          isExpanded
            ? 'bg-slate-900 border-slate-700 shadow-xl'
            : 'bg-slate-900/30 border-slate-800/50 hover:bg-slate-900/80 hover:border-slate-700'
        }`}
      >
        <div
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-4 flex items-start justify-between cursor-pointer select-none"
        >
          <div className="flex gap-4 items-center">
            <div className={`p-2 rounded-lg ${isExpanded ? 'bg-indigo-500/10 text-indigo-400' : 'bg-slate-800 text-slate-500'}`}>
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h4 className={`font-semibold text-sm ${isExpanded ? 'text-slate-200' : 'text-slate-400'}`}>
                  {version.note}
                </h4>
                {!isExpanded && (
                  <span className="text-xs text-slate-600 font-mono">
                    {version.query.slice(0, 40)}...
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Version {index + 1} • {new Date(version.timestamp).toLocaleTimeString()}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Tooltip text={!accessToken ? 'Sign in with Google to unlock AI features' : explanation ? 'Hide explanation' : 'Explain this query with AI'}>
            <button
              onClick={handleExplain}
              disabled={!accessToken || isExplaining}
              className={`p-2 rounded hover:bg-slate-800 transition-colors ${
                explanation ? 'text-indigo-400 bg-indigo-500/10' : 'text-slate-500 hover:text-indigo-400'
              } ${!accessToken ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isExplaining ? <Loader className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            </button>
            </Tooltip>
            <button
              onClick={e => { e.stopPropagation(); onFork(); }}
              className="p-2 hover:bg-slate-800 rounded text-slate-500 hover:text-indigo-400 transition-colors"
              title="Fork this version"
            >
              <GitBranch className="w-4 h-4" />
            </button>
            <button
              onClick={e => { e.stopPropagation(); onDelete(); }}
              className="p-2 hover:bg-red-900/30 rounded text-slate-500 hover:text-red-400 transition-colors"
              title="Delete this version"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <ChevronDown
              className={`w-4 h-4 text-slate-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            />
          </div>
        </div>

        {isExpanded && (
          <div className="border-t border-slate-800">
            {explanation && (
              <div className="bg-indigo-900/10 p-4 border-b border-indigo-500/20 flex gap-3">
                <Wand2 className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-indigo-200 leading-relaxed">{explanation}</div>
              </div>
            )}
            <div className="bg-slate-950 p-4 font-mono text-sm relative group/code">
              <SQLHighlighter code={version.query} />
              <button
                onClick={handleCopy}
                className="absolute top-2 right-2 p-2 bg-slate-800 rounded opacity-0 group-hover/code:opacity-100 hover:bg-slate-700 transition-all text-xs text-slate-300 flex items-center gap-1"
              >
                {copied ? 'Copied!' : <><Copy className="w-3 h-3" /> Copy</>}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
