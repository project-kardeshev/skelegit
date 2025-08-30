import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@skelegit/core': resolve(__dirname, '../../packages/core/src'),
      '@skelegit/react': resolve(__dirname, '../../packages/react/src'),
    },
  },
  build: {
    outDir: 'dist',
  },
  server: {
    port: 3000,
  },
});
