'use client'

import type { Locale } from '@/i18n/routing'
import { capitalizeFirstLetter, cn, slugify } from '@/lib/utils'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React from 'react'

interface CategoryCloudProps {
  category: string
  count?: number
  current?: boolean
}

export default function CategoryCloud({ category, count, current }: CategoryCloudProps) {
  const locale = useParams()?.locale as Locale

  return (
    <Link className="inline-flex items-center gap-x-2 rounded-lg border border-border bg-white px-3 py-1.5 text-sm font-medium text-gray-800 hover:opacity-80 dark:bg-gray-900 dark:text-white" href={`/${locale}/blog/categories/${slugify(category)}`}>
      {capitalizeFirstLetter(category)}
      <span className={`inline-flex items-center rounded-full px-1.5 py-0.5 text-xs font-medium ${cn(current ? 'bg-primary text-primary-foreground' : 'bg-gray-500 text-white dark:bg-gray-300 dark:text-gray-950')}`}>
        {count ? `${count}` : 0}
      </span>
    </Link>
  )
}
