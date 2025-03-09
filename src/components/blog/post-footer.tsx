import type { ReactNode } from 'react'
import React, { Suspense } from 'react'
import DefaultLoadingSkeleton from '../default-loading-skeleton'

interface PostFooterProps {
  children: ReactNode
}
export default function PostFooter({ children }: PostFooterProps) {
  return (
    <Suspense fallback={<DefaultLoadingSkeleton />}>
      <footer className="flex w-full py-5 lg:py-10">
        {children}
      </footer>
    </Suspense>
  )
}
