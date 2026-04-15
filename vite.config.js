import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => {
  const isAnalyzeMode = mode === 'analyze';

  return {
    plugins: [
      react(),
      tailwindcss(),
      isAnalyzeMode &&
        visualizer({
          filename: 'dist/bundle-analysis.html',
          open: false,
          gzipSize: true,
          brotliSize: true,
          template: 'treemap',
        }),
    ].filter(Boolean),
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: './src/test/setup.js',
      css: true,
    },
    resolve: {
      alias: {
        '#components': resolve(dirname(fileURLToPath(import.meta.url)), 'src/components'),
        '#config': resolve(dirname(fileURLToPath(import.meta.url)), 'src/config'),
        '#constants': resolve(dirname(fileURLToPath(import.meta.url)), 'src/constants'),
        '#store': resolve(dirname(fileURLToPath(import.meta.url)), 'src/store'),
        '#hoc': resolve(dirname(fileURLToPath(import.meta.url)), 'src/hoc'),
        '#windows': resolve(dirname(fileURLToPath(import.meta.url)), 'src/windows'),
      },
    },
  };
});
