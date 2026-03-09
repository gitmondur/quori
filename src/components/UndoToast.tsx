import { useEffect, useState, useCallback } from 'react';
import { X } from 'lucide-react';

interface UndoToastProps {
  message: string;
  onUndo: () => void;
  onDismiss: () => void;
  duration?: number;
}

export function UndoToast({ message, onUndo, onDismiss, duration = 5000 }: UndoToastProps) {
  const [progress, setProgress] = useState(100);

  const dismiss = useCallback(() => onDismiss(), [onDismiss]);

  useEffect(() => {
    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remaining);
      if (remaining === 0) {
        clearInterval(interval);
        dismiss();
      }
    }, 50);
    return () => clearInterval(interval);
  }, [duration, dismiss]);

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] bg-slate-800 border border-slate-600 rounded-xl shadow-2xl overflow-hidden w-80">
      <div className="flex items-center justify-between px-4 py-3 gap-3">
        <span className="text-sm text-slate-200 flex-1">{message}</span>
        <button
          onClick={onUndo}
          className="text-indigo-400 hover:text-indigo-300 text-sm font-bold transition-colors whitespace-nowrap"
        >
          Undo
        </button>
        <button onClick={dismiss} className="text-slate-500 hover:text-white transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>
      <div className="h-0.5 bg-slate-700">
        <div
          className="h-full bg-indigo-500 transition-none"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
