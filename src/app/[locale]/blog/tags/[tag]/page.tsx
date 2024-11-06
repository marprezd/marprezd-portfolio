import type { Locale } from '@/i18n/routing'
import type { Metadata } from 'next'
import { posts } from '#site/content'
import TagCloud from '@/components/posts/sidebar/tags/tag-cloud'
import { server } from '@/lib/serverUrl'
import { getAllTags, getPostsByTagSlug, slugify, sortPosts, sortTagsByCount } from '@/lib/utils'
import { Card, CardBody, CardHeader } from '@nextui-org/card'
import { Divider } from '@nextui-org/divider'
import dynamic from 'next/dynamic'
import { getTranslations } from 'next-intl/server'
import React from 'react'

const POSTS_PER_PAGE = 4

interface TagPageProps {
  searchParams: {
    page?: string
  }
  params: {
    locale: Locale
    tag: string
  }
}

export async function generateMetadata({
  params,
}: TagPageProps): Promise<Metadata> {
  const { tag, locale } = params
  const t = await getTranslations({ locale, namespace: 'site' })

  return {
    metadataBase: new URL(`${server}`),
    title: t('posts.tags.seo.title', { tag }),
    description: t('posts.tags.seo.description', { tag }),
    openGraph: {
      title: t('posts.tags.seo.title', { tag }),
      description: t('posts.tags.seo.description', { tag }),
      url: `/en/blog/tags/${tag}`,
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
      title: t('posts.tags.seo.title', { tag }),
      description: t('posts.tags.seo.description', { tag }),
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
      canonical: `/en/blog/tags/${tag}`,
      languages: {
        es: `/es/blog/etiquetas/${tag}`,
        tr: `/tr/blog/etiketler/${tag}`,
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

export default async function TagPage({ searchParams, params: { locale, tag } }: TagPageProps) {
  const currentPage = Number(searchParams?.page) || 1
  const sortedPosts = sortPosts(posts.filter(post => post.published))
  const postsByLang = sortedPosts.filter(post => post.language === locale)
  const title = tag.split('-').join(' ')
  const allPosts = getPostsByTagSlug(postsByLang, tag)
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE)
  const displayPosts = allPosts.slice(POSTS_PER_PAGE * (currentPage - 1), POSTS_PER_PAGE * currentPage)
  const t = await getTranslations('site')
  const totalPosts = allPosts.length
  const tags = getAllTags(postsByLang)
  const sortedTags = sortTagsByCount(tags)

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
    <div>
      <div className="container mx-auto max-w-6xl space-y-10 xl:space-y-12">
        <section className="flex w-full">
          <PageHeroComponent
            title={t('posts.tags.seo.title', { tag: `'${title}'` })}
            description={t('posts.tags.seo.description', { tag: `'${title}'` })}
          />
        </section>
        <div className="flex flex-col gap-4 lg:flex-row">
          <main className="basis-full lg:basis-9/12">
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
            <Card className="border-1 border-default-300">
              <CardHeader>
                <h2 className="text-xl font-bold tracking-tight">
                  {t('posts.tags.label')}
                </h2>
              </CardHeader>
              <Divider />
              <CardBody>
                <ul className="flex flex-wrap gap-2">
                  {sortedTags?.map(t => (
                    <TagCloud key={t} count={tags[t]} current={slugify(t) === tag} tag={t} />
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
