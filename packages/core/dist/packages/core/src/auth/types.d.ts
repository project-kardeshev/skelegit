import { Effect } from 'effect';

/**
 * Base authentication interface that all auth types must implement
 */
export interface AuthCredential {
    readonly type: string;
    readonly providerId: string;
    validate(): Effect.Effect<boolean, AuthError>;
    serialize(): Record<string, unknown>;
}
/**
 * Authentication errors
 */
export declare class AuthError extends Error {
    readonly code: string;
    readonly cause?: unknown | undefined;
    constructor(message: string, code: string, cause?: unknown | undefined);
}
/**
 * Personal Access Token authentication
 */
export interface PersonalAccessTokenAuth extends AuthCredential {
    readonly type: 'pat';
    readonly token: string;
    readonly scopes?: string[];
}
/**
 * OAuth2 authentication
 */
export interface OAuth2Auth extends AuthCredential {
    readonly type: 'oauth2';
    readonly clientId: string;
    readonly clientSecret?: string;
    readonly accessToken: string;
    readonly refreshToken?: string;
    readonly expiresAt?: Date;
    readonly scopes?: string[];
}
/**
 * Web3 wallet authentication
 */
export interface Web3WalletAuth extends AuthCredential {
    readonly type: 'web3-wallet';
    readonly walletAddress: string;
    readonly chainId: number;
    readonly signature?: string;
    readonly nonce?: string;
    readonly signMessage: (message: string) => Effect.Effect<string, AuthError>;
    readonly getAddress: () => Effect.Effect<string, AuthError>;
}
/**
 * AES key authentication
 */
export interface AESKeyAuth extends AuthCredential {
    readonly type: 'aes-key';
    readonly keyId: string;
    readonly encryptedKey: string;
    readonly algorithm: 'AES-256-GCM' | 'AES-192-GCM' | 'AES-128-GCM';
    readonly decrypt: (data: string) => Effect.Effect<string, AuthError>;
    readonly encrypt: (data: string) => Effect.Effect<string, AuthError>;
}
/**
 * SSH key authentication
 */
export interface SSHKeyAuth extends AuthCredential {
    readonly type: 'ssh-key';
    readonly publicKey: string;
    readonly privateKey?: string;
    readonly passphrase?: string;
    readonly keyFingerprint: string;
}
/**
 * Basic username/password authentication
 */
export interface BasicAuth extends AuthCredential {
    readonly type: 'basic';
    readonly username: string;
    readonly password: string;
}
/**
 * Anonymous (no authentication)
 */
export interface AnonymousAuth extends AuthCredential {
    readonly type: 'anonymous';
}
/**
 * Union of all supported auth types
 */
export type SupportedAuth = PersonalAccessTokenAuth | OAuth2Auth | Web3WalletAuth | AESKeyAuth | SSHKeyAuth | BasicAuth | AnonymousAuth;
/**
 * Auth provider interface for handling provider-specific authentication logic
 */
export interface AuthProvider<T extends AuthCredential = AuthCredential> {
    readonly providerType: string;
    readonly supportedAuthTypes: readonly string[];
    /**
     * Create credentials from configuration
     */
    createCredentials(config: Record<string, unknown>): Effect.Effect<T, AuthError>;
    /**
     * Validate credentials against the provider
     */
    validateCredentials(credentials: T): Effect.Effect<boolean, AuthError>;
    /**
     * Refresh credentials if supported (e.g., OAuth2 refresh)
     */
    refreshCredentials?(credentials: T): Effect.Effect<T, AuthError>;
    /**
     * Get authentication headers/metadata for API calls
     */
    getAuthHeaders(credentials: T): Effect.Effect<Record<string, string>, AuthError>;
    /**
     * Handle authentication challenges (e.g., 2FA)
     */
    handleAuthChallenge?(challenge: AuthChallenge, credentials: T): Effect.Effect<T, AuthError>;
}
/**
 * Authentication challenge for 2FA, wallet signatures, etc.
 */
export interface AuthChallenge {
    readonly type: 'totp' | 'sms' | 'signature' | 'captcha' | 'custom';
    readonly message: string;
    readonly data?: Record<string, unknown>;
}
/**
 * Authentication context passed to git operations
 */
export interface AuthContext {
    readonly credentials: SupportedAuth;
    readonly provider: AuthProvider;
    readonly metadata?: Record<string, unknown>;
}
