import { Effect } from 'effect';
import { Octokit } from '@octokit/rest';
import { GitClientPlugin, GitClientConfig, GitClient, Repository, PullRequest, GitFile, Branch, Commit, AuthManager } from '../../../core/src/index.ts';

export declare class OctokitClient implements GitClient {
    private octokit;
    constructor(octokit: Octokit);
    static create(config: GitClientConfig, authManager?: AuthManager): Effect.Effect<OctokitClient, Error>;
    getRepository(owner: string, repo: string): Effect.Effect<Repository, Error>;
    listRepositories(owner?: string): Effect.Effect<Repository[], Error>;
    getPullRequest(owner: string, repo: string, number: number): Effect.Effect<PullRequest, Error>;
    listPullRequests(owner: string, repo: string, state?: 'open' | 'closed' | 'all'): Effect.Effect<PullRequest[], Error>;
    getFile(owner: string, repo: string, path: string, ref?: string): Effect.Effect<GitFile, Error>;
    listFiles(owner: string, repo: string, path?: string, ref?: string): Effect.Effect<GitFile[], Error>;
    getBranch(owner: string, repo: string, branch: string): Effect.Effect<Branch, Error>;
    listBranches(owner: string, repo: string): Effect.Effect<Branch[], Error>;
    getCommit(owner: string, repo: string, sha: string): Effect.Effect<Commit, Error>;
    listCommits(owner: string, repo: string, ref?: string): Effect.Effect<Commit[], Error>;
}
export declare const octokitPlugin: GitClientPlugin;
