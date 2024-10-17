'use client'

import type { Pathnames } from '@/i18n/routing'
import type { ComponentProps } from 'react'
import { Link } from '@/i18n/routing'
import clsx from 'clsx'
import { useSelectedLayoutSegment } from 'next/navigation'

export default function MegamenuLink<Pathname extends Pathnames>({
  href,
  ...rest
}: ComponentProps<typeof Link<Pathname>>) {
  const selectedLayoutSegment = useSelectedLayoutSegment()
  const pathname = selectedLayoutSegment ? `/${selectedLayoutSegment}` : '/'
  const isActive = pathname === href

  return (
    <Link
      aria-current={isActive ? 'page' : undefined}
      className={clsx(
        'flex gap-x-3 rounded-lg p-2 focus:bg-content2 focus:outline-none',
        isActive ? 'bg-palettes-primary-90 text-palettes-primary-20' : 'text-default-700',
      )}
      href={href}
      {...rest}
    />
  )
}
