import { Effect } from 'effect';
import { AuthManager } from './auth-manager';
import { GitHubAuthProvider, ArweaveAuthProvider } from './providers';
import { PluginSystem } from '../plugin-system';

/**
 * Example: Setting up GitHub Personal Access Token authentication
 */
export function setupGitHubPAT(token: string): Effect.Effect<string, Error> {
  return Effect.gen(function* (_) {
    const authManager = new AuthManager();
    const githubProvider = new GitHubAuthProvider();

    // Register the GitHub auth provider
    yield* _(authManager.registerProvider(githubProvider));

    // Create and store GitHub PAT credentials
    const credentialId = yield* _(
      authManager.createCredentials('github', {
        type: 'pat',
        token,
        scopes: ['repo', 'read:user'],
      })
    );

    return credentialId;
  });
}

/**
 * Example: Setting up GitHub OAuth2 authentication
 */
export function setupGitHubOAuth2(
  clientId: string,
  clientSecret: string,
  accessToken: string,
  refreshToken?: string
): Effect.Effect<string, Error> {
  return Effect.gen(function* (_) {
    const authManager = new AuthManager();
    const githubProvider = new GitHubAuthProvider();

    yield* _(authManager.registerProvider(githubProvider));

    const credentialId = yield* _(
      authManager.createCredentials('github', {
        type: 'oauth2',
        clientId,
        clientSecret,
        accessToken,
        refreshToken,
        scopes: ['repo', 'read:user'],
      })
    );

    return credentialId;
  });
}

/**
 * Example: Setting up Web3 wallet authentication for Arweave
 */
export function setupArweaveWallet(
  walletAddress: string,
  chainId = 1,
  signMessageFn: (message: string) => Promise<string>
): Effect.Effect<string, Error> {
  return Effect.gen(function* (_) {
    const authManager = new AuthManager();
    const arweaveProvider = new ArweaveAuthProvider();

    yield* _(authManager.registerProvider(arweaveProvider));

    const credentialId = yield* _(
      authManager.createCredentials('arweave', {
        type: 'web3-wallet',
        walletAddress,
        chainId,
        signMessage: (message: string) =>
          Effect.tryPromise({
            try: () => signMessageFn(message),
            catch: (error) => new Error(`Signing failed: ${error}`),
          }),
        getAddress: () => Effect.succeed(walletAddress),
      })
    );

    return credentialId;
  });
}

/**
 * Example: Setting up AES key authentication for Arweave
 */
export function setupArweaveAESKey(
  keyId: string,
  encryptedKey: string,
  decryptFn: (data: string) => Promise<string>,
  encryptFn: (data: string) => Promise<string>
): Effect.Effect<string, Error> {
  return Effect.gen(function* (_) {
    const authManager = new AuthManager();
    const arweaveProvider = new ArweaveAuthProvider();

    yield* _(authManager.registerProvider(arweaveProvider));

    const credentialId = yield* _(
      authManager.createCredentials('arweave', {
        type: 'aes-key',
        keyId,
        encryptedKey,
        algorithm: 'AES-256-GCM' as const,
        decrypt: (data: string) =>
          Effect.tryPromise({
            try: () => decryptFn(data),
            catch: (error) => new Error(`Decryption failed: ${error}`),
          }),
        encrypt: (data: string) =>
          Effect.tryPromise({
            try: () => encryptFn(data),
            catch: (error) => new Error(`Encryption failed: ${error}`),
          }),
      })
    );

    return credentialId;
  });
}

/**
 * Example: Complete plugin system setup with authentication
 */
export function setupSkelegitWithAuth(): Effect.Effect<PluginSystem, Error> {
  return Effect.gen(function* (_) {
    // Create auth manager
    const authManager = new AuthManager();

    // Register auth providers
    yield* _(authManager.registerProvider(new GitHubAuthProvider()));
    yield* _(authManager.registerProvider(new ArweaveAuthProvider()));

    // Create plugin system with auth manager
    const pluginSystem = new PluginSystem(authManager);

    return pluginSystem;
  });
}

/**
 * Example: Using multiple authentication methods
 */
export function multiAuthExample(): Effect.Effect<void, Error> {
  return Effect.gen(function* (_) {
    const authManager = new AuthManager();

    // Register providers
    yield* _(authManager.registerProvider(new GitHubAuthProvider()));
    yield* _(authManager.registerProvider(new ArweaveAuthProvider()));

    // Setup GitHub PAT
    const githubCredId = yield* _(
      authManager.createCredentials('github', {
        type: 'pat',
        token: 'ghp_xxxxxxxxxxxxxxxxxxxx',
      })
    );

    // Setup Arweave wallet
    const arweaveCredId = yield* _(
      authManager.createCredentials('arweave', {
        type: 'web3-wallet',
        walletAddress: '1seRanklLU_1VTGkEk7P0xAwMJfA7owA1JHW5KyZKlY',
        chainId: 1,
        signMessage: (message: string) => Effect.succeed(`signed:${message}`),
        getAddress: () =>
          Effect.succeed('1seRanklLU_1VTGkEk7P0xAwMJfA7owA1JHW5KyZKlY'),
      })
    );

    // Get auth headers for GitHub
    const githubHeaders = yield* _(authManager.getAuthHeaders(githubCredId));
    // Note: In Node.js environment, you would use console.log
    // console.log('GitHub headers:', githubHeaders);
    void githubHeaders; // Suppress unused variable warning

    // Get auth headers for Arweave
    const arweaveHeaders = yield* _(authManager.getAuthHeaders(arweaveCredId));
    // console.log('Arweave headers:', arweaveHeaders);
    void arweaveHeaders; // Suppress unused variable warning

    // List all credentials (masked)
    const credentials = yield* _(authManager.listCredentials());
    // console.log('Stored credentials:', credentials);
    void credentials; // Suppress unused variable warning
  });
}

/**
 * Example: Git client creation with stored credentials
 */
export function createGitClientWithStoredAuth(
  provider: string,
  credentialId: string
): Effect.Effect<any, Error> {
  return Effect.gen(function* (_) {
    const pluginSystem = yield* _(setupSkelegitWithAuth());

    // Create git client config with stored credentials
    const config = {
      provider,
      authCredentialId: credentialId,
      baseUrl: provider === 'github' ? 'https://api.github.com' : undefined,
    };

    const gitClient = yield* _(pluginSystem.createClient(config));
    return gitClient as unknown;
  });
}
