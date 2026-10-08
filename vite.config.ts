/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  // Served from GitHub Pages at https://<user>.github.io/btl-questioner/ (SPEC §7).
  base: '/btl-questioner/',
  plugins: [
    react(),
    tailwindcss(),
    // Precaches the whole app (incl. fonts and images) so the iPads can run with no network.
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon.svg', 'apple-touch-icon.png'],
      manifest: {
        name: 'Рієлторський тест',
        short_name: 'Тест',
        lang: 'uk',
        display: 'fullscreen',
        background_color: '#EEECE4',
        theme_color: '#EEECE4',
        icons: [
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icon.svg', sizes: 'any', type: 'image/svg+xml' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ttf}'],
      },
    }),
  ],
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
})
