// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@pinia/nuxt'],
  experimental: {
    payloadExtraction: false
  },
  routeRules: {
    '/dashboard': { prerender: true },
    '/**': { swr: true }
  },
  vite: {
    optimizeDeps: {
      include: ['chart.js']
    }
  }
})