import type { Locale } from '@/i18n/routing'
import AllCategories from '@/components/blog/sidebar/categories/all-categories'
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
    category: string
  }>
}) {
  const locale = (await params).locale
  const category = (await params).category
  const t = await getTranslations({ locale, namespace: 'app' })

  return {
    metadataBase: new URL(`${host}`),
    title: t('blog.categories.seo.title', { category }),
    description: t('blog.categories.seo.title', { category }),
    openGraph: {
      title: t('blog.categories.seo.title', { category }),
      description: t('blog.categories.seo.description', { category }),
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
      title: t('blog.categories.seo.title', { category }),
      description: t('blog.categories.seo.description', { category }),
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
}: {
  params: Promise<{
    locale: Locale
    category: string
  }>
}) {
  const locale = (await params).locale
  const category = (await params).category

  const title = category.split('-').join(' ')
  const t = await getTranslations('app')

  return (
    <div className="space-y-10">
      <section className="mx-auto flex min-h-[80dvh] max-w-[60rem] flex-col items-center justify-center">
        <Suspense fallback={<DefaultLoadingSkeleton />}>
          <DefaultHero
            title={t('blog.categories.seo.title', { category: `'${title}'` })}
            description={t('blog.categories.seo.description', { category: `'${title}'` })}
          />
        </Suspense>
      </section>
      <AllCategories params={{
        locale,
        category,
      }}
      />
    </div>
  )
}
