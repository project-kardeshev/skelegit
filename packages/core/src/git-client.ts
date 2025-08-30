import { Effect } from 'effect';
import { GitClientConfig, GitClient } from './types';
import { pluginSystem } from './plugin-system';

export function createGitClient(config: GitClientConfig): Effect.Effect<GitClient, Error> {
  return pluginSystem.createClient(config);
}

export class GitClientManager {
  private clients: Map<string, GitClient> = new Map();

  addClient(name: string, client: GitClient): Effect.Effect<void, Error> {
    return Effect.sync(() => {
      this.clients.set(name, client);
    });
  }

  getClient(name: string): Effect.Effect<GitClient, Error> {
    return Effect.sync(() => {
      const client = this.clients.get(name);
      if (!client) {
        throw new Error(`Client not found: ${name}`);
      }
      return client;
    });
  }

  removeClient(name: string): Effect.Effect<boolean, Error> {
    return Effect.sync(() => {
      return this.clients.delete(name);
    });
  }

  listClients(): Effect.Effect<string[], Error> {
    return Effect.sync(() => Array.from(this.clients.keys()));
  }
}
