'use client'

import type { ComponentProps } from 'react'
import { Link } from '@/i18n/routing'
// import clsx from 'clsx'
import { useSelectedLayoutSegment } from 'next/navigation'
import { useSidebar } from './ui/sidebar'

export default function NavigationLink({
  href,
  ...rest
}: ComponentProps<typeof Link>) {
  const selectedLayoutSegment = useSelectedLayoutSegment()
  const pathname = selectedLayoutSegment ? `/${selectedLayoutSegment}` : '/'
  const isActive = pathname === href
  const { setOpenMobile } = useSidebar()

  return (
    <Link
      aria-current={isActive ? 'page' : undefined}
      /*       className={clsx(
        'transition-colors',
        isActive ? 'text-[var(--sidebar-accent-foreground)]' : 'text-inherit',
      )} */
      href={href}
      onClick={() => setOpenMobile(false)}
      {...rest}
    />
  )
}
