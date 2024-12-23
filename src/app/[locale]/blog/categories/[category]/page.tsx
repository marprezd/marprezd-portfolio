import type { Locale } from '@/i18n/routing'
import { posts } from '#site/content'
import CategoriesCloud from '@/components/posts/sidebar/categories/category-cloud'
import { server } from '@/lib/serverUrl'
import { getAllCategories, getPostsByCategorySlug, slugify, sortCategoriesByCount, sortPosts } from '@/lib/utils'
import { Card, CardBody, CardHeader } from '@nextui-org/card'
import { Divider } from '@nextui-org/divider'
import { getTranslations } from 'next-intl/server'
import dynamic from 'next/dynamic'
import React from 'react'

const POSTS_PER_PAGE = 4

export async function generateMetadata({
  params,
}: { params: Promise<{ locale: Locale, category: string }> },
) {
  const locale = (await params).locale
  const category = (await params).category
  const t = await getTranslations({ locale, namespace: 'site' })

  return {
    metadataBase: new URL(`${server}`),
    title: t('posts.categories.seo.title', { category }),
    description: t('posts.categories.seo.title', { category }),
    openGraph: {
      title: t('posts.categories.seo.title', { category }),
      description: t('posts.categories.seo.description', { category }),
      url: `/en/blog/categories/${category}`,
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
      title: t('posts.categories.seo.title', { category }),
      description: t('posts.categories.seo.description', { category }),
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
      canonical: `/en/blog/categories/${category}`,
      languages: {
        es: `/es/blog/categorias/${category}`,
        tr: `/tr/blog/kategoriler/${category}`,
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

export default async function categoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale, category: string }>
  searchParams: Promise<{
    page?: string
  }>
}) {
  const locale = (await params).locale
  const category = (await params).category
  const search = (await searchParams)

  const currentPage = Number(search?.page) || 1
  const sortedPosts = sortPosts(posts.filter(post => post.published))
  const postsByLang = sortedPosts.filter(post => post.language === locale)
  const title = category.split('-').join(' ')
  const allPosts = getPostsByCategorySlug(postsByLang, category)
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE)
  const displayPosts = allPosts.slice(POSTS_PER_PAGE * (currentPage - 1), POSTS_PER_PAGE * currentPage)
  const t = await getTranslations('site')
  const totalPosts = allPosts.length
  const categories = getAllCategories(postsByLang)
  const sortedCategories = sortCategoriesByCount(categories)

  function Loading() {
    return null
  }

  const PageHeroComponent = dynamic(
    () => import('../../../../../components/page-hero'),
    {
      loading: () => <Loading />,
    },
  )

  const PostGridComponent = dynamic(
    () => import('../../../../../components/posts/posts-series-grids'),
    {
      loading: () => <Loading />,
    },
  )

  const PaginationComponent = dynamic(
    () => import('../../../../../components/pagination/query-pagination'),
    {
      loading: () => <Loading />,
    },
  )

  return (
    <div className="before:z-1 relative overflow-hidden before:absolute before:start-1/2 before:top-0 before:size-full before:-translate-x-1/2 before:bg-heroLight before:bg-top before:bg-no-repeat dark:before:bg-heroDark">
      <PageHeroComponent
        title={t('posts.categories.seo.title', { category: `'${title}'` })}
        description={t('posts.categories.seo.description', { category: `'${title}'` })}
      />
      <div className="container mx-auto">
        <div className="flex flex-col gap-4 lg:flex-row">
          <main className="basis-full space-y-4 lg:basis-9/12 ">
            {displayPosts.length > 0
              ? (
                  <PostGridComponent posts={displayPosts} />
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
            <Card className="border-1 border-gray-300 dark:border-gray-700">
              <CardHeader>
                <h2 className="text-xl font-bold tracking-tight">
                  {t('posts.categories.label')}
                </h2>
              </CardHeader>
              <Divider />
              <CardBody>
                <ul className="flex flex-wrap gap-2">
                  {sortedCategories?.map(t => (
                    <CategoriesCloud key={t} count={categories[t]} current={slugify(t) === category} category={t} />
                  ))}
                </ul>
              </CardBody>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  )
}
