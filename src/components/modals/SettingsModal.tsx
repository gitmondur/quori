import React from 'react';
import { X, Download, Upload, LogOut, LogIn, ExternalLink } from 'lucide-react';
import { BqConfig, OAuthConfig, GoogleUser } from '../../types';

interface SettingsModalProps {
  bqConfig: BqConfig;
  onBqConfigChange: (config: BqConfig) => void;
  geminiApiKey: string;
  onGeminiApiKeyChange: (key: string) => void;
  oauthConfig: OAuthConfig;
  onOAuthConfigChange: (config: OAuthConfig) => void;
  googleUser: GoogleUser | null;
  onGoogleSignIn: () => void;
  onGoogleSignOut: () => void;
  isSigningIn: boolean;
  signInError: string | null;
  onClose: () => void;
  onExport: () => void;
  onImport: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function SettingsModal({
  bqConfig,
  onBqConfigChange,
  geminiApiKey,
  onGeminiApiKeyChange,
  oauthConfig,
  onOAuthConfigChange,
  googleUser,
  onGoogleSignIn,
  onGoogleSignOut,
  isSigningIn,
  signInError,
  onClose,
  onExport,
  onImport,
}: SettingsModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-slate-900 border border-slate-700 p-6 rounded-xl w-[420px] shadow-2xl max-h-[90vh] overflow-y-auto custom-scrollbar">
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-lg font-bold text-white">Settings</h3>
          <button onClick={onClose} className="text-slate-500 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-5">
          {/* BigQuery */}
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

          {/* Gemini */}
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

          {/* Google OAuth */}
          <div className="pt-3 border-t border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-medium text-slate-400">Google Account</p>
              <a
                href="https://console.cloud.google.com/apis/credentials"
                target="_blank"
                rel="noreferrer"
                className="text-[10px] text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                onClick={e => e.stopPropagation()}
              >
                GCP Console <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>

            {googleUser ? (
              <div className="flex items-center gap-3 p-3 bg-slate-950 rounded-lg border border-slate-800">
                <img
                  src={googleUser.picture}
                  alt={googleUser.name}
                  className="w-9 h-9 rounded-full border border-slate-700"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{googleUser.name}</p>
                  <p className="text-xs text-slate-400 truncate">{googleUser.email}</p>
                </div>
                <button
                  onClick={onGoogleSignOut}
                  className="p-1.5 text-slate-500 hover:text-red-400 transition-colors"
                  title="Sign out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-2 mb-3">
                  <input
                    type="text"
                    placeholder="Client ID (from GCP Console)"
                    value={oauthConfig.clientId}
                    onChange={e => onOAuthConfigChange({ ...oauthConfig, clientId: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-sm text-white focus:border-indigo-500 outline-none placeholder-slate-600"
                  />
                  <input
                    type="password"
                    placeholder="Client Secret (from GCP Console)"
                    value={oauthConfig.clientSecret}
                    onChange={e => onOAuthConfigChange({ ...oauthConfig, clientSecret: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-sm text-white focus:border-indigo-500 outline-none placeholder-slate-600"
                  />
                </div>
                <button
                  onClick={onGoogleSignIn}
                  disabled={isSigningIn || !oauthConfig.clientId || !oauthConfig.clientSecret}
                  className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-white hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed text-slate-800 text-sm font-medium rounded-lg transition-colors"
                >
                  {isSigningIn ? (
                    <span className="animate-spin border-2 border-slate-400 border-t-slate-800 rounded-full w-4 h-4" />
                  ) : (
                    <LogIn className="w-4 h-4" />
                  )}
                  {isSigningIn ? 'Opening browser…' : 'Sign in with Google'}
                </button>
                {signInError && (
                  <p className="mt-2 text-xs text-red-400">{signInError}</p>
                )}
                <p className="mt-2 text-[10px] text-slate-600 leading-relaxed">
                  Create a <strong className="text-slate-500">Desktop app</strong> OAuth credential in GCP Console.
                  Add <code className="text-slate-400">http://127.0.0.1</code> as an authorized redirect URI.
                </p>
              </>
            )}
          </div>

          {/* Data management */}
          <div className="pt-3 border-t border-slate-800">
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
                <input type="file" accept=".json" className="hidden" onChange={onImport} />
              </label>
            </div>
            <p className="text-xs text-slate-600 mt-2">
              Import merges with existing data (no overwrites).
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
