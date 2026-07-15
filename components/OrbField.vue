<script setup lang="ts">
// Ambient background: a few large, blurred, brand-coloured orbs drifting around
// the viewport. Fixed behind all content, so the glass panels above frost them.
// Pointer-events off; frozen under prefers-reduced-motion.
</script>

<template>
  <div class="orbs" aria-hidden="true">
    <span class="orb orb--1" />
    <span class="orb orb--2" />
    <span class="orb orb--3" />
    <span class="orb orb--4" />
  </div>
</template>

<style scoped>
.orbs {
  position: fixed;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
}
.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(90px);
  opacity: 0.55;
  will-change: transform;
}
.orb--1 {
  width: 460px;
  height: 460px;
  top: -8%;
  left: -6%;
  background: radial-gradient(circle, rgba(var(--fui-theme-primary), 0.6), transparent 70%);
  animation: drift1 26s ease-in-out infinite;
}
.orb--2 {
  width: 420px;
  height: 420px;
  top: 26%;
  right: -8%;
  background: radial-gradient(circle, rgba(var(--fui-theme-secondary), 0.55), transparent 70%);
  animation: drift2 32s ease-in-out infinite;
}
.orb--3 {
  width: 380px;
  height: 380px;
  bottom: 4%;
  left: 16%;
  background: radial-gradient(circle, rgba(var(--fui-theme-primary), 0.45), transparent 70%);
  animation: drift3 30s ease-in-out infinite;
}
.orb--4 {
  width: 320px;
  height: 320px;
  top: 52%;
  left: 46%;
  background: radial-gradient(circle, rgba(var(--fui-theme-success), 0.32), transparent 70%);
  animation: drift4 38s ease-in-out infinite;
}

@keyframes drift1 {
  0%,
  100% {
    transform: translate(0, 0);
  }
  33% {
    transform: translate(70px, 90px);
  }
  66% {
    transform: translate(-40px, 50px);
  }
}
@keyframes drift2 {
  0%,
  100% {
    transform: translate(0, 0);
  }
  33% {
    transform: translate(-90px, 70px);
  }
  66% {
    transform: translate(-30px, -60px);
  }
}
@keyframes drift3 {
  0%,
  100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(90px, -70px);
  }
}
@keyframes drift4 {
  0%,
  100% {
    transform: translate(0, 0);
  }
  40% {
    transform: translate(-70px, -50px);
  }
  70% {
    transform: translate(60px, 40px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .orb {
    animation: none;
  }
}
</style>
