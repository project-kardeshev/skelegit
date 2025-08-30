import { Effect } from 'effect';
import { AuthProvider, AuthError, AuthContext, SupportedAuth } from './types';

/**
 * Central authentication manager that handles multiple providers
 */
export class AuthManager {
  private providers: Map<string, AuthProvider> = new Map();
  private credentials: Map<string, SupportedAuth> = new Map();

  /**
   * Register an authentication provider
   */
  registerProvider(provider: AuthProvider): Effect.Effect<void, AuthError> {
    return Effect.sync(() => {
      this.providers.set(provider.providerType, provider);
    });
  }

  /**
   * Get registered provider by type
   */
  getProvider(providerType: string): Effect.Effect<AuthProvider, AuthError> {
    return Effect.sync(() => {
      const provider = this.providers.get(providerType);
      if (!provider) {
        throw new AuthError(
          `Provider not found: ${providerType}`,
          'PROVIDER_NOT_FOUND'
        );
      }
      return provider;
    });
  }

  /**
   * Create and store credentials
   */
  createCredentials(
    providerType: string,
    config: Record<string, unknown>,
    credentialId?: string
  ): Effect.Effect<string, AuthError> {
    return Effect.flatMap(this.getProvider(providerType), (provider) =>
      Effect.flatMap(provider.createCredentials(config), (credentials) =>
        Effect.flatMap(provider.validateCredentials(credentials), (isValid) => {
          if (!isValid) {
            return Effect.fail(
              new AuthError('Invalid credentials', 'INVALID_CREDENTIALS')
            );
          }

          const id = credentialId || this.generateCredentialId(providerType);
          this.credentials.set(id, credentials as SupportedAuth);
          return Effect.succeed(id);
        })
      )
    );
  }

  /**
   * Get stored credentials
   */
  getCredentials(
    credentialId: string
  ): Effect.Effect<SupportedAuth, AuthError> {
    return Effect.sync(() => {
      const credentials = this.credentials.get(credentialId);
      if (!credentials) {
        throw new AuthError(
          `Credentials not found: ${credentialId}`,
          'CREDENTIALS_NOT_FOUND'
        );
      }
      return credentials;
    });
  }

  /**
   * Create authentication context
   */
  createAuthContext(
    credentialId: string,
    metadata?: Record<string, unknown>
  ): Effect.Effect<AuthContext, AuthError> {
    return Effect.flatMap(this.getCredentials(credentialId), (credentials) =>
      Effect.flatMap(this.getProvider(credentials.providerId), (provider) =>
        Effect.succeed({
          credentials,
          provider,
          metadata,
        })
      )
    );
  }

  /**
   * Get authentication headers for API calls
   */
  getAuthHeaders(
    credentialId: string
  ): Effect.Effect<Record<string, string>, AuthError> {
    return Effect.flatMap(this.getCredentials(credentialId), (credentials) =>
      Effect.flatMap(this.getProvider(credentials.providerId), (provider) =>
        provider.getAuthHeaders(credentials)
      )
    );
  }

  /**
   * Refresh credentials if supported
   */
  refreshCredentials(credentialId: string): Effect.Effect<void, AuthError> {
    return Effect.flatMap(this.getCredentials(credentialId), (credentials) =>
      Effect.flatMap(this.getProvider(credentials.providerId), (provider) => {
        if (!provider.refreshCredentials) {
          return Effect.fail(
            new AuthError('Refresh not supported', 'REFRESH_NOT_SUPPORTED')
          );
        }

        return Effect.flatMap(
          provider.refreshCredentials(credentials),
          (newCredentials) =>
            Effect.sync(() => {
              this.credentials.set(
                credentialId,
                newCredentials as SupportedAuth
              );
            })
        );
      })
    );
  }

  /**
   * Validate stored credentials
   */
  validateCredentials(credentialId: string): Effect.Effect<boolean, AuthError> {
    return Effect.flatMap(this.getCredentials(credentialId), (credentials) =>
      Effect.flatMap(this.getProvider(credentials.providerId), (provider) =>
        provider.validateCredentials(credentials)
      )
    );
  }

  /**
   * Remove stored credentials
   */
  removeCredentials(credentialId: string): Effect.Effect<boolean, AuthError> {
    return Effect.sync(() => {
      return this.credentials.delete(credentialId);
    });
  }

  /**
   * List all registered providers
   */
  listProviders(): Effect.Effect<string[], AuthError> {
    return Effect.sync(() => {
      return Array.from(this.providers.keys());
    });
  }

  /**
   * List all stored credentials (with masked sensitive data)
   */
  listCredentials(): Effect.Effect<
    Array<{ id: string; data: Record<string, unknown> }>,
    AuthError
  > {
    return Effect.sync(() => {
      return Array.from(this.credentials.entries()).map(
        ([id, credentials]) => ({
          id,
          data: credentials.serialize(),
        })
      );
    });
  }

  /**
   * Get supported auth types for a provider
   */
  getSupportedAuthTypes(
    providerType: string
  ): Effect.Effect<readonly string[], AuthError> {
    return Effect.flatMap(this.getProvider(providerType), (provider) =>
      Effect.succeed(provider.supportedAuthTypes)
    );
  }

  private generateCredentialId(providerType: string): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    return `${providerType}-${timestamp}-${random}`;
  }
}
