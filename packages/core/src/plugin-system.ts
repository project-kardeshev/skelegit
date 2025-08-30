import { Effect } from 'effect';
import { GitClientPlugin, GitClientConfig, GitClient } from './types';

export class PluginSystem {
  private plugins: Map<string, GitClientPlugin> = new Map();

  registerPlugin(plugin: GitClientPlugin): Effect.Effect<void, Error> {
    return Effect.sync(() => {
      this.plugins.set(plugin.provider, plugin);
    });
  }

  getPlugin(provider: string): Effect.Effect<GitClientPlugin, Error> {
    return Effect.sync(() => {
      const plugin = this.plugins.get(provider);
      if (!plugin) {
        throw new Error(`Plugin not found for provider: ${provider}`);
      }
      return plugin;
    });
  }

  createClient(config: GitClientConfig): Effect.Effect<GitClient, Error> {
    return Effect.flatMap(
      this.getPlugin(config.provider),
      (plugin) => plugin.createClient(config)
    );
  }

  listPlugins(): Effect.Effect<GitClientPlugin[], Error> {
    return Effect.sync(() => Array.from(this.plugins.values()));
  }
}

export const pluginSystem = new PluginSystem();
