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
    plugins: [
      react({
        include: /src\/.*\.(jsx?|mjs)$/,
      }),
      VitePWA({
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
          // Per-disease data chunks are lazy-loaded on demand, so they must
          // NOT be precached — that blew the initial cache to 5 MB. Keep only
          // the app shell + entry chunks in the precache; disease data is
          // fetched (and runtime-cached) when the user opens a disease.
          globIgnores: ['**/*Data-*.js', '**/sectionData-*.js', '**/drugReferenceData-*.js', '**/extraDrugReferenceData-*.js'],
          maximumFileSizeToCacheInBytes: 2 * 1024 * 1024,
          runtimeCaching: [
            {
              // Cache lazily-loaded disease data chunks after first open so
              // revisits / offline work without bloating the initial precache.
              urlPattern: /\/assets\/.*Data-.*\.js$/i,
              handler: 'StaleWhileRevalidate',
              options: {
                cacheName: 'disease-data-cache',
                expiration: { maxEntries: 300, maxAgeSeconds: 60 * 60 * 24 * 30 },
                cacheableResponse: { statuses: [0, 200] },
              },
            },
            {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          }],
        },
      }),
    ],
    define: {
      'process.env': JSON.stringify(compatibleEnv),
    },
    build: {
      outDir: 'build',
      sourcemap: false,
      target: 'es2022',
      cssCodeSplit: true,
      cssMinify: true,
      minify: 'esbuild',
      chunkSizeWarningLimit: 500,
      reportCompressedSize: false,
      esbuild: {
        legalComments: 'none',
      },
      modulePreload: {
        polyfill: true,
      },
      rollupOptions: {
        output: {
          manualChunks(id) {
            const normalizedId = id.replace(/\\/g, '/');

            // React / scheduler → single vendor chunk (stable cache)
            if (id.includes('react') || id.includes('scheduler')) {
              return 'vendor-react';
            }

            // NOTE: do NOT force-aggregate the ~190 per-disease *Data.js files
            // into one chunk. They are loaded via dynamic import() in
            // src/data/lazyData.js, so Rollup produces one small chunk per
            // disease — exactly the per-file lazy loading that is intended.
            // Forcing them into a single 1.9 MB "data-urology" chunk defeated
            // the whole lazy-loading strategy (opening ANY disease pulled the
            // entire bundle).

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