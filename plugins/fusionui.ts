import { createFusionUI } from '@rukkiecodes/vue'
import { fusionSet, fusionAliases } from '@rukkiecodes/icons'

// The portfolio is permanently dark — no theme switching. Server and client both
// render dark, so there is no flash and no hydration mismatch.
export default defineNuxtPlugin(nuxtApp => {
  const fusionui = createFusionUI({
    theme: { defaultTheme: 'dark' },
    icons: {
      defaultSet: 'fusion',
      sets: { fusion: fusionSet },
      aliases: fusionAliases,
    },
  })

  nuxtApp.vueApp.use(fusionui)
})
