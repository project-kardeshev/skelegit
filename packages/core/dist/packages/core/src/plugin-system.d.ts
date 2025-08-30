import { Effect } from 'effect';
import { GitClientPlugin, GitClientConfig, GitClient } from './types';

export declare class PluginSystem {
    private plugins;
    registerPlugin(plugin: GitClientPlugin): Effect.Effect<void, Error>;
    getPlugin(provider: string): Effect.Effect<GitClientPlugin, Error>;
    createClient(config: GitClientConfig): Effect.Effect<GitClient, Error>;
    listPlugins(): Effect.Effect<GitClientPlugin[], Error>;
}
export declare const pluginSystem: PluginSystem;
