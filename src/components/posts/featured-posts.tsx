'use client'

import type { Locale } from '@/i18n/routing'
import { posts } from '#site/content'
import { sortPosts } from '@/lib/utils'
import { Button } from '@nextui-org/button'
import { Link as Nextlink } from '@nextui-org/link'
import { useTranslations } from 'next-intl'
import React from 'react'
import { useInView } from 'react-intersection-observer'
import PostSeriesGrids from './posts-series-grids'

interface FeaturedPostsProps {
  params: {
    locale: Locale
  }
}

export default function FeaturedPosts({ params: { locale } }: FeaturedPostsProps) {
  const t = useTranslations('site')
  const allPost = posts.filter(post => post.language === locale && post.published)
  const displayPosts = sortPosts(allPost.filter(post => post.hasSeries))
  const { ref, inView } = useInView()

  return (
    <div>
      <div ref={ref} className={inView ? 'animate-fade-up animate-delay-500 animate-duration-500 animate-once animate-ease-in' : 'opacity-0'}>
        <div className="flex flex-col items-center justify-between md:flex-row">
          <h2 className="text-3xl font-bold leading-tight text-default-800">
            {t('posts.featured.title')}
          </h2>
          <p className="text-xs font-medium uppercase text-default-700">
            {t('posts.featured.description')}
          </p>
        </div>
        <div className="text-center sm:text-left">
          <span className="inline-block h-1 w-40 rounded-full bg-red-500" />
          <span className="ml-1 inline-block h-1 w-3 rounded-full bg-red-500" />
          <span className="ml-1 inline-block size-1 rounded-full bg-red-500" />
        </div>
      </div>
      {displayPosts.length > 0
        ? (
            <PostSeriesGrids
              posts={displayPosts}
            />
          )
        : (
            <p>Sorry, nothing to see here yet!</p>
          )}
      {displayPosts && (
        <div className="flex flex-row justify-center">
          <Button
            as={Nextlink}
            color="primary"
            radius="full"
            variant="solid"
            href={`/${locale}/blog/categories/series`}
          >
            {t('posts.featured.cta')}
          </Button>
        </div>
      )}
    </div>
  )
}
