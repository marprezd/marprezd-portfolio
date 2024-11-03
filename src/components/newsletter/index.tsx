import dynamic from 'next/dynamic'
import React from 'react'

function Loading() {
  return null
}

const SubscriptionFormComponent = dynamic(
  () => import('./newsletter-wrapper'),
  {
    loading: () => <Loading />,
  },
)

export default function Index() {
  return (
    <section className="mx-auto max-w-3xl px-2 pb-10 sm:px-0 md:pb-20">
      <SubscriptionFormComponent />
    </section>
  )
}
