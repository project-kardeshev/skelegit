import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
      include: ['src/**/*'],
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'SkelegitPluginArweave',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'mjs' : 'js'}`,
    },
    rollupOptions: {
      external: ['@skelegit/core', 'effect', 'arweave'],
      output: {
        globals: {
          '@skelegit/core': 'SkelegitCore',
          effect: 'Effect',
          arweave: 'Arweave',
        },
      },
    },
  },
});
