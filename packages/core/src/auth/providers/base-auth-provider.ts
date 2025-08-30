import { Effect } from 'effect';
import { AuthProvider, AuthCredential, AuthError } from '../types';

/**
 * Abstract base class for auth providers
 */
export abstract class BaseAuthProvider<
  T extends AuthCredential = AuthCredential,
> implements AuthProvider<T>
{
  abstract readonly providerType: string;
  abstract readonly supportedAuthTypes: readonly string[];

  abstract createCredentials(
    config: Record<string, unknown>
  ): Effect.Effect<T, AuthError>;

  abstract validateCredentials(
    credentials: T
  ): Effect.Effect<boolean, AuthError>;

  abstract getAuthHeaders(
    credentials: T
  ): Effect.Effect<Record<string, string>, AuthError>;

  /**
   * Default implementation for refresh - override if provider supports it
   */
  refreshCredentials?(credentials: T): Effect.Effect<T, AuthError>;

  /**
   * Default implementation for auth challenges - override if provider supports it
   */
  handleAuthChallenge?(
    challenge: unknown,
    credentials: T
  ): Effect.Effect<T, AuthError>;

  /**
   * Helper method to check if auth type is supported
   */
  protected isAuthTypeSupported(authType: string): boolean {
    return this.supportedAuthTypes.includes(authType);
  }

  /**
   * Helper method to create auth errors
   */
  protected createAuthError(
    message: string,
    code: string,
    cause?: unknown
  ): AuthError {
    return new AuthError(message, code, cause);
  }

  /**
   * Helper method to validate required fields
   */
  protected validateRequiredFields(
    config: Record<string, unknown>,
    requiredFields: string[]
  ): Effect.Effect<void, AuthError> {
    return Effect.sync(() => {
      for (const field of requiredFields) {
        if (!(field in config) || config[field] == null) {
          throw new AuthError(
            `Missing required field: ${field}`,
            'MISSING_REQUIRED_FIELD'
          );
        }
      }
    });
  }

  /**
   * Helper method to safely get string value
   */
  protected getStringValue(
    config: Record<string, unknown>,
    key: string,
    defaultValue?: string
  ): string {
    const value = config[key];
    if (typeof value === 'string') {
      return value;
    }
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    throw new AuthError(
      `Expected string value for ${key}, got ${typeof value}`,
      'INVALID_FIELD_TYPE'
    );
  }

  /**
   * Helper method to safely get number value
   */
  protected getNumberValue(
    config: Record<string, unknown>,
    key: string,
    defaultValue?: number
  ): number {
    const value = config[key];
    if (typeof value === 'number') {
      return value;
    }
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    throw new AuthError(
      `Expected number value for ${key}, got ${typeof value}`,
      'INVALID_FIELD_TYPE'
    );
  }

  /**
   * Helper method to safely get array value
   */
  protected getArrayValue<T>(
    config: Record<string, unknown>,
    key: string,
    defaultValue?: T[]
  ): T[] {
    const value = config[key];
    if (Array.isArray(value)) {
      return value;
    }
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    throw new AuthError(
      `Expected array value for ${key}, got ${typeof value}`,
      'INVALID_FIELD_TYPE'
    );
  }
}
