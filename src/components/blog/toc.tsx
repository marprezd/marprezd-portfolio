'use client'

import type { Post } from '#site/content'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn, isArrayNotEmpty } from '@/lib/utils'
import { IconChevronRight } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'
import Link from '../mdx/link'

interface TocProps {
  className?: string
  toc: Post['toc']
}

export function TocMobile({ className, toc }: TocProps) {
  const t = useTranslations('app')

  if (!isArrayNotEmpty(toc))
    return null

  return (
    <aside className={cn('my-0', className)}>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex flex-row justify-between items-center px-2.5 py-3 border w-full [&>svg]:text-xs text-sm data-[state=open]:[&>svg]:rotate-90">
          <span>{t('blog.toc.label')}</span>
          <IconChevronRight size="16" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <nav className="min-w-[50vw] max-h-[50vh] overflow-y-auto">
            <ul>
              {toc.map(item => (
                <li key={item.title}>
                  <DropdownMenuItem key={item.title} asChild>
                    <Link
                      className="block p-2 hover:outline-hidden w-full"
                      href={item.url}
                    >
                      {item.title}
                    </Link>
                  </DropdownMenuItem>
                </li>
              ))}
            </ul>
          </nav>
        </DropdownMenuContent>
      </DropdownMenu>
    </aside>
  )
}

function TocDesktop({ toc, className }: TocProps) {
  const [hash, setHash] = useState('')
  const allAnchorLinksRef = useRef<NodeListOf<HTMLElement>>(undefined)
  const observerRef = useRef<IntersectionObserver>(undefined)
  const t = useTranslations('app')

  useEffect(() => {
    allAnchorLinksRef.current = document.querySelectorAll('h2[id]')
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting)
            setHash(entry.target.id)
        })
      },
      { rootMargin: '0px 0px -70% 0px' },
    )
    allAnchorLinksRef.current.forEach(e => observerRef.current?.observe(e))

    return () => {
      observerRef.current?.disconnect()
    }
  }, [])

  if (!toc.length)
    return null

  return (
    <aside className={className}>
      <nav>
        <h2 className="pb-4 font-bold tracking-wide">{t('blog.toc.label')}</h2>
        <ul className={cn('max-lg:shadow-md bg-transparent p-0')}>
          {toc.map(item => (
            <li key={item.title}>
              <Link
                className={cn(
                  'block p-2 text-sm text-(--color-body) hover:text-primary px-4 py-2',
                  'border-l-2 border-l-border',
                  '[&.active]:border-l-primary [&.active]:text-primary [&.active]:bg-white dark:[&.active]:bg-gray-900 [&.active]:font-medium',
                  `#${hash}` === item.url && 'active',
                )}
                href={item.url}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

export default TocDesktop
