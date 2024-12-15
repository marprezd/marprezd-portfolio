/* eslint-disable react-dom/no-dangerously-set-innerhtml */
import type { Locale } from '@/i18n/routing'
import type { Metadata } from 'next'
import type { ProfilePage, WithContext } from 'schema-dts'
import { getGitHubStats } from '@/lib/gitHubStats'
import { server } from '@/lib/serverUrl'
import { getTranslations } from 'next-intl/server'
import dynamic from 'next/dynamic'
import Script from 'next/script'
import React from 'react'

function Loading() {
  return null
}

const CoverCardComponent = dynamic(
  () => import('../../../components/about-me/cover-card'),
  {
    loading: () => <Loading />,
  },
)

const SkillsComponent = dynamic(
  () => import('../../../components/about-me/skills'),
  {
    loading: () => <Loading />,
  },
)

const MetricsComponent = dynamic(
  () => import('../../../components/about-me/metrics'),
  {
    loading: () => <Loading />,
  },
)

const TimelineComponent = dynamic(
  () => import('../../../components/about-me/timeline'),
  {
    loading: () => <Loading />,
  },
)

interface AboutPageProps {
  params: {
    locale: Locale
  }
}

export async function generateMetadata({ params: { locale } }: AboutPageProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'site' })

  return {
    metadataBase: new URL(`${server}`),
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
        es: `${server}/es/acerca-de-mi`,
        tr: `${server}/tr/benim-hakkimda`,
      },
      types: {
        'application/rss+xml': `${server}/feed.xml`,
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

export default async function AboutMe() {
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
      'image': `${server}/images/marprezd-profile.jpg`,
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
    <div>
      <section className="container mx-auto">
        <div className="mx-auto grid max-w-5xl grid-cols-1 items-center justify-center gap-4 py-10 lg:grid-cols-2 lg:py-20">
          <div className="p-0 lg:p-5">
            <CoverCardComponent />
          </div>
          <div className="p-0 lg:p-5">
            <SkillsComponent />
          </div>
        </div>
      </section>
      <section className="bg-white py-10 dark:bg-gray-900 md:py-20">
        <MetricsComponent stats={stats} />
      </section>
      <section className="bg-red-700 py-10 dark:bg-gray-800 md:py-20">
        <TimelineComponent />
      </section>
      <Script
        key="profiles-page-structered-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
    </div>
  )
}
