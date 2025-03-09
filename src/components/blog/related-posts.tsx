import type { Post } from '#site/content'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { IconChartCovariate } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'
import React from 'react'
import Animation from '../animation'
import { Card, CardContent, CardHeader } from '../ui/card'
import PostCard from './post-card'

interface RelatedPostsProps {
  posts: Post[]
}
export default function RelatedPosts({ posts }: RelatedPostsProps) {
  const t = useTranslations('app')

  return (
    <Animation>
      <Card className="border-none shadow-none">
        <CardHeader>
          <div className="flex items-center gap-x-5 sm:gap-x-8">
            <div className="mt-2 flex size-8 shrink-0 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-900">
              <IconChartCovariate className="size-5 text-gray-900 dark:text-gray-200" />
            </div>
            <div className="grow">
              <p className="font-medium">
                {t('blog.tabs.content.related-posts.first-line')}
              </p>
              <p className="text-sm font-light">
                {t('blog.tabs.content.related-posts.second-line')}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="grid grid-cols-1">
            <Carousel
              opts={{
                align: 'start',
              }}
              className="w-full max-w-3xl"
            >
              <CarouselContent>
                {posts.slice(0, 12).map(post => (
                  <CarouselItem key={post.slug} className="lg:basis-1/2">
                    <div className="p-1">
                      <PostCard post={post} />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="mt-6 flex w-full items-center gap-2">
                <CarouselPrevious />
                <CarouselNext />
              </div>
            </Carousel>
          </div>
        </CardContent>
      </Card>
    </Animation>
  )
}
