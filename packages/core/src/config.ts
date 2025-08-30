import { Effect } from 'effect';
import { GitClientConfig } from './types';

export interface SkelegitConfig {
  clients: Record<string, GitClientConfig>;
  defaultClient?: string;
  plugins?: string[];
}

export class ConfigManager {
  private config: SkelegitConfig;

  constructor(config: SkelegitConfig) {
    this.config = config;
  }

  getConfig(): Effect.Effect<SkelegitConfig, Error> {
    return Effect.succeed(this.config);
  }

  getClientConfig(name: string): Effect.Effect<GitClientConfig, Error> {
    return Effect.sync(() => {
      const clientConfig = this.config.clients[name];
      if (!clientConfig) {
        throw new Error(`Client configuration not found: ${name}`);
      }
      return clientConfig;
    });
  }

  getDefaultClientConfig(): Effect.Effect<GitClientConfig, Error> {
    return Effect.sync(() => {
      if (!this.config.defaultClient) {
        throw new Error('No default client configured');
      }
      return this.getClientConfig(this.config.defaultClient);
    }).pipe(Effect.flatten);
  }

  updateConfig(config: Partial<SkelegitConfig>): Effect.Effect<void, Error> {
    return Effect.sync(() => {
      this.config = { ...this.config, ...config };
    });
  }
}

export function createConfigManager(config: SkelegitConfig): ConfigManager {
  return new ConfigManager(config);
}
