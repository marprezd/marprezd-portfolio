import type { Locale } from '@/i18n/routing'
import dynamic from 'next/dynamic'
import React from 'react'

function Loading() {
  return null
}

export default async function Home({
  params,
}: {
  params: Promise<{
    locale: Locale
  }>
}) {
  const locale = (await params).locale

  const HeroComponent = dynamic(
    () => import('../../components/hero'),
    {
      loading: () => <Loading />,
    },
  )

  const FeaturedPostsComponent = dynamic(
    () => import('../../components/posts/featured-posts'),
    {
      loading: () => <Loading />,
    },
  )

  const StatsComponent = dynamic(
    () => import('../../components/website-stats'),
    {
      loading: () => <Loading />,
    },
  )

  const BooksComponent = dynamic(
    () => import('../../components/books'),
    {
      loading: () => <Loading />,
    },
  )

  return (
    <main className="relative space-y-10 lg:space-y-14">
      {/* Hero Section */}
      <section className="mx-auto max-w-7xl pb-4 pt-10 sm:px-6 lg:px-8 lg:pb-10 lg:pt-24">
        <HeroComponent />
      </section>
      <section className="container mx-auto">
        <div className="rounded-3xl bg-content1 p-5 md:p-8">
          <FeaturedPostsComponent
            params={{
              locale,
            }}
          />
        </div>
      </section>
      <section className="container mx-auto">
        <div className="rounded-xl bg-gradient-to-bl from-cyan-900 via-cyan-950 to-cyan-900 p-5 md:p-8">
          <StatsComponent
            params={{
              locale,
            }}
          />
        </div>
      </section>
      <section className="container mx-auto" id="featured-books">
        <div className="rounded-3xl bg-content1 p-5 md:p-8">
          <BooksComponent />
        </div>
      </section>
    </main>
  )
}
