import { host } from '@/config'
import { TooltipArrow } from '@radix-ui/react-tooltip'
import { IconBallpen, IconBrandPocket, IconCalendar, IconClock, IconEye, IconFileDescription, IconRefresh, IconSelector } from '@tabler/icons-react'
import { useFormatter, useLocale, useTranslations } from 'next-intl'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'
import ReadingTime from './reading-time'
import ShowViews from './show-views'
import TotalWords from './total-words'

interface PostPublishingProps {
  date: string
  updated: string
  otherLanguages: any[]
  slug: string
  title: string
  readingTime: number
  wordCount: number
  view: string
}

export default function AfterTitle({
  date,
  updated,
  otherLanguages,
  slug,
  title,
  readingTime,
  wordCount,
  view,
}: PostPublishingProps) {
  const t = useTranslations('app')
  const format = useFormatter()
  const dateTime = new Date(date)
  const updateDateTime = new Date(updated!)
  const locale = useLocale()

  return (
    <div className="my-2 flex flex-col items-start gap-2 sm:flex-row md:items-center">
      <Button size="sm" variant="ghost">
        <IconBallpen />
        Mario P
      </Button>
      {date && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="sm" variant="ghost">
                <IconCalendar />
                <time dateTime={date}>
                  {format.dateTime(dateTime, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </time>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {t('blog.added')}
              <TooltipArrow className="fill-primary" />
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
      {updated && updated !== date
        ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size="sm" variant="ghost">
                    <IconRefresh />
                    <time dateTime={updated}>
                      {format.dateTime(updateDateTime, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </time>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {t('blog.updated')}
                  <TooltipArrow className="fill-primary" />
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )
        : ''}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="sm" variant="ghost">
            {t('globals.more-details')}
            <IconSelector />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>
            {t('blog.available_in')}
          </DropdownMenuLabel>
          {otherLanguages.map((obj) => {
            return (
              <Link key={obj.name} href={`/${obj.code}/blog/${obj.slug}`}>
                <DropdownMenuItem>
                  {obj.name}
                </DropdownMenuItem>
              </Link>
            )
          })}
          <DropdownMenuLabel>
            {t('blog.save-to-read-later')}
          </DropdownMenuLabel>
          <a href={`https://getpocket.com/save?${host}/${locale}/${slug}&${title}`}>
            <DropdownMenuItem>
              <IconBrandPocket className="size-5" />
              {t('blog.pocket')}
            </DropdownMenuItem>
          </a>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <IconClock />
            <ReadingTime readingTime={readingTime} />
          </DropdownMenuItem>
          <DropdownMenuItem>
            <IconFileDescription />
            <TotalWords words={wordCount} />
          </DropdownMenuItem>
          <DropdownMenuItem>
            <IconEye />
            <ShowViews view={view} />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
