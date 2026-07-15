// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: true },

  // FusionUI ships a prebuilt stylesheet; the plugin in plugins/ installs the
  // components and the theme. app.css holds the site's shared section styles.
  css: ['@rukkiecodes/vue/styles', '~/assets/css/app.css'],

  modules: ['@pinia/nuxt'],

  app: {
    head: {
      title: 'rukkiecodes — Senior software developer',
      // Permanently dark: stamp the theme class on <html> from the first byte so
      // there is no light flash before the plugin hydrates.
      htmlAttrs: { lang: 'en', class: 'fui-theme--dark' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Terry Amagboro (rukkiecodes) — senior software developer, 10+ years. AI-powered products, cross-platform mobile (React Native / Expo), full-stack web, browser extensions and dev tools.',
        },
        { property: 'og:title', content: 'rukkiecodes — Senior software developer' },
        {
          property: 'og:description',
          content:
            'AI-powered products, cross-platform mobile, full-stack web, and dev tools. 10+ years shipping.',
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:image', content: '/portrait.png' },
      ],
      link: [
        { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap',
        },
      ],
    },
  },
})
