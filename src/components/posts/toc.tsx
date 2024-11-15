'use client'

import type { Post } from '#site/content'
import { cn, isArrayNotEmpty } from '@/lib/utils'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { IconChevronRight } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'
import Link from '../mdx/link'

interface TocProps {
  className?: string
  toc: Post['toc']
}

export function TocMobile({ className, toc }: TocProps) {
  const t = useTranslations('site')

  if (!isArrayNotEmpty(toc))
    return null

  return (
    <aside className={cn('my-6', className)}>
      <DropdownMenu.Root modal={false}>
        <DropdownMenu.Trigger
          className={cn(
            'inline-flex gap-2 items-center text-sm text-[--color-body]',
            'bg-[--color-toc-button-bg] border border-gray-300 dark:border-gray-700 w-full',
            'py-2 pr-[0.5em] pl-[1em] rounded-lg font-medium',
            '[&>svg]:data-[state=open]:rotate-90 [&>svg]:text-xs',
          )}
        >
          <span>{t('posts.toc.label')}</span>
          <IconChevronRight />
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            loop
            align="start"
            avoidCollisions={false}
            className={cn(
              'w-[calc(var(--radix-dropdown-menu-content-available-width)-var(--px-padding))]',
              'lg:w-fit xl:hidden',
              'data-[state=open]:animate-slide-up-fade',
              'data-[state=closed]:animate-slide-down-fade',
            )}
            sideOffset={10}
            // don't autofocus back to the trigger when clicked
            onCloseAutoFocus={(e: { preventDefault: () => any }) => e.preventDefault()}
          >
            <nav
              className={cn(
                'bg-[--color-toc-button-bg] text-[--color-body]',
                'border rounded-md p-4',
                'min-w-[50vw] max-h-[50vh] overflow-y-auto',
                'max-xl:shadow-md',
              )}
            >
              <ul>
                {toc.map(item => (
                  <li key={item.title} className="hover:text-primary">
                    <DropdownMenu.Item key={item.title} asChild>
                      <Link
                        className="block p-2 hover:outline-none"
                        href={item.url}
                      >
                        {item.title}
                      </Link>
                    </DropdownMenu.Item>
                  </li>
                ))}
              </ul>
            </nav>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </aside>
  )
}

function TocDesktop({ toc, className }: TocProps) {
  const [hash, setHash] = useState('')
  const allAnchorLinksRef = useRef<NodeListOf<HTMLElement>>()
  const observerRef = useRef<IntersectionObserver>()
  const t = useTranslations('site')

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
      <nav className="pl-8">
        <h2 className="pb-4 text-2xl font-light tracking-tighter">{t('posts.toc.label')}</h2>
        <ul className={cn('max-lg:shadow-md bg-transparent p-0')}>
          {toc.map(item => (
            <li key={item.title}>
              <Link
                className={cn(
                  'block p-2 text-sm text-[--color-body] hover:text-primary px-4 py-2',
                  'border-l-2 border-l-gray-200 dark:border-l-gray-800',
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
