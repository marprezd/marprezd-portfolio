import type { ReactNode } from 'react'
import React from 'react'

interface SectionProps {
  children: ReactNode
}

export default function Section({ children }: SectionProps) {
  return (
    <section className="mx-auto flex max-w-5xl flex-col space-y-4 py-5 lg:py-10">
      {children}
    </section>
  )
}
