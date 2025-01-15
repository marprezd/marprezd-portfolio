<script setup lang="ts">
import { useSidebar } from './ui/sidebar/utils'

defineProps<{
  href: string
}>()

// Nuxt i18n
const { locale } = useI18n()
const { setOpenMobile } = useSidebar()
</script>

<template>
  <NuxtLinkLocale
    :to="href"
    :locale="locale"
    active-class="!text-green-700 dark:text-green-400"
    @click="setOpenMobile(false)"
  >
    <slot />
  </NuxtLinkLocale>
</template>
