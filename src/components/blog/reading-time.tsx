import { useTranslations } from 'next-intl'
import React from 'react'

interface ReadingTimeProps {
  readingTime: number
}

export default function ReadingTime({ readingTime }: ReadingTimeProps) {
  const t = useTranslations('app')

  return (
    <>
      ~
      {' '}
      {readingTime}
      {' '}
      {t('blog.readingTime.mins')}
    </>
  )
}
