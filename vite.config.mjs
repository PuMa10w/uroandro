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
      chunkSizeWarningLimit: 700,
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

            // React / scheduler → single vendor chunk
            if (id.includes('react') || id.includes('scheduler')) {
              return 'vendor-react';
            }

            // Aggregate ALL disease data files into a FEW chunks instead of
            // 190 tiny per-file chunks (waterfall on first section open).
            // Group by section folder/file-prefix so each section stays
            // a single lazy-loadable chunk.
            if (
              normalizedId.includes('/src/data/') &&
              /Data\.js$/.test(normalizedId) &&
              !normalizedId.endsWith('/sectionData.js') &&
              !normalizedId.includes('drugReferenceData') &&
              !normalizedId.includes('extraDrugReferenceData')
            ) {
              const filename = (normalizedId.split('/').pop() || '').replace('.js', '').toLowerCase();
              // map a few known cross-cutting files; default = urology bucket
              let bucket = 'urology';
              if (/andr|erectile|fert|hypogon|peyron|sexual|endocrine/.test(filename)) bucket = 'andrology';
              else if (/pediatric|child|neonat/.test(filename)) bucket = 'pediatric';
              else if (/emerg|urgent|trauma|acute/.test(filename)) bucket = 'emergency';
              else if (/surgery|surgical|reconstruct|fistula/.test(filename)) bucket = 'surgery';
              else if (/metaphyl|diet|nutrition/.test(filename)) bucket = 'metaphylaxis';
              else if (/tool|questionnaire|score|index|scale/.test(filename)) bucket = 'tools';
              else if (/game|quiz|train/.test(filename)) bucket = 'games';
              return `data-${bucket}`;
            }

            if (
              normalizedId.includes('/src/data/') &&
              (normalizedId.includes('drugReferenceData') ||
                normalizedId.includes('extraDrugReferenceData'))
            ) {
              return 'data-drugs';
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