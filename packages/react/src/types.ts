import { ReactNode } from 'react';
import { GitClient, GitClientConfig } from '@skelegit/core';

export interface SkelegitProviderProps {
  children: ReactNode;
  clients?: Record<string, GitClient>;
  defaultClient?: string;
}

export interface RepositoryListProps {
  owner?: string;
  client?: string;
  onRepositorySelect?: (repository: any) => void;
}

export interface PullRequestListProps {
  owner: string;
  repo: string;
  state?: 'open' | 'closed' | 'all';
  client?: string;
  onPullRequestSelect?: (pullRequest: any) => void;
}

export interface FileTreeProps {
  owner: string;
  repo: string;
  path?: string;
  ref?: string;
  client?: string;
  onFileSelect?: (file: any) => void;
}

export interface BranchSelectorProps {
  owner: string;
  repo: string;
  currentBranch?: string;
  client?: string;
  onBranchChange?: (branch: string) => void;
}
