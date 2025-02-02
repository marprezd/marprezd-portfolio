'use client'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import {
  IconBrandBluesky,
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandStackoverflow,
} from '@tabler/icons-react'
import { ChevronsUpDown } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { IconBrandKaggle } from './icon-brand-kaggle'

// Social Networks data
const socialNavItems = [
  {
    label: 'Bluesky',
    href: 'https://bsky.app/profile/marprezd.bsky.social',
    icon: IconBrandBluesky,
  },
  {
    label: 'Stackoverflow',
    href: 'https://stackoverflow.com.users/11650008/marprezd',
    icon: IconBrandStackoverflow,
  },
  {
    label: 'Github',
    href: 'https://www.github.com/marprezd',
    icon: IconBrandGithub,
  },
  {
    label: 'Linkedin',
    href: 'https://www.linkedin.com/in/maprezd',
    icon: IconBrandLinkedin,
  },
  {
    label: 'Kaggle',
    href: 'https://www.kaggle.com/maprezd',
    icon: IconBrandKaggle,
  },
]

export function NavUser() {
  const { isMobile } = useSidebar()
  const t = useTranslations('app')

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size="lg">
              <Avatar className="size-8 rounded-lg">
                <AvatarImage src="https://res.cloudinary.com/dieoeaoiy/image/upload/bo_0px_solid_rgb:ffffff,c_fill,f_auto,g_face:auto,h_32,o_100,q_auto:best,r_0,w_32/v1662047991/profile_uezzbj.jpg" alt="Mario Pérez" />
                <AvatarFallback className="rounded-lg">MP</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">Mario Pérez</span>
                <span className="truncate text-xs">{t('layouts.app-sidebar.social-networks')}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="size-8 rounded-lg">
                  <AvatarImage src="https://res.cloudinary.com/dieoeaoiy/image/upload/bo_0px_solid_rgb:ffffff,c_fill,f_auto,g_face:auto,h_32,o_100,q_auto:best,r_0,w_32/v1662047991/profile_uezzbj.jpg" alt="Mario Pérez" />
                  <AvatarFallback className="rounded-lg">MP</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Mario Pérez</span>
                  <span className="truncate text-xs">{t('layouts.app-sidebar.social-networks')}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {socialNavItems.map(item => (
                <a
                  key={item.label}
                  href={item.href}
                  rel="noreferrer noopener"
                  target="_blank"
                >
                  <DropdownMenuItem>
                    <item.icon />
                    {item.label}
                  </DropdownMenuItem>
                </a>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
