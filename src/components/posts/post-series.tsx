'use client'

import { Card, CardBody, CardHeader } from '@nextui-org/card'
import { Chip } from '@nextui-org/chip'
import { Divider } from '@nextui-org/divider'
import { IconCornerRightDown, IconServer } from '@tabler/icons-react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

export interface PostSeriesProps {
  data: any
}

export function PostSeries({ data }: PostSeriesProps) {
  const currentIndex = data.posts.findIndex((post: any) => post.isCurrent) + 1
  const t = useTranslations('site')

  return (
    <Card className="mt-4 bg-content1">
      <CardHeader className="flex items-center space-x-2">
        <IconServer size={20} />
        <span className="text-xl font-light tracking-tighter">
          {t('posts.series.label')}
          :
          {' '}
          {data.title}
        </span>
      </CardHeader>
      <Divider />
      <CardBody>
        <div className="mb-3 flex flex-col gap-2 lg:flex-row lg:items-center">
          <Chip radius="md">
            {t('posts.series.episodes')}
            {' '}
            (
            {currentIndex}
            /
            {data.posts.length}
            )
          </Chip>
          <Chip
            color="secondary"
            endContent={<IconCornerRightDown size={16} />}
            radius="md"
            variant="solid"
          >
            {t('posts.series.read-articles')}
          </Chip>
        </div>
        <ul>
          {data.posts.map((p: any) => (
            <li
              key={p.title}
              className={`relative my-2 block list-none pl-5 text-sm before:absolute before:left-1 before:top-1.5 before:size-2 before:rounded-full
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
      </CardBody>
    </Card>
  )
}
