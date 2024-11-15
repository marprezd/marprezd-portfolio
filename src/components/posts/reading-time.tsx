import { useTranslations } from 'next-intl'
import React from 'react'

interface ReadingTimeProps {
  readingTime: number
}

export default function ReadingTime({ readingTime }: ReadingTimeProps) {
  const t = useTranslations('site')

  return (
    <div className="flex flex-col items-center justify-center">
      <dt className="mb-2 text-3xl font-extrabold md:text-4xl">
        ~
        {' '}
        {readingTime}
      </dt>
      <dd className="font-semibold">
        {t('posts.readingTime.mins')}
      </dd>
    </div>
  )
}
