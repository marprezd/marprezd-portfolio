import type { ReactNode } from 'react'
import { useTranslations } from 'next-intl'
import React, { Suspense } from 'react'
import Animation from '../animation'
import DefaultLoadingSkeleton from '../default-loading-skeleton'
import { Separator } from '../ui/separator'

interface PostContentProps {
  children: ReactNode
}

export default function PostContent({ children }: PostContentProps) {
  const t = useTranslations('app')

  return (
    <Suspense fallback={<DefaultLoadingSkeleton />}>
      <Animation>
        <div className="flex items-center py-3 text-sm text-gray-800 before:me-6 before:flex-1 before:border-t before:border-border after:ms-6 after:flex-1 after:border-t after:border-border dark:text-white">
          {t('blog.hr-label')}
        </div>
        <div
          className="gap-8 py-5 lg:flex lg:flex-row-reverse lg:py-10 xl:justify-between"
        >
          {children}
        </div>
        <Separator className="my-3" />
      </Animation>
    </Suspense>
  )
}
