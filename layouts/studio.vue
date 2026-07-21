<script setup lang="ts">
// Keep the admin area out of search engines entirely.
useHead({
  meta: [{ name: 'robots', content: 'noindex, nofollow' }],
  title: 'Studio — rukkiecodes',
})
</script>

<template>
  <div class="studio">
    <slot />
  </div>
</template>

<style scoped>
.studio {
  min-height: 100vh;
  background: rgb(var(--fui-theme-background, 12 12 14));
  color: rgba(var(--fui-theme-on-surface), 0.9);
  display: flex;
  flex-direction: column;
}
</style>
