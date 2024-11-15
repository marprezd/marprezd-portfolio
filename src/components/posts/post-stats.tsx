import React from 'react'
import ReadingTime from './reading-time'
import ShowViews from './show-views'
import TotalWords from './total-words'

interface PostStatsProps {
  slug: string
  readingTime: number
  wordCount: number
}
export default function PostStats({ slug, readingTime, wordCount }: PostStatsProps) {
  return (
    <div>
      <div className="container mx-auto max-w-5xl">
        <div className="text-center">
          <dl className="mx-auto grid max-w-screen-md gap-8 sm:grid-cols-3">
            <ShowViews slug={slug} />
            <ReadingTime readingTime={readingTime} />
            <TotalWords words={wordCount} />
          </dl>
        </div>
      </div>
    </div>
  )
}
