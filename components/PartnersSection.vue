<script setup lang="ts">
import { partners } from '~/data/site'
</script>

<template>
  <section id="partners" class="partners">
    <div class="partners__inner">
      <p class="partners__eyebrow">[ Trusted partners ]</p>
      <h2 class="partners__title">People I build with &amp; for</h2>

      <div class="partners__grid">
        <f-card v-for="p in partners" :key="p.name" type="3" class="partner">
          <template #img>
            <img :src="p.logo" :alt="p.name" loading="lazy" />
          </template>
          <template #title>
            <h3>{{ p.name }}</h3>
          </template>
          <template #text>
            <p class="partner__desc">{{ p.description }}</p>
            <a class="partner__link" :href="p.url" target="_blank" rel="noreferrer">
              Visit site
              <f-icon icon="arrow-up-right" size="small" />
            </a>
          </template>
        </f-card>
      </div>
    </div>
  </section>
</template>

<style scoped>
.partners {
  padding: 64px 0;
}
.partners__inner {
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 24px;
  text-align: center;
}
.partners__eyebrow {
  margin: 0;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgb(var(--fui-theme-primary));
}
.partners__title {
  margin: 10px 0 0;
  font-size: clamp(1.4rem, 2.6vw, 1.9rem);
  letter-spacing: -0.02em;
}
.partners__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin: 40px 0 0;
  text-align: left;
}
.partner {
  height: 100%;
}
/* The card's image area crops to cover by default; logos need to sit fully
   visible on a light panel, so contain them and pad. */
.partner :deep(.fui-card__img) {
  background: #fff;
}
.partner :deep(.fui-card__img img) {
  object-fit: contain !important;
  padding: 26px 30px;
}

/* Description clamped to two lines, with the visit link directly beneath it. */
.partner__desc {
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.5;
}
.partner__link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-top: 12px;
  font-size: 0.86rem;
  font-weight: 600;
  color: rgb(var(--fui-theme-primary));
  text-decoration: none;
}
.partner__link:hover {
  text-decoration: underline;
}
</style>
