# Introduction

Skelegit is a comprehensive toolkit for building Git interfaces and backends. It provides a plugin-based architecture that allows you to connect to multiple Git ecosystems including GitHub, GitLab, and self-hosted solutions.

## What is Skelegit?

Skelegit consists of several key components:

1. **Core SDK** - Provides the foundational interfaces and plugin system
2. **React SDK** - Pre-built components for building Git interfaces
3. **CLI Tools** - Command-line interface for project management
4. **Plugins** - Connectors for different Git providers

## Key Features

### Plugin Architecture
Connect to any Git provider through a standardized plugin interface. Skelegit comes with built-in plugins for popular providers and makes it easy to create custom plugins.

### React Components
Build beautiful Git interfaces quickly with pre-built React components for:
- Repository browsing
- Pull request management
- File tree navigation
- Branch switching
- Commit history

### Modern Stack
Built with modern technologies:
- TypeScript for type safety
- Effect for functional programming
- React 18 for UI components
- Vite for fast development
- Tailwind CSS for styling

## Getting Started

The easiest way to get started is with the CLI:

```bash
npm install -g @skelegit/cli
skelegit init my-project
```

This will create a new project with all the necessary dependencies and configuration files.
