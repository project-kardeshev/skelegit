# Project Outline

The name of this project is skelegit.

The purpose of this project is to provide developer tooling for building
git interfaces and backends. The intent for the interface side is to have
a similar availability of connecting to git repositories and ecosystems
in the way documentation websites provide a simple interface for browsing,
reading, and uploading documentation.

The framework and runtime are designed along the same style of vite builders.
There is a plugin system for configuring the GitClient provided by the core sdk,
so that we can connect to multiple git ecosystems (github, gitlab, self hosted, etc)

The core sdk provides the interfaces and resolution for the plugin system to
configure the GitClient along with skelegit configs.

The react sdk provides components for apps to integrate with portions of the
interfaces provided by the plugins. For example, navigating thru repos, viewing
PRs, calling actions, viewing status, viewing files, etc...

The CLI is multifaceted. Its a git cli in that it interacts with isomorphic-git
providing an interface to interact with those methods. But it also provides an
interface for initializing skelegit projects and configs, deploying projects, and
building and testing projects.

The plugins allow for people to create the interface that skelegit will use to
connect to their git backend. This allows customization of the build, asset resolution,
publishing, and testing.

The docs are the knowledge base for all skelegit tools.

# Project Structure

This is an nx monorepo that has various projects.

Projects:
- apps
    - skelegit-framework
    - skelegit-app
- packages
    - core
    - react
    - plugins
        - skelegit-plugin-octokit
        - skelegit-plugin-arweave
- cli (built with Ink)
- docs (rspress)

# Tech stacks

## apps/skelegit-framework

- typescript
- pnpm
- prettier
- eslint
- react
- vite
- vitest
- playwright
- shadcn
- tailwindcss (v4)
- react

## apps/skelegit-app

- typescript
- pnpm
- prettier
- eslint
- react
- vite
- vitest
- playwright
- shadcn
- tailwindcss (v4)
- react

## packages/core

- typescript
- effect
- pnpm
- prettier
- eslint
- vite
- vitest

## packages/react

- typescript
- effect
- pnpm
- prettier
- eslint
- vite
- vitest
- react
- storybook

## cli
- typescript
- effect
- pnpm
- prettier
- eslint
- vite
- vitest
- ink (tui)
- react (ink uses react)
- isomorphic-git

## docs

- typescript
- pnpm
- prettier
- eslint
- vite
- vitest
- rspress