'use client'

import type { QueryPaginationProps } from '@/components/query-pagination'
import type { Locale } from '@/i18n/routing'
import { posts } from '#site/content'
import Animation from '@/components/animation'
import CategoriesCloud from '@/components/blog/sidebar/categories/category-cloud'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { getAllCategories, getPostsByCategorySlug, slugify, sortCategoriesByCount, sortPosts } from '@/lib/utils'
import { useTranslations } from 'next-intl'
import dynamic from 'next/dynamic'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import { useInView } from 'react-intersection-observer'

export default function AllCategories({
  params,
  ...rest
}: Partial<QueryPaginationProps> & {
  params: {
    locale: Locale
    category: string
  }
}) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  })
  const PostGridComponent = dynamic(
    () => import('../../post-grid'),
    {
      ssr: false,
    },
  )
  const QueryPaginationComponent = dynamic(
    () => import('../../../query-pagination'),
    {
      ssr: false,
    },
  )
  const locale = params.locale
  const searchParams = useSearchParams()
  const category = params.category

  const page = rest.page || Number.parseInt(searchParams.get('page') || '1')
  const pageSize
          = rest.pageSize
            || Number.parseInt(searchParams.get(rest.pageSizeSelectOptions?.pageSizeSearchParam || 'pageSize') || '10')
  const sortedPosts = sortPosts(posts.filter(post => post.published))
  const postsByLang = sortedPosts.filter(post => post.language === locale)
  const allPosts = getPostsByCategorySlug(postsByLang, category)
  const displayPosts = allPosts.slice(pageSize * (page - 1), pageSize * page)
  const categories = getAllCategories(postsByLang)
  const sortedCategories = sortCategoriesByCount(categories)
  const totalCount = allPosts.length
  const t = useTranslations('app')

  return (
    <section className="flex lg:flex-row flex-col gap-4 py-10">
      <div className="space-y-4 basis-full lg:basis-9/12">
        <div className="space-y-10">
          <div ref={ref}>
            {inView && (
              <PostGridComponent posts={displayPosts} />
            )}
          </div>
          <div ref={ref}>
            {inView && (
              <QueryPaginationComponent
                page={page}
                pageSize={pageSize}
                totalCount={totalCount}
                pageSizeSelectOptions={{
                  pageSizeOptions: [10, 25, 50, 100],
                }}
                {...rest}
              />
            )}
          </div>
        </div>
      </div>
      <aside className="basis-full lg:basis-3/12">
        <Animation>
          <Card>
            <CardHeader>
              <CardTitle>
                {t('blog.categories.label')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="flex flex-wrap gap-2">
                {sortedCategories?.map(t => (
                  <CategoriesCloud key={t} count={categories[t]} current={slugify(t) === category} category={t} />
                ))}
              </ul>
            </CardContent>
          </Card>
        </Animation>
      </aside>
    </section>
  )
}
