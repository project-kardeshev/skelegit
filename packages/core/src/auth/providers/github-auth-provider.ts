import { Effect } from 'effect';
import { BaseAuthProvider } from './base-auth-provider';
import { CredentialFactory } from '../credentials';
import {
  AuthError,
  PersonalAccessTokenAuth,
  OAuth2Auth,
  BasicAuth,
  AuthChallenge,
} from '../types';

type GitHubAuth = PersonalAccessTokenAuth | OAuth2Auth | BasicAuth;

/**
 * GitHub authentication provider
 */
export class GitHubAuthProvider extends BaseAuthProvider<GitHubAuth> {
  readonly providerType = 'github';
  readonly supportedAuthTypes = ['pat', 'oauth2', 'basic'] as const;

  createCredentials(
    config: Record<string, unknown>
  ): Effect.Effect<GitHubAuth, AuthError> {
    return Effect.sync(() => {
      const authType = this.getStringValue(config, 'type');

      if (!this.isAuthTypeSupported(authType)) {
        throw this.createAuthError(
          `Unsupported auth type: ${authType}`,
          'UNSUPPORTED_AUTH_TYPE'
        );
      }

      switch (authType) {
        case 'pat':
          return CredentialFactory.createPersonalAccessToken(
            this.providerType,
            this.getStringValue(config, 'token'),
            this.getArrayValue(config, 'scopes', [])
          );

        case 'oauth2':
          return CredentialFactory.createOAuth2({
            providerId: this.providerType,
            clientId: this.getStringValue(config, 'clientId'),
            clientSecret: this.getStringValue(config, 'clientSecret', ''),
            accessToken: this.getStringValue(config, 'accessToken'),
            refreshToken: this.getStringValue(
              config,
              'refreshToken',
              undefined
            ),
            expiresAt: config.expiresAt
              ? new Date(config.expiresAt as string)
              : undefined,
            scopes: this.getArrayValue(config, 'scopes', []),
          });

        case 'basic':
          return CredentialFactory.createBasic(
            this.providerType,
            this.getStringValue(config, 'username'),
            this.getStringValue(config, 'password')
          );

        default:
          throw this.createAuthError(
            `Unsupported auth type: ${authType}`,
            'UNSUPPORTED_AUTH_TYPE'
          );
      }
    });
  }

  validateCredentials(
    credentials: GitHubAuth
  ): Effect.Effect<boolean, AuthError> {
    return Effect.flatMap(credentials.validate(), (isValid) => {
      if (!isValid) {
        return Effect.succeed(false);
      }

      // Additional GitHub-specific validation
      switch (credentials.type) {
        case 'pat':
          return this.validateGitHubPAT(credentials);
        case 'oauth2':
          return this.validateGitHubOAuth2(credentials);
        case 'basic':
          return this.validateGitHubBasic(credentials);
        default:
          return Effect.fail(
            this.createAuthError('Unknown auth type', 'UNKNOWN_AUTH_TYPE')
          );
      }
    });
  }

  getAuthHeaders(
    credentials: GitHubAuth
  ): Effect.Effect<Record<string, string>, AuthError> {
    return Effect.sync(() => {
      const headers: Record<string, string> = {
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        'User-Agent': 'Skelegit/1.0.0',
      };

      switch (credentials.type) {
        case 'pat':
          headers['Authorization'] = `token ${credentials.token}`;
          break;
        case 'oauth2':
          headers['Authorization'] = `Bearer ${credentials.accessToken}`;
          break;
        case 'basic': {
          const basicAuth = (
            globalThis as unknown as { btoa: (str: string) => string }
          ).btoa(`${credentials.username}:${credentials.password}`);
          headers['Authorization'] = `Basic ${basicAuth}`;
          break;
        }
        default:
          throw this.createAuthError('Unknown auth type', 'UNKNOWN_AUTH_TYPE');
      }

      return headers;
    });
  }

  refreshCredentials(
    credentials: GitHubAuth
  ): Effect.Effect<GitHubAuth, AuthError> {
    if (credentials.type !== 'oauth2') {
      return Effect.fail(
        this.createAuthError(
          'Refresh not supported for this auth type',
          'REFRESH_NOT_SUPPORTED'
        )
      );
    }

    if (!credentials.refreshToken) {
      return Effect.fail(
        this.createAuthError('No refresh token available', 'NO_REFRESH_TOKEN')
      );
    }

    // TODO: Implement OAuth2 refresh logic
    return Effect.fail(
      this.createAuthError('OAuth2 refresh not implemented', 'NOT_IMPLEMENTED')
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleAuthChallenge(
    challenge: AuthChallenge,
    _credentials: GitHubAuth
  ): Effect.Effect<GitHubAuth, AuthError> {
    // GitHub 2FA support
    if (challenge.type === 'totp') {
      // TODO: Implement 2FA challenge handling
      return Effect.fail(
        this.createAuthError('2FA challenge not implemented', 'NOT_IMPLEMENTED')
      );
    }

    return Effect.fail(
      this.createAuthError(
        `Unsupported challenge type: ${challenge.type}`,
        'UNSUPPORTED_CHALLENGE'
      )
    );
  }

  private validateGitHubPAT(
    credentials: PersonalAccessTokenAuth
  ): Effect.Effect<boolean, AuthError> {
    return Effect.tryPromise({
      try: async () => {
        // Validate PAT format (GitHub classic tokens start with 'ghp_', fine-grained start with 'github_pat_')
        const token = credentials.token;
        if (!token.startsWith('ghp_') && !token.startsWith('github_pat_')) {
          return false;
        }

        // TODO: Make actual API call to validate token
        // For now, just return true for format validation
        return true;
      },
      catch: (error) =>
        this.createAuthError(
          'PAT validation failed',
          'VALIDATION_ERROR',
          error
        ),
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private validateGitHubOAuth2(
    _credentials: OAuth2Auth
  ): Effect.Effect<boolean, AuthError> {
    return Effect.tryPromise({
      try: async () => {
        // TODO: Validate OAuth2 token with GitHub API
        return true;
      },
      catch: (error) =>
        this.createAuthError(
          'OAuth2 validation failed',
          'VALIDATION_ERROR',
          error
        ),
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private validateGitHubBasic(
    _credentials: BasicAuth
  ): Effect.Effect<boolean, AuthError> {
    return Effect.tryPromise({
      try: async () => {
        // TODO: Validate basic auth with GitHub API
        return true;
      },
      catch: (error) =>
        this.createAuthError(
          'Basic auth validation failed',
          'VALIDATION_ERROR',
          error
        ),
    });
  }
}
