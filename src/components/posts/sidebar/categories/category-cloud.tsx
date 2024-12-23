'use client'

import type { Locale } from '@/i18n/routing'
import { capitalizeFirstLetter, cn, slugify } from '@/lib/utils'
import { Chip } from '@nextui-org/chip'
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
    <Chip className={cn(current ? 'bg-light-primaryContainer dark:bg-dark-primaryContainer text-light-onPrimaryContainer dark:text-dark-onPrimaryContainer' : 'bg-default-200')} variant="solid">
      <Link href={`/${locale}/blog/categories/${slugify(category)}`}>
        {capitalizeFirstLetter(category)}
        <span className={`ms-3 inline-flex size-3 items-center justify-center rounded-full p-2.5 text-xs font-medium ${cn(current ? 'bg-palettes-primary-30 text-white dark:bg-palettes-primary-90 dark:text-palettes-primary-20' : 'bg-default-400')}`}>
          {count ? `${count}` : 0}
        </span>
      </Link>
    </Chip>
  )
}
