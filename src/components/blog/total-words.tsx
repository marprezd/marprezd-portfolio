import { useTranslations } from 'next-intl'
import React from 'react'

interface TotalWordsProps {
  words: number
}

export default function TotalWords({ words }: TotalWordsProps) {
  const t = useTranslations('app')

  return (
    <>
      {words}
      {' '}
      {t('blog.words')}
    </>
  )
}
