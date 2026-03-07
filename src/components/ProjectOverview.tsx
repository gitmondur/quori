import React, { useState } from 'react';
import { Folder, Plus } from 'lucide-react';
import { Project, Story } from '../types';
import { StorySummaryCard } from './StorySummaryCard';

interface ProjectOverviewProps {
  project: Project;
  stories: Story[];
  onOpenStory: (id: string) => void;
  onAddStory: () => void;
  onDeleteStory: (e: React.MouseEvent, id: string) => void;
  onUpdateStory: (story: Story) => void;
  onReorderStories: (orderedIds: string[]) => void;
}

export function ProjectOverview({
  project,
  stories,
  onOpenStory,
  onAddStory,
  onDeleteStory,
  onUpdateStory,
  onReorderStories,
}: ProjectOverviewProps) {
  const [dragOverId, setDragOverId] = useState<string | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggingId(id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, id: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverId(id);
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (!draggingId || draggingId === targetId) {
      setDraggingId(null);
      setDragOverId(null);
      return;
    }
    const ids = stories.map(s => s.id);
    const fromIdx = ids.indexOf(draggingId);
    const toIdx = ids.indexOf(targetId);
    const reordered = [...ids];
    reordered.splice(fromIdx, 1);
    reordered.splice(toIdx, 0, draggingId);
    onReorderStories(reordered);
    setDraggingId(null);
    setDragOverId(null);
  };

  const handleDragEnd = () => {
    setDraggingId(null);
    setDragOverId(null);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-8 pb-4 border-b border-slate-800 bg-slate-950/30">
        <div className="flex items-center gap-3 mb-2 text-slate-500 text-sm font-medium uppercase tracking-wider">
          <Folder className="w-4 h-4" /> Project
        </div>
        <h1 className="text-3xl font-bold text-white mb-4 pl-1">{project.name}</h1>
        <div className="flex gap-4 pl-1 text-sm text-slate-400">
          <span>{stories.length} Queries</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-slate-925" onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl">
          <button
            onClick={onAddStory}
            className="flex flex-col items-center justify-center h-48 rounded-xl border-2 border-dashed border-slate-700 hover:border-indigo-500 hover:bg-slate-900/50 transition-all group"
          >
            <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Plus className="w-6 h-6 text-indigo-400" />
            </div>
            <span className="text-slate-400 font-medium group-hover:text-white">New Query Analysis</span>
          </button>

          {stories.map(story => (
            <div
              key={story.id}
              className={`transition-all duration-150 ${
                dragOverId === story.id && draggingId !== story.id
                  ? 'ring-2 ring-indigo-500 ring-offset-2 ring-offset-slate-900 rounded-xl'
                  : ''
              }`}
            >
              <StorySummaryCard
                story={story}
                isDragging={draggingId === story.id}
                onOpen={() => onOpenStory(story.id)}
                onDelete={e => onDeleteStory(e, story.id)}
                onUpdate={onUpdateStory}
                onDragStart={e => handleDragStart(e, story.id)}
                onDragOver={e => handleDragOver(e, story.id)}
                onDrop={e => handleDrop(e, story.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
