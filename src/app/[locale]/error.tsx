'use client'

import { useTranslations } from 'next-intl'
import { useEffect } from 'react'

interface Props {
  error: Error
  reset: () => void
}

export default function Error({ error, reset }: Props) {
  const t = useTranslations('app')

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div>
      <div>
        {t.rich('error.description', {
          p: chunks => <p className="mt-4">{chunks}</p>,
          retry: chunks => (
            <button
              className="text-white underline underline-offset-2"
              onClick={reset}
              type="button"
            >
              {chunks}
            </button>
          ),
        })}
      </div>
    </div>
  )
}
