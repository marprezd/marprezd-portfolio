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
      <Card className="border-none shadow-none">
        <CardHeader>
          <div className="flex items-center gap-x-5 sm:gap-x-8">
            <div className="mt-2 flex size-8 shrink-0 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-900">
              <IconServer className="size-5 text-gray-900 dark:text-gray-200" />
            </div>
            <div className="grow">
              <p className="font-medium">
                {t('blog.tabs.content.series.first-line')}
              </p>
              <p className="text-sm font-light">
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
          <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
            <div className="flex items-center gap-x-1.5 rounded-sm bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-800 dark:bg-gray-800/30 dark:text-gray-100">
              {t('blog.tabs.content.series.episodes')}
              {' '}
              (
              {currentIndex}
              /
              {data.posts.length}
              )
            </div>
            <div className="flex items-center gap-x-1.5 rounded-sm bg-red-100 px-3 py-1.5 text-xs font-medium text-red-800 dark:bg-red-800/30 dark:text-red-100">
              {t('blog.tabs.content.series.read-articles')}
              <IconCornerRightDown size={16} />
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
                        className="transition-colors duration-200 ease-in-out hover:text-primary"
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
