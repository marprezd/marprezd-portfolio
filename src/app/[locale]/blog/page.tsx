import type { Locale } from '@/i18n/routing'
import AllPosts from '@/components/blog/all-posts'
import Sidebar from '@/components/blog/sidebar'
import DefaultHero from '@/components/default-hero'
import DefaultLoadingSkeleton from '@/components/default-loading-skeleton'
import { host } from '@/config'
import { getTranslations } from 'next-intl/server'
import React, { Suspense } from 'react'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const locale = (await params).locale
  const t = await getTranslations({ locale, namespace: 'app' })

  return {
    metadataBase: new URL(`${host}`),
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

export default async function Page({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const locale = (await params).locale
  const t = await getTranslations({ locale, namespace: 'app' })

  return (
    <div className="space-y-10">
      <section className="mx-auto flex min-h-[80dvh] max-w-[60rem] flex-col items-center justify-center">
        <Suspense fallback={<DefaultLoadingSkeleton />}>
          <DefaultHero
            title={t('metadata.blog.title')}
            description={t('metadata.blog.description')}
          />
        </Suspense>
      </section>
      <section className="flex flex-col gap-4 space-y-4 pb-10 lg:flex-row lg:space-y-0">
        <div className="basis-full lg:basis-9/12">
          <AllPosts params={{
            locale,
          }}
          />
        </div>
        <aside className="basis-full lg:basis-3/12">
          <Sidebar />
        </aside>
      </section>
    </div>
  )
}
