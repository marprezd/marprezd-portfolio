'use client'

import type { ComponentProps } from 'react'
import { Link } from '@/i18n/routing'
import clsx from 'clsx'
import { useSelectedLayoutSegment } from 'next/navigation'

export default function MegamenuLink({
  href,
  ...rest
}: ComponentProps<typeof Link>) {
  const selectedLayoutSegment = useSelectedLayoutSegment()
  const pathname = selectedLayoutSegment ? `/${selectedLayoutSegment}` : '/'
  const isActive = pathname === href

  return (
    <Link
      aria-current={isActive ? 'page' : undefined}
      className={clsx(
        'flex gap-x-3 rounded-lg p-2 focus:bg-content2 focus:outline-none',
        isActive ? 'bg-primary-100 text-primary-900' : 'text-default-700',
      )}
      href={href}
      {...rest}
    />
  )
}
