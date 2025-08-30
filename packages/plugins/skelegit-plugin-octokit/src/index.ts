import { Effect } from 'effect';
import { Octokit } from '@octokit/rest';
import { 
  GitClientPlugin, 
  GitClientConfig, 
  GitClient,
  Repository,
  PullRequest,
  GitFile,
  Branch,
  Commit
} from '@skelegit/core';

export class OctokitClient implements GitClient {
  private octokit: Octokit;

  constructor(config: GitClientConfig) {
    this.octokit = new Octokit({
      auth: config.auth?.token,
      baseUrl: config.baseUrl,
      ...config.options,
    });
  }

  getRepository(owner: string, repo: string): Effect.Effect<Repository, Error> {
    return Effect.tryPromise({
      try: async () => {
        const { data } = await this.octokit.rest.repos.get({
          owner,
          repo,
        });
        
        return {
          id: data.id.toString(),
          name: data.name,
          fullName: data.full_name,
          description: data.description || undefined,
          defaultBranch: data.default_branch,
          isPrivate: data.private,
          url: data.html_url,
          cloneUrl: data.clone_url,
          createdAt: new Date(data.created_at),
          updatedAt: new Date(data.updated_at),
        };
      },
      catch: (error) => new Error(`Failed to get repository: ${error}`),
    });
  }

  listRepositories(owner?: string): Effect.Effect<Repository[], Error> {
    return Effect.tryPromise({
      try: async () => {
        const { data } = owner 
          ? await this.octokit.rest.repos.listForUser({ username: owner })
          : await this.octokit.rest.repos.listForAuthenticatedUser();
        
        return data.map(repo => ({
          id: repo.id.toString(),
          name: repo.name,
          fullName: repo.full_name,
          description: repo.description || undefined,
          defaultBranch: repo.default_branch,
          isPrivate: repo.private,
          url: repo.html_url,
          cloneUrl: repo.clone_url,
          createdAt: new Date(repo.created_at),
          updatedAt: new Date(repo.updated_at),
        }));
      },
      catch: (error) => new Error(`Failed to list repositories: ${error}`),
    });
  }

  getPullRequest(owner: string, repo: string, number: number): Effect.Effect<PullRequest, Error> {
    return Effect.tryPromise({
      try: async () => {
        const { data } = await this.octokit.rest.pulls.get({
          owner,
          repo,
          pull_number: number,
        });
        
        return {
          id: data.id.toString(),
          number: data.number,
          title: data.title,
          description: data.body || undefined,
          state: data.state as 'open' | 'closed',
          sourceBranch: data.head.ref,
          targetBranch: data.base.ref,
          author: {
            id: data.user?.id.toString() || '',
            username: data.user?.login || '',
            displayName: data.user?.name || undefined,
            email: data.user?.email || undefined,
            avatarUrl: data.user?.avatar_url || undefined,
          },
          createdAt: new Date(data.created_at),
          updatedAt: new Date(data.updated_at),
          url: data.html_url,
        };
      },
      catch: (error) => new Error(`Failed to get pull request: ${error}`),
    });
  }

  listPullRequests(owner: string, repo: string, state: 'open' | 'closed' | 'all' = 'open'): Effect.Effect<PullRequest[], Error> {
    return Effect.tryPromise({
      try: async () => {
        const { data } = await this.octokit.rest.pulls.list({
          owner,
          repo,
          state,
        });
        
        return data.map(pr => ({
          id: pr.id.toString(),
          number: pr.number,
          title: pr.title,
          description: pr.body || undefined,
          state: pr.state as 'open' | 'closed',
          sourceBranch: pr.head.ref,
          targetBranch: pr.base.ref,
          author: {
            id: pr.user?.id.toString() || '',
            username: pr.user?.login || '',
            displayName: pr.user?.name || undefined,
            email: pr.user?.email || undefined,
            avatarUrl: pr.user?.avatar_url || undefined,
          },
          createdAt: new Date(pr.created_at),
          updatedAt: new Date(pr.updated_at),
          url: pr.html_url,
        }));
      },
      catch: (error) => new Error(`Failed to list pull requests: ${error}`),
    });
  }

  getFile(owner: string, repo: string, path: string, ref?: string): Effect.Effect<GitFile, Error> {
    return Effect.tryPromise({
      try: async () => {
        const { data } = await this.octokit.rest.repos.getContent({
          owner,
          repo,
          path,
          ref,
        });
        
        if (Array.isArray(data)) {
          throw new Error('Path is a directory, not a file');
        }
        
        if (data.type !== 'file') {
          throw new Error('Path is not a file');
        }
        
        return {
          path: data.path,
          name: data.name,
          type: 'file' as const,
          size: data.size,
          content: data.content ? Buffer.from(data.content, 'base64').toString() : undefined,
          sha: data.sha,
        };
      },
      catch: (error) => new Error(`Failed to get file: ${error}`),
    });
  }

  listFiles(owner: string, repo: string, path: string = '', ref?: string): Effect.Effect<GitFile[], Error> {
    return Effect.tryPromise({
      try: async () => {
        const { data } = await this.octokit.rest.repos.getContent({
          owner,
          repo,
          path,
          ref,
        });
        
        if (!Array.isArray(data)) {
          return [data].map(item => ({
            path: item.path,
            name: item.name,
            type: item.type === 'dir' ? 'directory' as const : 'file' as const,
            size: item.size,
            sha: item.sha,
          }));
        }
        
        return data.map(item => ({
          path: item.path,
          name: item.name,
          type: item.type === 'dir' ? 'directory' as const : 'file' as const,
          size: item.size,
          sha: item.sha,
        }));
      },
      catch: (error) => new Error(`Failed to list files: ${error}`),
    });
  }

  getBranch(owner: string, repo: string, branch: string): Effect.Effect<Branch, Error> {
    return Effect.tryPromise({
      try: async () => {
        const { data } = await this.octokit.rest.repos.getBranch({
          owner,
          repo,
          branch,
        });
        
        return {
          name: data.name,
          sha: data.commit.sha,
          isDefault: false, // TODO: Get from repository info
          isProtected: data.protected,
        };
      },
      catch: (error) => new Error(`Failed to get branch: ${error}`),
    });
  }

  listBranches(owner: string, repo: string): Effect.Effect<Branch[], Error> {
    return Effect.tryPromise({
      try: async () => {
        const { data } = await this.octokit.rest.repos.listBranches({
          owner,
          repo,
        });
        
        return data.map(branch => ({
          name: branch.name,
          sha: branch.commit.sha,
          isDefault: false, // TODO: Get from repository info
          isProtected: branch.protected,
        }));
      },
      catch: (error) => new Error(`Failed to list branches: ${error}`),
    });
  }

  getCommit(owner: string, repo: string, sha: string): Effect.Effect<Commit, Error> {
    return Effect.tryPromise({
      try: async () => {
        const { data } = await this.octokit.rest.repos.getCommit({
          owner,
          repo,
          ref: sha,
        });
        
        return {
          sha: data.sha,
          message: data.commit.message,
          author: {
            id: data.author?.id.toString() || '',
            username: data.author?.login || '',
            displayName: data.commit.author?.name || undefined,
            email: data.commit.author?.email || undefined,
            avatarUrl: data.author?.avatar_url || undefined,
          },
          committer: {
            id: data.committer?.id.toString() || '',
            username: data.committer?.login || '',
            displayName: data.commit.committer?.name || undefined,
            email: data.commit.committer?.email || undefined,
            avatarUrl: data.committer?.avatar_url || undefined,
          },
          createdAt: new Date(data.commit.author?.date || ''),
          url: data.html_url,
          parents: data.parents.map(p => p.sha),
        };
      },
      catch: (error) => new Error(`Failed to get commit: ${error}`),
    });
  }

  listCommits(owner: string, repo: string, ref?: string): Effect.Effect<Commit[], Error> {
    return Effect.tryPromise({
      try: async () => {
        const { data } = await this.octokit.rest.repos.listCommits({
          owner,
          repo,
          sha: ref,
        });
        
        return data.map(commit => ({
          sha: commit.sha,
          message: commit.commit.message,
          author: {
            id: commit.author?.id.toString() || '',
            username: commit.author?.login || '',
            displayName: commit.commit.author?.name || undefined,
            email: commit.commit.author?.email || undefined,
            avatarUrl: commit.author?.avatar_url || undefined,
          },
          committer: {
            id: commit.committer?.id.toString() || '',
            username: commit.committer?.login || '',
            displayName: commit.commit.committer?.name || undefined,
            email: commit.commit.committer?.email || undefined,
            avatarUrl: commit.committer?.avatar_url || undefined,
          },
          createdAt: new Date(commit.commit.author?.date || ''),
          url: commit.html_url,
          parents: commit.parents.map(p => p.sha),
        }));
      },
      catch: (error) => new Error(`Failed to list commits: ${error}`),
    });
  }
}

export const octokitPlugin: GitClientPlugin = {
  name: 'octokit',
  provider: 'github',
  createClient: (config: GitClientConfig) => 
    Effect.succeed(new OctokitClient(config)),
};
