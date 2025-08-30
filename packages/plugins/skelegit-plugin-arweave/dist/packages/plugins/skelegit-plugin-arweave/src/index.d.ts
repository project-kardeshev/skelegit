import { Effect } from 'effect';
import { GitClientPlugin, GitClientConfig, GitClient, Repository, PullRequest, GitFile, Branch, Commit } from '../../../core/src/index.ts';

export declare class ArweaveClient implements GitClient {
    private _arweave;
    constructor(config: GitClientConfig);
    getRepository(_owner: string, _repo: string): Effect.Effect<Repository, Error>;
    listRepositories(_owner?: string): Effect.Effect<Repository[], Error>;
    getPullRequest(_owner: string, _repo: string, _number: number): Effect.Effect<PullRequest, Error>;
    listPullRequests(_owner: string, _repo: string, _state?: 'open' | 'closed' | 'all'): Effect.Effect<PullRequest[], Error>;
    getFile(_owner: string, _repo: string, _path: string, _ref?: string): Effect.Effect<GitFile, Error>;
    listFiles(_owner: string, _repo: string, _path?: string, _ref?: string): Effect.Effect<GitFile[], Error>;
    getBranch(_owner: string, _repo: string, _branch: string): Effect.Effect<Branch, Error>;
    listBranches(_owner: string, _repo: string): Effect.Effect<Branch[], Error>;
    getCommit(_owner: string, _repo: string, _sha: string): Effect.Effect<Commit, Error>;
    listCommits(_owner: string, _repo: string, _ref?: string): Effect.Effect<Commit[], Error>;
}
export declare const arweavePlugin: GitClientPlugin;
