import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'SkelegitCLI',
      formats: ['es'],
      fileName: () => `index.js`,
    },
    rollupOptions: {
      external: [
        'react', 
        'ink', 
        '@skelegit/core', 
        'effect', 
        'isomorphic-git', 
        'commander',
        'fs',
        'path',
        'process'
      ],
    },
  },
});
