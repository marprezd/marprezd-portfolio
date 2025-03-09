import type { Post } from '#site/content'
import { isArrayNotEmpty } from '@/lib/utils'
import { IconShare2 } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'
import React from 'react'
import Animation from '../animation'
import { Card, CardContent, CardHeader } from '../ui/card'
import Share from './share'

export interface PostShareProps {
  post: Post
}

export default function SharePost({ post }: PostShareProps) {
  const t = useTranslations('app')
  return (
    <Animation>
      <Card className="border-none shadow-none">
        <CardHeader>
          <div className="flex items-center gap-x-5 sm:gap-x-8">
            <div className="mt-2 flex size-8 shrink-0 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-900">
              <IconShare2 className="size-5 text-gray-900 dark:text-gray-200" />
            </div>
            <div className="grow">
              <p className="font-medium">
                {t('blog.tabs.content.share.first-line')}
              </p>
              <p className="text-sm font-light">
                {t('blog.tabs.content.share.second-line')}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="text-sm text-gray-700 dark:text-gray-400">
          {t('blog.tabs.content.share.summary')}
          <Share
            description={post.excerpt}
            hashtag={isArrayNotEmpty(post.tags) ? post.tags : []}
            locale={post.language!}
            slug={post.slug}
            title={post.title}
          />
        </CardContent>
      </Card>
    </Animation>
  )
}
