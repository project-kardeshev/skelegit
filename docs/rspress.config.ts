import { defineConfig } from 'rspress/config';

export default defineConfig({
  root: 'docs',
  title: 'Skelegit',
  description: 'A toolkit for building Git interfaces and backends',
  icon: '/favicon.ico',
  logo: {
    light: '/logo-light.png',
    dark: '/logo-dark.png',
  },
  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide/' },
      { text: 'API', link: '/api/' },
      { text: 'Examples', link: '/examples/' },
    ],
    sidebar: {
      '/guide/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Introduction', link: '/guide/' },
            { text: 'Installation', link: '/guide/installation' },
            { text: 'Quick Start', link: '/guide/quick-start' },
          ],
        },
        {
          text: 'Core Concepts',
          items: [
            { text: 'Plugin System', link: '/guide/plugin-system' },
            { text: 'Git Client', link: '/guide/git-client' },
            { text: 'Configuration', link: '/guide/configuration' },
          ],
        },
        {
          text: 'React Components',
          items: [
            { text: 'Overview', link: '/guide/react-overview' },
            { text: 'Provider', link: '/guide/react-provider' },
            { text: 'Components', link: '/guide/react-components' },
            { text: 'Hooks', link: '/guide/react-hooks' },
          ],
        },
      ],
      '/api/': [
        {
          text: 'Core API',
          items: [
            { text: 'GitClient', link: '/api/git-client' },
            { text: 'PluginSystem', link: '/api/plugin-system' },
            { text: 'Configuration', link: '/api/configuration' },
          ],
        },
        {
          text: 'React API',
          items: [
            { text: 'Components', link: '/api/react-components' },
            { text: 'Hooks', link: '/api/react-hooks' },
            { text: 'Provider', link: '/api/react-provider' },
          ],
        },
      ],
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/kardeshev/skelegit' },
    ],
  },
});
