import { useTranslations } from 'next-intl'
import React from 'react'

export default function Main() {
  const t = useTranslations('site')
  return (
    <div className="flex items-center justify-center px-2 py-10">
      <h1 className="text-center text-4xl font-light">{t('under-construction')}</h1>
    </div>
  )
}
