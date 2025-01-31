'use client'

import dynamic from 'next/dynamic'
import React from 'react'
import { useInView } from 'react-intersection-observer'

export default function QuickSummaryContainer() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  })
  const LazyQuickSummaryComponent = dynamic(
    () => import('./quick-summary'),
    {
      ssr: false,
    },
  )
  return (
    <section ref={ref}>
      {inView && <LazyQuickSummaryComponent />}
    </section>
  )
}
