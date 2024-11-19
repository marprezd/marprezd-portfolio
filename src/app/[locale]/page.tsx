import type { Locale } from '@/i18n/routing'
import dynamic from 'next/dynamic'
import React from 'react'

function Loading() {
  return null
}

interface HomeProps {
  params: {
    locale: Locale
  }
}

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

export default function Home({ params: { locale } }: HomeProps) {
  return (
    <main className="relative">
      {/* Hero Section */}
      <section className="mx-auto max-w-7xl border-b-1 border-gray-300 px-4 pb-20 pt-10 dark:border-gray-700 sm:px-6 lg:px-8">
        <HeroComponent />
      </section>
      <section className="bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
          <FeaturedPostsComponent
            params={{
              locale,
            }}
          />
        </div>
      </section>
      <section className="bg-gradient-to-bl from-cyan-900 via-cyan-950 to-cyan-900">
        <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
          <StatsComponent
            params={{
              locale,
            }}
          />
        </div>
      </section>
      <section className="border-b-1 border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-900" id="featured-books">
        <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
          <BooksComponent />
        </div>
      </section>
    </main>
  )
}
