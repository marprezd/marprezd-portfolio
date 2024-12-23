/* eslint-disable react-dom/no-dangerously-set-innerhtml */
import type { Post } from '#site/content'
import type { Locale } from '@/i18n/routing'
import type { EmblaOptionsType } from 'embla-carousel'
import type { NewsArticle, WithContext } from 'schema-dts'
import { posts } from '#site/content'
import { MDXContent } from '@/components/mdx/mdx-components'
import { server } from '@/lib/serverUrl'
import similerItems from '@/lib/similarItems'
import { sortPosts } from '@/lib/utils'
import dynamic from 'next/dynamic'
import { notFound } from 'next/navigation'
import Script from 'next/script'
import '@/styles/markdown.css'
import '@/styles/embla.css'

function Loading() {
  return null
}

const OPTIONS: EmblaOptionsType = { align: 'start' }

async function getPostFromParams({
  params,
}: {
  params: Promise<{
    slug: string[]
    locale: Locale
  }>
}): Promise<any> {
  const slug = (await params).slug
  const locale = (await params).locale

  const dslug = Array.isArray(slug) ? decodeURI(slug.join('/')) : decodeURI(slug)

  const post = posts.filter(post => post.language === locale).find(post => post.slugAsParams === dslug) as Post

  if (post.series) {
    const seriesPost = posts
      .filter(p => p.language === locale && p.series?.title === post.series?.title)
      .sort((a, b) => Number(a.series!.order) - Number(b.series!.order))
      .map((p) => {
        return {
          title: p.title,
          slug: p.slug,
          language: p.language,
          isCurrent: p.slug === post.slug,
        }
      })

    if (seriesPost.length > 0)
      return { ...post, series: { ...post.series, posts: seriesPost } }
  }

  return post
}

export async function generateMetadata(
  {
    params,
  }: {
    params: Promise<{
      slug: string[]
      locale: Locale
    }>
  },
) {
  const slug = (await params).slug
  const locale = (await params).locale

  const dslug = Array.isArray(slug) ? decodeURI(slug.join('/')) : decodeURI(slug)
  const post = posts.find(post => post.slugAsParams === dslug && post.language === locale)

  if (!post) {
    return {}
  }

  const ogSearchParams = new URLSearchParams()

  ogSearchParams.set('title', post.title)

  const postKeywords = post.tags

  return {
    metadataBase: new URL(`${server}`),
    title: post.title,
    description: post.excerpt,
    keywords: postKeywords,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      url: `${post.slug}`,
      images: [
        {
          url: post.cover.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      locale: 'en',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: post.cover.image,
    },
    alternates: {
      canonical: `${post.slug}`,
      // TODO...
      /*       languages: {
        es: `/es/${post.section}/${post.slug.substring(post.slug.lastIndexOf('/') + 1)}`,
        tr: `/tr/${post.section}/${post.slug.substring(post.slug.lastIndexOf('/') + 1)}`,
      }, */
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

export default async function PostPage(
  {
    params,
  }: {
    params: Promise<{
      slug: string[]
      locale: Locale
    }>
  },
) {
  const slug = (await params).slug
  const locale = (await params).locale

  const dslug = Array.isArray(slug) ? decodeURI(slug.join('/')) : decodeURI(slug)
  const allPost = posts.filter(post => post.published)
  const sortedPosts = sortPosts(allPost)
  const sortedPostItems = sortedPosts.filter(post => post.language === locale)
  const postIndex = sortedPostItems.findIndex(post => post.slugAsParams === dslug)

  if (postIndex === -1)
    return notFound()

  const prev = sortedPostItems[postIndex + 1]
  const next = sortedPostItems[postIndex - 1]

  const post = await getPostFromParams({ params })

  if (!post || !post.published) {
    notFound()
  }

  const jsonLd: WithContext<NewsArticle> = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    'headline': post.title,
    'image': `${server}${post.cover.image}`,
    'datePublished': post.date,
    'dateModified': post.update,
    'author': {
      '@type': 'Person',
      'name': 'Mario Perez',
      'url': 'https://www.patreon.com/marprezd',
    },
  }

  const similarPosts = similerItems(post, sortedPostItems, post.slug)

  const PostLayoutComponent = dynamic(
    () => import('@/components/posts/post-layout'),
    {
      loading: () => <Loading />,
    },
  )

  const PaginationComponent = dynamic(
    () => import('@/components/posts/next-or-prev-publishing'),
    {
      loading: () => <Loading />,
    },
  )

  const CarouselComponent = dynamic(
    () => import('@/components/carousel/embla-carousel'),
    {
      loading: () => <Loading />,
    },
  )

  const DonationComponent = dynamic(
    () => import('@/components/posts/donations'),
    {
      loading: () => <Loading />,
    },
  )

  return (
    <div>
      <PostLayoutComponent post={post}>
        <MDXContent code={post.body} />
      </PostLayoutComponent>
      {/* Next and Prev Article Section */}
      <PaginationComponent
        next={next}
        params={{ locale }}
        prev={prev}
      />
      {/* Similar posts */}
      <CarouselComponent
        options={OPTIONS}
        posts={similarPosts}
      />
      <DonationComponent />
      <Script
        key="news-articles-structered-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
    </div>
  )
}
