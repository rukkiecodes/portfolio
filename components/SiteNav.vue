<script setup lang="ts">
import { profile } from '~/data/site'

// The top bar. Nav links are anchors to the home-page sections; on a project
// detail page they route home first (Nuxt hash navigation handles the scroll).
const links = [
  { label: 'Work', to: '/#work', sup: '9' },
  { label: 'Expertise', to: '/#expertise', sup: '5' },
  { label: 'Experience', to: '/#experience', sup: '10y+' },
  { label: 'Contact', to: '/#contact', sup: '' },
]
</script>

<template>
  <header class="nav">
    <div class="nav__inner">
      <NuxtLink to="/" class="nav__brand" aria-label="Home">
        <span class="nav__mark">{{ '{ }' }}</span>
        <span class="nav__name">{{ profile.name }}</span>
      </NuxtLink>

      <nav class="nav__links" aria-label="Primary">
        <NuxtLink v-for="l in links" :key="l.label" :to="l.to" class="nav__link">
          {{ l.label }}<sup v-if="l.sup">[{{ l.sup }}]</sup>
        </NuxtLink>
      </nav>

      <div class="nav__actions">
        <f-btn color="primary" size="small" append-icon="arrow-right" href="/#contact">
          Get in touch
        </f-btn>
      </div>
    </div>
  </header>
</template>

<style scoped>
.nav {
  position: sticky;
  top: 0;
  z-index: 40;
  backdrop-filter: blur(12px);
  background: rgba(var(--fui-theme-surface), 0.72);
  border-bottom: 1px solid rgba(var(--fui-theme-on-surface), 0.08);
}
.nav__inner {
  max-width: 1180px;
  margin: 0 auto;
  padding: 12px 24px;
  display: flex;
  align-items: center;
  gap: 20px;
}
.nav__brand {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: inherit;
  font-weight: 700;
  letter-spacing: -0.02em;
}
.nav__mark {
  font-family: var(--fui-font-family-mono, monospace);
  color: rgb(var(--fui-theme-primary));
}
.nav__links {
  display: flex;
  gap: 22px;
  /* Centre the links, which pins the brand to the left and the CTA to the right. */
  margin: 0 auto;
}
.nav__link {
  text-decoration: none;
  color: rgba(var(--fui-theme-on-surface), 0.75);
  font-size: 0.92rem;
  transition: color 0.15s ease;
}
.nav__link:hover {
  color: rgb(var(--fui-theme-primary));
}
.nav__link sup {
  font-size: 0.62em;
  opacity: 0.6;
  margin-left: 1px;
}
.nav__actions {
  display: flex;
  align-items: center;
  gap: 12px;
}
.nav__theme {
  display: inline-grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid rgba(var(--fui-theme-on-surface), 0.12);
  background: transparent;
  color: inherit;
  cursor: pointer;
  transition: border-color 0.15s ease;
}
.nav__theme:hover {
  border-color: rgb(var(--fui-theme-primary));
  color: rgb(var(--fui-theme-primary));
}

@media (max-width: 760px) {
  .nav__links {
    display: none;
  }
  /* With the links hidden, push the CTA to the right edge. */
  .nav__actions {
    margin-left: auto;
  }
}
</style>
