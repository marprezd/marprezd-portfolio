/* eslint-disable node/prefer-global/process */
import dynamic from 'next/dynamic'
import React from 'react'

const SponsorSmallButtonComponent = dynamic(
  () => import('./sponsor-small-button'),
)

export default function Index() {
  const PATREON_CLIENT_ID: string = process.env.PATREON_CLIENT_ID || ''

  return (
    <SponsorSmallButtonComponent
      clientID={PATREON_CLIENT_ID}
      redirectUri="https://marprezd.vercel.app/thank-for-donating"
      pledgeAmount={5}
    />
  )
}
