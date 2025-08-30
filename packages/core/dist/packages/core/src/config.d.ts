import { Effect } from 'effect';
import { GitClientConfig } from './types';

export interface SkelegitConfig {
    clients: Record<string, GitClientConfig>;
    defaultClient?: string;
    plugins?: string[];
}
export declare class ConfigManager {
    private config;
    constructor(config: SkelegitConfig);
    getConfig(): Effect.Effect<SkelegitConfig, Error>;
    getClientConfig(name: string): Effect.Effect<GitClientConfig, Error>;
    getDefaultClientConfig(): Effect.Effect<GitClientConfig, Error>;
    updateConfig(config: Partial<SkelegitConfig>): Effect.Effect<void, Error>;
}
export declare function createConfigManager(config: SkelegitConfig): ConfigManager;
