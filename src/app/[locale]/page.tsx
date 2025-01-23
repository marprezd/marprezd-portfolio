import type { Locale } from '@/i18n/routing'
import HeroContainer from '@/layouts/components/home/hero-container'
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
    </div>
  )
}
