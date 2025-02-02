'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Moon, Sun } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'
import * as React from 'react'

export function ModeToggle() {
  const { setTheme } = useTheme()
  const t = useTranslations('app')
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="size-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute size-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{ t('layouts.app-sidebar.color-mode.label') }</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => setTheme('light')}>
          { t('layouts.app-sidebar.color-mode.light') }
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          { t('layouts.app-sidebar.color-mode.dark') }
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          { t('layouts.app-sidebar.color-mode.system') }
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
