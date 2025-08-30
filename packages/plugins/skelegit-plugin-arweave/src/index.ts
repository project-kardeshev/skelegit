import { Effect } from 'effect';
import Arweave from 'arweave';
import {
  GitClientPlugin,
  GitClientConfig,
  GitClient,
  Repository,
  PullRequest,
  GitFile,
  Branch,
  Commit,
} from '@skelegit/core';

export class ArweaveClient implements GitClient {
  private _arweave: Arweave;

  constructor(config: GitClientConfig) {
    this._arweave = Arweave.init({
      host: config.baseUrl || 'arweave.net',
      port: 443,
      protocol: 'https',
      ...config.options,
    });
  }

  getRepository(
    _owner: string,
    _repo: string
  ): Effect.Effect<Repository, Error> {
    return Effect.fail(
      new Error('Not implemented - Arweave plugin is a placeholder')
    );
  }

  listRepositories(_owner?: string): Effect.Effect<Repository[], Error> {
    return Effect.fail(
      new Error('Not implemented - Arweave plugin is a placeholder')
    );
  }

  getPullRequest(
    _owner: string,
    _repo: string,
    _number: number
  ): Effect.Effect<PullRequest, Error> {
    return Effect.fail(
      new Error('Not implemented - Arweave plugin is a placeholder')
    );
  }

  listPullRequests(
    _owner: string,
    _repo: string,
    _state?: 'open' | 'closed' | 'all'
  ): Effect.Effect<PullRequest[], Error> {
    return Effect.fail(
      new Error('Not implemented - Arweave plugin is a placeholder')
    );
  }

  getFile(
    _owner: string,
    _repo: string,
    _path: string,
    _ref?: string
  ): Effect.Effect<GitFile, Error> {
    return Effect.fail(
      new Error('Not implemented - Arweave plugin is a placeholder')
    );
  }

  listFiles(
    _owner: string,
    _repo: string,
    _path?: string,
    _ref?: string
  ): Effect.Effect<GitFile[], Error> {
    return Effect.fail(
      new Error('Not implemented - Arweave plugin is a placeholder')
    );
  }

  getBranch(
    _owner: string,
    _repo: string,
    _branch: string
  ): Effect.Effect<Branch, Error> {
    return Effect.fail(
      new Error('Not implemented - Arweave plugin is a placeholder')
    );
  }

  listBranches(_owner: string, _repo: string): Effect.Effect<Branch[], Error> {
    return Effect.fail(
      new Error('Not implemented - Arweave plugin is a placeholder')
    );
  }

  getCommit(
    _owner: string,
    _repo: string,
    _sha: string
  ): Effect.Effect<Commit, Error> {
    return Effect.fail(
      new Error('Not implemented - Arweave plugin is a placeholder')
    );
  }

  listCommits(
    _owner: string,
    _repo: string,
    _ref?: string
  ): Effect.Effect<Commit[], Error> {
    return Effect.fail(
      new Error('Not implemented - Arweave plugin is a placeholder')
    );
  }
}

export const arweavePlugin: GitClientPlugin = {
  name: 'arweave',
  provider: 'arweave',
  createClient: (config: GitClientConfig) =>
    Effect.succeed(new ArweaveClient(config)),
};
