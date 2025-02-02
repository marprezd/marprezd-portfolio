import type { ReactNode } from 'react'
import BaseLayout from '@/components/base-layout'
import { host } from '@/config'
import { routing } from '@/i18n/routing'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const locale = (await params).locale
  const t = await getTranslations({ locale, namespace: 'app' })

  return {
    metadataBase: new URL(`${host}`),
    title: {
      default: t('metadata.homepage.title'),
      template: `Mario Pérez | %s`,
    },
    description: t('metadata.homepage.description'),
    generator: t('metadata.homepage.generator'),
    applicationName: t('metadata.homepage.generator'),
    referrer: 'origin-when-cross-origin',
    keywords: [
      'mario perez',
      'software developer',
      'python',
      'nextjs',
      'api design',
      'user interface',
      'machine learning',
      'software engineering',
      'web app',
      'ai',
      'ai generative',
    ],
    authors: [
      {
        name: 'Mario Pérez',
        url: `${host}`,
      },
    ],
    creator: 'Mario Pérez',
    publisher: 'Mario Pérez',
    formatDetection: {
      telephone: true,
      address: true,
      email: true,
    },
    icons: {
      icon: [
        {
          url: '/favicon.ico',
        },
        {
          url: '/favicon-16x16.png',
          sizes: '16x16',
          type: 'image/png',
        },
        {
          url: '/favicon-32x32.png',
          sizes: '32x32',
          type: 'image/png',
        },
      ],
      apple: [
        {
          url: '/apple-touch-icon.png',
        },
      ],
      other: [
        {
          rel: 'android-chrome-192x192',
          url: '/android-chrome-192x192.png',
        },
        {
          rel: 'android-chrome-512x512',
          url: '/android-chrome-512x512.png',
        },
      ],
    },
    openGraph: {
      title: t('metadata.homepage.title'),
      description: t('metadata.homepage.description'),
      url: `${host}`,
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
      title: t('metadata.homepage.title'),
      description: t('metadata.homepage.description'),
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
      canonical: `${host}`,
      languages: {
        es: `${host}/es`,
        tr: `${host}/tr`,
      },
      types: {
        'application/rss+xml': `${host}/feed.xml`,
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

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ locale: string }>
}) {
  const locale = (await params).locale
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound()
  }

  // Enable static rendering
  setRequestLocale(locale)

  return (
    <BaseLayout locale={locale}>
      {children}
    </BaseLayout>
  )
}
