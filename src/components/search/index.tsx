import dynamic from 'next/dynamic'
import React from 'react'

const SearchComponent = dynamic(
  () => import('./search-box'),
)

export default function Index() {
  return (
    <SearchComponent />
  )
}
