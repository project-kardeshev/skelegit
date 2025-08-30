import { Effect } from 'effect';

export interface Repository {
  id: string;
  name: string;
  fullName: string;
  description?: string;
  defaultBranch: string;
  isPrivate: boolean;
  url: string;
  cloneUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PullRequest {
  id: string;
  number: number;
  title: string;
  description?: string;
  state: 'open' | 'closed' | 'merged';
  sourceBranch: string;
  targetBranch: string;
  author: User;
  createdAt: Date;
  updatedAt: Date;
  url: string;
}

export interface User {
  id: string;
  username: string;
  displayName?: string;
  email?: string;
  avatarUrl?: string;
}

export interface GitFile {
  path: string;
  name: string;
  type: 'file' | 'directory';
  size?: number;
  content?: string;
  sha: string;
}

export interface Branch {
  name: string;
  sha: string;
  isDefault: boolean;
  isProtected: boolean;
}

export interface Commit {
  sha: string;
  message: string;
  author: User;
  committer: User;
  createdAt: Date;
  url: string;
  parents: string[];
}

export interface GitClientConfig {
  provider: string;
  baseUrl?: string;
  authCredentialId?: string; // Reference to stored credentials
  auth?: Record<string, unknown>; // Direct auth config (will be converted to credentials)
  options?: Record<string, unknown>;
}

export interface GitClientPlugin {
  name: string;
  provider: string;
  createClient: (
    config: GitClientConfig,
    authManager?: import('./auth').AuthManager
  ) => Effect.Effect<GitClient, Error>;
}

export interface GitClient {
  // Repository operations
  getRepository: (
    owner: string,
    repo: string
  ) => Effect.Effect<Repository, Error>;
  listRepositories: (owner?: string) => Effect.Effect<Repository[], Error>;

  // Pull Request operations
  getPullRequest: (
    owner: string,
    repo: string,
    number: number
  ) => Effect.Effect<PullRequest, Error>;
  listPullRequests: (
    owner: string,
    repo: string,
    state?: 'open' | 'closed' | 'all'
  ) => Effect.Effect<PullRequest[], Error>;

  // File operations
  getFile: (
    owner: string,
    repo: string,
    path: string,
    ref?: string
  ) => Effect.Effect<GitFile, Error>;
  listFiles: (
    owner: string,
    repo: string,
    path?: string,
    ref?: string
  ) => Effect.Effect<GitFile[], Error>;

  // Branch operations
  getBranch: (
    owner: string,
    repo: string,
    branch: string
  ) => Effect.Effect<Branch, Error>;
  listBranches: (owner: string, repo: string) => Effect.Effect<Branch[], Error>;

  // Commit operations
  getCommit: (
    owner: string,
    repo: string,
    sha: string
  ) => Effect.Effect<Commit, Error>;
  listCommits: (
    owner: string,
    repo: string,
    ref?: string
  ) => Effect.Effect<Commit[], Error>;
}
