'use client'

import { IconCornerRightDown, IconServer } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import Animation from '../animation'
import { Card, CardContent, CardHeader } from '../ui/card'

export interface PostSeriesProps {
  data: any
}

export function PostSeries({ data }: PostSeriesProps) {
  const currentIndex = data.posts.findIndex((post: any) => post.isCurrent) + 1
  const t = useTranslations('app')

  return (
    <Animation>
      <Card className="bg-transparent shadow-none border-none">
        <CardHeader>
          <div className="flex items-center gap-x-5 sm:gap-x-8">
            <div className="flex justify-center items-center bg-tertiary mt-2 rounded-full size-14 text-tertiary-foreground shrink-0">
              <IconServer className="size-6 shrink-0" />
            </div>
            <div className="grow">
              <p className="font-medium">
                {t('blog.tabs.content.series.first-line')}
              </p>
              <p className="font-light text-sm">
                {t('blog.tabs.content.series.second-line')}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm">
            {t('blog.tabs.content.series.summary')}
            {' '}
            <span className="font-medium">
              [
              {' '}
              {data.title}
              {' '}
              ]
            </span>
          </p>
          <div className="flex lg:flex-row flex-col lg:items-center gap-2">
            <div className="inline-flex items-center gap-x-1 bg-neutral-100 dark:bg-neutral-500/20 px-1.5 py-1 rounded-md text-neutral-800 dark:text-neutral-300 text-xs">
              {t('blog.tabs.content.series.episodes')}
              {' '}
              (
              {currentIndex}
              /
              {data.posts.length}
              )
            </div>
            <div className="inline-flex items-center gap-x-1 bg-neutral-100 dark:bg-neutral-500/20 px-1.5 py-1 rounded-md text-neutral-800 dark:text-neutral-300 text-xs">
              {t('blog.tabs.content.series.read-articles')}
              <IconCornerRightDown className='size-3 shrink-0' />
            </div>
          </div>
          <ul>
            {data.posts.map((p: any) => (
              <li
                key={p.title}
                className={`relative block list-none pl-5 text-sm before:absolute before:left-1 before:top-1.5 before:size-2 before:rounded-full
          ${p.isCurrent
                ? 'before:bg-primary before:ring-primary before:ring-offset-2 before:ring-offset-primary'
                : 'font-bold before:bg-gray-600 hover:before:bg-primary hover:before:ring-primary hover:before:ring-offset-2 hover:before:ring-offset-gray-800 dark:hover:before:ring-gray-400'
              }`}
              >
                {p.isCurrent
                  ? (
                      <span className="text-primary">{p.title}</span>
                    )
                  : (
                      <Link
                        className="hover:text-primary transition-colors duration-200 ease-in-out"
                        href={`/${p.language}/${p.slug}`}
                      >
                        {p.title}
                      </Link>
                    )}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </Animation>
  )
}
