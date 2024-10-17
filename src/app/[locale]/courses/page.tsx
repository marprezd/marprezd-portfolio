import dynamic from 'next/dynamic'
import React from 'react'

function Loading() {
  return <h2>🌀 Loading...</h2>
}

const CoursesComponent = dynamic(
  () => import('./components/main'),
  {
    loading: () => <Loading />,
  },
)

export default function Courses() {
  return (
    <div className="flex items-center justify-center px-2 py-10">
      <CoursesComponent />
    </div>
  )
}
