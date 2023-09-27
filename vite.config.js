import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],
  optimizeDeps: {
    exclude: ['js-big-decimal'],
  },
  build: {
    ssr: 'src/entry-server.js', // Path to SSR entry point
    rollupOptions: {
      input: 'src/entry-server.js', // should point to a JS or TS file
    },
  },
});
