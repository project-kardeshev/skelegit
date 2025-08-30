# Skelegit

A comprehensive toolkit for building Git interfaces and backends with a plugin-based architecture.

<img width="1024" height="1024" alt="image" src="https://github.com/user-attachments/assets/6c217753-3c81-449d-b38b-50915e0d9a46" />

## Features

- 🔌 **Plugin System** - Connect to multiple Git ecosystems (GitHub, GitLab, self-hosted)
- ⚛️ **React Components** - Pre-built components for Git interfaces
- 🖥️ **CLI Tools** - Command-line interface for project management
- 🎯 **TypeScript First** - Full TypeScript support with Effect for functional programming
- 🎨 **Modern UI** - Beautiful components with Tailwind CSS and shadcn/ui

## Quick Start

Install Skelegit CLI:

```bash
npm install -g @skelegit/cli
```

Create a new project:

```bash
skelegit init my-git-app
cd my-git-app
pnpm install
pnpm dev
```

## Project Structure

This is an NX monorepo with the following structure:

```
skelegit/
├── apps/
│   ├── skelegit-framework/    # Framework showcase app
│   └── skelegit-app/          # Example application
├── packages/
│   ├── core/                  # Core SDK with plugin system
│   ├── react/                 # React components and hooks
│   └── plugins/
│       ├── skelegit-plugin-octokit/   # GitHub integration
│       └── skelegit-plugin-arweave/   # Arweave integration
├── cli/                       # Command-line interface
└── docs/                      # Documentation site
```

## Development

Install dependencies:

```bash
pnpm install
```

Build all packages:

```bash
pnpm build
```

Start development:

```bash
pnpm dev
```

Run tests:

```bash
pnpm test
```

## Documentation

- [Getting Started](./docs/docs/guide/index.md)
- [API Reference](./docs/docs/api/)
- [Examples](./docs/docs/examples/)

## License

This project is released into the public domain. See [LICENSE](./LICENSE) for details.
