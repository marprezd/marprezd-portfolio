import { cn, humanize, isArrayNotEmpty, slugify } from '@/lib/utils'
import { useLocale } from 'next-intl'
import Link from 'next/link'
import React from 'react'
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
}
export default function PostMeta({ title, date, lastModified, otherLanguages, slug, excerpt, tags }: PostMetaProps) {
  const locale = useLocale()

  return (
    <div>
      <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl lg:line-clamp-2">
        {title}
      </h1>
      {(date || lastModified || otherLanguages) && (
        <AfterTitle
          date={date}
          updated={lastModified}
          otherLanguages={otherLanguages}
          title={title}
          slug={slug}
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
    </div>
  )
}
