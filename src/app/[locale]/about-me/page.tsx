import type { Locale } from '@/i18n/routing'
import type { ProfilePage, WithContext } from 'schema-dts'
import Metrics from '@/components/about/metrics'
import ProfileCard from '@/components/about/profile-card'
import Skills from '@/components/about/skills'
import DefaultLoadingSkeleton from '@/components/default-loading-skeleton'
import { host } from '@/config'
import { getGitHubStats } from '@/lib/gitHubStats'
import { getTranslations } from 'next-intl/server'
import Script from 'next/script'
import React, { Suspense } from 'react'

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    locale: Locale
  }>
}) {
  const locale = (await params).locale

  const t = await getTranslations({ locale, namespace: 'app' })

  return {
    metadataBase: new URL(`${host}`),
    title: t('metadata.about.title'),
    description: t('metadata.about.description'),
    openGraph: {
      title: t('metadata.about.og-title'),
      description: t('metadata.about.description'),
      url: '/en/about-me',
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
      title: t('metadata.about.og-title'),
      description: t('metadata.about.description'),
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
      canonical: '/en/about-me',
      languages: {
        es: `${host}/es/acerca-de-mi`,
        tr: `${host}/tr/benim-hakkimda`,
      },
      types: {
        'application/rss+xml': `${host}/feed.xml`,
      },
    },
    robots: {
      index: true,
      follow: true,
      nocache: true,
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

export default async function Page() {
  const stats = await getGitHubStats()

  const jsonLd: WithContext<ProfilePage> = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    'dateCreated': '2024-09-06 21:27:26',
    'mainEntity': {
      '@type': 'Person',
      'name': 'Mario Pérez',
      'alternateName': 'marprezd',
      'identifier': '1',
      'interactionStatistic': [{
        '@type': 'InteractionCounter',
        'interactionType': {
          '@type': 'FollowAction',
        },
        'userInteractionCount': 82,
      }, {
        '@type': 'InteractionCounter',
        'interactionType': {
          '@type': 'LikeAction',
        },
        'userInteractionCount': 0,
      }, {
        '@type': 'InteractionCounter',
        'interactionType': {
          '@type': 'WriteAction',
        },
        'userInteractionCount': 1,
      }, {
        '@type': 'InteractionCounter',
        'interactionType': {
          '@type': 'ShareAction',
        },
        'userInteractionCount': 0,
      }],
      'description': 'I am a software developer building modern web applications and slick user interfaces using Python, Next.js, and other web technologies.',
      'image': `${host}/images/marprezd-profile.jpg`,
      'sameAs': [
        'https://twitter.com/marprezd',
        'https://www.kaggle.com/maprezd',
        'https://www.github.com/marprezd',
        'https://www.linkedin.com/in/maprezd',
        'https://stackoverflow.com/users/11650008/marprezd?tab=topactivity',
      ],
    },
  }

  return (
    <div className="space-y-8">
      <section className="mx-auto flex min-h-[85dvh] max-w-[65rem] flex-col items-center justify-center">
        <Suspense fallback={<DefaultLoadingSkeleton />}>
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-full lg:col-span-4">
              <ProfileCard />
            </div>
            <div className="col-span-full place-self-center lg:col-span-8">
              <Skills />
            </div>
          </div>
        </Suspense>
      </section>
      <section className="mx-auto max-w-[65rem]">
        <div className="grid grid-cols-12 space-y-10">
          <Metrics stats={stats} />
        </div>
      </section>
      <Script
        key="profiles-page-structered-data"
        type="application/ld+json"
        // eslint-disable-next-line react-dom/no-dangerously-set-innerhtml
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  )
}
