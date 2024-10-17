import dynamic from 'next/dynamic'
import React from 'react'

const LogoComponent = dynamic(
  () => import('./avatar'),
)

export default function Index() {
  return (
    <LogoComponent />
  )
}
