import { Effect } from 'effect';
import { AuthError, PersonalAccessTokenAuth, OAuth2Auth, Web3WalletAuth, AESKeyAuth, SSHKeyAuth, BasicAuth, AnonymousAuth } from '../types';

/**
 * Factory for creating credential instances
 */
export declare class CredentialFactory {
    static createPersonalAccessToken(providerId: string, token: string, scopes?: string[]): PersonalAccessTokenAuth;
    static createOAuth2(config: {
        providerId: string;
        clientId: string;
        clientSecret?: string;
        accessToken: string;
        refreshToken?: string;
        expiresAt?: Date;
        scopes?: string[];
    }): OAuth2Auth;
    static createWeb3Wallet(config: {
        providerId: string;
        walletAddress: string;
        chainId: number;
        signature?: string;
        nonce?: string;
        signMessage: (message: string) => Effect.Effect<string, AuthError>;
        getAddress: () => Effect.Effect<string, AuthError>;
    }): Web3WalletAuth;
    static createAESKey(config: {
        providerId: string;
        keyId: string;
        encryptedKey: string;
        algorithm: 'AES-256-GCM' | 'AES-192-GCM' | 'AES-128-GCM';
        decrypt: (data: string) => Effect.Effect<string, AuthError>;
        encrypt: (data: string) => Effect.Effect<string, AuthError>;
    }): AESKeyAuth;
    static createSSHKey(config: {
        providerId: string;
        publicKey: string;
        privateKey?: string;
        passphrase?: string;
        keyFingerprint: string;
    }): SSHKeyAuth;
    static createBasic(providerId: string, username: string, password: string): BasicAuth;
    static createAnonymous(providerId: string): AnonymousAuth;
}
