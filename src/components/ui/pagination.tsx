import type { ButtonProps } from '@/components/ui/button'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import * as React from 'react'

function Pagination({ className, ...props }: React.ComponentProps<'nav'>) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className={cn('mx-auto flex w-full justify-center', className)}
      {...props}
    />
  )
}
Pagination.displayName = 'Pagination'

function PaginationContent({ ref, className, ...props }: React.ComponentProps<'ul'> & { ref?: React.RefObject<HTMLUListElement | null> }) {
  return (
    <ul
      ref={ref}
      className={cn('flex flex-row items-center gap-1', className)}
      {...props}
    />
  )
}
PaginationContent.displayName = 'PaginationContent'

function PaginationItem({ ref, className, ...props }: React.ComponentProps<'li'> & { ref?: React.RefObject<HTMLLIElement | null> }) {
  return <li ref={ref} className={cn('', className)} {...props} />
}
PaginationItem.displayName = 'PaginationItem'

type PaginationLinkProps = {
  isActive?: boolean
} & Pick<ButtonProps, 'size'> &
React.ComponentProps<typeof Link>

function PaginationLink({
  className,
  isActive,
  size = 'icon',
  ...props
}: PaginationLinkProps) {
  return (
    <Link
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        buttonVariants({
          variant: isActive ? 'outline' : 'ghost',
          size,
        }),
        className,
      )}
      {...props}
    />
  )
}
PaginationLink.displayName = 'PaginationLink'

function PaginationPrevious({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  const t = useTranslations('app')

  return (
    <PaginationLink
      aria-label={t('blog.pagination.previous-page')}
      size="default"
      className={cn('gap-1 pl-2.5', className)}
      {...props}
    >
      <ChevronLeft className="size-4" />
      <span>{t('blog.pagination.previous')}</span>
    </PaginationLink>
  )
}
PaginationPrevious.displayName = 'PaginationPrevious'

function PaginationNext({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  const t = useTranslations('app')

  return (
    <PaginationLink
      aria-label={t('blog.pagination.next-page')}
      size="default"
      className={cn('gap-1 pr-2.5', className)}
      {...props}
    >
      <span>{t('blog.pagination.next')}</span>
      <ChevronRight className="size-4" />
    </PaginationLink>
  )
}
PaginationNext.displayName = 'PaginationNext'

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<'span'>) {
  const t = useTranslations('app')

  return (
    <span
      aria-hidden
      className={cn('flex h-9 w-9 items-center justify-center', className)}
      {...props}
    >
      <MoreHorizontal className="size-4" />
      <span className="sr-only">{t('blog.pagination.more-pages')}</span>
    </span>
  )
}
PaginationEllipsis.displayName = 'PaginationEllipsis'

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
}
