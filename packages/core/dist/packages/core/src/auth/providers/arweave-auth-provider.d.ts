import { Effect } from 'effect';
import { BaseAuthProvider } from './base-auth-provider';
import { AuthError, Web3WalletAuth, AESKeyAuth, AnonymousAuth, AuthChallenge } from '../types';

type ArweaveAuth = Web3WalletAuth | AESKeyAuth | AnonymousAuth;
/**
 * Arweave authentication provider
 */
export declare class ArweaveAuthProvider extends BaseAuthProvider<ArweaveAuth> {
    readonly providerType = "arweave";
    readonly supportedAuthTypes: readonly ["web3-wallet", "aes-key", "anonymous"];
    createCredentials(config: Record<string, unknown>): Effect.Effect<ArweaveAuth, AuthError>;
    validateCredentials(credentials: ArweaveAuth): Effect.Effect<boolean, AuthError>;
    getAuthHeaders(credentials: ArweaveAuth): Effect.Effect<Record<string, string>, AuthError>;
    handleAuthChallenge(challenge: AuthChallenge, credentials: ArweaveAuth): Effect.Effect<ArweaveAuth, AuthError>;
    private signMessage;
    private getWalletAddress;
    private encryptData;
    private decryptData;
    private validateArweaveWallet;
    private validateArweaveKey;
}
export {};
