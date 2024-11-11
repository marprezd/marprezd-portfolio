import dynamic from 'next/dynamic'
import React from 'react'

function Loading() {
  return null
}

const SearchComponent = dynamic(
  () => import('./search-box'),
  {
    loading: () => <Loading />,
  },
)

export default function Index() {
  return (
    <SearchComponent />
  )
}
