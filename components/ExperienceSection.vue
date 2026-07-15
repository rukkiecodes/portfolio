<script setup lang="ts">
import { experiences } from '~/data/site'
</script>

<template>
  <section id="experience" class="exp">
    <div class="exp__inner">
      <header class="sec-head">
        <span class="sec-head__eyebrow">[ Experience ]</span>
        <h2 class="sec-head__title">Where I've worked</h2>
        <p class="sec-head__copy">
          10+ years across product teams, R&amp;D, and full-stack delivery — shipping AI-powered
          products, cross-platform mobile, and full-stack web for private and government clients.
        </p>
      </header>

      <ol class="exp__timeline">
        <li v-for="e in experiences" :key="e.company" class="exp-item">
          <span class="exp-item__node" aria-hidden="true" />
          <article class="exp-card">
            <div class="exp-card__head">
              <div>
                <h3 class="exp-card__role">{{ e.role }}</h3>
                <span class="exp-card__company">{{ e.company }}</span>
              </div>
              <span class="exp-card__period">{{ e.period }}</span>
            </div>
            <ul class="exp-card__bullets">
              <li v-for="(b, i) in e.bullets" :key="i">{{ b }}</li>
            </ul>
            <ul class="exp-card__tags">
              <li v-for="t in e.tags" :key="t">{{ t }}</li>
            </ul>
          </article>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.exp {
  padding: 80px 0;
  background: rgba(var(--fui-theme-on-surface), 0.02);
}
.exp__inner {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 24px;
}
.exp__timeline {
  margin: 44px 0 0;
  padding: 0 0 0 8px;
  list-style: none;
}
.exp-item {
  position: relative;
  padding: 0 0 26px 30px;
  border-left: 2px solid rgba(var(--fui-theme-on-surface), 0.1);
}
.exp-item:last-child {
  padding-bottom: 0;
}
.exp-item__node {
  position: absolute;
  left: -7px;
  top: 4px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgb(var(--fui-theme-primary));
  box-shadow: 0 0 0 4px rgba(var(--fui-theme-primary), 0.15);
}
.exp-card__head {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 4px 16px;
}
.exp-card__role {
  margin: 0;
  font-size: 1.12rem;
}
.exp-card__company {
  color: rgb(var(--fui-theme-primary));
  font-weight: 600;
  font-size: 0.95rem;
}
.exp-card__period {
  font-family: var(--fui-font-family-mono, monospace);
  font-size: 0.8rem;
  color: rgba(var(--fui-theme-on-surface), 0.5);
}
.exp-card__bullets {
  margin: 12px 0 0;
  padding: 0 0 0 18px;
  color: rgba(var(--fui-theme-on-surface), 0.7);
}
.exp-card__bullets li {
  margin: 6px 0;
  font-size: 0.92rem;
  line-height: 1.55;
}
.exp-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 14px 0 0;
  padding: 0;
  list-style: none;
}
.exp-card__tags li {
  font-size: 0.72rem;
  padding: 3px 9px;
  border-radius: var(--fui-radius-pill, 999px);
  background: rgba(var(--fui-theme-on-surface), 0.06);
  color: rgba(var(--fui-theme-on-surface), 0.7);
}
</style>
