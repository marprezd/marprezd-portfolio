import type { Locale } from '@/i18n/routing'
import { posts } from '#site/content'
import { server } from '@/lib/serverUrl'
import { sortPosts } from '@/lib/utils'
import { getTranslations } from 'next-intl/server'
import dynamic from 'next/dynamic'
import React from 'react'

function Loading() {
  return null
}

const POSTS_PER_PAGE = 4

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const locale = (await params).locale
  const t = await getTranslations({ locale, namespace: 'site' })

  return {
    metadataBase: new URL(`${server}`),
    title: t('metadata.blog.title'),
    description: t('metadata.blog.description'),
    openGraph: {
      title: t('metadata.blog.title'),
      description: t('metadata.blog.description'),
      url: '/en/blog',
      type: 'website',
      siteName: t('metadata.homepage.title'),
      images: [
        {
          url: '/images/og-image.png',
          alt: 'Mario Pérez',
          width: 1200,
          height: 630,
        },
      ],
      locale: 'en',
    },
    twitter: {
      card: 'summary_large_image',
      site: '@marprezd',
      creator: '@marprezd',
      title: t('metadata.blog.title'),
      description: t('metadata.blog.description'),
      images: [
        {
          url: '/images/og-image.png',
          alt: 'Mario Pérez',
          width: 1200,
          height: 630,
        },
      ],
    },
    alternates: {
      canonical: '/en/blog',
      languages: {
        es: `/es/blog`,
        tr: `/tr/blog`,
      },
      types: {
        'application/rss+xml': `/feed.xml`,
      },
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        'index': true,
        'follow': true,
        'noimageindex': true,
        'max-video-preview': -1,
        'max-image-preview': 'standard',
        'max-snippet': -1,
      },
    },
  }
}

export default async function Blog({
  searchParams,
  params,
}: {
  searchParams: Promise<{
    page?: string
  }>
  params: Promise<{
    locale: Locale
  }>
}) {
  const locale = (await params).locale
  const search = (await searchParams)

  const currentPage = Number(search?.page) || 1
  const allPost = sortPosts(posts.filter(post => post.published))
  const postsByLang = allPost.filter(post => post.language === locale)
  const totalPages = Math.ceil(postsByLang.length / POSTS_PER_PAGE)
  const displayPosts = postsByLang.slice(POSTS_PER_PAGE * (currentPage - 1), POSTS_PER_PAGE * currentPage)
  const t = await getTranslations({ locale })
  const totalPosts = postsByLang.length

  const PageHeroComponent = dynamic(
    () => import('../../../components/page-hero'),
    {
      loading: () => <Loading />,
    },
  )

  const PostGridComponent = dynamic(
    () => import('../../../components/posts/posts-series-grids'),
    {
      loading: () => <Loading />,
    },
  )

  const PaginationComponent = dynamic(
    () => import('../../../components/pagination/query-pagination'),
    {
      loading: () => <Loading />,
    },
  )

  const SidebarComponent = dynamic(
    () => import('../../../components/posts/sidebar'),
    {
      loading: () => <Loading />,
    },
  )

  return (
    <div className="before:z-1 relative overflow-hidden before:absolute before:start-1/2 before:top-0 before:size-full before:-translate-x-1/2 before:bg-heroLight before:bg-top before:bg-no-repeat dark:before:bg-heroDark">
      <PageHeroComponent
        title={t('site.metadata.blog.title')}
        description={t('site.metadata.blog.description')}
      />
      <div className="container mx-auto">
        <div className="flex flex-col gap-4 lg:flex-row">
          <main className="basis-full space-y-4 lg:basis-9/12">
            {displayPosts.length > 0
              ? (
                  <PostGridComponent
                    posts={displayPosts}
                  />
                )
              : (
                  <p>Sorry, nothing to see here yet!</p>
                )}
            <PaginationComponent
              itemsPerPage={POSTS_PER_PAGE}
              totalPages={totalPages}
              totalItems={totalPosts}
            />
          </main>
          <aside className="basis-full lg:basis-3/12">
            <SidebarComponent />
          </aside>
        </div>
      </div>
    </div>
  )
}
