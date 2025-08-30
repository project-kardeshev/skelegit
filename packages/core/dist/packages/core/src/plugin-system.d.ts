import { Effect } from 'effect';
import { GitClientPlugin, GitClientConfig, GitClient } from './types';
import { AuthManager } from './auth';

export declare class PluginSystem {
    private plugins;
    private authManager;
    constructor(authManager?: AuthManager);
    registerPlugin(plugin: GitClientPlugin): Effect.Effect<void, Error>;
    getPlugin(provider: string): Effect.Effect<GitClientPlugin, Error>;
    createClient(config: GitClientConfig): Effect.Effect<GitClient, Error>;
    getAuthManager(): AuthManager;
    listPlugins(): Effect.Effect<GitClientPlugin[], Error>;
}
export declare const pluginSystem: PluginSystem;
