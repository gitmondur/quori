import { Story } from '../types';

export interface ShareOptions {
  /** 'all' = every version; 'latest' = only the last one */
  iterations: 'all' | 'latest';
  includeSQL: boolean;
  includeNotes: boolean;
  includeTimestamps: boolean;
  includeTables: boolean;
  includeInsights: boolean;
}

export const DEFAULT_SHARE_OPTIONS: ShareOptions = {
  iterations: 'all',
  includeSQL: true,
  includeNotes: true,
  includeTimestamps: true,
  includeTables: true,
  includeInsights: true,
};

export function storyToMarkdown(
  story: Story,
  options: ShareOptions,
  detectedTables: string[],
  insights: string | null,
): string {
  const lines: string[] = [];

  // ── Title & meta ────────────────────────────────────────────────────────
  lines.push(`# ${story.title}`);
  lines.push('');

  const metaParts = [`**Status:** ${story.status}`];
  if (options.includeTimestamps) {
    metaParts.push(`**Last edited:** ${new Date(story.lastModified).toLocaleString()}`);
  }
  lines.push(metaParts.join('  |  '));
  lines.push('');
  lines.push('---');
  lines.push('');

  // ── Iterations ───────────────────────────────────────────────────────────
  const versions =
    options.iterations === 'latest'
      ? story.versions.slice(-1)
      : story.versions;

  if (versions.length > 0) {
    lines.push('## Query Iterations');
    lines.push('');

    versions.forEach(v => {
      const versionNumber = story.versions.indexOf(v) + 1;
      const label =
        options.iterations === 'latest' ? 'Latest Query' : `Version ${versionNumber}`;

      const heading =
        options.includeNotes && v.note.trim()
          ? `### ${label} — ${v.note}`
          : `### ${label}`;
      lines.push(heading);

      if (options.includeTimestamps) {
        lines.push(`*${new Date(v.timestamp).toLocaleString()}*`);
        lines.push('');
      }

      if (options.includeSQL && v.query.trim()) {
        lines.push('```sql');
        lines.push(v.query.trim());
        lines.push('```');
        lines.push('');
      }
    });
  }

  // ── Detected tables ──────────────────────────────────────────────────────
  if (options.includeTables && detectedTables.length > 0) {
    lines.push('---');
    lines.push('');
    lines.push('## Detected Tables');
    lines.push('');
    detectedTables.forEach(t => lines.push(`- \`${t}\``));
    lines.push('');
  }

  // ── AI Insights ──────────────────────────────────────────────────────────
  if (options.includeInsights && insights) {
    lines.push('---');
    lines.push('');
    lines.push('## AI Insights');
    lines.push('');
    lines.push(insights.trim());
    lines.push('');
  }

  return lines.join('\n');
}
