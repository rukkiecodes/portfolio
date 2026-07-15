<script setup lang="ts">
import MarkdownIt from 'markdown-it'
import { computed } from 'vue'
import { getProject, projects } from '~/data/projects'

const route = useRoute()
const slug = computed(() => String(route.params.slug))
const project = computed(() => getProject(slug.value))

// A missing slug is a real 404, not a blank page.
if (!project.value) {
  throw createError({ statusCode: 404, statusMessage: 'Project not found', fatal: true })
}

const md = new MarkdownIt({ html: false, linkify: true, typographer: true, breaks: false })
const bodyHtml = computed(() => (project.value ? md.render(project.value.body) : ''))

const isVideo = (src: string) => src.endsWith('.mp4')

// The self-scrolling app strip loops seamlessly by rendering the screenshots twice
// and translating the track by -50%.
const marqueeItems = computed(() =>
  project.value ? [...project.value.gallery, ...project.value.gallery] : []
)

// The next project, for the footer link (wraps around).
const nextProject = computed(() => {
  const i = projects.findIndex(p => p.slug === slug.value)
  return projects[(i + 1) % projects.length]
})

useHead(() => ({
  title: project.value ? `${project.value.title} — rukkiecodes` : 'rukkiecodes',
  meta: [{ name: 'description', content: project.value?.summary ?? '' }],
}))
</script>

<template>
  <article v-if="project" class="proj">
    <!-- ============ hero ============ -->
    <header class="proj__hero">
      <div class="proj__hero-inner">
        <NuxtLink to="/#work" class="proj__back">
          <f-icon icon="arrow-left" size="small" /> All work
        </NuxtLink>

        <span class="proj__eyebrow">{{ project.eyebrow }}</span>
        <h1 class="proj__title">{{ project.title }}</h1>
        <p class="proj__tagline">{{ project.tagline }}</p>
        <p class="proj__summary">{{ project.summary }}</p>

        <ul class="proj__tech">
          <li v-for="t in project.tech" :key="t">{{ t }}</li>
        </ul>

        <div class="proj__links">
          <f-btn
            v-for="(l, i) in project.links"
            :key="l.url"
            :color="i === 0 ? 'primary' : undefined"
            :variant="i === 0 ? 'elevated' : 'outlined'"
            append-icon="arrow-up-right"
            :href="l.url"
            target="_blank"
          >
            {{ l.label }}
          </f-btn>
        </div>
      </div>

      <!-- The large images as a FusionUI lightbox carousel — click to open
           fullscreen. -->
      <div class="proj__cover">
        <f-carousel
          class="proj__carousel"
          :items="project.images"
          lightbox
          counter
          aspect-ratio="16/10"
          :show-arrows="project.images.length > 1"
          :hide-delimiters="project.images.length <= 1"
          :cycle="project.images.length > 1"
          :interval="5000"
        />
      </div>
    </header>

    <!-- ============ app strip (self-scrolling) ============ -->
    <section
      v-if="project.galleryLayout === 'phone' && project.gallery.length"
      class="proj__appstrip"
      aria-label="App screenshots"
    >
      <div class="proj__marquee">
        <ul class="proj__marquee-track">
          <li v-for="(src, i) in marqueeItems" :key="i" class="proj__phone">
            <img :src="src" :alt="`${project.title} app screen`" loading="lazy" />
          </li>
        </ul>
      </div>
    </section>

    <!-- ============ body ============ -->
    <div class="proj__grid">
      <div class="proj__body">
        <!-- Demo video at the top of the write-up; the text wraps around it. -->
        <div v-if="project.video" class="proj__video">
          <video :src="project.video" autoplay loop muted playsinline />
        </div>
        <!-- eslint-disable-next-line vue/no-v-html -- trusted, first-party markdown -->
        <div class="prose" v-html="bodyHtml" />
      </div>

      <aside class="proj__aside">
        <div class="proj__aside-card">
          <h3>Built with</h3>
          <ul class="proj__aside-tech">
            <li v-for="t in project.tech" :key="t">{{ t }}</li>
          </ul>
          <h3>Links</h3>
          <ul class="proj__aside-links">
            <li v-for="l in project.links" :key="l.url">
              <a :href="l.url" target="_blank" rel="noreferrer">
                <f-icon icon="external-link" size="small" /> {{ l.label }}
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </div>

    <!-- ============ wide gallery ============ -->
    <section
      v-if="project.galleryLayout === 'wide' && project.gallery.length"
      class="proj__gallery-wrap"
    >
      <h2 class="proj__gallery-title">Screens</h2>
      <div class="proj__gallery proj__gallery--wide">
        <div v-for="src in project.gallery" :key="src" class="proj__shot">
          <video v-if="isVideo(src)" :src="src" autoplay loop muted playsinline />
          <img v-else :src="src" :alt="`${project.title} screen`" loading="lazy" />
        </div>
      </div>
    </section>

    <!-- ============ next + cta ============ -->
    <footer class="proj__foot">
      <NuxtLink :to="`/work/${nextProject.slug}`" class="proj__next">
        <span>Next project</span>
        <strong>{{ nextProject.title }} <f-icon icon="arrow-right" size="small" /></strong>
      </NuxtLink>
      <f-btn color="primary" size="large" append-icon="arrow-right" href="/#contact">
        Get in touch
      </f-btn>
    </footer>
  </article>
</template>

<style scoped>
.proj {
  max-width: 1180px;
  margin: 0 auto;
  padding: 24px;
}

/* ---- hero ---- */
.proj__hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: center;
  padding: 40px 0 44px;
}
.proj__back {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  text-decoration: none;
  color: rgba(var(--fui-theme-on-surface), 0.6);
  font-size: 0.88rem;
  margin-bottom: 20px;
  transition: color 0.15s ease;
}
.proj__back:hover {
  color: rgb(var(--fui-theme-primary));
}
.proj__eyebrow {
  display: block;
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: rgb(var(--fui-theme-primary));
}
.proj__title {
  margin: 10px 0 0;
  font-size: clamp(2.2rem, 5vw, 3.4rem);
  letter-spacing: -0.03em;
  line-height: 1.05;
}
.proj__tagline {
  margin: 8px 0 0;
  font-size: 1.15rem;
  font-weight: 600;
  color: rgba(var(--fui-theme-on-surface), 0.75);
}
.proj__summary {
  margin: 16px 0 0;
  max-width: 48ch;
  line-height: 1.65;
  color: rgba(var(--fui-theme-on-surface), 0.65);
}
.proj__tech {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin: 20px 0 0;
  padding: 0;
  list-style: none;
}
.proj__tech li {
  font-size: 0.75rem;
  padding: 4px 11px;
  border-radius: var(--fui-radius-pill, 999px);
  background: rgba(var(--fui-theme-on-surface), 0.08);
  color: rgba(var(--fui-theme-on-surface), 0.82);
}
.proj__links {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 26px;
}
.proj__carousel {
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid rgba(var(--fui-theme-on-surface), 0.1);
  box-shadow: 0 20px 50px -24px rgba(0, 0, 0, 0.55);
}
/* The carousel's images fade in on their load event; instantly-cached local
   images can fire that event before the listener attaches, leaving the image
   stuck at opacity 0. The slide switching lives on the item wrapper, so pinning
   the image opacity is safe. */
.proj__carousel :deep(img) {
  opacity: 1 !important;
}

/* ---- app strip (self-scrolling marquee) ---- */
.proj__appstrip {
  padding: 6px 0 24px;
}
.proj__marquee {
  overflow: hidden;
  -webkit-mask: linear-gradient(90deg, transparent, #000 5%, #000 95%, transparent);
  mask: linear-gradient(90deg, transparent, #000 5%, #000 95%, transparent);
}
.proj__marquee-track {
  display: flex;
  gap: 16px;
  width: max-content;
  margin: 0;
  padding: 0;
  list-style: none;
  animation: appscroll 44s linear infinite;
}
.proj__marquee:hover .proj__marquee-track {
  animation-play-state: paused;
}
.proj__phone {
  flex: 0 0 auto;
  width: 196px;
}
.proj__phone img {
  width: 100%;
  display: block;
  border-radius: 18px;
  border: 1px solid rgba(var(--fui-theme-on-surface), 0.1);
  background: rgba(var(--fui-theme-on-surface), 0.03);
}
@keyframes appscroll {
  to {
    transform: translateX(-50%);
  }
}

/* ---- body ---- */
.proj__grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 280px;
  gap: 48px;
  padding: 20px 0 40px;
  border-top: 1px solid rgba(var(--fui-theme-on-surface), 0.08);
}
.proj__video {
  float: right;
  width: 236px;
  margin: 4px 0 18px 28px;
  border-radius: 22px;
  overflow: hidden;
  border: 1px solid rgba(var(--fui-theme-on-surface), 0.1);
  box-shadow: 0 18px 44px -20px rgba(0, 0, 0, 0.6);
}
.proj__video video {
  width: 100%;
  display: block;
}
.proj__aside-card {
  position: sticky;
  top: 90px;
  padding: 22px;
  border-radius: var(--fui-radius-lg, 18px);
  background: rgb(var(--fui-theme-surface));
  border: 1px solid rgba(var(--fui-theme-on-surface), 0.08);
}
.proj__aside-card h3 {
  margin: 0 0 10px;
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: rgba(var(--fui-theme-on-surface), 0.55);
}
.proj__aside-card h3:not(:first-child) {
  margin-top: 22px;
}
.proj__aside-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 0;
  padding: 0;
  list-style: none;
}
.proj__aside-tech li {
  font-size: 0.74rem;
  padding: 3px 9px;
  border-radius: var(--fui-radius-pill, 999px);
  background: rgba(var(--fui-theme-on-surface), 0.08);
  color: rgba(var(--fui-theme-on-surface), 0.85);
}
.proj__aside-links {
  margin: 0;
  padding: 0;
  list-style: none;
}
.proj__aside-links a {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 5px 0;
  text-decoration: none;
  font-size: 0.9rem;
  color: rgba(var(--fui-theme-on-surface), 0.9);
  transition: color 0.15s ease;
}
.proj__aside-links a:hover {
  color: rgb(var(--fui-theme-primary));
}
.proj__aside-links :deep(.fui-icon) {
  color: rgb(var(--fui-theme-primary));
}

/* ---- wide gallery ---- */
.proj__gallery-wrap {
  padding: 20px 0;
}
.proj__gallery-title {
  font-size: 1.5rem;
  letter-spacing: -0.02em;
  margin: 0 0 22px;
}
.proj__gallery--wide {
  display: flex;
  flex-direction: column;
  gap: 22px;
}
.proj__shot img,
.proj__shot video {
  width: 100%;
  display: block;
  border-radius: 16px;
  border: 1px solid rgba(var(--fui-theme-on-surface), 0.08);
  background: rgba(var(--fui-theme-on-surface), 0.03);
}

/* ---- foot ---- */
.proj__foot {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 40px 0;
  margin-top: 20px;
  border-top: 1px solid rgba(var(--fui-theme-on-surface), 0.08);
}
.proj__next {
  text-decoration: none;
  color: inherit;
}
.proj__next span {
  display: block;
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: rgba(var(--fui-theme-on-surface), 0.5);
}
.proj__next strong {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 1.4rem;
  letter-spacing: -0.02em;
}
.proj__next:hover strong {
  color: rgb(var(--fui-theme-primary));
}

@media (max-width: 900px) {
  .proj__hero {
    grid-template-columns: 1fr;
    gap: 32px;
  }
  .proj__grid {
    grid-template-columns: 1fr;
    gap: 28px;
  }
  .proj__aside-card {
    position: static;
  }
  .proj__video {
    float: none;
    width: 100%;
    max-width: 260px;
    margin: 0 auto 20px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .proj__marquee-track {
    animation: none;
  }
}
</style>

<style>
/* Non-scoped so it styles the v-html markdown output. */
.proj__body .prose {
  font-size: 1rem;
  line-height: 1.72;
  color: rgba(var(--fui-theme-on-surface), 0.82);
}
.proj__body .prose h2 {
  margin: 34px 0 12px;
  font-size: 1.5rem;
  letter-spacing: -0.02em;
}
.proj__body .prose h3 {
  margin: 26px 0 10px;
  font-size: 1.18rem;
}
.proj__body .prose p {
  margin: 14px 0;
}
.proj__body .prose ul,
.proj__body .prose ol {
  margin: 14px 0;
  padding-left: 22px;
}
.proj__body .prose li {
  margin: 7px 0;
}
.proj__body .prose strong {
  color: rgb(var(--fui-theme-on-surface));
}
.proj__body .prose a {
  color: rgb(var(--fui-theme-primary));
}
.proj__body .prose code {
  font-family: var(--fui-font-family-mono, monospace);
  font-size: 0.88em;
  padding: 2px 6px;
  border-radius: 6px;
  background: rgba(var(--fui-theme-on-surface), 0.07);
}
.proj__body .prose pre {
  margin: 16px 0;
  padding: 16px;
  overflow-x: auto;
  border-radius: 12px;
  background: rgba(var(--fui-theme-on-surface), 0.06);
  border: 1px solid rgba(var(--fui-theme-on-surface), 0.08);
  font-size: 0.82rem;
  line-height: 1.5;
}
.proj__body .prose pre code {
  padding: 0;
  background: none;
}
.proj__body .prose table {
  width: 100%;
  margin: 18px 0;
  border-collapse: collapse;
  font-size: 0.9rem;
  display: block;
  overflow-x: auto;
}
.proj__body .prose th,
.proj__body .prose td {
  padding: 9px 14px;
  text-align: left;
  border: 1px solid rgba(var(--fui-theme-on-surface), 0.1);
  vertical-align: top;
}
.proj__body .prose th {
  background: rgba(var(--fui-theme-on-surface), 0.05);
  font-weight: 600;
}
</style>
