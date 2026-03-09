import { useRef, useEffect } from 'react';
import { Folder, Pencil, X } from 'lucide-react';

interface ProjectNameModalProps {
  mode: 'create' | 'rename';
  value: string;
  onChange: (value: string) => void;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ProjectNameModal({
  mode,
  value,
  onChange,
  onConfirm,
  onCancel,
}: ProjectNameModalProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    inputRef.current?.select();
  }, []);

  return (
    <div className="fixed inset-0 z-[70] bg-slate-950/90 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 p-6 rounded-xl max-w-sm w-full shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            {mode === 'create' ? (
              <><Folder className="w-5 h-5 text-indigo-400" /> New Project</>
            ) : (
              <><Pencil className="w-5 h-5 text-indigo-400" /> Rename Project</>
            )}
          </h3>
          <button onClick={onCancel} className="text-slate-500 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>
        <input
          ref={inputRef}
          type="text"
          placeholder="Project Name"
          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white mb-6 focus:border-indigo-500 outline-none"
          value={value}
          onChange={e => onChange(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') onConfirm();
            if (e.key === 'Escape') onCancel();
          }}
        />
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-slate-400 hover:text-white text-sm font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={!value.trim()}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition-colors"
          >
            {mode === 'create' ? 'Create Project' : 'Save Name'}
          </button>
        </div>
      </div>
    </div>
  );
}
