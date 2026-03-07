export interface Version {
  id: string;
  timestamp: string;
  note: string;
  query: string;
  executionTime: string;
  bytesProcessed: string;
  rowCount: number;
}

export interface Story {
  id: string;
  projectId: string;
  title: string;
  status: 'draft' | 'active' | 'done';
  tags: string[];
  lastModified: string;
  versions: Version[];
  order: number;
}

export interface Project {
  id: string;
  name: string;
  isExpanded: boolean;
}

export interface BqConfig {
  projectId: string;
  location: string;
}

export interface PendingDelete {
  type: 'story' | 'project';
  label: string;
  restore: () => void;
}
