import type { ReactNode } from 'react'
import { useTranslations } from 'next-intl'
import React from 'react'

interface AlertSuccessProps {
  children: ReactNode
}

export default function AlertSuccess({ children }: AlertSuccessProps) {
  const t = useTranslations('site')

  return (
    <div
      className="rounded-lg border-t-2 border-teal-500 bg-teal-50 p-4 dark:bg-teal-800/30"
      role="alert"
      tabIndex={-1}
      aria-labelledby="arial-success"
    >
      <div className="flex">
        <div className="shrink-0">
          {/* Icon */}
          <span className="inline-flex size-8 items-center justify-center rounded-full border-4 border-teal-100 bg-teal-200 text-teal-800 dark:border-teal-900 dark:bg-teal-800 dark:text-teal-400">
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
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </span>
          {/* End Icon */}
        </div>
        <div className="ms-3">
          <h3
            id="hs-bordered-success-style-label"
            className="font-semibold text-gray-800 dark:text-white"
          >
            {t('footer.contact-me.alerts.sent.title')}
          </h3>
          <p className="text-sm text-gray-700 dark:text-neutral-400">
            {children}
          </p>
        </div>
      </div>
    </div>
  )
}
