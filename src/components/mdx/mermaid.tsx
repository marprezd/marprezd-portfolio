'use client'

import type { JSX } from 'react'
import mermaid from 'mermaid'
import { useTheme } from 'next-themes'
import React, { useEffect } from 'react'

interface MermaidProps {
  readonly chart: string
}

export default function Mermaid({ chart }: MermaidProps): JSX.Element {
  const { resolvedTheme } = useTheme()

  mermaid.initialize({
    startOnLoad: true,
    theme: `${resolvedTheme === 'light' ? 'default' : 'dark'}`,
  })

  useEffect(() => {
    mermaid.contentLoaded()
  }, [])

  return (
    <div className="py-4">
      {chart}
    </div>
  )
}
