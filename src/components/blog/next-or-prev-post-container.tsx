import type { ReactNode } from 'react'
import React, { Suspense } from 'react'
import DefaultLoadingSkeleton from '../default-loading-skeleton'

interface NextOrPrevPostContainerProps {
  children: ReactNode
}

export default function NextOrPrevPostContainer({ children }: NextOrPrevPostContainerProps) {
  return (
    <Suspense fallback={<DefaultLoadingSkeleton />}>
      <div className="flex items-center justify-center">
        <div className="basis-full">
          {children}
        </div>
      </div>
    </Suspense>
  )
}
