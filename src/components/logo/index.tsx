import dynamic from 'next/dynamic'
import React from 'react'

function Loading() {
  return null
}

const LogoComponent = dynamic(
  () => import('./avatar'),
  {
    loading: () => <Loading />,
  },
)

export default function Index() {
  return (
    <LogoComponent />
  )
}
