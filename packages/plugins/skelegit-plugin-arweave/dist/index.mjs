import { Effect as r } from "effect";
import n from "arweave";
class i {
  constructor(e) {
    this._arweave = n.init({
      host: e.baseUrl || "arweave.net",
      port: 443,
      protocol: "https",
      ...e.options
    });
  }
  getRepository(e, o) {
    return r.fail(new Error("Not implemented - Arweave plugin is a placeholder"));
  }
  listRepositories(e) {
    return r.fail(new Error("Not implemented - Arweave plugin is a placeholder"));
  }
  getPullRequest(e, o, t) {
    return r.fail(new Error("Not implemented - Arweave plugin is a placeholder"));
  }
  listPullRequests(e, o, t) {
    return r.fail(new Error("Not implemented - Arweave plugin is a placeholder"));
  }
  getFile(e, o, t, a) {
    return r.fail(new Error("Not implemented - Arweave plugin is a placeholder"));
  }
  listFiles(e, o, t, a) {
    return r.fail(new Error("Not implemented - Arweave plugin is a placeholder"));
  }
  getBranch(e, o, t) {
    return r.fail(new Error("Not implemented - Arweave plugin is a placeholder"));
  }
  listBranches(e, o) {
    return r.fail(new Error("Not implemented - Arweave plugin is a placeholder"));
  }
  getCommit(e, o, t) {
    return r.fail(new Error("Not implemented - Arweave plugin is a placeholder"));
  }
  listCommits(e, o, t) {
    return r.fail(new Error("Not implemented - Arweave plugin is a placeholder"));
  }
}
const s = {
  name: "arweave",
  provider: "arweave",
  createClient: (l) => r.succeed(new i(l))
};
export {
  i as ArweaveClient,
  s as arweavePlugin
};
