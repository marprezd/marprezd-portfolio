'use client'

import dynamic from 'next/dynamic'
import React from 'react'
import { useInView } from 'react-intersection-observer'

export default function Sidebar() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  })
  const CategorySidebarComponent = dynamic(
    () => import('./categories'),
    {
      ssr: false,
    },
  )
  const TagSidebarComponent = dynamic(
    () => import('./tags'),
    {
      ssr: false,
    },
  )
  return (
    <div className="space-y-4">
      <div ref={ref}>
        {inView && (
          <CategorySidebarComponent />
        )}
      </div>
      <div ref={ref}>
        {inView && (
          <TagSidebarComponent />
        )}
      </div>
    </div>
  )
}
