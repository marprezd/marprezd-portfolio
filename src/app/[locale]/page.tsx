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

export default function Home({ params: { locale } }: HomeProps) {
  return (
    <main className="relative">
      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 md:pb-20 lg:px-8">
        <HeroComponent />
      </section>
      <section className="bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 md:py-20 lg:px-8">
          <div className="space-y-4 px-4 sm:space-y-8 md:space-y-10 lg:px-10">
            <FeaturedPostsComponent
              params={{
                locale,
              }}
            />
          </div>
        </div>
      </section>
      <section className="bg-gradient-to-bl from-cyan-900 via-cyan-950 to-cyan-900">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 md:py-20 lg:px-8">
          <StatsComponent
            params={{
              locale,
            }}
          />
        </div>
      </section>
    </main>
  )
}
