const BQ = 'https://bigquery.googleapis.com/bigquery/v2'

async function bqFetch(url: string, accessToken: string) {
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  const data = await res.json()
  if (!res.ok) {
    throw new Error(data.error?.message ?? `BigQuery API error ${res.status}`)
  }
  return data
}

export interface BqDataset {
  id: string            // "projectId:datasetId"
  datasetId: string
}

export interface BqTable {
  id: string            // "projectId:datasetId.tableId"
  tableId: string
  type: string          // TABLE | VIEW | EXTERNAL | MATERIALIZED_VIEW
}

export interface BqField {
  name: string
  type: string          // STRING | INTEGER | FLOAT | BOOLEAN | TIMESTAMP | RECORD | …
  mode: string          // NULLABLE | REQUIRED | REPEATED
  description?: string
  fields?: BqField[]    // nested RECORD fields
}

export async function listDatasets(projectId: string, token: string): Promise<BqDataset[]> {
  const data = await bqFetch(`${BQ}/projects/${projectId}/datasets?all=false`, token)
  return (data.datasets ?? []).map((d: { datasetReference: { datasetId: string }; id: string }) => ({
    id: d.id,
    datasetId: d.datasetReference.datasetId,
  }))
}

export async function listTables(
  projectId: string,
  datasetId: string,
  token: string,
): Promise<BqTable[]> {
  const data = await bqFetch(
    `${BQ}/projects/${projectId}/datasets/${datasetId}/tables`,
    token,
  )
  return (data.tables ?? []).map((t: {
    tableReference: { tableId: string }
    id: string
    type: string
  }) => ({
    id: t.id,
    tableId: t.tableReference.tableId,
    type: t.type ?? 'TABLE',
  }))
}

export async function getTableSchema(
  projectId: string,
  datasetId: string,
  tableId: string,
  token: string,
): Promise<BqField[]> {
  const data = await bqFetch(
    `${BQ}/projects/${projectId}/datasets/${datasetId}/tables/${tableId}`,
    token,
  )
  return data.schema?.fields ?? []
}
