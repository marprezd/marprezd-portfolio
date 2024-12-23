'use client'

import type { Post } from '#site/content'
import type { Locale } from '@/i18n/routing'
import { Button } from '@nextui-org/button'
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card'
import { Link } from '@nextui-org/link'
import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/popover'
import { IconArrowNarrowRight, IconClock } from '@tabler/icons-react'
import { useFormatter, useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import React from 'react'
import CldImage from '../cld-image'

interface PostCardProps {
  post: Post
  shadow: any
}

export default function PostCard({
  post,
  shadow,
}: PostCardProps) {
  const locale = useParams()?.locale as Locale
  const t = useTranslations('site')
  const format = useFormatter()
  const dateTime = new Date(post.date)
  const updateDateTime = new Date(post.lastModified)

  return (
    <Card shadow={shadow} className="border-1 border-gray-300 dark:border-gray-700">
      <CardHeader className="flex items-center gap-x-4">
        {post.cover && (
          <div className="w-20 flex-none">
            <CldImage
              className="size-20 rounded-xl"
              alt={post.title}
              width={80}
              height={80}
              sizes="100vw"
              src={post.cover.image}
              crop={{
                width: 80,
                height: 80,
                type: 'fill',
              }}
              quality={75}
            />
          </div>
        )}
        <div className="grow">
          <h3 className="line-clamp-2 text-xl font-bold tracking-tighter text-default-800">
            {post.title}
          </h3>
          <p className="text-xs uppercase text-default-700">
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
      </CardHeader>
      <CardBody>
        <p className="line-clamp-2 text-default-800">
          {post.excerpt}
        </p>
      </CardBody>
      <CardFooter as="footer" className="flex items-center justify-between space-x-2">
        <div className="inline-flex items-center gap-x-2 text-sm text-neutral-600 dark:text-neutral-400">
          {' '}
          {post.metadata && (
            <Popover backdrop="blur" showArrow>
              <PopoverTrigger>
                <Button
                  isIconOnly
                  color="default"
                  radius="sm"
                  size="sm"
                  variant="solid"
                >
                  <IconClock className="size-4 shrink-0" />
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                {titleProps => (
                  <div className="px-1 py-2">
                    <h3 className="text-sm font-bold" {...titleProps}>
                      {t('posts.reading-time.label')}
                    </h3>
                    <div className="text-xs">
                      {`${post.metadata.readingTime} ${t('posts.reading-time.mins')}`}
                    </div>
                  </div>
                )}
              </PopoverContent>
            </Popover>
          )}
          {post.hasSeries && (
            <Popover backdrop="blur" showArrow>
              <PopoverTrigger>
                <Button
                  color="default"
                  radius="sm"
                  size="sm"
                  variant="solid"
                >
                  {t('posts.series.cta-btn')}
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                {titleProps => (
                  <div className="px-1 py-2">
                    <h3 className="text-sm font-bold" {...titleProps}>
                      {t('posts.series.label')}
                    </h3>
                    <div className="text-xs">
                      {post.series?.title}
                    </div>
                  </div>
                )}
              </PopoverContent>
            </Popover>
          )}
        </div>
        <div>
          <Link
            isBlock
            className="inline-flex items-center gap-x-0.5 text-sm font-medium"
            color="primary"
            href={`/${locale}/${post.slug}`}
          >
            {t('posts.more-details')}
            <IconArrowNarrowRight />
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}
