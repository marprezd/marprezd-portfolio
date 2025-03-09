import type { Post } from '#site/content'
import type { Locale } from '@/i18n/routing'
import type { NewsArticle, WithContext } from 'schema-dts'
import { posts } from '#site/content'
import NextOrPrevPost from '@/components/blog/next-or-prev-post'
import NextOrPrevPostContainer from '@/components/blog/next-or-prev-post-container'
import PostLayout from '@/components/blog/post-layout'
import { MDXContent } from '@/components/mdx/mdx-components'
import Section from '@/components/section'
import { host } from '@/config'
import similerItems from '@/lib/similarItems'
import { sortPosts } from '@/lib/utils'
import { notFound } from 'next/navigation'
import Script from 'next/script'

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
    metadataBase: new URL(`${host}`),
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

export default async function Page(
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
    'image': `${host}${post.cover.image}`,
    'datePublished': post.date,
    'dateModified': post.update,
    'author': {
      '@type': 'Person',
      'name': 'Mario Perez',
      'url': 'https://www.patreon.com/marprezd',
    },
  }

  const similarPosts = similerItems(post, sortedPostItems, post.slug)

  return (
    <div className="w-full gap-y-4">
      <Section>
        <PostLayout post={post} similarPosts={similarPosts}>
          <MDXContent code={post.body} />
        </PostLayout>
      </Section>
      <Section>
        <NextOrPrevPostContainer>
          <NextOrPrevPost
            next={next}
            params={{ locale }}
            prev={prev}
          />
        </NextOrPrevPostContainer>
      </Section>
      <Script
        key="news-articles-structered-data"
        type="application/ld+json"
        // eslint-disable-next-line react-dom/no-dangerously-set-innerhtml
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
    </div>
  )
}
