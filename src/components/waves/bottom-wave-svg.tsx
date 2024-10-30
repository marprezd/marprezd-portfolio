'use client'

import { useTheme } from 'next-themes'
import React from 'react'

function Loading() {
  return (
    <svg
      viewBox="0 0 1440 54"
      xmlns="http://www.w3.org/2000/svg"
      className="bg-transparent"
    />
  )
}

function BottomWaveSvg(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <Loading />
  }

  return (
    <svg
      className="absolute top-0 -mt-5 h-6 w-full sm:-mt-10 sm:h-16"
      preserveAspectRatio="none"
      viewBox="0 0 1440 54"
      {...props}
    >
      <defs>
        <linearGradient
          id="gradient-fill"
        >
          <stop offset={0} stopColor={resolvedTheme === 'light' ? '#ecfeff' : '#164e63'} />
          <stop offset={0.09090909090909091} stopColor={resolvedTheme === 'light' ? '#e7fdff' : '#13495d'} />
          <stop offset={0.18181818181818182} stopColor={resolvedTheme === 'light' ? '#e2fdfe' : '#114458'} />
          <stop offset={0.2727272727272727} stopColor={resolvedTheme === 'light' ? '#dcfcfe' : '#0e3f52'} />
          <stop offset={0.36363636363636365} stopColor={resolvedTheme === 'light' ? '#d7fbfe' : '#0c3a4c'} />
          <stop offset={0.45454545454545453} stopColor={resolvedTheme === 'light' ? '#d2fafe' : '#093547'} />
          <stop offset={0.5454545454545454} stopColor={resolvedTheme === 'light' ? '#d2fafe' : '#093547'} />
          <stop offset={0.6363636363636364} stopColor={resolvedTheme === 'light' ? '#d7fbfe' : '#0c3a4c'} />
          <stop offset={0.7272727272727273} stopColor={resolvedTheme === 'light' ? '#dcfcfe' : '#0e3f52'} />
          <stop offset={0.8181818181818182} stopColor={resolvedTheme === 'light' ? '#e2fdfe' : '#114458'} />
          <stop offset={0.9090909090909091} stopColor={resolvedTheme === 'light' ? '#e7fdff' : '#13495d'} />
          <stop offset={1} stopColor={resolvedTheme === 'light' ? '#ecfeff' : '#164e63'} />
        </linearGradient>
      </defs>
      <path
        fill="url(#gradient-fill)"
        className="transition-all duration-500 ease-in-out"
        d="M0 22L120 16.7C240 11 480 1.00001 720 0.700012C960 1.00001 1200 11 1320 16.7L1440 22V54H1320C1200 54 960 54 720 54C480 54 240 54 120 54H0V22Z"
      />
    </svg>
  )
}

export default BottomWaveSvg
