import { Database, GitBranch, Sparkles, Share2, Check } from 'lucide-react';

interface WelcomeScreenProps {
  hasApiKey: boolean;
  hasGoogleUser: boolean;
  projectCount: number;
  onCreateProject: () => void;
  onOpenSettings: () => void;
}

export function WelcomeScreen({
  hasApiKey,
  hasGoogleUser,
  projectCount,
  onCreateProject,
  onOpenSettings,
}: WelcomeScreenProps) {
  const steps = [
    {
      number: 1,
      title: 'Create your first project',
      description: 'Projects group related SQL investigations together.',
      done: projectCount > 0,
      actionLabel: 'New Project',
      action: onCreateProject,
      optional: false,
    },
    {
      number: 2,
      title: 'Configure Gemini AI',
      description: 'Unlock AI-powered query drafting, auto-naming, and investigation insights.',
      done: hasApiKey,
      actionLabel: 'Open Settings',
      action: onOpenSettings,
      optional: true,
    },
    {
      number: 3,
      title: 'Connect Google Account',
      description: 'Browse your BigQuery schema live and run authenticated queries.',
      done: hasGoogleUser,
      actionLabel: 'Open Settings',
      action: onOpenSettings,
      optional: true,
    },
  ];

  const features = [
    {
      icon: GitBranch,
      title: 'Versioned Queries',
      desc: 'Every SQL iteration is saved with a note, timestamp, and full history.',
    },
    {
      icon: Sparkles,
      title: 'AI Assistant',
      desc: 'Generate SQL and investigation insights from plain-language prompts.',
    },
    {
      icon: Share2,
      title: 'Share Stories',
      desc: 'Export any investigation as a clean, shareable Markdown document.',
    },
  ];

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 overflow-y-auto custom-scrollbar">
      {/* Logo */}
      <div className="flex flex-col items-center mb-10 mt-4">
        <div className="w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-4 border border-indigo-500/20">
          <Database className="w-8 h-8 text-indigo-400" />
        </div>
        <h1 className="text-2xl font-bold text-slate-200">Welcome to Quori</h1>
        <p className="text-slate-500 mt-1 text-sm text-center max-w-xs">
          Your versioned BigQuery investigation journal
        </p>
      </div>

      {/* Setup checklist */}
      <div className="w-full max-w-md space-y-3 mb-10">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
          Get started
        </p>
        {steps.map(step => (
          <div
            key={step.number}
            className={`flex items-center gap-4 p-4 rounded-xl border transition-colors ${
              step.done
                ? 'bg-emerald-900/10 border-emerald-800/30'
                : 'bg-slate-900/50 border-slate-800'
            }`}
          >
            {/* Step indicator */}
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                step.done
                  ? 'bg-emerald-500/20 text-emerald-400'
                  : 'bg-slate-800 text-slate-500 border border-slate-700'
              }`}
            >
              {step.done ? (
                <Check className="w-3.5 h-3.5" />
              ) : (
                <span className="text-[11px] font-bold">{step.number}</span>
              )}
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <p
                  className={`text-sm font-medium ${
                    step.done ? 'text-slate-500 line-through' : 'text-slate-200'
                  }`}
                >
                  {step.title}
                </p>
                {step.optional && !step.done && (
                  <span className="text-[10px] text-slate-600 border border-slate-700 px-1.5 py-0.5 rounded">
                    optional
                  </span>
                )}
              </div>
              {!step.done && (
                <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{step.description}</p>
              )}
            </div>

            {/* Action */}
            {!step.done && (
              <button
                onClick={step.action}
                className="flex-shrink-0 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs rounded-lg font-medium transition-colors"
              >
                {step.actionLabel}
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Feature cards */}
      <div className="w-full max-w-md">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
          What you can do
        </p>
        <div className="grid grid-cols-3 gap-3">
          {features.map(f => (
            <div
              key={f.title}
              className="bg-slate-900/50 border border-slate-800 rounded-xl p-3.5"
            >
              <f.icon className="w-4 h-4 text-indigo-400 mb-2.5" />
              <p className="text-xs font-semibold text-slate-300 mb-1">{f.title}</p>
              <p className="text-[11px] text-slate-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
