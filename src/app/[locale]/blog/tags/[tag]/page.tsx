import type { Locale } from '@/i18n/routing'
import AllTags from '@/components/blog/sidebar/tags/all-tags'
import DefaultHero from '@/components/default-hero'
import DefaultLoadingSkeleton from '@/components/default-loading-skeleton'
import { host } from '@/config'
import { getTranslations } from 'next-intl/server'
import React, { Suspense } from 'react'

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    locale: Locale
    tag: string
  }>
}) {
  const locale = (await params).locale
  const tag = (await params).tag
  const t = await getTranslations({ locale, namespace: 'app' })

  return {
    metadataBase: new URL(`${host}`),
    title: t('blog.tags.seo.title', { tag }),
    description: t('blog.tags.seo.description', { tag }),
    openGraph: {
      title: t('blog.tags.seo.title', { tag }),
      description: t('blog.tags.seo.description', { tag }),
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
      title: t('blog.tags.seo.title', { tag }),
      description: t('blog.tags.seo.description', { tag }),
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

export default async function TagPage({
  params,
}: {
  params: Promise<{
    locale: Locale
    tag: string
  }>
}) {
  const locale = (await params).locale
  const tag = (await params).tag

  const title = tag.split('-').join(' ')
  const t = await getTranslations('app')

  return (
    <div className="space-y-10">
      <section className="mx-auto flex min-h-[80dvh] max-w-[60rem] flex-col items-center justify-center">
        <Suspense fallback={<DefaultLoadingSkeleton />}>
          <DefaultHero
            title={t('blog.tags.seo.title', { tag: `'${title}'` })}
            description={t('blog.tags.seo.description', { tag: `'${title}'` })}
          />
        </Suspense>
      </section>
      <AllTags params={{
        locale,
        tag,
      }}
      />
    </div>
  )
}
