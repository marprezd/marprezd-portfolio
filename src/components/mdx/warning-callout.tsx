import { IconAlertTriangle } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'

interface CalloutProps {
  children: React.ReactNode
}

function WarningCallout({ children }: CalloutProps) {
  const t = useTranslations('app')

  return (
    <div
      className="not-prose rounded-lg border-t-2 border-yellow-500 bg-yellow-50 p-4 dark:bg-yellow-800"
      role="alert"
    >
      <div className="flex">
        <div className="shrink-0">
          <span className="inline-flex size-8 items-center justify-center rounded-full border-4 border-yellow-100 bg-yellow-200 text-yellow-800 dark:border-yellow-900 dark:bg-yellow-800 dark:text-yellow-400">
            <IconAlertTriangle className="size-4 shrink-0" />
          </span>
        </div>
        <div className="ms-3">
          <h3 className="font-semibold text-yellow-900 dark:text-white">
            {t('blog.callouts.warning')}
          </h3>
          <div className="text-sm text-yellow-800 dark:text-yellow-100">
            {children}
          </div>
        </div>
      </div>
    </div>

  )
}

export default WarningCallout
