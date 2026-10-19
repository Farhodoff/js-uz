import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import { pwaGlobIgnores } from './src/config/pwaRuntimeCaching.js'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  test: {
    exclude: ['**/node_modules/**', '**/dist/**', 'e2e/**'],
    coverage: {
      provider: 'v8',
      all: true,
      reporter: ['text', 'html', 'lcov', 'json-summary'],
      include: [
        'src/utils/**/*.js',
        'src/store/**/*.js',
        'src/config/pwaOffline.js',
        'src/config/pwaPrecache.js',
        'src/config/monacoAmdProtection.js',
      ],
      exclude: ['**/*.test.js'],
      thresholds: {
        branches: 70,
        functions: 70,
        lines: 70,
        statements: 70,
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        chunkFileNames: (chunkInfo) => {
          if (chunkInfo.facadeModuleId && chunkInfo.facadeModuleId.includes('/src/data/lessons/')) {
            return 'assets/lessons/[name]-[hash].js';
          }
          return 'assets/[name]-[hash].js';
        },
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-monaco': ['@monaco-editor/react'],
          'vendor-mermaid': ['mermaid'],
          'vendor-markdown': ['react-markdown', 'remark-gfm', 'rehype-highlight', 'highlight.js'],
          'vendor-state': ['zustand'],
        },
      },
    },
  },
  plugins: [
    react(),
    VitePWA({
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.js',
      registerType: 'autoUpdate',
      injectManifest: {
        globPatterns: ['**/*.{js,css,html,svg,ico}'],
        globIgnores: pwaGlobIgnores,
        maximumFileSizeToCacheInBytes: 5000000,
      },
      manifest: {
        name: 'JS Academy Mastery',
        short_name: 'JSAcademy',
        description: 'JavaScript va zamonaviy texnologiyalarni o\'rganish platformasi',
        theme_color: '#534AB7',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'maskable-icon.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      }
    })
  ],
})
