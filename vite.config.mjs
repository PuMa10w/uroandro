import { readFileSync } from 'node:fs';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

const packageJson = JSON.parse(
  readFileSync(new URL('./package.json', import.meta.url), 'utf8')
);

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const reactAppEnv = Object.fromEntries(
    Object.entries(env).filter(([key]) => key.startsWith('REACT_APP_'))
  );

  const compatibleEnv = {
    ...reactAppEnv,
    NODE_ENV: mode,
    npm_package_version: packageJson.version,
  };

  return {
    plugins: [react({
      include: /src\/.*\.(jsx?|mjs)$/,
      babel: {
        plugins: [],
      },
    }), VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
      manifest: {
        name: 'UroMed — Клинический справочник уролога',
        short_name: 'UroMed',
        description: 'Клинический справочник по урологии и андрологии для медицинских специалистов',
        theme_color: '#0057b8',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        icons: [
          { src: '/pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: '/pwa-512x512.png', sizes: '512x512', type: 'image/png' },
          { src: '/pwa-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        runtimeCaching: [{
          urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'google-fonts-cache',
            expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
            cacheableResponse: { statuses: [0, 200] },
          },
        }],
      },
    })],
    oxc: {
      include: /\.(jsx?|mjs)$/,
      jsx: {
        runtime: 'automatic',
      },
    },
    esbuild: {
      loader: 'jsx',
      include: /src\/.*\.jsx?$/,
      exclude: [],
    },
    define: {
      'process.env': JSON.stringify(compatibleEnv),
    },
    build: {
      outDir: 'build',
      sourcemap: false,
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks(id) {
            const normalizedId = id.replace(/\\/g, '/');

            if (
              normalizedId.endsWith('/drugReferenceData.js')
            ) {
              return 'drug-data-core';
            }

            if (
              normalizedId.endsWith('/extraDrugReferenceData.js')
            ) {
              return 'drug-data-extra';
            }

            if (
              normalizedId.endsWith('/v15DrugExpansionData.js')
            ) {
              return 'drug-data-v15';
            }

            if (
              normalizedId.includes('/src/data/')
              && /Data\.js$/.test(normalizedId)
              && !normalizedId.endsWith('/sectionData.js')
              && !normalizedId.endsWith('/clinicalAtlasData.js')
            ) {
              const filename = normalizedId.split('/').pop() || '';
              const prefix = filename
                .slice(0, 5)
                .toLowerCase()
                .replace(/[^a-z0-9]/g, 'x');

              return `disease-data-${prefix}`;
            }

            if (!id.includes('node_modules')) {
              return undefined;
            }

            if (id.includes('react') || id.includes('scheduler')) {
              return 'vendor-react';
            }

            if (id.includes('framer-motion')) {
              return 'vendor-motion';
            }

            if (
              id.includes('bootstrap')
              || id.includes('react-bootstrap')
            ) {
              return 'vendor-ui';
            }

            if (id.includes('@sentry/browser')) {
              return 'vendor-sentry';
            }

            return undefined;
          },
        },
      },
    },
    server: {
      port: 3000,
    },
    preview: {
      port: 4173,
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./src/setupTests.js'],
      css: true,
      exclude: ['node_modules/**', 'tests/**'],
    },
  };
});
