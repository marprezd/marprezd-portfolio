'use client'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/layouts/components/ui/collapsible'

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
} from '@/layouts/components/ui/sidebar'
import { IconFolder } from '@tabler/icons-react'
import { ChevronRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import NavigationLink from './navigation-link'

export function NavMain() {
  const t = useTranslations('app')
  const isActive = true
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
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <NavigationLink href="/">
                      <span>{t('layouts.app-sidebar.nav.main.items.home')}</span>
                    </NavigationLink>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <NavigationLink href="/projects">
                      <span>{t('layouts.app-sidebar.nav.main.items.projects')}</span>
                    </NavigationLink>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <NavigationLink href="/resources">
                      <span>{t('layouts.app-sidebar.nav.main.items.resources')}</span>
                    </NavigationLink>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <NavigationLink href="/hire-me">
                      <span>{t('layouts.app-sidebar.nav.main.items.hire')}</span>
                    </NavigationLink>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <NavigationLink href="/about-me">
                      <span>{t('layouts.app-sidebar.nav.main.items.about')}</span>
                    </NavigationLink>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
      </SidebarMenu>
    </SidebarGroup>
  )
}
