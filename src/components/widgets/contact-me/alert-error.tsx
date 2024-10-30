import type { ReactNode } from 'react'
import { useTranslations } from 'next-intl'
import React from 'react'

interface AlertErrorProps {
  children: ReactNode
}

export default function AlertError({ children }: AlertErrorProps) {
  const t = useTranslations('site')

  return (
    <div
      className="rounded-lg border-t-2 border-red-500 bg-red-50 p-4 dark:bg-red-800/30"
      role="alert"
      tabIndex={-1}
      aria-labelledby="alert-error"
    >
      <div className="flex">
        <div className="shrink-0">
          {/* Icon */}
          <span className="inline-flex size-8 items-center justify-center rounded-full border-4 border-red-100 bg-red-200 text-red-800 dark:border-red-900 dark:bg-red-800 dark:text-red-400">
            <svg
              className="size-4 shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </span>
          {/* End Icon */}
        </div>
        <div className="ms-3">
          <h3
            id="hs-bordered-success-style-label"
            className="font-semibold text-gray-800 dark:text-white"
          >
            {t('footer.contact-me.alerts.error.title')}
          </h3>
          <p className="text-sm text-gray-700 dark:text-neutral-400">
            {children}
          </p>
        </div>
      </div>
    </div>
  )
}
