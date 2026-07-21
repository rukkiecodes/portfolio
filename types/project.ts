// Shape of a project as returned by the rukkiecodes-api (camelCase). Image and
// video fields are absolute Cloudinary URLs.

export interface ProjectLink {
  label: string
  url: string
}

export interface Project {
  slug: string
  status: 'live' | 'coming-soon'
  eyebrow: string
  title: string
  tagline: string
  summary: string
  /** full description as markdown */
  body: string
  images: string[]
  gallery: string[]
  galleryLayout: 'phone' | 'wide'
  video?: string
  imageAlt: string
  links: ProjectLink[]
}

export interface SiteAsset {
  url: string
  alt: string
}

/** /api/site-assets returns a { key: SiteAsset } map. */
export type SiteAssets = Record<string, SiteAsset>
