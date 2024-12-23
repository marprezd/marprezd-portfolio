import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import React from 'react'

interface IconWrapperProps {
  className: string
  children: ReactNode
}

export function IconWrapper({ children, className }: IconWrapperProps) {
  return (
    <div className={cn(className, 'flex items-center justify-center')}>
      {children}
    </div>
  )
}
