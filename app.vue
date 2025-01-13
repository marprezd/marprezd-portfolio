<script setup lang="ts">
import { Analytics } from '@vercel/analytics/nuxt'

const { finalizePendingLocaleChange } = useI18n()
async function onBeforeEnter() {
  await finalizePendingLocaleChange()
}
</script>

<template>
  <NuxtLayout>
    <Analytics />
    <NuxtPage
      :transition="{
        name: 'page',
        mode: 'out-in',
        onBeforeEnter,
      }"
    />
  </NuxtLayout>
</template>

<style lang="css">
.page-enter-active,
.page-leave-active {
  transition: all 0.4s ease-in-out;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
