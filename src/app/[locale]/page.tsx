import dynamic from 'next/dynamic'
import React from 'react'

function Loading() {
  return null
}

const HeroComponent = dynamic(
  () => import('../../components/hero'),
  {
    loading: () => <Loading />,
  },
)

export default function Home() {
  return (
    <main className="relative pb-20">
      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <HeroComponent />
      </section>
    </main>
  )
}
