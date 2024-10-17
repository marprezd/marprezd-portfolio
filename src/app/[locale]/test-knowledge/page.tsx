import dynamic from 'next/dynamic'
import React from 'react'

function Loading() {
  return <h2>🌀 Loading...</h2>
}

const TestKnowledgeComponent = dynamic(
  () => import('./components/main'),
  {
    loading: () => <Loading />,
  },
)

export default function TestKnowledge() {
  return (
    <div className="flex items-center justify-center px-2 py-10">
      <TestKnowledgeComponent />
    </div>
  )
}
