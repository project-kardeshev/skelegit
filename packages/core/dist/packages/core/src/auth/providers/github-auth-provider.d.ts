import { Effect } from 'effect';
import { BaseAuthProvider } from './base-auth-provider';
import { AuthError, PersonalAccessTokenAuth, OAuth2Auth, BasicAuth, AuthChallenge } from '../types';

type GitHubAuth = PersonalAccessTokenAuth | OAuth2Auth | BasicAuth;
/**
 * GitHub authentication provider
 */
export declare class GitHubAuthProvider extends BaseAuthProvider<GitHubAuth> {
    readonly providerType = "github";
    readonly supportedAuthTypes: readonly ["pat", "oauth2", "basic"];
    createCredentials(config: Record<string, unknown>): Effect.Effect<GitHubAuth, AuthError>;
    validateCredentials(credentials: GitHubAuth): Effect.Effect<boolean, AuthError>;
    getAuthHeaders(credentials: GitHubAuth): Effect.Effect<Record<string, string>, AuthError>;
    refreshCredentials(credentials: GitHubAuth): Effect.Effect<GitHubAuth, AuthError>;
    handleAuthChallenge(challenge: AuthChallenge, _credentials: GitHubAuth): Effect.Effect<GitHubAuth, AuthError>;
    private validateGitHubPAT;
    private validateGitHubOAuth2;
    private validateGitHubBasic;
}
export {};
