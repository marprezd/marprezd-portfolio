'use client'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { humanize } from '@/lib/utils'
import { useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'
import React from 'react'

function Breadcrumbs() {
  const pathname = usePathname()
  const t = useTranslations('app')

  const paths = pathname.split('/').filter(x => x)
  // paths.shift()
  const parts = [
    {
      'label': t('layouts.app-sidebar.nav.main.items.home'),
      'href': '/',
      'aria-label': pathname === '/' ? 'page' : undefined,
    },
  ]

  paths.forEach((label: string, i: number) => {
    const href = `/${paths.slice(0, i + 1).join('/')}`
    if (label !== 'page') {
      parts.push({
        'label': humanize(label.replace(/[-_]/g, ' ')).toLowerCase() || '',
        href,
        'aria-label': pathname === href ? 'page' : undefined,
      })
    }
  })

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {parts.map(({ label, ...attrs }, index) => (
          <React.Fragment key={label}>
            {index > 0 && <BreadcrumbSeparator />}
            <BreadcrumbItem key={label}>
              {index !== parts.length - 1
                ? (
                    <BreadcrumbLink {...attrs}>
                      {label}
                    </BreadcrumbLink>
                  )
                : (
                    <BreadcrumbPage>
                      {label}
                    </BreadcrumbPage>
                  )}
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export default Breadcrumbs
