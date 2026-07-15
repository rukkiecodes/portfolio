// Profile, contact, and the section datasets for the home page. One place to
// edit the copy without touching component markup.

export const profile = {
  name: 'rukkiecodes',
  fullName: 'Terry Amagboro',
  role: 'Senior software developer',
  years: '10+ years',
  // A credibility signal, not an availability one — this is a showcase, not a job hunt.
  tagline: 'Trusted by private & government clients',
  intro:
    'I build AI-powered products, cross-platform mobile apps (React Native / Expo), and full-stack web on React, Next.js, Node and Firebase — plus browser extensions and dev tools. Senior-level delivery: clean design, dependable shipping, on schedule.',
  email: 'rukkiecodes@gmail.com',
  bookingUrl: 'https://cal.com/rukkiecodes',
}

export interface Social {
  label: string
  url: string
  icon: string
}

export const socials: Social[] = [
  { label: 'GitHub', url: 'https://github.com/rukkiecodes', icon: 'github' },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/rukkiecodes2', icon: 'linkedin' },
  { label: 'X', url: 'https://x.com/rukkiecodes', icon: 'twitter' },
  { label: 'Instagram', url: 'https://instagram.com/rukkiecodes', icon: 'instagram' },
  { label: 'WhatsApp', url: 'https://wa.me/2349166422808', icon: 'message-circle' },
  { label: 'Telegram', url: 'https://t.me/rukkiecodes', icon: 'send' },
]

export interface Partner {
  name: string
  url: string
  logo: string
  description: string
}

export const partners: Partner[] = [
  {
    name: 'Zintle Technologies',
    url: 'https://zintletechnology.com',
    logo: '/partners/zintle.jpeg',
    description: 'Where I lead engineering across mobile and web — architecture, quality, delivery.',
  },
  {
    name: 'HealthTok Clinic',
    url: 'https://www.healthtokclinic.com',
    logo: '/partners/healthtok.webp',
    description: 'A telemedicine platform I built, connecting patients with licensed doctors instantly.',
  },
  {
    name: 'Wanlainjo',
    url: 'https://wanlainjo.org',
    logo: '/partners/wanlainjo.webp',
    description: 'The R&D lab where I head research — building AI products and mentoring developers.',
  },
]

export interface Service {
  n: string
  title: string
  icon: string
  copy: string
  chips: string[]
}

export const services: Service[] = [
  {
    n: '01',
    title: 'AI-Powered Products',
    icon: 'zap',
    copy: 'Apps with real intelligence built in — LLM-driven assistants, in-browser/on-device AI, and chart-analysis tools that turn raw input into a clear, structured answer. Private when it needs to be, useful from the first click.',
    chips: ['LLM tooling', 'On-device AI', 'Chrome extension'],
  },
  {
    n: '02',
    title: 'Cross-Platform Mobile',
    icon: 'smartphone',
    copy: 'iOS and Android from one codebase with React Native and Expo — shipped, store-published apps that feel native, from telemedicine to verified attendance with offline sync.',
    chips: ['React Native', 'Expo', 'Google Play'],
  },
  {
    n: '03',
    title: 'Full-Stack Web Apps',
    icon: 'layout',
    copy: 'Production web apps end to end with React, Next.js, Node, and Firebase — auth, real-time data (Socket.IO), REST/GraphQL APIs, and payments. Architecture through deployment, owned by one person.',
    chips: ['React', 'Next.js', 'Node', 'Firebase'],
  },
  {
    n: '04',
    title: 'Extensions & Dev Tools',
    icon: 'tool',
    copy: 'Browser extensions and developer tooling that slot into real workflows — Chrome extensions, design systems, CLIs, and published npm packages. Tools other developers actually keep open.',
    chips: ['Chrome extension', 'npm package', 'CLI tooling'],
  },
  {
    n: '05',
    title: 'Mentoring & Curriculum',
    icon: 'award',
    copy: 'For teams that want to level up: 1:1 mentoring, workshops, and curriculum across web, mobile, and backend — the same stack I ship with, taught hands-on.',
    chips: ['Web', 'Mobile', 'Backend'],
  },
]

export interface SkillGroup {
  n: string
  title: string
  icon: string
  chips: string[]
  featured?: boolean
}

export const skillGroups: SkillGroup[] = [
  { n: '01', title: 'Languages', icon: 'code', chips: ['TypeScript', 'JavaScript', 'GLSL'] },
  {
    n: '02',
    title: 'Frontend',
    icon: 'layout',
    chips: ['React 19', 'Next.js', 'Vue 3', 'three.js', 'React Three Fiber', 'GSAP', 'Vite'],
  },
  {
    n: '03',
    title: 'Mobile',
    icon: 'smartphone',
    chips: ['React Native', 'Expo', 'Google Play delivery', 'Offline-first sync'],
    featured: true,
  },
  {
    n: '04',
    title: 'Backend & APIs',
    icon: 'server',
    chips: ['Node.js', 'Firebase', 'REST APIs', 'GraphQL', 'Socket.IO real-time'],
  },
  {
    n: '05',
    title: 'AI & Automation',
    icon: 'zap',
    chips: [
      'LLM integration',
      'AI agents',
      'In-browser / on-device AI',
      'Telegram bot delivery',
      'Markdown / JSON processing',
    ],
    featured: true,
  },
  {
    n: '06',
    title: 'Tooling & Delivery',
    icon: 'package',
    chips: ['Chrome extensions', 'CLI / dev tools', 'npm publishing', 'Design systems', 'Netlify'],
  },
]

export interface Experience {
  role: string
  company: string
  period: string
  bullets: string[]
  tags: string[]
}

export const experiences: Experience[] = [
  {
    role: 'Lead Engineer',
    company: 'Zintle Technologies',
    period: 'Jun 2025 — Present',
    bullets: [
      'Lead engineering direction across mobile and web — owning architecture, code quality, and the technical decisions.',
      'Drive delivery from planning through deployment and post-launch monitoring, applying AI-assisted workflows to ship faster without compromising quality.',
    ],
    tags: ['Architecture', 'Mobile', 'Web', 'AI-assisted'],
  },
  {
    role: 'Head of Research & Development',
    company: 'Wanlainjo Company Ltd',
    period: '2023 — Present',
    bullets: [
      'Lead the R&D team building digital products for private, government, and in-house use.',
      'Spearheaded AI-powered products such as Recido, and train and mentor developers through Wanlainjo\'s education initiative and tech hub.',
    ],
    tags: ['R&D', 'AI Products', 'Mentoring'],
  },
  {
    role: 'Co-Founder & Lead Developer',
    company: 'Savilli Labs Ltd',
    period: '2021 — Present',
    bullets: [
      'Built and led a team of developers delivering 100+ projects for private clients and government agencies — including a telemedicine platform (HealthTok) and an artisan marketplace (getArtizan).',
      'Owned the full lifecycle, from client discovery through deployment and ongoing support.',
    ],
    tags: ['React Native', '100+ projects', 'Full lifecycle'],
  },
  {
    role: 'Front-End Developer',
    company: 'Babbage Intelligence Ltd',
    period: '2020 — 2021',
    bullets: [
      'Designed and developed modular, responsive web applications with Vue.js and Vuetify.',
      'Improved component reusability, cutting development time for new features by ~20%.',
    ],
    tags: ['Vue.js', 'Vuetify'],
  },
]
