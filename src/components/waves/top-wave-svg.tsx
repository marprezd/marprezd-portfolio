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
        d="M0 96l40 21.3C80 139 160 181 240 170.7c80-10.7 160-74.7 240-64C560 117 640 203 720 240c80 37 160 27 240 0s160-69 240-80 160 11 200 21.3l40 10.7V0H0z"
      />
    </svg>
  )
}

function TopWaveSvg(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
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
        d="M0 96l40 21.3C80 139 160 181 240 170.7c80-10.7 160-74.7 240-64C560 117 640 203 720 240c80 37 160 27 240 0s160-69 240-80 160 11 200 21.3l40 10.7V0H0z"
      />
    </svg>
  )
}

export default TopWaveSvg
