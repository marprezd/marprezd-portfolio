'use client'

import { NavMain } from '@/layouts/components/nav-main'
import { NavTutorials } from '@/layouts/components/nav-tutorials'
import { NavUser } from '@/layouts/components/nav-user'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/layouts/components/ui/avatar'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/layouts/components/ui/sidebar'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import * as React from 'react'
import { NavCommunities } from './nav-communities'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const t = useTranslations('app')
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Avatar className="size-8 rounded-lg">
                    <AvatarImage src="https://res.cloudinary.com/dieoeaoiy/image/upload/bo_0px_solid_rgb:ffffff,c_fill,f_auto,g_face:auto,h_32,o_100,q_auto:best,r_0,w_32/v1662047991/profile_uezzbj.jpg" alt="Mario Pérez" />
                    <AvatarFallback className="rounded-lg">MP</AvatarFallback>
                  </Avatar>
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">MARPREZD</span>
                  <span className="truncate text-xs">{t('layouts.app-sidebar.user-title')}</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="[&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-thumb]:bg-slate-500
  [&::-webkit-scrollbar-track]:bg-gray-100
  dark:[&::-webkit-scrollbar-track]:bg-slate-700
  [&::-webkit-scrollbar]:w-2"
      >
        <NavMain />
        <NavTutorials />
        <NavCommunities />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
