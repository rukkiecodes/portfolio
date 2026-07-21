import { createClient, type SupabaseClient, type Session } from '@supabase/supabase-js'

// Lazily-created, client-side-only Supabase client. It is only ever instantiated
// from inside /studio pages (which are `ssr: false`), so it never runs during
// public SSR and adds nothing to the public page bundle.
let _client: SupabaseClient | null = null

function client(): SupabaseClient {
  if (_client) return _client
  const { public: cfg } = useRuntimeConfig()
  _client = createClient(cfg.supabaseUrl, cfg.supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: false,
      storageKey: 'rk-studio-auth',
    },
  })
  return _client
}

export function useStudioAuth() {
  const supabase = client()
  const { public: cfg } = useRuntimeConfig()

  const getSession = async (): Promise<Session | null> =>
    (await supabase.auth.getSession()).data.session

  return {
    supabase,

    getSession,

    async signIn(email: string, password: string) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      return data.session
    },

    async signOut() {
      await supabase.auth.signOut()
    },

    /** Call the backend admin API with the current access token attached. */
    async apiFetch<T>(path: string, opts: Record<string, unknown> = {}): Promise<T> {
      const session = await getSession()
      return $fetch<T>(path, {
        baseURL: cfg.apiBase,
        ...opts,
        headers: {
          ...((opts.headers as Record<string, string>) || {}),
          ...(session ? { Authorization: `Bearer ${session.access_token}` } : {}),
        },
      })
    },
  }
}
