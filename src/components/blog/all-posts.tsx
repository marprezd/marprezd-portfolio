'use client'

import type { QueryPaginationProps } from '@/components/query-pagination'
import type { Locale } from '@/i18n/routing'
import { posts } from '#site/content'
import { sortPosts } from '@/lib/utils'
import dynamic from 'next/dynamic'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import { useInView } from 'react-intersection-observer'

export default function AllPosts({
  params,
  ...rest
}: Partial<QueryPaginationProps> & {
  params: { locale: Locale }
}) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  })
  const PostGridsComponent = dynamic(
    () => import('./post-grid'),
    {
      ssr: false,
    },
  )
  const QueryPaginationComponent = dynamic(
    () => import('../query-pagination'),
    {
      ssr: false,
    },
  )
  const locale = params.locale
  const searchParams = useSearchParams()

  const page = rest.page || Number.parseInt(searchParams.get('page') || '1')
  const pageSize
    = rest.pageSize
      || Number.parseInt(searchParams.get(rest.pageSizeSelectOptions?.pageSizeSearchParam || 'pageSize') || '10')
  const allPost = sortPosts(posts.filter(post => post.published))
  const postsByLang = allPost.filter(post => post.language === locale)
  const totalCount = postsByLang.length
  const displayPosts = postsByLang.slice(pageSize * (page - 1), pageSize * page)

  return (
    <div className="space-y-10 ">
      <div ref={ref}>
        {inView && (
          <PostGridsComponent posts={displayPosts} />
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
  )
}
