import { Effect as r } from "effect";
class n extends Error {
  constructor(e, t, a) {
    super(e), this.code = t, this.cause = a, this.name = "AuthError";
  }
}
class u {
  static createPersonalAccessToken(e, t, a) {
    return {
      type: "pat",
      providerId: e,
      token: t,
      scopes: a,
      validate: () => r.sync(() => !(!t || t.trim().length === 0)),
      serialize: () => ({
        type: "pat",
        providerId: e,
        token: "***masked***",
        scopes: a
      })
    };
  }
  static createOAuth2(e) {
    return {
      type: "oauth2",
      ...e,
      validate: () => r.sync(() => !(!e.accessToken || e.accessToken.trim().length === 0 || e.expiresAt && e.expiresAt < /* @__PURE__ */ new Date())),
      serialize: () => {
        var t;
        return {
          type: "oauth2",
          providerId: e.providerId,
          clientId: e.clientId,
          accessToken: "***masked***",
          refreshToken: e.refreshToken ? "***masked***" : void 0,
          expiresAt: (t = e.expiresAt) == null ? void 0 : t.toISOString(),
          scopes: e.scopes
        };
      }
    };
  }
  static createWeb3Wallet(e) {
    return {
      type: "web3-wallet",
      ...e,
      validate: () => r.flatMap(
        e.getAddress(),
        (t) => r.sync(() => t.toLowerCase() === e.walletAddress.toLowerCase())
      ),
      serialize: () => ({
        type: "web3-wallet",
        providerId: e.providerId,
        walletAddress: e.walletAddress,
        chainId: e.chainId,
        signature: e.signature ? "***masked***" : void 0,
        nonce: e.nonce
      })
    };
  }
  static createAESKey(e) {
    return {
      type: "aes-key",
      ...e,
      validate: () => r.tryPromise({
        try: async () => {
          const t = "test-validation-data", a = await r.runPromise(e.encrypt(t));
          return await r.runPromise(
            e.decrypt(a)
          ) === t;
        },
        catch: () => new n("AES key validation failed", "VALIDATION_ERROR")
      }),
      serialize: () => ({
        type: "aes-key",
        providerId: e.providerId,
        keyId: e.keyId,
        encryptedKey: "***masked***",
        algorithm: e.algorithm
      })
    };
  }
  static createSSHKey(e) {
    return {
      type: "ssh-key",
      ...e,
      validate: () => r.sync(() => !(!e.publicKey || e.publicKey.trim().length === 0 || !e.keyFingerprint || e.keyFingerprint.trim().length === 0)),
      serialize: () => ({
        type: "ssh-key",
        providerId: e.providerId,
        publicKey: e.publicKey,
        privateKey: e.privateKey ? "***masked***" : void 0,
        passphrase: e.passphrase ? "***masked***" : void 0,
        keyFingerprint: e.keyFingerprint
      })
    };
  }
  static createBasic(e, t, a) {
    return {
      type: "basic",
      providerId: e,
      username: t,
      password: a,
      validate: () => r.sync(() => !(!t || t.trim().length === 0 || !a || a.trim().length === 0)),
      serialize: () => ({
        type: "basic",
        providerId: e,
        username: t,
        password: "***masked***"
      })
    };
  }
  static createAnonymous(e) {
    return {
      type: "anonymous",
      providerId: e,
      validate: () => r.succeed(!0),
      serialize: () => ({
        type: "anonymous",
        providerId: e
      })
    };
  }
}
class d {
  /**
   * Helper method to check if auth type is supported
   */
  isAuthTypeSupported(e) {
    return this.supportedAuthTypes.includes(e);
  }
  /**
   * Helper method to create auth errors
   */
  createAuthError(e, t, a) {
    return new n(e, t, a);
  }
  /**
   * Helper method to validate required fields
   */
  validateRequiredFields(e, t) {
    return r.sync(() => {
      for (const a of t)
        if (!(a in e) || e[a] == null)
          throw new n(
            `Missing required field: ${a}`,
            "MISSING_REQUIRED_FIELD"
          );
    });
  }
  /**
   * Helper method to safely get string value
   */
  getStringValue(e, t, a) {
    const s = e[t];
    if (typeof s == "string")
      return s;
    if (a !== void 0)
      return a;
    throw new n(
      `Expected string value for ${t}, got ${typeof s}`,
      "INVALID_FIELD_TYPE"
    );
  }
  /**
   * Helper method to safely get number value
   */
  getNumberValue(e, t, a) {
    const s = e[t];
    if (typeof s == "number")
      return s;
    if (a !== void 0)
      return a;
    throw new n(
      `Expected number value for ${t}, got ${typeof s}`,
      "INVALID_FIELD_TYPE"
    );
  }
  /**
   * Helper method to safely get array value
   */
  getArrayValue(e, t, a) {
    const s = e[t];
    if (Array.isArray(s))
      return s;
    if (a !== void 0)
      return a;
    throw new n(
      `Expected array value for ${t}, got ${typeof s}`,
      "INVALID_FIELD_TYPE"
    );
  }
}
class E extends d {
  constructor() {
    super(...arguments), this.providerType = "github", this.supportedAuthTypes = ["pat", "oauth2", "basic"];
  }
  createCredentials(e) {
    return r.sync(() => {
      const t = this.getStringValue(e, "type");
      if (!this.isAuthTypeSupported(t))
        throw this.createAuthError(
          `Unsupported auth type: ${t}`,
          "UNSUPPORTED_AUTH_TYPE"
        );
      switch (t) {
        case "pat":
          return u.createPersonalAccessToken(
            this.providerType,
            this.getStringValue(e, "token"),
            this.getArrayValue(e, "scopes", [])
          );
        case "oauth2":
          return u.createOAuth2({
            providerId: this.providerType,
            clientId: this.getStringValue(e, "clientId"),
            clientSecret: this.getStringValue(e, "clientSecret", ""),
            accessToken: this.getStringValue(e, "accessToken"),
            refreshToken: this.getStringValue(
              e,
              "refreshToken",
              void 0
            ),
            expiresAt: e.expiresAt ? new Date(e.expiresAt) : void 0,
            scopes: this.getArrayValue(e, "scopes", [])
          });
        case "basic":
          return u.createBasic(
            this.providerType,
            this.getStringValue(e, "username"),
            this.getStringValue(e, "password")
          );
        default:
          throw this.createAuthError(
            `Unsupported auth type: ${t}`,
            "UNSUPPORTED_AUTH_TYPE"
          );
      }
    });
  }
  validateCredentials(e) {
    return r.flatMap(e.validate(), (t) => {
      if (!t)
        return r.succeed(!1);
      switch (e.type) {
        case "pat":
          return this.validateGitHubPAT(e);
        case "oauth2":
          return this.validateGitHubOAuth2(e);
        case "basic":
          return this.validateGitHubBasic(e);
        default:
          return r.fail(
            this.createAuthError("Unknown auth type", "UNKNOWN_AUTH_TYPE")
          );
      }
    });
  }
  getAuthHeaders(e) {
    return r.sync(() => {
      const t = {
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        "User-Agent": "Skelegit/1.0.0"
      };
      switch (e.type) {
        case "pat":
          t.Authorization = `token ${e.token}`;
          break;
        case "oauth2":
          t.Authorization = `Bearer ${e.accessToken}`;
          break;
        case "basic": {
          const a = globalThis.btoa(
            `${e.username}:${e.password}`
          );
          t.Authorization = `Basic ${a}`;
          break;
        }
        default:
          throw this.createAuthError("Unknown auth type", "UNKNOWN_AUTH_TYPE");
      }
      return t;
    });
  }
  refreshCredentials(e) {
    return e.type !== "oauth2" ? r.fail(
      this.createAuthError(
        "Refresh not supported for this auth type",
        "REFRESH_NOT_SUPPORTED"
      )
    ) : e.refreshToken ? r.fail(
      this.createAuthError("OAuth2 refresh not implemented", "NOT_IMPLEMENTED")
    ) : r.fail(
      this.createAuthError("No refresh token available", "NO_REFRESH_TOKEN")
    );
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleAuthChallenge(e, t) {
    return e.type === "totp" ? r.fail(
      this.createAuthError("2FA challenge not implemented", "NOT_IMPLEMENTED")
    ) : r.fail(
      this.createAuthError(
        `Unsupported challenge type: ${e.type}`,
        "UNSUPPORTED_CHALLENGE"
      )
    );
  }
  validateGitHubPAT(e) {
    return r.tryPromise({
      try: async () => {
        const t = e.token;
        return !(!t.startsWith("ghp_") && !t.startsWith("github_pat_"));
      },
      catch: (t) => this.createAuthError(
        "PAT validation failed",
        "VALIDATION_ERROR",
        t
      )
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validateGitHubOAuth2(e) {
    return r.tryPromise({
      try: async () => !0,
      catch: (t) => this.createAuthError(
        "OAuth2 validation failed",
        "VALIDATION_ERROR",
        t
      )
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validateGitHubBasic(e) {
    return r.tryPromise({
      try: async () => !0,
      catch: (t) => this.createAuthError(
        "Basic auth validation failed",
        "VALIDATION_ERROR",
        t
      )
    });
  }
}
class f extends d {
  constructor() {
    super(...arguments), this.providerType = "arweave", this.supportedAuthTypes = [
      "web3-wallet",
      "aes-key",
      "anonymous"
    ];
  }
  createCredentials(e) {
    return r.sync(() => {
      const t = this.getStringValue(e, "type");
      if (!this.isAuthTypeSupported(t))
        throw this.createAuthError(
          `Unsupported auth type: ${t}`,
          "UNSUPPORTED_AUTH_TYPE"
        );
      switch (t) {
        case "web3-wallet":
          return u.createWeb3Wallet({
            providerId: this.providerType,
            walletAddress: this.getStringValue(e, "walletAddress"),
            chainId: this.getNumberValue(e, "chainId", 1),
            // Default to Ethereum mainnet
            signature: this.getStringValue(e, "signature", void 0),
            nonce: this.getStringValue(e, "nonce", void 0),
            signMessage: (a) => this.signMessage(a, e),
            getAddress: () => this.getWalletAddress(e)
          });
        case "aes-key":
          return u.createAESKey({
            providerId: this.providerType,
            keyId: this.getStringValue(e, "keyId"),
            encryptedKey: this.getStringValue(e, "encryptedKey"),
            algorithm: e.algorithm,
            decrypt: (a) => this.decryptData(a, e),
            encrypt: (a) => this.encryptData(a, e)
          });
        case "anonymous":
          return u.createAnonymous(this.providerType);
        default:
          throw this.createAuthError(
            `Unsupported auth type: ${t}`,
            "UNSUPPORTED_AUTH_TYPE"
          );
      }
    });
  }
  validateCredentials(e) {
    return r.flatMap(e.validate(), (t) => {
      if (!t)
        return r.succeed(!1);
      switch (e.type) {
        case "web3-wallet":
          return this.validateArweaveWallet(e);
        case "aes-key":
          return this.validateArweaveKey(e);
        case "anonymous":
          return r.succeed(!0);
        default:
          return r.fail(
            this.createAuthError("Unknown auth type", "UNKNOWN_AUTH_TYPE")
          );
      }
    });
  }
  getAuthHeaders(e) {
    return r.sync(() => {
      const t = {
        "Content-Type": "application/json",
        "User-Agent": "Skelegit/1.0.0"
      };
      switch (e.type) {
        case "web3-wallet":
          t["X-Wallet-Address"] = e.walletAddress, e.signature && (t["X-Wallet-Signature"] = e.signature), e.nonce && (t["X-Nonce"] = e.nonce);
          break;
        case "aes-key":
          t["X-Key-ID"] = e.keyId;
          break;
        case "anonymous":
          break;
        default:
          throw this.createAuthError("Unknown auth type", "UNKNOWN_AUTH_TYPE");
      }
      return t;
    });
  }
  handleAuthChallenge(e, t) {
    var a;
    if (e.type === "signature" && t.type === "web3-wallet") {
      const s = (a = e.data) == null ? void 0 : a.message;
      return s ? r.flatMap(
        t.signMessage(s),
        (o) => {
          var l;
          return r.succeed({
            ...t,
            signature: o,
            nonce: (l = e.data) == null ? void 0 : l.nonce
          });
        }
      ) : r.fail(
        this.createAuthError(
          "No message to sign",
          "MISSING_SIGNATURE_MESSAGE"
        )
      );
    }
    return r.fail(
      this.createAuthError(
        `Unsupported challenge type: ${e.type}`,
        "UNSUPPORTED_CHALLENGE"
      )
    );
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  signMessage(e, t) {
    return r.tryPromise({
      try: async () => {
        throw new Error("Wallet signing not implemented");
      },
      catch: (a) => this.createAuthError("Message signing failed", "SIGNING_ERROR", a)
    });
  }
  getWalletAddress(e) {
    return r.tryPromise({
      try: async () => this.getStringValue(e, "walletAddress"),
      catch: (t) => this.createAuthError(
        "Address retrieval failed",
        "ADDRESS_ERROR",
        t
      )
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  encryptData(e, t) {
    return r.tryPromise({
      try: async () => {
        throw new Error("AES encryption not implemented");
      },
      catch: (a) => this.createAuthError("Encryption failed", "ENCRYPTION_ERROR", a)
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  decryptData(e, t) {
    return r.tryPromise({
      try: async () => {
        throw new Error("AES decryption not implemented");
      },
      catch: (a) => this.createAuthError("Decryption failed", "DECRYPTION_ERROR", a)
    });
  }
  validateArweaveWallet(e) {
    return r.tryPromise({
      try: async () => {
        const t = e.walletAddress;
        return !!/^[a-zA-Z0-9_-]{43}$/.test(t);
      },
      catch: (t) => this.createAuthError(
        "Wallet validation failed",
        "VALIDATION_ERROR",
        t
      )
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validateArweaveKey(e) {
    return r.tryPromise({
      try: async () => !0,
      catch: (t) => this.createAuthError(
        "Key validation failed",
        "VALIDATION_ERROR",
        t
      )
    });
  }
}
class c {
  constructor() {
    this.providers = /* @__PURE__ */ new Map(), this.credentials = /* @__PURE__ */ new Map();
  }
  /**
   * Register an authentication provider
   */
  registerProvider(e) {
    return r.sync(() => {
      this.providers.set(e.providerType, e);
    });
  }
  /**
   * Get registered provider by type
   */
  getProvider(e) {
    return r.sync(() => {
      const t = this.providers.get(e);
      if (!t)
        throw new n(
          `Provider not found: ${e}`,
          "PROVIDER_NOT_FOUND"
        );
      return t;
    });
  }
  /**
   * Create and store credentials
   */
  createCredentials(e, t, a) {
    return r.flatMap(
      this.getProvider(e),
      (s) => r.flatMap(
        s.createCredentials(t),
        (o) => r.flatMap(s.validateCredentials(o), (l) => {
          if (!l)
            return r.fail(
              new n("Invalid credentials", "INVALID_CREDENTIALS")
            );
          const h = a || this.generateCredentialId(e);
          return this.credentials.set(h, o), r.succeed(h);
        })
      )
    );
  }
  /**
   * Get stored credentials
   */
  getCredentials(e) {
    return r.sync(() => {
      const t = this.credentials.get(e);
      if (!t)
        throw new n(
          `Credentials not found: ${e}`,
          "CREDENTIALS_NOT_FOUND"
        );
      return t;
    });
  }
  /**
   * Create authentication context
   */
  createAuthContext(e, t) {
    return r.flatMap(
      this.getCredentials(e),
      (a) => r.flatMap(
        this.getProvider(a.providerId),
        (s) => r.succeed({
          credentials: a,
          provider: s,
          metadata: t
        })
      )
    );
  }
  /**
   * Get authentication headers for API calls
   */
  getAuthHeaders(e) {
    return r.flatMap(
      this.getCredentials(e),
      (t) => r.flatMap(
        this.getProvider(t.providerId),
        (a) => a.getAuthHeaders(t)
      )
    );
  }
  /**
   * Refresh credentials if supported
   */
  refreshCredentials(e) {
    return r.flatMap(
      this.getCredentials(e),
      (t) => r.flatMap(this.getProvider(t.providerId), (a) => a.refreshCredentials ? r.flatMap(
        a.refreshCredentials(t),
        (s) => r.sync(() => {
          this.credentials.set(e, s);
        })
      ) : r.fail(
        new n("Refresh not supported", "REFRESH_NOT_SUPPORTED")
      ))
    );
  }
  /**
   * Validate stored credentials
   */
  validateCredentials(e) {
    return r.flatMap(
      this.getCredentials(e),
      (t) => r.flatMap(
        this.getProvider(t.providerId),
        (a) => a.validateCredentials(t)
      )
    );
  }
  /**
   * Remove stored credentials
   */
  removeCredentials(e) {
    return r.sync(() => this.credentials.delete(e));
  }
  /**
   * List all registered providers
   */
  listProviders() {
    return r.sync(() => Array.from(this.providers.keys()));
  }
  /**
   * List all stored credentials (with masked sensitive data)
   */
  listCredentials() {
    return r.sync(() => Array.from(this.credentials.entries()).map(
      ([e, t]) => ({
        id: e,
        data: t.serialize()
      })
    ));
  }
  /**
   * Get supported auth types for a provider
   */
  getSupportedAuthTypes(e) {
    return r.flatMap(
      this.getProvider(e),
      (t) => r.succeed(t.supportedAuthTypes)
    );
  }
  generateCredentialId(e) {
    const t = Date.now(), a = Math.random().toString(36).substring(2, 8);
    return `${e}-${t}-${a}`;
  }
}
class p {
  constructor(e) {
    this.plugins = /* @__PURE__ */ new Map(), this.authManager = e || new c();
  }
  registerPlugin(e) {
    return r.sync(() => {
      this.plugins.set(e.provider, e);
    });
  }
  getPlugin(e) {
    return r.sync(() => {
      const t = this.plugins.get(e);
      if (!t)
        throw new Error(`Plugin not found for provider: ${e}`);
      return t;
    });
  }
  createClient(e) {
    return r.flatMap(
      this.getPlugin(e.provider),
      (t) => t.createClient(e, this.authManager)
    );
  }
  getAuthManager() {
    return this.authManager;
  }
  listPlugins() {
    return r.sync(() => Array.from(this.plugins.values()));
  }
}
const y = new p();
function v(i) {
  return y.createClient(i);
}
class w {
  constructor() {
    this.clients = /* @__PURE__ */ new Map();
  }
  addClient(e, t) {
    return r.sync(() => {
      this.clients.set(e, t);
    });
  }
  getClient(e) {
    return r.sync(() => {
      const t = this.clients.get(e);
      if (!t)
        throw new Error(`Client not found: ${e}`);
      return t;
    });
  }
  removeClient(e) {
    return r.sync(() => this.clients.delete(e));
  }
  listClients() {
    return r.sync(() => Array.from(this.clients.keys()));
  }
}
class A {
  constructor(e) {
    this.config = e;
  }
  getConfig() {
    return r.succeed(this.config);
  }
  getClientConfig(e) {
    return r.sync(() => {
      const t = this.config.clients[e];
      if (!t)
        throw new Error(`Client configuration not found: ${e}`);
      return t;
    });
  }
  getDefaultClientConfig() {
    return r.sync(() => {
      if (!this.config.defaultClient)
        throw new Error("No default client configured");
      return this.getClientConfig(this.config.defaultClient);
    }).pipe(r.flatten);
  }
  updateConfig(e) {
    return r.sync(() => {
      this.config = { ...this.config, ...e };
    });
  }
}
function T(i) {
  return new A(i);
}
export {
  f as ArweaveAuthProvider,
  n as AuthError,
  c as AuthManager,
  d as BaseAuthProvider,
  A as ConfigManager,
  u as CredentialFactory,
  w as GitClientManager,
  E as GitHubAuthProvider,
  p as PluginSystem,
  T as createConfigManager,
  v as createGitClient,
  y as pluginSystem
};
