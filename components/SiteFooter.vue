<script setup lang="ts">
import { profile, socials } from '~/data/site'
</script>

<template>
  <footer class="footer">
    <div class="footer__inner">
      <div class="footer__brand">
        <span class="footer__name">{{ profile.name }}</span>
        <span class="footer__role">{{ profile.role }} · {{ profile.years }}</span>
      </div>

      <ul class="footer__socials">
        <li v-for="s in socials" :key="s.label">
          <a :href="s.url" target="_blank" rel="noreferrer" :aria-label="s.label">
            <f-icon :icon="s.icon" size="small" />
          </a>
        </li>
      </ul>

      <p class="footer__note">
        Built with
        <a href="https://rukkiecodes.github.io/fusionui/" target="_blank" rel="noreferrer">FusionUI</a>
        + Nuxt · © {{ new Date().getFullYear() }} {{ profile.fullName }}
      </p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  border-top: 1px solid rgba(var(--fui-theme-on-surface), 0.08);
  margin-top: 40px;
}
.footer__inner {
  max-width: 1180px;
  margin: 0 auto;
  padding: 32px 24px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px 28px;
}
.footer__brand {
  display: flex;
  flex-direction: column;
}
.footer__name {
  font-weight: 700;
}
.footer__role {
  font-size: 0.85rem;
  color: rgba(var(--fui-theme-on-surface), 0.6);
}
.footer__socials {
  display: flex;
  gap: 8px;
  list-style: none;
  margin: 0;
  padding: 0;
  margin-left: auto;
}
.footer__socials a {
  display: inline-grid;
  place-items: center;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 1px solid rgba(var(--fui-theme-on-surface), 0.12);
  color: inherit;
  transition:
    border-color 0.15s ease,
    color 0.15s ease;
}
.footer__socials a:hover {
  border-color: rgb(var(--fui-theme-primary));
  color: rgb(var(--fui-theme-primary));
}
.footer__note {
  width: 100%;
  margin: 0;
  font-size: 0.82rem;
  color: rgba(var(--fui-theme-on-surface), 0.55);
}
.footer__note a {
  color: rgb(var(--fui-theme-primary));
  text-decoration: none;
}
</style>
