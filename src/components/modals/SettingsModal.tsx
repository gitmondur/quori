import React from 'react';
import { X, Download, Upload } from 'lucide-react';
import { BqConfig } from '../../types';

interface SettingsModalProps {
  bqConfig: BqConfig;
  onBqConfigChange: (config: BqConfig) => void;
  geminiApiKey: string;
  onGeminiApiKeyChange: (key: string) => void;
  onClose: () => void;
  onExport: () => void;
  onImport: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function SettingsModal({
  bqConfig,
  onBqConfigChange,
  geminiApiKey,
  onGeminiApiKeyChange,
  onClose,
  onExport,
  onImport,
}: SettingsModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-slate-900 border border-slate-700 p-6 rounded-xl w-96 shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-white">Settings</h3>
          <button onClick={onClose} className="text-slate-500 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">
              BigQuery Project ID
            </label>
            <input
              type="text"
              value={bqConfig.projectId}
              onChange={e => onBqConfigChange({ ...bqConfig, projectId: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-sm text-white focus:border-indigo-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">
              Gemini API Key
            </label>
            <input
              type="password"
              value={geminiApiKey}
              onChange={e => onGeminiApiKeyChange(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-sm text-white focus:border-indigo-500 outline-none"
              placeholder="Optional"
            />
          </div>

          <div className="pt-2 border-t border-slate-800">
            <p className="text-xs font-medium text-slate-400 mb-2">Data Management</p>
            <div className="flex gap-2">
              <button
                onClick={onExport}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm rounded-lg border border-slate-700 transition-colors"
              >
                <Download className="w-4 h-4" /> Export JSON
              </button>
              <label className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm rounded-lg border border-slate-700 transition-colors cursor-pointer">
                <Upload className="w-4 h-4" /> Import JSON
                <input
                  type="file"
                  accept=".json"
                  className="hidden"
                  onChange={onImport}
                />
              </label>
            </div>
            <p className="text-xs text-slate-600 mt-2">
              Import will merge with existing data (no overwrites).
            </p>
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
