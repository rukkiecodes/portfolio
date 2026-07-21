<script setup lang="ts">
import { services } from '~/data/site'
</script>

<template>
  <section id="expertise" class="services">
    <div class="services__inner">
      <header class="sec-head">
        <span class="sec-head__eyebrow">[ Expertise ]</span>
        <h2 class="sec-head__title">What I do</h2>
        <p class="sec-head__copy">
          A handful of things I do well — each owned end to end, from architecture to what ships.
        </p>
      </header>

      <div class="services__grid">
        <article v-for="s in services" :key="s.n" class="service-card">
          <div class="service-card__head">
            <span class="service-card__icon">
              <f-icon :icon="s.icon" />
            </span>
            <span class="service-card__num">{{ s.n }}</span>
          </div>
          <h3 class="service-card__title">{{ s.title }}</h3>
          <p class="service-card__copy">{{ s.copy }}</p>
          <ul class="service-card__chips">
            <li v-for="c in s.chips" :key="c">{{ c }}</li>
          </ul>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.services {
  padding: 80px 0;
  background: rgba(var(--fui-theme-on-surface), 0.02);
}
.services__inner {
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 24px;
}
.services__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 18px;
  margin-top: 44px;
}
.service-card {
  padding: 26px 24px;
  border-radius: var(--fui-radius-lg, 18px);
  background: rgb(var(--fui-theme-surface));
  border: 1px solid rgba(var(--fui-theme-on-surface), 0.08);
  transition:
    transform 0.2s ease,
    border-color 0.2s ease;
}
.service-card:hover {
  transform: translateY(-4px);
  border-color: rgba(var(--fui-theme-primary), 0.4);
}
.service-card__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.service-card__icon {
  display: inline-grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  color: rgb(var(--fui-theme-primary));
  background: rgba(var(--fui-theme-primary), 0.1);
}
.service-card__num {
  font-family: var(--fui-font-family-mono, monospace);
  font-size: 0.8rem;
  color: rgba(var(--fui-theme-on-surface), 0.35);
}
.service-card__title {
  margin: 18px 0 0;
  font-size: 1.15rem;
  letter-spacing: -0.01em;
}
.service-card__copy {
  margin: 8px 0 0;
  font-size: 0.92rem;
  line-height: 1.6;
  color: rgba(var(--fui-theme-on-surface), 0.65);
}
.service-card__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 16px 0 0;
  padding: 0;
  list-style: none;
}
.service-card__chips li {
  font-size: 0.72rem;
  padding: 3px 9px;
  border-radius: var(--fui-radius-pill, 999px);
  background: rgba(var(--fui-theme-primary), 0.08);
  color: rgb(var(--fui-theme-primary));
}
</style>
