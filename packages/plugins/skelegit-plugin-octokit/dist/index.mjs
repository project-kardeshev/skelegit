import { Effect as o } from "effect";
import { Octokit as f } from "@octokit/rest";
import { GitHubAuthProvider as _ } from "@skelegit/core";
function b(u, a) {
  return o.tryPromise({
    try: async () => {
      var s, n;
      if (!a)
        return new f({
          auth: ((s = u.auth) == null ? void 0 : s.token) || ((n = u.auth) == null ? void 0 : n.password),
          baseUrl: u.baseUrl,
          ...u.options
        });
      const i = new _();
      await o.runPromise(a.registerProvider(i));
      let r = {};
      if (u.authCredentialId)
        r = await o.runPromise(
          a.getAuthHeaders(u.authCredentialId)
        );
      else if (u.auth) {
        const l = await o.runPromise(
          a.createCredentials("github", u.auth)
        );
        r = await o.runPromise(
          a.getAuthHeaders(l)
        );
      }
      const t = r.Authorization;
      let e;
      return t && (t.startsWith("token ") ? e = t.substring(6) : t.startsWith("Bearer ") ? e = t.substring(7) : t.startsWith("Basic ") && (e = t)), new f({
        auth: e,
        baseUrl: u.baseUrl || "https://api.github.com",
        ...u.options
      });
    },
    catch: (i) => new Error(`Failed to create authenticated Octokit: ${i}`)
  });
}
class g {
  constructor(a) {
    this.octokit = a;
  }
  static create(a, i) {
    return o.map(
      b(a, i),
      (r) => new g(r)
    );
  }
  getRepository(a, i) {
    return o.tryPromise({
      try: async () => {
        const { data: r } = await this.octokit.rest.repos.get({
          owner: a,
          repo: i
        });
        return {
          id: r.id.toString(),
          name: r.name,
          fullName: r.full_name,
          description: r.description || void 0,
          defaultBranch: r.default_branch,
          isPrivate: r.private,
          url: r.html_url,
          cloneUrl: r.clone_url,
          createdAt: new Date(r.created_at),
          updatedAt: new Date(r.updated_at)
        };
      },
      catch: (r) => new Error(`Failed to get repository: ${r}`)
    });
  }
  listRepositories(a) {
    return o.tryPromise({
      try: async () => {
        const { data: i } = a ? await this.octokit.rest.repos.listForUser({ username: a }) : await this.octokit.rest.repos.listForAuthenticatedUser();
        return i.map((r) => ({
          id: r.id.toString(),
          name: r.name,
          fullName: r.full_name,
          description: r.description || void 0,
          defaultBranch: r.default_branch || "main",
          isPrivate: r.private,
          url: r.html_url,
          cloneUrl: r.clone_url || "",
          createdAt: new Date(r.created_at || ""),
          updatedAt: new Date(r.updated_at || "")
        }));
      },
      catch: (i) => new Error(`Failed to list repositories: ${i}`)
    });
  }
  getPullRequest(a, i, r) {
    return o.tryPromise({
      try: async () => {
        var e, s, n, l, d;
        const { data: t } = await this.octokit.rest.pulls.get({
          owner: a,
          repo: i,
          pull_number: r
        });
        return {
          id: t.id.toString(),
          number: t.number,
          title: t.title,
          description: t.body || void 0,
          state: t.state,
          sourceBranch: t.head.ref,
          targetBranch: t.base.ref,
          author: {
            id: ((e = t.user) == null ? void 0 : e.id.toString()) || "",
            username: ((s = t.user) == null ? void 0 : s.login) || "",
            displayName: ((n = t.user) == null ? void 0 : n.name) || void 0,
            email: ((l = t.user) == null ? void 0 : l.email) || void 0,
            avatarUrl: ((d = t.user) == null ? void 0 : d.avatar_url) || void 0
          },
          createdAt: new Date(t.created_at),
          updatedAt: new Date(t.updated_at),
          url: t.html_url
        };
      },
      catch: (t) => new Error(`Failed to get pull request: ${t}`)
    });
  }
  listPullRequests(a, i, r = "open") {
    return o.tryPromise({
      try: async () => {
        const { data: t } = await this.octokit.rest.pulls.list({
          owner: a,
          repo: i,
          state: r
        });
        return t.map((e) => {
          var s, n, l, d, c;
          return {
            id: e.id.toString(),
            number: e.number,
            title: e.title,
            description: e.body || void 0,
            state: e.state,
            sourceBranch: e.head.ref,
            targetBranch: e.base.ref,
            author: {
              id: ((s = e.user) == null ? void 0 : s.id.toString()) || "",
              username: ((n = e.user) == null ? void 0 : n.login) || "",
              displayName: ((l = e.user) == null ? void 0 : l.name) || void 0,
              email: ((d = e.user) == null ? void 0 : d.email) || void 0,
              avatarUrl: ((c = e.user) == null ? void 0 : c.avatar_url) || void 0
            },
            createdAt: new Date(e.created_at),
            updatedAt: new Date(e.updated_at),
            url: e.html_url
          };
        });
      },
      catch: (t) => new Error(`Failed to list pull requests: ${t}`)
    });
  }
  getFile(a, i, r, t) {
    return o.tryPromise({
      try: async () => {
        const { data: e } = await this.octokit.rest.repos.getContent({
          owner: a,
          repo: i,
          path: r,
          ref: t
        });
        if (Array.isArray(e))
          throw new Error("Path is a directory, not a file");
        if (e.type !== "file")
          throw new Error("Path is not a file");
        return {
          path: e.path,
          name: e.name,
          type: "file",
          size: e.size,
          content: e.content ? globalThis.Buffer.from(e.content, "base64").toString() : void 0,
          sha: e.sha
        };
      },
      catch: (e) => new Error(`Failed to get file: ${e}`)
    });
  }
  listFiles(a, i, r = "", t) {
    return o.tryPromise({
      try: async () => {
        const { data: e } = await this.octokit.rest.repos.getContent({
          owner: a,
          repo: i,
          path: r,
          ref: t
        });
        return Array.isArray(e) ? e.map((s) => ({
          path: s.path,
          name: s.name,
          type: s.type === "dir" ? "directory" : "file",
          size: s.size,
          sha: s.sha
        })) : [e].map((s) => ({
          path: s.path,
          name: s.name,
          type: s.type === "dir" ? "directory" : "file",
          size: s.size,
          sha: s.sha
        }));
      },
      catch: (e) => new Error(`Failed to list files: ${e}`)
    });
  }
  getBranch(a, i, r) {
    return o.tryPromise({
      try: async () => {
        const { data: t } = await this.octokit.rest.repos.getBranch({
          owner: a,
          repo: i,
          branch: r
        });
        return {
          name: t.name,
          sha: t.commit.sha,
          isDefault: !1,
          // TODO: Get from repository info
          isProtected: t.protected
        };
      },
      catch: (t) => new Error(`Failed to get branch: ${t}`)
    });
  }
  listBranches(a, i) {
    return o.tryPromise({
      try: async () => {
        const { data: r } = await this.octokit.rest.repos.listBranches({
          owner: a,
          repo: i
        });
        return r.map((t) => ({
          name: t.name,
          sha: t.commit.sha,
          isDefault: !1,
          // TODO: Get from repository info
          isProtected: t.protected
        }));
      },
      catch: (r) => new Error(`Failed to list branches: ${r}`)
    });
  }
  getCommit(a, i, r) {
    return o.tryPromise({
      try: async () => {
        var e, s, n, l, d, c, m, h, y, p, w;
        const { data: t } = await this.octokit.rest.repos.getCommit({
          owner: a,
          repo: i,
          ref: r
        });
        return {
          sha: t.sha,
          message: t.commit.message,
          author: {
            id: ((e = t.author) == null ? void 0 : e.id.toString()) || "",
            username: ((s = t.author) == null ? void 0 : s.login) || "",
            displayName: ((n = t.commit.author) == null ? void 0 : n.name) || void 0,
            email: ((l = t.commit.author) == null ? void 0 : l.email) || void 0,
            avatarUrl: ((d = t.author) == null ? void 0 : d.avatar_url) || void 0
          },
          committer: {
            id: ((c = t.committer) == null ? void 0 : c.id.toString()) || "",
            username: ((m = t.committer) == null ? void 0 : m.login) || "",
            displayName: ((h = t.commit.committer) == null ? void 0 : h.name) || void 0,
            email: ((y = t.commit.committer) == null ? void 0 : y.email) || void 0,
            avatarUrl: ((p = t.committer) == null ? void 0 : p.avatar_url) || void 0
          },
          createdAt: new Date(((w = t.commit.author) == null ? void 0 : w.date) || ""),
          url: t.html_url,
          parents: t.parents.map((v) => v.sha)
        };
      },
      catch: (t) => new Error(`Failed to get commit: ${t}`)
    });
  }
  listCommits(a, i, r) {
    return o.tryPromise({
      try: async () => {
        const { data: t } = await this.octokit.rest.repos.listCommits({
          owner: a,
          repo: i,
          sha: r
        });
        return t.map((e) => {
          var s, n, l, d, c, m, h, y, p, w, v;
          return {
            sha: e.sha,
            message: e.commit.message,
            author: {
              id: ((s = e.author) == null ? void 0 : s.id.toString()) || "",
              username: ((n = e.author) == null ? void 0 : n.login) || "",
              displayName: ((l = e.commit.author) == null ? void 0 : l.name) || void 0,
              email: ((d = e.commit.author) == null ? void 0 : d.email) || void 0,
              avatarUrl: ((c = e.author) == null ? void 0 : c.avatar_url) || void 0
            },
            committer: {
              id: ((m = e.committer) == null ? void 0 : m.id.toString()) || "",
              username: ((h = e.committer) == null ? void 0 : h.login) || "",
              displayName: ((y = e.commit.committer) == null ? void 0 : y.name) || void 0,
              email: ((p = e.commit.committer) == null ? void 0 : p.email) || void 0,
              avatarUrl: ((w = e.committer) == null ? void 0 : w.avatar_url) || void 0
            },
            createdAt: new Date(((v = e.commit.author) == null ? void 0 : v.date) || ""),
            url: e.html_url,
            parents: e.parents.map((P) => P.sha)
          };
        });
      },
      catch: (t) => new Error(`Failed to list commits: ${t}`)
    });
  }
}
const E = {
  name: "octokit",
  provider: "github",
  createClient: (u, a) => g.create(u, a)
};
export {
  g as OctokitClient,
  E as octokitPlugin
};
