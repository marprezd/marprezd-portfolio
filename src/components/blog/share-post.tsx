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
      <Card className="bg-transparent shadow-none border-none">
        <CardHeader>
          <div className="flex items-center gap-x-5 sm:gap-x-8">
            <div className="flex justify-center items-center bg-tertiary mt-2 rounded-full size-14 text-tertiary-foreground shrink-0">
              <IconShare2 className="size-6 shrink-0" />
            </div>
            <div className="grow">
              <p className="font-medium">
                {t('blog.tabs.content.share.first-line')}
              </p>
              <p className="font-light text-sm">
                {t('blog.tabs.content.share.second-line')}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="text-gray-700 dark:text-gray-400 text-sm">
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
