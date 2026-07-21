// Gate for /studio pages: if there's no Supabase session, bounce to the login
// page. Runs client-side only (studio routes are `ssr: false`). The backend
// independently enforces that the session belongs to the admin, so this is just
// the UX gate — not the security boundary.
export default defineNuxtRouteMiddleware(async () => {
  if (import.meta.server) return

  const { getSession } = useStudioAuth()
  const session = await getSession()
  if (!session) {
    return navigateTo('/studio/login')
  }
})
