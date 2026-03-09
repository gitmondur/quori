import React from 'react';

const KEYWORDS =
  /\b(SELECT|FROM|WHERE|AND|OR|GROUP\s+BY|ORDER\s+BY|LIMIT|JOIN|LEFT|RIGHT|INNER|OUTER|ON|AS|COUNT|SUM|AVG|MAX|MIN|HAVING|INSERT|UPDATE|DELETE|CREATE|DROP|ALTER|WITH|PARTITION|CLUSTER|BY|DISTINCT|CASE|WHEN|THEN|ELSE|END|IS|NOT|NULL|IN|LIKE|BETWEEN|EXISTS)\b/gi;
const STRINGS = /'[^']*'/g;
const BACKTICKS = /`[^`]*`/g;
const NUMBERS = /\b\d+(\.\d+)?\b/g;

export function SQLHighlighter({ code }: { code: string }) {
  const highlight = (text: string): React.ReactNode[] => {
    if (!text) return [];

    // Split on whitespace while keeping the delimiters
    const tokens = text.split(/(\s+)/);

    return tokens.map((token, i) => {
      if (new RegExp(KEYWORDS.source, 'gi').test(token)) {
        return <span key={i} className="text-blue-400 font-bold">{token}</span>;
      }
      if (new RegExp(STRINGS.source, 'g').test(token)) {
        return <span key={i} className="text-amber-300">{token}</span>;
      }
      if (new RegExp(BACKTICKS.source, 'g').test(token)) {
        return <span key={i} className="text-purple-300">{token}</span>;
      }
      if (new RegExp(NUMBERS.source, 'g').test(token)) {
        return <span key={i} className="text-emerald-300">{token}</span>;
      }
      return <span key={i} className="text-slate-300">{token}</span>;
    });
  };

  return (
    <pre className="font-mono text-sm overflow-x-auto whitespace-pre-wrap">
      {highlight(code)}
    </pre>
  );
}
