import type { Project, SiteAssets } from '~/types/project'

/**
 * All projects, ordered, from the backend. Resolved during SSR so the markup is
 * rendered server-side; the returned `data` ref defaults to [] before it loads.
 */
export function useProjectsList() {
  const config = useRuntimeConfig()
  return useFetch<Project[]>('/api/projects', {
    baseURL: config.public.apiBase,
    key: 'projects-list',
    default: () => [] as Project[],
  })
}

/** Site-level assets (hero portrait, partner logos) as a { key: { url, alt } } map. */
export function useSiteAssets() {
  const config = useRuntimeConfig()
  return useFetch<SiteAssets>('/api/site-assets', {
    baseURL: config.public.apiBase,
    key: 'site-assets',
    default: () => ({}) as SiteAssets,
  })
}
