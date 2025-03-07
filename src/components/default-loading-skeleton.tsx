import { useTranslations } from 'next-intl'
import React from 'react'

function DefaultLoadingSkeleton() {
  const t = useTranslations(`app`)
  return (
    <div className="flex h-96 w-full items-center justify-center">
      <div className="inline-flex items-center gap-x-2 rounded-lg border border-transparent px-4 py-3 text-sm font-medium text-gray-800 hover:bg-gray-100 dark:text-white dark:hover:bg-neutral-700">
        <span className="inline-block size-4 animate-spin rounded-full border-[3px] border-current border-t-transparent text-gray-800 dark:text-white" role="status" aria-label="loading"></span>
        {t('globals.loading')}
      </div>
    </div>
  )
}

export default DefaultLoadingSkeleton
