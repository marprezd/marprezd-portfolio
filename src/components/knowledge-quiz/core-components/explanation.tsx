import React from 'react'

interface ExplanationProps {
  question: {
    explanation?: string
  }
  isResultPage: boolean
}

function Explanation({ question, isResultPage }: ExplanationProps) {
  const { explanation } = question

  if (!explanation) {
    return null
  }

  if (isResultPage) {
    return (
      <div>
        {explanation}
      </div>
    )
  }

  return (
    <div>
      <br />
      {explanation}
    </div>
  )
}

export default Explanation
