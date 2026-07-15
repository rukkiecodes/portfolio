<script setup lang="ts">
// Frames every page: a sticky top nav, the page content, and the footer.
</script>

<template>
  <div class="site">
    <!-- Animated glowing orbs, fixed behind everything. -->
    <OrbField />
    <SiteNav />
    <main class="site__main">
      <slot />
    </main>
    <SiteFooter />
  </div>
</template>

<style scoped>
.site {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: rgb(var(--fui-theme-background));
  color: rgb(var(--fui-theme-on-surface));
}
/* Content sits above the orb field (z-index 0). The nav is already higher (40). */
.site__main {
  position: relative;
  z-index: 1;
  flex: 1;
}
</style>
