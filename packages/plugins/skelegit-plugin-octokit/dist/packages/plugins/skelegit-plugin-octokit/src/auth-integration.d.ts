import { Effect } from 'effect';
import { Octokit } from '@octokit/rest';
import { GitClientConfig, AuthManager, AuthError } from '../../../core/src/index.ts';

/**
 * Helper function to create authenticated Octokit instance
 */
export declare function createAuthenticatedOctokit(config: GitClientConfig, authManager?: AuthManager): Effect.Effect<Octokit, Error>;
/**
 * Helper to setup GitHub authentication
 */
export declare function setupGitHubAuth(authManager: AuthManager, authConfig: {
    type: 'pat' | 'oauth2' | 'basic';
    [key: string]: unknown;
}): Effect.Effect<string, AuthError>;
