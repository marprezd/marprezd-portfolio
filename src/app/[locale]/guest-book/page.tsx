import PageHero from '@/components/page-hero'
import dynamic from 'next/dynamic'
import { useTranslations } from 'next-intl'
import React from 'react'

function Loading() {
  return <h2>🌀 Loading...</h2>
}

const GuestBookComponent = dynamic(
  () => import('./components/main'),
  {
    loading: () => <Loading />,
  },
)

export default function GuestBook() {
  const t = useTranslations('site')

  return (
    <div className="before:z-1 relative overflow-hidden before:absolute before:start-1/2 before:top-0 before:size-full before:-translate-x-1/2 before:bg-heroLight before:bg-top before:bg-no-repeat dark:before:bg-heroDark">
      <PageHero
        title={t('guest-book.title')}
        description={t('guest-book.description')}
      />
      <GuestBookComponent />
    </div>
  )
}
