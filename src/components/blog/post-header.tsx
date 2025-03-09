import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import React, { Suspense } from 'react'
import DefaultLoadingSkeleton from '../default-loading-skeleton'

interface PostHeaderProps {
  children: ReactNode
}
export default function PostHeader({ children }: PostHeaderProps) {
  return (
    <Suspense fallback={<DefaultLoadingSkeleton />}>
      <header className={cn(
        'flex flex-col-reverse gap-8 w-full py-5 lg:py-10',
        'lg:flex-row [&>*]:flex-1',
      )}
      >
        {children}
      </header>
    </Suspense>
  )
}
