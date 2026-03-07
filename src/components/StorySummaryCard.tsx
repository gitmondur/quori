import React, { useState } from 'react';
import { Clock, Code2, ChevronDown, ExternalLink, Trash2 } from 'lucide-react';
import { Story } from '../types';

const STATUS_COLORS: Record<Story['status'], string> = {
  draft: 'bg-amber-950 text-amber-400 border-amber-900 hover:bg-amber-900 cursor-pointer',
  active: 'bg-emerald-950 text-emerald-400 border-emerald-900 hover:bg-emerald-900 cursor-pointer',
  done: 'bg-blue-950 text-blue-400 border-blue-900 hover:bg-blue-900 cursor-pointer',
};

interface StorySummaryCardProps {
  story: Story;
  isDragging?: boolean;
  onOpen: () => void;
  onDelete: (e: React.MouseEvent) => void;
  onUpdate: (story: Story) => void;
  onDragStart?: (e: React.DragEvent) => void;
  onDragOver?: (e: React.DragEvent) => void;
  onDrop?: (e: React.DragEvent) => void;
}

export function StorySummaryCard({
  story,
  isDragging,
  onOpen,
  onDelete,
  onUpdate,
  onDragStart,
  onDragOver,
  onDrop,
}: StorySummaryCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const latestVersion = story.versions[story.versions.length - 1];

  const handleStatusClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next: Record<Story['status'], Story['status']> = {
      draft: 'active', active: 'done', done: 'draft',
    };
    onUpdate({ ...story, status: next[story.status] });
  };

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      className={`bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-slate-600 transition-all flex flex-col select-none ${
        isDragging ? 'opacity-40 scale-95' : ''
      } ${isExpanded ? 'row-span-2' : ''}`}
    >
      <div className="p-5 flex-1">
        <div className="flex justify-between items-start mb-3">
          <button
            onClick={handleStatusClick}
            className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border transition-colors ${STATUS_COLORS[story.status]}`}
            title="Click to change status"
          >
            {story.status}
          </button>
          <button onClick={onDelete} className="text-slate-600 hover:text-red-400 transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
        <h3
          className="text-lg font-semibold text-slate-200 mb-2 line-clamp-2 leading-tight"
          title={story.title}
        >
          {story.title}
        </h3>
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
          <Clock className="w-3 h-3" />
          {new Date(story.lastModified).toLocaleDateString()}
          <span>•</span>
          <span>{story.versions.length} versions</span>
        </div>
        {story.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {story.tags.slice(0, 3).map(tag => (
              <span key={tag} className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="bg-slate-950 border-t border-slate-800">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full px-4 py-2 flex items-center justify-between text-xs font-medium text-slate-500 hover:text-indigo-400 hover:bg-slate-900/50 transition-colors"
        >
          <span className="flex items-center gap-2">
            <Code2 className="w-3 h-3" />
            {isExpanded ? 'Hide Query' : 'Preview Latest Query'}
          </span>
          <ChevronDown className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
        </button>
        {isExpanded && (
          <div className="p-3 border-t border-slate-800 overflow-x-auto">
            <div className="text-xs font-mono text-slate-400 whitespace-pre-wrap max-h-32 overflow-y-auto custom-scrollbar">
              {latestVersion?.query ?? '-- No Query --'}
            </div>
          </div>
        )}
        <button
          onClick={onOpen}
          className="w-full py-3 bg-slate-900 hover:bg-indigo-600/10 hover:text-indigo-400 text-slate-400 text-sm font-medium border-t border-slate-800 transition-colors flex items-center justify-center gap-2"
        >
          Open Analysis <ExternalLink className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
