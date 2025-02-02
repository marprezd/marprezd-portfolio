import type { Locale } from '@/i18n/routing'
import HeroContainer from '@/components/home/hero-container'
import QuickSummaryContainer from '@/components/home/quick-summary-container'
import { setRequestLocale } from 'next-intl/server'
import React from 'react'

export default async function IndexPage({
  params,
}: {
  params: Promise<{
    locale: Locale
  }>
}) {
  const locale = (await params).locale
  // Enable static rendering
  setRequestLocale(locale)

  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <HeroContainer />
      {/* Quick Summary Section */}
      <QuickSummaryContainer />
    </div>
  )
}
