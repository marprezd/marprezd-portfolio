'use client'

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { IconNotebook, IconUsersGroup } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'
import { useSelectedLayoutSegment } from 'next/navigation'
import NavigationLink from './navigation-link'
import { useSidebar } from './ui/sidebar'

export function NavCommunities() {
  const selectedLayoutSegment = useSelectedLayoutSegment()
  const t = useTranslations('app')
  const { setOpenMobile } = useSidebar()
  const pathname = selectedLayoutSegment ? `/${selectedLayoutSegment}` : '/'

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>{t('layouts.app-sidebar.nav.communities.labels.sidebar-group')}</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton asChild isActive={pathname === '/guest-book'}>
            <NavigationLink href="/guest-book">
              <IconNotebook />
              <span>{t('layouts.app-sidebar.nav.communities.items.guest-book')}</span>
            </NavigationLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <a
              href="https://marprezd.substack.com/?r=3lz4aj&utm_campaign=pub-share-checklist"
              target="_blank"
              onClick={() => setOpenMobile(false)}
              rel="noreferrer noopener"
            >
              <IconUsersGroup />
              <span>Substack</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}
