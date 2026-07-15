<script setup lang="ts">
import { ref } from 'vue'
import { profile, socials } from '~/data/site'

// Click the portrait to flip the glass and reveal the other side.
const flipped = ref(false)
</script>

<template>
  <section class="hero">
    <div class="hero__inner">
      <div class="hero__copy">
        <div class="hero__status">
          <span class="hero__dot" />
          {{ profile.tagline }}
        </div>

        <h1 class="hero__title">
          Hi, I'm <b>{{ profile.name }}</b>
        </h1>
        <p class="hero__role">{{ profile.role }}, {{ profile.years }}</p>
        <p class="hero__intro">{{ profile.intro }}</p>

        <div class="hero__cta">
          <f-btn color="primary" size="large" append-icon="arrow-right" href="#work">
            Explore my work
          </f-btn>
          <f-btn variant="outlined" size="large" href="#contact">Get in touch</f-btn>
        </div>

        <ul class="hero__socials">
          <li v-for="s in socials" :key="s.label">
            <a :href="s.url" target="_blank" rel="noreferrer">
              <f-icon :icon="s.icon" size="small" /> {{ s.label }}
            </a>
          </li>
        </ul>
      </div>

      <!-- The portrait, framed in liquid glass, with real FusionUI components
           floating around it — the site showing what it's built with.
           Each tile is a positioned wrapper around an FGlass, because FGlass sets
           its own position and would otherwise ignore the placement. -->
      <div class="hero__stage">
        <div
          class="hero__portrait"
          :class="{ 'is-flipped': flipped }"
          role="button"
          tabindex="0"
          :aria-label="flipped ? 'Flip back to portrait' : 'Flip to see the other side'"
          @click="flipped = !flipped"
          @keydown.enter="flipped = !flipped"
          @keydown.space.prevent="flipped = !flipped"
        >
          <div class="flip">
            <div class="flip__face flip__front">
              <f-glass :radius="28" :blur="2" :depth="10" interactive>
                <img src="/portrait.png" alt="rukkiecodes portrait" class="hero__portrait-img" />
              </f-glass>
            </div>
            <div class="flip__face flip__back">
              <f-glass :radius="28" :blur="2" :depth="10">
                <img
                  src="/portrait-back.png"
                  alt="rukkiecodes — the other side"
                  class="hero__portrait-img hero__portrait-img--back"
                />
              </f-glass>
            </div>
          </div>
          <span class="hero__flip-hint" aria-hidden="true">
            <f-icon icon="refresh-cw" size="small" /> {{ flipped ? 'the other side' : 'click to flip' }}
          </span>
        </div>

        <div class="hero__tile hero__tile--top">
          <f-glass class="hero__tile-glass" :radius="16" :blur="3" :depth="8">
            <div class="tile-row">
              <span class="tile-chip tile-chip--primary">Full-stack</span>
              <span class="tile-chip tile-chip--success">AI-first</span>
            </div>
          </f-glass>
        </div>

        <div class="hero__tile hero__tile--mid">
          <f-glass class="hero__tile-glass" :radius="16" :blur="3" :depth="8">
            <div class="tile-stat">
              <span class="tile-stat__value">100+</span>
              <span class="tile-stat__label">projects shipped</span>
            </div>
          </f-glass>
        </div>

        <div class="hero__tile hero__tile--bottom">
          <f-glass class="hero__tile-glass" :radius="16" :blur="3" :depth="8">
            <div class="tile-row">
              <f-icon icon="smartphone" size="small" color="primary" />
              <f-icon icon="zap" size="small" color="warning" />
              <f-icon icon="code" size="small" color="success" />
              <span class="tile-note">web · mobile · AI</span>
            </div>
          </f-glass>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  overflow: clip;
}
.hero__inner {
  position: relative;
  z-index: 2;
  max-width: 1180px;
  margin: 0 auto;
  padding: 72px 24px 88px;
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  align-items: center;
  gap: 48px;
  min-height: 78vh;
}
/* ---- copy ---- */
.hero__status {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  border-radius: var(--fui-radius-pill, 999px);
  background: rgba(var(--fui-theme-primary), 0.12);
  color: rgb(var(--fui-theme-primary));
  font-size: 0.82rem;
  font-weight: 600;
}
.hero__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgb(var(--fui-theme-primary));
  box-shadow: 0 0 0 0 rgba(var(--fui-theme-primary), 0.6);
  animation: pulse 2s infinite;
}
@keyframes pulse {
  70% {
    box-shadow: 0 0 0 8px rgba(var(--fui-theme-success), 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(var(--fui-theme-success), 0);
  }
}
.hero__title {
  margin: 22px 0 0;
  font-size: clamp(2.4rem, 5vw, 4rem);
  font-weight: 780;
  line-height: 1.05;
  letter-spacing: -0.04em;
}
.hero__title b {
  background: linear-gradient(
    100deg,
    rgb(var(--fui-theme-primary)),
    rgb(var(--fui-theme-secondary))
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-weight: inherit;
}
.hero__role {
  margin: 10px 0 0;
  font-size: 1.15rem;
  font-weight: 600;
  color: rgba(var(--fui-theme-on-surface), 0.75);
}
.hero__intro {
  margin: 18px 0 0;
  max-width: 46ch;
  font-size: 1.02rem;
  line-height: 1.65;
  color: rgba(var(--fui-theme-on-surface), 0.65);
}
.hero__cta {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 30px;
}
.hero__socials {
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  margin: 28px 0 0;
  padding: 0;
  list-style: none;
}
.hero__socials a {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  text-decoration: none;
  font-size: 0.88rem;
  color: rgba(var(--fui-theme-on-surface), 0.6);
  transition: color 0.15s ease;
}
.hero__socials a:hover {
  color: rgb(var(--fui-theme-primary));
}

/* ---- stage ---- */
.hero__stage {
  position: relative;
  height: 460px;
}
.hero__portrait {
  position: absolute;
  inset: 0 30px 0 30px;
  z-index: 1;
  perspective: 1500px;
  cursor: pointer;
}
.hero__portrait:focus-visible {
  outline: 2px solid rgb(var(--fui-theme-primary));
  outline-offset: 6px;
  border-radius: 30px;
}
.flip {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.85s cubic-bezier(0.4, 0.12, 0.2, 1);
}
.hero__portrait.is-flipped .flip {
  transform: rotateY(180deg);
}
.flip__face {
  position: absolute;
  inset: 0;
  border-radius: 28px;
  overflow: hidden;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}
.flip__face > * {
  width: 100%;
  height: 100%;
}
.flip__back {
  transform: rotateY(180deg);
  /* The other-side art is a transparent cutout — a gradient behind it makes the
     character read while the glass frame still shows. */
  background: radial-gradient(120% 120% at 50% 20%, #3a1420 0%, #0c1330 70%);
}
.hero__portrait-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.hero__portrait-img--back {
  object-fit: contain;
  object-position: bottom center;
}
.hero__flip-hint {
  position: absolute;
  bottom: 14px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 4;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 600;
  color: #fff;
  background: rgba(0, 0, 0, 0.42);
  backdrop-filter: blur(6px);
  pointer-events: none;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
}
.hero__tile {
  position: absolute;
  z-index: 3;
  animation: float 7s ease-in-out infinite;
}
.hero__tile-glass {
  padding: 11px 14px;
  background: rgba(var(--fui-theme-surface), 0.94);
  box-shadow: 0 14px 32px -14px rgba(0, 0, 0, 0.3);
}
.hero__tile--top {
  top: 2px;
  left: -22px;
}
.hero__tile--mid {
  top: 42%;
  right: -26px;
  animation-delay: 1.4s;
}
.hero__tile--bottom {
  bottom: 6px;
  left: -14px;
  animation-delay: 0.7s;
}
@keyframes float {
  50% {
    transform: translateY(-12px);
  }
}
.tile-row {
  display: flex;
  align-items: center;
  gap: 8px;
}
/* Tile text is white with a soft shadow — the glass is semi-transparent, so
   coloured text washed out over the portrait behind it. */
.tile-chip {
  font-size: 0.72rem;
  font-weight: 600;
  padding: 4px 11px;
  border-radius: 999px;
  color: #fff;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.35);
}
.tile-chip--primary {
  background: rgba(var(--fui-theme-primary), 0.9);
}
.tile-chip--success {
  background: rgba(var(--fui-theme-success), 0.9);
}
.tile-note {
  font-size: 0.78rem;
  color: #fff;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
}
.tile-stat__value {
  display: block;
  font-size: 1.4rem;
  font-weight: 750;
  color: #fff;
  line-height: 1;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.45);
}
.tile-stat__label {
  font-size: 0.76rem;
  color: rgba(255, 255, 255, 0.82);
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
}

@media (max-width: 900px) {
  .hero__inner {
    grid-template-columns: 1fr;
    gap: 36px;
    min-height: auto;
    padding-top: 32px;
    text-align: center;
  }
  /* Floating image on top, centred; the copy comes under it.
     The stage's children are all absolutely positioned, so it has no in-flow
     content — `justify-self: center` would shrink it to 0 width and the portrait
     would vanish. Give it an explicit width and centre with auto margins. */
  .hero__stage {
    order: -1;
    height: 380px;
    width: 100%;
    max-width: 420px;
    margin: 0 auto;
  }
  .hero__intro {
    margin-inline: auto;
  }
  .hero__cta,
  .hero__socials {
    justify-content: center;
  }
}
@media (prefers-reduced-motion: reduce) {
  .hero__tile,
  .hero__dot {
    animation: none;
  }
}
</style>
