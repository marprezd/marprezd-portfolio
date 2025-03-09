import { cn, humanize, isArrayNotEmpty, slugify } from '@/lib/utils'
import { useLocale } from 'next-intl'
import Link from 'next/link'
import React from 'react'
import Animation from '../animation'
import AfterTitle from './after-title'
import PostTag from './post-tag'

interface PostMetaProps {
  title: string
  date: string
  lastModified: string
  otherLanguages: any[]
  slug: string
  excerpt: string
  tags: any[]
  readingTime: number
  wordCount: number
  view: string
}
export default function PostMeta({ title, date, lastModified, otherLanguages, slug, excerpt, tags, readingTime, wordCount, view }: PostMetaProps) {
  const locale = useLocale()

  return (
    <Animation>
      <h1 className="text-3xl font-bold md:text-4xl lg:line-clamp-2">
        {title}
      </h1>
      {(date || lastModified || otherLanguages) && (
        <AfterTitle
          date={date}
          updated={lastModified}
          otherLanguages={otherLanguages}
          title={title}
          slug={slug}
          readingTime={readingTime}
          wordCount={wordCount}
          view={view}
        />
      )}
      <div className="border-t border-gray-300 py-6 dark:border-gray-700">
        <p className="line-clamp-3 text-balance">
          {excerpt}
        </p>
      </div>
      {isArrayNotEmpty(tags) && (
        <div className={cn('flex gap-2 flex-wrap not-prose')}>
          {tags.map((tag: string) => (
            <Link key={tag} href={`/${locale}/blog/tags/${slugify(tag)}`}>
              <PostTag>{humanize(tag)}</PostTag>
            </Link>
          ))}
        </div>
      )}
    </Animation>
  )
}
