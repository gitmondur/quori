import { Version } from '../types';

const SKIP_KEYWORDS = new Set(['SELECT', 'UNNEST', 'LATERAL', 'DUAL', 'TABLESAMPLE']);

export function extractTables(versions: Version[]): string[] {
  const uniqueTables = new Set<string>();
  // Matches FROM/JOIN followed by:
  //   - backtick-quoted identifiers: `project.dataset.table`
  //   - plain dotted identifiers:     project.dataset.table
  const tableRegex = /\b(?:FROM|JOIN)\s+(`[^`]+`|[\w][\w.]*)/gi;

  for (const v of versions) {
    if (!v.query) continue;
    const regex = new RegExp(tableRegex.source, 'gi');
    let match: RegExpExecArray | null;
    while ((match = regex.exec(v.query)) !== null) {
      const tableName = match[1].replace(/`/g, '');
      if (
        !tableName.startsWith('(') &&
        !SKIP_KEYWORDS.has(tableName.toUpperCase())
      ) {
        uniqueTables.add(tableName);
      }
    }
  }

  return Array.from(uniqueTables).sort();
}
