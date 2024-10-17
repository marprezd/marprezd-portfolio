'use client'

import { useTheme } from 'next-themes'
import React from 'react'

function Loading() {
  return (
    <svg
      viewBox="0 0 1440 320"
      xmlns="http://www.w3.org/2000/svg"
      className="bg-transparent"
    >
      <path
        fill="#fff"
        fillOpacity="0.0"
        opacity="0.0"
        d="M0 160l40 26.7C80 213 160 267 240 245.3 320 224 400 128 480 106.7 560 85 640 139 720 176s160 59 240 53.3c80-5.3 160-37.3 240-37.3s160 32 200 48l40 16v64H0z"
      />
    </svg>
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
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" {...props}>
      <path
        fill={resolvedTheme === 'light' ? '#d4f7ff' : '#00363e'}
        d="M0 160l40 26.7C80 213 160 267 240 245.3 320 224 400 128 480 106.7 560 85 640 139 720 176s160 59 240 53.3c80-5.3 160-37.3 240-37.3s160 32 200 48l40 16v64H0z"
      />
    </svg>
  )
}

export default BottomWaveSvg
