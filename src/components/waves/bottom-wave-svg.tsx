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
      viewBox="0 0 1356 166"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fill={resolvedTheme === 'light' ? '#fafafa' : '#171717'}
        d="M0 0c344.5 0 344.5 110 689 110V0H0z"
      />
      <path
        fill={resolvedTheme === 'light' ? '#fafafa' : '#171717'}
        d="M688 110c334 0 334-110 668-110H688z"
      />
    </svg>
  )
}

export default BottomWaveSvg
