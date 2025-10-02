/**
 * Nuxt configuration for the Tic Tac Toe frontend using Ocean Professional theme.
 */
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  app: {
    head: {
      title: 'Tic Tac Toe — Ocean Professional',
      meta: [
        { name: 'description', content: 'Two-player local Tic Tac Toe built with Nuxt and styled with a modern Ocean Professional theme.' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#2563EB' },
      ],
      htmlAttrs: { lang: 'en' },
      bodyAttrs: { class: 'bg-[#f9fafb]' },
    },
  },
  nitro: {
    routeRules: {
      "/**": {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      },
    },
  },
  vite: {
    server: {
      host: '0.0.0.0',
      allowedHosts: true,
      port: 3000,
    },
  },
});
