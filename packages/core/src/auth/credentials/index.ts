import { Effect } from 'effect';
import {
  AuthError,
  PersonalAccessTokenAuth,
  OAuth2Auth,
  Web3WalletAuth,
  AESKeyAuth,
  SSHKeyAuth,
  BasicAuth,
  AnonymousAuth,
} from '../types';

/**
 * Factory for creating credential instances
 */
export class CredentialFactory {
  static createPersonalAccessToken(
    providerId: string,
    token: string,
    scopes?: string[]
  ): PersonalAccessTokenAuth {
    return {
      type: 'pat',
      providerId,
      token,
      scopes,
      validate: () =>
        Effect.sync(() => {
          if (!token || token.trim().length === 0) {
            return false;
          }
          return true;
        }),
      serialize: () => ({
        type: 'pat',
        providerId,
        token: '***masked***',
        scopes,
      }),
    };
  }

  static createOAuth2(config: {
    providerId: string;
    clientId: string;
    clientSecret?: string;
    accessToken: string;
    refreshToken?: string;
    expiresAt?: Date;
    scopes?: string[];
  }): OAuth2Auth {
    return {
      type: 'oauth2',
      ...config,
      validate: () =>
        Effect.sync(() => {
          if (!config.accessToken || config.accessToken.trim().length === 0) {
            return false;
          }
          if (config.expiresAt && config.expiresAt < new Date()) {
            return false;
          }
          return true;
        }),
      serialize: () => ({
        type: 'oauth2',
        providerId: config.providerId,
        clientId: config.clientId,
        accessToken: '***masked***',
        refreshToken: config.refreshToken ? '***masked***' : undefined,
        expiresAt: config.expiresAt?.toISOString(),
        scopes: config.scopes,
      }),
    };
  }

  static createWeb3Wallet(config: {
    providerId: string;
    walletAddress: string;
    chainId: number;
    signature?: string;
    nonce?: string;
    signMessage: (message: string) => Effect.Effect<string, AuthError>;
    getAddress: () => Effect.Effect<string, AuthError>;
  }): Web3WalletAuth {
    return {
      type: 'web3-wallet',
      ...config,
      validate: () =>
        Effect.flatMap(config.getAddress(), (address) =>
          Effect.sync(() => {
            return address.toLowerCase() === config.walletAddress.toLowerCase();
          })
        ),
      serialize: () => ({
        type: 'web3-wallet',
        providerId: config.providerId,
        walletAddress: config.walletAddress,
        chainId: config.chainId,
        signature: config.signature ? '***masked***' : undefined,
        nonce: config.nonce,
      }),
    };
  }

  static createAESKey(config: {
    providerId: string;
    keyId: string;
    encryptedKey: string;
    algorithm: 'AES-256-GCM' | 'AES-192-GCM' | 'AES-128-GCM';
    decrypt: (data: string) => Effect.Effect<string, AuthError>;
    encrypt: (data: string) => Effect.Effect<string, AuthError>;
  }): AESKeyAuth {
    return {
      type: 'aes-key',
      ...config,
      validate: () =>
        Effect.tryPromise({
          try: async () => {
            // Test encrypt/decrypt cycle
            const testData = 'test-validation-data';
            const encrypted = await Effect.runPromise(config.encrypt(testData));
            const decrypted = await Effect.runPromise(
              config.decrypt(encrypted)
            );
            return decrypted === testData;
          },
          catch: () =>
            new AuthError('AES key validation failed', 'VALIDATION_ERROR'),
        }),
      serialize: () => ({
        type: 'aes-key',
        providerId: config.providerId,
        keyId: config.keyId,
        encryptedKey: '***masked***',
        algorithm: config.algorithm,
      }),
    };
  }

  static createSSHKey(config: {
    providerId: string;
    publicKey: string;
    privateKey?: string;
    passphrase?: string;
    keyFingerprint: string;
  }): SSHKeyAuth {
    return {
      type: 'ssh-key',
      ...config,
      validate: () =>
        Effect.sync(() => {
          if (!config.publicKey || config.publicKey.trim().length === 0) {
            return false;
          }
          if (
            !config.keyFingerprint ||
            config.keyFingerprint.trim().length === 0
          ) {
            return false;
          }
          return true;
        }),
      serialize: () => ({
        type: 'ssh-key',
        providerId: config.providerId,
        publicKey: config.publicKey,
        privateKey: config.privateKey ? '***masked***' : undefined,
        passphrase: config.passphrase ? '***masked***' : undefined,
        keyFingerprint: config.keyFingerprint,
      }),
    };
  }

  static createBasic(
    providerId: string,
    username: string,
    password: string
  ): BasicAuth {
    return {
      type: 'basic',
      providerId,
      username,
      password,
      validate: () =>
        Effect.sync(() => {
          if (!username || username.trim().length === 0) {
            return false;
          }
          if (!password || password.trim().length === 0) {
            return false;
          }
          return true;
        }),
      serialize: () => ({
        type: 'basic',
        providerId,
        username,
        password: '***masked***',
      }),
    };
  }

  static createAnonymous(providerId: string): AnonymousAuth {
    return {
      type: 'anonymous',
      providerId,
      validate: () => Effect.succeed(true),
      serialize: () => ({
        type: 'anonymous',
        providerId,
      }),
    };
  }
}
