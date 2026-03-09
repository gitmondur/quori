import React from 'react';

// Handles the subset of markdown Gemini produces:
//   ## Section, **bold**, `inline code`, - bullet, 1. numbered, paragraphs

function renderInline(text: string): React.ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**'))
      return <strong key={i} className="text-slate-200 font-semibold">{part.slice(2, -2)}</strong>
    if (part.startsWith('`') && part.endsWith('`'))
      return (
        <code key={i} className="bg-slate-800 text-indigo-300 text-[11px] px-1 py-0.5 rounded font-mono">
          {part.slice(1, -1)}
        </code>
      )
    return part
  })
}

interface MarkdownRendererProps {
  text: string
  className?: string
}

export function MarkdownRenderer({ text, className = '' }: MarkdownRendererProps) {
  const lines = text.split('\n')
  const nodes: React.ReactNode[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    // H2 / H3
    if (line.startsWith('## ')) {
      nodes.push(
        <h3 key={i} className="text-sm font-bold text-indigo-300 mt-4 mb-1.5 first:mt-0">
          {line.slice(3)}
        </h3>
      )
      i++
      continue
    }
    if (line.startsWith('### ')) {
      nodes.push(
        <h4 key={i} className="text-xs font-bold text-slate-300 mt-3 mb-1 uppercase tracking-wide">
          {line.slice(4)}
        </h4>
      )
      i++
      continue
    }

    // Unordered list — collect consecutive items
    if (line.startsWith('- ') || line.startsWith('* ')) {
      const items: string[] = []
      while (i < lines.length && (lines[i].startsWith('- ') || lines[i].startsWith('* '))) {
        items.push(lines[i].slice(2))
        i++
      }
      nodes.push(
        <ul key={`ul-${i}`} className="space-y-1 mb-2 pl-3">
          {items.map((item, j) => (
            <li key={j} className="text-sm text-slate-400 flex gap-2">
              <span className="text-indigo-500 flex-shrink-0 mt-[3px]">•</span>
              <span>{renderInline(item)}</span>
            </li>
          ))}
        </ul>
      )
      continue
    }

    // Ordered list — collect consecutive items
    if (/^\d+\.\s/.test(line)) {
      const items: string[] = []
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s/, ''))
        i++
      }
      nodes.push(
        <ol key={`ol-${i}`} className="space-y-1 mb-2 pl-3">
          {items.map((item, j) => (
            <li key={j} className="text-sm text-slate-400 flex gap-2">
              <span className="text-indigo-400 flex-shrink-0 w-4 text-right font-mono text-xs mt-[2px]">
                {j + 1}.
              </span>
              <span>{renderInline(item)}</span>
            </li>
          ))}
        </ol>
      )
      continue
    }

    // Empty line
    if (line.trim() === '') {
      i++
      continue
    }

    // Paragraph
    nodes.push(
      <p key={i} className="text-sm text-slate-400 mb-2 leading-relaxed">
        {renderInline(line)}
      </p>
    )
    i++
  }

  return <div className={`space-y-0 ${className}`}>{nodes}</div>
}
