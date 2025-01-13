<script setup lang="ts">
import type { Button } from '@/components/ui/button'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'
/* import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb' */
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { Icon } from '@iconify/vue'
import { SpeedInsights } from '@vercel/speed-insights/vue'
import { useMagicKeys } from '@vueuse/core'
import { ChevronsDownUp } from 'lucide-vue-next'
import { ref, watch } from 'vue'
import Bluesky from '~icons/tabler/brand-bluesky'
import Github from '~icons/tabler/brand-github'
import Linkedin from '~icons/tabler/brand-linkedin'
import Stackoverflow from '~icons/tabler/brand-stackoverflow'
import ChevronRight from '~icons/tabler/chevron-right'
import CircleDotFilled from '~icons/tabler/circle-dot-filled'
import Code from '~icons/tabler/code'
import FolderPlus from '~icons/tabler/folder-plus'
import Language from '~icons/tabler/language'
import SocialNetwork from '~icons/tabler/social'
import UsersGroup from '~icons/tabler/users-group'

// Nuxt i18n
const { locale, locales, setLocale, t } = useI18n()

const availableLocales = computed(() => {
  return locales.value.filter(i => i.code !== locale.value)
})

// Nuxt color mode
const colorMode = useColorMode()

// Social Networks data
const socialNavItems = [
  {
    label: 'Bluesky',
    href: 'https://bsky.app/profile/marprezd.bsky.social',
    icon: Bluesky,
  },
  {
    label: 'Stackoverflow',
    href: 'https://stackoverflow.com.users/11650008/marprezd',
    icon: Stackoverflow,
  },
  {
    label: 'Github',
    href: 'https://www.github.com/marprezd',
    icon: Github,
  },
  {
    label: 'Linkedin',
    href: 'https://www.linkedin.com/in/maprezd',
    icon: Linkedin,
  },
]

const isOpenToJob = ref(true) // Use true/false. True indicates your availability to accept job offers
const isActive = ref(true) // Used by the Collapsible component: SidebarContent -> SidebarGroup -> SidebarMenu -> Collapsible

// Important: Command/search component
const open = ref(false)

const { Meta_L, Ctrl_L } = useMagicKeys({
  passive: false,
  onEventFired(e) {
    if (e.key === 'l' && (e.metaKey || e.ctrlKey))
      e.preventDefault()
  },
})

watch([Meta_L, Ctrl_L], (v) => {
  if (v[0] || v[1])
    handleOpenChange()
})

function handleOpenChange() {
  open.value = !open.value
}
</script>

<template>
  <div>
    <!-- SidebarProvider - Handles collapsible state. -->
    <SidebarProvider>
      <!-- Sidebar - The sidebar container. -->
      <Sidebar collapsible="icon">
        <!-- SidebarHeader - Sticky at the top of the sidebar. -->
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger as-child>
                  <SidebarMenuButton
                    size="lg"
                    class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  >
                    <Avatar class="size-8 rounded-lg">
                      <AvatarImage src="/images/profile/marprez.jpg" alt="Mario Pérez" />
                      <AvatarFallback class="rounded-lg">
                        MP
                      </AvatarFallback>
                    </Avatar>
                    <div class="grid flex-1 text-left text-sm leading-tight">
                      <span class="truncate font-semibold">Mario Pérez</span>
                      <span class="truncate text-xs">{{ t('site.layout.users.title') }}</span>
                    </div>
                    <ChevronsDownUp class="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  class="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                  align="start"
                  side="bottom"
                  :side-offset="4"
                >
                  <DropdownMenuLabel class="text-xs text-muted-foreground">
                    {{ t('site.layout.users.availability-to-job.label') }}
                  </DropdownMenuLabel>
                  <DropdownMenuItem class="gap-2 p-2">
                    <Avatar class="size-6 rounded-sm">
                      <AvatarImage src="/images/profile/marprez.jpg" alt="Mario Pérez" />
                      <AvatarFallback class="rounded-lg">
                        MP
                      </AvatarFallback>
                    </Avatar>
                    Mario Pérez
                    <DropdownMenuShortcut>
                      <CircleDotFilled :class="(isOpenToJob) ? 'text-green-600 dark:text-green-400' : 'text-orange-600 dark:text-orange-400'" />
                    </DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <div class="my-2 px-2 text-xs">
                    <span v-if="isOpenToJob">{{ t('site.layout.users.availability-to-job.is-open') }}</span>
                    <span v-else>{{ t('site.layout.users.availability-to-job.is-busy') }}</span>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <!-- SidebarContent - Scrollable content. -->
        <SidebarContent>
          <!-- SidebarGroup - Main Navigation Section. -->
          <SidebarGroup>
            <SidebarGroupLabel>{{ t('site.layout.nav.main.labels.sidebar-group') }}</SidebarGroupLabel>
            <SidebarMenu>
              <Collapsible
                as-child
                :default-open="isActive"
                class="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger as-child>
                    <SidebarMenuButton :tooltip="t('site.layout.nav.main.labels.sidebar-item')">
                      <component :is="FolderPlus" />
                      <span>{{ t('site.layout.nav.main.labels.sidebar-item') }}</span>
                      <ChevronRight class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton as-child>
                          <NuxtLinkLocale
                            to="/"
                            :locale="locale"
                            active-class="text-green-700 dark:text-green-400 font-medium"
                            class="hover:text-green-500 dark:hover:text-green-400"
                          >
                            <span>{{ t('site.layout.nav.main.items.home') }}</span>
                          </NuxtLinkLocale>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton as-child>
                          <NuxtLinkLocale
                            to="/projects"
                            :locale="locale"
                            active-class="text-green-700 dark:text-green-400 font-medium"
                            class="hover:text-green-500 dark:hover:text-green-400"
                          >
                            <span>{{ t('site.layout.nav.main.items.projects') }}</span>
                          </NuxtLinkLocale>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton as-child>
                          <NuxtLinkLocale
                            to="/resources"
                            :locale="locale"
                            active-class="text-green-700 dark:text-green-400 font-medium"
                            class="hover:text-green-500 dark:hover:text-green-400"
                          >
                            <span>{{ t('site.layout.nav.main.items.resources') }}</span>
                          </NuxtLinkLocale>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton as-child>
                          <NuxtLinkLocale
                            to="/about"
                            :locale="locale"
                            active-class="text-green-700 dark:text-green-400 font-medium"
                            class="hover:text-green-500 dark:hover:text-green-400"
                          >
                            <span>{{ t('site.layout.nav.main.items.about') }}</span>
                          </NuxtLinkLocale>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton as-child>
                          <NuxtLinkLocale
                            to="/hire"
                            :locale="locale"
                            active-class="text-green-700 dark:text-green-400 font-medium"
                            class="hover:text-green-500 dark:hover:text-green-400"
                          >
                            <span>{{ t('site.layout.nav.main.items.hire') }}</span>
                          </NuxtLinkLocale>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
          </SidebarGroup>
          <!-- SidebarGroup - Tutorial Navigation Section. -->
          <SidebarGroup>
            <SidebarGroupLabel>{{ t('site.layout.nav.tutorials.labels.sidebar-group') }}</SidebarGroupLabel>
            <SidebarMenu>
              <Collapsible
                as-child
                :default-open="!isActive"
                class="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger as-child>
                    <SidebarMenuButton :tooltip="t('site.layout.nav.tutorials.labels.sidebar-item')">
                      <component :is="Code" />
                      <span>{{ t('site.layout.nav.tutorials.labels.sidebar-item') }}</span>
                      <ChevronRight class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton as-child>
                          <NuxtLinkLocale
                            to="/courses"
                            :locale="locale"
                            active-class="text-green-700 dark:text-green-400 font-medium"
                            class="hover:text-green-500 dark:hover:text-green-400"
                          >
                            <span>{{ t('site.layout.nav.tutorials.items.courses') }}</span>
                          </NuxtLinkLocale>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton as-child>
                          <NuxtLinkLocale
                            to="/blog"
                            :locale="locale"
                            active-class="text-green-700 dark:text-green-400 font-medium" class="hover:text-green-500 dark:hover:text-green-400"
                          >
                            <span>{{ t('site.layout.nav.tutorials.items.blog') }}</span>
                          </NuxtLinkLocale>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
          </SidebarGroup>
          <!-- SidebarGroup - Communities Navigation Section. -->
          <SidebarGroup>
            <SidebarGroupLabel>{{ t('site.layout.nav.communities.labels.sidebar-group') }}</SidebarGroupLabel>
            <SidebarMenu>
              <Collapsible
                as-child
                :default-open="!isActive"
                class="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger as-child>
                    <SidebarMenuButton :tooltip="t('site.layout.nav.communities.labels.sidebar-item')">
                      <component :is="UsersGroup" />
                      <span>{{ t('site.layout.nav.communities.labels.sidebar-item') }}</span>
                      <ChevronRight class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton as-child>
                          <NuxtLinkLocale
                            to="/guest-book"
                            :locale="locale"
                            active-class="text-green-700 dark:text-green-400 font-medium"
                            class="hover:text-green-500 dark:hover:text-green-400"
                          >
                            <span>{{ t('site.layout.nav.communities.items.guest-book') }}</span>
                          </NuxtLinkLocale>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton as-child>
                          <NuxtLink
                            href="https://marprezd.substack.com/?r=3lz4aj&utm_campaign=pub-share-checklist"
                            class="hover:text-green-500 dark:hover:text-green-400"
                          >
                            <span>Substack</span>
                          </NuxtLink>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <!-- SidebarFooter - Sticky at the bottom of the sidebar. -->
        <SidebarFooter>
          <SidebarMenu>
            <!-- Social networks -->
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger as-child>
                  <SidebarMenuButton
                    size="lg"
                    class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  >
                    <div class="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-6 items-center justify-center rounded-lg text-green-600 dark:text-green-400">
                      <component :is="SocialNetwork" class="size-8" />
                    </div>
                    <div class="grid flex-1 text-left text-sm leading-tight">
                      <span class="truncate font-semibold">marprezd</span>
                      <span class="truncate text-xs">{{ t('site.layout.social-networks') }}</span>
                    </div>
                    <ChevronsDownUp class="ml-auto size-4" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent class="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg" side="bottom" align="end" :side-offset="4">
                  <DropdownMenuLabel class="p-0 font-normal">
                    <div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                      <div class="bg-sidebar-primary flex aspect-square size-6 items-center justify-center rounded-lg text-green-600 dark:text-green-400">
                        <component :is="SocialNetwork" class="size-8" />
                      </div>
                      <div class="grid flex-1 text-left text-sm leading-tight">
                        <span class="truncate font-semibold">marprezd</span>
                        <span class="truncate text-xs">{{ t('site.layout.social-networks') }}</span>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <NuxtLink
                      v-for="network in socialNavItems"
                      :key="network.label"
                      :to="network.href"
                      target="_blank"
                    >
                      <DropdownMenuItem>
                        <component :is="network.icon" />
                        {{ network.label }}
                      </DropdownMenuItem>
                    </NuxtLink>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header class="flex h-16 shrink-0 items-center justify-between gap-2 border-b pr-0 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 lg:pr-4">
          <div class="flex items-center gap-2 px-4">
            <!-- SidebarTrigger - Trigger for the Sidebar. -->
            <SidebarTrigger class="-ml-1" />
            <Separator orientation="vertical" class="mr-2 h-4" />
            <!-- Command component: search posts -->
            <div>
              <Button variant="outline">
                {{ t('site.layout.search.label') }}
                <kbd
                  class="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded-sm border bg-muted px-1.5 font-mono text-sm font-medium text-muted-foreground opacity-100"
                >
                  <span class="text-sm">⌘</span>L
                </kbd>
              </Button>
              <CommandDialog v-model:open="open">
                <CommandInput :placeholder="t('site.layout.search.placeholder')" />
                <CommandList>
                  <CommandEmpty>{{ t('site.layout.search.not-result') }}</CommandEmpty>
                  <CommandGroup heading="Suggestions">
                    <CommandItem value="calendar">
                      Calendar
                    </CommandItem>
                  </CommandGroup>
                  <CommandSeparator />
                  <CommandGroup heading="Settings">
                    <CommandItem value="profile">
                      Profile
                    </CommandItem>
                  </CommandGroup>
                </CommandList>
              </CommandDialog>
            </div>
          </div>
          <!-- Locales (available languages) and toggle theme component -->
          <div class="flex items-center gap-2 px-4">
            <DropdownMenu>
              <DropdownMenuTrigger as-child>
                <Button variant="secondary" size="icon" class="rounded-lg">
                  <Language class="size-5" />
                  <span class="sr-only">Toggle available languages</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{{ t('site.layout.available-languages') }}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <NuxtLink
                  v-for="availableLocale in availableLocales"
                  :key="availableLocale.code"
                  href="#"
                  @click.prevent.stop="setLocale(availableLocale.code)"
                >
                  <DropdownMenuItem>
                    {{ availableLocale.name }}
                  </DropdownMenuItem>
                </NuxtLink>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger as-child>
                <Button variant="secondary" size="icon" class="rounded-lg">
                  <Icon icon="tabler:moon-stars" class="size-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Icon icon="tabler:sun" class="absolute size-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span class="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{{ t('site.layout.color-mode.label') }}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem @click="colorMode.preference = 'light'">
                  {{ t('site.layout.color-mode.light') }}
                </DropdownMenuItem>
                <DropdownMenuItem @click="colorMode.preference = 'dark'">
                  {{ t('site.layout.color-mode.dark') }}
                </DropdownMenuItem>
                <DropdownMenuItem @click="colorMode.preference = 'system'">
                  {{ t('site.layout.color-mode.system') }}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <!-- Main content -->
        <main class="mt-4 flex flex-1 flex-col gap-4 p-4 pt-0">
          <slot />
        </main>
      </SidebarInset>
    </SidebarProvider>
    <!-- Vercel Speed Insights -->
    <SpeedInsights />
  </div>
</template>

<style scoped></style>
