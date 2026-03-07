import { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronRight, Loader, AlertCircle, Search, Table, Columns3, Eye, RefreshCw, Pencil, X, Check } from 'lucide-react';
import { listDatasets, listTables, getTableSchema, BqDataset, BqTable, BqField } from '../lib/bigquery';
import { copyToClipboard } from '../lib/clipboard';
import { DataDictionary } from '../types';

// ── Type colours ──────────────────────────────────────────────────────────────
const TYPE_COLOR: Record<string, string> = {
  STRING: 'text-emerald-400',
  BYTES: 'text-red-400',
  INTEGER: 'text-blue-400', INT64: 'text-blue-400',
  FLOAT: 'text-blue-400',   FLOAT64: 'text-blue-400',
  NUMERIC: 'text-blue-400', BIGNUMERIC: 'text-blue-400',
  BOOLEAN: 'text-purple-400', BOOL: 'text-purple-400',
  TIMESTAMP: 'text-amber-400', DATE: 'text-amber-400',
  TIME: 'text-amber-400',   DATETIME: 'text-amber-400',
  RECORD: 'text-slate-400', STRUCT: 'text-slate-400',
  GEOGRAPHY: 'text-teal-400', JSON: 'text-orange-400',
}
const typeColor = (t: string) => TYPE_COLOR[t.toUpperCase()] ?? 'text-slate-400'

const TABLE_ICON: Record<string, React.ReactNode> = {
  VIEW: <Eye className="w-3 h-3 text-indigo-400 flex-shrink-0" />,
  MATERIALIZED_VIEW: <Eye className="w-3 h-3 text-violet-400 flex-shrink-0" />,
}
const tableIcon = (type: string) =>
  TABLE_ICON[type] ?? <Table className="w-3 h-3 text-slate-500 flex-shrink-0" />

// ── State shapes ──────────────────────────────────────────────────────────────
type Load = 'idle' | 'loading' | 'done' | 'error'

interface DatasetNode extends BqDataset {
  expanded: boolean
  tablesLoad: Load
  tablesError: string | null
  tables: TableNode[]
}

interface TableNode extends BqTable {
  expanded: boolean
  fieldsLoad: Load
  fieldsError: string | null
  fields: BqField[]
}

// ── Inline note editor ────────────────────────────────────────────────────────
function InlineNote({
  value,
  placeholder,
  multiline = false,
  onSave,
}: {
  value: string
  placeholder: string
  multiline?: boolean
  onSave: (v: string) => void
}) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(value)
  const inputRef = useRef<HTMLTextAreaElement & HTMLInputElement>(null)

  // Sync draft when value changes externally
  useEffect(() => { if (!editing) setDraft(value) }, [value, editing])

  const commit = () => {
    onSave(draft.trim())
    setEditing(false)
  }
  const cancel = () => {
    setDraft(value)
    setEditing(false)
  }

  if (editing) {
    const sharedClass =
      'w-full bg-slate-900 border border-indigo-500/50 rounded px-1.5 py-0.5 text-[10px] text-slate-300 placeholder-slate-600 outline-none resize-none'

    return (
      <div className="flex flex-col gap-0.5 mt-0.5 pr-1">
        {multiline ? (
          <textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            autoFocus
            rows={2}
            value={draft}
            onChange={e => setDraft(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); commit() }
              if (e.key === 'Escape') cancel()
            }}
            className={sharedClass}
            placeholder={placeholder}
          />
        ) : (
          <input
            ref={inputRef as unknown as React.RefObject<HTMLInputElement>}
            autoFocus
            type="text"
            value={draft}
            onChange={e => setDraft(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') commit()
              if (e.key === 'Escape') cancel()
            }}
            className={sharedClass}
            placeholder={placeholder}
          />
        )}
        <div className="flex gap-1 justify-end">
          <button onClick={cancel} className="text-slate-500 hover:text-slate-300 transition-colors" title="Cancel (Esc)">
            <X className="w-3 h-3" />
          </button>
          <button onClick={commit} className="text-indigo-400 hover:text-indigo-300 transition-colors" title="Save (Enter)">
            <Check className="w-3 h-3" />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div
      onClick={e => { e.stopPropagation(); setEditing(true) }}
      className="group/note flex items-start gap-1 cursor-text mt-0.5 pr-1"
    >
      {value ? (
        <span className="text-[10px] text-slate-500 leading-snug flex-1 italic">{value}</span>
      ) : (
        <span className="text-[10px] text-slate-700 leading-snug flex-1 italic">{placeholder}</span>
      )}
      <Pencil className="w-2.5 h-2.5 text-slate-700 group-hover/note:text-slate-400 flex-shrink-0 mt-0.5 transition-colors" />
    </div>
  )
}

// ── Field tree (recursive) ────────────────────────────────────────────────────
function FieldRow({
  field,
  depth = 0,
  fieldPath,
  fieldNotes,
  onSaveFieldNote,
}: {
  field: BqField
  depth?: number
  fieldPath: string
  fieldNotes: Record<string, string>
  onSaveFieldNote: (path: string, note: string) => void
}) {
  const [open, setOpen] = useState(false)
  const isNested = (field.fields?.length ?? 0) > 0
  const indent = depth * 12
  const note = fieldNotes[fieldPath] ?? ''

  return (
    <>
      <div
        className="flex flex-col px-2 py-0.5 hover:bg-slate-800/60 rounded group/field"
        style={{ paddingLeft: `${8 + indent}px` }}
      >
        <div
          className="flex items-center gap-1.5 cursor-pointer"
          onClick={() => {
            if (isNested) setOpen(o => !o)
            else copyToClipboard(field.name)
          }}
          title={field.description || (isNested ? 'Click to expand' : 'Click to copy')}
        >
          {isNested ? (
            <ChevronRight className={`w-3 h-3 text-slate-500 flex-shrink-0 transition-transform ${open ? 'rotate-90' : ''}`} />
          ) : (
            <span className="w-3 flex-shrink-0" />
          )}
          <Columns3 className="w-2.5 h-2.5 text-slate-600 flex-shrink-0" />
          <span className="text-[11px] text-slate-300 font-mono truncate flex-1">{field.name}</span>
          <span className={`text-[9px] font-bold uppercase flex-shrink-0 ${typeColor(field.type)}`}>
            {field.type}
          </span>
          {field.mode === 'REPEATED' && (
            <span className="text-[9px] text-slate-600 flex-shrink-0">[]</span>
          )}
        </div>
        {/* Field-level note (single line) */}
        <div style={{ paddingLeft: `${12 + (isNested ? 0 : 0)}px` }}>
          <InlineNote
            value={note}
            placeholder="+ add context…"
            onSave={v => onSaveFieldNote(fieldPath, v)}
          />
        </div>
      </div>
      {open && field.fields?.map(f => (
        <FieldRow
          key={f.name}
          field={f}
          depth={depth + 1}
          fieldPath={`${fieldPath}.${f.name}`}
          fieldNotes={fieldNotes}
          onSaveFieldNote={onSaveFieldNote}
        />
      ))}
    </>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
interface SchemaExplorerProps {
  projectId: string
  accessToken: string | null
  dataDictionary: DataDictionary
  onUpdateDictionary: (d: DataDictionary) => void
}

export function SchemaExplorer({ projectId, accessToken, dataDictionary, onUpdateDictionary }: SchemaExplorerProps) {
  const [datasets, setDatasets] = useState<DatasetNode[]>([])
  const [datasetsLoad, setDatasetsLoad] = useState<Load>('idle')
  const [datasetsError, setDatasetsError] = useState<string | null>(null)
  const [search, setSearch] = useState('')

  // ── Dictionary helpers ──────────────────────────────────────────────────
  const tableKey = useCallback(
    (datasetId: string, tableId: string) => `${projectId}.${datasetId}.${tableId}`,
    [projectId]
  )

  const getTableEntry = useCallback(
    (datasetId: string, tableId: string) =>
      dataDictionary.tables[tableKey(datasetId, tableId)] ?? { note: '', fields: {} },
    [dataDictionary, tableKey]
  )

  const saveTableNote = useCallback(
    (datasetId: string, tableId: string, note: string) => {
      const key = tableKey(datasetId, tableId)
      const existing = dataDictionary.tables[key] ?? { note: '', fields: {} }
      onUpdateDictionary({
        ...dataDictionary,
        tables: { ...dataDictionary.tables, [key]: { ...existing, note } },
      })
    },
    [dataDictionary, onUpdateDictionary, tableKey]
  )

  const saveFieldNote = useCallback(
    (datasetId: string, tableId: string, fieldPath: string, note: string) => {
      const key = tableKey(datasetId, tableId)
      const existing = dataDictionary.tables[key] ?? { note: '', fields: {} }
      const fields = note
        ? { ...existing.fields, [fieldPath]: note }
        : Object.fromEntries(Object.entries(existing.fields).filter(([k]) => k !== fieldPath))
      onUpdateDictionary({
        ...dataDictionary,
        tables: { ...dataDictionary.tables, [key]: { ...existing, fields } },
      })
    },
    [dataDictionary, onUpdateDictionary, tableKey]
  )

  // ── Load datasets ───────────────────────────────────────────────────────
  const loadDatasets = useCallback(async () => {
    if (!accessToken || !projectId) return
    setDatasetsLoad('loading')
    setDatasetsError(null)
    try {
      const raw = await listDatasets(projectId, accessToken)
      setDatasets(raw.map(d => ({
        ...d,
        expanded: false,
        tablesLoad: 'idle' as Load,
        tablesError: null,
        tables: [],
      })))
      setDatasetsLoad('done')
    } catch (err) {
      setDatasetsError((err as Error).message)
      setDatasetsLoad('error')
    }
  }, [accessToken, projectId])

  useEffect(() => { loadDatasets() }, [loadDatasets])

  // ── Toggle dataset → lazy load tables ──────────────────────────────────
  const toggleDataset = useCallback(async (datasetId: string) => {
    setDatasets(prev => prev.map(d => {
      if (d.datasetId !== datasetId) return d
      const willExpand = !d.expanded
      if (willExpand && d.tablesLoad === 'idle') {
        ;(async () => {
          setDatasets(p => p.map(x => x.datasetId === datasetId
            ? { ...x, tablesLoad: 'loading' } : x))
          try {
            const tables = await listTables(projectId, datasetId, accessToken!)
            setDatasets(p => p.map(x => x.datasetId === datasetId
              ? {
                  ...x,
                  tablesLoad: 'done',
                  tables: tables.map(t => ({
                    ...t,
                    expanded: false,
                    fieldsLoad: 'idle' as Load,
                    fieldsError: null,
                    fields: [],
                  })),
                }
              : x))
          } catch (err) {
            setDatasets(p => p.map(x => x.datasetId === datasetId
              ? { ...x, tablesLoad: 'error', tablesError: (err as Error).message } : x))
          }
        })()
      }
      return { ...d, expanded: willExpand }
    }))
  }, [accessToken, projectId])

  // ── Toggle table → lazy load schema ────────────────────────────────────
  const toggleTable = useCallback(async (datasetId: string, tableId: string) => {
    setDatasets(prev => prev.map(d => {
      if (d.datasetId !== datasetId) return d
      return {
        ...d,
        tables: d.tables.map(t => {
          if (t.tableId !== tableId) return t
          const willExpand = !t.expanded
          if (willExpand && t.fieldsLoad === 'idle') {
            ;(async () => {
              setDatasets(p => p.map(ds => ds.datasetId !== datasetId ? ds : {
                ...ds,
                tables: ds.tables.map(tbl => tbl.tableId !== tableId ? tbl
                  : { ...tbl, fieldsLoad: 'loading' }),
              }))
              try {
                const fields = await getTableSchema(projectId, datasetId, tableId, accessToken!)
                setDatasets(p => p.map(ds => ds.datasetId !== datasetId ? ds : {
                  ...ds,
                  tables: ds.tables.map(tbl => tbl.tableId !== tableId ? tbl
                    : { ...tbl, fieldsLoad: 'done', fields }),
                }))
              } catch (err) {
                setDatasets(p => p.map(ds => ds.datasetId !== datasetId ? ds : {
                  ...ds,
                  tables: ds.tables.map(tbl => tbl.tableId !== tableId ? tbl
                    : { ...tbl, fieldsLoad: 'error', fieldsError: (err as Error).message }),
                }))
              }
            })()
          }
          return { ...t, expanded: willExpand }
        }),
      }
    }))
  }, [accessToken, projectId])

  // ── Filter helpers ──────────────────────────────────────────────────────
  const q = search.toLowerCase()
  const visibleDatasets = datasets.filter(d =>
    !q ||
    d.datasetId.toLowerCase().includes(q) ||
    d.tables.some(t => t.tableId.toLowerCase().includes(q))
  )

  // ── No auth ─────────────────────────────────────────────────────────────
  if (!accessToken) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-4 text-center gap-2">
        <Table className="w-8 h-8 text-slate-700" />
        <p className="text-xs text-slate-500 leading-relaxed">
          Sign in with Google to browse your BigQuery schema.
        </p>
      </div>
    )
  }

  // ── Loading datasets ─────────────────────────────────────────────────────
  if (datasetsLoad === 'loading') {
    return (
      <div className="flex items-center justify-center h-full gap-2 text-slate-500 text-xs">
        <Loader className="w-4 h-4 animate-spin" /> Loading datasets…
      </div>
    )
  }

  // ── Error ────────────────────────────────────────────────────────────────
  if (datasetsLoad === 'error') {
    return (
      <div className="p-3 flex flex-col gap-2">
        <div className="flex items-start gap-2 text-red-400 text-xs">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <span>{datasetsError}</span>
        </div>
        <button
          onClick={loadDatasets}
          className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
        >
          <RefreshCw className="w-3 h-3" /> Retry
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      {/* Search */}
      <div className="px-2 pb-2">
        <div className="relative">
          <Search className="absolute left-2 top-1.5 w-3 h-3 text-slate-500" />
          <input
            type="text"
            placeholder="Filter datasets & tables…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 pl-6 text-xs text-slate-300 placeholder-slate-600 focus:border-indigo-500 outline-none"
          />
        </div>
      </div>

      {/* Tree */}
      <div className="flex-1 overflow-y-auto custom-scrollbar space-y-0.5 pb-2">
        {visibleDatasets.length === 0 && datasetsLoad === 'done' && (
          <p className="text-xs text-slate-600 italic px-3 py-4 text-center">
            {search ? 'No matches found.' : `No datasets in ${projectId}.`}
          </p>
        )}

        {visibleDatasets.map(dataset => {
          const filteredTables = q
            ? dataset.tables.filter(t => t.tableId.toLowerCase().includes(q))
            : dataset.tables

          return (
            <div key={dataset.datasetId}>
              {/* Dataset row */}
              <button
                onClick={() => toggleDataset(dataset.datasetId)}
                className="w-full flex items-center gap-1.5 px-2 py-1 hover:bg-slate-800/60 rounded text-left group"
              >
                <ChevronRight
                  className={`w-3.5 h-3.5 text-slate-500 flex-shrink-0 transition-transform ${dataset.expanded ? 'rotate-90' : ''}`}
                />
                <span className="text-xs font-semibold text-slate-300 truncate flex-1">
                  {dataset.datasetId}
                </span>
                {dataset.tablesLoad === 'loading' && (
                  <Loader className="w-3 h-3 animate-spin text-slate-500 flex-shrink-0" />
                )}
              </button>

              {/* Tables */}
              {dataset.expanded && (
                <div className="ml-4 border-l border-slate-800 pl-1">
                  {dataset.tablesLoad === 'error' && (
                    <p className="text-[10px] text-red-400 px-2 py-1">{dataset.tablesError}</p>
                  )}

                  {filteredTables.map(table => {
                    const entry = getTableEntry(dataset.datasetId, table.tableId)

                    return (
                      <div key={table.tableId}>
                        {/* Table row */}
                        <button
                          onClick={() => toggleTable(dataset.datasetId, table.tableId)}
                          className="w-full flex items-center gap-1.5 px-2 py-0.5 hover:bg-slate-800/60 rounded text-left group"
                          onDoubleClick={() =>
                            copyToClipboard(`${projectId}.${dataset.datasetId}.${table.tableId}`)
                          }
                          title={`Double-click to copy full path`}
                        >
                          <ChevronRight
                            className={`w-3 h-3 text-slate-600 flex-shrink-0 transition-transform ${table.expanded ? 'rotate-90' : ''}`}
                          />
                          {tableIcon(table.type)}
                          <span className="text-[11px] text-slate-400 group-hover:text-slate-200 truncate flex-1 font-mono">
                            {table.tableId}
                          </span>
                          {table.fieldsLoad === 'loading' && (
                            <Loader className="w-2.5 h-2.5 animate-spin text-slate-500 flex-shrink-0" />
                          )}
                        </button>

                        {/* Table note — always visible when parent dataset is expanded */}
                        <div className="px-2 pb-0.5" style={{ paddingLeft: '28px' }}>
                          <InlineNote
                            value={entry.note}
                            placeholder="+ describe this table…"
                            multiline
                            onSave={v => saveTableNote(dataset.datasetId, table.tableId, v)}
                          />
                        </div>

                        {/* Fields */}
                        {table.expanded && (
                          <div className="ml-2">
                            {table.fieldsLoad === 'error' && (
                              <p className="text-[10px] text-red-400 px-2 py-0.5">{table.fieldsError}</p>
                            )}
                            {table.fields.map(f => (
                              <FieldRow
                                key={f.name}
                                field={f}
                                fieldPath={f.name}
                                fieldNotes={entry.fields}
                                onSaveFieldNote={(path, note) =>
                                  saveFieldNote(dataset.datasetId, table.tableId, path, note)
                                }
                              />
                            ))}
                            {table.fieldsLoad === 'done' && table.fields.length === 0 && (
                              <p className="text-[10px] text-slate-600 px-3 py-1 italic">No schema available</p>
                            )}
                          </div>
                        )}
                      </div>
                    )
                  })}

                  {dataset.tablesLoad === 'done' && dataset.tables.length === 0 && (
                    <p className="text-[10px] text-slate-600 px-3 py-1 italic">No tables</p>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Footer */}
      <div className="px-3 py-1.5 border-t border-slate-800 flex items-center justify-between">
        <span className="text-[10px] text-slate-600">{datasets.length} datasets</span>
        <button
          onClick={loadDatasets}
          className="text-[10px] text-slate-600 hover:text-slate-400 flex items-center gap-1 transition-colors"
          title="Refresh datasets"
        >
          <RefreshCw className="w-2.5 h-2.5" /> Refresh
        </button>
      </div>
    </div>
  )
}
