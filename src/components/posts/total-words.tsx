import { useTranslations } from 'next-intl'
import React from 'react'

interface TotalWordsProps {
  words: number
}

export default function TotalWords({ words }: TotalWordsProps) {
  const t = useTranslations('site')

  return (
    <div className="flex flex-col items-center justify-center">
      <dt className="mb-2 text-3xl font-extrabold md:text-4xl">
        {words}
      </dt>
      <dd className="font-semibold">
        {t('posts.words')}
      </dd>
    </div>
  )
}
