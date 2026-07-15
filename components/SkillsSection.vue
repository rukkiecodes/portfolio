<script setup lang="ts">
import { skillGroups } from '~/data/site'
</script>

<template>
  <section id="skills" class="skills">
    <div class="skills__inner">
      <header class="sec-head">
        <span class="sec-head__eyebrow">[ Skills ]</span>
        <h2 class="sec-head__title">Tech I build with</h2>
        <p class="sec-head__copy">
          10+ years shipping production web, mobile, and AI products. A current, full-stack
          toolkit — from cross-platform mobile to LLM-powered features and browser tooling.
        </p>
      </header>

      <div class="skills__grid">
        <article
          v-for="g in skillGroups"
          :key="g.n"
          class="skill-card"
          :class="{ 'skill-card--featured': g.featured }"
        >
          <div class="skill-card__head">
            <span class="skill-card__icon"><f-icon :icon="g.icon" size="small" /></span>
            <span class="skill-card__num">{{ g.n }}</span>
            <h3 class="skill-card__title">{{ g.title }}</h3>
          </div>
          <ul class="skill-card__chips">
            <li v-for="c in g.chips" :key="c">{{ c }}</li>
          </ul>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.skills {
  padding: 80px 0;
}
.skills__inner {
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 24px;
}
.skills__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 18px;
  margin-top: 44px;
}
.skill-card {
  padding: 24px;
  border-radius: var(--fui-radius-lg, 18px);
  background: rgb(var(--fui-theme-surface));
  border: 1px solid rgba(var(--fui-theme-on-surface), 0.08);
}
.skill-card--featured {
  background: linear-gradient(
    150deg,
    rgba(var(--fui-theme-primary), 0.1),
    rgba(var(--fui-theme-secondary), 0.05)
  );
  border-color: rgba(var(--fui-theme-primary), 0.25);
}
.skill-card__head {
  display: flex;
  align-items: center;
  gap: 10px;
}
.skill-card__icon {
  display: inline-grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border-radius: 9px;
  color: rgb(var(--fui-theme-primary));
  background: rgba(var(--fui-theme-primary), 0.1);
}
.skill-card__num {
  font-family: var(--fui-font-family-mono, monospace);
  font-size: 0.72rem;
  color: rgba(var(--fui-theme-on-surface), 0.3);
}
.skill-card__title {
  margin: 0;
  font-size: 1.05rem;
}
.skill-card__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin: 16px 0 0;
  padding: 0;
  list-style: none;
}
.skill-card__chips li {
  font-size: 0.78rem;
  padding: 4px 10px;
  border-radius: var(--fui-radius-pill, 999px);
  background: rgba(var(--fui-theme-on-surface), 0.06);
  color: rgba(var(--fui-theme-on-surface), 0.72);
}
</style>
