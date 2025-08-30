import { Effect } from 'effect';
import { Octokit } from '@octokit/rest';
import {
  GitClientConfig,
  AuthManager,
  GitHubAuthProvider,
  AuthError,
} from '@skelegit/core';

/**
 * Helper function to create authenticated Octokit instance
 */
export function createAuthenticatedOctokit(
  config: GitClientConfig,
  authManager?: AuthManager
): Effect.Effect<Octokit, Error> {
  return Effect.tryPromise({
    try: async () => {
      if (!authManager) {
        // Fallback to legacy auth config
        return new Octokit({
          auth: config.auth?.token || config.auth?.password,
          baseUrl: config.baseUrl,
          ...config.options,
        });
      }

      // Register GitHub auth provider if not already registered
      const githubProvider = new GitHubAuthProvider();
      await Effect.runPromise(authManager.registerProvider(githubProvider));

      let authHeaders: Record<string, string> = {};

      if (config.authCredentialId) {
        // Use stored credentials
        authHeaders = await Effect.runPromise(
          authManager.getAuthHeaders(config.authCredentialId)
        );
      } else if (config.auth) {
        // Create credentials on the fly
        const credentialId = await Effect.runPromise(
          authManager.createCredentials('github', config.auth)
        );
        authHeaders = await Effect.runPromise(
          authManager.getAuthHeaders(credentialId)
        );
      }

      // Extract auth token from headers
      const authHeader = authHeaders.Authorization;
      let auth: string | undefined;

      if (authHeader) {
        if (authHeader.startsWith('token ')) {
          auth = authHeader.substring(6);
        } else if (authHeader.startsWith('Bearer ')) {
          auth = authHeader.substring(7);
        } else if (authHeader.startsWith('Basic ')) {
          auth = authHeader; // Keep full Basic auth header
        }
      }

      return new Octokit({
        auth,
        baseUrl: config.baseUrl || 'https://api.github.com',
        ...config.options,
      });
    },
    catch: (error) =>
      new Error(`Failed to create authenticated Octokit: ${error}`),
  });
}

/**
 * Helper to setup GitHub authentication
 */
export function setupGitHubAuth(
  authManager: AuthManager,
  authConfig: {
    type: 'pat' | 'oauth2' | 'basic';
    [key: string]: unknown;
  }
): Effect.Effect<string, AuthError> {
  const githubProvider = new GitHubAuthProvider();

  return Effect.flatMap(authManager.registerProvider(githubProvider), () =>
    authManager.createCredentials('github', authConfig)
  );
}
