import { Effect } from 'effect';
import { GitClientConfig, GitClient } from './types';

export declare function createGitClient(config: GitClientConfig): Effect.Effect<GitClient, Error>;
export declare class GitClientManager {
    private clients;
    addClient(name: string, client: GitClient): Effect.Effect<void, Error>;
    getClient(name: string): Effect.Effect<GitClient, Error>;
    removeClient(name: string): Effect.Effect<boolean, Error>;
    listClients(): Effect.Effect<string[], Error>;
}
