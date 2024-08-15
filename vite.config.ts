import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import Pages from 'vite-plugin-pages';

export default defineConfig({
  plugins: [
    react(),
    Pages({
      dirs: 'src/pages', // Directory to scan for pages
      extensions: ['tsx'], // File extensions to consider as pages
      importMode: 'async', // Enable async import for lazy loading
    }),
  ],
  resolve: {
    alias: {
      '@': new URL('./src', import.meta.url).pathname,
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
  },
});