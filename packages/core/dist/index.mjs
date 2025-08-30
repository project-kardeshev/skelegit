import { Effect as n } from "effect";
class i {
  constructor() {
    this.plugins = /* @__PURE__ */ new Map();
  }
  registerPlugin(t) {
    return n.sync(() => {
      this.plugins.set(t.provider, t);
    });
  }
  getPlugin(t) {
    return n.sync(() => {
      const e = this.plugins.get(t);
      if (!e)
        throw new Error(`Plugin not found for provider: ${t}`);
      return e;
    });
  }
  createClient(t) {
    return n.flatMap(
      this.getPlugin(t.provider),
      (e) => e.createClient(t)
    );
  }
  listPlugins() {
    return n.sync(() => Array.from(this.plugins.values()));
  }
}
const s = new i();
function l(r) {
  return s.createClient(r);
}
class u {
  constructor() {
    this.clients = /* @__PURE__ */ new Map();
  }
  addClient(t, e) {
    return n.sync(() => {
      this.clients.set(t, e);
    });
  }
  getClient(t) {
    return n.sync(() => {
      const e = this.clients.get(t);
      if (!e)
        throw new Error(`Client not found: ${t}`);
      return e;
    });
  }
  removeClient(t) {
    return n.sync(() => this.clients.delete(t));
  }
  listClients() {
    return n.sync(() => Array.from(this.clients.keys()));
  }
}
class o {
  constructor(t) {
    this.config = t;
  }
  getConfig() {
    return n.succeed(this.config);
  }
  getClientConfig(t) {
    return n.sync(() => {
      const e = this.config.clients[t];
      if (!e)
        throw new Error(`Client configuration not found: ${t}`);
      return e;
    });
  }
  getDefaultClientConfig() {
    return n.sync(() => {
      if (!this.config.defaultClient)
        throw new Error("No default client configured");
      return this.getClientConfig(this.config.defaultClient);
    }).pipe(n.flatten);
  }
  updateConfig(t) {
    return n.sync(() => {
      this.config = { ...this.config, ...t };
    });
  }
}
function g(r) {
  return new o(r);
}
export {
  o as ConfigManager,
  u as GitClientManager,
  i as PluginSystem,
  g as createConfigManager,
  l as createGitClient,
  s as pluginSystem
};
