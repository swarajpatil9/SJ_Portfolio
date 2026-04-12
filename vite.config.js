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
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('react-pdf') || id.includes('pdfjs-dist')) return 'pdf';
              if (id.includes('gsap')) return 'animations';
              if (
                id.includes('/react/') ||
                id.includes('/react-dom/') ||
                id.includes('/scheduler/')
              )
                return 'react';
              return 'vendor';
            }
            if (id.includes('/src/windows/')) return 'windows';
          },
        },
      },
    },
    resolve: {
      alias: {
        '#components': resolve(dirname(fileURLToPath(import.meta.url)), 'src/components'),
        '#constants': resolve(dirname(fileURLToPath(import.meta.url)), 'src/constants'),
        '#store': resolve(dirname(fileURLToPath(import.meta.url)), 'src/store'),
        '#hoc': resolve(dirname(fileURLToPath(import.meta.url)), 'src/hoc'),
        '#windows': resolve(dirname(fileURLToPath(import.meta.url)), 'src/windows'),
      },
    },
  };
});
