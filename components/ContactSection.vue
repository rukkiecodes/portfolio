<script setup lang="ts">
import { ref } from 'vue'
import { profile, socials } from '~/data/site'

const copied = ref(false)
async function copyEmail() {
  try {
    await navigator.clipboard.writeText(profile.email)
    copied.value = true
    setTimeout(() => (copied.value = false), 1500)
  } catch {
    /* clipboard unavailable */
  }
}
</script>

<template>
  <section id="contact" class="contact">
    <f-glass class="contact__panel" :radius="28" :blur="2" :depth="10">
      <div class="contact__body">
        <span class="sec-head__eyebrow">[ Contact ]</span>
        <h2 class="contact__title">Let's connect</h2>
        <p class="contact__copy">
          Want to talk through an idea, explore a collaboration, or just connect? Reach out —
          I usually reply within a day.
        </p>

        <div class="contact__actions">
          <f-btn color="primary" size="large" prepend-icon="mail" :href="`mailto:${profile.email}`">
            Email me
          </f-btn>
          <f-btn
            variant="outlined"
            size="large"
            append-icon="arrow-up-right"
            :href="profile.bookingUrl"
            target="_blank"
          >
            Book a call
          </f-btn>
          <f-btn variant="text" size="large" :prepend-icon="copied ? 'check' : 'copy'" @click="copyEmail">
            {{ copied ? 'Copied' : 'Copy email' }}
          </f-btn>
        </div>

        <div class="contact__socials">
          <span>Or find me here</span>
          <ul>
            <li v-for="s in socials" :key="s.label">
              <a :href="s.url" target="_blank" rel="noreferrer" :aria-label="s.label">
                <f-icon :icon="s.icon" size="small" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </f-glass>
  </section>
</template>

<style scoped>
.contact {
  padding: 80px 24px;
  max-width: 1000px;
  margin: 0 auto;
}
.contact__panel {
  position: relative;
  overflow: hidden;
  /* Frosted: a semi-transparent surface plus a backdrop blur, so the animated
     orbs drifting behind the panel read as soft frosted colour, not a hard shape. */
  background: rgba(var(--fui-theme-surface), 0.55);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(var(--fui-theme-on-surface), 0.1);
}
.contact__body {
  position: relative;
  z-index: 2;
  padding: 56px 40px;
  text-align: center;
}
.contact__title {
  margin: 12px 0 0;
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  letter-spacing: -0.03em;
}
.contact__copy {
  margin: 14px auto 0;
  max-width: 46ch;
  line-height: 1.6;
  color: rgba(var(--fui-theme-on-surface), 0.65);
}
.contact__actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  margin-top: 30px;
}
.contact__socials {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  margin-top: 40px;
}
.contact__socials span {
  font-size: 0.82rem;
  color: rgba(var(--fui-theme-on-surface), 0.5);
}
.contact__socials ul {
  display: flex;
  gap: 10px;
  margin: 0;
  padding: 0;
  list-style: none;
}
.contact__socials a {
  display: inline-grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 1px solid rgba(var(--fui-theme-on-surface), 0.12);
  color: inherit;
  transition:
    border-color 0.15s ease,
    color 0.15s ease;
}
.contact__socials a:hover {
  border-color: rgb(var(--fui-theme-primary));
  color: rgb(var(--fui-theme-primary));
}
</style>
