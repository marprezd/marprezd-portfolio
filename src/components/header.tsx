import dynamic from 'next/dynamic'
import React from 'react'

function Loading() {
  return null
}

const NavbarComponent = dynamic(
  () => import('./navbar'),
  {
    loading: () => <Loading />,
  },
)

export default function Header() {
  return (
    <NavbarComponent />
  )
}
