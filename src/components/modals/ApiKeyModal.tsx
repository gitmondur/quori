import { useRef } from 'react';
import { Key, X } from 'lucide-react';

interface ApiKeyModalProps {
  onSave: (key: string) => void;
  onDismiss: () => void;
}

export function ApiKeyModal({ onSave, onDismiss }: ApiKeyModalProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    const key = inputRef.current?.value ?? '';
    onSave(key);
  };

  return (
    <div className="fixed inset-0 z-[60] bg-slate-950/90 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 p-8 rounded-xl max-w-md w-full shadow-2xl relative">
        <button
          onClick={onDismiss}
          className="absolute top-4 right-4 text-slate-500 hover:text-white"
          title="Skip for now"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-indigo-500/10 rounded-full">
            <Key className="w-8 h-8 text-indigo-400" />
          </div>
        </div>
        <h2 className="text-xl font-bold text-white mb-2 text-center">Welcome to Quori</h2>
        <p className="text-slate-400 mb-6 text-sm text-center">
          To use AI features like smart naming and explanations, enter your Gemini API Key.
          You can also skip this and add it later in settings.
        </p>
        <input
          ref={inputRef}
          type="password"
          placeholder="Enter API Key (AIza...)"
          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white mb-4 focus:border-indigo-500 outline-none"
          onKeyDown={e => { if (e.key === 'Enter') handleSave(); }}
          autoFocus
        />
        <div className="flex flex-col gap-3">
          <button
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-lg transition-colors"
            onClick={handleSave}
          >
            Save Key & Start
          </button>
          <button
            className="w-full text-slate-500 hover:text-slate-300 text-sm font-medium transition-colors"
            onClick={onDismiss}
          >
            Skip for now
          </button>
        </div>
        <p className="mt-4 text-xs text-center text-slate-500">
          Don't have a key?{' '}
          <a
            href="https://aistudio.google.com/app/apikey"
            target="_blank"
            rel="noreferrer"
            className="text-indigo-400 hover:underline"
          >
            Get one here
          </a>
        </p>
      </div>
    </div>
  );
}
