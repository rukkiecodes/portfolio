import healthtokBody from '~/content/healthtok.md?raw'
import clockeeBody from '~/content/clockee.md?raw'
import fusionuiBody from '~/content/fusionui.md?raw'
import quantlowBody from '~/content/quantlow.md?raw'
import clearcutBody from '~/content/clearcut.md?raw'
import docgrabBody from '~/content/docgrab.md?raw'
import queenskillaBody from '~/content/queenskilla.md?raw'
import recidoBody from '~/content/recido.md?raw'
import liquidglassBody from '~/content/liquidglass.md?raw'

export interface ProjectLink {
  label: string
  url: string
}

export interface Project {
  /** url slug — used for /work/:slug routing */
  slug: string
  /** 'live' = shipped & linkable, 'coming-soon' = in review / not yet public */
  status: 'live' | 'coming-soon'
  eyebrow: string
  title: string
  tagline: string
  /** short teaser shown on the gallery card + detail hero */
  summary: string
  /** full description (markdown) shown on the project detail page */
  body: string
  /** card cover image(s). On the detail page these become the hero carousel;
      images[0] is the card cover in the work grid. */
  images: string[]
  /** screens shown in the detail-page gallery (images or .mp4 videos) */
  gallery: string[]
  /** 'phone' = self-scrolling app strip, 'wide' = full-width desktop stack */
  galleryLayout: 'phone' | 'wide'
  /** optional demo video (.mp4), shown at the top of the write-up */
  video?: string
  /** scannable tech/category chips */
  tech: string[]
  imageAlt: string
  /** external links — first is the primary CTA, the rest are ghost buttons */
  links: ProjectLink[]
}

export const projects: Project[] = [
  {
    slug: 'healthtok',
    status: 'live',
    eyebrow: '01 — Telemedicine',
    title: 'HealthTok',
    tagline: 'Telemedicine, in your pocket',
    summary:
      'A mobile telemedicine app that connects patients with licensed doctors for instant and scheduled consultations — chat, voice, and video — with secure payments, digital prescriptions, and an AI health assistant, all in one place.',
    body: healthtokBody,
    images: ['/healthtok/healthtok-web-1.png', '/healthtok/healthtok-web-2.png'],
    video: '/healthtok/healthtok-demo.mp4',
    gallery: [
      '/healthtok/healthtok-app-1.jpg',
      '/healthtok/healthtok-app-2.jpg',
      '/healthtok/healthtok-app-3.jpg',
      '/healthtok/healthtok-app-4.jpg',
      '/healthtok/healthtok-app-5.jpg',
      '/healthtok/healthtok-app-6.jpg',
      '/healthtok/healthtok-app-7.jpg',
      '/healthtok/healthtok-app-8.jpg',
    ],
    galleryLayout: 'phone',
    tech: ['React Native', 'Expo', 'AI assistant', 'Payments'],
    imageAlt: 'HealthTok — telemedicine app',
    links: [
      { label: 'Visit healthtokclinic.com', url: 'https://www.healthtokclinic.com' },
      {
        label: 'Get it on Google Play',
        url: 'https://play.google.com/store/apps/details?id=com.rukkiecodes.healthTok',
      },
    ],
  },
  {
    slug: 'clockee',
    status: 'live',
    eyebrow: '02 — Workforce Accountability',
    title: 'Clockee',
    tagline: 'Verified attendance & workforce accountability',
    summary:
      'A mobile-first attendance platform that gives organisations a trustworthy answer to a deceptively simple question: was this person actually here, on time, where they were supposed to be?',
    body: clockeeBody,
    images: [
      '/clockee/clockee-web-landing.png',
      '/clockee/clockee-web-dashboard.png',
      '/clockee/clockee-web-signin.png',
    ],
    video: '/clockee/clockee-demo.mp4',
    gallery: [
      '/clockee/clockee-app-1.jpg',
      '/clockee/clockee-app-2.jpg',
      '/clockee/clockee-app-3.jpg',
      '/clockee/clockee-app-4.jpg',
      '/clockee/clockee-app-5.jpg',
    ],
    galleryLayout: 'phone',
    tech: ['React Native', 'Expo', 'GPS geofencing', 'Offline-first'],
    imageAlt: 'Clockee — GPS-based attendance tracking',
    links: [
      { label: 'Visit clockee.app', url: 'https://clockee.app' },
      {
        label: 'Get it on Google Play',
        url: 'https://play.google.com/store/apps/details?id=com.rukkiecodes2.clockee&pcampaignid=web_share',
      },
    ],
  },
  {
    slug: 'fusionui',
    status: 'live',
    eyebrow: '03 — Design System',
    title: 'FusionUI',
    tagline: 'A Vue 3 design system for shipping beautiful apps fast',
    summary:
      'An open-source UI toolkit for Vue 3 (with a React Native companion): 100+ accessible components, light & dark theming, a built-in 2,270-icon set, and signature liquid-glass effects — all from one cohesive design language, with a one-command project starter. This very site is built with it.',
    body: fusionuiBody,
    images: [
      '/fusionui/fusionui-docs-1.png',
      '/fusionui/fusionui-docs-2.png',
      '/fusionui/fusionui-docs-3.png',
      '/fusionui/fusionui-docs-4.png',
      '/fusionui/fusionui-docs-5.png',
      '/fusionui/fusionui-docs-6.png',
    ],
    gallery: [],
    galleryLayout: 'wide',
    tech: ['Vue 3', 'TypeScript', 'React Native', 'npm', 'Design system'],
    imageAlt: 'FusionUI documentation',
    links: [
      { label: 'View docs & demos', url: 'https://rukkiecodes.github.io/fusionui' },
      { label: 'GitHub', url: 'https://github.com/rukkiecodes/fusionui' },
    ],
  },
  {
    slug: 'quantlow',
    status: 'live',
    eyebrow: '04 — AI Trading Tool',
    title: 'Quantlow',
    tagline: 'Scan any chart. Instant BUY / SELL verdict.',
    summary:
      'An AI chart-analysis tool — web app plus Chrome extension — that turns any forex, crypto, stock, or index chart into a structured trade verdict: direction, entry, stop, target, confidence, and plain-English reasoning, in one click.',
    body: quantlowBody,
    images: [
      '/quantlow/quantlow-web-1.png',
      '/quantlow/quantlow-web-2.png',
      '/quantlow/quantlow-web-3.png',
      '/quantlow/quantlow-extension.png',
    ],
    gallery: [],
    galleryLayout: 'wide',
    tech: ['AI', 'Chrome extension', 'Web app', 'Telegram'],
    imageAlt: 'Quantlow — AI chart analysis',
    links: [
      { label: 'Visit quantlow.com', url: 'https://quantlow.com' },
      {
        label: 'Chrome extension',
        url: 'https://chromewebstore.google.com/detail/dccefjlpjheodfgafdffckfcagpibpjd?utm_source=item-share-cb',
      },
    ],
  },
  {
    slug: 'clearcut',
    status: 'live',
    eyebrow: '05 — Image Tools',
    title: 'ClearCut',
    tagline: 'Remove backgrounds, convert, resize & clean up images — in your browser.',
    summary:
      'A private, on-device image toolkit that runs entirely in your browser: remove backgrounds with AI, convert between PNG/JPEG/WebP/AVIF, resize to exact dimensions or a target file size, and erase watermarks — all 100% local, so your images never leave your device.',
    body: clearcutBody,
    images: [
      '/clearcut/clearcut-cover.png',
      '/clearcut/clearcut-1.png',
      '/clearcut/clearcut-2.png',
      '/clearcut/clearcut-3.png',
      '/clearcut/clearcut-4.png',
    ],
    gallery: [],
    galleryLayout: 'wide',
    tech: ['In-browser AI', 'On-device', 'Web app'],
    imageAlt: 'ClearCut image tool screen',
    links: [{ label: 'Try ClearCut', url: 'https://rukkiecodes.github.io/ClearCut/' }],
  },
  {
    slug: 'docgrab',
    status: 'live',
    eyebrow: '06 — Browser Extension',
    title: 'DocGrab',
    tagline: 'Save any documentation as clean Markdown or JSON you own.',
    summary:
      'A Chrome extension that turns the page you are reading — or an entire documentation site — into clean Markdown or JSON, saved straight into a folder you choose. It reads the already-rendered page, strips ads and pop-ups, and works offline with no servers.',
    body: docgrabBody,
    images: [
      '/docgrab/docgrab-1.png',
      '/docgrab/docgrab-2.png',
      '/docgrab/docgrab-3.png',
      '/docgrab/docgrab-4.png',
      '/docgrab/docgrab-5.png',
    ],
    gallery: [],
    galleryLayout: 'wide',
    tech: ['Chrome extension', 'Markdown', 'JSON', 'CLI tools'],
    imageAlt: 'DocGrab extension screen',
    links: [
      {
        label: 'Get DocGrab',
        url: 'https://chromewebstore.google.com/detail/iidihnjiickpcgmggnpejkbamkifdofc?utm_source=item-share-cb',
      },
    ],
  },
  {
    slug: 'queenskilla',
    status: 'live',
    eyebrow: '07 — Talent Marketplace',
    title: 'QueenSkilla',
    tagline: 'A trust-first talent marketplace for verified students',
    summary:
      'A trust-first talent marketplace connecting skill-tested students with businesses — escrow-protected payments, AI-graded skill certification, and dispute resolution built into every transaction. A federated microservices backend, a Nuxt web app, and an Expo mobile app on one GraphQL contract.',
    body: queenskillaBody,
    images: [
      '/queenskilla/queenskilla-web-1.png',
      '/queenskilla/queenskilla-web-2.png',
      '/queenskilla/queenskilla-web-3.png',
      '/queenskilla/queenskilla-web-4.png',
    ],
    gallery: [
      '/queenskilla/queenskilla-app-1.jpg',
      '/queenskilla/queenskilla-app-2.jpg',
      '/queenskilla/queenskilla-app-3.jpg',
      '/queenskilla/queenskilla-app-4.jpg',
      '/queenskilla/queenskilla-app-5.jpg',
      '/queenskilla/queenskilla-app-6.jpg',
      '/queenskilla/queenskilla-app-7.jpg',
      '/queenskilla/queenskilla-app-8.jpg',
      '/queenskilla/queenskilla-app-9.jpg',
      '/queenskilla/queenskilla-app-10.jpg',
    ],
    galleryLayout: 'phone',
    tech: ['Nuxt', 'Expo', 'GraphQL Federation', 'Supabase', 'Paystack', 'Gemini AI'],
    imageAlt: 'QueenSkilla — talent marketplace',
    links: [
      { label: 'Visit live site', url: 'https://queenskilla-web.vercel.app' },
      { label: 'Download the app', url: 'https://queenskilla-web.vercel.app/download' },
    ],
  },
  {
    slug: 'recido',
    status: 'live',
    eyebrow: '08 — Business Management',
    title: 'Recido',
    tagline: 'Run your whole business from your phone',
    summary:
      'A mobile-first business-management app that pulls invoices, quotes, receipts, customers, inventory, and staff into one calm, phone-shaped place — so owners can run the whole thing without a spreadsheet or a laptop. iOS and Android, offline-capable, in beta with 2,000+ businesses on the waitlist.',
    body: recidoBody,
    images: [
      '/recido/recido-web-1.png',
      '/recido/recido-web-2.png',
      '/recido/recido-web-3.png',
    ],
    video: undefined,
    gallery: [
      '/recido/recido-app-1.jpg',
      '/recido/recido-app-2.jpg',
      '/recido/recido-app-3.jpg',
      '/recido/recido-app-4.jpg',
      '/recido/recido-app-5.jpg',
      '/recido/recido-app-6.jpg',
      '/recido/recido-app-7.jpg',
      '/recido/recido-app-8.jpg',
      '/recido/recido-app-9.jpg',
      '/recido/recido-app-10.jpg',
      '/recido/recido-app-11.jpg',
      '/recido/recido-app-12.jpg',
    ],
    galleryLayout: 'phone',
    tech: ['React Native', 'Expo', 'Offline-first', 'iOS & Android'],
    imageAlt: 'Recido — business management app',
    links: [
      { label: 'Visit recido.app', url: 'https://recido.app' },
      { label: 'Join the waitlist', url: 'https://recido.app/#waitlist' },
    ],
  },
  {
    slug: 'liquidglass',
    status: 'live',
    eyebrow: '09 — Graphics Engine',
    title: 'Liquid Glass',
    tagline: 'A physically-based glass refraction engine',
    summary:
      'A dependency-free engine that renders glass with real optics — SDF geometry, reconstructed surface normals, and Snell\'s-law refraction — from one physics model with SVG (web) and Skia (native) backends. ~9 KB, with an interactive demo.',
    body: liquidglassBody,
    images: [
      '/liquidglass/liquidglass-1.png',
      '/liquidglass/liquidglass-2.png',
      '/liquidglass/liquidglass-3.png',
      '/liquidglass/liquidglass-4.png',
    ],
    gallery: [],
    galleryLayout: 'wide',
    tech: ['TypeScript', 'SVG filters', 'Skia SKSL', 'Vite', 'Graphics'],
    imageAlt: 'Liquid Glass — refraction engine demo',
    links: [
      { label: 'View the demo', url: 'https://rukkiecodes.github.io/liquid-glass/' },
      { label: 'GitHub', url: 'https://github.com/rukkiecodes/liquid-glass' },
    ],
  },
]

export function getProject(slug: string | undefined): Project | undefined {
  return projects.find(p => p.slug === slug)
}
