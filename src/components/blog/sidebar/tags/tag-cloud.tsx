'use client'

import type { Locale } from '@/i18n/routing'
import { capitalizeFirstLetter, cn, slugify } from '@/lib/utils'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React from 'react'

interface TagCloudProps {
  tag: string
  count?: number
  current?: boolean
}
export default function TagCloud({ tag, count, current }: TagCloudProps) {
  const locale = useParams()?.locale as Locale

  return (
    <Link className="inline-flex items-center gap-x-1.5 dark:bg-neutral-500/20 px-3 py-1.5 border border-neutral-300 dark:border-neutral-500 rounded-full font-medium text-neutral-800 dark:text-neutral-300 text-xs" href={`/${locale}/blog/tags/${slugify(tag)}`}>
      {capitalizeFirstLetter(tag)}
      <span className={`inline-block items-center rounded-full px-1.5 py-0.5 text-xs font-medium ${cn(current ? 'bg-primary text-primary-foreground' : 'bg-gray-500 text-white dark:bg-gray-300 dark:text-gray-950')}`}>
        {count ? `${count}` : 0}
      </span>
    </Link>
  )
}
