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

export default function Home({ params: { locale } }: HomeProps) {
  return (
    <main className="relative space-y-10">
      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <HeroComponent />
      </section>
      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 md:py-20 lg:px-8">
        <div className="space-y-4 px-4 sm:space-y-8 md:space-y-10 lg:px-10">
          <FeaturedPostsComponent
            params={{
              locale,
            }}
          />
        </div>
      </section>
    </main>
  )
}
