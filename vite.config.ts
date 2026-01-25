import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: false,
    }),
    react(),
    tailwindcss(),
  ],
  base: '/ecommerce-market/',
  build: {
    emptyOutDir: true,
    outDir: 'dist',
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  },
});
