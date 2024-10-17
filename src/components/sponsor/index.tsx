import dynamic from 'next/dynamic'
import React from 'react'

const SponsorComponent = dynamic(
  () => import('./sponsor-button'),
)

export default function Index() {
  return (
    <SponsorComponent />
  )
}
