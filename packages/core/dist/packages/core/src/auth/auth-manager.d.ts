import { Effect } from 'effect';
import { AuthProvider, AuthError, AuthContext, SupportedAuth } from './types';

/**
 * Central authentication manager that handles multiple providers
 */
export declare class AuthManager {
    private providers;
    private credentials;
    /**
     * Register an authentication provider
     */
    registerProvider(provider: AuthProvider): Effect.Effect<void, AuthError>;
    /**
     * Get registered provider by type
     */
    getProvider(providerType: string): Effect.Effect<AuthProvider, AuthError>;
    /**
     * Create and store credentials
     */
    createCredentials(providerType: string, config: Record<string, unknown>, credentialId?: string): Effect.Effect<string, AuthError>;
    /**
     * Get stored credentials
     */
    getCredentials(credentialId: string): Effect.Effect<SupportedAuth, AuthError>;
    /**
     * Create authentication context
     */
    createAuthContext(credentialId: string, metadata?: Record<string, unknown>): Effect.Effect<AuthContext, AuthError>;
    /**
     * Get authentication headers for API calls
     */
    getAuthHeaders(credentialId: string): Effect.Effect<Record<string, string>, AuthError>;
    /**
     * Refresh credentials if supported
     */
    refreshCredentials(credentialId: string): Effect.Effect<void, AuthError>;
    /**
     * Validate stored credentials
     */
    validateCredentials(credentialId: string): Effect.Effect<boolean, AuthError>;
    /**
     * Remove stored credentials
     */
    removeCredentials(credentialId: string): Effect.Effect<boolean, AuthError>;
    /**
     * List all registered providers
     */
    listProviders(): Effect.Effect<string[], AuthError>;
    /**
     * List all stored credentials (with masked sensitive data)
     */
    listCredentials(): Effect.Effect<Array<{
        id: string;
        data: Record<string, unknown>;
    }>, AuthError>;
    /**
     * Get supported auth types for a provider
     */
    getSupportedAuthTypes(providerType: string): Effect.Effect<readonly string[], AuthError>;
    private generateCredentialId;
}
