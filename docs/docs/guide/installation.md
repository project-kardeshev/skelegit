# Installation

## Prerequisites

- Node.js 18 or higher
- pnpm (recommended) or npm

## CLI Installation

Install the Skelegit CLI globally:

```bash
npm install -g @skelegit/cli
```

Or with pnpm:

```bash
pnpm add -g @skelegit/cli
```

## Package Installation

If you want to use Skelegit in an existing project:

```bash
npm install @skelegit/core @skelegit/react
```

For specific plugins:

```bash
npm install @skelegit/plugin-octokit @skelegit/plugin-arweave
```

## Development Setup

To contribute to Skelegit or run it locally:

1. Clone the repository:
```bash
git clone https://github.com/kardeshev/skelegit.git
cd skelegit
```

2. Install dependencies:
```bash
pnpm install
```

3. Build all packages:
```bash
pnpm build
```

4. Run tests:
```bash
pnpm test
```

## Verification

Verify your installation:

```bash
skelegit --version
```

You should see the version number printed to the console.
