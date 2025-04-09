import { host } from '@/config'
import { TooltipArrow } from '@radix-ui/react-tooltip'
import { IconBallpen, IconBrandPocket, IconCalendar, IconClock, IconEye, IconFileDescription, IconRefresh, IconSelector } from '@tabler/icons-react'
import { useFormatter, useLocale, useTranslations } from 'next-intl'
import Link from 'next/link'
import React from 'react'
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
    <div className="flex sm:flex-row flex-col items-start md:items-center gap-2 my-2">
      <div className='inline-flex items-center gap-x-1 bg-neutral-100 dark:bg-neutral-500/20 px-1.5 py-1 rounded-md text-neutral-800 dark:text-neutral-300 text-xs'>
        <IconBallpen className='size-3 shrink-0' />
        Mario P
      </div>
      {date && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className='inline-flex items-center gap-x-1 bg-neutral-100 dark:bg-neutral-500/20 px-1.5 py-1 rounded-md text-neutral-800 dark:text-neutral-300 text-xs'>
                <IconCalendar className='size-3 shrink-0' />
                <time dateTime={date}>
                  {format.dateTime(dateTime, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </time>
              </div>
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
                <TooltipTrigger>
                  <div className='inline-flex items-center gap-x-1 bg-neutral-100 dark:bg-neutral-500/20 px-1.5 py-1 rounded-md text-neutral-800 dark:text-neutral-300 text-xs'>
                    <IconRefresh className='size-3 shrink-0' />
                    <time dateTime={updated}>
                      {format.dateTime(updateDateTime, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </time>
                  </div>
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
        <DropdownMenuTrigger>
          <div className='inline-flex items-center gap-x-1 bg-neutral-100 dark:bg-neutral-500/20 px-1.5 py-1 rounded-md text-neutral-800 dark:text-neutral-300 text-xs'>
            {t('globals.more-details')}
            <IconSelector className='size-3 shrink-0' />
          </div>
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
              <IconBrandPocket className="text-current" />
              {t('blog.pocket')}
            </DropdownMenuItem>
          </a>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <IconClock className="text-current" />
            <ReadingTime readingTime={readingTime} />
          </DropdownMenuItem>
          <DropdownMenuItem>
            <IconFileDescription className="text-current" />
            <TotalWords words={wordCount} />
          </DropdownMenuItem>
          <DropdownMenuItem>
            <IconEye className="text-current" />
            <ShowViews view={view} />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
