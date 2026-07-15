<script setup lang="ts">
import { projects } from '~/data/projects'
</script>

<template>
  <section id="work" class="work">
    <div class="work__inner">
      <header class="sec-head">
        <span class="sec-head__eyebrow">[ Work ]</span>
        <h2 class="sec-head__title">Selected work</h2>
        <p class="sec-head__copy">
          Shipped products — telemedicine, verified attendance, AI tooling, an open-source design
          system, and browser tools. Real apps, in real stores and repos.
        </p>
      </header>

      <div class="work__grid">
        <NuxtLink
          v-for="p in projects"
          :key="p.slug"
          :to="`/work/${p.slug}`"
          class="work-card"
        >
          <f-glass class="work-card__glass" :radius="22" :blur="1" :depth="6" interactive>
            <div class="work-card__media">
              <img :src="p.images[0]" :alt="p.imageAlt" loading="lazy" />
            </div>
            <div class="work-card__body">
              <span class="work-card__eyebrow">{{ p.eyebrow }}</span>
              <h3 class="work-card__title">
                {{ p.title }}
                <f-icon icon="arrow-up-right" size="small" class="work-card__arrow" />
              </h3>
              <p class="work-card__tagline">{{ p.tagline }}</p>
              <ul class="work-card__tech">
                <li v-for="t in p.tech.slice(0, 4)" :key="t">{{ t }}</li>
              </ul>
            </div>
          </f-glass>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.work {
  padding: 80px 0;
}
.work__inner {
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 24px;
}
.work__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 22px;
  margin-top: 44px;
}
.work-card {
  text-decoration: none;
  color: inherit;
}
.work-card__glass {
  overflow: hidden;
  height: 100%;
  background: rgba(var(--fui-theme-surface), 0.72);
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;
}
.work-card:hover .work-card__glass {
  transform: translateY(-6px);
  box-shadow: 0 22px 46px -20px rgba(var(--fui-theme-primary), 0.4);
}
.work-card__media {
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background: rgba(var(--fui-theme-on-surface), 0.05);
}
.work-card__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.4s ease;
}
.work-card:hover .work-card__media img {
  transform: scale(1.05);
}
.work-card__body {
  padding: 18px 20px 22px;
}
.work-card__eyebrow {
  font-size: 0.74rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: rgb(var(--fui-theme-primary));
}
.work-card__title {
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 8px 0 0;
  font-size: 1.3rem;
  letter-spacing: -0.02em;
}
.work-card__arrow {
  opacity: 0.4;
  transition:
    transform 0.2s ease,
    opacity 0.2s ease;
}
.work-card:hover .work-card__arrow {
  opacity: 1;
  transform: translate(2px, -2px);
  color: rgb(var(--fui-theme-primary));
}
.work-card__tagline {
  margin: 6px 0 0;
  font-size: 0.92rem;
  line-height: 1.5;
  color: rgba(var(--fui-theme-on-surface), 0.65);
}
.work-card__tech {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 16px 0 0;
  padding: 0;
  list-style: none;
}
.work-card__tech li {
  font-size: 0.72rem;
  padding: 3px 9px;
  border-radius: var(--fui-radius-pill, 999px);
  background: rgba(var(--fui-theme-on-surface), 0.06);
  color: rgba(var(--fui-theme-on-surface), 0.7);
}
</style>
