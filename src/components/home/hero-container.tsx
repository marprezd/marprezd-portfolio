'use client'

import dynamic from 'next/dynamic'
import React from 'react'
import DefaultLoadingSkeleton from '../default-loading-skeleton'

function Loading() {
  return <DefaultLoadingSkeleton />
}

export default function HeroContainer() {
  const LazyHeroComponent = dynamic(
    () => import('./hero'),
    {
      loading: () => <Loading />,
      ssr: false,
    },
  )
  return (
    <div>
      <section className="mx-auto flex min-h-[80dvh] max-w-4xl flex-col items-center justify-center sm:px-6 lg:px-8">
        <LazyHeroComponent />
      </section>
    </div>
  )
}
