import type { Post } from '#site/content'
import { isArrayNotEmpty } from '@/lib/utils'
import { IconShare2 } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'
import React from 'react'
import Share from './share'

export interface PostShareProps {
  post: Post
}

export default function PostShare({ post }: PostShareProps) {
  const t = useTranslations('site')
  return (
    <div>
      <div className="flex gap-x-5 sm:gap-x-8">
        <IconShare2 className="mt-2 size-8 shrink-0" />
        <div className="grow">
          <h2 className="text-3xl font-bold">
            {t('posts.share.label')}
          </h2>
          <div className="mt-1 text-default-700">
            {t('posts.share.description')}
          </div>
          <Share
            description={post.excerpt}
            hashtag={isArrayNotEmpty(post.tags) ? post.tags : []}
            locale={post.language!}
            slug={post.slug}
            title={post.title}
          />
        </div>
      </div>
    </div>
  )
}
