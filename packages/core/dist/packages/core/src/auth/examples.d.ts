import { Effect } from 'effect';
import { PluginSystem } from '../plugin-system';

/**
 * Example: Setting up GitHub Personal Access Token authentication
 */
export declare function setupGitHubPAT(token: string): Effect.Effect<string, Error>;
/**
 * Example: Setting up GitHub OAuth2 authentication
 */
export declare function setupGitHubOAuth2(clientId: string, clientSecret: string, accessToken: string, refreshToken?: string): Effect.Effect<string, Error>;
/**
 * Example: Setting up Web3 wallet authentication for Arweave
 */
export declare function setupArweaveWallet(walletAddress: string, chainId: number | undefined, signMessageFn: (message: string) => Promise<string>): Effect.Effect<string, Error>;
/**
 * Example: Setting up AES key authentication for Arweave
 */
export declare function setupArweaveAESKey(keyId: string, encryptedKey: string, decryptFn: (data: string) => Promise<string>, encryptFn: (data: string) => Promise<string>): Effect.Effect<string, Error>;
/**
 * Example: Complete plugin system setup with authentication
 */
export declare function setupSkelegitWithAuth(): Effect.Effect<PluginSystem, Error>;
/**
 * Example: Using multiple authentication methods
 */
export declare function multiAuthExample(): Effect.Effect<void, Error>;
/**
 * Example: Git client creation with stored credentials
 */
export declare function createGitClientWithStoredAuth(provider: string, credentialId: string): Effect.Effect<any, Error>;
