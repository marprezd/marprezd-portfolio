import { useTranslations } from 'next-intl'
import React from 'react'

interface FriendlyPaginationProps {
  itemsPerPage: number
  totalItems: number
  currentPage: number
}

export default function FriendlyPagination({
  itemsPerPage,
  totalItems,
  currentPage,
}: FriendlyPaginationProps) {
  const t = useTranslations('site')

  return (
    <p className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-200 sm:mb-0">
      {t('posts.pagination', {
        start: (currentPage - 1) * itemsPerPage + 1,
        middle: currentPage * itemsPerPage > totalItems ? totalItems : currentPage * itemsPerPage,
        end: totalItems,
      })}
    </p>
  )
}
