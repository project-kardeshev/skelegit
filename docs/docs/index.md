# Skelegit

A toolkit for building Git interfaces and backends with a plugin-based architecture.

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
npm run dev
```

## Architecture

Skelegit is designed as a modular toolkit with the following components:

- **Core SDK** - Plugin system and Git client interfaces
- **React SDK** - React components and hooks
- **CLI** - Project initialization and development tools
- **Plugins** - Connectors for different Git providers

## Examples

Check out our [examples](/examples/) to see Skelegit in action.

## Getting Help

- [Documentation](/guide/)
- [API Reference](/api/)
- [GitHub Issues](https://github.com/kardeshev/skelegit/issues)
