'use client'

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/layouts/components/ui/sidebar'
import { IconArticle, IconVideo } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'
import { Suspense } from 'react'
import DefaultLoadingSkeleton from './default-loading-skeleton'
import NavigationLink from './navigation-link'

export function NavTutorials() {
  const t = useTranslations('app')
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>{t('layouts.app-sidebar.nav.tutorials.labels.sidebar-group')}</SidebarGroupLabel>
      <Suspense fallback={<DefaultLoadingSkeleton />}>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavigationLink href="/courses">
                <IconVideo />
                <span>{t('layouts.app-sidebar.nav.tutorials.items.courses')}</span>
              </NavigationLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavigationLink href="/blog">
                <IconArticle />
                <span>{t('layouts.app-sidebar.nav.tutorials.items.blog')}</span>
              </NavigationLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </Suspense>
    </SidebarGroup>
  )
}
