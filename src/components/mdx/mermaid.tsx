'use client'

import mermaid from 'mermaid'
import { useTheme } from 'next-themes'
import Script from 'next/script'
import React, { type JSX, useEffect } from 'react'
// import Zoomist styles
// import 'zoomist/css'

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
    <>
      <div className="zoomist-container">
        <div className="zoomist-wrapper">
          <div className="zoomist-image mermaid">
            {chart}
          </div>
        </div>
      </div>
      <Script id="get-zoomist" src="https://cdn.jsdelivr.net/npm/zoomist@2/zoomist.umd.js" strategy="afterInteractive" type="module" />
      <Script id="new-zoomist" strategy="afterInteractive">
        {`
        document.addEventListener('DOMContentLoaded', function() {
          const zoomist = new Zoomist('.zoomist-container', {
            zoomer: true
          })
        });
      `}
      </Script>
    </>
  )
}
