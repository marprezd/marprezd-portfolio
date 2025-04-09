'use client'

import type { Post } from '#site/content'
import type { Locale } from '@/i18n/routing'
import { IconClock, IconPlus } from '@tabler/icons-react'
import { useFormatter, useTranslations } from 'next-intl'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React from 'react'
import CldImage from '../cld-image'
import { Button } from '../ui/button'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

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
      <CardContent className="space-y-3.5">
        <div className="flex items-center gap-x-4">
          {post.cover && (
            <div className="flex-none w-16">
              <CldImage
                className="rounded-xl size-16"
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
            <h3 className="font-bold text-xl line-clamp-2">
              {post.title}
            </h3>
            <p className="text-muted-foreground text-xs uppercase">
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
        <p className="text-sm line-clamp-3">
          {post.excerpt}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between items-center space-x-2">
        <div className="inline-flex items-center gap-x-2">
          {post.metadata && (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  size="icon"
                  variant="outline"
                  className='hover:text-primary'
                >
                  <IconClock />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="space-y-1">
                <h3 className="font-bold text-sm">
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
                  variant="secondary"
                >
                  {t('blog.tabs.content.series.cta-btn')}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="space-y-1">
                <h3 className="font-bold text-sm">
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
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="icon" className='rounded-full' asChild>
                <Link href={`/${locale}/${post.slug}`}>
                  <IconPlus />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {t('globals.read-more')}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        </div>
      </CardFooter>
    </Card>
  )
}
