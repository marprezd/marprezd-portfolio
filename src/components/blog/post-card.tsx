'use client'

import type { Post } from '#site/content'
import type { Locale } from '@/i18n/routing'
import { IconArrowNarrowRight, IconClock } from '@tabler/icons-react'
import { useFormatter, useTranslations } from 'next-intl'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React from 'react'
import CldImage from '../cld-image'
import { Button } from '../ui/button'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'

interface PostCardProps {
  post: Post
}

export default function PostCard({
  post,
}: PostCardProps) {
  const locale = useParams()?.locale as Locale
  const t = useTranslations('app')
  const format = useFormatter()
  const dateTime = new Date(post.date)
  const updateDateTime = new Date(post.lastModified)

  return (
    <Card>
      <CardContent className="space-y-3.5 pt-4">
        <div className="flex items-center gap-x-4">
          {post.cover && (
            <div className="w-16 flex-none">
              <CldImage
                className="size-16 rounded-xl"
                alt={post.title}
                width={64}
                height={64}
                sizes="100vw"
                src={post.cover.image}
                crop={{
                  width: 64,
                  height: 64,
                  type: 'fill',
                }}
                quality={75}
              />
            </div>
          )}
          <div className="grow">
            <h3 className="line-clamp-2 text-xl font-bold">
              {post.title}
            </h3>
            <p className="text-xs uppercase text-muted-foreground">
              Mario Pérez |
              {' '}
              {post.lastModified && post.lastModified !== post.date
                ? (
                    <time dateTime={post.lastModified}>
                      {format.dateTime(updateDateTime, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </time>
                  )
                : (
                    <time dateTime={post.date}>
                      {format.dateTime(dateTime, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </time>
                  )}
            </p>
          </div>
        </div>
        <p className="line-clamp-3 text-sm">
          {post.excerpt}
        </p>
      </CardContent>
      <CardFooter className="flex items-center justify-between space-x-2">
        <div className="inline-flex items-center gap-x-2">
          {post.metadata && (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                >
                  <IconClock />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="space-y-1">
                <h3 className="text-sm font-bold">
                  {t('blog.reading-time.label')}
                </h3>
                <div className="text-xs">
                  {`${post.metadata.readingTime} ${t('blog.reading-time.mins')}`}
                </div>
              </PopoverContent>
            </Popover>
          )}
          {post.hasSeries && (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  size="sm"
                  variant="ghost"
                >
                  {t('blog.tabs.content.series.cta-btn')}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="space-y-1">
                <h3 className="text-sm font-bold">
                  {t('blog.tabs.content.series.summary')}
                </h3>
                <div className="text-xs">
                  {post.series?.title}
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
        <div>
          <Button size="sm" asChild>
            <Link
              className="inline-flex items-center gap-x-0.5"
              href={`/${locale}/${post.slug}`}
            >
              {t('globals.read-more')}
              <IconArrowNarrowRight />
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
