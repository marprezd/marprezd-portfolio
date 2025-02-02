'use client'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar'
import { IconFolder } from '@tabler/icons-react'
import { ChevronRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useSelectedLayoutSegment } from 'next/navigation'
import { Suspense } from 'react'
import DefaultLoadingSkeleton from './default-loading-skeleton'
import NavigationLink from './navigation-link'

export function NavMain() {
  const selectedLayoutSegment = useSelectedLayoutSegment()
  const t = useTranslations('app')
  const isActive = true
  const pathname = selectedLayoutSegment ? `/${selectedLayoutSegment}` : '/'
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{t('layouts.app-sidebar.nav.main.labels.sidebar-group')}</SidebarGroupLabel>
      <SidebarMenu>
        <Collapsible asChild defaultOpen={isActive}>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip={t('layouts.app-sidebar.nav.main.labels.sidebar-group')}>
              <a href="#">
                <IconFolder />
                <span>{t('layouts.app-sidebar.nav.main.labels.sidebar-item')}</span>
              </a>
            </SidebarMenuButton>
            <CollapsibleTrigger asChild>
              <SidebarMenuAction className="data-[state=open]:rotate-90">
                <ChevronRight />
                <span className="sr-only">Toggle</span>
              </SidebarMenuAction>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <Suspense fallback={<DefaultLoadingSkeleton />}>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton asChild isActive={pathname === '/'}>
                      <NavigationLink href="/">
                        <span>{t('layouts.app-sidebar.nav.main.items.home')}</span>
                      </NavigationLink>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton asChild isActive={pathname === '/projects'}>
                      <NavigationLink href="/projects">
                        <span>{t('layouts.app-sidebar.nav.main.items.projects')}</span>
                      </NavigationLink>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton asChild isActive={pathname === '/resources'}>
                      <NavigationLink href="/resources">
                        <span>{t('layouts.app-sidebar.nav.main.items.resources')}</span>
                      </NavigationLink>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton asChild isActive={pathname === '/hire-me'}>
                      <NavigationLink href="/hire-me">
                        <span>{t('layouts.app-sidebar.nav.main.items.hire')}</span>
                      </NavigationLink>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton asChild isActive={pathname === '/about-me'}>
                      <NavigationLink href="/about-me">
                        <span>{t('layouts.app-sidebar.nav.main.items.about')}</span>
                      </NavigationLink>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </Suspense>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
      </SidebarMenu>
    </SidebarGroup>
  )
}
