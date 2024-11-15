'use client'

import type { ReactNode } from 'react'
import React from 'react'
import { useInView } from 'react-intersection-observer'

interface PostContentProps {
  children: ReactNode
}

export default function PostContent({ children }: PostContentProps) {
  const { ref, inView } = useInView()

  return (
    <div>
      <div ref={ref}>
        <div
          className={`mt-[--_space] lg:flex lg:flex-row-reverse xl:justify-between ${inView ? 'animate-fade animate-delay-[1500ms] animate-duration-[2000ms] animate-once animate-ease-in-out' : 'opacity-0'}}`}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
